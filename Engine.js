class Engine 
{
    constructor(scene, x, y, direction, velocity, scale, lifetime, quantity, thrust, volume)
    {
        this.particles = scene.add.particles('green');
        var speedX = 0;
        var speedY = 0;
        this.direction = direction;
        this.thrst = thrust;
        if (direction == 'down')
        {
            speedY = velocity;
        }
        if (direction == 'up')
        {
            speedY = -velocity;
        }
        if (direction == 'right')
        {
            speedX = velocity;
        }
        if (direction == 'left')
        {
            speedX = -velocity;
        }
        this.emitter = this.particles.createEmitter({
            x: x,
            y: y,
            speedX: speedX,
            speedY: speedY,
            scale: { start: scale, end: 0 },
            radial: false,
            quantity: quantity,
            lifespan: lifetime,
            blendMode: 'ADD',
            on: false
        });
        this.sound = scene.sound.add('rocket');
        this.sound.setVolume(volume);
    }

    on()
    {
        this.emitter.on = true;
        this.sound.play();
    }

    off()
    {
        this.emitter.on = false;
        this.sound.stop();
    }

    thrust()
    {
        return this.thrst;
    }

}

class MainEngine extends Engine
{
    constructor(scene)
    {
        super(scene, 0, 65, 'down', 1000, 1, 200, 3, 300, 1);
    }

}

class Thruster extends Engine
{
    constructor(scene, x, y, direction)
    {
        super(scene, x, y, direction, 300, 0.2, 100, 1, 100, 0.1);
    }
}