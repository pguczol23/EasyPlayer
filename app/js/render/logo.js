_CONFIG_.lisenList.logo = false;
$('#root').html(
    '\t\t\t<div class="d-flex justify-content-center align-items-center flex-column" style="height: calc(100vh -30px);width: 100vw">\n' +
    '\t\t\t\t<img class="logo" src="img/logo.svg" alt="' + _CONFIG_.appName +'" draggable="false">\n' +
    '\t\t\t\t<div class="pt-5 h2 logo-title">' + _CONFIG_.appName +'</div>\n' +
    '\t\t\t</div>\n'
);
setTitle('Loading...');
removeTitle();
$('#render').find('#logo').remove();
addWorker('logo');
