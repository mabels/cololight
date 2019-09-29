import { EpCmd } from "./ep-cmd";
import { IdxTypeVal } from "./idx-type-val";
import { NetSer } from "./net-ser";

describe("NetSer", () => {
  it("writeNumber1B", () => {
    const ns = new NetSer();
    ns.writeNumber1B(7);
    ns.writeNumber1B(8);
    expect(ns.getWriteRawData()).toEqual(new Uint8Array([7, 8]));
  });

  it("writeNumber2B", () => {
    const ns = new NetSer();
    ns.writeNumber2B(0x4711);
    ns.writeNumber2B(0x1147);
    expect(ns.getWriteRawData()).toEqual(
      new Uint8Array([0x47, 0x11, 0x11, 0x47])
    );
  });

  it("writeNumber4B", () => {
    const ns = new NetSer();
    ns.writeNumber4B(0x47111147);
    ns.writeNumber4B(0x41177114);
    expect(ns.getWriteRawData()).toEqual(
      new Uint8Array([0x47, 0x11, 0x11, 0x47, 0x41, 0x17, 0x71, 0x14])
    );
  });

  it("writeString", () => {
    const ns = new NetSer();
    ns.writeString("");
    ns.writeString("[");
    ns.writeString("tößt");
    ns.writeString("]");
    expect(ns.getWriteRawData()).toEqual(
      new Uint8Array([91, 116, 195, 182, 195, 159, 116, 93])
    );
  });

  it("writeBytes", () => {
    const ns = new NetSer();
    ns.writeBytes([47, 11, 11, 47]);
    ns.writeBytes([88, 12, 12, 88]);
    expect(ns.getWriteRawData()).toEqual(
      new Uint8Array([47, 11, 11, 47, 88, 12, 12, 88])
    );
  });

  it("writeUint8Array", () => {
    const ns = new NetSer();
    ns.writeUint8Array(new Uint8Array([47, 11, 11, 47]));
    ns.writeUint8Array(new Uint8Array([88, 12, 12, 88]));
    expect(ns.getWriteRawData()).toEqual(
      new Uint8Array([47, 11, 11, 47, 88, 12, 12, 88])
    );
  });

  it("writeTL1Cmd_set", () => {
    const ns = new NetSer();
    ns.writeTL1Cmd_set([1, 2], [3, 4], 5, 6, 7, 8);
    expect(ns.getWriteRawData()).toEqual(
      new Uint8Array([1, 2, 3, 4, 0, 4, 5, 2, 6, 7])
    );
  });

  it("writeTL1Cmd_setIdx", () => {
    const ns = new NetSer();
    ns.writeTL1Cmd_setIdx([1, 2], [3, 4], 5, [
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
      ]);
    expect(ns.getWriteRawData()).toEqual(
      new Uint8Array([1, 2, 3, 4, 0, 4, 5, 4, 0, 1, 1, 2])
    );
  });

  it("writeTL1Cmd_setvar", () => {
    const ns = new NetSer();
    ns.writeTL1Cmd_setvar([1,2], [3,4], 5, 6, 7, [8, 9]);
    expect(ns.getWriteRawData()).toEqual(
      new Uint8Array([
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
    ]));
  });

  it("getWriteRawData", () => {
    const ns = new NetSer();
    expect(ns.getWriteRawData()).toEqual(new Uint8Array([]));
  });
});
