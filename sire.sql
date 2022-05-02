-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: bpnzdg3qreqalbxfqwow-mysql.services.clever-cloud.com:3306
-- Generation Time: May 01, 2022 at 06:05 PM
-- Server version: 8.0.15-5
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bpnzdg3qreqalbxfqwow`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`u5sokjl76zng6fqs`@`%` PROCEDURE `crearPR` (IN `p_fk_idCuestionario` INT(11))   BEGIN
    
    -- Para obtener la plantilla del cuestionario
	UPDATE PreguntaRespuesta 
    JOIN Cuestionario 
    ON PreguntaRespuesta.fk_idCuestionario = Cuestionario.idCuestionario
	SET Template = Cuestionario.fk_idTemplate
    WHERE fk_idCuestionario = p_fk_idCuestionario;

	-- Para pegar el tipoPregunta a la tabla
	UPDATE PreguntaRespuesta
	JOIN BancoPreguntas ON PreguntaRespuesta.idPregunta = 	BancoPreguntas.fk_idPregunta 
	SET PreguntaRespuesta.tipoPregunta = BancoPreguntas.tipoPregunta
	WHERE fk_idCuestionario = p_fk_idCuestionario;

	-- Para pegar la pregunta a la tabla
	UPDATE PreguntaRespuesta 
    JOIN Pregunta 
    ON PreguntaRespuesta.idPregunta = Pregunta.idPregunta
	SET Pregunta = Pregunta.descPregunta
    WHERE fk_idCuestionario = p_fk_idCuestionario;
    
END$$

CREATE DEFINER=`u5sokjl76zng6fqs`@`%` PROCEDURE `nueva_pregunta` (IN `p_idTemplate` INT(11), IN `p_idPregunta` INT(11), IN `p_descPregunta` VARCHAR(128), IN `p_tipoPregunta` INT(11))   BEGIN
START TRANSACTION;
INSERT INTO Pregunta (descPregunta) VALUES (p_descPregunta);
INSERT INTO BancoPreguntas (fk_idTemplate, fk_idPregunta, tipoPregunta) VALUES (p_idTemplate, p_idPregunta, p_tipoPregunta);
COMMIT;
END$$

CREATE DEFINER=`u5sokjl76zng6fqs`@`%` PROCEDURE `p_getIdCuestionario` ()   BEGIN
DECLARE nuevoIdCuest INT DEFAULT NULL;
START TRANSACTION;
SET nuevoIdCuest := (SELECT idCuestionario+1 AS nuevoIdCuest FROM Cuestionario ORDER BY idCuestionario DESC LIMIT 1); 
SELECT ifnull(nuevoIdCuest, 1) AS nuevoIdCuest;
COMMIT;
END$$

CREATE DEFINER=`u5sokjl76zng6fqs`@`%` PROCEDURE `p_getIdPregunta` ()   BEGIN
DECLARE nuevoIdPreg INT DEFAULT NULL;
START TRANSACTION;
SET nuevoIdPreg := (SELECT idPregunta+1 AS nuevoIdPreg FROM Pregunta ORDER BY idPregunta DESC LIMIT 1);
SELECT ifnull(nuevoIdPreg, 1) AS nuevoIdPreg;
COMMIT;
END$$

CREATE DEFINER=`u5sokjl76zng6fqs`@`%` PROCEDURE `registrarRespuestas` (IN `p_Respuesta` VARCHAR(256), IN `p_fk_idCuestionario` INT(11), IN `p_Template` INT(11), IN `p_idPregunta` INT(11), IN `p_Pregunta` VARCHAR(128))   BEGIN
	UPDATE PreguntaRespuesta 
    SET Respuesta = p_Respuesta 
    WHERE fk_idCuestionario = p_fk_idCuestionario AND Template = p_Template AND idPregunta = p_idPregunta AND Pregunta= p_Pregunta;
    
    UPDATE Cuestionario
    SET isAnswered = 1
    WHERE idCuestionario = p_fk_idCuestionario;
END$$

CREATE DEFINER=`u5sokjl76zng6fqs`@`%` PROCEDURE `update_pregunta` (IN `p_descPregunta` VARCHAR(128), IN `p_idPregunta` INT(11), IN `p_tipoPregunta` INT(11))   BEGIN
UPDATE Pregunta 
SET descPregunta = p_descPregunta 
WHERE idPregunta = p_idPregunta;

UPDATE BancoPreguntas 
SET tipoPregunta = p_tipoPregunta 
WHERE fk_idPregunta = p_idPregunta;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `AsignacionPermisos`
--

CREATE TABLE `AsignacionPermisos` (
  `fk_idRolSis` int(11) NOT NULL,
  `fk_idFuncSis` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `BancoPreguntas`
--

CREATE TABLE `BancoPreguntas` (
  `idBancoP` int(11) NOT NULL,
  `fk_idTemplate` int(11) NOT NULL,
  `fk_idPregunta` int(11) NOT NULL,
  `tipoPregunta` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `BancoPreguntas`
--

INSERT INTO `BancoPreguntas` (`idBancoP`, `fk_idTemplate`, `fk_idPregunta`, `tipoPregunta`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 1),
(4, 2, 5, 1),
(5, 1, 6, 2),
(11, 1, 12, 3),
(12, 2, 13, 2),
(13, 1, 14, 1),
(17, 1, 18, 2),
(21, 1, 22, 1),
(22, 1, 23, 3),
(23, 1, 24, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Chapter`
--

CREATE TABLE `Chapter` (
  `idChapter` int(11) NOT NULL,
  `nombreCh` varchar(128) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nEmpleados` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `Chapter`
--

INSERT INTO `Chapter` (`idChapter`, `nombreCh`, `nEmpleados`) VALUES
(1, 'IT', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Cuestionario`
--

CREATE TABLE `Cuestionario` (
  `idCuestionario` int(11) NOT NULL,
  `fk_idPeriodo` int(11) NOT NULL,
  `fk_idEvaluador` int(11) NOT NULL,
  `fk_idTemplate` int(11) NOT NULL,
  `idEvaluado` int(11) NOT NULL,
  `nivelEvaluado` decimal(10,1) DEFAULT NULL,
  `isAnswered` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `Cuestionario`
--

INSERT INTO `Cuestionario` (`idCuestionario`, `fk_idPeriodo`, `fk_idEvaluador`, `fk_idTemplate`, `idEvaluado`, `nivelEvaluado`, `isAnswered`) VALUES
(1, 1, 1, 1, 8, '1.1', 1),
(2, 1, 3, 1, 8, '1.1', 0),
(3, 1, 22, 1, 8, '1.1', 0),
(4, 1, 23, 1, 8, '1.1', 0),
(5, 1, 24, 1, 8, '1.1', 0),
(6, 1, 7, 1, 1, '1.1', 0),
(7, 1, 8, 1, 1, '1.1', 1),
(8, 1, 1, 2, 23, '2.1', 1),
(9, 1, 2, 2, 23, '2.1', 1),
(10, 1, 9, 1, 1, '1.1', 0),
(11, 1, 10, 1, 1, '1.1', 0),
(12, 1, 23, 2, 1, '2.1', 1),
(13, 1, 24, 2, 1, '2.1', 0),
(14, 10, 1, 2, 19, '2.2', 1),
(15, 10, 8, 2, 19, '2.2', 1),
(16, 10, 1, 2, 20, '2.1', 1),
(17, 10, 7, 2, 20, '2.1', 0),
(18, 10, 8, 2, 20, '2.1', 1),
(19, 10, 19, 1, 18, '1.2', 0),
(20, 10, 20, 1, 18, '1.2', 1),
(21, 10, 1, 1, 18, '1.2', 1),
(22, 10, 2, 1, 18, '1.2', 1),
(23, 10, 5, 1, 18, '1.2', 0),
(24, 10, 7, 1, 18, '1.2', 0),
(25, 10, 9, 1, 18, '1.2', 0),
(26, 10, 1, 1, 29, '1.1', 1),
(27, 10, 2, 1, 29, '1.1', 1),
(28, 10, 3, 1, 29, '1.1', 0),
(29, 12, 10, 2, 2, '2.2', 0),
(30, 12, 29, 2, 2, '2.2', 0),
(31, 12, 3, 2, 2, '2.2', 0),
(32, 12, 4, 2, 2, '2.2', 1),
(33, 12, 5, 2, 2, '2.2', 0),
(34, 12, 1, 5, 31, '5.2', 0),
(35, 12, 2, 5, 31, '5.2', 0),
(36, 12, 3, 5, 31, '5.2', 0),
(37, 12, 4, 5, 31, '5.2', 0),
(38, 12, 5, 5, 31, '5.2', 0),
(39, 13, 4, 2, 28, '2.1', 0),
(40, 13, 8, 2, 28, '2.1', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Empleado`
--

CREATE TABLE `Empleado` (
  `idEmpleado` int(11) NOT NULL,
  `fechaIng` date NOT NULL,
  `nombre` varchar(45) COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellidoP` varchar(45) COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellidoM` varchar(45) COLLATE utf8mb4_spanish_ci NOT NULL,
  `antiguedad` int(11) NOT NULL,
  `nivPeople` decimal(10,1) NOT NULL,
  `nivCraft` decimal(10,1) NOT NULL,
  `nivBusiness` decimal(10,1) NOT NULL,
  `nivOverall` decimal(10,1) NOT NULL,
  `puesto` varchar(128) COLLATE utf8mb4_spanish_ci NOT NULL,
  `equipo` varchar(128) COLLATE utf8mb4_spanish_ci NOT NULL,
  `email` varchar(128) COLLATE utf8mb4_spanish_ci NOT NULL,
  `password` varchar(256) COLLATE utf8mb4_spanish_ci NOT NULL,
  `fk_idChapter` int(11) NOT NULL,
  `fk_idRolJer` int(11) NOT NULL,
  `isActive` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `Empleado`
--

INSERT INTO `Empleado` (`idEmpleado`, `fechaIng`, `nombre`, `apellidoP`, `apellidoM`, `antiguedad`, `nivPeople`, `nivCraft`, `nivBusiness`, `nivOverall`, `puesto`, `equipo`, `email`, `password`, `fk_idChapter`, `fk_idRolJer`, `isActive`) VALUES
(1, '2022-04-07', 'Ramiro', 'Ledesma', 'Ramos', 0, '1.2', '5.1', '1.3', '2.2', 'Tester', 'ZeCore', 'ramiro.lr@test.com', '$2a$12$Mkwoi0hPchfIFxOypUHfBeAw49NOZRfvj3CEeMMjTzfZSkmngNUlu', 1, 3, 1),
(2, '2022-04-01', 'Jorge', 'Castro', 'Vazquez', 20, '1.1', '1.1', '1.3', '1.1', 'Ingeniero', 'WMS', 'jcastro@tec.mx', '$2a$12$ZOI0ESUrjEPcRdPLarIqEOvVABnWx6N8sRTbsYs1L.ZsIKTINGmK2', 1, 1, 1),
(3, '2022-04-04', 'Maria isabel', 'ledesma', 'Solis', 1, '1.1', '1.1', '2.1', '1.1', 'Ingeniera jr', 'Feedback', 'sarah@zeb.mx', '$2a$12$sHnVlfe04mFO2EB3Im0YHuCkfHXG1fvPTNPbdmIn3neFaPVRWqkoK', 1, 2, 1),
(4, '2022-04-04', 'Diegod', 'Resendiz', 'Fernandez', 20, '3.2', '5.3', '5.2', '4.2', 'Ingeniero', 'Equipo9', 'A01708017@itesm.mx', '$2a$12$dwkYl6MsZ3HpWDpdgKbnW./ORUt8PppVBF28aYUh5PWUpPIaHa1KO', 1, 1, 1),
(5, '2022-04-04', 'Sebastian', 'Pedrero', 'Jimenez', 20, '1.1', '2.2', '2.2', '2.2', 'Ingeniero', 'Equipo9', 'fontanero123@gmail.com', '$2a$12$WPi8g62UhYqG8Kz5bu7.pek9OjYCaxT8yCN8Dh6Gk7N9d45TQmXGq', 1, 1, 1),
(6, '2022-04-04', 'Alex', 'Ruiz', 'Garcia-Rojas', 20, '3.3', '2.2', '3.3', '3.3', 'Ingeniero', 'Equipo9', 'a.ruiz@zeb.mx', '$2a$12$b2wsvEkzzb4ZUN4bPHfcMOT63hB01Q6HIRGE/sHZMoCw8HLO8GpAO', 1, 1, 1),
(7, '2022-04-04', 'Manolo', 'Medina', 'Rodriguez', 20, '1.1', '1.1', '1.1', '1.1', 'Ingeniero', 'Equipo9', 'JMMR@tec.mx', '$2a$12$BBUXQrVvCpSUL50TKDHgtOhTSZ2uyK.YfNXNYCMX3tyDPz4BCFSoO\r\n', 1, 2, 1),
(8, '2022-04-07', 'Isabela', 'Vales', 'Chavarria', 0, '1.1', '1.1', '1.1', '1.1', 'Programmer', 'WMS', 'isabela.vc@test.com', '$2a$12$k7h.09GH77mKMh6T7Cjv3uWzUFPTclWbEcBamk2gwK0vOk37lkYf6', 1, 1, 1),
(9, '2022-04-07', 'Marcos', 'Polos', 'Romos', 0, '1.1', '1.1', '1.1', '1.1', 'Programmer Junior', 'ZeCore Client', 'marcos.pr@test.com', '$2a$12$TtITQup2BYOY1lHRaQ2Ld.RfRTWPuh4NjkmgfgbzwOAjhmH.nICF2', 1, 1, 1),
(10, '2022-04-08', 'Sofia', 'Bermúdez', 'Jimenez', 2, '1.1', '1.1', '1.1', '1.1', 'Ingeniero', 'Equipo9', 'sofia@tec.mx', '$2a$12$pB6oQZl94am5ncLNyu6fY.awN1GEnP.DM9u.B3pE.3ls3JPT.dshW', 1, 3, 1),
(11, '2022-04-19', 'Alejandro', 'Magno', 'Rivera', 0, '1.1', '1.1', '1.1', '1.1', 'Ingeniero', 'Equipo9', 'alejandro@ze.com', '$2a$12$U4pKyKPavmaJWBWEz2ax.unvOK9OoV/1D1liP0aR3YDHwjrPL.Luy', 1, 1, 0),
(12, '2022-04-21', 'Pedro', 'Caseres', 'Najera', 0, '1.1', '1.1', '1.1', '1.1', 'Ingeniero', 'Equipo10', 'Najera.lr@test.com', '$2a$12$AHP4oZtVJ1l7Cm3MjRTREO.W8I.51jAgqf/BYzgrPHbK5L.6d7mm2', 1, 1, 1),
(14, '2022-04-29', 'Miranjo', 'Ruiz', 'Jimenez', 0, '1.1', '1.1', '1.1', '1.1', 'Ingeniero', 'Equipo10', 'miranjo.MJ@test.com', '$2a$12$MmPKbPk5k3wKZXF/y07VyOuhw7Q.UCglL4gHiF93A0DpRYESz4owW', 1, 1, 1),
(16, '2022-04-20', 'José Sebastián', 'Martinez', 'Hernandez', 0, '1.1', '1.1', '1.1', '1.1', 'Ingeniero', 'Equipo10', 'Sebas.@test.com', '$2a$12$E2BQrVR8KFqUY130kD0KyuXYJuiishAiOEW3zFN1J.lKMLWT.bj1K', 1, 1, 1),
(17, '2022-04-21', 'juan', 'de borbon', 'perez', 2, '2.1', '2.2', '2.2', '2.1', 'test', 'tester', 'jaun.bp@test.com', '$2a$12$oTCLBbdY75v.ycg9FAQDqO9023MxYjz6MBn6CVxhzoGxQZ8SHk2TO', 1, 1, 1),
(18, '2022-04-21', 'test', 'test', 'test', 2, '1.2', '2.1', '2.1', '1.2', 'test', 'test', 'test', '$2a$12$LNnb2E2j759ahBOz.9xz9eftLNFagAnsKmDinN6JyNIYd8rH6woCu', 1, 1, 1),
(19, '2022-04-21', 'Valter', 'Nunez', 'Vazquez', 5, '1.3', '2.2', '2.1', '2.2', 'Backend Engineer', 'Zecore Client', 'valter.nunez@zeb.mx', '$2a$12$LNbE5C7p4p6qZ7HStAY78e5mlu.6Bl6nHlxZkePvBlMA3dhIiJtMq', 1, 1, 1),
(20, '2022-04-21', 'Luis', 'Medina', 'Villarreal', 2, '3.1', '2.3', '2.1', '2.1', 'Tester', 'Develop', 'luis.mv@test.com', '$2a$12$kXo3oBgwFPZO8ZLyxcq7aOtpqOH4NgUo7CUA1PWYVCbxm2I/8meVi', 1, 2, 1),
(21, '2022-04-22', 'Sancho', 'Panza', 'Ranza', 2, '2.3', '2.3', '2.3', '2.3', 'test', 'test', 'sancho.pr@test.com', '$2a$12$.tUOUwHodpHWvV3ZlTHf9.QYt2t/Pi7XO/jfjvmstHavSUn2aT2qq', 1, 1, 1),
(22, '2022-04-22', 'Juan', 'Chavez', 'Valdez', 2, '2.1', '2.1', '2.2', '2.1', 'Programmer', 'ZeCore Client', 'juan.cv@zb.com', '$2a$12$5E7HhD0fRUPdtOiLAQVQ2.S2cZI3eHScjPMDEk0kogjukU7jOeLBi', 1, 2, 0),
(23, '2022-04-22', 'Enrique', 'Fraire', 'Santos', 2, '2.2', '2.2', '2.1', '2.1', 'Programmer', 'WMS', 'enrique.sf@ze.com', '$2a$12$8e1WMwtkWn6bl9NFwd7.U.rtMaslEoukiFNw1xuMkyi6du8UbTJjy', 1, 2, 1),
(24, '2022-04-22', 'Diego', 'Emilio', 'Pacheco', 2, '2.1', '2.1', '2.1', '2.1', 'Programmer', 'WMS', 'diego.ep@zb.com', '$2a$12$3kb/rdLB9y8XlvYzxzkcn.JHoaXDkJjiZ2I9n5ae54v1DGForh1WK', 1, 1, 1),
(28, '2022-04-25', 'Test2', 'test2', 'test2', 0, '2.1', '2.1', '1.3', '2.1', 'tester', 'testing', 'test2@test', '$2a$12$x088/aDsILwxFGqgR627PuD.a28cSsnu1/zFlGeCNnuVWLxQrJ9vG', 1, 1, 1),
(29, '2022-04-11', 'Bernardo', 'Laing', 'Prueba', 1, '1.1', '2.2', '3.3', '1.1', 'Backend engineer', 'Zecore Client', 'bernardo.laing@zeb.com', '$2a$12$ufyQlr6nYyuiFotSdL1NQuRXY2rmP3Ns/vm21i8yzIqL0WzBz5ERa', 1, 1, 1),
(30, '2022-03-18', 'Gabriela Montesori', 'Sanchez', 'Ortíz', 35, '2.3', '3.2', '3.1', '2.3', 'Atracción ', 'RRHH', 'gmon@test.com', '$2a$12$VbGyhjuOJjDuzpbPY8kJ/uwefSg0C089M1FO7.1fzkf4QD3aSH9aq', 1, 2, 1),
(31, '2022-04-30', 'Alejandro', 'Ruiz', 'Garcia Rojas', 3, '5.2', '5.2', '5.2', '5.2', 'Ingeniero de Software', 'Equipo', 'a01611451@tec.mx', '$2a$12$nWKHHPov10u0EtU8I7Nlb.c.RhEJ6o/3LoVGt17r/j3DrL2JkWAY.', 1, 3, 1),
(32, '2022-04-26', 'Nico', 'Rosberg', 'berg', 0, '1.1', '1.1', '1.1', '1.1', 'ex piloto', 'mercedes', 'nico.rb@test.com', '$2a$12$tE9nyHc7vyeJVhMJ1r/80eZYXSxzru.5OQ6fPlGoea8fc/Q1CHF4e', 1, 1, 1),
(33, '2022-04-26', 'prueba', 'vacío', '', 0, '1.1', '1.1', '1.1', '1.1', '', '', 'test4', '$2a$12$adAfOeuP4Ys9ZrMzo5aOHer2MT6Fo0.9LhJj3foScQybaDC0CuoEa', 1, 1, 1),
(34, '2022-04-29', 'Grogu', 'Mandalorian', 'Yoda', 0, '2.1', '2.3', '2.2', '2.3', 'Software Engineer', 'CRM', 'grogu@zeb.mx', '$2a$12$JbgS5yki1V8S1Lg.kRucM.oaBdoXR.0hZaJSVLjYy/BNyC8qn/FcC', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Mentees`
--

CREATE TABLE `Mentees` (
  `idMentees` int(11) NOT NULL,
  `fk_idLead` int(11) NOT NULL,
  `idMentee` int(11) DEFAULT NULL,
  `descAsignacion` varchar(128) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `fechaAsig` date DEFAULT NULL,
  `fk_idPeriodo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `Mentees`
--

INSERT INTO `Mentees` (`idMentees`, `fk_idLead`, `idMentee`, `descAsignacion`, `fechaAsig`, `fk_idPeriodo`) VALUES
(101, 4, 10, '', NULL, NULL),
(103, 4, 12, '', NULL, NULL),
(104, 4, 5, '', NULL, NULL),
(107, 7, 1, '', NULL, NULL),
(109, 7, 1, '', NULL, NULL),
(110, 7, 1, '', NULL, NULL),
(112, 7, 1, '', NULL, NULL),
(113, 7, 4, '', NULL, NULL),
(114, 7, 4, 'Resendiz', NULL, 1),
(115, 22, 5, 'aaaa', NULL, 1),
(116, 20, 9, 'aaaaa', NULL, 1),
(117, 20, 19, 'Asignación de Valter Nunez a Luis Medina para que le de seguimiento', NULL, 1),
(118, 20, 18, 'Asig. de Luis Medina a test', NULL, 10),
(119, 20, 29, 'Aisgnación LM a BL', NULL, 10),
(121, 23, 1, '', NULL, 13),
(122, 8, 28, '', '2022-04-26', 13),
(123, 3, 21, '', '2022-04-29', 13),
(124, 23, 34, '', '2022-04-29', 15),
(125, 8, 2, '', '2022-04-29', 15);

-- --------------------------------------------------------

--
-- Stand-in structure for view `nombres_cuestionario`
-- (See below for the actual view)
--
CREATE TABLE `nombres_cuestionario` (
`apellidoM_evaluado` varchar(45)
,`apellidoP_evaluado` varchar(45)
,`idCuestionario` int(11)
,`idEvaluado` int(11)
,`idEvaluador` int(11)
,`nombreEvaluado` varchar(45)
);

-- --------------------------------------------------------

--
-- Table structure for table `Observacion`
--

CREATE TABLE `Observacion` (
  `idObservacion` int(11) NOT NULL,
  `fk_idEvaluado` int(11) NOT NULL,
  `fk_idLead` int(11) NOT NULL,
  `fk_idPeriodo` int(11) NOT NULL,
  `descObservacion` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `Observacion`
--

INSERT INTO `Observacion` (`idObservacion`, `fk_idEvaluado`, `fk_idLead`, `fk_idPeriodo`, `descObservacion`) VALUES
(1, 19, 8, 10, 'Valter, me parece que tu desempeño ha sido muy bueno, espero poder verte con por aquí'),
(2, 19, 8, 10, 'test'),
(3, 19, 8, 10, 'Prueba de alerta success de observación'),
(20, 8, 19, 10, 'prueba de observacion'),
(23, 19, 20, 10, 'Prueba de update'),
(25, 19, 20, 10, 'Otro insert'),
(28, 28, 8, 13, 'Excelente decisión ');

-- --------------------------------------------------------

--
-- Table structure for table `PeriodoEvaluacion`
--

CREATE TABLE `PeriodoEvaluacion` (
  `idPeriodo` int(11) NOT NULL,
  `FechaInicio` date NOT NULL,
  `FechaFin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `PeriodoEvaluacion`
--

INSERT INTO `PeriodoEvaluacion` (`idPeriodo`, `FechaInicio`, `FechaFin`) VALUES
(1, '2022-04-28', '2022-04-28'),
(10, '2022-04-28', '2022-04-28'),
(12, '2022-04-28', '2022-04-28'),
(13, '2022-04-28', '2022-04-28'),
(14, '2022-04-29', '2022-05-07');

-- --------------------------------------------------------

--
-- Table structure for table `Permisos`
--

CREATE TABLE `Permisos` (
  `idFuncSis` int(11) NOT NULL,
  `Funcion` varchar(128) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Pregunta`
--

CREATE TABLE `Pregunta` (
  `idPregunta` int(11) NOT NULL,
  `descPregunta` varchar(128) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `Pregunta`
--

INSERT INTO `Pregunta` (`idPregunta`, `descPregunta`) VALUES
(1, '¿En que proyectos/iniciativas pudiste interactuar con ésta persona? ¿Cuál fue el alcance de dichos proyectos?'),
(2, 'Consideras que tu coworker ha dado su mejor desempeño?'),
(3, 'Prueba de inserción resendiz'),
(4, 'resendiz'),
(5, 'Plantilla 2 prueba'),
(6, 'Cómo te sientes trabajando en ZeBrands?'),
(7, 'Consideras que tu compañero te ha apoyado en todo momento?'),
(8, 'Prueba de inserción después de un delete'),
(9, 'Consideras que el evaluado es apto para subir de nivel?'),
(10, 'Consideras que el evaluado es digno de subir de nivel?'),
(11, 'Prueba de pregunta booleana'),
(12, 'Prueba de pregunta calificativa'),
(13, 'Volverías a utilizar este sistema?'),
(14, 'Desde tu punto de vista, cuál fue tu desempeño en el proyecto?'),
(15, 'Consideras un aumento de nivel para el evaluado?'),
(16, 'prueba de botón disabled'),
(17, 'prueba'),
(18, 'modificación de pregunta para probar algo'),
(19, ''),
(20, ''),
(21, '¿Recomendarías a algún familiar o amigo trabajar en Zebrands? '),
(22, 'Ha diseñado sistemas robustos y escalables? ¿Cuáles?'),
(23, '¿Te gustan las mantecadas?'),
(24, '¿Apoya a miembros del equipo cuando no pueden avanzar con sus tareas?'),
(25, 'Inserción tras modificación del nombre');

-- --------------------------------------------------------

--
-- Table structure for table `PreguntaRespuesta`
--

CREATE TABLE `PreguntaRespuesta` (
  `idRespuesta` int(11) NOT NULL,
  `fk_idCuestionario` int(11) NOT NULL,
  `Template` int(11) DEFAULT NULL,
  `idPregunta` int(11) DEFAULT NULL,
  `tipoPregunta` int(11) DEFAULT NULL,
  `Pregunta` varchar(128) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Respuesta` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `PreguntaRespuesta`
--

INSERT INTO `PreguntaRespuesta` (`idRespuesta`, `fk_idCuestionario`, `Template`, `idPregunta`, `tipoPregunta`, `Pregunta`, `Respuesta`) VALUES
(1, 1, 1, 1, 1, '¿En que proyectos/iniciativas pudiste interactuar con ésta persona? ¿Cuál fue el alcance de dichos proyectos?', 'Los proyectos con los que he estado con Isabela...'),
(2, 1, 1, 2, 1, 'Consideras que tu coworker ha dado su mejor desempeño?', 'Considero que Isabela ha...'),
(3, 1, 1, 6, 2, 'Cómo te sientes trabajando en ZeBrands?', '1'),
(4, 1, 1, 12, 3, 'Prueba de pregunta calificativa', '5'),
(5, 2, 1, 1, 1, '¿En que proyectos/iniciativas pudiste interactuar con ésta persona? ¿Cuál fue el alcance de dichos proyectos?', NULL),
(6, 2, 1, 2, 1, 'Consideras que tu coworker ha dado su mejor desempeño?', NULL),
(7, 2, 1, 6, 2, 'Cómo te sientes trabajando en ZeBrands?', NULL),
(8, 2, 1, 12, 3, 'Prueba de pregunta calificativa', NULL),
(9, 3, 1, 1, 1, '¿En que proyectos/iniciativas pudiste interactuar con ésta persona? ¿Cuál fue el alcance de dichos proyectos?', NULL),
(10, 3, 1, 2, 1, 'Consideras que tu coworker ha dado su mejor desempeño?', NULL),
(11, 3, 1, 6, 2, 'Cómo te sientes trabajando en ZeBrands?', NULL),
(12, 3, 1, 12, 3, 'Prueba de pregunta calificativa', NULL),
(13, 4, 1, 1, 1, '¿En que proyectos/iniciativas pudiste interactuar con ésta persona? ¿Cuál fue el alcance de dichos proyectos?', NULL),
(14, 4, 1, 2, 1, 'Consideras que tu coworker ha dado su mejor desempeño?', NULL),
(15, 4, 1, 6, 2, 'Cómo te sientes trabajando en ZeBrands?', NULL),
(16, 4, 1, 12, 3, 'Prueba de pregunta calificativa', NULL),
(17, 5, 1, 1, 1, '¿En que proyectos/iniciativas pudiste interactuar con ésta persona? ¿Cuál fue el alcance de dichos proyectos?', NULL),
(18, 5, 1, 2, 1, 'Consideras que tu coworker ha dado su mejor desempeño?', NULL),
(19, 5, 1, 6, 2, 'Cómo te sientes trabajando en ZeBrands?', NULL),
(20, 5, 1, 12, 3, 'Prueba de pregunta calificativa', NULL),
(21, 6, 1, 1, 1, '¿En que proyectos/iniciativas pudiste interactuar con ésta persona? ¿Cuál fue el alcance de dichos proyectos?', NULL),
(22, 6, 1, 2, 1, 'Consideras que tu coworker ha dado su mejor desempeño?', NULL),
(23, 6, 1, 6, 2, 'Cómo te sientes trabajando en ZeBrands?', NULL),
(24, 6, 1, 12, 3, 'Prueba de pregunta calificativa', NULL),
(25, 7, 1, 1, 1, '¿En que proyectos/iniciativas pudiste interactuar con ésta persona? ¿Cuál fue el alcance de dichos proyectos?', 'a'),
(26, 7, 1, 2, 1, 'Consideras que tu coworker ha dado su mejor desempeño?', 'a'),
(27, 7, 1, 6, 2, 'Cómo te sientes trabajando en ZeBrands?', '1'),
(28, 7, 1, 12, 3, 'Prueba de pregunta calificativa', '3'),
(29, 8, 2, 5, 1, 'Plantilla 2 prueba', 'Resendiz'),
(30, 9, 2, 5, 1, 'Plantilla 2 prueba', ''),
(31, 10, 1, 1, 1, '¿En que proyectos/iniciativas pudiste interactuar con ésta persona? ¿Cuál fue el alcance de dichos proyectos?', NULL),
(32, 10, 1, 2, 1, 'Consideras que tu coworker ha dado su mejor desempeño?', NULL),
(33, 10, 1, 6, 2, 'Cómo te sientes trabajando en ZeBrands?', NULL),
(34, 10, 1, 12, 3, 'Prueba de pregunta calificativa', NULL),
(35, 11, 1, 1, 1, '¿En que proyectos/iniciativas pudiste interactuar con ésta persona? ¿Cuál fue el alcance de dichos proyectos?', NULL),
(36, 11, 1, 2, 1, 'Consideras que tu coworker ha dado su mejor desempeño?', NULL),
(37, 11, 1, 6, 2, 'Cómo te sientes trabajando en ZeBrands?', NULL),
(38, 11, 1, 12, 3, 'Prueba de pregunta calificativa', NULL),
(39, 12, 2, 5, 1, 'Plantilla 2 prueba', 'bien probada'),
(40, 12, 2, 13, 2, 'Volverías a utilizar este sistema?', '1'),
(41, 13, 2, 5, 1, 'Plantilla 2 prueba', NULL),
(42, 13, 2, 13, 2, 'Volverías a utilizar este sistema?', NULL),
(43, 14, 2, 5, 1, 'Plantilla 2 prueba', 'prueba 2'),
(44, 14, 2, 13, 2, 'Volverías a utilizar este sistema?', '1'),
(45, 15, 2, 5, 1, 'Plantilla 2 prueba', 'prueba de mentees'),
(46, 15, 2, 13, 2, 'Volverías a utilizar este sistema?', '1'),
(47, 16, 2, 5, 1, 'Plantilla 2 prueba', 'respuesta'),
(48, 16, 2, 13, 2, 'Volverías a utilizar este sistema?', '1'),
(49, 17, 2, 5, 1, 'Plantilla 2 prueba', NULL),
(50, 17, 2, 13, 2, 'Volverías a utilizar este sistema?', NULL),
(51, 18, 2, 5, 1, 'Plantilla 2 prueba', ''),
(52, 18, 2, 13, 2, 'Volverías a utilizar este sistema?', NULL),
(53, 19, 1, 1, 1, '¿En que proyectos/iniciativas pudiste interactuar con ésta persona? ¿Cuál fue el alcance de dichos proyectos?', NULL),
(54, 19, 1, 2, 1, 'Consideras que tu coworker ha dado su mejor desempeño?', NULL),
(55, 19, 1, 6, 2, 'Cómo te sientes trabajando en ZeBrands?', NULL),
(56, 19, 1, 12, 3, 'Prueba de pregunta calificativa', NULL),
(57, 19, 1, 14, 1, 'Desde tu punto de vista, cuál fue tu desempeño en el proyecto?', NULL),
(58, 19, 1, 15, 2, 'Consideras un aumento de nivel para el evaluado?', NULL),
(59, 20, 1, 1, 1, '¿En que proyectos/iniciativas pudiste interactuar con ésta persona? ¿Cuál fue el alcance de dichos proyectos?', 'prueba de relleno'),
(60, 20, 1, 2, 1, 'Consideras que tu coworker ha dado su mejor desempeño?', 'sí'),
(61, 20, 1, 6, 2, 'Cómo te sientes trabajando en ZeBrands?', '1'),
(62, 20, 1, 12, 3, 'Prueba de pregunta calificativa', '5'),
(63, 20, 1, 14, 1, 'Desde tu punto de vista, cuál fue tu desempeño en el proyecto?', 'muy bueno'),
(64, 20, 1, 15, 2, 'Consideras un aumento de nivel para el evaluado?', '1'),
(65, 21, 1, 1, 1, '¿En que proyectos/iniciativas pudiste interactuar con ésta persona? ¿Cuál fue el alcance de dichos proyectos?', 'En el desarrollo del microservicio de ms-catalog'),
(66, 21, 1, 2, 1, 'Consideras que tu coworker ha dado su mejor desempeño?', 'Generalmente sí, aunque ha habido días que no está tan motivado'),
(67, 21, 1, 6, 2, 'Cómo te sientes trabajando en ZeBrands?', '1'),
(68, 21, 1, 12, 3, 'Prueba de pregunta calificativa', '4'),
(69, 21, 1, 14, 1, 'Desde tu punto de vista, cuál fue tu desempeño en el proyecto?', 'Muy bueno'),
(70, 21, 1, 15, 2, 'Consideras un aumento de nivel para el evaluado?', '1'),
(71, 22, 1, 1, 1, '¿En que proyectos/iniciativas pudiste interactuar con ésta persona? ¿Cuál fue el alcance de dichos proyectos?', ''),
(72, 22, 1, 2, 1, 'Consideras que tu coworker ha dado su mejor desempeño?', ''),
(73, 22, 1, 6, 2, 'Cómo te sientes trabajando en ZeBrands?', NULL),
(74, 22, 1, 12, 3, 'Prueba de pregunta calificativa', NULL),
(75, 22, 1, 14, 1, 'Desde tu punto de vista, cuál fue tu desempeño en el proyecto?', NULL),
(76, 22, 1, 15, 2, 'Consideras un aumento de nivel para el evaluado?', NULL),
(77, 23, 1, 1, 1, '¿En que proyectos/iniciativas pudiste interactuar con ésta persona? ¿Cuál fue el alcance de dichos proyectos?', NULL),
(78, 23, 1, 2, 1, 'Consideras que tu coworker ha dado su mejor desempeño?', NULL),
(79, 23, 1, 6, 2, 'Cómo te sientes trabajando en ZeBrands?', NULL),
(80, 23, 1, 12, 3, 'Prueba de pregunta calificativa', NULL),
(81, 23, 1, 14, 1, 'Desde tu punto de vista, cuál fue tu desempeño en el proyecto?', NULL),
(82, 23, 1, 15, 2, 'Consideras un aumento de nivel para el evaluado?', NULL),
(83, 24, 1, 1, 1, '¿En que proyectos/iniciativas pudiste interactuar con ésta persona? ¿Cuál fue el alcance de dichos proyectos?', NULL),
(84, 24, 1, 2, 1, 'Consideras que tu coworker ha dado su mejor desempeño?', NULL),
(85, 24, 1, 6, 2, 'Cómo te sientes trabajando en ZeBrands?', NULL),
(86, 24, 1, 12, 3, 'Prueba de pregunta calificativa', NULL),
(87, 24, 1, 14, 1, 'Desde tu punto de vista, cuál fue tu desempeño en el proyecto?', NULL),
(88, 24, 1, 15, 2, 'Consideras un aumento de nivel para el evaluado?', NULL),
(89, 25, 1, 1, 1, '¿En que proyectos/iniciativas pudiste interactuar con ésta persona? ¿Cuál fue el alcance de dichos proyectos?', NULL),
(90, 25, 1, 2, 1, 'Consideras que tu coworker ha dado su mejor desempeño?', NULL),
(91, 25, 1, 6, 2, 'Cómo te sientes trabajando en ZeBrands?', NULL),
(92, 25, 1, 12, 3, 'Prueba de pregunta calificativa', NULL),
(93, 25, 1, 14, 1, 'Desde tu punto de vista, cuál fue tu desempeño en el proyecto?', NULL),
(94, 25, 1, 15, 2, 'Consideras un aumento de nivel para el evaluado?', NULL),
(95, 26, 1, 1, 1, '¿En que proyectos/iniciativas pudiste interactuar con ésta persona? ¿Cuál fue el alcance de dichos proyectos?', 'En implemntación de backend ...'),
(96, 26, 1, 2, 1, 'Consideras que tu coworker ha dado su mejor desempeño?', 'Considero que ...'),
(97, 26, 1, 6, 2, 'Cómo te sientes trabajando en ZeBrands?', '1'),
(98, 26, 1, 12, 3, 'Prueba de pregunta calificativa', '5'),
(99, 26, 1, 14, 1, 'Desde tu punto de vista, cuál fue tu desempeño en el proyecto?', 'Fue un buen desempeño...'),
(100, 26, 1, 15, 2, 'Consideras un aumento de nivel para el evaluado?', '1'),
(101, 26, 1, 18, 2, 'modificación de pregunta para probar algo', '1'),
(102, 26, 1, 22, 1, 'Ha diseñado sistemas robustos y escalables? ¿Cuáles?', 'Aún no'),
(103, 27, 1, 1, 1, '¿En que proyectos/iniciativas pudiste interactuar con ésta persona? ¿Cuál fue el alcance de dichos proyectos?', 'Zebrands '),
(104, 27, 1, 2, 1, 'Consideras que tu coworker ha dado su mejor desempeño?', 'Si'),
(105, 27, 1, 6, 2, 'Cómo te sientes trabajando en ZeBrands?', '1'),
(106, 27, 1, 12, 3, 'Prueba de pregunta calificativa', '5'),
(107, 27, 1, 14, 1, 'Desde tu punto de vista, cuál fue tu desempeño en el proyecto?', '10/100'),
(108, 27, 1, 15, 2, 'Consideras un aumento de nivel para el evaluado?', '2'),
(109, 27, 1, 18, 2, 'modificación de pregunta para probar algo', '1'),
(110, 27, 1, 22, 1, 'Ha diseñado sistemas robustos y escalables? ¿Cuáles?', 'ZeCore Zebrands SIRE'),
(111, 28, 1, 1, 1, '¿En que proyectos/iniciativas pudiste interactuar con ésta persona? ¿Cuál fue el alcance de dichos proyectos?', NULL),
(112, 28, 1, 2, 1, 'Consideras que tu coworker ha dado su mejor desempeño?', NULL),
(113, 28, 1, 6, 2, 'Cómo te sientes trabajando en ZeBrands?', NULL),
(114, 28, 1, 12, 3, 'Prueba de pregunta calificativa', NULL),
(115, 28, 1, 14, 1, 'Desde tu punto de vista, cuál fue tu desempeño en el proyecto?', NULL),
(116, 28, 1, 15, 2, 'Consideras un aumento de nivel para el evaluado?', NULL),
(117, 28, 1, 18, 2, 'modificación de pregunta para probar algo', NULL),
(118, 28, 1, 22, 1, 'Ha diseñado sistemas robustos y escalables? ¿Cuáles?', NULL),
(119, 29, 2, 5, 1, 'Plantilla 2 prueba', NULL),
(120, 29, 2, 13, 2, 'Volverías a utilizar este sistema?', NULL),
(121, 30, 2, 5, 1, 'Plantilla 2 prueba', NULL),
(122, 30, 2, 13, 2, 'Volverías a utilizar este sistema?', NULL),
(123, 31, 2, 5, 1, 'Plantilla 2 prueba', NULL),
(124, 31, 2, 13, 2, 'Volverías a utilizar este sistema?', NULL),
(125, 32, 2, 5, 1, 'Plantilla 2 prueba', 'Bastante bien'),
(126, 32, 2, 13, 2, 'Volverías a utilizar este sistema?', '1'),
(127, 33, 2, 5, 1, 'Plantilla 2 prueba', NULL),
(128, 33, 2, 13, 2, 'Volverías a utilizar este sistema?', NULL),
(129, 39, 2, 5, 1, 'Plantilla 2 prueba', NULL),
(130, 39, 2, 13, 2, 'Volverías a utilizar este sistema?', NULL),
(131, 40, 2, 5, 1, 'Plantilla 2 prueba', ''),
(132, 40, 2, 13, 2, 'Volverías a utilizar este sistema?', '1');

-- --------------------------------------------------------

--
-- Table structure for table `RegistroAuth`
--

CREATE TABLE `RegistroAuth` (
  `fk_idEmpleado` int(11) NOT NULL,
  `fk_idRolSis` int(11) NOT NULL,
  `Fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `RegistroAuth`
--

INSERT INTO `RegistroAuth` (`fk_idEmpleado`, `fk_idRolSis`, `Fecha`) VALUES
(1, 1, '2022-04-07'),
(3, 2, '2022-04-18');

-- --------------------------------------------------------

--
-- Table structure for table `RolJerarquico`
--

CREATE TABLE `RolJerarquico` (
  `idRolJer` int(11) NOT NULL,
  `descRolJer` varchar(45) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `RolJerarquico`
--

INSERT INTO `RolJerarquico` (`idRolJer`, `descRolJer`) VALUES
(1, 'Member'),
(2, 'Chapter Lead Assitant'),
(3, 'Chapter Leader'),
(5860, 'empleado');

-- --------------------------------------------------------

--
-- Table structure for table `RolSistema`
--

CREATE TABLE `RolSistema` (
  `idRolSis` int(11) NOT NULL,
  `RolSis` varchar(45) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `RolSistema`
--

INSERT INTO `RolSistema` (`idRolSis`, `RolSis`) VALUES
(1, 'Member'),
(2, 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `Template`
--

CREATE TABLE `Template` (
  `idTemplate` int(11) NOT NULL,
  `NombreTemplate` varchar(128) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `Template`
--

INSERT INTO `Template` (`idTemplate`, `NombreTemplate`) VALUES
(1, 'Template Nivel 1'),
(2, 'Template Nivel 2'),
(3, 'Template Nivel 3'),
(4, 'Template Nivel 4'),
(5, 'Template Nivel 5');

-- --------------------------------------------------------

--
-- Stand-in structure for view `usuario_permisos`
-- (See below for the actual view)
--
CREATE TABLE `usuario_permisos` (
`id_rol_sistema` int(11)
,`idEmpleado` int(11)
,`nombre_empleado` varchar(45)
,`rol_sistema` varchar(45)
);

-- --------------------------------------------------------

--
-- Structure for view `nombres_cuestionario`
--
DROP TABLE IF EXISTS `nombres_cuestionario`;

CREATE ALGORITHM=UNDEFINED DEFINER=`u5sokjl76zng6fqs`@`%` SQL SECURITY DEFINER VIEW `nombres_cuestionario`  AS SELECT `a`.`idCuestionario` AS `idCuestionario`, `a`.`idEvaluado` AS `idEvaluado`, `a`.`fk_idEvaluador` AS `idEvaluador`, `b`.`nombre` AS `nombreEvaluado`, `b`.`apellidoP` AS `apellidoP_evaluado`, `b`.`apellidoM` AS `apellidoM_evaluado` FROM (`Cuestionario` `a` left join `Empleado` `b` on((`a`.`idEvaluado` = `b`.`idEmpleado`)))) ;

-- --------------------------------------------------------

--
-- Structure for view `usuario_permisos`
--
DROP TABLE IF EXISTS `usuario_permisos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`u5sokjl76zng6fqs`@`%` SQL SECURITY DEFINER VIEW `usuario_permisos`  AS SELECT `a`.`idEmpleado` AS `idEmpleado`, `a`.`nombre` AS `nombre_empleado`, `b`.`fk_idRolSis` AS `id_rol_sistema`, `c`.`RolSis` AS `rol_sistema` FROM ((`Empleado` `a` left join `RegistroAuth` `b` on((`a`.`idEmpleado` = `b`.`fk_idRolSis`))) left join `RolSistema` `c` on((`b`.`fk_idRolSis` = `c`.`idRolSis`)))) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `AsignacionPermisos`
--
ALTER TABLE `AsignacionPermisos`
  ADD PRIMARY KEY (`fk_idRolSis`,`fk_idFuncSis`),
  ADD KEY `fk_RolSistema_has_FuncionesSistema_FuncionesSistema1_idx` (`fk_idFuncSis`),
  ADD KEY `fk_RolSistema_has_FuncionesSistema_RolSistema1_idx` (`fk_idRolSis`);

--
-- Indexes for table `BancoPreguntas`
--
ALTER TABLE `BancoPreguntas`
  ADD PRIMARY KEY (`idBancoP`,`fk_idTemplate`,`fk_idPregunta`),
  ADD KEY `fk_Cuestionario_has_Pregunta_Pregunta1_idx` (`fk_idPregunta`),
  ADD KEY `fk_BancoPreguntas_Template1_idx` (`fk_idTemplate`);

--
-- Indexes for table `Chapter`
--
ALTER TABLE `Chapter`
  ADD PRIMARY KEY (`idChapter`);

--
-- Indexes for table `Cuestionario`
--
ALTER TABLE `Cuestionario`
  ADD PRIMARY KEY (`idCuestionario`,`fk_idPeriodo`,`fk_idEvaluador`,`fk_idTemplate`),
  ADD KEY `fk_Cuestionario_Empleado1_idx` (`fk_idEvaluador`),
  ADD KEY `fk_Cuestionario_Empleado2_idx` (`idEvaluado`),
  ADD KEY `fk_Cuestionario_PeriodoEvaluacion1_idx` (`fk_idPeriodo`),
  ADD KEY `fk_Cuestionario_Template1_idx` (`fk_idTemplate`);

--
-- Indexes for table `Empleado`
--
ALTER TABLE `Empleado`
  ADD PRIMARY KEY (`idEmpleado`,`fk_idChapter`,`fk_idRolJer`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `idEmpleado_UNIQUE` (`idEmpleado`),
  ADD KEY `fk_Empleado_Chapter1_idx` (`fk_idChapter`),
  ADD KEY `fk_Empleado_RolJerarquico1_idx` (`fk_idRolJer`);

--
-- Indexes for table `Mentees`
--
ALTER TABLE `Mentees`
  ADD PRIMARY KEY (`idMentees`,`fk_idLead`),
  ADD KEY `fk_Mentees_Empleado1_idx` (`fk_idLead`),
  ADD KEY `fk_Mentees_Empleado2_idx` (`idMentee`);

--
-- Indexes for table `Observacion`
--
ALTER TABLE `Observacion`
  ADD PRIMARY KEY (`idObservacion`);

--
-- Indexes for table `PeriodoEvaluacion`
--
ALTER TABLE `PeriodoEvaluacion`
  ADD PRIMARY KEY (`idPeriodo`),
  ADD UNIQUE KEY `idPeriodo_UNIQUE` (`idPeriodo`);

--
-- Indexes for table `Permisos`
--
ALTER TABLE `Permisos`
  ADD PRIMARY KEY (`idFuncSis`);

--
-- Indexes for table `Pregunta`
--
ALTER TABLE `Pregunta`
  ADD PRIMARY KEY (`idPregunta`);

--
-- Indexes for table `PreguntaRespuesta`
--
ALTER TABLE `PreguntaRespuesta`
  ADD PRIMARY KEY (`idRespuesta`,`fk_idCuestionario`),
  ADD KEY `fk_PreguntaRespuesta_Cuestionario_idx` (`fk_idCuestionario`);

--
-- Indexes for table `RegistroAuth`
--
ALTER TABLE `RegistroAuth`
  ADD PRIMARY KEY (`fk_idEmpleado`,`fk_idRolSis`),
  ADD KEY `fk_Empleado_has_RolSistema_RolSistema1_idx` (`fk_idRolSis`);

--
-- Indexes for table `RolJerarquico`
--
ALTER TABLE `RolJerarquico`
  ADD PRIMARY KEY (`idRolJer`);

--
-- Indexes for table `RolSistema`
--
ALTER TABLE `RolSistema`
  ADD PRIMARY KEY (`idRolSis`);

--
-- Indexes for table `Template`
--
ALTER TABLE `Template`
  ADD PRIMARY KEY (`idTemplate`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `BancoPreguntas`
--
ALTER TABLE `BancoPreguntas`
  MODIFY `idBancoP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `Chapter`
--
ALTER TABLE `Chapter`
  MODIFY `idChapter` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT for table `Cuestionario`
--
ALTER TABLE `Cuestionario`
  MODIFY `idCuestionario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `Empleado`
--
ALTER TABLE `Empleado`
  MODIFY `idEmpleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `Mentees`
--
ALTER TABLE `Mentees`
  MODIFY `idMentees` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT for table `Observacion`
--
ALTER TABLE `Observacion`
  MODIFY `idObservacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `PeriodoEvaluacion`
--
ALTER TABLE `PeriodoEvaluacion`
  MODIFY `idPeriodo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `Permisos`
--
ALTER TABLE `Permisos`
  MODIFY `idFuncSis` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Pregunta`
--
ALTER TABLE `Pregunta`
  MODIFY `idPregunta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `PreguntaRespuesta`
--
ALTER TABLE `PreguntaRespuesta`
  MODIFY `idRespuesta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT for table `RolJerarquico`
--
ALTER TABLE `RolJerarquico`
  MODIFY `idRolJer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5861;

--
-- AUTO_INCREMENT for table `RolSistema`
--
ALTER TABLE `RolSistema`
  MODIFY `idRolSis` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Template`
--
ALTER TABLE `Template`
  MODIFY `idTemplate` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `AsignacionPermisos`
--
ALTER TABLE `AsignacionPermisos`
  ADD CONSTRAINT `fk_RolSistema_has_FuncionesSistema_FuncionesSistema1` FOREIGN KEY (`fk_idFuncSis`) REFERENCES `Permisos` (`idFuncSis`),
  ADD CONSTRAINT `fk_RolSistema_has_FuncionesSistema_RolSistema1` FOREIGN KEY (`fk_idRolSis`) REFERENCES `RolSistema` (`idRolSis`);

--
-- Constraints for table `BancoPreguntas`
--
ALTER TABLE `BancoPreguntas`
  ADD CONSTRAINT `fk_BancoPreguntas_Template1` FOREIGN KEY (`fk_idTemplate`) REFERENCES `Template` (`idTemplate`),
  ADD CONSTRAINT `fk_Cuestionario_has_Pregunta_Pregunta1` FOREIGN KEY (`fk_idPregunta`) REFERENCES `Pregunta` (`idPregunta`);

--
-- Constraints for table `Cuestionario`
--
ALTER TABLE `Cuestionario`
  ADD CONSTRAINT `fk_Cuestionario_Empleado1` FOREIGN KEY (`fk_idEvaluador`) REFERENCES `Empleado` (`idEmpleado`),
  ADD CONSTRAINT `fk_Cuestionario_Empleado2` FOREIGN KEY (`idEvaluado`) REFERENCES `Empleado` (`idEmpleado`),
  ADD CONSTRAINT `fk_Cuestionario_PeriodoEvaluacion1` FOREIGN KEY (`fk_idPeriodo`) REFERENCES `PeriodoEvaluacion` (`idPeriodo`),
  ADD CONSTRAINT `fk_Cuestionario_Template1` FOREIGN KEY (`fk_idTemplate`) REFERENCES `Template` (`idTemplate`);

--
-- Constraints for table `Empleado`
--
ALTER TABLE `Empleado`
  ADD CONSTRAINT `fk_Empleado_Chapter1` FOREIGN KEY (`fk_idChapter`) REFERENCES `Chapter` (`idChapter`),
  ADD CONSTRAINT `fk_Empleado_RolJerarquico1` FOREIGN KEY (`fk_idRolJer`) REFERENCES `RolJerarquico` (`idRolJer`);

--
-- Constraints for table `Mentees`
--
ALTER TABLE `Mentees`
  ADD CONSTRAINT `fk_Mentees_Empleado1` FOREIGN KEY (`fk_idLead`) REFERENCES `Empleado` (`idEmpleado`),
  ADD CONSTRAINT `fk_Mentees_Empleado2` FOREIGN KEY (`idMentee`) REFERENCES `Empleado` (`idEmpleado`);

--
-- Constraints for table `PreguntaRespuesta`
--
ALTER TABLE `PreguntaRespuesta`
  ADD CONSTRAINT `fk_PreguntaRespuesta_Cuestionario` FOREIGN KEY (`fk_idCuestionario`) REFERENCES `Cuestionario` (`idCuestionario`);

--
-- Constraints for table `RegistroAuth`
--
ALTER TABLE `RegistroAuth`
  ADD CONSTRAINT `fk_Empleado_has_RolSistema_Empleado1` FOREIGN KEY (`fk_idEmpleado`) REFERENCES `Empleado` (`idEmpleado`),
  ADD CONSTRAINT `fk_Empleado_has_RolSistema_RolSistema1` FOREIGN KEY (`fk_idRolSis`) REFERENCES `RolSistema` (`idRolSis`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
