import * as yup from 'yup';
export declare function stockInboundValidator<T = object>(body: T): Promise<import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<Record<string, yup.AnySchema<any, any, any> | import("yup/lib/Reference").default<unknown> | import("yup/lib/Lazy").default<any, any>>, {
    inbound_quantity: import("yup/lib/number").RequiredNumberSchema<number | undefined, Record<string, any>>;
    event_at: yup.DateSchema<Date | undefined, Record<string, any>, Date | undefined>;
}>>>;
//# sourceMappingURL=validator.d.ts.map