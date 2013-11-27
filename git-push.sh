#! /bin/bash

function writeEnvironment() {
cat << ENVIRONMENT
/*****************
 *               *
 *  ENVIRONMENT  *
 *               *
 *****************/

// Server URL
var util_server_url = "http://localhost:5000";
//var util_server_url = "http://tweetssentiment.herokuapp.com";
ENVIRONMENT
}

echo "***************"
echo "* DEVELOPMENT *"
echo "***************"

git add . && \
git diff | grep +++

read -p "You want to continue? [y|*N*]: " OPTION

if [ "$OPTION" == "y" ]; then

    read -p "Write the commit message: " MESSAGE

    writeEnvironment > js/util/environment.js && \
    more js/util/environment.js && \
    node app.js && \
    git commit -m "$MESSAGE" && \
    git push
fi
