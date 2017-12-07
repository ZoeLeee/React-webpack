import './style.css';

import * as React from 'react';
import * as THREE from 'Three';

// 添加场景
const scene = new THREE.Scene();

// 添加相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 5);
// const camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
// camera.position.set(4, -3, 5);
// camera.lookAt(new THREE.Vector3(0, 0, 0));

scene.add(camera);

//添加渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x000);

//添加长方体
var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    })
);
scene.add(cube);

renderer.render(scene, camera);

// ReactDOM.render(
//     ,
//     document.getElementById("example")
// );