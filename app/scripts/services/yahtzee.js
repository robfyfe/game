'use strict';

angular.module('gameApp').service('yahtzee', function () {

  var TOTAL_NUMBER_OF_DICE = 5;
  this.currentPlayerIndex = 0;
  this.dice = [];
  this.scoresheets = {};
  this.playerOrder = []

  this.buildDice = function (label, value) {
    return {
      label: label,
      value: value
    };
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

    console.log('INDEX' + this.currentPlayerIndex);

    if (this.playerOrder[this.currentPlayerIndex] === playerName) {
      this.scoresheets[playerName].recordScore(scoreName, dice);
      this.incrementPlayerIndex();
    }
  };

  this.incrementPlayerIndex = function() {
    if (this.currentPlayerIndex == (this.playerOrder.length - 1)) {
      this.currentPlayerIndex = 0;
    } else {
      this.currentPlayerIndex++;
    }
  };

  this.addNewPlayer = function (newPlayerName) {
    this.playerOrder[this.playerOrder.length] = newPlayerName;
    return this.scoresheets[newPlayerName] = new Scoresheet(newPlayerName);
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
