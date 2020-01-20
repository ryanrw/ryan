import { CompareSymbol, SQLExpression } from "./types/ryan"

export class Ryan {
  query: string

  select(...data: string[]): this {
    const prettifyData = this.prettify(data)

    this.query = this.concatCurrentQueryWith(`SELECT${prettifyData}`)

    return this
  }

  from(...table: string[]): this {
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

  prettify(data: string): string
  prettify(data: string[]): string[]
  prettify(data: any): any {
    const isArray = Array.isArray(data)

    if (isArray) {
      return data.map((item: string) => ` \`${item}\``)
    }

    return `\`${data}\``
  }

  concatCurrentQueryWith(newData: string): string {
    const hasData = this.query !== undefined && this.query !== ""

    if (hasData) {
      return `${this.query} ${newData}`
    }

    return newData
  }

  isExpressionInclude(expression: SQLExpression): boolean {
    const whereRegExp = new RegExp(expression, "g")
    const isInclude = whereRegExp.test(this.query)

    return isInclude
  }
}
