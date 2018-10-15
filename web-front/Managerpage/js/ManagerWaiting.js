window.onload = memberCounting;

function memberCounting() {
    let Member = 0;
    document.getElementById('waiting-number').innerHTML = Member.toString() + '명';
    setTimeout("memberCounting()", 1000);
};

function nextpage() {
    location.href = '';
};