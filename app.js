const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

console.log(gameArea);

let player = { speed : 5 ,score: 0};

startScreen.addEventListener('click', start);

let keys = {ArrowUp : false, ArrowDown: false, ArrowRight: false, ArrowLeft: false};

document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);

function keydown(e){
    e.preventDefault();
    keys[e.key] = true;
   // console.log(e.key);
    //console.log(keys);
}

function keyup(e){
    e.preventDefault();
    keys[e.key] = false;
    //console.log(e.key)
    //console.log(keys);
}

function moveLines(){
    let lines = document.querySelectorAll('.lines');

    lines.forEach( function(item) {

        if(item.y >= 700){
            item.y -= 750;
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}


function endGame(){
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "GAME OVER. <br> YOUR FINAL SCORE IS " + player.score +"<br> PRESS HERE TO RESTART THE GAME."

}


 function isCollide(a,b){
     aRect = a.getBoundingClientRect();
     bRect = b.getBoundingClientRect();

     return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) 
     || (aRect.left > bRect.right) );
 }

function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach( function(item) {


        if(isCollide(car,item)){
            console.log('busted');
            endGame();
        }

        if(item.y >= 750){
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";

        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}


function gamePlay(){
    //console.log('hey i am clicked');
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    //console.log(road);


    if(player.start){

        moveLines();
        moveEnemy(car);
        
        if(keys.ArrowUp && player.y > (road.top + 70)) { player.y -= 5}
        if(keys.ArrowDown  && player.y < (road.bottom - 85)) { player.y += 5}
        if(keys.ArrowLeft && player.x > 0) { player.x -= 5}
        if(keys.ArrowRight && player.x < (road.width - 50) ) { player.x += 5}
        
        car.style.top = player.y +"px";
        car.style.left = player.x + "px";


        window.requestAnimationFrame(gamePlay);
        console.log(player.score++);

        player.score++;
        let ps = player.score -2 ;
        score.innerText = "Score : " + ps;
    }
}

function start(){

    //gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";

    player.start = true;
    player.score = 0;
    requestAnimationFrame(gamePlay);


    for(x = 0; x < 5; x++){
        
    let roadLine = document.createElement('div');
    roadLine.setAttribute('class', 'lines');
    roadLine.y = (x * 150);
    roadLine.style.top = roadLine.y + "px";
    gameArea.appendChild(roadLine); 

    }

    let car = document.createElement('div');
    car.setAttribute('class' , 'car');
    //car.innerText = "hey i am your car";
    gameArea.appendChild(car); 

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

   // console.log("Top position:"+ car.offsetTop);
 //   console.log("Left Position"+ car.offsetLeft);


 for(x = 0; x < 3; x++){
        
    let enemyCar = document.createElement('div');
    enemyCar.setAttribute('class', 'enemy');
    enemyCar.y = ( (x *1) * 350) * -1;
    enemyCar.style.top = enemyCar.y + "px";
    enemyCar.style.backgroundColor = randomCar();
    enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
    gameArea.appendChild(enemyCar); 

    }

}


function randomCar(){
    let x = Math.floor(Math.random()*3)+1;
}