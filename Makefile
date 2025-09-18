.PHONY: app server fmt build_ipa build_apk clean

app:
	cd BookmarksApp && npx expo start

server:
	cd server && npm run dev

fmt:
	cd BookmarksApp && npx prettier . --write
	cd server && npx prettier . --write

build_ipa:
	cd BookmarksApp && eas build --platform ios

build_apk:
	cd BookmarksApp && eas build -p android --profile preview

clean:
	find . -type d -name "node_modules" | xargs rm -rf