// Work in Progress - Trey
// npm install nodemon mysql express
// File where main server code will go


const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');
require('dotenv/config');
const pool = require('./config/db.js');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// app.use('/', routesHandler);

pool.getConnection( (err,conn) => {
    if (err) throw err;
    const qry = 'INSERT INTO course(course_crn, course_subject, course_name, course_description, course_term, course_credits) VALUES(?,?,?,?,?,?)';
    conn.query(qry, ['33991','CS','Operating Systems I','Intro to Op. Systems','W22','4'], (err, result) => {
        conn.release();
        if (err) throw err;
        console.log(result);
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});
