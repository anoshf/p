import { createRoot } from 'react-dom/client';
import { applyTheme, resolveInitialTheme } from '../../../pyj/src/lib/theme';
import App from './App';

applyTheme(resolveInitialTheme());
createRoot(document.getElementById('root')).render(<App />);
