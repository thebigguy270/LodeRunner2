class Sons {
    
    constructor() {
        var objSon = document.createElement('audio');
        objSon.setAttribute('src', 'dsgetpow.wav');
        objSon.load();
        this.orRamasse = objSon;

		objSon = document.createElement('audio');
        objSon.setAttribute('src', '0477.wav');
        objSon.load();
        this.joueurMort = objSon;
		
        objSon = document.createElement('audio');
        objSon.setAttribute('src', 'Goathelm 1 (short).wav');
        objSon.load();
        this.ennemiEnterre = objSon;
		
		objSon = document.createElement('audio');
        objSon.setAttribute('src', 'TADA.WAV');
        objSon.load();
        this.victoire = objSon;
		
		objSon = document.createElement('audio');
		objSon.setAttribute('src','The_Howie_Long_Scream.ogg.mp3');
		objSon.load();
		this.ennemiMort = objSon;
		
		objSon = document.createElement('audio');
		objSon.setAttribute('src','failhorn.mp3');
		objSon.load();
		this.gameOver = objSon;
		
		objSon = document.createElement('audio');
		objSon.setAttribute('src','grass4.ogg');
		objSon.load();
		this.creuser = objSon;
		
		objSon = document.createElement('audio');
		objSon.setAttribute('src','Pop-sound-effect.mp3');
		objSon.load();
		this.pop = objSon;
		
		objSon = document.createElement('audio');
		objSon.setAttribute('src','Falling-sound-effect.mp3');
		objSon.load();
		this.chute = objSon;
    }
}

class Jeu {
    
    constructor() {
        this.intScore = 0;
		this.intNiveauCourant = 1;
		this.intNbVies = 5;
    }
    
    partieTermine() {
        if (this.intNbVies === 0)
            return true;
        else
            return false;
    }
    
    partieGagne() {
        if (this.intNiveauCourant > 10)
            return true;
        else
            return false;
    }
}

class Niveau {
    
    constructor() {
        this.binDemarre = false;
		this.intTemps = 0;
		this.intNbGardes = objJeu.intNiveauCourant+2;
		this.tabObjFixes = new Array(28);
		
		for (var i = 0; i < this.tabObjFixes.length; i++) {
			this.tabObjFixes[i] = new Array(17).fill(null);
		}
    }
}

class ZoneObjet {
    
    constructor(intXDebut, intYDebut, intXFin, intYFin) {
        this.intXDebut = intXDebut;
        this.intYDebut = intYDebut;
        this.intXFin = intXFin;
        this.intYFin = intYFin;
    }
}

class Brique extends ZoneObjet {
    
    constructor(intXDebut, intYDebut, binBeton, objPasserelle) {
        super(intXDebut, intYDebut, intXDebut + intTailleCase, intYDebut + intTailleCase);
        this.objImage = new Image();
        this.objImage.src = 'stone-wall-dark_half-256x256.gif';
        this.objImage2 = new Image();
        this.objImage2.src = 'beton.png';
        this.binBeton = binBeton;
        this.binTrou = false;
        this.tempsTrou = null;
        this.objPrisonnier = null;
        this.tempsPrisonnier = null;
        this.objPasserelle = objPasserelle;
        objNiveau.tabObjFixes[this.intXDebut/32][this.intYDebut/32] = this;
    }
}

class Passerelle extends ZoneObjet {
    
    constructor(intXDebut, intYDebut, intLargeur, binBeton = false) {
        super(intXDebut * intTailleCase, intYDebut * intTailleCase,
              (intXDebut * intTailleCase) + (intLargeur * intTailleCase),
              (intYDebut * intTailleCase) + intTailleCase);
        this.tabObjBriques = [];
        
        for (var i = this.intXDebut; i < this.intXFin; i+=32) {
            this.tabObjBriques.push(new Brique(i,this.intYDebut,binBeton, this));
        }
    }
}

class BarreauEchelle extends ZoneObjet {
    
    constructor(intXDebut, intYDebut, objEchelle) {
        super(intXDebut, intYDebut, intXDebut + intTailleCase, intYDebut + intTailleCase);
        this.objImage = new Image();
        this.objImage.src = 'es3o1g.png';
        this.objEchelle = objEchelle;
        objNiveau.tabObjFixes[this.intXDebut/32][this.intYDebut/32] = this;
    }
}

class Echelle extends ZoneObjet {
    
    constructor(intXDebut, intYDebut, intHauteur, binVisible = true) {
        super(intXDebut * intTailleCase, intYDebut * intTailleCase,
              (intXDebut * intTailleCase) + intTailleCase,
              (intYDebut * intTailleCase) + (intHauteur * intTailleCase));
        this.tabObjBarreaux = [];
        this.binVisible = binVisible;
        
        for (var i = this.intYDebut; i < this.intYFin; i+=32) {
            this.tabObjBarreaux.push(new BarreauEchelle(this.intXDebut,i,this));
        }
    }
}

class BarreauBarre extends ZoneObjet {
    
    constructor(intXDebut, intYDebut) {
        super(intXDebut, intYDebut, intXDebut + intTailleCase, intYDebut + intTailleCase);
        this.objImage = new Image();
        this.objImage.src = 'Barre.png';
        objNiveau.tabObjFixes[this.intXDebut/32][this.intYDebut/32] = this;
    }
}

class Barre extends ZoneObjet {
    
    constructor(intXDebut, intYDebut, intLargeur) {
        super(intXDebut * intTailleCase, intYDebut * intTailleCase,
              (intXDebut * intTailleCase) + (intLargeur * intTailleCase),
              (intYDebut * intTailleCase) + intTailleCase);
        this.tabObjBarreaux = [];
        
        for (var i = this.intXDebut; i < this.intXFin; i+=32) {
            this.tabObjBarreaux.push(new BarreauBarre(i,this.intYDebut));
        }
    }
}

class Lingot extends ZoneObjet {
    
    constructor(intXDebut, intYDebut) {
        super(intXDebut * intTailleCase, intYDebut * intTailleCase,
              (intXDebut * intTailleCase) + intTailleCase,
              (intYDebut * intTailleCase) + intTailleCase);
        this.objImage = new Image();
        this.objImage.src = 'or.png';
        objNiveau.tabObjFixes[this.intXDebut/32][this.intYDebut/32] = this;
    }
}

class Personnage extends ZoneObjet {
		
    constructor(intXDebut, intYDebut, intVitesse) {
        super(intXDebut, intYDebut, intXDebut+intTailleCase, intYDebut+intTailleCase);
        this.tabImagesPasserelle = [];
        this.intIndexTabImagesPasserelle = 3;
        this.tabImagesBarre = [];
        this.intIndexTabImagesBarre = 3;
        this.tabImagesEchelle = [];
        this.intIndexTabImagesEchelle = 3;
        this.intVitesse = intVitesse;
        this.binDroite = true;
        this.tabObjLingots = [];
        
    }
    
    estDansPasserelle() {
		var binEstDansPasserelle = false;
		var intGauche = this.intXDebut;
		var intDroite = this.intXFin;
		var intBas = this.intYFin;
		
		var objPasserelle = null;
		var intGauchePasserelle = null;
		var intDroitePasserelle = null;
		var intBasPasserelle = null;
			
		for (var i = 0; i < tabObjPasserelles.length && !binEstDansPasserelle; i++) {
			objPasserelle = tabObjPasserelles[i];
				
			intGauchePasserelle = objPasserelle.intXDebut;
			intDroitePasserelle = objPasserelle.intXFin;
			intBasPasserelle = objPasserelle.intYFin;
					
			if (intBas == intBasPasserelle)
				if (intGauche+8 <= intDroitePasserelle &&
					intDroite-8 >= intGauchePasserelle)
					binEstDansPasserelle = true;
		}
		
		return binEstDansPasserelle;
	}
	
	estSurBarre() {
		var binEstSurBarre = false;
		var intGauche = this.intXDebut;
		var intDroite = this.intXFin;
		var intBas = this.intYFin;
		
		var objBarre = null;
		var intGaucheBarre = null;
		var intDroiteBarre = null;
		var intBasBarre = null;
			
		for (var i = 0; i < tabObjBarres.length && !binEstSurBarre; i++) {
			objBarre = tabObjBarres[i];
				
			intGaucheBarre = objBarre.intXDebut;
			intDroiteBarre = objBarre.intXFin;
			intBasBarre = objBarre.intYFin;
					
			if (intBas == intBasBarre) {
				if (intGauche+8 <= intDroiteBarre &&
					intDroite-8 >= intGaucheBarre) {	
					binEstSurBarre = true;
				}
			}
		}
		
		return binEstSurBarre;
	}
	
	estSurEchelle() {
		var binEstSurEchelle = false;
		var intGauche = this.intXDebut;
		var intDroite = this.intXFin;
		var intBas = this.intYFin;
		
		var objEchelle = null;
		var intGaucheEchelle = null;
		var intDroiteEchelle = null;
		var intHautEchelle = null;
			
		for (var i = 0; i < tabObjEchelles.length && !binEstSurEchelle; i++) {
			objEchelle = tabObjEchelles[i];
			
			if (objEchelle.binVisible) { 
				intGaucheEchelle = objEchelle.intXDebut;
				intDroiteEchelle = objEchelle.intXFin;
				intHautEchelle = objEchelle.intYDebut;
						
				if (intBas == intHautEchelle)
					if (intGauche+8 <= intDroiteEchelle &&
						intDroite-8 >= intGaucheEchelle)
						binEstSurEchelle = true;
			}
		}
		
		return binEstSurEchelle;
	}
	
	estDansEchelle() {
		var binEstDansEchelle = false;
		var intGauche = this.intXDebut;
		var intDroite = this.intXFin;
		var intBas = this.intYFin;
		
		var objEchelle = null;
		var intGaucheEchelle = null;
		var intDroiteEchelle = null;
        var intBasEchelle = null;
		var intHautEchelle = null;
			
		for (var i = 0; i < tabObjEchelles.length && !binEstDansEchelle; i++) {
			objEchelle = tabObjEchelles[i];
			
			if (objEchelle.binVisible) { 
				intGaucheEchelle = objEchelle.intXDebut;
				intDroiteEchelle = objEchelle.intXFin;
				intHautEchelle = objEchelle.intYDebut;
				intBasEchelle = objEchelle.intYFin;
						
				if (intGauche+8 <= intDroiteEchelle &&
					intDroite-8 >= intGaucheEchelle)
					if (intBas >= intHautEchelle &&
						intBas <= intBasEchelle)
						binEstDansEchelle = true;
			}
		}
		
        return binEstDansEchelle;
	}
    
     estEnmureVif() {
		var binEstDansBrique = false;
		var intGauche = this.intXDebut;
		var intDroite = this.intXFin;
		var intBas = this.intYFin;
		var intHaut = this.intYDebut;
		var objBrique = null;
		var intGaucheBrique = null;
		var intDroiteBrique = null;
		var intBasBrique = null;
		var intHautBrique = null;	
			for (var i = 0; i < objNiveau.tabObjFixes.length; i++) {
				for (var j = 0; j < objNiveau.tabObjFixes[i].length;j++){
					if(objNiveau.tabObjFixes[i][j] instanceof Brique){
						if(objNiveau.tabObjFixes[i][j].binTrou===false){
						objBrique = objNiveau.tabObjFixes[i][j];
							
						intGaucheBrique = objBrique.intXDebut;
						intDroiteBrique = objBrique.intXFin;
						intBasBrique = objBrique.intYDebut-32;
						intHautBrique = objBrique.intYDebut;		
						if (intBas == intBasBrique&&
							intHaut == intHautBrique){
							if (intGauche+8 <= intDroiteBrique &&
								intDroite-8 >= intGaucheBrique) {
										
								binEstDansBrique = true;
							}
						}
					}
				}
			}
		
		}
		return binEstDansBrique;
	}
    
    deplacementGauchePermis() {
		var binDeplacementPossible = true;
		var intGauche = this.intXDebut;
		var intHaut = this.intYDebut;
		var intBas = this.intYFin;
		
		if (intGauche > 2) {
			var objPasserelle = null;
			var intGauchePasserelle = null;
			var intDroitePasserelle = null;
			var intHautPasserelle = null;
			var intBasPasserelle = null;
			
			for (var i = 0; i < tabObjPasserelles.length && binDeplacementPossible; i++) {
				objPasserelle = tabObjPasserelles[i];
				
				intGauchePasserelle = objPasserelle.intXDebut;
				intDroitePasserelle = objPasserelle.intXFin;
				intHautPasserelle = objPasserelle.intYDebut;
				intBasPasserelle = objPasserelle.intYFin;
				
				if (intBas > intHautPasserelle &&
					intHaut < intBasPasserelle) {
					if (intGauche-this.intVitesse <= intDroitePasserelle &&
						intGauche-this.intVitesse >= intGauchePasserelle)
						binDeplacementPossible = false;
				}
			}
		} else {
			binDeplacementPossible = false;
		}
		
		return binDeplacementPossible;
	}
	
	deplacementDroitePermis() {
		var binDeplacementPossible = true;
		var intDroite = this.intXFin;
		var intHaut = this.intYDebut;
		var intBas = this.intYFin;
		
		if (intDroite < 894) {
			var objPasserelle = null;
			var intGauchePasserelle = null;
			var intDroitePasserelle = null;
			var intHautPasserelle = null;
			var intBasPasserelle = null;
			
			for (var i = 0; i < tabObjPasserelles.length && binDeplacementPossible; i++) {
				objPasserelle = tabObjPasserelles[i];
				
				intGauchePasserelle = objPasserelle.intXDebut;
				intDroitePasserelle = objPasserelle.intXFin;
				intHautPasserelle = objPasserelle.intYDebut;
				intBasPasserelle = objPasserelle.intYFin;
				
				if (intBas > intHautPasserelle &&
					intHaut < intBasPasserelle) {
					if (intDroite+this.intVitesse >= intGauchePasserelle &&
						intDroite+this.intVitesse <= intDroitePasserelle)
						binDeplacementPossible = false;
				}
			}
		} else {
			binDeplacementPossible = false;
		}
		
		return binDeplacementPossible;
	}
	
	deplacementHautPermis() {
		var binDeplacementPossible = -1;
		var intGauche = this.intXDebut;
		var intDroite = this.intXFin;
		var intHaut = this.intYDebut;
		var intBas = this.intYFin;
		
		if (intHaut > 2) {
			var objEchelle = null;
			var intGaucheEchelle = null;
			var intDroiteEchelle = null;
			var intHautEchelle = null;
			var intBasEchelle = null;
			
			for (var i = 0; i < tabObjEchelles.length && binDeplacementPossible == -1; i++) {
				objEchelle = tabObjEchelles[i];
				
				if (objEchelle.binVisible) { 
					intGaucheEchelle = objEchelle.intXDebut;
					intDroiteEchelle = objEchelle.intXFin;
					intHautEchelle = objEchelle.intYDebut;
					intBasEchelle = objEchelle.intYFin;
					
					if (intGauche+8 >= intGaucheEchelle &&
						intDroite-8 <= intDroiteEchelle) {
						
						if (intBas-this.intVitesse > intHautEchelle)
							binDeplacementPossible = 1;
						else if (intBas > intHautEchelle)
							binDeplacementPossible = 0;
					}
				}
			}
		}
		
		return binDeplacementPossible;
	}
	
	deplacementBasPermis() {
		var binDeplacementPossible = -1;
		
		if (this.estSurBarre() && !this.estSurPasserelle())
            binDeplacementPossible = 1;
        else {
            var intGauche = this.intXDebut;
            var intDroite = this.intXFin;
            var intBas = this.intYFin;
            
            var objEchelle = null;
            var intGaucheEchelle = null;
            var intDroiteEchelle = null;
            var intHautEchelle = null;
            var intBasEchelle = null;
            
            for (var i = 0; i < tabObjEchelles.length && binDeplacementPossible == -1; i++) {
                objEchelle = tabObjEchelles[i];
                
                if (objEchelle.binVisible) { 
                    intGaucheEchelle = objEchelle.intXDebut;
                    intDroiteEchelle = objEchelle.intXFin;
                    intHautEchelle = objEchelle.intYDebut;
                    intBasEchelle = objEchelle.intYFin;
                    
                    if (intGauche+8 >= intGaucheEchelle &&
                        intDroite-8 <= intDroiteEchelle) {
                        
                        if (intBas+this.intVitesse < intBasEchelle)
                            binDeplacementPossible = 1;
                        else if (intBas < intBasEchelle)
                            binDeplacementPossible = 0;
                    }
                }
            }
        }
		
		return binDeplacementPossible;
	}
    
    estEnCollisionAvecLingot() {
		var binEstEnCollision = false;
		var intGauche = this.intXDebut;
		var intDroite = this.intXFin;
		var intHaut = this.intYDebut;
		var intBas = this.intYFin;
  
		var objLingot = null;
		var intGaucheLingot = null;
		var intDroiteLingot = null;
		var intHautLingot = null;
		var intBasLingot = null;
		
		for (var i = 0; i < tabObjLingots.length && !binEstEnCollision; i++) {
			objLingot = tabObjLingots[i];
			intGaucheLingot = objLingot.intXDebut;
			intDroiteLingot = objLingot.intXFin;
			intHautLingot = objLingot.intYDebut;
			intBasLingot = objLingot.intYFin;
			
			binEstEnCollision = (intBas > intHautLingot) && (intHaut < intBasLingot) && (intDroite > intGaucheLingot) && (intGauche < intDroiteLingot); 
		}
		
		if (binEstEnCollision)
			this.tabObjLingots.push(tabObjLingots.splice(tabObjLingots.indexOf(objLingot),1));
            
		return binEstEnCollision;
	}
}

class Garde extends Personnage {
    
    constructor(intXDebut, intYDebut) {
        super(intXDebut * intTailleCase, intYDebut * intTailleCase, 1, 1, 0);

        var objImage = null;
        
        for (var i = 1; i <= 4; i++) {
            objImage = new Image();
            objImage.src = 'ennemiMarche' + i + '.png';
            this.tabImagesPasserelle.push(objImage);
        }
        
        for (i = 1; i <= 4; i++) {
            objImage = new Image();
            objImage.src = 'ennemiBarre' + i + '.png';
            this.tabImagesBarre.push(objImage);
        }
        
        for (i = 1; i <= 4; i++) {
            objImage = new Image();
            objImage.src = 'ennemiEchelle' + i + '.png';
            this.tabImagesEchelle.push(objImage);
        }
        objImage = new Image();
        objImage.src = 'ennemiTombe.png';
        this.ennemiChute = objImage;
        this.pourPasJouerSonEnLoop = false;
        this.objImage = this.tabImagesPasserelle[this.intIndexTabImagesPasserelle];
        this.intDirectionX = 1;
    }
    
    estSurPasserelle() {
		var binEstSurPasserelle = false;
		var intGauche = this.intXDebut;
		var intDroite = this.intXFin;
		var intBas = this.intYFin;
		
		var objPasserelle = null;
		var intGauchePasserelle = null;
		var intDroitePasserelle = null;
		var intHautPasserelle = null;
			
		for (var i = 0; i < tabObjPasserelles.length && !binEstSurPasserelle; i++) {
			objPasserelle = tabObjPasserelles[i];
			intGauchePasserelle = objPasserelle.intXDebut;
			intDroitePasserelle = objPasserelle.intXFin;
			intHautPasserelle = objPasserelle.intYDebut;
					
			if (intBas == intHautPasserelle) {
				if (intGauche+8 <= intDroitePasserelle &&
					intDroite-8 >= intGauchePasserelle) {
					var objBrique = null;
					var intGaucheBrique = null;
					var intDroiteBrique = null;
                    
					for (var j = 0; j < objPasserelle.tabObjBriques.length && !binEstSurPasserelle; j++) {
						objBrique = objPasserelle.tabObjBriques[j];
						intGaucheBrique = objBrique.intXDebut;
						intDroiteBrique = objBrique.intXFin;
						
						if (intGauche+8 <= intDroiteBrique &&
							intDroite-8 >= intGaucheBrique)
							if (!objBrique.binBeton && (!objBrique.binTrou ||
                                                        (objBrique.binTrou &&
                                                         objBrique.objPrisonnier)))
								binEstSurPasserelle = true;
					}
				}
			}
		}
		
		return binEstSurPasserelle;
	}
}

class LodeRunner extends Personnage {
        
    constructor() {
        super((objCanvas.width/2) - (intTailleCase/2), 448, 2, 0, 0);
        
        var objImage = null;
        
        for (var i = 1; i <= 4; i++) {
            objImage = new Image();
            objImage.src = 'marcher' + i + '.png';
            this.tabImagesPasserelle.push(objImage);
        }

        for (i = 1; i <= 4; i++) {
            objImage = new Image();
            objImage.src = 'barre' + i + '.png';
            this.tabImagesBarre.push(objImage);
        }

        for (i = 1; i <= 4; i++) {
            objImage = new Image();
            objImage.src = 'echelle' + i + '.png';
            this.tabImagesEchelle.push(objImage);
        }
        this.tabImagesLodeRunnerCreuse = [];
        for (i = 1; i <= 3; i++) {
            objImage = new Image();
            objImage.src = 'creuser' + i + '.png';
            this.tabImagesLodeRunnerCreuse.push(objImage);
        }
        objImage = new Image();
		objImage.src = 'chute.png';
		this.joueurChute = objImage;
        this.intDirectionCreuser=0;
        this.objImage = this.tabImagesPasserelle[this.intIndexTabImagesPasserelle];
        this.intDirectionX = 0;
        this.intDirectionY = 0;
    }
    
    estSurPasserelle() {
		var binEstSurPasserelle = false;
		var intGauche = this.intXDebut;
		var intDroite = this.intXFin;
		var intBas = this.intYFin;
		
		var objPasserelle = null;
		var intGauchePasserelle = null;
		var intDroitePasserelle = null;
		var intHautPasserelle = null;
			
		for (var i = 0; i < tabObjPasserelles.length && !binEstSurPasserelle; i++) {
			objPasserelle = tabObjPasserelles[i];
			intGauchePasserelle = objPasserelle.intXDebut;
			intDroitePasserelle = objPasserelle.intXFin;
			intHautPasserelle = objPasserelle.intYDebut;
					
			if (intBas == intHautPasserelle) {
				if (intGauche+8 <= intDroitePasserelle &&
					intDroite-8 >= intGauchePasserelle) {
					var objBrique = null;
					var intGaucheBrique = null;
					var intDroiteBrique = null;
                    
					for (var j = 0; j < objPasserelle.tabObjBriques.length && !binEstSurPasserelle; j++) {
						objBrique = objPasserelle.tabObjBriques[j];
						intGaucheBrique = objBrique.intXDebut;
						intDroiteBrique = objBrique.intXFin;
						
						if (intGauche+8 <= intDroiteBrique &&
							intDroite-8 >= intGaucheBrique)
							if (!objBrique.binTrou || (objBrique.binTrou && objBrique.objPrisonnier))
								binEstSurPasserelle = true;
					}
				}
			}
		}
		
		return binEstSurPasserelle;
	}
    
    estEnCollisionAvecGarde() {
        var binEstEnCollision = false;
        var intGaucheLodeRunner = this.intXDebut;
        var intDroiteLodeRunner = this.intXFin;
        var intHautLodeRunner = this.intYDebut;
        var intBasLodeRunner = this.intYFin;
  
        var objGarde = null;
        var intGaucheGarde = null;
        var intDroiteGarde = null;
        var intHautGarde = null;
        var intBasGarde = null;
        
        for (var i = 0; i < tabObjGardes.length && !binEstEnCollision; i++) {
            objGarde = tabObjGardes[i];
            intGaucheGarde = objGarde.intXDebut;
            intDroiteGarde = objGarde.intXFin;
            intHautGarde = objGarde.intYDebut;
            intBasGarde = objGarde.intYFin;
            
            binEstEnCollision = (intBasLodeRunner > intHautGarde) && (intHautLodeRunner < intBasGarde) && (intDroiteLodeRunner > intGaucheGarde) && (intGaucheLodeRunner < intDroiteGarde);
        }
        
        return binEstEnCollision;
    }
}