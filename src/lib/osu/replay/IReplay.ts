import { ILifebarState } from 'src/lib/osu/replay/ILifebarState';
import { ICursorState } from 'src/lib/osu/replay/ICursorState';

export interface IReplay {
  playerName: string;
  beatmapHash: string;
  lifebarData: ILifebarState[];
  cursorData: ICursorState[];
}
