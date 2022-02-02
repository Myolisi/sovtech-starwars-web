import { createSlice } from '@reduxjs/toolkit';

export const personDetails = createSlice({
  name: 'person',
  initialState: {
    value: 0,
  },
  reducers: {
    dispatchPerson: (state, action) => {
      const { payload } = action;
      state.value = payload;
    },
  },
});
export const { dispatchPerson } = personDetails.actions;

export default personDetails;
