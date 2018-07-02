var bouncingBox = (function() {
	//body: the yellow square, environment: the greeen background
	var box = {body: document.getElementById("box"), environment: document.getElementById("boxArea")};
	//label: label of sliders, input: sliders input itself, values: stores previous value of slider to be used for taking the diff.
	var sliders = {label: document.querySelectorAll(".valueLabel"),input: document.querySelectorAll("input"),values: [0,0,0,0]};
	var xMotion = {speed: 1, pos: 0, posDirection: true, side: "left"};
	var yMotion = {speed: 1, pos: 0, posDirection: true, side: "top"};

	function privateMove(motionType, dimensionName, size) {
		var dimension  = parseInt(box.environment.style[dimensionName]) || size;
		if(motionType.pos > dimension - 100) {
			motionType.posDirection = false;
		} else if (motionType.pos <= 0) {
			motionType.posDirection = true;
		}
		if (motionType.posDirection) {
			motionType.pos += motionType.speed;
		} else {
			motionType.pos -= motionType.speed;
		}
		box.body.style[motionType.side] = motionType.pos + "px";
	}
	
	//method added to sliders object to initialize values array to corrrect state
	sliders.initializeValues = function() {
		for (var i = 0; i < this.values.length; i++) {
			this.values[i] = parseInt(this.input[i].value);
		}
	}
	
	//add proper event listener to each slider input
	function RangeInputEventListeners() {
		for (var i = 0; i < sliders.input.length; i++) {
			sliders.input[i].addEventListener("change",chooseEventListener(sliders.input[i]));
		}
	}
	function chooseEventListener(rangeInput) {
		var func = null;
		switch(rangeInput.name) {
			case "width":
			case "height":
				func = eventListener(rangeInput);
				break;
			case "xSpeed":
				func = function() {
					getSpeed(rangeInput, xMotion, 2);
				}
				break;
			case "ySpeed":
				func = function() {
					getSpeed(rangeInput, yMotion, 3);
				}
				break;
		}
		return func;
	}
	//this increases the width and height of green box
	function eventListener(rangeInput) {
		var sizes = {width: 600, height: 400};
		var digit = {width: 0, height: 1};
		return function() {
			var newValue = parseInt(rangeInput.value);
			if(box.environment.style[rangeInput.name] === "") {
				box.environment.style[rangeInput.name] = sizes[rangeInput.name] + "px";
			}
			var change = newValue  - sliders.values[digit];
			box.environment.style[rangeInput.name] = (parseInt(box.environment.style[rangeInput.name]) + change * 10) + "px";
			sliders.values[digit] = newValue;
			sliders.label[digit].textContent = newValue;			
		}
	}
	//calculate the new speed of the box
	function getSpeed(rangeInput, motion, i) {
		var newValue = parseInt(rangeInput.value);
		motion.speed = newValue / 10;
		sliders.label[i].textContent = newValue;
	}

	return {
		initialize: function() {
			sliders.initializeValues();
			RangeInputEventListeners();
		},
		move: function() {
			privateMove(xMotion, "width", 600);
			privateMove(yMotion, "height", 400);
		}
	}	
})();

bouncingBox.initialize();
setInterval(bouncingBox.move, 10); //  this will run the animation in intevals of 10 milliseconds


