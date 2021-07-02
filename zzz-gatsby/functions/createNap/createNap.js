// details: https://markus.oberlehner.net/blog/implementing-an-authentication-flow-with-passport-and-netlify-functions/
const honeycomb = require(`honeycomb-beeline`)({
  writeKey: `d8bb4142564cc735bf670dee48fca396`,
  dataset: `naptimeLocal`,
  serviceName: `createNap`,
  // ... additional optional configuration ...
})
const bodyParser = require(`body-parser`)
const cookieParser = require(`cookie-parser`)
const express = require(`express`)
const passport = require(`passport`)
const serverless = require(`serverless-http`)
const faunadb = require(`faunadb`)

require(`./utils/auth`)

const { ENDPOINT } = require(`./utils/config`)

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(passport.initialize())

app.get(`${ENDPOINT}/user`, passport.authenticate(`jwt`, { session: false }), (req, res) => {
  const q = faunadb.query
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  })
  return client.query(q.Paginate(q.Match(q.Index(`users_by_email`), req.user.email))).then((ret) => {
    client.query(q.Get(ret.data[0])).then((fres) => {
      const userData = fres.data
      return res.json(userData)
    })
  })
  // return res.json(userProfile)
})

app.post(`${ENDPOINT}`, passport.authenticate(`jwt`, { session: false }), (req, res) => {
  const q = faunadb.query
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  })
  return client
    .query(q.Create(q.Collection(`naps`), { data: { ...req.body, user: req.user.email } }))
    .then((response) => {
      console.log(`success`, response)
      /* Success! return the response with statusCode 200 */
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      }
    })
    .catch((error) => {
      console.log(`error`, error)
      /* Error! return the error with statusCode 400 */
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      }
    })
})

module.exports.handler = serverless(app)
