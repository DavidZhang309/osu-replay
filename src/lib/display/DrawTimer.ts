import { Subject, Observable } from 'rxjs';

/**
 * Timer based on requestAnimationFrame API
 */
export class DrawTimer {
  private started: boolean;
  private frameRequestHandle: number;
  private lastDrawTime: number;
  private lastdt: number;

  private frames: Subject<number>;

  public constructor() {
    this.started = false;
    this.lastDrawTime = null;
    this.frameRequestHandle = null;

    this.frames = new Subject();
  }

  /**
   * Starts the draw cycle
   */
  public start() {
    if (this.started) {
      console.warn('DrawTimer', 'Draw cycle already started');
      return;
    }

    this.started = true;
    this.prepareNextFrame(performance.now());
  }

  public end() {
    if (!this.started) {
      console.warn('DrawTimer', 'Draw cycle is not running');
    }

    this.started = false;
    cancelAnimationFrame(this.frameRequestHandle);
  }

  public onFrame(): Observable<number> {
    return this.frames.asObservable();
  }

  public getLastDeltaTime(): number {
    return this.lastdt;
  }

  private prepareNextFrame(currentTime: number) {
    this.lastDrawTime = currentTime;
    this.frameRequestHandle = requestAnimationFrame(timestamp => this.update(timestamp));
  }

  private update(time: number) {
    const dt = time - this.lastDrawTime;

    this.frames.next(dt);

    this.lastdt = dt;
    this.prepareNextFrame(time);
  }
}
