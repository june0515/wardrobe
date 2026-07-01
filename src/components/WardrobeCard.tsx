import { Link } from 'react-router-dom';
import { WardrobeItem } from '../types/wardrobe';

export default function WardrobeCard({ item }: { item: WardrobeItem }) {
  return <Link className="item-card" to={`/wardrobe/${item.id}`}>
    <img src={item.photos[0]} alt={item.name} />
    <div className="card-body"><h3>{item.name}</h3><p>{item.category} · {item.status}</p><p>{item.colors.join(' / ') || '未填颜色'}</p><small>最近穿着：{item.lastWornDate || '暂无'}</small></div>
  </Link>;
}
