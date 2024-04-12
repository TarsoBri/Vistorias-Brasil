import { Clients } from "./Clients";

export interface UpdateStatus
  extends Omit<
    Clients,
    "email" | "phone" | "firstName" | "password" | "address"
  > {}
