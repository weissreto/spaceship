export class Controller
{
    constructor(scene, ship)
    {
        this.ship = ship;
        let spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        let leftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        let rightKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        let downKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        let zeroKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO)
        let enterKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        spaceKey.on('down', () => this.ship.engineOn('up'))
        spaceKey.on('up', () => this.ship.engineOff('up'))
        leftKey.on('down', () => this.ship.engineOn('left'))
        leftKey.on('up', () => this.ship.engineOff('left'))
        rightKey.on('down', () => this.ship.engineOn('right'))
        rightKey.on('up', () => this.ship.engineOff('right'))
        downKey.on('down', () => this.ship.engineOn('down'))
        downKey.on('up', () => this.ship.engineOff('down'))

        zeroKey.on('down', () => this.ship.engineOn('turnLeft'))
        zeroKey.on('up', () => this.ship.engineOff('turnLeft'))
        enterKey.on('down', () => this.ship.engineOn('turnRight'))
        enterKey.on('up', () => this.ship.engineOff('turnRight'))
    }
}