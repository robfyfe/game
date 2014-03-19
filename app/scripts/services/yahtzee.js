'use strict';

angular.module('gameApp').service('yahtzee', function () {

  var TOTAL_NUMBER_OF_DICE = 5;
  this.currentPlayerIndex = 0;
  this.dice = [];
  this.scoresheets = [];

  this.buildDice = function (label, value) {
    return {
      label: label,
      value: value
    };
  };

  this.startGame = function() {
    return this.scoresheets[0];
  };

  this.initialiseGame = function () {
    for (var i = 0; i < TOTAL_NUMBER_OF_DICE; i++) {
      var diceNumber = i + 1;
      this.dice[i] = this.buildDice('Dice' + diceNumber, 'Not Rolled');
    }
  };

  this.getCurrentRoll = function() {
    return this.dice;
  };

  this.getScoresheets = function () {
    return this.scoresheets;
  };

  this.recordScore = function(playerName, scoreName, dice) {
    if (this.scoresheets[this.currentPlayerIndex].playerName === playerName) {
      this.scoresheets[this.currentPlayerIndex].recordScore(scoreName, dice);
      this.incrementPlayerIndex();
    } else {
      alert('It is not your turn ' + playerName);
    }

    return this.scoresheets[this.currentPlayerIndex];

  };

  this.incrementPlayerIndex = function() {
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
    console.log('Dice being rolled');
    for (var i = 0; i < TOTAL_NUMBER_OF_DICE; i++) {
      var diceNumber = i + 1;
      this.dice[i] = this.buildDice('Dice' + diceNumber, Math.floor((Math.random() * 6) + 1));
    }

    console.log('rollDice returning = ' + this.dice);
    return this.dice;
  };
});
