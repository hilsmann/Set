<template>
  <div class="about">
    <h1>Set the Game</h1>
    <p>amount of Sets {{setCounter}}</p>
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
    getClickedCard(clickPosX, clickPosY) {
      for (var i = 0; i < this.board.length; i++) {
        if (this.board[i].x_min < clickPosX && this.board[i].y_min < clickPosY &&
            this.board[i].x_max > clickPosX && this.board[i].y_max > clickPosY) {
          this.$log.info("index", i);
          return i;
        }
      }
    },
    clickOnCanvas(event) {
      var rect = this.canvas.getBoundingClientRect();
      this.x = event.clientX - rect.left;
      this.y = event.clientY - rect.top;
      if (this.clickedCards.length !== 3) {
        this.clickedCards.push(this.getClickedCard(this.x, this.y))
      } else {
        this.$log.info("clickedCard", this.clickedCards);
      }
    },
    getRandomCard: function() {
      const number = Math.floor(Math.random() * 100) % this.allCards.length;
      return this.allCards[number];
    },
    drawBoard: function() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      const heigth = (window.innerHeight / 2) / 4;
      const width = window.innerWidth / 3.4;
      
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
      // var canvas = document.getElementById("canvas"),
      var  ctx = this.ctx;
      var cardNumber = card.color + '' + card.amount + '' + card.filling + '' + card.form

      let img = new Image(); // create new Image

      img.src = require("../assets/" + cardNumber + ".png"); // load the image with a reletive Path
      img.addEventListener("load", draw, false); // Listener for Canvas img to load
      function draw() {
        ctx.drawImage(img, dx, dy, dWidth , dHeight);
      }
      // Height divided by 2 because the canvas takes half the screen
      card.setPosition(dx, dy, (dWidth + dx), (dHeight + dy ));
      this.board.push(card); // Add current Card to the Board
      
      this.allCards.splice(this.allCards.indexOf(card), 1);
    }
  },
  mounted: function() {
    // TODO: If one Card is in board Array. Dont call the function
    this.createAllCards(); // Also Draws the First Board and Find all possible Sets
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
  height: 50%;
}
/* html, body {
  width:  100%;
  height: 100%;
  margin: 0;
} */
</style>