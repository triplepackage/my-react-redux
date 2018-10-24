# Configure Docker

Build the docker container
<pre>
Johns-MBP:02-separate-component admin$ docker build --rm -f docker/Dockerfile -t rental-react-app:latest .
Sending build context to Docker daemon  229.8MB
Step 1/5 : FROM nginx:1.15.2-alpine
 ---> 36f3464a2197
Step 2/5 : COPY /dist /var/www
 ---> Using cache
 ---> f7fe5fc5c231
Step 3/5 : COPY /docker/nginx.conf /etc/nginx/nginx.conf
 ---> e46633b5ea0d
Step 4/5 : EXPOSE 80
 ---> Running in deba24e02f7b
Removing intermediate container deba24e02f7b
 ---> a0a720c44344
Step 5/5 : ENTRYPOINT ["nginx","-g","daemon off;"]
 ---> Running in ba5d2f6a347f
Removing intermediate container ba5d2f6a347f
 ---> 46437a594e03
Successfully built 46437a594e03
Successfully tagged rental-react-app:latest
</pre>

Run the Docker container
<pre>
Johns-MBP:02-separate-component admin$ docker run --rm -d -p 81:80 rental-react-app:latest
0ce1226054d8ed8c4acc3c7f98820358657024c3933e262dd65af2d6f4eb8208
</pre>

Push the Docker container to ECR
<pre>
Johns-MBP:02-separate-component admin$ aws ecr get-login

Johns-MBP:02-separate-component admin$ docker login -u AWS -p eyJwYXlsb2FkIjoiTXZsUk5uQksrMDlGK29EMFdJWTM2OE9CclZHN3gxOW9nWXFYcTZJU2tCRStUTDZkbUxXRFF1d3NzT2FMWDVBMUR4aWg2RExJYmtzUTFKNy9kWjN1SFZBcndJNW53Mno3STlIMEdxcjNMQ3dWdWZNSnhYODVheWtEMzVQMUVTS1ltb1AzdnFaM0NzRHNLNmMwcnFLRjkvQm4vNHpMZCtUVC9yQUQwU280dFJzM3RTNVNwOTE3bDJrVnJ2a1NMVzEvT3Jsbi9KaUR2dFNXdXp3NWNGVDFwMmlBaEtXTmZFMktDMGhzcFdab3BHQ3hmc3hyY3dmWWhCMmxITUdLWFNrOEhKc2NUSzM1alE0QVoxU1ExbktsTDZBbTBGSXEvd3lFVGVhNWIxQ2RYdmFqVCtWaFhqOUQzSi91NFdiVk4yMXI5TER1SmVKOWFrV01mU0hjRFViSHg5dGhuWkF3SHhRekZWUlVYck5jVzZoUjhxS3ZGaFpKYlZGRmRYNFJMYXRHalZkNlp3VXlzeE9GKzJJRUhVSWVWbHBBSUs1M24vWlhHblN0TFh2d01CQmEyY2J4UFYyb0ZFNTBSNmtvZ0ZrMWxZZG9ZSk43R1dqSWM5OU5yS2t0Qng0VDdNRFEvNmtDVTF1R2d6a3U2S0xITk1FQ004QW00VkpieTFQTk0rVlAxcjkzbFZYcnhCMGgrM2FsWnplUUZQenFWazkrZFIwZlBkL2JXaVFML21vcDhSMWEyZWQyWmZYSGlFUnE4cXZKakJlUjl3ejFiOFlJTmxFWEFMa2Vld1N2NmRtRk0waExsNGpvUEE2NUVibDNOS2crYXN1WEpJQ3E4TVpRWlc5OFYyd2FnRDZ1RWw4UnpFMlFwKzhsMytCOTRsVzNNcXVGYS9jZ0xLWXY0WE9WaVZJRDgrRVFVd2hIZUtaU2JCTGQvY1BVOTJUQ3FYc1JVYm92K3dBOFh0Qk1VV212bFR4eGgrM1pnd3hyN1U4ZDJ2UHRmY0lLY29MazVKVkZyR21tVS9Vd2RFbGozUnduOFZQVUZiNUhGaUxyYm1lekhJYWVtdU05LzB1ZVcz************************0SENrc1I5eWRYR3pZUGtZRDNUdDhnU1RrUXd4UFNsbXFXQTNYcHlEMWgrZHFGMjNBdlZTYkJxRnhsc2dYclZ3NGZuOERCTzBRPT0iLCJkYXRha2V5IjoiQVFFQkFIaHdtMFlhSVNKZVJ0Sm01bjFHNnVxZWVrWHVvWFhQZTVVRmNlOVJxOC8xNHdBQUFINHdmQVlKS29aSWh2Y05BUWNHb0c4d2JRSUJBREJvQmdrcWhraUc5dzBCQndFd0hnWUpZSVpJQVdVREJBRXVNQkVFRE00QkFJYW1CaUhDbjd3S3FRSUJFSUE3THZvU3VkaHZTVDZPWFN1emxvM0h3UmZMdXFVSnA3MW1zRnczZk9PUGVQTlFGL0dyTEpCVzNQUk14SFlXeVppRXpEc3VXQXNsRFF1RVNYUT0iLCJ2ZXJzaW9uIjoiMiIsInR5cGUiOiJEQVRBX0tFWSIsImV4cGlyYXRpb24iOjE1NDAzODA1NjN9 https://002609254882.dkr.ecr.us-east-1.amazonaws.com
WARNING! Using --password via the CLI is insecure. Use --password-stdin.
Login Succeeded

Johns-MBP:02-separate-component admin$ docker images
REPOSITORY                                                TAG                 IMAGE ID            CREATED             SIZE
rental-react-app                                          latest              e0b165159c32        7 minutes ago       25.4MB

Johns-MBP:02-separate-component admin$ docker tag e0b165159c32 002609254882.dkr.ecr.us-east-1.amazonaws.com/rental-react:latest
Johns-MBP:02-separate-component admin$ docker push 002609254882.dkr.ecr.us-east-1.amazonaws.com/rental-react:latest
The push refers to repository [002609254882.dkr.ecr.us-east-1.amazonaws.com/rental-react]
3229b2a7a96c: Pushed
6b9f36131c45: Pushed
ecbc53aebc27: Pushed
1585039add0a: Pushed
692d855fb28e: Pushed
717b092b8c86: Pushed
latest: digest: sha256:9b9d87ed7212aa9604fdfec0943070055f1988af6c596412949f80c3059f276f size: 1571
</pre>

Log on to EC2 and run the Docker container
<pre>
ubuntu@ip-172-31-61-12:~$ sudo docker pull 002609254882.dkr.ecr.us-east-1.amazonaws.com/rental-react:latest
latest: Pulling from rental-react
911c6d0c7995: Pull complete
131e13eca73f: Pull complete
95376bf29516: Pull complete
6717402ec973: Pull complete
96438cde2b3a: Pull complete
24ebbbf792db: Pull complete
Digest: sha256:9b9d87ed7212aa9604fdfec0943070055f1988af6c596412949f80c3059f276f
Status: Downloaded newer image for 002609254882.dkr.ecr.us-east-1.amazonaws.com/rental-react:latest
</pre>

Run the Docker container
<pre>
ubuntu@ip-172-31-61-12:~$ sudo docker images
REPOSITORY                                                  TAG                 IMAGE ID            CREATED             SIZE
002609254882.dkr.ecr.us-east-1.amazonaws.com/rental-react   latest              e0b165159c32        13 minutes ago      25.4MB
002609254882.dkr.ecr.us-east-1.amazonaws.com/production     latest              7a3dae38fcd9        2 hours ago         244MB
mysql                                                       5.7                 1b30b36ae96a        7 days ago          372MB
(ubuntu@ip-172-31-61-12:~$ sudo docker run --rm -d -p 80:80 e0b165159c32 
18422b6b00ea2213605a7e43b79be083df91dcb5f8a1e9fd5ebd10442f1841d7
ubuntu@ip-172-31-61-12:~$ sudo docker ps -a
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                               NAMES
18422b6b00ea        e0b165159c32        "nginx -g 'daemon of…"   6 seconds ago       Up 5 seconds        0.0.0.0:80->80/tcp                  friendly_rosalind
2e253cde71e5        7a3dae38fcd9        "sh -c 'java $JAVA_O…"   2 hours ago         Up 2 hours          0.0.0.0:8080->8080/tcp              hungry_allen
ae95539be50b        mysql:5.7           "docker-entrypoint.s…"   7 hours ago         Up 6 hours          0.0.0.0:3306->3306/tcp, 33060/tcp   mysql
ubuntu@ip-172-31-61-12:~$
</pre>
