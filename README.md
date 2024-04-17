# Инструкция по запуску проекта My Class Test

Для начала работы с проектом выполните следующие шаги:

1. **Клонирование репозитория**

   Склонируйте репозиторий на ваш локальный компьютер с помощью команды:

   ```sh
   git clone https://github.com/stepashx/my-class-test
   ```
   
2. **Установка зависимостей**

   Перейдите в каталог проекта и установите необходимые зависимости:

   ```sh
   cd my-class-test
   npm install
   ```
   
3. **Выполнение миграций**

   Если необходимо провести миграцию базы данных, запустите команду:

   ```sh
   npx knex migrate:latest
   ```
   
   Это применит все ожидающие миграции к вашей базе данных.

4. **Сборка проекта**

   Соберите проект с помощью команды:

   ```sh
   npm run build
   ```
   
   Это создаст оптимизированную версию вашего приложения для производственной среды.

5. **Запуск приложения**

   Запустите собранное приложение командой:

   ```sh
   npm run start:prod
   ```
   
   После этого ваше приложение будет запущено и готово к использованию.