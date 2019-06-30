class Directory {
    static Exists(path) {
        return require('fs').existsSync(path);
    }
    static GetAllFiles(path, isFullPath) {
        const fs = require('fs');
        var files = [];
        fs.readdirSync(path).forEach(file => {
            if (!Directory.isDirectory(path + '\\' + file)) {
                if (isFullPath) {
                    files.push(path + '\\' + file);
                } else {
                    files.push(file);
                }
            }
        });
        return files;
    }
    static GetAllDirectories(path, isFullPath) {
        const fs = require('fs');
        var dirs = [];
        fs.readdirSync(path).forEach(dir => {
            if (Directory.isDirectory(path + '\\' + dir)) {
                if (isFullPath) {
                    dirs.push(path + '\\' + dir);
                } else {
                    dirs.push(dir);
                }
            }
        });
        return dirs;
    }
    static isDirectory(path) {
        if (Directory.Exists(path)) {
            return require('fs').lstatSync(path).isDirectory();
        }
    }
}
