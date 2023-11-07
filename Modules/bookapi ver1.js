//var api_url = "http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey={{key}}&itemIdType=ISBN&ItemId=[도서의ISBN]&output=xml&Version=20131101&OptResult=ebookList,usedList,reviewList";

const express = require('express');
const app = express();

// 라우트 정의 및 미들웨어 설정
var request = require('request');
const convert = require('xml-js');
var bodyParser = require('body-parser');

const router = express.Router();

app.use('/api', router); // '/api' 경로에 라우터를 마운트

const uri1 = "http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=" //+ [TTBKey] +
const uri2 = "&itemIdType=ISBN&ItemId=" //+ [도서의ISBN] +
const uri3 = "&output=js&Version=20131101&OptResult=ebookList,usedList,reviewList"
//output type을 js로 변경하여 Json 타입 데이터 반환

const key = 'ttb0413lhs1704001'
const isbn = '9791191056556'

var api_url = uri1 + key + uri2 + isbn + uri3;

// request(api_url, (error, response, body) => {
//   if(error){
//     console.log(error)
//   }
//   var obj = JSON.parse(body)
//   console.log(obj) // 콘솔창에 찍어보기
//   console.log(title);
// })

request.get(api_url, (err, res, body) => {
  if(err) {
    console.log(`err => ${err}`)
  } else {
    if(res.statusCode == 200) {
      var result = body
      //console.log(`body data => ${result}`)
      var data = convert.xml2json(result, {compact: true, spaces: 4});
      var jsonData = JSON.parse(data);
      console.log(`xml to json => ${data}`)

      var items = jsonData.object.item;
      var title = items.title._text; //"title" 속성 추출
      console.log(`Title: ${title}`);
    }
  }
})

// router.post(api_url, (req, res, next) => {
//   res.json(req.body.object.item.title);
//   console.log(result)
// });
//var bookname = data.response.item.title;
//console.log(bookname);


// router.get('/bookapi', (req, res, next) => {
//     request(api_url, (error, response, body) => {
//       if(error){
//         console.log(error)
//       }
//       var obj = JSON.parse(body)
//       console.log(obj) // 콘솔창에 찍어보기
//     })
//   })

module.exports = router;