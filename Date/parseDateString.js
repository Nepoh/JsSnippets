function init (){

var vals = [
	['2005-12-03', 'y-m-d'],
	['2005-12-03', 'y-d-m'],
	['20.10.99', 'd.m.y'],
	['32-2003', 'd-m-y']
];

for (var i=0; i<vals.length; i++)
{
	var date = parseDateString(vals[i][0], vals[i][1])
	
	console.log(vals[i][0], vals[i][1]);
	console.log(date);
}

}

function parseDateString(dateString, formatString)
{
	var datePos = 0, formatPos = 0;
	
	var dayArr = [], monthArr = [], yearArr = [];
	
	var formatChar, dateChar;
	
	while (formatPos < Math.max(dateString.length, formatString.length))
	{
		formatChar = formatString.charAt(formatPos);
		dateChar =   dateString.charAt(datePos);
		
		function set()
		{
			switch (formatChar)
			{
				case 'd':
				case 'D':
					dayArr.push(dateChar);
					return true;
				case 'm':
				case 'M':
					monthArr.push(dateChar);
					return true;
				case 'y':
				case 'Y':
					yearArr.push(dateChar);
					return true;
				default:
					return false;
			}
		}
		
		if (set() || formatChar == dateChar)
		{
			formatPos++;
			datePos++;
		}
		else
		{
			formatChar = formatString.charAt(formatPos - 1);
			set();
			datePos++;
		}
	}
	
	var day = parseInt(dayArr.join(''));
	var month = parseInt(monthArr.join(''));
	var year = parseInt(yearArr.join(''));
	
	// constructor expects month between 0 and 11
	return new Date(year, month-1, day);
}
