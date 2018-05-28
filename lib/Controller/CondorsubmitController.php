<?php
namespace OCA\Condorsubmit\Controller;

use OCP\AppFramework\Controller;
use OCP\IRequest;
use OC\Files\Filesystem;
use OCP\AppFramework\Http\JSONResponse;


class CondorsubmitController extends Controller {

		protected $language;

		public function __construct($appName, IRequest $request) {

				parent::__construct($appName, $request);

				// get i10n
				$this->language = \OC::$server->getL10N('checksum');

		}

		/**
		 * callback function to get md5 hash of a file
		 * @NoAdminRequired
		 * @param (string) $source - filename
		 * @param (string) $type - hash algorithm type
		 */
	  public function check($source, $type) {

	  		$condor_command = system('condor_submit '.escapeshellarg($source), $condor_value);

	  		if(!$this->checkAlgorithmType($type)) {
	  			return new JSONResponse(
							array(
									'response' => 'error',
									'msg' => $this->language->t('The algorithm type "%s" is not a valid or supported algorithm type.', array($type))
							)
					);
	  		}

				if($hash = $this->getHash($source, $type)){
						return new JSONResponse(
								array(
										'response' => 'success',
										'msg' => $hash,
										'condor_command' => $condor_command,
										'condor_value' => $condor_value
								)
						);
				} else {
						return new JSONResponse(
								array(
										'response' => 'error',
										'msg' => $this->language->t('File not found.')
								)
						);
				};

	  }

	  protected function getHash($source, $type) {

	  	if($info = Filesystem::getLocalFile($source)) {
	  			return hash_file($type, $info);
	  	}

	  	return false;
	  }

	  protected function checkAlgorithmType($type) {
	  	$list_algos = hash_algos();
	  	return in_array($type, $this->getAllowedAlgorithmTypes()) && in_array($type, $list_algos);
	  }

	  protected function getAllowedAlgorithmTypes() {
	  	return array(
				'md5',
				'sha1',
				'sha256',
				'sha384',
				'sha512',
				'crc32'
			);
		}
}

