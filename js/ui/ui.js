function UI(options) {
    options = options instanceof Object ? options : {};

    var move = options.moveCB instanceof Function ? options.moveCB : function () {};
    var shot = options.shotCB instanceof Function ? options.shotCB : function () {};

    var directionMovement = {
        97: 'left', //A
        100: 'right', //D
    };

    var shootingButton = 32;

    function handleKeyPress(ev) {
        if (directionMovement[ev.keyCode]) {
            move(directionMovement[ev.keyCode]);
        }
    }

    function handleKeyUp(ev) {
        if (ev.keyCode === shootingButton) {
            shot();
        }
    }

    function init() {
        document.addEventListener('keypress', handleKeyPress);
        document.addEventListener('keyup', handleKeyUp);
    }
    init();
}