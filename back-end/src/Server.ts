import express from 'express'
import session from 'express-session'
import passport from 'passport'
import BaseRouter from './routes'

const app = express()
app.use(session({
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: true,
    cookie: { maxAge: 43200000, httpOnly: false }
  }))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', BaseRouter)

export default app