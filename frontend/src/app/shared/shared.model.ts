export interface WalletData {
  id: string;
  name: string;
  tag: string;
  icon: string;
  description: string;
  balance: number;
}

export interface Transaction {
  id: number;
  icon: string;
  description: string;
  category: string;
  wallet: string;
  amount: number;
}
