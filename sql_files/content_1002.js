var dragedIttem = null;
		var active = false;
		var logContiner;
		var body =document.querySelector("#ezaz");
		var oltozet;
		var  gragedObjectModel;
		function initApp (){ 
			var container = document.querySelector("#container");
			container.addEventListener("touchstart", dragStart, false);
			container.addEventListener("touchend", dragEnd, false);
			container.addEventListener("touchmove", drag, false);

			container.addEventListener("mousedown", dragStart, false);
			container.addEventListener("mouseup", dragEnd, false);
			container.addEventListener("mousemove", drag, false);

			oltozet = [ {name:'oltozet1' , good: false , leiras :'<p class="cim" >Makói női népviselet (1857)</p>    Makó város népviseletéről az egyik első képi ábrázolás Joseph Bösstől származik. A nő ünnepi ruhájának formáját a polgári biedermeier szoknya alatt viselt kúp alakú "abroncs" helyett sok alsószoknyából alakították ki. A bokáig érő selyemszoknya előtt körben sötétlila kötő van. A testhönálló, vagy testhözálló nevét a szabása és viselése adja, a női felsőruha követi a test vonalát, derékban szűkülő, és a szegése a harang alakú szoknyára szépen rásimul. A nő fekete színű, selyem fejkendőt visel.' },
			{name:'oltozet2', good: false , leiras :'<p class="cim" >Menyecske öltözet-együttese. Apátfalva, 20. sz. eleje </p> A menyecske testhönállója, szoknyája és kötője kékfestőből varrott, mindhárom viseletdarab anyaga azonos, de mintázata eltérő, kék alapon nyomott piros és fehér virágokkal díszített. A testhönálló a női test vonalát követi, kívül széles fekete csipkével díszített. A szoknya elöl nyitott, derékban sűrűn ráncolt, széle fekete csipkeszegéllyel szegett. Kötője derékban ritkán ráncolt, alján fodorral. '},
			{name:'oltozetF', good: false , leiras :'<p class="cim" >Makói férfi népviselet (1857) </p> A férfi ráncos szárú csizmában van, fehér vászon, bőgatyát visel, inggel és felette ezüst pitykés lajbit, fekete posztóból varrt, zsinórozással díszített, sonkaujjú mándlit, valamint fekete posztó, pörgeszélű, bogrács alakú kalapot.'}

			] 
			
			$.getJSON( "php_engine/engine.php?f=oltozet", function( data ) {
				gragedObjectModel= data;
				gragedObjectModel.forEach(element => initElement(element));
			});
			

			
		
			logContiner =document.querySelector("#log");
			logContiner.innerHTML=  window.innerWidth+" x "+window.innerHeight;
		
		}
						
		
		function initElement(e) {
			parent = document.querySelector("#szekernyInner");
			childNode= document.createElement("DIV");
			childNode.id = e.name;
			parent.appendChild(childNode);   

			e.element = document.querySelector("#"+e.name);

			if(!('currentX' in e)){
			e.currentX = 0;
			}

			if(!('currentY' in e)){
			e.currentY = 0;
			}

			e.initialX =  e.currentX ;
			e.initialY = e.currentY;
			e.xOffset = 0;
			e.yOffset = 0;
			setTranslate(e.currentX, e.currentY, e.element);
			childNode.style.backgroundImage = "url('"+e.image_src+"')";
			childNode.style.width=""+e.width+"px";
			childNode.style.height=""+e.height+"px";
			childNode.style.backgroundPosition =""+e.backgroundPositionX+"px "+e.backgroundPositionY+"px";
			childNode.style.backgroundSize =""+e.backgroundScale+"%";
			childNode.className = "ruhaDarab";
			renderFeliratok();	
		}


		
					

		function dragStart(e) {

			dragedIttem =  gragedObjectModel.find(element => element.element === e.target); 

			if ( typeof dragedIttem !== 'undefined') {
				active = true;
				var cimContiner =document.querySelector("#Cim");

				cimContiner.innerHTML=dragedIttem.leiras;
				if (e.type === "touchstart") {
				dragedIttem.initialX = e.touches[0].clientX - dragedIttem.xOffset;
				dragedIttem.initialY = e.touches[0].clientY - dragedIttem.yOffset;
				} else {
				dragedIttem.initialX = e.clientX - dragedIttem.xOffset;
				dragedIttem.initialY = e.clientY - dragedIttem.yOffset;
				}
			}
		}

		function dragEnd(e) {

		dragedIttem.initialX = dragedIttem.currentX;
		dragedIttem.initialY = dragedIttem.currentY;

		active = false;
		testEnd();
		renderFeliratok();
		}

		function drag(e) {
		if (active) {

		e.preventDefault();

		if (e.type === "touchmove") {
		dragedIttem.currentX = e.touches[0].clientX - dragedIttem.initialX;
		dragedIttem.currentY = e.touches[0].clientY - dragedIttem.initialY;
		} else {
		dragedIttem.currentX = e.clientX - dragedIttem.initialX;
		dragedIttem.currentY = e.clientY - dragedIttem.initialY;
		}

		helyreugraszt(dragedIttem);
		dragedIttem.xOffset = dragedIttem.currentX;
		dragedIttem.yOffset = dragedIttem.currentY;


		setTranslate(dragedIttem.currentX, dragedIttem.currentY, dragedIttem.element);

		}
		}

		function helyreugraszt(element){
		if ((Math.abs(element.endSpaceX -element.currentX)<5) &&
				(Math.abs(element.endSpaceY -element.currentY)<5) 	  ) {
						element.currentX =element.endSpaceX;
						element.currentY =element.endSpaceY;
						}
		}

		function setTranslate(xPos, yPos, el) {
									el.style.transform = " translate(" + xPos + "px, " + yPos + "px) scale("+ ((xPos <150) ?0.5:1)+") ";
		}

		var good= true;
		function testEnd(){
											oltozet.forEach(element => element.good=true);
										var logContiner =document.querySelector("#log");
										gragedObjectModel.forEach(element => testElement(element));
										logContiner.innerHTML="A ruhák :"+JSON.stringify(gragedObjectModel) +" Az öltözetek"+JSON.stringify(oltozet);

		}

		function renderFeliratok(){
										var leiras ='';
										var hany=0;
										oltozet.forEach(function (e) { 
										if (e.good) {leiras +=e.leiras ;hany++;}
										}
										);
										var leirContiner =document.querySelector("#oltozet_leiras");
										if ((hany >0 )&& (hany <3)) {
												leirContiner.innerHTML=leiras;
												leirContiner.style.visibility ='visible';
												} else if  (hany >2){
											leirContiner.innerHTML='Vicces vagy :-) (Egyszere csak 1 ötözet kell a nőre)!!';
											leirContiner.style.visibility  ='visible';
											}else {
											leirContiner.innerHTML='';
											leirContiner.style.visibility = "hidden";
											}
		}

		function testElement(element){

											if (typeof element.endSpaceX  !== 'undefined' && typeof element.endSpaceY  !== 'undefined'){
											if ((Math.abs(element.endSpaceX -element.currentX)>10) ||
											(Math.abs(element.endSpaceY -element.currentY)>10) 	  ) {
											oltozet[element.oltozetSzam].good = false ;
											}
											}
		}
