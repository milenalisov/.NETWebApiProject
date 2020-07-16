$(document).ready(function () {

    var host = window.location.host;
    var token = null;
    var headers = {};
    var kosarkasiEndPoint = "/api/kosarkasi/";
    var kluboviEndPoint = "/api/klubovi/";
    var editingId;
    var pretraga;

    loadingKosarkasi();

    function loadingKosarkasi() {
        $.getJSON("http://" + host + kosarkasiEndPoint, setKosarkasi);
    }

    $("body").on("click", "#btnDelete", deleteKosarkas);
    $("body").on("click", "#btnEdit", editKosarkas);
    function setKosarkasi(data, status) {
        var container = $("#dataKosarkasi");
        container.empty();
        if (status == "success") {
            var div = $("<div></div>");
            var table = $("<table class=table table-bordered></table>");
            var header;
            if (pretraga == 1 && token) {
                header = $("<thead><tr><th>Ime i prezime</th><th>Rodjenje</th><th>Klub</th><th>Utakmice</th><th>Poeni</th><th>Brisanje</th></tr></thead>");
            }
            else if (token) {
                header = $("<thead><tr><th>Ime i prezime</th><th>Rodjenje</th><th>Klub</th><th>Utakmice</th><th>Poeni</th><th>Brisanje</th><th>Izmena</th></tr></thead>");
            } else {
                header = $("<thead><tr><th>Ime i prezime</th><th>Rodjenje</th><th>Klub</th><th>Utakmice</th><th>Poeni</th></tr></thead>");
            }
            table.append(header);
            var tbody = $("<tbody></tbody>");
            for (i = 0; i < data.length; i++) {
                var row = "<tr>";
                var sadrzaj = "<td>" + data[i].ImeIPrezime + "</td><td>" + data[i].Godina + "</td><td>" + data[i].Klub.Naziv + "</td><td>" + data[i].BrojUtakmica + "</td><td>" + data[i].BrojPoena + "</td>";
                var stringId = data[i].Id.toString();
                var content = "<td><button class='btn btn-link' id=btnDelete name=" + stringId + ">Obrisi</button></td>";
                var content1 = "<td><button class='btn btn-link' id=btnEdit name=" + stringId + ">Izmeni</button></td>";
                if (pretraga == 1 && token) {
                    row += sadrzaj + content + "</tr>";
                }
                else if (token) {
                    row += sadrzaj + content + content1 + "</tr>";
                } else {
                    row += sadrzaj + "</tr>";
                }
                tbody.append(row);

            }
            table.append(tbody);
            div.append(table);
            container.append(div);
            pretraga = 0;
        } else {
            var divV = $("<div></div>");
            var hV = $("<h1>Greska prilikom ucitavanja kosarkasa!</h1>");
            divV.append(hV);
            container.append(div);
        }
    }

    $("#regIPri").click(function () {
        $("#zaRegIPri").css("display", "block");
        $("#divInfo1").css("display", "block");
        $("#divInfo").css("display", "none");

    });

    $("#registracija").click(function () {

        var email = $("#user").val();
        var loz = $("#loz").val();

        var dataSent = {
            "Email": email,
            "Password": loz,
            "ConfirmPassword": loz
        };

        $.ajax({
            url: "http://" + host + "/api/Account/Register",
            type: "POST",
            data: dataSent
        }).done(function (data, status) {
            $("#uspesno").css("display", "block");
            refreshForma();
        }).fail(function (data, status) {
            alert("Greska prilikom registracije!");
        });

    });

    function refreshForma() {
        $("#user").val("");
        $("#loz").val("");
    }

    $("#pocetak").click(function () {
        $("#zaRegIPri").css("display", "none");
        $("#divInfo1").css("display", "none");
        $("#divInfo").css("display", "block");
        $("#uspesno").css("display", "none");

    });


    $("#prijava").click(function () {

        var email = $("#user").val();
        var loz = $("#loz").val();

        var dataSent = {
            "grant_type": "password",
            "username": email,
            "password": loz
        };

        $.ajax({
            url: "http://" + host + "/Token",
            type: "POST",
            data: dataSent
        }).done(function (data, status) {
            token = data.access_token;
            refreshForma();
            $("#divInfo2").css("display", "block");
            $("#info2").append("<b>Prijavljeni korisnik: </b>" + data.userName);
            $("#divInfo1").css("display", "none");
            $("#uspesno").css("display", "none");
            $("#zaRegIPri").css("display", "none");
            $("#divpretraga").css("display", "block");
            refreshTable();
            $("#dataKosarkasi").addClass("col-sm-8");
            $("#divpretraga").addClass("col-sm-4");

        }).fail(function (data, status) {
            alert("Greska prilikom prijave!");
        });

    });
    $("#odjava").click(function () {
        token = null;
        headers = {};
        $("#divInfo").css("display", "block");
        $("#info2").empty();
        $("#divInfo2").css("display", "none");
        $("#uspesno").css("display", "none");
        $("#divpretraga").css("display", "none");
        $("#izmenaDiv").css("display", "none");
        refreshTable();
        $("#dataKosarkasi").removeClass("col-sm-8");
        $("#divpretraga").removeClass("col-sm-4");
    });

    function deleteKosarkas() {
        var deleteId = this.name;
        if (token) {
            headers.Authorization = "Bearer " + token;
        }
        $.ajax({
            url: "http://" + host + kosarkasiEndPoint + deleteId.toString(),
            type: "DELETE",
            headers: headers

        }).done(function (data, status) {
            refreshTable();

        }).fail(function (data, status) {
            alert("Desila se greska prilikom brisanja");
        });
    }

    function refreshTable() {
        loadingKosarkasi();
    
    }
    $("#pretragaForm").submit(function (e) {
        e.preventDefault();
        var od = $("#najmanje").val();
        var dokle = $("#najvise").val();

        var validanOd = true;
        var validanDo = true;

        var validanOdnos = true;

        if (+od > 0 || +od % 1 !== 0 || isNaN(+od)) {
            validanOd = false;
        }

        if (+dokle > 0 || +dokle % 1 !== 0 || isNaN(+dokle)) {
            validanDo = false;
        }

        if (+od > +dokle)
        {
            validanOdnos = false;
        }
        if (token) {
            headers.Authorization = "Bearer " + token;
        }
        if (validanOd && validanDo && validanOdnos) {
            var dataSent = {
                "najmanje": od,
                "najvise": dokle
            };
            $.ajax({
                url: "http://" + host + "/api/pretraga",
                type: "POST",
                data: dataSent,
                headers: headers
            }).done(function (data, status) {
                pretraga = 1;
                $("#najmanje").val("");
                $("#najvise").val("");
                setKosarkasi(data, status);
            }).fail(function (data, status) {
                alert("Greska prilikom pretrage!");
                $("#najmanje").val("");
                $("#najvise").val("");
            });
        } else {
            alert("Greska prilikom pretrage!");
        }
    });

    function editKosarkas() {

        var editId = this.name;
        if (token) {
            headers.Authorization = "Bearer " + token;
        }

        $("#izmenaDiv").css("display", "block");
        loadingKlubovi();
        $.ajax({
            url: "http://" + host + kosarkasiEndPoint + editId.toString(),
            type: "GET",
            headers: headers
        }).done(function (data, status) {
            editingId = data.Id;
            $("#ime").val(data.ImeIPrezime);
            $("#rodjenje").val(data.Godina);
            $("#klub").val(data.KlubId);
            $("#utakmica").val(data.BrojUtakmica);
            $("#poeni").val(data.BrojPoena);



        }).fail(function (data, status) {
            alert("Doslo je do greske!");
        });
    }

    function loadingKlubovi() {
        $.getJSON("http://" + host + kluboviEndPoint, setKlubovi);
    }

    function setKlubovi(data, status) {
        var input = $("#klub");
        input.empty();
        if (status == "success") {

            for (i = 0; i < data.length; i++) {
                var opcija = "<option value=" + data[i].Id + ">" + data[i].Naziv + "</option>";
                input.append(opcija);
            }

        } else {
            alert("Neuspedno ucitavanje klubova!");
        }

    }

    $("#odustajanje").click(function () {
        $("#ime").val("");
        $("#rodjenje").val("");
        $("#klub").val("");
        $("#utakmica").val("");
        $("#poeni").val("");
        loadingKlubovi();
        $("#izmenaDiv").css("display", "none");
    });

    $("#izmenaForm").submit(function (e) {
        e.preventDefault();

        var ime = $("#ime").val();
        var godina = $("#rodjenje").val();
        var klub = $("#klub").val();
        var utakmica = $("#utakmica").val();
        var poeni = $("#poeni").val();

        var DataSent = {
            "Id": editingId,
            "ImeIPrezime": ime,
            "Godina": godina,
            "KlubId": klub,
            "BrojUtakmica": utakmica,
            "BrojPoena": poeni
        };

        if(token) {
                headers.Authorization = "Bearer " + token;
            }

        $.ajax({
            url: "http://" + host + kosarkasiEndPoint + editingId.toString(),
                type: "PUT",
                data: DataSent,
                headers: headers
            }).done(function (data, status) {
                refreshTable();
                $("#izmenaDiv").css("display", "none");
            }).fail(function (data, status) {
                alert("Greska prilikom izmene!");
            });
        });
});