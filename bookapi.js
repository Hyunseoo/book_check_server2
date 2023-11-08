const axios = require('axios');
const express = require('express');
const app = express();

const convert = require('xml-js');
const request = require('request');

const router = express.Router();

app.use('/api', router);

//post용
//app.use(express.json());

// ASPX 페이지 URL
const apiUrl = 'http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx';

global.text = "";

router.post("/post", (req, res) => {
  const data = req.body.data;
  console.log('Received data: ', data);

axios.get(apiUrl, {
    params: {
      TTBKey: 'ttb0413lhs1704001',
      ItemId: data,
      ItemIdType: 'ISBN13',
      Output: 'XML'
    }
  })
    .then((response) => {
      //console.log(typeof response.data);
      //console.log(typeof response);

      const datas = response.data

      //const arr = datas.split("<");
      //console.log(arr)

      //const str = "<title>해리포터</title>";

      const startIndex1 = datas.indexOf("<item ") + "<item ".length;
      const endIndex1 = datas.indexOf("</item>");
      const extractedData1 = datas.slice(startIndex1, endIndex1);
      //console.log(extractedData1);

      const startIndex = extractedData1.indexOf("<title>") + "<title>".length;
      const endIndex = extractedData1.indexOf("</title>");
      const extractedData = extractedData1.slice(startIndex, endIndex);
      //console.log(extractedData);

      //const items = response.data.item;
      //console.log(items);

      //const resdata = JSON.parse(response.data);
      //console.log(resdata);
      //const text = "";
      global.text = extractedData;
      console.log(text);

    })
    .catch((error) => {
      console.error(`에러 발생: ${error.message}`);
    });

});

router.post("/book_info", (req, res) => {
  setTimeout(() => {
    const bookInfo = {
      title: global.text.toString(),
      writer: "폴 올랜드 지음, 노희준 외 옮김",
      publisher: "한빛아카데미(교재)",
      price: 42000,
      summary: "파이썬을 이용하여 3D 그래픽스, 게임 설계, 시뮬레이션, 머신러닝 알고리즘에 필요한 수학을 쉽게 설명하고, 상황별 다양한 코딩을 직접 해보며 수학 개념이 작동하는 방식을 깨달을 수 있도록 구성하였다.",
      };
      res.send(bookInfo);
  }, 5000);
});

//console.log(bookInfo);

module.exports = router;