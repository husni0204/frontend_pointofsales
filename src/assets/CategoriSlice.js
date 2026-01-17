import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../auth/AxiosConfig.jsx";

let reqOptionalGetALl = {
    url: "/api/categories",
    method: "GET",
};

export const getAllCategories = createAsyncThunk(
    "categories/getAllCategories",
    async () => {
        try {
            const response = await axiosInstance(reqOptionalGetALl);
            return response.data.result;
        } catch (error) {
            const data = JSON.parse(error.request.response);
            throw new Error(data ? data.message : error.message);
        }
    }
);

const categorySlice = createSlice({
    name: "categories",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default categorySlice.reducer;