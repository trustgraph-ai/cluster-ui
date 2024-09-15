import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface Event {
    status: string
};

// Define a type for the slice state
interface EventState {
    value: Event[]
};

// Define the initial state using that type
const initialState: EventState = {
    value: [
        {
            "status": "Packaging",
        },
        {
            "status": "Delivery",
        },
        {
            "status": "Returned",
        }
    ]
};

export const eventsSlice = createSlice({
    name: 'events',

    // `createSlice` will infer the state type from the `initialState` argument
    initialState,

    reducers: {
        extend: (state, action: PayloadAction<string>) => {
            state.value.push({ status: action.payload });
        },
    },
});

export const {
    extend
} = eventsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectEvents = (state: RootState) => state.events.value;

export default eventsSlice.reducer;

