var express = require('express');
var router = express.Router();

var db = require('./db');

// 로그인
router.post('/login', (req, res) => {
    var id = req.body.id;
    var pw = req.body.pw;
    console.log(id);
    console.log(pw);
    if (id && pw) {             // id와 pw가 입력되었는지 확인
        console.log(id);
        db.query('SELECT * FROM user_info WHERE user_id = ? AND pw = ?', [id, pw], (error, results, fields) => {
            if (error) throw error;
            if (results.length > 0) {       // db에서의 반환값이 있으면 로그인 성공
                //req.session.is_logined = true;      // 세션 정보 갱신
                //req.session.nickname = id; //name으로 바꿔야될수도??????
                //req.session.save( () => {
                //    res.redirect(`/`);
                //});
            } else {              
                res.send("로그인 정보가 일치하지 않습니다.");    
            }            
        });

    } else {
        res.send("아이디와 비밀번호를 입력하세요!");    
    }
});


// 로그아웃
router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/');
    });
});

module.exports = router;