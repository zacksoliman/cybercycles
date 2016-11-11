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
    me = {id: config.me};
    other = {};

    players.forEach(function(p, i) {
        if(p.id == me.id) {
            me.x = p.x;
            me.y = p.y;
            me.direction = p.direction;
            set_grid(p.x, p.y, '1');
        } else {
            other.id = p.id;
            other.x = p.x;
            other.y = p.y;
            other.direction = p.direction;
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
    if(winner.indexOf(me.id) != -1) {
        set_grid(other.x, other.y, 'x');
    } else if(winner.indexOf(other.id) != -1) {
        set_grid(me.x, me.y, 'x');
    }
    console.log(txt_render());
}
