import {Card} from "../card/card";

export class Game {
    constructor() {
        this.board = [];
        this.allCards = [];
        this.x = 0;
        this.y = 0;
    }
    
    checkThreeCardsForASet(firstCard, secondCard, thirdCard) {
        return (this.checkSetProperties(this.board[firstCard].color, this.board[secondCard].color, this.board[thirdCard].color) &&
            this.checkSetProperties(this.board[firstCard].amount, this.board[secondCard].amount, this.board[thirdCard].amount) &&
            this.checkSetProperties(this.board[firstCard].filling, this.board[secondCard].filling, this.board[thirdCard].filling) &&
            this.checkSetProperties(this.board[firstCard].form, this.board[secondCard].form, this.board[thirdCard].form));
    }

    checkSetProperties(first, second, third) {
        return (first === second && first === third) || (first !== second && first !== third && second !== third);
    }

    calculateNumberOfSets() {
        let numberOfSets = 0;
        for (let firstCard = 0; firstCard < this.board.length - 2; firstCard++) {
            for (let secondCard = firstCard + 1; secondCard < this.board.length - 1; secondCard++) {
                for (let thirdCard = secondCard + 1; thirdCard < this.board.length; thirdCard++) {
                    if (this.checkThreeCardsForASet(firstCard, secondCard, thirdCard)
                        && this.board[firstCard].form !== 3 && this.board[secondCard].form !== 3 && this.board[thirdCard].form !== 3) {
                        numberOfSets += 1;
                    }
                }
            }
        }
        return numberOfSets
    }

    createAllCards() {
        this.allCards = []
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
    }

    getClickedCard() {
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i].x_min < this.x && this.board[i].y_min < this.y &&
                this.board[i].x_max > this.x && this.board[i].y_max > this.y) {
                return i;
            }
        }
    }
}
