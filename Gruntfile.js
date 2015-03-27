module.exports = function(grunt) {


grunt.initConfig({
    nodewebkit: {
        options: {
            platforms: ['win','osx'],
            buildDir: './builds',
            macIcns: 'myIcons.icns',
            winIco: 'myIcons.ico',
            macZip: false
        },
        src: ['./example/public/**/*']
    }
})



};