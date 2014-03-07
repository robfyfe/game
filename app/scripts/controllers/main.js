'use strict';

angular.module('gameApp')
    .controller('MainCtrl', function ($scope, yahtzee) {

      yahtzee.initialiseGame();
      $scope.newPlayerName = '';
      $scope.dice = yahtzee.getCurrentRoll();
      $scope.scoresheets = yahtzee.getScoresheets();

      $scope.scorecardTemplate = new Scoresheet('not a player').getScorecardComponents();

      $scope.rollDice = function () {
        $scope.dice = yahtzee.rollDice();
        $scope.currentScoresheet = $scope.scoresheets[0];

      };

      $scope.setScore = function(scoreName) {
        yahtzee.recordScore(scoreName, $scope.dice);
      }

      $scope.addPlayer = function() {
        yahtzee.addNewPlayer($scope.newPlayerName);
      }
    });
