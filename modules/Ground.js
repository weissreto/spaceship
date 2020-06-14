export class Ground
{
    constructor(scene)
    {
        this.ground = scene.physics.add.staticGroup({
            key: 'moon',
            frameQuantity: 100
        });
        Phaser.Actions.PlaceOnLine(this.ground.getChildren(),
            new Phaser.Geom.Line(16, 1184, 3216, 1184));
        this.ground.refresh();
    }

    getGround()
    {
        return this.ground;
    }
}