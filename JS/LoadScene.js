import { CST } from "./CST";
export class LoadScene extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }
}
async function preload(){
    this.load.image("title_bg", "./Assets/title_bg.jpg");

    this.load.image("options_button", "./Assets/options_button.png");

    this.load.image("play_button", "./Assets/play_button.png");

    this.load.spritesheet("ship", "./Assets/ship.png", {
        frameHeight: 32,
        frameWidth: 32

    });
    
    let loadingBar = this.add.graphics({
        fillStyle: {
            color: 0Xffffff
        }
    })

    

    this.load.on("progress",(percent)=>{
        loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
        console.log(percent);
    })

    this.load.on("complete", ()=>{
        console.log("done!")
    })
}
function create(){
    this.scene.start(CST.SCENES.MENU);
}
