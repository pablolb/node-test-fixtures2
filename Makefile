
REPORTER=dot

test:
	@NODE_ENV=test ./node_modules/.bin/mocha -u bdd -R $(REPORTER) test/fixtures_test.js

.PHONY: test
