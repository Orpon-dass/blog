const express =require("express");
const dotenv =require("dotenv");
const route =require("./routes/router");
const dbConnection = require("./database/db.connection");
const bodyParser =require('body-parser');
const fileUpload = require('express-fileupload');

const app = express();
dotenv.config();
const port = process.env.PORT ||3000;
//parse body parser
app.use(bodyParser.json());
//use express file upload
app.use(fileUpload());
//make public folder for client
app.use(express.static("public"));
var cors = require('cors');
app.use(cors({
    origin:"*",
}));
//connection of mongo db 
dbConnection();
app.use('/',route);
// start app
app.listen(port,()=>{
 console.log(`server is start on http://localhost:${port}`)
});