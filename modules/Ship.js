import { MainEngine, Thruster } from './Engine.js'

export class Ship extends Phaser.GameObjects.Container
{
    constructor(scene)
    {
        super(scene, 400, 100);
        this.angle = 20;
        var shipImage = scene.add.image(0, 0, 'ship');
        this.mainEngine = new MainEngine(scene);
        this.leftTopEngine = new Thruster(scene, -34, -40, 'left');
        this.leftBottomEngine = new Thruster(scene, -34, 35, 'left');
        this.rightTopEngine = new Thruster(scene, 34, -40, 'right');
        this.rightBottomEngine = new Thruster(scene, 34, 35, 'right');
        this.topLeftEngine = new Thruster(scene, -25, -45, 'up');
        this.topRightEngine = new Thruster(scene, 25, -45, 'up');

        var explosionParticles = scene.add.particles('red');
        this.explosion = explosionParticles.createEmitter({
            speed: 200,
            scale: { start: 1, end: 0 },
            radial: true,
            quantity: 10,
            lifespan: 10000,
            blendMode: 'ADD',
            on: false
        });
        this.add([
            this.mainEngine.particles, 
            this.leftTopEngine.particles, 
            this.leftBottomEngine.particles, 
            this.rightTopEngine.particles, 
            this.rightBottomEngine.particles, 
            this.topLeftEngine.particles, 
            this.topRightEngine.particles, 
            shipImage,
            explosionParticles]);
        this.setSize(69,119);
        scene.children.add(this);
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.engines = [];
        this.explosionSound = scene.sound.add('explosion');
        this.winSound = scene.sound.add('win');
    }

    engineOn(direction)
    {
        if (direction == 'up')
        {
            this.mainEngine.on();
            this.engineStarted(this.mainEngine);
        }
        if (direction == 'right')
        {
            this.leftTopEngine.on();
            this.leftBottomEngine.on();
            this.engineStarted(this.leftBottomEngine);
        }
        if (direction == 'left')
        {
            this.rightTopEngine.on();
            this.rightBottomEngine.on();
            this.engineStarted(this.rightBottomEngine);
        }
        if (direction == 'down')
        {
            this.topLeftEngine.on();
            this.topRightEngine.on();
            this.engineStarted(this.topRightEngine);
        }
        if (direction == 'turnLeft')
        {            
            this.topLeftEngine.on();
            this.leftBottomEngine.on();
            this.rightTopEngine.on();            
            this.body.setAngularAcceleration(-20);   
        }
        if (direction == 'turnRight')
        {            
            this.topRightEngine.on();
            this.leftTopEngine.on();
            this.rightBottomEngine.on();
            this.body.setAngularAcceleration(20);   
        }
    }

    engineOff(direction)
    {
        if (direction == 'up')
        {
            this.mainEngine.off()
            this.engineStopped(this.mainEngine);
        }
        if (direction == 'right')
        {
            this.leftTopEngine.off();
            this.leftBottomEngine.off();
            this.engineStopped(this.leftBottomEngine);
        }
        if (direction == 'left')
        {
            this.rightTopEngine.off();
            this.rightBottomEngine.off();
            this.engineStopped(this.rightBottomEngine);
        }
        if (direction == 'down')
        {
            this.topLeftEngine.off();
            this.topRightEngine.off();
            this.engineStopped(this.topRightEngine);
        }
        if (direction == 'turnLeft')
        {            
            this.topLeftEngine.off();
            this.leftBottomEngine.off();
            this.rightTopEngine.off();
            this.body.setAngularAcceleration(0);   
        }
        if (direction == 'turnRight')
        {            
            this.topRightEngine.off();
            this.leftTopEngine.off();
            this.rightBottomEngine.off();
            this.body.setAngularAcceleration(0);   
        }
    }

    engineStopped(engine)
    {
        var index = this.engines.indexOf(engine);
        this.engines.splice(index, 1);
        this.changeAcceleration();
    }

    engineStarted(engine)
    {
        this.engines.push(engine);
        this.changeAcceleration();
    }

    changeAcceleration()
    {
        var accelerateX = 0;
        var accelerateY = 0;
        for (var i = 0; i < this.engines.length; i++)
        {
            var engine = this.engines[i];
            var thrust = engine.thrust();
            var rotation = -this.rotation;
            if (engine.direction == 'left')
            {
                rotation += Math.PI / 2;
            }
            if (engine.direction == 'right')
            {
                rotation -= Math.PI / 2;
            }
            if (engine.direction == 'down')
            {
                rotation += Math.PI;
            }

            accelerateX += Math.sin(rotation) * thrust;
            accelerateY += Math.cos(rotation) * thrust;
        }
        this.body.setAccelerationX(accelerateX);
        this.body.setAccelerationY(accelerateY);
    }

    landed()
    {
        if (this.body.speed > 50 || this.angle > 10 || this.angle < -10)
        {
            this.explosion.on = true;
            this.explosionSound.play({ loop: true });
        }
        else
        {
            this.winSound.play( { loop: true });
        }
        this.body.setAcceleration(0, 0);
        this.body.setVelocity(0,0);
        this.body.setAngularAcceleration(0);
        this.body.setAngularVelocity(0);
        this.body.setDrag(100, 100);
        this.angle = 0;
    }
}
