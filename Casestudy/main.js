let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
let ball = {
    x: 200,
    y: 300,
    dx: 5,
    dy: 5,
    radius: 12,
    speed:6 ,
};
let Bars = {
    width: 220,
    height: 15,
    x: 450,
    y: canvas.height - 9,
    speed: 8,
    MoveLeft: false,
    MoveRight: false,
};
let gameOver = false;
let KichThuocVienGach = {
    TdX: 8,
    TdY: 6,
    margin: 10,
    width:60,
    height: 30,
    totalRow: 7,
    totalCol: 17,
};
let array = [];
for (let i = 0; i < KichThuocVienGach.totalRow; i++) {
    for (let j = 0; j < KichThuocVienGach.totalCol; j++) {
        array.push({
            x: KichThuocVienGach.TdX + j * (KichThuocVienGach.width + KichThuocVienGach.margin),

            y: KichThuocVienGach.TdY + i * (KichThuocVienGach.height + KichThuocVienGach.margin),
            isBroken: false ,
        });
    }
}
function drawPoint(){
    context.beginPath();
    context.font = "40px TimeNewRoman";
    context.fillStyle="pink";
    context.fillText("Point: "+myPoint, 1,60 );
    context.closePath();
}
function drawBackGroundPlay(){
let img=document.getElementById("img");
    context.beginPath();
    context.drawImage(img,0,0,canvas.width,canvas.height);
    context.closePath();
}
function drawBackGroundLose(){
let img=document.getElementById("imglose");
    context.beginPath();
    context.drawImage(img,0,0,canvas.width,canvas.height);
    context.closePath();
}
function drawBackGroundWin(){
let img=document.getElementById("imgwin");
    context.beginPath();
    context.drawImage(img,0,0,canvas.width,canvas.height);
    context.closePath();
}
function veNhieuGach() {
    array.forEach(function (b) {
        if(!b.isBroken){
            context.beginPath();
            context.rect(b.x, b.y, KichThuocVienGach.width, KichThuocVienGach.height);
            context.fillStyle ="green";
            context.fill();
            context.closePath();
        }
    });
}
function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = "red";
    context.fill();
    context.closePath();
}
function veBars() {
    context.beginPath();
    context.rect(Bars.x, Bars.y, Bars.width, Bars.height);
    context.fillStyle="pink";
    context.fill();
    context.closePath();
}
function xuLyVaCham() {
    if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) {
        ball.dx = -ball.dx;
    }
if (ball.y < ball.radius || ball.y > canvas.height - ball.radius) {
        ball.dy = -ball.dy;
    }
}
document.addEventListener('keyup', function (event) {
    if (event.key == 35) {
        Bars.MoveLeft = false;
    } else if (event.key== 38) {
        Bars.MoveRight = false;
    }
});
document.addEventListener('keydown', function (event) {
    if (event.key== 35) {
        Bars.MoveLeft = true;
    } else if (event.key == 38) {
        Bars.MoveRight = true;
    }
});
function bongVaChamVoiBars() {
    if (ball.x + ball.radius >= Bars.x && ball.x + ball.radius <= Bars.x + Bars.width &&
        ball.y + ball.radius >= canvas.height - Bars.height) {
        ball.dy = -ball.dy;
    }
}
let myPoint=0;
function bongVaChamGach() {
    array.forEach(function (b) {
        if (!b.isBroken) {
            if (ball.x >= b.x && ball.x <= b.x + KichThuocVienGach.width &&
                ball.y + ball.radius >= b.y && ball.y - ball.radius <= b.y + KichThuocVienGach.height) {
                ball.dy = -ball.dy;
                ball.dy+=0.01;
                KichThuocVienGach.height+=0;
                console.log(KichThuocVienGach.totalRow);
                console.log(ball.dy);
                console.log(ball.dx);
                b.isBroken = true;
                let sound = new Audio();
                sound.volume=1;
                sound.play();
                myPoint++;
            }
        }
    });
}
function toaDoBong() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}
function moveleft() {
    Bars.MoveLeft = true;
}
function clearMoveLeft() {
    Bars.MoveLeft = false;
}
function moveright() {
    Bars.MoveRight = true;
}
function clearMoveRight() {
    Bars.MoveRight = false;
}
function updateBars() {
    if (Bars.MoveLeft) {
        Bars.x -= Bars.speed;
    } else if (Bars.MoveRight) {
        Bars.x += Bars.speed;
    }
    if (Bars.x < 0) {
        Bars.x = 0;
    } else if (Bars.x > canvas.width - Bars.width) {
        Bars.x = canvas.width - Bars.width;
    }

}
function checkGameOver() {
    if (ball.y > canvas.height - ball.radius || KichThuocVienGach.width*KichThuocVienGach.totalRow===canvas.height) {
        gameOver = true;
    }
}
function showGameOver() {
    drawBackGroundLose();
}
function showWin() {
    if(myPoint>=100){
        alert("Winner");
    }
}
drawBackGroundPlay();
veNhieuGach();
drawBall();
veBars();
drawPoint();
function draw() {
    if (!gameOver) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawBackGroundPlay();
        veNhieuGach();
        drawBall();
        veBars();
        updateBars();
        xuLyVaCham();
        toaDoBong();
        bongVaChamGach();
        drawPoint();
        showWin();
        bongVaChamVoiBars();
        checkGameOver();
        requestAnimationFrame(draw);
    } else {
        showGameOver();
    }
}
