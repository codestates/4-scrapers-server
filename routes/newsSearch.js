var express = require('express');
var router = express.Router();
const { newsSearchController } = require('../controllers');

router.post('/bing',newsSearchController.bingSearch) //bing search(메인화면)
router.post('/scrap/upload',newsSearchController.dbUpload) //bing 검색 결과를 스크랩하여 db에 업로드
router.post('/scrap',newsSearchController.dbSearch) //db 내에서 스크랩 찾기
router.patch('/scrap',newsSearchController.dbModify) //db 내에서 스크랩 수정
router.delete('/scrap',newsSearchController.dbDelete) //db 내에서 스크랩 삭제

module.exports = router;