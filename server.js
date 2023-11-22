// node_modules 에 있는 express 소환
const express = require('express');

// express 는 함수 -> 반환값 변수에 저장
const app = express();

//post용
app.use(express.json());

const db = require('./db.js')
const loginModule = require('./login.js')
const registerModule = require('./register.js')
const bookapiModule = require('./book_scan_api.js');
const bookshelfModule = require('./book_myshelf.js');
const bookreportModule = require('./book_report.js');

//모듈 연결
app.use(loginModule);
app.use(registerModule);
app.use(bookapiModule);
app.use(bookshelfModule);
app.use(bookreportModule);

// 3000 포트로 서버 오픈
app.listen(3000, () => {
    console.log("start! express server on port 3000")
})

//서버-프론트 연결
app.get('/', (req, res) => {
    console.log("-----Front Connected!!-----")
    var text = "-----server Connected!!-----";
    //res.send(text);
})

//테스트용
app.post('/test', (req, res) => {
    console.log('/user 호출', +req);
})

const rating = 0;
const doublerating = rating + 0.0;
console.log(rating.toFixed(1));

//isbn 번호 받기
//app.post("/post", (req, res) => {
  //const isbn = req.body.isbn;
  //console.log('Received isbn: ', isbn);
//});