/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var help = 0;
var ipAdresa = new Array();
var pocetPodsieti;
var pocetHostov = new Array();
var prefixPodsiete = new Array();
var predvolenaPodsiet=0;

function generovanieIp(){
    
  //generovanie oktetov ip adresy
    ipAdresa[4]=Math.floor(Math.random() * (27-22)) + 22;
    if(ipAdresa[4] >= 24){
        for(var i = 0; i<4 ; i++){
            ipAdresa[i]=Math.floor(Math.random() * 255 ) + 1;  
        }  
        
        if(ipAdresa[4]>=24){
            ipAdresa[3]=0;  
        }
    }
    
    if(ipAdresa[4] < 24){
        for(var i = 0; i<3 ; i++){
            ipAdresa[i]=Math.floor(Math.random() * 255 ) + 1;  
        }  
        ipAdresa[2]=Math.floor(Math.random()* (252-0)) + 0;
        ipAdresa[3]=0;
    }
}


function vypisIp(){    
        $('#ip .ipc').after(ipAdresa[0]+"."+ipAdresa[1]+"."+ipAdresa[2]+"."+ipAdresa[3]+"/"+ipAdresa[4]);   
}

function generovaniePoctuPodsieti(){
    //vygenerovanie poctu podsieti pre priklad
    if(ipAdresa[4]!=26){
        pocetPodsieti=Math.floor(Math.random() * (7-4) ) + 4;
    }else{
        pocetPodsieti=Math.floor(Math.random() * (6-4) ) + 4;
    }
}

function generovaniePodsieti(){
    // vygenerovanie poctu pouzitelnych adries pre jednotlive podsiete
    var pocetOstavajucichHostov = 0; 
    
    if(ipAdresa[4]==22)
        pocetOstavajucichHostov=1024;
    if(ipAdresa[4]==23)
        pocetOstavajucichHostov=512;
    if(ipAdresa[4]==24)
        pocetOstavajucichHostov=256;
    if(ipAdresa[4]==25)
        pocetOstavajucichHostov=128;
    if(ipAdresa[4]==26)
        pocetOstavajucichHostov=64;
    
    var minHostov=2;
    var maxHostov=(pocetOstavajucichHostov/2)-2; 
    
    for(var i = 0; i<pocetPodsieti; i++){
        
        pocetHostov[i]=Math.floor(Math.random() * (maxHostov - minHostov) ) + minHostov;
        
        if(pocetHostov[i]<=510&&pocetHostov[i]>=255){
            prefixPodsiete[i]=23;
            pocetOstavajucichHostov= pocetOstavajucichHostov - 512;
            
        }else
        if(pocetHostov[i]<=254&&pocetHostov[i]>=127){
            prefixPodsiete[i]=24;
            pocetOstavajucichHostov= pocetOstavajucichHostov - 256;
            
        }else
        if(pocetHostov[i]<=126&&pocetHostov[i]>=63){
            prefixPodsiete[i]=25;
            pocetOstavajucichHostov= pocetOstavajucichHostov - 128;
          
        }else
        if(pocetHostov[i]<=62&&pocetHostov[i]>=31){
            prefixPodsiete[i]=26;
            pocetOstavajucichHostov= pocetOstavajucichHostov - 64;
            
        }else
        if(pocetHostov[i]<=30&&pocetHostov[i]>=15){
            prefixPodsiete[i]=27;
            pocetOstavajucichHostov= pocetOstavajucichHostov - 32;
            
        }else
        if(pocetHostov[i]<=14&&pocetHostov[i]>=7){
            prefixPodsiete[i]=28;
            pocetOstavajucichHostov= pocetOstavajucichHostov - 16;
           
        }else
        if(pocetHostov[i]<=6&&pocetHostov[i]>=3){
            prefixPodsiete[i]=29;
            pocetOstavajucichHostov= pocetOstavajucichHostov - 8;
            
        }else
        if(pocetHostov[i]==2){
            prefixPodsiete[i]=30;
            pocetOstavajucichHostov= pocetOstavajucichHostov - 4;
        }
    
        if(pocetOstavajucichHostov<=1 && pocetPodsieti>i){
            generovaniePodsieti();
            break;
        }
        if(pocetOstavajucichHostov>510)
            maxHostov=510;
        else
            maxHostov=pocetOstavajucichHostov-2;
    }      
    
    for(var i = 0; i<pocetPodsieti;i++){
        if(pocetHostov[i]==pocetHostov[i+1])generovaniePodsieti();
    }   
  
    vypisPodsieti();
}

var pocet=new Array();

function vypisPodsieti(){
    if(pocetPodsieti>=3){
        $('#host1').text("1. Podsieť potrebuje "+pocetHostov[0]+" použiteľných adries.");
        $('#host2').text("2. Podsieť potrebuje "+pocetHostov[1]+" použiteľných adries.");
        $('#host3').text("3. Podsieť potrebuje "+pocetHostov[2]+" použiteľných adries.");
    }
    if(pocetPodsieti>=4){
        $('#host4').text("4. Podsieť potrebuje "+pocetHostov[3]+" použiteľných adries.");
    }
    if(pocetPodsieti>=5){
        $('#host5').text("5. Podsieť potrebuje "+pocetHostov[4]+" použiteľných adries.");
    }
    if(pocetPodsieti>=6){
        $('#host6').text("6. Podsieť potrebuje "+pocetHostov[5]+" použiteľných adries.");
    }
    
    for(var i = 0; i<pocetPodsieti;i++){
        pocet[i]=pocetHostov[i];
    }
}


var sietovaAdresa = new Array();
var prvaAdresa = new Array();
var poslednaAdresa = new Array();
var broadcastAdresa = new Array();
var maskaPodsiete = new Array();
var pocetPouzitelnychAdries=0;

var spravnyVysledokPod1 = new Array();
var spravnyVysledokPod2 = new Array();
var spravnyVysledokPod3 = new Array();
var spravnyVysledokPod4 = new Array();
var spravnyVysledokPod5 = new Array();
var spravnyVysledokPod6 = new Array();

var infoPodsiet=0;

function vstupy(){
    vyberPodsiete();
    predvolenaSiet();
    
    if(pocetPodsieti>=3){
        
        if(predvolenaPodsiet!=1){
        $('#pod1').text("1. Podsieť: ");
        $('#1okt1').html('<input type="text" id="s1_1_okt" maxlength="3" size="3"> . ');
        $('#1okt2').html('<input type="text" id="s1_2_okt" maxlength="3" size="3"> . ');
        $('#1okt3').html('<input type="text" id="s1_3_okt" maxlength="3" size="3"> . ');
        $('#1okt4').html('<input type="text" id="s1_4_okt" maxlength="3" size="3"> / ');
        $('#1prfx').html('<input type="text" id="s1_prefix" maxlength="2" size="2"> <br>');
        }
        if(predvolenaPodsiet!=2){
        $('#pod2').text("2. Podsieť: ");
        $('#2okt1').html('<input type="text" id="s2_1_okt" maxlength="3" size="3"> . ');
        $('#2okt2').html('<input type="text" id="s2_2_okt" maxlength="3" size="3"> . ');
        $('#2okt3').html('<input type="text" id="s2_3_okt" maxlength="3" size="3"> . ');
        $('#2okt4').html('<input type="text" id="s2_4_okt" maxlength="3" size="3"> / ');
        $('#2prfx').html('<input type="text" id="s2_prefix" maxlength="2" size="2"> <br>');
        }
        if(predvolenaPodsiet!=3){
        $('#pod3').text("3. Podsieť: ");
        $('#3okt1').html('<input type="text" id="s3_1_okt" maxlength="3" size="3"> . ');
        $('#3okt2').html('<input type="text" id="s3_2_okt" maxlength="3" size="3"> . ');
        $('#3okt3').html('<input type="text" id="s3_3_okt" maxlength="3" size="3"> . ');
        $('#3okt4').html('<input type="text" id="s3_4_okt" maxlength="3" size="3"> / ');
        $('#3prfx').html('<input type="text" id="s3_prefix" maxlength="2" size="2"> <br>');
        }   
    }
    if(pocetPodsieti>=4){
        if(predvolenaPodsiet!=4){
        $('#pod4').text("4. Podsieť: ");
        $('#4okt1').html('<input type="text" id="s4_1_okt" maxlength="3" size="3"> . ');
        $('#4okt2').html('<input type="text" id="s4_2_okt" maxlength="3" size="3"> . ');
        $('#4okt3').html('<input type="text" id="s4_3_okt" maxlength="3" size="3"> . ');
        $('#4okt4').html('<input type="text" id="s4_4_okt" maxlength="3" size="3"> / ');
        $('#4prfx').html('<input type="text" id="s4_prefix" maxlength="2" size="2"> <br>');
        }
    }
    if(pocetPodsieti>=5){
        if(predvolenaPodsiet!=5){
        $('#pod5').text("5. Podsieť: ");
        $('#5okt1').html('<input type="text" id="s5_1_okt" maxlength="3" size="3"> . ');
        $('#5okt2').html('<input type="text" id="s5_2_okt" maxlength="3" size="3"> . ');
        $('#5okt3').html('<input type="text" id="s5_3_okt" maxlength="3" size="3"> . ');
        $('#5okt4').html('<input type="text" id="s5_4_okt" maxlength="3" size="3"> / ');
        $('#5prfx').html('<input type="text" id="s5_prefix" maxlength="2" size="2"> <br>');
        }
    }
    if(pocetPodsieti>=6){
        if(predvolenaPodsiet!=6){
        $('#pod6').text("6. Podsieť: ");
        $('#6okt1').html('<input type="text" id="s6_1_okt" maxlength="3" size="3"> . ');
        $('#6okt2').html('<input type="text" id="s6_2_okt" maxlength="3" size="3"> . ');
        $('#6okt3').html('<input type="text" id="s6_3_okt" maxlength="3" size="3"> . ');
        $('#6okt4').html('<input type="text" id="s6_4_okt" maxlength="3" size="3"> / ');
        $('#6prfx').html('<input type="text" id="s6_prefix" maxlength="2" size="2"> <br>');
        }
    }
    
    
    $('#infopod').html('Doplňte informácie o '+infoPodsiet+'. podsieti:<br>');
    
    $('#siet').html("Sieťová adresa: <br>");
    $('#sietokt1').html('<input type="text" id="siet_1_okt" maxlength="3" size="3"> . ');
    $('#sietokt2').html('<input type="text" id="siet_2_okt" maxlength="3" size="3"> . ');
    $('#sietokt3').html('<input type="text" id="siet_3_okt" maxlength="3" size="3"> . ');
    $('#sietokt4').html('<input type="text" id="siet_4_okt" maxlength="3" size="3"> / ');
    $('#sietprfx').html('<input type="text" id="siet_prefix" maxlength="2" size="2"> <br>');
    
    $('#prva').html("Prvá použiteľná adresa: <br>");
    $('#prvaokt1').html('<input type="text" id="prva_1_okt" maxlength="3" size="3"> . ');
    $('#prvaokt2').html('<input type="text" id="prva_2_okt" maxlength="3" size="3"> . ');
    $('#prvaokt3').html('<input type="text" id="prva_3_okt" maxlength="3" size="3"> . ');
    $('#prvaokt4').html('<input type="text" id="prva_4_okt" maxlength="3" size="3">  <br>');
   
    
    $('#posl').html("Posledná použiteľná adresa: <br>");
    $('#poslokt1').html('<input type="text" id="posl_1_okt" maxlength="3" size="3"> . ');
    $('#poslokt2').html('<input type="text" id="posl_2_okt" maxlength="3" size="3"> . ');
    $('#poslokt3').html('<input type="text" id="posl_3_okt" maxlength="3" size="3"> . ');
    $('#poslokt4').html('<input type="text" id="posl_4_okt" maxlength="3" size="3">  <br>');
   
    
    $('#broad').html("Broadcastová adresa: <br>");
    $('#broadokt1').html('<input type="text" id="broad_1_okt" maxlength="3" size="3"> . ');
    $('#broadokt2').html('<input type="text" id="broad_2_okt" maxlength="3" size="3"> . ');
    $('#broadokt3').html('<input type="text" id="broad_3_okt" maxlength="3" size="3"> . ');
    $('#broadokt4').html('<input type="text" id="broad_4_okt" maxlength="3" size="3">  <br>');

    
    $('#maska').html("Maska podsiete: <br>");
    $('#maskaokt1').html('<input type="text" id="maska_1_okt" maxlength="3" size="3"> . ');
    $('#maskaokt2').html('<input type="text" id="maska_2_okt" maxlength="3" size="3"> . ');
    $('#maskaokt3').html('<input type="text" id="maska_3_okt" maxlength="3" size="3"> . ');
    $('#maskaokt4').html('<input type="text" id="maska_4_okt" maxlength="3" size="3"> <br>');
    
    $('#pouz').html("<br>Počet použiteľných adries: ");
    $('#pouza').html('<input type="text" id="pouzadr" maxlength="3" size="3"> <br>');
  
    vypocet();
    
        $("#tlacitko").click(kontrola);
        
}

function vyberPodsiete(){
    infoPodsiet=Math.floor(Math.random() * (pocetPodsieti - 1) ) + 1;
}

function predvolenaSiet(){
    predvolenaPodsiet=Math.floor(Math.random() * (pocetPodsieti - 1) ) + 1;
    if(predvolenaPodsiet==infoPodsiet){predvolenaSiet();}
}

var oktet4 = 0;
var oktet3 = 0;
var pocetBodov = 0;
var idPodsiete = new Array();

function vypocet(){
    //vypocet spravneho vysledku prikladu
    var kontrolaSpravnyVysledok = new Array(pocetPodsieti);
    for(var i = 0; i<pocetPodsieti ; i++){
        kontrolaSpravnyVysledok[i] = new Array(4);
    }
    
    var konecnyVysledok = new Array(pocetPodsieti);
    for(var i = 0; i<pocetPodsieti ; i++){
        konecnyVysledok[i] = new Array(4);
    }
    
    zoradit();
    
    var ipAdresaPomocna = ipAdresa[2];
    
    for(var i = 0; i<pocetPodsieti; i++){
        if(oktet4==256){
            oktet4=0;
            ipAdresaPomocna++;
        }
        kontrolaSpravnyVysledok[i][0]=ipAdresa[0];
        
        kontrolaSpravnyVysledok[i][1]=ipAdresa[1];
        
        if(prefixPodsiete[i]==23){
           kontrolaSpravnyVysledok[i][2]=ipAdresaPomocna;
           ipAdresaPomocna=ipAdresaPomocna+2; 
        }else
        if(prefixPodsiete[i]==24){
            kontrolaSpravnyVysledok[i][2]=ipAdresaPomocna;
            ipAdresaPomocna++;
        }else{
            kontrolaSpravnyVysledok[i][2]=ipAdresaPomocna;
        }
        
        if(prefixPodsiete[i]==23){
            kontrolaSpravnyVysledok[i][3]=0;  
        }else
        if(prefixPodsiete[i]==24){
            kontrolaSpravnyVysledok[i][3]=0; 
        }else
        if(prefixPodsiete[i]==25){
            if(oktet4<=128){
                kontrolaSpravnyVysledok[i][3]=oktet4;
                oktet4 = oktet4 + 128;
            }else{
                ipAdresaPomocna++;
                kontrolaSpravnyVysledok[i][2]=ipAdresaPomocna;
                oktet4=0;
                kontrolaSpravnyVysledok[i][3]=oktet4;
            }
        }else
        if(prefixPodsiete[i]==26){
            if(oktet4<=192){
                kontrolaSpravnyVysledok[i][3]=oktet4; 
                oktet4 = oktet4 + 64;
            }else{
                ipAdresaPomocna++;
                kontrolaSpravnyVysledok[i][2]=ipAdresaPomocna;
                oktet4=0;
                kontrolaSpravnyVysledok[i][3]=oktet4;
            }
        }else
        if(prefixPodsiete[i]==27){
            if(oktet4<=224){
                kontrolaSpravnyVysledok[i][3]=oktet4; 
                oktet4 = oktet4 + 32;
            }else{
                ipAdresaPomocna++;
                kontrolaSpravnyVysledok[i][2]=ipAdresaPomocna;
                oktet4=0;
                kontrolaSpravnyVysledok[i][3]=oktet4;
            }
        }else
        if(prefixPodsiete[i]==28){
            if(oktet4<=240){
                kontrolaSpravnyVysledok[i][3]=oktet4;
                oktet4 = oktet4 + 16;
            }else{
                ipAdresaPomocna++;
                kontrolaSpravnyVysledok[i][2]=ipAdresaPomocna;
                oktet4=0;
                kontrolaSpravnyVysledok[i][3]=oktet4;
            }
        }else
        if(prefixPodsiete[i]==29){
            if(oktet4<=248){
                kontrolaSpravnyVysledok[i][3]=oktet4;
                oktet4 = oktet4 + 8;
            }else{
                ipAdresaPomocna++;
                kontrolaSpravnyVysledok[i][2]=ipAdresaPomocna;
                oktet4=0;
                kontrolaSpravnyVysledok[i][3]=oktet4;
            }
        }else
        if(prefixPodsiete[i]==30){
            if(oktet4<=252){
                kontrolaSpravnyVysledok[i][3]=oktet4;
                oktet4 = oktet4 + 4;
            }else{
                ipAdresaPomocna++;
                kontrolaSpravnyVysledok[i][2]=ipAdresaPomocna;
                oktet4=0;
                kontrolaSpravnyVysledok[i][3]=oktet4;
            }
        }
       
        kontrolaSpravnyVysledok[i][4]=prefixPodsiete[i];
    }
    
    
    
    if(pocetPodsieti>=4){
        
        konecnyVysledok[idPodsiete[0]-1][0]=kontrolaSpravnyVysledok[0][0];
        konecnyVysledok[idPodsiete[0]-1][1]=kontrolaSpravnyVysledok[0][1];
        konecnyVysledok[idPodsiete[0]-1][2]=kontrolaSpravnyVysledok[0][2];
        konecnyVysledok[idPodsiete[0]-1][3]=kontrolaSpravnyVysledok[0][3];
        konecnyVysledok[idPodsiete[0]-1][4]=kontrolaSpravnyVysledok[0][4];
    
        konecnyVysledok[idPodsiete[1]-1][0]=kontrolaSpravnyVysledok[1][0];
        konecnyVysledok[idPodsiete[1]-1][1]=kontrolaSpravnyVysledok[1][1];
        konecnyVysledok[idPodsiete[1]-1][2]=kontrolaSpravnyVysledok[1][2];
        konecnyVysledok[idPodsiete[1]-1][3]=kontrolaSpravnyVysledok[1][3];
        konecnyVysledok[idPodsiete[1]-1][4]=kontrolaSpravnyVysledok[1][4];
        
        konecnyVysledok[idPodsiete[2]-1][0]=kontrolaSpravnyVysledok[2][0];
        konecnyVysledok[idPodsiete[2]-1][1]=kontrolaSpravnyVysledok[2][1];
        konecnyVysledok[idPodsiete[2]-1][2]=kontrolaSpravnyVysledok[2][2];
        konecnyVysledok[idPodsiete[2]-1][3]=kontrolaSpravnyVysledok[2][3];
        konecnyVysledok[idPodsiete[2]-1][4]=kontrolaSpravnyVysledok[2][4];
        
        konecnyVysledok[idPodsiete[3]-1][0]=kontrolaSpravnyVysledok[3][0];
        konecnyVysledok[idPodsiete[3]-1][1]=kontrolaSpravnyVysledok[3][1];
        konecnyVysledok[idPodsiete[3]-1][2]=kontrolaSpravnyVysledok[3][2];
        konecnyVysledok[idPodsiete[3]-1][3]=kontrolaSpravnyVysledok[3][3];
        konecnyVysledok[idPodsiete[3]-1][4]=kontrolaSpravnyVysledok[3][4];
    }
    if(pocetPodsieti>=5){
        konecnyVysledok[idPodsiete[4]-1][0]=kontrolaSpravnyVysledok[4][0];
        konecnyVysledok[idPodsiete[4]-1][1]=kontrolaSpravnyVysledok[4][1];
        konecnyVysledok[idPodsiete[4]-1][2]=kontrolaSpravnyVysledok[4][2];
        konecnyVysledok[idPodsiete[4]-1][3]=kontrolaSpravnyVysledok[4][3];
        konecnyVysledok[idPodsiete[4]-1][4]=kontrolaSpravnyVysledok[4][4];
    }
    if(pocetPodsieti>=6){
        konecnyVysledok[idPodsiete[5]-1][0]=kontrolaSpravnyVysledok[5][0];
        konecnyVysledok[idPodsiete[5]-1][1]=kontrolaSpravnyVysledok[5][1];
        konecnyVysledok[idPodsiete[5]-1][2]=kontrolaSpravnyVysledok[5][2];
        konecnyVysledok[idPodsiete[5]-1][3]=kontrolaSpravnyVysledok[5][3];
        konecnyVysledok[idPodsiete[5]-1][4]=kontrolaSpravnyVysledok[5][4];
    }
    
    $('#bodys').before("<br>");
   
   sietovaAdresa[0]=konecnyVysledok[infoPodsiet-1][0];
   sietovaAdresa[1]=konecnyVysledok[infoPodsiet-1][1];
   sietovaAdresa[2]=konecnyVysledok[infoPodsiet-1][2];
   sietovaAdresa[3]=konecnyVysledok[infoPodsiet-1][3];
   sietovaAdresa[4]=konecnyVysledok[infoPodsiet-1][4];
  
   prvaAdresa[0]=sietovaAdresa[0];
   prvaAdresa[1]=sietovaAdresa[1];
   prvaAdresa[2]=sietovaAdresa[2];
   prvaAdresa[3]=sietovaAdresa[3]+1;
   
   poslednaAdresa[0]=sietovaAdresa[0];
   poslednaAdresa[1]=sietovaAdresa[1];
   poslednaAdresa[2]=sietovaAdresa[2];
   
   broadcastAdresa[0]=sietovaAdresa[0];
   broadcastAdresa[1]=sietovaAdresa[1];
   broadcastAdresa[2]=sietovaAdresa[2];
   
   for(var i = 0; i<3;i++){
       maskaPodsiete[i]=255;
   }
   
   if(sietovaAdresa[4]==23){
       poslednaAdresa[2]=sietovaAdresa[2]+1;
       poslednaAdresa[3]=sietovaAdresa[3]+254;
       
       broadcastAdresa[2]=sietovaAdresa[2]+1;
       broadcastAdresa[3]=sietovaAdresa[3]+255;
       
       maskaPodsiete[3]=254;
       maskaPodsiete[3]=0;
       
       pocetPouzitelnychAdries=510;
   }
   if(sietovaAdresa[4]==24){
       poslednaAdresa[3]=sietovaAdresa[3]+254;
       broadcastAdresa[3]=sietovaAdresa[3]+255;
       maskaPodsiete[3]=0;
       pocetPouzitelnychAdries=254;
   }    
   if(sietovaAdresa[4]==25){
       poslednaAdresa[3]=sietovaAdresa[3]+126;
       broadcastAdresa[3]=sietovaAdresa[3]+127;
       maskaPodsiete[3]=128;
       pocetPouzitelnychAdries=126;
   }
   if(sietovaAdresa[4]==26){
       poslednaAdresa[3]=sietovaAdresa[3]+62;
       broadcastAdresa[3]=sietovaAdresa[3]+63;
       maskaPodsiete[3]=192;
       pocetPouzitelnychAdries=62;
   }
   if(sietovaAdresa[4]==27){
       poslednaAdresa[3]=sietovaAdresa[3]+30;
       broadcastAdresa[3]=sietovaAdresa[3]+31;
       maskaPodsiete[3]=224;
       pocetPouzitelnychAdries=30;
   }
   if(sietovaAdresa[4]==28){
       poslednaAdresa[3]=sietovaAdresa[3]+14;
       broadcastAdresa[3]=sietovaAdresa[3]+15;
       maskaPodsiete[3]=240;
       pocetPouzitelnychAdries=14;
   }
    if(sietovaAdresa[4]==29){
       poslednaAdresa[3]=sietovaAdresa[3]+6;
       broadcastAdresa[3]=sietovaAdresa[3]+7;
       maskaPodsiete[3]=248;
       pocetPouzitelnychAdries=6;
   }
   if(sietovaAdresa[4]==30){
       poslednaAdresa[3]=sietovaAdresa[3]+2;
       broadcastAdresa[3]=sietovaAdresa[3]+3;
       maskaPodsiete[3]=252;
       pocetPouzitelnychAdries=2;
   }
 
    if(pocetPodsieti>=1){
     
        for(var i = 0; i<5;i++){
            spravnyVysledokPod1[i]=konecnyVysledok[0][i];
        }
    } 
    if(pocetPodsieti>=2){
        for(var i = 0; i<5;i++){
            spravnyVysledokPod2[i]=konecnyVysledok[1][i];
        }
    } 
    if(pocetPodsieti>=3){  
        for(var i = 0; i<5;i++){
            spravnyVysledokPod3[i]=konecnyVysledok[2][i];
        }
     } 
    if(pocetPodsieti>=4){    
        for(var i = 0; i<5;i++){
            spravnyVysledokPod4[i]=konecnyVysledok[3][i];
        } 
   }
   
   if(pocetPodsieti>=5){
       for(var i = 0; i<5;i++){
            spravnyVysledokPod5[i]=konecnyVysledok[4][i];
        }
   }
   
   if(pocetPodsieti>=6){
       for(var i = 0; i<5;i++){
            spravnyVysledokPod6[i]=konecnyVysledok[5][i];
        }
   }
   
    
    $('#predvolena').before('<br>'+predvolenaPodsiet+". Podsieť má rezervovaný adresný priestor: ");
    for(var i = 0 ; i<5; i++){
        if(i<3){ $('#predvolena').before(konecnyVysledok[predvolenaPodsiet-1][i]+".");}
        if(i==3){ $('#predvolena').before(konecnyVysledok[predvolenaPodsiet-1][i]);}
        if(i==4){ $('#predvolena').before('/'+konecnyVysledok[predvolenaPodsiet-1][i]);}        
    }
    
   
}

var kontrola = function(){
// vyhodnotenie zadanych vstupov a zobrazenie vysledneho hodnotenia
if(help==0){
    
    //vypis spravnych odpovedi       
    $('#bodys').before('Správna odpoveď: <br><br>Podsieťovanie: ');
        if(pocetPodsieti>=4){
            $('#bodys').before("<br> 1. Podsieť: ");
            for(var i = 0 ; i<5; i++){
                if(i<3)
                    $('#bodys').before(spravnyVysledokPod1[i]+'.');
                if(i==3)
                     $('#bodys').before(spravnyVysledokPod1[i]);
                if(i==4)
                     $('#bodys').before('/'+spravnyVysledokPod1[i]);
            }
            
            $('#bodys').before("<br> 2. Podsieť: ");
            for(var i = 0 ; i<5; i++){
                if(i<3)
                    $('#bodys').before(spravnyVysledokPod2[i]+'.');
                if(i==3)
                     $('#bodys').before(spravnyVysledokPod2[i]);
                if(i==4)
                     $('#bodys').before('/'+spravnyVysledokPod2[i]);
            }
            
            $('#bodys').before("<br> 3. Podsieť: ");
            for(var i = 0 ; i<5; i++){
                if(i<3)
                    $('#bodys').before(spravnyVysledokPod3[i]+'.');
                if(i==3)
                     $('#bodys').before(spravnyVysledokPod3[i]);
                if(i==4)
                     $('#bodys').before('/'+spravnyVysledokPod3[i]);
            }
            
            $('#bodys').before("<br> 4. Podsieť: ");
            for(var i = 0 ; i<5; i++){
                if(i<3)
                    $('#bodys').before(spravnyVysledokPod4[i]+'.');
                if(i==3)
                     $('#bodys').before(spravnyVysledokPod4[i]);
                if(i==4)
                     $('#bodys').before('/'+spravnyVysledokPod4[i]);
            }
        }
    
        if(pocetPodsieti>=5){
            $('#bodys').before("<br> 5. Podsieť: ");
            for(var i = 0 ; i<5; i++){
                if(i<3)
                    $('#bodys').before(spravnyVysledokPod5[i]+'.');
                if(i==3)
                     $('#bodys').before(spravnyVysledokPod5[i]);
                if(i==4)
                     $('#bodys').before('/'+spravnyVysledokPod5[i]);
            }
        }    
        
        if(pocetPodsieti>=6){
            $('#bodys').before("<br> 6. Podsieť: ");
            for(var i = 0 ; i<5; i++){
                if(i<3)
                    $('#bodys').before(spravnyVysledokPod6[i]+'.');
                if(i==3)
                     $('#bodys').before(spravnyVysledokPod6[i]);
                if(i==4)
                     $('#bodys').before('/'+spravnyVysledokPod6[i]);
            }
        }    
        
    $('#bodys').before('<br><br>Informácie o '+(infoPodsiet) + '. Podsieti: ');
        $('#bodys').before("<br> Sieťová adresa: <br> ");
        for(var i = 0 ; i<5; i++){ 
             if(i<3)
                 $('#bodys').before(sietovaAdresa[i]+'.');
             if(i==3)
                $('#bodys').before(sietovaAdresa[i]);
            if(i==4)
                $('#bodys').before('/'+sietovaAdresa[i]);            
        }
        
        $('#bodys').before("<br> Prvá použiteľná adresa: <br> ");
        for(var i = 0 ; i<4; i++){ 
             if(i<3)
                 $('#bodys').before(prvaAdresa[i]+'.');
             if(i==3)
                $('#bodys').before(prvaAdresa[i]);         
        }
        
        $('#bodys').before("<br> Posledná použiteľná adresa: <br> ");
        for(var i = 0 ; i<4; i++){ 
             if(i<3)
                 $('#bodys').before(poslednaAdresa[i]+'.');
             if(i==3)
                $('#bodys').before(poslednaAdresa[i]);         
        }
        
        $('#bodys').before("<br> Broadcastová adresa: <br> ");
        for(var i = 0 ; i<4; i++){ 
             if(i<3)
                 $('#bodys').before(broadcastAdresa[i]+'.');
             if(i==3)
                $('#bodys').before(broadcastAdresa[i]);         
        }
        
        $('#bodys').before("<br> Maska podsiete: <br> ");
        for(var i = 0 ; i<4; i++){ 
             if(i<3)
                 $('#bodys').before(maskaPodsiete[i]+'.');
             if(i==3)
                $('#bodys').before(maskaPodsiete[i]);         
        }
        
        $('#bodys').before("<br> Počet použiteľných adries: ");
            $('#bodys').before(pocetPouzitelnychAdries);
          
    //ulozenie vstupv do pola
    var vstupAdresa = new Array();
    for(var i = 0; i<pocetPodsieti ; i++){
        vstupAdresa[i] = new Array(4);
    }
    
    var vstupSietovaAdresa = new Array();
    var vstupPrvaAdresa = new Array();
    var vstupPoslednaAdresa = new Array();
    var vstupBroadcastAdresa = new Array();
    var vstupMaskaPodsiete = new Array();
    var vstupPouzitelneAdresy;
    
    if(pocetPodsieti>=3){
     
        
        if(predvolenaPodsiet!=1){
        vstupAdresa[0][0]=document.getElementById("s1_1_okt").value;
        vstupAdresa[0][1]=document.getElementById("s1_2_okt").value;
        vstupAdresa[0][2]=document.getElementById("s1_3_okt").value;
        vstupAdresa[0][3]=document.getElementById("s1_4_okt").value;
        vstupAdresa[0][4]=document.getElementById("s1_prefix").value;
        }
       
        if(predvolenaPodsiet!=2){
        vstupAdresa[1][0]=document.getElementById("s2_1_okt").value;
        vstupAdresa[1][1]=document.getElementById("s2_2_okt").value;
        vstupAdresa[1][2]=document.getElementById("s2_3_okt").value;
        vstupAdresa[1][3]=document.getElementById("s2_4_okt").value;
        vstupAdresa[1][4]=document.getElementById("s2_prefix").value;
        }
        
        if(predvolenaPodsiet!=3){
        vstupAdresa[2][0]=document.getElementById("s3_1_okt").value;
        vstupAdresa[2][1]=document.getElementById("s3_2_okt").value;
        vstupAdresa[2][2]=document.getElementById("s3_3_okt").value;
        vstupAdresa[2][3]=document.getElementById("s3_4_okt").value;
        vstupAdresa[2][4]=document.getElementById("s3_prefix").value;
        }
    }
    if(pocetPodsieti>=4){
        
      
        if(predvolenaPodsiet!=4){
        vstupAdresa[3][0]=document.getElementById("s4_1_okt").value;
        vstupAdresa[3][1]=document.getElementById("s4_2_okt").value;
        vstupAdresa[3][2]=document.getElementById("s4_3_okt").value;
        vstupAdresa[3][3]=document.getElementById("s4_4_okt").value;
        vstupAdresa[3][4]=document.getElementById("s4_prefix").value;
        }
    }
    if(pocetPodsieti>=5){
        
      
        if(predvolenaPodsiet!=5){
        vstupAdresa[4][0]=document.getElementById("s5_1_okt").value;
        vstupAdresa[4][1]=document.getElementById("s5_2_okt").value;
        vstupAdresa[4][2]=document.getElementById("s5_3_okt").value;
        vstupAdresa[4][3]=document.getElementById("s5_4_okt").value;
        vstupAdresa[4][4]=document.getElementById("s5_prefix").value;
        }
    }
    if(pocetPodsieti>=6){
        
       
        if(predvolenaPodsiet!=6){
        vstupAdresa[5][0]=document.getElementById("s6_1_okt").value;
        vstupAdresa[5][1]=document.getElementById("s6_2_okt").value;
        vstupAdresa[5][2]=document.getElementById("s6_3_okt").value;
        vstupAdresa[5][3]=document.getElementById("s6_4_okt").value;
        vstupAdresa[5][4]=document.getElementById("s6_prefix").value;
        }
    }
    
  
    vstupSietovaAdresa[0]=document.getElementById("siet_1_okt").value;
    vstupSietovaAdresa[1]=document.getElementById("siet_2_okt").value;
    vstupSietovaAdresa[2]=document.getElementById("siet_3_okt").value;
    vstupSietovaAdresa[3]=document.getElementById("siet_4_okt").value;
    vstupSietovaAdresa[4]=document.getElementById("siet_prefix").value;
    
    vstupPrvaAdresa[0]=document.getElementById("prva_1_okt").value;
    vstupPrvaAdresa[1]=document.getElementById("prva_2_okt").value;
    vstupPrvaAdresa[2]=document.getElementById("prva_3_okt").value;
    vstupPrvaAdresa[3]=document.getElementById("prva_4_okt").value;
    
    vstupPoslednaAdresa[0]=document.getElementById("posl_1_okt").value;
    vstupPoslednaAdresa[1]=document.getElementById("posl_2_okt").value;
    vstupPoslednaAdresa[2]=document.getElementById("posl_3_okt").value;
    vstupPoslednaAdresa[3]=document.getElementById("posl_4_okt").value;
    
    vstupBroadcastAdresa[0]=document.getElementById("broad_1_okt").value;    
    vstupBroadcastAdresa[1]=document.getElementById("broad_2_okt").value; 
    vstupBroadcastAdresa[2]=document.getElementById("broad_3_okt").value; 
    vstupBroadcastAdresa[3]=document.getElementById("broad_4_okt").value; 
    
    vstupMaskaPodsiete[0]=document.getElementById("maska_1_okt").value;
    vstupMaskaPodsiete[1]=document.getElementById("maska_2_okt").value;
    vstupMaskaPodsiete[2]=document.getElementById("maska_3_okt").value;
    vstupMaskaPodsiete[3]=document.getElementById("maska_4_okt").value;
    
    vstupPouzitelneAdresy=document.getElementById("pouzadr").value;
    
    // kontrola vysledku
    var vsetkyBody=0;
    if(ipAdresa[4]>=24){
        vsetkyBody=((pocetPodsieti*2)-2)+6;
    }else{
        vsetkyBody=((pocetPodsieti*3)-3)+6
    }
    var pocetBodov=0;
    
   
    if(pocetPodsieti>=4){
        if(vstupAdresa[0][3]==spravnyVysledokPod1[3]&&vstupAdresa[0][3]!=""){pocetBodov++;}
        if(vstupAdresa[0][4]==spravnyVysledokPod1[4]){pocetBodov++;}
        
        if(ipAdresa[4]<24){
            if(vstupAdresa[0][2]==spravnyVysledokPod1[2]){pocetBodov++;}
        }
        
        if(vstupAdresa[1][3]==spravnyVysledokPod2[3]&&vstupAdresa[1][3]!=""){pocetBodov++;}
        if(vstupAdresa[1][4]==spravnyVysledokPod2[4]){pocetBodov++;}
        
        if(ipAdresa[4]<24){
            if(vstupAdresa[1][2]==spravnyVysledokPod2[2]){pocetBodov++;}
        }
        
        if(vstupAdresa[2][3]==spravnyVysledokPod3[3]&&vstupAdresa[2][3]!=""){pocetBodov++;}
        if(vstupAdresa[2][4]==spravnyVysledokPod3[4]){pocetBodov++;}
        
        if(ipAdresa[4]<24){
            if(vstupAdresa[2][2]==spravnyVysledokPod3[2]){pocetBodov++;}
        }
        
        if(vstupAdresa[3][3]==spravnyVysledokPod4[3]&&vstupAdresa[3][3]!=""){pocetBodov++;}
        if(vstupAdresa[3][4]==spravnyVysledokPod4[4]){pocetBodov++;} 
        
        if(ipAdresa[4]<24){
            if(vstupAdresa[3][2]==spravnyVysledokPod4[2]){pocetBodov++;}
        }
    }
    
    if(pocetPodsieti>=5){
        if(vstupAdresa[4][3]==spravnyVysledokPod5[3]&&vstupAdresa[4][3]!=""){pocetBodov++;}
        if(vstupAdresa[4][4]==spravnyVysledokPod5[4]){pocetBodov++;}
        
        if(ipAdresa[4]<24){
            if(vstupAdresa[4][2]==spravnyVysledokPod5[2]){pocetBodov++;}
        }
    }
    
    if(pocetPodsieti>=6){
        if(vstupAdresa[5][3]==spravnyVysledokPod6[3]&&vstupAdresa[5][3]!=""){pocetBodov++;}
        if(vstupAdresa[5][4]==spravnyVysledokPod6[4]){pocetBodov++;}
        
        if(ipAdresa[4]<24){
            if(vstupAdresa[5][2]==spravnyVysledokPod6[2]){pocetBodov++;}
        }
    }
    
    if(ipAdresa[4]>=23){
        if(vstupSietovaAdresa[3] == sietovaAdresa[3]&&vstupSietovaAdresa[4] == sietovaAdresa[4]&&vstupSietovaAdresa[3]!=""){pocetBodov++;}
    
        if(vstupPrvaAdresa[3]==prvaAdresa[3]){pocetBodov++;}
    
        if(vstupPoslednaAdresa[3]==poslednaAdresa[3]){pocetBodov++;}
    
        if(vstupBroadcastAdresa[3]==broadcastAdresa[3]){pocetBodov++;}  
    
        if(vstupMaskaPodsiete[3]==maskaPodsiete[3]){pocetBodov++;} 
    
        if(vstupPouzitelneAdresy==pocetPouzitelnychAdries){pocetBodov++;} 
    }else{
        if(vstupSietovaAdresa[3] == sietovaAdresa[3]&&vstupSietovaAdresa[4] == sietovaAdresa[4]&&vstupSietovaAdresa[3]!=""&&vstupSietovaAdresa[2] == sietovaAdresa[2]){pocetBodov++;}
    
        if(vstupPrvaAdresa[3]==prvaAdresa[3]&&vstupPrvaAdresa[2]==prvaAdresa[2]){pocetBodov++;}
    
        if(vstupPoslednaAdresa[3]==poslednaAdresa[3]&&vstupPoslednaAdresa[2]==poslednaAdresa[2]){pocetBodov++;}
    
        if(vstupBroadcastAdresa[3]==broadcastAdresa[3]&&vstupBroadcastAdresa[2]==broadcastAdresa[2]){pocetBodov++;}  
    
        if(vstupMaskaPodsiete[3]==maskaPodsiete[3]&&vstupMaskaPodsiete[2]==maskaPodsiete[2]){pocetBodov++;} 
    
        if(vstupPouzitelneAdresy==pocetPouzitelnychAdries){pocetBodov++;} 
    }
    
    
    $('#bodys').before('<br><br><br>');
    
    $('#bodys').before('Vaša odpoveď:<br><br>');
    $('#bodys').before('Podsieťovanie:');
    for(var i = 0; i<pocetPodsieti; i++){
        if(predvolenaPodsiet!=i+1){
        $('#bodys').before("<br>" + (i+1) + ". Podsieť: ");      
        for(var j = 0; j<=4 ; j++){
          
            if(j<3 ){
                $('#bodys').before(vstupAdresa[i][j]+ ".");
            }
            if(j==3 ){
                $('#bodys').before(vstupAdresa[i][j]+"/");
            }
            if(j==4){
                $('#bodys').before(vstupAdresa[i][j]);
            } 
           
        }
        }
    }
    
    $('#bodys').before('<br><br>Informácie o '+(infoPodsiet) + '. Podsieti: ');
        $('#bodys').before("<br> Sieťová adresa: <br> ");
        for(var i = 0 ; i<5; i++){ 
           
             if(i<3)
                 $('#bodys').before(vstupSietovaAdresa[i]+'.');
             if(i==3)
                $('#bodys').before(vstupSietovaAdresa[i]);
            if(i==4)
                $('#bodys').before('/'+vstupSietovaAdresa[i]); 
           
        }
        
        $('#bodys').before("<br> Prvá použiteľná adresa: <br> ");
        for(var i = 0 ; i<4; i++){ 
           
             if(i<3)
                 $('#bodys').before(vstupPrvaAdresa[i]+'.');
             if(i==3)
                $('#bodys').before(vstupPrvaAdresa[i]); 
         
        }
        
        $('#bodys').before("<br> Posledná použiteľná adresa: <br> ");
        for(var i = 0 ; i<4; i++){ 
        
             if(i<3)
                 $('#bodys').before(vstupPoslednaAdresa[i]+'.');
             if(i==3)
                $('#bodys').before(vstupPoslednaAdresa[i]);   
         
        }
        
        $('#bodys').before("<br> Broadcastová adresa: <br> ");
        for(var i = 0 ; i<4; i++){ 
          
             if(i<3)
                 $('#bodys').before(vstupBroadcastAdresa[i]+'.');
             if(i==3)
                $('#bodys').before(vstupBroadcastAdresa[i]);    
          
        }
        
        $('#bodys').before("<br> Maska podsiete: <br> ");
        for(var i = 0 ; i<4; i++){ 
          
             if(i<3)
                 $('#bodys').before(vstupMaskaPodsiete[i]+'.');
             if(i==3)
                $('#bodys').before(vstupMaskaPodsiete[i]);  
         
        }
        
        $('#bodys').before("<br> Počet použiteľných adries: ");
            $('#bodys').before(vstupPouzitelneAdresy);
    
    $('#bodys').before('<br><br>');
    $('#bodys').html('<b>Počet Bodov: ' + pocetBodov + "/" + (vsetkyBody)+'</b>');
    $('#bodys').after('<b><br>Percentá: ' + Math.round((pocetBodov/vsetkyBody)*100) + "/100 %</b>" );
    
    help++;
}   
};

function zoradit(){
    // zoradenie podsieti podla velkosti
    for(var i = 0; i<pocetPodsieti;i++){
        idPodsiete[i]=i+1;
    }
   
    var swapped;
    do{
        swapped=false;
        for(var i=0; i<pocetPodsieti;i++){
            if( pocet[i] < pocet[i+1] ){
                
                var pTemp = pocet[i];
                pocet[i]=pocet[i+1];
                pocet[i+1]=pTemp;
                
                var temp = prefixPodsiete[i];
                prefixPodsiete[i]=prefixPodsiete[i+1];
                prefixPodsiete[i+1]=temp;
                
                var idTemp = idPodsiete[i];
                idPodsiete[i]=idPodsiete[i+1];
                idPodsiete[i+1]=idTemp;
                
                swapped=true;   
               
            }
        }
  }while(swapped); 
  
}

window.onload = function () {
	generovanieIp();
        vypisIp();
        generovaniePoctuPodsieti();
        generovaniePodsieti();
        vstupy();    
};