/* Module viewing code

*/
var baseURL = "http://cnx.org",
    moduleUndefined = false;


getModulePartsFromPath = function(path) {
    result = {id: undefined, version: 'latest'}
    path = path.split("/");
    if (path[1] !== "content") { return result; }
    module = path[path.length-1];
    splitInfo = module.split("@");
    if (splitInfo.length == 2) {
        result.id = splitInfo[0];
        result.version = splitInfo[1];
    } else {
        result.id = module;
    }
    return result;
}
renderModule = function(id, version) {
    var url = baseURL + "/content/" + id + "/" + version;
    $.get(url + "/body", function(data) {
        var body = $(data.responseText);
        // Correct the image resource URLs.
        $('img', body).each(function() {
            $(this).attr('src', url + "/" + $(this).attr('src'));
        });
        // Correct the embedded resource URLs.
        // ...
        // Correct the links to other modules.
        // ...
        $("#content-container").html(body);
    });
    $("#content-title").load(url + "/Title")
}
moduleLinkClicked = function () {
    var modulePath = $(this).attr('href').slice(2);
    console.log("path: " + modulePath);
    var module = getModulePartsFromPath(modulePath);
    renderModule(module.id, module.version);
}

/* DOCUMENT READY? */
$(document).ready(function() {
    var modulePath = window.location.hash.slice("#!".length);
    console.log("path: " + modulePath);
    var module = getModulePartsFromPath(modulePath);
    if (module.id !== undefined) {
        // TODO Display a loading spinner instead of the links.
        renderModule(module.id, module.version);
    } else {
        $("#content-container a").click(moduleLinkClicked);
    }
});
