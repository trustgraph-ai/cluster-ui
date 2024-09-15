
import React from 'react';

import Grid from '@mui/material/Grid2';

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
            <h3>Messages</h3>
            <Grid container spacing={1}>
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
            </Grid>
        </>
    );

}

export default ChatMessageHistory;

