const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

const port = 4000;

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'password',
    database:'CRUDDatabase'
})
app.get("/api/get",(req,res)=>{
    const sqlSelect = `SELECT * FROM MovieReviews`;
      db.query(sqlSelect,(err,result)=>{
        console.log(result);
        res.json(result);
    })
   
   

})

app.post("/api/insert",(req,res)=>{
    const movieName = req.body.movieName;
    const review = req.body.review;
    const sqlInsert = `INSERT INTO MovieReviews (Movie_Name, Movie_Review) VALUES ( '${movieName}' , '${review}');`
    db.query(sqlInsert,(err,result)=>{
        console.log(err);
    })
})
app.listen(port,()=>{
    console.log("running on port "+port);
})

// const sqlInsert = "INSERT INTO MovieReviews (Movie_Name, Movie_Review) VALUES ('inception','Good Movie');"
//     db.query(sqlInsert,(err,result)=>{
//         res.send("your in home"+" "+ err);

//     })