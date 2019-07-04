-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time:  5 юли 2019 в 00:40
-- Версия на сървъра: 10.1.25-MariaDB
-- PHP Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webproject`
--

-- --------------------------------------------------------

--
-- Структура на таблица `taggroups`
--

CREATE TABLE `taggroups` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `tagGroupName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Схема на данните от таблица `taggroups`
--

INSERT INTO `taggroups` (`id`, `userId`, `tagGroupName`) VALUES
(1, 1, 'purvaGrupa2'),
(2, 1, 'purvaGrupa23'),
(3, 1, 'aide oshte'),
(5, 4, 'za drugiq2'),
(6, 4, 'ÐÐ¾Ð²Ð° Ð³Ñ€ÑƒÐ¿Ð°'),
(7, 4, 'chushki'),
(8, 4, 'ÐÐ¾Ð²Ð° Ð³Ñ€ÑƒÐ¿Ð° 2');

-- --------------------------------------------------------

--
-- Структура на таблица `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `tagGroupId` int(11) NOT NULL,
  `tagName` varchar(70) NOT NULL,
  `points` int(11) NOT NULL,
  `link` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Схема на данните от таблица `tags`
--

INSERT INTO `tags` (`id`, `tagGroupId`, `tagName`, `points`, `link`) VALUES
(10, 4, 'firstTag', 26, '#'),
(11, 4, 'secondTag', 29, '#'),
(12, 4, 'thirdTag', 39, '#'),
(13, 4, 'fourthTag1', 64, '#'),
(16, 5, 'bobkata', 69, '#'),
(20, 4, 'smth', 100, '#'),
(21, 4, 'pesho', 64, '#'),
(22, 4, 'qwerty', 34, '#'),
(23, 4, 'verylonglonglnoglnolgnoglngongn', 57, '#'),
(24, 4, 'isItWorking', 93, '#'),
(25, 6, 'ÐŸÑ€Ð¾ÐµÐºÑ‚ 1', 60, '#'),
(26, 6, 'ÐŸÑ€Ð¾ÐµÐºÑ‚ 2', 40, '#'),
(27, 6, 'qwerty', 70, '#'),
(28, 6, 'Lets go', 90, 'www.abv.bg'),
(29, 6, 'zxcvb', 15, '#'),
(30, 6, 'asdfg', 43, '#'),
(31, 6, 'qwertyuiopasdfghjkl', 57, '#'),
(32, 6, 'ÐÐ¾Ð² Ñ‚Ð°Ð³', 51, '#'),
(33, 6, 'I am just filling', 81, '#');

-- --------------------------------------------------------

--
-- Структура на таблица `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `password` varchar(2056) NOT NULL,
  `role` enum('Admin','User') NOT NULL,
  `secretQuestion` enum('What is your pets name?','What is the name of your mother?','Which is your favourite move?','What is your favourite song?') NOT NULL,
  `answer` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Схема на данните от таблица `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `lastName`, `password`, `role`, `secretQuestion`, `answer`) VALUES
(1, 'aidee@abv.bg', 'ada1saadasdn', 'Aide de', '$2y$10$YYGWXGJh895MgfpxWk58ne6cRZLwSzjFdpo2mHfZPdLXe8g0KAu4S', 'Admin', '', 'Pesho'),
(3, 'opit2@abv.bg', 'Bobkata', 'Aide de', '$2y$10$e9emCBSryjDyxnal8LWZ7OKpfHrGHVWAZKOHUfno41AOaXhzkDA5.', 'User', 'What is your pets name?', 'Pesho'),
(4, 'opit3@abv.bg', 'Bobkata123', 'Aide234234', '$2y$10$yfb8N9NL3O5.MYPgP2FN7OhY1o.B32gLXqnz9E21utmsoss6BHG7i', 'User', 'What is your pets name?', 'Pesho'),
(5, 'opit5@abv.bg', 'Bobkata123', 'Aide234234', '$2y$10$f6bq1TiZvBq9OhwEkBn//.xMNge3X1wFxe3JGYFIvHGra0y6dySpG', 'User', 'What is your pets name?', 'Pesho');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `taggroups`
--
ALTER TABLE `taggroups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `taggroups`
--
ALTER TABLE `taggroups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
