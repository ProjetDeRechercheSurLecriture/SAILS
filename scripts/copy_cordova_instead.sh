mop --version || {sudo npm install -g mop }

# rm -rf builds
mop

cp background_cordova.js builds/pre-sails/background.js

echo "Removing extra stuff from builds to reduce apk size"
echo 'TODO figure out what this does:   "bundles": ["ui/main.reel"], '

cd  builds/pre-sails/packages
find . -name  "*[^d].js" -delete
find . -name  "*.md" -delete
