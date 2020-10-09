// lambda/utils/config.js
// Circumvent problem with Netlify CLI.
// https://github.com/netlify/netlify-dev-plugin/issues/147
exports.BASE_URL = process.env.NODE_ENV === `development` ? `http://localhost:8888` : process.env.BASE_URL

exports.COOKIE_SECURE = process.env.NODE_ENV !== `development`

exports.ENDPOINT = process.env.NODE_ENV === `development` ? `/.netlify/functions/api` : `/api`

exports.SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID
exports.SLACK_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET

exports.SECRET = process.env.SECRET || `SUPERSECRET`
