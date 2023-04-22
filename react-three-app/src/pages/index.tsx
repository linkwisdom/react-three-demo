import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Text from './Text';
import { useEffect, useState } from 'react';
import styles from './page.module.css'
import Login from './login/link';
import Controller from '../components/Controller';
import { defaultConfig } from '../config/config';

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
      <div className={styles.content}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <Text config={config} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <OrbitControls />
        </Canvas>
        <Controller config={config} changeConfig={changeConfig} />
      </div>
    </main>
  );
}
