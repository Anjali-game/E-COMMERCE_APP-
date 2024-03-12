import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  image: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      console.log(action.payload);
      //state = action.payload.datauser;

      state.firstName = action.payload[0].firstName;
      state.lastName = action.payload[0].lastName;
      state.email = action.payload[0].email;
      state.image = action.payload[0].image;
    },
    logoutRedux: (state, action) => {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.image = "";
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;
export default userSlice.reducer;
