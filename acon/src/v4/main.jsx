import { createRoot } from 'react-dom/client';
import { applyTheme, resolveInitialTheme } from '../../../pyj/src/lib/theme';
import App from '../v3/App';
import { hero } from '../v3/content';
import { benchmarks } from './benchmarks';
import './style.css';

const heroContent = {
  ...hero,
  proofPoints: hero.proofPoints.slice(-1),
};

applyTheme(resolveInitialTheme());
createRoot(document.getElementById('root')).render(
  <App highlights={benchmarks} heroContent={heroContent} />,
);
