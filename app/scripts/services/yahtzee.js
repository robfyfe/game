'use strict';

angular.module('gameApp').service('yahtzee', function () {

    var TOTAL_NUMBER_OF_DICE = 5;
    this.dice = [];


    this.buildDice = function(label, value) {
        return {
            label: label,
            value: value
        }
    }

    this.initialiseGame = function() {
        for (var i = 0; i < TOTAL_NUMBER_OF_DICE; i++) {
            var diceNumber = i + 1;
            this.dice[i] = this.buildDice('Dice' + diceNumber, 'Not Rolled');
        }

        return this.dice;
    }

    this.rollDice = function () {
        console.log('Dice being rolled');
        for (var i = 0; i < TOTAL_NUMBER_OF_DICE; i++) {
            var diceNumber = i + 1;
            this.dice[i] = this.buildDice('Dice' + diceNumber, Math.floor((Math.random()*6)+1));
        }

        console.log('rollDice returning = ' + this.dice);
        return this.dice;
    };
});
