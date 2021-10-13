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

export const loadMoreDataAsync = createAsyncThunk(
  'task/loadMoreData',
  async () => {
    return await axiosGetData();
  }
);

export const filterDataAsync = createAsyncThunk(
  'task/filterData',
  async (payload) => {
    console.log(payload);
    return await axiosGetData(payload.filter);
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
    [loadMoreDataAsync.pending]: (state, action) => {
      state.loading = true;
    },
    [loadMoreDataAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.value.push(...action.payload);
    },
    [filterDataAsync.pending]: (state, action) => {
      state.loading = true;
    },
    [filterDataAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.value = action.payload;
    },
  },
});

export const { deleteItem } = taskSlice.actions;

export default taskSlice.reducer;
