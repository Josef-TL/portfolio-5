const express = require('express');
const cors = require('cors');
const db = require('mysql2');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const connection = db.createConnection({
    host:"localhost",
    user:"root",
    password:"c@_@*u-YGTKcxrc4Fp!6",
    database:"cafes"
});

app.get('/cafes',(req,res)=>{
    let queryParameterName = "";
    let queryParameterCity = "";

    if (req.query.cafename !== undefined) queryParameterName = req.query.cafename;
    if (req.query.cafecity !== undefined) queryParameterCity = req.query.cafecity;

    const q = "SELECT * FROM cafes WHERE (cafe_name LIKE ?) AND (city LIKE ?)"
    connection.query(q,[queryParameterName+"%",queryParameterCity+"%"], (error, results)=>{
        res.send(results);
    })
});

app.get('/users',(req,res)=>{
    let queryParameter = ""
    if (req.query.username !== undefined) queryParameter = req.query.username

    const q = "SELECT * FROM users WHERE (user_name LIKE ?)";
    connection.query(q,[queryParameter+"%"], (error, results)=>{
        res.send(results);
    })
});

app.get('/cafes/id/:id',(req,res)=>{
    const queryParameter = req.params.id;
    connection.query(`SELECT * FROM cafes WHERE cafe_id = ?`,[queryParameter], (error, results)=>{
        res.send(results);
    })
});

app.get('/users/id/:id',(req,res)=>{
    const queryParameter = req.params.id;
    connection.query(`SELECT * FROM users WHERE user_id = ?`,[queryParameter], (error, results)=>{
        res.send(results);
    })
});


app.post('/cafes/new',(req,res)=>{

    const name =  req.body.cafe_name;
    const type =  req.body.type;
    const city =  req.body.city;
    const cost =  req.body.cost;
    const study = req.body.study;


    connection.query('INSERT INTO cafes(cafe_name,city,cost,`type`,study) VALUES(?,?,?,?,?)',
        [name,city,cost,type,study],
        (error,result)=>{
            res.send("Successful POST request");
        });
});

app.post('/users/new',(req,res)=>{

    const uName =  req.body.uName;
    const fName =  req.body.fName;
    const lName =  req.body.lName;
    const email =  req.body.email;

    // Dette er opgave A
    connection.query('INSERT INTO users(user_name,first_name,last_name,email)  VALUES(?,?,?,?)',
        [uName,fName,lName,email],
        (error,result)=>{
            res.send("Successful POST request");
        });
});

app.get('*',(req,res) =>{
    res.sendStatus(404);
});

app.listen(port, ()=>{
    console.log("Hey guys we are officially LIVE !!!!");
});