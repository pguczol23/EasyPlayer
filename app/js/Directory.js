class Directory {
    static Exists(path) {
        return require('fs').existsSync(path);
    }
    static GetAllFiles(path, pattern , isExtName, isFullPath) {
        const fs = require('fs');
        var files = [];
        fs.readdirSync(path).forEach(file => {
            var fullFile = path + '\\' + file;
            if (!this.isDirectory(fullFile)) {
                if (pattern) {
                    if (!Array.isArray(pattern)) pattern = [pattern];
                    pattern.forEach( fileExtName => {
                        if (File.GetExtName(fullFile) === fileExtName) {
                            if (isExtName === false) {
                                if (isFullPath) {
                                    fullFile = path + '\\' +File.GetBaseName(fullFile, File.GetExtName(fullFile));
                                    file = fullFile;
                                }else {
                                    fullFile = File.GetBaseName(fullFile, File.GetExtName(fullFile));
                                    file = fullFile;
                                }
                            }
                            if (isFullPath) {
                                files.push(fullFile);
                            } else {
                                files.push(file);
                            }
                        }
                    });
                }
            }
        });
        return files;
    }
    static GetAllDirectories(path, isFullPath) {
        const fs = require('fs');
        var dirs = [];
        fs.readdirSync(path).forEach(dir => {
            var fullDir = path + '\\' + dir;
            if (this.isDirectory(fullDir)) {
                if (isFullPath) {
                    dirs.push(fullDir);
                } else {
                    dirs.push(dir);
                }
            }
        });
        return dirs;
    }
    static isDirectory(path) {
        if (this.Exists(path)) {
            return require('fs').lstatSync(path).isDirectory();
        }
    }
}
