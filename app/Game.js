import { Quote } from "./Quote.js";


class Game {
  quotes = [
    { text: "pan tadeusz", category: "utwór literacki" },
    { text: "akademia pana kleksa", category: "Film" },
    { text: "ogniem i mieczem", category: "Film" },
  ];


  constructor({ lettersWrapper, categoryWrapper, wordWrapper, outputWrapper }) {
    (this.lettersWrapper = lettersWrapper),
      (this.categoryWrapper = categoryWrapper),
      (this.wordWrapper = wordWrapper),
      (this.outputWrapper = outputWrapper);

    const {text, category} = this.quotes[Math.floor(Math.random() *   this.quotes.length)];
    this.categoryWrapper.textContent = category;
    this.quote = new Quote(text)

  }

  guess(letter) {
    event.target.disabled = true;
    this.quote.guess(letter)
    this.drawQuotes()
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

  }



  start() {
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
