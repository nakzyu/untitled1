import React, { useState, useEffect } from "react";

import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Color3,
  AbstractMesh,
  StandardMaterial,
  CannonJSPlugin,
  PhysicsImpostor,
  Mesh,
} from "@babylonjs/core";
import SceneComponent from "./SceneComponent"; // uses above component in same directory
import * as MyCannon from "cannon";

const makeBox = (name: string, size: number, scene: Scene): Mesh => {
  const ran = () => Math.random();
  const box: Mesh = MeshBuilder.CreateBox("box", { size: size }, scene);
  const mat: StandardMaterial = new StandardMaterial(name, scene);
  mat.diffuseColor = new Color3(ran(), ran(), ran());
  box.material = mat;
  box.position = new Vector3(ran(), 10 + ran(), ran());
  box.physicsImpostor = new PhysicsImpostor(
    box,
    PhysicsImpostor.BoxImpostor,
    { mass: 0.5 },
    scene
  );
  return box;
};

const onSceneReady = (scene: Scene) => {
  /* Camera */
  const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  camera.setTarget(Vector3.Zero());
  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);

  /* Light */
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  /* Physics */
  const gravityVector: Vector3 = new Vector3(0, -9.81, 0);
  const physicsPlugin: CannonJSPlugin = new CannonJSPlugin(true, 10, MyCannon);
  scene.enablePhysics(gravityVector, physicsPlugin);

  /* Ground */
  const ground = MeshBuilder.CreateGround("ground", {
    width: 50,
    height: 50,
  });
  ground.physicsImpostor = new PhysicsImpostor(
    ground,
    PhysicsImpostor.BoxImpostor,
    { mass: 0 },
    scene
  );

  /* Objects */
};

let i = 0;

const onRender = (scene: Scene) => {
  if (i < 300) {
    console.log(i);
    makeBox("box1", 0.5, scene);
    i++;
  }
};

export default function MainScene() {
  const [w, setW] = useState(window.innerWidth);
  const [h, setH] = useState(window.innerHeight);

  useEffect(() => {
    const resize = () => {
      setW(window.innerWidth);
      setH(window.innerHeight);
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  });

  return (
    <SceneComponent
      onSceneReady={onSceneReady}
      onRender={onRender}
      width={w}
      height={h}
      id="my-canvas"
    />
  );
}
