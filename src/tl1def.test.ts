import { TL1def } from "./tl1def";

describe("TL1def", () => {
  it("to_blestr set", () => {
    const tl1 = new TL1def();
    tl1.set([1, 2], [3, 4], 5, 6, [7, 8, 9]);
    expect(tl1.to_blestr()).toEqual([1, 2, 3, 4, 0, 5, 6, 3, 7, 8, 9]);
  });  
  
  it("to_blestr default", () => {
    const tl1 = new TL1def();
    tl1.set(undefined, undefined, 5, 6, [7, 8, 9]);
    expect(tl1.to_blestr()).toEqual([
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 5, 6, 3, 7, 8, 9]);
  });

  it("to_blestr unset", () => {
    const tl1 = new TL1def();
    expect(tl1.to_blestr()).toEqual([
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0
    ]);
  });
});
