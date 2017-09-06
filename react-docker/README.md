# To run as a docker container, Use one of the following options.

## Options (a), download from docker hub
docker run --name signupapp -p 3000:3000 -d bottledjinni/reactsignup

## Options (b), build it locally. 
### Use the following commands. 

```
To build the image, run: 
  make build
To run the app, run: 
  make run

You might need to wait for a while until the app comes online. 

open your browser on 
```
http://localhost:3000/
```
To stop the application, run: 
   make stop
To remove the container, run: 
   make remove

To remove the iamge with its dependencies, run: 
   make clean


Note:
If port 3000 is taken, update the Makefile
Either change the port on the left of ':' shown below. 
Or 
kill the processes using the port. 
   To get the pids, run [lsof -i :3000]
 
#change the port in the Makefile, run block 
#docker run -p 3000:3000 -d ${USER}/${DOCKER_IMAGE_NAME}
```
