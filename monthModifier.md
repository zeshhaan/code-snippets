#### Select the wrapper component. In my case, it's a form element.

```javascript
let form = document.getElementById("wf-form-Date-Filter");
```

#### Select the children elements whose textcontent attribute we are going to modify

```javascript
function monthModifier() {
  let firstMo = form.childNodes[1];
  let secMo = form.childNodes[2];
  let thirdMo = form.childNodes[3];
  ...
```

#### Creating months
Now the node we want to modify are selected an stores in a variable, next step we are going to write a code that will return next 3 months and then we store in an array

```javascript
...
let monthsArray = [];
  for (let i = 0; i < 3; i++) {
    let month = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + i
    ).toLocaleString("default", { month: "long" });
    monthsArray.push(month);
  }
  ...
```

#### DOM Manipulation


```javascript
  firstMo.children[1].attributes[5].value = monthsArray[0];
  firstMo.children[2].textContent = monthsArray[0];
  secMo.children[1].attributes[5].value = monthsArray[1];
  secMo.children[2].textContent = monthsArray[1];
  thirdMo.children[1].attributes[5].value = monthsArray[2];
  thirdMo.children[2].textContent = monthsArray[2];
  return;
}
```

Finally we are calling the function to get this working

```javascript
monthModifier()
```
  
Voila 🎉

<details>
  <summary>Full code 👇 </summary>
  
  ```javascript
let form = document.getElementById("wf-form-Date-Filter");
function monthModifier() {
  let firstMo = form.childNodes[1];
  let secMo = form.childNodes[2];
  let thirdMo = form.childNodes[3];
  let monthsArray = [];
  for (let i = 0; i < 3; i++) {
    let month = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + i
    ).toLocaleString("default", { month: "long" });
    monthsArray.push(month);
  }
  firstMo.children[1].attributes[5].value = monthsArray[0];
  firstMo.children[2].textContent = monthsArray[0];
  secMo.children[1].attributes[5].value = monthsArray[1];
  secMo.children[2].textContent = monthsArray[1];
  thirdMo.children[1].attributes[5].value = monthsArray[2];
  thirdMo.children[2].textContent = monthsArray[2];
  return;
}

monthModifier()
```
</details>
  

