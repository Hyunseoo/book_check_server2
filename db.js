const maria = require('mysql');
//const maria = require('mysql2');

const con = maria.createConnection({
    host: '127.0.0.1',
    port: 3500,
    user: 'root',
    password: 'pw',   // 디비 비번 입력!!
    database: 'bookcheck'
})

con.connect((err) => {
    if (err) throw err;
    console.log("----- DB Connected! -----");
});


//---------------------------------------------------------------------------
//query part

// con.query(
//     'SELECT bi.book_title, bi.book_cover FROM book_report br JOIN book_info bi ON br.book_isbn = bi.book_isbn WHERE br.user_id = ?',
//      [id = '34'],
//     (error, results, fields) => {
//         if (error) {
//             console.error('에러 발생:', error);
//             //res.status(500).send('책 정보를 불러오는 도중 오류가 발생했습니다.');
//     } else {
//         console.log(results.book_title);
//         //res.status(200).json(results);
//     }
// });

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


module.exports = con;