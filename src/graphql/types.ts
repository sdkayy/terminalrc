export interface UserExchangeData {
    id: string;
    userAddress: string;
    uniTokenBalance: number;
}

export interface Transaction {
    id: string;
    event: string;
    block: number;
    timestamp: string;
    tokenSymbol: string;
    ethAmount: number;
    tokenAmount: number;
    fee: number;
}

export interface UniswapUsersType {
    id: string;
    exchangeBalances: UserExchangeData[];
    transactions: Transaction[];
}