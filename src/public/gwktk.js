<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wheel of Fortune</title>
    <style>
        body {
            font-family: Montserrat;
            text-align: center;
            background-color: #f0f0f0;
            padding-top: 20px;
        }

        .wheel-container {
            position: relative;
            margin: 0 auto;
            width: 500px;
        }

        #spinButton, #registerButton {
            margin-top: 20px;
            padding: 15px 30px;
            font-size: 18px;
            cursor: pointer;
        }

        #result {
            margin-top: 20px;
            font-size: 24px;
            color: #333;
        }

        #emailInput {
            padding: 10px;
            font-size: 16px;
            width: 250px;
        }

        #wheelCanvas {
            background: url('./wheel-image.png') no-repeat center center;
            background-size: cover;
        }

        .arrow {
            position: absolute;
            top: -3px;
            left: 50%;
            transform: translateX(-50%) rotate(192deg);
            width: 0;
            height: 0;
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
            border-bottom: 60px solid rgb(195, 68, 68);
        }
    </style>
</head>
<body>
    <h1>🎡 Spin the Wheel and Win!</h1>

    <div id="registrationContainer">
        <input type="email" id="emailInput" placeholder="Enter your email" required>
        <button id="registerButton">Register</button>
        <div id="registerMessage"></div>
    </div>

    <div id="wheelContainer" style="display:none; position: relative;">
        <div class="arrow"></div>
        <canvas id="wheelCanvas" width="500" height="500"></canvas>
        <button id="spinButton">Spin</button>
    </div>

    <div id="result"></div>

    <script>
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
    </script>
</body>
</html>
