var w, h, direction, x, y;

function createGrid(config) {
    w = config.w;
    h = config.h;

    var me = config.players.filter(function(x) {
        return x.id == config.me;
    })[0];

    x = me.x;
    y = me.y;
    
    if(x == 0 && y == 0)
        direction = 'd';
    else
        direction = 'u';
}

function nextMove(precedent) {
    if(direction == 'u')
        direction = 'l';
    else if(direction == 'l')
        direction = 'u';
    else if(direction == 'r')
        direction = 'd';
    else if(direction == 'd')
        direction = 'r';
    
    return direction;
}

function victory(winner) {}
