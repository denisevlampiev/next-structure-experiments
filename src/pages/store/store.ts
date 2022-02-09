import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { productModel } from 'entities/product';

export const store = configureStore({
    reducer: {
        // TODO: не работает выведение типа для редьюсера
        // [productModel.productSliceName]: productModel.productsReducer,
        products: productModel.productsReducer,
    },
});

declare global {
    type AppDispatch = typeof store.dispatch
    type AppState = ReturnType<typeof store.getState>
    type AppThunk<ReturnType = void> = ThunkAction<
        ReturnType,
        AppState,
        unknown,
        Action<string>
        >
}
