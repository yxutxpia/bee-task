import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { DarkModeProvider } from './context/DarkModeContext';

import AppLayout from './ui/AppLayout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import PageNotFound from './ui/PageNotFound';
import GlobalStyles from './styles/GlobalStyles';
import TaskDetail from './features/tasks/TaskDetail';
import ProjectDetail from './features/projects/ProjectDetail';
import CreateTask from './features/tasks/CreateTask';
import UpdateTask from './features/tasks/UpdateTask';
import CreateProject from './features/projects/CreateProject';
import UpdateProject from './features/projects/UpdateProject';
import ProtectedRoute from './ui/ProtectedRoute';
import Feedback from './pages/Feedback';
import { SidebarToggleProvider } from './context/SidebarToggleContext';
import Setting from './pages/Setting';
import { SearchToggleProvider } from './context/SearchToggleContext';
import RedirectProfile from './features/profiles/RedirectProfile';
import SignOut from './pages/SignOut';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SidebarToggleProvider>
        <SearchToggleProvider>
          <DarkModeProvider>
            <GlobalStyles />
            <BrowserRouter>
              <Routes>
                <Route
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate replace to="dashboard" />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="feedback" element={<Feedback />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="projects/new" element={<CreateProject />} />
                  <Route path="tasks" element={<Tasks />} />
                  <Route path="tasks/new" element={<CreateTask />} />
                  <Route path="tasks/:taskId" element={<TaskDetail />} />
                  <Route path="tasks/:taskId/edit" element={<UpdateTask />} />
                  <Route
                    path="projects/:projectId"
                    element={<ProjectDetail />}
                  />
                  <Route
                    path="projects/:projectId/edit"
                    element={<UpdateProject />}
                  />
                  <Route path="setting" element={<Setting />} />
                  <Route path="signout" element={<SignOut />} />
                  <Route path="profile" element={<RedirectProfile />} />
                  <Route path="profile/:userId" element={<Profile />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
            <Toaster
              position="top-center"
              gutter={12}
              containerStyle={{ margin: '8px' }}
              toastOptions={{
                success: {
                  duration: 2000,
                },
                error: {
                  duration: 3500,
                },
                style: {
                  maxWidth: '500px',
                  padding: '16px 24px',
                  color: 'var(--color-font)',
                  fontSize: 'var(--font-size-regular)',
                  backgroundColor: 'var(--color-gray-0)',
                },
              }}
            />
          </DarkModeProvider>
        </SearchToggleProvider>
      </SidebarToggleProvider>
    </QueryClientProvider>
  );
}

export default App;
