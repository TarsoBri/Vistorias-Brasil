export interface Clients {
  _id?: string;
  surveyor?: boolean;
  email: string;
  phone: string;
  password?: string;
  firstName: string;
  status?: boolean;
  address: {
    CEP: string;
    state: string;
    city: string;
    road?: string;
    number?: number;
    reference?: string;
  };
  created_at?: string;
  update_at?: string;
}
