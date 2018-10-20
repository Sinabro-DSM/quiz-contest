let loginBtn = document.getElementById("submitEnterCode");

function loginClick() {
    let code = document.getElementById("login-code");
    let nickname = document.getElementById("login-nickname");
    
    let xhr = new XMLHttpRequest();
    xhr.open("post", 'http://52.79.121.254/api/client/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              console.log(xhr.responseText.message);
              window.location.href = "./MobileClientWaiting.html";
            } else {
              alert('닉네임이나 코드를 확인해주세요');
            }
          }
    }
    xhr.send(JSON.stringify({
        nickname: nickname.value,
        code: code.value
    }));
    
}