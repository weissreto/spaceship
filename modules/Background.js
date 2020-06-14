export class Background
{
    constructor(scene)
    {
        for (let x = 0; x < 4; x++)
        {
            scene.add.image(x * 800 + 400, 300, 'skytop');
        }
        for (let x = 0; x < 4; x++)
        {
            scene.add.image(x * 800 + 400, 900, 'sky');
        }
        scene.sound.play('background', { volume: 0.1 });
    }
}