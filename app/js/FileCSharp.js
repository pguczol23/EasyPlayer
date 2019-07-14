class File {
    static get Fl() {return require('electron-edge-js').func('File.dll')};
    static Exists(path) {
        this.Fl({task:'exists', path: path}, (error, result) => {this.res=result});
        return this.res;
    }
    static GetExtName(path) {
        this.Fl({task:'GetExtName', path: path}, (error, result) =>  {this.res=result});
        return this.res;
    }
    static GetBaseName(path, ext) {
        this.Fl({task:'GetBaseName', path: path}, (error, result) =>  {this.res=result});
        return this.res;
    }
    static GetCreatedTime(path) {
        this.Fl({task:'GetCreatedTime', path: path}, (error, result) =>  {this.res=result});
        return this.res;
    }
    static GetModifiedTime(path) {
        this.Fl({task:'GetModifiedTime', path: path}, (error, result) =>  {this.res=result});
        return this.res;
    }
}
