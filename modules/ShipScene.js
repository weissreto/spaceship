import { Ship } from './Ship.js'
import { MainCamera, MiniCamera } from './Camera.js'
import { Background } from './Background.js'
import { Ground } from './Ground.js'
import { Controller } from './Controller.js'
import { Cockpit } from './Cockpit.js'

export class ShipScene extends Phaser.Scene
{
    constructor() {
        super({
          key: "GameScene"
        });
    }
    
    preload() {
        this.load.setBaseURL('http://localhost:9090/');
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
        this.mainCam = new MainCamera(this);
        let miniCam = new MiniCamera(this);
        let background = new Background(this);
        this.ground = new Ground(this);
        this.ship = new Ship(this);
        this.mainCam.startFollow(this.ship);
        let controller = new Controller(this, this.ship);
        this.cockpit = new Cockpit(this, this.ship, this.mainCam);
        this.explosionSound = this.sound.add('explosion');
        this.winSound = this.sound.add('win');
        this.result = this.add.text(0, 0, "You lose", { fontSize: '50px', fill: '#F00' })
        this.result.visible = false
        this.state = "RUN"
    }    

    update()
    {
        if (this.state == "RUN")
        {
            this.physics.world.collide(this.ship, this.ground.getGround(), () => this.ship.landed())
            this.cockpit.follow(this.mainCam, this.ship)
            if (this.ship.state == "Exploded")
            {
                this.explosionSound.play( { loop: true })
                this.result.visible = true
                this.result.x = this.mainCam.camera.scrollX+300
                this.result.y = this.mainCam.camera.scrollY+200
                this.state = "LOSE";
            }
            if (this.ship.state == "Landed")
            {
                this.winSound.play( { loop: true })
                this.result.visible = true
                this.result.style.color= '#0F0'
                this.result.text= "You win"
                this.result.x = this.mainCam.camera.scrollX+300
                this.result.y = this.mainCam.camera.scrollY+200
                this.state = "WIN";
            }
        }
    }
}
