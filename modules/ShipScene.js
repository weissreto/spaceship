import { Ship } from './Ship.js'

export class ShipScene extends Phaser.Scene
{
    constructor() {
        super({
          key: "GameScene"
        });
    }
    
    preload() {
        this.load.setBaseURL('http://localhost/game/');
        this.load.image('ship', 'assets/ship.png');
        this.load.image('skytop', 'assets/skytop.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('green', 'assets/green.png');
        this.load.image('red', 'assets/red2.png');
        this.load.image('moon', 'assets/moon.png');
        this.load.audio('rocket', 'assets/rocket.mp3');
        this.load.audio('background', 'assets/background.mp3');
        this.load.audio('explosion', 'assets/explosion.mp3');
        this.load.audio('win', 'assets/win.mp3');
    }
      
    create() {
        var mainCam = this.cameras.main;
        mainCam.setViewport(0,0, 800, 600);
        mainCam.setBounds(0,0, 3200, 1200);
        var overviewCam = this.cameras.add(640, 0, 160, 60);
        overviewCam.setBackgroundColor(0x002244);
        overviewCam.setZoom(0.05);
        overviewCam.setBounds(0,0, 800, 600);
        this.add.image(400, 300, 'skytop');
        this.add.image(1200, 300, 'skytop');
        this.add.image(2000, 300, 'skytop');
        this.add.image(2800, 300, 'skytop');
        this.add.image(400, 900, 'sky');
        this.add.image(1200, 900, 'sky');
        this.add.image(2000, 900, 'sky');
        this.add.image(2800, 900, 'sky');
        this.sound.play('background', { volume: 0.1 });

        var ship = new Ship(this);
        this.ship = ship;
        mainCam.startFollow(ship, true);

        this.sand = this.physics.add.staticGroup({
            key: 'moon',
            frameQuantity: 100
        });
        Phaser.Actions.PlaceOnLine(this.sand.getChildren(),
            new Phaser.Geom.Line(16, 1184, 3216, 1184));
        this.sand.refresh();

        var spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        var leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        var rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        var downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        var zeroKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO);
        var dotKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        spaceKey.addListener('down', function (key, event) {
            ship.engineOn('up');
        });
        
        spaceKey.on('up', function (key, event) {
            ship.engineOff('up');
        });

        leftKey.on('down', function (key, event) {
            ship.engineOn('left');
        });

        leftKey.on('up', function (key, event) {
            ship.engineOff('left');
        });

        rightKey.on('down', function (key, event) {
            ship.engineOn('right');
        });

        rightKey.on('up', function (key, event) {
            ship.engineOff('right');
        });

        downKey.on('down', function (key, event) {
            ship.engineOn('down');
        });

        downKey.on('up', function (key, event) {
            ship.engineOff('down');
        });

        zeroKey.on('down', function (key, event) {
            ship.engineOn('turnLeft');
        });

        zeroKey.on('up', function (key, event) {
            ship.engineOff('turnLeft');
        });

        dotKey.on('down', function (key, event) {
            ship.engineOn('turnRight');
        });

        dotKey.on('up', function (key, event) {
            ship.engineOff('turnRight');
        });
    }    

    update()
    {
        this.physics.world.collide(this.ship, this.sand, () => this.ship.landed());
    }
}
