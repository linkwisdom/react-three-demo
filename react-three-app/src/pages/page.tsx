import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Text from './Text';
import { useCallback, useEffect, useState } from 'react';
import styles from './page.module.css'
import Login from './login/link';

interface IConfig { [key: string]: string | number | boolean }

interface ControlsProps {
  config: IConfig,
  changeConfig: (c: IConfig) => void,
}

const search = globalThis.location?.search || '';
const params = new URLSearchParams(search);

const defaultConfig: IConfig = {
  text: params.get('name') || '',
  size: 3.3,
  height: 0.2,
  curveSegments: 1,
  bevelEnabled: true,
  bevelThickness: 0.15,
  bevelSize: 0,
  bevelSegments: 0,
};

const properties = [
  { name: 'text', type: 'text', key: 'text', value: defaultConfig.text },
  {
    name: 'size',
    type: 'range',
    key: 'size',
    value: 1,
    min: 0,
    max: 10,
    step: 0.1,
  },
  {
    name: 'height',
    type: 'range',
    key: 'height',
    value: 1,
    min: 0,
    max: 10,
    step: 0.1,
  },
  {
    name: 'curveSegments',
    type: 'range',
    key: 'curveSegments',
    value: 1,
    min: 0,
    step: 0.1,
    max: 10,
  },
  {
    name: 'bevelEnabled',
    type: 'range',
    key: 'bevelEnabled',
    value: 1,
    min: 0,
    step: 0.1,
    max: 10,
  },
  {
    name: 'bevelThickness',
    type: 'range',
    key: 'bevelThickness',
    value: 0,
    min: 0,
    step: 0.1,
    max: 10,
  },
  {
    name: 'bevelSize',
    type: 'range',
    key: 'bevelSize',
    value: 0,
    min: 0,
    step: 0.1,
    max: 10,
  },
  {
    name: 'bevelSegments',
    type: 'range',
    key: 'bevelSegments',
    value: 1,
    min: 0,
    step: 0.1,
    max: 10,
  },
  {
    name: 'color',
    type: 'color',
    key: 'color',
    value: '#FFF',
  },
];


const Controls = ({ config, changeConfig }: ControlsProps) => {
  return (
    <div>
      {properties.map((p) => {
        return (
          <div key={p.key} className="control-item">
            <span className="label">{p.name}</span>
            <input
              type={p.type}
              key={p.key}
              value={String(p.value)}
              max={p.max}
              min={p.min}
              onChange={(e) => {
                const val =
                  p.type === 'range' ? +e.target.value : e.target.value;
                p.value = val;
                config[p.key] = val;
                if (p.step) {
                  config[p.key] = Number(val) * p.step;
                }
                const c: any = Object.assign({}, config);
                changeConfig(c);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default function Index() {
  const [config, changeConfig] = useState<IConfig>(defaultConfig);
  useEffect(() => {
    if (config.text) {
      changeConfig(config);
    }
  }, [config]);
  return (
    <main className={styles.main}>
      <Login></Login>
      <div className={styles.description}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <Text config={config} />
          <OrbitControls />
        </Canvas>
        <Controls config={config} changeConfig={changeConfig} />
      </div>
    </main>
  );
}
