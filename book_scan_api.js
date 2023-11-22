const axios = require('axios');
const express = require('express');
const router = express.Router();
const app = express(); 
app.use('/api', router);

var db = require('./db.js');

// aladin api URL
const apiUrl = 'http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx'; //?OptResult=ratingInfo //?output=JS&OptResult=ratingInfo

global.title = "";
global.author = "";
global.description = "";
global.price = "";
global.cover = "";
global.publisher = "";
global.rating = "";

router.post("/post", (req, res) => {
  const isbn = req.body.isbn;
  console.log('Received isbn: ', isbn);

  axios.get(apiUrl, {
    params: {
      TTBKey: 'ttbkey ',
      ItemId: isbn,
      ItemIdType: 'ISBN13',
      Output: 'JS',
      Version: '20131101',
      Cover: 'Big',
      OptResult: 'ratingInfo'
    }
  })
    .then((response) => {
      //console.log(response);
      //console.log(response.data);
      //console.log(response.data.item[0].subInfo);
      const itemdata = response.data.item[0];
      const ratingdata = response.data.item[0].subInfo.ratingInfo;
      console.log(response.data.item[0].subInfo);

      const title = itemdata.title; //item 배열의 첫번째 인덱스인 title 속성
      const author = itemdata.author;
      const description = itemdata.description;
      const price = itemdata.priceStandard;
      const cover = itemdata.cover;
      const publisher = itemdata.publisher;

      global.title = title;
      global.author = author;
      global.description = description;
      global.price = price;
      global.cover = cover;
      global.publisher = publisher;

      // const ratingsco = ratingdata.ratingScore;
      // let rating = parseFloat(ratingsco).toFixed(1); // 기본적으로 소수점을 포함하여 표시
      // //const rating = ratingsco + 0.0;
      // if (rating === '0') {
      //   rating = '0.0'; // 만약 값이 '0'이라면 '0.0'으로 변환
      // }
      // global.rating = rating;

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
            console.log("책정보가 저장 성공!");
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
      rating: 5.4 //global.rating
    };
    res.send(bookInfo);
  }, 3000);  //실행 시간 조절
});

module.exports = router;