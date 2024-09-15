
import React from 'react';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { Message } from '../state/MessageStore';

interface MessageProps {
    message : Message;
}

const ChatMessage : React.FC<MessageProps> =
    ({ message }) => 
{

    let ml = "1%";
    let mr = "2%";

    if (message.role === "ai")
        mr = "30%";
    else
        ml = "30%";

    let props : any = {
        "m": 2,
        ml: ml,
        mr: mr,
    };

    return (
        <Card sx={props}>
          <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 10 }}>
              {message.role}
            </Typography>
            <Typography variant="body2">
              {message.text}
            </Typography>
          </CardContent>
        </Card>
    );

}

export default ChatMessage;

