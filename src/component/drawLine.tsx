import * as React from "react";
import * as THREE from "Three";
import { Geometry } from "Three";
import { setInterval } from "timers";
import { OrbitControls } from 'three-orbitcontrols-ts';
// import 'three/OrbitControls';\
// 添加场景
const scene = new THREE.Scene();

// 添加相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
// camera.position.set(1, 0, 10);
// const camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
camera.position.set(0, 0, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

// line(scene);

//添加渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.autoClear = true;
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x000);

// const controls = new OrbitControls(camera, renderer.domElement);
// this.enableZoom = true;
// this.zoomSpeed = 1.0;
// controls.enablePan = true;


let material = new THREE.LineBasicMaterial({
    color: 0x0000ff
});


let geometry = new THREE.Geometry();
let line = new THREE.Line(geometry, material);
scene.add(line);

function animate()
{
    requestAnimationFrame(animate)
    renderer.render(scene, camera);
}
// animate();
let a = 0;
document.onclick = function (event)
{
    a += 5;
    geometry.dispose();
    let pts = geometry.vertices;
    // pts.push(
    //     new THREE.Vector3(window.innerWidth / 2 - e.clientX, window.innerHeight / 2 - e.clientY, 0)
    // )
    let vector = new THREE.Vector3();
    vector.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1, 0.5);
    vector.unproject(camera);
    var dir = vector.sub(camera.position).normalize();

    var distance = - camera.position.z / dir.z;

    var pos = camera.position.clone().add(dir.multiplyScalar(distance));
    pts.push(pos);
    let geo = new Geometry();
    geo.vertices = pts;
    line.geometry = geo;

    renderer.render(scene, camera);


}

export class DrawLine extends React.Component<any, any>{
    material: THREE.LineBasicMaterial
    private geometry: THREE.Geometry;
    private line: THREE.Line;
    constructor(props: any)
    {
        super(props);
        this.material == new THREE.LineBasicMaterial({ color: 0xffffff });
        this.geometry = new Geometry();
        this.line = new THREE.Line();
    }
    drawLine = (e: MouseEvent) =>
    {
        this.geometry.vertices.push(
            new THREE.Vector3(window.innerWidth / 2 - e.clientX, window.innerHeight / 2 - e.clientY, 0)
        )
        this.line.geometry = this.geometry;
        this.line.material = this.material;

    }
    componentDidMount()
    {

    }
    render()
    {
        return (
            <div>

            </div>
        )

    }
}