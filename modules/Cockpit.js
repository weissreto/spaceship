export class Cockpit
{
    constructor(scene, ship, camera)
    {
        this.panel = scene.add.container(640, 70);

        this.panel.add(scene.add.text(0, 0, 'Speed', { fontSize: '14px', fill: '#FFF' }))
        this.panel.add(scene.add.text(10, 16, 'Abs:', { fontSize: '14px', fill: '#FFF' }))
        this.speed = scene.add.text(80, 16, '0', { fontSize: '14px', fill: '#FFF' })
        this.panel.add(this.speed)
        this.panel.add(scene.add.text(10, 32, 'X:', { fontSize: '14px', fill: '#FFF' }))
        this.x = scene.add.text(80, 32, '0', { fontSize: '14px', fill: '#FFF' });
        this.panel.add(this.x)
        this.panel.add(scene.add.text(10, 48, 'Y:', { fontSize: '14px', fill: '#FFF' }))
        this.y = scene.add.text(80, 48, '0', { fontSize: '14px', fill: '#FFF' })
        this.panel.add(this.y)

        this.panel.add(scene.add.text(0, 64, 'Rotation', { fontSize: '14px', fill: '#FFF' }))
        this.panel.add(scene.add.text(10, 80, 'Speed', { fontSize: '14px', fill: '#FFF' }))
        this.angleSpeed = scene.add.text(80, 80, '0', { fontSize: '14px', fill: '#FFF' })
        this.panel.add(this.angleSpeed)
        this.panel.add(scene.add.text(10, 96, 'Angle', { fontSize: '14px', fill: '#FFF' }))
        this.angle = scene.add.text(80, 96, '0', { fontSize: '14px', fill: '#FFF' })
        this.panel.add(this.angle)
    }

    follow(camera, ship)
    {
        this.panel.x = camera.camera.scrollX+640
        this.panel.y = camera.camera.scrollY+70
        if (ship.body.speed > 100)
        {
            this.speed.style.color = '#F00'
        }
        else
        {
            this.speed.style.color = '#FFF'
        }
        this.speed.text = ship.body.speed.toFixed(2)
        this.x.text = ship.body.velocity.x.toFixed(2)
        this.y.text = ship.body.velocity.y.toFixed(2)
        this.angleSpeed.text = ship.body.angularVelocity.toFixed(2)
        if (ship.body.rotation > 10 || ship.body.rotation < -10)
        {
            this.angle.style.color = "#F00"
        }
        else
        {
            this.angle.style.color = "#FFF"
        }
        this.angle.text = ship.body.rotation.toFixed(2)
    }
}