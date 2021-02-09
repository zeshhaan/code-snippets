1. Very handy comprehensive script
https://gist.github.com/brandonjp/478cf6e32d90ab9cb2cd8cbb0799c7a7

```javascript
function findOverflowParents(element, initEl) {

  function notVisible(el) {
    let overflow = getComputedStyle(el).overflow;
    return overflow !== "visible";
  }

  function displayFlex(el) {
    let display = getComputedStyle(el).display;
    return display === "flex";
  }

  let thisEl = element;
  if (!initEl) console.log('** Overflow check commence!', thisEl);
  let origEl = initEl || thisEl;
  if (notVisible(thisEl)) console.warn("Overflow found on:", thisEl.tagName, { issue: "OVERFLOW IS NOT VISIBLE", tagName: thisEl.tagName, id: thisEl.id, class: thisEl.className, element: thisEl });
  if (displayFlex(thisEl)) console.warn("Flex found on:", thisEl.tagName, { issue: "DISPLAY IS FLEX", tagName: thisEl.tagName, id: thisEl.id, class: thisEl.className, element: thisEl });
  if (thisEl.parentElement) {
    return findOverflowParents(thisEl.parentElement, origEl);
  } else {
    return console.log('** Overflow check complete! original element:', origEl);
  }

}

findOverflowParents($0);
```  

  
  
2. Script to check if any parents has overflow hidden
```javascript
$('.your-sticky-element').parents().filter(function() {
    console.log($(this));
    console.log($(this).css('overflow'));
    return $(this).css('overflow') === 'hidden';
});
 ```
