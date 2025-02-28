<!DOCTYPE html>
<html lang="en">
<link rel="stylesheet" href="styles.css">
<script src="script.js"></script>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wheel of Fortune</title>
    <link rel="stylesheet" href="styles.css">
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

    <script src="script.js"></script>
</body>
</html>
