import * as THREE from "Three";
export function createLine()
{
    let mouseX = 0, mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    const SEPARATION = 200;
    const AMOUNTX = 10;
    const AMOUNTY = 10;
    let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.CanvasRenderer;
    function init()
    {
        //创建节点
        let separation = 100;
        let amountX = 50;
        let amountY = 50;
        let particles, particle;
        let container = document.createElement('div');
        //创建相机
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 100;
        //创建场景
        scene = new THREE.Scene();

        //创建渲染器
        renderer = new THREE.CanvasRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        renderer.render(scene, camera);

        //particles 粒子

        const PI2 = Math.PI * 2;
        //材质
        let material = new THREE.SpriteCanvasMaterial({
            color: 0xffffff,
            program: function (context)
            {
                context.beginPath();
                context.arc(0, 0, 0.5, 0, PI2, true);//描圆
                context.fill();
            }
        })
        //创建几何体
        let geometry = new THREE.Geometry();
        for (let i = 0; i < 100; i++)
        {
            particle = new THREE.Sprite(material);
            particle.position.x = Math.random() * 2 - 1;
            particle.position.y = Math.random() * 2 - 1;
            particle.position.z = Math.random() * 2 - 1;
            particle.position.normalize();
            particle.position.multiplyScalar(Math.random() * 10 + 450);
            particle.scale.x = particle.scale.y = 10;
            scene.add(particle);
            geometry.vertices.push(particle.position);
        }

        //line
        let line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
            color: 0xffffff,
            opacity: 0.5
        }));
        scene.add(line);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('touchstart', onDocumentTouchStart, false);
        document.addEventListener('touchmove', onDocumentTouchMove, false);
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize()
    {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onDocumentMouseMove(event: MouseEvent)
    {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
    }
    function onDocumentTouchStart(event: TouchEvent)
    {
        if (event.touches.length > 1)
        {
            event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    }
    function onDocumentTouchMove(event: TouchEvent)
    {
        console.log(event)
        if (event.touches.length == 1)
        {
            event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    }
    function animate()
    {
        requestAnimationFrame(animate);
        render();
    }
    function render()
    {
        camera.position.x += (mouseX - camera.position.x) * .05;
        camera.position.y += (- mouseY + 200 - camera.position.y) * .05;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }

    init();
    animate();
}

