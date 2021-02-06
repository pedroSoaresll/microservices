export declare type StockKeys = 'id' | 'externalId' | 'quantity' | 'cost' | 'quantityMin' | 'unitSalePrice' | 'expanses' | 'provider';
export interface Stock {
    id: string;
    externalId: string;
    quantity: number;
    cost: number;
    quantityMin: number;
    unitSalePrice: number;
    expanses: number;
    provider: string;
}
export declare type StockEventStatus = 'PENDING' | 'ACCOUNTED';
export declare type StockInboundKeys = 'id' | 'stockId' | 'eventAt' | 'inboundQuantity' | 'status';
export interface StockInbound {
    id: string;
    stockId: string;
    eventAt: string;
    inboundQuantity: number;
    status: StockEventStatus;
}
export declare type StockOutboundKeys = 'id' | 'stockId' | 'eventAt' | 'outboundQuantity' | 'status';
export interface StockOutbound {
    id: string;
    stockId: string;
    eventAt: string;
    outboundQuantity: number;
    status: StockEventStatus;
}
//# sourceMappingURL=stock.d.ts.map