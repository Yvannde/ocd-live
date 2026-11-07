import QRCode from "qrcode";

export async function toQrDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, {
    margin: 1,
    width: 240,
    color: { dark: "#111111", light: "#FFFFFF" },
  });
}
