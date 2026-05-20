import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import AppRoutes from './routes/routes';
import RootLoadingIndicator from './components/layout/RootLoadingIndicator';

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <RootLoadingIndicator />
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  );
}
