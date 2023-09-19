// list of pages
export const components = [
  'sc-bang',
  'sc-button',
  'sc-toggle',
  'sc-text',
  'sc-radio',
  'sc-icon',
  'sc-dial',
  'sc-number',
  'sc-slider',
  'sc-clock',
  'sc-editor',
  'sc-code-example',
  'sc-select',
  'sc-dots',
  'sc-matrix',
  'sc-signal',
  'sc-tap-tempo',
  'sc-switch',
  'sc-flash',
  'sc-record',
  'sc-prev',
  'sc-next',
  'sc-loop',
  'sc-tab',
  'sc-transport',
  'sc-keyboard',
  'sc-dragndrop',
  'sc-filetree',
  'sc-midi',
  'sc-status',
  'sc-filter',
].sort();

export const pages = {
  'intro': {
    'home': 'home',
    'styling': 'misc-styling',
  },
  components: components.reduce((acc, value) => {
    acc[value] = value;
    return acc;
  }, {}),
};
