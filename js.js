//funkcja która tworzy dino na podstawie tych danych 
//lista dino 

var listadino = [];

var torporm = [1,1.04,1.08,1.11,1.14,1.16,1.19,1.21,1.24,1.26,1.28,1.30,1.33,1.35,1.37,1.39,1.41,1.43,1.45,1.47,1.49,1.51,1.53,1.55,1.57,1.59,
1.61,1.62,1.64,1.66,1.68,1.7,1.72,1.73,1.75,1.77,1.79,1.8,1.82,1.84,1.86,1.87,1.89,1.9,1.92,1.94,1.96,1.97,1.99,2.00,2.02,2.04,2.06,2.07,2.09,
2.10,2.12,2.14,2.15,2.17,2.18,2.20,2.21,2.23,2.25,2.26,2.28,2.3,2.31,2.32,2.34,2.35,2.37,2.38,2.4,2.41,2.43,2.44,2.46,2.47,2.49,2.50,2.52,2.53,
2.55,2.56,2.58,2.59,2.61,2.62,2.64,2.65,2.67,2.68,2.69,2.71,2.72,2.74,2.75,2.77,2.78,2.8,2.81,2.82,2.84,2.85,2.87,2.88,2.89,2.91,2.92,2.94,2.95,
2.96,2.98,3.00,3.01,3.02,3.03,3.05,3.06,3.07,3.09,3.1,3.12,3.13,3.14,3.16,3.17,3.18,3.2,3.21,3.22,3.24,3.25,3.26,3.28,3.29,3.3,3.32,3.33,3.34,3.36,
3.37,3.38,3.4,3.41,3.42,3.44,3.45,
//nowe od 151 lvl
3.46,3.48,3.49,3.50,3.52,3.53,3.54,3.56,3.57,3.58,3.59
,3.6,3.62,3.63,3.65,3.66,3.67,3.68,3.7,3.71,3.72
,3.74,3.75,3.76,3.77,3.79,3.8,3.81,3.83,3.84];
//Dino 

//id nr dinozaura  
	var dino;

//Funkcja tworząca dino na podstawie id podająca info odopwiednie 

	//zmiena pomocnicza przechowywujaca id jaki teraz dino jest widoczny
	var id_dino = 1;

function dinostworzyciel(id)
{
	id_dino = id;
	//wtępne ustawienia pobieranie lvl dino 
	dino = listadino[id];
	dino.lvl = parseInt(document.getElementById("lvl").value,10);
	if((dino.lvl>0)&&(dino.lvl<=180)){}
	else{dino.lvl=1;}
	dino.torpor= dino.t+ dino.tdodatni * (dino.lvl-1);
	dino.tspadek = dino.tspadek1 * torporm[dino.lvl-1];
	/*
	//Prowizofka
	if(dino.lvl>180)
	{
		dino.tspadek = dino.tspadek1* (3.45 + (0.015 * (dino.lvl-180))) ;
	}
*/

	//Zmiana nazwy dino i lvl 
	document.getElementById("nazwadino").innerHTML = dino.nazwa+" "+dino.lvl+" lvl";
	//podmiana zdjencia 
	document.getElementById("zdjenciedino").innerHTML = '<img src="img/dino/'+dino.nazwa+'.png">';
	
	//Zmiana stanu dino jaki jest 
	/*
	0-passywny
	1-neutralny
	2-agresywny
	*/
	var tekst = "?";
	if(dino.standino==0)
	{
		tekst="Passywny";
	}
	if(dino.standino==1)
	{
		tekst="Neutralny";
	}
	if(dino.standino==2)
	{
		tekst="Agressywny";
	}
	
	document.getElementById("agresywnosc").innerHTML=tekst;
	
	//Zmiana rodzaju oswajania 
	/*
	0 - Nie da sie
	1 - Passywne 
	2 - Tranqami 
	3 - Katapulta 
	*/
	tekst = "?";
		if(dino.rodzajoswajania==0)
	{
		tekst="Dotame";
	}
	if(dino.rodzajoswajania==1)
	{
		tekst="Passywne";
	}
	if(dino.rodzajoswajania==2)
	{
		tekst="Tranqi";
	}
	if(dino.rodzajoswajania==3)
	{
		tekst="Catapultom";
	}
	document.getElementById("rodzajoswajania").innerHTML=tekst;
	//Zmiana torporu
	tekst= Math.ceil(dino.t + dino.tdodatni*(dino.lvl-1));
	document.getElementById("torpor").innerHTML=tekst;
	//Czas uśpienia 

	console.log(dino.tspadek);
	document.getElementById("czasuspienia").innerHTML=tworzenieczasu(dino.torpor/dino.tspadek);
	//Ilość NarkoTyków do pełnego wypelnienia 
	
	tekst = Math.ceil(dino.torpor/7.5);
	document.getElementById("NarcoBerry").innerHTML=tekst;
	tekst = Math.ceil(dino.torpor/40);
	document.getElementById("Narcotic").innerHTML=tekst;
	tekst = Math.ceil(dino.torpor/80);
	document.getElementById("BioToxin").innerHTML=tekst;
	tekst = Math.ceil(dino.torpor/25);
	document.getElementById("Grzybek").innerHTML=tekst;

	tekst=tworzenieczasu(Math.ceil(dino.torpor/2.5));
	document.getElementById("czasNarcoBerry").innerHTML=tekst;
	tekst=tworzenieczasu(Math.ceil(dino.torpor/5));
	document.getElementById("czasNarcotic").innerHTML=tekst;
	tekst=tworzenieczasu(Math.ceil(dino.torpor/5));
	document.getElementById("czasBioToxin").innerHTML=tekst;
	tekst=tworzenieczasu(Math.ceil(dino.torpor/12.5));
	document.getElementById("czasGrzybek").innerHTML=tekst;
	wypiszbron();
	
}

//Funkcja służąca stworzeniu przycisków o dino 
function przyciskokreator()
{
	for(x=0;x<iledino;x++)
	{
	document.getElementById("listadino").innerHTML += '<button class="przycisk" onclick="dinostworzyciel('+x+')">'+listadino[x].nazwa+'</button>	'; 	

		
	}	
	
}
function start()
{
tablicadino();
sortowanie();
dinostworzyciel(0);	
timer();
lvl();
przyciskokreator();
}
function tablicadino()
{
for(j=0;j<iledino;j++)
	{
		listadino[j]=eval("d"+j);
	}
	
}
//Sortuje dino alfabetyczne 
function sortowanie()
{
	
	for(i=0;i<iledino-1;i++)
	{
		
		for(j=0;j<iledino-1;j++)
	    {
			var dlugosc=listadino[j].nazwa.length;
			
			if(listadino[j].nazwa.length>listadino[j+1].nazwa.length){dlugosc=listadino[j+1].nazwa.length;}
			
			for(y=0;y<dlugosc;y++)
			{
				
				if(listadino[j].nazwa.charCodeAt(y)>listadino[j+1].nazwa.charCodeAt(y))
				{
					
					var k = listadino[j];
					listadino[j] = listadino[j+1];
					listadino[j+1] = k;
					break;
					
				}
				else if(listadino[j].nazwa.charCodeAt(y)==listadino[j+1].nazwa.charCodeAt(y))
				{
				
					
				}
				else
				{
					break;
				}
				
				
			}
		
		
		
		
		}
		
	}
	

	
	
}
function tworzenieczasu(sekundy)
{
	sekundy = Math.ceil(sekundy);
	var tekst;
	
	var minuty = Math.floor(sekundy/60);
	sekundy = sekundy - minuty*60;
	var godziny = Math.floor(minuty/60);
    minuty = minuty-godziny*60;	
	tekst=godziny+"h "+minuty+"m "+sekundy+"s";	
	return tekst;
	
	
}

//////Bron do oswajania ! !! ! ! ! ! ! ! ! ! ! ! !!  1 ! ! ! ! !
	//Funkcja wypisuje wszystkie dostepne bronie 
function wypiszbron()
{
	

		tekst='	<div id="bronnapis">Bron</div><div id="bronwybur"></div><div id="strzaly"></div><input type="text" value="100" id="brondmg">';
		document.getElementById("bron").innerHTML = tekst;
	
		tekst="";
		tekst+='<button class="bronwypiszbutton" onclick="wypiszstrzaly(1)"><img  class="bronobraz" src="img/bron/1.png"></button>'
		tekst+='<button class="bronwypiszbutton" onclick="wypiszstrzaly(2)"><img  class="bronobraz" src="img/bron/2.png"></button>'
		tekst+='<button class="bronwypiszbutton" onclick="wypiszstrzaly(3)"><img  class="bronobraz" src="img/bron/3.png"></button>'
		tekst+='<button class="bronwypiszbutton" onclick="wypiszstrzaly(4)"><img  class="bronobraz" src="img/bron/4.png"></button>'
		tekst+='<button class="bronwypiszbutton" onclick="wypiszstrzaly(5)"><img  class="bronobraz" src="img/bron/5.png"></button>'
		tekst+='<button class="bronwypiszbutton" onclick="wypiszstrzaly(6)"><img  class="bronobraz" src="img/bron/6.png"></button>'
		document.getElementById("bronwybur").innerHTML = tekst;
		
	
	
	
	
	
}

function wypiszstrzaly(bron)
{
	var tekst="";
	if(dino.rodzajoswajania==1)
	{
		tekst+='<div class="strzal">Pamiętaj Nie Musisz Usypiać Go ...</div>'
	}
	if(dino.rodzajoswajania==2)
	{
		
		var broniek = [90,121.5,157.5,221,306,442];
		var weapon = broniek[bron-1] * parseInt(document.getElementById("brondmg").value,10);
		weapon=weapon/100;
		var y = Math.ceil(dino.torpor/weapon);
		tekst+='<div class="strzal">Brzusio:'+y+'</div>';
		for(i=1;i<dino.liczbamnoznikow+1;i++)
		{
			var y = Math.ceil(dino.torpor/(weapon*eval("dino.m"+i)));
			tekst+='<div class="strzal">'+eval("dino.m"+i+"n")+':'+y+'</div>';
			
			
			
			
		}
	}	
	if(dino.rodzajoswajania==3)
	{
	tekst='<div class="strzal">No nie da sie tym ... Katapultom ... A ile ? ni wim</div>'
		
	}
	
	
	
	document.getElementById("strzaly").innerHTML = tekst;
}
//Zmiany 2020 :P "trzonu" calculatora nie tykam bo dziłą perfekt 
	//Funkcja sprawdza co 1 sek czy zaszły zmiany w lvl jeśli tak zmienia lvl dinozaura i czy ma odpowiednią wartość 
	var lvl_old = 1;
	
function lvl()
{

	var lvl_new = document.getElementById("lvl").value;
	if((lvl_new<1)||(lvl_new>180))
	{
		document.getElementById("lvl").value=1;
		
	}
	else
	{
		if(lvl_old!=lvl_new)
		{
				console.log(dino);
				lvl_old = lvl_new;
				dinostworzyciel(id_dino);
		}
	
		
	
	
	
	
	}
	

	setTimeout(lvl,500);
}




