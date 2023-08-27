import React, { useRef, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const ThreeModel = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(1, 1, 1); // 조명 위치 설정
      light.color.setHex(0xffffff); // 흰색 조명
      light.intensity = 1; // 강도 설정
      light.castShadow = true; // 조명이 그림자 생성
      renderer.setSize(window.innerWidth, window.innerHeight);
      sceneRef.current.appendChild(renderer.domElement);

      const loader = new GLTFLoader();
      loader.load('/scene.gltf', (gltf) => {
        const model = gltf.scene;
        const texturePath = '/textures/wallpaper.png';
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(texturePath);

        model.traverse((child) => {
          if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial({ map: texture });
          }
      });
      scene.add(model);
      scene.add(light);

      camera.position.z = 5;

      const animate = () => {
        requestAnimationFrame(animate);

        // 모델 회전 등의 애니메이션 작업
        model.rotation.x += 0.005;
        model.rotation.y += 0.005;

        renderer.render(scene, camera);
      };

      animate();
    });
  }, []);

  return (
    <div ref={sceneRef}></div>
  );
};

export default ThreeModel;