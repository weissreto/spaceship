class ShipGame extends Phaser.Game
{
    constructor() {
        super({
            type: Phaser.AUTO,
            width: 3200,
            height: 1200,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 100 }
                }
            },
            scene: new ShipScene()
        });
    }
}

window.onload = function () {
    var game = new ShipGame();   
};
