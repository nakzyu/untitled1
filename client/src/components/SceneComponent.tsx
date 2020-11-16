import { Engine, Scene } from "@babylonjs/core";
import React, { useEffect, useRef, useState } from "react";

interface props {
  onRender: any;
  onSceneReady: any;
  id: string;
  width: number;
  height: number;
}

export default function SceneComponent({
  onRender,
  onSceneReady,
  id,
  width,
  height,
}: props) {
  const reactCanvas = useRef(null);

  useEffect(() => {
    if (reactCanvas.current) {
      const engine: Engine = new Engine(reactCanvas.current);
      const scene: Scene = new Scene(engine);

      if (scene.isReady()) {
        onSceneReady(scene);
      } else {
        scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
      }
      engine.runRenderLoop(() => {
        if (typeof onRender === "function") {
          onRender(scene);
        }

        scene.render();
      });

      return () => {
        scene.getEngine().dispose();
      };
    }
  }, [reactCanvas, onRender, onSceneReady]);
  return <canvas ref={reactCanvas} id={id} width={width} height={height} />;
}
