import {
  CompareSymbol,
  SQLExpression,
  DataOption,
  DataToSet,
} from "./types/ryan"

export class Ryan {
  private query: string = ""

  // Select Section
  select(...data: (string | DataOption)[]): this {
    const prettifyData = this.prettify(data)

    this.query = this.concatCurrentQueryWith(`SELECT${prettifyData}`)

    return this
  }

  from(...table: (string | DataOption)[]): this {
    const prettifyData = this.prettify(table)

    this.query = this.concatCurrentQueryWith(`FROM${prettifyData}`)

    return this
  }

  where(data1: string, compareWith: CompareSymbol, data2: string): this {
    if (this.isExpressionInclude("WHERE")) {
      this.query = this.concatCurrentQueryWith(
        `${data1} ${compareWith} ${data2}`
      )
    } else {
      this.query = this.concatCurrentQueryWith(
        `WHERE ${data1} ${compareWith} ${data2}`
      )
    }

    return this
  }

  and(): this {
    this.query = this.concatCurrentQueryWith(`AND `)

    return this
  }

  limit(n: number): this {
    this.query = this.concatCurrentQueryWith(`LIMIT ${n}`)

    return this
  }

  // Insert Section
  insertInto(tableName: string, column: string[]) {
    const prettifyData = this.roughlyPrettify(column)

    this.query = this.concatCurrentQueryWith(
      `INSERT INTO \`${tableName}\` (${prettifyData})`
    )

    return this
  }

  values(...valueList: string[]) {
    const prettifyData = this.roughlyPrettify(valueList)

    this.query = this.concatCurrentQueryWith(`VALUES (${prettifyData})`)

    return this
  }

  // Update section
  update(tableName: string) {
    this.query = this.concatCurrentQueryWith(`UPDATE \`${tableName}\``)

    return this
  }

  set(...data: DataToSet[]) {
    const prettifyData = data.map((item, index) =>
      index === 0
        ? `${item.data}='${item.value}'`
        : ` ${item.data}='${item.value}'`
    )

    this.query = this.concatCurrentQueryWith(`SET ${prettifyData}`)

    return this
  }

  buildQuery() {
    const query = this.query

    this.resetQuery()

    return query
  }

  private resetQuery() {
    this.query = ""
  }

  private concatCurrentQueryWith(newData: string): string {
    if (this.query) {
      return `${this.query} ${newData}`
    }

    return newData
  }

  private prettify(data: string): string
  private prettify(data: (string | DataOption)[]): string[]
  private prettify(data: any): any {
    const isArray = Array.isArray(data)

    if (isArray) {
      return this.SQLMapped(data)
    }

    return `\`${data}\``
  }

  private SQLMapped(data: (string | DataOption)[]) {
    const mappedData = data.map((item: string | DataOption) => {
      const hasDataOption = typeof item === "object"

      if (hasDataOption) {
        return this.dataOptionMapped(item as DataOption)
      }

      return ` \`${item}\``
    })

    return mappedData
  }

  private dataOptionMapped(item: DataOption) {
    const itemWithOption = item as DataOption

    return ` \`${itemWithOption.data}\` AS \`${itemWithOption.as}\``
  }

  private roughlyPrettify(data: string[]): string[] {
    return data.map((item, index) =>
      index === 0 ? `\`${item}\`` : ` \`${item}\``
    )
  }

  private isExpressionInclude(expression: SQLExpression): boolean {
    const whereRegExp = new RegExp(expression, "g")
    const isInclude = whereRegExp.test(this.query)

    return isInclude
  }
}
