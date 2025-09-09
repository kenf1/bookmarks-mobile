.PHONY: fmt clean es

fmt:
	cd BookmarksApp && npx prettier . --write

clean:
	find . -type d -name "node_modules" | xargs rm -rf

es:
	cd BookmarksApp && npx expo start