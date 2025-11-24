import type { SafeUser } from '@none/shared';

type SearchUser = Pick<SafeUser, 'userName' | 'fullName' | 'avatar'>;

class UserTrieNode {
    children: Record<string, UserTrieNode>;

    isWord: boolean;

    user: SearchUser | null;

    constructor() {
        this.children = {};

        this.isWord = false;

        this.user = null;
    }
}

export class UserTrie {
    #root: UserTrieNode;
    constructor() {
        this.#root = new UserTrieNode();
    }

    insert(userName: string, user: SearchUser) {
        let node = this.#root;

        for (const char of userName) {
            if (!node.children[char]) {
                node.children[char] = new UserTrieNode();
            }
            node = node.children[char];
        }

        node.isWord = true;
        node.user = user;
    }

    searchByPrefix(prefix: string) {
        let node = this.#root;

        for (const char of prefix) {
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }

        return this.#collectUsers(node, prefix);
    }

    #collectUsers(node: UserTrieNode, prefix: string): SearchUser[] {
        let users: SearchUser[] = [];

        if (node.isWord && node.user) {
            users.push(node.user);
        }

        for (const char in node.children) {
            if (!node.children[char]) continue;

            users.push(
                ...this.#collectUsers(node.children[char], prefix + char)
            );
        }

        return users;
    }
}
