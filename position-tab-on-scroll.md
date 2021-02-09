Started from [this stackoverflow thread](https://stackoverflow.com/a/31205763/9826170)  

Found this working from Webflow Forum convos. [Read](https://forum.webflow.com/t/autoplay-tabs-any-ideas/54901/34) to find out more tips
```javascript
var Webflow = Webflow || [];
    Webflow.push(function () {
        // DOMready has fired
        // May now use jQuery and Webflow api

        // time between automated clicks
        var TAB_DELAY = 3000;

        // setup the initial start (but only do it once)
        var slideshowIsSetup = false;
        var setupSlideshow = function() {
            if(slideshowIsSetup) return;
            slideshowIsSetup = true;

            tabLoop();
        };

        // define loop - cycle through all tabs
        var tabTimeout;
        var tabLoop = function() {
            tabTimeout = setTimeout(function() {
                // don't scroll if at the top of the page
                // fixes safari scroll jumping
                if($(window).scrollTop() < 10) {
                    setTimeout(tabLoop, TAB_DELAY);
                    return;
                };
                
                var $next = $('.w-tabs-menu').children('.w--current:first').next();

                if($next.length) {
                    $next.click();  // click resets timeout, so no need for interval
                } else {
                    $('.w-tab-link:first').click();
                }
            }, TAB_DELAY); 
        }

        // reset timeout if a tab is clicked
        $('.w-tab-link').click(function(e) {
            clearTimeout(tabTimeout);

            // cancel slideshow if user clicked manually
            if(!e.originalEvent) tabLoop();
        });

        // setup slideshow on initial scroll
        $(window).scroll(setupSlideshow);
    });
```
