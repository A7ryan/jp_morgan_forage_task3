import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bond: number,
  lower_bond: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_ask.price) / 2;
    const ratio = priceABC / priceDEF;
    const upperBond = 1 + 0.05;
    const lowerBond = 1 - 0.05;
      return {
        price_abc: priceABC,
        price_def: priceDEF,
        ratio,
        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ?
            serverResponds[0].timestamp : serverResponds[1].timestamp,
        upper_bond: upperBond,
        lower_bond: lowerBond,
        trigger_alert: (ratio > upperBond || ratio < lowerBond) ? ratio : undefined,
      };
  }
}
