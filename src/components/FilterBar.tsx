import { categories, colors, seasons, statuses } from '../types/wardrobe';

type Props = {
  query: string; setQuery: (v: string) => void;
  category: string; setCategory: (v: string) => void;
  color: string; setColor: (v: string) => void;
  season: string; setSeason: (v: string) => void;
  status: string; setStatus: (v: string) => void;
};

export default function FilterBar(props: Props) {
  return <div className="filters">
    <input placeholder="搜索名称" value={props.query} onChange={e => props.setQuery(e.target.value)} />
    <select value={props.category} onChange={e => props.setCategory(e.target.value)}><option value="">全部大类</option>{categories.map(x => <option key={x}>{x}</option>)}</select>
    <select value={props.color} onChange={e => props.setColor(e.target.value)}><option value="">全部颜色</option>{colors.map(x => <option key={x}>{x}</option>)}</select>
    <select value={props.season} onChange={e => props.setSeason(e.target.value)}><option value="">全部季节</option>{seasons.map(x => <option key={x}>{x}</option>)}</select>
    <select value={props.status} onChange={e => props.setStatus(e.target.value)}><option value="">全部状态</option>{statuses.map(x => <option key={x}>{x}</option>)}</select>
  </div>;
}
