
import React, { useState, FormEvent } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

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
            <div>
                <form onSubmit={(e) => submit(e)}>
                    <label htmlFor="text">Text:</label>
                    <TextField id="text" label="Outlined" variant="outlined"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <ButtonGroup
                        variant="contained"
                    >
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
                    </ButtonGroup>
                </form>
            </div>
        </>
    );

}

export default Input;

