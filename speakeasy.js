
//Home Page - Events this Week
// if there is nothing inside .cms collection list with class .weekevents-list
if(!$('.weekevents-list').length){	

	// then hide the whole section
	$('.weekevents').hide();
  
}

//Sorting Events based on date in /Events page and obviously this code will be same for all pages where sorting fucntionality is set

//A sort button is already added inside the /events page and set to display:none The below code will run on page load and will perform button click to enable sorting.
$(window).on('load', function() {
	document.getElementById("sort").click();
 })

//This button will search for date in each CMS Card which is actually hidden. If you check the Elements in the left hand side, you can see a text block of class .sort-by-date which pulls the event date from CMS

 //The below code is based on Finsweet CMS library for Webflow. More on that in this link https://cmsdocs.webflow.io/sort

 // immediately/self invoked function. This function executes right away
(function() {
	// create a new Library instance and store it in a variable called "customBlogPosts"
	var sortEvents = new FsLibrary('.collection-list-6') // Collection List class
	
	// run the sort Library component on your instance
	sortEvents.sort({
	  sortTrigger: '.sortbutton', // class of the button
	  sortReverse: true,
	  activeClass: 'sortbutton' // class that styles the active state
	})
	})();