import express, { Request, Response } from "express";
// import dataSource from "./dataSource";
import Route from "./routes/index";
import cors from "cors"
import db from "./db"

const app = express()
const port = 4000
app.use(cors())
app.use(express.json())
app.use('/api/v1', Route)


app.get('/hello', (req: Request, res: Response) => {
  res.status(200).json({ data: "Success get data" })
})

app.listen(port, async () => {
  await db.$connect()
  console.log(`Server succes on PORT ${port}`)
})
