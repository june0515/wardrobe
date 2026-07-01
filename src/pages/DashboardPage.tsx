import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../db/db';
import { WardrobeItem } from '../types/wardrobe';
import { daysSince } from '../utils/date';
import { exportWardrobeJson } from '../utils/exportJson';
import StatCard from '../components/StatCard';
import WardrobeCard from '../components/WardrobeCard';
import EmptyState from '../components/EmptyState';

export default function DashboardPage() {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  useEffect(() => { db.wardrobe.toArray().then(setItems); }, []);
  const idle = items.filter(i => daysSince(i.lastWornDate) > 30);
  const recent = [...items].sort((a,b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 3);
  if (!items.length) return <><Header /><EmptyState /></>;
  return <>
    <Header />
    <div className="stat-grid">
      <StatCard label="总单品" value={items.length} />
      <StatCard label="常穿" value={items.filter(i => i.status === '常穿').length} />
      <StatCard label="闲置" value={items.filter(i => i.status === '闲置').length} />
      <StatCard label="想淘汰" value={items.filter(i => i.status === '想淘汰').length} />
    </div>
    <section className="panel"><div className="section-head"><h2>超过 30 天未穿</h2><span>{idle.length} 件</span></div>{idle.slice(0, 3).map(item => <WardrobeCard key={item.id} item={item} />)}</section>
    <section className="panel"><div className="section-head"><h2>最近添加</h2><Link to="/wardrobe">查看全部</Link></div>{recent.map(item => <WardrobeCard key={item.id} item={item} />)}</section>
    <button className="secondary-btn full" onClick={() => exportWardrobeJson(items)}>导出 JSON</button>
  </>;
}

function Header() {
  return <div className="hero"><p>Personal Wardrobe</p><h1>我的衣橱</h1><Link className="primary-btn" to="/wardrobe/new">+ 添加单品</Link></div>;
}
