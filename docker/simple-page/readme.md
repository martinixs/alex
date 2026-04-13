Существует 2 способа запустить контейнер с тестовыми страничками

# Вручную 
Заходим в командной строке в папку <project>/docker/simple-page

### Собрать образ 
docker build -t simple-page .

### Запустить контейнер
docker run -d -p 8080:80 --name my-site-container simple-page

# Автоматически
### Запуск
docker-compose up -d

### Остановка
docker-compose down

