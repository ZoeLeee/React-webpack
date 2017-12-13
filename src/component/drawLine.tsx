import * as React from "react";
import * as THREE from "Three";
import { Geometry } from "Three";
// 添加场景
const scene = new THREE.Scene();

// 添加相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
// camera.position.set(1, 0, 10);
// const camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
camera.position.set(0, 0, 50);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

// line(scene);

//添加渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x000);

var material = new THREE.LineBasicMaterial({
    color: 0x0000ff
});

var geometry = new THREE.Geometry();
geometry.vertices.push(
    new THREE.Vector3(-10, 0, 0),
    new THREE.Vector3(0, 10, 0)
);
let line: any;
document.onclick = function (e)
{
    geometry.vertices.push(
        new THREE.Vector3(e.clientX - window.innerWidth / 2, window.innerHeight / 2 - e.clientY, 0)
    )
    line = new THREE.Line(geometry, material);
    scene.add(line);
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