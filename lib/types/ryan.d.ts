export type CompareSymbol = "=" | "<" | "<=" | ">" | ">="
export type SQLExpression = "SELECT" | "FROM" | "WHERE"

export interface DataOption {
  data: string
  as: string
}

export interface DataToSet {
  data: string
  value: string
}
