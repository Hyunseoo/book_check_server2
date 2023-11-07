const axios = require('axios');
const express = require('express');
const app = express();
//var request = require('request');

const router = express.Router();

app.use('/api', router);

// const {postData} = require('../server.js');

// function usepostData() {
//   console.log(postData);
// }

// usepostData();

// function sspostData() {
//   return new Promise((resolve, reject) => {
//     // 서버 데이터 가져오기
//     resolve(serverpostData.postData);
//   });
// }

// async function sspostData() {
//   try {
//     const data = await serverpostData.postData();
//     console.log(data); // 데이터 출력
//   } catch (error) {
//     console.error(error);
//   }
// }

//sspostData();
//console.log(serverpostData.key1);





router.post("/post", (req, res) => {
  var postData = req.body.data;
  console.log('Received data: ', postData);
  //res.send(`ISBN received: ${postData}`);
});

// ASPX 페이지 URL
const apiUrl = 'http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx';

app.get('/post', (req, res) => {
    res.send(`Data in use: ${postData}`);
    //const postData = req.query.data; // 클라이언트에서 받아온 ISBN
    console.log('Received data: ', postData);

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
});


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