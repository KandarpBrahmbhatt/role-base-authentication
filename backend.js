import express from "express"
import dotenv from 'dotenv'
import coonectDB from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
// import roleRouter from "./routes/role.routes.js";

dotenv.config()

const app = express()
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user", userRouter);
// app.use("/api/role",roleRouter)
// app.use("/api/users", userRouter);
const port = process.env.PORT || 8080
app.listen(port,()=>{
    console.log(`Server is started at ${port}`)
    coonectDB()
})
export default app