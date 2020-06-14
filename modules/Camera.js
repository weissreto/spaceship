export class MainCamera 
{
    constructor (scene)
    {
        this.mainCam = scene.cameras.main;
        this.mainCam.setViewport(0,0, 800, 600);
        this.mainCam.setBounds(0,0, 3200, 1200);
    }
    
    startFollow(ship)
    {
        this.mainCam.startFollow(ship);
    }
}

export class MiniCamera
{
    constructor (scene)
    {
        let overviewCam = scene.cameras.add(640, 0, 160, 60);
        overviewCam.setBackgroundColor(0x002244);
        overviewCam.setZoom(0.05);
        overviewCam.setBounds(0,0, 800, 600);
    }
}