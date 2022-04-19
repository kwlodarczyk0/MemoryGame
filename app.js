const board = document.querySelector(".board");
const btn = document.querySelector(".btn");
const moves = document.querySelector(".moves");
const fields = document.querySelectorAll(".field");
const rounds = document.querySelector(".rounds");

const colors = [
  "orange",
  "orange",
  "red",
  "red",
  "blue",
  "blue",
  "yellow",
  "yellow",
  "green",
  "green",
  "silver",
  "silver",
  "black",
  "black",
  "purple",
  "purple",
];

class MemoryGame {
  constructor() {
    this.rounds = 0;
    this.init();
  }

  init = () => {
    this.end = 0;
    this.moves = 0;
    moves.textContent = `Moves: ${this.moves}`;
    rounds.textContent = `Rounds played: ${this.rounds}`;
    this.colors = [...colors];
    this.turn = true;
    this.firstTouch = null;
    this.run = false;
    this.generateBoard(this.colors.length);
    this.mixColors();
  };

  generateBoard = (size) => {
    for (let i = 0; i < size; i++) {
      const field = document.createElement("div");
      field.classList.add("field");
      field.id = i;
      board.appendChild(field);
      field.addEventListener("click", this.game);
    }
  };

  mixColors = () => {
    const fields = document.querySelectorAll(".field");
    const table = [...this.colors];
    fields.forEach((field) => {
      const index = Math.floor(Math.random() * table.length);
      field.classList.add(table[index]);
      table.splice(index, 1);
    });
    setTimeout(() => {
      this.hideColor();
    }, 1500);
  };

  hideColor = () => {
    const fields = document.querySelectorAll(".field");
    fields.forEach((field) => {
      if (!field.classList.contains("marked")) {
        field.classList.add("hidden");
      }
    });
  };

  reset = () => {
    this.rounds++;
    const fields = document.querySelectorAll(".field");
    fields.forEach((field) => {
      board.removeChild(field);
    });
    this.init();
  };

  checkWin = () => {
    const fields = document.querySelectorAll(".field");
    let it = 0;
    fields.forEach((field) => {
      if (field.classList.contains("marked")) {
        it++;
      }
    });
    if (it === fields.length) {
      console.log("The end");
    }
  };

  game = (e) => {
    if (e.target.classList.contains("marked")) {
      return;
    } else {
      if (this.turn) {
        clearInterval(this.run);
        this.hideColor();
        e.target.classList.remove("hidden");
        this.firstTouch = e.target;
        this.turn = false;
      } else {
        if (e.target.classList.contains("hidden")) {
          e.target.classList.remove("hidden");
          const clicked = e.target;
          const firstClick = this.firstTouch;

          if (clicked.classList.value == firstClick.classList.value) {
            clicked.classList.add("marked");
            this.firstTouch.classList.add("marked");
          } else {
            this.run = setTimeout(() => {
              this.hideColor();
            }, 500);
          }
          this.turn = true;
          this.firstTouch = null;
          this.moves += 1;
          this.checkWin();
          moves.textContent = `Moves: ${this.moves}`;
        }
      }
    }
  };
}

const memoryGame = new MemoryGame();
btn.addEventListener("click", memoryGame.reset);
