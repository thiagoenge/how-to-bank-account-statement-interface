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
export enum Status {
  COMPLETED = "COMPLETED",
  REFUNDED = "REFUNDED",
  PENDING = "PENDING",
}
export enum Source {
  TRANSFER = "TRANSFER",
  PAYMENT = "PAYMENT",
}
export enum Entry {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}
enum Type {
  BANKSLIP = "BANKSLIP",
  INTERNAL = "INTERNAL",
  EXTERNAL = "INTERNAL",
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

type TimelineParsedDate = {
  dateParsed: string;
};
export type Timeline = {
  [key: string]: AccountStatementItemWrapper & TimelineParsedDate;
};

export type TimelineItemHead = {
  date: string;
  amountTotal: number;
  isFirst: boolean;
};
export type TimelineItemTransactions = {
  items: AccountStatementItem[];
};

export type TransactionType = {
  status: keyof typeof Status;
  source: keyof typeof Source;
  entry: keyof typeof Entry;
};

export enum TransactionTypesMap {
  "COMPLETED.PAYMENT.DEBIT" = "Pagamento Realizado",
  "COMPLETED.TRANSFER.DEBIT" = "Transferencia Realizada",
  "COMPLETED.PAYMENT.CREDIT" = "Pagamento Recebido",
  "COMPLETED.TRANSFER.CREDIT" = "Transferencia Recebida",
  "PENDING.PAYMENT.DEBIT" = "Pagamento Agendado",
  "PENDING.TRANSFER.DEBIT" = "Transferencia Agendada",
  "REFUNDED.PAYMENT.CREDIT" = "Pagamento Estornado",
  "REFUNDED.TRANSFER.CREDIT" = "Transferencia Estornada",
}
