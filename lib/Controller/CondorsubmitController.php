<?php
namespace OCA\Condorsubmit\Controller;

use OCP\AppFramework\Controller;
use OCP\IRequest;
use OC\Files\Filesystem;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;


class CondorsubmitController extends Controller {

	protected $language;

	public function __construct($appName, IRequest $request) {

			parent::__construct($appName, $request);

			// get i10n
			$this->language = \OC::$server->getL10N('condorsubmit');

	}


	public function submit($source){

		$file = Filesystem::getLocalFile($source);

		shell_exec('/var/www/html/nextcloud/data/admin/files/Condor/test.sh AnotherTest');

		return new DataResponse("$file submitting");
	}
}

