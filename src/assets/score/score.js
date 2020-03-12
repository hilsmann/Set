import SecureLS from 'secure-ls';
import { Highscore } from '../highscore/highscore.js';

const localStorage = new SecureLS();

export class Score {
    
    save(name, points, gameMode) {
        const newScore = new Highscore(name, points, gameMode);
        let allScores = [];

        if (localStorage.get("set_game")) {
            allScores = localStorage.get("set_game");
        }
        allScores.push(newScore);
        localStorage.set("set_game", allScores);
    }
}