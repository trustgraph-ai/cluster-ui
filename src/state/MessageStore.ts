
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // required for devtools typing

export interface Message {
    role : string;
    text : string;
    id : number;
};

interface MessageState {
  messages: Message[];
  add: (message : Message) => void;
}

export const useMessageStore = create<MessageState>()(
    devtools(
        persist(
            (set) => ({
                messages: [],
                add: (msg) =>
                    set((state) => ({
                        messages: [...state.messages, msg],
                    }))
            }),
            {
              name: 'message-storage',
            },
        ),
    ),
);

