/* eslint-disable @typescript-eslint/no-explicit-any */
import express, {  Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";


const app = express()

app.use(express.json())
app.use(cors())


app.use("/api/v1", router)


app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "welcome To Tour Ride Booking System Backend"
  })
})



export default app;