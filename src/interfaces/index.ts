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

export type Tabs = {
  items: any;
  type: "pill";
  onChange: Function;
};

export enum AccountStatementFilterStatus {
  ALL = "Tudo",
  CREDIT = "Entradas",
  DEBIT = "Saídas",
  FUTURE = "Futuro",
}
export type AccountStatementFilter = {
  navigation: AccountStatementFilterStatus[];
};

export type Search = {
  onChange: Function;
};

export type Timeline = {
  [key: string]: AccountStatementItemWrapper;
};

export type TimelineItem = {
  item: AccountStatementItemWrapper;
  isHead: boolean;
};
