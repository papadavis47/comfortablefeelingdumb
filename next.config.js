module.exports = {
  experimental: {
    outputFileTracingIncludes: {
      '/*': ['./posts/**/*'],
    },
  },
  // Had to put in this line after an error from upgrading
  // Found the info here:
  //https://github.com/vercel/next.js/issues/63318
  transpilePackages: ['next-mdx-remote'],
};
