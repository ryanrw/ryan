import Ryan from "../lib/"

describe("`UPDATE` query", () => {
  it("Should build `UPDATE` query with single set of data correctly", () => {
    const query = Ryan.update(`table`)
      .set({ data: "username", value: "ryan" })
      .buildQuery()

    expect(query).toBe(`UPDATE \`table\` SET username='ryan'`)
  })

  it("Should build `UPDATE` query with multiple set of data correctly", () => {
    const query = Ryan.update(`table`)
      .set(
        { data: "userid", value: "xxxx" },
        { data: "username", value: "ryan" }
      )
      .buildQuery()

    expect(query).toBe(`UPDATE \`table\` SET userid='xxxx', username='ryan'`)
  })

  it("Should build `UPDATE` query with `WHERE` expression correctly", () => {
    const query = Ryan.update(`table`)
      .set({ data: "username", value: "ryan" })
      .where("x", "=", "3")
      .buildQuery()

    expect(query).toBe(`UPDATE \`table\` SET username='ryan' WHERE x = 3`)
  })
})
