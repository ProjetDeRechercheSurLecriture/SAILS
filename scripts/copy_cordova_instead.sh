mop --version || {sudo npm install -g mop }

# rm -rf builds
mop

cp background_cordova.js builds/pre-sails/background.js
cp node_modules/oprime-montage/lib/cordova-bridge.js builds/pre-sails/cordova-bridge.js 

echo "Removing extra stuff from builds to reduce apk size"
echo 'TODO figure out what this does:   "bundles": ["ui/main.reel"], '

cd  builds/pre-sails/packages
find . -name  "*[^d].js" -delete
find . -name  "*.md" -delete

# ipad loads with this commented out
# sed 's/<meta data-insertcordovahere="" \/>/<script type="text\/javascript" charset="utf-8" src="cordova.js"><\/script><script type="text\/javascript" charset="utf-8" src="cordova-bridge.js"><\/script>/' ../index.html  > output
# mv output ../index.html

# sed 's/cordova-bridge.js/cordova-bridge.load.js/' ../index.html  > output
# mv output ../index.html
