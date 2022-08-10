import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BaseURL } from "../../api/api";

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 5000 } = options;

  const abortController = new AbortController();
  const id = setTimeout(() => abortController.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: abortController.signal,
  });
  clearTimeout(id);
  return response;
}

const initialState = {
  allDatas: [],
  apidata: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const fetchData = createAsyncThunk(
  "apidata",
  async (filterOption, thunkAPI) => {
    try {
      const response = await fetchWithTimeout(BaseURL + filterOption, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        timeout: 15000,
      });

      let data = await response.json();
      console.log("data", data, response.status);

      if (response.status === 200) {
        return { ...data };
      } else {
        //return api data with errors to reducer :rejected
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      //catch network error
      if (error.message === "Network request failed") {
        // return user friendly message to reducer :rejected
        const cr = { message: "Network request failed" };
        return thunkAPI.rejectWithValue(cr);
      }
      //catch request timeout or cancelled
      if (error.message === "Aborted") {
        //return user friendly message to reducer :rejected
        const cr = {
          message: "Network timed out. Check your network and retry.",
        };
        return thunkAPI.rejectWithValue(cr);
      } else {
        //every other error should fail gracefully
        const cr = { message: "Something went wrong" };
        return thunkAPI.rejectWithValue(cr);
      }
    }
  }
);

const dataReducer = createSlice({
  name: "apidata",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },

  extraReducers: {
    [fetchData.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.feeds = action;
    },
    [fetchData.pending]: (state, action) => {
      state.isFetching = true;
    },
    [fetchData.rejected]: (state, action) => {
      state.errorMessage = action.error.message;
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearState } = dataReducer.actions;
export const userSelector = (state) => state.apidata;
export const selectLoader = (state) => state.apidata.isFetching;
export default dataReducer.reducer;
