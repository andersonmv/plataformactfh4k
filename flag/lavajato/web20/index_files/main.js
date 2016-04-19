//#################################################################################################//
// FAVOR COMENTAR O CODIGO                                                                         //
// - Assim evitamos adivinhar ou sempre ficar lendo e relendo para entender seu funcionamento      //
// - Para produção, enviar o arquivo minificado                                                    //
//#################################################################################################//

var INSTITUTOLULA = {
    localpath: null,

    estilo_tablet: null,
    estilo_mobile: null,
    banner_limit: null,

    filtroPremios: {
        ano_ativo: null,
        mostrar_img: true
    },

    init: function (config) {
        //get local path ==============================================
        this.localpath = this.getLocalPath();
        //=============================================================

        this.config = config;
        this.setaEstilos();
        this.bindTablet();
        this.bindFancybox();
        this.bindMobile();
        this.bindInputBuscar();
        this.bindScroll();

        this.personalizarSelects();//Personalização de Selects
        this.personalizarRadio();// Personalizar radio
        this.personalizarCheckbox();//Personalizar checkbox

        // Personalizar radio tablet
        if (this.estilo_tablet)
            this.personalizarRadioTablet();

        //Thumbnailer.config.shaderOpacity = 1;
        if (this.estilo_mobile == 'none') {
            var tn1 = $('.mygallery').tn3({
                skinDir: "skins",
                autoplay: true,
                imageClick: "fullscreen",
                image: {
                    maxZoom: 1.5,
                    crop: true,
                    clickEvent: "dblclick",
                    transitions: [
                        {
                            type: "fade",
                            duration: 300,
                            direction: "top"
                        }
                    ]
                },
                thumbnailer: {
                    shaderOpacity: 0
                }
            });
        }

        if (this.localpath == "sobre" || this.localpath == "en/about" || this.localpath == "es/sobre") {
            this.bindFiltroInstituto();
        }
        if (this.localpath == "noticias" || this.localpath == "en/news" || this.localpath == "es/noticias") {
            this.bindFiltroNoticias();
        }
        if (this.localpath == "perguntas" || this.localpath == "en/faq" || this.localpath == "es/faq") {
            this.bindFiltroPerguntas();
        }
        if (this.localpath == "america-latina" || this.localpath == "en/latin-america" || this.localpath == "es/america-latina") {
            this.bindFiltroAmericaLatina();
        }
        if (this.localpath == "africa" || this.localpath == "en/africa" || this.localpath == "es/africa") {
            this.bindFiltroAfrica();
        }
        if (this.localpath == "premios" || this.localpath == "en/awards" || this.localpath == "es/premios") {
            this.bindFiltroPremios();
            //his.bindForms();
        }
        if (this.localpath == "contato" || this.localpath == "en/contact" || this.localpath == "es/contacto") {
            //this.bindContatoForm();
            this.bindForms();
        }
        if (this.localpath == "lula" || this.localpath == "en/lula" || this.localpath == "es/lula") {
            this.lula();
        }
        if (this.localpath == "contribua" || this.localpath == "en/contribute" || this.localpath == "es/contribuya") {
            this.bindContribua();
        }
        if (this.localpath == "relatorios" || this.localpath == "en/reports" || this.localpath == "es/informes") {
            this.bindRelatorios();
        }
        if (this.localpath == "africa/dialogos-africanos" || this.localpath == "en/africa/african-dialogues" || this.localpath == "es/africa/dialogos-africanos") {
            this.bindAfricaDialogosAfricanos(this.localpath);
        }

        this.oInstituto();

        this.banner3();

    },
    getLocalPath: function () {
        var localpath = window.location.pathname.substring(1),
            splitpath = localpath.split(".");
        return splitpath[0];
    },
    setaEstilos: function () {
        //--------------- estilos ---------------//
        this.estilo_mobile = this.config.elCampoMob.css('display');
        this.estilo_tablet = false;

        if (this.config.elHeader.width() <= 940)
            this.estilo_tablet = true;
    },
    bindTablet: function () {
        //--------------- para tablet ---------------//
        // lateral midias
        if (this.config.elLateralFixa.length) {
            // realocando lateral fixa de midias sociais
            if ((this.config.elHeader.width() <= 940) || (this.estilo_mobile == 'block')) {
                var elemento = this.config.elLateralFixa.find('ul').detach();
                this.config.elInfoAdicional.append(elemento);
                this.config.elInfoAdicionalUl.addClass('midias_fixas');
            } else {
                // aplicando efeito lateral bottom
                this.config.elLateralBottom.css('right', '-350px');
            }
        }

        if ((this.config.elHeader.width() <= 940) || (this.estilo_mobile == 'block')) {
            //youtube
            if (this.config.elInterna.length) {
                this.config.elIframe.each(function () {
                    if ($(this).attr('src').indexOf("youtube") == 11) {
                        $(this).attr('height', '600');
                    }
                });
            }
            //Imagens Home
            if (this.config.elIndexSecChamada.length && !this.config.elIndexSecChamadaEs.length) {
                this.config.elIndexSecChamadaNot3.css('display', 'none');
            } else if (this.config.elIndexSecChamada.length && this.config.elIndexSecChamadaEs.length) {
                this.config.elIndexSecChamadaNot3.css('display', 'block');
            }
        }
        //--------------- fim para tablet ---------------//
    },
    bindFancybox: function () {
        //chamadas de fancybox
        this.config.elFancybox.fancybox();
    },
    bindMobile: function () {
        //--------------- para mobile ---------------//
        this.config.elCampoMob.on('click', function () {
            if ($(this).attr('class') != 'ativo') {
                $(this).find('aside div.form').css('display', 'block');
                $(this).find('nav.principal').css('display', 'block');
                $(this).addClass('ativo');
            } else {
                $(this).find('aside div.form').css('display', 'none');
                $(this).find('nav.principal').css('display', 'none');
                $(this).removeClass('ativo');
            }
        });

        // Menu para mobile
        if (this.estilo_mobile == 'block') {
            this.config.elHeader.find('nav.principal menu > li nav').css('display', 'none');
            this.config.elHeader.find('nav.principal menu > li').on('click', '> a', function () {
                $(this).parent().parent().find('nav').slideUp("slow");
                if ($(this).parent().find('nav').size()) {
                    if ($(this).parent().find('nav').css('display') == 'none')
                        $(this).parent().find('nav').slideDown("slow");
                    return false;
                }
            });
        }
        //--------------- fim para mobile ---------------//
    },
    bindInputBuscar: function () {
        var self = INSTITUTOLULA;
        this.config.inputBuscar.each(function () {
            var termo = 'Buscar';
            self.aplicarPalceholder(termo, $(this));
        });
    },
    bindScroll: function () {
        var self = INSTITUTOLULA;

        // Aplicação de elementos fixos.
        //testa se não é mobile antes
        if (this.estilo_mobile == 'none') {
            this.scrool_geral();
            $(window).on("scroll", function () {
                self.scrool_geral();
            });
        }

        //Pagina Lula bt voltar ao topo
        this.config.spanTopo.click(function () {
            $("html, body").animate({scrollTop: 150}, 1000);
            return false;
        });
    },
    scrool_geral: function () {
        $w = $(window);
        $tamanho_pagina = this.config.elInternaSection.height() - 60;
        $scroll_top = $w.scrollTop();

        $scroll_bottom = $tamanho_pagina - $w.height() - $scroll_top;

        //
        //

        $altura_topo = 135;
        $altura_base = 350;

        // Topo fixo
        $topo = $('div.topo');
        if ($scroll_top > $altura_topo) {
            $topo.addClass('retratil');
            $('body').css('padding-top', '215px');
        } else {
            $topo.removeClass('retratil');
            $('body').css('padding-top', '0');
        }

        // Menu social fixo
        $redes_sociais = $('#lateral_fixa');

        $redes_sociais_top = 285;
        if ($scroll_top > $altura_base) {
            if ($scroll_top < $tamanho_pagina) {
                $redes_sociais.css('position', 'fixed').css('top', 60);
            } else {
                $redes_sociais.css('position', 'absolute').css('top', $tamanho_pagina - 40);
            }
        } else {
            $aux = $scroll_top + 150;
            $redes_sociais.css('position', 'absolute').css('top', $aux);
        }

        $aux2 = null;
        // aplicando efeito lateral bottom
        $aux2 = null;
        $lateral_bottom = $('.lateral.bottom');
        if ($lateral_bottom.length) {
            if ($('div.topo > header').width() > 940) { //--------------- se não é tablet ---------------//
                if ($scroll_bottom > 635) {
                    $aux2 = 0;
                } else {
                    if ($aux2 == 0) {
                        $aux2 = '1';
                        $lateral_bottom.animate({
                            'right': 0
                        }, 2000);
                    }
                }
            }
        }

        // Controlando o posicionamento do menu lateral
        $lateral_fixa = $('div.lateral .segura_lateral_fixa');
        $conteudo = $('.meio_sidebar');
        $tamanho_pagina = $conteudo.height();
        $pos_right = ($(window).width() - $conteudo.width()) / 2;

        if ($scroll_top > $altura_base - 120) {
            if ($scroll_top < $tamanho_pagina - 120) {
                $lateral_fixa.css('position', 'fixed').css('top', 60).css('right', $pos_right);
            } else {
                $lateral_fixa.css('position', 'relative').css('top', $tamanho_pagina - 400).css('right', 0);
            }
        } else {
            $lateral_fixa.css('position', 'relative').css('top', 0).css('right', 0);
        }

        // Menu social fixo
        $span_topo = this.config.spanTopo;
        $conteudo = $('.meio section');
        $tamanho_pagina = $conteudo.height();
        $pos_right = ($(window).width() - $conteudo.width()) / 2;

        if ($scroll_top > $altura_base - 120) {
            if ($scroll_top < $tamanho_pagina - 300) {
                $span_topo.css('position', 'fixed').css('top', 350).css('right', $pos_right).fadeIn('slow');
            } else {
                $span_topo.css('position', 'absolute').css('top', $tamanho_pagina - 150).css('right', 0).fadeIn('slow');
            }
        } else {
            //$span_topo.css('position', 'absolute').css('top', 350).css('right', 0);
            $span_topo.css('display', 'none');
        }

        /*if($scroll_top > $span_topo_altura){
         $span_topo.css('top', $scroll_top + 100).css('bottom', 'auto');
         }else{
         $span_topo.css('top', $span_topo_altura).css('bottom', 'auto');
         }

         if ($scroll_bottom < 100){
         $span_topo.css('top', 'auto').css('bottom', 20);
         }*/
    },
    aplicarPalceholder: function (ph, $elemento) {
        $elemento.focus(function () {
            if ($elemento.val() == ph) $elemento.val('')
        }).blur(function () {
            if (!$elemento.val()) $elemento.val(ph)
        })
    },

    //visual customizado dos checkboxes e selects
    personalizarSelects: function () {
        $('.bloco_form form select').each(function () {
            //
            $valor_selecionado = $(this).find('option:selected').val();
            $texto_selecionado = $(this).find('option:selected').text();
            $nome_atributo = $(this).attr('name');
            $novo_elemento = '<div class="select_personalizado"> \n';
            $novo_elemento += '<input type="hidden" value="' + $valor_selecionado + '" name="' + $nome_atributo + '" />';
            $novo_elemento += '<span class="selecionado" data-valor="' + $valor_selecionado + '">' + $texto_selecionado + '</span>';
            $novo_elemento += '<ul>\n';

            $(this).find('option').each(function () {
                //
                $novo_elemento += '<li data-valor="' + $(this).val() + '">' + $(this).text() + '</li>\n';
            });
            $novo_elemento += '</ul>\n';
            $novo_elemento += '</div>\n';
            $(this).replaceWith($novo_elemento);
            $('.bloco_form form .select_personalizado ul').css('display', 'none');
        });
    },
    personalizarCheckbox: function () {
        $('.bloco_form .checkbox_personalizar').each(function () {
            $(this).removeClass('checkbox_personalizar').addClass('checkbox_personalizado').find('input').css('opacity', '0');
            if ($(this).find('input').attr("checked"))
                $(this).addClass('ativo');
        });
    },

    setStatusFiltroNoticias: function (area, bool) {
        this.filtroNoticias[area].ativa = bool;
    },
    setStatusFiltroPerguntas: function (area, bool) {
        this.filtroPerguntas[area].ativa = bool;
    },
    setStatusFiltroAmerica: function (area, bool) {
        this.filtroAmerica[area].ativa = bool;
    },
    setStatusFiltroPremios: function (area, bool) {
        this.filtroPremios[area].ativa = bool;
    },

    bindFiltroInstituto: function () {
        var container = 'div#form_01 form';
        $(':checkbox', container).click(function () {
            if ($(this).val() == "Todos" && $(this).is(':checked')) {
                $(':checkbox', container).not($(this)).removeAttr('checked');
                $(this).parent().siblings().removeClass('ativo');

                $('.bloco_3_itens').show();
                $('.todas.checkbox_personalizado').addClass('ativo');
            }
            else {
                $(':checkbox[value="Todos"]', container).removeAttr('checked');
                $('.bloco_3_itens').hide();

                if ($(this).parent().hasClass('ativo'))
                    $(this).parent().removeClass('ativo');
                else
                    $(this).parent().addClass('ativo');

                var itens = [];
                $(':checkbox:checked', container)
                    .each(function () {
                        itens.push($(this).val())
                    });

                $.each(itens, function (index, valor) {
                    $('.bloco_3_itens[value=' + valor + ']').show();
                });

                $('.todas.checkbox_personalizado').removeClass('ativo');
            }
        });
    },
    /**
     * Metodo bindFiltroInstituto
     * Funcionamento: de tudo que carrega por completo, ela gerencia a exibição por vetor
     *                logo, por padrao a query deve montar a pagina trazendo todos os registros
     */
    bindFiltroNoticias: function () {

        var noticias = {target: 'div#posts', url: 'site/carregarmaisnoticias'};

        noticias.fnLoadContent = function fnLoadContent(params, update, callback) {

            if (params == 'undefined') params = [];
            if (update == 'undefined') update = false;

            // carrega o conteudo
            $(noticias.target).load(noticias.url, {params: params, atualizar: update});

            // aplicando metodo para funcionamento
            if (typeof callback == 'function') {
                callback();
            }
        };

        noticias.init = (function init() {
            noticias.fnLoadContent();
        }());

        $('a#loadmoreposts').on('click', this, function (e) {
            e.preventDefault();

            $('#loading')
                .show(function () {
                    noticias.fnLoadContent($('input:checked', 'div.checkbox_personalizado').serializeArray(), 1, function () {
                        $('#loading').hide();
                    });
                });

            return false;
        });


        var container = 'div#form_01 form';
        $(':checkbox', container).click(function () {

            if ($(this).val() == "Todos" && $(this).parent().hasClass('ativo')) {
                return false;
            }

            if ($(this).parent().hasClass('ativo') && $(':checkbox:checked', container).not($(this)).size() == 0) {

                $(this).parent().removeClass('ativo');
                $('input', $(this)).removeAttr('checked');

                $('.todas.checkbox_personalizado :first')
                    .parent()
                    .addClass('ativo')
                    .find("input")
                    .attr('checked', 'checked');

                // @ TODO finalizar aqui: falta o click em todos quando não houver mais opções

            }
            else {
                if ($(this).val() == "Todos" && $(this).is(':checked')) {
                    $(':checkbox', container).not($(this)).removeAttr('checked');
                    $(this).parent().siblings().removeClass('ativo');
                    $('.todas.checkbox_personalizado').addClass('ativo');
                }
                else {
                    $(':checkbox[value="Todos"]', container).removeAttr('checked');
                    if ($(this).parent().hasClass('ativo'))
                        $(this).parent().removeClass('ativo');
                    else
                        $(this).parent().addClass('ativo');
                    $('.todas.checkbox_personalizado').removeClass('ativo');
                }
            }
            noticias.fnLoadContent($('input:checked', 'div.checkbox_personalizado').serializeArray());
        });
    },
    bindFiltroAmericaLatina: function () {

        var noticias = {target: 'div#posts', url: 'americaLatina/carregarmaisnoticias'};

        noticias.fnLoadContent = function fnLoadContent(params, update, callback) {

            if (params == 'undefined') params = [];
            if (update == 'undefined') update = false;

            // carrega o conteudo
            $(noticias.target).load(noticias.url, {params: params, atualizar: update});

            // aplicando metodo para funcionamento
            if (typeof callback == 'function') {
                callback();
            }
        };

        noticias.init = (function init() {
            noticias.fnLoadContent();
        }());

        $('a#loadmoreposts').on('click', this, function (e) {
            e.preventDefault();

            $('#loading')
                .show(function () {
                    noticias.fnLoadContent($('input:checked', 'div.checkbox_personalizado').serializeArray(), 1, function () {
                        $('#loading').hide();
                    });
                });

            return false;
        });


        var container = 'div#form_01 form';
        $(':checkbox', container).click(function () {

            if ($(this).val() == "Todos" && $(this).parent().hasClass('ativo')) {
                return false;
            }

            if ($(this).parent().hasClass('ativo') && $(':checkbox:checked', container).not($(this)).size() == 0) {

                $(this).parent().removeClass('ativo');
                $('input', $(this)).removeAttr('checked');

                $('.todas.checkbox_personalizado :first')
                    .parent()
                    .addClass('ativo')
                    .find("input")
                    .attr('checked', 'checked');

                // @ TODO finalizar aqui: falta o click em todos quando não houver mais opções

            }
            else {
                if ($(this).val() == "Todos" && $(this).is(':checked')) {
                    $(':checkbox', container).not($(this)).removeAttr('checked');
                    $(this).parent().siblings().removeClass('ativo');
                    $('.todas.checkbox_personalizado').addClass('ativo');
                }
                else {
                    $(':checkbox[value="Todos"]', container).removeAttr('checked');
                    if ($(this).parent().hasClass('ativo'))
                        $(this).parent().removeClass('ativo');
                    else
                        $(this).parent().addClass('ativo');
                    $('.todas.checkbox_personalizado').removeClass('ativo');
                }
            }
            noticias.fnLoadContent($('input:checked', 'div.checkbox_personalizado').serializeArray());
        });
    },
    bindFiltroAfrica: function () {

        var africa = {target: 'div#posts', url: 'africa/carregarmaisnoticias'};

        africa.fnLoadContent = function fnLoadContent(params, update, callback) {

            if (params == 'undefined') params = [];
            if (update == 'undefined') update = false;

            $(africa.target).load(africa.url, {params: params, atualizar: update});

            // aplicando metodo para funcionamento
            if (typeof callback == 'function') {
                callback();
            }
        };

        africa.init = (function init() {
            africa.fnLoadContent();
        }());

        // clique no botao mais noticias deve pegar os parametros escolhidos e recarregar
        $('a#loadmoreposts').on('click', this, function (e) {
            e.preventDefault();

            $('#loading')
                .show(function () {
                    africa.fnLoadContent($('input:checked', 'div.checkbox_personalizado').serializeArray(), 1, function () {
                        $('#loading').hide();
                    });
                });

            return false;
        });

        var container = 'div#form_01 form';
        $(':checkbox', container).click(function () {

            if ($(this).val() == "Todos" && $(this).parent().hasClass('ativo')) {
                return false;
            }

            if ($(this).parent().hasClass('ativo') && $(':checkbox:checked', container).not($(this)).size() == 0) {

                $(this).parent().removeClass('ativo');
                $('input', $(this)).removeAttr('checked');

                $('.todas.checkbox_personalizado :first')
                    .parent()
                    .addClass('ativo')
                    .find("input")
                    .attr('checked', 'checked');

                // @ TODO finalizar aqui: falta o click em todos quando não houver mais opções

            }
            else {

                if ($(this).val() == "Todos" && $(this).is(':checked')) {
                    $(':checkbox', container).not($(this)).removeAttr('checked');
                    $(this).parent().siblings().removeClass('ativo');
                    $('.todas.checkbox_personalizado').addClass('ativo');
                }
                else {
                    $(':checkbox[value="Todos"]', container).removeAttr('checked');
                    if ($(this).parent().hasClass('ativo'))
                        $(this).parent().removeClass('ativo');
                    else
                        $(this).parent().addClass('ativo');
                    $('.todas.checkbox_personalizado').removeClass('ativo');
                }
            }
            africa.fnLoadContent($('input:checked', 'div.checkbox_personalizado').serializeArray());
        });
    },
    bindFiltroPremios: function () {

        var self = INSTITUTOLULA,
            premios = {target: 'div#posts', url: 'premios/carregar'};

        premios.fnLoadContent = function fnLoadContent(coverage, year, update, callback) {

            if (coverage == "undefined") coverage = 'todos';
            if (year == "undefined") year = 'todas';
            if (update == "undefined") update = false;

            $(premios.target).load(premios.url, {coverage: coverage, year: year, atualizar: update}, function () {
                if (!self.filtroPremios.mostrar_img) {
                    $('article.bloco_3_itens .data_cidade').hide();
                    $('article.bloco_3_itens .data_cidade2').show();
                    $('article.bloco_3_itens').removeClass('bloco_3_itens').addClass('bloco-linhas');
                }
            });

            if (typeof callback == 'function') {
                callback();
            }
        };

        premios.init = (function init() {
            premios.fnLoadContent();
        }());

        $('a#loadmoreposts').on('click', this, function (e) {
            e.preventDefault();

            $('#loading')
                .show(function () {
                    premios.fnLoadContent($('input:checked', 'div.radio_personalizado').val(), $('input', '.select_personalizado').val(), 1, function () {
                        $('#loading').hide();
                    });
                });

            return false;
        });

        $('div.radio_personalizado:first', 'form#premio')
            .addClass('ativo')
            .find('input')
            .attr('checked', 'checked');

        $('div.radio_personalizado', 'form#premio').click(function (e) {

            if ($(this).hasClass('ativo') && $('input', $(this)).is(':checked')) {
                return false;
            }

            if (!$(this).hasClass('ativo')) {

                $(this)
                    .addClass('ativo')
                    .find('input')
                    .attr('checked', 'checked');

                $('div.radio_personalizado', 'form#premio')
                    .not($(this))
                    .each(function () {
                        $(this).removeClass("ativo").find('input').removeAttr('checked');
                    });
            }

            premios.fnLoadContent($('input:checked', $(this)).val(), $('input', '.select_personalizado').val());
        });

        $('.bloco_form .select_personalizado .selecionado').click(function (e) {
            e.preventDefault();
            if ($(this).parent().find('ul').css('display') == 'none') {
                $(this).parent().find('ul').css('display', 'block');
            }
            else {
                $(this).parent().find('ul').css('display', 'none');
            }
            return false;
        });

        $('.bloco_form .select_personalizado ul').on('mouseleave', function (e) {
            $('.bloco_form .select_personalizado').find('ul').css('display', 'none');
        });

        $('.bloco_form form .select_personalizado ul li').click(function () {

            var valor = $(this).data("valor");
            $(this).parent().parent().find('input').val(valor);
            $(this).parent().parent().find('.selecionado').attr('data-valor', valor);
            $(this).parent().parent().find('.selecionado').text($(this).text());
            $(this).parent().parent().find('ul').css('display', 'none');

            self.filtroPremios.ano_ativo = valor;

            premios.fnLoadContent($('input', 'div.radio_personalizado.ativo').val(), valor);
        });

        $('#premio').on('click', '.botao_imagens.ocultar_imagens', function (e) {
            $(this).text('Mostrar imagens');
            $(this).attr('title', 'Mostrar imagens');
            $(this).removeClass('ocultar_imagens').addClass('exibir_imagens');

            $('article.bloco_3_itens .data_cidade').hide();
            $('article.bloco_3_itens .data_cidade2').show();

            $('article.bloco_3_itens').removeClass('bloco_3_itens').addClass('bloco-linhas');
            self.filtroPremios.mostrar_img = false;
            return false;
        });

        $('#premio').on('click', '.botao_imagens.exibir_imagens', function (e) {
            $(this).text('Não mostrar imagens');
            $(this).attr('title', 'Não mostrar imagens');
            $(this).removeClass('exibir_imagens').addClass('ocultar_imagens');

            $('article.bloco-linhas .data_cidade').show();
            $('article.bloco-linhas .data_cidade2').hide();

            $('article.bloco-linhas').removeClass('bloco-linhas').addClass('bloco_3_itens');
            self.filtroPremios.mostrar_img = true;

            return false;
        });
    },
    bindFiltroPerguntas: function () {
        var container = 'div#form_01 form';
        $(':checkbox', container).click(function () {
            if ($(this).val() == "Todos" && $(this).is(':checked')) {
                $(':checkbox', container).not($(this)).removeAttr('checked');
                $(this).parent().siblings().removeClass('ativo');

                $('.bloco-linhas').show();
                $('.todas.checkbox_personalizado').addClass('ativo');
            }
            else {
                $(':checkbox[value="Todos"]', container).removeAttr('checked');
                $('.bloco-linhas').hide();

                if ($(this).parent().hasClass('ativo'))
                    $(this).parent().removeClass('ativo');
                else
                    $(this).parent().addClass('ativo');

                var itens = [];
                $(':checkbox:checked', container)
                    .each(function () {
                        itens.push($(this).val())
                    });

                $.each(itens, function (index, valor) {
                    $('.bloco-linhas[value=' + valor + ']').show();
                });

                $('.todas.checkbox_personalizado').removeClass('ativo');
            }
        });
    },
    bindContatoForm: function () {
        $('.select_personalizado').click(function (e) {
            if ($(this).parent().find('ul').css('display') == 'none')
                $(this).parent().find('ul').css('display', 'block');
            else
                $(this).parent().find('ul').css('display', 'none');
            e.preventDefault();
            return false;
        });

    },
    bindForms: function () {
        //click no select/**/
        $('.bloco_form .select_personalizado').click(function (e) {
            if ($(this).parent().find('ul').css('display') == 'none')
                $(this).parent().find('ul').css('display', 'block');
            else
                $(this).parent().find('ul').css('display', 'none');
            e.preventDefault();
            return false;
        });

        // recolhe o select se clicar fora/**/
        $('body').click(function () {
            if (!( $(this).hasClass('selecionado') )) {
                $('.bloco_form .select_personalizado').find('ul').css('display', 'none');
            }
        });

        // seleção de elemento/**/
        $('.bloco_form form .select_personalizado ul li').click(function () {
            $(this).parent().parent().find('input').val($(this).data("valor"));
            $(this).parent().parent().find('.selecionado').attr('data-valor', $(this).data("valor"));
            $(this).parent().parent().find('.selecionado').text($(this).text());
            //$(this).parent().parent().find('ul').css('display', 'none');
            $('.select_personalizado').find('ul').on('mouseleave', function () {
                $(this).hide();
            });
        });

        $('.bloco_form .radio_personalizado, .bloco_form .radio_personalizado_tablet').click(function () {
            $('.bloco_form .radio_personalizado, .bloco_form .radio_personalizado_tablet').removeClass('ativo');
            $('.bloco_form .radio_personalizado, .bloco_form .radio_personalizado_tablet').find('input').removeAttr("checked");
            $(this).addClass('ativo');
            $(this).find('input').attr("checked", "checked");
        });

        var self = INSTITUTOLULA;

        $('.bloco_form .checkbox_personalizado').click(function () {
            var elInput = $(this).find('input'),
                elInputVal = elInput.val();

            if ($(this).hasClass('ativo') && (!$(this).hasClass('todas') )) {
                $(this).removeClass('ativo');
                elInput.removeAttr("checked");
            } else {
                $(this).addClass('ativo');
                elInput.attr("checked", "checked");

                $(".bloco_3_itens").each(function () {
                    if ($(this).data("equipe") == elInputVal) {
                        self.equipeInstituto[elInputVal].ativa = true;
                    }
                });
            }

            if ($(this).hasClass('todas')) {
                $(this).parent().find('.checkbox_personalizado').each(function () {
                    //if( ! $(this).hasClass('todas')){
                    $(this).find('input').removeAttr("checked");
                    $(this).removeClass("ativo");
                    //}
                });
            } else {
                $(this).parent().find('.todas').removeClass("ativo");
                $(this).parent().find('.todas').find('input').removeAttr("checked");
                //check Todas
                var check = true,
                    padrao = false;

                $(this).parent().find('.checkbox_personalizado').each(function () {
                    if ((!$(this).hasClass('todas') ) && (!$(this).hasClass('ativo') )) {
                        check = false;
                    }
                    if ($(this).hasClass('ativo'))
                        padrao = true;
                });
            }

            if (check || !padrao) {
                $(this).parent().find('.todas').click();
            }

            self.exibeEquipeInstituto();
        });

        // aceitando os termos e condições
        /*
         $('button').click(function(e){
         if($(this).parent().find('input[name="termos"]').length)
         termo = $(this).parent().find('input[name="termos"]').attr("checked");
         if(!termo){
         if($('div.termos_privacidade small.obrigatorio').length == 1){
         $('div.termos_privacidade small.obrigatorio').fadeOut();
         $('div.termos_privacidade small.obrigatorio').fadeIn();
         }else{
         $(this).parent().find('input[name="termos"]').after( "<small class='obrigatorio'>* É preciso aceitar os termos de privacidade.</small>" );
         }
         e.preventDefault();
         return false;
         }else{
         $('div.envio_sucesso').fadeIn(1000,function(){
         $('div.envio_sucesso').delay(6000).fadeOut(1000,function(){
         $('a#fechar').click();
         });
         });
         e.preventDefault();
         return false;
         }
         });
         */
    },
    bindRelatorios: function () {

        var rows = {
            loadContents: function () {
                $('div#posts').load('relatorios/carregar', {atualizar: 1});
            },
            init: function () {
                $('div#posts').load('relatorios/carregar');
                $('a#loadmoreposts').on('click', function (e) {
                    rows.loadContents();
                    e.preventDefault();
                });
            }
        };
        (rows).init();

    },
    bindAfricaDialogosAfricanos: function (path) {

        var lang = this.localpath.substr(0, 2);
        if (lang != "en" || lang != "es") {
            lang = "pt_br";
        }

        var rows = {
            loadContents: function () {
                $('div#posts').load('/africa/dialogosAfricanosCarregar', {atualizar: 1, language: lang});
            },
            init: function () {
                $('div#posts').load('/africa/dialogosAfricanosCarregar');
                $('a#loadmoreposts').on('click', function (e) {
                    rows.loadContents();
                    e.preventDefault();
                });
            }
        };
        (rows).init();
    },
    personalizarRadio: function () {
        $('.bloco_form .radio_personalizar').each(function () {
            $(this).removeClass('radio_personalizar').addClass('radio_personalizado').find('input').css('opacity', '0');
            if ($(this).find('input').attr("checked"))
                $(this).addClass('ativo');
        });
    },
    personalizarRadioTablet: function () {
        $('.bloco_form .radio_personalizar_tablet').each(function () {
            $(this).removeClass('radio_personalizar').addClass('radio_personalizado_tablet').find('input').css('opacity', '0');
            if ($(this).find('input').attr("checked"))
                $(this).addClass('ativo');
            $(this).removeClass('radio_personalizar_tablet');
        });
    },
    prepararCampos: function ($seletor, $val) {
        if ($seletor.length) {
            if ($seletor.val() == '') {
                $seletor.val($val);
            }
        }
        this.aplicarPalceholder($val, $seletor);
    },
    oInstituto: function () {

        /* Para Tablet */
        if (($('div.topo > header').width() <= 940) || (self.estilo_mobile == 'block')) {
            /* JS Página Contato */
            $seletor = $('input#nome');
            $val = 'Nome';
            this.prepararCampos($seletor, $val);

            $seletor2 = $('input#email');
            $val2 = 'Email';
            this.prepararCampos($seletor2, $val2);

            $seletor3 = $('textarea#mensagem');
            $val3 = 'Digite aqui sua mensagem';
            this.prepararCampos($seletor3, $val3);

            $seletor4 = $('input#tema');
            $val4 = 'Tema';
            this.prepararCampos($seletor4, $val4);

            $seletor5 = $('input#nascimento');
            $val5 = 'Data de Nascimento';
            this.prepararCampos($seletor5, $val5);

            //mantendo bordas laterais na página Notícia
            $('.lateral.bottom .menu2.noticias').removeClass('noticias');
        }

        /* Para Celular */
        if ($('#campo_mobile').css('display') == 'block') {
            /* Página Contato */
            if ($(".o-instituto-contato").length) {
                $lateral = $(".o-instituto-contato .bloco_lateral").html();
                $title = $(".o-instituto-contato .bloco_form h1").text();
                $('.o-instituto-contato .bloco_lateral').remove();
                $(".o-instituto-contato .bloco_form h1").replaceWith('<h1>' + $title + '</h1><div class="bloco_lateral">' + $lateral + '</div>');
            }
            // Página
            if ($(".o-instituto-sobre").length) {
                $(".bloco_3_itens .fancybox").each(function () {
                    $(this).removeClass('fancybox').removeClass('fancybox.iframe');
                    value = $(this).attr('href');
                    value = value.replace("o-instituto-perfil", "o-instituto-perfil-mobile");
                    $(this).attr('href', value);
                });
            }
        }

        /* JS Página Notas */
        $('.imprensa li > div').css('display', 'none');
        $('.imprensa li:first-child > div').css('display', 'block');
        $('.imprensa').on('click', 'li.mais > a', function () {
            $(this).parent().find('div').slideDown("slow");
            $(this).parent().removeClass('mais').addClass('menos');
            return false;
        });

        $('.imprensa').on('click', 'li.menos > a', function () {
            $(this).parent().find('div').slideUp("slow");
            $(this).parent().removeClass('menos').addClass('mais');
            return false;
        });

        //Modais página contribua
        $('.modal > h3, .modal > p').click(function () {
            if (self.estilo_mobile == 'block') {
                $('.modal .box_modal').removeClass('ativo');
                $(this).parent().find('.box_modal').addClass('ativo');
                $("html, body").animate({
                    scrollTop: $(this).parent().offset().top - 160
                }, 1000);
            }
        });
        $('.modal').click(function () {
            if (self.estilo_mobile != 'block')
                $(this).find('.box_modal').addClass('ativo');
        });
        $('.modal #fechar, .modal #fechar_geral').click(function () {
            $('.box_modal').removeClass('ativo');
            return false;
        });
        $("input.data").mask("99/99/9999");

        // formulario de envio do modal news
        $('#newsletter-form').submit(function (e) {
            e.preventDefault();
            $.post($('#newsletter-form').attr('action'), $(this).serialize(), function (data) {
                console.log(data);
            });
        });
    },
    bindContribua: function () {
        console.log("-bindContribua");

        var self = this,
            modal1 = "#box_modal1",
            modal4 = "#box_modal4";

        /*
         * Exibir .box_modal referente ao .modal clicado.
         * */
        $("div.modal", "article.contribua").click(function (event) {
            console.log("-- MODAL ---");
            var $id = "#" + $(this).data("id");
            switch ($id) {
                case "#box_modal1":
                    self.cleanFormsContribua(1);
                    if (self.estilo_mobile != 'block') {
                        $($id).removeClass('ativo').addClass('ativo');
                    }
                    break;
                case "#box_modal2":
                    //Actions here.
                    break;
                case "#box_modal3":
                    event.preventDefault();
                    if ($($id).find("a").attr('href') != "") {
                        var url = $(this).find("a").attr('href');
                        window.open(url, '_blank');
                    }
                    break;
                case "#box_modal4":
                    self.cleanFormsContribua(4);
                    if (self.estilo_mobile != 'block') {
                        $($id).removeClass('ativo').addClass('ativo');
                    }
                    break;
            }
        });
        /*
         * Fechar .box_modal ativo.
         * */
        $(".modal #fechar, .modal #fechar_geral").click(function () {
            $('.box_modal').removeClass('ativo');
            return false;
        });

        /*
         * Formulário - Assinando nossa Newsletter
         * */
        /*
         * Com que frequência você quer receber nossa newsletter?
         * */
        $("input:radio[name='Newsletter[frequency]']").click(function () {
            $(".radio_personalizado").removeClass('ativo');
            $(this).parent().addClass('ativo');
        });
        /*
         * Quais conteúdos você quer ser informado?
         * */
        $("input:checkbox[name='content']").click(function () {
            /*
             * Verify if is checked.
             * */
            var check = $(this).is(':checked');

            if (check) {
                /*
                 * If is checked, apply 'checked style' on parent element.
                 * */
                $(this).parent().addClass('ativo');
            }
            else {
                /*
                 * If not checked, remove 'checked style' on parent element.
                 * */
                $(this).parent().removeClass('ativo');
            }
        });
        /*
         * Submit Buttom - Newsletter submit.
         * */
        $("#newsletter-submit-button").click(function (event) {
            event.preventDefault();
            if (self.validaFormNewsletter()) {
                var data_string = $("#newsletter").serialize();
                $.ajax({
                    type: "POST",
                    url: '/contribua/newsletter',
                    data: data_string,
                    timeout: 6000,
                    success: function (success) {
                        if ((success == "newsletter-saved")) {
                            $(".envio_mensagem p").html("Mensagem foi enviada com sucesso!");
                            self.mostra_msg_envio(modal1);
                            self.cleanFormsContribua(1);
                            setTimeout(function () {
                                window.location.reload();
                            }, 5000);
                        }
                        else {
                            $(".envio_mensagem p").html("Ocorreu algum erro, tente novamente!");
                            self.mostra_msg_envio(modal1);
                        }
                    },
                    error: function (request, error) {
                        console.log("-error-----------");
                        console.log(request);
                        console.log(error);
                        console.log("-----------------");
                    }
                });
            }
            else {
                self.mostra_msg_envio(modal1);
            }
        });

        /*
         * Formulário - Oferecenco seus conhecimentos e habilidades
         * */
        /*
         * Data de Nascimento
         * */
        $("input.data").mask("99/99/9999");
        /*
         * Habilidades
         * */
        $("input:checkbox[name='skill']").click(function () {
            /*
             * Verify if is checked.
             * */
            var check = $(this).is(':checked');

            if (check) {
                /*
                 * If is checked, apply 'checked style' on parent element.
                 * */
                $(this).parent().addClass('ativo');
            }
            else {
                /*
                 * If not checked, remove 'checked style' on parent element.
                 * */
                $(this).parent().removeClass('ativo');
            }
        });
        /*
         * Habilidades Outros
         * */
        $("input:checkbox[name='outros']").click(function () {
            /*
             * Verify if is checked.
             * */
            var check = $(this).is(':checked');

            if (check) {
                /*
                 * If is checked, apply 'checked style' on parent element.
                 * */
                $(this).parent().addClass('ativo');
            }
            else {
                /*
                 * If not checked, remove 'checked style' on parent element.
                 * */
                $(this).parent().removeClass('ativo');
            }
        });
        /*
         * Termos d Privacidade
         * */
        $("input:checkbox[name='SkillForm[termos]']").click(function () {
            /*
             * Verify if is checked.
             * */
            var check = $(this).is(':checked');

            if (check) {
                /*
                 * If is checked, apply 'checked style' on parent element.
                 * */
                $(this).parent().addClass('ativo');
            }
            else {
                /*
                 * If not checked, remove 'checked style' on parent element.
                 * */
                $(this).parent().removeClass('ativo');
            }
        });
        /*
         * Submit Buttom - Habilidades submit.
         * */
        $("#habilidades-submit-button").click(function (event) {
            event.preventDefault();

            console.log(">habilidades_submit");

            if (self.validaFormHabilidades()) {
                var data_string = $("#habilidades").serialize();
                console.log(">habilidades-submited");
                console.log(">>serialize:" + data_string);

                $.ajax({
                    type: "POST",
                    url: '/contribua/habilidades',
                    data: data_string,
                    timeout: 6000,
                    success: function (success) {
                        console.log(">>> on success:");
                        console.log(success);

                        if ((success == "skillform-saved")) {
                            console.log(">>>> habilidades-saved");
                            $(".envio_mensagem p").html("Mensagem foi enviada com sucesso!");
                            self.mostra_msg_envio(modal4);
                            self.cleanFormsContribua(4);
                            setTimeout(function () {
                                window.location.reload();
                            }, 5000);
                        }
                        else {
                            console.log(">>>> habilidades-not-saved");
                            $(".envio_mensagem p").html("Ocorreu algum erro, tente novamente!");
                            self.mostra_msg_envio(modal4);
                        }
                    },
                    error: function (request, error) {
                        console.log("-error-----------");
                        console.log(request);
                        console.log(error);
                        console.log("-----------------");
                    }
                });
            }
            else {
                self.mostra_msg_envio(modal4);
            }
        });
    },
    cleanFormsContribua: function (id) {
        /*
         * Clean forms linked to the id.
         * 1 - Assinando nossa Newsletter
         * 2 - Seguindo-nos nas redes sociais (Disabled)
         * 3 - Compartilhando suas histórias (open window target _blank)
         * 4 - Oferecendo seus conhecimentos e habilidades
         * */
        if (id == 0 || id == undefined) {
            id = 1;
        }

        switch (id) {
            case 1:
                var formNewsletter = window.document.forms.newsletter;
                formNewsletter.name.value = "";
                formNewsletter.email.value = "";
                formNewsletter['Newsletter[content]'].value = "";
                formNewsletter.Newsletter_verifyCode.value = "";
                $("input:checkbox[name='content']").each(function () {
                    $(this).prop('checked', false);
                    $(this).parent().removeClass('ativo');
                });
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                var formHabilidades = window.document.forms.habilidades;
                formHabilidades.name.value = "";
                formHabilidades.birth.value = "";
                formHabilidades.email.value = "";
                formHabilidades.country.value = "";
                formHabilidades.city.value = "";
                formHabilidades.outros_txt.value = "";
                formHabilidades['SkillForm[skill]'].value = "";
                formHabilidades.SkillForm_verifyCode.value = "";

                $("input:checkbox[name='skill']").each(function () {
                    $(this).parent().removeClass('ativo');
                });

                $("input:checkbox[name='termos']").each(function () {
                    $(this).parent().removeClass('ativo');
                });
                break;
        }
    },
    /*
     * Validacao Formulário - Assinando nossa Newsletter
     * */
    validaFormNewsletter: function () {
        console.log("--validaFormNewsletter");

        var formNewsletter = window.document.forms.newsletter,
            mensagem = "";

        /*
         * Validate Name
         * */
        /* Name required  */
        if (formNewsletter['Newsletter[name]'].value == "")
            mensagem += this.config.messages[YiiLang].nome.required + "<br>";

        /*
         * Validate E-mail
         * */
        /* E-mail required  */
        if (formNewsletter['Newsletter[email]'].value == "") {
            mensagem += this.config.messages[YiiLang].email.required + "<br>";
        }
        else {
            /* Valid E-mail */
            var regx_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regx_email.test(formNewsletter['Newsletter[email]'].value))
                mensagem += this.config.messages[YiiLang].email.valid + "<br>";
        }

        /*
         * Oque você faz?
         * */
        var size = formNewsletter.content.length,
            ver = "";

        for (var i = 0; i < size; i++) {
            if (formNewsletter.content[i].checked == true) {
                ver += formNewsletter.content[i].value + ",";
            }
        }

        if (ver != "") {
            formNewsletter['Newsletter[content]'].value = ver;
        }
        else {
            mensagem += this.config.messages[YiiLang].quais.required + "<br>";
        }

        if (formNewsletter.Newsletter_verifyCode.value == "")
            mensagem += this.config.messages[YiiLang].veryfycode.required + "<br>";

        if (mensagem != "") {
            $("#box_modal1 .envio_mensagem p").html(mensagem);
            return false;
        }
        else {
            return true;
        }
    },
    /*
     * Validacao Formulário - Oferecenco seus conhecimentos e habilidades
     * */
    validaFormHabilidades: function () {
        console.log("--validaFormHabilidades");

        var formHabilidades = window.document.forms.habilidades,
            mensagem = "";

        /*
         * Validate Name
         * */
        /* Name required  */
        if (formHabilidades['SkillForm[name]'].value == "")
            mensagem += this.config.messages[YiiLang].nome.required + "<br>";

        /*
         * Validate Birth
         * */
        /* Birth required  */
        if (formHabilidades['SkillForm[birth]'].value == "")
            mensagem += this.config.messages[YiiLang].nascimento.required + "<br>";

        /*
         * Validate E-mail
         * */
        /* E-mail required  */
        if (formHabilidades['SkillForm[email]'].value == "") {
            mensagem += this.config.messages[YiiLang].email.required + "<br>";
        }
        else {
            /* Valid E-mail */
            var regx_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regx_email.test(formHabilidades['SkillForm[email]'].value))
                mensagem += this.config.messages[YiiLang].email.valid + "<br>";
        }

        /*
         * Validate Country
         * */
        /* Country required  */
        if (formHabilidades['SkillForm[country]'].value == "")
            mensagem += this.config.messages[YiiLang].pais.required + "<br>";

        /*
         * Validate City
         * */
        /* City required  */
        if (formHabilidades['SkillForm[city]'].value == "")
            mensagem += this.config.messages[YiiLang].cidade.required + "<br>";

        //Oque você faz? ---------------------------------------
        var size = formHabilidades.skill.length,
            ver = "";

        for (var i = 0; i < size; i++) {
            if (formHabilidades.skill[i].checked == true) {
                ver += formHabilidades.skill[i].value + ",";
            }
        }

        if (formHabilidades.outros[0].checked == true && formHabilidades.outros_txt.value == "") {
            mensagem += this.config.messages[YiiLang].outros.required + "<br>";
        }

        if (formHabilidades.outros_txt.value != "") {
            ver += formHabilidades.outros_txt.value + ",";
        }

        if (ver != "") {
            formHabilidades['SkillForm[skill]'].value = ver;
        }
        else {
            mensagem += this.config.messages[YiiLang].oquefaz.required + "<br>";
        }
        //------------------------------------------------------

        //Termos de privacidade---------------------------------
        if (formHabilidades['SkillForm[termos]'].checked == false)
            mensagem += this.config.messages[YiiLang].termos.required + "<br>";
        //------------------------------------------------------

        if (formHabilidades.SkillForm_verifyCode.value == "")
            mensagem += this.config.messages[YiiLang].veryfycode.required + "<br>";

        if (mensagem != "") {
            $("#box_modal4 .envio_mensagem p").html(mensagem);
            return false;
        }
        else {
            return true;
        }
    },
    mostra_msg_envio: function (el) {
        $(el + " .envio_sucesso").show()
            .on('click', function () {
                $(this).hide();
            });
    },
    lula: function () {
        var lado = 1;
        var self = INSTITUTOLULA;
        /* JS Página Vida Tablet */
        if ($('.submenu_lula li').height() <= 40) {
            $('div.apontador').each(function () {
                $(this).removeClass('apontador_esquerda');
                $(this).removeClass('apontador_direita');
                if (lado == 1) {
                    $(this).addClass('apontador_esquerda');
                    lado = 2;
                } else {
                    $(this).addClass('apontador_direita');
                    lado = 1;
                }
            });

            $('.bloco .numero').each(function () {
                $(this).text($(this).text() + ' de ');
            });
        }

        $('.ancoras .ano').each(function () {
            $(this).css('display', 'none');
        });

        $('.bloco').each(function () {
            $(this).css('display', 'none');
            $parent = $(this).parent();
            if ($(this).hasClass('destaque')) {
                $(this).css('display', 'block');
                $parent.css('display', 'block');
            }
            $descricaoTag = $(this).children('.descricao');
            $resumoTag = $(this).children('.resumo');
            $leiaPostTag = $(this).children('.leia_post');


            $leiaPostTag.show();
            $leiaPostTag.removeClass('esconde');
            $leiaPostTag.addClass('exibe');
            $leiaPostTag.html('+ Leia mais');


            $resumoTag.show();
            $descricaoTag.hide();

            $leiaPostTag.on('click', {resumo: $resumoTag, descricao: $descricaoTag}, function (event) {
                if ($(this).hasClass('exibe')) {
                    $(this).removeClass('exibe');
                    $(this).addClass('esconde');
                    $(this).html('Reduzir');
                    event.data.resumo.hide();
                    event.data.descricao.show();
                }
                else {
                    $(this).removeClass('esconde');
                    $(this).addClass('exibe');
                    $(this).html('+ Leia mais');
                    event.data.resumo.show();
                    event.data.descricao.hide();
                }
            });
        });

        this.exibePostLula();

        $('.apontador.veja_mais').on('click', function () {
            $parent = $(this).parent();
            $parent.find('.ano').css('display', 'block');
            $parent.find('.bloco').css('display', 'block');

            $(this).css('display', 'none');

            INSTITUTOLULA.exibePostLula();
        });

        /* Blog Mobile */
        if ($('#campo_mobile').css('display') == 'block') {
            if ($("div.interna .lateral #noticias_relacionadas").length) {
                $("div.interna .lateral #noticias_relacionadas h1").text('Recomendadas para você');
            }
        }
    },
    exibePostLula: function () {
        $('.ancoras .ano').each(function () {
            if ($(this).is(':visible')) {
                var cont = 0;
                $(this).children('.bloco').each(function () {
                    if ($(this).is(':visible')) {
                        if (cont % 2 == 0) {
                            $(this).addClass('esquerda');
                            $(this).removeClass('direita');
                        }
                        else {
                            $(this).addClass('direita');
                            $(this).removeClass('esquerda');
                        }
                        cont++;
                    }
                });
            }
        });
    },
    //africa e america-latina
    banner3: function () {
        var self = INSTITUTOLULA;
        this.banner_limit = 0;

        /* Para Mobile */
        this.estilo_mobile = false;

        if ($('#campo_mobile').css('display') == 'block') {
            this.estilo_mobile = true;
        }

        if (this.estilo_mobile) {
            $('#br_banner ul li').each(function (i) {
                $(this).find('.barra_progresso').css('background-color', $(this).find('.barra_progresso').css('background-color'));
            });
        }

        // calculando posições do banner
        $('#br_banner ul li').each(function () {
            self.banner_limit++;
        });

        //
        //
        //

        $('#br_banner ul li .exibicao').hide();
        $('#br_banner ul li:first-child .exibicao').show();

        this.barra_progresso();

        var controle_intervalo = setInterval(function () {
            self.proximo();
        }, 4000);

        $("#br_banner").hover(function () {
            clearInterval(controle_intervalo);
        }, function () {
            controle_intervalo = setInterval(function () {
                self.proximo();
            }, 4000);
        });

        //
        //


        $('#banner_principal #banner_proximo').click(function () {
            self.proximo();
        });
        $('#banner_principal #banner_anterior').click(function () {
            self.anterior();
        });

        $("#br_banner a.thumb").hover(function () {
            var anterior = $('#br_banner ul li .exibicao');
            var proximo = $(this).parent().find('.exibicao');
            anterior.stop(true, true);
            proximo.stop(true, true);
            anterior.fadeOut(1000);
            $('#br_banner ul li').removeClass('ativa');
            proximo.fadeIn(1000);
            $(this).parent().addClass('ativa');

        }, function () {
        });
    },
    proximo: function () {
        //
        var self = INSTITUTOLULA,
            contador = 0,
            total_banners = this.banner_limit,
            ultima = '';

        $('#br_banner ul li').each(function (i) {
            if ($(this).attr('class') == 'ativa') {
                contador = i;
                if (self.estilo_mobile) {
                    ultima = $(this).html();
                }
                else {
                    $(this).find('.exibicao').fadeOut(1000);
                }
                $(this).removeClass('ativa');
            }
        });

        if (self.estilo_mobile) {
            ultima = '<li>' + ultima + '</li>';
            $('#br_banner ul').append(ultima);
            $('#br_banner ul li:first-child').remove();
            $('#br_banner ul li:first-child').addClass('ativa')
            $('#br_banner ul li .exibicao').fadeOut(1000);
            $('#br_banner ul li.ativa .exibicao').fadeIn(1000);
        } else {
            $('#br_banner ul li').each(function (i) {
                var aux = i - 1;
                if (contador == total_banners - 1) {
                    $('#br_banner ul li:first-child .exibicao').fadeIn(1000);
                    $('#br_banner ul li:first-child').addClass('ativa');
                } else if (contador == aux) {
                    $(this).find('.exibicao').fadeIn(1000);
                    $(this).addClass('ativa');
                }
            });
        }
        this.barra_progresso();
    },
    anterior: function () {
        //
        var contador = 0;
        $('#br_banner ul li').each(function (i) {
            if ($(this).attr('class') == 'ativa') {
                contador = i;
                $(this).removeClass('ativa');
            }
        });
        $('#br_banner ul li').each(function (i) {
            var aux = i + 1;
            if (contador == 0) {
                $('#br_banner ul li:last-child').addClass('ativa');
            }
            if (contador == aux) {
                $(this).addClass('ativa');
            }
        });
    },
    barra_progresso: function () {
        $width = $('#br_banner ul li.ativa .barra_progresso').width();
        $('#br_banner ul li.ativa .barra_progresso').css('width', '1px');
        $('#br_banner ul li.ativa .barra_progresso').animate({'width': $width}, 4000);
    },
    scrool_geralBlog: function () {
        $w = $(window);
        tamanho_pagina = $(document).height();
        $scroll_top = $w.scrollTop();
        $scroll_bottom = tamanho_pagina - $w.height() - $scroll_top;
        $redes_sociais = $('#lateral_fixa');
        $menu = $('#noticias_relacionadas.menu_flutuante1');


        //
        //

        // Controlando o posicionamento da lateral de redes sociais
        if ($scroll_bottom > 50) {
            if ($scroll_top > 300) {
                //$redes_sociais.css('position', 'absolute').css('top', $scroll_top-300+'px');
                $redes_sociais.css('position', 'absolute').css('top', 100 + 'px');
            }
            else {
                $redes_sociais.css('position', 'absolute').css('top', '0');
            }
        }

        // Controlando o posicionamento do menu lateral
        if ($scroll_bottom > 300) {
            if ($scroll_top > 300) {
                //
                $menu.css('position', 'fixed').css('top', '-15px');
            } else {
                //
                $menu.css('position', 'relative').css('top', 'auto');
            }
        } else {
            $menu.css('position', 'fixed').css('top', '-' + ( 300 - $scroll_bottom) + 'px');
        }
    },
    scrool_geralNoticias: function () {
        $w = $(window);
        tamanho_pagina = $(document).height();
        $scroll_top = $w.scrollTop();
        $scroll_bottom = tamanho_pagina - $w.height() - $scroll_top;

        $redes_sociais = $('#lateral_fixa');

        // Controlando o posicionamento da lateral de redes sociais
        if ($scroll_bottom > 288) {
            if ($scroll_top > 200) // altura do topo
                $redes_sociais.css('position', 'fixed').css('top', '-15px');
            else
                $redes_sociais.css('position', 'relative').css('top', 'auto');
        } else if (($w.height() < 825) && ($redes_sociais.css('position') != 'absolute')) {
            $redes_sociais.css('position', 'absolute').css('top', ((tamanho_pagina - $redes_sociais.height() - 355) + 'px'));
        }
    }
};

$(function () {

    $.ajaxSetup({global: true, cache: false});

    var messages = {
        'pt_br': {
            'nome': {
                required: "Preencha o campo 'Nome'!"
            },
            'nascimento': {
                required: "Preencha o campo 'Data de Nascimento'!"
            },
            'email': {
                required: "Preencha o campo 'E-mail'!",
                valid: "Preencha o campo 'E-mail corretamente'!"
            },
            'pais': {
                required: "Preencha o campo 'País'!"
            },
            'cidade': {
                required: "Preencha o campo 'Cidade'!"
            },
            'oquefaz': {
                required: "Selecione pelo menos uma opção 'O que você faz?'"
            },
            'outros': {
                required: "Preencha o campo 'Outros'!"
            },
            'termos': {
                required: "Selecione a opção concordando com os Termos de Privacidade!"
            },
            'veryfycode': {
                required: "Preencha o campo 'Código de Verificação'!"
            },
            'quais': {
                required: "Selecione pelo menos uma opção 'Quais conteúdos você quer ser informado?'"
            }
        },
        'en': {
            'nome': {
                required: "Fill in the 'Name' field!"
            },
            'nascimento': {
                required: "Fill in the 'Date of Birth' field!"
            },
            'email': {
                required: "Fill in the 'E-mail' field!",
                valid: "Fill in the 'E-mail' field correctly!"
            },
            'pais': {
                required: "Fill in the 'Country' field!"
            },
            'cidade': {
                required: "Fill in the 'City' field!"
            },
            'oquefaz': {
                required: "Select at least one option 'What do you do?'"
            },
            'outros': {
                required: "Fill in the 'Others' field!"
            },
            'termos': {
                required: "Select the agreement to the 'Terms of Privacy'!"
            },
            'veryfycode': {
                required: "Fill in the 'Verify Code' field!"
            },
            'quais': {
                required: "Select at least one option 'What content you want to be informed?'"
            }
        },
        'es': {
            'nome': {
                required: "Rellene el campo 'Nombre'!"
            },
            'nascimento': {
                required: "Rellene el campo 'Fecha de Nascimiento'!"
            },
            'email': {
                required: "Rellene el campo 'E-mail'!",
                valid: "Rellene el campo 'E-mail correctamente'!"
            },
            'pais': {
                required: "Rellene el campo 'País'!"
            },
            'cidade': {
                required: "Rellene el campo 'Cidade'!"
            },
            'oquefaz': {
                required: "Seleccione al menos una opción '¿Qué haces?'"
            },
            'outros': {
                required: "Rellene el campo 'Otros'!"
            },
            'termos': {
                required: "Seleccione la aceptación de las 'Condiciones de privacidad'!"
            },
            'veryfycode': {
                required: "Rellene el campo 'Código de verificación'!"
            },
            'quais': {
                required: "Seleccione al menos una opción '¿Qué contenido que desea ser informado?"
            }
        }
    };

    INSTITUTOLULA.init({
        elFancybox: $('.fancybox'),
        elCampoMob: $('#campo_mobile'),
        elHeader: $('div.topo > header'),
        elLateralFixa: $('#lateral_fixa'),
        elInfoAdicional: $('.informacoes_adicionais'),
        elInfoAdicionalUl: $('.informacoes_adicionais > ul'),
        elLateralBottom: $('.lateral.bottom'),
        elInterna: $('.interna'),
        elInternaSection: $('.interna section'),
        elIframe: $('iframe'),
        elIndexSecChamada: $('.index section.chamada'),
        elIndexSecChamadaEs: $('.index section.chamada.especial'),
        elIndexSecChamadaNot3: $('.index section.chamada article.noticia:nth-of-type(3) .box_img'),
        inputBuscar: $('input.buscar'),
        spanTopo: $('span#topo'),
        messages: messages
    });
});
