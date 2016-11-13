#!/bin/bash
# lancer avec ./fight.sh 2> /dev/null pour ne pas afficher
# les différents "1892 Killed"

rm games.log a.log b.log

robot1=client/dummy2.js
robot2=client/dummy2.js

nb_games=80
a_wins=0
b_wins=0
nul=0

for i in $(seq $nb_games)
do
    (sleep 0.1s ; node $robot1 >> a.log &> /dev/null)&
    (sleep 0.25s ; node $robot2 >> b.log &> /dev/null)&
    node server/index.js --color --script >> games.log
    win=$?

    
    n=$(printf %02d $i)
    echo "--------- $n / $nb_games ----------"

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
    killall -9 node;
    echo -n "  A : $a_wins"
    test $[ $a_wins - $nul ] -gt $b_wins && echo -n ' <<----'
    echo
    echo -n "  B : $b_wins"
    test $[ $b_wins - $nul ] -gt $a_wins && echo -n ' <<----'
    echo
    echo "Null: $nul"
done | tee tournament.log
