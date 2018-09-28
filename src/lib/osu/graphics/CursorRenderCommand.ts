import { ICanvasRenderCommand } from 'src/lib/display/render/canvas/ICanvasRenderCommand';
import { IReplay } from 'src/lib/osu/replay/IReplay';
import { ICursor } from '../input/ICursor';

export class CursorRenderCommand implements ICanvasRenderCommand {
  static W = 512;
  static H = 384;

  // TODO: use skin instead of circle
  static CURSOR_RADIUS = 16;

  public constructor(private cursor: ICursor) { }

  public draw(context: CanvasRenderingContext2D) {
    const canvas = context.canvas;
    const scaleX = canvas.width / CursorRenderCommand.W;
    const scaleY = canvas.height / CursorRenderCommand.H;
    const centerX = this.cursor.getX() * scaleX;
    const centerY = this.cursor.getY() * scaleY;
    const radius = CursorRenderCommand.CURSOR_RADIUS * (this.cursor.isPressed() ? .5 : 1);

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'red';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();
  }
}
