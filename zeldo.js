var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },

scene: [EcranTitre,Salle1,SalleFin]

};
let perso;
let mobUn;
let mobDeux;
let cursors;
let space;
let enter;
let toucheV;
let touchei;
let pointDeVie;
let barreDeVie;
let inventaire;
let dialogue;
let itemUn;
let itemDeux;
let itemTrois;
let dropUn;
let dropDeux;
let dropTrois;
let argent;
let texteArgent;
let mobUnMort;
let mobDeuxMort;
let pouvoirDebloque;
let chargePouvoir;
let porte;
let portefin;
let coffreNotification;
let destructionDePorte;
let destructionDePortefin;
let bordure;
let style;
let destructiondropUn;
let destructiondropDeux;
let destructiondropTrois;
let lampe;
let logo;
let explication;
let iconeinventaireun;
let iconeinventairedeux;
let iconeinventairetrois;


function touche(mobUn, perso){
		pointDeVie--;

	if(pointDeVie===2){
	   barreDeVie.anims.play('premiere_perte',true);
	   }
	if(pointDeVie===1){
	   barreDeVie.anims.play('deuxieme_perte',true);
	   }
	if(pointDeVie===0){
	   barreDeVie.anims.play('derniere_perte',true);
	   }


};
function touchedeux(mobDeux, perso){
		pointDeVie--;

	if(pointDeVie===2){
	   barreDeVie.anims.play('premiere_perte',true);
	   }
	if(pointDeVie===1){
	   barreDeVie.anims.play('deuxieme_perte',true);
	   }
	if(pointDeVie===0){
	   barreDeVie.anims.play('derniere_perte',true);
	   }


};
function ouverturePorte(porte, perso){

	if(mobUnMort ===1 && itemUn ===1){
	   dialogue.setText('Vu que vous avez les conditions requise, la porte est ouverte');
	   destructionDePorte = 1;
	   }
	else{
	   dialogue.setText('Les conditions ne sont pas remplies\nFaire partir le premier monstre et prendre la soie');
	}
					
};
function ouverturePortefin(portefin, perso){

	if(mobUnMort ===1 && mobDeuxMort===1 && itemUn === 1 && itemDeux === 1 && itemTrois === 1){
	   dialogue.setText('Vu que vous avez les conditions requise, la porte est ouverte');
	   destructionDePortefin = 1;
		this.scene.start("SalleFin");
	   }
	else{
	   dialogue.setText('Les conditions ne sont pas remplies, il faut les trois objets.');
	}
					
};

function ramasserItemUn(porte, dropUn){
	destructiondropUn = 1;
	itemUn = 1;

	};
function ramasserItemDeux(porte, dropDeux){
	destructiondropDeux = 1;
	itemDeux = 1;

	};				
function ramasserItemTrois(porte, dropTrois){
	destructiondropTrois = 1;
	itemTrois = 1;

	};
this.game = new Phaser.Game(config);

