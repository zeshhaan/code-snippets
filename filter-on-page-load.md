Suppose you want a filter to be applied on page load
You can do that like this
```javascript
document.querySelector('selector').click();
```

But think of a complex case where you are in some page and clicking on an anchor link would take you to a page with filter enabled on page load. How would you do it?
  
Bit trickier, right?  
  

Well if that wan't trickier it was atleast for me, but anyway here is my approach: In the first page, set a sessionStorage 

> Note that i have used jquery here because i like it's declarative style

```javascript
$("selector").on('click', function() {
    sessionStorage.setItem("live-classes", "true");
  });
```
Add the tagname/id/class of the clickable element you are targetting.
  
  
Now in the the second/final page we want to implement the filter. But we also want to check if the user has come from clicking that particular page. That's why we have set the session storage - to track.
Now on this second/final page we want to have a conditional statement to check if there is the value from session storage. If yes, the user is coming from that particular page and we are to implement the filter right away. Here is the code

```javascript
$(function() {
  let filter = sessionStorage.getItem("live-classes");
    if(filter){
    sessionStorage.removeItem("live-classes");
    document.querySelector('selector').click();
    }
});
```

Yep, that's it 👍
