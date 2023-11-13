const axios = require('axios');
const express = require('express');
const router = express.Router();
const app = express();
app.use('/api', router);

var db = require('./db.js');

// aladin api URL
const apiUrl = 'http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx';

global.title = "";
global.author = "";
global.description = "";
global.price = "";
global.cover = "";
global.publisher = "";

router.post("/post", (req, res) => {
  const isbn = req.body.isbn;
  console.log('Received isbn: ', isbn);

axios.get(apiUrl, {
    params: {
      TTBKey: 'key',
      ItemId: isbn,
      ItemIdType: 'ISBN13',
      Output: 'JS',
      Cover: 'Big',
      //OptResult: ratingInfo
    }
  })
    .then((response) => {
      const bookdata = response.data //response에서 data라는 JSON 형태의 String값을 받아옴
      const json = bookdata.replace(/;/g, ''); //오류 발생시키는 ; 제거
      const jsondata = JSON.parse(json); //Json 형태로 파싱
      console.log(jsondata);

      const title = jsondata.item[0].title; //item 배열의 첫번째 인덱스인 title 속성
      const author = jsondata.item[0].author;
      const description = jsondata.item[0].description;
      const price = jsondata.item[0].priceStandard;
      const cover = jsondata.item[0].cover;
      const publisher = jsondata.item[0].publisher;

      global.title = title;
      global.author = author;
      global.description = description;
      global.price = price;
      global.cover = cover;
      global.publisher = publisher;
      
      //console.log(title);
      //console.log(author);
      //console.log(description);

      //book_info DB 저장
      db.query(
        'INSERT INTO book_info (book_isbn, book_title, book_cover) VALUES (?, ?, ?)',
        [isbn, title, cover],
        (error, data) => {
          if (error) {
            console.error(`에러 발생: ${error.message}`);
            res.status(500).send("책정보 저장 서버 오류");
          } else {
            console.log("책정보가 성공적으로 저장되었습니다.");
            //res.send("데이터가 성공적으로 삽입되었습니다.");
          }
        }
      );

    })
    .catch((error) => {
      console.error(`에러 발생: ${error.message}`);
    });

});

router.post("/book_info", (req, res) => {
  setTimeout(() => {
    const bookInfo = {
      title: global.title,
      writer: global.author,
      publisher: global.publisher,
      price: global.price,
      summary: global.description,
      cover: global.cover,
      rating: 10.0
    };
      res.send(bookInfo);
  }, 3000);  //실행 시간 조절
});

module.exports = router;