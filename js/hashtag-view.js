$$('document').ready(function(){

    var hashtagText = util_urlParams['hashtagText'];
    var data = {};

    // get data from server
    var getDataFromServer = function(retries){

        util_ajaxGet('/search/'+hashtagText, data, function(json) {

            if(!json || json.error) {

                $$('#paciente').hide();
                $$('#internal-server-error').show();
                console.log('ERROR retrieving hashtag', json.error);

            } else {

                var hashtag = json;
                console.log('Hashtag retrieved');

                if (hashtag.lastScoreTag === 'NOT_ANALYZED') {

                    console.log('Hashtag not analyzed');
                    console.log('retries =', retries);

                    if( retries < util_requestRetries ) {

                        setTimeout(function(){
                            getDataFromServer(retries+1);
                        }, util_millBetweenRequestRetries);

                    } else {

                        $$('#paciente').hide();
                        $$('#internal-server-error').show();
                        console.log('ERROR retrieving hashtag', 'tried '+retries+' retries');
                    }

                } else {

                    var score = util_scoreImageAndColor(hashtag.lastScore, hashtag.lastScoreTag);

                    shareLink(score, hashtag);
                    drawHashtag(score, hashtag);
                    drawHashtagHistory(hashtag);
                    drawTweets(hashtag.lastTweetsAnalyzed);
                }
            }
        });
    };

    // create share link
    var shareLink = function(score, hashtag) {

        var url = 'http://tweetssentiment.com/hashtag.html?'
                + 'hashtagText='+hashtagText;

        var tweetText = '"' + hashtagText + '" have a '
            + Math.round(hashtag.lastScore*100) + '% '
            + score.sentiment + ' sentiment (' 
            + score.scoreStars + '). See here >';

        var href = 'https://twitter.com/share?'
                + 'url=' + encodeURIComponent(url)
                + '&via=TweetsSentiment'
                + '&text=' + encodeURIComponent(tweetText)

        $$('#share-link').attr('href', href);
    };

    // draw data
    var drawHashtag = function(score, hashtag) {

        $$('#paciente').hide();

        $$('#tweetsSearch').show();

        $$('#hashtag').append(
            '<div class="centered">'+
                '<h1 style="color:#'+score.scoreColor+'; font-weight: bold;">'+
                    hashtag.hashtagText+'</h1>'+
                '<img src="'+score.scoreIcon+'" alt="'+score.scoreText+'"/>'+
                '<h2 style="color:#'+score.scoreColor+'">'+
                    score.scoreText+'</h2>'+
                '<h2 style="color:#'+score.scoreColor+'">'+
                    '('+score.scoreStars+')</h2>'+
            '</div>');
    };

    var drawHashtagHistory = function(hashtag) {

        // get data from server
        util_ajaxGet('/histories/'+hashtag._id, data, function(json) {

            if(!json || json.error) {

                $$('#hasgtagHistory').hide();
                console.log('ERROR retrieving hashtagHistories', json.error);

            } else {

                var hashtagHistories = json;

                console.log(hashtagHistories.length+' hashtagHistories retrieved');
                drawGraphic(hashtagHistories);
            }
        });
    };

    var drawGraphic = function(hashtagHistories) {

        var labels = [];
        var data   = [];

        var filter = Math.floor(hashtagHistories.length/util_maxGraphData)+1;

        if ( hashtagHistories.length === 1 ) {
            labels.push(util_dateToStringMini(hashtagHistories[0].date));
            data.push(hashtagHistories[0].score * 100);
        }

        for (var i = 0; i < hashtagHistories.length; i++) {

            if (   i === 0
                || i === (hashtagHistories.length-1)
                || 0 === (i%filter) ) {

                var date = util_dateToStringMini(hashtagHistories[i].date);
                labels.push(date);
                //console.log(date);

                var score = hashtagHistories[i].score * 100;
                data.push(score);
                //console.log(score);
            }
        }

        util_drawGraphic("hasgtagHistory", labels.reverse(), data.reverse());
    };

    var drawTweets = function(tweets) {

        for (var i = 0; i < tweets.length; i++) {

            var tweet = tweets[i];

            if ( !tweet.text.startsWith('RT') && !(tweet.text.indexOf(',@') != -1 ) ) {

                $$('#tweets').append(
                    '<li data-action="search" class="selectable"'+
                        ' style="min-height: 80px">'+
                        '<a href="http://twitter.com/'+tweet.nick
                            +'/status/'+tweet.id+'" target="_blank">'+
                            '<img src="'+tweet.avatar
                                +'" class="on-right bordered" alt="Avatar de @'+
                                tweet.nick+'"/>'+
                            '<strong>@'+tweet.nick+'</strong>'+
                            '<small>'+tweet.text+'</small>'+
                        '</a>'+
                    '</li>');
            }
        }
    };

    getDataFromServer(1);
});
