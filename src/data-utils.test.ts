import { DataUtil } from "./data-utils";

describe("data-utils", () => {
  it("loopXOr", () => {
    expect(DataUtil.loopXOr([], 3, [], 2, 1, 4)).toEqual([0, 0, 0]);
    expect(DataUtil.loopXOr([0, 1, 2, 3, 4, 7], 6, [8, 9], 5, 1, 10)).toEqual([
      8,
      8,
      2,
      3,
      4,
      7
    ]);
  });

  it("getUnsignedByte", () => {
    expect(DataUtil.getUnsignedByte(25)).toEqual([25]);
    expect(DataUtil.getUnsignedByte(257)).toEqual([1]);
    expect(DataUtil.getUnsignedByte([])).toEqual([]);
    expect(DataUtil.getUnsignedByte([25, 257])).toEqual([25, 1]);
    expect(DataUtil.getUnsignedByte(new Uint8Array([25, 257]))).toEqual([
      25,
      1
    ]);
  });

  it("stringToNumberArray", () => {
    expect(DataUtil.stringToNumberArray("")).toEqual([]);
    expect(DataUtil.stringToNumberArray("test")).toEqual([116, 101, 115, 116]);
    expect(DataUtil.stringToNumberArray("tößt")).toEqual([
      116,
      195,
      182,
      195,
      159,
      116
    ]);
  });

  it("arraycopy", () => {
    const dst: number[] = [];
    DataUtil.arraycopy([], 0, dst, 0, 0);
    expect(dst).toEqual([]);
    DataUtil.arraycopy([1, 2, 3], 0, dst, 0, 0);
    expect(dst).toEqual([1, 2, 3]);
    DataUtil.arraycopy([9, 7, 8], 1, dst, 1, 2);
    expect(dst).toEqual([1, 7, 8]);
  });
});
