export class DataUtil {
  public static loopXOr(
    iArr: number[],
    i: number,
    iArr2: number[],
    i2: number,
    i3: number,
    i4: number
  ): number[] {
    if (i3 < 1) {
      i3 = 1;
    }
    if (i4 <= i) {
      i = i4;
    }
    if (i3 > i) {
      throw new Error("i3 must bigger then i");
    }
    const ret = new Array(i - i3 + 1);
    let i5 = 0;
    let i6 = 0;
    let i7 = 0;
    while (i3 <= i) {
      const i8 = i3 - 1;
      ret[i8] = iArr[i8] ^ iArr2[i5];
      i5++;
      i6++;
      if (i5 >= i2) {
        i5 = 0;
      }
      if (i6 >= i2) {
        i7 = (i7 + iArr2[i5]) % i2;
        i5 = i7;
        i6 = 0;
      }
      i3++;
    }
    return ret;
  }

  public static getUnsignedByte(
    bArr: number | number[] | Uint8Array
  ): number[] {
    if (!(Array.isArray(bArr) || bArr instanceof Uint8Array)) {
      return [bArr & 255];
    }
    return (new Array<number>(bArr.length)).fill(0).map((_, idx) => bArr[idx] & 255);
  }

  public static stringToNumberArray(str: string) {
    const utf8 = unescape(encodeURIComponent(str));
    return utf8.split("").map((_, i) => utf8.charCodeAt(i));
  }

  /*
   * static void arraycopy(Object src, int srcPos, Object dest, int destPos, int length)
   * Copies an array from the specified source array,
   * beginning at the specified position, to the specified position of the destination array.
   */
  public static arraycopy(
    src: number[],
    srcPos: number,
    dest: number[],
    destPos: number,
    length: number
  ) {
    Array.prototype.splice.apply(
      dest,
      [destPos, length].concat(src.slice(srcPos)) as any
    );
  }
}
