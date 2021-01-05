<br>
<img src="https://user-images.githubusercontent.com/45756853/103595202-37f06480-4f3e-11eb-8298-c3b046e50310.png" />
<br>


안녕하세요🙂  
취향 존중 뉴스 서비스 Scraper를 만든 4 Scrapers 입니다.  

내가 관심있는 뉴스, 간직하고 싶은 뉴스를 하나하나 오려 스크랩✂️하던  
그 때의 기분을 다시 느껴보고 싶다면 저희와 함께 스크래퍼가 되어보세요!  
[go to scraper page | our result💻](http://scrap.ml/)  
[go to github wiki | our record✍🏻](https://github.com/codestates/4-scrapers-client/wiki)
<br>
<br>

### Scraper 서비스를 만든 이유
음악🎶, 영화🎥, 심지어 맥주🍺까지.  
모든 것들이 순위 중심에서 취향 중심으로 바뀌어 가고 있죠.  
<br>

하지만 우리의 알권리를 책임지고 있는 뉴스는 어떤가요?  
혹시 매번 OO일보 혹은 플랫폼의 메인에 위치하는 뉴스를 소비하고 있지 않나요?  
<br>

내가 보고싶은 뉴스는 내가 선택할 수 있도록❗   
내가 보관하고 싶은 뉴스는 언제든 보관할 수 있도록❗    
***뉴스에도 여러분의 취향을 묻힐 수 있는 서비스***, Scraper를 만들었습니다.
<br>
<br>

### 많은 것들을 배운 Scraper 프로젝트
- 금교중(@david419kr | Backend) : 첫 프로젝트를 실제로 진행해보면서 많은 것을 경험하고 느꼈습니다. `첫 째`, 백지에서부터 프로젝트를 시작 할 때에는 계획 단계에서 생각보다 많은 시간이 소요 된다는 점. 2주간의 작업 기간 중에 거의 3일은 계획에 투자한 것 같습니다. `둘 째`, 계획을 아무리 잘 짰더라도 실제 코딩을 하다 보면 계획한 시간에 맞춰 잘 진행 된다는 보장은 없다는 점. 팀원들 모두 처음 해보는 것이 많다 보니, 간단한 기능이라 생각했던 것도 실제 구현해보면 생각보다 시간이 오래 걸리기도 하고, 거꾸로 어려워 보였던 것이 금방 끝나기도 하더군요. 이런 예상과 실제의 편차는 경험을 길러 메꾸어 나갈 수 있겠죠? 그리고 `마지막으로`, 프로젝트 막바지에 아마존 AWS에서 의문의 과금이 발생하여, 잘 하지도 못하는 영어실력으로 AWS 상담원과 전화 통화를 하여 원인을 알아내고 이를 해결하였던 것이 아주 기억에 남는 경험이었습니다. 앞으로의 개발자 생활에서 AWS를 이용할 일이 많을 텐데 앞으로는 이런 고생을 덜 할 수 있겠죠!
<details>
<summary>금교중's Worklog📜 | Click!</summary>
<div markdown="3">
<br>

![badge](https://img.shields.io/static/v1?label=Github&message=david419kr&color=blue&style=for-the-badge&logo=github)  

- **Role** : Team Member  
- **Position** : Back-end
- **Stack** : nodejs, Javascript, MySQL, aws EC2, aws RDS, React, React Hooks
- **Works** :  
  1. 이 프로젝트를 위해 뉴스를 검색하려면 어떤 API를 쓰는 것이 좋을지 결정
      - 후보에 오른 것은 newsAPI, 네이버 뉴스 API, 그리고 Bing news search API
      - 가격과 기능의 밸런스를 감안하여 Bing news search API로 낙점
  2. 프로토타입에 기반하여 스키마 설계 및 제작
      - dbDiagram을 이용하여 뼈대를 설계
      - 그 뼈대를 토대로 sequelize를 이용하여 작성
  3. 엔드포인트 설계 및 API 문서 작성
      - REST API에 대하여 약간이나마 공부하고 그에 기반하여 엔드포인트를 설계함
      - 엔드포인트 설계한 것에 따라 GitBook을 이용하여 API 문서를 작성
  4. 토큰을 이용한 인증 구현
      - access token과 refresh token을 이용하여 로그인과 로그아웃 구현
      - 토큰에는 간략한 유저 정보를 담아, 거의 모든 서비스에 토큰의 정보를 이용하도록 구현
  5. 유저 프로필 사진 업로드 기능 구현
      - multer를 이용하여 이미지를 업로드 받은 후 이를 이용 할 수 있도록 DB에 정보를 저장
  6. 뉴스 검색 및 스크랩 관련 기능 구현
      - Bing news search API를 이용하여 뉴스를 검색한 후 그 정보를 클라이언트에 전달
      - 검색한 뉴스를 스크랩하여 DB에 저장하고, 클라이언트의 요청에 따라 스크랩을 검색, 수정 및 삭제 구현
  7. google 소셜 로그인 구현
      - google+ API를 쓰고 싶었으나 작년에 서비스 종료 하였다는 것을 깨닫고 people API로 방향 전환.
      - 소셜 로그인은 원래 백엔드에서 맡기로 하였으나, 백엔드만 만져서는 구현이 불가능하다는 것을 깨닫고 프론트엔드 코드에도 아주 약간 손을 대었다.

</div>
</details>
<br>

- 김란영(@somniumry | Backend)  : 기본기에 충실하자!
프로젝트를 시작하고 코드를 한줄 한줄 써내려 갈 때마다 지금까지 배웠던 기본에서 내가 구현하고자 하는 부분을 조금씩 더 추가해주면서 프로젝트는 이런식으로 완성이 되어가는거구나라고 느낄 수 있는 프로젝트였습니다. 아마 현업에 가서 프로젝트를 진행할 때에도 이렇겠죠? 그래서 저는 이번 프로젝트의 경험으로 가장 크게 느낀 것은 기본기에 충실하자!였고, 추가적으로 팀원들 간의 소통도 중요하다고 느꼈습니다. 내가 만약 어떤 부분에 대해서 구현하고자할 때, 나의 방법보다 더 좋은 방법, 혹은 구현하고자하는 것의 가이드라인을 서로 소통을 통해 잡아가는 경험을 했기 때문에 팀원들 간의 소통도 프로젝트를 진행함에 있어 중요한 부분이라는 생각을 했습니다. 이러한 경험들을 통해 현업에 가서도 팀원들과 어떻게 소통해야하는지에 대해 도움을 많이 얻은 프로젝트였습니다.
<details>
<summary>김란영's Worklog📜 | Click!</summary>
<div markdown="4">
<br>

![badge](https://img.shields.io/static/v1?label=Github&message=Somniumry&color=blue&style=for-the-badge&logo=github)  

- **Role** : Team Member  
- **Position** : Back-end
- **Stack** :  nodejs, Javascript, MySQL, aws EC2, aws RDS
- **Works** :  
  1. 회원가입 구현
     - `bcrypt`를 통해 비밀번호 암호화하여 DB에 저장
  2. 유저정보 수정
     - `Token`을 이용하여 닉네임과 비밀번호 변경
     - `bcrypt`를 통해 변경된 비밀번호 암호화하여 DB에 저장
  3. 회원탈퇴
     - `Token`을 이용한 `bcrypt`를 통해 DB에서 삭제

</div>
</details>
<br>

- 이소정(@mnmms | Frontend) :  이번 프로젝트는 나의 부족함을 더 깨닫게 해준 것 같아요. 
리덕스와 훅이라는 새롭고 낯선 개념을 익히게 되고 직접 코드에 적용시키면서 이게 맞을까? 계속 고민을 반복하는 이 과정이 프로젝트를 마무리 하면서 ‘헛되지 않았다’ 라는 생각을 하게 되네요!
아직까지도 헷갈리는 부분이 많지만 프로젝트 진행하면서 구현해야 할 기능을 개인적으로 학습하여 감을 잡아왔듯이 프로젝트가 끝나고도 코드 리팩토링 해보는 건 어떨까 한 번 시도해보고 싶네요. 
<details>
<summary>이소정's Worklog📜 | Click!</summary>
<div markdown="1">
<br>

![badge](https://img.shields.io/static/v1?label=Github&message=mnmms&color=blue&style=for-the-badge&logo=github)  

- **Role** : Team Member  
- **Position** : Front-end
- **Stack** : React, React Hooks, Redux, Postcss, Javascript, HTML, AWS S3
- **Works** :  
  1. 메인페이지, 서브페이지 UI 디자인
      - UI 레퍼런스를 참고하여 헤더, 카드섹션, 호버카드섹션 등 전체 페이지 디자인
      - 아이콘, 폰트, 컬러 설정
  2. 메인페이지 헤더, 더보기 버튼 구현 및 라우터 설정
      - 유저가 검색창에 원하는 뉴스 타이틀을 검색할 수 있게끔 구현
      - 헤더의 스크랩 메뉴 클릭 시 페이지 전환
  3. 스크랩 페이지
      - 서버에 유저가 스크랩한 뉴스 API 요청 로직 작성, 카테고리 별 필요 데이터 추출하는 로직 작성
  4. 스택 아키텍쳐 정리
      - 실제 사용한 프론트엔드, 백엔드 스택을 정리하여 프로젝트 마무리 작업 진행

</div>
</details>
<br>

- 이영모(@yeongbba | Frontend) : `개발자 = 코딩 잘 하는 사람` 이라는 편견을 깨준 프로젝트.  
설득은 직무에 상관없이 중요한 것 같아요. 개발자는 내가 작성한 코드가, 기획자는 나의 아이디어가, 디자이너는 나의 디자인이 왜 좋은지 결국 설득을 해야만 하죠. 그동안은 기능 구현을 위한 코드를 작성했었다면, 이번 프로젝트를 진행하면서는 팀원들이 납득할 수 있는 코드를 작성하기 위해 고민을 많이 했어요. 아마 신입 개발자가 되더라도 마찬가지겠죠? 그래서 설득을 잘 할 수 있는 개발자가 되어야 겠다는 생각이 들었습니다. 이 경험에서 편협했던 저의 시각을 깬 기분이고, 이것은 앞으로 커리어를 쌓아가는 데 큰 도움이 될 것 같습니다.
<details>
<summary>이영모's Worklog📜 | Click!</summary>
<div markdown="2">
<br>

![badge](https://img.shields.io/static/v1?label=Github&message=yeongbba&color=blue&style=for-the-badge&logo=github)  

- **Role** : Team Leader  
- **Position** : Front-end
- **Stack** : React, React Hooks, Redux, Postcss, Javascript, HTML, AWS S3
- **Works** :  
  1. Wireframe 설계 및 문서 작성 
      - Component들을 도형으로 구조화하여 가상의 화면에 배치
      - UI Design 시 참고할 만한 레퍼런스들을 함께 서치
      - 백엔드에서부터 프론트엔드까지의 데이터 흐름에 대한 내용 정리
  2. UI Design 문서 작성
      - 로그인, 회원가입, 유저 정보, 프로필 수정, 계정 삭제 화면에 대한 UI 구현
  3. Main Page
      - CSS의 Grid 기능을 사용하여, 화면 크기에 따라 한 줄에 놓이는 카드의 개수를 조절
      - 기본 Card 컴포넌트, Hover 시 Card 컴포넌트, 스크랩 시 Card 컴포넌트 UI를 구현
      - 더보기 버튼을 클릭 시 카드 컴포넌트가 추가 렌더링 되도록 구현
      - 뉴스 카드 내에서 카테고리 메뉴를 선택하고, 저장 버튼을 누를 때 저장되는 기능 구현
  4. Login & Register Page
      - Login & Register 모달창 UI 구현
      - useForm 라이브러리를 사용하여 폼 데이터의 값을 추출하고, 각 인풋값의 유효성 검사 실행
      - local stoage에 토큰 값을 저장해, 정해진 기간 내 재접속 시 자동 로그인 처리가 되도록 구현
  5. User Profile & Edit & Delete Page
      - User Profile, Edit, Delete 모달창 UI 구현 
      - Redux Store에 저장된 유저 데이터로 profile 화면 구성
      - FormData와 FileReader로 User 프로필 이미지 변경 기능 구현 
  6. Scrap Page
      - 스크랩 카테고리 별 분류, 카테고리 수정, 스크랩 삭제 구현 
  7. Domain
      - FreeNOM과 Route53을 이용해, scrap.ml 도메인 이름 설정 


</div>
</details>
<br>

### 프로젝트에서 사용한 스택  
<br>
<img src="https://user-images.githubusercontent.com/67185299/103609175-9fb7a700-4f60-11eb-8aa5-9b45f1bbff98.png" width="1000"></img>

### 서비스 플로우 차트[요약 버전] 
[To See Full Version | Click!](https://miro.com/app/board/o9J_lZh1Cj8=/)    
<img src="https://user-images.githubusercontent.com/67185299/103628303-2761dd80-4f82-11eb-8aa5-43c04d222af2.jpg" width="1000"></img>

### 스크래퍼 주요 페이지 뷰
- Main & Scrap Page  
  
<img src="https://user-images.githubusercontent.com/67185299/103616516-ee207200-4f6f-11eb-9a4d-79ef74140ccb.gif" width="1000"></img>
<br>
<br>

- Save News  
  
<img src="https://user-images.githubusercontent.com/67185299/103616961-b49c3680-4f70-11eb-82b9-8856ab021859.gif" width="1000"></img>
<br>
<br>

- Filtering News by Category
  
<img src="https://user-images.githubusercontent.com/67185299/103617149-1066bf80-4f71-11eb-8a39-f7106c016b97.gif" width="1000"></img>
<br>
<br>
