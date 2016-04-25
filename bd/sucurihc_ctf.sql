-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 19-Abr-2016 às 07:55
-- Versão do servidor: 10.1.10-MariaDB
-- PHP Version: 5.5.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sucurihc_ctf`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `flag`
--

CREATE TABLE `flag` (
  `idflag` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `tipo` varchar(200) NOT NULL,
  `descricao` varchar(400) NOT NULL,
  `resposta` varchar(200) NOT NULL,
  `evento` varchar(100) NOT NULL,
  `valor` int(14) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `resolvidas`
--

CREATE TABLE `resolvidas` (
  `id` int(11) NOT NULL,
  `flagid` int(15) NOT NULL,
  `userid` int(15) NOT NULL,
  `valor` int(11) NOT NULL,
  `evento` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `score`
--

CREATE TABLE `score` (
  `id_score` int(11) NOT NULL,
  `score` bigint(20) NOT NULL,
  `iduser` int(15) NOT NULL,
  `time` datetime NOT NULL,
  `evento` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- -------------------------------------------------------

--
-- Estrutura da tabela `recuperacao`
--

CREATE TABLE recuperacao (
  utilizador  VARCHAR(255) NOT NULL,
  confirmacao VARCHAR(40) NOT NULL,
  KEY(utilizador, confirmacao)
)


-- --------------------------------------------------------

--
-- Estrutura da tabela `sr_usuarios_secret`
--

CREATE TABLE `sr_usuarios_secret` (
  `Id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `salt` char(128) NOT NULL DEFAULT '',
  `username` varchar(255) NOT NULL DEFAULT '',
  `ativo` varchar(1) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `flag`
--
ALTER TABLE `flag`
  ADD PRIMARY KEY (`idflag`);

--
-- Indexes for table `resolvidas`
--
ALTER TABLE `resolvidas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `flagid` (`flagid`,`userid`);

--
-- Indexes for table `score`
--
ALTER TABLE `score`
  ADD PRIMARY KEY (`id_score`),
  ADD UNIQUE KEY `iduser` (`iduser`,`evento`);

--
-- Indexes for table `sr_usuarios_secret`
--
ALTER TABLE `sr_usuarios_secret`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `flag`
--
ALTER TABLE `flag`
  MODIFY `idflag` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT for table `resolvidas`
--
ALTER TABLE `resolvidas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1806;
--
-- AUTO_INCREMENT for table `score`
--
ALTER TABLE `score`
  MODIFY `id_score` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9911;
--
-- AUTO_INCREMENT for table `sr_usuarios_secret`
--
ALTER TABLE `sr_usuarios_secret`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=328;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
