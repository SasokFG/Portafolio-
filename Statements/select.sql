SELECT * FROM users;
//seleccionar todo de la tabla users
SELECT name FROM users;
//seleccionar solo la columna name de la tabla users
SELECT user_id , name FROM users;
//seleccionar solo las columnas user_id y name de la tabla users
SELECT DISTINCT age FROM users WHERE age = 15
//seleccionar solo los valores únicos de la columna age de la tabla users donde la edad sea igual a 15