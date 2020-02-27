(function () {

    let CondorSubmitTabView = OCA.Files.DetailTabView.extend({

        id: 'condorsubmitTabView',
        className: 'tab condorsubmitTabView',
        events: {
            'submit .submitCondorForm': '_onSubmitCommand',
            'submit .submitSyncFiles' : '_onSyncCommand'
        },

        /**
         * get label of tab
         */
        getLabel: function () {

            return t('condorsubmit', 'Condor Submit');

        },

        /**
         * get icon of tab
         */
        getIcon: function () {

            return 'icon-play';

        },

        /**
         * Renders this details view
         *
         * @abstract
         */
        render: function () {

            this._renderButton(this.$el);

        },

        _renderButton: function ($el) {

            let SUBMIT_BUTTON_TEMPLATE =
                '    <div>' +
                '    <form class="submitCondorForm">' +
                '        <button type="submit" class="submit_button">Execute</button>' +
                '    </form>'+ 
                '    </div>'+
                '    <div>' +
                '    <form class="submitSyncFiles">' +
                '        <button type="sync" class="sync_button">Sync Files</button>' +
                '    </form>'
                '   </div>';

            $el.html(SUBMIT_BUTTON_TEMPLATE);
        },


        /**
         * show tab only on files
         */
        canDisplay: function (fileInfo) {
            if (fileInfo != null) {
                let name = fileInfo.name;
                if (name.indexOf('.sub') !== -1) {
                    if (!fileInfo.isDirectory()) {
                        return true;
                    }
                }
                return false;
            }
            return false;
        },

        _onSubmitCommand: function (ev) {
            ev.preventDefault();

            let self = this;

            this.submit(this.getFileInfo());

        },

        _onSyncCommand: function (ev) {
            ev.preventDefault();

            let self = this;

            this.sync($('head').data('user'));

        },

        submit: function (fileInfo) {
           
          if (fileInfo == null) {
                alert('No fileinfo provided.');

                return
            }

            let base_url = OC.generateUrl('/apps/condorsubmit/submit');

            let data = {
                source: fileInfo.getFullPath()
            };

            $.ajax({
                type: 'POST',
                url: base_url,
                dataType: 'json',
                data: data,
                async: true,
                success: function (data) {
                    console.log(data);
                }
            });
        },

        sync: function (user) {
            $('.sync_button').prop('disabled', true);

            let base_url = OC.generateUrl('/apps/condorsubmit/sync');

            let data = {
                user: user
            };

            $.ajax({
                type: 'POST',
                url: base_url,
                dataType: 'json',
                data: data,
                async: true,
                success: function (data) {
                    location.reload(true);
                }
            });
        }
    });

    OCA.CondorSubmit = OCA.CondorSubmit || {};

    OCA.CondorSubmit.CondorSubmitTabView = CondorSubmitTabView;

})();