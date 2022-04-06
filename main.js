import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.querySelector('.webgl')
//const scene = new THREE.Scene()
var scene = new THREE.Scene(); // initialising the scene
scene.background = new THREE.Color( 0xffff00 );

const loader = new GLTFLoader();
loader.load('wraith.glb', function(glb) {
        console.log(glb);
        const root = glb.scene;
        root.scale.set(0.03, 0.03, 0.03);
        scene.add(root);
    })


const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2,2,5);
scene.add(light);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
//camera.position.set(2,2,2)
camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(0, 0, 0);

scene.add(camera)

const renderer = new THREE.WebGLRenderer({
   canvas: canvas
   //alpha : true 
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.gammaOutput = true

var controls = new OrbitControls(camera, renderer.domElement);
controls.update();


function animate(){
   requestAnimationFrame(animate);
   renderer.render(scene, camera);
   controls.update();
}

animate();

    