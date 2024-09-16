
import React from 'react';

import Box from '@mui/material/Box';

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
            <Box sx={{ display: 'flex',  flexDirection: 'column' }}>
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
            </Box>
        </>
    );

}

export default ChatMessageHistory;

