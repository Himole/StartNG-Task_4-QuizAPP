const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore')
const latestScore = localStorage.getItem('latestScore');

// fetch score from local storage display on the end page
finalScore.innerText = latestScore;
    
//Set local storage to store high Score
const highScores = JSON.parse(localStorage.getItem('highScores')) 
|| [];
    //Set max.Num of Score in the HighScore Array
const MAX_HIGH_SCORE = 10;
//console.log(highScores);

//Set the save score button to disabled with when the form input fiels is empty
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value; 
});

saveHighScore = e => {
    console.log("clicked the save button!");
    e.preventDefault();

    const score = {
        score: latestScore,
        name: username.value
    };
    highScores.push(score)
        //sort the array of HighScores in the storage location from highest to lowest
    highScores.sort( (a, b) =>  b.score - a.score);
    highScores.splice(10); 

    localStorage.setItem('highScores', JSON.stringify(highScores));
        //retur to the HomePage
    window.location.assign('HomePage.html')

    //console.log(highScores);
};