import { render } from 'ink';
import { App } from './components/index.js';
import { AppProvider } from './providers/index.js';

/**
 * The main entry point to the app which renders the `App`
 * component using the `render` function from `ink`
 */
render(
  <AppProvider>
    <App />
  </AppProvider>,
);
