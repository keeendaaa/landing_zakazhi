#!/bin/bash
export PATH=$PATH:/root/.local/bin
cd /opt/zakazhi
export JWT_SECRET='KMIiSDMp8/3xsUaidCVdUQgaLKfTF8w1WOfYeHxSWB8='
# Используем встроенную БД Wasp
wasp db start &
sleep 5
exec wasp start
