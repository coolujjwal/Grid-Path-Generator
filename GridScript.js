/*
This file is the main .js file in which all the event-listeners are defined 
*/
var open = [];			// the common array for algo files
var close = [];			// the common array for algo files
var path = [];			// the common array of path required for algo files

var rows = 42;			//initial declaration of rows and columns with maximum size
var cols = 60;

var actionFlag = 'W';		//to determine which action has to be performed on clicking of grid elements
var selectedAlgo = 1;		//specify which algo is selected for searching

var start_i = 0 , start_j = 0;	//the coordinates of starting point

var end_i = rows-1 , end_j = cols-1;	//the coordinates of destination point

var count_of_search = 0;		//keeping a count of how many times search button has been clicked for a particular grid

var bi = '';

document.addEventListener("DOMContentLoaded", function(event) { changeGridSize(); });
//document.getElemnetById("resetGrid").addEventListener("click", function(){ changeGridSize(); });	 					//create the grid when the content loading is complete
document.getElementById("Starting point").addEventListener("click", function(){ setActionFlag('S'); });				//setting the action-flag using buttons provided
document.getElementById("Ending point").addEventListener("click", function(){ setActionFlag('E'); });
document.getElementById("Walls").addEventListener("click", function(){ setActionFlag('W'); });
//document.getElementById("Start search").addEventListener("click",function(){ count_of_search++; selectAlgo(); pathfinding();}); //increment the count_of_search, check the algo, start search 

function setActionFlag(f) {
	actionFlag=f;
	var currentActionFlag = document.getElementById('p');
	switch(f)
	{
		case 'S' : currentActionFlag.innerHTML= 'Select the starting point of the path. ';			// clicked element will become the new starting point
			   break;
		case 'E' : currentActionFlag.innerHTML= 'Select the end point of the path. ';				//clicked element will become new destination point
			   break;
		case 'W' : currentActionFlag.innerHTML= 'Click on the obstacles of the path. ';				//clicked element will alter between open-path/wall
			   break;
		case 'C' : currentActionFlag.innerHTML= 'Select the checkpoints of the path. ';				//clicked element will become checkpoint.....yet to be implemented
			   break;
		default :  currentActionFlag.innerHTML= 'Select one of the given options to define your path. ';
	}
}

function instructionsAlert() {			//Instructions for the page
	
	alert("1) Use given buttons to specify the required points in the grid.\n2) Green point indicate the starting point.\n3) Red point indicates the end point.\n4) Choose an algorithm from the given panel. \n5) Click on 'Let\'s begin! to start the search.")

}
		
function _createGrid() {				//create the grid according to specified number of rows and colmuns
	setArray();
	var gridRows = "";
	var gridBoxes = "";
	rowLength = cols;
	columnLength = rows;
	var i, j;
	for (i = 0; i < columnLength; i++) {			//adding <div></div> to the existing html element to create the grid
		gridBoxes = "";
		for(j = 0; j < rowLength; j++) {
			gridBoxes += '<div class=\"box\" id=\"' + i + ',' + j + '\" onclick = \"boxClick(' + i + ',' + j + ')\" >' /*+ i + j */+ '</div>';	//boxes are created with unique id's "i,j"
			array[i][j] = 0;
		}
		gridRows += '<div class="row">' + gridBoxes + '</div>';				//boxes are added to rows
	}
	var container = document.getElementById("grid");
	container.innerHTML = gridRows;				//rows are added to existing html element
	document.getElementById('p').innerHTML = "Select one of the given options to define your path. ";
	i--;
	j--;
	start_i = 0;				//setting the starting and destination point just after creating the grid
	start_j = 0;
	end_i = i;
	end_j = j;
	document.getElementById( '0,0' ).style.backgroundColor = "green";		//show the initial starting point
	let endPoint = '' + i + ',' + j ;
	document.getElementById( endPoint ).style.backgroundColor = "red";		//show the initial destination point
	count_of_search = 0;		//search-count is 0 at the beginning for each grid
	document.getElementById('startPoint').innerHTML = 'Starting from ' + start_i + ',' + start_j ;
	document.getElementById('endPoint').innerHTML = 'Ending at ' + end_i + ',' + end_j;
	path = [];
}


function boxClick( is , js ) {				//triggered whenever an element (box) in the grid is clicked
	var i = parseInt( is , 10 );			//separating the index i and j from the passed id of the box
	var j = parseInt( js , 10 );
	arrayManipulator( i , j );			//for changing the value of array elements according the the action being performed
	changeColorOfBox( i , j );			//for changing the color of grid boxes according the the action being performed
}

function arrayManipulator( i , j ) {
	
	switch(actionFlag)
	{
		case 'S' : 
			   if( i != end_i || j != end_j ) {	//if not destination point
				array[i][j] = 0;
			   }
			   break;
		case 'E' : 
			   if( i != start_i || j != start_j ) {	//if not starting point
				array[i][j] = 0;
			   }
			   break;
		case 'W' : 
			   if( array[i][j] === 1) {		//if a wall
				array[i][j] = 0;
			   } else if( (array[i][j] === 0) && ((i != start_i) || (j != start_j)) && ((i != end_i) || (j != end_j)) ) {	// if not starting or destination point but simple open path
				array[i][j] = 1;
			   } 
			   break;
		default :  array[i][j] = 0;
	}
}

function changeColorOfBox( i , j ) {
	
	switch(actionFlag)
	{
		case 'S' : 
			   if( i != end_i || j != end_j ) {			//if not destination point
			   	   document.getElementById( ""+start_i+','+start_j ).style.backgroundColor = "rgba(200,200,200,0.2)";	//change previous starting point to open path
				   document.getElementById( ""+i+','+j ).style.backgroundColor = "green";	//green starting point
				   start_i = i;									//set new starting coordinates
				   start_j = j;
			   }
			   document.getElementById('startPoint').innerHTML = 'Starting from ' + start_i + ',' + start_j ;
			   document.getElementById('coordinates').innerHTML = 'Pointing at ' + start_i + ',' + start_j + ' with value ' + array[start_i][start_j] ;
			   break;
		case 'E' : 
			   if( i != start_i || j != start_j ) {			//if not starting point
			   	   document.getElementById( ""+end_i+','+end_j ).style.backgroundColor = "rgba(200,200,200,0.2)";	//change previous destination point to open path
				   document.getElementById( ""+i+','+j ).style.backgroundColor = "red";		//red destination point
				   end_i = i;									//set new destination point 
				   end_j = j; 
			   }
			   document.getElementById('endPoint').innerHTML = 'Ending at ' + end_i + ',' + end_j;
			   document.getElementById('coordinates').innerHTML = 'Pointing at ' + end_i + ',' + end_j + ' with value ' + array[end_i][end_j] ;
			   break;
		case 'W' : 
			   if( array[i][j] == 1)	//if a wall
			   {	
				document.getElementById( ""+i+','+j ).style.backgroundColor = "black";	//wall in black
			   }
			   else if( array[i][j] == 0 && ((i != start_i) || (j != start_j)) && ((i != end_i) || (j != end_j)))	// if not starting or destination point but simple open path
			   {	
				document.getElementById( ""+i+','+j ).style.backgroundColor = "rgba(200,200,200,0.2)";
			   }
			   document.getElementById('coordinates').innerHTML = 'Pointing at ' + i + ',' + j + ' with value ' + array[i][j] ;
			   break;
		default :  array[i][j] = 0;
	}
}

function changeGridSize() {		// on clicking 'set grid' new rows and columns are set with a maximum boundary

	rows = document.getElementById("numberOfRows").value;
	cols = document.getElementById("numberOfColumns").value;
	if( rows > 42 || rows == 0 ) {
		rows = 42;
	}
	if( rows < 2 ) {
		rows = 2;
	}
	if( cols == 0 || cols > 60 ) {
		cols = 60;
	}
	if( cols < 2 ) {
		cols = 2;
	}
	_createGrid();			//grid is created again
	document.getElementById('gridSize').innerHTML = 'Rows : ' + array.length + ', Columns : '+ array[0].length ;
}

function selectAlgo() {			//algo is selected using radio buttons
	var algoList = document.getElementsByName("algo");
	selectedAlgo = 1;
	for( let i = 0; i < algoList.length; i++ )
	{
		if(algoList[i].checked)
		{	selectedAlgo = algoList[i].value;	}	//value indicating selected algo is stored in 'selectedAlgo'
	}
}

function pathfinding() {

	count_of_search++; 
	selectAlgo();
	
	for( i=1; i < path.length-1; i++){			//clearing the previous path color
		var s = path[i][0] + "," + path[i][1] ;
		var cell = document.getElementById(s);
		if( array[path[i][0]][path[i][1]] == 0)
			cell.style.backgroundColor = "rgba(200,200,200,0.2)";
	}
	path = [];
	open=[];
	close=[];	//empty the path array from previous path
	
	if(selectedAlgo == 2){	bi = 'Breadth Fist Search';	path= BFS(array, start_i, start_j, end_i, end_j);	}	
	if(selectedAlgo == 3){	bi = 'Dijkstra';	path= Dijkstra(array, start_i, start_j, end_i, end_j);	}

	
	document.getElementById('algoSelected').innerHTML = "Selected algo is : " + bi;
	
	if ( checkPath() == 0 )									//if path not found, alert
	{	alert("There was an error finding the path. Please try again for another arrangement!");	}	
	
	var i;
	for( i=0; i < path.length; i++)			//show the path found, by changing color of the corresponding grid box
	{
			var s = path[i][0] + ',' + path[i][1] ;
			var cell = document.getElementById(s);
			if(( (path[i][0] == start_i && path[i][1] == start_j ) || (path[i][0] == end_i && path[i][1] == end_j ) || (array[path[i][0]][path[i][1]] == 1)) == 0)	
				cell.style.backgroundColor = "#FF69B4";							//if not starting/destination point or obstacle then change the color

	}
	document.getElementById( ""+start_i+','+start_j ).style.backgroundColor = "green";
	document.getElementById( ""+end_i+','+end_j ).style.backgroundColor = "red";


}

function checkPath() {
	
	let flag_start = 0, flag_end = 0 ;
	for(let i = 0; i < path.length ; i++)
	{
		if( path[i][0] == start_i && path[i][1] == start_j)
			flag_start = 1;
		if( path[i][0] == end_i && path[i][1] == end_j)
			flag_end = 1;
	}
	return (flag_start && flag_end);	 //check is both starting and ending point are present in the obtained path
}