if (jQuery)
    (function (jQuery) {
        jQuery.extend(jQuery.fn, {
            filters: function (settings, fn1, fn2) {
                var elem = jQuery(this);
                var elemsfilters = [];

                elem.data("status", null);

                var writeHtmlControls = function (ctrls) {
                    divContainer = $('<table id="tblfilters_' + ctrls.id + '" class="' + ctrls.css + '" ></table>');
                    var indAux = 0;

                    if (ctrls.controlsbyrow == true) {
                        var rowtmp = $('<tr id="rowfilters_' + ctrls.id + '_' + indAux + '" ></tr>');

                        for (var iPos = 0; iPos < ctrls.children.length; iPos++) {

                            var celltmp = $('<td id="cellfilters_' + ctrls.children[iPos].id + '"></td>');

                            RenderControl(celltmp, ctrls.children[iPos]);
                            rowtmp.append(celltmp);

                            var a = iPos + 1;
                            if ((ctrls.maxctrlsbygroup != 0) && (a % ctrls.maxctrlsbygroup == 0)) {
                                divContainer.append(rowtmp);
                                indAux = indAux + 1;
                                if (a < ctrls.children.length) {
                                    rowtmp = $('<tr id="rowfilters_' + ctrls.id + '_' + indAux + '" ></tr>');
                                }
                            }
                        }

                        if (divContainer.find('[id=' + rowtmp.attr('id') + ']').length == 0) {
                            divContainer.append(rowtmp);
                        }
                    }
                    else {
                        for (var i = 0; i < ctrls.children.length; i++) {
                            var rowtmp = $('<tr id="rowctrl_' + ctrls.children[i].id + '" ></tr>');
                            var celltmp = $('<td id="cellctrl_' + ctrls.children[i].id + '" ></td>');

                            RenderControl(celltmp, ctrls.children[i]);
                            rowtmp.append(celltmp);
                            divContainer.append(rowtmp);
                        }
                    }
                    elem.html(divContainer);
                    SetStyles();
                    var fr = GetStatus();
                    elem.data("status", fr);
                }

                var SetStyles = function () {
                    //$('[id^=select_]').msDropDown();
                    $('[id^=multiselect]').multiselect();
                    $('[id^=chk_]').button();
                    $('[id^=btnset_]').buttonset();
                };

                var RenderControl = function (container, ctrl) {
                    switch (ctrl.typectrl) {
                        case "select":
                            container.append(RenderSelect(ctrl));
                            break;
                        case "multiselect":
                            container.append(RenderMultiSelect(ctrl));
                            break;
                        case "buttonset":
                            container.append(RenderButtonset(ctrl));
                            break;
                        case "chk":
                            container.append(RenderCheck(ctrl));
                            break;
                        case "btn":
                            container.append(RenderButton(ctrl));
                            break;
                        case "separator":
                            container.append(RenderSeparator(ctrl));
                            break;
                        case "img":
                            container.append(RenderImage(ctrl));
                            break;
                        case "div":
                            var containertmp = $('<div id="divfilters_' + ctrl.id + '" ></div>');
                            for (var iPos = 0; iPos < ctrl.children.length; iPos++) {
                                RenderControl(containertmp, ctrl.children[iPos]);
                            }
                            container.append(containertmp);
                            break;
                        default: break;
                    }
                };

                //Dibuja un select
                var RenderSelect = function (ctrl) {
                    var tblfilter = $('<table id="tbl_' + ctrl.id + '" ></table>');
                    var strdisabled = ""
                    if (ctrl.disabled) { strdisabled = "disabled"; }

                    var ddtmp = $("<select id='select_" + ctrl.id + "' name='" + ctrl.name + "' disabledctrls=" + ctrl.disabledctrls + " " + strdisabled + " ></select>");
                    //Genera los items del combo
                    for (var iPos = 0; iPos < ctrl.selectitems.length; iPos++) {
                        var strselected = "";
                        if (ctrl.selectitems[iPos].selected) {
                            strselected = "selected";
                        }
                        opt = $("<option value='" + ctrl.selectitems[iPos].value + "' " + strselected + ">" + ctrl.selectitems[iPos].displaytext + "</option>");
                        ddtmp.append(opt);
                    }

                    ddtmp.change(function () {
                        if (this.getAttribute('disabledctrls') == "true") {
                            var valname = $("#" + this.id + " option:selected").text().replace(/\s/g, "");
                            disabledCtrl(valname);
                        }
                        changeStatus();
                    });

                    var item = { "typectrl": ctrl.typectrl, "idctrl": ddtmp.attr("id") };
                    elemsfilters.push(item);

                    //En una sola fila?
                    if ((ctrl.labelbyrow != undefined) && (ctrl.labelbyrow != true)) {
                        var rowtmp = $('<tr id="row_' + ctrl.id + '" ></tr>');
                        var celltmp = $('<td id="celllbl_' + ctrl.name + '">' + ctrl.caption + '</td>');
                        rowtmp.append(celltmp);
                        var celltmp2 = $('<td id="cellcmb_' + ctrl.name + '"></td>');
                        celltmp2.append(ddtmp);
                        rowtmp.append(celltmp2);
                        tblfilter.append(rowtmp);
                    }
                    else {
                        //Genera la primer fila
                        var rowtmp = $('<tr id="rowlbl_' + ctrl.id + '" ></tr>');
                        var celltmp = $('<td id="celllbl_' + ctrl.id + '" >' + ctrl.caption + '</td>');
                        rowtmp.append(celltmp);
                        tblfilter.append(rowtmp);

                        //Fila para el select
                        rowtmp = $('<tr id="rowcmb_' + ctrl.id + '" ></tr>');
                        celltmp = $('<td id="cellcmb_' + ctrl.id + '" ></td>');
                        celltmp.append(ddtmp);
                        rowtmp.append(celltmp);
                        tblfilter.append(rowtmp);
                    }
                    return tblfilter;
                };

                var disabledCtrl = function (selected_value) {
                    elem.find('[id^=select_]').attr('disabled', false);
                    var cmb = elem.find('[id^=select_][name="' + selected_value + '"]');
                    if (cmb.length == 1) {
                        cmb.attr('disabled', true);
                    }
                };

                var RenderMultiSelect = function (ctrl) {
                    var tblfilter = $('<table id="tbl_' + ctrl.id + '" ></table>');
                    var strdisabled = ""
                    if (ctrl.disabled) { strdisabled = "disabled"; }

                    //Construye el select con sus opciones
                    var ddtmp = $('<select id="multiselect_' + ctrl.id + '" multiple="multiple" size="5" name="' + ctrl.name + '" ' + strdisabled + ' ></select>');
                    //Genera los items del combo
                    for (var iPos = 0; iPos < ctrl.selectitems.length; iPos++) {
                        var strselected = "";
                        if (ctrl.selectitems[iPos].selected) {
                            strselected = "selected";
                        }
                        opt = $('<option value="' + ctrl.selectitems[iPos].value + '" ' + strselected + '>' + ctrl.selectitems[iPos].displaytext + '</option>');
                        ddtmp.append(opt);
                    }
                    ddtmp.change(function () { changeStatus(); });

                    var item = { "typectrl": ctrl.typectrl, "idctrl": ddtmp.attr("id") };
                    elemsfilters.push(item);

                    //En una sola fila?
                    if ((ctrl.labelbyrow != undefined) && (ctrl.labelbyrow != true)) {
                        var rowtmp = $('<tr id="row_' + ctrl.id + '" ></tr>');
                        var celltmp = $('<td id="celllbl_' + ctrl.name + '">' + ctrl.caption + '</td>');
                        rowtmp.append(celltmp);
                        var celltmp2 = $('<td id="cellcmb_' + ctrl.name + '" ></td>');
                        celltmp2.append(ddtmp);
                        rowtmp.append(celltmp2);
                        tblfilter.append(rowtmp);
                    }
                    else {
                        //Genera la primer fila
                        var rowtmp = $('<tr id="rowlbl_' + ctrl.id + '" ></tr>');
                        var celltmp = $('<td id="celllbl_' + ctrl.id + '" >' + ctrl.caption + '</td>');
                        rowtmp.append(celltmp);
                        tblfilter.append(rowtmp);

                        //Fila para el select
                        rowtmp = $('<tr id="rowcmb_' + ctrl.id + '" ></tr>');
                        celltmp = $('<td id="cellcmb_' + ctrl.id + '" ></td>');
                        celltmp.append(ddtmp);
                        rowtmp.append(celltmp);
                        tblfilter.append(rowtmp);
                    }
                    return tblfilter;
                };

                //Dibuja un set de botones (conjunto de radio buttons)
                var RenderButtonset = function (ctrl) {
                    var container = $('<div id="btnset_' + ctrl.id + '" name="' + ctrl.name + '" ></div>');

                    //Genera los items del buttonset
                    for (var iPos = 0; iPos < ctrl.radioitems.length; iPos++) {
                        var rad = $('<input type="radio" id="radio_' + ctrl.radioitems[iPos].id + '" value="' + ctrl.radioitems[iPos].value + '" name="' + ctrl.caption + '" />');
                        if (ctrl.radioitems[iPos].statuscheck == true) {
                            rad.attr("checked", "checked");
                        }
                        rad.click(function () { changeStatus(); });
                        var lbl = $('<label for="radio_' + ctrl.radioitems[iPos].id + '">' + ctrl.radioitems[iPos].caption + '</label>');
                        container.append(rad);
                        container.append(lbl);
                    }

                    var item = { "typectrl": ctrl.typectrl, "idctrl": container.attr("id") };
                    elemsfilters.push(item);

                    return container;
                };

                //Dinuja un check
                var RenderCheck = function (ctrl) {
                    var tblfilter = $('<table id=\"tbl_' + ctrl.id + '\" ></table>');
                    var rowtmp = $('<tr id=\"row_' + ctrl.id + '\" ></tr>');
                    var celltmp = $('<td id=\"cellchk_' + ctrl.name + '\" ></td>');
                    var chktmp = $('<input type=\"checkbox\" id=\"chk_' + ctrl.id + '\" class=\"' + ctrl.css + '\" name=\"' + ctrl.value + '\" value=\"' + ctrl.value + '\" checked=' + ctrl.checkstatus + '>');
                    var lbltmp = $('<label for=\"chk_' + ctrl.id + '\" >' + ctrl.caption + '</label>');
                    chktmp.change(function () { changeStatus(); });

                    var item = { "typectrl": ctrl.typectrl, "idctrl": chktmp.attr("id") };
                    elemsfilters.push(item);

                    celltmp.append(chktmp);
                    celltmp.append(lbltmp);
                    rowtmp.append(celltmp);
                    tblfilter.append(rowtmp);
                    return tblfilter;
                };

                var RenderButton = function (ctrl) {
                    var tbl = $('<table id=\"tbl_' + ctrl.id + '\" ></table>');
                    var rowtmp = $('<tr id=\"row_' + ctrl.id + '\" ></tr>');
                    var celltmp = $('<td id=\"cellbtn_' + ctrl.name + '\" ></td>');
                    var btntmp;

                    if (ctrl.value != null && ctrl.value != '-') {
                        btntmp = $('<input type=\"button\" />');
                    }
                    else {
                        btntmp = $('<input type=\"button\" onclick=\"' + ctrl.action + '\" />');
                    }

                    btntmp.addClass(ctrl.css);
                    btntmp.attr("value", ctrl.caption);
                    btntmp.attr("id", "btn_" + ctrl.id);
                    if (ctrl.value != null && ctrl.value != '-') {
                        btntmp.click(function () {
                            changeStatusBtn(elem.attr("id"), ctrl.action, ctrl.value);
                        });
                    }

                    celltmp.append(btntmp);
                    btntmp.button();
                    rowtmp.append(celltmp);
                    tbl.append(rowtmp);
                    return tbl;
                };

                //Dibuja un separador.
                var RenderSeparator = function (ctrl) {
                    var tblfilter = $('<table id=\"tbl_' + ctrl.id + '\" ></table>');
                    var rowtmp = $('<tr id=\"row_' + ctrl.id + '\" ></tr>');
                    var celltmp = $('<td id=\"cellsep_' + ctrl.name + '\" ></td>');
                    var imgtmp = $('<img id=\"img_' + ctrl.id + '\" />');
                    imgtmp.addClass(ctrl.css);
                    imgtmp.attr("src", ctrl.imageurl);

                    celltmp.append(imgtmp);
                    rowtmp.append(celltmp);
                    tblfilter.append(rowtmp);
                    return tblfilter;
                };

                //Dibuja una imagen
                var RenderImage = function (ctrl) {
                    var tblfilter = $('<table id=\"tbl_' + ctrl.id + '\" ></table>');
                    var rowtmp = $('<tr id=\"row_' + ctrl.id + '\" ></tr>');
                    var celltmp = $('<td id=\"cellsep_' + ctrl.name + '\" ></td>');
                    var imgtmp = $('<img id=\"img_' + ctrl.id + '\" />');
                    imgtmp.addClass(ctrl.css);
                    imgtmp.attr("src", ctrl.imageurl);
                    imgtmp.attr("alt", ctrl.caption);
                    imgtmp.click(function () {
                        changeStatusBtn(elem.attr("id"), ctrl.action, ctrl.value);
                    });

                    celltmp.append(imgtmp);
                    rowtmp.append(celltmp);
                    tblfilter.append(rowtmp);
                    return tblfilter;
                };

                var changeStatusBtn = function (who, action, cont) {
                    fn2({ id: who, value: action, container: cont });
                }

                var changeStatus = function () {
                    var filtersreturn = GetStatus();
                    elem.data("status", filtersreturn);
                    //elem.date("filterselected", );
                    elem.data("from", "filters");
                    fn1(elem.attr("id"));
                };

                var GetStatus = function () {
                    var filtersreturn = [];

                    for (var iPos = 0; iPos < elemsfilters.length; iPos++) {
                        switch (elemsfilters[iPos].typectrl) {
                            case "select":
                                if (!$("#" + elemsfilters[iPos].idctrl).attr('disabled') && $("#" + elemsfilters[iPos].idctrl + " option:selected").attr("value") != '-') {
                                    var selecttmp_val = $("#" + elemsfilters[iPos].idctrl + " option:selected").attr("value");
                                    var selecttmp_valtext = $("#" + elemsfilters[iPos].idctrl + " option:selected").text();
                                    var filterselect = { "key": $("#" + elemsfilters[iPos].idctrl).attr("name"), "value": selecttmp_val, "valuetext": selecttmp_valtext };

                                    filtersreturn.push(filterselect);
                                }
                                break;
                            case "multiselect":
                                if (!$("#" + elemsfilters[iPos].idctrl).attr('disabled')) {
                                    var selecttmp = $("#" + elemsfilters[iPos].idctrl + " option:selected");
                                    var options = "";
                                    selecttmp.each(function () {
                                        var s = $(this).attr("value").toString();
                                        if (s.length > 0 && s != '-') {
                                            options += $(this).attr("value").toString() + ',';
                                        }
                                    });

                                    if (options.length > 0) {
                                        options = options.substring(0, options.length - 1);
                                        var filtermselect = { "key": $("#" + elemsfilters[iPos].idctrl).attr("name"), "value": options };
                                        filtersreturn.push(filtermselect);
                                    }
                                }
                                break;
                            case "buttonset":
                                var divradio = $("#" + elemsfilters[iPos].idctrl);
                                var radiotmp = $("#" + divradio.attr("id") + " [name='" + divradio.attr("name") + "']:checked").val()
                                var filterradio = { "key": elemsfilters[iPos].idctrl, "value": radiotmp.toString() };
                                filtersreturn.push(filterradio);
                                break;
                            case "chk":
                                var chktmp = $("#" + elemsfilters[iPos].idctrl);
                                var filterchk = { "key": chktmp.attr("name"), "value": chktmp.is(':checked').toString() };
                                filtersreturn.push(filterchk);
                                break;
                            default: break;
                        }
                    }
                    return filtersreturn;
                };

                writeHtmlControls(settings);
            }
        });

    })(jQuery);