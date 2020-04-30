class EcranTitre extends Phaser.Scene {
  constructor(){
    super("EcranTitre")
  }

	
preload(){
	this.load.image('logo', 'assets/logo.png');
	this.load.image('map', 'assets/map.png');
	this.load.image('explication', 'assets/renard.png');
}

create(){

		//touches
	cursors = this.input.keyboard.createCursorKeys();
	space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
	toucheV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
	touchei = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
	style = { font: "bold 17px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

	this.add.image(0,0, 'logo').setScale(0.7).setOrigin(0);
	dialogue = this.add.text(400, 400, 'Appuyez sur Espace pour jouer \nAppuyez sur i pour les explications', style).setOrigin(0.5);

	
	
	
	
	
	
	
	
}
	
update(){
if(space.isDown){
	this.scene.start("Salle1");
}
	if(touchei.isDown){
	dialogue.setText('Les autres épouventails sont devenus fous,\nil faut les stoper, approchez vous assez proche d\'eux puis appuyez sur espace pour les calmer.\nVous pouvez debloquer un heal plus tard dans le niveau, pour se soigner appuyez sur V!\nCertains vous empecheronspecherons de passer avant d\'avoir fait fuire les autres !\nUne fois tous les objets rassemblés foncez sur le dernier d\'entre eux !\n (Espace pour partir les calmer !)');
		
}
	 
}
}