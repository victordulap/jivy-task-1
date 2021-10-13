import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://retoolapi.dev/geeOvB/data';

const initialState = {
  value: [],
  loading: false,
};

const axiosGetData = async (filter = null) => {
  try {
    const url = filter ? `${API_URL}?Name=${filter}` : API_URL;
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export const getDataAsync = createAsyncThunk('task/getData', async () => {
  return await axiosGetData();
});

export const filterDataAsync = createAsyncThunk(
  'task/filterData',
  async (payload) => {
    console.log(payload);
    return await axiosGetData(payload.filter);
  }
);

export const addDataAsync = createAsyncThunk(
  'task/addData',
  async (payload) => {
    try {
      const response = await axios.post(API_URL, payload.item);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    deleteItem(state, action) {
      const index = state.value.findIndex(
        (item) => item.id === action.payload.id
      );
      state.value.splice(index, 1);
    },
  },

  extraReducers: {
    [getDataAsync.pending]: (state, action) => {
      state.loading = true;
    },
    [getDataAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.value = action.payload;
    },
    [filterDataAsync.pending]: (state, action) => {
      state.loading = true;
    },
    [filterDataAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.value = action.payload;
    },
    [addDataAsync.pending]: (state, action) => {
      state.loading = true;
    },
    [addDataAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.value.push(action.payload);
    },
  },
});

export const { deleteItem } = taskSlice.actions;

export default taskSlice.reducer;
