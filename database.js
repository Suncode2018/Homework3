// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const axios = require('axios');
// const sql = require('mysql2');
// const config = require('./connection/dbconfig');

// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());

// app.get("/", (req, res)=>{
//        res.send("API Homework 3");
// });

// app.post("/students", async (req, res) => {
//     // ส่งข้อมูลผ่าน body-parser (Middleware)
//     const name = req.body.name;
//     const age = req.body.age;
//     const phone = req.body.phone;
//     const email = req.body.email;

//     // validating
//     if (name == null || name == "" || age == null || age == "" || phone == null || phone == "" || email == null || email == "" ) {
//         return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
//     }



//     res.json({ "name": name }); 

//  });
 

// // app.post("/students", async function(req, res) {
// //     const name = req.body.name;
// //     const age = req.body.age;
// //     const phone = req.body.phone;
// //     const email = req.body.email;

// //     res.json({"name":name , "age":age , "phone": phone , "email": email });
// //     // res.json({ "name": name });
// //     // res.status(200).json({status: '200', message: 'Get User Success ...'});

// // });



// app.listen(3000, ()=> {
//     console.log ("Server is running on port 3000");
//  });
 
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Middleware - บอกวิธีการที่ client ส่งข้อมูลผ่าน middleware
app.use(bodyParser.urlencoded({extended:false})) // ส่งผ่าน Form
app.use(bodyParser.json()) // ส่งด้วย Data JSON

const mysql = require("mysql2/promise");
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root', // <== ระบุให้ถูกต้อง
    password: '',  // <== ระบุให้ถูกต้อง
    database: 'student_database',
    port: 3306  // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)
});

//  GET students

app.get('/', async (req,res) => {
    res.send("API Homework 3");
});

app.post("/students", async (req, res) => {
    // ส่งข้อมูลผ่าน body-parser (Middleware)
    const name = req.body.name;
    const age = req.body.age;
    const phone = req.body.phone;
    const email = req.body.email;

    const connection = await dbConn
    const rows = await connection.query("insert into students (name,age,phone,email) values('"+name+"','"+age+"',"+phone+",'"+email+"')")
    res.status(201).send(rows)
})

app.listen(3000, ()=> {
    console.log ("Server is running on port 3000");
 });
 
 