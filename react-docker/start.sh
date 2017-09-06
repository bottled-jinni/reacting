#!/bin/bash
cd /code
npm install
npm start
tail -f /var/log/dmesg #let it hang.
#tail -f /var/log/syslog
