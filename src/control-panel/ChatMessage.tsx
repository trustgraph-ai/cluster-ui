
import React from 'react';

import Grid from '@mui/material/Grid2';
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
                gutterBottom sx={{ color: 'text.secondary', fontSize: 10 }}>
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
                <Grid size={10}>
                    <MessageCard
                        message={message}
                        bg="#f0f8ff"
                        fg="text.primary"
                    />
                </Grid>
                <Grid size={2}>
                </Grid>
            </>
        );
    } else {
        return (
            <>
                <Grid size={2}>
                </Grid>
                <Grid size={10}>
                    <MessageCard
                        message={message}
                        bg="info.main"
                        fg="white"
                    />
                </Grid>
            </>
        );
    }

};

export default ChatMessage;

