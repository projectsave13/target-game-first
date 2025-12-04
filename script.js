// 로그인 함수
function login() {
    const username = document.getElementById('username').value.trim();
    
    if (username === '') {
        alert('닉네임을 입력해주세요!');
        return;
    }
    
    localStorage.setItem('currentUser', username);
    
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('mainSection').style.display = 'block';
    document.getElementById('displayName').textContent = username;
    
    displayRanking();
}

// 로그아웃 함수
function logout() {
    localStorage.removeItem('currentUser');
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('mainSection').style.display = 'none';
    document.getElementById('username').value = '';
}

// 게임 시작 함수
function startGame() {
    window.location.href = 'game/index.html';
}

// 랭킹 표시 함수
function displayRanking() {
    const rankings = JSON.parse(localStorage.getItem('rankings') || '[]');
    const rankingDiv = document.getElementById('ranking');
    
    if (rankings.length === 0) {
        rankingDiv.innerHTML = '<p>아직 기록이 없습니다.</p>';
        return;
    }
    
    rankings.sort((a, b) => a.time - b.time);
    
    let html = '<ol>';
    rankings.forEach((record, index) => {
        html += `<li>${record.name}: ${record.time.toFixed(2)}초</li>`;
    });
    html += '</ol>';
    
    rankingDiv.innerHTML = html;
}

// 페이지 로드 시 자동 로그인 체크
window.onload = function() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('mainSection').style.display = 'block';
        document.getElementById('displayName').textContent = currentUser;
        displayRanking();
    }
}