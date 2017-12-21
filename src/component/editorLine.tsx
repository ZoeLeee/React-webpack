import * as THREE from 'three';
// import { Stats } from 'fs';
let Stats = require('stats');
console.log(Stats);
Stats();
require('dat.gui');
let format = function (str: string, ...args: Array<any>)
{

    for (var i = 0; i < args.length; i++)
    {
        str = str.replace('{' + i + '}', arguments[i]);
    }
    return str;
};
// let container=document.createElement('div');
let container = document.getElementById('example');
console.log(container);

let scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 250, 1000);
scene.add(camera);

scene.add(new THREE.AmbientLight(0xf0f0f0));

let light = new THREE.SpotLight(0xffffff, 1.5);
light.position.set(0, 1500, 200);
light.castShadow = true;
light.shadow.bias = -0.0000222;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
scene.add(light);

//聚光灯
let spotlight = light;
// 渲染器
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);
let stats = new Stats();
container.appendChild(stats.dom);
var splineHelperObjects: any = [], splineOutline;
var splinePointsLength = 4;
var positions: any = [];
var options;
let transformControl: any;
var geometry = new THREE.BoxGeometry(20, 20, 20);
var ARC_SEGMENTS = 200;
var splineMesh: any;
var splines: any = {};
let splineObject: any;
var params = {
    uniform: true,
    tension: 0.5,
    centripetal: true,
    chordal: true,
    addPoint: addPoint,
    removePoint: removePoint,
    exportSpline: exportSpline
};
init();
function init()
{
    let planeGeometry = new THREE.PlaneGeometry(2000, 2000);
    planeGeometry.rotateX(-Math.PI / 2);
    //  平面
    let planeMeterial = new THREE.ShadowMaterial({ opacity: 0.2 });
    let plane = new THREE.Mesh(planeGeometry, planeMeterial);
    plane.position.y = -200;
    plane.receiveShadow = true;
    scene.add(plane);

    let helper = new THREE.GridHelper(2000, 100);
    helper.position.y = -199;
    helper.material.opacity = 0.25;
    helper.material.transparent = true;
    scene.add(helper);


    //var axes = new THREE.AxesHelper( 1000 );
    //axes.position.set( - 500, - 500, - 500 );
    //scene.add( axes );
    // 
    // Controls
    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls.damping = 0.2;
    controls.addEventListener('change', render);
    controls.addEventListener('start', function ()
    {
        cancelHideTransorm();
    });
    controls.addEventListener('end', function ()
    {
        delayHideTransform();
    });
    transformControl = new THREE.TransformControls(camera, renderer.domElement);
    transformControl.addEventListener('change', render);
    scene.add(transformControl);
    // Hiding transform situation is a little in a mess :()
    transformControl.addEventListener('change', function (e: any)
    {
        cancelHideTransorm();
    });
    transformControl.addEventListener('mouseDown', function (e: any)
    {
        cancelHideTransorm();
    });
    // var dragcontrols = new THREE.DragControls(splineHelperObjects, camera, renderer.domElement); //
    // dragcontrols.enabled = false;
    // dragcontrols.addEventListener('hoveron', function (event: any)
    // {
    //     transformControl.attach(event.object);
    //     cancelHideTransorm();
    // });
    // dragcontrols.addEventListener('hoveroff', function (event: any)
    // {
    //     delayHideTransform();
    // });
    let hiding: any;
    function delayHideTransform()
    {
        cancelHideTransorm();
        hideTransform();
    }
    function hideTransform()
    {
        hiding = setTimeout(function ()
        {
            transformControl.detach(transformControl.object);
        }, 2500)
    }
    function cancelHideTransorm()
    {
        if (hiding) clearTimeout(hiding);
    }
    /*******
     * Curves
     *********/
    for (var i = 0; i < splinePointsLength; i++)
    {
        splineObject = addSplineObject(positions[i]);
    }
    positions = [];
    for (var i = 0; i < splinePointsLength; i++)
    {
        positions.push(splineHelperObjects[i].position);
    }
    var geometry = new THREE.Geometry();
    for (var i = 0; i < ARC_SEGMENTS; i++)
    {
        geometry.vertices.push(new THREE.Vector3());
    }
    var curve: any = new THREE.CatmullRomCurve3(positions);
    curve.curveType = 'catmullrom';
    curve.mesh = new THREE.Line(geometry.clone(), new THREE.LineBasicMaterial({
        color: 0xff0000,
        opacity: 0.35,
        linewidth: 2
    }));
    curve.mesh.castShadow = true;
    splines.uniform = curve;
    curve = new THREE.CatmullRomCurve3(positions);
    curve.curveType = 'centripetal';
    curve.mesh = new THREE.Line(geometry.clone(), new THREE.LineBasicMaterial({
        color: 0x00ff00,
        opacity: 0.35,
        linewidth: 2
    }));
    curve.mesh.castShadow = true;
    splines.centripetal = curve;
    curve = new THREE.CatmullRomCurve3(positions);
    curve.curveType = 'chordal';
    curve.mesh = new THREE.Line(geometry.clone(), new THREE.LineBasicMaterial({
        color: 0x0000ff,
        opacity: 0.35,
        linewidth: 2
    }));
    curve.mesh.castShadow = true;
    splines.chordal = curve;
    for (var k in splines)
    {
        var spline = splines[k];
        scene.add(spline.mesh);
    }
    load([new THREE.Vector3(289.76843686945404, 452.51481137238443, 56.10018915737797),
    new THREE.Vector3(-53.56300074753207, 171.49711742836848, -14.495472686253045),
    new THREE.Vector3(-91.40118730204415, 176.4306956436485, -6.958271935582161),
    new THREE.Vector3(-383.785318791128, 491.1365363371675, 47.869296953772746)]);

}
function addSplineObject(position: any)
{
    var material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
    var object = new THREE.Mesh(geometry, material);
    if (position)
    {
        object.position.copy(position);
    } else
    {
        object.position.x = Math.random() * 1000 - 500;
        object.position.y = Math.random() * 600;
        object.position.z = Math.random() * 800 - 400;
    }
    object.castShadow = true;
    object.receiveShadow = true;
    scene.add(object);
    splineHelperObjects.push(object);
    return object;
}
function addPoint()
{
    splinePointsLength++;
    positions.push(addSplineObject(positions).position);
    updateSplineOutline();
}
function removePoint()
{
    if (splinePointsLength <= 4)
    {
        return;
    }
    splinePointsLength--;
    positions.pop();
    scene.remove(splineHelperObjects.pop());
    updateSplineOutline();
}
function updateSplineOutline()
{
    for (var k in splines)
    {
        var spline = splines[k];
        splineMesh = spline.mesh;
        for (var i = 0; i < ARC_SEGMENTS; i++)
        {
            var p = splineMesh.geometry.vertices[i];
            var t = i / (ARC_SEGMENTS - 1);
            spline.getPoint(t, p);
        }
        splineMesh.geometry.verticesNeedUpdate = true;
    }
}
function exportSpline()
{
    var strplace: any = [];
    for (var i = 0; i < splinePointsLength; i++)
    {
        var p = splineHelperObjects[i].position;
        strplace.push(format('new THREE.Vector3({0}, {1}, {2})', p.x, p.y, p.z))
    }
    console.log(strplace.join(',\n'));
    var code = '[' + (strplace.join(',\n\t')) + ']';
    prompt('copy and paste code', code);
}
function load(new_positions: any)
{
    while (new_positions.length > positions.length)
    {
        addPoint();
    }
    while (new_positions.length < positions.length)
    {
        removePoint();
    }
    for (var i = 0; i < positions.length; i++)
    {
        positions[i].copy(new_positions[i]);
    }
    updateSplineOutline();
}
function animate()
{
    requestAnimationFrame(animate);
    render();
    // stats.update();
    transformControl.update();
}
function render()
{
    splines.uniform.mesh.visible = params.uniform;
    splines.centripetal.mesh.visible = params.centripetal;
    splines.chordal.mesh.visible = params.chordal;
    renderer.render(scene, camera);
}






