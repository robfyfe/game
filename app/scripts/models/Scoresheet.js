'use strict';

var Scoresheet = function (playerName) {
  this.playerName = playerName;

  var safelyGetScore = function (score) {
    return score || 0;
  };

  var topHalfScorer = function (dice, diceValue) {
    return _.reduce(dice, function (memo, currentDice) {
      if (currentDice.value === diceValue && currentDice.saved) {
        memo = memo + diceValue;
      }

      return memo;

    }, 0);
  }


  this.scoreCard = {

    ones: {
      score: undefined,
      gameGenerated: false,
      recordScore: function (dice) {
        this.score = topHalfScorer(dice, 1);
      }
    },
    twos: {
      score: undefined,
      gameGenerated: false,
      recordScore: function (dice) {
        this.score = topHalfScorer(dice, 2);
      }
    },
    threes: {
      score: undefined,
      gameGenerated: false,
      recordScore: function (dice) {
        this.score = topHalfScorer(dice, 3);
      }
    },
    fours: {
      score: undefined,
      gameGenerated: false,
      recordScore: function (dice) {
        this.score = topHalfScorer(dice, 4);
      }
    },
    fives: {
      score: undefined,
      gameGenerated: false,
      recordScore: function (dice) {
        this.score = topHalfScorer(dice, 5);
      }
    },
    sixes: {
      score: undefined,
      gameGenerated: false,
      recordScore: function (dice) {
        this.score = topHalfScorer(dice, 6);
      }
    },
    topBonus: {
      score: 0,
      gameGenerated: true,
      recordScore: function (dice) {
        this.score = 0;
      }
    },
    topTotal: {
      score: undefined,
      gameGenerated: true,
      recordScore: function (scoreCard) {
        this.score = safelyGetScore(scoreCard.ones.score) + safelyGetScore(scoreCard.twos.score) +
            safelyGetScore(scoreCard.threes.score) + safelyGetScore(scoreCard.fours.score) +
            safelyGetScore(scoreCard.fives.score) + safelyGetScore(scoreCard.sixes.score);
      }
    }
  };

  this.getScorecard = function () {
    return this.scoreCard;
  };

  this.getScorecardComponents = function () {
    var scorecardComponents = [];
    var index = 0;
    for (var currentComponent in this.scoreCard) {
      console.log('adding ' + currentComponent + ' to array');
      scorecardComponents[index] = currentComponent;
      index++;
    }

    return scorecardComponents;
  };

  this.getScore = function (scoreName) {
    return this.scoreCard[scoreName].score;
  };

  this.recordScore = function (scoreName, dice) {
    this.scoreCard[scoreName].recordScore(dice);
    this.scoreCard['topTotal'].recordScore(this.scoreCard);
    if (this.scoreCard['topTotal'] >= 63) {
      this.scoreCard['topBonus'] = 35;
    }
    console.log('total = ' + this.scoreCard['topTotal']);
  };
};