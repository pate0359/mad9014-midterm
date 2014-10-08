// JavaScript Document
/**************************
	Declarations
**************************/
var currentItem = 0;
var prevChild,nextChild;
var historyItems = []; 


document.addEventListener("DOMContentLoaded", init);

function init( ){
	//any user events that you want to add after the page loads (like clicking a button)
	document.querySelector(".btn").addEventListener("click",fetchData);
	
}

function fetchData( ){
	//when the user clicks the load button we would normally do an AJAX call to fetch the data
	//our data is already in the other file - data.js
	
	nextChild = prepareHTMLElements(data.items[currentItem]);
	//console.log(nextChild);
	
	displayNewDataInMain(nextChild,prevChild);
	
	//Add data to Hystory items array
	if(prevChild)
	{
		historyItems.unshift(prevChild);
		moveExistingDataToSide();
	}
	
	prevChild=nextChild;
	currentItem++;
	
	//disble button after loading all items
	if(currentItem>=10)
	{
		document.querySelector(".btn").className="btnDisable";
		document.querySelector(".btn").removeEventListener("click", function(e) { e.preventDefault(); }, false);
	}
}

function prepareHTMLElements(currentData)
{
//	console.log(currentData);
	var templete = document.querySelector('.main-template').cloneNode(true);
	templete.querySelector(".title").innerHTML=currentData.title;
	templete.querySelector(".date").innerHTML=currentData.date;
	templete.querySelector(".author").innerHTML='by - '+currentData.author;
	templete.querySelector(".description").innerHTML=currentData.description;
	templete.querySelector("img").src= 'img/'+currentData.image;
	templete.querySelector("a").innerHTML="More details...";
	templete.querySelector("a").href=currentData.link;
	templete.className="main-template-new";
	
	return templete;
}

function displayNewDataInMain(newData, oldData ){
	//clear the data from the main output div by
	//replacing it with the next object from the JSON in data.js
	//Use the currentItem variable to keep track of which item you are showing
	//Increment the currentItem variable after you display the data in the output div
	
	if(currentItem==0)
	{
		document.querySelector("#output1").appendChild(newData);

	}else{
		document.querySelector("#output1").replaceChild(newData,oldData);
	}
}

function moveExistingDataToSide(){
	//take the data in the main section output div	and add it to the sidebar output div
	var outPut2=document.querySelector("#output2");
	//Maintain History with only 3 items
	if(historyItems.length>3)
	{
		outPut2.removeChild(historyItems[historyItems.length-1]);
		historyItems.pop();
	}
	
//	var test = document.querySelector(".horizontal_divider");
//	outPut2.removeChild(test);
//	if(test)
//	{
//		for(var i=0; i<test.length; i++)
//		{
//			outPut2.removeChild(test[i]);
//		}
//	}
	
//	removeClass(ele, "be-still");
//	outPut2.removeChild(document.querySelector(".horizontal_divider"));

	for(var i=0; i<historyItems.length; i++)
	{
		outPut2.appendChild(historyItems[i]);
			
//		var devider=document.createElement('div');
//		devider.className="horizontal_divider";
//		outPut2.appendChild(devider);
		
		//Put horizonatal devider
		if(i != 0 || i < historyItems.length-1 )
		{
			var devider=document.createElement('div');
			devider.id="horizontal_divider";
			outPut2.appendChild(devider);
			
		}
	}	
}