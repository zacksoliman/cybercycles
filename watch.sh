#!/bin/bash
str=$(seq 40 | sed 's/.*/+\\n/' | tr -d '\n')
watch --color -n 0,1 'echo -e "\$\n?-----?\n'$str'Q\n" | ed games.log'
