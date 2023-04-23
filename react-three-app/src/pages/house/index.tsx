import { useEffect } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const renderHouse = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer();

  camera.position.set(0, 0, 100);
  camera.lookAt(scene.position);

  renderer.setSize(width, height);

  function create() {
    let urls = [
      '/img/home.left.jpg',
      '/img/home.right.jpg',
      '/img/home.top.jpg',
      '/img/home.bottom.jpg',
      '/img/home.front.jpg',
      '/img/home.back.jpg'
    ];
    let cubeTexture = new THREE.CubeTextureLoader().load(urls);
    scene.background = cubeTexture;
  }

  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
  create();
  const controls = new OrbitControls(camera, renderer.domElement);
  return renderer;
}

const Page = () => {
  useEffect(() => {
    const renderer = renderHouse();
    document.getElementById('canvas')?.appendChild(renderer.domElement)
  }, []);
  return (
    <div>
      <div id="canvas"></div>
    </div>
  )
}

export default Page;