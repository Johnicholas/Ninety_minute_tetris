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
		    if (random(1)) {
			this.map[row].push('red');
		    } else {
			this.map[row].push('green');
		    }
		}
	    }
	    this.row = 0;
	    this.col = Math.floor(this.width / 2);
	    jaws.preventDefaultKeys(['left', 'right', 'up', 'down']);
	    this.interval = 800; // milliseconds?
	    var that = this;
	    setTimeout(function () { that.tick(); }, this.interval);
	},
	tick: function () {
	    var old_row = this.row;
	    // try to move down
	    this.row += 1;
	    if (this.collision()) {
		// time to get stuck
		// fix up
		this.row -= 1;
		this.map[this.row][this.col] = 'blue';
		this.row = 0;
		this.col = Math.floor(this.width / 2);
	    } else {
		// nothing to do?
	    }
	    var that = this;
	    setTimeout(function () { that.tick(); }, this.interval);
	},
	collision: function () {
	    if (this.row >= this.height ||
		this.col < 0 ||
		this.col >= this.width) {
		return true;
	    }
	    if (this.map[this.row][this.col] == 'blue') {
		return true;
	    } 
	    return false;
	},
	drawMap: function () {
	    for (var row = 0; row < this.height; ++row) {
		for (var col = 0; col < this.width; ++col) {
		    jaws.context.fillStyle = this.map[row][col];
		    // Note: row and col coorrespond to y and x
		    jaws.context.fillRect(col, row, 1, 1);
		}
	    }
	},
	drawActive: function () {
	    jaws.context.fillStyle = 'grey';
	    // Note: row and col correspond to y and x
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
	    var old_row = this.row;
	    var old_col = this.col;
	    if (jaws.pressed('left')) {
		this.col -= 1;
	    }
	    if (jaws.pressed('right')) {
		this.col += 1;
	    }
	    if (jaws.pressed('down')) {
		this.row += 1;
	    }
	    if (jaws.pressed('up')) {
		// you can't go up in tetris!
	    }
	    if (this.collision()) {
		this.row = old_row;
		this.col = old_col;
	    }
	}
    }
};

	
	