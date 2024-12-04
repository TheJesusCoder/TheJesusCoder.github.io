
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

  /**si c'est un match, on augmente le pointage et active Win pour voir si il a tout matché*/
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
/** si pasafficher est différent de vrai, affiche le dialog */
if (localStorage.getItem("pasafficher") !== "true")
{
  document.getElementById("dia").showModal();
}
/** active quand le bouton "ne plus afficher ce message" est clické */
function NePasAfficher()
{
  localStorage.setItem("pasafficher", "true");
}

const winbox = document.getElementById("winMessage");
/**créer les variables dans le stokage local et les set */
const WinCount = document.getElementById("WinCount");
localStorage.getItem("NombreWin");
let nombreWin = parseInt(localStorage.getItem("NombreWin"));

/**Si le nombre de win est null, le met à 0 */
if (localStorage.getItem("NombreWin") == null)
{
  localStorage.setItem("NombreWin", 0);
}

/**Si le pointage est le bon, on change la classe de la div Winbox pour afficher la div et change le nombre de victoire dans le stockage local */
function Win(){
  if (pointage == 9)
    {
      winbox.setAttribute("class", "win");
      nombreWin = nombreWin + 1;
      localStorage.setItem("NombreWin", nombreWin);
    }
  }
  
/**affiche le texte dans la div du pointage */
WinCount.innerText = "Nombre de victoire: " + nombreWin;
