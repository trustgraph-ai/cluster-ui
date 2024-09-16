
import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { MuiMarkdown } from 'mui-markdown';

import { Message } from '../state/MessageStore';

interface MessageProps {
    message : Message;
}

const MessageCard : React.FC<{
    message : Message; bg : string; fg : string
}> =
    ({message, bg, fg}) =>
{
    return (
        <Card sx={{ 'bgcolor': bg, 'color': fg }}>
          <CardContent>
            <Typography
                gutterBottom sx={{ color: fg, fontSize: 10 }}>
              {message.role}
            </Typography>
            <Typography variant="body2">
                <MuiMarkdown>
                    {message.text}
                </MuiMarkdown>
            </Typography>
          </CardContent>
        </Card>
    );
};

const ChatMessage : React.FC<MessageProps> =
    ({ message }) => 
{

    if (message.role === "ai") {
        return (
            <>
                <Box
                    sx={{
                        maxWidth: "70%", alignSelf: 'flex-start',
                        margin: '0.4rem'
                    }}
                >
                    <MessageCard
                        message={message}
                        bg="#f0f8ff"
                        fg="text.primary"
                    />
                </Box>
            </>
        );
    } else {
        return (
            <>
                <Box
                    sx={{
                        maxWidth: "70%", alignSelf: 'flex-end',
                        margin: '0.4rem'
                    }}
                >
                    <MessageCard
                        message={message}
                        bg="info.main"
                        fg="white"
                    />
                </Box>
            </>
        );
    }

};

export default ChatMessage;

