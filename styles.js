import { css } from 'lit';

// @todo - review that... not clean
export const fontFamily = css`Consolas, monaco, monospace`;
export const fontSize = css`11px`;

export const theme = {};
theme['--color-primary-0'] = css`#121212ff`;
theme['--color-primary-1'] = css`#272822ff`;
theme['--color-primary-2'] = css`#3d3e39ff`;
theme['--color-primary-3'] = css`#6a6a69ff`;
theme['--color-primary-4'] = css`#dededeff`;
theme['--color-secondary-1'] = css`#f0db4fff`; // yellow
theme['--color-secondary-2'] = css`#1c78c0ff`; // blue
theme['--color-secondary-3'] = css`#d9534fff`; // red
theme['--color-secondary-4'] = css`#5ec451ff`; // green
theme['--color-secondary-5'] = css`#cd7afaff`; // lilac
theme['--color-secondary-6'] = css`#f4b43eff`; // orange

// export const userSelectNone = css`
//   -webkit-touch-callout: none; /* iOS Safari */
//     -webkit-user-select: none; /* Safari */
//      -khtml-user-select: none; /* Konqueror HTML */
//        -moz-user-select: none; /* Old versions of Firefox */
//         -ms-user-select: none; /* Internet Explorer/Edge */
//             user-select: none; /* Non-prefixed version, currently
//                                   supported by Chrome, Edge, Opera and Firefox */
// `

// export const largeBtn = css`
//   font-family: ${fontFamily};
//   color: white;
//   font-size: 1.6rem;
//   width: 100%;
//   border: 1px solid #676767;
//   border-radius: 2px;
//   background-color: #121212;
//   height: 36px;
//   line-height: 36px;
// `;

// export const info = css`
//   font-family: ${fontFamily};
//   color: white;
//   font-size: 1.2rem;
//   width: 100%;
//   text-align: center;
//   height: 36px;
//   line-height: 36px;
// `;

export const arrow = css`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkCAUKBTL+mGjUAAAAeUlEQVRIx+3OMQ6AIBBE0a93sMLEk1h4Y7Ww9mRiRUIM6jJUGob6/QXqfrCGkbbAHw0bE14+v8PAjBffwgDgWCS+4sJXlETElcSF5yYSPCdxw62JB25JvPC3hIE/JYz8LpHBU4lMfk0IPE6IPCRWepUDdHQlvO4jOwFwgu1NCrBo/wAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wOC0wNVQxMDowNTo0OSswMDowMBWQx3oAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMDgtMDVUMTA6MDU6NDkrMDA6MDBkzX/GAAAAIHRFWHRzb2Z0d2FyZQBodHRwczovL2ltYWdlbWFnaWNrLm9yZ7zPHZ0AAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADUxMo+NU4EAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgANTEyHHwD3AAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxNTk2NjIxOTQ5QVn8gAAAABJ0RVh0VGh1bWI6OlNpemUAMzI2MEJCw0lk+gAAAFR0RVh0VGh1bWI6OlVSSQBmaWxlOi8vLi91cGxvYWRzLzU2L2V4dHg3bGQvMjQ1Ni9pbmRpY2F0b3JfYXJyb3dfdHJpYW5nbGVfaWNvbl8xNDkwMjAucG5n2GvxiAAAAABJRU5ErkJggg==`;

export const arrowRight = css`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAA7DgAAOw4AXEryjgAAAAHdElNRQflAxQLDS8ArDZ8AAACgklEQVRo3u3ZT0gUURzA8e+sstgSlmtg9MeCIoKKIIQCu0TZIbxIBdmhKDxZhw7mQYICQRCsU1B4CA8ReJEg+nMpKQjBTT0UERHlYmQGGUWYmOt0aHm9Ic2ZN7/9LYRvbnvY+fDmz/e9XVgaRR4l837qkSbFdPFYh3nGEGdYUZzTVzCIj88Mt9lNQh9QTRY/f3yglVXFBPjM8oC9uvMQBPj4THCJ1fqAKcaYyxNyPKaOUl3AKAe5wXczD5N0sk4TkKWaJI2MmHmYI0MDSU0AwEau8dXMwzeuskkXAEkaGCRnEM85zjJNAMBauvhsCFP0sE0XACUc4qk1D685zXJNAEAV7UwYwjS97MLTBECCfTxk1iCynJWO1r8BAJW08d4QxKO1OAA89nCHmcJEKwwAoJxzvCtEtMICwGMnvfyQjlZ4AECKJl4ZQo4n8aMVDQCwlR7JaEUHQJlktFwAIBgtV4BYtNwBIBKteACBaMUFQMxoSQB+R+tRIFqNugCANG18MYQM6fmchR0/8aOfS+oS1HLfugRjnNIEVHGBj9ZN2EeN3k1YygH6rcfwDc2aj+Ea2gMvoltsj/oVcV7F9QyYJPm84KTmq3gDlwMx6mazwww6Aso4wrCV42GOauZ4C92BBckV1ruePDogxQleWkuyAer1lmQeO7hpLUo/0aG5KC2nmbfWsryf/XrL8gQ19Fkbk3Euam5MKmkJbM3uUau3Nfs7Mq2slDv5YoBYkYkLiB2ZeACByLgDhCLjChCLjAsgKRmZqIBR6rguGZmogOCP1QKRiQr4cwhFxg0gGBkXgGhkwo40mXxk7spGJvw4xhAjnNf4285b4NMKPCatfd3S+H/HLwusPWkzmFSAAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTAzLTIwVDExOjEzOjQ3KzAwOjAwRxN4GAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wMy0yMFQxMToxMzo0NyswMDowMDZOwKQAAAAgdEVYdHNvZnR3YXJlAGh0dHBzOi8vaW1hZ2VtYWdpY2sub3JnvM8dnQAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABh0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQANTEyj41TgQAAABd0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAA1MTIcfAPcAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADE2MTYyMzg4MjfA6B9qAAAAEnRFWHRUaHVtYjo6U2l6ZQA1MTU5QkJP1GlWAAAAUHRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8uL3VwbG9hZHMvNTYvaEpIZnVxcC8yOTAyL2Fycm93X3JpZ2h0X3RyaWFuZ2xlX2ljb25fMTgzMTIxLnBuZ8GglZQAAAAASUVORK5CYII=`;

export const arrowDown = css`data:image/png;base64,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`;
