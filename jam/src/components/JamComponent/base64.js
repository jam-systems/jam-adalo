export { toBase64, toUrl };

function toBase64(string) {
  let bytes = new Uint8Array([...string].map((_, i) => string.charCodeAt(i)));

  let m = bytes.length;
  let k = m % 3;
  let n = Math.floor(m / 3) * 4 + (k && k + 1);
  let N = Math.ceil(m / 3) * 4;
  let encoded = new Uint8Array(N);

  for (let i = 0, j = 0; j < m; i += 4, j += 3) {
    let y = (bytes[j] << 16) + (bytes[j + 1] << 8) + (bytes[j + 2] | 0);
    encoded[i] = encodeLookup[y >> 18];
    encoded[i + 1] = encodeLookup[(y >> 12) & 0x3f];
    encoded[i + 2] = encodeLookup[(y >> 6) & 0x3f];
    encoded[i + 3] = encodeLookup[y & 0x3f];
  }

  let base64 = String.fromCharCode(...encoded);
  if (k === 1) base64 += "==";
  if (k === 2) base64 += "=";
  return base64;
}

const alphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

const encodeLookup = Object.fromEntries(
  Array.from(alphabet).map((a, i) => [i, a.charCodeAt(0)])
);

function toUrl(url) {
  return url.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
