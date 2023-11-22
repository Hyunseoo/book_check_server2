var express = require('express');
var router = express.Router();

var db = require('./db.js');

// 독후감 작성 페이지용 책 정보 전송
// router.post('/report', (req, res) => {
//     var title = req.body.title;
//     console.log('독후감용 책 정보');
//      if (title) {
//      db.query(
//          'SELECT bi.book_title, bi.book_cover FROM book_report br JOIN book_info bi ON br.book_isbn = bi.book_isbn WHERE br.user_id = ?',
//           [id = '34'],
//          (error, results, fields) => {
//              if (error) {
//                  console.error('에러 발생:', error);
//                  res.status(500).send('독후감 정보를 불러오는 도중 오류가 발생했습니다.');
//          } else {
//              console.log(results);
//              res.status(200).json(results);
//          }
//      });
//  }
//  });

// 독후감 입력
router.post('/report', (req, res) => {   
    var id = req.body.id;
    var isbn = req.body.isbn;
    var report = req.body.report;
    console.log("독후감 입력 시작!");
    console.log("독후감 등록 :", id, isbn);
    console.log("독후감 내용 :", report);

//     const query = `
//     SELECT * 
//     FROM book_report 
//     WHERE user_id = ? AND book_isbn = ? AND book_report IS NULL
// `;

// db.query('SELECT * FROM book_report WHERE user_id = ? AND book_isbn = ? AND book_report IS NULL', 
// [id, isbn], (error, results, fields) => {
//     if (error) {
//         // 에러 처리
//         throw error;
//     }
//     // 결과 사용
//     console.log(results); // 쿼리 결과
//     db.query(
//         'UPDATE book_report SET book_report = ? WHERE user_id = ? AND book_isbn = ?', 
//                  [report, id, isbn], (error, data) => {
//                  if (error) throw error;
//                  res.send("독후감이 등록되었습니다!");
//                  console.log("독후감 등록!");
//         });
//     })

    db.query(
        'SELECT * FROM book_report WHERE user_id = ? AND book_isbn = ?',
        [id, isbn],
        (error, results, fields) => {
            if (error) {
                throw error;
            }
            
            // 등록된 독후감이 있는지 확인
            if (results.length > 0) {
                // 독후감이 이미 등록되어 있는 경우
                db.query(
                    'UPDATE book_report SET book_report = ? WHERE user_id = ? AND book_isbn = ?',
                    [report, id, isbn],
                    (error, data) => {
                        if (error) throw error;
                        res.send("독후감이 업데이트되었습니다!");
                        console.log("독후감 업데이트!");
                    }
                );
            } else {
                // 독후감이 등록되어 있지 않은 경우
                db.query(
                    'INSERT INTO book_report (user_id, book_isbn, book_report) VALUES (?, ?, ?)',
                    [id, isbn, report],
                    (error, data) => {
                        if (error) throw error;
                        res.send("독후감이 등록되었습니다!");
                        console.log("독후감 등록!");
                    }
                );
            }
        }
    );

    // if (id && isbn && report) {
    //     db.query(
    //         'SELECT * FROM book_report WHERE user_id = ? AND book_isbn = ? AND book_report IS NULL', 
    //     [id = 34, isbn = 9791156645719], (error, results, fields) => { // 해당 사용자가 등록한 도서의 독후감이 DB에 있는지
    //         if (error) throw error;
            //res.send("독후감을 등록할 수 있습니다!");
            // if (results.length > 0) {     // DB에 없는 경우 독후감 등록
            //     db.query(
            //         'INSERT INTO book_report (book_report) VALUES(?)', 
            //         [report], (error, data) => {
            //         if (error) throw error;
            //         res.send("독후감이 등록되었습니다!");
            //         console.log("독후감 등록!");
            //     });
            // } else {     // DB에 같은 도서의 독후감이 있는 경우 '업데이트'
            //     db.query(
            //         'UPDATE book_report SET book_report = ? WHERE user_id = ? AND book_isbn = ?', 
            //         [report, id, isbn], (error, data) => {
            //         if (error) throw error;
            //         res.send("독후감이 수정되었습니다!");
            //     });  
            // }
//         });

//     } else {        // 독후감 정보가 입력되지 않은 경우
//         res.send("해당 도서에 입력된 독후감이 있습니다.");
//         console.log("독후감 실패");
//     }

});

// 독후감 수정
// router.put('/report', (req, res) => {   
//     var id = req.body.id;
//     var isbn = req.body.isbn;
//     var report = req.body.report;
//     db.query(
//         'SELECT * FROM book_report WHERE user_id = ? AND book_isbn = ?',
//         [id, isbn],
//         (error, results, fields) => {
//         }
//     );
// });

// 독후감 삭제
// router.delete('/report', (req, res) => {   
//     var id = req.body.id;
//     var isbn = req.body.isbn;
//     var report = req.body.report;
//     db.query(
//         'UPDATE book_report SET book_report = NULL WHERE user_id = ? AND book_isbn = ?',
//         [id, isbn],
//         (error, results, fields) => {
//         }
//     );
// });

module.exports = router;