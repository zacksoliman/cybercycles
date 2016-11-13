#!/bin/bash

rm games.log a.log b.log

nb_games=80
a_wins=0
b_wins=0
nul=0

for i in $(seq $nb_games)
do
    (sleep 0.05s ; node client/dummy1.js >> a.log &> /dev/null)&
    (sleep 0.1s ; node client/dummy1.js >> b.log &> /dev/null)&
    node server/index.js --script >> games.log
    win=$?
    if [[ $win == 1 ]]
    then
        echo Victoire de A
        let a_wins++
    elif [[ $win == 2 ]]
    then
        echo Victoire de B
        let b_wins++
    else
        echo Match nul
        let nul++
    fi
    n=$(printf %02d $i)
    echo "---------$n----------"
    echo "  A : $a_wins/$nb_games"
    echo "  B : $b_wins/$nb_games"
    echo "Null: $nul/$nb_games"
done
