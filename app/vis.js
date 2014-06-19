/* global THREE, Dancer */


(function() {

  // init dancer stuff
  // [eventually will power cool visualization stuff]
  var dancer = new Dancer();
  var a = new Audio();
  a.src = 'data/make_a_move.mp3';
  dancer.load(a);

  dancer.bind('loaded', function() {
    dancer.play();
  });


  var Floor = function() {
    this.tex = THREE.ImageUtils.loadTexture('./data/checkerboard.png');
    this.tex.wrapS = THREE.RepeatWrapping;
    this.tex.wrapT = THREE.RepeatWrapping;
    this.tex.repeat.set(10, 10);

    var geom = new THREE.BoxGeometry(5,5,4);
    var mat = new THREE.MeshBasicMaterial({ map: this.tex });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.position.y = -1;
  };

  Floor.prototype.update = function() {
    this.tex.offset.add({x: 0, y: 0.01});
  };


  // bootstrap a scene and a static camera
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.rotation.x = 1.5;
  camera.position.y = -4;
  camera.position.z = 2.5;

  var renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });

  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // create the floor
  var floor = new Floor();
  scene.add(floor.mesh);

  function render() {
    requestAnimationFrame(render);
    floor.update();
    renderer.render(scene, camera);
  }
  render();

})();
