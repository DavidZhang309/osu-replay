import { Component, EventEmitter, Output } from '@angular/core';
import { IReplay } from '../../lib/osu/replay/IReplay';
import { ReplayLoader } from '../../lib/osu/replay/ReplayLoader';

@Component({
  selector: 'app-replay-select',
  templateUrl: './replay-select.component.html',
  styleUrls: ['./replay-select.component.css']
})
export class ReplaySelectComponent {
  private replayLoader: ReplayLoader;
  public replay: IReplay;
  @Output()
  public replaySelect: EventEmitter<IReplay>;

  constructor() {
    this.replayLoader = new ReplayLoader();
    this.replaySelect = new EventEmitter();
  }

  public async loadReplay(list: FileList) {
    if (list == null || list.length === 0) {
      return;
    }
    const blob: Blob = list.item(0);

    this.replay = await this.replayLoader.loadOsr(blob);
    console.log(this.replay);
    this.replaySelect.emit(this.replay);
  }
}
