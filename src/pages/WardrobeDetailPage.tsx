import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { db } from '../db/db';
import { WardrobeItem } from '../types/wardrobe';
import { todayISO } from '../utils/date';

export default function WardrobeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<WardrobeItem | null>(null);
  useEffect(() => { if (id) db.wardrobe.get(id).then(v => setItem(v || null)); }, [id]);
  if (!item) return <p>找不到这个单品。</p>;
  async function wearToday() {
    const updated = { ...item!, wearCount: item!.wearCount + 1, lastWornDate: todayISO(), updatedAt: new Date().toISOString() };
    await db.wardrobe.put(updated);
    setItem(updated);
  }
  async function remove() {
    if (!item) return;
    if (confirm('确定删除这个单品吗？')) { await db.wardrobe.delete(item.id); navigate('/wardrobe'); }
  }
  return <>
    <div className="detail-gallery">{item.photos.map((p, i) => <img key={i} src={p} alt={item.name} />)}</div>
    <div className="panel detail-panel"><h1>{item.name}</h1><p className="muted">{item.category} {item.subCategory ? `· ${item.subCategory}` : ''}</p>
      <div className="meta-grid">
        <Info label="颜色" value={item.colors.join(' / ')} />
        <Info label="季节" value={item.seasons.join(' / ')} />
        <Info label="风格" value={item.styleTags.join(' / ')} />
        <Info label="状态" value={item.status} />
        <Info label="穿着次数" value={`${item.wearCount} 次`} />
        <Info label="最近穿着" value={item.lastWornDate || '暂无'} />
        <Info label="尺码" value={item.size} />
        <Info label="收纳位置" value={item.storageLocation} />
        <Info label="购入渠道" value={item.purchaseSource} />
        <Info label="购入价格" value={item.purchasePrice ? `$${item.purchasePrice}` : ''} />
      </div>
      <button className="primary-btn full" onClick={wearToday}>今天穿了它</button>
      <div className="actions"><Link className="secondary-btn" to={`/wardrobe/${item.id}/edit`}>编辑</Link><button className="danger-btn" onClick={remove}>删除</button></div>
    </div>
  </>;
}
function Info({ label, value }: { label: string; value?: string }) { return <div><span>{label}</span><strong>{value || '—'}</strong></div>; }
