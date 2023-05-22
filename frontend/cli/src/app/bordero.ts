import { Customer } from "./customer";
import { Performance } from "./performance";

export interface Bordero {
  id: number;

  date: Date;

  customer: Customer;

  performances: Performance[];
}
