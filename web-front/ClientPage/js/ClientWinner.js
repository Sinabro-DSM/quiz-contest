let submitBtn = document.getElementById("send-phonenumber");

function btnClick() {
    let phoneNum = document.getElementById("input-phonenumber");
    
    let xhr = new XMLHttpRequest();
    xhr.open("http://52.79.121.254/client/personalInfo");
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              console.log(xhr.responseText.message);
              alert('입력 완료되었습니다.');
            } else {
              alert('닉네임이나 코드를 확인해주세요');
            }
          }
    }
    xhr.send(JSON.stringify({
        email: 'null@sinabro.kr',
        phoneNum: phoneNum.value,
        score: 0
    }));
}