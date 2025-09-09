.PHONY: es fmt clean

es:
	cd BookmarksApp && npx expo start

fmt:
	npx prettier . --write

clean:
	find . -type d -name "node_modules" | xargs rm -rf