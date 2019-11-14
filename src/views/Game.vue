<template>
  <div class="about">
    <p>Amount of Sets {{setCounter}} </p>
    <p>Points: {{points}}</p>
    <canvas
      @click="clickOnCanvas($event)"
      :width="canvas_width"
      :height="canvas_height"
      id="canvas"
      ref="game_canvas"
    ></canvas>
  </div>
</template>

<script>
class Card {
  constructor(color, amount, filling, form) {
    this.color = color;
    this.amount = amount;
    this.filling = filling;
    this.form = form;
  }
  setPosition(x_min, y_min, x_max, y_max) {
    this.x_min = x_min;
    this.y_min = y_min;
    this.x_max = x_max;
    this.y_max = y_max;
  }
}
class Highscore {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}
export default {
  name: "Game",
  data() {
    return {
      setCounter: 0,
      allCards: [],
      board: [],
      clickedCards: [],
      canvas_height: window.innerHeight / 2,
      canvas_width: window.innerWidth,
      x: 0,
      y: 0,
      points: 0,
      pointsForCurrentSet: 100
    };
  },
  methods: {
    // TODO: Add a save Button for the current Game
    checkSetProperties(first, second, third){
      return (first === second && first === third) || (first !== second && first !== third && second !== third) ;
    },
    checkThreeCardsForASet(firstCard, secondCard, thirdCard){
      if (this.checkSetProperties(
        this.board[firstCard].color, this.board[secondCard].color, this.board[thirdCard].color) &&
        this.checkSetProperties(
        this.board[firstCard].amount, this.board[secondCard].amount, this.board[thirdCard].amount) &&
        this.checkSetProperties(
        this.board[firstCard].filling, this.board[secondCard].filling, this.board[thirdCard].filling) &&
        this.checkSetProperties(
        this.board[firstCard].form, this.board[secondCard].form, this.board[thirdCard].form)
        ){
        return true;
      }
      return false;
    },
    findAllSets(){
      this.setCounter = 0;
      for (var firstCard = 0; firstCard < this.board.length - 2; firstCard++) {
        for (var secondCard = firstCard + 1; secondCard < this.board.length - 1; secondCard++) {
          for (var thirdCard = secondCard + 1; thirdCard < this.board.length; thirdCard++) {
           if (this.checkThreeCardsForASet(firstCard, secondCard, thirdCard)) {
             this.setCounter = this.setCounter + 1;
           }
          }
        }
      }
    },
    createAllCards() {
      for (var color = 0; color < 3; color++) {
        for (var form = 0; form < 3; form++) {
          for (var filling = 0; filling < 3; filling++) {
            for (var amount = 1; amount < 4; amount++) {
              this.allCards.push(new Card(color, amount, filling, form));
            }
          }
        }
      }
      for (var i = 0; i < 12; i++) {
        this.board.push(this.getRandomCard());
        this.allCards.splice(this.allCards.indexOf(this.board[i]), 1);
      }
      this.drawBoard(this.board); // Draws the Board Cards
      this.findAllSets(); // Finds all Sets in the First Board
    },
    getClickedCard(clickPosX, clickPosY) {
      for (var i = 0; i < this.board.length; i++) {
        if (this.board[i].x_min < clickPosX && this.board[i].y_min < clickPosY &&
            this.board[i].x_max > clickPosX && this.board[i].y_max > clickPosY) {
          return i;
        }
      }
    },
    redrawCardAfterSelcted(cardIndex, color){
      var card = this.board[cardIndex];
      this.ctx.clearRect(card.x_min - 10, card.y_min - 0, card.x_max - card.x_min, card.y_max - card.y_min);
      this.ctx.fillStyle = color;
      this.ctx.fillRect(card.x_min - 10, card.y_min - 0, card.x_max - card.x_min + 20, card.y_max - card.y_min);
      this.drawCard(card, card.x_min, card.y_min, card.x_max - card.x_min, card.y_max - card.y_min);
    },
    addAndRedrawSelectedCard(x, y){
      var cardIndex = this.getClickedCard(x, y);
      if (!this.clickedCards.includes(cardIndex)){
        this.clickedCards.push(cardIndex); // Add Card to the "checkForSet" Array
        this.redrawCardAfterSelcted(cardIndex,"blue");
      }
    },
    // TODO: Sortiert einfügen
    saveScore() {
      var score = new Highscore("sven2", this.points);
      var a = [];
      if (JSON.parse(localStorage.getItem('set_game'))){
        a = JSON.parse(localStorage.getItem('set_game'))
      }
      a.push(score)
      localStorage.setItem('set_game', JSON.stringify(a));
      var game_zeug = JSON.parse(localStorage.getItem('set_game'));
      this.$log.info(game_zeug);
    },
    clickOnCanvas(event) {
      // TODO: Stop the Game when all Sets are Found and this.allCards are empty
      var rect = this.canvas.getBoundingClientRect();
      this.x = event.clientX - rect.left;
      this.y = event.clientY - rect.top;
      // When three Cards are Selected check them
      if (this.clickedCards.length === 2) {
        this.addAndRedrawSelectedCard(this.x, this.y);
        if (this.clickedCards.length === 3) {
          // When a Set is found replace the old Cards with new Cards and redraw the board
          if (this.checkThreeCardsForASet(this.clickedCards[0], this.clickedCards[1], this.clickedCards[2])) {
            this.points = this.points + this.pointsForCurrentSet; // Adds points for the correct Set
            for (var i = 0; i < 3; i++) {
              this.board.splice(this.clickedCards[i], 1, this.getRandomCard());
              this.allCards.splice(this.allCards.indexOf(this.board[this.clickedCards[i]]), 1);
              //this.redrawCardAfterSelcted(this.clickedCards[i], "red");
            }
            this.findAllSets();
            this.pointsForCurrentSet = 100; // Reset the Points for one Set
            // TODO: Only redraw the selected Cards
            this.drawBoard(this.board);

            this.saveScore();
          } else {
            this.pointsForCurrentSet = this.pointsForCurrentSet - 5
          }
          // Reset Clicked Cards
          for (var j = 0; j < this.clickedCards.length; j++) {
            this.redrawCardAfterSelcted(this.clickedCards[j], "white");
          }
          this.clickedCards = []; // Reset the clicked Cards
        }
      } else {
        // TODO: Add a Counter when after 5 Seconds a wrong set or not enough cards are selected
        this.addAndRedrawSelectedCard(this.x, this.y);
      }
    },
    getRandomCard: function() {
      const number = Math.floor(Math.random() * 100) % this.allCards.length;
      return this.allCards[number];
    },
    drawBoard: function(board) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      const heigth = (window.innerHeight / 2) / 4;
      const width = window.innerWidth / 3.4;
  
      // First Row
      this.drawCard(board[0], 10, 0, width, heigth);
      this.drawCard(board[1], width + 20, 0, width, heigth);
      this.drawCard(board[2], width * 2 + 30, 0, width, heigth);
      // Second Row
      this.drawCard(board[3], 10, heigth, width, heigth);
      this.drawCard(board[4], width + 20, heigth, width, heigth);
      this.drawCard(board[5], width * 2 + 30, heigth, width, heigth);
      // Third Row
      this.drawCard(board[6], 10, heigth * 2, width, heigth);
      this.drawCard(board[7], width + 20, heigth * 2, width, heigth);
      this.drawCard(board[8], width * 2 + 30, heigth * 2, width, heigth);
      // Fourth Row
      this.drawCard(board[9], 10, heigth * 3, width, heigth);
      this.drawCard(board[10], width + 20, heigth * 3, width, heigth);
      this.drawCard(board[11], width * 2 + 30, heigth * 3, width, heigth);
    },
    drawCard: function(card, dx, dy, dWidth, dHeight) {
      // Putting the image and its coordinates on the canvas
      var ctx = this.ctx;
      var cardNumber = card.color + '' + card.amount + '' + card.filling + '' + card.form

      let img = new Image(); // create new Image

      img.src = require("../assets/" + cardNumber + ".png"); // load the image with a reletive Path
      img.addEventListener("load", draw, false); // Listener for Canvas img to load
      function draw() {
        ctx.drawImage(img, dx, dy, dWidth , dHeight);
      }
      // Height divided by 2 because the canvas takes half the screen
      card.setPosition(dx, dy, (dWidth + dx), (dHeight + dy ));
    },
    startSetInterval: function () {
      const self = this
      setInterval(function() {
        if (self.pointsForCurrentSet - 1 >= 0) {
          self.pointsForCurrentSet = self.pointsForCurrentSet - 1
        }
      }, 1000);
    },
  },
  mounted: function() {
    this.createAllCards(); // Also Draws the First Board and Find all possible Sets
    this.startSetInterval();
    // TODO: Remove Resize Bug/ Change board Card coordinates// Or save it in an array
    // window.addEventListener('resize', this.drawBoard);
  },
  computed: {
    canvas: function () {
        return this.$refs.game_canvas;
    },
    ctx: function () {
        return this.canvas.getContext('2d');
    }
  },
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas {
  background-color: white;
  display: block;
  position: absolute;
  overflow: hidden;
  bottom: 0%;
  width: 100%;
  height: 50%;
}
</style>