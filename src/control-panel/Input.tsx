
import React, { useState, FormEvent } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

interface InputProps {
    onSubmit : (text : string) => void;
    onClearHistory : () => void;
}

const Input : React.FC<InputProps> =
    ({ onSubmit, onClearHistory }) => 
{

    const [text, setText] = useState<string>("");

    const submit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <>
                <form onSubmit={(e) => submit(e)}>
                    <Stack direction="row" spacing={1}>
                        <Box>
                        <TextField
                            id="text" label="Text" variant="outlined"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        </Box>
                            <Button onClick={() => {
                                    onSubmit(text);
                                    setText("");
                            }}>
                                Answer
                            </Button>
                            <Button onClick={() => {
                                    onClearHistory();
                            }}>
                                Clear history
                            </Button>
                    </Stack>
                </form>
        </>
    );

}

export default Input;

