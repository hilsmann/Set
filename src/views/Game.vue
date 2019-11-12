<template>
  <div class="about">
    <h1>Set the Game</h1>
    <p>amount of Sets {{setCounter}}</p>
    <canvas
      @click="clickOnCanvas($event)"
      :width="canvas_width"
      :height="canvas_height"
      id="canvas"
      ref="my-canvas"
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
export default {
  name: "Game",
  data() {
    return {
      provider: {
        // This is the CanvasRenderingContext that children will draw to.
        context: null
      },
      setCounter: 0,
      board: [],
      allCards: [],
      canvas_height: window.innerWidth,
      canvas_width: window.innerHeight,
      x: 0,
      y: 0
    };
  },
  provide() {
    return {
      provider: this.provider
    };
  },
  methods: {
    checkSetProperties(first, second, third){
      return (first === second && first === third) || (first !== second && first !== third && second !== third) ;
    },
    // TODO: Board as Parameter and for the selected Set
    findAllSets(){
      for (var firstCard = 0; firstCard < this.board.length - 2; firstCard++) {
        for (var secondCard = firstCard + 1; secondCard < this.board.length - 1; secondCard++) {
          for (var thirdCard = secondCard + 1; thirdCard < this.board.length; thirdCard++) {
            if (this.checkSetProperties(
              this.board[firstCard].color, this.board[secondCard].color, this.board[thirdCard].color) &&
              this.checkSetProperties(
              this.board[firstCard].amount, this.board[secondCard].amount, this.board[thirdCard].amount) &&
              this.checkSetProperties(
              this.board[firstCard].filling, this.board[secondCard].filling, this.board[thirdCard].filling) &&
              this.checkSetProperties(
              this.board[firstCard].form, this.board[secondCard].form, this.board[thirdCard].form)
              ){
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
      // this.$log.info("size", this.allCards);
      this.drawBoard(); // Draws the Board Cards
      this.findAllSets(); // Finds all Sets in the First Board
    },
    clickOnCanvas(event) {
      var canvas = document.getElementById("canvas");
      var rect = canvas.getBoundingClientRect();
      this.x = event.clientX - rect.left;
      this.y = event.clientY - rect.top;
      this.$log.info("x", this.x);
      this.$log.info("y", this.y);
    },
    getRandomCard: function() {
      const number = Math.floor(Math.random() * 100) % this.allCards.length;
      return this.allCards[number];
    },
    drawBoard: function() {
      const heigth = this.canvas_height / 4.3;
      const width = this.canvas_width / 3.3;
      
      // First Row
      this.drawAnImageAndPushCardToBoard(this.getRandomCard(), 10, 0, width, heigth);
      this.drawAnImageAndPushCardToBoard(this.getRandomCard(), width + 20, 0, width, heigth);
      this.drawAnImageAndPushCardToBoard(this.getRandomCard(), width * 2 + 30, 0, width, heigth);
      // Second Row
      this.drawAnImageAndPushCardToBoard(this.getRandomCard(), 10, heigth, width, heigth);
      this.drawAnImageAndPushCardToBoard(this.getRandomCard(), width + 20, heigth, width, heigth);
      this.drawAnImageAndPushCardToBoard(this.getRandomCard(), width * 2 + 30, heigth, width, heigth);
      // Third Row
      this.drawAnImageAndPushCardToBoard(this.getRandomCard(), 10, heigth * 2, width, heigth);
      this.drawAnImageAndPushCardToBoard(this.getRandomCard(), width + 20, heigth * 2, width, heigth);
      this.drawAnImageAndPushCardToBoard(this.getRandomCard(), width * 2 + 30, heigth * 2, width, heigth);
      // Fourth Row
      this.drawAnImageAndPushCardToBoard(this.getRandomCard(), 10, heigth * 3, width, heigth);
      this.drawAnImageAndPushCardToBoard(this.getRandomCard(), width + 20, heigth * 3, width, heigth);
      this.drawAnImageAndPushCardToBoard(this.getRandomCard(), width * 2 + 30, heigth * 3, width, heigth);
        // TODO: Get Random Card after a Set is found
        // TODO: On which position will the new Card appear
    },
    drawAnImageAndPushCardToBoard: function(card, dx, dy, dWidth, dHeight) {
       // Putting the image and its coordinates on the canvas
      var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d");
      var cardNumber = card.color + '' + card.amount + '' + card.filling + '' + card.form

      let img = new Image(); // create new Image

      img.src = require("../assets/" + cardNumber + ".png"); // load the image with a reletive Path
      img.addEventListener("load", draw, false); // Listener for Canvas img to load
      function draw() {
        ctx.drawImage(img, dx, dy, dWidth, dHeight);
      }
      // TODO: Max Value is wrong
      card.setPosition(dx, dy, dWidth - dx, dHeight- dy);
      this.board.push(card); // Add current Card to the Board
      this.allCards.splice(this.allCards.indexOf(card), 1)
    }
  },
  mounted: function() {
    // TODO: If one Card is in board Array. Dont call the function
    this.createAllCards(); // Also Draws the First Board and Find all possible Sets
  },
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon:hover {
  fill: #DA4567;
}
canvas {
  background-color: #ccc;
  display: block;
  position: absolute;
  overflow: hidden;
  bottom: 0%;
  width: 100%;
  height: 60%;
}
/* html, body {
  width:  100%;
  height: 100%;
  margin: 0;
} */
</style>