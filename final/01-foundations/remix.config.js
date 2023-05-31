/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  serverModuleFormat: "cjs",
  ignoredRouteFiles: [
    ".*",
    "**/*.css",
    "**/*.test.{js,jsx,ts,tsx}",
    "README.md",
  ],
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
};
