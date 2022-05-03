-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: bpnzdg3qreqalbxfqwow-mysql.services.clever-cloud.com:3306
-- Generation Time: May 03, 2022 at 11:38 PM
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
(33, 2, 34, 1),
(34, 3, 34, 1),
(35, 4, 33, NULL),
(36, 5, 33, 1),
(37, 3, 35, 2),
(38, 1, 36, 1),
(39, 1, 37, 1),
(40, 1, 38, 2),
(41, 1, 39, 3),
(42, 4, 40, 2),
(46, 1, 44, 1),
(47, 1, 45, 1);

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
(50, 23, 3, 2, 1, '2.2', 0),
(51, 23, 8, 2, 1, '2.2', 0),
(52, 23, 1, 1, 8, '1.1', 1),
(53, 23, 3, 1, 8, '1.1', 1),
(54, 23, 36, 1, 8, '1.1', 0),
(55, 23, 37, 1, 8, '1.1', 1),
(56, 23, 3, 3, 37, '3.2', 1),
(57, 23, 8, 3, 37, '3.2', 1),
(58, 26, 36, 2, 1, '2.2', 0),
(59, 26, 38, 2, 1, '2.2', 1),
(60, 26, 1, 1, 38, '1.1', 0),
(61, 26, 3, 1, 38, '1.1', 0),
(62, 26, 1, 3, 3, '3.1', 1),
(63, 26, 8, 3, 3, '3.1', 0),
(64, 27, 1, 3, 3, '3.1', 1),
(65, 27, 8, 3, 3, '3.1', 0),
(66, 27, 37, 2, 1, '2.2', 0),
(67, 27, 38, 2, 1, '2.2', 0),
(68, 27, 38, 1, 8, '1.1', 0),
(69, 27, 1, 1, 8, '1.1', 0),
(70, 27, 3, 1, 8, '1.1', 0),
(71, 23, 3, 2, 1, '2.2', 0),
(72, 23, 36, 1, 8, '1.1', 0),
(73, 23, 3, 2, 1, '2.2', 0),
(74, 23, 37, 2, 1, '2.2', 0),
(75, 23, 36, 2, 1, '2.2', 0),
(76, 23, 38, 1, 8, '1.1', 0),
(77, 23, 39, 1, 8, '1.1', 0),
(78, 28, 36, 2, 1, '2.2', 0),
(79, 28, 38, 2, 1, '2.2', 0),
(80, 23, 38, 2, 1, '2.2', 0),
(81, 23, 1, 3, 3, '3.1', 1),
(82, 23, 39, 2, 1, '2.2', 0),
(83, 23, 44, 2, 1, '2.2', 0);

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
(1, '2022-04-07', 'Ramiro', 'Ledesma', 'Ramos', 1, '2.2', '5.1', '1.3', '2.3', 'Tester', 'ZeCore', 'ramiro.lr@test.com', '$2a$12$Mkwoi0hPchfIFxOypUHfBeAw49NOZRfvj3CEeMMjTzfZSkmngNUlu', 1, 3, 1),
(3, '2022-04-04', 'Maria', 'Ledesma', 'Editado', 1, '3.3', '3.1', '3.1', '3.1', 'Ingeniera', 'PE', 'maria.ls@zeb.mx', '$2a$12$cqrH6UHfC.2hBGLoSU6thOrKyG5OiY/9zeKq5TCGK4MBgNLaa8iwy', 1, 1, 1),
(8, '2022-04-07', 'Isabela', 'Vales', 'Chavarria', 0, '1.1', '1.1', '1.1', '1.1', 'Programmer', 'WMS', 'isabela.vc@test.com', '$2a$12$k7h.09GH77mKMh6T7Cjv3uWzUFPTclWbEcBamk2gwK0vOk37lkYf6', 1, 3, 1),
(36, '2022-05-03', 'Nicolas', 'Ramirez', 'Aguilar', 0, '3.3', '4.1', '3.2', '4.1', '', 'Example', 'nico@example.com', '$2a$12$VtN.rWTgKkqgMc3kZDlLTOvvDEM4Q.Ikb3GhEGun1zcDuMMl9DT0O', 1, 1, 1),
(37, '2022-05-03', 'Valter', 'Núñez', 'Vázquez', 0, '2.2', '3.3', '2.2', '3.2', '', 'Example', 'valter@example.com', '$2a$12$cut4LbxR02kpekMw.0AvPOln7w6PQ28Pzy1VUXyefiu5OlWV7iYPy', 1, 1, 1),
(38, '2022-05-03', 'Oscar', 'Puentes', 'Lederma', 0, '1.1', '1.1', '1.1', '1.1', 'Ingeniero', 'CMD', 'oscar@test.com', '$2a$12$b.sR3R/Yos3eMDVXbyljduyoS2yPayrVHadHV5VwIw0DHLkvWCDoG', 1, 1, 0),
(39, '2022-05-03', 'Juan', 'Perez', 'Rodriguez', 0, '1.3', '2.3', '3.1', '2.3', 'Backend Engineer', 'ZeClient', 'mau@zeb.mx', '$2a$12$J1OJen.dg.jmVIqJ/Nw1guwYv4z0qaAPMavh4HFL7D0/5vzGZ0q2q', 1, 1, 0),
(44, '2022-05-03', 'Oscar', 'Valtierra ', 'Guzman', 0, '3.2', '2.1', '2.1', '2.1', 'Ingeniero', 'CMD', 'oscarTest@test.com', '$2a$12$qYRB7hzZKxaUkoJfC0Ast.wZMQ.sq.qNNbY3YsZiOAiDdvtoq2eKm', 1, 1, 0);

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
(129, 36, 3, '', '2022-05-03', 23),
(130, 1, 3, '', '2022-05-03', 23),
(131, 36, 8, 'Test', '2022-05-03', 23),
(132, 36, 3, '', '2022-05-03', 23),
(133, 1, 37, '', '2022-05-02', 27),
(134, 1, 39, 'Prueba', '2022-05-03', 28);

-- --------------------------------------------------------

--
-- Stand-in structure for view `nombres_cuestionario`
-- (See below for the actual view)
--
CREATE TABLE `nombres_cuestionario` (
`idCuestionario` int(11)
,`idEvaluado` int(11)
,`idEvaluador` int(11)
,`nombreEvaluado` varchar(45)
,`apellidoP_evaluado` varchar(45)
,`apellidoM_evaluado` varchar(45)
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
(29, 8, 1, 23, 'Podrías mejorar tu entendimiento de negocio');

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
(23, '2022-05-03', '2022-05-05'),
(24, '2022-06-15', '2022-06-17'),
(25, '2022-05-13', '2022-05-26'),
(26, '2022-07-14', '2022-07-16'),
(27, '2022-08-02', '2022-08-10'),
(28, '2022-05-07', '2022-05-10');

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
  `descPregunta` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `Pregunta`
--

INSERT INTO `Pregunta` (`idPregunta`, `descPregunta`) VALUES
(33, '¿En qué proyectos/iniciativas pudiste interactuar con esta persona? ¿Cuál fue el alcance de dichos proyectos?'),
(34, 'Tomando en cuenta las competencias esperadas del nivel Craft ¿Cuáles crees que son sus fortalezas?  '),
(35, 'Has tenido algún inconveniente con tomar el liderazgo de tu equipo?'),
(36, '¿En qué proyectos has trabajado con el evaluado?'),
(37, '¿Cómo es su dominio de python?'),
(38, 'SI/NO'),
(39, '¿Qué nivel le asignarías en craft?'),
(40, '¿Hace buenas revisiones de PRs y da sugerencias?'),
(41, 'Prueba de redireccionamiento'),
(42, 'prueba'),
(43, 'prueba 2'),
(44, 'prueba'),
(45, 'Cómo evaluarías su claridad para comunicarse en una escala de 1 a 5? (5 es mejor)'),
(46, 'Resendiz ');

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
(189, 52, 1, 33, 1, '¿En qué proyectos/iniciativas pudiste interactuar con esta persona? ¿Cuál fue el alcance de dichos proyectos?', 'Xd'),
(190, 52, 1, 34, 2, 'Tomando en cuenta las competencias esperadas del nivel Craft ¿Cuáles crees que son sus fortalezas?  ', '1'),
(191, 53, 1, 33, 1, '¿En qué proyectos/iniciativas pudiste interactuar con esta persona? ¿Cuál fue el alcance de dichos proyectos?', 'El proyecto tuvo gran impacto en la empresa'),
(192, 53, 1, 34, 2, 'Tomando en cuenta las competencias esperadas del nivel Craft ¿Cuáles crees que son sus fortalezas?  ', '1'),
(193, 54, 1, 36, 1, '¿En qué proyectos has trabajado con el evaluado?', NULL),
(194, 54, 1, 37, 1, '¿Cómo es su dominio de python?', NULL),
(195, 54, 1, 38, 2, 'SI/NO', NULL),
(196, 54, 1, 39, 3, '¿Qué nivel le asignarías en craft?', NULL),
(197, 55, 1, 36, 1, '¿En qué proyectos has trabajado con el evaluado?', 'Trabajamos juntos en zecore client'),
(198, 55, 1, 37, 1, '¿Cómo es su dominio de python?', 'Muy bueno'),
(199, 55, 1, 38, 2, 'SI/NO', '2'),
(200, 55, 1, 39, 3, '¿Qué nivel le asignarías en craft?', '4'),
(201, 56, 3, 34, 1, 'Tomando en cuenta las competencias esperadas del nivel Craft ¿Cuáles crees que son sus fortalezas?  ', 'Considero que tiene grandes aptitudes dentro y fuera de su área'),
(202, 56, 3, 35, 2, 'Has tenido algún inconveniente con tomar el liderazgo de tu equipo?', '2'),
(203, 57, 3, 34, 1, 'Tomando en cuenta las competencias esperadas del nivel Craft ¿Cuáles crees que son sus fortalezas?  ', 'Buen diseño de arquitectura'),
(204, 57, 3, 35, 2, 'Has tenido algún inconveniente con tomar el liderazgo de tu equipo?', '1'),
(205, 58, 2, 34, 1, 'Tomando en cuenta las competencias esperadas del nivel Craft ¿Cuáles crees que son sus fortalezas?  ', NULL),
(206, 59, 2, 34, 1, 'Tomando en cuenta las competencias esperadas del nivel Craft ¿Cuáles crees que son sus fortalezas?  ', 'Considero que posee un liderazgo natural y sabe como gestionar a todos los miembros del equipo para repartir los trabajos de acuerdo con las capacidades de cada quien. '),
(207, 60, 1, 36, 1, '¿En qué proyectos has trabajado con el evaluado?', NULL),
(208, 60, 1, 37, 1, '¿Cómo es su dominio de python?', NULL),
(209, 60, 1, 38, 2, 'SI/NO', NULL),
(210, 60, 1, 39, 3, '¿Qué nivel le asignarías en craft?', NULL),
(211, 61, 1, 36, 1, '¿En qué proyectos has trabajado con el evaluado?', NULL),
(212, 61, 1, 37, 1, '¿Cómo es su dominio de python?', NULL),
(213, 61, 1, 38, 2, 'SI/NO', NULL),
(214, 61, 1, 39, 3, '¿Qué nivel le asignarías en craft?', NULL),
(215, 62, 3, 34, 1, 'Tomando en cuenta las competencias esperadas del nivel Craft ¿Cuáles crees que son sus fortalezas?  ', 'Tiene una gran destreza y facilidad de adaptarse a nuevos lenguajes de programación. '),
(216, 62, 3, 35, 2, 'Has tenido algún inconveniente con tomar el liderazgo de tu equipo?', '2'),
(217, 63, 3, 34, 1, 'Tomando en cuenta las competencias esperadas del nivel Craft ¿Cuáles crees que son sus fortalezas?  ', NULL),
(218, 63, 3, 35, 2, 'Has tenido algún inconveniente con tomar el liderazgo de tu equipo?', NULL),
(219, 64, 3, 34, 1, 'Tomando en cuenta las competencias esperadas del nivel Craft ¿Cuáles crees que son sus fortalezas?  ', 'Considero que tiene una gran destreza en adaptarse a nuevos ambientes con gran facilidad'),
(220, 64, 3, 35, 2, 'Has tenido algún inconveniente con tomar el liderazgo de tu equipo?', '2'),
(221, 65, 3, 34, 1, 'Tomando en cuenta las competencias esperadas del nivel Craft ¿Cuáles crees que son sus fortalezas?  ', NULL),
(222, 65, 3, 35, 2, 'Has tenido algún inconveniente con tomar el liderazgo de tu equipo?', NULL),
(223, 66, 2, 34, 1, 'Tomando en cuenta las competencias esperadas del nivel Craft ¿Cuáles crees que son sus fortalezas?  ', NULL),
(224, 67, 2, 34, 1, 'Tomando en cuenta las competencias esperadas del nivel Craft ¿Cuáles crees que son sus fortalezas?  ', NULL),
(225, 69, 1, 36, 1, '¿En qué proyectos has trabajado con el evaluado?', NULL),
(226, 69, 1, 37, 1, '¿Cómo es su dominio de python?', NULL),
(227, 69, 1, 38, 2, 'SI/NO', NULL),
(228, 69, 1, 39, 3, '¿Qué nivel le asignarías en craft?', NULL),
(229, 70, 1, 36, 1, '¿En qué proyectos has trabajado con el evaluado?', NULL),
(230, 70, 1, 37, 1, '¿Cómo es su dominio de python?', NULL),
(231, 70, 1, 38, 2, 'SI/NO', NULL),
(232, 70, 1, 39, 3, '¿Qué nivel le asignarías en craft?', NULL),
(233, 72, 1, 36, 1, '¿En qué proyectos has trabajado con el evaluado?', NULL),
(234, 72, 1, 37, 1, '¿Cómo es su dominio de python?', NULL),
(235, 72, 1, 38, 2, 'SI/NO', NULL),
(236, 72, 1, 39, 3, '¿Qué nivel le asignarías en craft?', NULL),
(237, 73, 2, 34, 1, 'Tomando en cuenta las competencias esperadas del nivel Craft ¿Cuáles crees que son sus fortalezas?  ', NULL),
(238, 74, 2, 34, 1, 'Tomando en cuenta las competencias esperadas del nivel Craft ¿Cuáles crees que son sus fortalezas?  ', NULL),
(239, 75, 2, 34, 1, 'Tomando en cuenta las competencias esperadas del nivel Craft ¿Cuáles crees que son sus fortalezas?  ', NULL),
(240, 76, 1, 36, 1, '¿En qué proyectos has trabajado con el evaluado?', NULL),
(241, 76, 1, 37, 1, '¿Cómo es su dominio de python?', NULL),
(242, 76, 1, 38, 2, 'SI/NO', NULL),
(243, 76, 1, 39, 3, '¿Qué nivel le asignarías en craft?', NULL),
(244, 76, 1, 44, 1, 'prueba', NULL),
(245, 76, 1, 45, 3, 'Cómo evaluarías su claridad para comunicarse en una escala de 1 a 5? (5 es mejor)', NULL),
(246, 77, 1, 36, 1, '¿En qué proyectos has trabajado con el evaluado?', NULL),
(247, 77, 1, 37, 1, '¿Cómo es su dominio de python?', NULL),
(248, 77, 1, 38, 2, 'SI/NO', NULL),
(249, 77, 1, 39, 3, '¿Qué nivel le asignarías en craft?', NULL),
(250, 77, 1, 44, 1, 'prueba', NULL),
(251, 77, 1, 45, 3, 'Cómo evaluarías su claridad para comunicarse en una escala de 1 a 5? (5 es mejor)', NULL),
(252, 78, 2, 34, 1, 'Tomando en cuenta las competencias esperadas del nivel Craft ¿Cuáles crees que son sus fortalezas?  ', NULL),
(253, 79, 2, 34, 1, 'Tomando en cuenta las competencias esperadas del nivel Craft ¿Cuáles crees que son sus fortalezas?  ', NULL),
(254, 80, 2, 34, 1, 'Tomando en cuenta las competencias esperadas del nivel Craft ¿Cuáles crees que son sus fortalezas?  ', NULL),
(255, 81, 3, 34, 1, 'Tomando en cuenta las competencias esperadas del nivel Craft ¿Cuáles crees que son sus fortalezas?  ', 'Considero que es un lider natural, ya que conoce como gestionar a todos los miembros de un equipo de manera efectiva'),
(256, 81, 3, 35, 2, 'Has tenido algún inconveniente con tomar el liderazgo de tu equipo?', '2'),
(257, 82, 2, 34, 1, 'Tomando en cuenta las competencias esperadas del nivel Craft ¿Cuáles crees que son sus fortalezas?  ', NULL),
(258, 83, 2, 34, 1, 'Tomando en cuenta las competencias esperadas del nivel Craft ¿Cuáles crees que son sus fortalezas?  ', NULL);

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
`idEmpleado` int(11)
,`nombre_empleado` varchar(45)
,`id_rol_sistema` int(11)
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
  MODIFY `idBancoP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `Chapter`
--
ALTER TABLE `Chapter`
  MODIFY `idChapter` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT for table `Cuestionario`
--
ALTER TABLE `Cuestionario`
  MODIFY `idCuestionario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `Empleado`
--
ALTER TABLE `Empleado`
  MODIFY `idEmpleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `Mentees`
--
ALTER TABLE `Mentees`
  MODIFY `idMentees` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `Observacion`
--
ALTER TABLE `Observacion`
  MODIFY `idObservacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `PeriodoEvaluacion`
--
ALTER TABLE `PeriodoEvaluacion`
  MODIFY `idPeriodo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `Permisos`
--
ALTER TABLE `Permisos`
  MODIFY `idFuncSis` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Pregunta`
--
ALTER TABLE `Pregunta`
  MODIFY `idPregunta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `PreguntaRespuesta`
--
ALTER TABLE `PreguntaRespuesta`
  MODIFY `idRespuesta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=259;

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
