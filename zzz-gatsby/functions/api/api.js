// details: https://markus.oberlehner.net/blog/implementing-an-authentication-flow-with-passport-and-netlify-functions/

const bodyParser = require(`body-parser`)
const cookieParser = require(`cookie-parser`)
const express = require(`express`)
const passport = require(`passport`)
const serverless = require(`serverless-http`)
const faunadb = require(`faunadb`)

require(`./utils/auth`)

const { COOKIE_SECURE, ENDPOINT } = require(`./utils/config`)

const app = express()

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(passport.initialize())

const handleCallback = () => (req, res) => {
  res.cookie(`jwt`, req.user.jwt, { httpOnly: true, COOKIE_SECURE }).redirect(`/onboarding`)
}

app.get(`${ENDPOINT}/auth/slack`, passport.authorize(`Slack`))
app.get(`${ENDPOINT}/auth/magic`, passport.authorize(`Magic`))
app.get(
  `${ENDPOINT}/auth/slack/callback`,
  passport.authenticate(`Slack`, { failureRedirect: `/login` }),
  handleCallback()
)

// Example request
app.get(`${ENDPOINT}/auth/status`, passport.authenticate(`jwt`, { session: false }), (req, res) => {
  res.json({ email: req.user.email })
})

module.exports.handler = serverless(app)
