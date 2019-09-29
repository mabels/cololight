import { EpCmd } from "./ep-cmd";
import { IdxTypeVal } from "./idx-type-val";
import { DataUtil } from "./data-utils";

export class NetSer {
  private writeBuffer: number[] = [];

  public writeNumber1B(i: number) {
    this.writeBuffer.push(i & 0xff);
  }

  public writeNumber2B(i: number) {
    this.writeBuffer.push((i >> 8) & 0xff);
    this.writeBuffer.push(i & 0xff);
  }

  public writeNumber4B(i: number) {
    this.writeBuffer.push((i >> 24) & 0xff);
    this.writeBuffer.push((i >> 16) & 0xff);
    this.writeBuffer.push((i >> 8) & 0xff);
    this.writeBuffer.push(i & 0xff);
  }

  public writeString(str: string) {
    this.writeBytes(DataUtil.stringToNumberArray(str));
  }

  public writeBytes(bArr: number[]) {
    Array.prototype.push.apply(this.writeBuffer, bArr);
  }

  public writeUint8Array(arr: Uint8Array) {
    for (let i = 0; i < arr.length; ++i) {
      this.writeBuffer.push(arr[i]);
    }
  }

  public writeTL1Cmd_set(
    bArr: undefined | number[],
    bArr2: undefined | number[],
    b: number,
    b2: number,
    j: number,
    j2: number
  ) {
    this.writeBytes(EpCmd.cmd_set(bArr, bArr2, b, b2, j, j2)!.to_blestr());
  }

  public writeTL1Cmd_setIdx(
    bArr: undefined | number[],
    bArr2: undefined | number[],
    b: number,
    idxTypeValArr: IdxTypeVal[]
  ) {
    this.writeBytes(
      EpCmd.cmd_setIdx(bArr, bArr2, b, idxTypeValArr)!.to_blestr()
    );
  }

  public writeTL1Cmd_setvar(
    bArr: undefined | number[],
    bArr2: undefined | number[],
    b: number,
    b2: number,
    b3: number,
    bArr3: number[]
  ) {
    this.writeBytes(
      EpCmd.cmd_setvar(bArr, bArr2, b, b2, b3, bArr3)!.to_blestr()
    );
  }

  public getWriteRawData(): Uint8Array {
    return new Uint8Array(this.writeBuffer);
  }
}
