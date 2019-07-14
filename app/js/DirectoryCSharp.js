class Directory {
    static get Dir() {return require('electron-edge-js').func('Directory.dll')};
    static Exists(path) {
        this.Dir({task:'exists', path: path}, (error, result) => {this.res=result});
        return this.res;
    }
    static GetAllFiles(path, pattern, isFullPath=true) {
        this.Dir({task:'getAllFiles', path: path, pattern: pattern, isFullPath: isFullPath}, (error, result) => {this.res=result});
        return this.res;
    }
    static GetAllDirectories(path, isFullPath=true) {
        this.Dir({task:'getAllDirectories', path: path, isFullPath: isFullPath}, (error, result) => {this.res=result});
        return this.res;
    }
}
