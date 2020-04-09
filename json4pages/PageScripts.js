/*jshint esversion: 6 */

function whileLoad() {
    loadRecipe();
    loadComments();
}

var commentObj;

function loadRecipe() {   
    var httpReq = new XMLHttpRequest();
    httpReq.overrideMimeType("application/json");
    httpReq.open('GET', 'content.json', true);
    httpReq.onreadystatechange = function () {
        if (httpReq.readyState == 4) {
            var data = JSON.parse(httpReq.responseText);
            var htmlstuff = "<h1>" + data.id + "</h1>";
            htmlstuff += "<h3>" + data.dishType + "</h3> ";
            htmlstuff += "<h4>" + data.time + "</h4> ";
            htmlstuff += "<h3> Ingredients: </h3> <ol> ";
            data.ingredients.forEach(element => {
                htmlstuff += "<li> " + element.name;
                if (element.locked == "true") htmlstuff += ", " + element.quantity;
                else htmlstuff += ", " + element.quantity;
                htmlstuff += " " + element.measure + "</li>";
            });
            htmlstuff += "</ol>";
            htmlstuff += "<h3> Recipe: </h3> <ol>";
            data.recipe.forEach(element => {
                htmlstuff += "<li> " + element + "</li>";
            });
            //console.log(htmlstuff);
            document.getElementById("recipeSpace").innerHTML = htmlstuff;
        }
    };
    httpReq.send(null);
}

function loadComments() {
    document.getElementById("commentSpace").innerHTML = "<h2> Comments </h2>";
    var httpReq = new XMLHttpRequest();
    httpReq.overrideMimeType("application/json");
    httpReq.open('GET', 'contentComments.json', true);
    httpReq.onreadystatechange = function () {
        if (httpReq.readyState == 4) {
            var data = JSON.parse(httpReq.responseText);
            commentObj = data;
            //console.log(data);
            var htmlstuff = "<div>";
            var commentCount = 0;
            var currentCommentRange = 1;
            var dispCount = 0;
            data.Comments.forEach(element => { commentCount++; });
            for (let element of data.Comments) {
                if (dispCount > 10) break;
                else dispCount++;
                htmlstuff += "<div class = \"one\">";
                htmlstuff += element.name + " says, <br>";
                htmlstuff += element.comment;
                htmlstuff += "</div> <br>";
            }
            if (commentCount > 10) htmlstuff += "<a onclick=\"showNext(" + currentCommentRange + ", " + commentCount + ", 1)\">Next</a>";
            htmlstuff+="</div>";
            document.getElementById("commentSpace").innerHTML = htmlstuff;
        }
    };
    httpReq.send(null);
}

function showNext(currentCommentRange, commentCount, adapt) {
    console.log(currentCommentRange);
    currentCommentRange++;
    var htmlstuff = "<div>";
    var dispCount = 0;
    console.log("Adapt:" + adapt);
    for (let element of commentObj.Comments) {
        if (dispCount <= ((currentCommentRange-1)*10)) { dispCount++; continue; }
        else if (dispCount > (currentCommentRange*10) && adapt==1) break;
        else { dispCount++;
            htmlstuff += "<div class = \"one\">";
            htmlstuff += element.name + " says, <br>";
            htmlstuff += element.comment;
            htmlstuff += "</div> <br>";
        }
    }
    if (commentCount-(currentCommentRange*10) <= 0) { console.log("done"); }
    else if (commentCount-(currentCommentRange*10) <= 10)
        htmlstuff += "<a onclick=\"showNext(" + currentCommentRange + ", " + commentCount + ", 0)\">Next few</a>";
    else htmlstuff += "<a onclick=\"showNext(" + currentCommentRange + ", " + commentCount + ", 1 )\">Next</a>";
    htmlstuff+="</div>";
    document.getElementById("commentSpace").innerHTML = htmlstuff;
}

function showCommentObj() {
    document.getElementById("debugDiv").innerHTML = commentObj.Comments;
}