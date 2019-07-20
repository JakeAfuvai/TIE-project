const express = require("express")
const app = express()
require("dotenv").config()
const morgan = require("morgan")
const mongoose = require("mongoose")
const expressJwt = require("express-jwt")
const secret = process.env.SECRET || "ow now brown cow"
const PORT = process.env.PORT || 5000
const path = require("path")

app.use(morgan("dev"))
app.use(express.json())
app.use("/api", expressJwt({ secret: secret }))
app.use(express.static(path.join(__dirname, "client", "build")))

//connect to db
mongoose.set("useCreateIndex", true)
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/tie-project",
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, (err) => {
        if (err) throw err
        console.log("Connected to the database")
    }
)

app.use("/auth", require("./routes/auth"))
app.use("/api/player", require("./routes/playerRoute"))
app.use("/api/helmet", require("./routes/helmetRoute"))
app.use("/api/shoulderpad", require("./routes/shoulderpadRoute"))

app.use((err, req, res, next) => {
    console.error(err)
    if (err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({ message: err.message })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Starting server on port ${PORT}`)
})