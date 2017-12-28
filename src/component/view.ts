import * as THREE from "Three";

export class View
{
    scene: THREE.Scene;
    camera: THREE.Camera;
    renderer: THREE.WebGLRenderer
    constructor()
    {
        this.scene = new THREE.Scene();
        this.InitView();
    }
    InitView()
    {
        this.InitCamera();
        this.InitRender();
        this.Render();
    }
    InitCamera()
    {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.x = -30;
        this.camera.position.y = 40;
        this.camera.position.z = 30;
        this.camera.lookAt(this.scene.position);
        this.scene.add(this.camera);

    }
    InitRender()
    {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(new THREE.Color(0xEEEEEE));
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMapEnabled = true;
        document.getElementById("app").appendChild(this.renderer.domElement);
    }
    Render()
    {
        this.renderer.render(this.scene, this.camera);
    }
}