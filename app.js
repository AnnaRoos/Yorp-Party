const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const timer = document.getElementById('time-left');
const brick = document.getElementById('brick');
let norp = document.getElementById('norp');
let berkeloid = document.getElementById('berkeloid');
const lollipop = document.getElementById('lollipop');
const cake = document.getElementById('cake');
const cookie = document.getElementById('cookie');
const soda = document.getElementById('soda');
const peppermint = document.getElementById('peppermint');
const pizza = document.getElementById('pizza');
const partyScore = document.getElementById('party-score');
const yorpCount = document.getElementById('yorps-found');
const yorpBarrel = document.getElementById('yorp-barrel');
const yorpBook = document.getElementById('yorp-book');
const yorpMushroom = document.getElementById('yorp-mushroom');
const yorpFlower = document.getElementById('yorp-flower');
const yorpTeddy = document.getElementById('yorp-teddy');
const background = document.getElementById('background');
const burningYorp = document.getElementById('burning-yorp');
const greatGatsby = document.getElementById('great-gatsby');
const firstImage = document.getElementById('first-image');
const congrats = document.getElementById('congrats');

let gamePlaying = false;

const partyItems = [lollipop, cake, cookie, soda, peppermint, pizza];

const missingYorpPositions = [
    [5, 2], [17, 2], [14, 5], [9, 11], [10, 16], [5, 19], [24, 19], [18, 12], [23, 8]
];

const yorpImages = [yorpBarrel, yorpBook, yorpFlower, yorpMushroom, yorpTeddy];

const norpTheYorp = {
    x1: 30,
    y1: 30
};

const missingYorp = {
    getPosition: missingYorpPositions[Math.floor(Math.random() * missingYorpPositions.length)],
    img: yorpImages[Math.floor(Math.random() * yorpImages.length)],
    yorpsFound: 0

};

const fireCreature = {
    x1: 815,
    y1: 575,
    dx: -2,
    dy: -2
};

const partyItem = {
    x1: Math.floor(Math.random() * 29),
    y1: Math.floor(Math.random() * 21),
    img: partyItems[Math.floor(Math.random() * partyItems.length)],
    score: 0
};




const map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,1],
    [1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const brickSize = 30;

function drawMap() {
    for(let y = 0; y < map.length; y++){
        let row = map[y];
        for(let x = 0; x < row.length; x++){
            let positionX = x * brickSize;
            let positionY = y * brickSize;
            if(map[y][x] === 1){
                ctx.drawImage(brick, positionX, positionY);
            }
        }
    }
}

function drawNorp() {
    ctx.drawImage(norp, norpTheYorp.x1, norpTheYorp.y1);
}

function drawBerkeloid() {
    ctx.drawImage(berkeloid, fireCreature.x1, fireCreature.y1)
    fireCreature.x1 += fireCreature.dx;
    fireCreature.y1 += fireCreature.dy;
    if(fireCreature.y1 + fireCreature.dy < 25 || fireCreature.y1 + fireCreature.dy > canvas.height - 85){
        fireCreature.dy = -fireCreature.dy;
    } 
    if(fireCreature.x1 + fireCreature.dx > canvas.width - 85) {
        fireCreature.dx = -fireCreature.dx;
        berkeloid = document.getElementById('berkeloid');
    } 
    if(fireCreature.x1 + fireCreature.dx < 30) {
        fireCreature.dx = -fireCreature.dx;
        berkeloid = document.getElementById('berkeloid2');
    }
}


    

function drawPartyItem(img, x, y) {
    if(map[y][x] === 0 && map[y][x] === 0){ 
        ctx.drawImage(img, x * 30, y * 30);
    } else {
        partyItem.x1 = Math.floor(Math.random() * 29);
        partyItem.y1 = Math.floor(Math.random() * 21);
        partyItem.img = partyItems[Math.floor(Math.random() * 6)];
        drawPartyItem(partyItem.img, partyItem.x1, partyItem.y1);
    }
}


function collectPartyItems() {
    if((map[Math.round(norpTheYorp.x1 / 30)] === map[partyItem.x1] 
    && map[Math.round(norpTheYorp.y1 / 30)] === map[partyItem.y1])
    || (map[Math.round((norpTheYorp.x1 + 10) / 30)] === map[partyItem.x1]
    && map[Math.round((norpTheYorp.y1 + 30) / 30)] === map[partyItem.y1])) {
        partyItem.x1 = Math.floor(Math.random() * 29);
        partyItem.y1 = Math.floor(Math.random() * 21);
        partyItem.img = partyItems[Math.floor(Math.random() * 5)];
        drawPartyItem(partyItem.img, partyItem.x1, partyItem.y1);
        partyItem.score++;
        partyScore.textContent = partyItem.score;
    }
}

function findYorp() {
    if((map[Math.round(norpTheYorp.x1 / 30)] === map[missingYorp.getPosition[0]] 
    && map[Math.round(norpTheYorp.y1 / 30)] === map[missingYorp.getPosition[1]])
    || (map[Math.round((norpTheYorp.x1 + 10) / 30)] === map[missingYorp.getPosition[0]]
    && map[Math.round((norpTheYorp.y1 + 30) / 30)] === map[missingYorp.getPosition[1]])) {
        missingYorp.getPosition = missingYorpPositions[Math.floor(Math.random() * 9)];
        missingYorp.img = yorpImages[Math.floor(Math.random() * 5)];
        drawMissingYorp();
        missingYorp.yorpsFound++;
        yorpCount.textContent = missingYorp.yorpsFound;
    }
}


function drawMissingYorp() {
    ctx.drawImage(missingYorp.img, missingYorp.getPosition[0] * 30, missingYorp.getPosition[1] * 30 + 5);
}

function moveNorp(e) {
    if(e.keyCode === 37 && map[Math.round((norpTheYorp.y1 - 10) / 30)][Math.round((norpTheYorp.x1 - 20) / 30)] === 0
    && map[Math.round((norpTheYorp.y1 + 30) / 30)][Math.round((norpTheYorp.x1 - 20) / 30)] === 0){
        norpTheYorp.x1 -= 10;
        norp = document.getElementById('norp2');
    } else if(e.keyCode === 38 && map[Math.round((norpTheYorp.y1 - 20) / 30)][Math.round((norpTheYorp.x1 - 10) / 30)] === 0
    && map[Math.round((norpTheYorp.y1 - 20) / 30)][Math.round((norpTheYorp.x1 + 20) / 30)] === 0){
        norpTheYorp.y1 -= 10;
    } else if(e.keyCode === 39 && map[Math.round((norpTheYorp.y1 - 10) / 30)][Math.round((norpTheYorp.x1 + 25) / 30)] === 0
    && map[Math.round((norpTheYorp.y1 + 30) / 30)][Math.round((norpTheYorp.x1 + 25) / 30)] === 0){
        norpTheYorp.x1 += 10;
        norp = document.getElementById('norp');
    } else if(e.keyCode === 40 && map[Math.round((norpTheYorp.y1 + 40) / 30)][Math.round((norpTheYorp.x1 -10) / 30)] === 0
    && map[Math.round((norpTheYorp.y1 + 40) / 30)][Math.round((norpTheYorp.x1 + 20) / 30)] === 0){
        norpTheYorp.y1 += 10;
    }
}

function setTimer() {
    let timeLeft = 5;
    let counter = setInterval(function countdown() {
        background.classList.add('hidden');
        canvas.classList.remove('hidden');
/*         gamePlaying = true; */
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0) {
            clearInterval(counter); 
            gamePlaying = false;
            canvas.classList.add('hidden');
            background.classList.remove('hidden');
            firstImage.classList.add('hidden');
            greatGatsby.classList.remove('hidden');
            congrats.classList.remove('hidden');
        }
    }, 1000);
}


function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    drawNorp();
    drawMissingYorp();
    drawPartyItem(partyItem.img, partyItem.x1, partyItem.y1);
    drawBerkeloid();
    collectPartyItems();
    findYorp();
    requestAnimationFrame(drawGame);
}

startBtn.addEventListener('click', setTimer); 
document.addEventListener('keydown', moveNorp); 


drawGame();



