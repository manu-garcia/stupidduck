
import { XGLEngine } from 'xgl';
import { IBehaviorBuilder } from 'xgl/dist/behaviors/IBehaviorBuilder';
import { IBitmapFontAsset } from 'xgl/dist/graphics/IBitmapFontAsset';
import { ISoundAsset } from 'xgl/dist/audio/ISoundAsset';
import { Material } from 'xgl/dist/graphics/material';
import { Color } from 'xgl/dist/graphics/color';

import { PlayerBehaviorBuilder } from './behaviors/PlayerBehavior';

namespace StupidDuck {

    class Game extends XGLEngine {

        public constructor() {
            super(320, 480);
        }

        public startGame() {

            window.onload = () => {
                this.start("viewport");
            }

            window.onresize = () => {
                this.resize();
            }
        }

        protected getGameBehaviorBuilders(): IBehaviorBuilder[] {
            return [
                new PlayerBehaviorBuilder(),
            ];
        }

        protected getGameBitmapFonts(): IBitmapFontAsset[] {
            return [{
                name: "default",
                src: "assets/fonts/text.txt",
            }];
        }

        protected getGameMaterials(): Material[] {
            return [
                new Material('bg', 'assets/textures/bg.png', new Color(255, 255, 255, 255)),
                new Material('end', 'assets/textures/end.png', new Color(255, 255, 255, 255)),
                new Material('middle', 'assets/textures/middle.png', new Color(255, 255, 255, 255)),
                new Material('grass', 'assets/textures/grass.png', new Color(255, 255, 255, 255)),
                new Material('duck', 'assets/textures/duck.png', new Color(255, 255, 255, 255)),
                new Material('playbtn', 'assets/textures/playbtn.png', new Color(255, 255, 255, 255)),
                new Material('restartbtn', 'assets/textures/restartbtn.png', new Color(255, 255, 255, 255)),
                new Material('score', 'assets/textures/score.png', new Color(255, 255, 255, 255)),
                new Material('title', 'assets/textures/title.png', new Color(255, 255, 255, 255)),
                new Material('tutorial', 'assets/textures/tutorial.png', new Color(255, 255, 255, 255)),
            ];
        }

        protected getGameSounds(): ISoundAsset[] {
            return [{
                name: 'flap',
                src: 'assets/sounds/flap.mp3',
                loop: false,
            },
            {
                name: 'ting',
                src: 'assets/sounds/ting.mp3',
                loop: false,
            },
            {
                name: 'dead',
                src: 'assets/sounds/dead.mp3',
                loop: false,
            }];
        }
    }

    const game = new Game();
    game.startGame();

}