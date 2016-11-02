var scene = new THREE.Scene();
var canvas;
var renderer;

function initRenderer() {
  // canvasの挿入先要素を取得
  canvas = document.getElementById('canvas-frame');
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: 1.0 });
  renderer.setClearColor(0x000000, 1.0);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  canvas.appendChild(renderer.domElement);
}

var camera;
function initCamera() {
  // カメラ生成(fov, aspect, near, far)
  camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 1, 2000);
  // カメラの位置座標(x, y, z)
  camera.position.set(0, 300, -800);
  // カメラのベクトル設定(x, y, z)
  camera.up.set(0, 1, 0);
  // カメラの中心座標設定(x, y, z)
  camera.lookAt({ x: 0, y: 0, z: 0 });
}

function initLight() {
  var _directionalLight;
  var _ambientLight

  // 平行光源生成(hex, 光源強度)
  _directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
  // 平行光源の位置座標(x, y, z)
  _directionalLight.position.set(400, 200, -800);
  // 平行光源をシーンへ追加
  scene.add(_directionalLight);

  // 環境光生成(hex)
  _ambientLight = new THREE.AmbientLight(0x999999);
  // 環境光をシーンへ追加
  scene.add(_ambientLight);
}
var cube;
function createCube() {
  var _geometry;
  var _material;

  // 形状オブジェクトを生成(width, height, depth)
  _geometry = new THREE.CubeGeometry(100, 100, 100);
  // 材質オブジェクト生成
  _material = new THREE.MeshPhongMaterial({
         color: 0x0000ff,
         wireframe:true
      });
  // 立方体オブジェクト生成
  cube = new THREE.Mesh(_geometry, _material);
  cube.rotation.set(45 * Math.PI /180, 135 * Math.PI /180, 0);
  // 立方体オブジェクトをシーンに追加
  scene.add(cube);
}

cube_step = 0;
function rotateCube() {
  cube_step += 0.02;
  // Y軸を中心にクリスタルを回転させる
  //cube.rotation.set(55 * Math.PI /180, 45 * Math.PI /180 + cube_step, cube_step);
  var quaternion = cube.quaternion;
  var target = new THREE.Quaternion();
  var axis = new THREE.Vector3(1, 1, 1).normalize();
  target.setFromAxisAngle(axis, 1 * Math.PI / 180);

  // 3. 回転させる
  cube.quaternion = quaternion.multiply(target);
}

function draw() {
  // レンダリング

  rotateCube();
  renderer.render(scene, camera);
  requestAnimationFrame(draw);
}

window.onload = function() {
  // initRendererは一番最初に呼び出す
  initRenderer();

  initCamera();
  initLight();
  createCube();
  draw();
}
