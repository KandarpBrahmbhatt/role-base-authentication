import express from 'express'
import { login, sigup } from '../controller/auth.controller.js'

const authRouter = express.Router()

// Auth
authRouter.post("/signup", sigup)
authRouter.post("/login", login)


export default authRouter;