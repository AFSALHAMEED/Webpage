const express = require("express")
require("dotenv").config()
var favicon = require('serve-favicon')
const db = require("./config/db.config")
const app = express()
const cors = require("cors")
const details = require("./urlRoute/urlRoute")

app.use(cors())
app.use(express.json())


app.use("/api/user",details)
const port =  process.env.PORT || 5000 

const path = require("path");
if(process.env.NODE_ENV === "production")
{
    app.use(express.static("client/build"));
  
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
    });
}

app.listen(port,()=>console.log(`server running at ${port}`))
