import type { SettingInputProps } from '@/UI/SettingInput';

export type AccountInput = 'userName' | 'fullName';

export const accountInputList: (SettingInputProps & {
    htmlId: AccountInput;
})[] = [
    {
        labelTitle: 'User name',

        htmlId: 'userName',

        'aria-label': 'Input a new user name',

        autoComplete: 'off',
    },
    {
        htmlId: 'fullName',

        labelTitle: 'Full name',

        'aria-label': 'Input a new full name',

        autoComplete: 'off',
    },
];
