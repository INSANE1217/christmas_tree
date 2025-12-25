#!/usr/bin/env node

import open from 'open';

const url = 'https://npm-christmas-tree.web.app';

console.log('\x1b[32m%s\x1b[0m', '🎄 Starting npm-christmas-tree experience...');
console.log('Opening: ' + url);

open(url).catch(err => {
  console.error('Failed to open browser:', err);
  process.exit(1);
});
