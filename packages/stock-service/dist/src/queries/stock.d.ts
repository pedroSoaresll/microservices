import { DynamoDB } from 'aws-sdk';
export declare function queryGetStockBy(id: string): DynamoDB.GetItemInput;
export declare function queryUpdateStockQuantityBy(id: string, newQuantity: string): DynamoDB.UpdateItemInput;
//# sourceMappingURL=stock.d.ts.map