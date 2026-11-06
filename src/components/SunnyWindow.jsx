import './SunnyWindow.css';

export function SunnyWindow() {
  return (
    <svg className="sunny-window" viewBox="0 0 80 80" width="72" height="72" aria-hidden="true">
      <defs>
        <clipPath id="sunny-window-clip">
          <rect x="16" y="14" width="48" height="50" rx="4" />
        </clipPath>
      </defs>

      {/* everything inside the window */}
      <g clipPath="url(#sunny-window-clip)">
        <rect x="16" y="14" width="48" height="50" className="sunny-window__sky" />
        <circle cx="46" cy="30" r="8" className="sunny-window__sun" />
        <g className="sunny-window__cloud">
          <path d="M20 36 a5 5 0 0 1 2 -9 a7 7 0 0 1 13 -1 a5 5 0 0 1 4 10Z" />
        </g>
        <g className="sunny-window__cloud sunny-window__cloud--2">
          <path d="M14 52 a4 4 0 0 1 2 -7 a6 6 0 0 1 11 -1 a4 4 0 0 1 3 8Z" />
        </g>
      </g>

      {/* frame and sill */}
      <rect x="16" y="14" width="48" height="50" rx="4" className="sunny-window__frame" />
      <path d="M40 14 V64 M16 39 H64" className="sunny-window__bars" />
      <rect x="12" y="64" width="56" height="5" rx="2" className="sunny-window__sill" />
    </svg>
  );
}