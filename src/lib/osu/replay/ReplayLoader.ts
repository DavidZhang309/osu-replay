declare var LZMA: any;
import * as ByteBuffer from 'bytebuffer';

import { IReplay } from './IReplay';
import { ICursorState } from './ICursorState';
import { ILifebarState } from './ILifebarState';
import { GameMode } from '../GameMode';
import { InputKey } from '../InputKey';

export class ReplayLoader {
  private parseLifebar(data: string): ILifebarState[] {
    return data.split(',').filter(comp => comp !== '').map(pair => {
      const [time, amount] = pair.split('|');
      return {
        time: parseInt(time, 10),
        amount: parseFloat(amount)
      };
    });
  }
  private parseCursorData(data: string): ICursorState[] {
    return data.split(',').filter(comp => comp !== '').map(pair => {
      const [dt, x, y, keyMask] = pair.split('|');
      return {
        dt: parseInt(dt, 10),
        x: parseFloat(x),
        y: parseFloat(y),
        pressedKeys: this.parseKeyMask(parseInt(keyMask, 10))
      };
    });
  }
  private parseKeyMask(keyMask: number): InputKey[] {
    const keys = [InputKey.M1, InputKey.M2, InputKey.K1, InputKey.K2, InputKey.Smoke];
    const result = keys.filter((key, index) => (keyMask & Math.pow(2, index)) !== 0);
    return result;
  }

  private readString(buffer: ByteBuffer): string {
    const stringType = buffer.readByte();
    if (stringType === 0) {
      return '';
    } else if (stringType === 11) {
      return buffer.readVString();
    } else {
      throw new Error('Bad string');
    }
  }
  private readLZMA(buffer: ByteBuffer): string {
    const length = buffer.readInt32();
    const data = buffer.readBytes(length);
    return LZMA.decompress(new Uint8Array(data.toArrayBuffer()));
  }
  private async readBinaryFromBlob(blob: Blob): Promise<string> {
    const reader = new FileReader();

    return new Promise<string>(resolve => {
      reader.onloadend = function() {
        resolve(reader.result as string);
      };
      reader.readAsBinaryString(blob);
    });
  }

  public async loadOsr(blob: Blob): Promise<IReplay> {
    const data = await this.readBinaryFromBlob(blob);
    const buffer = ByteBuffer.fromBinary(data, true, false);

    const osr = {
      mode: buffer.readByte() as GameMode,
      version: buffer.readInt32(),
      beatmapHash: this.readString(buffer),
      playerName: this.readString(buffer),
      replayHash: this.readString(buffer),
      hit300: buffer.readShort(),
      hit100: buffer.readShort(),
      hit50: buffer.readShort(),
      hitGeki: buffer.readShort(),
      hitKatus: buffer.readShort(),
      hitMiss: buffer.readShort(),
      score: buffer.readInt32(),
      maxCombo: buffer.readShort(),
      fc: buffer.readByte() === 1,
      modMask: buffer.readInt32(),
      lifebarData: this.parseLifebar(this.readString(buffer)),
      timestamp: buffer.readInt64(),
      cursorData: this.parseCursorData(this.readLZMA(buffer))
    };

    return osr;
  }
}
