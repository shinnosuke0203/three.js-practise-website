window.addEventListener("load", init);

function init () {
    const width = 960;
    const height = 540;
    let rot = 0;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#myCanvas"),
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    const geometry = new THREE.SphereGeometry(300, 30, 30);
    const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load("images/earthmap1k.jpg"),
    });

    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.9);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight( 0xffffff, 2, 1000 );
    scene.add(pointLight);

    const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
    scene.add(pointLightHelper);

    createStarField();

    function createStarField() {
        const vertices = [];
        for(let i = 0; i < 500; i++) {
            const x = 3000 * (Math.random() - 0.5);
            const y = 3000 * (Math.random() - 0.5);
            const z = 3000 * (Math.random() - 0.5);

            vertices.push(x, y, z);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(vertices, 3)
        );

        const material = new THREE.PointsMaterial ({
            size:8,
            color: 0xffffff,
        });

        const stars = new THREE.Points(geometry, material);
        scene.add(stars);
    }

    function tick() {
        rot += 0.2;

        const radian = (rot * Math.PI) / 180;
        camera.position.x = 1000 * Math.sin(radian);
        camera.position.z = 2000 * Math.cos(radian);
        camera.lookAt(new THREE.Vector3(0, 0, -400))

        pointLight.position.set(500 * Math.sin(Date.now() / 500),
        500 * Math.sin(Date.now() / 1000),
        500 * Math.cos(Date.now() / 500)
        )

        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }

    tick();
};