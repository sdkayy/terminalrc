
export const TRANSFER = 'COIN_TRANSFER';

export interface Transaction {
    to: string;
    from: string;
    amount: number;
}