import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../db/db';
import { WardrobeItem } from '../types/wardrobe';
import WardrobeCard from '../components/WardrobeCard';
import FilterBar from '../components/FilterBar';
import EmptyState from '../components/EmptyState';

export default function WardrobeListPage() {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [season, setSeason] = useState('');
  const [status, setStatus] = useState('');
  useEffect(() => { db.wardrobe.toArray().then(setItems); }, []);
  const filtered = useMemo(() => items.filter(i =>
    i.name.includes(query) &&
    (!category || i.category === category) &&
    (!color || i.colors.includes(color)) &&
    (!season || i.seasons.includes(season as any)) &&
    (!status || i.status === status)
  ), [items, query, category, color, season, status]);
  return <>
    <div className="page-head"><h1>衣橱列表</h1><Link className="primary-btn" to="/wardrobe/new">添加</Link></div>
    <FilterBar {...{ query, setQuery, category, setCategory, color, setColor, season, setSeason, status, setStatus }} />
    {!items.length ? <EmptyState /> : <div className="list">{filtered.map(item => <WardrobeCard key={item.id} item={item} />)}</div>}
  </>;
}
