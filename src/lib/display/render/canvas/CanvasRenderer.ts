import { ICanvasRenderCommand } from './ICanvasRenderCommand';

export class CanvasRenderer {
  private renderChain: ICanvasRenderCommand[];

  public constructor(private canvas: HTMLCanvasElement) { }

  public setRenderChain(renderChain: ICanvasRenderCommand[]) {
    this.renderChain = renderChain;
  }

  public draw() {
    const context = this.canvas.getContext('2d');

    // Clear screen
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const command of this.renderChain) {
      command.draw(context);
    }
  }
}
