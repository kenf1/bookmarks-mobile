.PHONY: app server fmt clean

app:
	cd BookmarksApp && npx expo start

server:
	cd server && npm run dev

fmt:
	cd BookmarksApp && npx prettier . --write
	cd server && npx prettier . --write

clean:
	find . -type d -name "node_modules" | xargs rm -rf