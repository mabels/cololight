import { TL1def } from "./tl1def";
import { IdxTypeVal } from "./idx-type-val";
import { EpCmd } from "./ep-cmd";

describe("ep-cmd", () => {
  it("cmd_set", () => {
    expect(EpCmd.cmd_set([1, 2], [3, 4], 5, 6, 7, 8).to_blestr()).toEqual([
      1,
      2,
      3,
      4,
      0,
      4,
      5,
      2,
      6,
      7
    ]);
  });

  it("cmd_setIdx", () => {
    expect(
      EpCmd.cmd_setIdx([1, 2], [3, 4], 5, [
        {
          idx: 0,
          ty: 1,
          val: 2
        },
        {
          idx: 1,
          ty: 2,
          val: 3
        }
      ])!.to_blestr()
    ).toEqual([1, 2, 3, 4, 0, 4, 5, 4, 0, 1, 1, 2]);
  });

  it("cmd_setvar", () => {
    expect(EpCmd.cmd_setvar([1,2], [3,4], 5, 6, 7, [8, 9]).to_blestr()).toEqual([
      1,
      2,
      3,
      4,
      0,
      11,
      5,
      4,
      6,
      7,
      8,
      9,
    ]);
  });

  it("util_io_pack", () => {
    const out: number[] = [];
    expect(EpCmd.util_io_pack(out, 0, 2, 4)).toBe(1);
    expect(out).toEqual([2]);
  });
});
