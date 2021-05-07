import {ajax} from "./appModel.js";
import {searchMenus} from "./appModel.js";


//declare globally
//these variables need to be accessed by several different functions

var menuDiv; //the <div> that will hold the list of menus
var menuDetailsDiv; //the <div> that will hold the details elements
var menuEl;
var coursesEl;
var cuisineEl;
var levelEl;
var startImgEl;
var starterEl;
var mainImgEl;
var mainEl;
var dessImgEl;
var dessEl;
var imageEl;
var backBtn;
var select;



function mainImage(){
	const imgUrl = menus.mainImg
	myImage.src = menus.mainImg;
	return imgUrl;
  }
  
  
  function playResults(matchingMenus){
  const resultsFragment = document.createDocumentFragment()
  matchingMenus.forEach(function (menu) {
	  const title = document.createElement("h2")
	  const myImage = document.createElement("img");
	  const li = document.createElement('li');
	  const newPara = document.createElement('p');
	  const secPara = document.createElement('p');
	  const thiPara = document.createElement('p');
	  title.textContent = (`${menu.menu}`);
	  myImage.setAttribute("src", menu.mainImage);
	  li.textContent = `Courses: ${menu.courses}`;
	  newPara.textContent = `Cuisine: ${menu.cuisine}`;
	  secPara.textContent = `Level: ${menu.level}`;
	  thiPara.textContent = `Starter: ${menu.starter}`;
	  resultsFragment.appendChild(title);
	  resultsFragment.appendChild(myImage);
	  resultsFragment.appendChild(li) ;
	  resultsFragment.appendChild(newPara);
	  resultsFragment.appendChild(secPara);
	  resultsFragment.appendChild(thiPara);
  
  })
  menusList.appendChild(resultsFragment);
  }
  
  
  
  function clearResults(){
  while(menusList.firstChild){
	menusList.removeChild(menusList.firstChild);
  }
  }
  
  
  function runSearch()
  {
  clearResults()
  const menuTerm = select.value;
  if(menuTerm.length<2){
	return;
  }
  console.log(`The search term is ${menuTerm}.`);
  const matchingMenus = searchMenus(menuTerm);
  playResults(matchingMenus);
  }
  




function createHandler(menu)
{
	//this function uses a closure to associate data with a function
	return function(){
		
		menuEl.textContent = `Menu: ${menu.menu}`;
        coursesEl.textContent = `Courses: ${menu.courses}`;
        cuisineEl.textContent = `Cuisine: ${menu.cuisine}`;
        levelEl.textContent = `Chef Level: ${menu.level}`;
        startImgEl.setAttribute("src", menu.starterImage);
        starterEl.textContent = `Starter: ${menu.starter}`;
        mainImgEl.setAttribute("src", menu.mainImage);
        mainEl.textContent = `Mains: ${menu.main}`;
        dessImgEl.setAttribute("src", menu.dessertImage);
        dessEl.textContent = `Dessert: ${menu.dessert}`;
		menuDiv.classList.add("hide");
		menuDetailsDiv.classList.remove("hide");
		//store the current menu's details in the history object
		history.pushState(menu,null,menu.id);
	}
}

function populateList(menus)
{
	const menusFragment = document.createDocumentFragment();
	menus.forEach(function(menu){
		const newLi=document.createElement("li");
		const newField=document.createElement("fieldset");
		newLi.textContent=menu.menu;
		newLi.classList.add("link-item");
		newLi.addEventListener("click", createHandler(menu), false)
		menusFragment.appendChild(newField);
		menusFragment.appendChild(newLi);
	})
	const menusList=document.getElementById("menus-list");
	menusList.appendChild(menusFragment);
}
function goBack(){
	menuDiv.classList.remove("hide");
	menuDetailsDiv.classList.add("hide");
	//an an empty history entry
	history.pushState(null,null,"./");
}

//this function will be called when the browser back/forward button is hit
function doHistory(evnt) {
	if(evnt.state){
		//show menus's details
        let menu=evnt.state
		menuEl.textContent = `Menu: ${menu.menu}`;
        coursesEl.textContent = `Courses: ${menu.courses}`;
        cuisineEl.textContent = `Cuisine: ${menu.cuisine}`;
        levelEl.textContent = `Chef Level: ${menu.level}`;
        startImgEl.setAttribute("src", menu.starterImage);
        starterEl.textContent = `Starter: ${menu.starter}`;
        mainImgEl.setAttribute("src", menu.mainImage);
        mainEl.textContent = `Mains: ${menu.main}`;
        dessImgEl.setAttribute("src", menu.dessertImage);
        dessEl.textContent = `Dessert: ${menu.dessert}`;
		menuDiv.classList.add("hide");
		menuDetailsDiv.classList.remove("hide");
	}else{
		//show the list of all the menus
		menuDetailsDiv.classList.add("hide");
		menuDiv.classList.remove("hide");
	}

}

function menuinit(){
    //grab hold of HTML elements
	menuDiv =  document.getElementById("list");
    menuDetailsDiv =  document.getElementById("details");
    imageEl = document.querySelector("#chefImg");
	menuEl = document.getElementById("menu");
	coursesEl = document.getElementById("courses");
    cuisineEl = document.getElementById("cuisine");
    levelEl = document.getElementById("level");
    startImgEl = document.querySelector("#startImg");
    starterEl = document.getElementById("starter");
    mainImgEl = document.querySelector("#mainImg");
    mainEl = document.getElementById("main");
    dessImgEl = document.querySelector("#dessImg");
    dessEl = document.getElementById("dessert");
	backBtn = document.querySelector("#backBtn");

	//add event listener for the back button
	backBtn.addEventListener("click",goBack,false);

	//hide the details view on page load
	menuDetailsDiv.classList.add("hide");

	//this event will be triggered when the browser back button is hit
	window.addEventListener('popstate', doHistory,false);

	//make Ajax request
	ajax("data/menus.json",populateList);
}

// init();

let searchMenu = document.getElementById("ajax-header")
searchMenu.addEventListener("click", event => {
	
    menuinit()
	event.preventDefault()
	searchMenu.classList.add("hide")
});


 function selectinit(){
   
	select = document.querySelector("#select");
	select.focus();
	select.addEventListener("change",runSearch);
	}
	
	window.addEventListener("load", selectinit, false);
	
	