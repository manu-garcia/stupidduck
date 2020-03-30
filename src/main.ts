
import { XGLEngine } from 'xgl';

namespace Island {

    let xgl: XGLEngine;

    window.onload = () => {

        xgl = new XGLEngine(320, 480);
        xgl.start("viewport");
    }

    window.onresize = () => {
        xgl && xgl.resize();
    }

}