$(function() {

	// Custom JS
    var bgSrc = $("[data-bg-src]");
    $.each(bgSrc, function (k,v) {
       $(v).css({
           backgroundImage: "url(" + $(v).attr("data-bg-src") + ")",
           backgroundPosition: "center"
       });
    });

// Или используйте 'remote' в renderer процессе.
// const { BrowserWindow } = require('electron').remote
//     let win = require('electron').remote.getCurrentWindow();
//     win.loadURL('https://github.com');

});
