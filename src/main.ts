
import { XGLEngine } from 'xgl';

namespace Island {

    let xgl: XGLEngine;

    window.onload = () => {

        xgl = new XGLEngine();
        xgl.start();
    }

    window.onresize = () => {
        xgl && xgl.resize();
    }

}