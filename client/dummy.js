var server = {
    host: 'localhost',
    port: '1337'
};
// Actions received via websocket
var actions = {
    start: function(infos) {
        message("Début de la partie : vous êtes le joueur #" + infos.me.id);
        createGrid(infos);
    },
    nextMove: function(params) {
        var m = nextMove(params.moves);
        console.log(m);
        ws.send(m);
    },
    win: function(params) {
        var state;
        victory(params.id);
        message("Victoire du joueur #" + params.id);
    },
    tie: function(params) {
        message("Match nul ! Tous les joueurs sont morts !");
    },
};

var callbacks = {
    open: function() {
        message("En attente du début de partie...");
    },
    error: function() {
        message('Erreur de connexion, vérifiez que le serveur est lancé');
    },
    close: function() {
        message('Déconnexion du serveur');
    },
    message: function(params) {
        if(typeof(params) !== 'string' && "data" in params)
            params = params.data;
        
        params = JSON.parse(params);
        
        if("action" in params && params.action in actions) {
            actions[params.action](params);
        }
    },
};
    
var me;
var w, h;
var grid;
var other;

function txt_render() {
    var line = '-' + grid[0].map(function(x) { return '-'; }).join('') + '-';
    return line + '\n' +
           grid.map(function(e) {
               return '|' + e.join('') + '|';
           }).join('\n') + '\n' + line;
}

function set_grid(x, y, char) {
    x = Math.min(Math.max(x, 0), w - 1);
    y = Math.min(Math.max(y, 0), h - 1);
    grid[y][x] = char;

    var colors = {
        ' ': 'transparent',
        '#': 'green',
        '1': 'blue', // me
        '2': 'red',   // other
        'x': 'white',
    };

    var color = (char in colors ? colors[char] : 'yellow');
    
    Grid.colorCell(x, y, color);
}

function isEmptyCell(x, y) {
    return x >= 0 && x < w &&
           y >= 0 && y < h &&
           grid[y][x] == ' ';
}

function createGrid(config) {
    Grid.create(config.h, config.w);

    w = config.w;
    h = config.h;
    
    grid = [];
    
    for(var i=0; i<config.h; i++) {
        grid.push([]);
        for(var j=0; j<config.w; j++)
            grid[i].push(' ');
    }
    
    var obstacles = config.obstacles;
    obstacles.forEach(function(ob) {
        for(var x=ob.x; x<ob.x + ob.w; x++) {
            for(var y=ob.y; y<ob.y + ob.h; y++) {
                set_grid(x, y, '#');
            }
        }
    });
    
    var players = config.players;
    me = config.me;

    players.forEach(function(p, i) {
        if(p.id == me.id) {
            set_grid(p.x, p.y, '1');
        } else {
            other = p;
            set_grid(p.x, p.y, '2');
        }
    });
    
    console.log(txt_render());
}

function nextMove(prev) {
    prev.forEach(function(player) {
        var char, p;
        
        if(player.id == me.id) {
            char = '1';
            me.direction = player.direction;
            p = me;
        } else {
            char = '2';
            other.direction = player.direction;
            p = other;
        }

        move_player(p, p.direction);
        set_grid(p.x, p.y, char);
    });

    var last_pos = [me.x, me.y];

    var move = me.direction;

    move_player(me, move);
    var directions = 'udlr'.split('');
    directions.sort(function() {return Math.random() < 0.5 });
    
    directions.forEach(function(direction) {
        if(!isEmptyCell(me.x, me.y)) {
            me.x = last_pos[0];
            me.y = last_pos[1];
            move = direction;
            move_player(me, move);
        }
    });

    me.x = last_pos[0];
    me.y = last_pos[1];
    
    console.log(txt_render());
    
    return move;
}

function move_player(player, direction) {
    switch(direction) {
        case 'u':
            player.y--;
            break;
        case 'd':
            player.y++;
            break;
        case 'l':
            player.x--;
            break;
        case 'r':
            player.x++;
            break;
    }
}

function choice(arr) {
    var idx = Math.floor(Math.random() * arr.length);
    return arr[idx];
}

function victory(winner) {
    if(me.id == winner) {
        set_grid(other.x, other.y, 'x');
    } else {
        set_grid(me.x, me.y, 'x');
    }
    console.log(txt_render());
}
var Grid = {
    create: function() {},
    colorCell: function() {}
};

var WebSocket = require('ws');

var server = {
    host: 'localhost',
    port: '1337'
};

var ws = new WebSocket("ws://" + server.host + ":" + server.port);

function message(str) {
    console.log(str);
}

for(cb in callbacks) {
    ws.on(cb, callbacks[cb]);
}
