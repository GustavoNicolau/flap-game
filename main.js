const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d')
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 2;
let a = 1
let temp = canvas.height - 90;

const gradient = ctx.createLinearGradient(0,0,0,70)

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleObstacles()
    //ctx.fillRect(10, canvas.height - 90 ,50 ,50);
    bird.update();
    bird.draw();
    ctx.fillStyle = 'black';
    ctx.font = '90px Georgia'
    ctx.strokeText(score, 450, 70);
    ctx.fillText(score, 450, 70)
    handleParticles()
    handleCollisions()
    if(handleCollisions()) return;
    requestAnimationFrame(animate)
    angle+=0.12;
    hue++;
    frame++;
}
animate();

window.addEventListener('keypress', (e) => {
    if (e.code === 'Space') spacePressed = true;
})


window.addEventListener('keyup', (e) => {
    if (e.code === 'Space') spacePressed = false;
})

const bang = new Image();
bang.src = 'bang.png';

function handleCollisions(){
    for(let i = 0; i < obstaclesArray.length; i++){
        if(bird.x < obstaclesArray[i].x + obstaclesArray[i].width 
            && bird.x + bird.width > obstaclesArray[i].x &&
            ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
            (bird.y > canvas.height - obstaclesArray[i].bottom &&
                bird.y + bird.height < canvas.height))){
                    ctx.drawImage(bang, bird.x, bird.y, 50,50);
                    ctx.font = "25px Georgia";
                    ctx.fillStyle = 'black';
                    ctx.fillText('Game over, your score is ' + score, 160 , canvas.height/2 - 10)
                    return true;
            }
    }
}