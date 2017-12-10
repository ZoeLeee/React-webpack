import '../style.css';
import * as THREE from 'Three';


export function init(scene: THREE.Scene)
{

    var light = new THREE.AmbientLight(0x000000);
    scene.add(light);


    //添加长方体
    var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: false
        })
    );
    cube.position.x = -10;
    //
    var torusNot = new THREE.Mesh(new THREE.TorusKnotGeometry(2, 0.5, 32, 8), new THREE.MeshLambertMaterial({
        color: 0xffff00,
        emissive: 0xff0000
    }));
    //圆环面
    var torus = new THREE.Mesh(new THREE.TorusGeometry(3, 1, 12, 18), new THREE.MeshNormalMaterial({}));
    torus.position.x = 10
    scene.add(cube);
    scene.add(torusNot);
    scene.add(torus);
}
