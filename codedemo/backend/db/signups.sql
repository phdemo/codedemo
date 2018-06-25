-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Vært: localhost:3306
-- Genereringstid: 25. 06 2018 kl. 06:27:12
-- Serverversion: 10.1.31-MariaDB-cll-lve
-- PHP-version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pawherma_codedemo`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `signups`
--

CREATE TABLE `signups` (
  `ID` int(11) NOT NULL,
  `username` varchar(5000) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `signups`
--

INSERT INTO `signups` (`ID`, `username`, `email`, `created`) VALUES
(1, 'Bo', 'a@b.cd', '2018-06-25 03:07:38'),
(2, 'Bo', 'bo@example.org', '2018-06-25 03:51:53'),
(3, 'Peter Hansen', 'peter@example.org', '2018-06-25 04:00:29'),
(4, 'BÃ¸rge SÃ¸rensen', 'borge@example.org', '2018-06-25 04:11:52');

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `signups`
--
ALTER TABLE `signups`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `signups`
--
ALTER TABLE `signups`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
