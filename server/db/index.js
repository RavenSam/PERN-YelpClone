const { Pool } = require("pg")

require("dotenv").config()

// pools will use environment variables
const pool = new Pool()

module.exports = pool
