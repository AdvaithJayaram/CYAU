export interface Listing {
  id: number;
  title: string;
  type: string;
  price: number;
  metrics: {
    mrr?: number;
    revenue?: number;
    growth: number;
    customers: number;
    arpu?: number;
    margin?: number;
    ltv?: number;
    cac?: number;
    churnRate?: number;
  };
  description: string;
  location: string;
  industry: string;
  verified: boolean;
  documents: {
    name: string;
    type: string;
    url?: string;
  }[];
}