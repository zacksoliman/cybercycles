test0: dummy0.js
	node dummy0.js

test1: dummy1.js
	node dummy1.js

test2: dummy2.js
	node dummy2.js

dummy0.js: lib.js nodelib.js ai_dumb.js
	cat $+ > dummy0.js

dummy1.js: lib.js nodelib.js ai_lines.js
	cat $+ > dummy1.js

dummy2.js: lib.js nodelib.js ai_neighbours.js
	cat $+ > dummy2.js
