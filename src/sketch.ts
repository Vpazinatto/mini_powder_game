/// <reference types="p5/global" />
import { Simulation } from './simulation';
import { Toolbar } from './toolbar';
import { Dirt } from './elements/dirt';
import { Mud } from './elements/mud';
import { Water } from './elements/water';
import { Steam } from './elements/steam';
import { Fire } from './elements/fire';

const CELL = 4;
let sim: Simulation;
let toolbar: Toolbar;

(window as any).setup = () => {
  createCanvas(800, 600);
  noStroke();

  sim = new Simulation((window as any).width, (window as any).height, CELL);

  sim.register(new Dirt());
  sim.register(new Mud());
  sim.register(new Water());
  sim.register(new Steam());
  sim.register(new Fire());

  toolbar = new Toolbar(sim.elements as any);
  toolbar.create();
};

(window as any).draw = () => {
  background(25);

  sim.update();
  sim.draw();

  if ((window as any).mouseIsPressed) {
    sim.paint((window as any).mouseX, (window as any).mouseY, toolbar.currentId, 2);
  }
};
