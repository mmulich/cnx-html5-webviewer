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

// On document load fill the page with the module content.
$(document).ready(function() {
    var modulePath = window.location.hash.slice("#!".length),
        moduleId = undefined,
        moduleVersion = undefined,
        url = "";
    console.log("module path: " + modulePath);
    module = getModulePartsFromPath(modulePath);
    if (module.id === undefined) {
        moduleUndefined = true;
    } else {
        url = baseURL + "/content/" + module.id + "/" + module.version;
    }
    console.log(url);

    // Break out of the function early if there is no module path.
    if (moduleUndefined) { return }

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
});
