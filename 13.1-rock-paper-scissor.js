let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0,
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
  if(!isAutoPlaying){

    intervalId = setInterval(() => {//set interval always generate a interval id
    const playerMove = pickComputerMove();
    playGame(playerMove);
  },1000);
  isAutoPlaying = true;
  }
  else{
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('Rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('Paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('Scissors');
  });

// document.querySelector('.js-autoplay-button')
//   .addEventListener('click', () => {
//     autoPlay();
//   });


document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r'){
    playGame('Rock');
  }

  else if (event.key === 'p'){
    playGame('Paper');
  }

  else if (event.key === 's'){
    playGame('Scissors');
  }
});

function playGame(playerMove){
  const computerMove = pickComputerMove();
  let result = '';
  if (playerMove === 'Scissors'){
    if(computerMove === 'Scissors'){
    result = 'TIE';
    }
    else if(computerMove === 'Paper'){
      result = 'You Win!!';
    }
    else if(computerMove === 'Rock'){
      result = 'You Lose ??';
    }
  }

  else if(playerMove === 'Paper'){
    
    if(computerMove === 'Paper'){
      result = 'TIE';
    }
    else if(computerMove === 'Rock'){
      result = 'You Win!!';
    }
    else if(computerMove === 'Scissors'){
      result = 'You Lose ??';
    }
  }

  else if(playerMove === 'Rock'){
    if(computerMove === 'Rock'){
      result = 'TIE';
    }
    else if(computerMove === 'Scissors'){
      result = 'You Win!!';
    }
    else if(computerMove === 'Paper'){
      result = 'You Lose ??';
    }
  } 

  if(result === 'You Win!!'){
    score.wins++;
  }

  else if(result === 'You Lose ??'){
    score.losses++;
  }

  else if(result === 'TIE'){
    score.ties++;
  }

  localStorage.setItem('score',JSON.stringify(score));
  
  updateScoreElement();

  document.querySelector('.js-result')
  .innerHTML = result;


document.querySelector('.js-moves')
  .innerHTML = `You
<img src="images/${playerMove}.jpg" class="move-icon">
<img src="images/${computerMove}.jpg" class="move-icon">
computer`;
  
}

function updateScoreElement(){
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
  

function pickComputerMove(){
  let computerMove = '';
  const randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1/3){
    computerMove = 'Rock';
  }

  else if (randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'Paper';
  }

  else if (randomNumber >= 2/3 && randomNumber < 1){
    computerMove = 'Scissors';
  }  
  return computerMove;   
}