-- Volcando estructura de base de datos para NEW_APP_NAME
CREATE DATABASE IF NOT EXISTS `NEW_APP_NAME` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `NEW_APP_NAME`;

-- Volcando estructura para tabla NEW_APP_NAME.wallet_balance
CREATE TABLE IF NOT EXISTS `wallet_balance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
