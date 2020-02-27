<?php
/**
 * adding route for ajax callback
 */
return ['routes' => [
    ['name' => 'condorsubmit#submit', 'url' => '/submit', 'verb' => 'POST'],
    ['name' => 'condorsubmit#sync', 'url' => '/sync', 'verb' => 'POST'],
]];