import path from 'path'

export default {
  siteRoot: "https://djiang9001.github.io",
  getSiteData: () => ({
    title: 'Daniel Jiang',
  }),
  silent: true,
  plugins: [
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
    require.resolve('react-static-plugin-styled-components'),
  ],
}
