import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'My UI Components',
  brandUrl: 'https://example.com',
  brandImage: 'https://example.com/logo.png',
});

addons.setConfig({
  theme,
});