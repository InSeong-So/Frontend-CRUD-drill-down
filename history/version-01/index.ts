import setGlobalEventHandler from './src/events/index.js';
import App from './src/App.js';

new App(document.querySelector('#app') as HTMLElement, {});
setGlobalEventHandler();
