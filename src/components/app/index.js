import MainModule from 'MAIN';

import template from './template.html';
import AppController from './app.component';

const ComponentName = 'app';

const ComponentDefinition = {
    controller : AppController,
    template
}

MainModule.component(ComponentName, ComponentDefinition);

export default ComponentName;