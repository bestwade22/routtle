import PageRouter from '@/routes/PageRouter';
import { RouletteProvider } from './contexts/RouletteContext';
import CustomizedDialogs from './components/Common/Dialog';

function App() {
  return (
    <RouletteProvider>
      <PageRouter />
      <CustomizedDialogs/>
    </RouletteProvider>
  );
}

export default App;
