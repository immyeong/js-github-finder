## Github Finder 구현

### Main Page
<img width="883" alt="스크린샷 2024-02-21 오후 5 26 53" src="https://github.com/immyeong/js-github-finder/assets/62759873/96ad2524-fd84-40a7-8b37-81869d443ef7">

### Spinner Loading
<img width="875" alt="스크린샷 2024-02-21 오후 5 34 08" src="https://github.com/immyeong/js-github-finder/assets/62759873/17539c8c-6f0d-4d15-9f42-081ad3491f09">

### Alert
<img width="869" alt="스크린샷 2024-02-21 오후 5 34 21" src="https://github.com/immyeong/js-github-finder/assets/62759873/6b25dbd9-7346-4cf3-84b3-52078c6cadc5">

### HTML
    -nav바 생성
    -search바 생성

### CSS
    -bootstrap 사용

### JavaScript

    Class GitHub
    - Github API 가져오기
    - user의 profile과 repos를 json형식으로 만들고 객체 형태로 반환

    Class UI
    #showProfile
    -profile속 인스턴스 중 아바타, 유저주소, 레포 개수, gists, follower, following 수를 가져와서 profileHTML에 저장
    -저장된 profileHTML을 profiles.innerHTML에 넣기

    #showRepos
    -repos속 인스턴스 중 레포주소, 레포이름, stargazer 수, watcher수, fork 수를 가져와서 reposHTML에 저장
    -repo의 개수만큼 가져와야하기때문에 forEach로 각 repo들을 순회함
    -저장된 reposHTML을 profiles.innerHTML에 넣기

    #showSpinner
    -user검색 시 화면에 송출되기 전 loading 이미지 출력

    #clearSpinner
    -화면에 spinner가 있다면 없애고 다시 출력

    #showAlert
    -user검색 시 user가 undefined이라면 경고창을 출력
    -setTimeout 메서드로 출력 시간 설정

    #clearAlert
    -showAlert이 3초동안만 유지하기위해 showAlert을 없애주는 함수

    #addEventListener
    -input.value에 접근하여 userText를 확인함
    -userText가 있다면 ui.showSpinner함수를 실행하여 Loading을 출력
    -gitHub api를 가져오기위해 gitHub.getUser() 메서드 실행
    -userText가 undefiend라면 data.profile.message 인 Not Found 출력
    -undefiend가 아니라면 프로필과 레포를 출력
    -search중인것을 확인하기위해 클릭이나 엔터를 누를 시 setTimeout을 설정하여 화면에 spinner을 보여준다
