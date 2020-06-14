import { Ship } from './Ship.js'
import { MainCamera, MiniCamera } from './Camera.js'
import { Background } from './Background.js'
import { Ground } from './Ground.js'
import { Controller } from './Controller.js'

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
        let mainCam = new MainCamera(this);
        let miniCam = new MiniCamera(this);
        let background = new Background(this);
        this.ground = new Ground(this);
        this.ship = new Ship(this);
        mainCam.startFollow(this.ship);
        let controller = new Controller(this, this.ship);
    }    

    update()
    {
        this.physics.world.collide(this.ship, this.ground.getGround(), () => this.ship.landed());
    }
}
