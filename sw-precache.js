const prefix = '_site';

module.exports = {
  staticFileGlobs: [
    // prefix+'/**/*'
     prefix + '/**/**.html',     // 所有页面，文章页面的html（必须包含）
    //  prefix + '/assets/**/*',
     prefix + '/files/**/*',
     prefix + '/images/**/*',
    'https://cdn.bootcss.com/mathjax/2.7.0/jax/output/HTML-CSS/jax.js?V=2.7.0' 
  ],
  stripPrefix: prefix
}
