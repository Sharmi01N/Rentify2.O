const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'routes', 'uploads');
const destDir = path.join(__dirname, 'uploads');

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

console.log('Watching for new files in', sourceDir);

fs.watch(sourceDir, (eventType, filename) => {
    if (filename && eventType === 'rename') {
        const srcPath = path.join(sourceDir, filename);
        const destPath = path.join(destDir, filename);
        // Only copy if file exists (not deleted)
        fs.stat(srcPath, (err, stats) => {
            if (!err && stats.isFile()) {
                fs.copyFile(srcPath, destPath, (copyErr) => {
                    if (copyErr) {
                        console.error('Error copying', filename, copyErr);
                    } else {
                        console.log('Copied', filename, 'to uploads');
                    }
                });
            }
        });
    }
}); 