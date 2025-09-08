.PHONY: fmt clean

fmt:
	cd BookmarksApp && npx prettier . --write

clean:
	find . -type d -name "node_modules" | xargs rm -rf