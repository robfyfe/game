'use strict';

angular.module('gameApp').service('yahtzee', function () {

    var TOTAL_NUMBER_OF_DICE = 5;

    this.buildDice = function(label, value) {
        return {
            label: label,
            value: value
        }
    }

    this.initialiseGame = function() {
        var startingDice = [];
        for (var i = 0; i < TOTAL_NUMBER_OF_DICE; i++) {
            var diceNumber = i + 1;
            startingDice[i] = this.buildDice('Dice' + diceNumber, 'Not Rolled');
        }

        return startingDice;
    }

    this.rollDice = function () {
        console.log('Dice being rolled');
        var newDice = [];
        for (var i = 0; i < TOTAL_NUMBER_OF_DICE; i++) {
            var diceNumber = i + 1;
            newDice[i] = this.buildDice('Dice' + diceNumber, Math.floor((Math.random()*6)+1));
        }

        console.log('rollDice returning = ' + newDice);
        return newDice;
    };
});
