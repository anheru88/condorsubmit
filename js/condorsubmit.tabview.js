(function () {

    let CondorSubmitTabView = OCA.Files.DetailTabView.extend({

        id: 'condorsubmitTabView',
        className: 'tab condorsubmitTabView',
        events: {
            'submit .submitCondorForm': '_onSubmitCommand'
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
                '    <form class="submitCondorForm">' +
                '        <button type="submit" class="excecute_button">Execute</button>' +
                '    </form>';

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
    });

    OCA.CondorSubmit = OCA.CondorSubmit || {};

    OCA.CondorSubmit.CondorSubmitTabView = CondorSubmitTabView;

})();