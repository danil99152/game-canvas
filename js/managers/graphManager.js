function GraphManager(options) {

    options = options instanceof Object ? options : {};

    var width = options.width;
    var height = options.height;

    var graph = new Graph({ width: width, height: height });
    var data = new Data({ width: width, height: height });

    var ui = new UI({
        moveCB: function (direction) {
            data.setPlayerCoordinates(direction);
        },
        shotCB: function() {
            data.playerShot();
        }
    });

    function render() {
        graph.fillRect();
        data.render(function (position, radius, color) {
            graph.circle(position, radius, color);
        });
        graph.kills(data.shotEnemiesCount());
        graph.life(data.hp());
        data.setEnemiesCoordinates();
        data.setBulletsCoordinates();
        data.enemyShot();
        var isGameFinished = data.isGameFinished();
        if (isGameFinished) {
            clearInterval(INTERVAL_ID);
            graph.end();
        }
    }

    var INTERVAL_ID;

    function init() {
        INTERVAL_ID = setInterval(function () {
            render();
        }, 17);
    }
    init();

}