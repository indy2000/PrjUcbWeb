$(document).ready(function() {
  KeyEnter();

  mkNotifications({
    positionY: "right",
    positionX: "top",
    scrollable: true,
    rtl: false, // true = ltr
    max: 7 // number of notifications to display
  });

  //Select all need start false
  //$("input[name='select_all']").prop("checked", false);

  //clear the filters when starting the page
  //$("#iLimparFiltroModal, #iLimparFiltros").trigger("click");

  //window.history.pushState({ page: 1, location: window.location.href }, "", "");

  //var page_id = window.parent.getActivePageId();

  //if (!window.parent.historyTab) window.parent.historyTab = [];
  //if (!window.parent.historyTab[page_id]) window.parent.historyTab[page_id] = [];
  //if (!window.parent.stateTab) window.parent.stateTab = [];

  //var page_current = window.parent.historyTab[page_id].filter(p => p.Tab_Id === page_id).length + 1;
  //window.parent.historyTab[page_id].push({ locatation: window.location, page: page_current });

  //if (window.parent.stateTab.filter(p => p.Tab_Id === page_id).length === 0)
  //    window.parent.stateTab.push({ Tab_Id: page_id, state: page_current });
  //else {
  //    window.parent.stateTab.map(p => {
  //        if (p.Tab_Id === page_id)
  //            p.state = window.parent.historyTab[page_id];
  //        return;
  //    });
  //}

  //window.parent.onpopstate = function (event) {
  //    var page_id_historyback = window.parent.getActivePageId();
  //    window.parent.stateTab = window.parent.stateTab.map(p => {
  //        if (p.Tab_Id === page_id)
  //            p.state = window.parent.historyTab[page_id] - 1;
  //        return;
  //    });

  //    state = window.parent.stateTab.filter(p => p.Tab_Id === page_id);
  //    window.location.href = window.parent.historyTab[page_id_historyback].filter(p => p.page === state.state).location;
  //};

  try {
    parent.App.stopPageLoading();

    var title = $(document)
      .find("title")
      .first()
      .text();

    if ($(".title-page").length > 0) title = $(".title-page")[0].innerHTML;

    parent.editTabTitle(parent.getActivePageId(), title);
  } catch (e) {
    try {
      parent.parent.App.stopPageLoading();
    } catch (e) {
      console.log(e);
    }
  }

  /********
   * MASK *
   *
   * jquery.mask.min.js
   *
   * Desativar a funçaõ somente números para funcionar corretamente.
   * Se uma máscara estiver com erro de sintaxe, as demais deixam de funcionar.
   * */

  //CPF
  $(".cpf").mask("000.000.000-00", { reverse: true });

  //PIS
  $(".pis").mask("000.00000.00-0");

  $(".readonly").attr("tabindex", "-1");

  $(".maskip").mask("0ZZ.0ZZ.0ZZ.0ZZ", {
    translation: { Z: { pattern: /[0-9]/, optional: true } }
  });

  //Remove o for do label imediatamente anterior ao elemento que possui a classe readonly
  $(".readonly")
    .prev("label")
    .removeAttr("for");
  $("input[readonly|='true']")
    .prev("label")
    .removeAttr("for");

  //INTEGER
  $(".integer").mask("0#");
  //CNPJ
  $(".cnpj").mask("00.000.000/0000-00", { reverse: true });
  //RG
  $(".rg").mask("00.000.000-0");
  //CEP
  $(".cep").mask("00000-000");
  //PHONE
  $(".phone").mask("(00) 0000-0000");
  //CELLPHONE
  $(".cellphone").mask("(00) 00000-0000");
  //MONEY
  $(".money")
    .mask("##0,00", {
      reverse: true,
      onKeyPress: function(val, event, currentField, options) {
        currentField.val(FormatDinero(currentField.val()));
      }
    })
    .on("blur", function() {
      if (!$(this).val()) $(this).val("0,00");
    });

  //PERCENTUAL
  $(".percent").mask("##0,00%", { reverse: true });

  $(".percent_inteiro").mask("##0%", { reverse: true });

  //SITE

  //DATEPICKER
  $(".datepicker").mask("00/00/0000");
  $(".datepicker")
    .datepicker({
      format: "dd/mm/yyyy",
      language: "pt-BR",
      todayHighlight: "true",
      autoclose: true
    })
    .on("changeDate", function(e) {
      if ($(this).val().length === 10) return $(this).trigger("focusout");
      else return true;
    })
    .after(function() {
      var nameLink = `${$(this)[0].id}_dp`;

      return $(this).is(".readonly") || $(this).prop("readonly")
        ? $(
            `<i id='${nameLink}' class='far fa-calendar-alt fs-15 color-icon-date pl-1 pr-1'></i>`
          )
        : $(
            `<a id='${nameLink}' href='javascript: void(0);' class='pl-1 pr-1'><i class='far fa-calendar-alt fs-15 color-icon-date'></i></a>`
          ).click(function() {
            $(this)
              .prev()
              .datepicker("show");
          });
    });

  //Somente Data a partir de hoje disponível
  const dateToday = new Date();
  dateToday.setDate(dateToday.getDate());

  $(".datepicker-today").mask("00/00/0000");
  $(".datepicker-today")
    .datepicker({
      startDate: dateToday,
      format: "dd/mm/yyyy",
      language: "pt-BR",
      todayHighlight: "true",
      autoclose: true
    })
    .on("changeDate", function(e) {
      if ($(this).val().length === 10) $(this).trigger("focusout");
      else return true;
    })
    .after(function() {
      var nameLink = `${$(this)[0].id}_dp`;

      return $(this).is(".readonly") || $(this).prop("readonly")
        ? //$("<span class='pl-1 pr-3'><i class='far fa-calendar-alt'></i></span>")
          //$("<div class='form-inline'><i class='far fa-calendar-alt fs-15 color-icon-date'></i></div>")
          $(
            `<i id='${nameLink}' class='far fa-calendar-alt fs-15 color-icon-date pl-1 pr-1'></i>`
          )
        : //$("<a href='javascript: void(0);' class='pl-1 pr-3'><i class='far fa-calendar-alt'></i></a>").click(function () {
          $(
            `<a id='${nameLink}' href='javascript: void(0);' class='pl-1 pr-1'><i class='far fa-calendar-alt fs-15 color-icon-date'></i></a>`
          ).click(function() {
            $(this)
              .prev()
              .datepicker("show");
          });
    });

  //Somente Data após hoje disponível
  const date = new Date();
  date.setDate(date.getDate() + 1);

  $(".datepicker-limit").mask("00/00/0000");
  $(".datepicker-limit")
    .datepicker({
      startDate: date,
      format: "dd/mm/yyyy",
      language: "pt-BR",
      todayHighlight: "true",
      autoclose: true
    })
    .on("changeDate", function(e) {
      if ($(this).val().length === 10) return $(this).trigger("focusout");
      else return true;
    })
    .after(function() {
      var nameLink = `${$(this)[0].id}_dp`;

      return $(this).is(".readonly") || $(this).prop("readonly")
        ? //$("<span class='pl-1 pr-3'><i class='far fa-calendar-alt'></i></span>")
          //$("<div class='form-inline'><i class='far fa-calendar-alt fs-15 color-icon-date'></i></div>")
          $(
            `<i id='${nameLink}' class='far fa-calendar-alt fs-15 color-icon-date pl-1 pr-1'></i>`
          )
        : //$("<a href='javascript: void(0);' class='pl-1 pr-3'><i class='far fa-calendar-alt'></i></a>").click(function () {
          $(
            `<a id='${nameLink}' href='javascript: void(0);' class='pl-1 pr-1'><i class='far fa-calendar-alt fs-15 color-icon-date'></i></a>`
          ).click(function() {
            $(this)
              .prev()
              .datepicker("show");
          });
    });

  //DATEPICKER para a tela de Feriados
  $(".datepicker-feriado").mask("00/00");
  $(".datepicker-feriado")
    .datepicker({
      format: "dd/mm",
      language: "pt-BR",
      todayHighlight: "true",
      autoclose: true
    })
    .after(function() {
      var nameLink = `${$(this)[0].id}_dp`;

      return $(this).is(".readonly") || $(this).prop("readonly")
        ? //$("<span class='pl-1 pr-3'><i class='far fa-calendar-alt'></i></span>")
          //$("<div class='form-inline'><i class='far fa-calendar-alt fs-15 color-icon-date'></i></div>")
          $(
            `<i id='${nameLink}' class='far fa-calendar-alt fs-15 color-icon-date pl-1 pr-1'></i>`
          )
        : //$("<a href='javascript: void(0);' class='pl-1 pr-3'><i class='far fa-calendar-alt'></i></a>").click(function () {
          $(
            `<a id='${nameLink}' href='javascript: void(0);' class='pl-1 pr-1'><i class='far fa-calendar-alt fs-15 color-icon-date'></i></a>`
          ).click(function() {
            $(this)
              .prev()
              .datepicker("show");
          });
    });

  $(".monthpicker").mask("00/0000");
  $(".monthpicker")
    .datepicker({
      startView: 1,
      minViewMode: 1,
      maxViewMode: 3,
      language: "pt-BR",
      format: "mm/yyyy",
      changeMonth: true,
      changeYear: true,
      autoclose: true
    })
    .after(function() {
      var nameLink = `${$(this)[0].id}_dp`;

      return $(this).is(".readonly") || $(this).prop("readonly")
        ? //$("<span class='pl-1 pr-3'><i class='far fa-calendar-alt'></i></span>")
          //$("<div class='form-inline'><i class='far fa-calendar-alt fs-15 color-icon-date'></i></div>")
          $(
            `<i id='${nameLink}' class='far fa-calendar-alt fs-15 color-icon-date pl-1 pr-1'></i>`
          )
        : //$("<a href='javascript: void(0);' class='pl-1 pr-3'><i class='far fa-calendar-alt'></i></a>").click(function () {
          $(
            `<a id='${nameLink}' href='javascript: void(0);' class='pl-1 pr-1'><i class='far fa-calendar-alt fs-15 color-icon-date'></i></a>`
          ).click(function() {
            $(this)
              .prev()
              .datepicker("show");
          });
    });

  $(".datepicker-period")
    .toArray()
    .map(elem => {
      let datepicker_config = {
        format: "dd/mm/yyyy",
        language: "pt-BR",
        todayHighlight: "true",
        autoclose: true
      };

      if ($(elem).attr("data-startdate"))
        datepicker_config["startDate"] = moment(
          $(elem).attr("data-startdate"),
          "DD/MM/YYYY"
        ).toDate();

      if ($(elem).attr("data-enddate"))
        datepicker_config["endDate"] = moment(
          $(elem).attr("data-enddate"),
          "DD/MM/YYYY"
        ).toDate();

      $(elem).mask("00/00/0000");
      $(elem)
        .datepicker(datepicker_config)
        .on("changeDate", function(e) {
          if ($(this).val().length === 10) return $(this).trigger("focusout");
          else return true;
        })
        .after(function() {
          return $(this).is(".readonly") || $(this).prop("readonly")
            ? //$("<span class='pl-1 pr-3'><i class='far fa-calendar-alt'></i></span>")
              //$("<div class='form-inline'><i class='far fa-calendar-alt fs-15 color-icon-date'></i></div>")
              $(
                "<i class='far fa-calendar-alt fs-15 color-icon-date pl-1 pr-1'></i>"
              )
            : //$("<a href='javascript: void(0);' class='pl-1 pr-3'><i class='far fa-calendar-alt'></i></a>").click(function () {
              $(
                "<a href='javascript: void(0);' class='pl-1 pr-1'><i class='far fa-calendar-alt fs-15 color-icon-date'></i></a>"
              ).click(function() {
                $(this)
                  .prev()
                  .datepicker("show");
              });
        });
    });

  //MASKIP
  $(".maskip").mask("000.000.000.000");
  $(".maskHoraContador").mask("00:00", { reverse: true });
  $(".maskHoraContador")
    .toArray()
    .map(p => {
      if (!$(p).attr("placeholder")) {
        $(p).attr("placeholder", "hh:mm");
      }
    });
  $(".maskHoraContador").focusout(function() {
    if ($(this).val().length < 5) {
      $(this).val("");
    }

    if (
      $(this).hasClass("nao-permite-hora-zero") &&
      $(this).val() === "00:00"
    ) {
      $(this).val("");
    }
  });

  var maskHora = function(val) {
    val = val.split(":");
    return parseInt(val[0]) > 19 ? "HZ:M0" : "H0:M0";
  };

  pattern = {
    onKeyPress: function(val, e, field, options) {
      field.mask(maskHora.apply({}, arguments), options);
    },
    translation: {
      H: { pattern: /[0-2]/, optional: false },
      Z: { pattern: /[0-3]/, optional: false },
      M: { pattern: /[0-5]/, optional: false }
    }
  };

  $(".hora").mask(maskHora, pattern);

  $(".hora99").mask("000:00");

  //$(".hora").mask("00:00");
  //EMAIL - Estamos usando a função abaixo do bootstrap-validate.js
  /*
       bootstrapValidate(
         '#iEmail',
         'email:Insira um endereço de e-mail válido!'
       );
    */

  //INSCRICAO MUNICIPAL (Formato varia de acordo com o Municipio)

  //INSCRICAO ESTADUAL (Formato varia de acordo com o Municipio)

  $(window).resize(function() {
    ResizeTable("divTable");
  });

  ResizeTable("divTable");
});

/* Bloquear o history.back */
(function(global) {
  if (typeof global === "undefined") {
    throw new Error("window is undefined");
  }

  var _hash = "!";
  var noBackPlease = function() {
    global.location.href += "#" + global.location.pathname;

    // making sure we have the fruit available for juice (^__^)
    global.setTimeout(function() {
      global.location.href += "!";
    }, 50);
  };

  global.onhashchange = function() {
    if (global.location.hash !== _hash) {
      global.location.hash = _hash;
    }
  };

  global.onload = function() {
    noBackPlease();

    // disables backspace on page except on input fields and textarea..
    document.body.onkeydown = function(e) {
      my_onkeydown_handler(e);

      var elm = e.target.nodeName.toLowerCase();
      if (e.which === 8 && (elm !== "input" && elm !== "textarea")) {
        e.preventDefault();
      }
      // stopping event bubbling up the DOM tree..
      e.stopPropagation();
    };
  };
})(window);

function ResizeTable(idDivTable) {
  if (typeof $("#" + idDivTable) !== "undefined") {
    var ht = $(window).height();
    var $header = 10;
    var $title = $("#divTitle");

    var height = ht - $header - $title.outerHeight();

    $("#" + idDivTable).css({
      height: height
    });
  }
}

//Função para funcionar o scroll dos datatables
var dataTableInitComplete = function(settings, json) {
  $(".dataTables_scrollBody").on("scroll", function() {
    $(".dataTables_scrollHeadInner").scrollLeft($(this).scrollLeft());
  });

  //$(window).scroll(function () {
  //    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
  //        console.log("bottom!");
  //        dataTable.page('next').draw('page');
  //    }
  //});

  $(document).on("scroll", function() {
    var scroll_pos = $(this).scrollTop();
    var margin = 72; // Adjust it to your needs
    var cur_pos = $(".dataTables_scrollHeadInner").position();
    var header_pos = cur_pos.top;

    if (scroll_pos < margin) header_pos = margin - scroll_pos;
    else header_pos = 0;

    $(".dataTables_scrollHeadInner").css({ top: header_pos });
  });
};

var dataTableInitComplete2 = function(settings, json) {
  $(".dataTables_scrollBody").on("scroll", function() {
    $(".dataTables_scrollHeadInner").scrollLeft($(this).scrollLeft());
  });

  $(document).on("scroll", function() {
    // Disable scrolling in Head
    $(".dataTables_scrollHead").css({
      "overflow-y": "hidden !important"
    });
    // Disable TBODY scroll bars
    $(".dataTables_scrollBody").css({
      "overflow-y": "scroll",
      "overflow-x": "hidden",
      border: "none"
    });
    // Enable TFOOT scoll bars
    $(".dataTables_scrollFoot").css("overflow", "auto");
    //  Sync TFOOT scrolling with TBODY
    $(".dataTables_scrollFoot").on("scroll", function() {
      $(".dataTables_scrollBody").scrollLeft($(this).scrollLeft());
    });
  });
};

function moveRow(table, row, direction) {
  var index = table.row(row).index();

  var order = -1;
  if (direction === "down") {
    order = 1;
  }

  var data1 = table.row(index).data();
  data1.order += order;

  var data2 = table.row(index + order).data();
  data2.order += -order;

  table.row(index).data(data2);
  table.row(index + order).data(data1);

  table.page(0).draw(false);
}

function TrataNulo(Valor) {
  if (Valor === null || Valor === undefined) return "";
  else return Valor;
}

function RenderValorRelatorio(data, type, row, meta) {
  if (data === null || data === undefined) return "0,00";
  else {
    if (type === "export")
      return data
        .replace("R$ ", "")
        .replace("R$", "")
        .replace(".", "")
        .replace(",", ".");
    else {
      data = RemoverMaskModeny(data);
      if (isNaN(data)) data = 0;

      var dinero_result = Dinero({ amount: Number(data), currency: "BRL" });

      return dinero_result.setLocale("pt-BR").toFormat("$0,0.00");
    }
  }
}

function CarregaHeaderComplexaDataTable(idDataTable, colunasDatatable) {
  let header = "<thead><tr>";

  colunasDatatable.forEach((col, index) => {
    if (!col.className) header += `<th rowspan='2'>${col.title}</th>`;
    else if (col.complex_header)
      header += `<th colspan='${col.colspan_complex}' class='text-center'>${
        col.complex_header
      }</th>`;
  });

  header += "</tr><tr>";

  colunasDatatable.forEach((col, index) => {
    if (col.className) header += `<th class='text-center'>${col.title}</th>`;
  });

  header += "</tr></thead>";

  $(`#${idDataTable}`).append(header);
}

function CarregaFooterDataTable(idDataTable, colunasDatatable) {
  let foot = "<tfoot><tr>";
  colunasDatatable.forEach(_ => {
    foot += "<th></th>";
  });
  foot += "</tr></tfoot>";
  $(`#${idDataTable}`).append(foot);
}

// Operações com data

/**
 * Transforma uma string com hora em um number
 * @param {String} horaStr Horário no formato "00:00"
 * @return {void}
 */
function HoraParaNumber(horaStr) {
  if (!horaStr) horaStr = "00:00";

  const [horasStr, minutosStr] = horaStr.split(":");

  const horas = Number(horasStr);
  let minutos = Number(minutosStr) / 60;

  if (horas < 0) minutos = minutos * -1;

  return horas + minutos;
}

/**
 * Transforma uma hora em formato numerico para uma string das horas
 * @param {any} horaMinuto Minutos
 * @return {void}
 */
function HoraParaString(horaMinuto) {
  if (horaMinuto === null) {
    return null;
  }

  horaMinuto = roundNumber(horaMinuto, 4);
  const horaMinutoAbs = Math.abs(horaMinuto);

  const horas = Math.abs(Math.trunc(horaMinuto));
  let minutos = roundNumber((horaMinutoAbs - horas) * 60, 2);
  minutos = parseInt(minutos);

  if (horaMinuto === horaMinutoAbs)
    return `${horas.toString().padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")}`;
  else
    return `-${horas.toString().padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")}`;
}

String.prototype.toFloat = function() {
  let formattedStr = this.replace(",", ".");
  return Number(formattedStr);
};

/**
 * Transforma uma string de data em formato brasileiro em um objeto Date.
 * @param {String} dateStr String de data. Formato aceito: dd/MM/yyyy HH:mm
 * @return {void}
 */
function parseFromLocaleString(dateStr) {
  if (!dateStr) throw new Error("Informe uma data válida");

  const arrayData = dateStr.split(" ");

  const data = arrayData[0];
  const hora = arrayData[1];

  const dataParseStr = data
    .split("/")
    .reverse()
    .join("/");
  const horaParseStr = hora ? hora : "";

  return new Date(`${dataParseStr} ${horaParseStr}`);
}

Date.parseFromLocaleString = parseFromLocaleString;

/**
 * Adiciona uma quantidade de dias. Aceita uma quantidade negativa
 * @param {Number} dias quantidade de dias
 * @returns {Date} objeto Date
 */
Date.prototype.addDays = function(dias) {
  if (typeof dias !== "number")
    throw new Error("Informe um número para somar a data");

  return new Date(this.getFullYear(), this.getMonth(), this.getDate() + dias);
};

function DateDiff(dataInicioStr, dataFinalStr) {
  let arrDataInicio = dataInicioStr.split("/");
  let arrDataFinal = dataFinalStr.split("/");

  let dataInicio = new Date(
    arrDataInicio[2],
    arrDataInicio[1] - 1,
    arrDataInicio[0]
  );
  let dataFinal = new Date(
    arrDataFinal[2],
    arrDataFinal[1] - 1,
    arrDataFinal[0]
  );

  let timeDiff = new Date(dataFinal) - new Date(dataInicio);
  let dias = timeDiff / (1000 * 60 * 60 * 24);

  return dias;
}

function DataMenorHoje(pData) {
  var strData = pData;
  var partesData = strData.split("/");
  var data = new Date(
    partesData[2],
    partesData[1] - 1,
    partesData[0],
    23,
    59,
    59,
    59
  );

  var strHoje = dataFormatada(new Date());
  var partesDataHoje = strHoje.split("/");
  var dataHoje = new Date(
    partesDataHoje[2],
    partesDataHoje[1] - 1,
    partesDataHoje[0],
    23,
    59,
    59,
    59
  );

  return data < dataHoje;
}

function DataMenorIgualHoje(pData) {
  var strData = pData;
  var partesData = strData.split("/");
  var data = new Date(
    partesData[2],
    partesData[1] - 1,
    partesData[0],
    23,
    59,
    59,
    59
  );

  var strHoje = dataFormatada(new Date());
  var partesDataHoje = strHoje.split("/");
  var dataHoje = new Date(
    partesDataHoje[2],
    partesDataHoje[1] - 1,
    partesDataHoje[0],
    23,
    59,
    59,
    59
  );

  return data < dataHoje;
}

function DataMaiorHoje(pData) {
  var strData = pData;
  var partesData = strData.split("/");
  var data = new Date(
    partesData[2],
    partesData[1] - 1,
    partesData[0],
    23,
    59,
    59,
    59
  );

  var strHoje = dataFormatada(new Date());
  var partesDataHoje = strHoje.split("/");
  var dataHoje = new Date(
    partesDataHoje[2],
    partesDataHoje[1] - 1,
    partesDataHoje[0],
    23,
    59,
    59,
    59
  );

  return data > dataHoje;
}

function DataMaiorOuIgualHoje(pData) {
  var strData = pData;
  var partesData = strData.split("/");
  var data = new Date(
    partesData[2],
    partesData[1] - 1,
    partesData[0],
    23,
    59,
    59,
    59
  );

  var strHoje = dataFormatada(new Date());
  var partesDataHoje = strHoje.split("/");
  var dataHoje = new Date(
    partesDataHoje[2],
    partesDataHoje[1] - 1,
    partesDataHoje[0],
    23,
    59,
    59,
    59
  );

  return data >= dataHoje;
}

function DataMaior(iDataInicial, iDataFinal) {
  if (!$("#" + iDataInicial).val() || !$("#" + iDataInicial).val()) {
    return false;
  }

  var _data_ini = $("#" + iDataInicial)
    .val()
    .split("/");
  var _data_fim = $("#" + iDataFinal)
    .val()
    .split("/");

  var data_ini = new Date(_data_ini[2], _data_ini[1] - 1, _data_ini[0]);
  var data_fim = new Date(_data_fim[2], _data_fim[1] - 1, _data_fim[0]);

  return data_ini > data_fim;
}

function dataFormatada(d) {
  var data = new Date(d),
    dia = data.getDate(),
    mes = data.getMonth() + 1,
    ano = data.getFullYear();
  return [dia, mes, ano].join("/");
}

//

function my_onkeydown_handler(event) {
  switch (event.keyCode) {
    case 116: // 'F5'
      event.preventDefault();
      event.keyCode = 0;
      window.status = "F5 disabled";
      try {
        parent.refreshTab();
      } catch (e) {
        try {
          parent.parent.refreshTab();
        } catch {
          console.log(e);
        }
      }
      break;
  }
}

function ShowPageLoading() {
  try {
    parent.App.startPageLoading();
  } catch {
    try {
      parent.parent.App.startPageLoading();
    } catch (e) {
      console.log(e);
    }
  }
}

function HidePageLoading() {
  try {
    parent.App.stopPageLoading();
  } catch {
    try {
      parent.parent.App.stopPageLoading();
    } catch (e) {
      console.log(e);
    }
  }
}

/*Propotypes*/
Array.prototype.contains = function(obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
};

Array.prototype.countDistinct = function() {
  return new Set(this).size;
};

/*ToolTips*/
$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});

/*Popover*/
$(function() {
  $('[data-toggle="popover"]').popover();
});

$(".popover-dismiss").popover({
  trigger: "focus"
});

function maskTelefone(num) {
  $("#" + num).bind("keyup blur focus", function(e) {
    e.preventDefault();
    var expre = /[^()-\d]/g;
    $(this).val(
      $(this)
        .val()
        .replace(expre, "")
    );
  });
}

function somenteNumeros(num) {
  $("#" + num).bind("keyup blur focus", function(e) {
    e.preventDefault();
    var expre = /[^\d]/g;
    $(this).val(
      $(this)
        .val()
        .replace(expre, "")
    );
  });
}

function somenteNumerosTraco(num) {
  $("#" + num).bind("keyup blur focus", function(e) {
    e.preventDefault();
    var expre = /[^-\d]/g;
    $(this).val(
      $(this)
        .val()
        .replace(expre, "")
    );
  });
}

function somenteLatLong(num) {
  $("#" + num).bind("keyup blur focus", function(e) {
    e.preventDefault();
    var expre = /[^.-\d]/g;
    $(this).val(
      $(this)
        .val()
        .replace(expre, "")
    );
  });
}

function somenteNumerosPonto(num) {
  $("#" + num).bind("keyup blur focus", function(e) {
    e.preventDefault();
    var expre = /[^.\d]/g;
    $(this).val(
      $(this)
        .val()
        .replace(expre, "")
    );
  });
}

function somenteNumerosPontoVirgula(num) {
  $("#" + num).bind("keyup blur focus", function(e) {
    e.preventDefault();
    var expre = /[^,.\d]/g;
    $(this).val(
      $(this)
        .val()
        .replace(expre, "")
    );
  });
}

//$(".hora").focusout(function () {

//    var regexp = /([01][0-9]|[02][0-3]):[0-5][0-9]/;
//    var correct = ($(this).val().search(regexp) >= 0) ? true : false;

//    if ($(this).val() == "00:00") correct = false;

//    if (!correct) { Notificar('Atenção', 'Preencha a data Corretamente', 'Success') }
//    return correct;
//});

var decodeHtmlEntity = function(str) {
  return str.replace(/&#(\d+);/g, function(match, dec) {
    return String.fromCharCode(dec);
  });
};

function Traduzir(Texto) {
  if (
    Texto.indexOf("The value") !== -1 &&
    Texto.indexOf("is not valid for") !== -1
  ) {
    return Texto.replace("The value", "O valor").replace(
      "is not valid for",
      "é inválido para"
    );
  } else {
    return Texto;
  }
}

function Notificar(Titulo, Texto, Status, Tempo = 10000, onClose) {
  Texto = Traduzir(decodeHtmlEntity(Texto));

  if (typeof onClose !== typeof undefined) {
    try {
      parent.Swal.fire({
        html: Texto,
        type: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
        onClose: onClose
      });
    } catch (ex) {
      Swal.fire({
        html: Texto,
        type: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
        onClose: onClose
      });
    }
  } else if (Texto.length > 60) {
    try {
      parent.Swal.fire({
        html: Texto,
        type: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
      });
    } catch (ex) {
      Swal.fire({
        html: Texto,
        type: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
      });
    }
  } else {
    try {
      parent.mkNoti(Titulo, Texto, {
        // Default, Primary, Success, Danger, Warning, Info, Light, Dark, Purple
        status: Status,

        // Custom icon
        icon: {
          class: null,
          color: null,
          background: null
        },

        // Is dismissable?
        dismissable: true,

        // Auto dismisses after 7 seconds
        duration: Tempo,

        // Callback function
        callback: null,

        // Enable sounds
        sound: false,

        // Custom sound files
        customSound: null
      });
    } catch (ex) {
      mkNoti(Titulo, Texto, {
        // Default, Primary, Success, Danger, Warning, Info, Light, Dark, Purple
        status: Status,

        // Custom icon
        icon: {
          class: null,
          color: null,
          background: null
        },

        // Is dismissable?
        dismissable: true,

        // Auto dismisses after 7 seconds
        duration: Tempo,

        // Callback function
        callback: null,

        // Enable sounds
        sound: false,

        // Custom sound files
        customSound: null
      });
    }
  }
}

function QueueNotificar(arrayInfos, onClose) {
  var queueNotificacao = [];
  var Texto = "";

  var infos = arrayInfos;
  var i;
  for (i = 0; i < infos.length; i++) {
    Texto = Traduzir(decodeHtmlEntity(infos[i]));

    if (typeof onClose !== typeof undefined) {
      var Notificacao = {
        html: Texto,
        type: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
      };

      if (i === infos.length - 1) {
        Notificacao.onClose = onClose;
      }

      queueNotificacao.push(Notificacao);
    } else {
      queueNotificacao.push({
        html: Texto,
        type: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
      });
    }
  }

  Swal.queue(queueNotificacao);
  queueNotificacao = [];
}

function KeyEnter() {
  $("select")
    .not($(":button"))
    .keypress(function(evt) {
      if (evt.keyCode === 13) {
        iname = $(this).val();
        if (iname !== "Submit") {
          var fields = $(this)
            .parents("form:eq(0),body")
            .find("button, input, textarea, select")
            .not($(":hidden"))
            .not($(":disabled"))
            .not(".readonly");
          var index = fields.index(this);
          if (index > -1 && index + 1 < fields.length) {
            fields.eq(index + 1).focus();
          }
          return false;
        }
      }
    });

  $("input")
    .not($(":button"))
    .keypress(function(evt) {
      if (evt.keyCode === 13) {
        iname = $(this).val();
        if (iname !== "Submit") {
          var fields = $(this)
            .parents("form:eq(0),body")
            .find("button, input, textarea, select")
            .not($(":hidden"))
            .not($(":disabled"))
            .not(".readonly");
          var index = fields.index(this);
          if (index > -1 && index + 1 < fields.length) {
            fields.eq(index + 1).focus();
          }
          return false;
        }
      }
    });
}

function FormataCPF() {
  // O CPF ou CNPJ
  var cpf_cnpj = $(this).val();

  // Testa a validação e formata se estiver OK
  if (formata_cpf_cnpj(cpf_cnpj)) {
    $(this).val(formata_cpf_cnpj(cpf_cnpj));
  } else if (cpf_cnpj) {
    Notificar("CPF Inválido", "Informe dados válidos", "warning");
    $("#iCPF").focus();

    //Swal.fire({
    //    title: 'CPF Inválido',
    //    text: "Informe dados válidos",
    //    type: 'warning',
    //    confirmButtonColor: '#3085d6',
    //    confirmButtonText: 'OK'
    //}).then((result) => {
    //    if (result.value) {
    //        $('#iCPF').focus();
    //    }
    //});
  }
}

function FormataCNPJ() {
  // O CPF ou CNPJ
  var cpf_cnpj = $(this).val();

  // Testa a validação e formata se estiver OK
  if (formata_cpf_cnpj(cpf_cnpj)) {
    $(this).val(formata_cpf_cnpj(cpf_cnpj));
  } else if (cpf_cnpj) {
    Notificar("CNPJ Inválido", "Informe dados válidos", "warning");
    $("#iCNPJ").focus();
  }
}

//sweet alert de cancelamento de tela
function BotaoCancelar(url) {
  Swal.fire({
    title: "",
    text:
      "Os dados ainda não foram salvos. Ao sair as informações serão perdidas. Deseja sair sem antes gravar?",
    type: "warning",

    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Nao",
    confirmButtonText: "Sim"
  }).then(result => {
    if (result.value) {
      window.location.href = url;
    }
  });
}

function ValidaData() {
  var data = $(this).val();

  er = /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d$/;
  if (data.length === 10 && !er.exec(data)) {
    Notificar("Data Inválida", "Informe dados válidos", "warning");
    $(this).focus();

    return false;
  }
}

function validaEmail(email) {
  var reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!reg.test(email) && email !== "") return false;

  return true;
}

function reloadData(Url, ControlId, ControlDescription, zindex = 100) {
  $(function() {
    $("#" + ControlDescription)
      .autocomplete({
        source: Url,
        dataType: "json",
        minLength: 2,
        focus: function() {
          return false;
        },
        open: function() {
          setTimeout(function() {
            $(".ui-autocomplete").css("z-index", 99999999999999);
          }, 0);
        },
        select: function(event, ui) {
          var obj = ui.item;
          $("#" + ControlId).val(obj.value);
          $("#" + ControlDescription).val(obj.label);
          return false;
        },
        change: function(event, ui) {
          if (!ui.item) {
            $("#" + ControlId).val(null);
            $("#" + ControlDescription).val(null);
          }
          return false;
        }
      })
      .css("z-index", zindex);
  });
}

var dial;

/**
 * Exibe uma modal que abre a URL especificada
 * @param {Boolean} pModal pModal
 * @param {Boolean} pResizable pResizable
 * @param {String} pTitle pTitle
 * @param {String} pURL pURL
 * @param {String} pDivID Div que vai receber a modal
 * @param {Number} pWidth pWidth
 * @param {Number} pHeight pHeight
 * @param {String} pFrameID Id que será colocado no iframe
 * @param {Function} [closeFunction] Função que será executada depois de fechar a modal
 */
function ShowDialog(
  pModal,
  pResizable,
  pTitle,
  pURL,
  pDivID,
  pWidth,
  pHeight,
  pFrameID,
  closeFunction
) {
  $(function() {
    dial = $("#" + pDivID).dialog({
      modal: pModal,
      resizable: pResizable,
      autoOpen: false,
      show: "clip",
      hide: "clip",
      title: pTitle,
      width: pWidth,
      height: pHeight,
      close: closeFunction,
      position: { my: "center", at: "center", of: window },
      closeOnEscape: true,
      open: function(event, ui) {
        $(this).css({ "max-height": 500, "overflow-y": "auto" });
      }
    });

    dial.dialog("open");

    return dial;
  });

  ShowPageLoading();

  try {
    addURL(pDivID, pURL, pWidth, pHeight, pFrameID);
  } catch (err) {
    console.error(err);
  }
}

function addURL(pID, pUrl, pWidth, pHeight, frameID) {
  var varWidth = pWidth - 35;
  var varHeight = pHeight - 75;

  $("#" + pID).html(
    "<center><iframe id='" +
      frameID +
      "' name='" +
      frameID +
      "' src='" +
      pUrl +
      "' frameBorder='no' width='100%' height='" +
      varHeight +
      "' allowtransparency='true' scrolling='none'></iframe></center>"
  );
}

function ValidaPeriodo(idPeriodoIni, idPeriodoFim, Mensagem) {
  $("#" + idPeriodoFim).on("focusout", function() {
    var dataInicio = $("#" + idPeriodoIni).val();

    if ($("#" + idPeriodoFim).val() === "") {
      if (dataInicio !== "") {
        $("#" + idPeriodoFim).val(dataInicio);
      }
    }

    // splitData[0] = Dia; splitData[1]: mês; splitData[2] = ano
    var splitData = dataInicio.split("/");
    var dataMin = new Date(splitData[2], splitData[1] - 1, splitData[0]);

    var splitDataFim = $("#" + idPeriodoFim)
      .val()
      .split("/");
    var dataFim = new Date(
      splitDataFim[2],
      splitDataFim[1] - 1,
      splitDataFim[0]
    );

    if (dataFim.valueOf() < dataMin.valueOf()) {
      Notificar("Atenção", Mensagem, "warning");
      $("#" + idPeriodoFim).val("");
    }
  });

  $("#" + idPeriodoIni).on("focusout", function() {
    var dataInicio = $("#" + idPeriodoIni).val();

    if ($("#" + idPeriodoFim).val() !== "") {
      // splitData[0] = Dia; splitData[1]: mês; splitData[2] = ano
      var splitData = dataInicio.split("/");
      var dataMin = new Date(splitData[2], splitData[1] - 1, splitData[0]);

      var splitDataFim = $("#" + idPeriodoFim)
        .val()
        .split("/");
      var dataFim = new Date(
        splitDataFim[2],
        splitDataFim[1] - 1,
        splitDataFim[0]
      );

      if (dataFim.valueOf() < dataMin.valueOf()) {
        Notificar("Atenção", Mensagem, "warning");
        $("#" + idPeriodoFim).val("");
      }
    }
  });
}

$(".readonly").attr("tabindex", "-1");

function AddAba(url, title, id = "undefined") {
  parent.addTabs({
    id: id,
    title: title,
    close: true,
    url: url,
    urlType: "absolute"
  });
}

async function AddSelect(
  pControle,
  pUrl,
  pPaginacaoRegistros,
  pIdAvo,
  pIdPai,
  pId,
  pPlaceholder,
  pDisabled = true,
  pAfterSelect,
  pUsuario,
  pCod_area
) {
  return await GetComboSelect({
    controle: pControle,
    url: pUrl,
    paginacaoRegistros: pPaginacaoRegistros,
    idAvo: pIdAvo,
    idPai: pIdPai,
    id: pId,
    placeholder: pPlaceholder,
    disabled: pDisabled,
    afterSelect: pAfterSelect,
    usuario: pUsuario,
    cod_area: pCod_area
  });
}

/**
 * Adiciona o select2 em um select normal
 
 */
function GetComboSelect(settings) {
  /*controle,
  url,
  paginacaoRegistros,
  idAvo,
  idPai,
  id,
  placeholder,
  disabled = true,
  afterSelect,
  usuario,
  cod_area,
  afterResults,
  processResults*/

  return new Promise(async function(resolve, reject) {
    $("#" + settings.controle)
      .html("")
      .select2({ data: [] });

    await $("#" + settings.controle).select2({
      ajax: {
        url: settings.url,
        type: "post",
        dataType: "json",
        delay: 250,
        data: function(params) {
          return {
            idavo: settings.idAvo,
            idpai: settings.idPai,
            q: params.term || "",
            page_limit: settings.paginacaoRegistros,
            page: params.page || 1,
            soativos: true,
            id_usuario: settings.usuario,
            cod_area: settings.cod_area
          };
        },
        processResults: function(data, params) {
          params.page = params.page || 1;

          if (
            typeof settings.processResults !== "undefined" &&
            settings.processResults !== null
          ) {
            let result = settings.processResults(data, params);
            if (result) return result;
          }

          return {
            results: data.results,
            pagination: {
              more: params.page * settings.paginacaoRegistros < data.total_count
            }
          };
        },
        results: function(data, page) {
          var more = page * settings.paginacaoRegistros < data.total_count; // whether or not there are more results available

          if (
            typeof settings.afterResults !== "undefined" &&
            settings.afterResults !== null
          ) {
            let result = settings.afterResults(data, page);
            if (result) return result;
          }

          // notice we return the value of more so Select2 knows if more results can be loaded
          return { results: data.items, more: more };
        },
        cache: true
      },
      dropdownAutoWidth: true,
      minimumInputLength: 0,
      allowClear: true,
      placeholder: settings.placeholder,
      templateResult: function(data) {
        // Inclui ícones para os optgroup
        if (data.id_Grupo) return `${data.id_Grupo} - ${data.text}`;
        else return data.text;
      },
      escapeMarkup: function(m) {
        return m;
      },
      width: "100%"
    });

    var controleSelect = $("#" + settings.controle);

    if (settings.id) {
      await $.ajax({
        type: "post",
        dataType: "json",
        url: settings.url,
        data: {
          idavo: settings.idAvo,
          idpai: settings.idPai,
          id: settings.id,
          id_usuario: settings.usuario,
          cod_area: settings.cod_area
        }
      })
        .then(function(data) {
          if (data.results.length > 0) {
            data = data.results[0];

            // create the option and append to Select2
            var option = new Option(data.text, data.id, true, true);
            controleSelect.append(option).trigger("change");

            if (
              typeof settings.afterSelect !== "undefined" &&
              settings.afterSelect !== null
            ) {
              settings.afterSelect();
            }

            // manually trigger the `select2:select` event
            controleSelect.trigger({
              type: "select2:select",
              params: { data: data }
            });

            if (settings.disabled) DisableSelect(settings.controle);
          }

          resolve();
        })
        .always(function() {
          if (
            typeof settings.afterSelect !== "undefined" &&
            settings.afterSelect !== null
          ) {
            settings.afterSelect();
          }

          if (settings.disabled) DisableSelect(settings.controle);
        });
    } else {
      //Caso não informado Id
      if (
        typeof settings.afterSelect !== "undefined" &&
        settings.afterSelect !== null
      ) {
        settings.afterSelect();
      }

      if (settings.disabled) DisableSelect(settings.controle);
      resolve();
    }
  });
}

/**
 * Adiciona o select2 sem paginação
 * @param {String} controle Id do elemento select (sem o #)
 * @param {String} url Caminho do GetCombo
 * @param {Number} [idAvo] Valor do avô desse select2
 * @param {Number} [idPai] Valor do pai desse select2
 * @param {Number} [id] Valor do select2 caso já venha preenchido
 * @param {String} placeholder placeholder
 * @param {Boolean} [disabled=true] Define se o select2 deve estar desabilitado
 * @param {Function} [afterSelect] Função a ser executada toda vez que o valor do select2 é alterado
 * @param {String} [usuario] Id do usuário para filtrar os resultados
 * @param {String} [cod_area] Código do recurso para checar se o usuário possui acesso
 */
async function AddSelectSemPag(
  controle,
  url,
  idAvo,
  idPai,
  id,
  placeholder,
  disabled = true,
  afterSelect,
  usuario,
  cod_area
) {
  return new Promise(async function(resolve, reject) {
    $("#" + controle)
      .html("")
      .select2({ data: [] });
    await $("#" + controle).select2({
      ajax: {
        url: url,
        type: "post",
        dataType: "json",
        delay: 250,
        data: function(params) {
          return {
            idavo: idAvo,
            idpai: idPai,
            q: params.term || "",
            soativos: true,
            id_usuario: usuario,
            cod_area: cod_area
          };
        },
        processResults: function(data) {
          return {
            results: data.results
          };
        },
        results: function(data) {
          return { results: data.items };
        },
        cache: true
      },
      dropdownAutoWidth: true,
      minimumInputLength: 0,
      allowClear: true,
      placeholder: placeholder,
      templateResult: function(data) {
        // Inclui ícones para os optgroup
        if (data.id_Grupo)
          //return $(`<span><i class="fas fa-users"></i> ${data.id_Grupo} - ${data.text}</span>`)
          return `${data.text}`;
        else return data.text;
      },
      escapeMarkup: function(m) {
        return m;
      },
      width: "100%"
    });

    var controleSelect = $("#" + controle);

    if (id) {
      await $.ajax({
        type: "post",
        dataType: "json",
        url: url,
        data: {
          idavo: idAvo,
          idpai: idPai,
          id: id,
          id_usuario: usuario,
          cod_area: cod_area
        }
      })
        .then(function(data) {
          if (data.results.length > 0) {
            data = data.results[0];

            // create the option and append to Select2
            var option = new Option(
              data.children[0].text,
              data.children[0].id,
              true,
              true
            );
            controleSelect.append(option).trigger("change");

            if (typeof afterSelect !== "undefined" && afterSelect !== null) {
              afterSelect();
            }

            // manually trigger the `select2:select` event
            controleSelect.trigger({
              type: "select2:select",
              params: {
                data: data
              }
            });

            if (disabled) DisableSelect(controle);
          }

          resolve();
        })
        .always(function() {
          if (typeof afterSelect !== "undefined" && afterSelect !== null) {
            afterSelect();
          }
          if (disabled) DisableSelect(controle);
        });
    } else {
      //Caso não informado Id
      if (typeof afterSelect !== "undefined" && afterSelect !== null) {
        afterSelect();
      }
      if (disabled) DisableSelect(controle);

      resolve();
    }
  });
}

function AddSelectLimpo(controle) {
  return new Promise(async function(resolve, reject) {
    $("#" + controle)
      .html("")
      .select2({ data: [] });

    await $("#" + controle).select2({
      dropdownAutoWidth: true,
      minimumInputLength: 0,
      allowClear: true,
      placeholder: "Selecione",
      escapeMarkup: function(m) {
        return m;
      },
      width: "100%"
    });

    resolve();
  });
}

async function DisableSelect(Id) {
  new Promise(function(resolve, reject) {
    if (!$("#" + Id).hasClass("select2-hidden-accessible")) AddSelectLimpo(Id);

    $("#" + Id)
      .parent()
      .children("span")
      .addClass("readonly");

    resolve();
  });
}

/**
 * Só funciona se estiver com addselect atribuido
 * @param {any} Id Id do Controle
 */
function EnableSelect(Id) {
  $("#" + Id)
    .parent()
    .children("span")
    .removeClass("readonly");
  //$('#' + Id).select2('enable');
}

/**
 * Transforma um número para uma string com o formato brasileiro
 * @param {Number} valor valor
 * @return {valorFormatado} valor formatado
 */
function floatParaString(valor) {
  var valorArredondado = valor.toFixed(2).toString();
  var valorFormatado = valorArredondado.replace(".", ",");

  return valorFormatado;
}

/**
 * Transforma uma string em um número com o formato aceito pelo Javascript
 * @param {String} valor valor
 * @return {valorFloat} valor em float
 */
function stringParaFloat(valor) {
  var valorFormatado = valor.replace(",", ".");
  var valorFloat = parseFloat(valorFormatado);

  return valorFloat;
}

function CalculaTotalColunaDataTable(
  rows,
  colunas,
  group,
  columns_length,
  level
) {
  //settings, api, colunas,coluna_grupo

  if (!group) group = "Sem Grupo";

  var retorno = {
    string_append: "",
    array_colunas_calculadas: []
  };

  var valores = [];

  colunas.forEach(function(item, index) {
    var sum = rows
      .data()
      .pluck(item.nome)
      .reduce(function(a, b) {
        return item.funcao_principal(a, b);
      }, 0);

    var obj = {
      valor: sum,
      index_coluna: item.index_coluna,
      cor: item.funcao_cor,
      lista_coluna_alteracao: item.lista_coluna_alteracao,
      classNameList: item.classNameList
    };

    valores.push(obj);
  });

  var valores_ordenados_coluna = valores.sort(
    (a, b) => a.index_coluna - b.index_coluna
  );
  retorno.array_colunas_calculadas = valores_ordenados_coluna;

  retorno.string_append = tituloRowGroup(group, level);

  if (retorno.string_append) {
    for (let j = 0; j < valores_ordenados_coluna.length; j++) {
      var classes_css = "";

      valores_ordenados_coluna[j].classNameList.forEach(function(item) {
        classes_css += item;
      });

      var obj_coluna = valores_ordenados_coluna[j];
      let cor = obj_coluna.cor ? obj_coluna.cor(obj_coluna.valor) : "#5f5f5f";

      retorno.string_append += preencheColunasAnteriores(valores, j);
      retorno.string_append += `<td data_column=${
        obj_coluna.index_coluna
      } style="color:${cor};" class="${classes_css}" colspan="1"><label class="${classes_css}">${
        obj_coluna.valor
      }</label></td>`;
    }

    if (valores_ordenados_coluna.length !== 0) {
      retorno.string_append += preencheColunasRestantes(
        valores,
        columns_length
      );
    } else {
      for (let i = 1; i < columns_length; i++) {
        retorno.string_append += "<td></td>";
      }
    }
  }

  return retorno;
}

function tituloRowGroup(group, level) {
  if (typeof group === "function") {
    if (level === 1)
      return `<td style="padding-left: 25px;" colspan="1">${group()}</td>`;
    else if (level === 2)
      return `<td style="padding-left: 50px;" colspan="1">${group()}</td>`;
    else return `<td style="font-size: 12px;" colspan="1">${group()}</td>`;
  } else {
    if (level === 1) {
      if (group === "Sem Grupo") {
        return "";
      } else {
        return `<td style="padding-left: 25px;" colspan="1">${group}</td>`;
      }
    } else if (level === 2) {
      if (group === "Sem Grupo") {
        return "";
      } else {
        return `<td style="padding-left: 50px;" colspan="1">${group}</td>`;
      }
    } else {
      return `<td style="font-size: 12px;" colspan="1">${group}</td>`;
    }
  }
}

var funcao_soma_dinero = (a, b) => {
  a = RemoverMaskModeny(a);
  b = RemoverMaskModeny(b);

  if (isNaN(a)) a = 0;
  if (isNaN(b)) b = 0;

  var dinero_result = Dinero({ amount: Number(a), currency: "BRL" }).add(
    Dinero({ amount: Number(b), currency: "BRL" })
  );
  return dinero_result.setLocale("pt-BR").toFormat("$0,0.00");
};

function AtualizaLinhasTabela(lista_coluna_rowgroup, html_linhas) {
  for (var i = 0; i < html_linhas.length; i++) {
    var linha = html_linhas[i];
    var colunas = linha.children;

    lista_coluna_rowgroup.map(function(p) {
      p.lista_coluna_alteracao.forEach(function(item) {
        var valor_base = colunas[p.index_coluna].innerHTML;
        colunas[item.index_coluna].innerHTML = item.funcao_alteracao(
          valor_base,
          p.valor
        );
      });
    });
  }
}

function ColunaAlteracao(nome, index_coluna, funcao_alteracao) {
  let obj_colunaAlteracao = {
    nome: nome,
    index_coluna: index_coluna,
    funcao_alteracao
  };
  return obj_colunaAlteracao;
}

function ColunaRowGroup(
  nome,
  index_coluna,
  titulo,
  valor_total,
  funcao_principal,
  funcao_cor,
  lista_coluna_alteracao,
  classNameList
) {
  let obj_colunaRowGroup = {
    nome: nome,
    index_coluna: index_coluna,
    titulo: titulo,
    funcao_principal: funcao_principal,
    funcao_cor: funcao_cor,
    valor_total: valor_total ? valor_total : 0,
    lista_coluna_alteracao: lista_coluna_alteracao
      ? lista_coluna_alteracao
      : [],
    classNameList: classNameList ? classNameList : []
  };
  return obj_colunaRowGroup;
}

var funcao_porcentagem = function(valor, valor_total) {
  valor = RemoverMaskModeny(valor);
  valor_total = RemoverMaskModeny(valor_total);
  var porcentagem = (Number(valor) / Number(valor_total) * 100).toFixed(2);
  porcentagem = RemoverMaskModeny(porcentagem);

  porcentagem = porcentagem.replace(".", "");

  if (isNaN(porcentagem)) porcentagem = 0;

  var dinero = Dinero({ amount: Number(porcentagem) }).toFormat("0.00");
  return dinero + "%";
};

function preencheColunasAnteriores(lista_coluna_rowgroup, index_atual) {
  var html_tds = "";
  quantidade_tds = 0;
  if (index_atual === 0) {
    var elemento_atual = lista_coluna_rowgroup[index_atual];
    var quantidade_tds = elemento_atual.index_coluna - 1;
  } else {
    var elemento_anterior = lista_coluna_rowgroup[index_atual - 1];
    elemento_atual = lista_coluna_rowgroup[index_atual];
    quantidade_tds =
      elemento_atual.index_coluna - elemento_anterior.index_coluna - 1;
  }

  for (var i = 0; i < quantidade_tds; i++) {
    html_tds += "<td></td>";
  }

  return html_tds;
}

function preencheColunasRestantes(lista_coluna_rowgroup, total_colunas) {
  var html_tds = "";
  var index_ultima =
    lista_coluna_rowgroup[lista_coluna_rowgroup.length - 1].index_coluna;
  var colunas_restantes = total_colunas - 1 - index_ultima;
  for (var i = 0; i < colunas_restantes; i++) {
    html_tds += "<td></td>";
  }

  return html_tds;
}

//Dinero
function RemoverMaskModeny(valor) {
  let retorno = "0";

  if (!valor) retorno;
  else if (typeof valor === "number") {
    if (!valor.toString().includes(".")) retorno = valor.toString() + "00";
    else
      retorno = valor
        .toString()
        .replace(",", "")
        .replace(".", "")
        .replace("R$ ", "")
        .replace("R$", "")
        .replace(" ", "")
        .replace(".", "")
        .replace(/\s/g, "");
  } else
    retorno = valor
      .toString()
      .replace(",", "")
      .replace(".", "")
      .replace("R$ ", "")
      .replace("R$", "")
      .replace(" ", "")
      .replace(".", "")
      .replace(/\s/g, "");

  return retorno;
}

function FormatDinero(valor) {
  if (valor === undefined) return "0,00";
  else
    return Dinero({ amount: Number(RemoverMaskModeny(valor)) })
      .setLocale("pt-br")
      .toFormat("0,0.00");
}

function Somar(valor1, valor2, precision = 2) {
  return Dinero({
    amount: Number(RemoverMaskModeny(valor1)),
    precision: precision
  })
    .add(
      Dinero({
        amount: Number(RemoverMaskModeny(valor2)),
        precision: precision
      })
    )
    .setLocale("pt-BR")
    .toFormat("0,0.00");
}

function Subtrair(valor1, valor2, precision = 2) {
  return Dinero({
    amount: Number(RemoverMaskModeny(valor1)),
    precision: precision
  })
    .subtract(
      Dinero({
        amount: Number(RemoverMaskModeny(valor2)),
        precision: precision
      })
    )
    .setLocale("pt-BR")
    .toFormat("0,0.00");
}

function Multiplicar(valor1, valor2, precision = 2) {
  return Dinero({
    amount: Number(RemoverMaskModeny(valor1)),
    precision: precision
  })
    .multiply(
      parseFloat(
        Dinero({
          amount: Number(RemoverMaskModeny(valor2)),
          precision: precision
        }).toFormat("0.00")
      )
    )
    .setLocale("pt-BR")
    .toFormat("0,0.00");
}

function Dividir(valor1, valor2, precision = 2) {
  return Dinero({
    amount: Number(RemoverMaskModeny(valor1)),
    precision: precision
  })
    .divide(
      parseFloat(
        Dinero({
          amount: Number(RemoverMaskModeny(valor2)),
          precision: precision
        }).toFormat("0.00")
      )
    )
    .setLocale("pt-BR")
    .toFormat("0,0.00");
}

function Percentagem(valor1, percentagem, precision = 2) {
  return Dinero({
    amount: Number(RemoverMaskModeny(valor1)),
    precision: precision
  })
    .percentage(
      parseFloat(
        Dinero({
          amount: Number(RemoverMaskModeny(percentagem)),
          precision: precision
        }).toFormat("0.00")
      )
    )
    .setLocale("pt-BR")
    .toFormat("0,0.00");
}

function Igual(valor1, valor2, precision = 2) {
  return Dinero({
    amount: Number(RemoverMaskModeny(valor1)),
    precision: precision
  }).equalsTo(
    Dinero({ amount: Number(RemoverMaskModeny(valor2)), precision: precision })
  );
}

function Maior(valor1, valor2, precision = 2) {
  return Dinero({
    amount: Number(RemoverMaskModeny(valor1)),
    precision: precision
  }).greaterThan(
    Dinero({ amount: Number(RemoverMaskModeny(valor2)), precision: precision })
  );
}

function MaiorOuIgual(valor1, valor2, precision = 2) {
  return Dinero({
    amount: Number(RemoverMaskModeny(valor1)),
    precision: precision
  }).greaterThanOrEqual(
    Dinero({ amount: Number(RemoverMaskModeny(valor2)), precision: precision })
  );
}

function Menor(valor1, valor2, precision = 2) {
  return Dinero({
    amount: Number(RemoverMaskModeny(valor1)),
    precision: precision
  }).lessThan(
    Dinero({ amount: Number(RemoverMaskModeny(valor2)), precision: precision })
  );
}

/**
 * @param {string} classeObrigatoria classes que identificam os campos obrigatórios
 * @param {boolean} erro erro
 * @return {erro} retorno boolean
 */
function ValidaObrigatoriosPorClasse(classeObrigatoria, erro) {
  $(".select2-selection").addClass("outlineNone");

  for (let obrigatorio of $("." + classeObrigatoria)) {
    $(".select2-container").focus();
    if (!$(obrigatorio).val()) {
      erro = true;

      $(obrigatorio).keyup(function() {
        if ($(obrigatorio).val()) {
          let msg_erro = $(obrigatorio)
            .parent()
            .children(".invalid-feedback");
          msg_erro.remove();
          $(obrigatorio).removeClass("is-invalid");
          $(obrigatorio).addClass("is-valid");
        }
      });

      $(obrigatorio).change(function() {
        if ($(obrigatorio).val()) {
          let msg_erro = $(obrigatorio)
            .parent()
            .children(".invalid-feedback");
          msg_erro.remove();
          $(obrigatorio).removeClass("is-invalid");
          $(obrigatorio).addClass("is-valid");
        }
      });

      let msg_erro = $(obrigatorio)
        .parent()
        .children(".invalid-feedback");
      msg_erro.remove();

      if ($(obrigatorio).hasClass("datepicker")) {
        let datepickerIcon = $(obrigatorio)
          .parent()
          .children("a");

        $(datepickerIcon).after(`<div class="invalid-feedback">
                                                              Preenchimento obrigatório.
                                                        </div>`);
      } else if (
        typeof $(obrigatorio).attr("data-select2-id") !== typeof undefined
      ) {
        let id_elem = $(obrigatorio).attr("id");
        let elem_select2 = $(obrigatorio)
          .parent()
          .children(".select2");
        let elem_focus = $(`#select2-${id_elem}-container`).parent();

        $(`#${id_elem}`).on("select2:select select2:unselecting", function(e) {
          if ($(obrigatorio).val()) {
            let msg_erro = $(obrigatorio)
              .parent()
              .children(".invalid-feedback");
            msg_erro.remove();
            $(`#select2-${id_elem}-container`).removeClass(
              "select2-is-invalid"
            );
            $(elem_focus).removeClass("select2-obrigatorio-focus");
            $(`#select2-${id_elem}-container`).addClass("select2-is-valid");
            $(elem_focus).addClass("select2-obrigatorio-focus-valid");
          }
        });

        $(`#select2-${id_elem}-container`).addClass("select2-is-invalid");

        $(elem_focus).addClass("select2-obrigatorio-focus");

        $(elem_select2).after(`<div class="invalid-feedback">
                                                            Preenchimento obrigatório.
                                                      </div>`);
      } else {
        $(obrigatorio).after(`<div class="invalid-feedback">
                                                            Preenchimento obrigatório.
                                                      </div>`);
      }

      $(obrigatorio).addClass("is-invalid");
    } else {
      if (typeof $(obrigatorio).attr("data-select2-id") !== typeof undefined) {
        let id_elem = $(obrigatorio).attr("id");
        let elem_msg_erro = $(obrigatorio)
          .parent()
          .children(".invalid-feedback");

        $(`#select2-${id_elem}-container`).removeClass("select2-is-invalid");
        $(elem_msg_erro).remove();
      } else {
        $(obrigatorio).removeClass("is-invalid");
        let msg_erro = $(obrigatorio)
          .parent()
          .children(".invalid-feedback");
        msg_erro.remove();
      }

      //$(obrigatorio).closest('.invalid-feedback').remove()
    }
  }

  return erro;
}

function ValidaCamposObrigatorios(erro) {
  $(".select2-selection").addClass("outlineNone");

  for (let obrigatorio of $(".obrigatorio")) {
    $(".select2-container").focus();
    if (!$(obrigatorio).val()) {
      erro = true;

      $(obrigatorio).keyup(function() {
        if ($(obrigatorio).val()) {
          let msg_erro = $(obrigatorio)
            .parent()
            .children(".invalid-feedback");
          msg_erro.remove();
          $(obrigatorio).removeClass("is-invalid");
          $(obrigatorio).addClass("is-valid");
        }
      });

      $(obrigatorio).change(function() {
        if ($(obrigatorio).val()) {
          let msg_erro = $(obrigatorio)
            .parent()
            .children(".invalid-feedback");
          msg_erro.remove();
          $(obrigatorio).removeClass("is-invalid");
          $(obrigatorio).addClass("is-valid");
        }
      });

      let msg_erro = $(obrigatorio)
        .parent()
        .children(".invalid-feedback");
      msg_erro.remove();

      if ($(obrigatorio).hasClass("datepicker")) {
        let datepickerIcon = $(obrigatorio)
          .parent()
          .children("a");

        $(datepickerIcon).after(`<div class="invalid-feedback">
                                                              Preenchimento obrigatório.
                                                        </div>`);
      } else if (
        typeof $(obrigatorio).attr("data-select2-id") !== typeof undefined
      ) {
        let id_elem = $(obrigatorio).attr("id");
        let elem_select2 = $(obrigatorio)
          .parent()
          .children(".select2");
        let elem_focus = $(`#select2-${id_elem}-container`).parent();

        $(`#${id_elem}`).on("select2:select select2:unselecting", function(e) {
          if ($(obrigatorio).val()) {
            let msg_erro = $(obrigatorio)
              .parent()
              .children(".invalid-feedback");
            msg_erro.remove();
            $(`#select2-${id_elem}-container`).removeClass(
              "select2-is-invalid"
            );
            $(elem_focus).removeClass("select2-obrigatorio-focus");
            $(`#select2-${id_elem}-container`).addClass("select2-is-valid");
            $(elem_focus).addClass("select2-obrigatorio-focus-valid");
          }
        });

        $(`#select2-${id_elem}-container`).addClass("select2-is-invalid");

        $(elem_focus).addClass("select2-obrigatorio-focus");

        $(elem_select2).after(`<div class="invalid-feedback">
                                                            Preenchimento obrigatório.
                                                      </div>`);
      } else {
        $(obrigatorio).after(`<div class="invalid-feedback">
                                                            Preenchimento obrigatório.
                                                      </div>`);
      }

      $(obrigatorio).addClass("is-invalid");
    } else {
      if (typeof $(obrigatorio).attr("data-select2-id") !== typeof undefined) {
        let id_elem = $(obrigatorio).attr("id");
        let elem_msg_erro = $(obrigatorio)
          .parent()
          .children(".invalid-feedback");

        $(`#select2-${id_elem}-container`).removeClass("select2-is-invalid");
        $(elem_msg_erro).remove();
      } else {
        $(obrigatorio).removeClass("is-invalid");
        let msg_erro = $(obrigatorio)
          .parent()
          .children(".invalid-feedback");
        msg_erro.remove();
      }

      //$(obrigatorio).closest('.invalid-feedback').remove()
    }
  }

  return erro;
}

function ValidaCampoIP(ip, ip_id) {
  let container = $($("#" + ip_id).children()[0]);
  let itens = $(
    $("#" + ip_id)
      .children()
      .children()
      .toArray()
      .filter(p => $(p).hasClass("ip-input-item"))
  );

  itens.keyup(function() {
    if (ip.getIp() === undefined) {
      container.removeClass("is-valid");
      container.addClass("is-invalid");
    } else if (
      !ip.validate(ip.getIp()) ||
      ip.getIp() === "" ||
      ip.getIp() === "0.0.0.0" ||
      ip.getIp() === "255.255.255.255"
    ) {
      container.removeClass("is-valid");
      container.addClass("is-invalid");
    } else {
      container.removeClass("is-invalid");
      container.addClass("is-valid");
    }
  });
  let msg_erro = container.parent().children(".invalid-feedback");
  msg_erro.remove();
  if (ip.getIp() === undefined) {
    container.removeClass("is-valid");
    container.addClass("is-invalid");
    container.after(`<div class="invalid-feedback">
                                                 Preenchimento obrigatório.
                                             </div>`);

    return true;
  } else if (
    !ip.validate(ip.getIp()) ||
    ip.getIp() === "" ||
    ip.getIp() === "0.0.0.0" ||
    ip.getIp() === "255.255.255.255"
  ) {
    container.removeClass("is-valid");
    container.addClass("is-invalid");
    container.after(`<div class="invalid-feedback">
                                                 Preenchimento obrigatório.
                                             </div>`);

    return true;
  } else {
    container.removeClass("is-invalid");
    container.addClass("is-valid");
    return false;
  }
}

/**
 *
 * @param {String} divTagFilter div que recebera o filtros
 * @param {Object} filter_state objeto que contem valores
 * @param {any} legenda legenda
 * @return {void}
 */
async function TagFilter(divTagFilter, filter_state, legenda) {
  $("#" + divTagFilter).html("");

  let keys = Object.keys(filter_state);
  if (legenda) {
    let firstDisplay = true;
    const legendaStyle = `<span class="fs-12 mt-1">${legenda}</span>`;

    for (let key of keys) {
      const display = (filter_state[key].display = filter_state[
        key
      ].getDisplay());
      let removabletag =
        filter_state[key].removable === undefined ||
        filter_state[key].removable === true
          ? "removable-tag"
          : "";

      if (typeof filter_state[key].customChip === "function") {
        let chip = filter_state[key].customChip();

        if (chip) {
          if (firstDisplay) {
            chip = legendaStyle + chip;
            firstDisplay = false;
          }

          $("#" + divTagFilter).html($("#" + divTagFilter).html() + chip);

          $(".removable-tag").click(function(e) {
            $(this).remove();
            //ResizeTable("divTable");
          });

          $(".tag").click(function(e) {
            filter_state[$(this).attr("key")].onclick();
          });
        }
      } else {
        if (display) {
          let label = filter_state[key].label;

          if (filter_state[key].getDisplay() && label) label += ":";

          let chip = `<a class="tag mr-2 mt-1 ml-1 ${removabletag} text-truncate" href="#" key="${key}"> ${label} ${display} </a>`;

          if (firstDisplay) {
            chip = legendaStyle + chip;
            firstDisplay = false;
          }

          $("#" + divTagFilter).html($("#" + divTagFilter).html() + chip);

          $(".removable-tag").click(function(e) {
            $(this).remove();
            //ResizeTable("divTable");
          });

          $(".tag").click(function(e) {
            filter_state[$(this).attr("key")].onclick();
          });
        }
      }
    }
  } else {
    for (let key of keys) {
      const display = (filter_state[key].display = filter_state[
        key
      ].getDisplay());
      let removabletag =
        filter_state[key].removable === undefined ||
        filter_state[key].removable === true
          ? "removable-tag"
          : "";

      if (display) {
        let label = (filter_state[key].display = filter_state[key].label);

        if (label) label += " :";

        const chip = `<a class="tag ${removabletag} mr-1 ml-1 text-truncate" href="#" key="${key}">${label} ${display} </a>`;
        $("#" + divTagFilter).html($("#" + divTagFilter).html() + chip);

        $(".removable-tag").click(function(e) {
          $(this).remove();
          //ResizeTable("divTable");
        });

        $(".tag").click(function(e) {
          filter_state[$(this).attr("key")].onclick();
        });
      }
    }
  }
  //ResizeTable("divTable");
}

/**
 * Classe para extrair as horas de objetos Date
 */
const HourFormatter = new Intl.DateTimeFormat("pt-BR", {
  hour: "numeric",
  minute: "numeric"
});

/**
 * Classe para extrair uma string da data de objetos Date
 */
const DateFormatter = new Intl.DateTimeFormat("pt-BR");

function OrdenarUls() {
  $("ul").each(function(index) {
    var mylist = $(this);
    var listitems = mylist.children("li").get();
    listitems.sort(function(a, b) {
      return $(a)
        .text()
        .replace(/\s/g, "")
        .toUpperCase()
        .localeCompare(
          $(b)
            .text()
            .replace(/\s/g, "")
            .toUpperCase()
        );
    });
    $.each(listitems, function(idx, itm) {
      mylist.append(itm);
    });
  });
}

const removeSeconds = hour => Math.trunc(hour * 60) / 60;
const roundNumber = (number, precision) =>
  Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision);
