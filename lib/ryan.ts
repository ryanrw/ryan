type CompareSymbol = "=" | "<" | "<=" | ">" | ">=";
type SQLExpression = "SELECT" | "FROM" | "WHERE";

export class Ryan {
  query: string;

  select(...data: string[]): this {
    const prettifyData = this.prettify(data);
    this.query = this.concatOldDataWith(`SELECT${prettifyData}`);
    return this;
  }

  from(...table: string[]): this {
    const prettifyData = this.prettify(table);
    this.query = this.concatOldDataWith(`FROM${prettifyData}`);
    return this;
  }

  where(data1: string, compareWith: CompareSymbol, data2: string): this {
    if (this.isExpressionInclude("WHERE")) {
      this.query = this.concatOldDataWith(`${data1} ${compareWith} ${data2}`);
    } else {
      this.query = this.concatOldDataWith(
        `WHERE ${data1} ${compareWith} ${data2}`
      );
    }
    return this;
  }

  and(): this {
    this.query = this.concatOldDataWith(`AND `);
    return this;
  }

  limit(n: number): this {
    this.query = this.concatOldDataWith(`LIMIT ${n}`);
    return this;
  }

  prettify(data: string): string;
  prettify(data: string[]): string[];
  prettify(data: any): any {
    const isArray = Array.isArray(data);

    if (isArray) {
      return data.map((item: string) => ` \`${item}\``);
    }

    return `\`${data}\``;
  }

  concatOldDataWith(newData: string): string {
    const hasData = this.query !== undefined && this.query !== "";

    if (hasData) {
      return `${this.query} ${newData}`;
    }
    return newData;
  }

  isExpressionInclude(expression: SQLExpression): boolean {
    const whereRegExp = new RegExp(expression, "g");
    const isInclude = whereRegExp.test(this.query);

    return isInclude;
  }
}
