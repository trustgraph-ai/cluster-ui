
import { configureStore } from '@reduxjs/toolkit'

import eventsReducer from './eventsSlice'

// Don't understand the rationale here
//export const { extendedEvents } = eventsReducer;

export const store = configureStore({
    reducer: {
        events: eventsReducer,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type:
// {events: EventsState}
export type AppDispatch = typeof store.dispatch
