const express = require("express")
const app = express()
const dotenv = require("dotenv").config()

const errorHandler = require("./middleware/errorHandler")

const port = process.env.PORT || 5000

app.get("/api/contacs", require("./routes/contactRoutes"))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
