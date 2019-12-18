let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#fff',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: true
        }
    },
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

function preload() {
    this.load.spritesheet('player', 
        'assets/player.png',
        { frameWidth: 32, frameHeight: 32 }
    );

    this.load.image('spritesheet', 'assets/spritesheet.png');
    this.load.tilemapTiledJSON('map', 'assets/sample.json ');

}

function create() {
 
    var map = this.make.tilemap({ key: 'map' });
    const tiles = map.addTilesetImage('sample','spritesheet');

    const layer = map.createDynamicLayer("level1", tiles);
    layer.putTileAt(1, 20, 10);

    player = this.physics.add.sprite(100, 450, 'player');
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'idle',
        frames: [ { key: 'player', frame: 8 } ],
        frameRate: 10
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 9, end: 16 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();
}

function update(time, delta) {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);
        player.anims.play('idle');
    }

    if (cursors.up.isDown /*&& player.body.touching.down*/) {
        player.setVelocityY(-330);
    }
}