import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Portifolio from './pages/Portifolio';
import CodiceDesvelado from './pages/CodiceDesvelado';
import Admin from './components/Admin';
import Dashboard from './pages/Dashboard';
import WorksPage from './components/WorksPage';
import DashboardOverview from './components/DashboardOverview';
import WorkDetails from './components/WorkDetails';
import EditWork from './components/EditWork';
import EditImg from './components/EditImg';
import DeleteWork from './components/DeleteWork';
import ColorPicker from './components/ColorPicker';
import DeleteSection from './components/DeleteSection';
import AddSection from './components/AddSection';
import CreateWork from './components/CreateWork';
import CodiceDashboard from './components/CodiceDashboard';
import CreateCodice from './components/CreateCodice';
import SetTiptapImage from './components/SetTiptapImage';

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
          <Route path="create-work" element={<CreateWork />} />
          <Route path="works/:id" element={<WorkDetails />}>
            <Route path="editar" element={<EditWork />} />
            <Route path="editar-img" element={<EditImg />} />
            <Route path="delete" element={<DeleteWork />} />
            <Route path="delete-section" element={<DeleteSection />} />
            <Route path="add-section" element={<AddSection />} />
            <Route path="colors" element={<ColorPicker />} />
          </Route>
          <Route path="codice" element={<CodiceDashboard />} />
          <Route path="codice/write" element={<CreateCodice />}>
            <Route path="setImage" element={<SetTiptapImage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
