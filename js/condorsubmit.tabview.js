(function() {

  var CondorSubmitTabView = OCA.Files.DetailTabView.extend({

    id: 'condorsubmitTabView',
    className: 'tab condorsubmitTabView',
    events: {
        'submit .submitCondorForm' : '_onSubmitCommand'
    },

    /**
     * get label of tab
     */
    getLabel: function() {

      return t('condorsubmit', 'Condor Submit');

    },

    /**
     * Renders this details view
     *
     * @abstract
     */
    render: function() {

      this._renderButton(this.$el);

    },

    _renderButton: function($el){

      var SUBMIT_BUTTON_TEMPLATE = 
      '    <form class="submitCondorForm">' +
      '        <button type="submit" class="excecute_button">Execute</button>' +
      '    </form>'; 
      
      $el.html(SUBMIT_BUTTON_TEMPLATE);
    },


    /**
     * show tab only on files
     */
    canDisplay: function(fileInfo) {

      if(fileInfo != null){

        var name = fileInfo.attributes.name;

        if(name.indexOf('.sub') != -1) {
          if(!fileInfo.isDirectory()) {
            return true;
          }
        }
          return false;
        }
      return false;       
    },

    _onSubmitCommand : function(ev){
      ev.preventDefault();

      var self = this;

      this.submit(this.getFileInfo());
      
    },

    submit: function(fileInfo){

      console.log(fileInfo);


      if(fileInfo == null){
        alert('No fileinfo provided.')

        return 
      }

      var base_url =  OC.generateUrl('/apps/condorsubmit/submit');
      
      var data = {
        source: fileInfo.getFullPath()
      };

      $.ajax({
        type: 'POST',
        url: base_url,
        dataType: 'json',
        data: data,
        async: true,
        success: function(data) {
          console.log(data);
        }
      });
    },

    /**
     * ajax callback for generating md5 hash
     */
    check: function(fileInfo, algorithmType) {
      // skip call if fileInfo is null
      if(null == fileInfo) {
        _self.updateDisplay({
          response: 'error',
          msg: t('condorsubmit', 'No fileinfo provided.')
        });

        return;
      }
      
      console.log(fileInfo);
  
      var url = OC.generateUrl('/apps/condorsubmit/submit'),
          data = {source: fileInfo.getFullPath()},
          _self = this;

      $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        data: data,
        async: true,
        success: function(data) {
          _self.updateDisplay(data, algorithmType);
        }
      });

    },

    /**
     * display message from ajax callback
     */
    updateDisplay: function(data, algorithmType) {

      var msg = '';
      if('success' == data.response) {
        msg = algorithmType + ': ' + data.msg;
      }
      if('error' == data.response) {
        msg = data.msg;
      }

      msg += '<br><br><a id="reload-condorsubmit" class="icon icon-history" style="display:block" href=""></a>';

      this.delegateEvents({
        'click #reload-condorsubmit': '_onReloadEvent'
      });

      this.$el.find('.get-condorsubmit').html(msg);

    } 
  });

  OCA.CondorSubmit = OCA.CondorSubmit || {};

  OCA.CondorSubmit.CondorSubmitTabView = CondorSubmitTabView;

})();