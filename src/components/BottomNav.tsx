import { NavLink } from 'react-router-dom';
export default function BottomNav() {
  return <nav className="bottom-nav"><NavLink to="/">首页</NavLink><NavLink to="/wardrobe">衣橱</NavLink><NavLink to="/wardrobe/new">添加</NavLink></nav>;
}
