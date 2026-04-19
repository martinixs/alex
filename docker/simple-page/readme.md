Существует 2 способа запустить контейнер с тестовыми страничками

# Вручную 
Заходим в командной строке в папку <project>/docker/simple-page

### Собрать образ 
docker build -t simple-page .

### Запустить контейнер
docker run -d -p 8080:80 --name my-site-container simple-page

# Автоматический запуск контейнера
 
Открываем терминал для ввода команд 
### Переходим в папку
cd docker/simple-page

### Запуск
docker-compose up -d

Проверяем, что приложение с страничками стартануло, переходим по ссылке
http://localhost:8080/

### Остановка
docker-compose down

