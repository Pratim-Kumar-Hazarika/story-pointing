export function generateRoomCode(length: number = 6): string {
  const digits = "0123456789";
  let otp = "";
  const cryptoObj = window.crypto || (window as any).msCrypto; // For older browsers

  for (let i = 0; i < length; i++) {
    const randomIndex =
      cryptoObj.getRandomValues(new Uint32Array(1))[0] % digits.length;
    otp += digits[randomIndex];
  }

  return otp;
}
