test0: dummy0.js
	node dummy0.js

test1: dummy1.js
	node dummy1.js

test2: dummy2.js
	node dummy2.js

test3: dummy3.js
	node dummy3.js

dummy0.js: lib.js nodelib.js ai_dumb.js
	cat $+ > dummy0.js

dummy1.js: lib.js nodelib.js ai_lines.js
	cat $+ > dummy1.js

dummy2.js: lib.js nodelib.js ai_neighbours.js
	cat $+ > dummy2.js

dummy3.js: lib.js nodelib.js empty_ai.js
	cat $+ > dummy3.js
