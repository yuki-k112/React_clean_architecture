import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
// import '../src/styles/semantic.min.css';
// import '../src/index.css';

const req = require.context('../front/dev/components', true, /.(story|stories).(tsx|js)$/);
function loadStories() {
    addDecorator(withInfo);
    addDecorator(withKnobs);
    req.keys().forEach(req);
}
configure(loadStories, module);
