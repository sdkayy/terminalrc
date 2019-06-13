import { TRANSFER, Transaction } from './types'

export const createTransaction = (transaction: Transaction) => ({
  type: TRANSFER,
  transaction
});