function Player(position, radius, color, speed = 1) {
    this.x = position.x;
    this.y = position.y;
    this.radius = radius;
    this.speed = speed;
    this.color = color;
}

function Enemy(position, radius, color, speed = 1, acc = 1) {
    this.x = position.x;
    this.y = position.y;
    this.radius = radius;
    this.speed = speed;
    this.acc = acc;
    this.color = color;
}

function Bullet (position, radius, color, speed = 1) {
    this.x = position.x;
    this.y = position.y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
}

function Data(options) {

    options = options instanceof Object ? options : {};

    var width = options.width;
    var height = options.height;

    var playerRadius = 10;
    var enemyRadius = 15;

    var enemiesCount = 5;
    var enemies = [];

    var bullets = [];

    var field = {
        width: width,
        height: height,
    };


    var player = new Player(
        {
            x: field.width / 2,
            y: field.height - playerRadius - 5
        },
        playerRadius,
        'black'
    );

    function createEnemy() {
        var coords = {
            x: 2 * enemyRadius + Math.random() * (field.width - 2 * enemyRadius),
            y: 2 * enemyRadius,
        };
        return new Enemy(coords, enemyRadius, 'red');
    }

    function createBullet(player) {
        return new Bullet({ x: player.x, y: player.y }, playerRadius / 3, '#00dcff');
    }

    function renderPlayer(cb) {
        cb({ x: player.x, y: player.y }, player.radius, player.color);
    }

    function renderEnemies(cb) {
        var enemy;
        for (var i = 0; i < enemies.length; i++) {
            enemy = enemies[i];
            cb({ x: enemy.x, y: enemy.y }, enemy.radius, enemy.color);
        }
    }

    function renderBullets(cb) {
        var bullet;
        for (var i = 0; i < bullets.length; i++) {
            bullet = bullets[i];
            cb({ x: bullet.x, y: bullet.y }, bullet.radius, bullet.color);
        }
    }

    this.render = function (cb) {
        renderPlayer(cb);
        renderEnemies(cb);
        renderBullets(cb);
    };

    this.setPlayerCoordinates = function (direction) {
        if (player) {
            switch (direction) {
                case 'left':
                    player.x--;
                    break;
                case 'right':
                    player.x++;
                    break;
            }
        }
    };

    this.setEnemiesCoordinates = function () {
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].y++;
        }
    };

    this.playerShot = function () {
        bullets.push(createBullet(player));
    };

    this.setBulletsCoordinates = function () {
        for(var i = 0; i < bullets.length; i++) {
            bullets[i].y--;
        }
    };

    function initEnemies() {
        for (var i = 0; i < enemiesCount; i++) {
            enemies.push(createEnemy());
        }
    }

    function init() {
        initEnemies();
    }
    init();

}