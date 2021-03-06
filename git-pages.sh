#! /bin/bash

function writeEnvironment() {
cat << ENVIRONMENT
/******************************
 *                            *
 *  ENVIRONMENT = PRODUCTION  *
 *                            *
 ******************************/

// Server URL
//var util_server_url = "http://localhost:5000";
var util_server_url = "http://tweetssentiment.herokuapp.com";
ENVIRONMENT
}

echo "****************************************************"
echo "* PUSH CHANGES TO GIT PAGES POINTING TO PRODUCTION *"
echo "****************************************************"

FROM='/home/adolfo/hackathon/tweets-sentiment/src/v3.0-bootstrap/tweets-sentiment-client-lungo'
FOLDERTO='/home/adolfo/Curro/github/gh-pages'
TO='/home/adolfo/Curro/github/gh-pages/tweets-sentiment-client-lungo'

DATE=`date +"%Y.%m.%d-%H:%M"`
TO_OLD=$TO'-OLD-'$DATE

mv $TO $TO_OLD && \
cp -r $FROM $FOLDERTO && \
rm -rf $TO'/.git' && \
cp -r $TO_OLD'/.git' $TO && \
cd $TO && \
git add . && \
writeEnvironment > js/util/environment.js && \
more js/util/environment.js && \
node app.js && \
git add . && \
git diff | grep +++

read -p "You want to continue? [y|*N*]: " OPTION

if [ "$OPTION" == "y" ]; then

    read -p "Write the commit message: " MESSAGE

    git commit -m "$MESSAGE" && \
    git push origin gh-pages && \
    rm -rf $TO_OLD

else

  rm -rf $TO && \
  mv $TO_OLD $TO

fi

cd -
