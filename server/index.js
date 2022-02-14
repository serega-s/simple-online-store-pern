import cors from "cors"
import config from "dotenv/config"
import express from "express"
import fileUpload from "express-fileupload"
import path from "path"
import { fileURLToPath } from "url"
import sequalize from "./db.js"
import errorHandler from "./middleware/ErrorHandlingMiddleware.js"
import router from "./routes/index.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

config

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.static(path.resolve(__dirname, "static")))
app.use(express.json())
app.use(fileUpload({}))
app.use("/api", router)

//
app.use(errorHandler)

const start = async () => {
  try {
    await sequalize.authenticate()
    await sequalize.sync()
    app.listen(PORT, () => console.log(`Server started on ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()

// app.listen(PORT, () => console.log(`Server started on ${PORT}`))
