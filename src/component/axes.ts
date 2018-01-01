import * as THREE from "Three";
import { createLine } from './line';
import { Color } from "Three";
import { View } from "./view";
import { Editor } from './Editor';

export class Axes
{
    m_CenterPoint: THREE.Vector3;
    m_X: THREE.Line;
    m_Y: THREE.Line;
    m_Z: THREE.Line;
    view: View;
    constructor(view: View)
    {
        this.view = view;
        this.CenterPoint = new THREE.Vector3(0, 0, 0);
        this.CreateAxes();
    }
    set CenterPoint(value: THREE.Vector3)
    {
        this.m_CenterPoint = value;
    }
    CreateAxes()
    {
        let red = new THREE.Color("#FF0000");
        this.m_X = this.createLine(red, this.m_CenterPoint, "x");
        let blue = new THREE.Color("#4040BF");
        this.m_Y = this.createLine(blue, this.m_CenterPoint, "y");
        let green = new THREE.Color("#00FF00");
        this.m_Z = this.createLine(green, this.m_CenterPoint, "z");

    }
    createLine(color: THREE.Color, startP: THREE.Vector3, axes: string): THREE.Line
    {
        let material = new THREE.LineBasicMaterial({
            color
        })
        let geometry = new THREE.Geometry();
        let endP = startP.clone();
        if (axes === "x")
        {
            endP.x += 2;
        }
        else if (axes === "y")
        {
            endP.y += 2;

        }
        else if (axes === "z")
        {
            endP.z += 2;

        }
        geometry.vertices.push(startP, endP);
        geometry.verticesNeedUpdate = true;
        let line = new THREE.Line(geometry, material);
        this.view.scene.add(line);
        this.view.Render();
        return line;
    }
}