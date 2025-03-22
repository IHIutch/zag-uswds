import { addParameters } from '@storybook/react';

addParameters({
  options: {
    showPanel: true,
    panelPosition: 'right',
  },
  backgrounds: [
    { name: 'white', value: '#ffffff', default: true },
    { name: 'light gray', value: '#f0f0f0' },
    { name: 'dark gray', value: '#333333' },
  ],
});