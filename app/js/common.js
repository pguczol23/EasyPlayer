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

    clearMemory: function () {
        require('electron').webFrame.clearCache();
        console.info('Memory CLEARED ' + new Date().toLocaleTimeString());
    },

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

function setTitle(title) {
    document.title = title;
    return $('.title').html(title);
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

    setTitle('EasyPlayer');

    var player = new Player({
        PlayBtn: '.play-btn',
        PlayerClass: '.m-player',
        volumeChanger: '.volume-input',
        musicChanger: '.music-input',
        muteChanger: '.mute-btn',
        beforeTimeContainer: '.time-before',
        afterTimeContainer: '.time-after',
        audioTitle: '.current-audio .audio-title',
        iconPlay: 'fas fa-play',
        iconPause: 'fas fa-pause',
        iconVolumeFull: 'fal fa-volume-up',
        iconVolumeMin: 'fal fa-volume-mute',
        playedTimeClass: '.m-player-cur',
        volumeTimeClass: '.m-volume-cur',
        volumeHint: '',
        playerTimeHint: ''
    });

    var ClearID = setInterval(_CONFIG_.clearMemory, 30000);
    //
    // $('[data-action="toggleNav"]').on('click',() => {
    //     ToggleNav();
    // });
    //
    // $('[data-action="nav-click"]').on('click',function () {
    //     var overlay = ".overlay";
    //     $(overlay + " .active").removeClass('active');
    //     $(this).addClass('active');
    // });

    $('[data-action="nextAudio"]').on('click', function (e) {
        player.next();
    });

    $('[data-action="prevAudio"]').on('click', function (e) {
        player.prev();
    });

    async function setList(path) {
        var files2 = await Directory.GetAllFiles(path, ['.mp3'], true);
        var pl = [];
        await files2.forEach(async (v,k) => {
            var fullPath = v;
            pl.push(fullPath);
            v = v.replace(path + '\\', '');
            // var title = v.length <= 32 ? v.toString() : v.toString().substring(0, 32) + '...';
            var title = player.getShortName(v, 32);
            let createTime = await File.GetCreatedTime(fullPath);
            let modifTime = await File.GetModifiedTime(fullPath)
            $('.audio-list').append('' +
                '<div class="d-flex flex-row audio-list-row justify-content-center align-items-center">' +
                '<div class="audio-title" title="' + v +'">' + title +'</div>' +
                '<div class="audio-created">' + createTime +'</div>' +
                '<div class="audio-modified">' + modifTime +'</div>' +
                '<div class="audio-actions">' +
                '<button class="btn" data-action="play-audio" data-audio-path="' + fullPath + '"><i class="fas fa-play"></i></button>' +
                '</div>' +
                '</div>');
        });
        await player.setPlayList(pl);
        $('[data-action="play-audio"]').on('click', function (e) {
            $('.audio-list-row.active').removeClass('active');
            $($(this).parents()[1]).addClass('active');
            player.params.audio.src = $(this).attr('data-audio-path');
            player.restoreAudio(true);
            player.play();
            player.setAudioTitle(player.getAudioTitleFromSrc());
        });
        _CONFIG_.clearMemory();
    }
    setTimeout(() => {
        setList('F:\\Music');
    }, 1000);
});
