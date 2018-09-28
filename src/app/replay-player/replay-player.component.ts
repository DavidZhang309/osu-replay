import { Component, AfterViewInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { IReplay } from '../../lib/osu/replay/IReplay';
import { ReplayApplication } from '../../lib/application/ReplayApplication';
import { CanvasRenderer } from '../../lib/display/render/canvas/CanvasRenderer';

@Component({
  selector: 'app-replay-player',
  templateUrl: './replay-player.component.html',
  styleUrls: ['./replay-player.component.css']
})
export class ReplayPlayerComponent implements AfterViewInit {
  @ViewChild('display')
  display: ElementRef;

  private app: ReplayApplication;
  replay: IReplay;

  @HostListener('window:resize', ['$event'])
  resizeWindow() {
    const canvas: HTMLCanvasElement = this.display.nativeElement;
    if (canvas == null) { return; }
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.width * 0.5625;
  }

  constructor() {
  }

  ngAfterViewInit() {
    this.resizeWindow();
    const renderer = new CanvasRenderer(this.display.nativeElement);
    this.app = new ReplayApplication(renderer);
  }

  startReplay(replay: IReplay) {
    this.replay = replay;

    this.app.loadReplay(replay);
  }
}
