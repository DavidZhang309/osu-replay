import { ICursor } from '../input/ICursor';
import { Cursor } from '../input/Cursor';
import { IReplay } from './IReplay';

export class ReplayController {
  private replay: IReplay;
  private cursor: Cursor;

  // State information
  private currentTime: number;

  private cursorTimerHandle: number;
  private cursorStateIndex: number;

  public constructor() {
    this.cursor = new Cursor();
  }

  public getCursor(): ICursor {
    return this.cursor;
  }

  public setReplay(replay: IReplay) {
    this.replay = replay;
    this.cursorStateIndex = 0;
    clearTimeout(this.cursorTimerHandle);
  }

  public start() {
    this.updateCursor();
  }

  private prepareNextCursorFrame() {
    this.cursorTimerHandle = setTimeout(() => {
      this.updateCursor();
    }, this.replay.cursorData[this.cursorStateIndex + 1].dt) as number;
  }

  private updateCursor() {
    if (this.cursorStateIndex === this.replay.cursorData.length - 1) { return; }
    const state = this.replay.cursorData[this.cursorStateIndex];
    this.cursor.update(state.x, state.y, state.pressedKeys.length > 0);

    this.cursorStateIndex += 1;
    this.prepareNextCursorFrame();
  }
}
