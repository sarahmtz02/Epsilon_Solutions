-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: bpnzdg3qreqalbxfqwow-mysql.services.clever-cloud.com:3306
-- Generation Time: May 04, 2022 at 07:45 PM
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
(1, 1, 1, 2),
(2, 1, 2, 3),
(3, 1, 3, 1);

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
(1, 'Software Development', 0);

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
(1, 1, 1, 1, 3, '1.1', 1);

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
(1, '2022-05-04', 'Ramiro', 'Ledesma', 'Solis', 0, '1.1', '1.1', '1.1', '1.1', 'Backend Developer', 'Backend DEV', 'ramiro@zeb.com', '$2a$12$Eu08wpkN2gbroiFzNsKE/.r2l/EA4VBWuIkbxDGO9guCi8tBdIs.2', 1, 3, 1),
(2, '2022-05-04', 'Juan', 'Torrijos', '', 0, '1.1', '1.1', '1.1', '1.1', '', '', 'juan@zeb.com', '$2a$12$2qw4OUIh5ypn37gzTS3pwe.AGeeC36Ixo94YBvM25Ervu2XaMyy7G', 1, 1, 1),
(3, '2022-05-04', 'Enrique', 'Santos', 'Fraire', 0, '1.1', '1.1', '1.1', '1.1', '', '', 'enrique@zeb.com', '$2a$12$6iw/GGpHzth8puiJ8ZnadeT/YGukO6TiRVvNy1MK85CPLCmHoAZma', 1, 1, 1);

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
(1, 1, 2, '', '2022-05-04', 1),
(2, 1, 3, '', '2022-05-04', 1);

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
(1, 3, 1, 1, 'Excelente trabajo, Enrique, esperamos verte con nosotros en el futuro.');

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
(1, '2022-05-04', '2022-05-07');

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
(1, 'Consideras que tu compañero ha tenido un buen desempeño a lo largo del periodo?'),
(2, 'Del 1 al 5, cómo calificarías a tu compañero?'),
(3, 'Si pudieras elegir una dimensión en la que ha destacado tu compañero, cuál sería?');

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
(1, 1, 1, 1, 2, 'Consideras que tu compañero ha tenido un buen desempeño a lo largo del periodo?', '1'),
(2, 1, 1, 2, 3, 'Del 1 al 5, cómo calificarías a tu compañero?', '5'),
(3, 1, 1, 3, 1, 'Si pudieras elegir una dimensión en la que ha destacado tu compañero, cuál sería?', 'Yo diría que en donde más destacó fue en Craft');

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
(3, 'Chapter Leader');

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
  MODIFY `idBancoP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Chapter`
--
ALTER TABLE `Chapter`
  MODIFY `idChapter` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT for table `Cuestionario`
--
ALTER TABLE `Cuestionario`
  MODIFY `idCuestionario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Empleado`
--
ALTER TABLE `Empleado`
  MODIFY `idEmpleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Mentees`
--
ALTER TABLE `Mentees`
  MODIFY `idMentees` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Observacion`
--
ALTER TABLE `Observacion`
  MODIFY `idObservacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `PeriodoEvaluacion`
--
ALTER TABLE `PeriodoEvaluacion`
  MODIFY `idPeriodo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Pregunta`
--
ALTER TABLE `Pregunta`
  MODIFY `idPregunta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `PreguntaRespuesta`
--
ALTER TABLE `PreguntaRespuesta`
  MODIFY `idRespuesta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
