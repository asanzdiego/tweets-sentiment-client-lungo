// share link
$$('document').ready(function(){

    var url         = 'http://tweetssentiment.com/';

    var tweetText   = 'Tweets Sentiment helps you to know '
                    + 'if the general tweets feeling is positive or negative.';

    var href        = 'https://twitter.com/share?'
                    + 'url=' + encodeURIComponent(url)
                    + '&via=TweetsSentiment'
                    + '&text=' + encodeURIComponent(tweetText)

    $$('#share-link').attr('href', href);
});


