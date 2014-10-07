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
	
	//Check for templete is supported in browser or not
	if ('content' in document.createElement('template')) {
  	// Templates are supported.
		//alert("Templates are supported.");
	} else {
  	// Templates are not supported.
		//alert("Templates are not supported.");
	}

}

function fetchData( ){
	//when the user clicks the load button we would normally do an AJAX call to fetch the data
	//our data is already in the other file - data.js
	
	nextChild = prepareHTMLElements(data.items[currentItem]);
	console.log(nextChild);
	
	displayNewDataInMain(nextChild,prevChild);
	
	//Add data to Hystory items array
	if(prevChild)
	{
		historyItems.unshift(prevChild);
		moveExistingDataToSide(prevChild);
	}
	
	prevChild=nextChild;
	currentItem++;
}

function prepareHTMLElements(currentData)
{
//	console.log(currentData);
	var templete = document.querySelector('.main-template').cloneNode(true);
	templete.querySelector(".title").innerHTML=currentData.title;
	templete.querySelector(".author").innerHTML=currentData.author;
	templete.querySelector(".date").innerHTML=currentData.date;
	templete.querySelector(".description").innerHTML=currentData.description;
	templete.querySelector("a").innerHTML=currentData.link;
	templete.querySelector("a").href=currentData.link;
	templete.querySelector("img").src= 'img/'+currentData.image;
	templete.className="";
	
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

function moveExistingDataToSide(dataToBeRemove){
	//take the data in the main section output div	and add it to the sidebar output div
	
	var outPut2=document.querySelector("#output2");
//	var last3Items=historyItems;
	//Maintain History with only 3 items
	if(historyItems.length>3)
	{
		outPut2.removeChild(historyItems[historyItems.length-1]);
		historyItems.pop();
		
//		last3Items=historyItems.splice(0,3); //(historyItems.length-3, historyItems.length);
	}
	
	//Remove all childs
//	while (outPut2.hasChildNodes()) {
//    	outPut2.removeChild(node.lastChild);
//	}
	
//	outPut2.innerHTML='content'; 
	
//	for(var i=historyData.length-1; i<0; i--)
	for(var i=0; i<historyItems.length; i++)
	{
		outPut2.appendChild(historyItems[i]);
	}
	
	
//	if(dataToBeRemove)
//	{
//		var outPut2=document.querySelector("#output2");
//		var items=outPut2.querySelectorAll("#id_template");
//		
//		outPut2.appendChild(dataToBeRemove);
////		outPut2.insertBefore(items[0],dataToBeMoved);
//		
//		console.log(items.length);
//		
//		if(items.length > 3)
//		{
//			outPut2.removeChild(outPut2.getElementsByTagName("div")[0]);
//			
////			outPut2.replaceChild(items[1],items[0]);
////			outPut2.replaceChild(items[2],items[1]);
////			outPut2.replaceChild(items[3],items[2]);
//		}
//		
//	}
}