import { CST } from "./CST";
export class MenuScene extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }
}
function init(){
}
function create(){
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 20, "CST.IMAGE.LOGO").setDepth(1);

    this.add.image(0,0, "title_bg").setOrigin(0).setDepth(0);

    let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "CST.IMAGE.PLAY").setDepth(1);

    this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2+100, "CST.IMAGE.OPTIONS").setDepth(1);

    let hoverSprite = this.add.sprite(100, 100, "ship");
    hoverSprite.setScale(2);
    hoverSprite.setVisible(false);

    this.anims.create({
        key: "walk",
        frameRate: 4,
        repeat: -1,
        frames: this.anims.generateFrameNumbers("ship", {
            frames: [0,1,2,3]
        })
    })


    playButton.setInteractive();
    
    playButton.on("pointerover", ()=>{
        hoverSprite,setVisible(true);
        hoverSprite.play("walk");
        hoverSprite.x = playButton.x - playButton.width;
        hoverSprite.y = playButton,y;
    })

    playButton.on("pointerover", ()=>{
        hoverSprite.setVisible(false);
    })

     playButton.on("pointerover", ()=>{
        this.scene.start(CST.SCENES.PLAY);
    })
    optionsButton.setInteractive();

    optionsButton.on("pointerover", () =>{
        hoverSprite,setVisible(true);
        hoverSprite.play("walk");
        hoverSprite.x = playButton.x - playButton.width;
        hoverSprite.y = playButton,y;
    })

    optionsButton.on("pointerout", ()=>{
        hoverSprite.setVisible(false);
    })
}