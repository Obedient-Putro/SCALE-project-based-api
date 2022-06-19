-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 19 Jun 2022 pada 06.24
-- Versi server: 10.4.21-MariaDB
-- Versi PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `scale_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(4, 'Obedient Putro', 'email@gmail.com', '$2b$10$TZBjl33/RxV9yoyqzrfwnuZIoPvaPEWDRDr69GiGEE6wbQsKd7lBG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoiT2JlZGllbnQgUHV0cm8iLCJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsImlhdCI6MTY1NTU0MjkzOSwiZXhwIjoxNjU1NjI5MzM5fQ.nXyorFKnmyL2lFASUrLoO6paIpMybrd02fkhD2McAKo', '2022-06-15 17:26:32', '2022-06-18 09:02:19'),
(10, 'Obedient Junior', 'email2@gmail.com', '$2b$10$WVghiRGEiwxLpHpXM8Rro.mtA7XU81VVpmOSxK3oyKohYN0l3uheq', NULL, '2022-06-18 08:46:12', '2022-06-18 08:48:12'),
(11, 'Jerusalem Putro', 'email3@gmail.com', '$2b$10$s8DdFRcq8NPYbK/vP13oEOAel9wffl8ybBoMs76TdeXLCfYz2fPz6', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJ1c2VybmFtZSI6IkplcnVzYWxlbSBQdXRybyIsImVtYWlsIjoiZW1haWwzQGdtYWlsLmNvbSIsImlhdCI6MTY1NTU0MjM3OCwiZXhwIjoxNjU1NjI4Nzc4fQ.qfRLBLzOOFW2wcvAwjBOAD1LVvWes9My_cHf78A4RoI', '2022-06-18 08:50:32', '2022-06-18 08:52:58');

-- --------------------------------------------------------

--
-- Struktur dari tabel `workspaces`
--

CREATE TABLE `workspaces` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `workspaceName` varchar(255) DEFAULT NULL,
  `workspacePath` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `workspaces`
--

INSERT INTO `workspaces` (`id`, `email`, `workspaceName`, `workspacePath`, `createdAt`, `updatedAt`) VALUES
(22, 'email@gmail.com', 'testone', 'a7fc20f8-8cdd-4112-98f6-9d399256cf89', '2022-06-18 07:43:58', '2022-06-18 08:49:06'),
(23, 'email2@gmail.com', 'LABEL MAHASISWA', '86d33623-5977-4f31-804f-9389ed8f02c7', '2022-06-18 08:47:39', '2022-06-18 08:48:06'),
(24, 'email2@gmail.com', 'TUGAS COBA', '5ceda06d-cafc-41d7-8a06-1ff408907f1e', '2022-06-18 08:47:47', '2022-06-18 08:47:47'),
(25, 'email2@gmail.com', 'MENCOBA LAGI', 'f3ba0f14-4f9e-4902-a668-3d7ac850cfaf', '2022-06-18 08:47:52', '2022-06-18 08:47:52'),
(26, 'email2@gmail.com', 'DAN LAGI', 'c10aa374-e038-4b61-a171-0e248b16e959', '2022-06-18 08:47:56', '2022-06-18 08:47:56'),
(27, 'email@gmail.com', 'TESTTWO', '834ab5a2-78a3-40ef-9334-2cf9f54db274', '2022-06-18 08:49:17', '2022-06-18 08:49:17'),
(28, 'email@gmail.com', 'TESTTHREE', 'decd7811-830c-474a-a8dc-ee99dadccdf8', '2022-06-18 08:49:22', '2022-06-18 08:49:22'),
(29, 'email3@gmail.com', 'Testingan aja', 'f1a198db-d2ea-4aa8-a3b7-320e03748b12', '2022-06-18 08:53:32', '2022-06-18 08:54:11'),
(30, 'email3@gmail.com', 'Buat baru', '375d60b4-7521-4c70-b255-dd704999b9be', '2022-06-18 09:11:02', '2022-06-18 09:11:02');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `workspaces`
--
ALTER TABLE `workspaces`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `workspaces`
--
ALTER TABLE `workspaces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
