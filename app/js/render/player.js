$('#current').html(
    '<div class="content position-relative">\n' +
    '\t\t\t<div class="player position-absolute d-flex justify-content-center align-items-center">\n' +
    '\t\t\t\t<div class="actions d-flex justify-content-center">\n' +
    '\t\t\t\t\t<button class="btn prev-btn"><i class="fal fa-step-backward"></i></button>\n' +
    '\t\t\t\t\t<button class="btn play-btn d-flex align-items-center justify-content-center"></button>\n' +
    '\t\t\t\t\t<button class="btn next-btn"><i class="fal fa-step-forward"></i></button>\n' +
    '\t\t\t\t</div>\n' +
    '\t\t\t\t<div class="time d-flex justify-content-center">\n' +
    '\t\t\t\t\t<div class="time-before">\n' +
    '\t\t\t\t\t\t0:00\n' +
    '\t\t\t\t\t</div>\n' +
    '\t\t\t\t\t<div class="time-line d-flex flex-column justify-content-center align-items-center position-relative">\n' +
    '\t\t\t\t\t\t<div class="m-player-cur position-absolute"></div>\n' +
    '\t\t\t\t\t\t<input class="music-input" type="range" value="0" step="0.1" min="0">\n' +
    '\t\t\t\t\t\t<audio src="mp3/GTA%20feat.%20Sam%20Bruno%20-%20Red%20Lips%20(Skrillex%20Remix).mp3" draggable="false" class="unset m-player"></audio>\n' +
    '\t\t\t\t\t</div>\n' +
    '\t\t\t\t\t<div class="time-after">\n' +
    '\t\t\t\t\t\t0:00\n' +
    '\t\t\t\t\t</div>\n' +
    '\t\t\t\t</div>\n' +
    '\t\t\t\t<div class="volume d-flex justify-content-center">\n' +
    '\t\t\t\t\t<button class="btn mute-btn"><i class="fal fa-volume-up"></i></button>\n' +
    '\t\t\t\t\t<div class="d-flex position-relative flex-column justify-content-center">\n' +
    '\t\t\t\t\t\t<div class="m-volume-cur position-absolute"></div>\n' +
    '\t\t\t\t\t\t<input class="volume-input" type="range" value="1" step="0.01" min="0" max="1">\n' +
    '\t\t\t\t\t</div>\n' +
    '\t\t\t\t</div>\n' +
    '\t\t\t</div>\n' +
    '\t\t</div>'
);
setTitle('MainPage');
switchContent();
addWorker('player');
$('#render').find('#player').remove();