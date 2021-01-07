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

function point3(i, j, wall)
 {
  this.x = i;
  this.y = j;

  this.g = 0;

  this.parent = null;

  this.wall = wall;
}

//FIND NEIGHBOURS

function findneighbours3(point, grid) 
{
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

function Dijkstra(given, start_i, start_j, end_i, end_j) {
  path=[];
  open=[];
  close=[];

  c = given.length;
  r = given[0].length;

 //initializing the grid
 
  var grid = new Array(c);

  for (var i = 0; i < c; i++) 
  {
    grid[i] = new Array(r);
  }

  for (var i = 0; i < c; i++) 
  {
    for (var j = 0; j < r; j++) 
    {
      grid[i][j] = new point3(i, j, !given[i][j]);
    }
  }
  
  //initialize starting and ending points

  var start = grid[start_i][start_j];
  var end = grid[end_i][end_j];

  open.push(start);

  //start searching

  while (open.length > 0) 
  {
    //continue
    var lowest = 0;
    for (var i = 0; i < open.length; i++) 
     {
      if (open[i].g < open[lowest].g) 
      {
        lowest = i;
      }
    }

    var current = open[lowest];

   //path found
    if (current === end) 
    {
      // console.log("PATH FOUND");
      path = [];

      var temp = current;

      while (temp.parent) {
        path.push([temp.x, temp.y]);
        temp = temp.parent;
      }

      path.push([start.x, start.y]);
      path.reverse();

      //console.log(path);
      return path;
    } 

    else  //not found
    {
      const index = open.indexOf(current);
      open.splice(index, 1);
      close.push(current);
      
      //exploring neighbours
      var neighbours = findneighbours3(current, grid);

      for (var i = 0; i < neighbours.length; i++) 
      {
        var neighbour = neighbours[i];
        if (!close.includes(neighbour)) 
        {
          var temp = current.g + 1;
          if (open.includes(neighbour)) 
          {
            if (temp < neighbour.g) 
            {
              neighbour.g = temp;
            }
          } 
          else
           {
            neighbour.g = temp;
            open.push(neighbour);
          }

          neighbour.parent = current;
        }

      }


    }
  }
  
  
  //no path exits
  //console.log("NO PATH");
  return [];

}

//Dijkstra(given, start_i, start_j, end_i, end_j);