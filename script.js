// 로그인 함수
function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    if (username === '' || password === '') {
        alert('닉네임과 비밀번호를 모두 입력해주세요!');
        return;
    }
    
    // 사용자 정보 확인
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    
    if (!users[username]) {
        alert('존재하지 않는 사용자입니다. 회원가입을 해주세요!');
        return;
    }
    
    if (users[username].password !== password) {
        alert('비밀번호가 일치하지 않습니다!');
        return;
    }
    
    // 로그인 성공
    localStorage.setItem('currentUser', username);
    
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('mainSection').style.display = 'block';
    document.getElementById('displayName').textContent = username;
    
    displayMyBestRecord();
}

// 로그아웃 함수
function logout() {
    localStorage.removeItem('currentUser');
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('mainSection').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// 게임 시작 함수
function startGame() {
    window.location.href = 'game/index.html';
}

// 회원가입 페이지로 이동
function goToSignup() {
    window.location.href = 'signup.html';
}

// 랭킹 페이지로 이동
function goToRanking() {
    window.location.href = 'ranking.html';
}

// 내 최고 기록 표시
function displayMyBestRecord() {
    const currentUser = localStorage.getItem('currentUser');
    const rankings = JSON.parse(localStorage.getItem('rankings') || '[]');
    const myRecordDiv = document.getElementById('myBestRecord');
    
    // 내 기록만 필터링
    const myRecords = rankings.filter(r => r.name === currentUser);
    
    if (myRecords.length === 0) {
        myRecordDiv.innerHTML = '<p>아직 기록이 없습니다. 게임을 플레이해보세요!</p>';
        return;
    }
    
    // 가장 빠른 기록 찾기
    myRecords.sort((a, b) => a.time - b.time);
    const bestRecord = myRecords[0];
    
    myRecordDiv.innerHTML = `
        <div style="background: #f0f8ff; padding: 15px; border-radius: 10px; text-align: center;">
            <p style="font-size: 24px; color: #667eea; font-weight: bold;">${bestRecord.time.toFixed(2)}초</p>
            <p style="color: #666;">총 ${myRecords.length}번 플레이</p>
        </div>
    `;
}

// 페이지 로드 시 자동 로그인 체크
window.onload = function() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('mainSection').style.display = 'block';
        document.getElementById('displayName').textContent = currentUser;
        displayMyBestRecord();
    }
}