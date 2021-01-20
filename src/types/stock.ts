export interface Stock {
  id: string
  externalId: string
  quantity: number
  cost: number
  quantityMin: number
  unitSalePrice: number
  expanses: number
  provider: string
}

export interface StockInbound {
  id: string
  stockId: string
  eventAt: string
  inboundQuantity: number
  status: string
}
