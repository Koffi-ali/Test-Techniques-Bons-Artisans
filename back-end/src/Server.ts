import express from 'express'
import session from 'express-session'
import passport from 'passport'
import BaseRouter from './routes'
import env from './envalid'
const app = express()
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: env.SESSION_SECRET,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: true,
    cookie: { maxAge: 43200000, httpOnly: false }
  }))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', BaseRouter)

export default app