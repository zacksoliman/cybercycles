var grid; // Besoin d'un tableau 2D ici

/**
 * Fonction utilisée *à l'interne* par votre code.
 * Vous devriez passer par cette fonction pour mettre à jour
 * à la fois votre modèle interne de grille.
 */
var setGrid = function(x, y, val) {
    // TODO : remplir cette section
}

/**
 * Fonction appelée lorsque le jeu commence. La fonction reçoit
   la configuration initiale du jeu dans le paramètre config.
   config est un enregistrement javascript de la forme :
   {
      w: longueur de la grille
      h: hauteur de la grille
      obstacles: tableau de deux enregistrements représentant des obstacles, de la forme :
        {
           x: position horizontale de l'obstacle
           y: position verticale de l'obstacle
           w: largeur de l'obstacle
           h: hauteur de l'obstacle
       }
      players: tableau de 2 enregistrements représentant des joueurs, de la forme :
       {
          x: position de départ en x du joueur
          y: position de départ en y du joueur
          id: numéro d'identification du joueur
          direction: direction initiale du joueur
       }

     me: numéro d'identification (id) de votre joueur
   }
 */
var createGrid = function(config) {
    // TODO : remplir cette fonction
}

/**
 * Fonction appelée à chaque step. La fonction reçoit en paramètre
 * un tableau d'enregistrements représentant les directions dans lesquelles se
 * sont déplacés les joueurs au tour précédent et doit retourner la nouvelle
 * direction à prendre parmi 'u' (up), 'd' (down), 'l' (left) et 'r' (right).
 * L'enregistrement previousMoves est de la forme :
 *    [
 *      {id: id du joueur 1, direction: direction prise par le joueur 1},
 *      {id: id du joueur 2, direction: direction prise par le joueur 2},
 *   ]
 *
 * Notez que la *toute première fois* que la fonction est appelée, puisqu'il n'y a pas eu
 * de tour précédent, prev contient un tableau vide : []
 */
var nextMove = function(previousMoves) {
    // TODO : remplir cette fonction
}

/**
 * Fonction appelée lorsque le jeu se termine
 * (soit en match nul, soit en victoire d'un des joueurs).
 * La fonction reçoit en paramètre l'id du gagnant, ou 0 si la
 * partie s'est terminée sur un match nul.
 */
var victory = function(winner) {
    // TODO : remplir cette fonction
    /* Vous devez afficher un message (avec console.log()) indiquant si vous
     * avez gagné ou perdu la partie.
    */
}
