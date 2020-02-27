<?php

namespace OCA\Condorsubmit\Controller;

require_once(__DIR__ . '/../../vendor/autoload.php');

use OCP\AppFramework\Controller;
use OCP\IRequest;
use OC\Files\Filesystem;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;


class CondorsubmitController extends Controller {

    protected $language;

    public function __construct($appName, IRequest $request) {

    parent::__construct($appName, $request);

    // get i10n
    $this->language = \OC::$server->getL10N('condorsubmit');

    }

    public function submit($source){

        $file = Filesystem::getLocalFile($source);

        $connection = new AMQPStreamConnection('rabbitmq', 5672, 'guest', 'guest');

        $channel = $connection->channel();

        $channel->queue_declare('nextcloud', false, false, false, false);

        $msg = new AMQPMessage(
            json_encode(['file' => $file])
        );

        $channel->basic_publish($msg, '', 'nextcloud');

        $channel->close();

        $connection->close();

       return new DataResponse("$file submitting");
    }

    public function sync($user){
        $salida = shell_exec('php /var/www/html/occ files:scan ' . $user);

        return new DataResponse("$user data sync: $salida");    }
}
