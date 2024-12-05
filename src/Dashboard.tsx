import { Outlet } from 'react-router-dom';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// Maybe I prefer a simple container. Thinking about this
// import { PageContainer } from '@toolpad/core/PageContainer';
import Container from '@mui/material/Container';

const Layout: React.FC = () => {
  return (
    <DashboardLayout defaultSidebarCollapsed>
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </DashboardLayout>
  );
}

export default Layout;
