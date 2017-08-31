$(document).ready(function(){
	// Setting up Canvas
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	// Setting up Grids
	var gridNum = 20;
	var gridSize = canvas.width / gridNum;

	// Setting up Grids and Snake's body
	var xRows = [], yRows = [];
	// Storing the coordinates of body parts in pairs of [x, y] for each entry
	var snakeBody = [];

	// Setting up Keys
	var keyPressed = null;
	var leftKey = 37, upKey = 38, rightKey = 39, downKey = 40;

	// Setting up Player & Candy objects
	var candy = {
		x: 0,
		y: 0,
		alive: false
	};

	var player  = {
		x: 7,
		y: 7,
		// direction: Right - 0, Left - 1, Up - 2, Down - 3, Stopped - 5
		direction: 5,
		alive: true,
		tail: 1
	};

	// Make an custom .insert() method for Array
	Array.prototype.insert = function(index, item){
		// .splice(index_to_insert, no_of_items_to_delete, new items)
		this.splice(index, 0, item)
	}

	// Update collision, position and check for game conditions
	function update(){
		// Changing snake's movement direction
		if (keyPressed){
			if(keyPress == rightKey && player.direction != 1) player.direction = 0;
			if(keyPress == leftKey && player.direction != 0) player.direction = 1;
			if(keyPress == upKey && player.direction != 3) player.direction = 2;
			if(keyPress == downKey && player.direction != 2) player.direction = 3;
		}

		// Spawning Candy
		if(!candy.alive){
			// Generating random number from 0 to 19 (for 20 x 20 grids)
			candy.x = Math.floor(Math.random() * gridNum);
			candy.y = Math.floor(Math.random() * gridNum);

			// Check if spawning on snake
			var collided;

			do {
				collided = false;
				for(var i = 0; i < player.tail; i++){
					if(candy.x == snakeBody[i][0] && candy.y == snakeBody[i][1]){
						collided = true;
						candy.x = Math.floor(Math.random() * gridNum);
						candy.y = Math.floor(Math.random() * gridNum);
						break;
					}
				}
			} while(collided);

			// Now the candy is back alive!
			candy.alive = true;
		}

		// Check if player eats the candy
		if(player.x == candy.x && player.y == candy.y){
			candy.alive = false;
			player.tail++;
		}

		// Check if player eats itself
		for(var i = 0; i < player.tail; i++){
			if(player.x == snakeBody[i][0] && player.y == snakeBody[i][1]){
				player.alive = false;
			}
		}

		// Check if player hits border
		if(player.x >= gridNum || player.x < 0 || player.y >= gridNum || player.y < 0){
			player.alive = false;
		}

		// Moving the player
		if(true){
			snakeBody.insert(0, [player.x, player.y]);

			switch(player.direction){
				// Right
				case 0: 
				player.x += 1; break;
				// Left
				case 1:
				player.x -= 1; break;
				// Up
				case 2:
				player.y -= 1; break;
				// Down
				case 3:
				player.y += 1; break;
			}
		}

		// Call the draw function after updating
		draw();
	}

	// Draw the actual outcome
	function draw(){
		context.clearRect(0, 0, canvas.width, canvas.height);
		// Drawing the candy
		context.fillStyle = "red";
		context.fillRect(candy.x * gridSize, canvas.y * gridSize, gridSize, gridSize);
		// Drawing the snake
		context.fillStyle = "black";
		for(var i = 0; i < player.tail; i++){
			context.fillRect(snakeBody[i][0] * gridSize, snakeBody[i][1] * gridSize, gridSize, gridSize);
		}
	}

	// Starting the updates
	setInterval(update, 100);
});