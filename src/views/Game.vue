<template>
    <div>
        <b-container class="container">
            <b-row>
                <b-col>Amount of Sets {{setCounter}}</b-col>
                <b-col>Points: {{points}}</b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-progress height="11px" :max=5 :value="clickedCardCounter" variant="success" key="success"/>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-button v-if="noMoreSets" size="sm" class="mt-3" variant="warning" block @click="resetBoard">shuffle board
                    </b-button>
                </b-col>
            </b-row>
        </b-container>
        <canvas
                @click="clickOnCanvas($event)"
                :width="canvas_width"
                :height="canvas_height"
                id="canvas"
                ref="game_canvas"
        />
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
                    />
                </b-form-group>
            </form>
            <b-button class="mt-3" variant="success" block @click="saveScore">save</b-button>
        </b-modal>
    </div>
</template>

<script>
    import SecureLS from 'secure-ls';

    class Card {
        constructor(color, amount, filling, form, image) {
            this.color = color;
            this.amount = amount;
            this.filling = filling;
            this.form = form;
            this.image = image
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
                noMoreSets: false,
                clickedCardCounter: 5, // Full Processbar at the beginning
                intervalID: ''
            };
        },
        methods: {
            showModal() {
                this.$refs['highscore-modal'].show()
            },
            // TODO: Add a save Button for the current Game
            checkSetProperties(first, second, third) {
                return (first === second && first === third) || (first !== second && first !== third && second !== third);
            },
            checkThreeCardsForASet(firstCard, secondCard, thirdCard) {
                return (this.checkSetProperties(this.board[firstCard].color, this.board[secondCard].color, this.board[thirdCard].color) &&
                    this.checkSetProperties(this.board[firstCard].amount, this.board[secondCard].amount, this.board[thirdCard].amount) &&
                    this.checkSetProperties(this.board[firstCard].filling, this.board[secondCard].filling, this.board[thirdCard].filling) &&
                    this.checkSetProperties(this.board[firstCard].form, this.board[secondCard].form, this.board[thirdCard].form));
            },
            findAllSets() {
                this.setCounter = 0;
                for (let firstCard = 0; firstCard < this.board.length - 2; firstCard++) {
                    for (let secondCard = firstCard + 1; secondCard < this.board.length - 1; secondCard++) {
                        for (let thirdCard = secondCard + 1; thirdCard < this.board.length; thirdCard++) {
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
                for (let k = 0; k < 12; k++) {
                    this.allCards.push(this.board[k]);
                }
                this.board = [];
                this.createNewBoard();
                this.noMoreSets = false;
            },
            createNewBoard() {
                for (let i = 0; i < 12; i++) {
                    this.board.push(this.getRandomCard());
                }
                this.drawBoard(); // Draws the Cards on the board
                this.findAllSets(); // Finds all Sets on Board
            },
            createAllCards() {
                for (let color = 0; color < 3; color++) {
                    for (let form = 0; form < 3; form++) {
                        for (let filling = 0; filling < 3; filling++) {
                            for (let amount = 1; amount < 4; amount++) {
                                let img = new Image(); // create new Image
                                img.src = require("@/assets/cards_svg/" + color + '' + form + '' + filling + '' + amount + ".svg");
                                this.allCards.push(new Card(color, amount, filling, form, img));
                            }
                        }
                    }
                }
            },
            getClickedCard() {
                for (let i = 0; i < this.board.length; i++) {
                    if (this.board[i].x_min < this.x && this.board[i].y_min < this.y &&
                        this.board[i].x_max > this.x && this.board[i].y_max > this.y) {
                        return i;
                    }
                }
            },
            redrawCardAfterSelcted(cardIndex, color) {
                let card = this.board[cardIndex];
                card = this.getCardPosition(card, cardIndex); // Set Position
                card.setPosition(card.x_min, card.y_min, card.x_max + card.x_min, card.y_max + card.y_min);
                this.drawCard(card, card.x_min, card.y_min, card.x_max - card.x_min, card.y_max - card.y_min, color);
            },
            addAndRedrawSelectedCard() {
                const cardIndex = this.getClickedCard();
                if (!this.clickedCards.includes(cardIndex)) {
                    this.clickedCards.push(cardIndex); // Add Card to the "checkForSet" Array
                    this.redrawCardAfterSelcted(cardIndex, "blue");
                }
            },
            saveScore() {
                const newScore = new Highscore(this.name, this.points);
                const ls = new SecureLS();
                let allScores = [];
                
                if (ls.get("set_game")) {
                    allScores = ls.get("set_game");
                }
                allScores.push(newScore);
                ls.set("set_game", allScores);
                this.$router.push('highscore');
            },
            clickOnCanvas(event) {
                const rect = this.canvas.getBoundingClientRect();
                this.x = event.clientX - rect.left;
                this.y = event.clientY - rect.top;
                this.addAndRedrawSelectedCard();

                // Starts an Interval when an Card is clicked. So the User has only 5 Seconds to click the other cards
                if (this.clickedCardCounter === 5) {
                    this.clickedCardInterval();
                    this.clickedCardCounter = this.clickedCardCounter - 0.1;
                }

                if (this.clickedCards.length === 3) {
                    clearInterval(this.intervalID);
                    this.clickedCardCounter = 5; // Resets the clickedCard Interval
                    // When a Set is found replace the old Cards with new Cards and redraw the board
                    if (this.checkThreeCardsForASet(this.clickedCards[0], this.clickedCards[1], this.clickedCards[2])) {
                        this.points = this.points + this.pointsForCurrentSet; // Adds points for the correct Set
                        if (this.allCards.length >= 3) {
                            for (let i = 0; i < 3; i++) {
                                const newCard = this.getRandomCard(); // Get New Card
                                this.board.splice(this.clickedCards[i], 1, newCard); // Set the new Card on the Board
                            }
                        } else {
                            // When the last sets are taken from the Board and there are no cards left in the stock
                            for (let l = 0; l < 3; l++) {
                                let img = new Image(); // create new Image
                                img.src = require("@/assets/cards_svg/3333.svg");
                                const emptyCard = new Card(3, 3, 3, 3, img); // Create empty Card
                                this.board.splice(this.clickedCards[l], 1, emptyCard); // Set the new Card on the Board
                            }
                        }
                        this.findAllSets();
                        this.pointsForCurrentSet = 100; // Reset the Points for one Set
                    } else {
                        this.removePointsForCurrentSet();
                    }
                    // Reset Clicked Cards when the selected cards are not a set
                    this.resetClickedCards();
                }
            },
            resetClickedCards: function () {
                for (let j = 0; j < this.clickedCards.length; j++) {
                    this.redrawCardAfterSelcted(this.clickedCards[j], "#d9d9d9");
                }
                this.clickedCards = []; // Reset the clicked Cards
            },
            getRandomCard: function () {
                const number = Math.floor(Math.random() * 100) % this.allCards.length;
                const card = this.allCards[number];
                this.allCards.splice(this.allCards.indexOf(card), 1);
                return card;
            },
            getCardPosition(card, postionOnBoard) {
                const height = (window.innerHeight / 2) / 4;
                const width = window.innerWidth / 3;
                switch (postionOnBoard) {
                    case 0:
                        card.setPosition(0, 0, width, height);
                        break;
                    case 1:
                        card.setPosition(width, 0, width, height);
                        break;
                    case 2:
                        card.setPosition(width * 2, 0, width, height);
                        break;
                    case 3:
                        card.setPosition(0, height, width, height);
                        break;
                    case 4:
                        card.setPosition(width, height, width, height);
                        break;
                    case 5:
                        card.setPosition(width * 2, height, width, height);
                        break;
                    case 6:
                        card.setPosition(0, height * 2, width, height);
                        break;
                    case 7:
                        card.setPosition(width, height * 2, width, height);
                        break;
                    case 8:
                        card.setPosition(width * 2, height * 2, width, height);
                        break;
                    case 9:
                        card.setPosition(0, height * 3, width, height);
                        break;
                    case 10:
                        card.setPosition(width, height * 3, width, height);
                        break;
                    case 11:
                        card.setPosition(width * 2, height * 3, width, height);
                        break;
                }
                return card;
            },
            drawBoard: function () {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

                for (let i = 0; i < 12; i++) {
                    const card = this.getCardPosition(this.board[i], i);
                    this.drawCard(card, card.x_min, card.y_min, card.x_max, card.y_max, "#d9d9d9");
                }
            },
            drawCard: function (card, dx, dy, dWidth, dHeight, color) {
                // Putting the image and its coordinates on the canvas
                const cardNumber = card.color + '' + card.form + '' + card.filling + '' + card.amount
                const ctx = this.ctx;

                card.image.src = require("@/assets/cards_svg/" + cardNumber + ".svg"); // load the image
                card.image.onload = function () {
                    // Clear the blue box Top and Bottom
                    ctx.fillStyle = color;
                    ctx.clearRect(dx + 1, dy + 1, dWidth, dHeight);
                    ctx.clearRect(dx - 1, dy - 1, dWidth, dHeight);
                    ctx.fillRect(dx, dy, dWidth, dHeight);
                    ctx.drawImage(card.image, dx, dy, dWidth, dHeight);
                    card.setPosition(dx, dy, (dWidth + dx), (dHeight + dy));
                }
            },
            removePointsForCurrentSet() {
                if (this.pointsForCurrentSet >= 5) {
                    this.pointsForCurrentSet = this.pointsForCurrentSet - 5;
                }
            },
            startSetInterval: function () {
                const self = this;
                setInterval(function () {
                    if (self.pointsForCurrentSet - 1 >= 0) {
                        self.pointsForCurrentSet = self.pointsForCurrentSet - 1;
                    }
                }, 1000);
            },
            clickedCardInterval: function () {
                const self = this;
                this.intervalID = setInterval(function () {
                    if (self.clickedCardCounter - 0.1 >= 0) {
                        self.clickedCardCounter = self.clickedCardCounter - 0.1;
                    } else {
                        self.clickedCardCounter = 5;
                        clearInterval(self.intervalID);
                        self.removePointsForCurrentSet();
                        self.resetClickedCards();
                    }
                }, 100);
            },
        },
        mounted: function () {
            this.createAllCards(); // Also Draws the First Board and Find all possible Sets
            this.createNewBoard(); // Creates random board of cards

            this.startSetInterval();
            // TODO: Remove Resize Bug/ Change board Card coordinates// Or save it in an array
            const self = this;
            window.addEventListener("resize", function () {
                this.canvas_width = window.innerWidth / 7;
                this.canvas_height = window.innerHeight / 2;
                self.drawBoard();
            });
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
        background-color: #d9d9d9;
        display: block;
        position: absolute;
        overflow: hidden;
        bottom: 0%;
        width: 100%;
        height: 50%;
    }
    .container {
        width: 100%;
        height: 50%;
    }
</style>