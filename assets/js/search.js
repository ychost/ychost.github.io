window._onSearchLoad = [];
window.onSearchLoad = function(func){
    window._onSearchLoad.push(func);
}
jQuery(function() {
    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    window.idx = lunr(function () {
        this.field('id');
        this.field('title', { boost: 10 });
        this.field('author');
        this.field('category');
    });

    // Download the data from the JSON file we generated
    window.data = $.getJSON('/assets/search_data.json');


    // Wait for the data to load and add it to lunr
    window.data.then(function(loaded_data){
        $.each(loaded_data, function(index, value){
            window.idx.add(
                $.extend({ "id": index }, value)
                );
        });

        for(func of window._onSearchLoad){
            func();
        }
    });

    // Event when search action triggered
    $("#site_search_do").click(function(){
        var query = $("#search_box").val(); // Get the value for the text field
        var results = window.idx.search(query); // Get lunr to perform a search
        console.log(window.data)
        display_search_results(results); // Hand the results off to be displayed
    });

    $("#search_box").keydown(function(e) {
        if (e.which == 13) {
            $("#site_search_do").click();
            return false;
        }
    })

    function display_search_results(results) {
        var $search_results = $("#search_results");

        // Wait for data to load
        window.data.then(function(loaded_data) {

            // Are there any results?
            if (results.length) {
                $search_results.empty(); // Clear any old results

                // Iterate over the results
                results.forEach(function(result) {
                    var item = loaded_data[result.ref];

                    // Build a snippet of HTML for this result
                    var appendString = '<li><a href="' + item.url + '">' + item.title + '</a></li>';

                    // Add it to the results
                    $search_results.append(appendString);
                });
            } else {
                $search_results.html('<li>未检索到结果</li>');
            }
        });
    }

//set the input with fit the screen
var searchFitScreen = function (){
    var site_search = $("#site_search");
    var site_search_input = $("#site_search_input");       
    var width = site_search.width() - 115;
    $(site_search_input).width(width);
   $(site_search).css("visibility","visible");
}
searchFitScreen();
$(window).resize(searchFitScreen);
});


