import { DataUtil } from "./data-utils";

export class TL1def {
  public static readonly CONST_ZEROADDR = [0, 0, 0, 0];
  private _dstId: number[] = TL1def.CONST_ZEROADDR;
  private _srcId: number[] = TL1def.CONST_ZEROADDR;
  private _dummy: number[] = [];
  private _ctag: number = 0;
  private _len: number = 0;
  private _secu: number = 0;
  private _verb: number = 0;

  public set(
    dstId: undefined | number[],
    srcId: undefined | number[],
    verb: number,
    ctag: number,
    dummy: number[]
  ): undefined | TL1def {
    if (!dummy) {
      return undefined;
    }
    if (!dstId) {
      dstId = TL1def.CONST_ZEROADDR;
    }
    this._dstId = dstId;
    if (!srcId) {
      srcId = TL1def.CONST_ZEROADDR;
    }
    this._srcId = srcId;
    this._secu = 0;
    this._verb = verb;
    this._ctag = ctag;
    this._len = dummy.length;
    this._dummy = dummy;
    return this;
  }

  public to_blestr(): number[] {
    const ret = new Array(
      this._dstId.length + this._srcId.length + 4 + this._dummy.length
    );
    DataUtil.arraycopy(this._dstId, 0, ret, 0, this._dstId.length);
    DataUtil.arraycopy(this._srcId, 0, ret, this._dstId.length, this._srcId.length);
    let ofs = this._dstId.length + this._srcId.length;
    ret[ofs++] = this._secu;
    ret[ofs++] = this._verb;
    ret[ofs++] = this._ctag;
    ret[ofs++] = this._len & 255;
    DataUtil.arraycopy(this._dummy, 0, ret, ofs, this._dummy.length);
    return ret;
  }
}
