'use strict';

angular.module('gameApp')
  .controller('MainCtrl', function ($scope, yahtzee) {

    yahtzee.initialiseGame();
    $scope.newPlayerName = '';
    $scope.dice = yahtzee.getCurrentRoll();
    $scope.scoresheets = yahtzee.getScoresheets();
    $scope.currentPlayersScore;
    $scope.scorecardTemplate = new Scoresheet('not a player').getScorecardComponents();
    $scope.yahtzee = yahtzee;

    $scope.rollDice = function () {
      $scope.dice = yahtzee.rollDice();
    };

    $scope.startGame = function () {
      try {
        $scope.currentPlayersScore = yahtzee.startGame();
      } catch (e) {
        alert (e.getMessage());
      }
    }

    $scope.setScore = function (playerName, scoreName) {
      try {
        $scope.currentPlayersScore = yahtzee.recordScore(playerName, scoreName, $scope.dice);
      } catch (e) {
        alert (e.getMessage());
      }
    }

    $scope.addPlayer = function () {
      yahtzee.addNewPlayer($scope.newPlayerName);
    }
  });
