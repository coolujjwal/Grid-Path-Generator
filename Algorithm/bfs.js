// var given = [
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 1],
//   [0, 0, 0, 0, 0],
//   [0, 1, 1, 0, 1],
//   [0, 0, 0, 0, 0]
// ];


// start_i = 1;
// start_j = 1;
// end_i = 4;
// end_j = 4;




//node
/***********************************/

function point2(i, j, wall) {
  this.x = i;
  this.y = j;

  this.parent = null;

  this.wall = wall;
  
}

//FIND NEIGHBOURS
  /****************************************/

function findneighbours2(point, grid) {
  var i = point.x;
  var j = point.y;

  var neighbours = [];

  if (i > 0 && grid[i - 1][j].wall == 1) {
    neighbours.push(grid[i - 1][j]);
  }
  if (i < c - 1 && grid[i + 1][j].wall == 1) {
    neighbours.push(grid[i + 1][j]);
  }
  if (j < r - 1 && grid[i][j + 1].wall == 1) {
    neighbours.push(grid[i][j + 1]);
  }
  if (j > 0 && grid[i][j - 1].wall == 1) {
    neighbours.push(grid[i][j - 1]);
  }
  return neighbours;
}

//search
//***************************************************/

function BFS(given, start_i, start_j, end_i, end_j) {
//		document.getElementById('1').innerHTML += '# bfs working';
  /*var open = [];
var close = [];
var path = [];
*/
open = [];
close=[];

  c = given.length;
  r = given[0].length;
//document.getElementById('1').innerHTML += '# ' c + ' ' + r;
  var grid = new Array(c);

  for (var i = 0; i < c; i++) {

    grid[i] = new Array(r);
  }

  for (var i = 0; i < c; i++) {
    for (var j = 0; j < r; j++) {
      grid[i][j] = new point2(i, j, !given[i][j]);
    }
  }

  var start = grid[start_i][start_j];
  var end = grid[end_i][end_j];

  open.push(start);

  //console.log(open);

  while (open.length > 0) 
  {
    //continue
    var current= open.shift();

   // console.log(current);

    if (current === end) {
     // console.log("PATH FOUND");
      path = [];

      var temp = current;

      while (temp.parent!=null) {
        path.push([temp.x, temp.y]);
        temp = temp.parent;
      }

      path.push([start.x, start.y]);
      path.reverse();

      //console.log(path);
      return path;
    } 
    else 
    {
      close.push(current);

      var neighbours = findneighbours2(current, grid);

      for (var i = 0; i < neighbours.length; i++) 
      {
        var neighbour = neighbours[i];
        if (!close.includes(neighbour)&&!open.includes(neighbour)) 
        {
          neighbour.parent = current;
          open.push(neighbour);
        }
      }
    }
  }
  
    //console.log("NO PATH");
    return [];
  
}
//BFS(given, start_i, start_j, end_i, end_j);
