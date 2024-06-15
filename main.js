let b, c;
let startTime, interval;

document.getElementById('start-button').addEventListener('click', function() {
    generateEquation();
    startTimer();
    document.getElementById('results').innerHTML = '';
});

document.getElementById('answer-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let x1 = parseFloat(document.getElementById('x1').value);
    let x2 = parseFloat(document.getElementById('x2').value);

    if (checkAnswer(x1, x2)) {
        stopTimer();
        displayResults(`正解！タイム: ${document.getElementById('time').textContent} 秒`);
    } else {
        displayResults('不正解です。もう一度試してください。');
    }
});

function generateEquation() {
    let x1, x2;
    do {
        x1 = Math.floor(Math.random() * 20) - 10;
        x2 = Math.floor(Math.random() * 20) - 10;
    } while (x1 === 0 || x2 === 0 || x1 === x2);

    b = -(x1 + x2); // x1とx2を用いてbを計算
    c = x1 * x2;    // x1とx2を用いてcを計算

    let equation = `x² ${b < 0 ? '- ' + Math.abs(b) : '+ ' + b}x ${c < 0 ? '- ' + Math.abs(c) : '+ ' + c} = 0`;
    document.getElementById('equation').innerHTML = `方程式: ${equation}`;
}

function checkAnswer(x1, x2) {
    let discriminant = b * b - 4 * 1 * c;
    let realX1 = (-b + Math.sqrt(discriminant)) / (2 * 1);
    let realX2 = (-b - Math.sqrt(discriminant)) / (2 * 1);

    // 実数解と整数解の比較
    return (Math.abs(x1 - realX1) < 1e-6 && Math.abs(x2 - realX2) < 1e-6) || 
           (Math.abs(x1 - realX2) < 1e-6 && Math.abs(x2 - realX1) < 1e-6);
}

function startTimer() {
    startTime = Date.now();
    interval = setInterval(function() {
        let elapsedTime = ((Date.now() - startTime) / 1000).toFixed(1);
        document.getElementById('time').textContent = elapsedTime;
    }, 100);
}

function stopTimer() {
    clearInterval(interval);
}

function displayResults(message) {
    document.getElementById('results').innerHTML = message;
}
