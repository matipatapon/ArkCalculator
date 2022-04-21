var timery = [];
//czy dino wkrótce sie obudzi
var zagrozenie = false;
var wydanezagrozenie = false;

function timercreator(dino)
{
	this.id=0;
	this.kordy = [];
	this.kordy.wysokosc = parseInt(document.getElementById("Wysokosc").value,10);
	this.kordy.szerokosc = parseInt(document.getElementById("Szerokosc").value,10);
	this.torpor = dino.torpor;
	this.aktualnytorpor = dino.torpor;
	this.spadek = dino.tspadek;
	this.nazwadino = dino.nazwa;
	this.lvldino = dino.lvl;
	this.czasoswajania = 0;
	this.czasdoobudzenia=0;
	this.szkielet="";
	//Ilosc sekund ile bedzie jadl dany this.narkotyk 
	this.narcoberry = 0;
	this.biotoxin = 0;
	this.grzybek = 0;
	this.narcotic = 0;
	//czy dino wkrótce sie obudzi
	this.zagrozenie = false; 
	//funkcja która aktualizuje dane  
this.aktualizuj = function () 

	{
	
	//zmiana czasu oswajania po 1 sekundzie 
		this.czasoswajania = this.czasoswajania + 1;
		
		//Zmiana torporu po 1 sekundzie 
		if(this.narcoberry+this.biotoxin+this.grzybek+this.narcotic==0)
		{
		this.aktualnytorpor-=this.spadek;
			


		}
		if(this.aktualnytorpor<0)
		{
			this.aktualnytorpor=0;
			
		}
		else
		{
			if(this.narcoberry>0)
			{
				this.aktualnytorpor+=2.5;
				this.narcoberry--;
				
			}
			if(this.biotoxin>0)
			{
				this.aktualnytorpor+=5;
				this.biotoxin--;
				
			}
			if(this.grzybek>0)
			{
				this.aktualnytorpor+=12.5;
				this.grzybek--;
				
			}
			if(this.narcotic>0)
			{
				this.aktualnytorpor+=5;
				this.narcotic--;
				
			}
			if(this.aktualnytorpor>this.torpor)
			{
				this.aktualnytorpor=this.torpor;
				this.narcoberry=0;
				this.narcotic=0;
				this.grzybek=0;
				this.biotoxin=0;
				
			}
			
			
		}
		
		//dodatkowy czas z narko 
		var narko = [2.5,5,5,12.5];
		var narkocale = 25;
		var torpordodatni=0;
		var czasdodatni=0;
		
		var torpor = this.torpor-this.aktualnytorpor;
		var narkot =[this.narcoberry,this.narcotic,this.biotoxin,this.grzybek];
		
		for(k=0;k<3;k++)
		{
			for(j=0;j<3;j++)
			{
				if(narkot[j]>narkot[j+1])
				{
					var x = narkot[j];
					narkot[j] = narkot[j+1];
					narkot[j+1] = x;
					x = narko[j];
					narko[j] = narko[j+1];
					narko[j+1] = x;
				}
				
			}
			
		}
				for(k=0;k<4;k++)
		{
			if(narkot[k] * narkocale>torpor)
			{
				torpordodatni=torpor;
				czasdodatni+=Math.ceil(torpor/narkocale);
				break;
			}
			else
			{
				czasdodatni+=narkot[k];
				torpordodatni+=narkocale*narkot[k];
				for(j=i;j<4;j++)
				{
					narkot[j]-=narkot[k];
					
				}
				narkocale-=narko[k];
				
			}
			
		}
		
		
		
		this.czasdoobudzenia = Math.ceil(((this.aktualnytorpor+torpordodatni)/this.spadek+czasdodatni));

		//czy dino wkrótce sie obudzi ? 
			if((this.czasdoobudzenia<300)&&(this.narcoberry+this.narcotic+this.biotoxin+this.grzybek<=0))
			{
			
				this.zagrozenie = true;
				zagrozenie = true;
				document.getElementById('timerid'+this.id).style.background = 'red';

			}
			else
			{

				if(this.zagrozenie==true)
				{
					document.getElementById('timerid'+this.id).style.background = 'url("img/tlo/tlo3.png")';

					this.zagrozenie=false;
					zagrozenie=false;
				

				}

			}
		
		//nazwa + lvl+ obraz
		document.getElementById("tnazwa"+this.id).innerHTML = this.nazwadino+" "+this.lvldino+" lvl";
		document.getElementById("tkordy"+this.id).innerHTML = this.kordy.wysokosc+"/"+this.kordy.szerokosc;
		document.getElementById("tzdjencie"+this.id).innerHTML = '<img src="img/dino/'+this.nazwadino+'.png">';
		//czasy + torpor 
		

		document.getElementById("tos"+this.id).innerHTML = tworzenieczasu(this.czasoswajania);
		document.getElementById("tob"+this.id).innerHTML =  tworzenieczasu(this.czasdoobudzenia);
		document.getElementById("t"+this.id).innerHTML =  Math.ceil(this.aktualnytorpor)+"/"+Math.ceil(this.torpor);
	
	
		//tabelka z this.narkotyk
		document.getElementById("Bz"+this.id).innerHTML = Math.ceil((this.torpor-this.aktualnytorpor)/7.5);
		document.getElementById("Tz"+this.id).innerHTML = Math.ceil((this.torpor-this.aktualnytorpor)/80);
		document.getElementById("Nz"+this.id).innerHTML = Math.ceil((this.torpor-this.aktualnytorpor)/40);
		document.getElementById("Gz"+this.id).innerHTML = Math.ceil((this.torpor-this.aktualnytorpor)/25);
		
		document.getElementById("Bu"+this.id).innerHTML = Math.ceil(this.narcoberry/3);
		document.getElementById("Tu"+this.id).innerHTML = Math.ceil(this.biotoxin/16);
		document.getElementById("Nu"+this.id).innerHTML = Math.ceil(this.narcotic/8);
		document.getElementById("Gu"+this.id).innerHTML = Math.ceil(this.grzybek/2);
	}
	this.stworzszkielet = function()
	{

						//Tworzenie timera na stronie 
				
			this.szkielet=''
			+'<div class="timer" id="timerid'+this.id+'">'
			+'	<div id="tkordy'+this.id+'" class="tkordy">'
			+this.kordy.wysokosc+"/"+this.kordy.szerokosc
			+'</div>'
			+'		<div class="tnazwa" id="tnazwa'+this.id+'">'
					+this.nazwadino+" "+this.lvldino+" lvl"
			+'		</div>'
			+''
			+'	'	
			+'		<div class="tzdjencie" id="tzdjencie'+this.id+'">'
			+'		<img src="img/dino/'+this.nazwadino+'.png">'
			+'		'
			+'		</div>'
			+'		<table class="ttabela">'
			+'			<tr>'
			+'					<th class="tth">Czas Oswajania</th>'
			+'					<th class="tth" id="tos'+this.id+'">0</th>'
			+'			</tr>'
			+'				<tr>'
			+'					<th class="tth">Czas Do Obudzenia</th>'
			+'				<th class="tth" id="tob'+this.id+'">0</th>'
			+'			</tr>'
			+'				<tr>'
			+'					<th class="tth" >Torpor</th>'
			+'					<th class="tth" id="t'+this.id+'">1h.5m.10s</th>'
			+'			</tr>'
						+'				<tr>'
			+'					<th class="tth" ><button onclick="zmientorpor('+this.id+')"class="tprzycisk">Zmien Torpor</button></th>'
			+'					<th class="tth" ><input  id="tz'+this.id+'"  class="tinput" type="text" value="0"></th>'
			+'			</tr>'
			+'		</table>'
			+'		<table class="ttabela">'
			+'			<tr>'
			+'				<th class="tth"></th>'
			+'				<th class="tth">NarcoBerry</th>'
			+'				<th class="tth">BioToxin</th>'
			+'				<th class="tth">Narcotic</th>'
			+'				<th class="tth">Grzybek</th>'
			+'			</tr>'
			+'			<tr>'
			+'				<th class="tth">Zapotrzebowanie</th>'
			+'				<th class="tth" id="Bz'+this.id+'">5</th>'
			+'				<th class="tth" id="Tz'+this.id+'">3</th>'
			+'				<th class="tth" id="Nz'+this.id+'">2</th>'
			+'				<th class="tth" id="Gz'+this.id+'">1</th>'
			+'			</tr>'
			+'			<tr>'
			+'				<th class="tth">W użyciu</th>'
			+'				<th class="tth" id="Bu'+this.id+'">5</th>'
			+'				<th class="tth" id="Tu'+this.id+'">3</th>'
			+'				<th class="tth" id="Nu'+this.id+'">2</th>'
			+'				<th class="tth" id="Gu'+this.id+'">1</th>'
			+'			</tr>'
			+'			<tr>'
			+'				<th class="tth"><button onclick="dodajnarko('+this.id+')" class="tprzycisk">Dodaj</button></th>'
			+'				<th class="tth"><input id="Bd'+this.id+'" class="tinput" type="text" value="0"></th>'
			+'				<th class="tth"><input id="Td'+this.id+'" class="tinput" type="text" value="0"></th>'
			+'				<th class="tth"><input id="Nd'+this.id+'" class="tinput" type="text" value="0"></th>'
			+'				<th class="tth"><input id="Gd'+this.id+'" class="tinput" type="text" value="0"></th>'
			+'			</tr>'
			+'			<tr>'
			+'			'
			+'			</tr>'
			+'			'
			+'		'
			+'		'
			+'		'
			+'		</table>'
			+'<button onclick="Usun('+this.id+')" class="tusun">Usun</button>'
			+'</div>';

				document.getElementById("timer"+this.id).innerHTML=this.szkielet;
					
					
				}

	
	
	
}
//Funkcja tworzy timer 
function starttimer(dino)
{
	
	if(timery.length==0)
	{
		timery[0]=0;
		
	}
	for(i=0;i<timery.length;i++)
	{
	
		if(timery[i]==0)
		{
		
		timery[i]= new timercreator(dino);
		timery[i].id=i;	
		timery[i].stworzszkielet();
		
		break;

		}
		else if(i==timery.length-1)
		{
	
		timery[i+1]= new timercreator(dino);
		timery[i+1].id=i+1;
		document.getElementById("container2").innerHTML+='<div id="timer'+(i+1)+'" ></div>';
		
		timery[i+1].stworzszkielet();
		break;
			
			
		}	
	}
	
	
}

function timer()
{


	
for(i=0;i<timery.length;i++)
{
	
	if(timery[i]!=0)
	{
		timery[i].aktualizuj();
	}
	
}
//sortowanie

for(i=0;i<timery.length-1;i++)
{
	for(j=0;j<timery.length-1;j++)
	{
		
		if(timery[j].czasdoobudzenia>timery[j+1].czasdoobudzenia)
		{
			
			var x = timery[j];
			timery[j]=timery[j+1];
			timery[j+1]=x;
			timery[j].stworzszkielet();
			timery[j+1].stworzszkielet();
			x=timery[j].id;
			timery[j].id=timery[j+1].id;
			timery[j+1].id=x;
			
		}
		
		
	}
	
	
}
	//zmienia kolor tla jesli dino wkrotce sie obudzi

	if((zagrozenie==true))
	{
		if(wydanezagrozenie==false)
		{
		//document.getElementById("container").style.background = 'red';

		document.getElementById("muzyczka").innerHTML = '<audio controls autoplay="true" loop="true" volume="0.0" > <source src="uwaga.mp3" type="audio/mpeg"> </audio>';
	
	

		}
		wydanezagrozenie=true;
	

	}
	else
	{
			wydanezagrozenie=false;
		document.getElementById("muzyczka").innerHTML ="";

			
	}
	
	
setTimeout(timer,1000);	
}
function zmientorpor(id)
{
	timery[id].aktualnytorpor=parseInt(document.getElementById("tz"+id).value,10);
	
}
function dodajnarko(id)
{
	timery[id].narcoberry += (parseInt(document.getElementById("Bd"+id).value,10)*3);
	timery[id].narcotic += (parseInt(document.getElementById("Nd"+id).value,10)*8);
	timery[id].grzybek += parseInt(document.getElementById("Gd"+id).value,10)*2;
	timery[id].biotoxin += parseInt(document.getElementById("Td"+id).value,10)*16;
	document.getElementById("Td"+id).value=0;
	document.getElementById("Nd"+id).value=0;
	document.getElementById("Bd"+id).value=0;
	document.getElementById("Gd"+id).value=0;
}
function Usun(id)
{
zagrozenie = false;
timery[id]=0;	
document.getElementById("timer"+id).innerHTML="";	
}