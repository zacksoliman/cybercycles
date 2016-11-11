var state = [];
var height, width;
var enemy;
var me;

var ME = 'O';
var ENEMY = 'N';
var OBSTACLE = 'X';
var EMPTY = 'E';

function updateState(){
    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){

        }
    }
}

/**
 * Fonction utilisée *à l'interne* par votre code.
 * Vous devriez passer par cette fonction pour mettre à jour
 * à la fois votre modèle interne de grille et votre interface.
 */
function setGrid(x, y, val) {
    // TODO : colorier la grille de la bonne couleur
    // TODO : mettre à jour le modèle
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

function createGrid(config) {
    Grid.create(config.h, config.w);

    // TODO : initialiser les différentes variables globales représentant l'état du jeu
    // TODO : initialiser la grille de jeu avec les bonnes valeurs

    height = config.h;
    width = config.w;
    state = Array(height).fill(Array(width).fill(ENEMY));
    for(var i = 0; i < config.players.length; i++){
        if(config.players[i].id == config.me){
            me = config.players[i];
        } else {
            enemy = config.players[i];
        }
    }

    updateState();

}

/**
 * Fonction appelée à chaque step. La fonction reçoit en paramètre
 * un tableau d'enregistrements représentant les directions dans lesquelles se
 * sont déplacés les joueurs et doit retourner la nouvelle direction
 * à prendre parmi 'u' (up), 'd' (down), 'l' (left) et 'r' (right).
 * L'enregistrement prev est de la forme :
 *    [
 *      {id: id du joueur 1, direction: direction prise par le joueur 1},
 *      {id: id du joueur 2, direction: direction prise par le joueur 2},
 *   ]
 */
function nextMove(prev) {

    var move = 'u';
    
    return move;
}

/**
 * Fonction appelée lorsque le jeu se termine
 * (soit en match nul, soit en victoire d'un des joueurs).
 * La fonction reçoit en paramètre un tableau (possiblement vide)
 * contenant le numéro d'identification (id) du joueur encore vivant
 */
function victory(winners) {
    // TODO : mettre à jour la grille avec le/les joueur(s) perdant(s)
    
}
