var WebSocketServer = require('ws').Server;

var wss = new WebSocketServer({
    verifyClient: function() {
        return wss.clients.length < 2;
    },
    port: 1337
});

var last_client_id = 0
var h = 26, w = 40;
var delay = 200;

/* Code
    ' ': espace libre
    '1'/'2': trajet du joueur 1 ou 2
    '#': obstacle
    'x': joueur mort
*/
var grid;

function isEmptyCell(x, y) {
    return x >= 0 && x < w &&
           y >= 0 && y < h &&
           grid[y][x] == ' ';
}

function set_grid(x, y, char) {
    x = Math.min(Math.max(x, 0), w - 1);
    y = Math.min(Math.max(y, 0), h - 1);
    grid[y][x] = char;
}

function txt_render() {
    var line = '-' + grid[0].map(function(x) { return '-'; }).join('') + '-';
    return line + '\n' +
           grid.map(function(e) {
               return '|' + e.join('') + '|';
           }).join('\n') + '\n' + line;
}

function deconnexion() {
    var winner = players()[0];
    
    if(winner !== undefined) {
        console.log("Déconnexion d'un des joueurs. Gagnant : ", winner.id);
        wss.broadcast({action: "win", id: winner.id});
        process.exit(winner.id);
    }
    wss.close();
    process.exit(-1);
}

function start() {
    // Init grid
    grid = [];

    for(var i=0; i<h; i++) {
        grid.push([]);
        for(var j=0; j<w; j++)
            grid[i].push(' ');
    }

    var obstacles = [];
    // Crée les obstacles, set les positions de départ
    var nb_obstacles = random_int(3, 6);
    
    for(var i=0; i<nb_obstacles; i++) {
        var ob = {
            x: random_int(0, w),
            y: random_int(0, h),
            w: random_int(2, 6),
            h: random_int(2, 6)
        };
        obstacles.push(ob);

        // Symétrie dans les obstacles
        obstacles.push({
            x: w - ob.w - ob.x,
            y: h - ob.h - ob.y,
            w: ob.w,
            h: ob.h,
        });
    }

    // Dessin des obstacles
    obstacles.forEach(function(ob) {
        for(var x=ob.x; x<ob.x + ob.w; x++) {
            for(var y=ob.y; y<ob.y + ob.h; y++) {
                if(y < h && x < w && x >= 0 && y >= 0)
                    grid[y][x] = '#';
            }
        }
    });

    // Positionnement des joueurs
    var x, y;

    do {
        x = random_int(0, Math.round(w/4)),
        y = random_int(0, h - 1);
    } while(grid[y][x] != ' ');

    players(0).x = x;
    players(0).y = y;
    players(1).x = w - x - 1;
    players(1).y = h - y - 1;
    
    players().forEach(function(p, i) {
        set_grid(p.x, p.y, ''+p.id);
    });

    // Broadcast la configuration initiale du jeu
    wss.clients.forEach(function(client) {
        wss.broadcast({
            action: "start",
            config: {
                obstacles: obstacles,
                players: players(),
                w: w,
                h: h,
                me: client.state
            }
        }, client);
    });    
    
    wss.broadcast({action: 'nextMove', moves: []});

    console.log(txt_render());
    setTimeout(function() {
        step()
    }, 1000 + delay);
}

function step() {
    // Si un des joueurs s'est déconnecté, disqualifié
    if(wss.clients.length != 2) {
        console.log("Déconnexion d'un des joueurs");
        wss.broadcast({action: 'err'});
        deconnexion();
    }

    var next = [0,0];
    
    // Avance tout le monde dans sa direction
    players().forEach(function(p, i) {
        switch(p.direction) {
            case 'u':
                p.y--;
                break;
            case 'd':
                p.y++;
                break;
            case 'l':
                p.x--;
                break;
            case 'r':
                p.x++;
                break;
        }
    });
    
    // Déplace les joueurs + vérifie les morts
    
    // Si les deux joueurs se déplacent au même endroit, match nul
    if(players(0).x == players(1).x &&
       players(0).y == players(1).y) {
        var x = players(0).x;
        var y = players(0).y;

        set_grid(x, y, 'x');
        players().forEach(function(p) { p.dead = true; });
    } else {
        players().forEach(function(p, i) {
            var x = p.x;
            var y = p.y;

            if(isEmptyCell(x, y)) {
                set_grid(x, y, '' + p.id);
            } else {
                set_grid(x, y, 'x');
                p.dead = true;
            }
        });
    }

    console.log(txt_render());
    
    var alive = players().filter(function(p) {
        return !p.dead;
    });

    // Broadcast les déplacements
    var directions = players().map(function(x) {
        return {id: x.id, direction: x.direction};
    });
    
    wss.broadcast({action: 'nextMove', moves: directions});
    
    if(alive.length == 2) {
        // Relance un step() dans delay secondes si personne n'a perdu
        setTimeout(step, delay);
    } else if(alive.length == 1) {
        wss.broadcast({action: 'win', id: alive[0].id});
        process.exit(alive[0].id);
    } else if(alive.length == 0) {
        wss.broadcast({action: 'tie'});
    }
}

wss.on('connection', function(client) {
    client.state = {
        id: last_client_id + 1,
        x: 0,
        y: 0,
        direction: wss.clients.length == 0 ? 'u' : 'd',
    };
    last_client_id++;

    console.log("Client " + client.state.id + " joined");
    
    client.on('message', function(message) {
        // Actions possibles : 'udlr' pour se déplacer
        var direction = message[0];

        if('udlr'.indexOf(direction) != -1)
            client.state.direction = direction;
    });

    client.on('close', deconnexion);

    if(wss.clients.length == 2) {
        start();
    }
});

wss.broadcast = function(data, client) {
    data = JSON.stringify(data);
    if(client !== undefined) {
        client.send(data);
    } else {
        this.clients.forEach(function(client, index) {
            try {
                client.send(data);
            } catch(e) {
                console.log(e);
            }
        });
    }
};

function players(idx) {
    var players = [];
    wss.clients.forEach(function(client) {
        players.push(client.state);
    });

    if(idx !== undefined && idx in players)
        return players[idx]
    else if(idx !== undefined)
        return {};
    
    return players;
}

// Various helpers
Array.prototype.contains = function(element) {
    return this.indexOf(element) != -1;
};

function random_int(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}
