import { useCallback, useEffect, useReducer } from "react";
import { properties } from "../config/config";

const CHANGE_CONFIG = 'change_controller_config';
const UNDO_CONFIG = 'undo_controller_config';
const REDO_CONFIG = 'redo_controller_config';
// const MAX_STACK_SIZE = 20;

const actionStack: IConfig[] = [];
const historyStack: IConfig[] = [];

// todo 引入immutable/immerjs 优化属性变更的结构复用；当前采用简单对象拷贝方式解决
// 版本管理；使用LRU限制状态容量大小；
const reducer = (state: any, action: { type: string, updator?: Object }) => {
  switch (action.type) {
    case CHANGE_CONFIG: {
      const newStates = Object.assign({}, state, action.updator);
      actionStack.push(newStates);
      return newStates;
    }
    case REDO_CONFIG: {
      let newStates = historyStack.pop();
      while (newStates && newStates == state && historyStack.length > 0) {
        newStates = historyStack.pop();
      }
      if (newStates) {
        actionStack.push(newStates);
        return Object.assign({}, newStates);
      }
      return state;
    }
    case UNDO_CONFIG: {
      let newStates = actionStack.pop();
      while (newStates && newStates == state && actionStack.length > 0) {
        newStates = actionStack.pop();
      }
      if (newStates) {
        historyStack.push(newStates);
        return Object.assign({}, newStates);
      }
      return state;
    }
    default: {
      return state;
    }
  }
}

const bindKeyPress = (callback: any) => {
  document.body.addEventListener('keypress', callback);
}


const Controller = ({ config, changeConfig }: ControlsProps) => {
  const [states, changeStates] = useReducer(reducer, config);
  const undo = useCallback(() => {
    changeStates({ type: UNDO_CONFIG });
  }, []);

  const redo = useCallback(() => {
    changeStates({ type: REDO_CONFIG });
  }, []);

  const onKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && e.code === 'KeyZ') {
      undo();
    } else if (e.ctrlKey && e.code === 'KeyY') {
      redo();
    }
  }, [redo, undo]);

  useEffect(() => {
    bindKeyPress(onKeyPress);
    changeStates({ type: CHANGE_CONFIG, updator: config });
  }, [config, onKeyPress]);

  useEffect(() => {
    changeConfig(states);
  }, [states, changeConfig]);

  return (
    <div className="controller">
      <div className="tools">
        <button onClick={undo}>undo</button>
        <button onClick={redo}>redo</button>
      </div>
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
                const updator = Object.create(null)
                if (p.step) {
                  updator[p.key] = Number(val) * p.step;
                } else {
                  updator[p.key] = val;
                }
                changeStates({ type: CHANGE_CONFIG, updator });
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Controller;