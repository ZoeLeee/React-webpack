import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as THREE from 'Three';

import { DrawLine } from './component/drawLine';

import './component/editorLine';
// createLine();




ReactDOM.render(
    <DrawLine />,
    document.getElementById("example")
);