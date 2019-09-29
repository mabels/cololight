import { TL1def } from "./tl1def";
import { IdxTypeVal } from "./idx-type-val";
import { DataUtil } from "./data-utils";

export class EpCmd {
  public static readonly IOTYPE_BAD = 30;
  public static readonly IOTYPE_MASK_A = 64;
  public static readonly IOTYPE_MASK_ACC = 62;
  public static readonly IOTYPE_MASK_B = 126;
  public static readonly IOTYPE_MASK_DIR = 0;
  public static readonly IOTYPE_TYPE_A = 64;
  public static readonly IOTYPE_TYPE_B = 0;
  public static readonly TL1CMD_AGTINIT = 5;
  public static readonly TL1CMD_AGTOPT = 10;
  public static readonly TL1CMD_EPINFO = 9;
  public static readonly TL1CMD_EPINIT = 8;
  public static readonly TL1CMD_GET = 3;
  public static readonly TL1CMD_GETRSSI = 6;
  public static readonly TL1CMD_HEART = 1;
  public static readonly TL1CMD_RFCFG = 2;
  public static readonly TL1CMD_SET = 4;
  public static readonly TL1CMD_SETEEPROM = 7;
  public static readonly TL1CMD_SETGRP = 12;
  public static readonly TL1CMD_SETVAR = 11;

  public static cmd_set(
    bArr: undefined | number[],
    bArr2: undefined | number[],
    b: number,
    b2: number,
    j: number,
    j2: number
  ): TL1def {
    const bArr3 = [ b2 ];
    const util_io_pack = EpCmd.util_io_pack(bArr3, 1, j, j2) + 1;
    const bArr4 = new Array<number>(util_io_pack);
    DataUtil.arraycopy(bArr3, 0, bArr4, 0, util_io_pack);
    const tL1def = new TL1def();
    tL1def.set(bArr, bArr2, 4, b, bArr4);
    return tL1def;
  }

  public static cmd_setIdx(
    bArr: undefined | number[],
    bArr2: undefined | number[],
    b: number,
    idxTypeValArr?: IdxTypeVal[]
  ): undefined | TL1def {
    if (!idxTypeValArr) {
      return undefined;
    }
    const bArr3 = new Array<number>();
    let i = 0;
    for (let i2 = 0; i2 < idxTypeValArr.length; i2++) {
      let i3 = i + 1;
      bArr3[i] = idxTypeValArr[i2].idx;
      i =
        EpCmd.util_io_pack(
          bArr3,
          i3,
          idxTypeValArr[i2].ty,
          idxTypeValArr[i2].val
        ) + i3;
    }
    const bArr4 = new Array(i);
    // Array.prototype.splice.apply(bArr2, [0, bArr.length].concat(bArr));
    DataUtil.arraycopy(bArr3, 0, bArr4, 0, i);
    const tL1def = new TL1def();
    tL1def.set(bArr, bArr2, 4, b, bArr4);
    return tL1def;
  }

  public static cmd_setvar(
    bArr: undefined | number[],
    bArr2: undefined | number[],
    b: number,
    b2: number,
    b3: number,
    bArr3: number[]
  ): TL1def {
    const bArr4 = new Array(bArr3.length + 2);
    bArr4[0] = b2;
    bArr4[1] = b3;
    DataUtil.arraycopy(bArr3, 0, bArr4, 2, bArr3.length);
    const tL1def = new TL1def();
    tL1def.set(bArr, bArr2, 11, b, bArr4);
    return tL1def;
  }

  public static util_io_pack(
    bArr: number[],
    i: number,
    j: number,
    j2: number
  ): number {
    if (j == 30) {
      bArr[i] = j;
      return 1;
    } else if ((126 & j) === 0) {
      if (j2 != 0) {
        j2 = 1;
      }
      bArr[i] = j | j2;
      return 1;
    } else {
      if ((j & 64) == 64) {
        const i2 = i + 1;
        bArr[i] = j;
        const b = (62 & j) / 2 + 1;
        if (b <= 8) {
          bArr[i2] = j2 & 255;
          return 2;
        } else if (b <= 16) {
          const i3 = i2 + 1;
          bArr[i2] = (j2 >> 8) & 255;
          bArr[i3] = j2 & 255;
          return 3;
        } else if (b <= 24) {
          const i4 = i2 + 1;
          bArr[i2] = (j2 >> 16) & 255;
          const i5 = i4 + 1;
          bArr[i4] = (j2 >> 8) & 255;
          bArr[i5] = j2 & 255;
          return 4;
        } else if (b <= 32) {
          const i6 = i2 + 1;
          bArr[i2] = (j2 >> 24) & 255;
          const i7 = i6 + 1;
          bArr[i6] = (j2 >> 16) & 255;
          const i8 = i7 + 1;
          bArr[i7] = (j2 >> 8) & 255;
          bArr[i8] = j2 & 255;
          return 5;
        } else {
          i = i2;
        }
      }
      bArr[i] = j;
      return 1;
    }
  }
}
