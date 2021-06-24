# Vue Element UI后台管理界面

## 效果图

![Screenshot](/docs/p1.png)

![Screenshot](/docs/p2.png)

![Screenshot](/docs/p3.png)

![Screenshot](/docs/p4.png)

![Screenshot](/docs/p5.png)

## 线上网站

> http://8.135.100.252/

## nginx配置

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
