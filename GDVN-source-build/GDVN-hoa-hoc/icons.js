/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
const shapes={
periodic:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>',
atom:'<ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>',
config:'<path d="M3 5h5v5H3zM10 5h5v5h-5zM17 5h4v5h-4zM3 14h5v5H3zM10 14h5v5h-5zM17 14h4v5h-4zM5.5 8V6M12.5 8V6M5.5 17v-2"/>',
molecule:'<path d="m6 7 12 2-6 10L6 7"/><circle cx="6" cy="7" r="3" fill="currentColor"/><circle cx="18" cy="9" r="3" fill="currentColor"/><circle cx="12" cy="19" r="3" fill="currentColor"/>',
bond:'<circle cx="5" cy="12" r="4"/><circle cx="19" cy="12" r="4"/><path d="M9 10h6M9 14h6"/>',
complex:'<path d="M12 3v18M3 12h18M5 5l14 14M5 19 19 5"/><circle cx="12" cy="12" r="4" fill="currentColor"/><circle cx="12" cy="3" r="1.5"/><circle cx="21" cy="12" r="1.5"/><circle cx="12" cy="21" r="1.5"/><circle cx="3" cy="12" r="1.5"/>',
separation:'<path d="M5 3h14l-2 4-3 5v6l-4 3v-9L7 7 5 3zM8 7h8M12 18v4"/>',
mechanism:'<path d="M20 8a8 8 0 0 0-14-3L3 8M3 3v5h5M4 16a8 8 0 0 0 14 3l3-3M21 21v-5h-5"/>',
equation:'<path d="M12 3v18M5 21h14M4 7h16M5 7l-4 8h8L5 7zM19 7l-4 8h8l-4-8z"/>',
ionic:'<circle cx="7" cy="8" r="5"/><circle cx="17" cy="17" r="5"/><path d="M5 8h4M7 6v4M15 17h4"/>',
lab:'<path d="M8 2h8M9 2v7l-6 10q-1 3 3 3h12q4 0 3-3l-6-10V2M6 16h12"/><circle cx="11" cy="18" r="1" fill="currentColor"/><circle cx="14" cy="13" r="1" fill="currentColor"/>',
electro:'<rect x="2" y="7" width="18" height="12" rx="2"/><path d="M20 11h2v4h-2M7 3v6M4 6h6M14 6h4M12 10l-3 4h6l-3 4"/>',
electrolysis:'<path d="M3 9v12h18V9M3 15h18M8 3v14M16 3v14M5 3h6M13 3h6M6 6h4M8 4v4M14 6h4"/>',
thermo:'<path d="M13 2c2 6-2 6-1 10 2-1 3-2 3-4 4 3 7 9 2 13-4 3-11 1-12-4-1-4 1-7 4-9-1 4 1 4 2 5 2-4-1-5 2-11z"/>',
solution:'<path d="M12 2C9 7 4 11 4 15a8 8 0 0 0 16 0c0-4-5-8-8-13zM8 15a4 4 0 0 0 4 4"/>',
knowledge:'<path d="M12 5c-4-3-7-3-10-2v17c3-1 6-1 10 2 4-3 7-3 10-2V3c-3-1-6-1-10 2zM12 5v17M5 7h3M5 11h3M16 7h3M16 11h3"/>',
quiz:'<rect x="4" y="4" width="16" height="18" rx="2"/><path d="M9 2h6v4H9zM8 14l3 3 5-6"/>',
studio:'<path d="m3 17 14-14 4 4L7 21H3v-4zM14 6l4 4M3 3l6 6M5 2l-3 3M17 15l5 5-3 3-5-5"/>',
structure:'<path d="m12 2 9 5v10l-9 5-9-5V7l9-5zM12 5l6 3M18 10v5M15 18l-5 1M6 15V9"/>',
board:'<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M7 22l3-5M17 22l-3-5M7 12l3-4 3 3 4-5"/>',
calculator:'<rect x="4" y="2" width="16" height="20" rx="3"/><path d="M7 5h10v4H7zM7 13h1M12 13h1M17 13h.1M7 17h1M12 17h1M17 17h.1"/>'
};
export function toolIcon(id){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(shapes[id]||shapes[{lessons:'knowledge',practice:'quiz',tutor:'equation'}[id]]||shapes.lab)+'</svg>';}
