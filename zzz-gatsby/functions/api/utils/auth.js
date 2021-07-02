const { sign } = require(`jsonwebtoken`)
const { Strategy: SlackStrategy } = require(`passport-slack-oauth2`)
const passport = require(`passport`)
const passportJwt = require(`passport-jwt`)
const faunadb = require(`faunadb`)
const jwt = require(`jsonwebtoken`)

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

const { ENDPOINT, BASE_URL, SLACK_CLIENT_ID, SLACK_CLIENT_SECRET, SECRET } = require(`./config`)
const { domain } = require(`process`)

function authJwt(email) {
  return jwt.sign({ user: { email } }, SECRET)
}

passport.use(
  `Slack`,
  new SlackStrategy(
    {
      clientID: SLACK_CLIENT_ID,
      clientSecret: SLACK_CLIENT_SECRET,
      callbackURL: `${BASE_URL}${ENDPOINT}/auth/slack/callback`,
      skipUserProfile: false, // default
      scope: [`identity.basic`, `identity.email`, `identity.avatar`, `identity.team`], // default
    },
    (accessToken, refreshToken, profile, done) => {
      // optionally persist user data into a database
      const userProfile = {
        name: profile.user.name,
        displayName: profile.displayName,
        email: profile.user.email,
        avatar: profile.user.image_512,
        accessToken: accessToken,
        refreshToken: refreshToken,
        provider: {
          name: profile.provider,
          userId: profile.id,
          teams: [
            {
              name: profile.team.name,
              domain: profile.team.domain,
              id: profile.team.id,
              email: profile.user.email,
              accessToken: accessToken,
              refreshToken: refreshToken,
            },
          ],
        },
      }

      client
        .query(q.Create(q.Collection(`users`), { data: userProfile }))
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
      // Here you'd typically create a new or load an existing user and
      // store the bare necessary informations about the user in the JWT.
      const jwt = authJwt(userProfile.email)

      return done(null, { userProfile, jwt })
    }
  )
)

passport.use(
  new passportJwt.Strategy(
    {
      jwtFromRequest(req) {
        if (!req.cookies) throw new Error(`Missing cookie-parser middleware`)
        return req.cookies.jwt
      },
      secretOrKey: SECRET,
    },
    (jwtPayload, done) => {
      try {
        // Here you'd typically load an existing user
        // and use the data to create the JWT.
        return client.query(q.Paginate(q.Match(q.Index(`users_by_email`), jwtPayload.user.email))).then((ret) => {
          client.query(q.Get(ret.data[0])).then((res) => {
            const userData = res.data
            const jwt = authJwt(userData.email)

            return done(null, { jwt, ...userData })
          })
        })
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})
