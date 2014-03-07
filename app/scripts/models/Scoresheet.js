'use strict';

var Scoresheet = function (playerName) {
  this.playerName = playerName;

  this.scoreCard = {
    ones:0,
    twos:0,
    threes:0,
    fours:0,
    fives:0,
    sixes:0
  };

  this.getScorecard = function () {
    return this.scoreCard;
  };

  this.getScorecardComponents = function() {
    var scorecardComponents = [];
    var index = 0;
    for (var currentComponent in this.scoreCard) {
      console.log('adding ' + currentComponent + ' to array');
      scorecardComponents[index] = currentComponent;
      index++;
    }

    return scorecardComponents;
  };

  this.getScore = function(scoreName) {
    return this.scoreCard[scoreName];
  };

  this.recordScore = function(scoreName, dice) {
    var total = 0;
    for (var i = 0; i < dice.length; i++) {
      total+= dice[i].value;
    }

    return this.scoreCard[scoreName] = total;
  };
};