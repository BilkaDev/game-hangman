import { Quote } from "./Quote.js";


class Game {
  currentStep = 0;
  lastStep = 7;
  quotes = [
    { text: "pan tadeusz", category: "utwór literacki" },
    { text: "akademia pana kleksa", category: "Film" },
    { text: "ogniem i mieczem", category: "Film" },
  ];


  constructor({ lettersWrapper, categoryWrapper, wordWrapper, outputWrapper }) {
    (this.lettersWrapper = lettersWrapper);
      (this.categoryWrapper = categoryWrapper);
      (this.wordWrapper = wordWrapper);
      (this.outputWrapper = outputWrapper);

    this.radnomQuotes();

  }
  radnomQuotes(){
    const {text, category} = this.quotes[Math.floor(Math.random() *   this.quotes.length)];
    this.categoryWrapper.textContent = category;
    this.quote = new Quote(text)
  }

  guess(letter, event) {
    event.target.disabled = true;
    if (this.quote.guess(letter)){
      this.drawQuotes();
    } else {
      this.currentStep++;
      document.getElementsByClassName('step')[this.currentStep].style.opacity = '1';
      if (this.currentStep === this.lastStep){
        this.losing();
      }
    }

  }
  drawLetter(){
    for (let i = 0; i < 26; i++) {
      const label = (i + 10).toString(36);
      const button = document.createElement("button");
      button.textContent = label;
      button.addEventListener("click", (event) => this.guess(label , event));
      this.lettersWrapper.appendChild(button);
    }
  }

  drawQuotes() {
    const content = this.quote.getContent();
    this.wordWrapper.textContent = content
    if (!content.includes('_')){
      this.winning()
      game.playAgain()

    }

  }

winning(){
    this.wordWrapper.textContent = "Congratulations! You Win!";
    this.lettersWrapper.textContent = ""
}
losing(){
    this.wordWrapper.textContent = "Game over!";
  game.playAgain()


}

  start() {
    document.getElementsByClassName('step')[this.currentStep].style.opacity = '1';
  this.drawLetter();
  this.drawQuotes()


  }

  playAgain() {
    const buttonPlayAgain = document.createElement('button')
    buttonPlayAgain.setAttribute('id','btn-again')
    buttonPlayAgain.textContent = 'Play again'
    buttonPlayAgain.addEventListener('click', (event) => this.restart(event))

    this.lettersWrapper.textContent = "";
    this.lettersWrapper.appendChild(buttonPlayAgain)
    this.radnomQuotes();


  }

  restart(event) {
    event.target.remove();
    this.currentStep = 0;
    [...document.getElementsByClassName('step')].forEach(item => item.style.opacity = '0.1')
    document.getElementsByClassName('step')[this.currentStep].style.opacity = '1';

    this.drawLetter();
    this.drawQuotes()

  }
}

const game = new Game({
  lettersWrapper: document.getElementById('letters'),
  categoryWrapper: document.getElementById('category'),
  wordWrapper: document.getElementById('word'),
  outputWrapper: document.getElementById('output')

});

game.start();
