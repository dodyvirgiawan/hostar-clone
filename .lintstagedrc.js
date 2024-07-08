// ? Note: I'm using lint-staged with husky and next lint as a pre-commit hook to prevent code that
// ?       does not obey oureslint standard from being committed.
// ? Reference: https://nextjs.org/docs/pages/building-your-application/configuring/eslint#lint-staged

const path = require('path')
 
const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`
 
module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
}