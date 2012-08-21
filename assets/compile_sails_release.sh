#!/bin/bash

rm -rf release
cd ../../DyslexDisorthGame/server/

echo ""
echo ""
echo "Put the source into production mode"
sed 's/Utils.debugMode *= *true/Utils.debugMode = false/' public/libs/Utils.js  > output
mv output public/libs/Utils.js
sed 's/Utils.productionMode *= *false/Utils.productionMode = true/' public/libs/Utils.js  > output
mv output public/libs/Utils.js

echo ""
echo ""
echo "Minify the sails code into another release"
node r.js -o client_sails_release_config.js

echo ""
echo ""
echo "Minify the css"
node r.js -o cssIn=public/dashboard.css out=releasesails/dashboard.css

echo ""
echo ""
echo "Return the source to dev mode"
sed 's/Utils.debugMode *= *false/Utils.debugMode = true/' public/libs/Utils.js  > output
mv output public/libs/Utils.js
sed 's/Utils.productionMode *= *true/Utils.productionMode = false/' public/libs/Utils.js  > output
mv output public/libs/Utils.js

echo ""
echo ""
echo "Copy release of sails to android app's assets"
cp -r releasesails ../../SAILS/assets/release
rm -rf releasesails
cd ../../SAILS/assets/

echo ""
echo ""
echo "Removing libraries that don't need to be in release to reduce zip size"
rm -rf release/libs

echo ""
echo ""
echo "Overwriting icons and manifest with the SAILs manifest"
cp -r public/* release/



echo ""
echo ""
echo "Finished. Results are in the assets/release folder"
