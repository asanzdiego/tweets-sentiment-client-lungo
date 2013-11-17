$$('document').ready(function(){

    var data = {};

    // get data from server
    util_ajaxGet('/hashtags', data, function(json) {

        if(!json || json.error) {

            console.log('ERROR retrieving hashtags', json.error);

        } else {

            var hashtags = json;

            console.log(hashtags.length+' hashtags retrieved');
            drawHashtags(hashtags);
        }
    });

    // draw data
    var drawHashtags = function(hashtags) {

        for (var i = 0; i < hashtags.length; i++) {

            var hashtag = hashtags[i];

            if ( hashtag.lastScoreTag !== 'NOT_ANALYZED' ) {

                var score = util_scoreImageAndColor(hashtag.lastScore, hashtag.lastScoreTag);

                $$('#hashtags').append(
                    '<li data-action="search" class="selectable">'+
                        '<a href="hashtag.html?hashtagText='+hashtag.hashtagText+'">'+
                            '<img src="'+score.scoreIcon+'" class="on-right" alt="'+
                                score.scoreText+'"/>'+
                            '<strong style="color:#'+score.scoreColor+'; font-weight: bold;">'+
                                hashtag.hashtagText+'</strong>'+
                            '<small style="color:#'+score.scoreColor+'">'+
                                score.scoreText+' ('+
                                score.scoreStars+')</small></a></li>');
            }
        }
    };

    $$('#search-hashtag').tap(function() {

        var hashtagToSearch = $$('input[type=search]').val();

        if (hashtagToSearch.length < 4) {

            util_errorNotification('Min 3 characters to search',
                'Min 3 characters to search');

        } else {

            window.location.replace('hashtag.html?hashtagText='+hashtagToSearch);
        }
    });
});
