'use strict';

var tetris = function (jaws) {
    return {
	setup: function () {
	    jaws.log('setting up', true);
	},
	draw: function () {
	    jaws.context.fillStyle = 'black';
	    jaws.context.fillRect(0, 0, jaws.width, jaws.height);
	},
	update: function () {
	    // TODO
	}
    }
};

	
	