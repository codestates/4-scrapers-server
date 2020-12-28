var express = require('express');
var router = express.Router();
const { usersController } = require('../controllers');

router.delete('', usersController.deleteUser) //회원 탈퇴
router.patch('', usersController.patchUser)  //회원정보 수정(비번과 닉네임)
router.post('/icon', usersController.createProfileIcon) //프로필사진 업로드 및 변경
router.get('', usersController.getUserProfile) //회원정보 가져오기
router.post('', usersController.createUser) //회원가입
router.post('/login', usersController.login) //로그인
router.post('/logout', usersController.logout) //로그아웃
router.post('/token', usersController.tokenRequest) //accessToekn 리퀘스트

module.exports = router;