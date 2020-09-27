window.addEventListener('load', () => {

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
    const iceCream = document.getElementById('icecream');
    const partyScore = document.getElementById('party-score');
    const yorpCount = document.getElementById('yorps-found');
    const yorpBarrel = document.getElementById('yorp-barrel');
    const yorpBook = document.getElementById('yorp-book');
    const yorpMushroom = document.getElementById('yorp-mushroom');
    const yorpFlower = document.getElementById('yorp-flower');
    const yorpTeddy = document.getElementById('yorp-teddy');
    const background = document.getElementById('background');
    const burningYorp = document.getElementById('burning-yorp');
    const legallyBlonde = document.getElementById('legally-blonde');
    const waynesWorld = document.getElementById('waynes-world');
    const firstImage = document.getElementById('first-image');
    const congrats = document.getElementById('congrats');
    
    const brickSize = 30;
    let timeLeft = 10;
    let gameOver = false;
    let partyCount = 0;

    
    const missingYorpPositions = [
        [5, 2], [17, 2], [14, 5], [9, 11], [10, 16], [5, 19], [24, 19], [18, 12], [23, 8]
    ];
    
    const yorpImages = [yorpBarrel, yorpBook, yorpFlower, yorpMushroom, yorpTeddy];
    
    let norpTheYorp = {
        x1: 30,
        y1: 30
    };
    
    const missingYorp = {
        getPosition: missingYorpPositions[Math.floor(Math.random() * missingYorpPositions.length)],
        img: yorpImages[Math.floor(Math.random() * yorpImages.length)],
        yorpsFound: 0
    
    };
    
    let fireCreature = {
        x1: 810,
        y1: 570,
    };
    let speedX = 0;
    let speedY = 0;
    
    const partyItems = [lollipop, cake, cookie, soda, peppermint, pizza, iceCream];
    let partyItemObjects = [];
    
    for (let i = 0; i < 10; i++) {
        let item = {
            x1: Math.floor(Math.random() * 29),
            y1: Math.floor(Math.random() * 21),
            img: partyItems[Math.floor(Math.random() * partyItems.length)],
    
        };
        partyItemObjects.push(item);
    }
    
    
    
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
        fireCreature.x1 += speedX;
        fireCreature.y1 += speedY;
        if(fireCreature.y1 + speedY < 25 || fireCreature.y1 + speedY > canvas.height - 85){
            speedY = -speedY;
        } 
        if(fireCreature.x1 + speedX > canvas.width - 85) {
            speedX = -speedX;
            berkeloid = document.getElementById('berkeloid');
        } 
        if(fireCreature.x1 + speedX < 30) {
            speedX = -speedX;
            berkeloid = document.getElementById('berkeloid2');
        }
    }
    

    
    function drawPartyItems(arrayOfItems) {
        arrayOfItems.forEach(item => {
            if(map[item.y1][item.x1] === 0 && map[item.y1][item.x1] === 0){ 
                ctx.drawImage(item.img, item.x1 * brickSize, item.y1 * brickSize);
            } else {
                item.x1 = Math.floor(Math.random() * 29);
                item.y1 = Math.floor(Math.random() * 21);
                item.img = partyItems[Math.floor(Math.random() * 6)];
                drawPartyItems(arrayOfItems);
            }
        })
    }
    

/*     function collisionDetection(x1, y1, x2, y2) {
        if((x1 === x2 && y1 === y2) || ()
        || (Math.round((norpTheYorp.x1 + 10) / brickSize) === missingYorp.getPosition[0]
        && Math.round((norpTheYorp.y1 + 30) / brickSize) === missingYorp.getPosition[1])) {
            return true;
        }

    } */
    

    
    function collectPartyItemObjects(arrayOfPartyItems) {
        for(let i = 0; i < arrayOfPartyItems.length; i++) {
            if((Math.round(norpTheYorp.x1 / brickSize) === arrayOfPartyItems[i].x1 
            && Math.round(norpTheYorp.y1 / brickSize) === arrayOfPartyItems[i].y1)
            || (Math.round((norpTheYorp.x1 + 10) / brickSize) === arrayOfPartyItems[i].x1
            && Math.round((norpTheYorp.y1 + 30) / brickSize) === arrayOfPartyItems[i].y1)) {
                
                arrayOfPartyItems[i].x1 = Math.floor(Math.random() * 29);
                arrayOfPartyItems[i].y1 = Math.floor(Math.random() * 21);
                arrayOfPartyItems[i].img = partyItems[Math.floor(Math.random() * 5)];
                drawPartyItems(arrayOfPartyItems);
                partyCount++;
                partyScore.textContent = partyCount;
            }
        }
    }
    
    function findYorp() {
        if((Math.round(norpTheYorp.x1 / brickSize) === missingYorp.getPosition[0] 
        && Math.round(norpTheYorp.y1 / brickSize) === missingYorp.getPosition[1])
        || (Math.round((norpTheYorp.x1 + 10) / brickSize) === missingYorp.getPosition[0]
        && Math.round((norpTheYorp.y1 + 30) / brickSize) === missingYorp.getPosition[1])) {
            
            missingYorp.getPosition = missingYorpPositions[Math.floor(Math.random() * 9)];
            missingYorp.img = yorpImages[Math.floor(Math.random() * 5)];
            missingYorp.yorpsFound++;
            yorpCount.textContent = missingYorp.yorpsFound;

        }
    }
    
    function berkeloidAttack() {
        if((Math.round((norpTheYorp.x1 + 20) / brickSize) === Math.round((fireCreature.x1 + 30) / brickSize) 
        && Math.round((norpTheYorp.y1 + 20) / brickSize) === Math.round((fireCreature.y1 + 30) / brickSize))
        || (Math.round((norpTheYorp.x1 + 20) / brickSize) === Math.round((fireCreature.x1 + 30) / brickSize)
        && Math.round((norpTheYorp.y1 + 50) / brickSize) === Math.round((fireCreature.y1 + 30) / brickSize))) {
            gameOver = true;
        }
    }
    
    
    function drawMissingYorp() {
        ctx.drawImage(missingYorp.img, missingYorp.getPosition[0] * brickSize, missingYorp.getPosition[1] * brickSize + 5);
    }
    
    
    function moveNorp(e) {
        if(e.keyCode === 37 && map[Math.round((norpTheYorp.y1 - 10) / brickSize)][Math.round((norpTheYorp.x1 - 20) / brickSize)] === 0
        && map[Math.round((norpTheYorp.y1 + 30) / brickSize)][Math.round((norpTheYorp.x1 - 20) / brickSize)] === 0){
            norpTheYorp.x1 -= 10;
            norp = document.getElementById('norp2');
        } else if(e.keyCode === 38 && map[Math.round((norpTheYorp.y1 - 20) / brickSize)][Math.round((norpTheYorp.x1 - 10) / brickSize)] === 0
        && map[Math.round((norpTheYorp.y1 - 20) / brickSize)][Math.round((norpTheYorp.x1 + 20) / brickSize)] === 0){
            norpTheYorp.y1 -= 10;
        } else if(e.keyCode === 39 && map[Math.round((norpTheYorp.y1 - 10) / brickSize)][Math.round((norpTheYorp.x1 + 25) / brickSize)] === 0
        && map[Math.round((norpTheYorp.y1 + 30) / brickSize)][Math.round((norpTheYorp.x1 + 25) / brickSize)] === 0){
            norpTheYorp.x1 += 10;
            norp = document.getElementById('norp');
        } else if(e.keyCode === 40 && map[Math.round((norpTheYorp.y1 + 40) / brickSize)][Math.round((norpTheYorp.x1 -10) / brickSize)] === 0
        && map[Math.round((norpTheYorp.y1 + 40) / brickSize)][Math.round((norpTheYorp.x1 + 20) / brickSize)] === 0){
            norpTheYorp.y1 += 10;
        }
    }
    
    function resetValues() {
        timeLeft = 100;
        gameOver = false;
        partyCount = 0;
        missingYorp.yorpsFound = 0;
        yorpCount.textContent = missingYorp.yorpsFound;
        partyScore.textContent = partyCount;
        speedX = -2;
        speedY = -2;
        berkeloid = document.getElementById('berkeloid');
        fireCreature.x1 = 810;
        fireCreature.y1 = 570;        
        norp = document.getElementById('norp');
        norpTheYorp.x1 = 30;
        norpTheYorp.y1 = 30;
    }
    
    function setTimer() {
        resetValues();
        drawGame();
        let counter = setInterval(function countdown() {
            background.classList.add('hidden');
            canvas.classList.remove('hidden');
            timeLeft--;
            timer.textContent = timeLeft;
            if(timeLeft === 0 && missingYorp.yorpsFound === 5) {
                clearInterval(counter); 
                canvas.classList.add('hidden');
                background.classList.remove('hidden');
                firstImage.classList.add('hidden');
                waynesWorld.classList.remove('hidden');
                congrats.classList.remove('hidden');
                congrats.innerHTML = `Congratulations! <br> You found all your 
                friends and reached a party score of ${partyCount}!`;
            } else if(gameOver) {
                clearInterval(counter); 
                canvas.classList.add('hidden');
                background.classList.remove('hidden');
                firstImage.classList.add('hidden');
                burningYorp.classList.remove('hidden');
                congrats.classList.remove('hidden');
                congrats.innerHTML = 'Ouch, that hurt! <br> Try again!';
            } else if(timeLeft === 0) {
                clearInterval(counter); 
                canvas.classList.add('hidden');
                background.classList.remove('hidden');
                firstImage.classList.add('hidden');
                legallyBlonde.classList.remove('hidden');
                congrats.classList.remove('hidden');
                congrats.innerHTML = `Time is up! You couldn't find all your friends,
                so you ended up eating candy in bed alone. Better luck next time.`;
            }
        }, 1000);
    }
    
    
    function drawGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMap();
        drawNorp();
        if(missingYorp.yorpsFound < 5) {
            drawMissingYorp();
        }
        drawPartyItems(partyItemObjects);
        drawBerkeloid();
        collectPartyItemObjects(partyItemObjects);
        findYorp();
        berkeloidAttack();
        requestAnimationFrame(drawGame);
    }
    
    startBtn.addEventListener('click', setTimer); 
    document.addEventListener('keydown', moveNorp); 
    
    
    
    
})


