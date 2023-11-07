const maria = require('mysql');
//const maria = require('mysql2');

const con = maria.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'corcpz',
    database: 'bookcheck'
})

con.connect((err) => {
    if (err) throw err;
    console.log("----- DB Connected! -----");
});



//---------------------------------------------------------------------------
//query part

// con.query('SELECT * FROM user_info', (err, res) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(res);
// });

// con.query('SELECT book_name FROM book_info WHERE book_isbn LIKE '%9791191056556%';', (err, res) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log('책제목: ' + res);
// });


// async function GetUserList(){
//     let con, rows;
//     try{
//         con = await pool.getConnection();
//         con.query('USE BOOKCHECK');
//         rows = await con.query('SELECT * FROM user_info');
//     }
//     catch(err){
//         throw err;
//     }
//     finally{
//         if (con) con.end();
//         return rows[0];
//     }
// }







module.exports = con;