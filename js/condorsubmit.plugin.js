(function() {

  OCA.CondorSubmit = OCA.CondorSubmit || {};

  /**
   * @namespace
   */
  OCA.CondorSubmit.Util = {

    /**
     * Initialize the CondorSubmit plugin.
     *
     * @param {OCA.Files.FileList} fileList file list to be extended
     */
    attach: function(fileList) {

      if (fileList.id === 'trashbin' || fileList.id === 'files.public') {
        return;
      }

      fileList.registerTabView(new OCA.CondorSubmit.CondorSubmitTabView('condorsubmitTabView', {}));

    }
  };
})();

OC.Plugins.register('OCA.Files.FileList', OCA.CondorSubmit.Util);
