export const WHATSAPP_NUMBER = "917015833269";
export const PHONE_DISPLAY = "+91 70158 33269";

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
