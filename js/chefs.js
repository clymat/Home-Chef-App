import {ajax} from "./appModel.js";

// declare globally
// these variables need to be accessed by several different functions

var listDiv; //the <div> that will hold the list of chefs
var detailsDiv; //the <div> that will hold the details elements
var titleEl;
var imageEl;
var locationEl;
var levelEl;
var cuisineEl;
var descriptionEl;
var backBtn;
var chefMarker;



var { layerGroup, myMap } = setMarker();

function setMarker() {
	var myMap = L.map('chef-map').setView([55.3781, 3.4360], 5);
	
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
		maxZoom: 18
	}).addTo(myMap);

	var layerGroup = L.layerGroup().addTo(myMap);
	return { layerGroup, myMap };
}

function createHandler(chef)
{
	//this function uses a closure to associate data with a function
	return function(){
		layerGroup.clearLayers();
		myMap.closePopup();
		chefMarker = L.marker([chef.position.latitude, chef.position.longitude]).addTo(layerGroup);
		chefMarker.bindPopup(`${chef.name}, ${chef.location}`).openPopup();
		titleEl.textContent =  ` ${chef.name}`;
		imageEl.setAttribute("src", chef.image);
		locationEl.textContent = `Location: ${chef.location}`;
        levelEl.textContent = `Level: ${chef.level}`;
        cuisineEl.textContent = `Cuisine: ${chef.cuisine}`;
        descriptionEl.textContent = `Description: ${chef.description}`;
		listDiv.classList.add("hide");
		detailsDiv.classList.remove("hide");
		//store the current chef's details in the history object
		history.pushState(chef,null,chef.id);
	}
}

function populateList(chefs)
{
	const chefsFragment = document.createDocumentFragment();
	chefs.forEach(function(chef){ 
		const newHead=document.createElement("h2");
		const newMarker=document.createElement("h2");
		const newLi=document.createElement("li");
		const newField=document.createElement("fieldset");
		newHead.textContent= `Chefs in ${chef.location}`;
		newLi.textContent=chef.name;
		newLi.classList.add("link-item");
		newHead.classList.add("field");
		newLi.addEventListener("click", createHandler(chef), false)
		chefsFragment.appendChild(newHead);
		chefsFragment.appendChild(newLi);
		chefsFragment.appendChild(newField);

	
	})
	const chefsList=document.getElementById("chefs-list");
	chefsList.appendChild(chefsFragment);
}
function goBack(){
	listDiv.classList.remove("hide");
	detailsDiv.classList.add("hide");
	//an an empty history entry
	history.pushState(null,null,"./");
}

//this function will be called when the browser back/forward button is hit
function doHistory(evnt) {
	if(evnt.state){
		//show a chef's details
		let chef=evnt.state
		titleEl.textContent =  `Chef Name: ${chef.name}`;
		imageEl.setAttribute("src",chef.image);
		locationEl.textContent = `Location: ${chef.location}`;
        levelEl.textContent = `Level: ${chef.level}`;
        cuisineEl.textContent = `Cuisine: ${chef.cuisine}`;
        descriptionEl.textContent = `Description: ${chef.description}`;
		listDiv.classList.add("hide");
		detailsDiv.classList.remove("hide");
	}else{
		//show the list of all the chefs
		detailsDiv.classList.add("hide");
		listDiv.classList.remove("hide");
	}

}

function searchInit(){
    //grab hold of HTML elements
	listDiv =  document.getElementById("list");
    detailsDiv =  document.getElementById("details");
    imageEl = document.querySelector("#chefImg");
	titleEl = document.getElementById("title");
	locationEl = document.getElementById("location");
    levelEl = document.getElementById("level");
    cuisineEl = document.getElementById("cuisine");
    descriptionEl = document.getElementById("description");
	backBtn = document.querySelector("#backBtn");
	

	//add event listener for the back button
	backBtn.addEventListener("click",goBack,false);

	//hide the details view on page load
	detailsDiv.classList.add("hide");
	
	

	//this event will be triggered when the browser back button is hit
	window.addEventListener('popstate', doHistory,false);

	//make Ajax request
	ajax("data/chefs.json",populateList);
}

// init();

let searchMichelin = document.getElementById("ajax-header")
searchMichelin.addEventListener("click", event => {
	
    searchInit()
	event.preventDefault()
	searchMichelin.classList.add("hide")
	
	
});


