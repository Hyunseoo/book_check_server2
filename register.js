var express = require('express');
var router = express.Router();

var db = require('./db.js');

// 회원가입
router.post('/register', (req, res) => {    
    var id = req.body.id;
    var pw = req.body.pw;
    var name = req.body.name;
    console.log(id);
    console.log(pw);
    console.log(name);
    db.query('SELECT * FROM user_info', (err, res) => {
        if (err) {
            console.log(err);
        }
    });
    if (id && pw && name) {
        
        db.query('SELECT * FROM user_info WHERE user_id = ?', 
        [id], (error, results, fields) => { // DB에 같은 아이디가 있는지 확인
            if (error) throw error;
            if (results.length <= 0) {     // DB에 같은 아이디가 없는 경우 
                db.query(
                    'INSERT INTO user_info (user_id, pw, name) VALUES(?,?,?)', 
                [id, pw, name], (error, data) => {
                    if (error) throw error;
                    res.send("회원가입이 완료되었습니다!");
                });
            } else {                                                  // DB에 같은 아이디가 있는 경우
                res.send("이미 존재하는 아이디 입니다.");    
            }            
        });

    } else {        // 입력되지 않은 정보가 있는 경우
        res.send("입력되지 않은 정보가 있습니다.");
    }
});

module.exports = router;