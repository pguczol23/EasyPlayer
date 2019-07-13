class Directory {
    static get Dir() {return require('electron-edge-js').func('Directory.dll')};
    static Exists(path) {
        var res=null;
        this.Dir(['exists',path], function (error, result) {res=result});
        return res;
    }
    static GetAllFiles(path, pattern, isFullPath=true) {
        var res=null;
        this.Dir(['getAllFiles', path, pattern, isFullPath], function (error, result) {res=result});
        return res;
    }
    static GetAllDirectories(path, isFullPath) {
        var res=null;
        this.Dir(['getAllDirectories', path, isFullPath], function (error, result) {res=result});
        return res;
    }
}
