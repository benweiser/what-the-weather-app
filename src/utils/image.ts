export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', err => reject(err));
    img.src = src;
    img.removeEventListener('load', () => resolve(img));
    img.removeEventListener('error', err => reject(err));
  });
}
