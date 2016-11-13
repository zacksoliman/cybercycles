#!/bin/bash
# Retire les caractères de contrôle (les couleurs)
# du log de parties
sed -r 's/[^ -~]\[.{1,2}m//g' games.log > games-no-color.log
