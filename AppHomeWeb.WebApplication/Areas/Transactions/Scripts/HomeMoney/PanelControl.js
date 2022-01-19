var SessionidusuarioPerfil = JSON.parse(sessionStorage.getItem("idusuarioperfil"));
var Sessionidusuario = JSON.parse(sessionStorage.getItem("idusuario"));
console.log(SessionidusuarioPerfil);
console.log(Sessionidusuario);

(function ($, undefined) {
    'use strict';
    var Form = function ($element, options) {
        $.extend(this, $.fn.ContenedorPanelControl.defaults, $element.data(), typeof options == 'object' && options);
        this.setControls({
            form: $element,
            btnMisOrdenesControl: $('#btnMisOrdenesControl', $element),
            //myIframe: $('#myIframe', $element)
            btnMiCuentaControl: $('#btnMiCuentaControl', $element),
            btnMisDatosControl: $('#btnMisDatosControl', $element),
            btnCambiarAhoraControl: $('#btnCambiarAhoraControl', $element)
            //myIframe: $('#myIframe', $element)
        });
    };
    Form.prototype = {
        constructor: Form,
        init: function () {
            var that = this,
            controls = that.getControls();
            controls.btnMisOrdenesControl.addEvent(that, 'click', that.btnMisOrdenesControl_click);
            controls.btnMiCuentaControl.addEvent(that, 'click', that.btnMiCuentaControl_click);
            controls.btnMisDatosControl.addEvent(that, 'click', that.btnMisDatosControl_click);
            controls.btnCambiarAhoraControl.addEvent(that, 'click', that.btnCambiarAhoraControl_click);
            that.render();
        },
        render: function () {
            var that = this,
                controls = that.getControls();
        },
        btnCambiarAhoraControl_click: function (sender, args) {
            var that = this,
             controls = that.getControls();
            that.LoadIframe('CambiarAhora', SessionidusuarioPerfil);
        },
        btnMisOrdenesControl_click: function (sender, args) {
            var that = this,
             controls = that.getControls();
            that.LoadIframe('OrdenCliente', SessionidusuarioPerfil);
        },
        btnMiCuentaControl_click: function (sender, args) {
            var that = this,
             controls = that.getControls();
            that.LoadIframe('MisCuentasBancarias', SessionidusuarioPerfil);
        },
        btnMisDatosControl_click: function (sender, args) {
            var that = this,
             controls = that.getControls();
            that.LoadIframe('EditarCliente', Sessionidusuario);
        },
        LoadIframe: function (pagina, id) {
            var that = this,
          controls = that.getControls();
            //  $(controls.myIframe).attr("src", "OrdenCliente?usuario=1");
            window.location.href = '/Transactions/HomeMoney/' + pagina + '?idperfilusuario=' + id + '';
            //LoadIframe(controls.myIframe);

        },
        getControls: function () {
            return this.m_controls || {};
        },
        setControls: function (value) {
            this.m_controls = value;
        },
        strUrl: window.location.protocol + '//' + window.location.host
    };
    $.fn.ContenedorPanelControl = function () {
        var option = arguments[0],
            args = arguments,
            value,
            allowedMethods = [];

        this.each(function () {

            var $this = $(this),
                data = $this.data('ContenedorPanelControl'),
                options = $.extend({}, $.fn.ContenedorPanelControl.defaults,
                    $this.data(), typeof option === 'object' && option);

            if (!data) {
                data = new Form($this, options);
                $this.data('RecordEquipment', data);
            }

            if (typeof option === 'string') {
                if ($.inArray(option, allowedMethods) < 0) {
                    throw "Unknown method: " + option;
                }
                value = data[option](args[1]);
            } else {

                var timeReady = setInterval(function () {
                    if (!!$.fn.addEvent) {
                        clearInterval(timeReady);
                        data.init();
                    }
                }, 100);

                if (args[1]) {
                    value = data[args[1]].apply(data, [].slice.call(args, 2));
                }
            }
        });

        return value || this;
    };
    $.fn.ContenedorPanelControl.defaults = {}
    $('#ContenedorPanelControl').ContenedorPanelControl();
})(jQuery);
