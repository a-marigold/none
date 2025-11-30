import type { SettingInputProps } from '@/UI/SettingInput';

export type AccountInput = 'user-name' | 'full-name';

export const accountInputList: SettingInputProps[] = [
    {
        htmlId: 'full-name-input',

        labelTitle: 'Full name',

        'aria-label': 'Input a new full name',

        autoComplete: 'off',
    },

    {
        labelTitle: 'User name',

        htmlId: 'user-name-input',

        'aria-label': 'Input a new user name',

        autoComplete: 'off',
    },
];
