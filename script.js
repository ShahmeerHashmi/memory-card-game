document.addEventListener('DOMContentLoaded', () => {
    const symbols = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍍', '🍑'];
    const cardsArray = symbols.concat(symbols);
    const gameGrid = cardsArray.sort(() => 0.5 - Math.random());

    const game = document.querySelector('.memory-game');

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    function createBoard() {
        gameGrid.forEach(symbol => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.symbol = symbol;

            const frontFace = document.createElement('div');
            frontFace.classList.add('front-face');
            frontFace.textContent = symbol;

            const backFace = document.createElement('div');
            backFace.classList.add('back-face');

            card.appendChild(frontFace);
            card.appendChild(backFace);
            game.appendChild(card);

            card.addEventListener('click', flipCard);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;

        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    createBoard();
});
