import type { FC } from 'react';
import { Button } from 'antd';
import 'antd/dist/reset.css';
import './App.css';
import { testText } from '@rxdrag/shared';

const App: FC = () => (
  <div className="App">
    <Button type="primary">Button {testText}</Button>
  </div>
);

export default App;
