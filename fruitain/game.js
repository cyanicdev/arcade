let config = {
    type: Phaser.AUTO,
    width: 768,
    height: 608,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

let walls;
let sprite;

function preload ()
{
    this.load.image('wall', 'assets/wall.png');
    this.load.image('wood', 'assets/wood.gif');

    this.load.image('strawberry', 'assets/strawberry.png');
    this.load.image('apple', 'assets/banana.png');
    this.load.image('cherry', 'assets/bomb.png');
    this.load.image('banana', 'assets/banana.png');
    this.load.image('bomb', 'assets/bomb.png');

    //  Firefox doesn't support mp3 files, so use ogg
    this.load.audio('music', ['assets/audio/music.mp3', 'assets/audio/music.ogg']);
    this.load.audio('click', ['assets/audio/click.mp3', 'assets/audio/click.ogg']);
    this.load.audio('explosion', ['assets/audio/explosion.mp3', 'assets/audio/explosion.ogg']);
}

function create ()
{
    this.add.tileSprite(0, 0, config.width * 2, config.height * 2, "wood");

    this.ambience = this.sound.add('music');
    let ambienceConfig = {
        volume: 5,
        loop: true,
        delay: 0
    }
    this.ambience.play(ambienceConfig);

    this.click = this.sound.add('click');
    this.explosion = this.sound.add('explosion');


    walls = this.physics.add.staticGroup({
        key: 'wall',
        frameQuantity: 82
    });

    Phaser.Actions.PlaceOnRectangle(walls.getChildren(), new Phaser.Geom.Rectangle(16, 16, config.width - 32, config.height - 32));
    walls.refresh();

    sprite = this.physics.add.image(400, 300, 'apple');
    sprite.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true);

    this.time.addEvent({ delay: 2000, callback: function() {
        let bomb = this.add.sprite(Math.random()*(config.width - 96) + 48, Math.random()*(config.height - 96) + 48, 'bomb').setInteractive();
        bomb.once('pointerup', function() { 
            this.explosion.play();
            this.scene.pause();
        }, this);
    }, callbackScope: this, loop: true });
}

function update ()
{
    this.physics.world.collide(sprite, walls);
}