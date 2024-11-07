module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ["> 1%",
        "last 2 versions",
        "not ie <= 8"]
    },
    // "postcss-sprites": {
    //   // stylesheetPath: './css',
    //   spritePath: './dist/static/img',
    //   spritesmith:{
    //     padding: 2, //图片之间间距 ，防止rem计算误差
    //   },
    //   filterBy: function (image) {
    //     image.ratio = 2 //处理二倍图
    //     // Allow only png files
    //     if (!/\.png$/.test(image.url)) {
    //       return Promise.reject();
    //     }
    //     return Promise.resolve();
    //   }
    // },
    // 'postcss-pxtorem': {
    //   rootValue: 375/20,//结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
    //   propList: ['*']
    // },

  // plugins: {
  //   autoprefixer: {
  //     browsers: ["> 1%",
  //       "last 2 versions",
  //       "not ie <= 8"],
  //   },
  // 'postcss-pxtorem': {
  //   rootValue: 375/20,//结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
  //   propList: ['*']
  // },
},
}
