var state = [];
var height, width;
var enemy;
var me;

var ME = 'O';
var ENEMY = 'N';
var OBSTACLE = '#';
var EMPTY = 'E';
var DEAD = 'X';

var colors = {}

/**
 * Fonction utilisée *à l'interne* par votre code.
 * Vous devriez passer par cette fonction pour mettre à jour
 * à la fois votre modèle interne de grille et votre interface.
 */
function setGrid(x, y, val) {
    x = Math.min(Math.max(x, 0), width - 1);
    y = Math.min(Math.max(y, 0), height - 1);
    Grid.colorCell(x, y, colors[val]); // colorier la grille de la bonne couleur
    console.log("Accessing i: " + y + " j: "+ x + " to add: " + val);
    state[y][x] = val; // mettre à jour le modèle
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
  console.log("CREATING GRID");
    Grid.create(config.h, config.w);
    console.log(JSON.stringify(config));
    // Set colors
    colors[ME] = 'blue';
    colors[ENEMY] = 'red';
    colors[EMPTY] = 'transparent';
    colors[OBSTACLE] = 'green';
    colors[DEAD] = 'white';

    // Set global variables
    height = config.h;
    width = config.w;

    for(var i=0; i<config.h; i++) {
        state.push([]);
        for(var j=0; j<config.w; j++)
            state[i].push(EMPTY);
    }

    for (var i = 0; i < config.players.length; i++) {
        if (config.players[i].id == config.me) {
            me = config.players[i];
        } else {
            enemy = config.players[i];
        }
    }

    setGrid(me.x, me.y, ME);
    setGrid(enemy.x, enemy.y, ENEMY);

    // Set obstacles
    config.obstacles.forEach(function(obs) {
        for (var i = obs.y; i < obs.y + obs.h; i++) {
          for (var j = obs.x; j < obs.x + obs.w; j++) {
            //console.log("Setting obstacle: i: " + i + " j: " + j);
            setGrid(j, i, OBSTACLE);
          }
        }
        });

}

/**
 * Fonction appelée à chaque step. La fonction reçoit en paramètre
 * un tableau d'enregistrements représentant les directions dans lesquelles se
 * sont déplacés les joueurs au tour précédent et doit retourner la nouvelle
 * direction à prendre parmi 'u' (up), 'd' (down), 'l' (left) et 'r' (right).
 * L'enregistrement prev est de la forme :
 *    [
 *      {id: id du joueur 1, direction: direction prise par le joueur 1},
 *      {id: id du joueur 2, direction: direction prise par le joueur 2},
 *   ]
 *
 * Notez que la *toute première fois* que la fonction est appelée, puisqu'il n'y a pas eu
 * de tour précédent, prev contient un tableau vide : []
 */
function nextMove(prev) {

  prev.forEach(function(p){
    if(p.id == me.id){
      console.log("Before update: ");
      console.log(JSON.stringify(me));
      updatePosition(me, p.direction);
      setGrid(me.x, me.y, ME);
      console.log("After update: ");
      console.log(JSON.stringify(me));
    }
    else{
      updatePosition(enemy, p.direction);
      setGrid(enemy.x, enemy.y, ENEMY);
    }
  });
    var move = choice();
    console.log(move);
    //me.direction = move;


    return move;
}

/**
 * Fonction appelée lorsque le jeu se termine
 * (soit en match nul, soit en victoire d'un des joueurs).
 * La fonction reçoit en paramètre un tableau (possiblement vide)
 * contenant le numéro d'identification (id) du joueur encore vivant
 */
function victory(winner) {
    // mettre à jour la grille avec le/les joueur(s) perdant(s)
    var iLost = true;
    var enemyLost = true;

    winners.forEach(function(winner){
      if(winner == me.id){
        iLost = false;
      } else {
        enemyLost = false;
      }
    });

    if(iLost){
      setGrid(me.x, me.y, DEAD);
    }
    if(enemyLost){
      setGrid(enemy.x, enemy.y, DEAD);
    }
}

function choice(){
  var moves = validMoves(state, me);
  console.log("Moves " + moves);
  return moves[Math.floor(Math.random() * moves.length)];
}

function alphabeta(node, depth, alpha, beta, player){
  moves = validMoves(node, player);

  if(depth == 0 || moves.length == 0){
    alpha = score(node, player);
    return alpha;
  }

  moves.forEach(function(m){

  });

}

function validMoves(board, player){
  var moves = [];
  var px = player.x;
  var py = player.y;
  console.log("Entering validMoves");
  console.log(JSON.stringify(player));
  if(py < height - 1 && px < width && board[py + 1][px] == EMPTY){
    moves.push('d');
  }
  else if (py > 0 && px < width && board[py - 1][px] == EMPTY){
    moves.push('u');
  }
  else if (px < width - 1 && py < height && board[py][px + 1] == EMPTY){
    moves.push('r');
  }
  else if (px > 0 && py < height && board[py][px - 1] == EMPTY){
    moves.push('l');
  }
  console.log(JSON.stringify(player));
  console.log(moves);
  console.log("Exiting validMoves");
  return moves;
}

function score(node){
  if(won(me, node)){
    return 100;
  } else if (won(enemy, node)){
    return -100;
  } else {
    return 50;
  }
}

function updatePosition(player, dir){
  console.log("Entering updatePos");
  console.log('dir: ' + dir);
  if(dir == 'u' && player.y > 0){
    player.y--;
    console.log('UP');
  }
  else if (dir == 'd'&& player.y < height){
    player.y++;
    console.log('DOWN');
  }
  else if (dir == 'l' && player.x > 0){
    player.x--;
    console.log('LEFT');
  }
  else if (dir == 'r' && player.x < width){
    player.x++;
    console.log('RIGHT');
  }
  console.log("Exiting updatePos");
}
