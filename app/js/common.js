

var _CONFIG_ = {
    appName: 'Easy Player',
    maximized: false,
    minimizeEnabled: true,
    maximizeEnabled: false,
    closeEnabled: true,
    lisenList: {},

    setMinimizeEnabled: function (enabled) {
        this.minimizeEnabled = enabled;
        if (enabled) {
            return $('.minimize').prop({
                disabled: false
            });
        }
        return $('.minimize').prop({
            disabled: true
        });
    },
    setMaximizeEnabled: function (enabled) {
        this.maximizeEnabled = enabled;
        if (enabled) {
            return $('.restore').prop({
                disabled: false
            });
        }
        return $('.restore').prop({
            disabled: true
        });
    },
    setCloseEnabled: function (enabled) {
        this.maximizeEnabled = enabled;
        if (enabled) {
            return $('.closen').prop({
                disabled: false
            });
        }
        return $('.closen').prop({
            disabled: true
        });
    },

    Inittialize: function () {
        this.setMaximizeEnabled(this.maximizeEnabled);
        this.setMinimizeEnabled(this.minimizeEnabled);
    }
}

function renderPage(name) {
    return $('#render').append('<script src="js/render/'+ name +'.js" id="'+ name +'"></script>');
}

function reRenderPage(name, target) {
    $(target).find(name).remove();
    return renderPage(name);
}

function addWorker(name) {
    return $('#worker').append('<script src="js/worker/'+ name +'.js" id="'+ name +'Worker"></script>');
}

function removeWorker(name) {
    return $('#worker').find('#' + name + 'Worker').remove();
}

function reRunWorker(name) {
    removeWorker(name);
    addWorker(name);
}

function switchContent(target) {
    $(target).toggleClass('unset');
    $(target).toggleClass('d-flex');
    $('#current').toggleClass('unset');
    $('#current').toggleClass('d-flex');
}

function setTitle(title) {
    document.title = _CONFIG_.appName + ' - ' + title;
    return $('.title').html(_CONFIG_.appName + ' - ' + title);
}

function removeTitle() {
    return $('.title').remove();
}

function Shutdown() {
    return require('electron').remote.getCurrentWindow().close();
}

function Resize() {
    if (_CONFIG_.maximizeEnabled) {
        let win = require('electron').remote.getCurrentWindow();
        if (_CONFIG_.maximized) {
            _CONFIG_.maximized = false;
            return win.unmaximize();
        } else {
            _CONFIG_.maximized = true;
            return win.maximize();
        }
    }
}

function Minimize() {
    return require('electron').remote.getCurrentWindow().minimize();
}

$(function() {
    // Custom JS

    _CONFIG_.Inittialize();

    var bgSrc = $("[data-bg-src]");
    $.each(bgSrc, function (k,v) {
        $(v).css({
            backgroundImage: "url(" + $(v).attr("data-bg-src") + ")",
            backgroundPosition: "center"
        });
    });
});
