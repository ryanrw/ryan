# Ryan

Ryan is the easy sql builder. Nothing else.

# How to use

1. Install Ryan

`yarn add -D Ryan`

2. Import and use

## Example

```ts
import Ryan from "ryan"

// Note that you must always build the query using BuildQuery()
// Or else it will give you an query object
const query = Ryan.select("user")
  .from("table")
  .buildQuery()

console.log(query)
// result:
// "SELECT `user` FROM `table`
```
