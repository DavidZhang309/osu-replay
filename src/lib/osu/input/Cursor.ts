import { ICursor } from './ICursor';

export class Cursor implements ICursor {
  private x: number;
  private y: number;
  private pressed: boolean;

  public constructor() {
    this.update(0, 0, false);
  }

  public update(x: number, y: number, pressed: boolean) {
    this.x = x;
    this.y = y;
    this.pressed = pressed;
  }

  public getX() {
    return this.x;
  }

  public getY() {
    return this.y;
  }

  public isPressed(): boolean {
    return this.pressed;
  }
}
