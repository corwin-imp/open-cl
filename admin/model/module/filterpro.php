<?php 
class ModelModuleFilterpro extends Model {
		public function install() 
	{
	
		// ..................................................................
	
	
		$sql = "CREATE TABLE IF NOT EXISTS `" . DB_PREFIX . "filterpro_seo` (
				`url` varchar(255) NOT NULL,
				`data` text(100) NOT NULL,
				PRIMARY KEY (`url`)
				) ENGINE=MyISAM  DEFAULT CHARSET=utf8";
				
		$this->db->query($sql);
	}	
}
?>