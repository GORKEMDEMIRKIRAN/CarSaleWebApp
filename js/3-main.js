
// CAR SLIDER APP


car_list=[
    new CarCategory("BMW",2025,"black",{1:"5.20İ-1.png",2:"5.20İ-2.png",3:"5.20İ-3.png",4:"5.20İ-4.png"},"Bmw car ..."),
    new CarCategory("BmW",2024,"red",{1:"cabrio-1.png",2:"cabrio-2.png",3:"cabrio-3.png",4:"cabrio-4.png"},"Bmw cabrio ..."),
    new CarCategory("GTR",2023,"black",{1:"gtr1.png",2:"gtr2.png",3:"gtr3.png",4:"gtr4.png"},"Gtr car ...."),
    new CarCategory("HONDA",2012,"white",{1:"honda1.png",2:"honda2.png",3:"honda3.png",4:"honda4.png"},"Honda car ...."),
    new CarCategory("MERCEDES",2021,"blue",{1:"mercedes-c200-1.png",2:"mercedes-c200-2.png",3:"mercedes-c200-3.png",4:"mercedes-c200-4.png"},"Mercedes car ....")
];


//======================================================================================================================

// INTRODUCTION
document.addEventListener('DOMContentLoaded', function() {
    //===============================================================
    // Html varolan bölümleri çağırma
    const ui = new UI();
    // Ürün ismine göre filtreleme için modelleri toplama
    const modelsList=new Array();

    //Database mevcut olan modelleri döndürme
    for(let i=0; i<car_list.length;i++){
        modelsList.push(car_list[i].model); 
        model=car_list[i].model;    //Aracın modeli
        year=car_list[i].year;      //Aracın yılı
        color=car_list[i].color;    //Aracın rengi
        images=car_list[i].image;   //Aracın görseller objesi
        text=car_list[i].text;      //Aracın açıklaması
        const skeleton=createCardSceleton(); // Araç için kart yapısını oluşturma
        skeleton.children[0].appendChild(createImageSection(images));                //Card altındaki images bölümünü ekleme
        skeleton.children[0].appendChild(createBodySection(model,year,color,text));  //Card altındaki body(açıklama) bölümünü ekleme
        // Card (car-list) altına ekleme
        ui.ListCarsArea.appendChild(skeleton);
    }
    // Oluşan bölüm yollarını bağlama
    const nextui=new addedUI();
    //===============================================================
    // Modelleri teke düşürme ve "form-info" altına yazdırma
    let carModelList=new Array();
    carModelList=oneModel(modelsList);
    for(let model of carModelList){
        createFilterBtn(model,ui);
    }
    //===============================================================
    // 200 saniye boyunca görsel geçiş sağlama(Slider)
    SliderTimer(200,nextui);
    //===============================================================
    // Cards bölümüne kullanıcı etkileşimi sağlama
    const cardsection=nextui.maincards;
    for(let card of cardsection){
        card.addEventListener("mouseenter",areain);
        card.addEventListener("mouseleave",areaof);
    }
    //===============================================================
    // Filter buttons bölmününe kullanıcı etkileşimi sağlama
    const buttons=ui.filterbuttons.children;
    for(let button of buttons){
        button.addEventListener("click",filterPress);
        button.addEventListener("mouseenter",areaInside);
        button.addEventListener("mouseleave",areaOutside);
    }
    //===============================================================
    // Filter butonunu çalıştırma
    const cards=ui.ListCarsArea.children;     //Araç kartları
    const lists=ui.filterbuttons.children;    //filtre butonları
    ui.btns.addEventListener("click",function(e){
        e.preventDefault();
        filterAction(lists,cards);
    });
    //===============================================================

});


//======================================================================================================================

// FILTRE BUTON ACTION
function filterAction(lists,cards){
    for(let list of lists){
        const state=list.children[0].checked;
        const list_str=list.children[1].textContent;
        if(state==false){
            for(let card of cards){
                const title=card.querySelector(".title");
                const card_str=title.textContent.split(" ")[0].toUpperCase();
                if(card_str==list_str){
                    card.classList.add("d-none");
                }
            }
        }else{
            for(let card of cards){
                const title=card.querySelector(".title");
                const card_str=title.textContent.split(" ")[0].toUpperCase();
                if(card_str==list_str){
                    card.classList.remove("d-none");
                }
            }
        }
    }
}

function areain(e){
    e.preventDefault();
    const element=e.target.children[0];
    element.classList.add("f3");
}

function areaof(e){
    e.preventDefault();
    const element=e.target.children[0];
    element.classList.remove("f3");
}



// SLIDER FUNCTION
//================================================================================
function SliderTimer(time,ui){
    counter=setInterval(slider,3000);
    function slider(){
        if(time<=0){
            clearInterval(counter);
        }else{
            for(let item of ui.Allimages){
                for(let i=0;i<item.children.length;i++){ 
                    if(item.children[i].classList.contains("active")){
                        if(i==item.children.length-1)
                        {
                            item.children[i].classList.remove("active");
                            item.children[0].classList.add("active");

                            break;
                        }else{
                            item.children[i].classList.remove("active");
                            item.children[i+1].classList.add("active");
                            break;
                        }
                    }
                }
                time--;
            }
        }
    }
}
//================================================================================



function filterPress(e){
    e.preventDefault();
    const buttonElement=e.target;
    const buttonCheck=buttonElement.children[0];
    if(e.target.nodeName=="INPUT" || e.target.nodeName=="SPAN"){
        buttonElement=e.target.parentElement;
    }
    buttonElement.classList.toggle("f2");
    buttonCheck.checked=!buttonCheck.checked;
}


function areaInside(e){
    e.preventDefault();
    const buttonElement=e.target;
    if(e.target.nodeName=="INPUT" || e.target.nodeName=="SPAN"){
        buttonElement=e.target.parentElement;
    }
    buttonElement.classList.add("f1");
}


function areaOutside(e){
    e.preventDefault();
    const buttonElement=e.target;
    if(e.target.nodeName=="INPUT" || e.target.nodeName=="SPAN"){
        buttonElement=e.target.parentElement;
    }
    buttonElement.classList.remove("f1");
}


function CarFilter(ui){
    for(let card of ui.AllCard){
        console.log(card);
    }
}


function createFilterBtn(text,ui){
    // div
    const div=document.createElement("div");
    div.className="btn";
    div.id="car-models";
    // input
    const input=document.createElement("input");
    input.id="checkbox";
    input.type="checkbox";
    //span
    const span=document.createElement("span");
    span.id="text";
    span.textContent=text;

    div.appendChild(input);
    div.appendChild(span);
    ui.filterbuttons.appendChild(div);
}

//==========================================================================
// CREATE CARD SKELETON SECTION

function createCardSceleton(){
    // div-col
    const div=document.createElement("div");
    div.className="col";
    div.id="mainCard";
    //div-card
    const card=document.createElement("div");
    card.id="car-card";
    card.className="card my-3 shadow-lg";
    // ekleme
    div.appendChild(card);
    return div;
}
/*
// CARD SKELETON STRUCTURE
<div class="col">
    <div class="card my-3 shadow-lg" id="car-card">
    --images--   
    --body--
    </div>
</div>
 */
//==========================================================================
// CREATE CARD IMAGES SECTION
function createImageSection(images){
    const div=document.createElement("div");
    div.className="images";
    for(let [key,value] of Object.entries(images)){
        const img=document.createElement("img");
        img.src=`./CarImg/${value}`;
        img.alt=`img_${key}`;
        if(key=="1"){
            img.className="card-img-top active";
        }else{
            img.className="card-img-top";
        }
        div.appendChild(img);
    }
    return div;
}
// CARD IAMGES STRUCTURE
/*
<div class="images">
    <img src="./CarImg/gtr1.png" alt="gtr" id="img" class="card-img-top active">
    <img src="./CarImg/gtr2.png" alt="gtr" id="img" class="card-img-top">
    <img src="./CarImg/gtr3.png" alt="gtr" id="img" class="card-img-top">
    <img src="./CarImg/gtr4.png" alt="gtr" id="img" class="card-img-top">
</div>
 */
//==========================================================================
// CREATE CARD BODY SECTION
function createBodySection(model,year,color,text){
    //div-body
    const div_body=document.createElement("div");
    div_body.className="body";
    // title
    const div_title1=document.createElement("div");
    div_title1.className="title";
    div_title1.textContent=`${model} - ${year}`;
    //text-1
    const div_text1=document.createElement("div");
    div_text1.className="text";
    // span-text-1
    const span_text1=document.createElement("span");
    span_text1.className="color1";
    span_text1.textContent="COLOR: ";
    //span-text-2
    const span_text2=document.createElement("span");
    span_text2.className="color2";
    span_text2.textContent=`${color}`;
    //text-2
    const div_text2=document.createElement("div");
    div_text2.className="text";
    div_text2.textContent=`${text}`;
    // btn-see more
    const btn=document.createElement("div");
    btn.className="btn btn-primary btn-sm";
    btn.textContent="See More";

    // aşamalı ekleme
    div_body.appendChild(div_title1);
    div_text1.appendChild(span_text1);
    div_text1.appendChild(span_text2);
    div_body.appendChild(div_text1);
    div_body.appendChild(div_text2);
    div_body.appendChild(btn);
    return div_body;
}

// CARD BODY STRUCTURE
/*
<div class="body">
    <div class="title">GTR-2011</div>
    <div class="text">
        <span class="color1">COLOR:</span>
        <span class="color2">RED</span>
    </div>
    <div class="text">
        AUTOCITY 2011 NISSAN GT-R R35 3.8 V6 FACELIFT
    </div>
    <div class="btn btn-primary btn-sm">See More</div>
</div>
 */

//==========================================================================
// CREATE CARD MODELS
function oneModel(list){
    let firstList=new Array();
    let secondList=new Array();
    for(let item of list){
        firstList.push(item.toUpperCase());
    }
    secondList=[...new Set(firstList)];
    return secondList;
}
//==========================================================================


