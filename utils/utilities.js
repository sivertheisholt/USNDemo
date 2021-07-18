exports.methods = {
    //
    timer: function (ms) {
        return new Promise(res => setTimeout(res, ms))
    },
    /**
     * https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
     */
    replaceAt: function(string, index, replacement) {
        return string.substr(0, index) + replacement + string.substr(index + replacement.length);
    }
}