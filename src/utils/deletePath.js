import fs from 'fs'
import path from 'path'

const deleteFolderRecursive = pathCarpeta => {
    if (fs.existsSync(pathCarpeta)) {
        fs.readdirSync(pathCarpeta).forEach(file => {
            const currentPath = path.join(pathCarpeta, file);
            if (fs.lstatSync(currentPath).isDirectory()) {
                deleteFolderRecursive(currentPath);
            } else {
                fs.unlinkSync(currentPath);
            }
        });
        fs.rmdirSync(pathCarpeta);
        fs.mkdirSync('/tmp/uploads',{recursive:true});
    }
};

export {
    deleteFolderRecursive
}