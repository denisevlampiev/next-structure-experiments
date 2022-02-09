import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
// TODO: Посмотреть норм ли делать импорты с глубокой вложенностью
import { Product } from 'shared/api/product/product.models';

export const productsEntityAdapter = createEntityAdapter<Product>({
    selectId: (article) => article.id,
});

const productsSlice = createSlice({
    name: 'products',
    reducers: {},
    initialState: productsEntityAdapter.getInitialState(),
    extraReducers: (builder) => {},
});

export const productsReducer = productsSlice.reducer;
export const productSliceName = productsSlice.name;
