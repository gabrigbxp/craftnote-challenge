// eslint-disable-next-line @typescript-eslint/no-var-requires
process.env.NODE_ENV !== "production" && require("dotenv").config()
import express from "express"
import routes from "./routes"
import { errorUse } from "./middlewares/errorHandler"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes) // or app.use("/", routes)

app.use(errorUse)

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
