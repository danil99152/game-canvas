function Point(x, y) {
    this.x = x;
    this.y = y;
}

function Line(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
}

function Graph(options) {
    options = options instanceof Object ? options : {};

    var width = options.width || 600;
    var height = options.height || 600;
    var context = null;
    var canvasContainer = document.getElementById('canvas-container');
    var canvas = document.createElement('canvas');

    this.fillRect = function (color = '#cacaca') {
        context.fillStyle = color;
        context.fillRect(0, 0, width, height);
    };

    this.circle = function (position, radius, color) {
        context.strokeStyle = color;
        context.fillStyle = color;
        context.beginPath();
        context.arc(position.x, position.y, radius, 0, Math.PI * 2);
        context.stroke();
        context.fill();
    };

    this.line = function (line, color) {
        var firstPoint = line.p1;
        var secondPoint = line.p2;
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(firstPoint.x, firstPoint.y);
        context.lineTo(secondPoint.x, secondPoint.y);
        context.stroke();
    };

    this.life = function (hp) {
        context.font = "italic 20pt Arial";
        context.fillStyle = "black";
        context.fillText("HP: ", 10, 60);
        context.fillText(hp, 70, 60);
    };

    this.end = function () {
        context.font = "italic 20pt Arial";
        context.fillStyle = "black";
        context.fillText("GAMEOVER!", width/2 - 80, height/2);
    };

    this.kills = function (shotEnemiesCount) {
        context.font = "italic 20pt Arial";
        context.fillStyle = "black";
        context.fillText("Kills: ", 10, 30);
        context.fillText(shotEnemiesCount, 70, 30);
    };

    function init() {
        context = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        canvasContainer.appendChild(canvas);
    }
    init();

}