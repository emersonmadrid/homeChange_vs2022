var SessionidusuarioPerfil = JSON.parse(sessionStorage.getItem("idusuarioperfil"));
var Sessionidusuario = JSON.parse(sessionStorage.getItem("idusuario"));
console.log(SessionidusuarioPerfil);
console.log(Sessionidusuario);

(function ($, undefined) {
    'use strict';
    var Form = function ($element, options) {
        $.extend(this, $.fn.ContenedorTransacciones.defaults, $element.data(), typeof options == 'object' && options);
        this.setControls({
            form: $element,
            btnOrdenCliente: $('#btnOrdenCliente', $element),
            btnMiCuenta: $('#btnMiCuenta', $element),
            btnMisDatos: $('#btnMisDatos', $element),
            btnCambiarAhora: $('#btnCambiarAhora', $element),             
            myIframe: $('#myIframe', $element)
        });
    };
    Form.prototype = {
        constructor: Form,
        init: function () {
            var that = this,
            controls = that.getControls();
            controls.btnOrdenCliente.addEvent(that, 'click', that.btnOrdenCliente_click);
            controls.btnMiCuenta.addEvent(that, 'click', that.btnMiCuenta_click);
            controls.btnMisDatos.addEvent(that, 'click', that.btnMisDatos_click);
            controls.btnCambiarAhora.addEvent(that, 'click', that.btnCambiarAhora_click);
             
            that.render();
        },
        render: function () {
            console.log('bbbbbbbbbbbbbbbbbbbbbbb');
            var that = this,
                controls = that.getControls();
            that.LoadIframe('PanelControl');
        },
        btnCambiarAhora_click: function (sender, args) {
            var that = this,
             controls = that.getControls();
            that.LoadIframe('CambiarAhora', SessionidusuarioPerfil);
        },
        btnOrdenCliente_click: function (sender, args) {
            var that = this,
             controls = that.getControls();
            that.LoadIframe('OrdenCliente', SessionidusuarioPerfil);
        },
        btnMiCuenta_click: function (sender, args) {
            var that = this,
             controls = that.getControls();
            debugger;
            that.LoadIframe('MisCuentasBancarias', SessionidusuarioPerfil);
        },
        btnMisDatos_click: function (sender, args) {
            var that = this,
             controls = that.getControls();
            that.LoadIframe('EditarCliente', Sessionidusuario);
        },
        LoadIframe: function (pagina,id) {
            var that = this,
          controls = that.getControls();
          //  $(controls.myIframe).attr("src", "OrdenCliente?usuario=1");
            $(controls.myIframe).attr("src", pagina + '?idperfilusuario=' + id + '');
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
    $.fn.ContenedorTransacciones = function () {
        var option = arguments[0],
            args = arguments,
            value,
            allowedMethods = [];

        this.each(function () {

            var $this = $(this),
                data = $this.data('ContenedorTransacciones'),
                options = $.extend({}, $.fn.ContenedorTransacciones.defaults,
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
    $.fn.ContenedorTransacciones.defaults = {}
    $('#ContenedorTransacciones').ContenedorTransacciones();
})(jQuery);
