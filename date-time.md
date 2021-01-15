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
##### This is how running above code snippet looks like in an application i tested
<img src="src/Screenshot 2021-01-13 at 10.59.35 PM.png" width="350">


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

##### This is how it looks like while tested in a live website
<img src="/src/Screenshot 2021-01-13 at 11.07.32 PM.png" width="250">

You can test if it works for other locations by overriding the browser location in Chrome Developer Tools > Sensors

### Some Important Notes:

#### 1. Adding Date field from CMS would omit Time and how to solve that.

You have to take it's raw format and inspect. Then add the missing hrs and minutes.

<img src="/src/Screenshot 2021-01-15 at 5.47.42 PM.png" width="800">

You can also add a time zone at the end to be more specific about the origin location. In my case, i had to work on an Event website so it's important to know the original data and the folks from other location can see the event relative to that date. In line 40, you can see i have added `PST` to the end of the dynamic Date and Time string. 


#### 2. Date Separator Bug in Safari leads to `RangeError: date value is not finite in DateTimeFormat format()` in Safari and how to solve it

<img src="/src/Screenshot 2021-01-15 at 4.55.50 PM.png" width="250">  

The Date Time Field in CMS parses `01/14/2021 11:00 AM` to `2021-01-14 11:00 am` when page is rendered. Safari doesn't treat this `-` separator as a valid format and instead it accepts `/` separator. A simple solution would be using a regex formula to convert the separator as highlighted in this [Stackoverflow response](https://stackoverflow.com/a/5646753/9826170)

<img src="/src/Screenshot 2021-01-15 at 6.02.23 PM.png" width="350">

```javascript
console.log (new Date('2011-04-12'.replace(/-/g, "/")));
```

There the code we wrote at line 40 would be rewritten as 
```javascript
const start = new Date('{{wf {&quot;path&quot;:&quot;start-date&quot;,&quot;transformers&quot;:[{&quot;name&quot;:&quot;date&quot;,&quot;arguments&quot;:[&quot;YYYY-MM-DD hh:mm a&quot;]\}],&quot;type&quot;:&quot;Date&quot;\} }} PST'.replace(/-/g, "/"))
```

#### Further Reading
[You Probably Don't Need Moment.js Anymore](https://dockyard.com/blog/2020/02/14/you-probably-don-t-need-moment-js-anymore)  
[Github/ You-Dont-Need-Momentjs](https://github.com/you-dont-need/You-Dont-Need-Momentjs/blob/master/README.md)  
[MDN/ .toLocaleTimeString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString)  
[MDN/ Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)  
[MDN/ Intl.DateTimeFormat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat)  
[MDN/ Intl.DateTimeFormat.prototype.resolvedOptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/resolvedOptions)
