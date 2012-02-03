'use strict';

var tetris = function (jaws) {
    function random(max) {
	return Math.floor(Math.random() * (max + 1));
    }
    
    return {
	setup: function () {
	    this.width = 10;
	    this.height = 20;
	    this.cellsize = 20;
	    this.map = [];
	    for (var row = 0; row < this.height; ++row) {
		this.map.push([]);
		for (var col = 0; col < this.width; ++col) {
		    this.map[row].push(random(1));
		}
	    }
	},
	drawMap: function () {
	    jaws.context.save();
	    jaws.context.fillStyle = 'black';
	    jaws.context.fillRect(0, 0, jaws.width, jaws.height);
	    jaws.context.translate((jaws.width - this.width * this.cellsize)/ 2,
				   (jaws.height - this.height * this.cellsize)/ 2);
	    jaws.context.scale(this.cellsize, this.cellsize);

	    for (var row = 0; row < this.height; ++row) {
		for (var col = 0; col < this.width; ++col) {
		    if (this.map[row][col]) {
			jaws.context.fillStyle = 'red';
		    } else {
			jaws.context.fillStyle = 'green';
		    }
		    // Note: row and col coorrespond to y and x
		    jaws.context.fillRect(col, row, 1, 1);
		}
	    }
	    jaws.context.restore();
	},
	draw: function () {
	    this.drawMap();
	},
	update: function () {
	    // TODO
	}
    }
};

	
	