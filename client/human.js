var createGrid = function() {}

var move = 'u';

function nextMove(prev) {
    return move;
}

$(document).keypress(function(e) {
    if(e.key.match(/^Arrow/)){
        move = e.key[5].toLowerCase();
        ws.send(move);
    }
});
