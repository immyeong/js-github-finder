const profiles = document.getElementById('profile');

// GitHub API 요청을 처리하는 클래스
class GitHub { 

    constructor() { // 클래스 생성자
        this.base_url = 'https://api.github.com/users/'; // GitHub 사용자의 기본 URL 설정
    }

    // 사용자의 이름을 받으면 프로필, 레포지토리 정보를 가져오는 메서드
    async getUser(username) {
        const profileResponse = await fetch(`${this.base_url}${username}`); // 프로필 정보 가져오기
        const profile = await profileResponse.json();

        const reposResponse = await fetch(`${this.base_url}${username}/repos`); // 레포지토리 정보 가져오기
        const repos = await reposResponse.json(); // 비동기함수 응답을 기다리기 (await)

        return { profile, repos }; // 프로필 정보, 레포지토리 정보를 객체 형태로 반환
    }
}

class UI{
    showProfile(user) { // 프로필 정보를 HTML 형태로 변환하는 메서드
        const profileHTML = `
        <div class="card card-body mb-3">
        <div class="row">
            <div class="col-md-3">
                <img class="img-fluid mb-2" src="${user.avatar_url}">
                <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block ">View Profile</a>
            </div>
            <div class="col-md-9">
                <span class="badge bg-primary">Public Repos: ${user.public_repos}</span>
                <span class="badge bg-secondary">Public Gists: ${user.public_gists}</span>
                <span class="badge bg-success">Followers: ${user.followers}</span>
                <span class="badge bg-info">Following: ${user.following}</span>
                <br><br>
                <ul class="list-group">
                    <li class="list-group-item">Company: ${user.company}</li>
                    <li class="list-group-item">Website/Blog: ${user.blog}</li>
                    <li class="list-group-item">Location: ${user.location}</li>
                    <li class="list-group-item">Member Since: ${user.created_at}</li>
                </ul>
            </div>
        </div>
    </div>
`;
        profiles.innerHTML = profileHTML;
    }


    //data.repos를 보여주는 메서드
    showRepos(repos){
        let reposHTML = '<h3 class="page-heading mb-3">Latest Repos</h3>';
        repos.forEach(repo => {
            reposHTML += `
                <div class="card card-body mb-2">
                    <div class="row">
                        <div class="col-md-6">
                            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                        </div>
                        <div class="col-md-6">
                            <span class="badge bg-primary">Stars: ${repo.stargazers_count}</span>
                            <span class="badge bg-secondary">Watchers: ${repo.watchers_count}</span>
                            <span class="badge bg-success">Forks: ${repo.forks_count}</span>
                        </div>
                    </div>
                </div>`;
        });

        profiles.innerHTML += reposHTML;
    }

    //loading spinner를 보여주는 메서드
    showSpinner(message, className){
        this.clearSpinner();

        const div = document.createElement('div');
        div.className = className;
        const Spinner = document.createElement('div');
        Spinner.className = 'spinner-border';
        Spinner.role ='status';

        const strong = document.createElement('strong');
        strong.innerHTML = message;

        div.appendChild(Spinner);
        div.appendChild(strong);

        profiles.prepend(div);

    }

    clearSpinner(){
        const currentSpinner = document.querySelector('.spinner');
        if(currentSpinner){
            currentSpinner.remove();
        }

    }

    //경고메세지를 보여주는 메서드
    showAlert(message, className){
        this.clearAlert();

        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.SearchContainer');
        const search = document.querySelector('.search');
        container.insertBefore(div, search);

        setTimeout(() => {
            this.clearAlert();
        }, 3000); 
    }

    clearAlert(){
        const currentAlert = document.querySelector('.alert');
        if(currentAlert){
            currentAlert.remove();
        }
    }
}

const gitHub = new GitHub();
const ui = new UI();
const searchBtn = document.getElementById('searchBtn');
const userInput = document.querySelector('.searchUser');

//enter 누를 시 이벤트발생
userInput.addEventListener('keydown', (e) => {
    if(e.key == 'Enter'){
        const userText = document.querySelector('.searchUser').value;

        if(userText !== ''){
            ui.showSpinner('Loading...', 'text-center spinner');
            
            setTimeout(()=> {
                gitHub.getUser(userText)
                .then(data => {
                    if(data.profile.message === 'Not Found'){
                        ui.showAlert(data.profile.message, 'alert alert-danger');
                    }else{
                        ui.showProfile(data.profile);
                        ui.showRepos(data.repos);
                    }
            });
            },1000)
        }else{
            alert("내용을 입력해주세요.");
        }
    }
})

//버튼 클릭시 이벤트발생
searchBtn.addEventListener('click', () => {
    const userText = document.querySelector('.searchUser').value;

    if(userText !== ''){
        ui.showSpinner('Loading...', 'text-center spinner');
        
        setTimeout(()=> {
            gitHub.getUser(userText)
            .then(data => {
                if(data.profile.message === 'Not Found'){
                    ui.showAlert(data.profile.message, 'alert alert-danger');
                }else{
                    ui.showProfile(data.profile);
                    ui.showRepos(data.repos);
                }
        });
        },1000)
    }else{
        alert("내용을 입력해주세요.");
    }
})