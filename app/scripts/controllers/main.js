'use strict';

angular.module('gameApp')
    .controller('MainCtrl', function ($scope, yahtzee) {

      yahtzee.initialiseGame();
      $scope.newPlayerName = '';
      $scope.dice = yahtzee.getCurrentRoll();
      $scope.scoresheets = yahtzee.getScoresheets();
      $scope.currentPlayersScore;
      $scope.scorecardTemplate = new Scoresheet('not a player').getScorecardComponents();
      $scope.gameStarted = false;

      $scope.rollDice = function () {
        $scope.dice = yahtzee.rollDice();
      };

      $scope.startGame = function() {
        $scope.currentPlayersScore = yahtzee.startGame();
        $scope.gameStarted = true;
      }

      $scope.setScore = function(playerName, scoreName) {
        $scope.currentPlayersScore = yahtzee.recordScore(playerName, scoreName, $scope.dice);
      }

      $scope.addPlayer = function() {
        yahtzee.addNewPlayer($scope.newPlayerName);
      }
    });
