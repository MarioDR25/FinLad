export interface WalletData {
  icon: string;
  tag: string;
  label: string;
  balance: string;
}


export interface Transaction {
  id: number;
  icon: string;
  description: string;
  category: string;
  wallet: string;
  amount: number;
}
