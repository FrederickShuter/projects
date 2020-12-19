/*
 * Create a list that holds all of your cards
 */
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

const cardsContainer = document.querySelector(".deck");

let openedCards = [];
let matchedCards = [];

/*
 * Initialize the game
 */
function init() {
    const arr = shuffle(icons);
    for(let i = 0; i < arr.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${arr[i]}"></i>`;
        cardsContainer.appendChild(card);
    
        // Add Click Event to each Card
        click(card);
    }
}


// First Click Indicator
let isFirstClick = true;

// Click Function
function click(card) {

    // Card Click Event
    card.addEventListener("click", function() {


        if(isFirstClick) {
            // Start our timer
            startTimer();
            // Change our First Click indicator's value
            isFirstClick = false;
        }
        
        const currentCard = this;
        const previousCard = openedCards[0];

        // We have an existing OPENED card
        if(openedCards.length === 1) {

            card.classList.add("open", "show", "disable");
            openedCards.push(this);

            // We should compare our 2 opened cards!
            compare(currentCard, previousCard);

        } else {
        // We don't have any opened cards
            currentCard.classList.add("open", "show", "disable");
            openedCards.push(this);
        }
        
    });
}


/*
 * Compare the 2 cards
 */
function compare(currentCard, previousCard) {

    // Matcher
    if(currentCard.innerHTML === previousCard.innerHTML) {
                
        // Matched
        currentCard.classList.add("match");
        previousCard.classList.add("match");

        matchedCards.push(currentCard, previousCard);

        openedCards = [];

        // Check if the game is over!
        isOver();

    } else {
        
        // Wait 500ms then, do this!
        setTimeout(function() {
            currentCard.classList.remove("open", "show", "disable");
            previousCard.classList.remove("open", "show", "disable");
            
        }, 500);

        openedCards = [];
        
    }

    // Add New Move
    addMove();
}

/*
 * Check if the game is over!
 */
function isOver() {
    if(matchedCards.length === icons.length) {

        // Stop our timer
        stopTimer();


        alert("GAME OVER!");
        
    }
}


/*
 * Add move
 */
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
    moves++;
    movesContainer.innerHTML = moves;

    // Set the rating
    rating();
}

/*
 * Rating
 */
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;
function rating() {

    if( moves < 10) {
        starsContainer.innerHTML = star + star + star;
    } else if( moves < 15) {
        starsContainer.innerHTML = star + star;
    } else {
        starsContainer.innerHTML = star;
    }
}


/*
 * Timer
 */
const timerContainer = document.querySelector(".timer");
let liveTimer,
    totalSeconds = 0;

// Set the default value to the timer's container
timerContainer.innerHTML = totalSeconds + 's';


 function startTimer() {
    liveTimer = setInterval(function() {
        // Increase the totalSeconds by 1
        totalSeconds++;
        // Update the HTML Container with the new time
        timerContainer.innerHTML = totalSeconds + 's';
    }, 1000);
}

//TIMER

function stopTimer() {
    clearInterval(liveTimer);
}

/*
 * Restart Button
 */
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
    // Delete ALL cards
    cardsContainer.innerHTML = "";

    // Call `init` to create new cards
    init();

    // Reset the game
    reset();

});


/*
 * Reset All Game Variables
 */
function reset() {
    // Empty the `matchedCards` array
    matchedCards = [];

    // Reset `moves`
    moves = 0;
    movesContainer.innerHTML = moves;

    // Reset `rating`
    starsContainer.innerHTML = star + star + star;


    stopTimer();
    isFirstClick = true;
    totalSeconds = 0;
    timerContainer.innerHTML = totalSeconds + "s";
}


/////// Start the game for the first time!
init();



///Shuffle function below 

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

