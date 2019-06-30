class Directory {
    static Exists(dir) {
        return require('fs').existsSync(dir);
    }
    static GetAllFiles(dir) {
        const fs = require('fs');
        fs.readdir(dir, (err, files) => {
            if (err) return err;
            return files;
        });
    }
    static isDirectory(dir) {
        if (Directory.Exists(dir)) {
            return require('fs').lstatSync(dir).isDirectory();
        }
    }
}
