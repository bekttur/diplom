import React from 'react';

const AbayDark: React.FC = () => {
  const svgMarkup = `
  <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" 	viewBox="0 0 213.7 213.7" style="transform: scale(4) translate(25px, 80px); position: relative; z-index: 0">
  	<defs>
  		<style>.cls-1{fill:transparent;}.cls-2{fill-rule:evenodd;}</style></defs>
      <rect class="cls-1" width="213.7" height="213.7"/>
      <path class="cls-2 dark:fill-[#5a5a5a]" d="M64.22,125.92l6.44-3.9,16.8-10.17-27.52,13,9.56,17.66-5.28-16.61ZM102,162.41l35.63-16.63L153.76,130l-15.25,17.91L96.89,167.42,77.63,157.34l-3.95-7.25L75,126.44l11.32-5.91-9,6.7,2,25L91.79,117c2.63,14.6,9.19,18.3,25,15.6L98.07,159.49,122.85,142,102,162.41ZM80.51,83.88C80.92,78,81,72.14,81,67.7a34.78,34.78,0,0,1,0-10c6.8-9.83,21.37-13.14,33.2-10.68-11.75-1.21-27.52,3.25-32.07,13.47-.23,5.14,0,12-.45,17.91A51.57,51.57,0,0,0,82,91a4.93,4.93,0,0,1-1.86-4.3,2.62,2.62,0,0,0-1.29,2.47c0,2.14,2.58,8.21,4.34,8.86a2.88,2.88,0,0,0,2.37-.51c-.23-1.11-.8-3.16-1-4.4-.43-2.29-.82-4.7-1-6.81a12.17,12.17,0,0,1,2.4-8.72A28.83,28.83,0,0,1,86.47,66c9-7.76,28.18-6.77,34.71-3.66A13.82,13.82,0,0,1,123,71.11a15.6,15.6,0,0,0-4.71.45,31.54,31.54,0,0,0-9.59,5l1.66,16.08c-5.15,2-3.45-2-9.52,1.88,1.42,1.78,2,2.53,4.53,1.4,1.24,1.62,4.67,1.62,6.08.59a5.93,5.93,0,0,1,5.91,6.08,5.87,5.87,0,0,0-4.55-2.7l-1.25,1-2.73-1.1-3.12,1.68-1-1.3a5.85,5.85,0,0,0-3.52,1.94c-.15-1.25.11-2.79,1.69-4.89-5.58,3-6.53,7-5.08,13,.83-2.54,2-5.31,5-7.08,3.37-.17,7.4-.41,10.77-.58a1.78,1.78,0,0,1,1.37,2.3l-10.61.5a7.1,7.1,0,0,0-.23,9c.42-1.93,1.76-4.62,3.17-5.42l1.16,0a17.8,17.8,0,0,1-.18,18.48c-2.63-3.62-3.51-5.51-3.76-11.13a18.52,18.52,0,0,0-2.19,9.35c-4.45-5.14-5.41-10.57-4.54-14.74a10,10,0,0,0-4,3.66c-4.7-5.66-4.92-5.93-6.48-13.32-.5-2.92-3.28,1.37-6.51-3.82a29.54,29.54,0,0,1-3.15-6.6,6.13,6.13,0,0,1,2.88-7Zm25.36-2c.22-1.67.23-3.46.37-5-1.87-2.49-8.16-3.89-11-3.68A19.35,19.35,0,0,0,89.51,77l5.76-1.41,6.63,2.28L102,79a14.49,14.49,0,0,0-5.88.72l-4.69,3.81,3.62,0c.26-1.24,1.3-1.44,2.06-.28,2.42-.22,3.36.17,5.27-1.3-.45,1.8-1.65,3.06-3.25,4.67,4.76-1.74,5.65-3.1,6.78-4.77ZM116.08,78c1.57-.48,3.09-.37,6.21-.39A10.75,10.75,0,0,0,122.4,76a8.78,8.78,0,0,0-4-1.42,9.07,9.07,0,0,0-6.31,5.27,26.48,26.48,0,0,1,4-1.92Zm-3.67,4.57A34.25,34.25,0,0,0,115.2,92c3.57.61,5.3,5,7.43,7.74-.62-.87-.63-6.37,3.64-8.91.63-1.41.74-5.88-.84-7.23-1.33.74-4.36.7-5.21-.08A3,3,0,0,0,121.75,82a.69.69,0,0,0-.36-.88c-.47-.12-.8.44-.79.85-1.8.27-4.09.65-5.54-1l-2.65,1.5Zm4.67,41.91c1-5.54,4.18-11.41-3.28-14.42C116.84,115.71,111,121.18,117.08,124.43Z"/>
    </svg>
  `;

  return <div dangerouslySetInnerHTML={{ __html: svgMarkup }} />;
};

export default AbayDark;
