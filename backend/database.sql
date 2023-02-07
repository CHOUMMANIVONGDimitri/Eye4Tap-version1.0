CREATE TABLE
    `users` (
        `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
        `lastname` varchar(45) NOT NULL,
        `firstname` varchar(45) NOT NULL,
        `email` varchar(254) NOT NULL UNIQUE KEY,
        `password` varchar(254) NOT NULL,
        `pseudo` varchar(45) NOT NULL,
        `picture` varchar(254) NULL
    );

CREATE TABLE
    `score` (
        `id` int NOT NULL AUTO_INCREMENT,
        `value_score` int NOT NULL,
        `id_user` int NOT NULL,
        PRIMARY KEY (`id`)
    );