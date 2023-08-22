# BroStore-WebStorePage-Full-Stack-project
스프링 부트 + 리액트 부트스트랩 웹스토어, 유저 커뮤니티 사이트

## 🖥️ 프로젝트 소개
웹스토어, 유저 커뮤니티 사이트를 참고해서 만든 사이트입니다.
<br>


## 🕰️ 개발 기간
* 23.06.29일 - 23.08.09일

### ⚙️ 개발 환경

#### 서버 사이드
- `java 11`
- `JDK 11.0.2`
- **IDE** : IntelliJ IDEA
- **Framework** : Springboot(2.7.13)
- **Database** : Maria DB(3.0.1), aws RDS  <a href="https://github.com/gamjagogi/BroStore/wiki/%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4(RDS),-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%B2%98%EB%A6%AC(S3)" >상세 정보 - WIKI 이동</a>
- **ORM** : JPA
- **배포** : aws ec2  <a href="https://github.com/gamjagogi/BroStore/wiki/%EB%B0%B0%ED%8F%AC-%EA%B3%BC%EC%A0%95(Deployment)" >상세 정보 - WIKI 이동</a>
- **이미지 처리** : aws s3


#### 클라이언트 사이드
- **빌드** : `react-scripts 5.0.1`
- `react-bootstrap 2.8.0`
- `react 18.2.0`
- **기타 라이브러리** : `react quill 2.0.0`, `react-daum-postcode 3.1.3`, `react-image-file-resizer 0.4.8`, `react-dom 18.2.0` 등..
- <a href="https://github.com/gamjagogi/BroStore/wiki/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC(Package.json)" >상세 라이브러리 정보 - WIKI 이동</a>
- **배포** : neflify
- <a href="https://web--bro-store.netlify.app/" > 배포 사이트 - 이동</a>

## 📌 주요 기능

- #### 모든 서버 응답과 요청은 DTO를 사용
- #### 로그인 이후, 모든 서버 요청에 시큐리티 검증
- #### 예외처리 : <a href="https://github.com/gamjagogi/BroStore/wiki/%EB%A1%9C%EA%B7%B8(Log)%EC%99%80-%EC%98%88%EC%99%B8-%EC%B2%98%EB%A6%AC-(Server-Exception)" >상세 정보 - WIKI 이동</a>  

#### 메인페이지  - <a href="" >상세보기 - WIKI 이동</a>
- 로그인
- 슬라이드 광고 배너
- 각 카테고리 항목
- 타임 세일 상품
- 광고 상품 이미지


#### 로그인 - <a href="https://github.com/gamjagogi/hjStore/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(Login,Join)" >상세보기 - WIKI 이동</a>
- ID찾기, PW찾고, 입력된 PW를 비교 검증
- 시큐리티 사용
- 카카오 로그인 (kakao Rest api)


#### 회원가입 - <a href="https://github.com/gamjagogi/hjStore/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(Login,Join)" >상세보기 - WIKI 이동</a>
- ID 중복체크
- 회원가입시, uuid로 회원 key 생성


#### 마이 페이지 - <a href="https://github.com/gamjagogi/hjStore/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(MyPage)" >상세보기 - WIKI 이동</a>
- 주소 API 연동
- 회원정보 변경
- 설정한 회원 이름, 전화번호, 주소는 추후 주문시, 자동으로 이름,전화번호,주소 란에 입력됨.

#### Delivery, Software 상품 카테고리 페이지 - <a href="https://github.com/gamjagogi/hjStore/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(Delivery-,-Software-Product)" >상세보기 - WIKI 이동</a>
- DB에 저장된 상품 판매글 (제목, 썸네일, 내용 일부분, 가격(할인정보), 카테고리) 나열
- 카테고리 구현
- 페이징, 최신글 순으로 정렬.
- Software 상품 페이지의 경우, 로그인 유저만 접근
- Delivery 상품 페이지는 회원가입 유무 상관없이 접근 가능, 물건 구매시 회원가입 필요.


#### 판매글 등록 - <a href="https://github.com/gamjagogi/hjStore/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(Posting)" >상세보기 - WIKI 이동</a>
- 판매글 작성은 manager권한을 가진 유저만 작성 가능
- quill 에디터 사용.
- 배송 유무 등 옵션 설정.
- 썸네일 설정 가능. (이미지 파일은 s3로 저장되며, 추후 판매글을 볼때는, 이미지 url을 통해 출력된다.
- 가격, 할인정보, 할인% 설정


#### 판매글 상세보기 - <a href="https://github.com/gamjagogi/hjStore/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(Detail)" >상세보기 - WIKI 이동</a>
- 장바구니 담기
- 해당 판매글 외에, 판매글 리스트 출력


#### 장바구니 페이지 - <a href="https://github.com/gamjagogi/hjStore/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(Cart)" >상세보기 - WIKI 이동</a>
- 상품 당 갯수 조절
- 도합 가격, 할인정보, 갯수 우측에 표시.

#### 결제 페이지 - <a href="https://github.com/gamjagogi/hjStore/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(Payments)" >상세보기 - WIKI 이동</a>
- 도합 가격, 갯수 표시
- 이름, 전화번호, 주소 api (마이페이지 정보 자동 등록)
- 토스페이먼츠 결제


#### 주문서 페이지 - <a href="https://github.com/gamjagogi/hjStore/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(OrderSheet)" >상세보기 - WIKI 이동</a>
- 주문 결제 상품내역
- 주문 상태(결제 대기중, 배송 중, 배송 완료, 취소 처리중, 취소 완료)


#### Seller 카테고리 페이지 - <a href="https://github.com/gamjagogi/hjStore/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(SellerPage)" >상세보기 - WIKI 이동</a>
- manager 권한 유저에 한에, 해당 카테고리를 확인 가능
- 본인 판매 상품 리스트
- 판매글 수정, 삭제 (CRUD)


#### 판매자용 주문서 페이지 - <a href="https://github.com/gamjagogi/hjStore/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(OrderSheet)" >상세보기 - WIKI 이동</a>
- 주문요청 확인
- 주문 상태 변경 ( 취소 요청 -> 취소 완료, 배송 중 -> 배송 완료, 배송 중 -> 취소 완료)


#### User Board 카테고리 페이지 - <a href="https://github.com/gamjagogi/hjStore/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(User-Board)" >상세보기 - WIKI 이동</a>
- 회원 유저 글 작성.
- 페이징, 최신글 순으로 정렬.
- 카테고리 작성글 검색


#### User Board 게시판 글 작성 - <a href="https://github.com/gamjagogi/hjStore/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(User-Board)" >상세보기 - WIKI 이동</a>
- quill 에디터 사용

  
#### User Board 게시판 상세보기 - <a href="https://github.com/gamjagogi/hjStore/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(User-Board)" >상세보기 - WIKI 이동</a>
- 댓글 작성
- 댓글 페이징
- 글 수정, 삭제 (CRPD)


#### Question 카테고리 페이지 - <a href="https://github.com/gamjagogi/hjStore/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(Question)" >상세보기 - WIKI 이동</a>
- 상품 관련 QA 또는, 판매자 권한 요청 글 작성
- 카테고리(All, 판매자 신청)
- 페이징, 최신글 순으로 정렬
- 카테고리 작성글 검색


#### Question 게시판 상세보기 - <a href="https://github.com/gamjagogi/hjStore/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(Question)" >상세보기 - WIKI 이동</a>
- 댓글 작성
- 댓글 페이징
- 글 수정, 삭제 (CRPD) 


#### Notice 카테고리 페이지, 상세보기 - <a href="" >상세보기 - WIKI 이동</a>
- admin권한 유저 글 작성, 수정, 삭제 (CRUD)


#### Admin 카테고리 페이지  - <a href="https://github.com/gamjagogi/hjStore/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(Admin-Page)" >상세보기 - WIKI 이동</a>
- 메인 페이지 슬라이드 광고 상품 설정
- 타임 세일 상품 설정


#### 통합 검색  - <a href="https://github.com/gamjagogi/hjStore/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(Search)" >상세보기 - WIKI 이동</a>
- 최상단 검색 창 키워드 (제목, 내용 일부 발취 후 User board, Deliver 카테고리 내 작성글 추출)
