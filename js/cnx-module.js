/* Module viewing code

*/

// On document load fill the page with the module content.
$(document).ready(function() {
    var url = "http://cnx.org",
        moduleUndefined = false,
        modulePath = window.location.hash.slice("#!".length),
        moduleId = undefined,
        moduleVersion = 'latest',
        splitModulePath = modulePath.split("/");

    console.log("module path: " + modulePath);
    if (modulePath === "" || splitModulePath[1] === "") {
        moduleUndefined = true;
    } else {
        //url = url + modulePath;
        moduleId = splitModulePath[splitModulePath.length-1]
        if (moduleId.split("@").length == 2) {
            splitInfo = moduleId.split("@");
            moduleId = splitInfo[0];
            moduleVersion = splitInfo[1];
        }
        url = url + "/content/" + moduleId + "/" + moduleVersion;
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
