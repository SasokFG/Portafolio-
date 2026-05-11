SELECT * FROM users WHERE NOT email LIKE '%@gmail.com';
//seleccionar todos los registros de la tabla users donde el email no termine con 'gmail.com'
SELECT * FROM users WHERE NOT email LIKE '%@gmail.com'; OR age = 15;
//seleccionar todos los registros de la tabla users donde el email no termine con 'gmail.com' o la edad sea igual a 15
SELECT * FROM users WHERE NOT email LIKE '%@gmail.com'; AND age = 15;
//seleccionar todos los registros de la tabla users donde el email no termine con 'gmail.com' y la edad sea igual a 15