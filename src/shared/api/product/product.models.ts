import * as D from 'io-ts/Decoder';

export type ProductDto = {
    id: number;
    title: string;
    price: number;
};

export const productCodec = D.struct({
    id: D.number,
    title: D.string,
    price: D.number,
});

export type Product = D.TypeOf<typeof productCodec>;
