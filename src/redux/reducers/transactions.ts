import {
    TRANSFER,
    Transaction
  } from '../types'

  const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return {
          transactions: []
        };
      }
      return {
        transactions: JSON.parse(serializedState).transactions
      };
    } catch (err) {
      return {
        transactions: []
      };
    }
  }; 

  const updateState = (transactions: any) => {
    localStorage.setItem('state', JSON.stringify({ transactions }))
  };

  interface TransactionInitialState {
      transactions: Transaction[];
  }
  
  const initialState: TransactionInitialState = loadState();
  
  const transaction = (state = initialState, action: any) => {
    console.log(state)
    switch (action.type) {
      case TRANSFER:
          state.transactions.push(action.transaction);
          updateState(state.transactions);
      default:
        return state
    }
  }
  
  export default transaction;
  