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
  'sc-color-picker',
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
  'sc-separator',
  'sc-tab',
  'sc-transport',
  'sc-keyboard',
  'sc-dragndrop',
  'sc-filetree',
  'sc-fullscreen',
  'sc-midi',
  'sc-status',
  'sc-waveform',
].sort();

export const pages = {
  'intro': {
    'home': 'home',
    'styling': 'misc-styling',
    'examples': 'misc-examples',
  },
  components: components.reduce((acc, value) => {
    acc[value] = value;
    return acc;
  }, {}),
};
