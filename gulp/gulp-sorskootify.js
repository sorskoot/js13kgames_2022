const path = require('path');
const glsl = require('glslify');
const through = require('through2');


module.exports = (options = {}) => {
    return through.obj(function(file, encoding, callback) {
        if (file.isDirectory() || file.isNull() || file.isStream()) {
            return callback(null, file);
        }
        
        var content = String(file.contents);

        
        // content = content.replace(/BABYLON\.Color4/gm, 'BC4');
        // content = `var BC4 = BABYLON.Color4;${content}`;


        content = content.replace(/BABYLON\.Color3/gm, 'BC3');
        content = `var BC3 = BABYLON.Color3;${content}`;

        content = content.replace(/Skeleton/gm, 'Sk');
        content = content.replace(/skeleton/gm, 'sk');
        
        // content = content.replace(/BABYLON\.Scene/gm, 'BS');
        // content = `var BS = BABYLON.Scene;${content}`;

        file.contents = Buffer.from(content);        
        this.push(file);
        callback();
    });
};