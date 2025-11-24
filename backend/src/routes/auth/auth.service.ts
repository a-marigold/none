import type { PrismaClient } from '@/generated/prisma/client/client';
import type Redis from 'ioredis';

import type { FastifyJWT, JWT } from '@fastify/jwt';

import type { CookieSerializeOptions } from '@fastify/cookie';

import { ApiError } from '@none/shared';

import type { RegisterData, CookieName, User, SearchUser } from '@none/shared';

import { preparePrismaData } from '@/utils/preparePrismaData';

import { REFRESH_TOKEN_MAX_AGE } from '@/constants/authCookieMaxAge';

async function findByUserName(prisma: PrismaClient, userName: string) {
    const user = await prisma.user.findUnique({
        where: { userName },
    });

    return user;
}

export async function checkUserNameTaken(
    prisma: PrismaClient,
    userName: string
) {
    const userExist = await findByUserName(prisma, userName);

    if (userExist) {
        throw new ApiError(
            `User name "${userExist.userName}" has already been taken.`,
            409
        );
    }

    return false;
}

export async function saveUserInDB(
    prisma: PrismaClient,
    userData: RegisterData
) {
    const { userName, fullName, password } = userData;

    const newUser = await prisma.user.create({
        data: { userName, fullName, password },
    });

    return newUser;
}

export async function findPublicUsers(
    prisma: PrismaClient
): Promise<SearchUser[]> {
    const publicUsers = await prisma.user.findMany({
        where: { public: true },
        select: {
            userName: true,
            fullName: true,
            avatar: true,
        },
    });

    return preparePrismaData(publicUsers);
}

export function generateAuthTokens(
    jwt: JWT,
    jwtPayload: FastifyJWT['payload']
): { accessToken: string; refreshToken: string } {
    const accessToken = jwt.sign(jwtPayload);
    const refreshToken = crypto.randomUUID();

    return { accessToken, refreshToken };
}

export async function checkUserExistence(
    prisma: PrismaClient,
    userName: string
): Promise<User> {
    const user = await findByUserName(prisma, userName);

    if (!user) {
        throw new ApiError('User with this user name not found', 404);
    }

    return preparePrismaData(user);
}

export function generateAuthCookie(
    name: CookieName,
    value: string,
    maxAge: number
): {
    name: CookieName;
    value: string;
    options: CookieSerializeOptions;
} {
    return {
        name,
        value,
        options: {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            path: '/',
            maxAge,
        },
    };
}

export async function setRefreshTokenInCache(
    redis: Redis,
    key: string,
    value: string
) {
    await redis.set(`refresh:${key}`, value, 'EX', REFRESH_TOKEN_MAX_AGE);
}

export async function getRefreshTokenFromCache(redis: Redis, key: string) {
    return await redis.get(`refresh:${key}`);
}
