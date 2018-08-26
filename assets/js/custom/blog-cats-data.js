(function(blog,$){
    var blogCats = {};
    // Download the data from the JSON file we generated
    var catsCbFunc ;
    blog.readyCats = function(cbFunc){  
       blogCats.data = $.getJSON('/assets/blog_cats_data.json');
    // Wait for the data to load 
    blogCats.data.then(function(loaded_data){
        blog.cats = loaded_data; 
        console.log(blog.cats);      
        cbFunc();      
        console.log(cbFunc.toString());
    });
};


blog.encodeHylinks = function(hylinks){
    $.each(hylinks,function(i,v){
        var url = v.href;
        v.href = url.replace(/%/g,"$");
    })
}

blog.encodeUrl = function(url){
    url = encodeURIComponent(url);
    url = url.replace(/\%/g,"$");
    return url;
}

blog.decodeUrl = function(url){
    url = url.replace(/\$/g,"%");
    url = decodeURIComponent(url);
    return url;
}

})(blog,$);
