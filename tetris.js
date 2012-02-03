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
	    this.row = 0;
	    this.col = Math.floor(this.width / 2);
	},
	drawMap: function () {
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
	},
	drawActive: function () {
	    jaws.context.fillStyle = 'grey';
	    // Note: row and col coorrespond to y and x
	    jaws.context.fillRect(this.col, this.row, 1, 1);
	},
	draw: function () {
	    jaws.context.save();
	    jaws.context.fillStyle = 'black';
	    jaws.context.fillRect(0, 0, jaws.width, jaws.height);
	    jaws.context.translate((jaws.width - this.width * this.cellsize)/ 2,
				   (jaws.height - this.height * this.cellsize)/ 2);
	    jaws.context.scale(this.cellsize, this.cellsize);

	    this.drawMap();
	    this.drawActive();
	    jaws.context.restore();
	},
	update: function () {
	    if (jaws.pressed('left')) {
		this.col -= 1;
	    }
	    if (jaws.pressed('right')) {
		this.col += 1;
	    }
	    
	}
    }
};

	
	