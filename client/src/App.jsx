import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Portifolio from "./pages/Portifolio";
import CodiceDesvelado from "./pages/CodiceDesvelado";
import Admin from "./components/Admin";
import Dashboard from "./pages/Dashboard";
import WorksPage from "./components/WorksPage";
import DashboardOverview from "./components/DashboardOverview";
import WorkDetails from "./components/WorkDetails";
import EditWork from "./components/EditWork";
import EditImg from "./components/EditImg";
import DeleteWork from "./components/DeleteWork";
import ColorPicker from "./components/ColorPicker";
import DeleteSection from "./components/DeleteSection";
import AddSection from "./components/AddSection";
import CreateWork from "./components/CreateWork";
import CodiceDashboard from "./components/CodiceDashboard";
import CreateCodice from "./components/CreateCodice";
import SetTiptapImage from "./components/SetTiptapImage";
import Generate from "./pages/Generate";
import CodiceFilters from "./components/CodiceFilters";
import CodiceDetails from "./components/CodiceDetails";
import EditCodice from "./components/EditCodice";
import EditCodiceImage from "./components/EditCodiceImage";
import EditCodiceContent from "./components/EditCodiceContent";
import EditCodiceCategory from "./components/EditCodiceCategory";
import ProjectRequests from "./components/ProjectRequests";
import ProjectRequestsDetails from "./components/ProjectRequestsDetails";
import ProjectRequestsArchive from "./components/ProjectRequestsArchive";
import ProjectRequestSpam from "./components/ProjectRequestSpam";
import ProjectsSchedule from "./components/ProjectsSchedule";

function App() {
  const isMobile = window.innerWidth < 640;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portifolio isMobile={isMobile} />} />
        <Route path="/codice-desvelado" element={<CodiceDesvelado />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route path="/generate" element={<Generate />} />
        <Route path="/admin/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate replace to={"overview"} />} />
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

          <Route path="codice" element={<CodiceDashboard />}>
            <Route path="at" element={<CodiceFilters />} />
          </Route>
          <Route path="codice/:codiceId" element={<CodiceDetails />}>
            <Route path="edit" element={<EditCodice />} />
            <Route path="editImage" element={<EditCodiceImage />} />
            <Route path="editContent" element={<EditCodiceContent />}>
              <Route path="setImage" element={<SetTiptapImage />} />
            </Route>
            <Route path="editCategory" element={<EditCodiceCategory />} />
          </Route>
          <Route path="codice/write" element={<CreateCodice />}>
            <Route path="setImage" element={<SetTiptapImage />} />
          </Route>

          <Route path="project-requests" element={<ProjectRequests />} />
          <Route
            path="project-requests/archive"
            element={<ProjectRequestsArchive />}
          />
          <Route
            path="project-requests/:requestId/schedule"
            element={<ProjectsSchedule />}
          />
          <Route
            path="project-requests/:requestId"
            element={<ProjectRequestsDetails />}
          >
            <Route path="spam" element={<ProjectRequestSpam />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
