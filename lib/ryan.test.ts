import { Ryan } from "./ryan"

describe("Ryan SQL Builder", () => {
  it("Should build `SELECT` with `FROM` SQL query correctly", () => {
    const ryan = new Ryan()

    const { query } = ryan.select("user").from("test")

    expect(query).toBe("SELECT `user` FROM `test`")
  })

  it("Should build `SELECT` array with `FROM` SQL query correctly", () => {
    const ryan = new Ryan()

    const { query } = ryan.select("userid", "username").from("test")

    expect(query).toBe("SELECT `userid`, `username` FROM `test`")
  })

  it("Should build `SELECT` array with `FROM` array SQL query correctly", () => {
    const ryan = new Ryan()

    const { query } = ryan.select("userid", "username").from("test", "test2")

    expect(query).toBe("SELECT `userid`, `username` FROM `test`, `test2`")
  })
})
