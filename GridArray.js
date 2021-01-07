/*
This is run once when the file is included in script in the html file.
The array of maximum pre-defined size is created with all entries as 0 initially.
This array is represented in the form of a grid formed using <div></div> for each array element. 
When resizing of array is done, the immediate next row and column after the specified size is set to 1 so that they are identified as obstacles. All other elements are set to 0 again.
The gird visible has size as specified by user. 
The vlaues of the array elements are modified using the arrayManipulator() according to the clicked <div></div>
*/

var array = [];
function setArray() 
{
	array = [];
	for ( let i = 0; i < rows ; i++)
	{
		let row = [];
		for( let j = 0; j < cols; j++)
		{
			row.push(0);
		}
		array.push(row);
	}
}