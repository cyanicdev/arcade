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

    layer.setCollision(2, true);

    this.player = this.physics.add.sprite(100, 450, 'player');
    // player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, layer);

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
    this.cameras.main.scrollX += 0.5;
    this.cameras.main.scrollY = this.player.y - (config.height / 2);

    if (cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play('right', true);
    }
    else {
        this.player.setVelocityX(0);
        this.player.anims.play('idle');
    }

    if (cursors.up.isDown /*&& player.body.touching.down*/) {
        this.player.setVelocityY(-330);
    }
}