# Vue Element UI后台管理界面

## 效果图

![Screenshot](/docs/p1.png)

![Screenshot](/docs/p2.png)

![Screenshot](/docs/p3.png)

![Screenshot](/docs/p6.png)

![Screenshot](/docs/p5.png)

## 线上网站

> http://8.135.100.252/

## Vue打包配置

``` javascript
module.exports = {
  //基本路径
  publicPath: "./",
  //输出文件目录
  outputDir: "dist",
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: "static",
  //生产环境不需要生产map文件
  productionSourceMap: false,

  devServer: {
    port: 8080, // 端口
    open: false, // 自动开启浏览器
    compress: false, // 开启压缩
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://124.71.82.74:8079',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
};
```

## Nginx配置 

``` shell
server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   /www/server/tomcat/webapps/dist;
            index  index.html index.htm;
        }

        location ~/(img|images)/.*\.(gif|jpg|jpeg|png)$
        {
            root   /www/server/tomcat/webapps/dist;
        }
 
        # 解决proxyTable处于生产环境的问题
        
        location ^~/api/ {        
            rewrite ^/api/(.*)$ /$1 break;        
            proxy_set_header   Host             $host;        
            proxy_set_header   x-forwarded-for  $remote_addr;        
            proxy_set_header   X-Real-IP        $remote_addr;        
            proxy_pass http://124.71.82.74:8079;    
        }
        
        location /api{
            rewrite ^.+api/?(.*)$ /$1 break; 
            include uwsgi_params; 
            proxy_pass http://124.71.82.74:8079; 
        }
 
        error_page   404   /404.html;
}

```
