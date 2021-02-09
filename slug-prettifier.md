```javascript
$("#Restaurant_Name").keyup(function(){
        var Text = $(this).val();
        Text = Text.toLowerCase();
        Text = Text.replace(/[^a-zA-Z0-9]+/g,'-');
        $("#Restaurant_Slug").val(Text);        
});

```
  

#### Example
```javascript
let url = https://doctorinsole.webflow.io/products/fitstep male 5.5 / 6
url.replace(/[^a-zA-Z0-9]+/g,'-').toLowerCase()

//result 
https://doctorinsole.webflow.io/products/fitstep-male-5-5-6"

```

Credits:
[Stackoverflow](https://stackoverflow.com/a/1054592/9826170)  

Other threads tha helpedme find the final answer  
[Stakoverflow again](https://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery/39847253)  
[Github - slugify.js](https://gist.github.com/mathewbyrne/1280286)  
[Github - slugify.js nice discussion](https://gist.github.com/codeguy/6684588)  
[The master of all - in8 support](https://gist.github.com/demoive/4249710)  
