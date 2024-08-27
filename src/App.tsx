import PageRouter from '@/routes/PageRouter';
import { RouletteProvider } from './contexts/RouletteContext';

function App() {
  return (
    <RouletteProvider>
      <PageRouter />
    </RouletteProvider>
  );
}

export default App;
