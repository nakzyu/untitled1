import React, { useState, useEffect } from "react";

import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Mesh,
} from "@babylonjs/core";
import SceneComponent from "./SceneComponent"; // uses above component in same directory

const onSceneReady = (scene: Scene) => {
  /* Camera */
  const camera: FreeCamera = new FreeCamera(
    "camera1",
    new Vector3(0, 5, -10),
    scene
  );
  camera.setTarget(Vector3.Zero());
  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);

  /* Light */
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  /* Objects */
  const box: Mesh = MeshBuilder.CreateBox("box", { size: 2 }, scene);
};

const onRender = (scene: Scene) => {};

export default function MainScene() {
  const [w, setW] = useState<number>(window.innerWidth);
  const [h, setH] = useState<number>(window.innerHeight);

  useEffect(() => {
    const resize = (): void => {
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
