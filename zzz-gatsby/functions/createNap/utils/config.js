// lambda/utils/config.js

exports.ENDPOINT = process.env.NODE_ENV === `development` ? `/.netlify/functions/createNap` : `/api/createNap`

exports.SECRET = process.env.SECRET || `SUPERSECRET`
