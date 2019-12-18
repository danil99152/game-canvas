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

function Bullet (position, radius, color, speed = 1, isPlayersBullet = false) {
    this.x = position.x;
    this.y = position.y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.isPlayersBullet = isPlayersBullet;
}

function Data(options) {

    options = options instanceof Object ? options : {};

    var graph = new Graph({ width: width, height: height });

    var width = options.width;
    var height = options.height;

    var playerRadius = 10;
    var enemyRadius = 15;

    var enemiesCount = 5;
    var enemies = [];

    var bullets = [];

    var shotEnemiesCount = 0;
    var hp = 10;

    var field = {
        width: width,
        height: height,
    };

    var counter = 1;
    var PERIOD_OF_ENEMY_SHOT = 60;

    var isGameFinished = false;

    var player = new Player(
        {
            x: field.width / 2,
            y: field.height - playerRadius - 5
        },
        playerRadius,
        'black'
    );

    this.shotEnemiesCount = function () {
        return shotEnemiesCount;
    };

    this.hp = function () {
        return hp;
    };

    function createEnemy() {
        var coords = {
            x: 2 * enemyRadius + Math.random() * (field.width - 2 * enemyRadius),
            y: 2 * enemyRadius,
        };
        return new Enemy(coords, enemyRadius, 'red');
    }

    function createBullet(player, isPlayer = false) {
        return new Bullet({ x: player.x, y: player.y },
            playerRadius / 3,
            '#00dcff',
            1,
            isPlayer
        );
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
                    if (player.x !== 10)
                        player.x-=10;
                    break;
                case 'right':
                    if (player.x !== 590)
                        player.x+=10;
                    break;
            }
        }
    };

    this.setEnemiesCoordinates = function () {
        var enemy;
        for (var i = 0; i < enemies.length; i++) {
            enemy = enemies[i];
            enemy.y++;
        }
    };

    this.playerShot = function () {
        bullets.push(createBullet(player, true));
    };

    function countEnemiesThatShot(count) {
        var enemiesThatShot = [];
        for (var i = 0; i < count; i++) {
            enemiesThatShot.push(enemies[i]);
        }
        return enemiesThatShot;
    }

    this.enemyShot = function () {
        if (counter % PERIOD_OF_ENEMY_SHOT === 0) {
            var howManyEnemiesShot = Math.floor(Math.random() * (enemies.length) + 1);
            var enemiesThatShot = countEnemiesThatShot(howManyEnemiesShot);
            var enemy;
            for (var i = 0; i < enemiesThatShot.length; i++) {
                enemy = enemiesThatShot[i];
                bullets.push(createBullet(enemy));
            }
            bullets.forEach(function (bullet){
                var radiusDistance = player.radius + bullet.radius;
                var centerDistance = Math.pow(
                    Math.pow(bullet.x - player.x, 2) +
                    Math.pow(bullet.y - player.y, 2)
                    , 0.5);
                if (centerDistance < radiusDistance) {
                    hp--;
                    if (hp === 0)
                        isGameFinished = true;
                }
            });
            counter = 1;
        } else {
            counter++;
        }
    };

    function aim(bullet) {
        var initialEnemiesCount = enemies.length;
        enemies = enemies.filter(function (enemy) {
            var radiusDistance = enemy.radius + bullet.radius;
            var centerDistance = Math.pow(
                Math.pow(bullet.x - enemy.x, 2) +
                Math.pow(bullet.y - enemy.y, 2)
                , 0.5);
            if (centerDistance > radiusDistance) {
                return enemy;
            }
            shotEnemiesCount++;
            return false;
        });
        return initialEnemiesCount !== enemies.length;
    }

    this.setBulletsCoordinates = function () {
        bullets = bullets.filter(function (bullet) {
            if (bullet.isPlayersBullet) {
                bullet.y--;
                return !aim(bullet) ? bullet : false;
            }
            bullet.y += 2;
            return bullet;
        });
    };

    this.isGameFinished = function () {
        return !player || isGameFinished;
    };

    function initEnemies() {
        for (var i = 0; i < enemiesCount; i++) {
            enemies.push(createEnemy());
        }
    }

    function init() {
        setInterval(() => initEnemies(), 1000);
    }
    
    init();
}