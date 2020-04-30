class Salle1 extends Phaser.Scene {
  constructor(){
    super("Salle1")
  }

	
preload(){
	this.load.image('map', 'assets/map.png');
	this.load.image('bordure', 'assets/bordure.png');
	this.load.image('lampe', 'assets/lampadaire.png');
	this.load.image('portefin', 'assets/epouventail.png');
	this.load.image('itemun', 'assets/itemun.png');
	this.load.image('itemdeux', 'assets/itemdeux.png');
	this.load.image('itemtrois', 'assets/itemtrois.png');
    this.load.spritesheet('personnagePrincipal','assets/personnagePrincipal.png',{ frameWidth: 279, frameHeight: 444 });
    this.load.spritesheet('ennemisUn','assets/renard.png',{ frameWidth: 915, frameHeight: 627 });
    this.load.spritesheet('ennemisDeux','assets/corbeau.png',{ frameWidth: 608, frameHeight: 642 });
    this.load.spritesheet('barreDeVie','assets/barreDeVie.png',{ frameWidth: 500, frameHeight: 250 });
    this.load.spritesheet('inventaire','assets/inventaire.png',{ frameWidth: 500, frameHeight: 500 });
    this.load.spritesheet('porte','assets/porte.png',{ frameWidth: 500, frameHeight: 500 });
}

create(){
	//init
	pointDeVie = 3;
	itemUn = 0;
	itemDeux = 0;
	itemTrois = 0;
	argent = 0;
	mobUnMort = 0;
	mobDeuxMort = 0;
	pouvoirDebloque = 0;
	chargePouvoir = 1;
	coffreNotification = 0;
	destructionDePorte = 0;
	destructionDePortefin = 0;
	destructiondropUn = 0;
	
	style = { font: "bold 45px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };


	//mise en place de la camera
	this.cameras.main.setBounds(0, 0, 4800, 3600);
	this.add.image(0, 0, 'map').setOrigin(0).setScrollFactor(1);
	this.cameras.main.setZoom(0.4);
	this.physics.world.bounds.width = 4800;
    this.physics.world.bounds.height = 3600;

	//statics groups
	bordure = this.physics.add.staticGroup();
	porte = this.physics.add.staticGroup();
	portefin = this.physics.add.staticGroup();
	dropUn = this.physics.add.staticGroup();
	dropDeux = this.physics.add.staticGroup();
	dropTrois = this.physics.add.staticGroup();
	lampe = this.physics.add.staticGroup();


	//Création du personnage du joueur
	perso = this.physics.add.sprite(1200, 900, 'personnagePrincipal');
	this.cameras.main.startFollow(perso, true, 0.09, 0.09);
	perso.setCollideWorldBounds(true);
	
	
	//Création du premier ennemi
	mobUn = this.physics.add.sprite(1900, 900, 'ennemisUn');
	mobUn.setCollideWorldBounds(true);
	mobUn.setBounce(1);
	mobUn.setVelocityX(50);
		
		
		
	//Création du deuxieme ennemi
	mobDeux = this.physics.add.sprite(3600, 2700, 'ennemisDeux');
	mobDeux.setCollideWorldBounds(true);
	mobDeux.setBounce(1);
	mobDeux.setVelocityY(80);	
		
		

		
		//placement
	bordure.create(0, 1800, 'bordure').setOrigin(0).refreshBody();
	bordure.create(2800, 1800, 'bordure').setOrigin(0).refreshBody();
	porte.create(2150, 1700, 'porte').setOrigin(0).refreshBody();
	dropTrois.create(400, 3000, 'itemtrois').setOrigin(0).refreshBody();
	lampe.create(3600, 900, 'lampe').setOrigin(0).setScale(0.5).refreshBody();
	portefin.create(2400, 3000, 'portefin').setOrigin(0).refreshBody();


	
	
	//collision entre les differents éléments	
	this.physics.add.collider(mobUn, perso, touche, null, this);
	this.physics.add.collider(mobDeux, perso, touchedeux, null, this);
	this.physics.add.collider(perso, bordure);
	this.physics.add.collider(mobUn, bordure);
	this.physics.add.collider(mobDeux, bordure);
	this.physics.add.collider(porte, perso, ouverturePorte, null, this);
	this.physics.add.collider(portefin, perso, ouverturePortefin, null, this);
	this.physics.add.collider(dropUn, perso, ramasserItemUn, null, this);
	this.physics.add.collider(dropDeux, perso, ramasserItemDeux, null, this);
	this.physics.add.collider(dropTrois, perso, ramasserItemTrois, null, this);

	

		
	//touches
	cursors = this.input.keyboard.createCursorKeys();
	space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
	toucheV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
	touchei = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);

	
		
	//Animations
	this.anims.create({
		key : 'premiere_perte',
		frames: this.anims.generateFrameNumbers('barreDeVie', {start: 0, end: 1}),
		frameRate: 20,
		repeat: 0
		
	});
	this.anims.create({
		key : 'deuxieme_perte',
		frames: this.anims.generateFrameNumbers('barreDeVie', {start: 1, end: 2}),
		frameRate: 20,
		repeat: 0
		
	});
	this.anims.create({
		key : 'derniere_perte',
		frames: this.anims.generateFrameNumbers('barreDeVie', {start: 2, end: 3}),
		frameRate: 20,
		repeat: 0
		
	});
	this.anims.create({
		key : 'premier_heal',
		frames: this.anims.generateFrameNumbers('barreDeVie', {start: 1, end: 0}),
		frameRate: 20,
		repeat: 0
		
	});
	this.anims.create({
		key : 'deuxieme_heal',
		frames: this.anims.generateFrameNumbers('barreDeVie', {start: 2, end: 1}),
		frameRate: 20,
		repeat: 0
		
	});
	this.anims.create({     //premier item
		key : 'inventaire',
		frames: this.anims.generateFrameNumbers('inventaire', {start: 1, end: 2}),
		frameRate: 20,
		repeat: 0
		
	});
	this.anims.create({     //deuxieme item
		key : 'inventaire',
		frames: this.anims.generateFrameNumbers('inventaire', {start: 2, end: 3}),
		frameRate: 20,
		repeat: 0
		
	});	
	this.anims.create({     //troisieme item
		key : 'inventaire',
		frames: this.anims.generateFrameNumbers('inventaire', {start: 3, end: 4}),
		frameRate: 20,
		repeat: 0
		
	});		
	this.anims.create({
		key : 'animrenard',
		frames: this.anims.generateFrameNumbers('ennemisUn', {start: 1, end: 10}),
		frameRate: 20,
		repeat: -1
		
	});	
	this.anims.create({
		key : 'animcorbeau',
		frames: this.anims.generateFrameNumbers('ennemisDeux', {start: 1, end: 13}),
		frameRate: 20,
		repeat: -1
		
	});	
	this.anims.create({
		key : 'animperso',
		frames: this.anims.generateFrameNumbers('personnagePrincipal', {start: 1, end: 8}),
		frameRate: 20,
		repeat: -1
		
	});
	this.anims.create({
		key : 'idleperso',
		frames: this.anims.generateFrameNumbers('personnagePrincipal', {start: 9, end: 14}),
		frameRate: 9,
		repeat: -1
		
	});	
	this.anims.create({
		key : 'atkperso',
		frames: this.anims.generateFrameNumbers('personnagePrincipal', {start: 15, end: 20}),
		frameRate: 5,
		repeat: -1
		
	});	

		//Création du HUD et barre de dialogue
	barreDeVie = this.physics.add.sprite(1000,-300, 'barreDeVie');
	barreDeVie.setScrollFactor(0);
	inventaire = this.add.image(1000,600, 'inventaire');
	inventaire.setScrollFactor(0);
	texteArgent = this.add.text(1000,-100, argent + ' RizFlouz', style);
	texteArgent.setScrollFactor(0);	
	dialogue = this.add.text(150, 700, 'Recupérez les trois objets ! (Entrer pour supprimer)', style).setOrigin(0.5);
	dialogue.setScrollFactor(0);
	
}
	
update(){
	//commande perso X
if (cursors.left.isDown){
    perso.setVelocityX(-500);
	texteArgent.setText(argent + ' RizFlouz'); //pour mettre a jour l'argent 
	perso.anims.play('animperso',true);
    
}
else if (cursors.right.isDown){
    perso.setVelocityX(500);
	perso.anims.play('animperso',true);
   
}
else{
    perso.setVelocityX(0);
	texteArgent.setText(argent + ' RizFlouz');  //pour mettre a jour l'argent 
    if(mobUnMort === 0){mobUn.anims.play('animrenard',true);}
    if(mobDeuxMort === 0){mobDeux.anims.play('animcorbeau',true);}
	perso.anims.play('idleperso',true);
}
	//Commande perso Y
if (cursors.up.isDown){
    perso.setVelocityY(-500);

    
}
else if (cursors.down.isDown){
    perso.setVelocityY(500);

    
}
else{
    perso.setVelocityY(0);
	
    
}

			


	//quand il n'y a plus de pdv
	if(pointDeVie === 0){
		perso.setTint(0xff0000);
		this.physics.pause();
	}
	//Attaque de notre personnage (attaque de zone autour de lui)
	if(space.isDown && (mobUn.x)-800<(perso.x) && (mobUn.x)+800>(perso.x) && (mobUn.y)+800>(perso.y) && (mobUn.y)-800<(perso.y) && mobUnMort === 0){
	mobUn.destroy();
	dialogue.setText('Il est parti ! Il faut recuperer ça !');
	dropUn.create(mobUn.x, mobUn.y, 'itemun').setOrigin(0).refreshBody();
	mobUnMort = 1;
	argent = argent +25;
	perso.anims.play('atkperso');
	}
	else{
		if(space.isDown && mobUnMort === 0){
		dialogue.setText('Il est torp loin !');
		dialogue.setScrollFactor(0);
			perso.anims.play('atkperso');
	}
	}

	//Attaque de notre personnage (attaque de zone autour de lui)
	if(space.isDown && (mobDeux.x)-600<(perso.x) && (mobDeux.x)+600>(perso.x) && (mobDeux.y)+600>(perso.y) && (mobDeux.y)-600<(perso.y) && mobDeuxMort === 0){
	mobDeux.destroy();
	dialogue.setText('Ahh enfin le dernier est parti !');
	dropDeux.create(mobDeux.x, mobDeux.y, 'itemdeux').setOrigin(0).refreshBody();
	mobDeuxMort = 1;
	argent = argent +25;
		perso.anims.play('atkperso'); 
	}
	else{
		if(space.isDown && mobDeuxMort === 0){
		dialogue.setText('Toujours trop loin !');
		dialogue.setScrollFactor(0);
	}
	}
	//disparition des dialogues
	if(enter.isDown){
		dialogue.setText(' ');
		
	}
	
	//nouveau pouvoir débloqué lorsque les items des deux mobs sont drop
	if(mobUnMort === 1 && mobDeuxMort === 1 && coffreNotification===0){
		dialogue.setText('Nouveau pouvoir ! Soin ' + chargePouvoir + ' utilisation restante');
		pouvoirDebloque = 1;
		coffreNotification = 1;
	}
	//utilisation du pouvoir
	if(toucheV.isDown && pouvoirDebloque === 1 && chargePouvoir != 0 && pointDeVie != 3){
		pointDeVie = pointDeVie + 1;
		chargePouvoir = chargePouvoir-1;
		dialogue.setText('Soin ! ' + chargePouvoir + ' utilisation restante');
	if(pointDeVie===3){
	   barreDeVie.anims.play('premier_heal',true);
	   }
	if(pointDeVie===2){
	   barreDeVie.anims.play('deuxieme_heal',true);
	   }
	}
	else{
		if(toucheV.isDown){
		dialogue.setText('Soin ! Plus d\'utilisation ou compétence non aprise/Ou vous etes deja full!\n Il faut tuer les deux premiers monstres !');	  }	
	}
	
	if(destructionDePorte===1){
		porte.clear(true);
	}
		if(destructionDePortefin===1){
		portefin.clear(true);
	}
			if(destructiondropUn===1){
		dropUn.clear(true);
		iconeinventaireun = this.physics.add.sprite(890, 530, 'itemun').setScale(0.40);	
		iconeinventaireun.setScrollFactor(0);
	}
				if(destructiondropDeux===1){
		dropDeux.clear(true);
		iconeinventairedeux = this.physics.add.sprite(1125, 530, 'itemdeux').setScale(0.40);	
		iconeinventairedeux.setScrollFactor(0);
	}
				if(destructiondropTrois===1){
		dropTrois.clear(true);
		iconeinventairetrois = this.physics.add.sprite(1015, 730, 'itemtrois').setScale(0.40);	
		iconeinventairetrois.setScrollFactor(0);
					
	}

}
}