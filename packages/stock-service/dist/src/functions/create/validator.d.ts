import * as yup from 'yup';
export declare function stockCreateValidator<T = object>(body: T): Promise<import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<Record<string, yup.AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>>, {
    external_id: import("yup/lib/string").RequiredStringSchema<string | undefined, Record<string, any>>;
    quantity: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
    cost: yup.NumberSchema<number, Record<string, any>, number>;
    quantity_min: yup.NumberSchema<number, Record<string, any>, number>;
    unit_sale_price: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
    expanses: yup.NumberSchema<number, Record<string, any>, number>;
    provider: yup.StringSchema<string | undefined, Record<string, any>, string | undefined>;
}>>>;
//# sourceMappingURL=validator.d.ts.map