const axios = require('axios');
const express = require('express');
const app = express();

const postData = require('./server');
//var request = require('request');

const router = express.Router();

app.use('/api', router);

// ASPX 페이지 URL
const apiUrl = 'http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx';

// //isbn 번호 받기
// app.post("/post", (req, res) => {
//     const postData = req.body.data;
//     console.log('Received data: ', postData);
//     res.json({ message: 'Data received successfully' });
//   });

// app.get('/post', (req, res) => {
//     res.send(`Data in use: ${postData}`);
//     //const postData = req.query.data; // 클라이언트에서 받아온 ISBN
//     console.log('Received data: ', postData);

    axios.get(apiUrl, {
        params: {
            TTBKey: 'ttb0413lhs1704001',
            ItemId: postData,
            ItemIdType: 'ISBN13',
            Ouput: 'JSON'
        }
      })
      .then((response) => {
        const bookInfo = response.data;
        //res.json(bookInfo);
        console.log(bookInfo);
      })
      .catch((error) => {
        console.error(`에러 발생: ${error.message}`);
        res.status(500).json({ error: '도서 정보를 가져오는데 실패했습니다.' });
      });
//});


// axios.get(apiUrl, {
//     params: {
//       TTBKey: 'ttb0413lhs1704001',
//       ItemId: 'postData',
//       ItemIdType: 'ISBN13',
//       Ouput: 'JS'
//     }
//   })
//     .then((response) => {
//       console.log(response.data); // 수신된 데이터 출력
//     })
//     .catch((error) => {
//       console.error(`에러 발생: ${error.message}`);
//     });

module.exports = router;