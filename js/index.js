const cards = document.querySelectorAll('.memory-card');
// console.log('Hello', cards);

let hasFlippedCard = false;
let boardlocked = false;
let firstCard, secondCard;

const flipCard = e => {
    if(boardlocked) return;
    const target = e.target.parentElement;

    if (target === firstCard) return;

    target.classList.add("flip");

    if(!hasFlippedCard) {
        //  First click

        hasFlippedCard = true;
        firstCard = target;

    }else{
        //  Second Click
        hasFlippedCard = false;
        secondCard = target;


        // Check for match
        checkForMatch();
        
    }


};
const checkForMatch = () => {
    const isEqual = firstCard.dataset.framework === secondCard.dataset.framework;

    isEqual? disableCard() : unflipCards();

    
}

const disableCard = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

const unflipCards = () => {
    boardlocked = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        boardlocked = false;
    }, 1000);

}

const resetboard = () => {
    // double insertation
    hasFlippedCard = boardlocked = false;
    firstCard = secondCard = null;
}



// function flipCard() {

// }

cards.forEach(card => {
    //Add evenlistener to every card
    card.addEventListener("click", flipCard);

    const randomIndex = Math.floor(Math.random() * cards.length)
    card.style.order = randomIndex;
})