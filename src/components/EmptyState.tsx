import { Link } from 'react-router-dom';
export default function EmptyState() {
  return <div className="empty"><p>还没有添加单品。</p><Link className="primary-btn" to="/wardrobe/new">添加第一件</Link></div>;
}
