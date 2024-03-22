import { Clients } from "./Clients";

export default interface UpdateStatus
  extends Omit<
    Clients,
    "email" | "phone" | "firstName" | "password" | "address"
  > {}
