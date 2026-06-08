export interface WalletData {
  id: string;
  name: string;
  tag: string;
  icon: string;
  description: string;
  balance: number;
}
export interface TransactionResponse {
  id: number;
  icon: string;
  description: string;
  category: string;
  wallet: string;
  amount: number;
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
