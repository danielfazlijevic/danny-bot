// add http protocol if not present in URL
// TODO improve this function
function properURL(url) {
    return url.includes('http') ? url : 'http://' + url;
}

module.exports = {
    properURL
}