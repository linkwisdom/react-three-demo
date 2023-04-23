import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three'
import { useEffect } from 'react';

const Particles = (scene: THREE.Scene) => {
  //创建粒子模型
  var material = new THREE.SpriteMaterial({
    color: '#FFF',
    transparent: true,
    opacity: 0.8,
    vertexColors: true  // 指定粒子颜色
  });

  var n = 1200;
  // 粒子数量
  for (var i = 0; i < 3000; i++) {
    const sprite = new THREE.Sprite(material);
    sprite.position.set((Math.random() - 0.5) * n, (Math.random() - 0.5) * n, (Math.random() - 0.5) * n);
    scene.add(sprite);
  }
  return scene;
}

const renderScene = () => {
  const scene = new THREE.Scene();//创建场景
  // const geometry = new THREE.BoxGeometry(30, 30, 30);//创建物体
  const geometry = new THREE.SphereGeometry(30, 25, 25)


  // 创建一个纹理加载器对象，可以加载图片作为几何体纹理
  var texLoader = new THREE.TextureLoader();
  var earth = texLoader.load('/images/earth.jpg');

  // 创建材质
  const material = new THREE.MeshLambertMaterial({
    color: 'white',
    transparent: true,
    opacity: 0.9,
    map: earth
  });

  // 创建网格模型
  const mesh = new THREE.Mesh(geometry, material);//创建一个网格模型对象
  scene.add(mesh);//网格模型添加到场景中

  // 想要看到物体还需要一个光源，如果没有光源的话，那么我们什么都看不到
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);//添加光源
  const light = new THREE.PointLight(0xffffff, 1);//点光源，color:灯光颜色，intensity:光照强度
  scene.add(ambient);


  light.position.set(200, 200, 200);
  scene.add(light);

  //创建一个透视相机，窗口宽度，窗口高度
  const width = window.innerWidth, height = window.innerHeight;
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 3000)
  camera.position.set(100, 100, 100);//设置相机位置
  camera.lookAt(0, 0, 0);//设置相机方向

  // 创建辅助坐标轴，坐标系大小可以根据场景大小去设置
  // const axesHelper = new THREE.AxesHelper(300);
  // scene.add(axesHelper)

  Particles(scene);

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer();//创建一个WebGL渲染器
  renderer.setSize(width, height);//设置渲染区尺寸
  renderer.render(scene, camera)//执行渲染操作、指定场景、相机作为参数

  const controls = new OrbitControls(camera, renderer.domElement)//创建控件对象
  controls.addEventListener('change', () => {
    renderer.render(scene, camera)//监听鼠标，键盘事件
  })

  const rotage = () => {
    renderer.render(scene, camera); //执行渲染操作
    mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
    requestAnimationFrame(rotage); //请求再次执行渲染函数render，渲染下一帧
  }

  rotage();

  return renderer;
};

const Page = () => {
  useEffect(() => {
    const renderer = renderScene();
    document.getElementById('canvas')?.appendChild(renderer.domElement)
  }, []);
  return (
    <div>
      <div id="canvas"></div>
    </div>
  )
}

export default Page



