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
                        if (File.GetExtName(fullFile) === fileExtName || (fileExtName === undefined || fileExtName === '')) {
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
    static async GetAllFilesAsync(path, pattern , isExtName, isFullPath) {
        var fl = [];

        const fs = require('fs');
        const util = require('util');
        const readdir = util.promisify(fs.readdir);

        async function f() {
            var files;
            try {
                files = await readdir(path);
            } catch (e) {
                console.log('e', e);
            }
            files.forEach(file => {
                var fullFile = path + '\\' + file;
                if (!Directory.isDirectory(fullFile)) {
                    if (pattern) {
                        if (!Array.isArray(pattern)) pattern = [pattern];
                        pattern.forEach( fileExtName => {
                            if (File.GetExtName(fullFile) === fileExtName || (fileExtName === undefined || fileExtName === '')) {
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
                                    fl.push(fullFile);
                                } else {
                                    fl.push(file);
                                }
                            }
                        });
                    }
                }
            });
        }
        await f();
        return fl;
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
    static async isDirectoryAsync(path) {
        return await require('fs').promises.lstat(path).then(stats => {return stats.isDirectory()}).catch(err => {return false});
    }
}
