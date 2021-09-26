function getImageName() {
    let x = new Date();
    x = x.toISOString();

    return 'IMG' + x + '.png';
}

function getImagePath(image_name) {
    return 'images/' + image_name;
}

function getFilePath(file_name) {
    return 'files/' + file_name;
}

function getFileName() {
    let x = new Date();
    x = x.toISOString();

    return 'BOOK_' + x + '.pdf';
}

module.exports.getImageName = getImageName;
module.exports.getFileName = getFileName;
module.exports.getImagePath = getImagePath;
module.exports.getFilePath = getFilePath;