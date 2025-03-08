

// USER INTERFACE

function UI(){
    // HTML VAR OLANLAR BÖLÜMÜ
    //===============================================================
    // Images all section(slider section)
    this.filterbuttons=document.querySelector("#form-info");
    // card listesi
    this.ListCarsArea=document.getElementById("car-list");
    // filtremele butonu
    this.btns=document.getElementById("filterbutton");
    //===============================================================
}
function addedUI(){
    // SONRADAN VAR OLANLAR BÖLÜMÜ
    //===============================================================
    // slider geçişleri için
    this.Allimages=document.querySelectorAll("#car-card .images");
    // Filtre bölmününe model yansıtmak için
    this.AllCard=document.querySelectorAll("#car-card");
    // card arka plan rengi için yol
    this.maincards=document.querySelectorAll("#mainCard");
    //===============================================================
}
