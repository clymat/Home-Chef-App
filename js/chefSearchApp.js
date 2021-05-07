import {searchChefs} from "./appModel.js";
import { michChefs } from "./appModel.js";
import {  famChefs} from "./appModel.js";
import { gradChefs } from "./appModel.js";


//Hamburger Menu //
slideMenu();
function slideMenu() {
  const menu = $(document).ready(function () {
    $(".menu__icon").click(function () {
      $("body").toggleClass("menu_shown");
    });
  });
  const burgerMenu = menu;
}

//This section is the chef search code//
var searchBox;
var chefList;
var goBtn;
var searchBtn;

 export function myImage(){
    const imgUrl = chefs.image;
    myImage.src = chefs.image;
    return imgUrl;
}


// This section is the search facility for chefs
function displayResults(matchingChefs){
	const resultsFragment = document.createDocumentFragment()
	matchingChefs.forEach(function (chef) {
      const title = document.createElement("h2");
      const myImage = document.createElement("img");
      const li = document.createElement('li');
      const newPara = document.createElement('p');
      const secPara = document.createElement('p');
      const thiPara = document.createElement('p');
      title.textContent = (`Chef in ${chef.location}`);
      myImage.setAttribute("src", chef.image);
      li.textContent = chef.name;
      newPara.textContent = `Level: ${chef.level}`;
      secPara.textContent = `Cuisine: ${chef.cuisine}`;
      thiPara.textContent = `Description: ${chef.description}`;
      resultsFragment.appendChild(title);
      resultsFragment.appendChild(myImage);
      resultsFragment.appendChild(li) ;
      resultsFragment.appendChild(newPara);
      resultsFragment.appendChild(secPara);
      resultsFragment.appendChild(thiPara);

	})
  chefList.appendChild(resultsFragment);
  
}

function clearSearchResults(){
  while(chefList.firstChild){
    chefList.removeChild(chefList.firstChild);
  }
}


function doSearch()
{
  clearSearchResults()
	const searchTerm = searchBox.value.toLowerCase();
	if(searchTerm.length<2){
		return;
	}
	console.log(`The search term is ${searchTerm}.`);
	const matchingChefs = searchChefs(searchTerm);
	displayResults(matchingChefs);
}


 function init(){
	searchBox = document.querySelector("#search-box");
	goBtn = document.querySelector("#go-btn");
  searchBox.focus();
	chefList = document.querySelector("#chef-list");
	goBtn.addEventListener("click",doSearch);
	searchBox.addEventListener("keyup",doSearch);
}
 
runChefSearch();
function runChefSearch() {
  window.addEventListener("load", init, false);

}



// This section has the code for the chef catergories buttons
let michChefList;
const smichelinTerm = getMichelin();
const familyTerm = getFamily();
const graduateTerm = getGraduate();

function getMichelin() {
  return "Michelin Chef";
}

function getFamily() {
  return "Family Chef";
}

function getGraduate() {
  return "Graduate Chef";
}


function showResults(matchingChefs){
	const resultsFragment = document.createDocumentFragment()
	matchingChefs.forEach(function (chef) {
      const title = document.createElement("h2")
      const myImage = document.createElement("img");
      const li = document.createElement('li');
      const newPara = document.createElement('p');
      const secPara = document.createElement('p');
      const thiPara = document.createElement('p');
      title.textContent = (`${chef.level}`);
      myImage.setAttribute("src", chef.image);
      li.textContent = chef.name;
      newPara.textContent = `Level: ${chef.level}`;
      secPara.textContent = `Cuisine: ${chef.cuisine}`;
      thiPara.textContent = `Description: ${chef.description}`;
      resultsFragment.appendChild(title);
      resultsFragment.appendChild(myImage);
      resultsFragment.appendChild(li) ;
      resultsFragment.appendChild(newPara);
      resultsFragment.appendChild(secPara);
      resultsFragment.appendChild(thiPara);

	})
	michChefList.appendChild(resultsFragment);
}

function clearSearch(){
  while(michChefList.firstChild){
    michChefList.removeChild(michChefList.firstChild);
  }
}

function michLevelSearch(){
  clearSearch()
  const michelinTerm = "Michelin Chef";
  if (michelinTerm.length<2){
    return;
  }
  const matchingChefs = michChefs(michelinTerm);
  showResults(matchingChefs);
}

function famLevelSearch(){
  clearSearch()
  const familyTerm = "Family Chef";
  if (familyTerm.length<2){
    return;
  }
  const matchingChefs = famChefs(familyTerm);
  showResults(matchingChefs);
}

function gradLevelSearch(){
  clearSearch()
  const graduateTerm = "Graduate Chef";
  if (graduateTerm.length<2){
    return;
  }
  const matchingChefs = gradChefs(graduateTerm);
  showResults(matchingChefs);
}

 function michelininit(){
  michChefList = document.querySelector("#michChef-list");
  michLevelSearch();
}

function familyinit(){
  michChefList = document.querySelector("#michChef-list");
  famLevelSearch();
}

function graduateinit(){
  michChefList = document.querySelector("#michChef-list");
  gradLevelSearch();
}


searchMichelin();
searchFamily();
searchGraduate();


function searchMichelin() {
  let searchBtn = document.getElementById("chef-level");
  searchBtn.addEventListener("click", event => {
    michelininit();
    event.preventDefault();
    searchBtn.classList.add("hide");
  });
}

function searchFamily() {
  let searchBtn = document.getElementById("chef-levels");
  searchBtn.addEventListener("click", event => {
    familyinit();
    event.preventDefault();
    searchBtn.classList.add("hide");
  });
}

function searchGraduate() {
  let searchBtn = document.getElementById("chefs-level");
  searchBtn.addEventListener("click", event => {
    graduateinit();
    event.preventDefault();
    searchBtn.classList.add("hide");
  });
}









	
	