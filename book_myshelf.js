var express = require('express');
var router = express.Router();

var db = require('./db.js');

// 책장에 책 등록
router.post('/addbookshelf', (req, res) => {
    var id = req.body.id;
    var isbn = req.body.isbn;
    console.log("책 등록 :", isbn);
    setTimeout(() => {
        db.query('SELECT * FROM book_report', (err, res) => {
            if (err) {
                console.log(err);
            }
        });
        if (id && isbn) {
            db.query('SELECT * FROM book_report WHERE user_id = ? AND book_isbn = ?',
                [id, isbn], (error, results, fields) => { // DB에 같은 도서가 있는지 확인
                    if (error) throw error;
                    if (results.length <= 0) {     // DB에 같은 도서가 없는 경우 
                        db.query(
                            'INSERT INTO book_report (user_id, book_isbn, book_report) VALUES(?,?, null)',
                            [id, isbn], (error, data) => {
                                if (error) throw error;
                                res.send("해당 도서가 내책장에 등록되었습니다!");
                                console.log("도서 내 책장에 등록 완료!")
                            });
                    } else {                                                  // DB에 같은 아이디가 있는 경우
                        res.send("이미 등록된 도서입니다.");
                        console.log("이미 등록된 도서!")
                    }
                });

        } else {        // 입력되지 않은 정보가 있는 경우
            res.send("사용자 또는 도서 정보를 받아올 수 없습니다.");
        }
    }, 2000);
});

router.post('/shelfbooks', (req, res) => {
    var id = req.body.id;
    console.log(id, '의 책장!');
    if (id) {
    db.query(
        'SELECT bi.book_title, bi.book_cover, br.book_report FROM book_report br JOIN book_info bi ON br.book_isbn = bi.book_isbn WHERE br.user_id = ?',
         [id],
        (error, results, fields) => {
            if (error) {
                console.error('에러 발생:', error);
                res.status(500).send('책 정보를 불러오는 도중 오류가 발생했습니다.');
        } else {
            console.log(results);
            res.status(200).json(results);
        }
    });
}
});

module.exports = router;