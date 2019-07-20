class Directory {
    static get Dir() {return require('electron-edge-js').func('Directory.dll')};
    static Exists(path) {
        this.Dir({task:'exists', path: path}, (error, result) => {this.res=result});
        return this.res;
    }
    static GetAllFiles(path, pattern, isFullPath=true, isExt=true, asThirdArray=false) {
        this.Dir({task:'getAllFiles', path: path, pattern: pattern, isFullPath: isFullPath, isExt: isExt, asThirdArray: asThirdArray}, (error, result) => {this.res=result});
        return this.res;
    }
    static GetAllDirectories(path, isFullPath=true) {
        this.Dir({task:'getAllDirectories', path: path, isFullPath: isFullPath}, (error, result) => {this.res=result});
        return this.res;
    }
}
