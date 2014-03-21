'use strict';

angular.module('gameApp')
  .controller('MainCtrl', function ($scope, yahtzee) {

    $scope.newPlayerName = '';
    $scope.scoresheets = yahtzee.getScoresheets();
    $scope.scorecardTemplate = new Scoresheet('not a player').getScorecardComponents();
    $scope.yahtzee = yahtzee;

    var handleError = function(error) {
      alert (error.getMessage());
    }

    $scope.rollDice = function () {
      try {
        yahtzee.rollDice();
      } catch (e) {
        handleError(e);
      }
    };

    $scope.startGame = function () {
      try {
        yahtzee.startGame();
      } catch (e) {
        handleError(e);
      }
    }

    $scope.setScore = function (playerName, scoreName) {
      try {
        yahtzee.recordScore(playerName, scoreName);
      } catch (e) {
        handleError(e);
      }
    }

    $scope.addPlayer = function () {
      yahtzee.addNewPlayer($scope.newPlayerName);
    }

    $scope.saveDice = function (dice) {
      yahtzee.saveDice(dice);
    }
  });
