//this is using ajax
function JSONUsingAJAX() {
    $.getJSON('/content.json', function(data) {
        var htmlstuff = "<h1>" + data.id + "</h1>";
        htmlstuff += "<h3>" + data.dishType + "</h3> ";
        htmlstuff += "<h4>" + data.time + "</h4> ";
        htmlstuff +=  "<h3> Ingredients: </h3> ";
        htmlstuff += data.ingredients;
        htmlstuff += "<h3> Recipe: </h3> ";
        htmlstuff += data.recipe;
        console.log(htmlstuff);
        document.getElementById("bodyspace").innerHTML = htmlstuff;
    });
}