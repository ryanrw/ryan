import Ryan from "../lib/"

describe("`LIMIT` query", () => {
  it("Should build query correctly", () => {
    const query = Ryan.select("user")
      .from("table")
      .limit(3)
      .buildQuery()

    expect(query).toBe("SELECT `user` FROM `table` LIMIT 3")
  })
})
