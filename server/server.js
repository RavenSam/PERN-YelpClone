const express = require("express")
const cors = require("cors")

// Init app
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/v1/restaurants", require("./routes/api-v1/restaurants"))
app.use("/api/v1/reviews", require("./routes/api-v1/reviews"))

// Server
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`> Server Running on Port ${port}`))
