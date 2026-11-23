import { createRoot } from 'react-dom/client';
import { applyTheme, resolveInitialTheme } from '../../../pyj/src/lib/theme';
import App from '../v3/App';
import { hero } from '../v3/content';
import { benchmarks } from './benchmarks';
import './style.css';

const heroContent = {
  ...hero,
  proofPoints: [
    { value: '10×', label: 'Faster batch execution · Adobe Research' },
    { value: '≈90%', label: 'Lower average response time · Zomato' },
    { value: '99.99%', label: 'Event ingestion availability · LaunchDarkly' },
    ...hero.proofPoints.slice(-1),
  ],
  sectionLinks: [
    { label: 'Contact me', to: '#contact' },
    { label: 'See the work', to: '#projects' },
    { label: 'Services', to: '#services' },
  ],
};

applyTheme(resolveInitialTheme());
createRoot(document.getElementById('root')).render(
  <App highlights={benchmarks} heroContent={heroContent} />,
);
