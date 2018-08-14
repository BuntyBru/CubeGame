/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 50 points on GLOBAL score wins the game

*/
var scores,roundScore,activePlayer,gamePlaying;
var lastDice;


init();
dice= Math.floor(Math.random()*6)+1;

//document.querySelector("#current-"+ activePlayer).textContent=dice;
//document.querySelector("#current-"+ activePlayer).innerHTML="<em>"+dice+"</em>";

//var x = document.querySelector("#score-0").textContent;

document.querySelector('.btn-roll').addEventListener("click",function(){

	if(gamePlaying)
	{
		var dice = Math.floor(Math.random()*6)+1;

	//2 Display the result
	var diceDOM = document.querySelector(".dice");
	diceDOM.style.display="block";
	diceDOM.src = "dice-"+dice+".png"

	//3 Update the round score only if the rolled number was not a 1

	if(dice === 6 && lastDice===6)
	{
		//Since there are two 6s occured in a row the player will loose its score and the turn willget transferred to next player.
		//Player looses score
		scores[activePlayer]=0;
		document.querySelector('#score-'+activePlayer).textContent='0';
		//the score is zero now the chance should be transferred to the next player
		nextPlayer();

	}

	else if(dice!==1)
	{
		//Add score
		roundScore=roundScore+dice;
		document.querySelector("#current-"+activePlayer).textContent=roundScore;
	
	}

	else
	{
		//Next Player
	nextPlayer();


	}
// we are storing the last number rolled in dice so that we can put up the score when number 6 is rolled out two times.
	lastDice=dice;

	}

	//1 Random number
	
});



document.querySelector('.btn-hold').addEventListener('click',function(){

	if (gamePlaying){
			scores[activePlayer]+=roundScore;

	document.querySelector('#score-'+activePlayer).textContent=scores[activePlayer];

//Addition of the input field which will enable the user to choose the final score through input

	var input = document.querySelector('.final-score').value;
	console.log(input);
	var winningScore;

	//Undefined , 0, null or "" are COERCED to false
	// Anything e;se is coerced to true
	if(input)
	{

		winningScore = input;
	}
	else
	{
		winningScore = 30;
	}



	//Check if the players have won the game

	if(scores[activePlayer] >= winningScore)
	{
		document.querySelector("#name-"+activePlayer).textContent="Winner!";
		document.querySelector(".dice").style.display="none";
		document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
		document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
		gamePlaying=false;
	}
	else
	{
		nextPlayer();
	}


	}
	//add current score to global score


});





function nextPlayer() {
			activePlayer===0 ? activePlayer=1 : activePlayer=0;
		roundScore=0;

		document.getElementById('current-0').textContent='0';
		document.getElementById('current-1').textContent='0';

		document.querySelector(".player-0-panel").classList.toggle('active');
		document.querySelector(".player-1-panel").classList.toggle('active');

		document.querySelector('.dice').style.display="none";
}


document.querySelector(".btn-new").addEventListener("click",function(){
init();
});


function init(){
		scores=[0,0];
	activePlayer=0;
	roundScore=0;

	gamePlaying = true;


document.querySelector(".dice").style.display="none";

document.getElementById('score-0').textContent="0";
document.getElementById('score-1').textContent="0";
document.getElementById('current-0').textContent="0";
document.getElementById('current-1').textContent="0";
document.getElementById("name-1").textContent="Player 2";
document.getElementById("name-0").textContent="Player 1";
document.querySelector(".player-0-panel").classList.remove("winner");
document.querySelector(".player-1-panel").classList.remove("winner");
document.querySelector(".player-0-panel").classList.remove("active");
document.querySelector(".player-1-panel").classList.remove("active");
document.querySelector(".player-0-panel").classList.add("active");
}