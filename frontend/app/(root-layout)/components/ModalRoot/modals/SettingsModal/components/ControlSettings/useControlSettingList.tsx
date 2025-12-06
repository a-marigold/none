import { useMemo } from 'react';

import { useSettingsStore } from '@/store/SettingsStore';

import type { SettingProps } from '../SettingList';

import { PrimaryButtonProps } from '@/UI/PrimaryButton';

export function useControlSettingList(): SettingProps[] {
    const chatStackLength = useSettingsStore((state) => state.chatStackLength);

    const setChatStackLength = useSettingsStore(
        (state) => state.setChatStackLength
    );

    // return useMemo<SettingProps[]>(
    //     () => [
    //         {
    //             title: 'Chat stack length',
    //             description: 'The maximum length of stack where messages are',

    //             buttonOptions: {
    //                 title: chatStackLength.toString(),
    //                 'aria-label': 'Change the chat stack length',
    //                 childrenPropList: [3, 4, 5, 6].map<PrimaryButtonProps>(
    //                     (length) => ({
    //                         title: length.toString(),
    //                         'aria-label': `Set the chat stack length on ${length}`,

    //                         isActive: length === chatStackLength,

    //                         onClick: () => setChatStackLength(length),
    //                     })
    //                 ),
    //             },
    //         },
    //     ],
    //     [chatStackLength, setChatStackLength]
    // );

    return [
        {
            title: 'Chat stack length',
            description: 'The maximum length of stack where messages are',

            buttonOptions: {
                title: chatStackLength.toString(),
                'aria-label': 'Change the chat stack length',
                childrenPropList: [3, 4, 5, 6].map<PrimaryButtonProps>(
                    (length) => ({
                        title: length.toString(),
                        'aria-label': `Set the chat stack length on ${length}`,

                        isActive: length === chatStackLength,

                        onClick: () => setChatStackLength(length),
                    })
                ),
            },
        },
    ];
}
