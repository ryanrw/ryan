import Ryan from "../lib/"

describe("`SELECT` Query", () => {
  it("Should build `SELECT` with `FROM` SQL query correctly", () => {
    const query = Ryan.select("user")
      .from("test")
      .buildQuery()

    expect(query).toBe("SELECT `user` FROM `test`")
  })

  it("Should build array input and return correctly", () => {
    const firstQuery = Ryan.select("userid", "username")
      .from("test")
      .buildQuery()

    expect(firstQuery).toBe("SELECT `userid`, `username` FROM `test`")

    const secondQuery = Ryan.select("userid", "username")
      .from("test", "test2")
      .buildQuery()

    expect(secondQuery).toBe("SELECT `userid`, `username` FROM `test`, `test2`")
  })

  it("Should build `SELECT` with `AS` expression", () => {
    const query = Ryan.select({ data: "c.id", as: "company_id" }, "test")
      .from({ data: "company", as: "c" }, "table")
      .buildQuery()

    expect(query).toBe(
      "SELECT `c.id` AS `company_id`, `test` FROM `company` AS `c`, `table`"
    )
  })
})
