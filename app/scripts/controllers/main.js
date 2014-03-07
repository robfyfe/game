'use strict';

angular.module('gameApp')
    .controller('MainCtrl', function ($scope, yahtzee) {

      yahtzee.initialiseGame();
      $scope.dice = yahtzee.getCurrentRoll();
      $scope.scoresheets = yahtzee.getScoresheets();

      $scope.scorecardTemplate = new Scoresheet('not a player').getScorecardComponents();

      $scope.rollDice = function () {
        $scope.dice = yahtzee.rollDice();
      };
    });
