let check = {
    cord: true,
    nickname: true,
    phonenumber: true
};

function answerCheck(answer) {
    var wrong = document.querySelector('#wrongAnswer').style;
    var right = document.querySelector('#rightAnswer').style;  
    var explanation = document.querySelector('#explanation').style;
    var target = document.querySelector(answer).style;

    target.backgroundColor = '#FF000050';
    wrong.display = 'block';
    explanation.display = 'block';
}

function clearMessage(clearChk, frm) {
    if (clearChk) {
        frm.value="";
        clearChk = false;
    }
}