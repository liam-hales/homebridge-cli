import { FunctionComponent, ReactElement } from 'react';
import { render } from 'ink';
import { App } from './components/index.js';
import { AppProvider } from './providers/index.js';

/**
 * The main entry point for the app, used to initialise
 * React context providers and render the `App` component
 *
 * @returns The `Main` component
 */
const Main: FunctionComponent = (): ReactElement => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

render(<Main />);
