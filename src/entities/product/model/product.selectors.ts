import { productsEntityAdapter } from './product.slice';

export const {
    selectAll: allProductsSelector,
    selectById: productByIdSelector,
} = productsEntityAdapter.getSelectors<AppState>((state) => state.products);
