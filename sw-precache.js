const prefix = '_site';

module.exports = {
  staticFileGlobs: [
   
     prefix + '/**/**.html',     // 所有页面，文章页面的html（必须包含）
     prefix + '/assets/**/*',
     prefix + '/files/**/*',
     prefix + '/images/**/*',
     '**//cdn.bootcss.com/**/*',
  ],
  stripPrefix: prefix
}
