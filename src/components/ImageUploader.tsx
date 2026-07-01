import { compressImage } from '../utils/imageCompression';

export default function ImageUploader({ photos, onChange }: { photos: string[]; onChange: (photos: string[]) => void }) {
  async function handleFiles(files: FileList | null) {
    if (!files) return;
    const compressed = await Promise.all(Array.from(files).map(file => compressImage(file)));
    onChange([...photos, ...compressed]);
  }
  return <div>
    <label className="upload-box">上传/拍照<input hidden type="file" accept="image/*" multiple onChange={e => handleFiles(e.target.files)} /></label>
    <div className="photo-grid">{photos.map((src, i) => <div className="photo-thumb" key={i}><img src={src} /><button type="button" onClick={() => onChange(photos.filter((_, idx) => idx !== i))}>×</button></div>)}</div>
  </div>;
}
