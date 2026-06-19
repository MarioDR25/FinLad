export interface WalletData {
  id: string;
  name: string;
  tag: string;
  icon: string;
  description: string;
  balance: number;
}

export interface Transaction {
  id: string;
  amount: number;
  type: string;
  category: string;
  wallet: string;
  description: string;
  date: string;
}

export interface ExpensesCategory {
  category:   string;
  total:      number;
  percentage: number;
}


export interface MonthlyTransactions {
  month:  string;
  amount: number;
}

export interface TotalData {
  id: string;
  name: string;
  icon: string;
  balance: number;
}