-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Chapter`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Chapter` (
  `idChapter` INT NOT NULL,
  `nombreCh` VARCHAR(45) NOT NULL,
  `#empleados` INT NOT NULL,
  PRIMARY KEY (`idChapter`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Empleado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Empleado` (
  `idEmpleado` INT NOT NULL,
  `fechaIng` DATE NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `apellidoP` VARCHAR(45) NOT NULL,
  `apellidoM` VARCHAR(45) NOT NULL,
  `antiguedad` INT NOT NULL,
  `nivPeople` FLOAT NOT NULL,
  `nivCraft` FLOAT NOT NULL,
  `nivBusiness` FLOAT NOT NULL,
  `nivOverall` FLOAT NOT NULL,
  `puesto` VARCHAR(45) NOT NULL,
  `equipo` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) GENERATED ALWAYS AS () VIRTUAL,
  `fk_idChapter` INT NOT NULL,
  PRIMARY KEY (`idEmpleado`, `fk_idChapter`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `idEmpleado_UNIQUE` (`idEmpleado` ASC) VISIBLE,
  INDEX `fk_Empleado_Chapter_idx` (`fk_idChapter` ASC) VISIBLE,
  CONSTRAINT `fk_Empleado_Chapter`
    FOREIGN KEY (`fk_idChapter`)
    REFERENCES `mydb`.`Chapter` (`idChapter`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`RolJerarquico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`RolJerarquico` (
  `idRolJer` VARCHAR(15) NOT NULL,
  `descRolJer` VARCHAR(45) NOT NULL,
  `fk_idEmpleado` INT NOT NULL,
  PRIMARY KEY (`idRolJer`, `fk_idEmpleado`),
  INDEX `fk_RolJerarquico_Empleado1_idx` (`fk_idEmpleado` ASC) VISIBLE,
  CONSTRAINT `fk_RolJerarquico_Empleado1`
    FOREIGN KEY (`fk_idEmpleado`)
    REFERENCES `mydb`.`Empleado` (`idEmpleado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`PeriodoEvaluacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`PeriodoEvaluacion` (
  `idPeriodo` INT NOT NULL,
  `FechaInicio` DATE NOT NULL,
  `FechaFin` DATE NOT NULL,
  PRIMARY KEY (`idPeriodo`),
  UNIQUE INDEX `idPeriodo_UNIQUE` (`idPeriodo` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Template`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Template` (
  `idTemplate` INT NOT NULL,
  `NombreTemplate` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idTemplate`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Cuestionario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Cuestionario` (
  `idCuestionario` INT NOT NULL,
  `fk_idPeriodo` INT NOT NULL,
  `fk_idEvaluador` INT NOT NULL,
  `fk_idTemplate` INT NOT NULL,
  `idEvaluado` INT NOT NULL,
  `nivelEvaluado` FLOAT NOT NULL,
  PRIMARY KEY (`idCuestionario`, `fk_idPeriodo`, `fk_idEvaluador`, `fk_idTemplate`),
  INDEX `fk_Cuestionario_Empleado1_idx` (`fk_idEvaluador` ASC) VISIBLE,
  INDEX `fk_Cuestionario_Empleado2_idx` (`idEvaluado` ASC) VISIBLE,
  INDEX `fk_Cuestionario_Empleado3_idx` (`nivelEvaluado` ASC) VISIBLE,
  INDEX `fk_Cuestionario_PeriodoEvaluacion1_idx` (`fk_idPeriodo` ASC) VISIBLE,
  INDEX `fk_Cuestionario_Template1_idx` (`fk_idTemplate` ASC) VISIBLE,
  CONSTRAINT `fk_Cuestionario_Empleado1`
    FOREIGN KEY (`fk_idEvaluador`)
    REFERENCES `mydb`.`Empleado` (`idEmpleado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cuestionario_Empleado2`
    FOREIGN KEY (`idEvaluado`)
    REFERENCES `mydb`.`Empleado` (`idEmpleado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cuestionario_Empleado3`
    FOREIGN KEY (`nivelEvaluado`)
    REFERENCES `mydb`.`Empleado` (`nivOverall`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cuestionario_PeriodoEvaluacion1`
    FOREIGN KEY (`fk_idPeriodo`)
    REFERENCES `mydb`.`PeriodoEvaluacion` (`idPeriodo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cuestionario_Template1`
    FOREIGN KEY (`fk_idTemplate`)
    REFERENCES `mydb`.`Template` (`idTemplate`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Pregunta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Pregunta` (
  `idPregunta` INT NOT NULL,
  `descPregunta` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idPregunta`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`BancoPreguntas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`BancoPreguntas` (
  `fk_idPregunta` INT NOT NULL,
  `fk_idTemplate` INT NOT NULL,
  `tipoPregunta` TINYINT NOT NULL,
  PRIMARY KEY (`fk_idPregunta`, `fk_idTemplate`),
  INDEX `fk_Cuestionario_has_Pregunta_Pregunta1_idx` (`fk_idPregunta` ASC) VISIBLE,
  INDEX `fk_BancoPreguntas_Template1_idx` (`fk_idTemplate` ASC) VISIBLE,
  CONSTRAINT `fk_Cuestionario_has_Pregunta_Pregunta1`
    FOREIGN KEY (`fk_idPregunta`)
    REFERENCES `mydb`.`Pregunta` (`idPregunta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_BancoPreguntas_Template1`
    FOREIGN KEY (`fk_idTemplate`)
    REFERENCES `mydb`.`Template` (`idTemplate`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`RolSistema`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`RolSistema` (
  `idRolSis` VARCHAR(15) NOT NULL,
  `RolSis` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idRolSis`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`RegistroAuth`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`RegistroAuth` (
  `fk_idEmpleado` INT NOT NULL,
  `fk_idRolSis` VARCHAR(15) NOT NULL,
  `Fecha` DATE NOT NULL,
  PRIMARY KEY (`fk_idEmpleado`, `fk_idRolSis`),
  INDEX `fk_Empleado_has_RolSistema_RolSistema1_idx` (`fk_idRolSis` ASC) VISIBLE,
  CONSTRAINT `fk_Empleado_has_RolSistema_Empleado1`
    FOREIGN KEY (`fk_idEmpleado`)
    REFERENCES `mydb`.`Empleado` (`idEmpleado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Empleado_has_RolSistema_RolSistema1`
    FOREIGN KEY (`fk_idRolSis`)
    REFERENCES `mydb`.`RolSistema` (`idRolSis`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`FuncionesSistema`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`FuncionesSistema` (
  `idFuncSis` VARCHAR(15) NOT NULL,
  `Funcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idFuncSis`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Permisos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Permisos` (
  `fk_idRolSis` VARCHAR(15) NOT NULL,
  `fk_idFuncSis` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`fk_idRolSis`, `fk_idFuncSis`),
  INDEX `fk_RolSistema_has_FuncionesSistema_FuncionesSistema1_idx` (`fk_idFuncSis` ASC) VISIBLE,
  INDEX `fk_RolSistema_has_FuncionesSistema_RolSistema1_idx` (`fk_idRolSis` ASC) VISIBLE,
  CONSTRAINT `fk_RolSistema_has_FuncionesSistema_RolSistema1`
    FOREIGN KEY (`fk_idRolSis`)
    REFERENCES `mydb`.`RolSistema` (`idRolSis`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_RolSistema_has_FuncionesSistema_FuncionesSistema1`
    FOREIGN KEY (`fk_idFuncSis`)
    REFERENCES `mydb`.`FuncionesSistema` (`idFuncSis`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ChapterMood`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ChapterMood` (
  `idChapterMood` INT NOT NULL,
  `Mood` INT NULL,
  `Status` TINYINT NOT NULL,
  `fk_idEmpleado` INT NOT NULL,
  `fk_idPeriodo` INT NOT NULL,
  PRIMARY KEY (`idChapterMood`, `fk_idEmpleado`, `fk_idPeriodo`),
  INDEX `fk_ChapterMood_Empleado1_idx` (`fk_idEmpleado` ASC) VISIBLE,
  INDEX `fk_ChapterMood_PeriodoEvaluacion1_idx` (`fk_idPeriodo` ASC) VISIBLE,
  CONSTRAINT `fk_ChapterMood_Empleado1`
    FOREIGN KEY (`fk_idEmpleado`)
    REFERENCES `mydb`.`Empleado` (`idEmpleado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ChapterMood_PeriodoEvaluacion1`
    FOREIGN KEY (`fk_idPeriodo`)
    REFERENCES `mydb`.`PeriodoEvaluacion` (`idPeriodo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`PreguntaRespuesta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`PreguntaRespuesta` (
  `idRespuesta` INT NOT NULL,
  `fk_idCuestionario` INT NOT NULL,
  `Pregunta` VARCHAR(45) NOT NULL,
  `Respuesta` VARCHAR(45) NULL,
  PRIMARY KEY (`idRespuesta`, `fk_idCuestionario`),
  INDEX `fk_PreguntaRespuesta_Cuestionario_idx` (`fk_idCuestionario` ASC) VISIBLE,
  CONSTRAINT `fk_PreguntaRespuesta_Cuestionario`
    FOREIGN KEY (`fk_idCuestionario`)
    REFERENCES `mydb`.`Cuestionario` (`idCuestionario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
