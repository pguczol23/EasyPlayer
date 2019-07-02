
String.prototype.replaceAll = function(search, replace){
    return this.split(search).join(replace);
}

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

function ToggleNav() {
    var overlay = ".overlay";
    if (!$(overlay).hasClass('active')) {
        $(overlay).css({left: "0"}).addClass('active');
        return;
    }
    $(overlay).css({left: '-' + $(overlay).css('width') }).removeClass('active');
}

$(function() {
    // Custom JS

    _CONFIG_.Inittialize();

    let win = require('electron').remote.getCurrentWindow();
    win.center();
    win.setResizable(true);
    _CONFIG_.setMaximizeEnabled(true);

    var player = new Player({
        PlayBtn: '.play-btn',
        PlayerClass: '.m-player',
        volumeChanger: '.volume-input',
        musicChanger: '.music-input',
        muteChanger: '.mute-btn',
        beforeTimeContainer: '.time-before',
        afterTimeContainer: '.time-after',
        iconPlay: 'fas fa-play',
        iconPause: 'fas fa-pause',
        iconVolumeFull: 'fal fa-volume-up',
        iconVolumeMin: 'fal fa-volume-mute',
        playedTimeClass: '.m-player-cur',
        volumeTimeClass: '.m-volume-cur',
        volumeHint: '',
        playerTimeHint: ''
    });

    $('[data-action="toggleNav"]').on('click',() => {
        ToggleNav();
    });

    $('[data-action="nav-click"]').on('click',function () {
        var overlay = ".overlay";
        $(overlay + " .active").removeClass('active');
        $(this).addClass('active');
    });

    var Path = 'F:\\Music';
    var files2 = Directory.GetAllFilesAsync(Path, ['.mp3', '.ogg', '.wav'], true,true);

    files2.then(val => {
        var pl = [];
        val.forEach((v,k) => {
            var fullPath = v;
            pl.push(fullPath);
            v = v.replace(Path + '\\', '');
            var title = v.length <= 35 ? v.toString() : v.toString().substring(0, 35);
            $('.audio-list').append('' +
                '<div class="d-flex flex-row audio-list-row justify-content-center align-items-center">' +
                '<div class="audio-title" title="' + v +'">' + title +'</div>' +
                '<div class="audio-created">' + File.GetCreatedTime(fullPath).toLocaleString().replace(',','') +'</div>' +
                '<div class="audio-modified">' + File.GetModifiedTime(fullPath).toLocaleString().replace(',','') +'</div>' +
                '<div class="audio-actions">' +
                '<button class="btn" data-action="play-audio" data-audio-path="' + fullPath + '"><i class="fas fa-play"></i></button>' +
                '</div>' +
                '</div>');
        });
        player.setPlayList(pl);
        $('[data-action="play-audio"]').on('click', function (e) {
            player.params.audio.src = $(this).attr('data-audio-path');
            player.restoreAudio(true);
            player.play();
        });

        $('[data-action="nextAudio"]').on('click', function (e) {
            player.next();
        });

        $('[data-action="prevAudio"]').on('click', function (e) {
            player.prev();
        });
    });
});
