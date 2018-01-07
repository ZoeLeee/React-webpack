import { View } from "./view";
import * as THREE from "Three";
import { Geometry } from "Three";

export class Editor
{
    view: View;
    plane: THREE.Mesh;
    ambientlight: THREE.Light;
    spotLight: THREE.Light;
    cube: THREE.Mesh;
    sphere: THREE.Mesh;
    step: number;
    constructor()
    {
        this.step = 0;
        this.view = new View();
        this.Add();
    }
    Add()
    {
        this.CreatePlane();
        this.CreateLight();
        this.CreateGeo();
        this.Animate();
    }
    CreatePlane()
    {
        let planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
        let texture = new THREE.TextureLoader().load('texture/Tulips.jpg');
        let planeMatrial = new THREE.MeshBasicMaterial({
            // color: 0xffffff,
            map: texture
        })
        this.plane = new THREE.Mesh(planeGeometry, planeMatrial);
        this.view.scene.add(this.plane);
        this.plane.rotation.x = -0.25 * Math.PI;
        // this.plane.rotation.y = -0.5 * Math.PI;
        this.plane.position.x = 20;
        this.plane.position.y = 0;
        this.plane.position.z = 0;
    }
    CreateLight()
    {
        this.ambientlight = new THREE.AmbientLight(0x090909)
        this.view.scene.add(this.ambientlight);
        this.spotLight = new THREE.SpotLight(0xffffff);
        this.spotLight.position.set(-40, 40, 50);
        this.spotLight.castShadow = true;
        this.view.scene.add(this.spotLight);
    }
    CreateGeo()
    {
        let cubeGeometry = new THREE.CubeGeometry(4, 4, 4);

        let cubeMatrial = new THREE.MeshLambertMaterial({
            color: 0xff0000
        })
        this.cube = new THREE.Mesh(cubeGeometry, cubeMatrial);
        this.cube.position.set(-4, 3, 0);
        this.cube.castShadow = true;
        this.view.scene.add(this.cube);

        let sphereGeomery = new THREE.SphereGeometry(4, 20, 20);
        let sphereMetarial = new THREE.MeshLambertMaterial({
            color: 0x7777ff
        })
        this.sphere = new THREE.Mesh(sphereGeomery, sphereMetarial);
        this.sphere.position.set(20, 3, 2);
        this.sphere.castShadow = true;
        this.view.scene.add(this.sphere);

    }
    Animate()
    {
        if (!this.cube || !this.sphere) return;
        this.cube.rotation.x += 0.02;
        this.cube.rotation.y += 0.02;
        this.cube.rotation.z += 0.02;
        this.step += 0.04;
        this.sphere.position.x = 20 + (10 * (Math.cos(this.step)));
        this.sphere.position.y = 2 + (10 * Math.abs(Math.sin(this.step)));
        requestAnimationFrame(() => this.Animate());
        this.view.Render();
    }
}