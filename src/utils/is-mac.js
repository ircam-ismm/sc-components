// cf. https://thucde.dev/how-to-detect-macos-in-javascript-or-react-applications
const isMac = window.navigator.userAgentData
  ? window.navigator.userAgentData.platform === 'macOS'
  : /Mac/i.test(window.navigator.userAgent);

export default isMac;

