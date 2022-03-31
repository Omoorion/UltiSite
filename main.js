import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'
import Stats from 'https://unpkg.com/three@0.126.1/examples/jsm/libs/stats.module.js'
import {GUI} from 'https://unpkg.com/three@0.126.1/examples/jsm/libs/dat.gui.module'
import * as TWEENMAX from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const canvas = document.getElementById("canvas_container")

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild( renderer.domElement );
//new OrbitControls(camera, renderer.domElement) //ROTATES CAMERA, NOT OBJECT, NOT LIGHT
//THEREFORE MUST LIGHT THE BACK OF THE OBJECT TOO IF YOU WANT IT VISIBLE

const loader = new THREE.TextureLoader();
const geometry = new THREE.SphereGeometry(1, 64, 32);
const material = new THREE.MeshBasicMaterial( {map: loader.load('./sources/RickFace.jpg'), } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

camera.position.z = 5;
var position = window.scrollY;

window.addEventListener("resize", () => {
    // Update sizes

    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })

function createVector(x, y, z, camera, width, height) {
    var p = new THREE.Vector3(x, y, z);
    var vector = p.project(camera);

    vector.x = (vector.x + 1) / 2 * width;
    vector.y = -(vector.y - 1) / 2 * height;

    return vector;
}

// function updateSphere(){
//     var scroll = window.scrollY;
//     var ypos = createVector(sphere.position.x, sphere.position.y, sphere.position.z, camera, window.innerWidth, window.innerHeight).y
//     console.log(ypos)
//     if (scroll > position) {
//         sphere.position.y -= 0.175;
//     } 
//     else if (scroll < position) {
//         sphere.position.y += 0.15;
//     }
//     position = scroll;
// }

function animate() {
    requestAnimationFrame( animate );

    sphere.rotation.y += 0.01;
    //updateSphere()
    renderer.render( scene, camera );
};

animate();