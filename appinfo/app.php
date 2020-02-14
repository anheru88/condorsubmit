<?php
/**
 * Load Javascrip
 */

use OCP\Util;

$eventDispatcher = \OC::$server->getEventDispatcher();
$eventDispatcher->addListener('OCA\Files::loadAdditionalScripts', function(){
    Util::addScript('condorsubmit', 'condorsubmit.tabview' );
    Util::addScript('condorsubmit', 'condorsubmit.plugin' );
});

