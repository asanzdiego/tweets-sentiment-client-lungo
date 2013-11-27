// score image and color
var util_scoreImageAndColor  = function(score, scoreTag) {

    var scoreIcon   = "./img/hand-neutral.png";
    var scoreColor  = "909090";
    var scoreText   = "neutral";
    var scoreStars  = "★★★☆☆";

    switch (scoreTag) {
        case "P+":
            scoreIcon   = "./img/hand-positive+.png";
            scoreColor  = "67E667";
            scoreText   = "very positive";
            scoreStars  = "★★★★★";
            break;
        case "P":
            scoreIcon   = "./img/hand-positive.png";
            scoreColor  = "67E667";
            scoreText   = "positive";
            scoreStars  = "★★★★☆";
            break;
        case "N":
            scoreIcon   = "./img/hand-negative.png";
            scoreColor  = "FF7373";
            scoreText   = "negative";
            scoreStars  = "★★☆☆☆";
            break;
        case "N-":
            scoreIcon   = "./img/hand-negative-.png";
            scoreColor  = "FF7373";
            scoreText   = "very negative";
            scoreStars  = "★☆☆☆☆";
            break;
    }

    var sentiment = 'positive';
    if ( score.lastScore < 0 ) {
        sentiment = 'negative';
    }

    var score = {
        scoreIcon   : scoreIcon,
        scoreColor  : scoreColor,
        scoreText   : scoreText,
        scoreStars  : scoreStars,
        sentiment   : sentiment
    };

    //console.log('score =',score);

    return score;
};
