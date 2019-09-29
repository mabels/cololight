import { NetSer } from "./net-ser";
import { UDPHeader } from "./udp-header";
import { IdxTypeVal } from "./idx-type-val";
import { PwdParams } from "./pwd-params";
import { DataUtil } from "./data-utils";

export class UdpAdapter {
  public static parcelTL1Cmd_set(b: number, j: number, j2: number): Uint8Array {
    const netSer = new NetSer();
    netSer.writeNumber1B(0);
    netSer.writeTL1Cmd_set(undefined, undefined, 0, b, j, j2);
    return this.parcelUDPPacket(undefined, netSer.getWriteRawData());
  }

  public static parcelTL1Cmd_setIdx(idxTypeValArr: IdxTypeVal[]): Uint8Array {
    const netSer = new NetSer();
    netSer.writeNumber1B(0);
    netSer.writeTL1Cmd_setIdx(undefined, undefined, 0, idxTypeValArr);
    return this.parcelUDPPacket(undefined, netSer.getWriteRawData());
  }

  public static parcelTL1Cmd_setvar(b: number, bArr: number[]): Uint8Array {
    const netSer = new NetSer();
    netSer.writeNumber1B(0);
    netSer.writeTL1Cmd_setvar(undefined, undefined, 0, b, 0, bArr);
    return this.parcelUDPPacket(undefined, netSer.getWriteRawData());
  }

  public static parcelUDPPacket(
    uDPHeader: undefined | UDPHeader,
    bArr: Uint8Array,
    pwdParams?: PwdParams
  ): Uint8Array {
    const bArr2 = bArr;
    const pwdParams2 = pwdParams;
    const uDPHeader2 = !uDPHeader ? new UDPHeader() : uDPHeader;
    const netSer = new NetSer();
    netSer.writeBytes(uDPHeader2.tag);
    netSer.writeBytes(uDPHeader2.ver);
    netSer.writeNumber2B(uDPHeader2.appid);
    if (pwdParams2 != undefined) {
      const str = pwdParams2.pwd;
      const i = pwdParams2.salt;
      pwdParams2.secuSN++;
      const netSer2 = new NetSer();
      netSer2.writeNumber4B(i);
      netSer2.writeNumber4B(pwdParams2.secuSN);
      netSer2.writeUint8Array(bArr2);
      const writeRawData = netSer2.getWriteRawData();
      let i2 = 0;
      for (let b of writeRawData) {
        i2 += b & 255;
      }
      const iArr = new Array(4);
      // let nextInt = new Random().nextInt(ActivityChooserViewAdapter.MAX_ACTIVITY_COUNT_UNLIMITED);
      let nextInt = ~~(Math.random() * Math.pow(2, 32));
      for (let i3 = 0; i3 < 4; i3++) {
        iArr[3 - i3] = nextInt & 255;
        nextInt >>= 8;
      }
      const bytes = DataUtil.stringToNumberArray(str);
      const loopXOr = DataUtil.loopXOr(
        DataUtil.getUnsignedByte(bytes),
        bytes.length,
        iArr,
        4,
        1,
        bytes.length
      );
      const loopXOr2 = DataUtil.loopXOr(
        DataUtil.getUnsignedByte(writeRawData),
        writeRawData.length,
        loopXOr,
        loopXOr.length,
        1,
        writeRawData.length
      );
      const netSer3 = new NetSer();
      for (let writeNumber1B of iArr) {
        netSer3.writeNumber1B(writeNumber1B);
      }
      netSer3.writeNumber4B(i2);
      for (let writeNumber1B2 of loopXOr2) {
        netSer3.writeNumber1B(writeNumber1B2);
      }
      const writeRawData2 = netSer3.getWriteRawData();
      netSer.writeNumber4B(writeRawData2.length);
      netSer.writeUint8Array(writeRawData2);
    } else {
      const bArr3 = new Array(16).fill(0);
      netSer.writeNumber4B(bArr2.length + bArr3.length);
      netSer.writeBytes(bArr3);
      netSer.writeUint8Array(bArr2);
    }
    return netSer.getWriteRawData();
  }

  public static parcelFadeOutMode(
    z: boolean,
    i: number,
    pwdParams?: PwdParams
  ): Uint8Array {
    const uDPHeader = new UDPHeader();
    uDPHeader.appid = 1;
    const netSer = new NetSer();
    netSer.writeNumber1B(0);
    netSer.writeNumber1B(4);
    netSer.writeNumber1B(z ? 1 : 0);
    netSer.writeNumber1B(i);
    return this.parcelUDPPacket(uDPHeader, netSer.getWriteRawData(), pwdParams);
  }

  public static parcelLightsRGB(
    arrayList: number[],
    rgb: number[],
    pwdParams?: PwdParams
  ): Uint8Array {
    const uDPHeader = new UDPHeader();
    uDPHeader.appid = 1;
    const netSer = new NetSer();
    netSer.writeNumber1B(0);
    netSer.writeNumber1B(2);
    for (let i = 0; i < arrayList.length; i++) {
      const intValue = arrayList[i]; // ((Integer) arrayList.get(i)).intValue();
      netSer.writeNumber1B((intValue - 1) * 19 + 1);
      netSer.writeNumber1B(intValue * 19);
      netSer.writeNumber1B(rgb[0]);
      netSer.writeNumber1B(rgb[1]);
      netSer.writeNumber1B(rgb[2]);
    }
    return this.parcelUDPPacket(uDPHeader, netSer.getWriteRawData(), pwdParams);
  }
}
