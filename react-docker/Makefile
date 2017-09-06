DOCKER_IMAGE_NAME = reactsignup
USER=bottledjinni
build:
	echo "BUILDING MIGHT TAKE SOME TIME"
	docker build -t ${USER}/${DOCKER_IMAGE_NAME} .
run:
	echo "RUNNING APP ON PORT 3000"
	docker run --name signupapp -p 3000:3000 -d ${USER}/${DOCKER_IMAGE_NAME}
	echo "THIS MIGHT TAKE A WHILE BEFORE IT SHOWS UP ON YOUR BROWSER"
stop:
	echo "STOPPING THE APP CONTAINER"
	docker ps -aq --filter "name=signupapp" | xargs docker stop
remove:
	echo "REMOVING THE CONTAINER. 'If you wish to remove the image, run: make clean'"
	docker ps -aq --filter "name=signupapp" | xargs docker rm -f
clean:
	echo "removing both the container and the corresponding image"
        #docker images -aq --filter=reference='bottledjinni/reactsignup'|xargs docker rmi -f
	docker images -aq --filter=reference='bottledjinni/reactsignup' | xargs docker rmi -f

.PHONY: build
