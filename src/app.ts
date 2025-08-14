/* eslint-disable @typescript-eslint/no-explicit-any */
import express, {  Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { envVars } from "./app/config/env";


const app = express()

app.use(express.json())
app.set("trust proxy", 1)
app.use(cors({
  origin: envVars.FRONTEND_URL,
  credentials: true
}))


app.use("/api/v1", router)


app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "welcome To Tour Ride Booking System Backend"
  })
})



export default app;