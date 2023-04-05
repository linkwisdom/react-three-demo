import { useEffect, useRef, useState } from 'react';
import { MeshBasicMaterialProps, useFrame } from '@react-three/fiber';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

var loader = new FontLoader();
let font: Font;

const loadFont = async () => {
  return new Promise((resolve) => {
    if (font) {
      resolve(font);
    }
    loader.load('fonts/helvetiker_regular.typeface.json', (f) => {
      font = f;
      resolve(f);
    });
  });
};

const loadText = async (config: any): Promise<TextGeometry> => {
  const font = await loadFont();
  return new TextGeometry(config.text || '', {
    font: font,
    size: 3.3,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.15,
    bevelSize: 0.3,
    bevelSegments: 2,
    ...config,
  });
};

interface IConfig { [key: string]: string | number | boolean }


export default function TextApp(props: { config: IConfig}) {
  const { config = {} } = props;
  const { color = 'orange' } = config;
  const ref = useRef();
  const [geometry, setGeometry] = useState<TextGeometry>();
  useEffect(() => {
    loadText(config).then((text) => {
      if (text) { 
        setGeometry(text);
      }
    });
  }, [geometry]);

  return (
    <>
      <mesh {...props} scale={1} geometry={geometry}>
        <meshStandardMaterial color={String(color)} />
      </mesh>
    </>
  );
}
