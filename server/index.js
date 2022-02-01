// Work in Progress - Trey
// File where main server code will go
const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'roadmap123',
    //database: 'myOSUroadmap'
});

db.connect(() => {
    console.log('MySQL connected');
})

const app = express();

app.get('/createdb', (req,res) => {
    let sql = 'CREATE DATABASE myOSUroadmap';
    db.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.send('database is created...');
    })
})

app.listen('3002', () => {
    console.log('Server is listening on port 3001')
})
