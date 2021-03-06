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
    const dirtyDancing = document.getElementById('dirty-dancing');
    const breakfastClub = document.getElementById('breakfast-club');
    const greatGatsby = document.getElementById('great-gatsby');
    const satc = document.getElementById('satc');
    const firstImage = document.getElementById('first-image');
    const congrats = document.getElementById('congrats');
    const lastWords = document.getElementById('last-words');
    const partyType = document.getElementById('type-party');
    const collectSound = new Audio('collectCandy3.mp3');
    const ouch = new Audio('ouch.mp3');
    const findingYorp = new Audio('collectYorp.mp3');


    const brickSize = 30;
    let timeLeft;
    let gameOver = false;
    let partyCount;
    let requestID = null;
    let typeOfParty;
    let counter;

    //possible map-positions for Norps missing friends
    let missingYorpPositions = [
        [5, 2], [17, 2], [14, 5], [9, 11], [10, 16], [5, 19], [24, 19], [18, 12], [23, 8]
    ];
    
    const yorpImages = [yorpBarrel, yorpBook, yorpFlower, yorpMushroom, yorpTeddy];
    
    let norpTheYorp = {
        x1: 30,
        y1: 30
    };
    
    let missingYorp = {
        getPosition: missingYorpPositions[Math.floor(Math.random() * missingYorpPositions.length)],
        img: yorpImages[Math.floor(Math.random() * yorpImages.length)],
        yorpsFound: 0
    
    };
    
    let fireCreature = {
        x1: 810,
        y1: 570,
    };
    let speedX = -2;
    let speedY = -2;

    
    const partyItems = [lollipop, cake, cookie, soda, peppermint, pizza, iceCream];
    let partyItemObjects = [];
    
    //a loop that creates party item objects and pushes them in to the array above
    for (let i = 0; i < 10; i++) {
        let item = {
            x1: Math.floor(Math.random() * 29),
            y1: Math.floor(Math.random() * 21),
            img: partyItems[Math.floor(Math.random() * partyItems.length)],
    
        };
        partyItemObjects.push(item);
    }
    
    
    //a map of the game, 1 means a brick and 0 means empty space
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
    
    //contains a nested for-loop that draws the map
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

    function drawMissingYorp() {
        ctx.drawImage(missingYorp.img, missingYorp.getPosition[0] * brickSize, missingYorp.getPosition[1] * brickSize + 5);
    }
    
    //draws the Berkeloid and controls its movements
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
    

    //puts the 10 party items in random places in the map
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
    
    

    //detects if you are in the same place as a party item
    function collectPartyItemObjects(arrayOfPartyItems) {
        for(let i = 0; i < arrayOfPartyItems.length; i++) {
            if((Math.round(norpTheYorp.x1 / brickSize) === arrayOfPartyItems[i].x1 
            && Math.round(norpTheYorp.y1 / brickSize) === arrayOfPartyItems[i].y1)
            || (Math.round((norpTheYorp.x1 + 10) / brickSize) === arrayOfPartyItems[i].x1
            && Math.round((norpTheYorp.y1 + 30) / brickSize) === arrayOfPartyItems[i].y1)) {
                
                collectSound.play();
                arrayOfPartyItems[i].x1 = Math.floor(Math.random() * 29);
                arrayOfPartyItems[i].y1 = Math.floor(Math.random() * 21);
                arrayOfPartyItems[i].img = partyItems[Math.floor(Math.random() * 5)];
                drawPartyItems(arrayOfPartyItems);
                partyCount++;
                partyScore.textContent = partyCount;
            }
        }
    } 
    
    //detects if you are in the same place as a Yorp friend
    function findYorp() {
        if((Math.round(norpTheYorp.x1 / brickSize) === missingYorp.getPosition[0] +1
        && Math.round(norpTheYorp.y1 / brickSize) === missingYorp.getPosition[1] + 1)
        || (Math.round((norpTheYorp.x1 + 10) / brickSize) === missingYorp.getPosition[0] + 1
        && Math.round((norpTheYorp.y1 + 30) / brickSize) === missingYorp.getPosition[1] + 1)) {
            findingYorp.play();
            let newPosition = missingYorpPositions[Math.floor(Math.random() * missingYorpPositions.length)];
            if((newPosition[0] != missingYorp.getPosition[0]) && (newPosition[0] != missingYorp.getPosition[1])){
                missingYorp.getPosition = newPosition;
                missingYorp.img = yorpImages[Math.floor(Math.random() * yorpImages.length)];
                missingYorp.yorpsFound++;
                yorpCount.textContent = missingYorp.yorpsFound;
            } else {
                newPosition = missingYorpPositions[Math.floor(Math.random() * missingYorpPositions.length)];
            }

        }
    }
    
    //detects if you are hit by the Berkeloid
    function berkeloidAttack() {
        if((Math.round((norpTheYorp.x1 + 20) / brickSize) === Math.round((fireCreature.x1 + 30) / brickSize) 
        && Math.round((norpTheYorp.y1 + 20) / brickSize) === Math.round((fireCreature.y1 + 40) / brickSize))
        || (Math.round((norpTheYorp.x1 + 20) / brickSize) === Math.round((fireCreature.x1 + 30) / brickSize)
        && Math.round((norpTheYorp.y1 + 50) / brickSize) === Math.round((fireCreature.y1 + 40) / brickSize))) {
            ouch.play();
            gameOver = true;
        }
    }
    
    
    //this is how you can move Norp without going in to bricks
    function moveNorp(e) {
        //go left
        if(e.keyCode === 37 && map[Math.round((norpTheYorp.y1 - 10) / brickSize)][Math.round((norpTheYorp.x1 - 20) / brickSize)] === 0
        && map[Math.round((norpTheYorp.y1 + 30) / brickSize)][Math.round((norpTheYorp.x1 - 20) / brickSize)] === 0
        && map[Math.round((norpTheYorp.y1 + 10) / brickSize)][Math.round((norpTheYorp.x1 - 20) / brickSize)] === 0){
            norpTheYorp.x1 -= 10;
            norp = document.getElementById('norp2');
        //go up
        } else if(e.keyCode === 38 && map[Math.round((norpTheYorp.y1 - 20) / brickSize)][Math.round((norpTheYorp.x1 - 10) / brickSize)] === 0
        && map[Math.round((norpTheYorp.y1 - 20) / brickSize)][Math.round((norpTheYorp.x1 + 20) / brickSize)] === 0){
            norpTheYorp.y1 -= 10;
        //go right
        } else if(e.keyCode === 39 && map[Math.round((norpTheYorp.y1 - 10) / brickSize)][Math.round((norpTheYorp.x1 + 25) / brickSize)] === 0
        && map[Math.round((norpTheYorp.y1 + 30) / brickSize)][Math.round((norpTheYorp.x1 + 25) / brickSize)] === 0
        && map[Math.round((norpTheYorp.y1 + 10) / brickSize)][Math.round((norpTheYorp.x1 + 25) / brickSize)] === 0){
            norpTheYorp.x1 += 10;
            norp = document.getElementById('norp');
        //go down
        } else if(e.keyCode === 40 && map[Math.round((norpTheYorp.y1 + 40) / brickSize)][Math.round((norpTheYorp.x1 -10) / brickSize)] === 0
        && map[Math.round((norpTheYorp.y1 + 40) / brickSize)][Math.round((norpTheYorp.x1 + 20) / brickSize)] === 0){
            norpTheYorp.y1 += 10;
        }
    }
    
    //resets all values so you can restart the game without reloading the page
    function resetValues() {
        timeLeft = 100;
        gameOver = false;
        partyCount = 0;
        missingYorp.yorpsFound = 0;
        yorpCount.textContent = missingYorp.yorpsFound;
        partyScore.textContent = partyCount;
        berkeloid = document.getElementById('berkeloid');
        fireCreature.x1 = 810;
        fireCreature.y1 = 570;        
        norp = document.getElementById('norp');
        norpTheYorp.x1 = 30;
        norpTheYorp.y1 = 30;
        congrats.classList.add('hidden');
        lastWords.classList.add('hidden');
        waynesWorld.classList.add('hidden');
        satc.classList.add('hidden');
        breakfastClub.classList.add('hidden');
        dirtyDancing.classList.add('hidden');
        legallyBlonde.classList.add('hidden');
        greatGatsby.classList.add('hidden');
        burningYorp.classList.add('hidden');
        cancelAnimationFrame(requestID);
        clearInterval(counter); 
    }
    
    //connected to the start button, controls the timeframe of the game and calls the drawGame function
    function setTimer() {
        resetValues();
        drawGame();
        background.classList.add('hidden');
        canvas.classList.remove('hidden');
        counter = setInterval(function countdown() {
            if(timeLeft === 0 && missingYorp.yorpsFound === 5) {
                cancelAnimationFrame(requestID);
                clearInterval(counter); 
                canvas.classList.add('hidden');
                background.classList.remove('hidden');
                firstImage.classList.add('hidden');
                congrats.classList.remove('hidden');
                lastWords.classList.remove('hidden');
                if(partyCount < 10){
                    background.style.backgroundColor = 'rgb(123, 204, 207)';
                    typeOfParty = 'DETENTION PARTY';
                    breakfastClub.classList.remove('hidden');
                } else if(partyCount < 15){
                    background.style.backgroundColor = 'rgb(95, 127, 196)';
                    typeOfParty = 'CAR PARTY';
                    waynesWorld.classList.remove('hidden');
                } else if(partyCount < 20) {
                    background.style.backgroundColor = 'rgb(104, 73, 161)';
                    typeOfParty = 'SHOT PARTY';
                    satc.classList.remove('hidden');
                } else if(partyCount < 25){
                    background.style.backgroundColor = 'rgb(254, 150, 132)';
                    typeOfParty = 'DANCE PARTY';
                    dirtyDancing.classList.remove('hidden');
                } else {
                    background.style.backgroundColor = 'rgb(84, 253, 254)';
                    typeOfParty = 'MEGA PARTY';
                    greatGatsby.classList.remove('hidden');
                }
                congrats.innerHTML = 'Congratulations!';
                lastWords.innerHTML = `You found all of your Yorp friends and reached a 
                party score of ${partyCount} which means <br> – <span id="type-party"> ${typeOfParty} </span>!`;
            } else if(gameOver) {
                cancelAnimationFrame(requestID);
                clearInterval(counter); 
                canvas.classList.add('hidden');
                background.style.backgroundColor = 'rgb(211, 211, 211)';
                background.classList.remove('hidden');
                firstImage.classList.add('hidden');
                burningYorp.classList.remove('hidden');
            } else if(timeLeft === 0) {
                cancelAnimationFrame(requestID);
                clearInterval(counter); 
                canvas.classList.add('hidden');
                background.classList.remove('hidden');
                firstImage.classList.add('hidden');
                background.style.backgroundColor = 'rgb(164, 64, 202)';
                legallyBlonde.classList.remove('hidden');
                congrats.classList.remove('hidden');
                lastWords.classList.remove('hidden');
                congrats.innerHTML = `Time is up!`;
                lastWords.innerHTML = `You couldn't find all of your friends,
                so you ended up eating candy in bed alone. Better luck next time.`;
            } else {
                timeLeft--;
                timer.textContent = timeLeft;
            }
        }, 1000);
    }
    
    //draws everything that you see in the canvas
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
        requestID = requestAnimationFrame(drawGame);
    }
    
    startBtn.addEventListener('click', setTimer); 
    document.addEventListener('keydown', moveNorp); 
    
})


