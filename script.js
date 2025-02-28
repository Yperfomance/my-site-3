const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');
const resultText = document.getElementById('result');
const registerButton = document.getElementById('registerButton');
const emailInput = document.getElementById('emailInput');
const registerMessage = document.getElementById('registerMessage');
const registrationContainer = document.getElementById('registrationContainer');
const wheelContainer = document.getElementById('wheelContainer');

const prizes = [
    '10% Sale',
    '20% Sale',
    '50% Sale',
    'Free Delivery',
    'Gift-surprise',
    '40% Discount'
];

let startAngle = 0;
const arc = Math.PI / (prizes.length / 2);
let spinTimeout = null;
let spinAngleStart = 10;
let spinTime = 0;
let spinTimeTotal = 0;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw text labels inside segments from outer edge to center
    ctx.fillStyle = '#ffffff';
    ctx.font = '28px Montserrat';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < prizes.length; i++) {
        const angle = startAngle + i * arc;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angle + arc / 2);
        ctx.fillText(prizes[i], canvas.width / 2 - 20, 0);
        ctx.restore();
    }
}

function rotateWheel() {
    if (localStorage.getItem('spinDate') === new Date().toISOString().slice(0, 10)) {
        resultText.innerText = 'You can only spin once per day!';
        return;
    }
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3000 + 4000;
    rotate();
}

function rotate() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI) / 180;
    drawWheel();
    spinTimeout = setTimeout(rotate, 30);
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);
    const degrees = startAngle * (180 / Math.PI) + 90;
    const arcd = arc * (180 / Math.PI);
    const index = Math.floor((360 - (degrees % 360)) / arcd);
    resultText.innerText = `🎉 Your prize: ${prizes[index]}`;
    localStorage.setItem('spinDate', new Date().toISOString().slice(0, 10));
}

function easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

registerButton.addEventListener('click', () => {
    const email = emailInput.value;
    if (!email.includes('@')) {
        registerMessage.innerText = 'Please enter a valid email address.';
        return;
    }
    localStorage.setItem('registeredEmail', email);
    registerMessage.innerText = 'Registration successful!';
    registrationContainer.style.display = 'none';
    wheelContainer.style.display = 'block';
    drawWheel();
});

spinButton.addEventListener('click', rotateWheel);
