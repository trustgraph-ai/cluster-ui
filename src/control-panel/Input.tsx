
import React, { useState, FormEvent } from 'react';

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
                    <input
                        type="text" value={text}
                        id="text"
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button onClick={() => {
                            onSubmit(text);
                            setText("");
                    }}>
                        Answer
                    </button>
                    <button onClick={() => {
                            onClearHistory();
                    }}>
                        Clear history
                    </button>
                </form>
            </div>
        </>
    );

}

export default Input;

