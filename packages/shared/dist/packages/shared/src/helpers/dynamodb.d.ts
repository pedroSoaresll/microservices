import { DynamoDB } from 'aws-sdk';
export declare function getItems(params: DynamoDB.GetItemInput): Promise<import("aws-sdk/lib/request").PromiseResult<DynamoDB.GetItemOutput, import("aws-sdk").AWSError>>;
export declare function updateItems(params: DynamoDB.UpdateItemInput): Promise<import("aws-sdk/lib/request").PromiseResult<DynamoDB.UpdateItemOutput, import("aws-sdk").AWSError>>;
//# sourceMappingURL=dynamodb.d.ts.map