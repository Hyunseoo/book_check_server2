var express = require('express');
var router = express.Router();

var db = require('./db.js');

// 회원가입
router.post('/report', (req, res) => {    
    var id = req.body.id;
    var isbn = req.body.isbn;
    var report = req.body.report;
    console.log(id);
    console.log(isbn);
    console.log(report);
    db.query('SELECT * FROM book_report', (err, res) => {
        if (err) {
            console.log(err);
        }
    });
    if (id && isbn && report) {
        db.query(
            'SELECT * FROM book_report WHERE user_id = ? AND book_isbn = ?', 
        [id, isbn], (error, results, fields) => { // DB에 같은 도서가 있는지 확인
            if (error) throw error;

            if (results.length <= 0) {     // DB에 같은 도서가 없는 경우 독후감 등록
                db.query(
                    'INSERT INTO book_report (user_id, book_isbn, book_report) VALUES(?,?,?)', 
                [id, isbn, report], (error, data) => {
                    if (error) throw error;
                    res.send("독후감이 등록되었습니다!");
                });
            } else {     // DB에 같은 도서의 독후감이 있는 경우 업데이트
                db.query(
                    'UPDATE INTO book_report = ? SET book_report = ? WHERE user_id = ? AND book_isbn = ?', 
                [report, id, isbn], (error, data) => {
                    if (error) throw error;
                    res.send("독후감이 수정되었습니다!");
                });  
            }
        });

    } else {        // 독후감 정보가 입력되지 않은 경우
        res.send("입력되지 않은 정보가 있습니다.");
    }

});

module.exports = router;