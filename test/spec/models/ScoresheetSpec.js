'use strict';

describe('Scoresheet behaviour', function () {
    it('should be constructed with a player name', function () {
        expect(new Scoresheet('Billy Bob').getPlayerName()).toBe('Billy Bob');
    });
});
