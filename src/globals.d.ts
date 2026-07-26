declare global {
  interface Window {
    setup: () => void;
    draw: () => void;
    width: number;
    height: number;
    mouseX: number;
    mouseY: number;
    mouseIsPressed: boolean;
  }
}

export {};