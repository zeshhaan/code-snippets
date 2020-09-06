
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


//Page: /thank-you
//Form fields are generated programmatically and values are appended
function generateFields(parameters) {
    var form = $('#wf-form-Event-Preference-Form');
    /*form.attr("redirect", path);
    form.attr("data-redirect", path);
    form.attr("action", path);*/
    $.each(parameters, function(index, formData) {
        var field = $('<input></input>');

        field.attr("type", "hidden");
        field.attr("id", formData.name);
        field.attr("name", formData.name);
        field.attr("value", formData.value);

        form.append(field);
    });
}


//Page: /thank-you
//Waiting for member personalised page to be created by memberstack, so once the page is available, the form data along with the member id and referral parameters are sent along the form submission
$(document).ready(function () {
	$('#event-member-form-btn').css("display", "none");
	let referrer = sessionStorage.getItem('refs');
	MemberStack.onReady.then(function(member) {
	member.updateProfile({
		  "referred": referrer
	  }, false)
	  // checks if user has been created
		 if(member.memberPage) {
	   // hiding loading spinner once member page is present
	  $('#thank-you-loading').css("display", "none");
	   // Constructing hidden field array
	   const formFields = JSON.parse(localStorage.getItem("eventPrefs")) || [];
	   formFields.push({
		 name: "member_id",
		 value: member["id"]
	   }, {
		 name: "member_secret",
		 value: member["secret"]
	   }, {
		 name: "member_email",
		 value: member["email"]
	   }, {
		   name: "member_referred",
		value: sessionStorage.getItem('refs')
	   })
	   formFields.push()
	   // creates and appends hidden fields to form
	   generateFields(formFields);
	   // shows form submission button after formdata & elems are created
	   $('#event-preference-form-btn').css("display", "block");
	   // Redirects to user dashboard
	   $('#wf-form-Event-Preference-Form').submit(function (event) {
		  /* redirecting to events page to cancel out event preference sync delay */
		  setTimeout(function () { window.location.replace('/events');}, 1000);
		  })
		 } else{
		 /* reloads page until user is created  */
				 setTimeout(function() { location.reload(true); }, 3000);
		 }
	  })
  });

//Page: members page 
//the section #dummy-topics are set to show only when if user has no event preferences selected during onboarding, so this code does check that is there are any items inside collection list div aka #preferredEvents, if no, then hide the outer div enclosing it(#selected-topics) and show dummy div(#dummy-topics)
  	if($("#preferredEvents").length === 0){	
  	//if no items inside collection list
    $('#selected-topics').hide(); //hide that div
    $('#dummy-topics').show(); //and show the dummy div
 		}

//Page: members page
//This script is depreciated as for now but we will use it in future
//This script counts the item inside the upcoming events div and returns the sum and could be conditionally used to show, say "No. of events attended"
$(document).ready(function() {
	const eventsCounter = $('.events-item-counter').length;
	$('.events-counter').text(eventsCounter);
});


//event cms page
//script to override snipcart order confirmation screen
document.addEventListener('snipcart.ready', function() {
	Snipcart.api.session.setLanguage('en', {
			"confirmation": {
				"thank_you_for_your_order": "Thanks for signing up! You'll receive a confirmation email & Zoom link within 24 hours."
		},
							"header" : {
										"title_cart_summary": "Ticket Summary"
	}
	});
});

//events cms page
//script to find out number of attenddees(only signed up users) for the event. This output is used to show beside the button
$(document).ready(function() {
    //show counter when more than 1 member has signed
    const attendeesCounter = $('.collection-item-8').length;
    if (attendeesCounter.length > 1) {
    $('.no_attendees').text(attendeesCounter);
    } else {
    $('.text-block-38').hide()
    }
});