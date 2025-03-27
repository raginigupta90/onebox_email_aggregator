"use strict";
// import { ReportHandler } from 'web-vitals';
Object.defineProperty(exports, "__esModule", { value: true });
// const reportWebVitals = (onPerfEntry?: ReportHandler) => {
//   if (onPerfEntry && onPerfEntry instanceof Function) {
//     import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
//       getCLS(onPerfEntry);
//       getFID(onPerfEntry);
//       getFCP(onPerfEntry);
//       getLCP(onPerfEntry);
//       getTTFB(onPerfEntry);
//     });
//   }
// };
// export default reportWebVitals;
const web_vitals_1 = require("web-vitals");
const reportWebVitals = (onPerfEntry) => {
    if (onPerfEntry && typeof onPerfEntry === 'function') {
        (0, web_vitals_1.onCLS)(onPerfEntry);
        (0, web_vitals_1.onFID)(onPerfEntry);
        (0, web_vitals_1.onFCP)(onPerfEntry);
        (0, web_vitals_1.onLCP)(onPerfEntry);
        (0, web_vitals_1.onTTFB)(onPerfEntry);
    }
};
exports.default = reportWebVitals;
