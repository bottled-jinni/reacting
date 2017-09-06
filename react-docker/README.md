buidl the image with: make build
run the app with: make run
#you need to wait for a while until the app comes online. 
open your browser on http://localhost:3000/


To stop the application, run: make stop
To remove the container, run: make remove

To remove the iamge, run: make clean



If port 3000 is taken, update the Makefile
Either change the port on the left of ':' shown below. 
Or 
kill the processes using the port. run [lsof -i :3000] to get the PIDS
#docker run -p 3000:3000 -d ${USER}/${DOCKER_IMAGE_NAME}

