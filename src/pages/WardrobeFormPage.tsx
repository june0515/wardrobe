import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../db/db';
import { categories, colors, seasons, statuses, styleTags, WardrobeCategory, WardrobeItem, WardrobeStatus } from '../types/wardrobe';
import ImageUploader from '../components/ImageUploader';

const empty: Omit<WardrobeItem, 'id' | 'createdAt' | 'updatedAt'> = {
  photos: [], name: '', category: '上衣', subCategory: '', colors: [], seasons: [], styleTags: [],
  purchaseDate: '', purchasePrice: undefined, purchaseSource: '', size: '', wearCount: 0, lastWornDate: '', status: '常穿', storageLocation: ''
};

export default function WardrobeFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ ...empty });
  const [createdAt, setCreatedAt] = useState('');
  useEffect(() => { if (id) db.wardrobe.get(id).then(item => { if (item) { setForm(item); setCreatedAt(item.createdAt); } }); }, [id]);
  function patch<K extends keyof typeof form>(key: K, value: typeof form[K]) { setForm(prev => ({ ...prev, [key]: value })); }
  function toggle(key: 'colors' | 'seasons' | 'styleTags', value: string) {
    const arr = form[key] as string[];
    patch(key as any, (arr.includes(value) ? arr.filter(x => x !== value) : [...arr, value]) as any);
  }
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return alert('请填写名称');
    if (!form.photos.length) return alert('请至少上传一张照片');
    const now = new Date().toISOString();
    const item: WardrobeItem = {
      ...form,
      id: id || crypto.randomUUID(),
      name: form.name.trim(),
      category: form.category as WardrobeCategory,
      status: form.status as WardrobeStatus,
      purchasePrice: form.purchasePrice ? Number(form.purchasePrice) : undefined,
      createdAt: createdAt || now,
      updatedAt: now
    };
    await db.wardrobe.put(item);
    navigate(`/wardrobe/${item.id}`);
  }
  return <form className="form" onSubmit={submit}>
    <h1>{id ? '编辑单品' : '添加单品'}</h1>
    <ImageUploader photos={form.photos} onChange={v => patch('photos', v)} />
    <label>名称/备注<input value={form.name} onChange={e => patch('name', e.target.value)} placeholder="藏青羊毛大衣" /></label>
    <label>大类<select value={form.category} onChange={e => patch('category', e.target.value as any)}>{categories.map(x => <option key={x}>{x}</option>)}</select></label>
    <label>子类<input value={form.subCategory} onChange={e => patch('subCategory', e.target.value)} placeholder="T恤 / 衬衫 / 毛衣" /></label>
    <ChipGroup title="颜色" options={colors} selected={form.colors} onToggle={v => toggle('colors', v)} />
    <ChipGroup title="季节" options={seasons} selected={form.seasons} onToggle={v => toggle('seasons', v)} />
    <ChipGroup title="风格标签" options={styleTags} selected={form.styleTags} onToggle={v => toggle('styleTags', v)} />
    <label>购入日期<input type="date" value={form.purchaseDate} onChange={e => patch('purchaseDate', e.target.value)} /></label>
    <label>购入价格<input type="number" value={form.purchasePrice || ''} onChange={e => patch('purchasePrice', e.target.value ? Number(e.target.value) : undefined)} /></label>
    <label>购入渠道<input value={form.purchaseSource} onChange={e => patch('purchaseSource', e.target.value)} /></label>
    <label>尺码<input value={form.size} onChange={e => patch('size', e.target.value)} /></label>
    <label>状态<select value={form.status} onChange={e => patch('status', e.target.value as any)}>{statuses.map(x => <option key={x}>{x}</option>)}</select></label>
    <label>收纳位置<input value={form.storageLocation} onChange={e => patch('storageLocation', e.target.value)} placeholder="衣柜A-第二层" /></label>
    <button className="primary-btn full" type="submit">保存</button>
  </form>;
}
function ChipGroup({ title, options, selected, onToggle }: { title: string; options: readonly string[]; selected: readonly string[]; onToggle: (v: string) => void }) {
  return <div className="field-block"><p>{title}</p><div className="chips">{options.map(x => <button type="button" key={x} className={selected.includes(x) ? 'chip active' : 'chip'} onClick={() => onToggle(x)}>{x}</button>)}</div></div>;
}
