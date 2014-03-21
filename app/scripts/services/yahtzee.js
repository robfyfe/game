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
    getMessage: function () {
      return 'You cannot start a game until you add players';
    }
  };

  var TooManyRollsException = {
    getMessage: function () {
      return 'You cannot roll the dice more than three times';
    }
  };

  var AlreadyScoredException = {
    getMessage: function () {
      return 'You have already placed a score there';
    }
  };

  var NeedToRollTheDiceException = {
    getMessage: function () {
      return 'You need to roll the dice!';
    }
  };

  var NotYourTurnException = function (playerName) {
    var playerName = playerName;
    this.getMessage = function () {
      return 'It is not your turn ' + playerName;
    }
  };

  this.buildDie = function (label, value) {
    return {
      label: label,
      value: value,
      saved: false
    };
  };

  this.startGame = function () {
    if (this.scoresheets.length == 0) {
      throw NoPlayersException;
    }
    this.gameStarted = true;
  };

  this.getScoresheets = function () {
    return this.scoresheets;
  };

  var currentPlayerScoresheet = _.bind(function() {
    return this.scoresheets[this.currentPlayerIndex];
  }, this);

  var throwExceptionIfTheDiceNeedToBeRolled = _.bind(function () {
    if (!this.dice || this.rollHasBeenScored) {
      throw NeedToRollTheDiceException;
    }
  }, this);

  var throwExceptionIfThisScoreHasAlreadyBeenEntered = _.bind(function(scoreName) {
    if (currentPlayerScoresheet().scoreCard[scoreName].score) {
      throw AlreadyScoredException;
    }
  }, this);

  var throwExceptionIfItsNotThisPlayersTurn = _.bind(function(playerName) {
    console.log("CURRENT PLAYER = " + currentPlayerScoresheet().playerName);
    if (!(currentPlayerScoresheet().playerName === playerName)) {
      throw new NotYourTurnException(playerName);
    }
  }, this);

  var thisIsAScoreGeneratedByTheGame = function(scoreName) {
    return currentPlayerScoresheet().scoreCard[scoreName].gameGenerated
  }

  this.recordScore = function (playerName, scoreName) {

    if (!thisIsAScoreGeneratedByTheGame(scoreName)) {
      throwExceptionIfTheDiceNeedToBeRolled();
      throwExceptionIfThisScoreHasAlreadyBeenEntered(scoreName);
      console.log("PLAYER = " + playerName);
      throwExceptionIfItsNotThisPlayersTurn(playerName);
      currentPlayerScoresheet().recordScore(scoreName, this.dice);
      this.incrementPlayerIndex();
      this.rollHasBeenScored = true;
      this.numberOfRollsForThisTurn = 0;
    }
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

  this.saveDice = function (dice) {
    dice.saved = !dice.saved;
  }
});
