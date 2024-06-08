export const Header = () => {
  return (
    <div className="fixed z-50 box-border h-[62px] w-full bg-oasis flex items-center p-[24px]">
      <div
        className="cursor-pointer"
        onClick={() => window.open("https://www.velotix.ai", "_blank")}
      >
        <img src={velotixLogo()} alt="" />
      </div>
    </div>
  );
};

const velotixLogo = () => {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
  <path d="M0 0 C9.24 0 18.48 0 28 0 C28 9.24 28 18.48 28 28 C18.76 28 9.52 28 0 28 C0 18.76 0 9.52 0 0 Z " fill="#FBFBFB" transform="translate(0,0)"/>
  <path d="M0 0 C0 4.62 0 9.24 0 14 C-9.24 14 -18.48 14 -28 14 C-28 9.71 -28 5.42 -28 1 C-25.03 1 -22.06 1 -19 1 C-18.67 1.66 -18.34 2.32 -18 3 C-14.70924004 2.62095792 -14.70924004 2.62095792 -12 1 C-10.36016917 0.76573845 -8.71225385 0.58661692 -7.0625 0.4375 C-6.16660156 0.35371094 -5.27070313 0.26992187 -4.34765625 0.18359375 C-2 0 -2 0 0 0 Z " fill="#FEFEFE" transform="translate(28,14)"/>
  <path d="M0 0 C2.97 0 5.94 0 9 0 C9 1.32 9 2.64 9 4 C5.7 4 2.4 4 -1 4 C-0.67 2.68 -0.34 1.36 0 0 Z " fill="#242222" transform="translate(17,10)"/>
  <path d="M0 0 C2.31 0 4.62 0 7 0 C6.34 1.32 5.68 2.64 5 4 C3.0625 3.6875 3.0625 3.6875 1 3 C0.67 2.01 0.34 1.02 0 0 Z " fill="#2A2828" transform="translate(8,14)"/>
  <path d="M0 0 C1.32 0 2.64 0 4 0 C4.33 1.32 4.66 2.64 5 4 C3.35 4 1.7 4 0 4 C0 2.68 0 1.36 0 0 Z " fill="#232222" transform="translate(2,10)"/>
  </svg>
  `;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};
