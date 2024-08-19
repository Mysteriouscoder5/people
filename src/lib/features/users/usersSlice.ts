import { User } from "@/app/people/columns";
import { fakerData } from "@/lib/fakerData";
import { createSlice } from "@reduxjs/toolkit";

type UsersInitialState = {
  data: User[];
  selectedUser: User | null;
};

export const usersSlice = createSlice({
  name: "users",
  initialState: <UsersInitialState>{
    data: fakerData,
    selectedUser: null,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    deleteUser: (state, action) => {
      state.data = state.data.filter((user) => user.id !== action.payload.id);
      state.selectedUser = null;
    },
    addUser: (state, action) => {
      state.data = [...state.data, action.payload];
    },
  },
});

export const { setData, setSelectedUser, deleteUser,addUser } = usersSlice.actions;

export default usersSlice.reducer;
