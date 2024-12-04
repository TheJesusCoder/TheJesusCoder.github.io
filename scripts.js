
const cards = document.querySelectorAll('.memory-card');
let pointage = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  console.log(pointage);
  Win();

  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ?  (pointage += 1,disableCards()) : unflipCards();
  Win();
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
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

if (localStorage.getItem("pasafficher") !== "true")
{
  document.getElementById("dia").showModal();
}

function NePasAfficher()
{
  localStorage.setItem("pasafficher", "true");
}

const winbox = document.getElementById("winMessage");

const WinCount = document.getElementById("WinCount");
localStorage.getItem("NombreWin");
let nombreWin = parseInt(localStorage.getItem("NombreWin"));

if (localStorage.getItem("NombreWin") == null)
{
  localStorage.setItem("NombreWin", 0);
}

function Win(){
  if (pointage == 9)
    {
      winbox.setAttribute("class", "win");
      nombreWin = nombreWin + 1;
      localStorage.setItem("NombreWin", nombreWin);
    }
  }
  

WinCount.innerText = "Nombre de victoire: " + nombreWin;
