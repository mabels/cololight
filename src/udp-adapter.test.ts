import { NetSer } from "./net-ser";
import { UDPHeader } from "./udp-header";
import { IdxTypeVal } from "./idx-type-val";
import { PwdParams } from "./pwd-params";
import { UdpAdapter } from "./udp-adapter";

describe("UdpAdapter", () => {
  it("parcelTL1Cmd_set", () => {
    // public static parcelTL1Cmd_set(b: number, j: number, j2: number): Uint8Array {
    expect(
      UdpAdapter.parcelTL1Cmd_set(1, 2, 3)
    ).toEqual(new Uint8Array([
      83,
      90,
      48,
      48,
      0,
      0,
      0,
      0,
      0,
      31,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      4,
      0,
      2,
      1,
      2
     ]));
  });

  it("parcelTL1Cmd_setIdx", () => {
    // public static parcelTL1Cmd_setIdx(idxTypeValArr: IdxTypeVal[]): Uint8Array {
    expect(
      UdpAdapter.parcelTL1Cmd_setIdx([
        {
          idx: 1,
          ty: 3,
          val: 4
        },
        {
          idx: 2,
          ty: 5,
          val: 6
        }
    ])).toEqual(new Uint8Array([
      83,
      90,
      48,
      48,
      0,
      0,
      0,
      0,
      0,
      33,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      4,
      0,
      4,
      1,
      3,
      2,
      5
    ]));
  });

  it("parcelTL1Cmd_setvar", () => {
    // public static parcelTL1Cmd_setvar(b: number, bArr: number[]): Uint8Array {
    expect(
      UdpAdapter.parcelTL1Cmd_setvar(4, [5, 6, 7])
    ).toEqual(new Uint8Array([
      83,
      90,
      48,
      48,
      0,
      0,
      0,
      0,
      0,
      34,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      11,
      0,
      5,
      4,
      0,
      5,
      6,
      7,
    ]));
  });

  it("parcelUDPPacket", () => {
    expect(
      UdpAdapter.parcelUDPPacket(new UDPHeader(), new Uint8Array([1, 2]))
    ).toEqual(
      new Uint8Array([
        83,
        90,
        48,
        48,
        0,
        0,
        0,
        0,
        0,
        18,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        2
      ])
    );
  });

  it("parcelFadeOutMode", () => {
    expect(UdpAdapter.parcelFadeOutMode(true, 1)).toEqual(
      new Uint8Array([
        83,
        90,
        48,
        48,
        0,
        1,
        0,
        0,
        0,
        20,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        4,
        1,
        1
      ])
    );
    expect(UdpAdapter.parcelFadeOutMode(false, 2)).toEqual(
      new Uint8Array([
        83,
        90,
        48,
        48,
        0,
        1,
        0,
        0,
        0,
        20,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        4,
        0,
        2
      ])
    );
  });

  it("parcelLightsRGB", () => {
    expect(UdpAdapter.parcelLightsRGB([], [])).toEqual(
      new Uint8Array([
        83,
        90,
        48,
        48,
        0,
        1,
        0,
        0,
        0,
        18,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        2
      ])
    );

    expect(
      UdpAdapter.parcelLightsRGB(new Array(38).fill(0).map((_, i) => i), [
        1,
        2,
        3
      ])
    ).toEqual(
      new Uint8Array([
        83,
        90,
        48,
        48,
        0,
        1,
        0,
        0,
        0,
        208,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        2,
        238,
        0,
        1,
        2,
        3,
        1,
        19,
        1,
        2,
        3,
        20,
        38,
        1,
        2,
        3,
        39,
        57,
        1,
        2,
        3,
        58,
        76,
        1,
        2,
        3,
        77,
        95,
        1,
        2,
        3,
        96,
        114,
        1,
        2,
        3,
        115,
        133,
        1,
        2,
        3,
        134,
        152,
        1,
        2,
        3,
        153,
        171,
        1,
        2,
        3,
        172,
        190,
        1,
        2,
        3,
        191,
        209,
        1,
        2,
        3,
        210,
        228,
        1,
        2,
        3,
        229,
        247,
        1,
        2,
        3,
        248,
        10,
        1,
        2,
        3,
        11,
        29,
        1,
        2,
        3,
        30,
        48,
        1,
        2,
        3,
        49,
        67,
        1,
        2,
        3,
        68,
        86,
        1,
        2,
        3,
        87,
        105,
        1,
        2,
        3,
        106,
        124,
        1,
        2,
        3,
        125,
        143,
        1,
        2,
        3,
        144,
        162,
        1,
        2,
        3,
        163,
        181,
        1,
        2,
        3,
        182,
        200,
        1,
        2,
        3,
        201,
        219,
        1,
        2,
        3,
        220,
        238,
        1,
        2,
        3,
        239,
        1,
        1,
        2,
        3,
        2,
        20,
        1,
        2,
        3,
        21,
        39,
        1,
        2,
        3,
        40,
        58,
        1,
        2,
        3,
        59,
        77,
        1,
        2,
        3,
        78,
        96,
        1,
        2,
        3,
        97,
        115,
        1,
        2,
        3,
        116,
        134,
        1,
        2,
        3,
        135,
        153,
        1,
        2,
        3,
        154,
        172,
        1,
        2,
        3,
        173,
        191,
        1,
        2,
        3
      ])
    );
  });
});
