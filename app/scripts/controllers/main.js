'use strict';

angular.module('gameApp')
  .controller('MainCtrl', function ($scope, yahtzee) {

        $scope.dice = yahtzee.initialiseGame();

        $scope.rollDice = function() {
            $scope.dice = yahtzee.rollDice();
        }
  });
