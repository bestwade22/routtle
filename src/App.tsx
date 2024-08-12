import PageRouter from '@/routes/PageRouter';
import Home from '@/pages/Home';
import { RouletteProvider } from './contexts/RouletteContext';

function App() {
  return (
    <RouletteProvider>
      <Home />
    </RouletteProvider>
  );
}

export default App;
