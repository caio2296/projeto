jQuery.fn.extend({
    slidebar: function (buttons, fnGetStatus, opts) {

        var elem = jQuery(this);

        var settings = {
            buttons: [],
            imagePath: routes.SharedComponents + '/exporterBar/images/',
            fnGetStatus: null,
            opts: new Object()
        }
        $.extend(settings.buttons, buttons);
        settings.fnGetStatus = fnGetStatus;
        settings.opts = opts;

        var writeHtmlSlideBar = function () {
            var i;
            var htmlTableSlide, htmlTableSlideMenu;
            var htmlRow, htmlCell, htmlDiv, htmlImg;
            var htmlRowMenu, htmlCellMenu, htmlDivMenu, htmlImgMenu;

            if (settings.buttons.length > 0) {
                htmlTableSlide = $('<table cellSpacing="0" cellPadding="0" id="SideBar" class="TableSlideCont" ></table>');
                htmlRow = $('<tr class="RowSlideCont"></tr>');
                /*
                htmlCell = $('<td class="CellSlideCont" id="celltblMenuC"></td>');
                htmlDiv = $('<div id="divtblMenuC" class="divSlideCont"></div>');
                
                htmlImg = $('<img id="imgtblMenuC" class="ImgSlideCont" src="' + settings.imagePath + 'ico_mnu_open.gif"	/>');                

                htmlImg.hover(
                function () {
                $(this).removeClass('ImgSlideCont');
                $(this).addClass('ImgSlideContInvisible');
                $('#divtblMenuA').toggle(1000);
                $('#divtblMenuA').removeClass('divSlideMenuInvisible');
                $('#divtblMenuA').addClass('divSlideMenu');
                },
                function () { }
                );
                
                htmlDiv.append(htmlImg);                
                htmlCell.append(htmlDiv);

                htmlRow.append(htmlCell);
                */
                htmlCell = $('<td class="CellSlideCont" id="celltblMenuA"></td>');

                htmlDivMenu = $('<div id="divtblMenuA" class="divSlideMenu" ></div>');

                htmlTableSlideMenu = $('<table  id="SideBarMenu" cellSpacing="0" cellPadding="0" class="TableSlideMenu"></table>');
                htmlRowMenu = $('<tr class="RowSlideMenu"></tr>');
                /*
                htmlCellMenu = $('<td width="5"></td>');                
                htmlImgMenu = $('<img class="ImgSlideMenu" src="' + settings.imagePath + 'ico_mnu_opened.gif"/>');
                
                htmlCellMenu.append(htmlImgMenu);                
                htmlRowMenu.append(htmlCellMenu);
                */

                for (i = 0; i < settings.buttons.length; i++) {
                    htmlCellMenu = $('<td width="5"></td>');
                    /*htmlCellMenu = $('<td class="CellSlideMenu"></td>');
                    htmlCellMenu.attr('background', settings.imagePath + 'ico_mnu_sep.gif');*/
                    /// <summary>
              			/// Translate
              			/// Se realiza modificacion para funcionalidad de translate
              			/// </summary>
                    htmlImgMenu = $('<img class="ImgSlideMenu" id="' + settings.buttons[i].id + '" src="' + settings.imagePath + settings.buttons[i].image + '" title="' + settings.buttons[i].tooltip + '" translate-img-title="' + settings.buttons[i].tooltip + '" />');
                    htmlImgMenu.attr("image", settings.imagePath + settings.buttons[i].image);
                    htmlImgMenu.attr("imageover", settings.imagePath + settings.buttons[i].imageover);
                    //---htmlImgMenu.attr("imgonclick", settings.buttons[i].onclick);
                    htmlImgMenu.attr("onclick", settings.buttons[i].onclick);
                    htmlImgMenu.hover(
                        function () {
                            $(this).css("cursor", "pointer");
                            $(this).attr("src", $(this).attr("imageover"));
                        },
                        function () {
                            $(this).attr("src", $(this).attr("image"));
                        }
                    );
                    //                    htmlImgMenu.mouseover(function () {                            
                    //                          $(this).css("cursor", "pointer");
                    //                          $(this).attr("src", $(this).attr("imageover"));
                    //                    })
                    //                    .mouseout(function () {                    
                    //                          $(this).attr("src", $(this).attr("image"));
                    //                    });
                    htmlImgMenu.click(
                        function () {
                            //Export(this.imgonclick);
                            //----ExportTo.Export(this.getAttribute("imgonclick"), settings.fnGetStatus, settings.opts);
                        }
                    );

                    htmlCellMenu.append(htmlImgMenu);
                    htmlRowMenu.append(htmlCellMenu);

                    htmlCellMenu = $('<td id="tdImagen' + i + '"></td>');
                    /*htmlCellMenu = $('<td id="tdImagen' + i + '" class="CellSlideSep"></td>');
                    htmlImgMenu = $('<img src="' + settings.imagePath + 'ico_mnu_sep.gif"/>');*/

                    htmlCellMenu.append(htmlImgMenu);
                    htmlRowMenu.append(htmlCellMenu);
                }


                /*htmlCellMenu = $('<td width="10"></td>');
                htmlImgMenu = $('<img class="ImgSlideMenu" src="' + settings.imagePath + 'ico_mnu_close.gif"/>');
                htmlImgMenu.click(
                function () {                            
                $('#divtblMenuA').toggle(1000);
                $('#divtblMenuA').removeClass('divSlideMenu');
                $('#divtblMenuA').addClass('divSlideMenuInvisible');

                removeClassDelay($('#imgtblMenuC'), "ImgSlideContInvisible", 900);                            
                $('#imgtblMenuC').addClass('ImgSlideCont');                           
                });

                htmlCellMenu.append(htmlImgMenu);
                htmlRowMenu.append(htmlCellMenu);*/


                htmlTableSlideMenu.append(htmlRowMenu);

                htmlDivMenu.append(htmlTableSlideMenu);
                htmlCell.append(htmlDivMenu);

                htmlRow.append(htmlCell);
                htmlTableSlide.append(htmlRow);
                elem.append(htmlTableSlide);

            }

        };



        elem.empty();
        writeHtmlSlideBar();


    }



});



function removeClassDelay(jqObj, c, to) {
    setTimeout(function () { jqObj.removeClass(c); }, to);
}
