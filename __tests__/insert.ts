import Ryan from "../lib/"

describe("`INSERT` query", () => {
  it("Should build `INSERT` query correctly", () => {
    const query = Ryan.insertInto(`table`, ["userid", "username"])
      .value("xxxx", "ryan")
      .buildQuery()

    expect(query).toBe(
      "INSERT INTO TABLE `table` (`userid`, `username`) VALUE (`xxxx`, `ryan`)"
    )
  })
})
