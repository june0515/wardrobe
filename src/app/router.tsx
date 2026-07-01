import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import DashboardPage from '../pages/DashboardPage';
import WardrobeListPage from '../pages/WardrobeListPage';
import WardrobeDetailPage from '../pages/WardrobeDetailPage';
import WardrobeFormPage from '../pages/WardrobeFormPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'wardrobe', element: <WardrobeListPage /> },
      { path: 'wardrobe/new', element: <WardrobeFormPage /> },
      { path: 'wardrobe/:id', element: <WardrobeDetailPage /> },
      { path: 'wardrobe/:id/edit', element: <WardrobeFormPage /> }
    ]
  }
]);
