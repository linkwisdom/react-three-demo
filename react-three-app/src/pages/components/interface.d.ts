interface IConfig {
  [key: string]: string | number | boolean;
}

interface ControlsProps {
  config: IConfig;
  changeConfig: (c: IConfig) => void;
}
