export type AccountStatement = {
  itemsTotal: number;
  results: AccountStatementItemWrapper[];
};
export type AccountStatementItemWrapper = {
  date: string;
  amountTotal: number;
  items: AccountStatementItem[];
};
export type AccountStatementItem = {
  status: keyof typeof Status;
  actor: string;
  amount: number;
  source: keyof typeof Source;
  type: keyof typeof Type;
  entry: keyof typeof Entry;
  scheduled: boolean;
  dateEvent: string;
};
enum Status {
  COMPLETED = "COMPLETED",
  REFUNDED = "REFUNDED",
  PENDING = "PENDING",
}
enum Source {
  TRANSFER = "TRANSFER",
  PAYMENT = "PAYMENT",
}
enum Type {
  BANKSLIP = "BANKSLIP",
  INTERNAL = "INTERNAL",
  EXTERNAL = "INTERNAL",
}
enum Entry {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}
