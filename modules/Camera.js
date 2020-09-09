export class MainCamera 
{
    constructor (scene)
    {
        this.camera = scene.cameras.main;
        this.camera.setViewport(0,0, 800, 600);
        this.camera.setBounds(0,0, 3200, 1200);
    }
    
    startFollow(ship)
    {
        this.camera.startFollow(ship);
    }
}

export class MiniCamera
{
    constructor (scene)
    {
        this.camera = scene.cameras.add(640, 0, 160, 60);
        this.camera.setBackgroundColor(0x002244);
        this.camera.setZoom(0.05);
        this.camera.setBounds(0,0, 800, 600);
    }
}