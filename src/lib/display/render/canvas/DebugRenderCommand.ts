import { ICanvasRenderCommand } from './ICanvasRenderCommand';
import { DrawTimer } from '../../DrawTimer';

export class DebugRenderCommand implements ICanvasRenderCommand {
  public constructor (private timer: DrawTimer) { }

  draw(context: CanvasRenderingContext2D) {
    context.font = '12px Arial';
    context.fillStyle = 'green';
    context.fillText(`${ (1000 / this.timer.getLastDeltaTime()).toFixed(0) } fps`, 0, 12);
  }
}
