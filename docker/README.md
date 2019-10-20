# Configure Docker

Package the distribution artifacts
<pre>
Johns-MBP:rental-ui-react-redux admin$ npm run build

> baltimore-county-rental-portal@1.0.0 build /Users/admin/GitHub/rental-ui-react-redux
> webpack --mode production --config webpack.prod.js

clean-webpack-plugin: /Users/admin/GitHub/rental-ui-react-redux/dist has been removed.
Hash: da56f7817b2ab79f7ecb
Version: webpack 4.41.2
Time: 5161ms
Built at: 10/20/2019 8:50:58 AM
       Asset       Size  Chunks                   Chunk Names
./index.html   1.46 KiB          [emitted]        
    main.css  237 bytes       0  [emitted]        main
main.css.map  436 bytes       0  [emitted] [dev]  main
     main.js    950 KiB       0  [emitted]        main
 main.js.map   4.08 MiB       0  [emitted] [dev]  main
Entrypoint main [big] = main.css main.js main.css.map main.js.map
 [39] (webpack)/buildin/global.js 472 bytes {0} [built]
 [40] (webpack)/buildin/module.js 497 bytes {0} [built]
[238] (webpack)/buildin/harmony-module.js 573 bytes {0} [built]
[240] ./node_modules/moment/locale sync ^\.\/.*$ 3 KiB {0} [optional] [built]
[394] ./src/styles/main.css 39 bytes {0} [built]
[395] ./src/index.js + 107 modules 551 KiB {0} [built]
      | ./src/index.js 314 bytes [built]
      | ./src/js/registerServiceWorker.js 4.15 KiB [built]
      | ./src/js/store.js 275 bytes [built]
      | ./src/js/actions/rentals.js 3.23 KiB [built]
      | ./src/js/reducers/index.js 133 bytes [built]
      | ./src/js/reducers/rentals.js 3.66 KiB [built]
      |     + 102 hidden modules
    + 544 hidden modules

WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
Entrypoints:
  main (950 KiB)
      main.css
      main.js


WARNING in webpack performance recommendations:
You can limit the size of your bundles by using import() or require.ensure to lazy load some parts of your application.
For more info visit https://webpack.js.org/guides/code-splitting/
Child html-webpack-plugin for "index.html":
     1 asset
    Entrypoint undefined = ./index.html
    [0] ./node_modules/html-webpack-plugin/lib/loader.js!./src/index.html 1.45 KiB {0} [built]
Child mini-css-extract-plugin node_modules/css-loader/index.js!src/styles/main.css:
    Entrypoint mini-css-extract-plugin = *
    [0] ./node_modules/css-loader!./src/styles/main.css 380 bytes {0} [built]
        + 1 hidden module
</pre>

Build the docker container
<pre>
Johns-MBP:rental-ui-react-redux admin$ docker build --rm -f docker/Dockerfile -t rental-react-app:latest .
Sending build context to Docker daemon  237.4MB
Step 1/5 : FROM nginx:1.15.2-alpine
 ---> 36f3464a2197
Step 2/5 : COPY /dist /var/www
 ---> cc28e174c3b7
Step 3/5 : COPY /docker/nginx.conf /etc/nginx/nginx.conf
 ---> 7e990192f864
Step 4/5 : EXPOSE 80
 ---> Running in 2aabddb64722
Removing intermediate container 2aabddb64722
 ---> 9ea4dfb57b2d
Step 5/5 : ENTRYPOINT ["nginx","-g","daemon off;"]
 ---> Running in 21c919f132aa
Removing intermediate container 21c919f132aa
 ---> 83b7d3b666e7
Successfully built 83b7d3b666e7
Successfully tagged rental-react-app:latest
</pre>

Run the Docker container locally
<pre>
Johns-MBP:rental-ui-react-redux admin$ docker run --rm -d -p 5000:80 -e http://localhost:8080/api/ -e DEFAULT_RENTAL_CITY=NOTTINGHAM rental-react-app:latest
892dcbaaa52a16c02b16811b0f72c72757d60e106ea10a546986eb15a921c7d4
</pre>

Push the Docker container to ECR
<pre>
Johns-MBP:rental-ui-react-redux admin$ aws ecr get-login
Johns-MBP:rental-ui-react-redux admin$ docker login -u AWS -p eyJwYXlsb2FkIjoiYVRpSVh3WkZic1hGQ2VXZGR3UXdFMlZFaFF3RnpNSnF1Y0t0ZStmaGU0cWpEeFphT3lZRXRpQzZremZVR0xsSTBzWk5nL3R0RDFNY3NQYWpna3ZhVjIyLzFPUlIxZmlIQWgyNnJ4NXgydjk4K3J5Z2kvUDJ5RzFseFNuWm9KbmVraFFEQW5uZ2tKYjVTbFc2Z3BYa1QxZURSVHJqbFZXUmtNYUpZQmNCNUxGaVlKN2RBMFBkNkx6SXpyOUZzV1FEdjZwNFYyMVpLekE1L0J1SDhFUGxnOWtmMWVTLytmcFE5cEtlMTVHdExzRTNhZlBhaFJsVkZVcWo0RTAvcGlRMU1hSmZZT09EdXRJOVNSWHAyY1FGSHVxaUlvWGZVRHc5TSs2aUZpZ2p2ZnFxdkRwVmZCcnpGeHN1R1ltTzdQSE8rM0dHRkxjNHEyUjFoOVJWNzBTaHhQV2tucVVYN2dqZW9hMXdCYmRXRG4xVVZCUHRVNTZzZVFvUmM5eFlYU3plT05DZjU1U25ldXkrTDZLeTVya2xiazRSNVE5bzNMeFZub3JlVDk0d0p3N0t0a2gvckNEajByNGVOa3EvYjBlMVQvVkFLQ3dtVXN6UFNZTXNhOXRkRnJmUzl6M1RxWm9GNTJNa3BUamZGeUFuUHREeEIyelhpblp5czlwMVBFb1dUK1pMZVpvYWZwRVlQRmJjWnNOWjZzWnBZZU80eHVLL1I5UzVhTm02Um44Y3p0dnZnd1FtSUJCL2Q3RFhpa0ErbE5ja3hOWE9zdU5WYUE5YW1NUXhaUlkxTllYelMwb0MxMXYxUmxxdjJKTzhJRmFuMFowY2hPSkdvMEZDbStPc21kbVJyeU0rd2RQb09oNDhKc2NYcDdiUEphNWN4RXczZDh1WTcrRnJaUlFhbis5b0tveVFMdFpLd0pUQ2Fhdkd5djF4d0J2Rk4zQXRSZnhjcGtHTklDUkwwcjdId1MzZHFZUU9peW5MMUNOWjl6aWlGWkt4SXV5MVEycTBvSnR6VXNvbmhBUlJQRlZJUzNYTm5jc3drajdlRjRoNDZsazA4ZXhKM0Z3R0JTNG9wYm1hallmUHBtaHo3Nk5VZGlGd013bjZEbnhyOUp6UlA2Tzk0aGZiU2ZvWjNUbi9QbU1wN05SdU9LY1hzOSszbVYvcDYxcWxBeGVPNjMxOW04aWI2cE9tb3krTi9xZjRnVzRPNXpQeWFsZmxYbGlmczAzRDlaM0VLNXJqejZDQm8yY05oQiszcWxxUU82OHN3Ulp4c015dUovRERDcjB2am8vMkZMcnR1RkN6bVYvNGlHK1lrZkF1RGhPMXd5TDMxc0VUWTFZYmNFZXBFRC9SRmdwVEJtWk43VzloNU9TZWpHQXE3aXBTSHcxTmZGUWtZOGFIaEdCdmhGTTRvRDdIN0hFK01oY0JZR1lqQmNudmRGNjFBQjFqcU1jblBBd2Zhek5EZi9jNlM0UlQrcTBDaHFIM09QcjFyVnNac29GNHlBPT0iLCJkYXRha2V5IjoiQVFFQkFIaHdtMFlhSVNKZVJ0Sm01bjFHNnVxZWVrWHVvWFhQZTVVRmNlOVJxOC8xNHdBQUFINHdmQVlKS29aSWh2Y05BUWNHb0c4d2JRSUJBREJvQmdrcWhraUc5dzBCQndFd0hnWUpZSVpJQVdVREJBRXVNQkVFREgxT1hFTHh1MlJseWtPRnZ3SUJFSUE3SnV4Y3cvczIrWXFJai9rck13dW1HZ2JYblRVUm1PRzhpdHZLamZVM3pLNTVpMGttUVp5aGlJKzZQbmtKZksvT0ZpQWlmdHBuVkJVZnFZdz0iLCJ2ZXJzaW9uIjoiMiIsInR5cGUiOiJEQVRBX0tFWSIsImV4cGlyYXRpb24iOjE1NzE2MTkzMzh9  https://002609254882.dkr.ecr.us-east-1.amazonaws.com
WARNING! Using --password via the CLI is insecure. Use --password-stdin.
Login Succeeded

Johns-MBP:rental-ui-react-redux admin$ docker images
REPOSITORY                                                  TAG                 IMAGE ID            CREATED             SIZE
rental-react-app                                            latest              83b7d3b666e7        4 minutes ago       23.9MB

Johns-MBP:02-separate-component admin$ docker tag e0b165159c32 002609254882.dkr.ecr.us-east-1.amazonaws.com/rental-react:latest
Johns-MBP:rental-ui-react-redux admin$ docker tag 83b7d3b666e7 002609254882.dkr.ecr.us-east-1.amazonaws.com/rental-react:latest
Johns-MBP:rental-ui-react-redux admin$ docker push 002609254882.dkr.ecr.us-east-1.amazonaws.com/rental-react:latest
The push refers to repository [002609254882.dkr.ecr.us-east-1.amazonaws.com/rental-react]
258be6493940: Pushed
c30ab9e10ee0: Pushed
ecbc53aebc27: Layer already exists
1585039add0a: Layer already exists
692d855fb28e: Layer already exists
717b092b8c86: Layer already exists
latest: digest: sha256:53ccf65088a42ffed381d86d359852b5cd5683714f77e62f54d71510e5d24e0d size: 1572
</pre>

Log on to EC2 and run the Docker container. Make sure to use the credentials from the previous step
<pre>
ubuntu@ip-172-31-61-12:~$ sudo docker login -u AWS -p eyJwYXlsb2FkIjoiUEZkU3JJVENlQmJzREozS0picWhVMnh6OERKOUgrTmpiU2p3eUhSemdsdk1HMU9hV1ZUcGRmL0FHYmZUQ0FzdmxuUm96am9QY3AzZm0raWVTY3UvNzRkUFh1WnV4c2VGcFowWDRwMys5SHRhNGdYaWIxL0ZydEswTWdIT1hRZ3VYZ0FnTmFndjBUZDZpT1FmcGVFRDdGTE1naEJpMHhiQkd0SnIvZEpDK0JNVnZITTlCSEhML2RxdU9aSDZwRkwzT2p3eDcxY1p2Q1ovMXdBdXd0ZG10KzVrYURaTnh6amt4Tk9tMGliZUoxSW80YlM5OHZmZTZXQTk0WXlSUjh1b3RUOVJZeDZFeDJMUnhNdUNHb3QxY2VUY1E4SWFmMVRoWmxhdUo2dFFVbitLSTd1ZzZWMFlSN0c2ZTdjb1B4TU1meGpoY2hrQVVKcjZYT0pydDZkbjFRZU1tQmk2S0lQWDRyK0RaSVY2ME5WUWJNckE3N1U0NnloU0FNWUtNRUZPUlh1L0phZ2xRNnpaUURNcFBpdEpTZVJBcm45UU1KYUlmdWlJRGNGRUJXVmNHcmlWTVZYNzZRU1lXZWZMNnBYZGVBd2plWWhJVjVqUVFOYVRJaDJyZXFvUlRYZXljVnNudU9SQlVCa2FGL2p6Vi9zTkkwWXVBcDNjYXREdVRyMUNRdTVyRFA0czlaR3JVMkY3TDNXMUxvOUFVV3UrNmpZWTBxOEwyZERkb3VJMHp5MzR2V0xPQk9kRlhVNVhMOU1XcTlzVW4rNUZtTmpOdmRKOTNONUUrZ3ZFa1pXZmwwWTJTaUdHTjBTbEoyWXp0TXZQTnIyNEpMc3hDMTBCbCtncVVLUkpubWpZOEFsMnJiYnVWYTdUOW43ZUt1SEF4VTB6cElZNXpTZ1E2YXVRVHFIbnIzMWFLaTQvTnJHUGFVSGdiYmMwbER2ckczOXNhU1dsTVY5YzU5WG4zTXZ1dk9GY0U4NnVWdHpmTko5cmFXUjFaU2tPaEVyblByU0dCMXpmaWwyZkVlS2lKWjB6K0ZCczhObC9zTTJmUjNWZEFnSHpPdEpDQWNxcXJ1UWN1Q21RSVJYUkw1V2RuYThaSnBDR3NCK282R2tkUk1sYkhsZllSUjNFRlZSWWk5Wm11WjdONnVHQ0hoVkYvRnhlK2N0N1dWRHZKZ3IwdlJBZHVYZWVsY1VmbDdzYzRlcTRyUThMeVhTNGNPc3B1RGJzSGp3Rkl6MFhyRVJKSDVOcEo0Umt2S1VBczZrVkt1ZWR3SkV1Yk1NNkprUVNFZVhSQ1hDdkk5TkJJQlVDaWJibWpFUmdhMHptNFBGWUI4SURFVWVGN3ZwckFEc0V2VlBZZjBjRCtjVjZ2SFNrbmhaZjlCSXNoV3kyVTBnOVBqbWhySndYQkYraTFzRlZVbzNEMVd6bHB5ZmJoenpCUVpnVmNEeW9SV1RUNU00TGZIQjljV0UybFNNRU0yVTY3R1lMZStkYzdMZTBQOHUvZ1RCRGFnPT0iLCJkYXRha2V5IjoiQVFFQkFIaHdtMFlhSVNKZVJ0Sm01bjFHNnVxZWVrWHVvWFhQZTVVRmNlOVJxOC8xNHdBQUFINHdmQVlKS29aSWh2Y05BUWNHb0c4d2JRSUJBREJvQmdrcWhraUc5dzBCQndFd0hnWUpZSVpJQVdVREJBRXVNQkVFRExGeFUwL2tNTHI0cVVRdGtnSUJFSUE3ZGpyaDFFQ0ZFNmpZYVVwdWxsY3NVNmJ1NUtHendYdFFPUzFzbnVkQzBHTUFWV3pDKzUveWZ1blF5UEVXUVQ2NXRhNk5ZYnl6MmdSL3JEZz0iLCJ2ZXJzaW9uIjoiMiIsInR5cGUiOiJEQVRBX0tFWSIsImV4cGlyYXRpb24iOjE1NzE2MTk5Nzd9 https://002609254882.dkr.ecr.us-east-1.amazonaws.com
WARNING! Using --password via the CLI is insecure. Use --password-stdin.
WARNING! Your password will be stored unencrypted in /home/ubuntu/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded

ubuntu@ip-172-31-61-12:~$ sudo docker pull 002609254882.dkr.ecr.us-east-1.amazonaws.com/rental-react:latest
latest: Pulling from rental-react
911c6d0c7995: Pull complete
131e13eca73f: Pull complete
95376bf29516: Pull complete
6717402ec973: Pull complete
814edf0f5e61: Pull complete
7f4a9d1500d4: Pull complete
Digest: sha256:53ccf65088a42ffed381d86d359852b5cd5683714f77e62f54d71510e5d24e0d
Status: Downloaded newer image for 002609254882.dkr.ecr.us-east-1.amazonaws.com/rental-react:latest
</pre>

Run the Docker container
<pre>
ubuntu@ip-172-31-61-12:~$ sudo docker images
REPOSITORY                                                  TAG                 IMAGE ID            CREATED             SIZE
002609254882.dkr.ecr.us-east-1.amazonaws.com/rental-react   latest              83b7d3b666e7        15 minutes ago      23.9MB
<none>                                                      <none>              d640fd162af7        37 hours ago        244MB
mysql                                                       5.7                 1b30b36ae96a        12 months ago       372MB

ubuntu@ip-172-31-61-12:~$ sudo docker run --rm -d -p 80:80 -e http://ec2-34-204-247-182.compute-1.amazonaws.com:8080/api/ -e DEFAULT_RENTAL_CITY=NOTTINGHAM 83b7d3b666e7
5120c82fd9fc8e029744e15d631b70b76d2581167f31e43bc52e45b9a3780b56

ubuntu@ip-172-31-61-12:~$ sudo docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                               NAMES
18422b6b00ea        e0b165159c32        "nginx -g 'daemon of…"   6 seconds ago       Up 5 seconds        0.0.0.0:80->80/tcp                  friendly_rosalind
2e253cde71e5        7a3dae38fcd9        "sh -c 'java $JAVA_O…"   2 hours ago         Up 2 hours          0.0.0.0:8080->8080/tcp              hungry_allen
ae95539be50b        mysql:5.7           "docker-entrypoint.s…"   7 hours ago         Up 6 hours          0.0.0.0:3306->3306/tcp, 33060/tcp   mysql
ubuntu@ip-172-31-61-12:~$
</pre>
