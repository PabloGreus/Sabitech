FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    apache2 \
    php libapache2-mod-php php-mysql \
    openssh-server \
    nano vim curl iputils-ping mariadb-client sudo \
    && rm -rf /var/lib/apt/lists/*

# Configuración mínima de SSH (opcional)
RUN mkdir -p /var/run/sshd \
    && useradd -m -s /bin/bash admin \
    && echo "admin:admin123" | chpasswd \
    && usermod -aG sudo admin

EXPOSE 80 22

# Arranca SSH en segundo plano y Apache en primer plano
CMD service ssh start && apache2ctl -D FOREGROUND