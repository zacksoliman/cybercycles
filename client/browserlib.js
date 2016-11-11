var Grid = {
    create: function(rows, cols) {
        var $grid = $("#grid");
        var i = 0;
        var j = 0;
        var $newRow;

        $grid.empty();

        for (i = 0; i < rows; i++) {
            $newRow = $('<tr></tr>');
            for (j = 0; j < cols; j++) {
                $('<td id="' + j + '-' + i + '"></td>').appendTo($newRow);
            }
            $newRow.appendTo($grid);
        }
    },
    colorCell: function(x, y, color) {
        $('#' + x + '-' + y).css('background-color', color);
    },
};

function message(html) {
    $('#message').text($('#message').text() + "\n\n* " + html);
}

// Connection
window.WebSocket = window.WebSocket || window.MozWebSocket;

var ws = new window.WebSocket("ws://" + server.host + ":" + server.port);

for(cb in callbacks) {
    ws["on" + cb] = callbacks[cb];
}
