(function ($, undefined) {
    'use strict';
    var Form = function ($element, options) {
        $.extend(this, $.fn.ContenedorCambiarAhora.defaults, $element.data(), typeof options == 'object' && options);
        this.setControls({
            form: $element,
            hdidPerfilUsuario: $('#hdidPerfilUsuario', $element),
            idprecioVenta: $('#idprecioVenta', $element),
            idprecioCompra: $('#idprecioCompra', $element),
            idcambiar: $('#idcambiar', $element),
            idresultado: $('#idresultado', $element),
            btncambiarAhora: $('#btncambiarAhora', $element),
            textoPen: $('#textoPen', $element),
            textoUss: $('#textoUss', $element),
            btncambiarMoneda: $('#btncambiarMoneda', $element),

        });
    };
    
    Form.prototype = {
        constructor: Form,
        init: function () {
            var that = this,
                controls = that.getControls();
            controls.idcambiar.addEvent(this, 'keyup', that.keyupCambiar);
            controls.idresultado.addEvent(this, 'keyup', that.keyupResultado);
            controls.btncambiarAhora.addEvent(this, 'click', that.btncambiarAhora_click);
            controls.btncambiarMoneda.addEvent(this, 'click', that.btncambiarMoneda_click);
            console.log('cambiarmuuuu');
            that.render();
        },
        render: function () {
            var that = this,
                controls = that.getControls();

            that.GetTipo_Cambio();

        },
//nuevo comentario con ignore
        setCambiarAhora: function () {
            var obj = {
                monto: montoEntrada,
                tipo: tipoCambioMoneda
            };
            $.ajax({
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                //data: JSON.stringify(parameters),
                async: false,
                url: '/Transactions/HomeMoney/registrarMonto',
                success: function (data) {
                    if (data.estado) {
                        window.location.href = '/Transactions/HomeMoney/cuentas';
                    } else {
                        window.location.href = uri + 'inicioRegistro';
                    }
                },
                error: function (msger) {
                    console.log('Error cuentas ' + msger);
                }

            });
        },

        // #################### CAMBIAR MONEDA ##############################
        btncambiarMoneda_click: function () {
            var that = this,
                controls = that.getControls();
            
            that.tipoCambioMoneda = (that.tipoCambioMoneda == 0 ? 1 : 0);
            that.calcularMonto(controls.idcambiar.val(), 0);
            that.actualizarValoresMoneda();
        },

        btncambiarAhora_click: function () {
            var that = this,
                controls = that.getControls();
            var montoEntrada = controls.idcambiar.val();
            if (montoEntrada > 0 && that.tipoCambioMoneda != null) {
                that.setCambiarAhora(montoEntrada);
            } else {
                //$('#mensaje-error').text("Ingrese monto para continuar");
                alert("Ingrese monto para continuar");
            }

        },
        keyupCambiar: function () {
            var that = this,
                controls = that.getControls();
            var tempValue = controls.idcambiar.val();
            if (tempValue == "") {
                controls.idcambiar.val("");
                controls.idresultado.val("");
            } else {
                if (that.filter(tempValue) === false) {
                    return false;
                } else {
                    that.calcularMonto(tempValue, 0);
                    return true;
                }

            }

        },

        keyupResultado: function () {
            var that = this,
                controls = that.getControls();
            var tempValue = controls.idresultado.val();
            if (tempValue == "") {
                controls.idcambiar.val("");
                controls.idresultado.val("");
            } else {
                if (that.filter(tempValue) === false) {
                    return false;
                } else {
                    that.calcularMonto(tempValue, 1);
                    return true;
                }

            }

        },

        filter: function (__val__) {
            var preg = /^([0-9]+\.?[0-9]{0,2})$/;
            if (preg.test(__val__) === true) {
                return true;
            } else {
                return false;
            }
        },

        actualizarValoresMoneda: function () {
            var that = this,
                controls = that.getControls();
            var htmlIn = "";
            var htmlOut = "";
            if (that.tipoCambioMoneda == 0) {
                htmlIn = "ENVÍAS SOLES";
                htmlOut = "RECIBES DOLARES";
                //  $('#inpt-imagen-entrada').attr('src', imagenPeru);
                //  $('#inpt-imagen-salida').attr('src', imagenUsa);
            } else {
                htmlIn = "ENVÍAS DOLARES";
                htmlOut = "RECIBES SOLES";
                //  $('#inpt-imagen-entrada').attr('src', imagenUsa);
                //  $('#inpt-imagen-salida').attr('src', imagenPeru);
            }
            controls.textoPen.text(htmlIn);
            controls.textoUss.text(htmlOut);
        },

        calcularMonto: function (val, direccion) {
            var that = this,
                controls = that.getControls();
            var resultado = 0.00;
            var venta = controls.idprecioVenta.text();
            var compra = controls.idprecioCompra.text();
            if (direccion === 0) {
                if (that.tipoCambioMoneda < 1) {
                    // SOLES A DOLARES
                    resultado = that.roundToX(parseFloat(val) / parseFloat(venta), 2);


                } else {
                    // DOLARES A SOLES
                    resultado = that.roundToX(parseFloat(val) * parseFloat(compra), 2);
                }
                if (isNaN(resultado)) {
                    resultado = "";
                }
                controls.idresultado.val(resultado);
            } else {
                if (that.tipoCambioMoneda < 1) {
                    // SOLES A DOLARES
                    resultado = that.roundToX(parseFloat(val) * parseFloat(venta), 2);
                } else {
                    // DOLARES A SOLES
                    resultado = that.roundToX(parseFloat(val) / parseFloat(compra), 2);
                }
                if (isNaN(resultado)) {
                    resultado = "";
                }
                controls.idcambiar.val(resultado);
            }

        },
        roundToX: function (num, X) {
            return +(Math.round(num + "e+" + X) + "e-" + X);
        },

        GetTipo_Cambio: function () {
            var that = this,
                controls = that.getControls();
            controls.idprecioVenta.text('');
            controls.idprecioCompra.text('');
            $.ajax({
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                //data: JSON.stringify(parameters),
                async: false,
                url: '/Transactions/HomeMoney/GetTipo_Cambio',
                success: function (response) {
                    if (response.data.ListTipo_Cambio.length > 0) {
                        var montoVenta = response.data.ListTipo_Cambio[0].monto_venta.replace(/,/g, '.');
                        var montoCompra = response.data.ListTipo_Cambio[0].monto_compra.replace(/,/g, '.');
                        controls.idprecioVenta.text(montoVenta);
                        controls.idprecioCompra.text(montoCompra);
                    }
                },
                error: function (msger) {
                    console.log('Error GetTipo_Cambio ' + msger);
                }

            });

        },

        getControls: function () {
            return this.m_controls || {};
        },
        setControls: function (value) {
            this.m_controls = value;
        },
        strUrl: window.location.protocol + '//' + window.location.host
    };
    $.fn.ContenedorCambiarAhora = function () {
        var option = arguments[0],
            args = arguments,
            value,
            allowedMethods = [];

        this.each(function () {

            var $this = $(this),
                data = $this.data('ContenedorCambiarAhora'),
                options = $.extend({}, $.fn.ContenedorCambiarAhora.defaults,
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
    $.fn.ContenedorCambiarAhora.defaults = { tipoCambioMoneda:0}
    $('#ContenedorCambiarAhora').ContenedorCambiarAhora();
})(jQuery);
