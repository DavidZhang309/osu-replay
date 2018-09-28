import { InputKey } from 'src/lib/osu/InputKey';

export interface ICursorState {
  dt: number;
  x: number;
  y: number;
  pressedKeys: InputKey[];
}
