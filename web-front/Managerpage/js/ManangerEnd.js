let finalRankerElement = document.createElement('li');
let finalRankerListElement = document.getElementById('final-ranker-list');
let finalRankerData = ["dasa", "Adas", "saffd", "asdasd", "fdfsf"];

finalRankerData.filter(function(curvla) {
    let element = document.createElement('li');
    element.innerHTML = `<span class="ranker-who">${curvla}</span>`
    finalRankerElement.appendChild(element);
    finalRankerListElement.appendChild(element);
});