
import React from 'react';

import Stack from '@mui/material/Stack';

import { useMessageStore } from '../state/MessageStore';
import ChatMessage from './ChatMessage';

interface ChatMessageHistoryProps {
}

const ChatMessageHistory : React.FC<ChatMessageHistoryProps> =
    ({ }) => 
{

    const messages = useMessageStore((state) => state.messages);

    return (
        <>
            <Stack spacing={2}>
                Messages:
                {
                    messages.map(
                        (msg) => 
                        {
                            return (
                                <ChatMessage key={msg.id} message={msg}/>
                            );
                        }
                    )
                }
            </Stack>
        </>
    );

}

export default ChatMessageHistory;

