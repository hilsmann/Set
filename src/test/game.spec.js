import { Game } from "../assets/game/game.js";
import {Card} from "../assets/card/card";

describe("Game object functionality", () => {

    it("creates all Cards (81)", () => {
        const newGame = new Game();
        newGame.createAllCards()

        expect(newGame.allCards.length).toBe(81);
    });

    it("checks on a Set and its a Set", () => {
        const newGame = new Game();

        expect(newGame.checkSetProperties(1, 1, 1)).toBe(true);
    });

    it("checks on a Set and its not a Set", () => {
        const newGame = new Game();

        expect(newGame.checkSetProperties(1, 1, 2)).toBe(false);
    });

    it("checks three Cards on a Set and its a Set", () => {
        const newGame = new Game();
        let img = new Image()
        for(let i = 1; i < 4; i++) {
            const card = new Card(0, i,0,0, img)
            newGame.board.push(card)
        }
        expect(newGame.checkThreeCardsForASet(0, 1, 2)).toBe(true);
    });

    it("checks three Cards on a Set and its not a Set", () => {
        const newGame = new Game();
        let img = new Image()
        const cardOne = new Card(2,1,0,0, img)
        const cardTwo = new Card(2,2,1,0, img)
        const cardThree = new Card(0,3,0,0, img)

        newGame.board.push(cardOne)
        newGame.board.push(cardTwo)
        newGame.board.push(cardThree)

        expect(newGame.checkThreeCardsForASet(0, 1, 2)).toBe(false);
    });

    it("checks the board for the number of Sets", () => {
        const newGame = new Game();
        let img = new Image()
        const cardOne = new Card(2,1,0,0, img)
        const cardTwo = new Card(2,2,1,0, img)
        const cardThree = new Card(0,3,0,0, img)
        const cardFour = new Card(1,3,0,0, img)
        const cardFive = new Card(0,2,1,0, img)
        const cardSix = new Card(0,2,1,1, img)
        const cardSeven = new Card(0,2,1,2, img)
        const cardEight = new Card(3,1,0,0, img)
        const cardNine = new Card(3,3,0,0, img)
        const cardTen = new Card(3,3,0,1, img)
        const cardEleven = new Card(2,3,1,0, img)
        const cardTwelve = new Card(2,2,0,2, img)

        newGame.board.push(cardOne)
        newGame.board.push(cardTwo)
        newGame.board.push(cardThree)
        newGame.board.push(cardFour)
        newGame.board.push(cardFive)
        newGame.board.push(cardSix)
        newGame.board.push(cardSeven)
        newGame.board.push(cardEight)
        newGame.board.push(cardNine)
        newGame.board.push(cardTen)
        newGame.board.push(cardEleven)
        newGame.board.push(cardTwelve)

        expect(newGame.calculateNumberOfSets()).toBe(2);
    });
});
