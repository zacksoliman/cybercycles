var createGrid = function(config) {
    /**
     * TODO : écrire le code pour initialiser la grille de jeu en HTML.
     * Vous pouvez utiliser l'API de grille qui était fourni avec le TP1 :
     *
     *     Grid.create(width, height)
     *     Grid.colorCell(x, y, color)
     *
     * Ou vous pouvez décider de générer votre propre rendu directement en
     * HTML en jouant avec le DOM comme vu en classe.
     * Soyez créatifs, l'important est d'avoir quelque chose de joli !
     *  
     * Chaque joueur devrait avoir sa propre couleur, qui devrait être
     * différente de la couleur des obstacles.
    */
};

/**
 * direction peut prendre les valeurs :
 * 'u' (up    => haut)
 * 'd' (down  => bas)
 * 'l' (left  => gauche)
 * 'r' (right => droite)
 */
var direction = 'u';

var nextMove = function(previousMoves) {
    /**
     * TODO : mettre à jour la grille de jeu affichée selon les positions
     * des joueurs indiquées dans l'enregistrement `previousMoves`.
     */
    console.log(previousMoves);

    /**
     * Note : ne modifiez pas cette ligne, ni le contenu de la variable
     * `direction` depuis cette fonction. Cette variable devrait être
     * modifiée uniquement par le code plus bas, lorsque l'utilisateur
     * a appuyé sur une touche du clavier.
    */
    return direction;
};

var victory = function(winner) {
    /**
     * TODO : mettre à jour la grille en indiquant d'une couleur différente
     * le/les joueurs morts.
     */
};

/**
 * TODO : capturer les événements du clavier et ajuster `direction`
 * en conséquence.
*/
document.addEventListener('keypress', function(evenement) {
    /* regardez ce que contient la variable d'événement dans la console
     * pour déterminer quelle touche a été appuyée
     */
    console.log(evenement);

    /**
     * Selon la touche sur laquelle on a appuyé, modifiez la variable
     * `direction` qui sera retournée la prochaine fois que le serveur
     * demandera quelle direction prendre.
     */
    direction = 'u';
});
