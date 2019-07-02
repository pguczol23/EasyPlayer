class Player  {
    constructor (parameters) {
        this.params = parameters;
        this.Init();
    }

    play() {
        this.params.audio.play();
        this.params.hasPlay = true;
        $(this.params.PlayBtn).html('<i class="' + this.params.iconPause +'"></i>');
    }

    stop() {
        this.params.audio.pause();
        this.params.hasPlay = false;
        $(this.params.PlayBtn).html('<i class="' + this.params.iconPlay + '"></i>');
    }

    mute() {
        this.params.lastVolume = this.params.audio.volume;
        this.changeVolume(0);
        this.params.hasMute = true;
        $(this.params.muteChanger).html('<i class="' + this.params.iconVolumeMin + '"></i>');
    }

    unmute() {
        this.changeVolume(this.params.lastVolume);
        this.params.hasMute = false;
        $(this.params.muteChanger).html('<i class="' + this.params.iconVolumeFull + '"></i>');
    }

    changeVolume(value, hasMute = false) {
        if (hasMute) {
            this.params.lastVolume = value;
        }
        this.params.audio.volume = value;
        $(this.params.volumeChanger).val(value);
        this.changeVolumeTime();
    }

    changeMusicTime(value) {
        this.params.audio.currentTime = value;
        this.params.hasTickEnable = true;
    }

    restoreAudio(hasPlay) {
        this.params.audio.currentTime = 0;
        this.params.hasTickEnable = true;
        this.params.hasPlay = hasPlay === true ? hasPlay : false;
        $(this.params.PlayBtn).html('<i class="' + this.params.iconPlay + '"></i>');
        this.playTick();
    }

    changeTimers() {
        $(this.params.beforeTimeContainer).html(this.timeFormat(this.params.audio.currentTime));
    }

    timeFormat(time) {
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = ~~time % 60;
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

    changePlayerTime(val) {
        $(this.params.playedTimeClass).css({
            width: Math.round(((val >= 0 ? val : this.params.audio.currentTime)/this.params.audio.duration ) * $(this.params.musicChanger).width()) + 'px'
        });
    }

    changeVolumeTime(val) {
        $(this.params.volumeTimeClass).css({
            width: Math.round(((val >= 0 ? val : this.params.audio.volume )/1 ) * $(this.params.volumeChanger).width()) + 'px'
        });
    }

    playTick() {
        if (this.params.hasTickEnable) {
            $(this.params.musicChanger).val(this.params.audio.currentTime);
            this.changePlayerTime();
        }
        this.changeTimers();
    }

    setPlayList(playlist) {
        this.params.playlist = playlist;
    }

    getPlayList() {
        return this.params.playlist;
    }

    next() {
        var pl = this.getPlayList();
        var hasFind = false;
        try {
            pl.forEach( (v,k) => {
                if (decodeURI(this.params.audio.src.replace('file:///','').replaceAll('/','\\')) === v) {
                    if (pl[k+1] === undefined) {
                        this.params.audio.src = pl[0];
                    }else {
                        this.params.audio.src = pl[k+1];
                    }
                    this.restoreAudio();
                    this.play();
                    hasFind = true;
                    throw new Error('n');
                }
            });
        }catch (e) {
        }
    }

    prev() {
        var pl = this.getPlayList();
        var hasFind = false;
        try {
            pl.forEach( (v,k) => {
                if (decodeURI(this.params.audio.src.replace('file:///','').replaceAll('/','\\')) === v) {
                    if (pl[k-1] === undefined) {
                        this.params.audio.src = pl[pl.length-1];
                    }else {
                        this.params.audio.src = pl[k-1];
                    }
                    this.restoreAudio();
                    this.play();
                    hasFind = true;
                    throw new Error('n');
                }
            });
        }catch (e) {
        }
    }

    Init() {
        this.params.audio = $(this.params.PlayerClass)[0];
        this.params.hasMute = false;
        this.params.hasTickEnable = true;
        this.params.lastVolume = this.params.audio.volume;
        this.changeVolumeTime();
        $(this.params.PlayBtn).html('<i class="' + this.params.iconPlay + '"></i>');
        $(this.params.muteChanger).html('<i class="' + this.params.iconVolumeFull + '"></i>');
        $(this.params.PlayBtn).on('click', () => {
            if (this.params.hasPlay) {
                return this.stop();
            }
            return this.play();
        });
        $(this.params.audio).on('timeupdate', () => {
            this.playTick();
        });
        $(this.params.audio).on('loadedmetadata', () => {
            this.changeTimers();
            $(this.params.musicChanger)[0].max = this.params.audio.duration;
            $(this.params.afterTimeContainer).html(this.timeFormat(this.params.audio.duration));
        });
        $(this.params.audio).on('ended', () => {
            this.restoreAudio();
        });
        $(this.params.volumeChanger).on('change', () => {
            this.changeVolume($(this.params.volumeChanger).val());
        });
        $(this.params.volumeChanger).on('input', () => {
            var v = $(this.params.volumeChanger).val();
            this.changeVolumeTime(v);
            $(this.params.volumeHint).html($(this.params.volumeChanger).val() * 100);
        });
        $(this.params.musicChanger).on('change', () => {
            this.changeMusicTime($(this.params.musicChanger).val());
        });
        $(this.params.musicChanger).on('input', () => {
            this.params.hasTickEnable = false;
            var v = $(this.params.musicChanger).val();
            this.changePlayerTime(v);
            $(this.params.playerTimeHint).html(this.timeFormat(v));
        });
        $(this.params.muteChanger).on('click', () => {
            if (this.params.hasMute) {
                return this.unmute();
            }
            return this.mute();
        });
    }
}
