// node_modules 에 있는 express 소환
const express = require('express');

const bodyParser = require('body-parser');

// express 는 함수 -> 반환값 변수에 저장
const app = express();
const fs = require('fs');

const db = require('./db.js')
//const loginModule = require('./login.js')
//const registerModule = require('./register.js')
const bookapiModule = require('./bookapi.js');
//const report = require('./bookreport.js');

//모듈 연결
//app.use(loginModule);
//app.use(registerModule);
app.use(bookapiModule);

// 3000 포트로 서버 오픈
app.listen(3000, () => {
    console.log("start! express server on port 3000")
})

//서버-프론트 연결
// app.get('/', (req,res) => {
//     console.log("-----Front Connected!!-----")
//     var text = "server.js 출신 데이터";
//     res.send(text);
// })

//테스트용
// app.post('/test', (req, res) => {
//   console.log('/user 호출', +req);
// })

app.use(bodyParser.json());

app.use(express.json()); // JSON 데이터를 파싱하기 위해

let postData = null;

//isbn 번호 받기
app.post("/post", (req, res) => {
  const postData = req.body.data;
  console.log('Received data: ', postData);
  //res.json({ message: 'Data received successfully' });
  res.send(`ISBN received: ${postData}`);
  //bookapiModule(req,res);
});


// app.get('/data', (req, res) => {
//   //데이터베이스에서 데이터를 가져오는
//   con.query('SELECT * FROM book_info', (err, res) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(res);
//   });
//   //가져온 데이터를 JSON 형식으로 클라이언트에 반환
//   res.status(200).json({ data: fetchedData });
// });

module.exports = postData;