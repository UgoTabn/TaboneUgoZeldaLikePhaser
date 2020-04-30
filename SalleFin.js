class SalleFin extends Phaser.Scene {
  constructor(){
    super("SalleFin")
  }

	
preload(){
		this.load.image('fin', 'assets/fin.png');
}

create(){
	this.add.image(400,300, 'fin');
		cursors = this.input.keyboard.createCursorKeys();
	space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
	toucheV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
	touchei = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
	style = { font: "bold 35px Arial", fill: "#000", boundsAlignH: "center", boundsAlignV: "middle" };
	dialogue = this.add.text(400, 500, 'Merci d\'avoir joué :)\nAppuyez sur Espace pour retourner au debut', style).setOrigin(0.5);
}
	
update(){
if(space.isDown){
	this.scene.start("EcranTitre"); 
}
	 
}
}