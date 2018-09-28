import { IReplay } from '../osu/replay/IReplay';
import { ReplayController } from '../osu/replay/ReplayController';
import { DrawTimer } from '../display/DrawTimer';
import { CanvasRenderer } from '../display/render/canvas/CanvasRenderer';
import { Subscription } from 'rxjs';
import { DebugRenderCommand } from '../display/render/canvas/DebugRenderCommand';
import { CursorRenderCommand } from '../osu/graphics/CursorRenderCommand';

export class ReplayApplication {
  private subscription: Subscription;

  private replayController: ReplayController;
  private timer: DrawTimer;

  public constructor(
    private renderer: CanvasRenderer
  ) {
    this.replayController = new ReplayController();
    this.timer = new DrawTimer();
    this.initialize();
  }

  private initialize() {
    const renderCmds = [
      new CursorRenderCommand(this.replayController.getCursor()),
      new DebugRenderCommand(this.timer),
    ];
    this.renderer.setRenderChain(renderCmds);

    this.subscription = this.timer.onFrame().subscribe((dt) => {
      this.renderer.draw();
    });
    this.timer.start();
  }

  public loadReplay(replay: IReplay) {
    this.replayController.setReplay(replay);
    this.replayController.start();
  }
}
