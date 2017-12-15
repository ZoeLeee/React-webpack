import * as React from 'react';

import { createLine } from './component/line';
import * as THREE from 'Three';
createLine();

// // 添加场景
// const scene = new THREE.Scene();

// // 添加相机
// const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
// // camera.position.set(1, 0, 10);
// // const camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
// camera.position.set(0, 0, 50);
// camera.lookAt(new THREE.Vector3(0, 0, 0));
// scene.add(camera);

// line(scene);

// //添加渲染器
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
// renderer.setClearColor(0x000);
// renderer.render(scene, camera);



// ReactDOM.render(
//     ,
//     document.getElementById("example")
// );