var count = parseInt(process.argv[2]);

var op = "{\n\t\"Comments\" : [";
for (var x = 1; x<count; x++) {
    op+= "\n\t\t{\n\t\t\t\"name\": \"User" + x + "\",";
    op+= "\n\t\t\t\"comment\": \"" + makeid(32) + "\"";
    op+="\n\t\t},";
}
op+= "\n\t\t{\n\t\t\t\"name\": \"User" + x + "\",";
op+= "\n\t\t\t\"comment\": \"" + makeid(32) + "\"";
op+="\n\t\t}";
op+="\n\t]";
op+="\n}";

console.log(op);


function makeid(length) {
   var result = "";
   var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function genNumber() {
    var p = Math.random();
    return (Math.floor((p * 320)));
}

