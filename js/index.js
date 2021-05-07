if('serviceWorker' in navigator) {
	navigator.serviceWorker
			 .register('./sw.js')
			 .then(function() {
			   console.log('Service Worker Registered');
			  });
  }
  
  
  // Code to handle install prompt
  const addIconBtn = document.querySelector('#iconBtn');
  
  let promptForAddIcon;
  function triggerThePrompt(){
	//the button has been clicked
	promptForAddIcon.prompt();
  }
  
  function setUpAddIcon(evnt){
	console.log("Set up add icon")
	console.log(evnt);
	evnt.preventDefault();
	promptForAddIcon = evnt; 
	addIconBtn.addEventListener('click',triggerThePrompt,false)
  }
  
  window.addEventListener('beforeinstallprompt',setUpAddIcon, false);
  /*
  It's a bit convoluted but here's how it works:
  The beforeinstallprompt event is triggered by Chrome after the page loads
  We can listen for this event and run a function (setUpAddIcon)
  The event object that is passed to the function (evnt) is the thing that will actually generate the prompt for the user
  This prompt to be called following a user action, so we add a click handler (triggerThePrompt) to a button(addIconBtn) to actually call the prompt() function
  */