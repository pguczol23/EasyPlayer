renderPage('player');
_CONFIG_.lisenList.logo = true;
var countTrue = 0;
var checkInt = setInterval(() => {
    countTrue = 0;
    $.each(_CONFIG_.lisenList, function (k,v) {
        if (v === true) countTrue++;
    });
    if (countTrue === Object.keys(_CONFIG_.lisenList).length) {
        next();
    }
}, 3000);

function next() {
    clearInterval(checkInt);
    switchContent('#root');
}
