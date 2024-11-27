-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2024 at 06:08 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ufm`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `address`, `birthday`, `created_at`, `email`, `first_name`, `gender`, `last_name`, `password`, `phone`, `username`) VALUES
(24, 'Hậu Giang, Việt Nam', '1997-06-25', '2024-06-23 13:31:46', 'tranthithuyhien@example.com', 'Trần', 'FEMALE', 'Thị Thuỳ Hiền', 'your_hashed_password', '0908765432', 'tranthithuyhien'),
(25, 'Sóc Trăng, Việt Nam', '2004-12-31', '2024-06-23 13:31:46', 'nguyenminhhoang@example.com', 'Nguyễn', 'MALE', 'Minh Hoàng', 'your_hashed_password', '0919876543', 'nguyenminhhoang'),
(26, 'Bến Tre, Việt Nam', '1983-04-04', '2024-06-23 13:31:46', 'dinhthithuylam@example.com', 'Đinh', 'FEMALE', 'Thị Thuỳ Lam', 'your_hashed_password', '0920987654', 'dinhthithuylam'),
(27, 'Kiên Giang, Việt Nam', '1991-11-11', '2024-06-23 13:31:46', 'phanvanhung@example.com', 'Phan', 'MALE', 'Văn Hùng', 'your_hashed_password', '0931098765', 'phanvanhung'),
(28, 'An Giang, Việt Nam', '2001-08-08', '2024-06-23 13:31:46', 'leminhtam@example.com', 'Lê', 'MALE', 'Minh Tâm', 'your_hashed_password', '0942109876', 'leminhtam'),
(29, 'Đồng Tháp, Việt Nam', '1976-02-02', '2024-06-23 13:31:46', 'tranthithuydung@example.com', 'Trần', 'FEMALE', 'Thị Thuỳ Dung', 'your_hashed_password', '0953210987', 'tranthithuydung'),
(30, 'Long An, Việt Nam', '1994-05-30', '2024-06-23 13:31:46', 'nguyenvanluu@example.com', 'Nguyễn', 'MALE', 'Văn Lựu', 'your_hashed_password', '0964321098', 'nguyenvanluu'),
(31, 'Tiền Giang, Việt Nam', '1989-12-24', '2024-06-23 13:31:46', 'lethithuytien@example.com', 'Lê', 'FEMALE', 'Thị Thuỳ Tiên', 'your_hashed_password', '0975432109', 'lethithuytien'),
(32, 'Thành phố Hồ Chí Minh, Việt Nam', '2003-09-22', '2024-06-23 13:31:46', 'tranvanhoang@example.com', 'Trần', 'MALE', 'Văn Hoàng', 'your_hashed_password', '0986543210', 'tranvanhoang'),
(33, 'Hà Nội, Việt Nam', '1998-03-16', '2024-06-23 13:31:46', 'dinhthithuydiem@example.com', 'Đinh', 'FEMALE', 'Thị Thuỳ Diệm', 'your_hashed_password', '0997654321', 'dinhthithuydiem'),
(34, 'Thành phố Hồ Chí Minh, Việt Nam', '1990-01-01', '2024-06-23 13:31:46', 'nguyenvana@example.com', 'Nguyễn', 'MALE', 'Văn A', 'your_hashed_password', '0901234567', 'nguyenvana'),
(35, 'Hà Nội, Việt Nam', '1995-02-15', '2024-06-23 13:31:46', 'thithanhb@example.com', 'Thị Thanh', 'FEMALE', 'B', 'your_hashed_password', '0987654321', 'thithanhb'),
(36, 'Đà Nẵng, Việt Nam', '1980-07-10', '2024-06-23 13:31:46', 'leminhchi@example.com', 'Lê', 'MALE', 'Minh Chi', 'your_hashed_password', '0912345678', 'leminhchi'),
(37, 'Đắk Lắk, Việt Nam', '2000-05-20', '2024-06-23 13:31:46', 'tranthithuyduong@example.com', 'Trần', 'FEMALE', 'Thị Thuỳ Dương', 'your_hashed_password', '0998765432', 'tranthithuyduong'),
(38, 'Cần Thơ, Việt Nam', '1975-11-30', '2024-06-23 13:31:46', 'nguyenhavan@example.com', 'Nguyễn', 'MALE', 'Hữu An', 'your_hashed_password', '0945678901', 'nguyenhavan'),
(39, 'Quảng Ninh, Việt Nam', '2005-09-09', '2024-06-23 13:31:46', 'phanlehanh@example.com', 'Phan', 'FEMALE', 'Lê Hạnh', 'your_hashed_password', '0932109876', 'phanlehanh'),
(40, 'Khánh Hòa, Việt Nam', '1985-12-25', '2024-06-23 13:31:46', 'dinhthithuylinh@example.com', 'Đinh', 'FEMALE', 'Thị Thuỳ Linh', 'your_hashed_password', '0921098765', 'dinhthithuylinh'),
(41, 'Lâm Đồng, Việt Nam', '1999-03-18', '2024-06-23 13:31:46', 'nguyenvannam@example.com', 'Nguyễn', 'MALE', 'Văn Nam', 'your_hashed_password', '0976543210', 'nguyenvannam'),
(42, 'Bình Thuận, Việt Nam', '1970-08-12', '2024-06-23 13:31:46', 'levanhung@example.com', 'Lê', 'MALE', 'Văn Hùng', 'your_hashed_password', '0965432109', 'levanhung'),
(43, 'Đắk Nông, Việt Nam', '2002-04-06', '2024-06-23 13:31:46', 'tranthingoc@example.com', 'Trần', 'FEMALE', 'Thị Ngọc', 'your_hashed_password', '0954321098', 'tranthingoc'),
(44, 'Tây Ninh, Việt Nam', '1992-10-21', '2024-06-23 13:31:46', 'nguyenhuonggiang@example.com', 'Nguyễn', 'FEMALE', 'Hương Giang', 'your_hashed_password', '0987654320', 'nguyenhuonggiang'),
(45, 'Thành phố Hồ Chí Minh, Việt Nam', '1995-02-15', '2024-06-26 17:09:08', 'tranthibich@example.com', 'Trần', 'FEMALE', 'Thị Bích', 'your_hashed_password', '0978543210', 'tranthibich'),
(46, 'Hà Nội, Việt Nam', '1992-07-28', '2024-06-26 17:09:08', 'levancuong@example.com', 'Lê', 'MALE', 'Văn Cường', 'your_hashed_password', '0938654123', 'levancuong'),
(47, 'Đà Nẵng, Việt Nam', '1998-05-09', '2024-06-26 17:09:08', 'phamthida@example.com', 'Phạm', 'FEMALE', 'Thị Dạ', 'your_hashed_password', '0909876543', 'phamthida'),
(48, 'Cần Thơ, Việt Nam', '1991-11-23', '2024-06-26 17:09:08', 'nguy thanhdat@example.com', 'Nguyễn', 'MALE', 'Thành Đạt', 'your_hashed_password', '0912345678', 'nguythanhdat'),
(49, 'Hải Phòng, Việt Nam', '1994-03-06', '2024-06-26 17:09:08', 'buithikimdung@example.com', 'Bùi', 'FEMALE', 'Thị Kim Dung', 'your_hashed_password', '0987654321', 'buithikimdung'),
(50, 'Đắk Lắk, Việt Nam', '1999-09-12', '2024-06-26 17:09:08', 'havanhuy@example.com', 'Hà', 'MALE', 'Văn Duy', 'your_hashed_password', '0378965412', 'havanhuy'),
(51, 'Lâm Đồng, Việt Nam', '1993-08-30', '2024-06-26 17:09:08', 'vothiphuonghoa@example.com', 'Võ', 'FEMALE', 'Thị Phương Hoa', 'your_hashed_password', '0387654321', 'vothiphuonghoa'),
(52, 'Gia Lai, Việt Nam', '2000-06-17', '2024-06-26 17:09:08', 'leminhhuy@example.com', 'Lê', 'MALE', 'Minh Huy', 'your_hashed_password', '0398765412', 'leminhhuy'),
(53, 'Quảng Nam, Việt Nam', '1996-04-04', '2024-06-26 17:09:08', 'nguyenthithuhien@example.com', 'Nguyễn', 'FEMALE', 'Thị Thu Hiền', 'your_hashed_password', '0309876543', 'nguyenthithuhien'),
(54, 'Bình Định, Việt Nam', '1997-10-21', '2024-06-26 17:09:08', 'phanvanlong@example.com', 'Phan', 'MALE', 'Văn Long', 'your_hashed_password', '0312345678', 'phanvanlong'),
(55, 'Khánh Hòa, Việt Nam', '2001-01-18', '2024-06-26 17:09:08', 'dangthimylinh@example.com', 'Đặng', 'FEMALE', 'Thị Mỹ Linh', 'your_hashed_password', '0323456789', 'dangthimylinh'),
(56, 'Phú Yên, Việt Nam', '1989-12-25', '2024-06-26 17:09:08', 'nguyenhoangnam@example.com', 'Nguyễn', 'MALE', 'Hoàng Nam', 'your_hashed_password', '0334567890', 'nguyenhoangnam'),
(57, 'Đắk Nông, Việt Nam', '1990-05-02', '2024-06-26 17:09:08', 'tranthingocnhung@example.com', 'Trần', 'FEMALE', 'Thị Ngọc Nhung', 'your_hashed_password', '0345678901', 'tranthingocnhung'),
(58, '', NULL, NULL, NULL, '', NULL, '', '$2a$10$BA/TZib0KsIlYtnj2vN.SeM1HmkCs7VOkNEGZn2fWHwSvKdAXa.xS', '', 'huyle'),
(59, 'Phú Yên, Việt Nam', '2003-10-25', '2024-07-01 01:15:06', 'huy251003@gmail.com', 'Trần Lê', 'MALE', ' Huy', '$2a$10$SB/UASsHpBV49S4bP3/b4eyqAB.3KRlaK9FtCg5qj8TKJIxl2BbvW', '0706320516', 'huyle123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `UK_dwk6cx0afu8bs9o4t536v1j5v` (`email`),
  ADD UNIQUE KEY `UK_irnrrncatp2fvw52vp45j7rlw` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
