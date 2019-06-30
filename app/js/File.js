class File {
    static Exists(path) {
        return require('fs').existsSync(path);
    }
    static isFile(path) {
        return require('fs').statSync(path).isFile();
    }
    static GetExtName(path) {
        return require('path').extname(path);
    }
    static GetBaseName(path, ext) {
        return require('path').basename(path, ext);
    }
    static GetCreatedTime(path) {
        return require('fs').lstatSync(path).ctime;
    }
    static GetModifiedTime(path) {
        return require('fs').lstatSync(path).mtime;
    }
}
