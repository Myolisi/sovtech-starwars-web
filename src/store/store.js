import { configureStore } from '@reduxjs/toolkit';
import { personDetails } from './personDetails';

const store = configureStore({
  reducer: {
    person: personDetails.reducer,
  },
});

export default store;
