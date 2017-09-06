FROM node
MAINTAINER Xenwar Hassen <anwar.hassen@aalto.fi>

RUN mkdir /code
RUN apt-get update -y

#
EXPOSE :3000

add start.sh /start.sh
copy ./code/ /code

CMD ["/start.sh"]
