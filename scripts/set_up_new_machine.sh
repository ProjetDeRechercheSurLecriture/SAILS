
echo "This script is to set up a new computer to develop the Android and iOS versions of this project."
grunt --version || {
	sudo npm install -g grunt-cli
}

cca --version || {
	sudo npm install -g cca
}

cd ../
git clone git@github.com:ProjetDeRechercheSurLecriture/CordovaChromeSailsWrapper.git

