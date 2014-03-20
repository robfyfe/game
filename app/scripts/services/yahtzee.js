'use strict';

angular.module('gameApp').service('yahtzee', function () {

  var TOTAL_NUMBER_OF_DICE = 5;
  this.currentPlayerIndex = 0;
  this.dice;
  this.scoresheets = [];
  this.gameStarted = false;
  this.rollHasBeenScored = false;
  this.numberOfRollsForThisTurn = 0;

  var NoPlayersException = {
    getMessage: function() {return 'You cannot start a game until you add players';}
  };

  var TooManyRollsException = {
    getMessage: function() {return 'You cannot roll the dice more than three times';}
  };

  var NeedToRollTheDiceException = {
    getMessage: function() {return 'You need to roll the dice!';}
  };

  var NotYourTurnException = function(playerName) {
    var playerName = playerName;
    this.getMessage = function() {return 'It is not your turn ' + playerName;}
  };

  this.buildDie = function (label, value) {
    return {
      label: label,
      value: value,
      saved: false
    };
  };

  this.startGame = function () {
    if (this.scoresheets.length > 0) {
      this.gameStarted = true;
      return this.scoresheets[0];
    }

    throw NoPlayersException;
  };

  this.getScoresheets = function () {
    return this.scoresheets;
  };

  this.recordScore = function (playerName, scoreName) {

    if (!this.dice || this.rollHasBeenScored) {
      throw NeedToRollTheDiceException;
    }

    if (this.scoresheets[this.currentPlayerIndex].playerName === playerName) {
      this.scoresheets[this.currentPlayerIndex].recordScore(scoreName, this.dice);
      this.incrementPlayerIndex();
    } else {
      throw new NotYourTurnException(playerName);
    }

    this.rollHasBeenScored = true;
    this.numberOfRollsForThisTurn = 0;
    return this.scoresheets[this.currentPlayerIndex];
  };

  this.incrementPlayerIndex = function () {
    if (this.currentPlayerIndex == (this.scoresheets.length - 1)) {
      this.currentPlayerIndex = 0;
    } else {
      this.currentPlayerIndex++;
    }
  };

  this.addNewPlayer = function (newPlayerName) {
    return this.scoresheets[this.scoresheets.length] = new Scoresheet(newPlayerName);
  };

  this.rollDice = function () {
    if (this.numberOfRollsForThisTurn === 3) {
      throw TooManyRollsException;
    }
    this.dice = this.dice || [];
    for (var i = 0; i < TOTAL_NUMBER_OF_DICE; i++) {
      var diceNumber = i + 1;
      if (!this.dice[i] || !this.dice[i].saved || this.rollHasBeenScored) {
        this.dice[i] = this.buildDie('Dice' + diceNumber, Math.floor((Math.random() * 6) + 1));
      }
    }

    this.numberOfRollsForThisTurn++;
    this.rollHasBeenScored = false;
  };

  this.saveDice = function(dice) {
    dice.saved = !dice.saved;
  }
});
