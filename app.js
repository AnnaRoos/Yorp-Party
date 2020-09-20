const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let norp = document.getElementById('norp');
const brick = document.getElementById('brick');
let berkeloid = document.getElementById('berkeloid');
let norpTheYorp = {
    x1: 30,
    y1: 30
};

let b1 = {
    x1: 450,
    y1: 330,
    dx: -2,
    dy: -2
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

function drawNorp(image) {
    ctx.drawImage(image, norpTheYorp.x1, norpTheYorp.y1);
    
}

function drawBerkeloid(image) {
    ctx.drawImage(image, b1.x1, b1.y1)
    b1.x1 += b1.dx;
    b1.y1 += b1.dy;
    if(b1.y1 + b1.dy < 30 || b1.y1 + b1.dy > canvas.height - 85){
        b1.dy = -b1.dy;
    } 
    if(b1.x1 + b1.dx > canvas.width - 85) {
        b1.dx = -b1. dx;
        berkeloid = document.getElementById('berkeloid');
    } 
    if(b1.x1 + b1.dx < 30) {
        b1.dx = -b1. dx;
        berkeloid = document.getElementById('berkeloid2');
    }
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
    } else if(e.keyCode === 40 && map[Math.round((norpTheYorp.y1 + 30 + 10) / 30)][Math.round((norpTheYorp.x1 -10) / 30)] === 0
    && map[Math.round((norpTheYorp.y1 + 40) / 30)][Math.round((norpTheYorp.x1 + 20) / 30)] === 0){
        norpTheYorp.y1 += 10;
    }
}



function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    drawNorp(norp);
    drawBerkeloid(berkeloid);

}


document.addEventListener('keydown', moveNorp); 
setInterval(drawGame, 10);