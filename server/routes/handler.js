const express = require('express');
const router = express.Router();
const pool = require('../config/db.js');

router.get('/courses', async (req, res) => {
    pool.getConnection( (err, conn) => {
        if (err) throw err;

        try {
            const qry = `SELECT c.course_name, c.course_crn FROM course`
            conn.query(qry, (err, result) => {
                conn.release();
                if (err) throw err;
                res.send(JSON.stringify(result));
            })
        } catch (err) {
            console.log(err);
            res.end();
        }
    });
}); 

router.post('/addcourses')

module.exports = router;