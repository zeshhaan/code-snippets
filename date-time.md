## How to display date and time in the user's time-zone/local time
There might be instances where you want to display certain things to the user's local time. Let's, for an example think about Event Website where vistors can purchase event tickets. Knowing when the event will take place in their time zone might be complicated as users must google for the local time and match with the event time to confirm if that suits. This is kinda weird and a bad UX which we need to solve.  
The most ideal solution would be to dynamically display the date part depending upon the visitors location. People have been solving this using a library called Moment.js but now since this library have been turned to legacy mode, we must think of a different solution. But glad, we have native time and date methods in-built in our JavaScript so actually we don't want any library. Moreover using these native JS code has been having performance gains.  
  
>> It was bit tricky to implement and i spent hours debugging the code and browsing threads/mdn docs, etc and this is by far simple bit-sized concise explaination and code snippet you will ever need to convert your already set date to the users local time-zone.  

So below i briefly touch upon the 2 methods i use:


### 1. Using `.toLocaleString`

```javascript 
  var Webflow = Webflow || [];
  Webflow.push(function() {
  const time = new Date('{{wf {&quot;path&quot;:&quot;start-date&quot;,&quot;transformers&quot;:[{&quot;name&quot;:&quot;date&quot;,&quot;arguments&quot;:[&quot;YYYY-MM-DD hh:mm a&quot;]\}],&quot;type&quot;:&quot;Date&quot;\} }} PST')
	var options = { timeZoneName: 'short' };
	$('.time').html(time.toLocaleTimeString('en-US', options))
	$('.date').html(time.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'}))
  })
```

After adding a date field inside CMS, we can then dynamically insert them to the `new Date(<insert cms date field here>)` object initializer. 

> Note that if you have setup date field with both date and time, then you must insert it CMS field in the RAW format as i did in line 13

After that you can specify the text field to which the formatted date and time need to be populated/inserted.

This is how running above code snippet looks like.

To advance further more on this topic, checkout the resource links posted at the end of this article


Now there is a more performant way than doing this which supports for even more options for internationlisation. Let me introduce that next.  

### 2. Using `Intl.DateTimeFormat()`
```javascript
var Webflow = Webflow || [];
Webflow.push(function() {
const start = new Date('{{wf {&quot;path&quot;:&quot;start-date&quot;,&quot;transformers&quot;:[{&quot;name&quot;:&quot;date&quot;,&quot;arguments&quot;:[&quot;YYYY-MM-DD hh:mm a&quot;]\}],&quot;type&quot;:&quot;Date&quot;\} }} PST')

const date = {
   weekday: "long",
   month: "short",
   day: "numeric",
   year: "numeric",
  }; 

 const time = {
   hour: '2-digit',
   minute: "numeric",
   hour12: true,
   timeZoneName: "short",
  }; 
	$('.date').html(Intl.DateTimeFormat(navigator.language, date).format(start))
	$('.time-value').html(Intl.DateTimeFormat(navigator.language, time).format(start))
	
});
```
I used this method instead of the first method just vecause i want to get rid of capital AM/PM. But more than that approach is more performant that the former.

This is how it looks like


You can test if it works for other locations by overriding the browser location in Chrome Developer Tools > Sensors

#### Further Reading
[You Probably Don't Need Moment.js Anymore](https://dockyard.com/blog/2020/02/14/you-probably-don-t-need-moment-js-anymore)  
[Github/ You-Dont-Need-Momentjs](https://github.com/you-dont-need/You-Dont-Need-Momentjs/blob/master/README.md)  
[MDN/ .toLocaleTimeString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString)  
[MDN/ Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)  
[MDN/ Intl.DateTimeFormat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat)  
[MDN/ Intl.DateTimeFormat.prototype.resolvedOptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/resolvedOptions)
