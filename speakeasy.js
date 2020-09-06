
//Home Page - Events this Week
// if there is nothing inside .cms collection list with class .weekevents-list
if(!$('.weekevents-list').length){	

	// then hide the whole section
	$('.weekevents').hide();
  
}

//Page: /events
//A sort button is already added inside the hero set to display:none The below code will run on page load and will perform button click to enable sorting.
$(window).on('load', function() {
	document.getElementById("sort").click();
})


// Page: /onboarding
//When the button is clicked on the onboarding form, the data is stored in local storage and user is redirected to /thank-you page
$(document).ready(function() {
	
  $('#wf-form-Event-Preference-Storage-Form').submit(function(e) {
  	e.preventDefault();
  	const serializedData = $(this).serializeArray()
    const eventPrefs = serializedData.map((eventPref) => {eventPref.value = String(eventPref.value === "on"); return eventPref;})
    const stringifiedEventPrefs = JSON.stringify(eventPrefs)
  	localStorage.setItem("eventPrefs", stringifiedEventPrefs)
    window.location = window.location.protocol+"//"+window.location.host+"/thank-you";
	})
})
