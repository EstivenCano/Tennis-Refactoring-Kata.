import { TennisGame } from "./TennisGame";

/**
 * @class Player
 * @description Player class for TennisGame2
 * @param {string} name
 * @param {number} score
 */
class Player {
  private name: string;
  private score: number;

  constructor(name: string) {
    this.name = name;
    this.score = 0;
  }

  /**
   * Add point to player score
   */
  addPoint(): void {
    this.score += 1;
  }

  /**
   * Return player score
   * @returns {number}
   */
  getScore(): number {
    return this.score;
  }

  /**
   * Return player name
   * @returns {string}
   */
  getName(): string {
    return this.name;
  }
}

/**
 * @class TennisGame2
 * @implements {TennisGame}
 *
 * @description
 * It is a simple refactoring of the TennisGame class from the previous version.
 */
export class TennisGame2 implements TennisGame {
  private player1: Player;
  private player2: Player;
  score_description: string[] = ["Love", "Fifteen", "Thirty", "Forty"];

  /**
   * @param player1Name Name of the first player
   * @param player2Name Name of the second player
   */
  constructor(player1Name: string, player2Name: string) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
  }

  /**
   * Returns the score of the game depending of the TennisGame rules.
   */
  getScore(): string {
    return this.normalScore() || this.deuce() || this.advantage() || this.win();
  }

  /**
   * Returns the difference of the scores of the players.
   */
  scoreDifference(): number {
    return this.player1.getScore() - this.player2.getScore();
  }

  /**
   * Returns the score of the game if players have less than 4 points and are not in a "Deuce" state with 3 points each.
   */
  normalScore(): string {
    const score1 = this.player1.getScore();
    const score2 = this.player2.getScore();

    // If players have less than 4 points it will use the score_description array to return the score.
    if (score1 < 4 && score2 < 4 && !(score1 + score2 === 6)) {
      return !this.scoreDifference()
        ? this.score_description[score1] + "-All"
        : this.score_description[score1] + "-" + this.score_description[score2];
    }
    return "";
  }

  /**
   *  Returns "Deuce" of the game if players have exactly the same number of points.
   */
  deuce(): string {
    if (this.scoreDifference() === 0) {
      return "Deuce";
    }
    return "";
  }

  /**
   * Returns the score of the game if any of players are in the advantage state.
   */
  advantage(): string {
    if (this.scoreDifference() === 1) {
      return "Advantage " + this.player1.getName();
    }
    if (this.scoreDifference() === -1) {
      return "Advantage " + this.player2.getName();
    }
    return "";
  }

  /**
   * Returns the winner when any of players have at least four points in total and at least two points more than the opponent.
   */
  win(): string {
    if (this.scoreDifference() >= 2) {
      return "Win for " + this.player1.getName();
    }
    if (this.scoreDifference() <= -2) {
      return "Win for " + this.player2.getName();
    }
    return "";
  }

  /**
   * Adds a point to the indicated player
   *  @param playerName Name of the player who won the point
   */

  wonPoint(playerName: string): void {
    if (playerName === "player1") {
      this.player1.addPoint();
    } else {
      this.player2.addPoint();
    }
  }
}
