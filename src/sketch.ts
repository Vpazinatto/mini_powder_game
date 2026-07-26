import { Simulation } from './simulation';
import { Toolbar } from './toolbar';
import { Dirt } from './elements/dirt';
import { Bedrock } from './elements/bedrock';
import { Mud } from './elements/mud';
import { Water } from './elements/water';
import { Lava } from './elements/lava';
import { Steam } from './elements/steam';
import { Fire } from './elements/fire';

const CELL = 4;
let sim: Simulation;
let toolbar: Toolbar;

window.setup = () => {
  createCanvas(800, 600);
  noStroke();

  sim = new Simulation(window.width, window.height, CELL);

  sim.register(new Dirt());
  sim.register(new Bedrock());
  sim.register(new Mud());
  sim.register(new Water());
  sim.register(new Lava());
  sim.register(new Steam());
  sim.register(new Fire());

  toolbar = new Toolbar(sim.elements);
  toolbar.create();
};

window.draw = () => {
  background(25);

  sim.update();
  sim.draw();

  if (window.mouseIsPressed) {
    sim.paint(window.mouseX, window.mouseY, toolbar.currentId, 1);
  }
};
