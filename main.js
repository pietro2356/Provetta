import {LoadScene} from "./JS/LoadScene";
import {MenuScene} from "./JS/MenuScene";
import {PlayScene} from "./JS/PlayScene";
let game = new Phaser.Game({
    scene:[
        LoadScene, MenuScene, PlayScene
    ],
    render:{
        pixelArt: true
    }
});
