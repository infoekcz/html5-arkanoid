/*

    H A G E - HTML5 Awilum Game Engine
	
    License       : GNU GPL3
    Developer     : Sergey Romanenko / Awilum http://awilum.monstra.org/
    Web Site      : http://awilum.monstra.org/

	____INDEX		
	HAGE CORE
	HAGE SCENE
	HAGE TYPOGRAPHY
	HAGE INPUT
---------------------------------------------------------------------*/	
	
 	// Engine constants
	const ENGINE_DEBUG = true;
	
	// Engine vaiables
	var canvas = null; 	  // canvas DOM object
	var context = null;   // canvas context
	var frameCount = 0;   // Frame count 
	var fps = 0; 		  // Frames per Second

	
	
	/* HAGE CORE
	-----------------------------------------*/
	
	// HAGE Run
	function hageRun() {
		canvas=document.getElementById("canvas");
		context=canvas.getContext("2d");			
		init(); 	// Init game scene	
		draw(); 	// Draw game scene					
		hageLoop();	// Start game loop
		hageFps();	// Start FPS Counter
	}
	
	// HAGE Default. Set default engine parameters
	function hageDefault() {
		// Set default text font
		textFont('12pt Arial');
		// Set default text color
		textColor('#999');
		// Set default color
		borderColor('#fff');
	}
	
	// HAGE Clear
	function hageClear() {
		context.clearRect(0,0,canvas.width, canvas.height);
		context.beginPath();
	}
	
	// HAGE main loop
	function hageLoop() {
		var start = new Date().getTime(),
		time = 0;
		function timer() {
			time += 15;
			var diff = (new Date().getTime() - start) - time;			
			hageClear();
			hageDefault(); // Setup HAGE default paramaters
			update(); 	   // Update game scene
			draw(); 	   // Draw game scene			 
			frameCount++;					
			window.setTimeout(timer, (15 - diff));			
		}	
		window.setTimeout(timer, 15);		
	}
	
	// HAGE FPS Counter
	function hageFps() {
		var start = new Date().getTime(),
		time = 0;
		function instance() {
			time += 1000;			
			setFPS();			
			var diff = (new Date().getTime() - start) - time;
			window.setTimeout(instance, (1000 - diff));
		}		
		window.setTimeout(instance, 1000);			
	}

	// Set FPS
	function setFPS() {
		fps = frameCount;
		frameCount = 0;		
	}
	
	
	/* HAGE SCENE
	-----------------------------------------*/	

	// Set canvas background color
	function background(color) {
		canvas = document.getElementById('canvas');
		canvas.style.background = color;
	}	

	// Hide cursor
	function noCursor() {
		canvas = document.getElementById('canvas');
		canvas.style.cursor = "url('data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='), auto";
	}	

	// Show default cursor  
	function defaultCursor() {
		canvas = document.getElementById('canvas');
		canvas.style.cursor = "default";
	}	

	// Show custom cursor
	function customCursor(filename) {
		canvas = document.getElementById('canvas');
		canvas.style.cursor = "url('"+filename+"'),auto";
	}
	
	
	/* HAGE TYPOGRAPHY
	-----------------------------------------*/	
	
	// Set text font	
	function textFont(font) {
		context.font = font;
	}	
	
	// Set text color
	function textColor(color) {
		context.fillStyle = color;
	}
	
	// Draw text
	function text(str, x, y) {
        context.fillText(str, x, y);
	}
	
	
	/* HAGE INPUT
	-----------------------------------------*/	
	
	// Mouse input
	var mouseX = 0;
	var mouseY = 0;
	var mouseClickX = 0;
	var mouseClickY = 0;
	var mouseClick = false;
	
	// Keyboard input
	var KEY = 0;
	var KEY_LEFT  = false;
	var KEY_RIGHT = false;
	var KEY_UP    = false;
	var KEY_DOWN  = false;
	var KEY_SPACE = false;
	var KEY_W 	  = false;
	var KEY_A  	  = false;
	var KEY_S 	  = false;
	var KEY_D     = false;
	var	KEY_K 	  = false;
	var	KEY_M     = false;
	
	// Get mouse X and Y
	function hageMouseMove(event) {
		mouseX = event.clientX - canvas.offsetLeft;    
		mouseY = event.clientY - canvas.offsetTop;    
	}

	// Get mouse click X and Y
	function hageMouseClick(event) {
		mouseClickX = event.clientX - canvas.offsetLeft;    
		mouseClickY = event.clientY - canvas.offsetTop;    		
	}
		
	// Set mouse click true
	function hageMouseDown(event) {			
		mouseClick = true;		
	}
	
	// Set mouse click false
	function hageMouseUp(event) {		
		mouseClick = false;		
	}	 
	
	// Get keyboard press buttons
	function hageKeyboardUpdateStates(event) {				
		KEY = event.keyCode;		
		if(KEY == 39) KEY_RIGHT = true; 
		if(KEY == 37) KEY_LEFT  = true; 
		if(KEY == 38) KEY_DOWN  = true; 
		if(KEY == 40) KEY_UP    = true; 
		if(KEY == 65) KEY_A  = true; 
		if(KEY == 87) KEY_W  = true; 
		if(KEY == 68) KEY_D  = true; 
		if(KEY == 83) KEY_S  = true; 
		if(KEY == 75) KEY_K  = true;
		if(KEY == 77) KEY_M  = true;
		if(KEY == 32) KEY_SPACE  = true;		
		
		if(ENGINE_DEBUG) console.log(KEY);
	}
	
	// Clear keybord states
	function hageKeyboardClearStates(event) {
		KEY = event.keyCode;
		KEY_RIGHT = false;
		KEY_LEFT  = false;
		KEY_DOWN  = false; 
		KEY_UP    = false; 
		KEY_W 	  = false;
		KEY_A  	  = false;
		KEY_S 	  = false;
		KEY_D     = false;
		KEY_K 	  = false;
		KEY_M     = false;
		KEY_SPACE = false;		
	}
	
	
	
	/* HAGE PRIMITIVES
	-----------------------------------------*/	
	
	// Set border color
	function borderColor(color) {
		context.strokeStyle = color;
	}
	
	// Set line width
	function lineWidth(width) {	
		context.lineWidth = width;		    
	}
	
	// Set line style: butt, round, or square.                
	function lineStyle(style) {		
		context.lineCap = cap; 
	}	
	
	// Begin path
	function hageBegin() {
		context.beginPath();
	}
	
	// Move to
	function moveTo(x, y) {
		context.moveTo(x, y);
	}
	
	// Line to
	function lineTo(x, y) {
		context.lineTo(x, y);
	}	
	
	// Create a Quadratic curves
	function quadraticCurveTo(controlX, controlY, endingPointX, endingPointY) {
		context.quadraticCurveTo(controlX, controlY, endingPointX, endingPointY);
	} 
	
	// Create a Bezier curve
	function bezierCurveTo(cPointX1, cPointY1, cPointX2, cPointY2, endPointX, endPointY) {
		context.bezierCurveTo(cPointX1, cPointY1, cPointX2, cPointY2, endPointX, endPointY); 
	}
	
	// End path
	function hageEnd() {
		context.stroke();
	}	
	
	// Draw circle
    function circle(x, y, radius, fill_style) {
        startingAngle =  0 * Math.PI;
        endingAngle = 2 * Math.PI;
        context.beginPath();           
        context.arc(x, y, radius, startingAngle, endingAngle, false);
        context.fillStyle = fill_style;
        context.fill();
        context.stroke(); 
    } 
	
	// Draw line
	function line(x1, y1, x2, y2, cap) {                            
        context.beginPath();           
        context.moveTo(x1,y1);
        context.lineTo(x2,y2);                 
        context.stroke();
    }
	
	// Draw arc
	function arc(x, y, radius, startAngle, endAngle) {
        startingAngle = startAngle * Math.PI;
        endingAngle = endAngle * Math.PI;
        context.beginPath();           
        context.arc(x, y, radius, startingAngle, endingAngle, false);
        context.stroke();    
    }
	
	// Draw curve
	function curve(x, y, controlX, controlY, endingPointX, endingPointY) {
        context.beginPath();              
        context.moveTo(x, y);
        context.quadraticCurveTo(controlX, controlY, endingPointX, endingPointY);
        context.stroke();
    }    
	
	// Draw bezier
    function bezier(x, y, cPointX1, cPointY1, cPointX2, cPointY2, endPointX, endPointY) {
        context.beginPath();
        context.moveTo(x, y);
        context.bezierCurveTo(cPointX1, cPointY1, cPointX2, cPointY2, endPointX, endPointY); 
        context.stroke();
    }
	
	// Draw rectangle
	function rectangle(topLeftCornerX, topLeftCornerY, width, height, fill_style) {
        context.beginPath();
        context.rect(topLeftCornerX, topLeftCornerY, width, height);
        context.fillStyle = fill_style;
        context.fill();
        context.stroke();
    }   	
	
	
	/* HAGE SPRITES
	-----------------------------------------*/		
		
	function sprite(imageObj,x,y,filename,width,height) {				
		imageObj.src = filename;	
		context.drawImage(imageObj,x,y,width,height);		
	}