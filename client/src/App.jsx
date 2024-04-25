import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Portifolio from './pages/Portifolio';
import CodiceDesvelado from './pages/CodiceDesvelado';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import WorksPage from './components/WorksPage';
import DashboardOverview from './components/DashboardOverview';
import WorkDetails from './components/WorkDetails';
import EditWork from './components/EditWork';
import EditImg from './components/EditImg';
import DeleteWork from './components/DeleteWork';
import ColorPicker from './components/ColorPicker';

function App() {
  const isMobile = window.innerWidth < 640;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portifolio isMobile={isMobile} />} />
        <Route path="/codice-desvelado" element={<CodiceDesvelado />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route path="/admin/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate replace to={'overview'} />} />
          <Route path="overview" element={<DashboardOverview />} />
          <Route path="works" element={<WorksPage />} />
          <Route path="works/:id" element={<WorkDetails />}>
            <Route path="editar" element={<EditWork />} />
            <Route path="editar-img" element={<EditImg />} />
            <Route path="delete" element={<DeleteWork />} />
            <Route path="colors" element={<ColorPicker />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
