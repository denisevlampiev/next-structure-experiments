import { fakeFetch } from '../fake-fetch';
import * as D from 'io-ts/Decoder';
import { isLeft } from 'fp-ts/Either';
import { Product, ProductDto, productCodec } from './product.models';

const products: ProductDto[] = [
    {
        id: 1,
        title: 'First product',
        price: 1234567,
    },
    {
        id: 2,
        title: 'Second product',
        price: 1234567,
    },
    {
        id: 3,
        title: 'Third product',
        price: 1234567,
    },
];

const ERROR_PRODUCT_NOT_FOUND = 'Product not found (404)';

export function createProductFromDto(productDto: ProductDto): Product {
    const productOrError = productCodec.decode(productDto);

    if (isLeft(productOrError)) {
        const message = 'Invalid Product structure:\n ' + D.draw(productOrError.left);
        throw new Error(message);
    }

    return productOrError.right;
}

export async function fetchProductById(productIdInvalidated: number | string): Promise<Product> {
    const productId = Number(productIdInvalidated);
    const productOrUndefined = products.find((product) => product.id === productId);
    const productOrError = productOrUndefined || new Error(ERROR_PRODUCT_NOT_FOUND);

    const response = await fakeFetch(productOrError);

    if (response instanceof Error) {
        return Promise.reject(response);
    }

    return createProductFromDto(response);
}
