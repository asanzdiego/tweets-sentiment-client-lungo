var compressor = require('node-minify');

var execute = function() {

    // Using Sqwish for CSS
    new compressor.minify({
        type: 'sqwish',
        fileIn: [
            'css/default.css',
            'lib/lungo/lungo.css',
            'lib/lungo/lungo.icon.css',
            'lib/lungo/lungo.theme.css'
        ],
        fileOut: 'css/tweetssentiment-min.css',
        tempPath: 'tmp',
        callback: function(err, min){
            console.log('sqwish ->', 'css/tweetssentiment-min.css');
            if (err) console.log(err);
        }
    });

    // Concat util js files
    new compressor.minify({
        type: 'no-compress',
        fileIn: [
            'lib/quo/quo.js',
            'lib/lungo/lungo.js',
            'lib/moment/moment.js',
            'lib/chart/Chart.js',
            'js/util/ajax.js',
            'js/util/config.js',
            'js/util/date.js',
            'js/util/environment.js',
            'js/util/graph.js',
            'js/util/notification.js',
            'js/util/params.js',
            'js/util/score.js',
            'js/util/search.js',
            'js/util/share-link.js',
            'js/util/util.js'
        ],
        fileOut: 'js/tweetssentiment.js',
        tempPath: 'tmp',
        callback: function(err, min){
            console.log('no-compress ->', 'js/tweetssentiment.js');
            if (err) {

                console.log(err);

            } else {

                // Using UglifyJS for JS
                new compressor.minify({
                    type: 'uglifyjs',
                    fileIn: 'js/tweetssentiment.js',
                    fileOut: 'js/tweetssentiment-min.js',
                    tempPath: 'tmp',
                    callback: function(err, min){
                        console.log('uglifyjs ->', 'js/tweetssentiment-min.js');
                        if (err) console.log(err);
                    }
                });
            }
        }
    });

    // Using UglifyJS for JS
    new compressor.minify({
        type: 'uglifyjs',
        fileIn: 'js/hashtag-list.js',
        fileOut: 'js/hashtag-list-min.js',
        tempPath: 'tmp',
        callback: function(err, min){
            console.log('uglifyjs ->', 'js/hashtag-list-min.js');
            if (err) console.log(err);
        }
    });

    // Using UglifyJS for JS
    new compressor.minify({
        type: 'uglifyjs',
        fileIn: 'js/hashtag-view.js',
        fileOut: 'js/hashtag-view-min.js',
        tempPath: 'tmp',
        callback: function(err, min){
            console.log('uglifyjs ->', 'js/hashtag-view-min.js');
            if (err) console.log(err);
        }
    });
};

execute();
