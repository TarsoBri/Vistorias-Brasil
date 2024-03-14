export interface Clients {
  _id?: string;
  email: string;
  password: string;
  firstName: string;
  status: boolean;
  address: {
    CEP: number;
    state: string;
    city: string;
    road: string;
    number?: number;
    reference?: string;
  };
  created_at?: Date;
  update_at?: Date;
}
