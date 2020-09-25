$(document).ready(function () {
    KeyEnter();

    //parent.App.stopPageLoading();

});


function KeyEnter() {

    $("select").not($(":button")).keypress(function (evt) {
        if (evt.keyCode == 13) {
            iname = $(this).val();
            if (iname !== 'Submit') {
                var fields = $(this).parents('form:eq(0),body').find('button, input, textarea, select').not($(":hidden")).not($(":disabled"));
                var index = fields.index(this);
                if (index > -1 && (index + 1) < fields.length) {
                    fields.eq(index + 1).focus();
                }
                return false;
            }
        }
    });

    $("input").not($(":button")).keypress(function (evt) {
        if (evt.keyCode == 13) {
            iname = $(this).val();
            if (iname !== 'Submit') {
                var fields = $(this).parents('form:eq(0),body').find('button, input, textarea, select').not($(":hidden")).not($(":disabled"));
                var index = fields.index(this);
                if (index > -1 && (index + 1) < fields.length) {
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

        Swal.fire({
            title: 'CPF Inválido',
            text: "Informe dados válidos",
            type: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.value) {
                $('#iCPF').focus();
            }
        });

    }
}

function FormataCNPJ() {
    // O CPF ou CNPJ
    var cpf_cnpj = $(this).val();

    // Testa a validação e formata se estiver OK
    if (formata_cpf_cnpj(cpf_cnpj)) {
        $(this).val(formata_cpf_cnpj(cpf_cnpj));
    } else if (cpf_cnpj) {

        Swal.fire({
            title: 'CNPJ Inválido',
            text: "Informe dados válidos",
            type: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.value) {
                $('#iCNPJ').focus();
            }
        });
    }
}

function ValidaData() {

    var data = $(this).val();

    er = /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d$/;
    if (data.length == 10 && !er.exec(data)) {
        Swal.fire({
            title: 'Data Inválida',
            type: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.value) {
                $(this).focus();
            }
        });    
        return false;
    }

}

function GerarNota(login, senha, strMestre, strDetalhes,ids_mestre,ids_detalhes,then_function) {

    var token = "";
    var loginSyncNfe = { Login: login, Password: senha };

    $.ajax({
        type: "POST",
        data: JSON.stringify(loginSyncNfe),
        url: "https://api.syncnfe.com.br/api/Token",
        contentType: "application/json",
        error: function (data) {
            Notificar("Atenção!", data.message, "warning")
            return false
        }
    })
    .done(function (data) {
    
        try {
            token = data;
        }
        catch (err) {
            Notificar("Atenção!", data.message, "warning");
            return false
        }
    
        var NFModelo2122 = { Token: token, ArquivoMestre: [strMestre], ArquivoDetalhes: [strDetalhes] };
        $.ajax({
            type: "POST",
            data: JSON.stringify(NFModelo2122),
            url: "https://api.syncnfe.com.br/api/ImportNFModelo2122",
            contentType: "application/json",
            success: async function (data2) {
                try {

                    if (data2.Sucess === false) {


                        Notificar("Atenção!", "syncnfe erro: " + data2.message, "warning");

                        await $.ajax({
                            url: baseUrl + "/api/Nota_FiscalApi/ApagarMestreDetalhe",
                            dataType: "json",
                            type: "POST",
                            data: {
                                Ids_Arquivo_Detalhe: ids_detalhes,
                                Ids_Arquivo_Mestre: ids_mestre
                            }
                        });
                        
                        
                    }

                    else {

                        await $.ajax({
                            url: baseUrl + "/api/Nota_Fiscal_LogApi/GravarLog",
                            dataType: "json",
                            type: "POST",
                            data: {
                                Notas_Fiscais: data2.Notas.map(p => ({
                                    Sucesso: data2.Sucess,
                                    Mensagem: data2.message,

                                    Nota_Fiscal_Id_Api: p.NotaFiscalID,
                                    Num_Nota_Fiscal_Api: p.NumeroNF,
                                    Id_Nota_Fiscal_Mestre: p.ID,

                                    Url_Nota_Fiscal: p.Url
                                }))
                            }
                        })
                        Notificar("Atenção", "Notas Fiscais Geradas com sucesso", "info")
                    }

                    then_function()


                    //data2.Notas.forEach(function (item) {
                    //    window.open(item.Url, "_blank")
                    //})

                    
                }
                catch (err) {
                    Notificar("Atenção!", data2.message, "warning")
                    return false
                }
            },
            error: function () {
                Notificar("Atenção!", data.message, "warning")
                return false
            }
        });
    });
}