<template>
  <div>
    <b-container>
      <b-row>
        <b-col>Amount of Sets {{setCounter}} </b-col>
        <b-col>Points: {{points}}</b-col>
      </b-row>
      <b-row>
        <b-col><b-button v-if="noMoreSets" class="mt-3" variant="warning" block @click="resetBoard">shuffle board</b-button> </b-col>
      </b-row>
    </b-container>
    <canvas
      @click="clickOnCanvas($event)"
      :width="canvas_width"
      :height="canvas_height"
      id="canvas"
      ref="game_canvas"
    ></canvas>
    <b-modal ref="highscore-modal" hide-footer title="Congratulation you did it!">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Please enter your name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
        <b-form-input
          id="name-input"
          v-model="name"
          required
        ></b-form-input>
        </b-form-group>
      </form>
      <b-button class="mt-3" variant="success" block @click="saveScore">save</b-button>
    </b-modal>
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
      name: '',
      setCounter: 0,
      allCards: [],
      board: [],
      clickedCards: [],
      canvas_height: window.innerHeight / 2,
      canvas_width: window.innerWidth,
      x: 0,
      y: 0,
      points: 0,
      pointsForCurrentSet: 100,
      noMoreSets: false
    };
  },
  methods: {
    showModal() {
      this.$refs['highscore-modal'].show()
    },
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
    findAllSets() {
      this.setCounter = 0;
      for (var firstCard = 0; firstCard < this.board.length - 2; firstCard++) {
        for (var secondCard = firstCard + 1; secondCard < this.board.length - 1; secondCard++) {
          for (var thirdCard = secondCard + 1; thirdCard < this.board.length; thirdCard++) {
           if (this.checkThreeCardsForASet(firstCard, secondCard, thirdCard) 
              && this.board[firstCard].form !== 3 && this.board[secondCard].form !== 3 && this.board[thirdCard].form !== 3) {
             this.setCounter = this.setCounter + 1;
           }
          }
        }
      }
      // When there is no Set left show a Button to reset the board
      if (this.setCounter === 0) {
        this.noMoreSets = true;
      }
      // When the Game is over open the Modal for the play name
      if (this.setCounter === 0 && this.allCards.length === 0) {
          this.showModal();
      }
    },
    resetBoard() {
      for (var k = 0; k < 12; k++) {
        this.allCards.push(this.board[k]);
      }
      this.board = [];
      this.createNewBoard();
      this.noMoreSets = false;
    },
    createNewBoard(){
      for (var i = 0; i < 12; i++) {
        this.board.push(this.getRandomCard());
      }
      this.drawBoard(); // Draws the Cards on the board
      this.findAllSets(); // Finds all Sets on Board
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
      // Clear the blue box Top and Bottom
      this.ctx.clearRect(card.x_min + 1, card.y_min + 1, card.x_max - card.x_min, card.y_max - card.y_min);
      this.ctx.clearRect(card.x_min - 1 , card.y_min - 1, card.x_max - card.x_min, card.y_max - card.y_min);
      this.ctx.fillStyle = color;
      this.ctx.fillRect(card.x_min, card.y_min, card.x_max - card.x_min, card.y_max - card.y_min);
      this.drawCard(card, card.x_min, card.y_min, card.x_max - card.x_min, card.y_max - card.y_min);
    },
    addAndRedrawSelectedCard(x, y){
      var cardIndex = this.getClickedCard(x, y);
      if (!this.clickedCards.includes(cardIndex)) {
        this.clickedCards.push(cardIndex); // Add Card to the "checkForSet" Array
        this.redrawCardAfterSelcted(cardIndex, "blue");
      }
    },
    saveScore() {
      var newScore = new Highscore(this.name, this.points);
      var allScores = [];
      if (JSON.parse(localStorage.getItem('set_game'))){
        allScores = JSON.parse(localStorage.getItem('set_game'));
      }
      allScores.push(newScore)
      localStorage.setItem('set_game', JSON.stringify(allScores));
      this.$router.push('highscore');
    },
    clickOnCanvas(event) {
      var rect = this.canvas.getBoundingClientRect();
      this.x = event.clientX - rect.left;
      this.y = event.clientY - rect.top;
      this.addAndRedrawSelectedCard(this.x, this.y);
      // TODO: Add a Counter when after 5 Seconds a wrong set or not enough cards are selected
      // When three Cards are Selected check them
      // https://bootstrap-vue.js.org/docs/components/progress/#backgrounds
      if (this.clickedCards.length === 3) {
        // When a Set is found replace the old Cards with new Cards and redraw the board
        if (this.checkThreeCardsForASet(this.clickedCards[0], this.clickedCards[1], this.clickedCards[2])) {
          this.points = this.points + this.pointsForCurrentSet; // Adds points for the correct Set
          if (this.allCards.length >= 3) {
            for (var i = 0; i < 3; i++) {
              var newCard = this.getRandomCard(); // Get New Card
              newCard = this.getCardPosition(newCard, this.clickedCards[i]) // Set Position
              newCard.setPosition(newCard.x_min, newCard.y_min, newCard.x_max + newCard.x_min, newCard.y_max + newCard.y_min);
              this.board.splice(this.clickedCards[i], 1, newCard); // Set the new Card on the Board
              this.redrawCardAfterSelcted(this.clickedCards[i], "white"); // Draw the new Card on the Board
            }
          } else {
            // When the last sets are taken from the Board and there are no cards left in the stock
            for (var l = 0; l < 3; l++) {
              var emptyCard = new Card(3, 3, 3, 3); // Create empty Card
              emptyCard = this.getCardPosition(emptyCard, this.clickedCards[l]) // Set Position
              emptyCard.setPosition(emptyCard.x_min, emptyCard.y_min, emptyCard.x_max + emptyCard.x_min, emptyCard.y_max + emptyCard.y_min);
              this.board.splice(this.clickedCards[l], 1, emptyCard); // Set the new Card on the Board
              this.redrawCardAfterSelcted(this.clickedCards[l], "white"); // Draw the new Card on the Board
            }
          }
          this.findAllSets();
          this.pointsForCurrentSet = 100; // Reset the Points for one Set
        } else {
          if (this.pointsForCurrentSet >= 5) {
            this.pointsForCurrentSet = this.pointsForCurrentSet - 5;
          }
          // Reset Clicked Cards when the selected cards are not a set
          for (var j = 0; j < this.clickedCards.length; j++) {
            this.redrawCardAfterSelcted(this.clickedCards[j], "white");
          }
        }
        this.clickedCards = []; // Reset the clicked Cards
      }
    },
    getRandomCard: function() {
      const number = Math.floor(Math.random() * 100) % this.allCards.length;
      var card = this.allCards[number];
      this.allCards.splice(this.allCards.indexOf(card), 1);

      return card;
    },
    getCardPosition(card, postionOnBoard) {
      const heigth = (window.innerHeight / 2) / 4;
      const width = window.innerWidth / 3;
      switch (postionOnBoard) {
        case 0:
          card.setPosition(0, 0, width, heigth);
          break;
        case 1:
          card.setPosition(width, 0, width, heigth);
          break;
        case 2:
          card.setPosition(width * 2, 0, width, heigth);
          break;
        case 3:
          card.setPosition(0, heigth, width, heigth);
          break;        
        case 4:
          card.setPosition(width, heigth, width, heigth);
          break;
        case 5:
          card.setPosition(width * 2, heigth, width, heigth);
          break;
        case 6:
          card.setPosition(0, heigth * 2, width, heigth);
          break;
        case 7:
          card.setPosition(width, heigth * 2, width, heigth);
          break;
        case 8:
          card.setPosition(width * 2, heigth * 2, width, heigth);
          break;
        case 9:
          card.setPosition(0, heigth * 3, width, heigth);
          break;
        case 10:
          card.setPosition(width, heigth * 3, width, heigth);
          break;
        case 11:
          card.setPosition(width * 2, heigth * 3, width, heigth);
          break;
      }
      return card;
    },
    drawBoard: function() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (var i=0; i<12; i++) {
        var card = this.getCardPosition(this.board[i], i);
        this.drawCard(card, card.x_min, card.y_min, card.x_max, card.y_max);
      }
    },
    drawCard: function(card, dx, dy, dWidth, dHeight) {
      // Putting the image and its coordinates on the canvas
      var ctx = this.ctx;
      var cardNumber = card.color + '' + card.form + '' + card.filling + '' + card.amount

      let img = new Image(); // create new Image

      img.src = require("../assets/" + cardNumber + ".svg"); // load the image with a reletive Path
      img.addEventListener("load", draw, false); // Listener for Canvas img to load
      function draw() {
        ctx.drawImage(img, dx, dy, dWidth , dHeight);
      }
      // TODO: Bug dont set the position twice
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
    this.createNewBoard(); // Creates random board of cards

    this.startSetInterval();
    // TODO: Remove Resize Bug/ Change board Card coordinates// Or save it in an array
    window.addEventListener('resize', this.drawBoard);
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