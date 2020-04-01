// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/xgl/node_modules/gl-matrix/esm/common.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setMatrixArrayType = setMatrixArrayType;
exports.toRadian = toRadian;
exports.equals = equals;
exports.RANDOM = exports.ARRAY_TYPE = exports.EPSILON = void 0;

/**
 * Common utilities
 * @module glMatrix
 */
// Configuration Constants
var EPSILON = 0.000001;
exports.EPSILON = EPSILON;
var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
exports.ARRAY_TYPE = ARRAY_TYPE;
var RANDOM = Math.random;
/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */

exports.RANDOM = RANDOM;

function setMatrixArrayType(type) {
  exports.ARRAY_TYPE = ARRAY_TYPE = type;
}

var degree = Math.PI / 180;
/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */

function toRadian(a) {
  return a * degree;
}
/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */


function equals(a, b) {
  return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}

if (!Math.hypot) Math.hypot = function () {
  var y = 0,
      i = arguments.length;

  while (i--) {
    y += arguments[i] * arguments[i];
  }

  return Math.sqrt(y);
};
},{}],"node_modules/xgl/node_modules/gl-matrix/esm/mat2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.clone = clone;
exports.copy = copy;
exports.identity = identity;
exports.fromValues = fromValues;
exports.set = set;
exports.transpose = transpose;
exports.invert = invert;
exports.adjoint = adjoint;
exports.determinant = determinant;
exports.multiply = multiply;
exports.rotate = rotate;
exports.scale = scale;
exports.fromRotation = fromRotation;
exports.fromScaling = fromScaling;
exports.str = str;
exports.frob = frob;
exports.LDU = LDU;
exports.add = add;
exports.subtract = subtract;
exports.exactEquals = exactEquals;
exports.equals = equals;
exports.multiplyScalar = multiplyScalar;
exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
exports.sub = exports.mul = void 0;

var glMatrix = _interopRequireWildcard(require("./common.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * 2x2 Matrix
 * @module mat2
 */

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
function create() {
  var out = new glMatrix.ARRAY_TYPE(4);

  if (glMatrix.ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
  }

  out[0] = 1;
  out[3] = 1;
  return out;
}
/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */


function clone(a) {
  var out = new glMatrix.ARRAY_TYPE(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */


function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */


function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
/**
 * Create a new mat2 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out A new 2x2 matrix
 */


function fromValues(m00, m01, m10, m11) {
  var out = new glMatrix.ARRAY_TYPE(4);
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}
/**
 * Set the components of a mat2 to the given values
 *
 * @param {mat2} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out
 */


function set(out, m00, m01, m10, m11) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}
/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */


function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache
  // some values
  if (out === a) {
    var a1 = a[1];
    out[1] = a[2];
    out[2] = a1;
  } else {
    out[0] = a[0];
    out[1] = a[2];
    out[2] = a[1];
    out[3] = a[3];
  }

  return out;
}
/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */


function invert(out, a) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3]; // Calculate the determinant

  var det = a0 * a3 - a2 * a1;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = a3 * det;
  out[1] = -a1 * det;
  out[2] = -a2 * det;
  out[3] = a0 * det;
  return out;
}
/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */


function adjoint(out, a) {
  // Caching this value is nessecary if out == a
  var a0 = a[0];
  out[0] = a[3];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a0;
  return out;
}
/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */


function determinant(a) {
  return a[0] * a[3] - a[2] * a[1];
}
/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */


function multiply(out, a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  return out;
}
/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */


function rotate(out, a, rad) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = a0 * c + a2 * s;
  out[1] = a1 * c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  return out;
}
/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/


function scale(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  return out;
}
/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.rotate(dest, dest, rad);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */


function fromRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = -s;
  out[3] = c;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.scale(dest, dest, vec);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2} out
 */


function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = v[1];
  return out;
}
/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */


function str(a) {
  return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
}
/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */


function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3]);
}
/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix
 * @param {mat2} D the diagonal matrix
 * @param {mat2} U the upper triangular matrix
 * @param {mat2} a the input matrix to factorize
 */


function LDU(L, D, U, a) {
  L[2] = a[2] / a[0];
  U[0] = a[0];
  U[1] = a[1];
  U[3] = a[3] - L[2] * U[1];
  return [L, D, U];
}
/**
 * Adds two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */


function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */


function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2} out
 */


function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
/**
 * Adds two mat2's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2} out the receiving vector
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2} out
 */


function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  return out;
}
/**
 * Alias for {@link mat2.multiply}
 * @function
 */


var mul = multiply;
/**
 * Alias for {@link mat2.subtract}
 * @function
 */

exports.mul = mul;
var sub = subtract;
exports.sub = sub;
},{"./common.js":"node_modules/xgl/node_modules/gl-matrix/esm/common.js"}],"node_modules/xgl/node_modules/gl-matrix/esm/mat2d.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.clone = clone;
exports.copy = copy;
exports.identity = identity;
exports.fromValues = fromValues;
exports.set = set;
exports.invert = invert;
exports.determinant = determinant;
exports.multiply = multiply;
exports.rotate = rotate;
exports.scale = scale;
exports.translate = translate;
exports.fromRotation = fromRotation;
exports.fromScaling = fromScaling;
exports.fromTranslation = fromTranslation;
exports.str = str;
exports.frob = frob;
exports.add = add;
exports.subtract = subtract;
exports.multiplyScalar = multiplyScalar;
exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
exports.exactEquals = exactEquals;
exports.equals = equals;
exports.sub = exports.mul = void 0;

var glMatrix = _interopRequireWildcard(require("./common.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * 2x3 Matrix
 * @module mat2d
 *
 * @description
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, b, c,
 *  d, tx, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, b, 0,
 *  c, d, 0,
 *  tx, ty, 1]
 * </pre>
 * The last column is ignored so the array is shorter and operations are faster.
 */

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
function create() {
  var out = new glMatrix.ARRAY_TYPE(6);

  if (glMatrix.ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[4] = 0;
    out[5] = 0;
  }

  out[0] = 1;
  out[3] = 1;
  return out;
}
/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */


function clone(a) {
  var out = new glMatrix.ARRAY_TYPE(6);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  return out;
}
/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */


function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  return out;
}
/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */


function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  return out;
}
/**
 * Create a new mat2d with the given values
 *
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} A new mat2d
 */


function fromValues(a, b, c, d, tx, ty) {
  var out = new glMatrix.ARRAY_TYPE(6);
  out[0] = a;
  out[1] = b;
  out[2] = c;
  out[3] = d;
  out[4] = tx;
  out[5] = ty;
  return out;
}
/**
 * Set the components of a mat2d to the given values
 *
 * @param {mat2d} out the receiving matrix
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} out
 */


function set(out, a, b, c, d, tx, ty) {
  out[0] = a;
  out[1] = b;
  out[2] = c;
  out[3] = d;
  out[4] = tx;
  out[5] = ty;
  return out;
}
/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */


function invert(out, a) {
  var aa = a[0],
      ab = a[1],
      ac = a[2],
      ad = a[3];
  var atx = a[4],
      aty = a[5];
  var det = aa * ad - ab * ac;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = ad * det;
  out[1] = -ab * det;
  out[2] = -ac * det;
  out[3] = aa * det;
  out[4] = (ac * aty - ad * atx) * det;
  out[5] = (ab * atx - aa * aty) * det;
  return out;
}
/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */


function determinant(a) {
  return a[0] * a[3] - a[1] * a[2];
}
/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */


function multiply(out, a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  out[4] = a0 * b4 + a2 * b5 + a4;
  out[5] = a1 * b4 + a3 * b5 + a5;
  return out;
}
/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */


function rotate(out, a, rad) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = a0 * c + a2 * s;
  out[1] = a1 * c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  out[4] = a4;
  out[5] = a5;
  return out;
}
/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/


function scale(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  out[4] = a4;
  out[5] = a5;
  return out;
}
/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/


function translate(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0;
  out[1] = a1;
  out[2] = a2;
  out[3] = a3;
  out[4] = a0 * v0 + a2 * v1 + a4;
  out[5] = a1 * v0 + a3 * v1 + a5;
  return out;
}
/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.rotate(dest, dest, rad);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */


function fromRotation(out, rad) {
  var s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = -s;
  out[3] = c;
  out[4] = 0;
  out[5] = 0;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.scale(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2d} out
 */


function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = v[1];
  out[4] = 0;
  out[5] = 0;
  return out;
}
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.translate(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat2d} out
 */


function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = v[0];
  out[5] = v[1];
  return out;
}
/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */


function str(a) {
  return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ')';
}
/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */


function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], 1);
}
/**
 * Adds two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2d} out
 */


function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  return out;
}
/**
 * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2d} out the receiving vector
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2d} out
 */


function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */


function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */


function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5));
}
/**
 * Alias for {@link mat2d.multiply}
 * @function
 */


var mul = multiply;
/**
 * Alias for {@link mat2d.subtract}
 * @function
 */

exports.mul = mul;
var sub = subtract;
exports.sub = sub;
},{"./common.js":"node_modules/xgl/node_modules/gl-matrix/esm/common.js"}],"node_modules/xgl/node_modules/gl-matrix/esm/mat3.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.fromMat4 = fromMat4;
exports.clone = clone;
exports.copy = copy;
exports.fromValues = fromValues;
exports.set = set;
exports.identity = identity;
exports.transpose = transpose;
exports.invert = invert;
exports.adjoint = adjoint;
exports.determinant = determinant;
exports.multiply = multiply;
exports.translate = translate;
exports.rotate = rotate;
exports.scale = scale;
exports.fromTranslation = fromTranslation;
exports.fromRotation = fromRotation;
exports.fromScaling = fromScaling;
exports.fromMat2d = fromMat2d;
exports.fromQuat = fromQuat;
exports.normalFromMat4 = normalFromMat4;
exports.projection = projection;
exports.str = str;
exports.frob = frob;
exports.add = add;
exports.subtract = subtract;
exports.multiplyScalar = multiplyScalar;
exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
exports.exactEquals = exactEquals;
exports.equals = equals;
exports.sub = exports.mul = void 0;

var glMatrix = _interopRequireWildcard(require("./common.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * 3x3 Matrix
 * @module mat3
 */

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
function create() {
  var out = new glMatrix.ARRAY_TYPE(9);

  if (glMatrix.ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }

  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}
/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */


function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}
/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */


function clone(a) {
  var out = new glMatrix.ARRAY_TYPE(9);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */


function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */


function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  var out = new glMatrix.ARRAY_TYPE(9);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */


function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */


function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */


function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }

  return out;
}
/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */


function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20; // Calculate the determinant

  var det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}
/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */


function adjoint(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  out[0] = a11 * a22 - a12 * a21;
  out[1] = a02 * a21 - a01 * a22;
  out[2] = a01 * a12 - a02 * a11;
  out[3] = a12 * a20 - a10 * a22;
  out[4] = a00 * a22 - a02 * a20;
  out[5] = a02 * a10 - a00 * a12;
  out[6] = a10 * a21 - a11 * a20;
  out[7] = a01 * a20 - a00 * a21;
  out[8] = a00 * a11 - a01 * a10;
  return out;
}
/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */


function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}
/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */


function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b00 = b[0],
      b01 = b[1],
      b02 = b[2];
  var b10 = b[3],
      b11 = b[4],
      b12 = b[5];
  var b20 = b[6],
      b21 = b[7],
      b22 = b[8];
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}
/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */


function translate(out, a, v) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      x = v[0],
      y = v[1];
  out[0] = a00;
  out[1] = a01;
  out[2] = a02;
  out[3] = a10;
  out[4] = a11;
  out[5] = a12;
  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}
/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */


function rotate(out, a, rad) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;
  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;
  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
}

;
/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/

function scale(out, a, v) {
  var x = v[0],
      y = v[1];
  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];
  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat3} out
 */


function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = v[0];
  out[7] = v[1];
  out[8] = 1;
  return out;
}
/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */


function fromRotation(out, rad) {
  var s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = -s;
  out[4] = c;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat3} out
 */


function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = v[1];
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/


function fromMat2d(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = 0;
  out[3] = a[2];
  out[4] = a[3];
  out[5] = 0;
  out[6] = a[4];
  out[7] = a[5];
  out[8] = 1;
  return out;
}
/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/


function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;
  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;
  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;
  return out;
}
/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/


function normalFromMat4(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  return out;
}
/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param {mat3} out mat3 frustum matrix will be written into
 * @param {number} width Width of your gl context
 * @param {number} height Height of gl context
 * @returns {mat3} out
 */


function projection(out, width, height) {
  out[0] = 2 / width;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = -2 / height;
  out[5] = 0;
  out[6] = -1;
  out[7] = 1;
  out[8] = 1;
  return out;
}
/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */


function str(a) {
  return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ')';
}
/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */


function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
}
/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */


function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}
/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */


function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */


function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */


function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7],
      a8 = a[8];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7],
      b8 = b[8];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8));
}
/**
 * Alias for {@link mat3.multiply}
 * @function
 */


var mul = multiply;
/**
 * Alias for {@link mat3.subtract}
 * @function
 */

exports.mul = mul;
var sub = subtract;
exports.sub = sub;
},{"./common.js":"node_modules/xgl/node_modules/gl-matrix/esm/common.js"}],"node_modules/xgl/node_modules/gl-matrix/esm/mat4.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.clone = clone;
exports.copy = copy;
exports.fromValues = fromValues;
exports.set = set;
exports.identity = identity;
exports.transpose = transpose;
exports.invert = invert;
exports.adjoint = adjoint;
exports.determinant = determinant;
exports.multiply = multiply;
exports.translate = translate;
exports.scale = scale;
exports.rotate = rotate;
exports.rotateX = rotateX;
exports.rotateY = rotateY;
exports.rotateZ = rotateZ;
exports.fromTranslation = fromTranslation;
exports.fromScaling = fromScaling;
exports.fromRotation = fromRotation;
exports.fromXRotation = fromXRotation;
exports.fromYRotation = fromYRotation;
exports.fromZRotation = fromZRotation;
exports.fromRotationTranslation = fromRotationTranslation;
exports.fromQuat2 = fromQuat2;
exports.getTranslation = getTranslation;
exports.getScaling = getScaling;
exports.getRotation = getRotation;
exports.fromRotationTranslationScale = fromRotationTranslationScale;
exports.fromRotationTranslationScaleOrigin = fromRotationTranslationScaleOrigin;
exports.fromQuat = fromQuat;
exports.frustum = frustum;
exports.perspective = perspective;
exports.perspectiveFromFieldOfView = perspectiveFromFieldOfView;
exports.ortho = ortho;
exports.lookAt = lookAt;
exports.targetTo = targetTo;
exports.str = str;
exports.frob = frob;
exports.add = add;
exports.subtract = subtract;
exports.multiplyScalar = multiplyScalar;
exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
exports.exactEquals = exactEquals;
exports.equals = equals;
exports.sub = exports.mul = void 0;

var glMatrix = _interopRequireWildcard(require("./common.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
function create() {
  var out = new glMatrix.ARRAY_TYPE(16);

  if (glMatrix.ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }

  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */


function clone(a) {
  var out = new glMatrix.ARRAY_TYPE(16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */


function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */


function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var out = new glMatrix.ARRAY_TYPE(16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */


function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */


function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */


function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a12 = a[6],
        a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}
/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */


function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */


function adjoint(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
  out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
  out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
  out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
  out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
  out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
  return out;
}
/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */


function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */


function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15]; // Cache only the current line of the second matrix

  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */


function translate(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}
/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/


function scale(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */


function rotate(out, a, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;

  if (len < glMatrix.EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11]; // Construct the elements of the rotation matrix

  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  return out;
}
/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


function rotateX(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


function rotateY(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


function rotateZ(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */


function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */


function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */


function fromRotation(out, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;

  if (len < glMatrix.EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c; // Perform rotation-specific matrix multiplication

  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


function fromXRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


function fromYRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


function fromZRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */


function fromRotationTranslation(out, q, v) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 from a dual quat.
 *
 * @param {mat4} out Matrix
 * @param {quat2} a Dual Quaternion
 * @returns {mat4} mat4 receiving operation result
 */


function fromQuat2(out, a) {
  var translation = new glMatrix.ARRAY_TYPE(3);
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7];
  var magnitude = bx * bx + by * by + bz * bz + bw * bw; //Only scale if it makes sense

  if (magnitude > 0) {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
  } else {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  }

  fromRotationTranslation(out, a, translation);
  return out;
}
/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */


function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */


function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}
/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */


function getRotation(out, mat) {
  var scaling = new glMatrix.ARRAY_TYPE(3);
  getScaling(scaling, mat);
  var is1 = 1 / scaling[0];
  var is2 = 1 / scaling[1];
  var is3 = 1 / scaling[2];
  var sm11 = mat[0] * is1;
  var sm12 = mat[1] * is2;
  var sm13 = mat[2] * is3;
  var sm21 = mat[4] * is1;
  var sm22 = mat[5] * is2;
  var sm23 = mat[6] * is3;
  var sm31 = mat[8] * is1;
  var sm32 = mat[9] * is2;
  var sm33 = mat[10] * is3;
  var trace = sm11 + sm22 + sm33;
  var S = 0;

  if (trace > 0) {
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (sm23 - sm32) / S;
    out[1] = (sm31 - sm13) / S;
    out[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
    out[3] = (sm23 - sm32) / S;
    out[0] = 0.25 * S;
    out[1] = (sm12 + sm21) / S;
    out[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
    out[3] = (sm31 - sm13) / S;
    out[0] = (sm12 + sm21) / S;
    out[1] = 0.25 * S;
    out[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
    out[3] = (sm12 - sm21) / S;
    out[0] = (sm31 + sm13) / S;
    out[1] = (sm23 + sm32) / S;
    out[2] = 0.25 * S;
  }

  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */


function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @param {vec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */


function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  var ox = o[0];
  var oy = o[1];
  var oz = o[2];
  var out0 = (1 - (yy + zz)) * sx;
  var out1 = (xy + wz) * sx;
  var out2 = (xz - wy) * sx;
  var out4 = (xy - wz) * sy;
  var out5 = (1 - (xx + zz)) * sy;
  var out6 = (yz + wx) * sy;
  var out8 = (xz + wy) * sz;
  var out9 = (yz - wx) * sz;
  var out10 = (1 - (xx + yy)) * sz;
  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = 0;
  out[4] = out4;
  out[5] = out5;
  out[6] = out6;
  out[7] = 0;
  out[8] = out8;
  out[9] = out9;
  out[10] = out10;
  out[11] = 0;
  out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
  out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
  out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
  out[15] = 1;
  return out;
}
/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */


function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */


function frustum(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left);
  var tb = 1 / (top - bottom);
  var nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}
/**
 * Generates a perspective projection matrix with the given bounds.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {mat4} out
 */


function perspective(out, fovy, aspect, near, far) {
  var f = 1.0 / Math.tan(fovy / 2),
      nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;

  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }

  return out;
}
/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */


function perspectiveFromFieldOfView(out, fov, near, far) {
  var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
  var downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
  var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
  var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
  var xScale = 2.0 / (leftTan + rightTan);
  var yScale = 2.0 / (upTan + downTan);
  out[0] = xScale;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  out[4] = 0.0;
  out[5] = yScale;
  out[6] = 0.0;
  out[7] = 0.0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1.0;
  out[12] = 0.0;
  out[13] = 0.0;
  out[14] = far * near / (near - far);
  out[15] = 0.0;
  return out;
}
/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */


function ortho(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis.
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */


function lookAt(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];

  if (Math.abs(eyex - centerx) < glMatrix.EPSILON && Math.abs(eyey - centery) < glMatrix.EPSILON && Math.abs(eyez - centerz) < glMatrix.EPSILON) {
    return identity(out);
  }

  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len = 1 / Math.hypot(z0, z1, z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.hypot(x0, x1, x2);

  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len = Math.hypot(y0, y1, y2);

  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }

  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}
/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */


function targetTo(out, eye, target, up) {
  var eyex = eye[0],
      eyey = eye[1],
      eyez = eye[2],
      upx = up[0],
      upy = up[1],
      upz = up[2];
  var z0 = eyex - target[0],
      z1 = eyey - target[1],
      z2 = eyez - target[2];
  var len = z0 * z0 + z1 * z1 + z2 * z2;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }

  var x0 = upy * z2 - upz * z1,
      x1 = upz * z0 - upx * z2,
      x2 = upx * z1 - upy * z0;
  len = x0 * x0 + x1 * x1 + x2 * x2;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}

;
/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */

function str(a) {
  return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
}
/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */


function frob(a) {
  return Math.hypot(a[0], a[1], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
}
/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */


function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}
/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */


function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  out[9] = a[9] + b[9] * scale;
  out[10] = a[10] + b[10] * scale;
  out[11] = a[11] + b[11] * scale;
  out[12] = a[12] + b[12] * scale;
  out[13] = a[13] + b[13] * scale;
  out[14] = a[14] + b[14] * scale;
  out[15] = a[15] + b[15] * scale;
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */


function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */


function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7];
  var a8 = a[8],
      a9 = a[9],
      a10 = a[10],
      a11 = a[11];
  var a12 = a[12],
      a13 = a[13],
      a14 = a[14],
      a15 = a[15];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  var b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7];
  var b8 = b[8],
      b9 = b[9],
      b10 = b[10],
      b11 = b[11];
  var b12 = b[12],
      b13 = b[13],
      b14 = b[14],
      b15 = b[15];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a15), Math.abs(b15));
}
/**
 * Alias for {@link mat4.multiply}
 * @function
 */


var mul = multiply;
/**
 * Alias for {@link mat4.subtract}
 * @function
 */

exports.mul = mul;
var sub = subtract;
exports.sub = sub;
},{"./common.js":"node_modules/xgl/node_modules/gl-matrix/esm/common.js"}],"node_modules/xgl/node_modules/gl-matrix/esm/vec3.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.clone = clone;
exports.length = length;
exports.fromValues = fromValues;
exports.copy = copy;
exports.set = set;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
exports.ceil = ceil;
exports.floor = floor;
exports.min = min;
exports.max = max;
exports.round = round;
exports.scale = scale;
exports.scaleAndAdd = scaleAndAdd;
exports.distance = distance;
exports.squaredDistance = squaredDistance;
exports.squaredLength = squaredLength;
exports.negate = negate;
exports.inverse = inverse;
exports.normalize = normalize;
exports.dot = dot;
exports.cross = cross;
exports.lerp = lerp;
exports.hermite = hermite;
exports.bezier = bezier;
exports.random = random;
exports.transformMat4 = transformMat4;
exports.transformMat3 = transformMat3;
exports.transformQuat = transformQuat;
exports.rotateX = rotateX;
exports.rotateY = rotateY;
exports.rotateZ = rotateZ;
exports.angle = angle;
exports.zero = zero;
exports.str = str;
exports.exactEquals = exactEquals;
exports.equals = equals;
exports.forEach = exports.sqrLen = exports.len = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = void 0;

var glMatrix = _interopRequireWildcard(require("./common.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
function create() {
  var out = new glMatrix.ARRAY_TYPE(3);

  if (glMatrix.ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  return out;
}
/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */


function clone(a) {
  var out = new glMatrix.ARRAY_TYPE(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */


function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.hypot(x, y, z);
}
/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */


function fromValues(x, y, z) {
  var out = new glMatrix.ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */


function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */


function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to ceil
 * @returns {vec3} out
 */


function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}
/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to floor
 * @returns {vec3} out
 */


function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}
/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}
/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}
/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to round
 * @returns {vec3} out
 */


function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}
/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */


function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */


function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */


function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.hypot(x, y, z);
}
/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */


function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}
/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */


function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */


function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */


function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}
/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */


function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}
/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */


function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


function cross(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2];
  var bx = b[0],
      by = b[1],
      bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */


function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */


function hermite(out, a, b, c, d, t) {
  var factorTimes2 = t * t;
  var factor1 = factorTimes2 * (2 * t - 3) + 1;
  var factor2 = factorTimes2 * (t - 2) + t;
  var factor3 = factorTimes2 * (t - 1);
  var factor4 = factorTimes2 * (3 - 2 * t);
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */


function bezier(out, a, b, c, d, t) {
  var inverseFactor = 1 - t;
  var inverseFactorTimesTwo = inverseFactor * inverseFactor;
  var factorTimes2 = t * t;
  var factor1 = inverseFactorTimesTwo * inverseFactor;
  var factor2 = 3 * t * inverseFactorTimesTwo;
  var factor3 = 3 * factorTimes2 * inverseFactor;
  var factor4 = factorTimes2 * t;
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */


function random(out, scale) {
  scale = scale || 1.0;
  var r = glMatrix.RANDOM() * 2.0 * Math.PI;
  var z = glMatrix.RANDOM() * 2.0 - 1.0;
  var zScale = Math.sqrt(1.0 - z * z) * scale;
  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale;
  return out;
}
/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */


function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */


function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
/**
 * Transforms the vec3 with a quat
 * Can also be used for dual quaternions. (Multiply it with the real part)
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */


function transformQuat(out, a, q) {
  // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];
  var x = a[0],
      y = a[1],
      z = a[2]; // var qvec = [qx, qy, qz];
  // var uv = vec3.cross([], qvec, a);

  var uvx = qy * z - qz * y,
      uvy = qz * x - qx * z,
      uvz = qx * y - qy * x; // var uuv = vec3.cross([], qvec, uv);

  var uuvx = qy * uvz - qz * uvy,
      uuvy = qz * uvx - qx * uvz,
      uuvz = qx * uvy - qy * uvx; // vec3.scale(uv, uv, 2 * w);

  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2; // vec3.scale(uuv, uuv, 2);

  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2; // return vec3.add(out, a, vec3.add(out, uv, uuv));

  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */


function rotateX(out, a, b, c) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[0];
  r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
  r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */


function rotateY(out, a, b, c) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */


function rotateZ(out, a, b, c) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
  r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
  r[2] = p[2]; //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */


function angle(a, b) {
  var tempA = fromValues(a[0], a[1], a[2]);
  var tempB = fromValues(b[0], b[1], b[2]);
  normalize(tempA, tempA);
  normalize(tempB, tempB);
  var cosine = dot(tempA, tempB);

  if (cosine > 1.0) {
    return 0;
  } else if (cosine < -1.0) {
    return Math.PI;
  } else {
    return Math.acos(cosine);
  }
}
/**
 * Set the components of a vec3 to zero
 *
 * @param {vec3} out the receiving vector
 * @returns {vec3} out
 */


function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  out[2] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {vec3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */


function str(a) {
  return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
}
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2));
}
/**
 * Alias for {@link vec3.subtract}
 * @function
 */


var sub = subtract;
/**
 * Alias for {@link vec3.multiply}
 * @function
 */

exports.sub = sub;
var mul = multiply;
/**
 * Alias for {@link vec3.divide}
 * @function
 */

exports.mul = mul;
var div = divide;
/**
 * Alias for {@link vec3.distance}
 * @function
 */

exports.div = div;
var dist = distance;
/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */

exports.dist = dist;
var sqrDist = squaredDistance;
/**
 * Alias for {@link vec3.length}
 * @function
 */

exports.sqrDist = sqrDist;
var len = length;
/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */

exports.len = len;
var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

exports.sqrLen = sqrLen;

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 3;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }

    return a;
  };
}();

exports.forEach = forEach;
},{"./common.js":"node_modules/xgl/node_modules/gl-matrix/esm/common.js"}],"node_modules/xgl/node_modules/gl-matrix/esm/vec4.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.clone = clone;
exports.fromValues = fromValues;
exports.copy = copy;
exports.set = set;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
exports.ceil = ceil;
exports.floor = floor;
exports.min = min;
exports.max = max;
exports.round = round;
exports.scale = scale;
exports.scaleAndAdd = scaleAndAdd;
exports.distance = distance;
exports.squaredDistance = squaredDistance;
exports.length = length;
exports.squaredLength = squaredLength;
exports.negate = negate;
exports.inverse = inverse;
exports.normalize = normalize;
exports.dot = dot;
exports.cross = cross;
exports.lerp = lerp;
exports.random = random;
exports.transformMat4 = transformMat4;
exports.transformQuat = transformQuat;
exports.zero = zero;
exports.str = str;
exports.exactEquals = exactEquals;
exports.equals = equals;
exports.forEach = exports.sqrLen = exports.len = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = void 0;

var glMatrix = _interopRequireWildcard(require("./common.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
function create() {
  var out = new glMatrix.ARRAY_TYPE(4);

  if (glMatrix.ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }

  return out;
}
/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */


function clone(a) {
  var out = new glMatrix.ARRAY_TYPE(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */


function fromValues(x, y, z, w) {
  var out = new glMatrix.ARRAY_TYPE(4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */


function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */


function set(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}
/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */


function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
}
/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */


function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
}
/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to ceil
 * @returns {vec4} out
 */


function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  out[3] = Math.ceil(a[3]);
  return out;
}
/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to floor
 * @returns {vec4} out
 */


function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  out[3] = Math.floor(a[3]);
  return out;
}
/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */


function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  out[3] = Math.min(a[3], b[3]);
  return out;
}
/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */


function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  out[3] = Math.max(a[3], b[3]);
  return out;
}
/**
 * Math.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to round
 * @returns {vec4} out
 */


function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  out[3] = Math.round(a[3]);
  return out;
}
/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */


function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */


function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */


function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return Math.hypot(x, y, z, w);
}
/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */


function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return x * x + y * y + z * z + w * w;
}
/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */


function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.hypot(x, y, z, w);
}
/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */


function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return x * x + y * y + z * z + w * w;
}
/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */


function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = -a[3];
  return out;
}
/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to invert
 * @returns {vec4} out
 */


function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
}
/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */


function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len = x * x + y * y + z * z + w * w;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }

  out[0] = x * len;
  out[1] = y * len;
  out[2] = z * len;
  out[3] = w * len;
  return out;
}
/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */


function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
/**
 * Returns the cross-product of three vectors in a 4-dimensional space
 *
 * @param {vec4} result the receiving vector
 * @param {vec4} U the first vector
 * @param {vec4} V the second vector
 * @param {vec4} W the third vector
 * @returns {vec4} result
 */


function cross(out, u, v, w) {
  var A = v[0] * w[1] - v[1] * w[0],
      B = v[0] * w[2] - v[2] * w[0],
      C = v[0] * w[3] - v[3] * w[0],
      D = v[1] * w[2] - v[2] * w[1],
      E = v[1] * w[3] - v[3] * w[1],
      F = v[2] * w[3] - v[3] * w[2];
  var G = u[0];
  var H = u[1];
  var I = u[2];
  var J = u[3];
  out[0] = H * F - I * E + J * D;
  out[1] = -(G * F) + I * C - J * B;
  out[2] = G * E - H * C + J * A;
  out[3] = -(G * D) + H * B - I * A;
  return out;
}

;
/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec4} out
 */

function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */


function random(out, scale) {
  scale = scale || 1.0; // Marsaglia, George. Choosing a Point from the Surface of a
  // Sphere. Ann. Math. Statist. 43 (1972), no. 2, 645--646.
  // http://projecteuclid.org/euclid.aoms/1177692644;

  var v1, v2, v3, v4;
  var s1, s2;

  do {
    v1 = glMatrix.RANDOM() * 2 - 1;
    v2 = glMatrix.RANDOM() * 2 - 1;
    s1 = v1 * v1 + v2 * v2;
  } while (s1 >= 1);

  do {
    v3 = glMatrix.RANDOM() * 2 - 1;
    v4 = glMatrix.RANDOM() * 2 - 1;
    s2 = v3 * v3 + v4 * v4;
  } while (s2 >= 1);

  var d = Math.sqrt((1 - s1) / s2);
  out[0] = scale * v1;
  out[1] = scale * v2;
  out[2] = scale * v3 * d;
  out[3] = scale * v4 * d;
  return out;
}
/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */


function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}
/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */


function transformQuat(out, a, q) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3]; // calculate quat * vec

  var ix = qw * x + qy * z - qz * y;
  var iy = qw * y + qz * x - qx * z;
  var iz = qw * z + qx * y - qy * x;
  var iw = -qx * x - qy * y - qz * z; // calculate result * inverse quat

  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  out[3] = a[3];
  return out;
}
/**
 * Set the components of a vec4 to zero
 *
 * @param {vec4} out the receiving vector
 * @returns {vec4} out
 */


function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {vec4} a vector to represent as a string
 * @returns {String} string representation of the vector
 */


function str(a) {
  return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
}
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
}
/**
 * Alias for {@link vec4.subtract}
 * @function
 */


var sub = subtract;
/**
 * Alias for {@link vec4.multiply}
 * @function
 */

exports.sub = sub;
var mul = multiply;
/**
 * Alias for {@link vec4.divide}
 * @function
 */

exports.mul = mul;
var div = divide;
/**
 * Alias for {@link vec4.distance}
 * @function
 */

exports.div = div;
var dist = distance;
/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */

exports.dist = dist;
var sqrDist = squaredDistance;
/**
 * Alias for {@link vec4.length}
 * @function
 */

exports.sqrDist = sqrDist;
var len = length;
/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */

exports.len = len;
var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

exports.sqrLen = sqrLen;

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 4;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }

    return a;
  };
}();

exports.forEach = forEach;
},{"./common.js":"node_modules/xgl/node_modules/gl-matrix/esm/common.js"}],"node_modules/xgl/node_modules/gl-matrix/esm/quat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.identity = identity;
exports.setAxisAngle = setAxisAngle;
exports.getAxisAngle = getAxisAngle;
exports.getAngle = getAngle;
exports.multiply = multiply;
exports.rotateX = rotateX;
exports.rotateY = rotateY;
exports.rotateZ = rotateZ;
exports.calculateW = calculateW;
exports.exp = exp;
exports.ln = ln;
exports.pow = pow;
exports.slerp = slerp;
exports.random = random;
exports.invert = invert;
exports.conjugate = conjugate;
exports.fromMat3 = fromMat3;
exports.fromEuler = fromEuler;
exports.str = str;
exports.setAxes = exports.sqlerp = exports.rotationTo = exports.equals = exports.exactEquals = exports.normalize = exports.sqrLen = exports.squaredLength = exports.len = exports.length = exports.lerp = exports.dot = exports.scale = exports.mul = exports.add = exports.set = exports.copy = exports.fromValues = exports.clone = void 0;

var glMatrix = _interopRequireWildcard(require("./common.js"));

var mat3 = _interopRequireWildcard(require("./mat3.js"));

var vec3 = _interopRequireWildcard(require("./vec3.js"));

var vec4 = _interopRequireWildcard(require("./vec4.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Quaternion
 * @module quat
 */

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
function create() {
  var out = new glMatrix.ARRAY_TYPE(4);

  if (glMatrix.ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  out[3] = 1;
  return out;
}
/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */


function identity(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/


function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}
/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {vec3} out_axis  Vector receiving the axis of rotation
 * @param  {quat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */


function getAxisAngle(out_axis, q) {
  var rad = Math.acos(q[3]) * 2.0;
  var s = Math.sin(rad / 2.0);

  if (s > glMatrix.EPSILON) {
    out_axis[0] = q[0] / s;
    out_axis[1] = q[1] / s;
    out_axis[2] = q[2] / s;
  } else {
    // If s is zero, return any axis (no rotation - axis does not matter)
    out_axis[0] = 1;
    out_axis[1] = 0;
    out_axis[2] = 0;
  }

  return rad;
}
/**
 * Gets the angular distance between two unit quaternions
 *
 * @param  {quat} a     Origin unit quaternion 
 * @param  {quat} b     Destination unit quaternion
 * @return {Number}     Angle, in radians, between the two quaternions
 */


function getAngle(a, b) {
  var dotproduct = dot(a, b);
  return Math.acos(2 * dotproduct * dotproduct - 1);
}
/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */


function multiply(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */


function rotateX(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */


function rotateY(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var by = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */


function rotateZ(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bz = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}
/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */


function calculateW(out, a) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
  return out;
}
/**
 * Calculate the exponential of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate the exponential of
 * @returns {quat} out
 */


function exp(out, a) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var et = Math.exp(w);
  var s = r > 0 ? et * Math.sin(r) / r : 0;
  out[0] = x * s;
  out[1] = y * s;
  out[2] = z * s;
  out[3] = et * Math.cos(r);
  return out;
}
/**
 * Calculate the natural logarithm of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate the exponential of
 * @returns {quat} out
 */


function ln(out, a) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var t = r > 0 ? Math.atan2(r, w) / r : 0;
  out[0] = x * t;
  out[1] = y * t;
  out[2] = z * t;
  out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
  return out;
}
/**
 * Calculate the scalar power of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate the exponential of
 * @param {Number} b amount to scale the quaternion by
 * @returns {quat} out
 */


function pow(out, a, b) {
  ln(out, a);
  scale(out, out, b);
  exp(out, out);
  return out;
}
/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */


function slerp(out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  var omega, cosom, sinom, scale0, scale1; // calc cosine

  cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

  if (cosom < 0.0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  } // calculate coefficients


  if (1.0 - cosom > glMatrix.EPSILON) {
    // standard case (slerp)
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  } // calculate final values


  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out;
}
/**
 * Generates a random unit quaternion
 * 
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */


function random(out) {
  // Implementation of http://planning.cs.uiuc.edu/node198.html
  // TODO: Calling random 3 times is probably not the fastest solution
  var u1 = glMatrix.RANDOM();
  var u2 = glMatrix.RANDOM();
  var u3 = glMatrix.RANDOM();
  var sqrt1MinusU1 = Math.sqrt(1 - u1);
  var sqrtU1 = Math.sqrt(u1);
  out[0] = sqrt1MinusU1 * Math.sin(2.0 * Math.PI * u2);
  out[1] = sqrt1MinusU1 * Math.cos(2.0 * Math.PI * u2);
  out[2] = sqrtU1 * Math.sin(2.0 * Math.PI * u3);
  out[3] = sqrtU1 * Math.cos(2.0 * Math.PI * u3);
  return out;
}
/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */


function invert(out, a) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  var invDot = dot ? 1.0 / dot : 0; // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}
/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */


function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}
/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */


function fromMat3(out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  var fTrace = m[0] + m[4] + m[8];
  var fRoot;

  if (fTrace > 0.0) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0); // 2w

    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot; // 1/(4w)

    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    // |w| <= 1/2
    var i = 0;
    if (m[4] > m[0]) i = 1;
    if (m[8] > m[i * 3 + i]) i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }

  return out;
}
/**
 * Creates a quaternion from the given euler angle x, y, z.
 *
 * @param {quat} out the receiving quaternion
 * @param {x} Angle to rotate around X axis in degrees.
 * @param {y} Angle to rotate around Y axis in degrees.
 * @param {z} Angle to rotate around Z axis in degrees.
 * @returns {quat} out
 * @function
 */


function fromEuler(out, x, y, z) {
  var halfToRad = 0.5 * Math.PI / 180.0;
  x *= halfToRad;
  y *= halfToRad;
  z *= halfToRad;
  var sx = Math.sin(x);
  var cx = Math.cos(x);
  var sy = Math.sin(y);
  var cy = Math.cos(y);
  var sz = Math.sin(z);
  var cz = Math.cos(z);
  out[0] = sx * cy * cz - cx * sy * sz;
  out[1] = cx * sy * cz + sx * cy * sz;
  out[2] = cx * cy * sz - sx * sy * cz;
  out[3] = cx * cy * cz + sx * sy * sz;
  return out;
}
/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} a vector to represent as a string
 * @returns {String} string representation of the vector
 */


function str(a) {
  return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
}
/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */


var clone = vec4.clone;
/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */

exports.clone = clone;
var fromValues = vec4.fromValues;
/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */

exports.fromValues = fromValues;
var copy = vec4.copy;
/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */

exports.copy = copy;
var set = vec4.set;
/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */

exports.set = set;
var add = vec4.add;
/**
 * Alias for {@link quat.multiply}
 * @function
 */

exports.add = add;
var mul = multiply;
/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */

exports.mul = mul;
var scale = vec4.scale;
/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */

exports.scale = scale;
var dot = vec4.dot;
/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 * @function
 */

exports.dot = dot;
var lerp = vec4.lerp;
/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 */

exports.lerp = lerp;
var length = vec4.length;
/**
 * Alias for {@link quat.length}
 * @function
 */

exports.length = length;
var len = length;
/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */

exports.len = len;
var squaredLength = vec4.squaredLength;
/**
 * Alias for {@link quat.squaredLength}
 * @function
 */

exports.squaredLength = squaredLength;
var sqrLen = squaredLength;
/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */

exports.sqrLen = sqrLen;
var normalize = vec4.normalize;
/**
 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {quat} a The first quaternion.
 * @param {quat} b The second quaternion.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

exports.normalize = normalize;
var exactEquals = vec4.exactEquals;
/**
 * Returns whether or not the quaternions have approximately the same elements in the same position.
 *
 * @param {quat} a The first vector.
 * @param {quat} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

exports.exactEquals = exactEquals;
var equals = vec4.equals;
/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */

exports.equals = equals;

var rotationTo = function () {
  var tmpvec3 = vec3.create();
  var xUnitVec3 = vec3.fromValues(1, 0, 0);
  var yUnitVec3 = vec3.fromValues(0, 1, 0);
  return function (out, a, b) {
    var dot = vec3.dot(a, b);

    if (dot < -0.999999) {
      vec3.cross(tmpvec3, xUnitVec3, a);
      if (vec3.len(tmpvec3) < 0.000001) vec3.cross(tmpvec3, yUnitVec3, a);
      vec3.normalize(tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      vec3.cross(tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot;
      return normalize(out, out);
    }
  };
}();
/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {quat} c the third operand
 * @param {quat} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */


exports.rotationTo = rotationTo;

var sqlerp = function () {
  var temp1 = create();
  var temp2 = create();
  return function (out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));
    return out;
  };
}();
/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */


exports.sqlerp = sqlerp;

var setAxes = function () {
  var matr = mat3.create();
  return function (out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];
    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];
    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];
    return normalize(out, fromMat3(out, matr));
  };
}();

exports.setAxes = setAxes;
},{"./common.js":"node_modules/xgl/node_modules/gl-matrix/esm/common.js","./mat3.js":"node_modules/xgl/node_modules/gl-matrix/esm/mat3.js","./vec3.js":"node_modules/xgl/node_modules/gl-matrix/esm/vec3.js","./vec4.js":"node_modules/xgl/node_modules/gl-matrix/esm/vec4.js"}],"node_modules/xgl/node_modules/gl-matrix/esm/quat2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.clone = clone;
exports.fromValues = fromValues;
exports.fromRotationTranslationValues = fromRotationTranslationValues;
exports.fromRotationTranslation = fromRotationTranslation;
exports.fromTranslation = fromTranslation;
exports.fromRotation = fromRotation;
exports.fromMat4 = fromMat4;
exports.copy = copy;
exports.identity = identity;
exports.set = set;
exports.getDual = getDual;
exports.setDual = setDual;
exports.getTranslation = getTranslation;
exports.translate = translate;
exports.rotateX = rotateX;
exports.rotateY = rotateY;
exports.rotateZ = rotateZ;
exports.rotateByQuatAppend = rotateByQuatAppend;
exports.rotateByQuatPrepend = rotateByQuatPrepend;
exports.rotateAroundAxis = rotateAroundAxis;
exports.add = add;
exports.multiply = multiply;
exports.scale = scale;
exports.lerp = lerp;
exports.invert = invert;
exports.conjugate = conjugate;
exports.normalize = normalize;
exports.str = str;
exports.exactEquals = exactEquals;
exports.equals = equals;
exports.sqrLen = exports.squaredLength = exports.len = exports.length = exports.dot = exports.mul = exports.setReal = exports.getReal = void 0;

var glMatrix = _interopRequireWildcard(require("./common.js"));

var quat = _interopRequireWildcard(require("./quat.js"));

var mat4 = _interopRequireWildcard(require("./mat4.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Dual Quaternion<br>
 * Format: [real, dual]<br>
 * Quaternion format: XYZW<br>
 * Make sure to have normalized dual quaternions, otherwise the functions may not work as intended.<br>
 * @module quat2
 */

/**
 * Creates a new identity dual quat
 *
 * @returns {quat2} a new dual quaternion [real -> rotation, dual -> translation]
 */
function create() {
  var dq = new glMatrix.ARRAY_TYPE(8);

  if (glMatrix.ARRAY_TYPE != Float32Array) {
    dq[0] = 0;
    dq[1] = 0;
    dq[2] = 0;
    dq[4] = 0;
    dq[5] = 0;
    dq[6] = 0;
    dq[7] = 0;
  }

  dq[3] = 1;
  return dq;
}
/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat2} a dual quaternion to clone
 * @returns {quat2} new dual quaternion
 * @function
 */


function clone(a) {
  var dq = new glMatrix.ARRAY_TYPE(8);
  dq[0] = a[0];
  dq[1] = a[1];
  dq[2] = a[2];
  dq[3] = a[3];
  dq[4] = a[4];
  dq[5] = a[5];
  dq[6] = a[6];
  dq[7] = a[7];
  return dq;
}
/**
 * Creates a new dual quat initialized with the given values
 *
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component
 * @param {Number} y2 Y component
 * @param {Number} z2 Z component
 * @param {Number} w2 W component
 * @returns {quat2} new dual quaternion
 * @function
 */


function fromValues(x1, y1, z1, w1, x2, y2, z2, w2) {
  var dq = new glMatrix.ARRAY_TYPE(8);
  dq[0] = x1;
  dq[1] = y1;
  dq[2] = z1;
  dq[3] = w1;
  dq[4] = x2;
  dq[5] = y2;
  dq[6] = z2;
  dq[7] = w2;
  return dq;
}
/**
 * Creates a new dual quat from the given values (quat and translation)
 *
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component (translation)
 * @param {Number} y2 Y component (translation)
 * @param {Number} z2 Z component (translation)
 * @returns {quat2} new dual quaternion
 * @function
 */


function fromRotationTranslationValues(x1, y1, z1, w1, x2, y2, z2) {
  var dq = new glMatrix.ARRAY_TYPE(8);
  dq[0] = x1;
  dq[1] = y1;
  dq[2] = z1;
  dq[3] = w1;
  var ax = x2 * 0.5,
      ay = y2 * 0.5,
      az = z2 * 0.5;
  dq[4] = ax * w1 + ay * z1 - az * y1;
  dq[5] = ay * w1 + az * x1 - ax * z1;
  dq[6] = az * w1 + ax * y1 - ay * x1;
  dq[7] = -ax * x1 - ay * y1 - az * z1;
  return dq;
}
/**
 * Creates a dual quat from a quaternion and a translation
 *
 * @param {quat2} dual quaternion receiving operation result
 * @param {quat} q a normalized quaternion
 * @param {vec3} t tranlation vector
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */


function fromRotationTranslation(out, q, t) {
  var ax = t[0] * 0.5,
      ay = t[1] * 0.5,
      az = t[2] * 0.5,
      bx = q[0],
      by = q[1],
      bz = q[2],
      bw = q[3];
  out[0] = bx;
  out[1] = by;
  out[2] = bz;
  out[3] = bw;
  out[4] = ax * bw + ay * bz - az * by;
  out[5] = ay * bw + az * bx - ax * bz;
  out[6] = az * bw + ax * by - ay * bx;
  out[7] = -ax * bx - ay * by - az * bz;
  return out;
}
/**
 * Creates a dual quat from a translation
 *
 * @param {quat2} dual quaternion receiving operation result
 * @param {vec3} t translation vector
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */


function fromTranslation(out, t) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = t[0] * 0.5;
  out[5] = t[1] * 0.5;
  out[6] = t[2] * 0.5;
  out[7] = 0;
  return out;
}
/**
 * Creates a dual quat from a quaternion
 *
 * @param {quat2} dual quaternion receiving operation result
 * @param {quat} q the quaternion
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */


function fromRotation(out, q) {
  out[0] = q[0];
  out[1] = q[1];
  out[2] = q[2];
  out[3] = q[3];
  out[4] = 0;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  return out;
}
/**
 * Creates a new dual quat from a matrix (4x4)
 *
 * @param {quat2} out the dual quaternion
 * @param {mat4} a the matrix
 * @returns {quat2} dual quat receiving operation result
 * @function
 */


function fromMat4(out, a) {
  //TODO Optimize this
  var outer = quat.create();
  mat4.getRotation(outer, a);
  var t = new glMatrix.ARRAY_TYPE(3);
  mat4.getTranslation(t, a);
  fromRotationTranslation(out, outer, t);
  return out;
}
/**
 * Copy the values from one dual quat to another
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the source dual quaternion
 * @returns {quat2} out
 * @function
 */


function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  return out;
}
/**
 * Set a dual quat to the identity dual quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @returns {quat2} out
 */


function identity(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  return out;
}
/**
 * Set the components of a dual quat to the given values
 *
 * @param {quat2} out the receiving quaternion
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component
 * @param {Number} y2 Y component
 * @param {Number} z2 Z component
 * @param {Number} w2 W component
 * @returns {quat2} out
 * @function
 */


function set(out, x1, y1, z1, w1, x2, y2, z2, w2) {
  out[0] = x1;
  out[1] = y1;
  out[2] = z1;
  out[3] = w1;
  out[4] = x2;
  out[5] = y2;
  out[6] = z2;
  out[7] = w2;
  return out;
}
/**
 * Gets the real part of a dual quat
 * @param  {quat} out real part
 * @param  {quat2} a Dual Quaternion
 * @return {quat} real part
 */


var getReal = quat.copy;
/**
 * Gets the dual part of a dual quat
 * @param  {quat} out dual part
 * @param  {quat2} a Dual Quaternion
 * @return {quat} dual part
 */

exports.getReal = getReal;

function getDual(out, a) {
  out[0] = a[4];
  out[1] = a[5];
  out[2] = a[6];
  out[3] = a[7];
  return out;
}
/**
 * Set the real component of a dual quat to the given quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @param {quat} q a quaternion representing the real part
 * @returns {quat2} out
 * @function
 */


var setReal = quat.copy;
/**
 * Set the dual component of a dual quat to the given quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @param {quat} q a quaternion representing the dual part
 * @returns {quat2} out
 * @function
 */

exports.setReal = setReal;

function setDual(out, q) {
  out[4] = q[0];
  out[5] = q[1];
  out[6] = q[2];
  out[7] = q[3];
  return out;
}
/**
 * Gets the translation of a normalized dual quat
 * @param  {vec3} out translation
 * @param  {quat2} a Dual Quaternion to be decomposed
 * @return {vec3} translation
 */


function getTranslation(out, a) {
  var ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3];
  out[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
  out[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
  out[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  return out;
}
/**
 * Translates a dual quat by the given vector
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to translate
 * @param {vec3} v vector to translate by
 * @returns {quat2} out
 */


function translate(out, a, v) {
  var ax1 = a[0],
      ay1 = a[1],
      az1 = a[2],
      aw1 = a[3],
      bx1 = v[0] * 0.5,
      by1 = v[1] * 0.5,
      bz1 = v[2] * 0.5,
      ax2 = a[4],
      ay2 = a[5],
      az2 = a[6],
      aw2 = a[7];
  out[0] = ax1;
  out[1] = ay1;
  out[2] = az1;
  out[3] = aw1;
  out[4] = aw1 * bx1 + ay1 * bz1 - az1 * by1 + ax2;
  out[5] = aw1 * by1 + az1 * bx1 - ax1 * bz1 + ay2;
  out[6] = aw1 * bz1 + ax1 * by1 - ay1 * bx1 + az2;
  out[7] = -ax1 * bx1 - ay1 * by1 - az1 * bz1 + aw2;
  return out;
}
/**
 * Rotates a dual quat around the X axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */


function rotateX(out, a, rad) {
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
  quat.rotateX(out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}
/**
 * Rotates a dual quat around the Y axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */


function rotateY(out, a, rad) {
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
  quat.rotateY(out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}
/**
 * Rotates a dual quat around the Z axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */


function rotateZ(out, a, rad) {
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
  quat.rotateZ(out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}
/**
 * Rotates a dual quat by a given quaternion (a * q)
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to rotate
 * @param {quat} q quaternion to rotate by
 * @returns {quat2} out
 */


function rotateByQuatAppend(out, a, q) {
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3],
      ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  out[0] = ax * qw + aw * qx + ay * qz - az * qy;
  out[1] = ay * qw + aw * qy + az * qx - ax * qz;
  out[2] = az * qw + aw * qz + ax * qy - ay * qx;
  out[3] = aw * qw - ax * qx - ay * qy - az * qz;
  ax = a[4];
  ay = a[5];
  az = a[6];
  aw = a[7];
  out[4] = ax * qw + aw * qx + ay * qz - az * qy;
  out[5] = ay * qw + aw * qy + az * qx - ax * qz;
  out[6] = az * qw + aw * qz + ax * qy - ay * qx;
  out[7] = aw * qw - ax * qx - ay * qy - az * qz;
  return out;
}
/**
 * Rotates a dual quat by a given quaternion (q * a)
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat} q quaternion to rotate by
 * @param {quat2} a the dual quaternion to rotate
 * @returns {quat2} out
 */


function rotateByQuatPrepend(out, q, a) {
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3],
      bx = a[0],
      by = a[1],
      bz = a[2],
      bw = a[3];
  out[0] = qx * bw + qw * bx + qy * bz - qz * by;
  out[1] = qy * bw + qw * by + qz * bx - qx * bz;
  out[2] = qz * bw + qw * bz + qx * by - qy * bx;
  out[3] = qw * bw - qx * bx - qy * by - qz * bz;
  bx = a[4];
  by = a[5];
  bz = a[6];
  bw = a[7];
  out[4] = qx * bw + qw * bx + qy * bz - qz * by;
  out[5] = qy * bw + qw * by + qz * bx - qx * bz;
  out[6] = qz * bw + qw * bz + qx * by - qy * bx;
  out[7] = qw * bw - qx * bx - qy * by - qz * bz;
  return out;
}
/**
 * Rotates a dual quat around a given axis. Does the normalisation automatically
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to rotate
 * @param {vec3} axis the axis to rotate around
 * @param {Number} rad how far the rotation should be
 * @returns {quat2} out
 */


function rotateAroundAxis(out, a, axis, rad) {
  //Special case for rad = 0
  if (Math.abs(rad) < glMatrix.EPSILON) {
    return copy(out, a);
  }

  var axisLength = Math.hypot(axis[0], axis[1], axis[2]);
  rad = rad * 0.5;
  var s = Math.sin(rad);
  var bx = s * axis[0] / axisLength;
  var by = s * axis[1] / axisLength;
  var bz = s * axis[2] / axisLength;
  var bw = Math.cos(rad);
  var ax1 = a[0],
      ay1 = a[1],
      az1 = a[2],
      aw1 = a[3];
  out[0] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[1] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[2] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[3] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  var ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7];
  out[4] = ax * bw + aw * bx + ay * bz - az * by;
  out[5] = ay * bw + aw * by + az * bx - ax * bz;
  out[6] = az * bw + aw * bz + ax * by - ay * bx;
  out[7] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
/**
 * Adds two dual quat's
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the first operand
 * @param {quat2} b the second operand
 * @returns {quat2} out
 * @function
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  return out;
}
/**
 * Multiplies two dual quat's
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the first operand
 * @param {quat2} b the second operand
 * @returns {quat2} out
 */


function multiply(out, a, b) {
  var ax0 = a[0],
      ay0 = a[1],
      az0 = a[2],
      aw0 = a[3],
      bx1 = b[4],
      by1 = b[5],
      bz1 = b[6],
      bw1 = b[7],
      ax1 = a[4],
      ay1 = a[5],
      az1 = a[6],
      aw1 = a[7],
      bx0 = b[0],
      by0 = b[1],
      bz0 = b[2],
      bw0 = b[3];
  out[0] = ax0 * bw0 + aw0 * bx0 + ay0 * bz0 - az0 * by0;
  out[1] = ay0 * bw0 + aw0 * by0 + az0 * bx0 - ax0 * bz0;
  out[2] = az0 * bw0 + aw0 * bz0 + ax0 * by0 - ay0 * bx0;
  out[3] = aw0 * bw0 - ax0 * bx0 - ay0 * by0 - az0 * bz0;
  out[4] = ax0 * bw1 + aw0 * bx1 + ay0 * bz1 - az0 * by1 + ax1 * bw0 + aw1 * bx0 + ay1 * bz0 - az1 * by0;
  out[5] = ay0 * bw1 + aw0 * by1 + az0 * bx1 - ax0 * bz1 + ay1 * bw0 + aw1 * by0 + az1 * bx0 - ax1 * bz0;
  out[6] = az0 * bw1 + aw0 * bz1 + ax0 * by1 - ay0 * bx1 + az1 * bw0 + aw1 * bz0 + ax1 * by0 - ay1 * bx0;
  out[7] = aw0 * bw1 - ax0 * bx1 - ay0 * by1 - az0 * bz1 + aw1 * bw0 - ax1 * bx0 - ay1 * by0 - az1 * bz0;
  return out;
}
/**
 * Alias for {@link quat2.multiply}
 * @function
 */


var mul = multiply;
/**
 * Scales a dual quat by a scalar number
 *
 * @param {quat2} out the receiving dual quat
 * @param {quat2} a the dual quat to scale
 * @param {Number} b amount to scale the dual quat by
 * @returns {quat2} out
 * @function
 */

exports.mul = mul;

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  return out;
}
/**
 * Calculates the dot product of two dual quat's (The dot product of the real parts)
 *
 * @param {quat2} a the first operand
 * @param {quat2} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */


var dot = quat.dot;
/**
 * Performs a linear interpolation between two dual quats's
 * NOTE: The resulting dual quaternions won't always be normalized (The error is most noticeable when t = 0.5)
 *
 * @param {quat2} out the receiving dual quat
 * @param {quat2} a the first operand
 * @param {quat2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat2} out
 */

exports.dot = dot;

function lerp(out, a, b, t) {
  var mt = 1 - t;
  if (dot(a, b) < 0) t = -t;
  out[0] = a[0] * mt + b[0] * t;
  out[1] = a[1] * mt + b[1] * t;
  out[2] = a[2] * mt + b[2] * t;
  out[3] = a[3] * mt + b[3] * t;
  out[4] = a[4] * mt + b[4] * t;
  out[5] = a[5] * mt + b[5] * t;
  out[6] = a[6] * mt + b[6] * t;
  out[7] = a[7] * mt + b[7] * t;
  return out;
}
/**
 * Calculates the inverse of a dual quat. If they are normalized, conjugate is cheaper
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a dual quat to calculate inverse of
 * @returns {quat2} out
 */


function invert(out, a) {
  var sqlen = squaredLength(a);
  out[0] = -a[0] / sqlen;
  out[1] = -a[1] / sqlen;
  out[2] = -a[2] / sqlen;
  out[3] = a[3] / sqlen;
  out[4] = -a[4] / sqlen;
  out[5] = -a[5] / sqlen;
  out[6] = -a[6] / sqlen;
  out[7] = a[7] / sqlen;
  return out;
}
/**
 * Calculates the conjugate of a dual quat
 * If the dual quaternion is normalized, this function is faster than quat2.inverse and produces the same result.
 *
 * @param {quat2} out the receiving quaternion
 * @param {quat2} a quat to calculate conjugate of
 * @returns {quat2} out
 */


function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  out[4] = -a[4];
  out[5] = -a[5];
  out[6] = -a[6];
  out[7] = a[7];
  return out;
}
/**
 * Calculates the length of a dual quat
 *
 * @param {quat2} a dual quat to calculate length of
 * @returns {Number} length of a
 * @function
 */


var length = quat.length;
/**
 * Alias for {@link quat2.length}
 * @function
 */

exports.length = length;
var len = length;
/**
 * Calculates the squared length of a dual quat
 *
 * @param {quat2} a dual quat to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */

exports.len = len;
var squaredLength = quat.squaredLength;
/**
 * Alias for {@link quat2.squaredLength}
 * @function
 */

exports.squaredLength = squaredLength;
var sqrLen = squaredLength;
/**
 * Normalize a dual quat
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a dual quaternion to normalize
 * @returns {quat2} out
 * @function
 */

exports.sqrLen = sqrLen;

function normalize(out, a) {
  var magnitude = squaredLength(a);

  if (magnitude > 0) {
    magnitude = Math.sqrt(magnitude);
    var a0 = a[0] / magnitude;
    var a1 = a[1] / magnitude;
    var a2 = a[2] / magnitude;
    var a3 = a[3] / magnitude;
    var b0 = a[4];
    var b1 = a[5];
    var b2 = a[6];
    var b3 = a[7];
    var a_dot_b = a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3;
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = (b0 - a0 * a_dot_b) / magnitude;
    out[5] = (b1 - a1 * a_dot_b) / magnitude;
    out[6] = (b2 - a2 * a_dot_b) / magnitude;
    out[7] = (b3 - a3 * a_dot_b) / magnitude;
  }

  return out;
}
/**
 * Returns a string representation of a dual quatenion
 *
 * @param {quat2} a dual quaternion to represent as a string
 * @returns {String} string representation of the dual quat
 */


function str(a) {
  return 'quat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ')';
}
/**
 * Returns whether or not the dual quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {quat2} a the first dual quaternion.
 * @param {quat2} b the second dual quaternion.
 * @returns {Boolean} true if the dual quaternions are equal, false otherwise.
 */


function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7];
}
/**
 * Returns whether or not the dual quaternions have approximately the same elements in the same position.
 *
 * @param {quat2} a the first dual quat.
 * @param {quat2} b the second dual quat.
 * @returns {Boolean} true if the dual quats are equal, false otherwise.
 */


function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7));
}
},{"./common.js":"node_modules/xgl/node_modules/gl-matrix/esm/common.js","./quat.js":"node_modules/xgl/node_modules/gl-matrix/esm/quat.js","./mat4.js":"node_modules/xgl/node_modules/gl-matrix/esm/mat4.js"}],"node_modules/xgl/node_modules/gl-matrix/esm/vec2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.clone = clone;
exports.fromValues = fromValues;
exports.copy = copy;
exports.set = set;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
exports.ceil = ceil;
exports.floor = floor;
exports.min = min;
exports.max = max;
exports.round = round;
exports.scale = scale;
exports.scaleAndAdd = scaleAndAdd;
exports.distance = distance;
exports.squaredDistance = squaredDistance;
exports.length = length;
exports.squaredLength = squaredLength;
exports.negate = negate;
exports.inverse = inverse;
exports.normalize = normalize;
exports.dot = dot;
exports.cross = cross;
exports.lerp = lerp;
exports.random = random;
exports.transformMat2 = transformMat2;
exports.transformMat2d = transformMat2d;
exports.transformMat3 = transformMat3;
exports.transformMat4 = transformMat4;
exports.rotate = rotate;
exports.angle = angle;
exports.zero = zero;
exports.str = str;
exports.exactEquals = exactEquals;
exports.equals = equals;
exports.forEach = exports.sqrLen = exports.sqrDist = exports.dist = exports.div = exports.mul = exports.sub = exports.len = void 0;

var glMatrix = _interopRequireWildcard(require("./common.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
function create() {
  var out = new glMatrix.ARRAY_TYPE(2);

  if (glMatrix.ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }

  return out;
}
/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */


function clone(a) {
  var out = new glMatrix.ARRAY_TYPE(2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */


function fromValues(x, y) {
  var out = new glMatrix.ARRAY_TYPE(2);
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */


function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */


function set(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}
/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}
/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}
/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to ceil
 * @returns {vec2} out
 */


function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  return out;
}
/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to floor
 * @returns {vec2} out
 */


function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  return out;
}
/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
}
/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
}
/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to round
 * @returns {vec2} out
 */


function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  return out;
}
/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */


function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}
/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */


function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */


function distance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return Math.hypot(x, y);
}
/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */


function squaredDistance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return x * x + y * y;
}
/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */


function length(a) {
  var x = a[0],
      y = a[1];
  return Math.hypot(x, y);
}
/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */


function squaredLength(a) {
  var x = a[0],
      y = a[1];
  return x * x + y * y;
}
/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */


function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}
/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */


function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
}
/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */


function normalize(out, a) {
  var x = a[0],
      y = a[1];
  var len = x * x + y * y;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  return out;
}
/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */


function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */


function cross(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
}
/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec2} out
 */


function lerp(out, a, b, t) {
  var ax = a[0],
      ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */


function random(out, scale) {
  scale = scale || 1.0;
  var r = glMatrix.RANDOM() * 2.0 * Math.PI;
  out[0] = Math.cos(r) * scale;
  out[1] = Math.sin(r) * scale;
  return out;
}
/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */


function transformMat2(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}
/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */


function transformMat2d(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}
/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */


function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}
/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */


function transformMat4(out, a, m) {
  var x = a[0];
  var y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}
/**
 * Rotate a 2D vector
 * @param {vec2} out The receiving vec2
 * @param {vec2} a The vec2 point to rotate
 * @param {vec2} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec2} out
 */


function rotate(out, a, b, c) {
  //Translate point to the origin
  var p0 = a[0] - b[0],
      p1 = a[1] - b[1],
      sinC = Math.sin(c),
      cosC = Math.cos(c); //perform rotation and translate to correct position

  out[0] = p0 * cosC - p1 * sinC + b[0];
  out[1] = p0 * sinC + p1 * cosC + b[1];
  return out;
}
/**
 * Get the angle between two 2D vectors
 * @param {vec2} a The first operand
 * @param {vec2} b The second operand
 * @returns {Number} The angle in radians
 */


function angle(a, b) {
  var x1 = a[0],
      y1 = a[1],
      x2 = b[0],
      y2 = b[1];
  var len1 = x1 * x1 + y1 * y1;

  if (len1 > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len1 = 1 / Math.sqrt(len1);
  }

  var len2 = x2 * x2 + y2 * y2;

  if (len2 > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len2 = 1 / Math.sqrt(len2);
  }

  var cosine = (x1 * x2 + y1 * y2) * len1 * len2;

  if (cosine > 1.0) {
    return 0;
  } else if (cosine < -1.0) {
    return Math.PI;
  } else {
    return Math.acos(cosine);
  }
}
/**
 * Set the components of a vec2 to zero
 *
 * @param {vec2} out the receiving vector
 * @returns {vec2} out
 */


function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {vec2} a vector to represent as a string
 * @returns {String} string representation of the vector
 */


function str(a) {
  return 'vec2(' + a[0] + ', ' + a[1] + ')';
}
/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


function equals(a, b) {
  var a0 = a[0],
      a1 = a[1];
  var b0 = b[0],
      b1 = b[1];
  return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1));
}
/**
 * Alias for {@link vec2.length}
 * @function
 */


var len = length;
/**
 * Alias for {@link vec2.subtract}
 * @function
 */

exports.len = len;
var sub = subtract;
/**
 * Alias for {@link vec2.multiply}
 * @function
 */

exports.sub = sub;
var mul = multiply;
/**
 * Alias for {@link vec2.divide}
 * @function
 */

exports.mul = mul;
var div = divide;
/**
 * Alias for {@link vec2.distance}
 * @function
 */

exports.div = div;
var dist = distance;
/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */

exports.dist = dist;
var sqrDist = squaredDistance;
/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */

exports.sqrDist = sqrDist;
var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

exports.sqrLen = sqrLen;

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 2;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }

    return a;
  };
}();

exports.forEach = forEach;
},{"./common.js":"node_modules/xgl/node_modules/gl-matrix/esm/common.js"}],"node_modules/xgl/node_modules/gl-matrix/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vec4 = exports.vec3 = exports.vec2 = exports.quat2 = exports.quat = exports.mat4 = exports.mat3 = exports.mat2d = exports.mat2 = exports.glMatrix = void 0;

var glMatrix = _interopRequireWildcard(require("./common.js"));

exports.glMatrix = glMatrix;

var mat2 = _interopRequireWildcard(require("./mat2.js"));

exports.mat2 = mat2;

var mat2d = _interopRequireWildcard(require("./mat2d.js"));

exports.mat2d = mat2d;

var mat3 = _interopRequireWildcard(require("./mat3.js"));

exports.mat3 = mat3;

var mat4 = _interopRequireWildcard(require("./mat4.js"));

exports.mat4 = mat4;

var quat = _interopRequireWildcard(require("./quat.js"));

exports.quat = quat;

var quat2 = _interopRequireWildcard(require("./quat2.js"));

exports.quat2 = quat2;

var vec2 = _interopRequireWildcard(require("./vec2.js"));

exports.vec2 = vec2;

var vec3 = _interopRequireWildcard(require("./vec3.js"));

exports.vec3 = vec3;

var vec4 = _interopRequireWildcard(require("./vec4.js"));

exports.vec4 = vec4;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./common.js":"node_modules/xgl/node_modules/gl-matrix/esm/common.js","./mat2.js":"node_modules/xgl/node_modules/gl-matrix/esm/mat2.js","./mat2d.js":"node_modules/xgl/node_modules/gl-matrix/esm/mat2d.js","./mat3.js":"node_modules/xgl/node_modules/gl-matrix/esm/mat3.js","./mat4.js":"node_modules/xgl/node_modules/gl-matrix/esm/mat4.js","./quat.js":"node_modules/xgl/node_modules/gl-matrix/esm/quat.js","./quat2.js":"node_modules/xgl/node_modules/gl-matrix/esm/quat2.js","./vec2.js":"node_modules/xgl/node_modules/gl-matrix/esm/vec2.js","./vec3.js":"node_modules/xgl/node_modules/gl-matrix/esm/vec3.js","./vec4.js":"node_modules/xgl/node_modules/gl-matrix/esm/vec4.js"}],"node_modules/xgl/dist/gl/gl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GLUtilities = exports.gl = void 0;
var gl;
exports.gl = gl;

var GLUtilities =
/** @class */
function () {
  function GLUtilities() {}

  GLUtilities.init = function (elId) {
    var canvas;

    if (elId !== undefined) {
      canvas = document.getElementById(elId);

      if (canvas === undefined) {
        throw new Error("Unable to find DOM element with ID: " + elId);
      }
    } else {
      canvas = document.createElement('canvas');
      document.body.appendChild(canvas);
    }

    exports.gl = gl = canvas.getContext('webgl');

    if (gl === undefined || gl === null) {
      exports.gl = gl = canvas.getContext('experimental-webgl');

      if (gl === undefined || gl === null) {
        throw new Error('Unable to get the rendering context.');
      }
    } // TODO: This should not be here. As it is a game configuration.


    gl.clearColor(146 / 255, 206 / 255, 247 / 255, 1); // Allows transparency in sprites

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    return canvas;
  };

  GLUtilities.clearFrame = function () {
    gl.clear(gl.COLOR_BUFFER_BIT);
  };

  return GLUtilities;
}();

exports.GLUtilities = GLUtilities;
},{}],"node_modules/xgl/dist/gl/shader.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shader = void 0;

var _gl = require("./gl");

/**
 * Shaders are the programs that run in the GPU (Written in Open GL ES Shader language, ES SL)
 */
var Shader =
/** @class */
function () {
  function Shader(name) {
    this._attributes = {};
    this._uniforms = {};
    this._name = name;
  }
  /**
   * Use the shaders
   */


  Shader.prototype.use = function () {
    _gl.gl.useProgram(this._program);
  };
  /**
   * Gets the location of an attribute
   *
   * @param name The name of the attribute to get the location for
   */


  Shader.prototype.getAttributeLocation = function (name) {
    if (this._attributes[name] === undefined) {
      throw new Error("Unable to find attribute " + name + " in shader " + this._name);
    }

    return this._attributes[name];
  };
  /**
   * Gets the location of a uniform
   *
   * @param name The name of the uniform to get the location for
   */


  Shader.prototype.getUniformLocation = function (name) {
    if (this._uniforms[name] === undefined) {
      throw new Error("Unable to find uniform " + name + " in shader " + this._name);
    }

    return this._uniforms[name];
  };
  /**
   *
   * @param vertexSource
   * @param fragmentSource
   */


  Shader.prototype.load = function (vertexSource, fragmentSource) {
    var vertexShader = this.loadShader(vertexSource, _gl.gl.VERTEX_SHADER);
    var fragmentShader = this.loadShader(fragmentSource, _gl.gl.FRAGMENT_SHADER);
    this.createProgram(vertexShader, fragmentShader);
    this.detectAttributes();
    this.detectUniforms();
  };

  Shader.prototype.loadShader = function (source, shaderType) {
    var _a;

    var shader = _gl.gl.createShader(shaderType);

    _gl.gl.shaderSource(shader, source);

    _gl.gl.compileShader(shader);

    var error = (_a = _gl.gl.getShaderInfoLog(shader)) === null || _a === void 0 ? void 0 : _a.trim();

    if (error !== '') {
      throw new Error("Error compiling shader: " + this._name + " with error: " + error);
    }

    return shader;
  };

  Shader.prototype.createProgram = function (vertexShader, fragmentShader) {
    var _a;

    this._program = _gl.gl.createProgram();

    _gl.gl.attachShader(this._program, vertexShader);

    _gl.gl.attachShader(this._program, fragmentShader);

    _gl.gl.linkProgram(this._program);

    var error = (_a = _gl.gl.getProgramInfoLog(this._program)) === null || _a === void 0 ? void 0 : _a.trim();

    if (error !== '') {
      throw new Error("Error creating the WebGL program: " + this._program + " with error: " + error);
    }
  };
  /**
   * Extract attributes from shader source so that we can reference them.
   */


  Shader.prototype.detectAttributes = function () {
    var attributeCount = _gl.gl.getProgramParameter(this._program, _gl.gl.ACTIVE_ATTRIBUTES);

    for (var i = 0; i < attributeCount; i++) {
      var info = _gl.gl.getActiveAttrib(this._program, i);

      if (!info) {
        break;
      }

      this._attributes[info.name] = _gl.gl.getAttribLocation(this._program, info.name);
    }
  };
  /**
   * Extract uniforms from shader source so that we can reference them.
   */


  Shader.prototype.detectUniforms = function () {
    var uniformCount = _gl.gl.getProgramParameter(this._program, _gl.gl.ACTIVE_UNIFORMS);

    for (var i = 0; i < uniformCount; i++) {
      var info = _gl.gl.getActiveUniform(this._program, i);

      if (!info) {
        break;
      }

      this._uniforms[info.name] = _gl.gl.getUniformLocation(this._program, info.name);
    }
  };

  return Shader;
}();

exports.Shader = Shader;
},{"./gl":"node_modules/xgl/dist/gl/gl.js"}],"node_modules/xgl/dist/gl/shaders/basicShader.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasicShader = void 0;

var _shader = require("../shader");

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var BasicShader =
/** @class */
function (_super) {
  __extends(BasicShader, _super);

  function BasicShader() {
    var _this = _super.call(this, 'basic') || this;

    _this.load(_this.getVertexSource(), _this.getFragmentSource());

    return _this;
  }

  BasicShader.prototype.getVertexSource = function () {
    // Fragment shader does not have access to attributes, thats why we use v_textCoord to
    // copy a_texCoord over the Fragment Shader from the Vertex Shader
    return "\n            attribute vec3 a_position;\n            attribute vec2 a_texCoord;\n            \n            uniform mat4 u_projection;\n            uniform mat4 u_model;\n\n            varying vec2 v_textCoord;\n\n            void main() {\n                gl_Position = u_projection * u_model * vec4(a_position, 1.0);\n                v_textCoord = a_texCoord;\n            }\n        ";
  };

  BasicShader.prototype.getFragmentSource = function () {
    // sampler to retrieve color out of the texture
    return "\n            precision mediump float;\n\n            uniform vec4 u_tint;\n            uniform sampler2D u_diffuse;\n\n            varying vec2 v_textCoord;\n\n            void main () {\n                gl_FragColor = u_tint * texture2D(u_diffuse, v_textCoord);\n            }\n        ";
  };

  return BasicShader;
}(_shader.Shader);

exports.BasicShader = BasicShader;
},{"../shader":"node_modules/xgl/dist/gl/shader.js"}],"node_modules/xgl/dist/gl/glBuffer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GLBuffer = exports.AttributeInfo = void 0;

var _gl = require("./gl");

/**
 * Struct of data needed for GLBuffer attribute
 */
var AttributeInfo =
/** @class */
function () {
  function AttributeInfo() {}

  return AttributeInfo;
}();

exports.AttributeInfo = AttributeInfo;

/**
 * A WebGLBuffer wrap
 */
var GLBuffer =
/** @class */
function () {
  /**
   * Creates a new GL buffer
   *
   * @param dataType : Data type of this buffer. Defaults to gl.FLOAT
   * @param targetBufferType : The buffer taget type. Defaults to gl.ARRAY_BUFFER
   * @param mode : The drawing mode of this buffer. Defaults to gl.TRIANGLES
   */
  function GLBuffer(dataType, targetBufferType, mode) {
    if (dataType === void 0) {
      dataType = _gl.gl.FLOAT;
    }

    if (targetBufferType === void 0) {
      targetBufferType = _gl.gl.ARRAY_BUFFER;
    }

    if (mode === void 0) {
      mode = _gl.gl.TRIANGLES;
    }

    this._hasAttributeLocation = false;
    this._data = [];
    this._attributes = [];
    this._elementSize = 0;
    this._dataType = dataType;
    this._targetBufferType = targetBufferType;
    this._mode = mode;

    switch (this._dataType) {
      case _gl.gl.FLOAT:
      case _gl.gl.INT:
      case _gl.gl.UNSIGNED_INT:
        this._typeSize = 4;
        break;

      case _gl.gl.SHORT:
      case _gl.gl.UNSIGNED_SHORT:
        this._typeSize = 2;
        break;

      case _gl.gl.BYTE:
      case _gl.gl.UNSIGNED_BYTE:
        this._typeSize = 1;
        break;

      default:
        throw new Error("Unrecognised datatype " + this._dataType.toString());
    }

    this._buffer = _gl.gl.createBuffer();
  }
  /**
   * Delete the buffer from memory
   */


  GLBuffer.prototype.destroy = function () {
    _gl.gl.deleteBuffer(this._buffer);
  };
  /**
   * Binds this buffer
   *
   * @param normalised : Indicates whther the data should be normalised
   */


  GLBuffer.prototype.bind = function (normalised) {
    if (normalised === void 0) {
      normalised = false;
    }

    _gl.gl.bindBuffer(this._targetBufferType, this._buffer);

    if (this._hasAttributeLocation) {
      for (var _i = 0, _a = this._attributes; _i < _a.length; _i++) {
        var attr = _a[_i];

        _gl.gl.vertexAttribPointer(attr.location, attr.size, this._dataType, normalised, this._stride, attr.offset * this._typeSize);

        _gl.gl.enableVertexAttribArray(attr.location);
      }
    }
  };
  /**
   * Unbinds this buffer
   */


  GLBuffer.prototype.unbind = function () {
    for (var _i = 0, _a = this._attributes; _i < _a.length; _i++) {
      var attr = _a[_i];

      _gl.gl.disableVertexAttribArray(attr.location);
    }

    _gl.gl.bindBuffer(this._targetBufferType, undefined);
  };
  /**
   * Adds an attribute with the provided information to this buffer
   * @param info The information to be added
   */


  GLBuffer.prototype.addAttributeLocation = function (info) {
    this._hasAttributeLocation = true;
    info.offset = this._elementSize;

    this._attributes.push(info);

    this._elementSize += info.size;
    this._stride = this._elementSize * this._typeSize;
  };
  /**
   * Replaces the current data in this budder with the provided data
   *
   * @param data : the data to be set to this buffer
   */


  GLBuffer.prototype.setData = function (data) {
    this.clearData();
    this.pushBackData(data);
  };
  /**
   * Adds data to this buffer
   * @param data
   */


  GLBuffer.prototype.pushBackData = function (data) {
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
      var d = data_1[_i];

      this._data.push(d);
    }
  };
  /**
   * Clears out all data in this buffer
   */


  GLBuffer.prototype.clearData = function () {
    this._data.length = 0;
  };

  GLBuffer.prototype.upload = function () {
    _gl.gl.bindBuffer(this._targetBufferType, this._buffer);

    var bufferData;

    switch (this._dataType) {
      case _gl.gl.FLOAT:
        bufferData = new Float32Array(this._data);
        break;

      case _gl.gl.INT:
        bufferData = new Int32Array(this._data);
        break;

      case _gl.gl.UNSIGNED_INT:
        bufferData = new Uint32Array(this._data);
        break;

      case _gl.gl.SHORT:
        bufferData = new Int16Array(this._data);
        break;

      case _gl.gl.UNSIGNED_SHORT:
        bufferData = new Uint16Array(this._data);
        break;

      case _gl.gl.BYTE:
        bufferData = new Int8Array(this._data);
        break;

      case _gl.gl.UNSIGNED_BYTE:
        bufferData = new Uint8Array(this._data);
        break;

      default:
        throw new Error("Unrecognised datatype " + this._dataType.toString() + " when uploading");
    }

    _gl.gl.bufferData(this._targetBufferType, bufferData, _gl.gl.STATIC_DRAW);
  };
  /**
   * Draws this buffer
   */


  GLBuffer.prototype.draw = function () {
    if (this._targetBufferType === _gl.gl.ARRAY_BUFFER) {
      _gl.gl.drawArrays(this._mode, 0, this._data.length / this._elementSize);
    } else if (this._targetBufferType === _gl.gl.ELEMENT_ARRAY_BUFFER) {
      _gl.gl.drawElements(this._mode, this._data.length, this._dataType, 0);
    }
  };

  return GLBuffer;
}();

exports.GLBuffer = GLBuffer;
},{"./gl":"node_modules/xgl/dist/gl/gl.js"}],"node_modules/xgl/dist/graphics/materialManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaterialManager = void 0;

var MaterialReferenceNode =
/** @class */
function () {
  function MaterialReferenceNode(material) {
    this.referenceCount = 1;
    this.material = material;
  }

  return MaterialReferenceNode;
}();

var MaterialManager =
/** @class */
function () {
  function MaterialManager() {}

  MaterialManager.registerMaterial = function (material) {
    if (MaterialManager._materials[material.name] === undefined) {
      MaterialManager._materials[material.name] = new MaterialReferenceNode(material);
    }
  };

  MaterialManager.getMaterial = function (materialName) {
    if (MaterialManager._materials[materialName] === undefined) {
      return undefined;
    }

    MaterialManager._materials[materialName].referenceCount++;
    return MaterialManager._materials[materialName].material;
  };

  MaterialManager.releaseMaterial = function (materialName) {
    if (MaterialManager._materials[materialName] === undefined) {
      console.warn("Cannot release material: " + materialName + " which has not been registered.");
      return;
    }

    MaterialManager._materials[materialName].referenceCount--;

    if (MaterialManager._materials[materialName].referenceCount < 1) {
      MaterialManager._materials[materialName].material.destroy();

      MaterialManager._materials[materialName].material = undefined;
      delete MaterialManager._materials[materialName];
    }
  };

  MaterialManager._materials = {};
  return MaterialManager;
}();

exports.MaterialManager = MaterialManager;
},{}],"node_modules/xgl/dist/math/vector2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vector2 = void 0;

var _vector = require("./vector3");

var Vector2 =
/** @class */
function () {
  function Vector2(x, y) {
    if (x === void 0) {
      x = 0;
    }

    if (y === void 0) {
      y = 0;
    }

    this._x = x;
    this._y = y;
  }

  Object.defineProperty(Vector2.prototype, "x", {
    get: function () {
      return this._x;
    },
    set: function (value) {
      this._x = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Vector2.prototype, "y", {
    get: function () {
      return this._y;
    },
    set: function (value) {
      this._y = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Vector2, "zero", {
    /** Returns a vector2 with all components set to 0. */
    get: function () {
      return new Vector2();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Vector2, "one", {
    /** Returns a vector2 with all components set to 1. */
    get: function () {
      return new Vector2(1, 1);
    },
    enumerable: true,
    configurable: true
  });

  Vector2.distance = function (a, b) {
    var diff = a.clone().subtract(b);
    return Math.sqrt(diff.x * diff.x + diff.y * diff.y);
  };

  Vector2.prototype.set = function (x, y) {
    if (x !== undefined) {
      this._x = x;
    }

    if (y !== undefined) {
      this._y = y;
    }
  };

  Vector2.prototype.copyFrom = function (v) {
    this._x = v._x;
    this._y = v._y;
  };

  Vector2.prototype.toArray = function () {
    return [this._x, this._y];
  };

  Vector2.prototype.toFlat32Array = function () {
    return new Float32Array(this.toArray());
  };

  Vector2.prototype.toVector3 = function () {
    return new _vector.Vector3(this._x, this._y, 0);
  };

  Vector2.prototype.setFromJson = function (json) {
    if (json.x !== undefined) {
      this._x = Number(json.x);
    }

    if (json.y !== undefined) {
      this._y = Number(json.y);
    }
  };

  Vector2.prototype.add = function (v) {
    this._x += v._x;
    this._y += v._y;
    return this;
  };

  Vector2.prototype.subtract = function (v) {
    this._x -= v._x;
    this._y -= v._y;
    return this;
  };

  Vector2.prototype.multiply = function (v) {
    this._x *= v._x;
    this._y *= v._y;
    return this;
  };

  Vector2.prototype.divide = function (v) {
    this._x /= v._x;
    this._y /= v._y;
    return this;
  };

  Vector2.prototype.scale = function (scale) {
    this._x *= scale;
    this._y *= scale;
    return this;
  };

  Vector2.prototype.clone = function () {
    return new Vector2(this._x, this._y);
  };

  return Vector2;
}();

exports.Vector2 = Vector2;
},{"./vector3":"node_modules/xgl/dist/math/vector3.js"}],"node_modules/xgl/dist/math/vector3.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vector3 = void 0;

var _vector = require("./vector2");

var Vector3 =
/** @class */
function () {
  function Vector3(x, y, z) {
    if (x === void 0) {
      x = 0;
    }

    if (y === void 0) {
      y = 0;
    }

    if (z === void 0) {
      z = 0;
    }

    this._x = x;
    this._y = y;
    this._z = z;
  }

  Object.defineProperty(Vector3.prototype, "x", {
    get: function () {
      return this._x;
    },
    set: function (value) {
      this._x = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Vector3.prototype, "y", {
    get: function () {
      return this._y;
    },
    set: function (value) {
      this._y = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Vector3.prototype, "z", {
    get: function () {
      return this._z;
    },
    set: function (value) {
      this._z = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Vector3, "zero", {
    /** Returns a vector3 with all components set to 0. */
    get: function () {
      return new Vector3();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Vector3, "one", {
    /** Returns a vector3 with all components set to 1. */
    get: function () {
      return new Vector3(1, 1, 1);
    },
    enumerable: true,
    configurable: true
  });

  Vector3.distance = function (a, b) {
    var diff = a.clone().subtract(b);
    return Math.sqrt(diff.x * diff.x + diff.y * diff.y + diff.z * diff.z);
  };

  Vector3.prototype.set = function (x, y, z) {
    if (x !== undefined) {
      this._x = x;
    }

    if (y !== undefined) {
      this._y = y;
    }

    if (z !== undefined) {
      this._z = z;
    }
  };

  Vector3.prototype.equals = function (v) {
    return this.x === v.x && this.y === v.y && this.z === v.z;
  };
  /**
   * Copies the contents of the provided vector to this vector.
   * @param vector The vector to be copied.
   */


  Vector3.prototype.copyFrom = function (vector) {
    this._x = vector._x;
    this._y = vector._y;
    this._z = vector._z;
  };

  Vector3.prototype.toArray = function () {
    return [this._x, this._y, this._z];
  };

  Vector3.prototype.toFlat32Array = function () {
    return new Float32Array(this.toArray());
  };

  Vector3.prototype.setFromJson = function (json) {
    if (json.x !== undefined) {
      this._x = Number(json.x);
    }

    if (json.y !== undefined) {
      this._y = Number(json.y);
    }

    if (json.z !== undefined) {
      this._z = Number(json.z);
    }
  };

  Vector3.prototype.add = function (v) {
    this._x += v._x;
    this._y += v._y;
    this._z += v._z;
    return this;
  };

  Vector3.prototype.subtract = function (v) {
    this._x -= v._x;
    this._y -= v._y;
    this._z -= v._z;
    return this;
  };

  Vector3.prototype.multiply = function (v) {
    this._x *= v._x;
    this._y *= v._y;
    this._z *= v._z;
    return this;
  };

  Vector3.prototype.divide = function (v) {
    this._x /= v._x;
    this._y /= v._y;
    this._z /= v._z;
    return this;
  };

  Vector3.prototype.clone = function () {
    return new Vector3(this._x, this._y, this._z);
  };

  Vector3.prototype.toVector2 = function () {
    return new _vector.Vector2(this._x, this._y);
  };

  return Vector3;
}();

exports.Vector3 = Vector3;
},{"./vector2":"node_modules/xgl/dist/math/vector2.js"}],"node_modules/xgl/dist/graphics/vertex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vertex = void 0;

var _vector = require("../math/vector3");

var _vector2 = require("../math/vector2");

/**
 * Represents the data for a single vertex
 */
var Vertex =
/** @class */
function () {
  function Vertex(x, y, z, tu, tv) {
    if (x === void 0) {
      x = 0;
    }

    if (y === void 0) {
      y = 0;
    }

    if (z === void 0) {
      z = 0;
    }

    if (tu === void 0) {
      tu = 0;
    }

    if (tv === void 0) {
      tv = 0;
    }

    this.position = _vector.Vector3.zero;
    this.textCoords = _vector2.Vector2.zero;
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
    this.textCoords.x = tu;
    this.textCoords.y = tv;
  }

  Vertex.prototype.toArray = function () {
    var array = [];
    array = array.concat(this.position.toArray());
    array = array.concat(this.textCoords.toArray());
    return array;
  };

  Vertex.prototype.toFloat32Array = function () {
    return new Float32Array(this.toArray());
  };

  return Vertex;
}();

exports.Vertex = Vertex;
},{"../math/vector3":"node_modules/xgl/dist/math/vector3.js","../math/vector2":"node_modules/xgl/dist/math/vector2.js"}],"node_modules/xgl/dist/graphics/sprite.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sprite = void 0;

var _gl = require("../gl/gl");

var _glBuffer = require("../gl/glBuffer");

var _materialManager = require("./materialManager");

var _vertex = require("./vertex");

var _vector = require("../math/vector3");

var Sprite =
/** @class */
function () {
  function Sprite(name, materialName, width, height) {
    if (width === void 0) {
      width = 100;
    }

    if (height === void 0) {
      height = 100;
    }

    this._origin = _vector.Vector3.zero;
    this._vertices = [];
    this._name = name;
    this._width = width;
    this._height = height;
    this._materialName = materialName;
    this._material = _materialManager.MaterialManager.getMaterial(this._materialName);
  }

  Object.defineProperty(Sprite.prototype, "name", {
    get: function () {
      return this._name;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Sprite.prototype, "origin", {
    get: function () {
      return this._origin;
    },
    set: function (value) {
      this._origin = value; // TODO: This should be better dynamically calculated at the shader

      this.recalculateVertices();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Sprite.prototype, "width", {
    get: function () {
      return this._width;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Sprite.prototype, "height", {
    get: function () {
      return this._height;
    },
    enumerable: true,
    configurable: true
  });

  Sprite.prototype.destroy = function () {
    this._buffer.destroy();

    _materialManager.MaterialManager.releaseMaterial(this._materialName);

    this._material = undefined;
    this._materialName = undefined;
  };

  Sprite.prototype.load = function () {
    this._buffer = new _glBuffer.GLBuffer();
    var positionAttribute = new _glBuffer.AttributeInfo(); // positionAttribute.location = this._shader.getAttributeLocation('a_position');
    // Standard set of attributes for now. Position attribute to be the first attribute in the shader.

    positionAttribute.location = 0;
    positionAttribute.size = 3;

    this._buffer.addAttributeLocation(positionAttribute);

    var textCoordAttribute = new _glBuffer.AttributeInfo();
    textCoordAttribute.location = 1;
    textCoordAttribute.size = 2;

    this._buffer.addAttributeLocation(textCoordAttribute);

    this.calculateVertices();
  };

  Sprite.prototype.update = function (time) {};

  Sprite.prototype.draw = function (shader, model) {
    var modelLocation = shader.getUniformLocation('u_model');

    _gl.gl.uniformMatrix4fv(modelLocation, false, model.toFloat32Array());

    var colorLocation = shader.getUniformLocation('u_tint'); // Orange tint
    // gl.uniform4f(colorLocation, 1.0, 0.5, 0.0, 1.0);
    // Blue tint
    // gl.uniform4f(colorLocation, 0.0, 0.3, 1.0, 1.0);
    // White tint

    _gl.gl.uniform4fv(colorLocation, this._material.tint.toFloat32Array()); // What texture unit to unescape, 0 for now


    if (this._material.diffuseTexture !== undefined) {
      this._material.diffuseTexture.activateAndBind(0);

      var diffuseLocation = shader.getUniformLocation('u_diffuse');

      _gl.gl.uniform1i(diffuseLocation, 0);
    }

    this._buffer.bind();

    this._buffer.draw();
  };

  Sprite.prototype.calculateVertices = function () {
    var minX = -(this._width * this._origin.x);
    var maxX = this._width * (1.0 - this._origin.x);
    var minY = -(this._height * this._origin.y);
    var maxY = this._height * (1.0 - this._origin.y);
    this._vertices = [// x, y, z      u,v
    new _vertex.Vertex(minX, minY, 0, 0, 0), new _vertex.Vertex(minX, maxY, 0, 0, 1.0), new _vertex.Vertex(maxX, maxY, 0, 1.0, 1.0), new _vertex.Vertex(maxX, maxY, 0, 1.0, 1.0), new _vertex.Vertex(maxX, minY, 0, 1.0, 0), new _vertex.Vertex(minX, minY, 0, 0, 0)];

    for (var _i = 0, _a = this._vertices; _i < _a.length; _i++) {
      var v = _a[_i];

      this._buffer.pushBackData(v.toArray());
    }

    this._buffer.upload();

    this._buffer.unbind();
  };

  Sprite.prototype.recalculateVertices = function () {
    var minX = -(this._width * this._origin.x);
    var maxX = this._width * (1.0 - this._origin.x);
    var minY = -(this._height * this._origin.y);
    var maxY = this._height * (1.0 - this._origin.y);

    this._vertices[0].position.set(minX, minY);

    this._vertices[1].position.set(minX, maxY);

    this._vertices[2].position.set(maxX, maxY);

    this._vertices[3].position.set(maxX, maxY);

    this._vertices[4].position.set(maxX, minY);

    this._vertices[5].position.set(minX, minY);

    this._buffer.clearData();

    for (var _i = 0, _a = this._vertices; _i < _a.length; _i++) {
      var v = _a[_i];

      this._buffer.pushBackData(v.toArray());
    }

    this._buffer.upload();

    this._buffer.unbind();
  };

  return Sprite;
}();

exports.Sprite = Sprite;
},{"../gl/gl":"node_modules/xgl/dist/gl/gl.js","../gl/glBuffer":"node_modules/xgl/dist/gl/glBuffer.js","./materialManager":"node_modules/xgl/dist/graphics/materialManager.js","./vertex":"node_modules/xgl/dist/graphics/vertex.js","../math/vector3":"node_modules/xgl/dist/math/vector3.js"}],"node_modules/xgl/dist/components/baseComponent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseComponent = void 0;

var BaseComponent =
/** @class */
function () {
  function BaseComponent(data) {
    this._data = data;
    this.name = data.name;
  }

  BaseComponent.prototype.buildFromJson = function (json) {
    throw new Error("Method not implemented.");
  };

  Object.defineProperty(BaseComponent.prototype, "owner", {
    get: function () {
      return this._owner;
    },
    enumerable: true,
    configurable: true
  });

  BaseComponent.prototype.setOwner = function (owner) {
    this._owner = owner;
  };

  BaseComponent.prototype.load = function () {};

  BaseComponent.prototype.updateReady = function () {};

  BaseComponent.prototype.update = function (time) {};

  BaseComponent.prototype.render = function (shader) {};

  return BaseComponent;
}();

exports.BaseComponent = BaseComponent;
},{}],"node_modules/xgl/dist/components/spriteComponent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpriteComponent = exports.SpriteComponentBuilder = exports.SpriteComponentData = void 0;

var _sprite = require("../graphics/sprite");

var _baseComponent = require("./baseComponent");

var _vector = require("../math/vector3");

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var SpriteComponentData =
/** @class */
function () {
  function SpriteComponentData() {
    this.origin = _vector.Vector3.zero;
  }

  SpriteComponentData.prototype.setFromJson = function (json) {
    if (json.name !== undefined) {
      this.name = String(json.name);
    }

    if (json.width !== undefined) {
      this.width = Number(json.width);
    }

    if (json.height !== undefined) {
      this.height = Number(json.height);
    }

    if (json.materialName !== undefined) {
      this.materialName = String(json.materialName);
    }

    if (json.origin !== undefined) {
      this.origin.setFromJson(json.origin);
    }
  };

  return SpriteComponentData;
}();

exports.SpriteComponentData = SpriteComponentData;

var SpriteComponentBuilder =
/** @class */
function () {
  function SpriteComponentBuilder() {}

  Object.defineProperty(SpriteComponentBuilder.prototype, "type", {
    get: function () {
      return 'sprite';
    },
    enumerable: true,
    configurable: true
  });

  SpriteComponentBuilder.prototype.buildFromJson = function (json) {
    var data = new SpriteComponentData();
    data.setFromJson(json);
    return new SpriteComponent(data);
  };

  return SpriteComponentBuilder;
}();

exports.SpriteComponentBuilder = SpriteComponentBuilder;

var SpriteComponent =
/** @class */
function (_super) {
  __extends(SpriteComponent, _super);

  function SpriteComponent(data) {
    var _this = _super.call(this, data) || this;

    _this.width = data.width;
    _this.height = data.height;
    _this._sprite = new _sprite.Sprite(data.name, data.materialName, _this.width, _this.height);

    if (!data.origin.equals(_vector.Vector3.zero)) {
      _this._sprite.origin.copyFrom(data.origin);
    }

    return _this;
  }

  SpriteComponent.prototype.load = function () {
    this._sprite.load();
  };

  SpriteComponent.prototype.render = function (shader) {
    this._sprite.draw(shader, this.owner.worldMatrix);

    _super.prototype.render.call(this, shader);
  };

  return SpriteComponent;
}(_baseComponent.BaseComponent);

exports.SpriteComponent = SpriteComponent;
},{"../graphics/sprite":"node_modules/xgl/dist/graphics/sprite.js","./baseComponent":"node_modules/xgl/dist/components/baseComponent.js","../math/vector3":"node_modules/xgl/dist/math/vector3.js"}],"node_modules/xgl/dist/message/messageSubscriptionNode.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageSubscritionNode = void 0;

var MessageSubscritionNode =
/** @class */
function () {
  function MessageSubscritionNode(message, handler) {
    this.message = message;
    this.handler = handler;
  }

  return MessageSubscritionNode;
}();

exports.MessageSubscritionNode = MessageSubscritionNode;
},{}],"node_modules/xgl/dist/message/messageBus.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageBus = void 0;

var _message = require("./message");

var _messageSubscriptionNode = require("./messageSubscriptionNode");

var MessageBus =
/** @class */
function () {
  function MessageBus() {}

  MessageBus.addSubscription = function (code, handler) {
    if (MessageBus._subscriptions[code] === undefined) {
      MessageBus._subscriptions[code] = [];
    }

    if (MessageBus._subscriptions[code].indexOf(handler) !== -1) {
      console.warn("Attemping to add  a duplicate handler to code " + code + ". Subscription not added.");
    } else {
      MessageBus._subscriptions[code].push(handler);
    }
  };

  MessageBus.removeSubscription = function (code, handler) {
    if (MessageBus._subscriptions[code] === undefined) {
      console.warn("Cannot unsubscribe handler from the code: " + code + ", because that code is not subscribed to.");
      return;
    }

    var nodeIndex = MessageBus._subscriptions[code].indexOf(handler);

    if (nodeIndex !== -1) {
      MessageBus._subscriptions[code].splice(nodeIndex, 1);
    }
  };

  MessageBus.post = function (message) {
    console.log('Message posted', message);
    var handlers = MessageBus._subscriptions[message.code];

    if (handlers === undefined) {
      return;
    }

    for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
      var h = handlers_1[_i];

      if (message.priority === _message.MessagePriotity.HIGH) {
        h.onMessage(message);
      } else {
        MessageBus._normalMessageQueue.push(new _messageSubscriptionNode.MessageSubscritionNode(message, h));
      }
    }
  };

  MessageBus.update = function (time) {
    if (MessageBus._normalMessageQueue.length === 0) {
      return;
    }

    var messageLimit = Math.min(MessageBus._normalQueueMessagePerUpdate, MessageBus._normalMessageQueue.length);

    for (var i = 0; i < messageLimit; i++) {
      var node = MessageBus._normalMessageQueue.pop();

      node && node.handler.onMessage(node.message);
    }
  };

  MessageBus._subscriptions = {};
  MessageBus._normalQueueMessagePerUpdate = 10;
  MessageBus._normalMessageQueue = [];
  return MessageBus;
}();

exports.MessageBus = MessageBus;
},{"./message":"node_modules/xgl/dist/message/message.js","./messageSubscriptionNode":"node_modules/xgl/dist/message/messageSubscriptionNode.js"}],"node_modules/xgl/dist/message/message.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Message = exports.MessagePriotity = void 0;

var _messageBus = require("./messageBus");

var MessagePriotity;
exports.MessagePriotity = MessagePriotity;

(function (MessagePriotity) {
  MessagePriotity[MessagePriotity["NORMAL"] = 0] = "NORMAL";
  MessagePriotity[MessagePriotity["HIGH"] = 1] = "HIGH";
})(MessagePriotity || (exports.MessagePriotity = MessagePriotity = {}));

var Message =
/** @class */
function () {
  function Message(code, sender, context, priority) {
    if (priority === void 0) {
      priority = MessagePriotity.NORMAL;
    }

    this.code = code;
    this.sender = sender;
    this.context = context;
    this.priority = priority;
  }

  Message.send = function (code, sender, context) {
    _messageBus.MessageBus.post(new Message(code, sender, context));
  };

  Message.sendPriority = function (code, sender, context) {
    _messageBus.MessageBus.post(new Message(code, sender, context, MessagePriotity.HIGH));
  };

  Message.subscribe = function (code, handler) {
    _messageBus.MessageBus.addSubscription(code, handler);
  };

  Message.unsubscribe = function (code, handler) {
    _messageBus.MessageBus.removeSubscription(code, handler);
  };

  return Message;
}();

exports.Message = Message;
},{"./messageBus":"node_modules/xgl/dist/message/messageBus.js"}],"node_modules/xgl/dist/assets/imageAssetLoader.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageAssetLoader = exports.ImageAsset = void 0;

var _assetManager = require("./assetManager");

var ImageAsset =
/** @class */
function () {
  function ImageAsset(name, data) {
    this.name = name;
    this.data = data;
  }

  Object.defineProperty(ImageAsset.prototype, "width", {
    get: function () {
      return this.data.width;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ImageAsset.prototype, "height", {
    get: function () {
      return this.data.height;
    },
    enumerable: true,
    configurable: true
  });
  return ImageAsset;
}();

exports.ImageAsset = ImageAsset;

var ImageAssetLoader =
/** @class */
function () {
  function ImageAssetLoader() {}

  Object.defineProperty(ImageAssetLoader.prototype, "supportedExtensions", {
    get: function () {
      return ['png', 'gif', 'jpg'];
    },
    enumerable: true,
    configurable: true
  });

  ImageAssetLoader.prototype.loadAsset = function (assetName) {
    var image = new Image();
    image.onload = this.onImageLoaded.bind(this, assetName, image);
    image.src = assetName;
  };

  ImageAssetLoader.prototype.onImageLoaded = function (assetName, image) {
    console.log('OnImageLoaded: assetName/Image', assetName, image);
    var asset = new ImageAsset(assetName, image);

    _assetManager.AssetManager.onAssetLoaded(asset);
  };

  return ImageAssetLoader;
}();

exports.ImageAssetLoader = ImageAssetLoader;
},{"./assetManager":"node_modules/xgl/dist/assets/assetManager.js"}],"node_modules/xgl/dist/assets/jsonAssetLoader.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsonAssetLoader = exports.JsonAsset = void 0;

var _assetManager = require("./assetManager");

var JsonAsset =
/** @class */
function () {
  function JsonAsset(name, data) {
    this.name = name;
    this.data = data;
  }

  return JsonAsset;
}();

exports.JsonAsset = JsonAsset;

var JsonAssetLoader =
/** @class */
function () {
  function JsonAssetLoader() {}

  Object.defineProperty(JsonAssetLoader.prototype, "supportedExtensions", {
    get: function () {
      return ['json'];
    },
    enumerable: true,
    configurable: true
  });

  JsonAssetLoader.prototype.loadAsset = function (assetName) {
    var request = new XMLHttpRequest();
    request.open('GET', assetName);
    request.addEventListener('load', this.onJsonLoaded.bind(this, assetName, request));
    request.send();
  };

  JsonAssetLoader.prototype.onJsonLoaded = function (assetName, request) {
    console.log('OnImageLoaded: assetName/Image', assetName, request);

    if (request.readyState === request.DONE) {
      var json = JSON.parse(request.responseText);
      var asset = new JsonAsset(assetName, json);

      _assetManager.AssetManager.onAssetLoaded(asset);
    }
  };

  return JsonAssetLoader;
}();

exports.JsonAssetLoader = JsonAssetLoader;
},{"./assetManager":"node_modules/xgl/dist/assets/assetManager.js"}],"node_modules/xgl/dist/assets/TextAssetLoader.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextAssetLoader = exports.TextAsset = void 0;

var _assetManager = require("./assetManager");

/**
 * Represents a text file asset.
 */
var TextAsset =
/** @class */
function () {
  /**
   * Creates a new text asset.
   * @param name The name of this asset.
   * @param data The content of this asset.
   */
  function TextAsset(name, data) {
    this.name = name;
    this.data = data;
  }

  return TextAsset;
}();

exports.TextAsset = TextAsset;

/**
 * The loader for a text asset.
 */
var TextAssetLoader =
/** @class */
function () {
  function TextAssetLoader() {}

  Object.defineProperty(TextAssetLoader.prototype, "supportedExtensions", {
    /**
     * The list of supported file extensions.
     */
    get: function () {
      return ["txt"];
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Loads a text asset with the provided name.
   * @param assetName The asset to be loaded.
   */

  TextAssetLoader.prototype.loadAsset = function (assetName) {
    var request = new XMLHttpRequest();
    request.open("GET", assetName);
    request.addEventListener("load", this.onTextLoaded.bind(this, assetName, request));
    request.send();
  };
  /**
   * Fired when a text asset has loaded.
   * @param assetName The name of the asset.
   * @param request The request object.
   */


  TextAssetLoader.prototype.onTextLoaded = function (assetName, request) {
    console.debug("onTextLoaded: assetName/request", assetName, request);

    if (request.readyState === request.DONE) {
      var asset = new TextAsset(assetName, request.responseText);

      _assetManager.AssetManager.onAssetLoaded(asset);
    }
  };

  return TextAssetLoader;
}();

exports.TextAssetLoader = TextAssetLoader;
},{"./assetManager":"node_modules/xgl/dist/assets/assetManager.js"}],"node_modules/xgl/dist/assets/assetManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssetManager = exports.MESSAGE_ASSET_LOADER_ASSET_LOADED = void 0;

var _message = require("../message/message");

var _imageAssetLoader = require("./imageAssetLoader");

var _jsonAssetLoader = require("./jsonAssetLoader");

var _TextAssetLoader = require("./TextAssetLoader");

var MESSAGE_ASSET_LOADER_ASSET_LOADED = 'MESSAGE_ASSET_LOADER_ASSET_LOADED::';
exports.MESSAGE_ASSET_LOADER_ASSET_LOADED = MESSAGE_ASSET_LOADER_ASSET_LOADED;

var AssetManager =
/** @class */
function () {
  function AssetManager() {}

  AssetManager.initialize = function () {
    AssetManager._loaders.push(new _imageAssetLoader.ImageAssetLoader());

    AssetManager._loaders.push(new _jsonAssetLoader.JsonAssetLoader());

    AssetManager._loaders.push(new _TextAssetLoader.TextAssetLoader());
  };

  AssetManager.prototype.registerLoader = function (loader) {
    AssetManager._loaders.push(loader);
  };

  AssetManager.onAssetLoaded = function (asset) {
    AssetManager._loadedAssets[asset.name] = asset;

    _message.Message.send(MESSAGE_ASSET_LOADER_ASSET_LOADED + asset.name, this, asset);
  };

  AssetManager.loadAsset = function (assetName) {
    var extension = assetName.split('.').pop();
    extension = extension ? extension.toLowerCase() : extension;

    for (var _i = 0, _a = AssetManager._loaders; _i < _a.length; _i++) {
      var l = _a[_i];

      if (l.supportedExtensions.indexOf(extension) !== -1) {
        l.loadAsset(assetName);
        return;
      }
    }

    console.warn("Unable to load asset with extension " + extension + ", because there is no loader associated with it.");
  };

  AssetManager.isAssetLoaded = function (assetName) {
    return AssetManager._loadedAssets[assetName] !== undefined;
  };

  AssetManager.getAsset = function (assetName) {
    if (AssetManager.isAssetLoaded(assetName)) {
      return AssetManager._loadedAssets[assetName];
    } else {
      AssetManager.loadAsset(assetName);
    } // @ts-ignore


    return undefined;
  };

  AssetManager._loaders = [];
  AssetManager._loadedAssets = {};
  return AssetManager;
}();

exports.AssetManager = AssetManager;
},{"../message/message":"node_modules/xgl/dist/message/message.js","./imageAssetLoader":"node_modules/xgl/dist/assets/imageAssetLoader.js","./jsonAssetLoader":"node_modules/xgl/dist/assets/jsonAssetLoader.js","./TextAssetLoader":"node_modules/xgl/dist/assets/TextAssetLoader.js"}],"node_modules/xgl/dist/graphics/animatedSprite.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimatedSprite = exports.AnimatedSpriteInfo = void 0;

var _vector = require("../math/vector2");

var _sprite = require("./sprite");

var _message = require("../message/message");

var _assetManager = require("../assets/assetManager");

var _materialManager = require("./materialManager");

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var UVInfo =
/** @class */
function () {
  function UVInfo(min, max) {
    this.min = min;
    this.max = max;
  }

  return UVInfo;
}();

var AnimatedSpriteInfo =
/** @class */
function () {
  function AnimatedSpriteInfo() {
    /** The width of this sprite. */
    this.width = 100;
    /** The height of this sprite. */

    this.height = 100;
    /** The frame width of this sprite. */

    this.frameWidth = 10;
    /** The frame height of this sprite. */

    this.frameHeight = 10;
    /** The number of frames to be animated. */

    this.frameCount = 1;
    /** The sequence of frame indexes to be played. */

    this.frameSequence = [];
    /** The number of milliseconds each frame takes. */

    this.frameTime = 60;
  }

  return AnimatedSpriteInfo;
}();

exports.AnimatedSpriteInfo = AnimatedSpriteInfo;

var AnimatedSprite =
/** @class */
function (_super) {
  __extends(AnimatedSprite, _super);

  function AnimatedSprite(info) {
    var _this = _super.call(this, info.name, info.materialName, info.width, info.height) || this;

    _this._frameTime = 33;
    _this._frameUVs = [];
    _this._currentFrame = 0;
    _this._currentTime = 0;
    _this._assetLoaded = false;
    _this._assetWidth = 2;
    _this._assetHeight = 2;
    _this._isPlaying = true;
    _this._frameWidth = info.frameWidth;
    _this._frameHeight = info.frameHeight;
    _this._frameCount = info.frameCount;
    _this._frameSequence = info.frameSequence;
    _this._frameTime = info.frameTime;

    _message.Message.subscribe(_assetManager.MESSAGE_ASSET_LOADER_ASSET_LOADED + _this._material.diffuseTextureName, _this);

    return _this;
  }

  Object.defineProperty(AnimatedSprite.prototype, "isPlaying", {
    get: function () {
      return this._isPlaying;
    },
    enumerable: true,
    configurable: true
  });

  AnimatedSprite.prototype.destroy = function () {
    _super.prototype.destroy.call(this);
  };

  AnimatedSprite.prototype.play = function () {
    this._isPlaying = true;
  };

  AnimatedSprite.prototype.stop = function () {
    this._isPlaying = false;
  };

  AnimatedSprite.prototype.setFrame = function (frameNumber) {
    if (frameNumber >= this._frameCount) {
      throw new Error("Frame is out of range: " + frameNumber + ", frame count " + this._frameCount);
    }

    this._currentFrame = frameNumber;
  };
  /**
   * Calculates UV coordinates once the texture is loaded
   *
   * @param message
   */


  AnimatedSprite.prototype.onMessage = function (message) {
    if (message.code === _assetManager.MESSAGE_ASSET_LOADER_ASSET_LOADED + this._material.diffuseTextureName) {
      this._assetLoaded = true;
      var asset = message.context;
      this._assetWidth = asset.width;
      this._assetHeight = asset.height;

      this._calculateUVs();
    }
  };

  AnimatedSprite.prototype.load = function () {
    _super.prototype.load.call(this);

    if (!this._assetLoaded) {
      this.setupFromMaterial();
    }
  };

  AnimatedSprite.prototype.update = function (time) {
    if (!this._assetLoaded) {
      this.setupFromMaterial();
      return;
    }

    if (!this._isPlaying) {
      return;
    }

    this._currentTime += time;

    if (this._currentTime > this._frameTime) {
      this._currentFrame++;
      this._currentTime = 0;

      if (this._currentFrame >= this._frameSequence.length) {
        this._currentFrame = 0;
      } // Gets current frame U and V coordinates within the tiled texture containing all sprite frames
      // Example data as reference
      // this._vertices = [
      //     // x, y, z      u,v
      //     new Vertex(0, 0, 0, 0, 0),
      //     new Vertex(0, this._height, 0, 0, 1.0),
      //     new Vertex(this._width, this._height, 0, 1.0, 1.0),
      //     new Vertex(this._width, this._height, 0, 1.0, 1.0),
      //     new Vertex(this._width, 0, 0, 1.0, 0),
      //     new Vertex(0, 0, 0, 0, 0)
      // ];


      var frameUVs = this._frameSequence[this._currentFrame];

      this._vertices[0].textCoords.copyFrom(this._frameUVs[frameUVs].min);

      this._vertices[1].textCoords = new _vector.Vector2(this._frameUVs[frameUVs].min.x, this._frameUVs[frameUVs].max.y);

      this._vertices[2].textCoords.copyFrom(this._frameUVs[frameUVs].max);

      this._vertices[3].textCoords.copyFrom(this._frameUVs[frameUVs].max);

      this._vertices[4].textCoords = new _vector.Vector2(this._frameUVs[frameUVs].max.x, this._frameUVs[frameUVs].min.y);

      this._vertices[5].textCoords.copyFrom(this._frameUVs[frameUVs].min);

      this._buffer.clearData();

      for (var _i = 0, _a = this._vertices; _i < _a.length; _i++) {
        var v = _a[_i];

        this._buffer.pushBackData(v.toArray());
      }

      this._buffer.upload();

      this._buffer.bind();
    }

    _super.prototype.update.call(this, time);
  };

  AnimatedSprite.prototype._calculateUVs = function () {
    var totalWidth = 0;
    var yValue = 0;

    for (var i = 0; i < this._frameCount; ++i) {
      totalWidth = i * this._frameWidth;

      if (totalWidth > this._assetWidth) {
        yValue++;
        totalWidth = 0;
      }

      var uMin = i * this._frameWidth / this._assetWidth;
      var vMin = yValue * this._frameHeight / this._assetHeight;
      var min = new _vector.Vector2(uMin, vMin);
      var uMax = (i * this._frameWidth + this._frameWidth) / this._assetWidth;
      var vMax = (yValue * this._frameHeight + this._frameHeight) / this._assetHeight;
      var max = new _vector.Vector2(uMax, vMax);

      this._frameUVs.push(new UVInfo(min, max));
    }
  }; // Fixes race condition where texture has been cached


  AnimatedSprite.prototype.setupFromMaterial = function () {
    if (!this._assetLoaded) {
      var material = _materialManager.MaterialManager.getMaterial(this._materialName);

      if (material.diffuseTexture.isLoaded) {
        if (_assetManager.AssetManager.isAssetLoaded(material.diffuseTextureName)) {
          this._assetWidth = material.diffuseTexture.width;
          this._assetHeight = material.diffuseTexture.height;
          this._assetLoaded = true;

          this._calculateUVs();
        }
      }
    }
  };

  return AnimatedSprite;
}(_sprite.Sprite);

exports.AnimatedSprite = AnimatedSprite;
},{"../math/vector2":"node_modules/xgl/dist/math/vector2.js","./sprite":"node_modules/xgl/dist/graphics/sprite.js","../message/message":"node_modules/xgl/dist/message/message.js","../assets/assetManager":"node_modules/xgl/dist/assets/assetManager.js","./materialManager":"node_modules/xgl/dist/graphics/materialManager.js"}],"node_modules/xgl/dist/components/animatedSpriteComponent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimatedSpriteComponent = exports.AnimatedSpriteComponentBuilder = exports.AnimatedSpriteComponentData = void 0;

var _animatedSprite = require("../graphics/animatedSprite");

var _baseComponent = require("./baseComponent");

var _spriteComponent = require("./spriteComponent");

var _vector = require("../math/vector3");

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var AnimatedSpriteComponentData =
/** @class */
function (_super) {
  __extends(AnimatedSpriteComponentData, _super);

  function AnimatedSpriteComponentData() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.frameSequence = [];
    _this.autoPlay = true;
    _this.frameTime = 33;
    return _this;
  }

  AnimatedSpriteComponentData.prototype.setFromJson = function (json) {
    _super.prototype.setFromJson.call(this, json);

    if (json.autoPlay !== undefined) {
      this.autoPlay = Boolean(json.autoPlay);
    }

    if (json.frameWidth === undefined) {
      throw new Error("AnimatedComponentData requires 'frameWidth' to be defined");
    } else {
      this.frameWidth = Number(json.frameWidth);
    }

    if (json.frameHeight === undefined) {
      throw new Error("AnimatedComponentData requires 'frameHeight' to be defined");
    } else {
      this.frameHeight = Number(json.frameHeight);
    }

    if (json.frameCount === undefined) {
      throw new Error("AnimatedComponentData requires 'frameCount' to be defined");
    } else {
      this.frameCount = Number(json.frameCount);
    }

    if (json.frameSequence === undefined) {
      throw new Error("AnimatedComponentData requires 'frameSequence' to be defined");
    } else {
      this.frameSequence = json.frameSequence;
    }

    if (json.frameTime !== undefined) {
      this.frameTime = Number(json.frameTime);
    }
  };

  return AnimatedSpriteComponentData;
}(_spriteComponent.SpriteComponentData);

exports.AnimatedSpriteComponentData = AnimatedSpriteComponentData;

var AnimatedSpriteComponentBuilder =
/** @class */
function () {
  function AnimatedSpriteComponentBuilder() {}

  Object.defineProperty(AnimatedSpriteComponentBuilder.prototype, "type", {
    get: function () {
      return 'animatedSprite';
    },
    enumerable: true,
    configurable: true
  });

  AnimatedSpriteComponentBuilder.prototype.buildFromJson = function (json) {
    var data = new AnimatedSpriteComponentData();
    data.setFromJson(json);
    return new AnimatedSpriteComponent(data);
  };

  return AnimatedSpriteComponentBuilder;
}();

exports.AnimatedSpriteComponentBuilder = AnimatedSpriteComponentBuilder;

var AnimatedSpriteComponent =
/** @class */
function (_super) {
  __extends(AnimatedSpriteComponent, _super);

  function AnimatedSpriteComponent(data) {
    var _this = _super.call(this, data) || this;

    _this._autoPlay = data.autoPlay;
    var spriteInfo = new _animatedSprite.AnimatedSpriteInfo();
    spriteInfo.name = name;
    spriteInfo.materialName = data.materialName;
    spriteInfo.frameWidth = data.frameWidth;
    spriteInfo.frameHeight = data.frameHeight;
    spriteInfo.width = data.frameWidth;
    spriteInfo.height = data.frameHeight;
    spriteInfo.frameCount = data.frameCount;
    spriteInfo.frameSequence = data.frameSequence;
    spriteInfo.frameTime = data.frameTime;
    _this._sprite = new _animatedSprite.AnimatedSprite(spriteInfo);

    if (!data.origin.equals(_vector.Vector3.zero)) {
      _this._sprite.origin.copyFrom(data.origin);
    }

    return _this;
  }

  Object.defineProperty(AnimatedSpriteComponent.prototype, "isPlaying", {
    get: function () {
      return this._sprite.isPlaying;
    },
    enumerable: true,
    configurable: true
  });

  AnimatedSpriteComponent.prototype.load = function () {
    this._sprite.load();
  };

  AnimatedSpriteComponent.prototype.updateReady = function () {
    if (!this._autoPlay) {
      this._sprite.stop();
    }
  };

  AnimatedSpriteComponent.prototype.update = function (time) {
    this._sprite.update(time);

    _super.prototype.update.call(this, time);
  };

  AnimatedSpriteComponent.prototype.render = function (shader) {
    this._sprite.draw(shader, this.owner.worldMatrix);

    _super.prototype.render.call(this, shader);
  };

  AnimatedSpriteComponent.prototype.play = function () {
    this._sprite.play();
  };

  AnimatedSpriteComponent.prototype.stop = function () {
    this._sprite.stop();
  };

  AnimatedSpriteComponent.prototype.setFrame = function (frameNumber) {
    this._sprite.setFrame(frameNumber);
  };

  return AnimatedSpriteComponent;
}(_baseComponent.BaseComponent);

exports.AnimatedSpriteComponent = AnimatedSpriteComponent;
},{"../graphics/animatedSprite":"node_modules/xgl/dist/graphics/animatedSprite.js","./baseComponent":"node_modules/xgl/dist/components/baseComponent.js","./spriteComponent":"node_modules/xgl/dist/components/spriteComponent.js","../math/vector3":"node_modules/xgl/dist/math/vector3.js"}],"node_modules/xgl/dist/graphics/texture.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Texture = void 0;

var _gl = require("../gl/gl");

var _message = require("../message/message");

var _assetManager = require("../assets/assetManager");

var LEVEL = 0;
var BORDER = 0;
var TEMP_IMAGE_DATA = new Uint8Array([255, 255, 255, 255]);

var Texture =
/** @class */
function () {
  function Texture(name, width, height) {
    if (width === void 0) {
      width = 1;
    }

    if (height === void 0) {
      height = 1;
    }

    this._isLoaded = false;
    this._name = name;
    this._width = width;
    this._height = height;
    this._handle = _gl.gl.createTexture();
    this.bind();

    _gl.gl.texImage2D(_gl.gl.TEXTURE_2D, LEVEL, _gl.gl.RGBA, 1, 1, BORDER, _gl.gl.RGBA, _gl.gl.UNSIGNED_BYTE, TEMP_IMAGE_DATA);

    var asset = _assetManager.AssetManager.getAsset(this.name);

    if (asset !== undefined) {
      this.loadTextureFromAsset(asset);
    } else {
      _message.Message.subscribe(_assetManager.MESSAGE_ASSET_LOADER_ASSET_LOADED + this.name, this);
    }
  }

  Object.defineProperty(Texture.prototype, "name", {
    get: function () {
      return this._name;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Texture.prototype, "isLoaded", {
    get: function () {
      return this._isLoaded;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Texture.prototype, "width", {
    get: function () {
      return this._width;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Texture.prototype, "height", {
    get: function () {
      return this._height;
    },
    enumerable: true,
    configurable: true
  });

  Texture.prototype.destroy = function () {
    _gl.gl.deleteTexture(this._handle);
  };

  Texture.prototype.activateAndBind = function (textureUnit) {
    if (textureUnit === void 0) {
      textureUnit = 0;
    }

    _gl.gl.activeTexture(_gl.gl.TEXTURE0 + textureUnit);

    this.bind();
  };

  Texture.prototype.bind = function () {
    _gl.gl.bindTexture(_gl.gl.TEXTURE_2D, this._handle);
  };

  Texture.prototype.unbind = function () {
    _gl.gl.bindTexture(_gl.gl.TEXTURE_2D, undefined);
  };

  Texture.prototype.onMessage = function (message) {
    if (message.code === _assetManager.MESSAGE_ASSET_LOADER_ASSET_LOADED + this.name) {
      this.loadTextureFromAsset(message.context);
    }
  };

  Texture.prototype.loadTextureFromAsset = function (asset) {
    this._width = asset.width;
    this._height = asset.height;
    this.bind();

    _gl.gl.texImage2D(_gl.gl.TEXTURE_2D, LEVEL, _gl.gl.RGBA, _gl.gl.RGBA, _gl.gl.UNSIGNED_BYTE, asset.data);

    if (this.isPowerOf2()) {
      _gl.gl.generateMipmap(_gl.gl.TEXTURE_2D);
    } else {
      // Do not generate a mipmap and clamp wrapping to edge
      // If it isnot a powered of 2 texture we cannot tile it in webgl
      _gl.gl.texParameteri(_gl.gl.TEXTURE_2D, _gl.gl.TEXTURE_WRAP_S, _gl.gl.CLAMP_TO_EDGE);

      _gl.gl.texParameteri(_gl.gl.TEXTURE_2D, _gl.gl.TEXTURE_WRAP_T, _gl.gl.CLAMP_TO_EDGE);
    } // TODO: Set texture filtering based on configuration
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // Pixelated look with NEAREST


    _gl.gl.texParameteri(_gl.gl.TEXTURE_2D, _gl.gl.TEXTURE_MIN_FILTER, _gl.gl.NEAREST);

    _gl.gl.texParameteri(_gl.gl.TEXTURE_2D, _gl.gl.TEXTURE_MAG_FILTER, _gl.gl.NEAREST);

    this._isLoaded = true;
  };

  Texture.prototype.isPowerOf2 = function () {
    return this.isValuePowerOf2(this._width) && this.isValuePowerOf2(this._height);
  };

  Texture.prototype.isValuePowerOf2 = function (value) {
    return (value & value - 1) == 0;
  };

  return Texture;
}();

exports.Texture = Texture;
},{"../gl/gl":"node_modules/xgl/dist/gl/gl.js","../message/message":"node_modules/xgl/dist/message/message.js","../assets/assetManager":"node_modules/xgl/dist/assets/assetManager.js"}],"node_modules/xgl/dist/graphics/textureManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextureManager = void 0;

var _texture = require("./texture");

var TextureReferenceNode =
/** @class */
function () {
  function TextureReferenceNode(texture) {
    this.referenceCount = 1;
    this.texture = texture;
  }

  return TextureReferenceNode;
}();

var TextureManager =
/** @class */
function () {
  function TextureManager() {}

  TextureManager.getTexture = function (textureName) {
    if (TextureManager._textures[name] === undefined) {
      var texture = new _texture.Texture(textureName);
      TextureManager._textures[textureName] = new TextureReferenceNode(texture);
    } else {
      TextureManager._textures[textureName].referenceCount++;
    }

    return TextureManager._textures[textureName].texture;
  };

  TextureManager.releaseTexture = function (textureName) {
    if (TextureManager._textures[name] === undefined) {
      console.warn("A texture named " + textureName + " does not exist and cannot be released");
    } else {
      TextureManager._textures[textureName].referenceCount--;

      if (TextureManager._textures[textureName].referenceCount < 1) {
        TextureManager._textures[textureName].texture.destroy();

        TextureManager._textures[textureName] = undefined;
        delete TextureManager._textures[textureName];
      }
    }
  };

  TextureManager._textures = {};
  return TextureManager;
}();

exports.TextureManager = TextureManager;
},{"./texture":"node_modules/xgl/dist/graphics/texture.js"}],"node_modules/xgl/dist/graphics/material.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Material = void 0;

var _textureManager = require("./textureManager");

var Material =
/** @class */
function () {
  function Material(name, diffuseTextureName, tint) {
    this._name = name;
    this._diffuseTextureName = diffuseTextureName;
    this._tint = tint;

    if (this._diffuseTextureName !== undefined) {
      this._diffuseTexture = _textureManager.TextureManager.getTexture(this._diffuseTextureName);
    }
  }

  Object.defineProperty(Material.prototype, "name", {
    get: function () {
      return this._name;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Material.prototype, "diffuseTextureName", {
    get: function () {
      return this._diffuseTextureName;
    },
    set: function (value) {
      if (this._diffuseTextureName !== undefined) {
        _textureManager.TextureManager.releaseTexture(this._diffuseTextureName);
      }

      this._diffuseTextureName = value;

      if (this._diffuseTextureName !== undefined) {
        this._diffuseTexture = _textureManager.TextureManager.getTexture(this._diffuseTextureName);
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Material.prototype, "diffuseTexture", {
    get: function () {
      return this._diffuseTexture;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Material.prototype, "tint", {
    get: function () {
      return this._tint;
    },
    enumerable: true,
    configurable: true
  });

  Material.prototype.destroy = function () {
    _textureManager.TextureManager.releaseTexture(this._diffuseTextureName);

    this._diffuseTexture = undefined;
  };

  return Material;
}();

exports.Material = Material;
},{"./textureManager":"node_modules/xgl/dist/graphics/textureManager.js"}],"node_modules/xgl/dist/graphics/color.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Color = void 0;

var Color =
/** @class */
function () {
  function Color(r, g, b, a) {
    if (r === void 0) {
      r = 255;
    }

    if (g === void 0) {
      g = 255;
    }

    if (b === void 0) {
      b = 255;
    }

    if (a === void 0) {
      a = 255;
    }

    this._r = r;
    this._g = g;
    this._b = b;
    this._a = a;
  }

  Object.defineProperty(Color.prototype, "r", {
    get: function () {
      return this._r;
    },
    set: function (value) {
      this._r = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Color.prototype, "rFloat", {
    get: function () {
      return this._r / 255.0;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Color.prototype, "g", {
    get: function () {
      return this._g;
    },
    set: function (value) {
      this._g = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Color.prototype, "gFloat", {
    get: function () {
      return this._g / 255.0;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Color.prototype, "b", {
    get: function () {
      return this._b;
    },
    set: function (value) {
      this._b = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Color.prototype, "bFloat", {
    get: function () {
      return this._b / 255.0;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Color.prototype, "a", {
    get: function () {
      return this._a;
    },
    set: function (value) {
      this._a = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Color.prototype, "aFloat", {
    get: function () {
      return this._a / 255.0;
    },
    enumerable: true,
    configurable: true
  });

  Color.prototype.toArray = function () {
    return [this._r, this._g, this._b, this._a];
  };

  Color.prototype.toFloatArray = function () {
    return [this._r / 255, this._g / 255, this._b / 255, this._a / 255];
  };

  Color.prototype.toFloat32Array = function () {
    return new Float32Array(this.toFloatArray());
  };

  Color.white = function () {
    return new Color(255, 255, 255, 255);
  };

  Color.black = function () {
    return new Color(0, 0, 0, 255);
  };

  Color.red = function () {
    return new Color(255, 0, 0, 255);
  };

  Color.green = function () {
    return new Color(0, 255, 0, 255);
  };

  Color.blue = function () {
    return new Color(0, 0, 255, 255);
  };

  return Color;
}();

exports.Color = Color;
},{}],"node_modules/xgl/dist/math/matrix4x4.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Matrix4x4 = void 0;

// Migrate math to use gl matrix library
// http://glmatrix.net/
// import { mat4 } from 'gl-matrix';
var Matrix4x4 =
/** @class */
function () {
  function Matrix4x4() {
    this._data = []; // Identity matrix

    this._data = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, // Translation: x, y, z, n
    0, 0, 0, 1];
  }

  Object.defineProperty(Matrix4x4.prototype, "data", {
    get: function () {
      return this._data;
    },
    enumerable: true,
    configurable: true
  });

  Matrix4x4.identity = function () {
    return new Matrix4x4();
  }; // orthographic matrix renders all as it if would all be flat


  Matrix4x4.orthographic = function (left, right, bottom, top, nearClip, farClip) {
    var m = new Matrix4x4();
    var lr = 1.0 / (left - right);
    var bt = 1.0 / (bottom - top);
    var nf = 1.0 / (nearClip - farClip); // Replacing the diagonal 1s

    m._data[0] = -2.0 * lr;
    m._data[5] = -2.0 * bt;
    m._data[10] = -2.0 * nf; // Replacing last row

    m._data[12] = (left + right) * lr;
    m._data[13] = (top + bottom) * bt;
    m._data[14] = (farClip + nearClip) * nf;
    return m;
  };

  Matrix4x4.translation = function (position) {
    var m = new Matrix4x4();
    m._data[12] = position.x;
    m._data[13] = position.y;
    m._data[14] = position.z;
    return m;
  };
  /**
   * Creates a rotation matrix on the X axis from the provided angle in radians.
   * @param angleInRadians The angle in radians.
   */


  Matrix4x4.rotationX = function (angleInRadians) {
    var m = new Matrix4x4();
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);
    m._data[5] = c;
    m._data[6] = s;
    m._data[9] = -s;
    m._data[10] = c;
    return m;
  };
  /**
   * Creates a rotation matrix on the Y axis from the provided angle in radians.
   * @param angleInRadians The angle in radians.
   */


  Matrix4x4.rotationY = function (angleInRadians) {
    var m = new Matrix4x4();
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);
    m._data[0] = c;
    m._data[2] = -s;
    m._data[8] = s;
    m._data[10] = c;
    return m;
  };
  /**
   * Creates a rotation matrix on the Z axis from the provided angle in radians.
   *
   *  0..PI -> Half Rotation
   *  0..2*PI -> Full Rotation
   *
   * @param angleInRadians The angle in radians.
   */


  Matrix4x4.rotationZ = function (angleInRadians) {
    var m = new Matrix4x4();
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);
    m._data[0] = c;
    m._data[1] = s;
    m._data[4] = -s;
    m._data[5] = c;
    return m;
  };
  /**
   * Creates a rotation matrix from the provided angles in radians.
   * @param xRadians The angle in radians on the X axis.
   * @param yRadians The angle in radians on the Y axis.
   * @param zRadians The angle in radians on the Z axis.
   */


  Matrix4x4.rotationXYZ = function (xRadians, yRadians, zRadians) {
    var rx = Matrix4x4.rotationX(xRadians);
    var ry = Matrix4x4.rotationY(yRadians);
    var rz = Matrix4x4.rotationZ(zRadians); // ZYX

    return Matrix4x4.multiply(Matrix4x4.multiply(rz, ry), rx);
  };
  /**
   * Creates a scale matrix.
   * @param scale The scale to use.
   */


  Matrix4x4.scale = function (scale) {
    var m = new Matrix4x4();
    m._data[0] = scale.x;
    m._data[5] = scale.y;
    m._data[10] = scale.z;
    return m;
  };
  /**
   * Multiplies matrix a by matrix b and returns the result.
   * @param a The first matrix.
   * @param b The second matrix.
   */


  Matrix4x4.multiply = function (a, b) {
    var m = new Matrix4x4();
    var b00 = b._data[0 * 4 + 0];
    var b01 = b._data[0 * 4 + 1];
    var b02 = b._data[0 * 4 + 2];
    var b03 = b._data[0 * 4 + 3];
    var b10 = b._data[1 * 4 + 0];
    var b11 = b._data[1 * 4 + 1];
    var b12 = b._data[1 * 4 + 2];
    var b13 = b._data[1 * 4 + 3];
    var b20 = b._data[2 * 4 + 0];
    var b21 = b._data[2 * 4 + 1];
    var b22 = b._data[2 * 4 + 2];
    var b23 = b._data[2 * 4 + 3];
    var b30 = b._data[3 * 4 + 0];
    var b31 = b._data[3 * 4 + 1];
    var b32 = b._data[3 * 4 + 2];
    var b33 = b._data[3 * 4 + 3];
    var a00 = a._data[0 * 4 + 0];
    var a01 = a._data[0 * 4 + 1];
    var a02 = a._data[0 * 4 + 2];
    var a03 = a._data[0 * 4 + 3];
    var a10 = a._data[1 * 4 + 0];
    var a11 = a._data[1 * 4 + 1];
    var a12 = a._data[1 * 4 + 2];
    var a13 = a._data[1 * 4 + 3];
    var a20 = a._data[2 * 4 + 0];
    var a21 = a._data[2 * 4 + 1];
    var a22 = a._data[2 * 4 + 2];
    var a23 = a._data[2 * 4 + 3];
    var a30 = a._data[3 * 4 + 0];
    var a31 = a._data[3 * 4 + 1];
    var a32 = a._data[3 * 4 + 2];
    var a33 = a._data[3 * 4 + 3];
    m._data[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
    m._data[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
    m._data[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
    m._data[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
    m._data[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
    m._data[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
    m._data[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
    m._data[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
    m._data[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
    m._data[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
    m._data[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
    m._data[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
    m._data[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
    m._data[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
    m._data[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
    m._data[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
    return m;
  };
  /** Returns the data of this matrix as a Float32Array. */


  Matrix4x4.prototype.toFloat32Array = function () {
    return new Float32Array(this._data);
  };
  /**
   * Creates a copy of matrix m.
   * @param m The matrix to copy.
   */


  Matrix4x4.prototype.copyFrom = function (m) {
    for (var i = 0; i < 16; ++i) {
      this._data[i] = m._data[i];
    }
  };

  return Matrix4x4;
}();

exports.Matrix4x4 = Matrix4x4;
},{}],"node_modules/xgl/dist/math/transform.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transform = void 0;

var _vector = require("./vector3");

var _matrix4x = require("./matrix4x4");

/**
 * Represents the transformation of an object, providing position, rotation and scale.
 */
var Transform =
/** @class */
function () {
  function Transform() {
    /** The position. Default: Vector3.zero */
    this.position = _vector.Vector3.zero;
    /** The rotation. Default: Vector3.zero */

    this.rotation = _vector.Vector3.zero;
    /** The rotation. Default: Vector3.one */

    this.scale = _vector.Vector3.one;
  }
  /**
   * Creates a copy of the provided transform.
   * @param transform The transform to be copied.
   */


  Transform.prototype.copyFrom = function (transform) {
    this.position.copyFrom(transform.position);
    this.rotation.copyFrom(transform.rotation);
    this.scale.copyFrom(transform.scale);
  };
  /** Creates and returns a matrix based on this transform. */


  Transform.prototype.getTransformationMatrix = function () {
    var translation = _matrix4x.Matrix4x4.translation(this.position);

    var rotation = _matrix4x.Matrix4x4.rotationXYZ(this.rotation.x, this.rotation.y, this.rotation.z);

    var scale = _matrix4x.Matrix4x4.scale(this.scale); // T * R * S


    return _matrix4x.Matrix4x4.multiply(_matrix4x.Matrix4x4.multiply(translation, rotation), scale);
  };
  /**
   * Sets the values of this transform to the ones provided in the given JSON.
   * Only values which are overridden need be provided. For example, a position of [0,1,0]
   * needs only to provide the y value (1) as 0 is the default for x and z.
   * @param json The JSON to set from.
   */


  Transform.prototype.setFromJson = function (json) {
    if (json.position !== undefined) {
      this.position.setFromJson(json.position);
    }

    if (json.rotation !== undefined) {
      this.rotation.setFromJson(json.rotation);
    }

    if (json.scale !== undefined) {
      this.scale.setFromJson(json.scale);
    }
  };

  return Transform;
}();

exports.Transform = Transform;
},{"./vector3":"node_modules/xgl/dist/math/vector3.js","./matrix4x4":"node_modules/xgl/dist/math/matrix4x4.js"}],"node_modules/xgl/dist/world/simObject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimObject = void 0;

var _transform = require("../math/transform");

var _matrix4x = require("../math/matrix4x4");

var _vector = require("../math/vector3");

var SimObject =
/** @class */
function () {
  function SimObject(id, name, scene) {
    this._children = [];
    this._isLoaded = false;
    this._components = [];
    this._behaviors = [];
    this._isVisible = true;
    this._localMatrix = _matrix4x.Matrix4x4.identity();
    this._worldMatrix = _matrix4x.Matrix4x4.identity();
    this.transform = new _transform.Transform();
    this._id = id;
    this.name = name;
    this._scene = scene;
  }

  Object.defineProperty(SimObject.prototype, "id", {
    get: function () {
      return this._id;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(SimObject.prototype, "parent", {
    get: function () {
      return this._parent;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(SimObject.prototype, "worldMatrix", {
    get: function () {
      return this._worldMatrix;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(SimObject.prototype, "isLoaded", {
    get: function () {
      return this._isLoaded;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(SimObject.prototype, "isVisible", {
    get: function () {
      return this._isVisible;
    },
    set: function (value) {
      this._isVisible = value;
    },
    enumerable: true,
    configurable: true
  });

  SimObject.prototype.addChild = function (child) {
    child._parent = this;

    this._children.push(child);

    child.onAdded(this._scene);
  };

  SimObject.prototype.removeChaild = function (child) {
    var index = this._children.indexOf(child);

    if (index !== -1) {
      child._parent = undefined;

      this._children.splice(index, 1);
    }
  };

  SimObject.prototype.getComponentByName = function (name) {
    for (var _i = 0, _a = this._components; _i < _a.length; _i++) {
      var component = _a[_i];

      if (component.name === name) {
        return component;
      }
    }

    for (var _b = 0, _c = this._children; _b < _c.length; _b++) {
      var child = _c[_b];
      var component = this.getComponentByName(name);

      if (component !== undefined) {
        return component;
      }
    }

    return undefined;
  };

  SimObject.prototype.getBehaviorByName = function (name) {
    for (var _i = 0, _a = this._behaviors; _i < _a.length; _i++) {
      var behavior = _a[_i];

      if (behavior.name === name) {
        return behavior;
      }
    }

    for (var _b = 0, _c = this._children; _b < _c.length; _b++) {
      var child = _c[_b];
      var behavior = this.getBehaviorByName(name);

      if (behavior !== undefined) {
        return behavior;
      }
    }

    return undefined;
  };

  SimObject.prototype.getObjectByName = function (name) {
    if (this.name === name) {
      return this;
    }

    for (var _i = 0, _a = this._children; _i < _a.length; _i++) {
      var child = _a[_i];
      var result = child.getObjectByName(name);

      if (result !== undefined) {
        return result;
      }
    }

    return undefined;
  };

  SimObject.prototype.addComponent = function (component) {
    this._components.push(component);

    component.setOwner(this);
  };

  SimObject.prototype.addBehavior = function (behavior) {
    this._behaviors.push(behavior);

    behavior.setOwner(this);
  };

  SimObject.prototype.load = function () {
    this._isLoaded = true;

    for (var _i = 0, _a = this._components; _i < _a.length; _i++) {
      var c = _a[_i];
      c.load();
    }

    for (var _b = 0, _c = this._children; _b < _c.length; _b++) {
      var child = _c[_b];
      child.load();
    }
  };

  SimObject.prototype.updateReady = function () {
    for (var _i = 0, _a = this._components; _i < _a.length; _i++) {
      var c = _a[_i];
      c.updateReady();
    }

    for (var _b = 0, _c = this._behaviors; _b < _c.length; _b++) {
      var b = _c[_b];
      b.updateReady();
    }

    for (var _d = 0, _e = this._children; _d < _e.length; _d++) {
      var child = _e[_d];
      child.updateReady();
    }
  };

  SimObject.prototype.update = function (time) {
    // Dont do that on the update MSInputMethodContext.Only when it changes.For now in here
    this._localMatrix = this.transform.getTransformationMatrix();
    this.updateWorldMatrix(this.parent !== undefined ? this.parent.worldMatrix : undefined);

    for (var _i = 0, _a = this._components; _i < _a.length; _i++) {
      var c = _a[_i];
      c.update(time);
    }

    for (var _b = 0, _c = this._behaviors; _b < _c.length; _b++) {
      var b = _c[_b];
      b.update(time);
    }

    for (var _d = 0, _e = this._children; _d < _e.length; _d++) {
      var child = _e[_d];
      child.update(time);
    }
  };

  SimObject.prototype.render = function (shader) {
    if (!this.isVisible) {
      return;
    }

    for (var _i = 0, _a = this._components; _i < _a.length; _i++) {
      var c = _a[_i];
      c.render(shader);
    }

    for (var _b = 0, _c = this._children; _b < _c.length; _b++) {
      var child = _c[_b];
      child.render(shader);
    }
  };

  SimObject.prototype.getWorldPosition = function () {
    return new _vector.Vector3(this._worldMatrix.data[12], this._worldMatrix.data[13], this._worldMatrix.data[14]);
  };

  SimObject.prototype.onAdded = function (scene) {
    this._scene = scene;
  };

  SimObject.prototype.updateWorldMatrix = function (parentWorldMatrix) {
    if (parentWorldMatrix !== undefined) {
      this._worldMatrix = _matrix4x.Matrix4x4.multiply(parentWorldMatrix, this._localMatrix);
    } else {
      this.worldMatrix.copyFrom(this._localMatrix);
    }
  };

  return SimObject;
}();

exports.SimObject = SimObject;
},{"../math/transform":"node_modules/xgl/dist/math/transform.js","../math/matrix4x4":"node_modules/xgl/dist/math/matrix4x4.js","../math/vector3":"node_modules/xgl/dist/math/vector3.js"}],"node_modules/xgl/dist/world/scene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scene = void 0;

var _simObject = require("./simObject");

var Scene =
/** @class */
function () {
  function Scene() {
    this._root = new _simObject.SimObject(0, '__ROOT__', this);
  }

  Object.defineProperty(Scene.prototype, "root", {
    get: function () {
      return this._root;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Scene.prototype, "isLoaded", {
    get: function () {
      return this._root.isLoaded;
    },
    enumerable: true,
    configurable: true
  });

  Scene.prototype.addObject = function (object) {
    this._root.addChild(object);
  };

  Scene.prototype.getObjectByName = function (name) {
    return this._root.getObjectByName(name);
  };

  Scene.prototype.load = function () {
    this._root.load();
  };

  Scene.prototype.update = function (time) {
    this._root.update(time);
  };

  Scene.prototype.render = function (shader) {
    this._root.render(shader);
  };

  return Scene;
}();

exports.Scene = Scene;
},{"./simObject":"node_modules/xgl/dist/world/simObject.js"}],"node_modules/xgl/dist/components/componentManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentManager = void 0;

var ComponentManager =
/** @class */
function () {
  function ComponentManager() {}

  ComponentManager.registerBuilder = function (builder) {
    ComponentManager._registeredBuilders[builder.type] = builder;
  };

  ComponentManager.extractComponent = function (json) {
    var component = undefined;

    if (json.type !== undefined) {
      if (ComponentManager._registeredBuilders[String(json.type)] !== undefined) {
        component = ComponentManager._registeredBuilders[String(json.type)].buildFromJson(json);
      }
    }

    if (component === undefined) {
      throw new Error("Component manager error - type is missing or builder is not registered for this type.");
    }

    return component;
  };

  ComponentManager._registeredBuilders = {};
  return ComponentManager;
}();

exports.ComponentManager = ComponentManager;
},{}],"node_modules/xgl/dist/behaviors/behaviorManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BehaviorManager = void 0;

var BehaviorManager =
/** @class */
function () {
  function BehaviorManager() {}

  BehaviorManager.registerBuilder = function (builder) {
    BehaviorManager._registeredBuilders[builder.type] = builder;
  };

  BehaviorManager.extractBehavior = function (json) {
    var behavior = undefined;

    if (json.type !== undefined) {
      if (BehaviorManager._registeredBuilders[String(json.type)] !== undefined) {
        behavior = BehaviorManager._registeredBuilders[String(json.type)].buildFromJson(json);
      }
    }

    if (behavior === undefined) {
      throw new Error("Behavior manager error - type is missing or builder is not registered for this type.");
    }

    return behavior;
  };

  BehaviorManager._registeredBuilders = {};
  return BehaviorManager;
}();

exports.BehaviorManager = BehaviorManager;
},{}],"node_modules/xgl/dist/world/zone.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Zone = exports.ZoneState = void 0;

var _scene = require("./scene");

var _simObject = require("./simObject");

var _componentManager = require("../components/componentManager");

var _behaviorManager = require("../behaviors/behaviorManager");

var ZoneState;
exports.ZoneState = ZoneState;

(function (ZoneState) {
  ZoneState[ZoneState["UNINITIALIZED"] = 0] = "UNINITIALIZED";
  ZoneState[ZoneState["LOADING"] = 1] = "LOADING";
  ZoneState[ZoneState["UPDATING"] = 2] = "UPDATING";
})(ZoneState || (exports.ZoneState = ZoneState = {}));

var Zone =
/** @class */
function () {
  function Zone(id, name, description) {
    this._state = ZoneState.UNINITIALIZED;
    this._globalID = -1;
    this._id = id;
    this._name = name;
    this._description = description;
    this._scene = new _scene.Scene();
  }

  Object.defineProperty(Zone.prototype, "id", {
    get: function () {
      return this._id;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Zone.prototype, "name", {
    get: function () {
      return this._name;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Zone.prototype, "description", {
    get: function () {
      return this._description;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Zone.prototype, "scene", {
    get: function () {
      return this._scene;
    },
    enumerable: true,
    configurable: true
  });

  Zone.prototype.initialize = function (zoneData) {
    if (zoneData.objects === undefined) {
      throw new Error('Zone initialization error objects not present.');
    }

    for (var o in zoneData.objects) {
      var obj = zoneData.objects[o];
      this.loadSimObject(obj, this._scene.root);
    }
  };

  Zone.prototype.load = function () {
    this._state = ZoneState.LOADING;

    this._scene.load();

    this._scene.root.updateReady();

    this._state = ZoneState.UPDATING;
  };

  Zone.prototype.unload = function () {};

  Zone.prototype.update = function (time) {
    if (this._state === ZoneState.UPDATING) {
      this._scene.update(time);
    }
  };

  Zone.prototype.render = function (shader) {
    if (this._state === ZoneState.UPDATING) {
      this._scene.render(shader);
    }
  };

  Zone.prototype.onActivated = function () {};

  Zone.prototype.onDeactivated = function () {};

  Zone.prototype.loadSimObject = function (dataSection, parent) {
    var name = '';

    if (dataSection.name !== undefined) {
      name = String(dataSection.name);
    }

    this._globalID++;
    var simObject = new _simObject.SimObject(this._globalID, name, this._scene);

    if (dataSection.transform !== undefined) {
      simObject.transform.setFromJson(dataSection.transform);
    }

    if (dataSection.components !== undefined) {
      for (var c in dataSection.components) {
        var data = dataSection.components[c];

        var component = _componentManager.ComponentManager.extractComponent(data);

        simObject.addComponent(component);
      }
    }

    if (dataSection.behaviors !== undefined) {
      for (var b in dataSection.behaviors) {
        var data = dataSection.behaviors[b];

        var behavior = _behaviorManager.BehaviorManager.extractBehavior(data);

        simObject.addBehavior(behavior);
      }
    }

    if (dataSection.children !== undefined) {
      for (var i in dataSection.children) {
        var obj = dataSection.children[i];
        this.loadSimObject(obj, simObject);
      }
    }

    if (parent !== undefined) {
      parent.addChild(simObject);
    }
  };

  return Zone;
}();

exports.Zone = Zone;
},{"./scene":"node_modules/xgl/dist/world/scene.js","./simObject":"node_modules/xgl/dist/world/simObject.js","../components/componentManager":"node_modules/xgl/dist/components/componentManager.js","../behaviors/behaviorManager":"node_modules/xgl/dist/behaviors/behaviorManager.js"}],"node_modules/xgl/dist/world/zoneManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZoneManager = void 0;

var _zone = require("./zone");

var _assetManager = require("../assets/assetManager");

var _message = require("../message/message");

var ZoneManager =
/** @class */
function () {
  function ZoneManager() {}

  ZoneManager.initialize = function () {
    ZoneManager._inst = new ZoneManager(); // Temporary

    ZoneManager._registeredZones[0] = "assets/zones/testZone.json";
  };

  ZoneManager.changeZone = function (id) {
    if (this._activeZone !== undefined) {
      ZoneManager._activeZone.onDeactivated();

      ZoneManager._activeZone.unload();

      ZoneManager._activeZone = undefined;
    }

    if (ZoneManager._registeredZones[id] !== undefined) {
      if (_assetManager.AssetManager.isAssetLoaded(ZoneManager._registeredZones[id])) {
        var asset = _assetManager.AssetManager.getAsset(ZoneManager._registeredZones[id]);

        ZoneManager.loadZone(asset);
      } else {
        _message.Message.subscribe(_assetManager.MESSAGE_ASSET_LOADER_ASSET_LOADED + ZoneManager._registeredZones[id], ZoneManager._inst);

        _assetManager.AssetManager.loadAsset(ZoneManager._registeredZones[id]);
      }
    } else {
      throw new Error("Zone id: " + id + " does not exist");
    }
  };

  ZoneManager.update = function (time) {
    if (ZoneManager._activeZone !== undefined) {
      ZoneManager._activeZone.update(time);
    }
  };

  ZoneManager.render = function (shader) {
    if (ZoneManager._activeZone !== undefined) {
      ZoneManager._activeZone.render(shader);
    }
  };

  ZoneManager.prototype.onMessage = function (message) {
    if (message.code.indexOf(_assetManager.MESSAGE_ASSET_LOADER_ASSET_LOADED) !== -1) {
      var asset = message.context;
      ZoneManager.loadZone(asset);
    }
  };

  ZoneManager.loadZone = function (asset) {
    var zoneData = asset.data;
    var zoneId;

    if (zoneData.id === undefined) {
      throw new Error("Zone file format exception. Zone ID not present");
    } else {
      zoneId = Number(zoneData.id);
    }

    var zoneName;

    if (zoneData.name === undefined) {
      throw new Error("Zone file format exception. Zone name not present");
    } else {
      zoneName = String(zoneData.name);
    }

    var zoneDescription = '';

    if (zoneData.description !== undefined) {
      zoneDescription = String(zoneData.description);
    }

    ZoneManager._activeZone = new _zone.Zone(zoneId, zoneName, zoneDescription);

    ZoneManager._activeZone.initialize(zoneData);

    ZoneManager._activeZone.onActivated();

    ZoneManager._activeZone.load();

    _message.Message.send("GAME_READY", this);
  };

  ZoneManager._globalZoneID = -1;
  ZoneManager._registeredZones = {};
  return ZoneManager;
}();

exports.ZoneManager = ZoneManager;
},{"./zone":"node_modules/xgl/dist/world/zone.js","../assets/assetManager":"node_modules/xgl/dist/assets/assetManager.js","../message/message":"node_modules/xgl/dist/message/message.js"}],"node_modules/xgl/dist/behaviors/baseBehavior.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseBehavior = void 0;

var BaseBehavior =
/** @class */
function () {
  function BaseBehavior(data) {
    this._data = data;
    this.name = this._data.name;
  }

  BaseBehavior.prototype.setOwner = function (owner) {
    this._owner = owner;
  };

  BaseBehavior.prototype.updateReady = function () {};

  BaseBehavior.prototype.update = function (time) {};

  BaseBehavior.prototype.apply = function (userData) {};

  return BaseBehavior;
}();

exports.BaseBehavior = BaseBehavior;
},{}],"node_modules/xgl/dist/behaviors/rotationBehavior.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RotationBehavior = exports.RotationBehaviorBuilder = exports.RotationBehaviorData = void 0;

var _baseBehavior = require("./baseBehavior");

var _vector = require("../math/vector3");

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var RotationBehaviorData =
/** @class */
function () {
  function RotationBehaviorData() {
    this.rotation = _vector.Vector3.zero;
  }

  RotationBehaviorData.prototype.setFromJson = function (json) {
    if (json.name === undefined) {
      throw new Error('Name must be defined in behavior data');
    }

    this.name = String(json.name);

    if (json.rotation !== undefined) {
      this.rotation.setFromJson(json.rotation);
    }
  };

  return RotationBehaviorData;
}();

exports.RotationBehaviorData = RotationBehaviorData;

var RotationBehaviorBuilder =
/** @class */
function () {
  function RotationBehaviorBuilder() {}

  Object.defineProperty(RotationBehaviorBuilder.prototype, "type", {
    get: function () {
      return 'rotation';
    },
    enumerable: true,
    configurable: true
  });

  RotationBehaviorBuilder.prototype.buildFromJson = function (json) {
    var data = new RotationBehaviorData();
    data.setFromJson(json);
    return new RotationBehavior(data);
  };

  return RotationBehaviorBuilder;
}();

exports.RotationBehaviorBuilder = RotationBehaviorBuilder;

var RotationBehavior =
/** @class */
function (_super) {
  __extends(RotationBehavior, _super);

  function RotationBehavior(data) {
    var _this = _super.call(this, data) || this;

    _this.rotation = data.rotation;
    return _this;
  }

  RotationBehavior.prototype.update = function (time) {
    this._owner.transform.rotation.add(this.rotation);

    _super.prototype.update.call(this, time);
  };

  return RotationBehavior;
}(_baseBehavior.BaseBehavior);

exports.RotationBehavior = RotationBehavior;
},{"./baseBehavior":"node_modules/xgl/dist/behaviors/baseBehavior.js","../math/vector3":"node_modules/xgl/dist/math/vector3.js"}],"node_modules/xgl/dist/input/inputManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputManager = exports.MouseContext = exports.Keys = void 0;

var _vector = require("../math/vector2");

var _message = require("../message/message");

var Keys;
exports.Keys = Keys;

(function (Keys) {
  Keys[Keys["LEFT"] = 37] = "LEFT";
  Keys[Keys["UP"] = 38] = "UP";
  Keys[Keys["RIGHT"] = 39] = "RIGHT";
  Keys[Keys["DOWN"] = 40] = "DOWN";
})(Keys || (exports.Keys = Keys = {}));

var MouseContext =
/** @class */
function () {
  function MouseContext(lefDown, rightDown, position) {
    this.leftDown = lefDown;
    this.rightDown = rightDown;
    this.position = position;
  }

  return MouseContext;
}();

exports.MouseContext = MouseContext;

var InputManager =
/** @class */
function () {
  function InputManager() {}

  InputManager.initialize = function (viewport) {
    for (var i = 0; i < 255; i++) {
      InputManager._keys[i] = false;
    }

    window.addEventListener('keydown', InputManager.onKeyDown);
    window.addEventListener('keyup', InputManager.onKeyUp);
    viewport.addEventListener('mousemove', InputManager.onMouseMove);
    viewport.addEventListener('mousedown', InputManager.onMouseDown);
    viewport.addEventListener('mouseup', InputManager.onMouseUp);
  };

  InputManager.isKeyDown = function (key) {
    return InputManager._keys[key];
  };

  InputManager.getMousePosition = function () {
    return new _vector.Vector2(this._mouseX, this._mouseY);
  };

  InputManager.setResolutionScale = function (scale) {
    InputManager._resolutionScale.copyFrom(scale);
  };

  InputManager.onKeyDown = function (event) {
    InputManager._keys[event.keyCode] = true;
    return true;
  };

  InputManager.onKeyUp = function (event) {
    InputManager._keys[event.keyCode] = false;
    return true;
  };

  InputManager.onMouseMove = function (event) {
    InputManager._previousMouseX = InputManager._mouseX;
    InputManager._previousMouseY = InputManager._mouseY;
    var rect = event.target.getBoundingClientRect();
    InputManager._mouseX = (event.clientX - Math.round(rect.left)) * (1 / InputManager._resolutionScale.x);
    InputManager._mouseY = (event.clientY - Math.round(rect.top)) * (1 / InputManager._resolutionScale.y);
  };

  InputManager.onMouseDown = function (event) {
    if (event.button === 0) {
      this._letfDown = true;
    } else if (event.button == 2) {
      this._rightDown = true;
    }

    _message.Message.send('MOUSE_DOWN', this, new MouseContext(InputManager._letfDown, InputManager._rightDown, InputManager.getMousePosition()));
  };

  InputManager.onMouseUp = function (event) {
    if (event.button === 0) {
      this._letfDown = false;
    } else if (event.button == 2) {
      this._rightDown = false;
    }

    _message.Message.send('MOUSE_UP', this, new MouseContext(InputManager._letfDown, InputManager._rightDown, InputManager.getMousePosition()));
  };

  InputManager._keys = [];
  InputManager._letfDown = false;
  InputManager._rightDown = false;
  InputManager._resolutionScale = _vector.Vector2.one;
  return InputManager;
}();

exports.InputManager = InputManager;
},{"../math/vector2":"node_modules/xgl/dist/math/vector2.js","../message/message":"node_modules/xgl/dist/message/message.js"}],"node_modules/xgl/dist/behaviors/keyboardMovementBehavior.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyboardMovementBehavior = exports.KeyboardMovementBehaviorBuilder = exports.KeyboardMovementBehaviorData = void 0;

var _baseBehavior = require("./baseBehavior");

var _inputManager = require("../input/inputManager");

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var KeyboardMovementBehaviorData =
/** @class */
function () {
  function KeyboardMovementBehaviorData() {
    this.speed = 0.1;
  }

  KeyboardMovementBehaviorData.prototype.setFromJson = function (json) {
    if (json.name === undefined) {
      throw new Error('Name must be defined in behavior data');
    }

    this.name = String(json.name);

    if (json.speed !== undefined) {
      this.speed = Number(json.speed);
    }
  };

  return KeyboardMovementBehaviorData;
}();

exports.KeyboardMovementBehaviorData = KeyboardMovementBehaviorData;

var KeyboardMovementBehaviorBuilder =
/** @class */
function () {
  function KeyboardMovementBehaviorBuilder() {}

  Object.defineProperty(KeyboardMovementBehaviorBuilder.prototype, "type", {
    get: function () {
      return 'keyboardMovement';
    },
    enumerable: true,
    configurable: true
  });

  KeyboardMovementBehaviorBuilder.prototype.buildFromJson = function (json) {
    var data = new KeyboardMovementBehaviorData();
    data.setFromJson(json);
    return new KeyboardMovementBehavior(data);
  };

  return KeyboardMovementBehaviorBuilder;
}();

exports.KeyboardMovementBehaviorBuilder = KeyboardMovementBehaviorBuilder;

var KeyboardMovementBehavior =
/** @class */
function (_super) {
  __extends(KeyboardMovementBehavior, _super);

  function KeyboardMovementBehavior(data) {
    var _this = _super.call(this, data) || this;

    _this.speed = 0.1;
    _this.speed = data.speed;
    return _this;
  }

  KeyboardMovementBehavior.prototype.update = function (time) {
    if (_inputManager.InputManager.isKeyDown(_inputManager.Keys.LEFT)) {
      this._owner.transform.position.x -= this.speed;
    }

    if (_inputManager.InputManager.isKeyDown(_inputManager.Keys.RIGHT)) {
      this._owner.transform.position.x += this.speed;
    }

    if (_inputManager.InputManager.isKeyDown(_inputManager.Keys.UP)) {
      this._owner.transform.position.y -= this.speed;
    }

    if (_inputManager.InputManager.isKeyDown(_inputManager.Keys.DOWN)) {
      this._owner.transform.position.y += this.speed;
    }

    _super.prototype.update.call(this, time);
  };

  return KeyboardMovementBehavior;
}(_baseBehavior.BaseBehavior);

exports.KeyboardMovementBehavior = KeyboardMovementBehavior;
},{"./baseBehavior":"node_modules/xgl/dist/behaviors/baseBehavior.js","../input/inputManager":"node_modules/xgl/dist/input/inputManager.js"}],"node_modules/xgl/dist/audio/audioManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioManager = exports.SoundEffect = void 0;

var SoundEffect =
/** @class */
function () {
  function SoundEffect(assetPath, loop) {
    this._player = new Audio(assetPath);
    this.loop = loop;
  }

  Object.defineProperty(SoundEffect.prototype, "loop", {
    get: function () {
      return this._player.loop;
    },
    set: function (value) {
      this._player.loop = value;
    },
    enumerable: true,
    configurable: true
  });

  SoundEffect.prototype.destroy = function () {
    this._player = undefined;
  };

  SoundEffect.prototype.play = function () {
    if (!this._player.paused) {
      this.stop();
    }

    this._player.play();
  };

  SoundEffect.prototype.pause = function () {
    this._player.pause();
  };

  SoundEffect.prototype.stop = function () {
    this._player.pause();

    this._player.currentTime = 0;
  };

  return SoundEffect;
}();

exports.SoundEffect = SoundEffect;

var AudioManager =
/** @class */
function () {
  function AudioManager() {}

  AudioManager.loadSoundFile = function (name, assetPath, loop) {
    AudioManager._soundEffects[name] = new SoundEffect(assetPath, loop);
  };

  AudioManager.playSound = function (name) {
    if (this._soundEffects[name] !== undefined) {
      this._soundEffects[name].play();
    }
  };

  AudioManager.stopSound = function (name) {
    if (this._soundEffects[name] !== undefined) {
      this._soundEffects[name].stop();
    }
  };

  AudioManager.stopAll = function (name) {
    for (var sfx in AudioManager._soundEffects) {
      this._soundEffects[sfx].stop();
    }
  };

  AudioManager.pauseSound = function (name) {
    if (this._soundEffects[name] !== undefined) {
      this._soundEffects[name].pause();
    }
  };

  AudioManager.pauseAll = function (name) {
    for (var sfx in AudioManager._soundEffects) {
      this._soundEffects[sfx].pause();
    }
  };

  AudioManager._soundEffects = {};
  return AudioManager;
}();

exports.AudioManager = AudioManager;
},{}],"node_modules/xgl/dist/graphics/shapes2D/circle2D.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Circle2D = void 0;

var _vector = require("../../math/vector2");

var _rectangle2D = require("./rectangle2D");

var Circle2D =
/** @class */
function () {
  function Circle2D() {
    this.position = _vector.Vector2.zero;
    this.origin = _vector.Vector2.zero;
  }

  Object.defineProperty(Circle2D.prototype, "offset", {
    get: function () {
      return new _vector.Vector2(this.radius + this.radius * this.origin.x, this.radius + this.radius * this.origin.y);
    },
    enumerable: true,
    configurable: true
  });

  Circle2D.prototype.setFromJson = function (json) {
    if (json.position !== undefined) {
      this.position.setFromJson(json.position);
    }

    if (json.offset !== undefined) {
      this.offset.setFromJson(json.offset);
    }

    if (json.radius === undefined) {
      throw new Error("Rectangle2D requires radius to be present.");
    }

    this.radius = Number(json.radius);
  };

  Circle2D.prototype.intersects = function (other) {
    if (other instanceof Circle2D) {
      var distance = Math.abs(_vector.Vector2.distance(other.position, this.position));
      var radiusLengths = this.radius + other.radius;

      if (distance <= radiusLengths) {
        return true;
      }
    }

    if (other instanceof _rectangle2D.Rectangle2D) {
      var deltaX = this.position.x - Math.max(other.position.x, Math.min(this.position.x, other.position.x + other.width));
      var deltaY = this.position.y - Math.max(other.position.y, Math.min(this.position.y, other.position.y + other.height));

      if (deltaX * deltaX + deltaY * deltaY < this.radius * this.radius) {
        return true;
      }
    }

    return false;
  };

  Circle2D.prototype.pointInShape = function (point) {
    var absDistance = Math.abs(_vector.Vector2.distance(this.position, point));

    if (absDistance <= this.radius) {
      return true;
    }

    return false;
  };

  return Circle2D;
}();

exports.Circle2D = Circle2D;
},{"../../math/vector2":"node_modules/xgl/dist/math/vector2.js","./rectangle2D":"node_modules/xgl/dist/graphics/shapes2D/rectangle2D.js"}],"node_modules/xgl/dist/graphics/shapes2D/rectangle2D.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rectangle2D = void 0;

var _vector = require("../../math/vector2");

var _circle2D = require("./circle2D");

var Rectangle2D =
/** @class */
function () {
  function Rectangle2D(x, y, width, height) {
    if (x === void 0) {
      x = 0;
    }

    if (y === void 0) {
      y = 0;
    }

    if (width === void 0) {
      width = 0;
    }

    if (height === void 0) {
      height = 0;
    }

    this.position = _vector.Vector2.zero;
    this.origin = _vector.Vector2.zero;
    this.position.x = x;
    this.position.y = y;
    this.width = width;
    this.height = height;
  }

  Object.defineProperty(Rectangle2D.prototype, "offset", {
    get: function () {
      return new _vector.Vector2(this.width * this.origin.x, this.height * this.origin.y);
    },
    enumerable: true,
    configurable: true
  });

  Rectangle2D.prototype.setFromJson = function (json) {
    if (json.position !== undefined) {
      this.position.setFromJson(json.position);
    }

    if (json.offset !== undefined) {
      this.offset.setFromJson(json.offset);
    }

    if (json.width === undefined) {
      throw new Error("Rectangle2D requires width to be present.");
    }

    this.width = Number(json.width);

    if (json.height === undefined) {
      throw new Error("Rectangle2D requires height to be present.");
    }

    this.height = Number(json.height);
  }; // TODO: Add support to rotated shapes


  Rectangle2D.prototype.intersects = function (other) {
    if (other instanceof Rectangle2D) {
      var a = this.getExtents(this);
      var b = this.getExtents(other);
      return a.position.x <= b.width && a.width >= b.position.x && a.position.y <= b.height && a.height >= b.position.y;
    }

    if (other instanceof _circle2D.Circle2D) {
      var deltaX = other.position.x - Math.max(this.position.x, Math.min(other.position.x, this.position.x + this.width));
      var deltaY = other.position.y - Math.max(this.position.y, Math.min(other.position.y, this.position.y + this.height));

      if (deltaX * deltaX + deltaY * deltaY < other.radius * other.radius) {
        return true;
      }
    }

    return false;
  };

  Rectangle2D.prototype.pointInShape = function (point) {
    var x = this.width < 0 ? this.position.x - this.width : this.position.x;
    var y = this.height < 0 ? this.position.y - this.height : this.position.y;
    var extentX = this.width < 0 ? this.position.x : this.position.x + this.width;
    var extentY = this.height < 0 ? this.position.y : this.position.y + this.height;

    if (point.x >= x && point.x <= extentX && point.y >= y && point.y <= extentY) {
      return true;
    }

    return false;
  };

  Rectangle2D.prototype.getExtents = function (shape) {
    var x = shape.width < 0 ? shape.position.x - shape.width : shape.position.x;
    var y = shape.height < 0 ? shape.position.y - shape.height : shape.position.y;
    var extentX = shape.width < 0 ? shape.position.x : shape.position.x + shape.width;
    var extentY = shape.height < 0 ? shape.position.y : shape.position.y + shape.height;
    return new Rectangle2D(x, y, extentX, extentY);
  };

  return Rectangle2D;
}();

exports.Rectangle2D = Rectangle2D;
},{"../../math/vector2":"node_modules/xgl/dist/math/vector2.js","./circle2D":"node_modules/xgl/dist/graphics/shapes2D/circle2D.js"}],"node_modules/xgl/dist/collision/CollisionManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollisionManager = exports.CollisionData = void 0;

var _message = require("../message/message");

var CollisionData =
/** @class */
function () {
  function CollisionData(time, a, b) {
    this.time = time;
    this.a = a;
    this.b = b;
  }

  return CollisionData;
}();

exports.CollisionData = CollisionData;

var CollisionManager =
/** @class */
function () {
  function CollisionManager() {}

  CollisionManager.registerCollisionComponent = function (component) {
    CollisionManager._components.push(component);
  };

  CollisionManager.unRegisterCollisionComponent = function (component) {
    var index = CollisionManager._components.indexOf(component);

    if (index !== -1) {
      CollisionManager._components.slice(index, 1);
    }
  };

  CollisionManager.clear = function () {
    CollisionManager._components.length = 0;
  };

  CollisionManager.update = function (time) {
    CollisionManager._totalTime += time; // TODO: do this properly. Whole function!

    for (var c = 0; c < CollisionManager._components.length; ++c) {
      var comp = CollisionManager._components[c];

      for (var o = 0; o < CollisionManager._components.length; ++o) {
        var other = CollisionManager._components[o]; // Do not check collisions with self

        if (comp === other) {
          continue;
        } // if both shapes are static stop detection


        if (comp.isStatic && other.isStatic) {
          continue;
        }

        if (comp.shape.intersects(other.shape)) {
          // There is a collision
          var exists = false;

          for (var d = 0; d < CollisionManager._collisionData.length; ++d) {
            var data = CollisionManager._collisionData[d];

            if (data.a === comp && data.b === other || data.a === other && data.b === comp) {
              // We have existing data, update it
              // onCollisionUpdate
              comp.onCollisionUpdate(other);
              other.onCollisionUpdate(comp);
              data.time = CollisionManager._totalTime;
              exists = true;
              break;
            }
          }

          if (!exists) {
            // Create a new collision
            // onCollisionEntry
            var col = new CollisionData(CollisionManager._totalTime, comp, other);
            comp.onCollisionEntry(other);
            other.onCollisionEntry(comp);

            _message.Message.sendPriority("COLLISION_ENTRY", undefined, col);

            this._collisionData.push(col);
          }
        }
      }
    } // Collision that not longer exist


    var removeData = [];

    for (var d = 0; d < CollisionManager._collisionData.length; ++d) {
      var data = CollisionManager._collisionData[d];

      if (data.time !== CollisionManager._totalTime) {
        // onCollisionExit
        removeData.push(data);
      }
    }

    while (removeData.length !== 0) {
      var data = removeData.shift();

      var index = CollisionManager._collisionData.indexOf(data);

      CollisionManager._collisionData.splice(index, 1);

      data.a.onCollisionExit(data.b);
      data.b.onCollisionExit(data.a);

      _message.Message.sendPriority("COLLISION_EXIT", undefined, data);
    }
  };

  CollisionManager._totalTime = 0;
  CollisionManager._components = [];
  CollisionManager._collisionData = [];
  return CollisionManager;
}();

exports.CollisionManager = CollisionManager;
},{"../message/message":"node_modules/xgl/dist/message/message.js"}],"node_modules/xgl/dist/components/collisionComponent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollisionComponent = exports.CollisionComponentBuilder = exports.CollisionComponentData = void 0;

var _baseComponent = require("./baseComponent");

var _rectangle2D = require("../graphics/shapes2D/rectangle2D");

var _circle2D = require("../graphics/shapes2D/circle2D");

var _CollisionManager = require("../collision/CollisionManager");

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var CollisionComponentData =
/** @class */
function () {
  function CollisionComponentData() {
    this.static = true;
  }

  CollisionComponentData.prototype.setFromJson = function (json) {
    if (json.name !== undefined) {
      this.name = String(json.name);
    }

    if (json.static !== undefined) {
      this.static = Boolean(json.static);
    }

    if (json.shape === undefined) {
      throw new Error('CollisionComponentData requires shape to be present.');
    }

    if (json.shape.type === undefined) {
      throw new Error('CollisionComponentData requires shape.type to be present.');
    }

    var shapeType = String(json.shape.type).toLowerCase();

    switch (shapeType) {
      case 'rectangle':
        this.shape = new _rectangle2D.Rectangle2D();
        break;

      case 'circle':
        this.shape = new _circle2D.Circle2D();
        break;

      default:
        throw new Error('Unssuported shape type ' + shapeType);
        break;
    }

    this.shape.setFromJson(json.shape);
  };

  return CollisionComponentData;
}();

exports.CollisionComponentData = CollisionComponentData;

var CollisionComponentBuilder =
/** @class */
function () {
  function CollisionComponentBuilder() {}

  Object.defineProperty(CollisionComponentBuilder.prototype, "type", {
    get: function () {
      return 'collision';
    },
    enumerable: true,
    configurable: true
  });

  CollisionComponentBuilder.prototype.buildFromJson = function (json) {
    var data = new CollisionComponentData();
    data.setFromJson(json);
    return new CollisionComponent(data);
  };

  return CollisionComponentBuilder;
}();

exports.CollisionComponentBuilder = CollisionComponentBuilder;

var CollisionComponent =
/** @class */
function (_super) {
  __extends(CollisionComponent, _super);

  function CollisionComponent(data) {
    var _this = _super.call(this, data) || this;

    _this._shape = data.shape;
    _this._static = data.static;
    return _this;
  }

  Object.defineProperty(CollisionComponent.prototype, "shape", {
    get: function () {
      return this._shape;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(CollisionComponent.prototype, "isStatic", {
    get: function () {
      return this._static;
    },
    enumerable: true,
    configurable: true
  });

  CollisionComponent.prototype.load = function () {
    _super.prototype.load.call(this); // TODO: Update this to handle nested objects. Get world position


    this._shape.position.copyFrom(this._owner.getWorldPosition().toVector2().subtract(this._shape.offset)); // Tell the collision manager we exists


    _CollisionManager.CollisionManager.registerCollisionComponent(this);
  };

  CollisionComponent.prototype.update = function (time) {
    // TODO: Update this to handle nested objects. Get world position
    this._shape.position.copyFrom(this._owner.getWorldPosition().toVector2().subtract(this._shape.offset));

    _super.prototype.update.call(this, time);
  };

  CollisionComponent.prototype.render = function (shader) {
    // this._shape.draw(shader, this.owner.worldMatrix); 
    _super.prototype.render.call(this, shader);
  };

  CollisionComponent.prototype.onCollisionEntry = function (other) {
    console.log('onCollisionEntry ', this, other);
  };

  CollisionComponent.prototype.onCollisionUpdate = function (other) {// console.log('onCollisionUpdate ', this, other);
  };

  CollisionComponent.prototype.onCollisionExit = function (other) {
    console.log('onCollisionExit ', this, other);
  };

  return CollisionComponent;
}(_baseComponent.BaseComponent);

exports.CollisionComponent = CollisionComponent;
},{"./baseComponent":"node_modules/xgl/dist/components/baseComponent.js","../graphics/shapes2D/rectangle2D":"node_modules/xgl/dist/graphics/shapes2D/rectangle2D.js","../graphics/shapes2D/circle2D":"node_modules/xgl/dist/graphics/shapes2D/circle2D.js","../collision/CollisionManager":"node_modules/xgl/dist/collision/CollisionManager.js"}],"node_modules/xgl/dist/math/mathExtensions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MathExt = void 0;

var MathExt =
/** @class */
function () {
  function MathExt() {}

  MathExt.clamp = function (value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  };

  MathExt.degToRad = function (degrees) {
    return degrees * Math.PI / 180.0;
  };

  MathExt.radToDeg = function (radians) {
    return radians * 180.0 / Math.PI;
  };

  return MathExt;
}();

exports.MathExt = MathExt;
},{}],"node_modules/xgl/dist/behaviors/PlayerBehavior.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerBehavior = exports.PlayerBehaviorBuilder = exports.PlayerBehaviorData = void 0;

var _baseBehavior = require("./baseBehavior");

var _vector = require("../math/vector2");

var _message = require("../message/message");

var _audioManager = require("../audio/audioManager");

var _mathExtensions = require("../math/mathExtensions");

var _vector2 = require("../math/vector3");

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var PlayerBehaviorData =
/** @class */
function () {
  function PlayerBehaviorData() {
    this.acceleration = new _vector.Vector2(0, 920);
  }

  PlayerBehaviorData.prototype.setFromJson = function (json) {
    if (json.name === undefined) {
      throw new Error('Name must be defined in behavior data');
    }

    this.name = String(json.name);

    if (json.acceleration !== undefined) {
      this.acceleration.setFromJson(json.acceleration);
    }

    if (json.animatedSpriteName === undefined) {
      throw new Error('animatedSpriteName must be defined in behavior data');
    } else {
      this.animatedSpriteName = String(json.animatedSpriteName);
    }

    if (json.playerCollisionComponent === undefined) {
      throw new Error('playerCollisionComponent must be defined in behavior data');
    } else {
      this.playerCollisionComponent = String(json.playerCollisionComponent);
    }

    if (json.groundCollisionComponent === undefined) {
      throw new Error('groundCollisionComponent must be defined in behavior data');
    } else {
      this.groundCollisionComponent = String(json.groundCollisionComponent);
    }

    if (json.scoreCollisionComponent === undefined) {
      throw new Error('scoreCollisionComponent must be defined in behavior data');
    } else {
      this.scoreCollisionComponent = String(json.scoreCollisionComponent);
    }
  };

  return PlayerBehaviorData;
}();

exports.PlayerBehaviorData = PlayerBehaviorData;

var PlayerBehaviorBuilder =
/** @class */
function () {
  function PlayerBehaviorBuilder() {}

  Object.defineProperty(PlayerBehaviorBuilder.prototype, "type", {
    get: function () {
      return 'player';
    },
    enumerable: true,
    configurable: true
  });

  PlayerBehaviorBuilder.prototype.buildFromJson = function (json) {
    var data = new PlayerBehaviorData();
    data.setFromJson(json);
    return new PlayerBehavior(data);
  };

  return PlayerBehaviorBuilder;
}();

exports.PlayerBehaviorBuilder = PlayerBehaviorBuilder;

var PlayerBehavior =
/** @class */
function (_super) {
  __extends(PlayerBehavior, _super);

  function PlayerBehavior(data) {
    var _this = _super.call(this, data) || this;

    _this._velocity = _vector.Vector2.zero;
    _this._isAlive = true;
    _this._isPlaying = false;
    _this._initialPosition = _vector2.Vector3.zero;
    _this._score = 0;
    _this._highScore = 0; // TODO: move this to configuration.

    _this._pipeNames = ["pipe1Collision_end", "pipe1Collision_middle_top", "pipe1Collision_endneg", "pipe1Collision_middle_bottom"];
    _this._acceleration = data.acceleration;
    _this._playerCollisionComponent = data.playerCollisionComponent;
    _this._groundCollisionComponent = data.groundCollisionComponent;
    _this._scoreCollisionComponent = data.scoreCollisionComponent;
    _this._animatedSpriteName = data.animatedSpriteName;

    _message.Message.subscribe("MOUSE_DOWN", _this);

    _message.Message.subscribe("COLLISION_ENTRY", _this);

    _message.Message.subscribe("GAME_READY", _this);

    _message.Message.subscribe("GAME_RESET", _this);

    _message.Message.subscribe("GAME_START", _this);

    _message.Message.subscribe("PLAYER_DIED", _this);

    return _this;
  }

  PlayerBehavior.prototype.updateReady = function () {
    _super.prototype.updateReady.call(this); // Get a reference to the animated sprite


    this._sprite = this._owner.getComponentByName(this._animatedSpriteName);

    if (this._sprite === undefined) {
      throw new Error("AnimatedSpriteComponent named " + this._animatedSpriteName + " is not attaached to the owner of this component");
    } // Make sure the animation plays right away.


    this._sprite.setFrame(0);

    this._initialPosition.copyFrom(this._owner.transform.position);
  };

  PlayerBehavior.prototype.update = function (time) {
    var seconds = time / 1000;

    if (this._isPlaying) {
      this._velocity.add(this._acceleration.clone().scale(seconds));
    } // Limit velocity


    if (this._velocity.y > 400) {
      this._velocity.y = 400;
    } // Prevent Flying too high


    if (this._owner.transform.position.y < -13) {
      this._owner.transform.position.y = -13;
      this._velocity.y = 0;
    }

    this._owner.transform.position.add(this._velocity.clone().scale(seconds).toVector3());

    if (this._velocity.y < 0) {
      this._owner.transform.rotation.z -= _mathExtensions.MathExt.degToRad(600.0) * seconds;

      if (this._owner.transform.rotation.z < _mathExtensions.MathExt.degToRad(-20)) {
        this._owner.transform.rotation.z = _mathExtensions.MathExt.degToRad(-20);
      }
    }

    if (this.isFalling() || !this._isAlive) {
      this._owner.transform.rotation.z += _mathExtensions.MathExt.degToRad(480.0) * seconds;

      if (this._owner.transform.rotation.z > _mathExtensions.MathExt.degToRad(90)) {
        this._owner.transform.rotation.z = _mathExtensions.MathExt.degToRad(90);
      }
    }

    if (this.shouldNotFlap()) {
      this._sprite.stop();
    } else if (!this._sprite.isPlaying) {
      this._sprite.play();
    }

    _super.prototype.update.call(this, time);
  };

  PlayerBehavior.prototype.onMessage = function (message) {
    switch (message.code) {
      case "MOUSE_DOWN":
        this.onFlap();
        break;

      case "COLLISION_ENTRY":
        var data = message.context;

        if (data.a.name !== this._playerCollisionComponent && data.b.name !== this._playerCollisionComponent) {
          return;
        }

        if (data.a.name === this._groundCollisionComponent || data.b.name === this._groundCollisionComponent) {
          this.die();
          this.decelerate();
        } else if (this._pipeNames.indexOf(data.a.name) !== -1 || this._pipeNames.indexOf(data.b.name) !== -1) {
          this.die();
        } else if (data.a.name === this._scoreCollisionComponent || data.b.name === this._scoreCollisionComponent) {
          if (this._isAlive && this._isPlaying) {
            this.setScore(this._score + 1);

            _audioManager.AudioManager.playSound("ting");
          }
        }

        break;
      // Shows the tutorial, click to GAME_START

      case "GAME_RESET":
        _message.Message.send("GAME_HIDE", this);

        _message.Message.send("RESET_HIDE", this);

        _message.Message.send("SPLASH_HIDE", this);

        _message.Message.send("TUTORIAL_SHOW", this);

        this.reset();
        break;
      // Starts the main game.

      case "GAME_START":
        _message.Message.send("GAME_SHOW", this);

        _message.Message.send("RESET_HIDE", this);

        _message.Message.send("SPLASH_HIDE", this);

        _message.Message.send("TUTORIAL_HIDE", this);

        this._isPlaying = true;
        this._isAlive = true;
        this.start();
        break;
      // Zone is loaded, show play button/splash screen

      case "GAME_READY":
        _message.Message.send("RESET_HIDE", this);

        _message.Message.send("TUTORIAL_HIDE", this);

        _message.Message.send("GAME_HIDE", this);

        _message.Message.send("SPLASH_SHOW", this);

        break;
      // Show score and restart button

      case "PLAYER_DIED":
        _message.Message.send("RESET_SHOW", this);

        break;
    }
  };

  PlayerBehavior.prototype.isFalling = function () {
    return this._velocity.y > 220.0;
  };

  PlayerBehavior.prototype.shouldNotFlap = function () {
    return !this._isPlaying || this._velocity.y > 220.0 || !this._isAlive;
  };

  PlayerBehavior.prototype.die = function () {
    if (this._isPlaying && this._isAlive) {
      this._isAlive = false;

      _audioManager.AudioManager.playSound('dead');

      _message.Message.send("PLAYER_DIED", this);
    }
  };

  PlayerBehavior.prototype.reset = function () {
    this._isAlive = true;
    this._isPlaying = false;

    this._sprite.owner.transform.position.copyFrom(this._initialPosition);

    this._sprite.owner.transform.rotation.z = 0;
    this.setScore(0);

    this._velocity.set(0, 0);

    this._acceleration.set(0, 920);

    this._sprite.play();
  };

  PlayerBehavior.prototype.start = function () {
    this._isPlaying = true;

    _message.Message.send("PLAYER_RESET", this);
  };

  PlayerBehavior.prototype.decelerate = function () {
    this._acceleration.y = 0;
    this._velocity.y = 0;
  };

  PlayerBehavior.prototype.onFlap = function () {
    if (this._isAlive && this._isPlaying) {
      this._velocity.y = -280;

      _audioManager.AudioManager.playSound('flap');
    }
  };

  PlayerBehavior.prototype.setScore = function (score) {
    this._score = score;

    _message.Message.send("counterText:SetText", this, this._score);

    _message.Message.send("scoreText:SetText", this, this._score);

    if (this._score > this._highScore) {
      this._highScore = this._score;

      _message.Message.send("bestText:SetText", this, this._highScore);
    }
  };

  return PlayerBehavior;
}(_baseBehavior.BaseBehavior);

exports.PlayerBehavior = PlayerBehavior;
},{"./baseBehavior":"node_modules/xgl/dist/behaviors/baseBehavior.js","../math/vector2":"node_modules/xgl/dist/math/vector2.js","../message/message":"node_modules/xgl/dist/message/message.js","../audio/audioManager":"node_modules/xgl/dist/audio/audioManager.js","../math/mathExtensions":"node_modules/xgl/dist/math/mathExtensions.js","../math/vector3":"node_modules/xgl/dist/math/vector3.js"}],"node_modules/xgl/dist/behaviors/ScrollBehavior.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollBehavior = exports.ScrollBehaviorBuilder = exports.ScrollBehaviorData = void 0;

var _vector = require("../math/vector2");

var _baseBehavior = require("./baseBehavior");

var _message = require("../message/message");

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var ScrollBehaviorData =
/** @class */
function () {
  function ScrollBehaviorData() {
    this.velocity = _vector.Vector2.zero;
    this.minPosition = _vector.Vector2.zero;
    this.resetPosition = _vector.Vector2.zero;
  }

  ScrollBehaviorData.prototype.setFromJson = function (json) {
    if (json.name === undefined) {
      throw new Error("Name must be defined in behavior data.");
    }

    this.name = String(json.name);

    if (json.startMessage !== undefined) {
      this.startMessage = String(json.startMessage);
    }

    if (json.stopMessage !== undefined) {
      this.stopMessage = String(json.stopMessage);
    }

    if (json.resetMessage !== undefined) {
      this.resetMessage = String(json.resetMessage);
    }

    if (json.velocity !== undefined) {
      this.velocity.setFromJson(json.velocity);
    } else {
      throw new Error("ScrollBehaviorData requires property 'velocity' to be defined!");
    }

    if (json.minPosition !== undefined) {
      this.minPosition.setFromJson(json.minPosition);
    } else {
      throw new Error("ScrollBehaviorData requires property 'minPosition' to be defined!");
    }

    if (json.resetPosition !== undefined) {
      this.resetPosition.setFromJson(json.resetPosition);
    } else {
      throw new Error("ScrollBehaviorData requires property 'resetPosition' to be defined!");
    }

    if (json.minResetY !== undefined) {
      this.minResetY = Number(json.minResetY);
    }

    if (json.maxResetY !== undefined) {
      this.maxResetY = Number(json.maxResetY);
    }
  };

  return ScrollBehaviorData;
}();

exports.ScrollBehaviorData = ScrollBehaviorData;

var ScrollBehaviorBuilder =
/** @class */
function () {
  function ScrollBehaviorBuilder() {}

  Object.defineProperty(ScrollBehaviorBuilder.prototype, "type", {
    get: function () {
      return "scroll";
    },
    enumerable: true,
    configurable: true
  });

  ScrollBehaviorBuilder.prototype.buildFromJson = function (json) {
    var data = new ScrollBehaviorData();
    data.setFromJson(json);
    return new ScrollBehavior(data);
  };

  return ScrollBehaviorBuilder;
}();

exports.ScrollBehaviorBuilder = ScrollBehaviorBuilder;

var ScrollBehavior =
/** @class */
function (_super) {
  __extends(ScrollBehavior, _super);

  function ScrollBehavior(data) {
    var _this = _super.call(this, data) || this;

    _this._velocity = _vector.Vector2.zero;
    _this._minPosition = _vector.Vector2.zero;
    _this._resetPosition = _vector.Vector2.zero;
    _this._isScrolling = false;
    _this._initialPosition = _vector.Vector2.zero;

    _this._velocity.copyFrom(data.velocity);

    _this._minPosition.copyFrom(data.minPosition);

    _this._resetPosition.copyFrom(data.resetPosition);

    _this._startMessage = data.startMessage;
    _this._stopMessage = data.stopMessage;
    _this._resetMessage = data.resetMessage;

    if (data.minResetY !== undefined) {
      _this._minResetY = data.minResetY;
    }

    if (data.maxResetY !== undefined) {
      _this._maxResetY = data.maxResetY;
    }

    return _this;
  }

  ScrollBehavior.prototype.updateReady = function () {
    _super.prototype.updateReady.call(this);

    if (this._startMessage !== undefined) {
      _message.Message.subscribe(this._startMessage, this);
    }

    if (this._stopMessage !== undefined) {
      _message.Message.subscribe(this._stopMessage, this);
    }

    if (this._resetMessage !== undefined) {
      _message.Message.subscribe(this._resetMessage, this);
    }

    this._initialPosition.copyFrom(this._owner.transform.position.toVector2());
  };

  ScrollBehavior.prototype.update = function (time) {
    if (this._isScrolling) {
      this._owner.transform.position.add(this._velocity.clone().scale(time / 1000).toVector3());

      var scrollY_1 = this._minResetY !== undefined && this._maxResetY !== undefined;

      if (this._owner.transform.position.x <= this._minPosition.x && (scrollY_1 || !scrollY_1 && this._owner.transform.position.y <= this._minPosition.y)) {
        this.reset();
      }
    }
  };

  ScrollBehavior.prototype.onMessage = function (message) {
    if (message.code === this._startMessage) {
      this._isScrolling = true;
    } else if (message.code === this._stopMessage) {
      this._isScrolling = false;
    } else if (message.code === this._resetMessage) {
      this.initial();
    }
  };

  ScrollBehavior.prototype.reset = function () {
    if (this._minResetY !== undefined && this._maxResetY !== undefined) {
      this._owner.transform.position.set(this._resetPosition.x, this.getRandomY());
    } else {
      this._owner.transform.position.copyFrom(this._resetPosition.toVector3());
    }
  };

  ScrollBehavior.prototype.getRandomY = function () {
    // Inclusive of the min and max set in the data.
    return Math.floor(Math.random() * (this._maxResetY - this._minResetY + 1)) + this._minResetY;
  };

  ScrollBehavior.prototype.initial = function () {
    this._owner.transform.position.copyFrom(this._initialPosition.toVector3());
  };

  return ScrollBehavior;
}(_baseBehavior.BaseBehavior);

exports.ScrollBehavior = ScrollBehavior;
},{"../math/vector2":"node_modules/xgl/dist/math/vector2.js","./baseBehavior":"node_modules/xgl/dist/behaviors/baseBehavior.js","../message/message":"node_modules/xgl/dist/message/message.js"}],"node_modules/xgl/dist/graphics/BitmapFont.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BitmapFont = exports.FontGlyph = void 0;

var _assetManager = require("../assets/assetManager");

var _message = require("../message/message");

var _vector = require("../math/vector2");

var FontUtilities =
/** @class */
function () {
  function FontUtilities() {}

  FontUtilities.extractFieldValue = function (field) {
    return field.split("=")[1];
  };

  return FontUtilities;
}();
/**
 * A single font glyph used for a bitmap font.
 */


var FontGlyph =
/** @class */
function () {
  function FontGlyph() {}
  /**
   * Extracts a glyph from the provided fields.
   * @param fields The fields to extract from.
   */


  FontGlyph.fromFields = function (fields) {
    var glyph = new FontGlyph();
    glyph.id = Number(FontUtilities.extractFieldValue(fields[1]));
    glyph.x = Number(FontUtilities.extractFieldValue(fields[2]));
    glyph.y = Number(FontUtilities.extractFieldValue(fields[3]));
    glyph.width = Number(FontUtilities.extractFieldValue(fields[4]));
    glyph.height = Number(FontUtilities.extractFieldValue(fields[5]));
    glyph.xOffset = Number(FontUtilities.extractFieldValue(fields[6]));
    glyph.yOffset = Number(FontUtilities.extractFieldValue(fields[7]));
    glyph.xAdvance = Number(FontUtilities.extractFieldValue(fields[8]));
    glyph.page = Number(FontUtilities.extractFieldValue(fields[9]));
    glyph.channel = Number(FontUtilities.extractFieldValue(fields[10]));
    return glyph;
  };

  return FontGlyph;
}();

exports.FontGlyph = FontGlyph;

/**
 * A composition of configuration and images which allows text to be drawn to the screen.
 */
var BitmapFont =
/** @class */
function () {
  /**
   * Creates a new bitmap font.
   * @param name The name of the font.
   * @param fontFile The font info file.
   */
  function BitmapFont(name, fontFile) {
    this._assetLoaded = false;
    this._glyphs = {};
    this._name = name;
    this._fontFileName = fontFile;
  }

  Object.defineProperty(BitmapFont.prototype, "name", {
    /** The name of the font. */
    get: function () {
      return this._name;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(BitmapFont.prototype, "size", {
    /** The size of this font. */
    get: function () {
      return this._size;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(BitmapFont.prototype, "imageWidth", {
    /** The width of the image used for this font. */
    get: function () {
      return this._imageWidth;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(BitmapFont.prototype, "imageHeight", {
    /** The height of the image used for this font. */
    get: function () {
      return this._imageHeight;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(BitmapFont.prototype, "textureName", {
    /** The name of the texture image used for this font. */
    get: function () {
      return this._imageFile;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(BitmapFont.prototype, "isLoaded", {
    /** Indicates if this bitmap font is loaded. */
    get: function () {
      return this._assetLoaded;
    },
    enumerable: true,
    configurable: true
  });
  /** Loads this font. */

  BitmapFont.prototype.load = function () {
    var asset = _assetManager.AssetManager.getAsset(this._fontFileName);

    if (asset !== undefined) {
      this.processFontFile(asset.data);
    } else {
      _message.Message.subscribe(_assetManager.MESSAGE_ASSET_LOADER_ASSET_LOADED + this._fontFileName, this);
    }
  };
  /**
   * The message handler.
   */


  BitmapFont.prototype.onMessage = function (message) {
    if (message.code === _assetManager.MESSAGE_ASSET_LOADER_ASSET_LOADED + this._fontFileName) {
      this.processFontFile(message.context.data);
    }
  };
  /**
   * Gets a glyph for the provided character.
   * @param char The character to retrieve a glyph for.
   */


  BitmapFont.prototype.getGlyph = function (char) {
    // Replace unrecognized characters with a '?'.
    var code = char.charCodeAt(0);
    code = this._glyphs[code] === undefined ? 63 : code;
    return this._glyphs[code];
  };
  /**
   * Measures the provided text in the x and y dimensions.
   * @param text The text to be measured.
   */


  BitmapFont.prototype.measureText = function (text) {
    var size = _vector.Vector2.zero;
    var maxX = 0;
    var x = 0;
    var y = 0;

    for (var _i = 0, text_1 = text; _i < text_1.length; _i++) {
      var c = text_1[_i];

      switch (c) {
        case "\n":
          if (x > maxX) {
            maxX = x;
          }

          x = 0;
          y += this._size;
          break;

        default:
          x += this.getGlyph(c).xAdvance;
          break;
      }
    }

    size.set(maxX, y);
    return size;
  };

  BitmapFont.prototype.processFontFile = function (content) {
    var charCount = 0;
    var lines = content.split("\n");

    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
      var line = lines_1[_i]; // Sanitize the line.

      var data = line.replace(/\s\s+/g, ' ');
      var fields = data.split(" "); // Look at the type of line

      switch (fields[0]) {
        case "info":
          this._size = Number(FontUtilities.extractFieldValue(fields[2]));
          break;

        case "common":
          this._imageWidth = Number(FontUtilities.extractFieldValue(fields[3]));
          this._imageHeight = Number(FontUtilities.extractFieldValue(fields[4]));
          break;

        case "page":
          {
            var id = Number(FontUtilities.extractFieldValue(fields[1]));
            this._imageFile = FontUtilities.extractFieldValue(fields[2]); // Strip quotes.

            this._imageFile = this._imageFile.replace(/"/g, ""); // Prepend the path to the image name. TODO: This should be configurable.

            this._imageFile = ("assets/fonts/" + this._imageFile).trim();
          }
          break;

        case "chars":
          charCount = Number(FontUtilities.extractFieldValue(fields[1])); // Increment the expected count, the file's count is off by one.

          charCount++;
          break;

        case "char":
          {
            var glyph = FontGlyph.fromFields(fields);
            this._glyphs[glyph.id] = glyph;
          }
          break;
      }
    } // Verify the loaded glyphs


    var actualGlyphCount = 0; // Only count properties

    var keys = Object.keys(this._glyphs);

    for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
      var key = keys_1[_a];

      if (this._glyphs.hasOwnProperty(key)) {
        actualGlyphCount++;
      }
    }

    if (actualGlyphCount !== charCount) {
      throw new Error("Font file reported existence of " + charCount + " glyphs, but only " + actualGlyphCount + " were found.");
    }

    this._assetLoaded = true;
  };

  return BitmapFont;
}();

exports.BitmapFont = BitmapFont;
},{"../assets/assetManager":"node_modules/xgl/dist/assets/assetManager.js","../message/message":"node_modules/xgl/dist/message/message.js","../math/vector2":"node_modules/xgl/dist/math/vector2.js"}],"node_modules/xgl/dist/graphics/BitmapFontManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BitmapFontManager = void 0;

var _BitmapFont = require("./BitmapFont");

/** Represents the configuration for a bitmap font. These are typically created and stored in a fonts file. */
var BitmapFontConfig =
/** @class */
function () {
  function BitmapFontConfig() {}
  /**
   * Creates a BitmapFontConfig from the provided JSON.
   * @param json The JSON to create from.
   */


  BitmapFontConfig.fromJson = function (json) {
    var config = new BitmapFontConfig();

    if (json.name !== undefined) {
      config.name = String(json.name);
    }

    if (json.fontFile !== undefined) {
      config.fontFile = String(json.fontFile);
    } else {
      throw new Error("Cannot create a bitmap font without a font file.");
    }

    return config;
  };

  return BitmapFontConfig;
}();
/** A manager for bitmap fonts. */


var BitmapFontManager =
/** @class */
function () {
  /** Hide the constructor to prevent instantiation. */
  function BitmapFontManager() {}
  /**
   * The message handler.
   * @param message The message to be handled.
   */
  // public static onMessage(message: Message): void {
  //     // TODO: one for each asset.
  //     if (message.code === MESSAGE_ASSET_LOADER_ASSET_LOADED + "assets/fonts/fonts.json") {
  //         // Message.unsubscribeCallback(MESSAGE_ASSET_LOADER_ASSET_LOADED + "assets/fonts/fonts.json",
  //         //     BitmapFontManager.onMessage);
  //         BitmapFontManager.processFontAsset(message.context as JsonAsset);
  //     }
  // }


  BitmapFontManager.addFont = function (name, fontFile) {
    BitmapFontManager._fonts[name] = new _BitmapFont.BitmapFont(name, fontFile);
  };

  Object.defineProperty(BitmapFontManager, "isLoaded", {
    /** Indicates if this manager is loaded. */
    get: function () {
      if (BitmapFontManager._configLoaded) {
        // If the config is loaded, check that all fonts are loaded.
        var keys = Object.keys(BitmapFontManager._fonts);

        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
          var key = keys_1[_i];

          if (!BitmapFontManager._fonts[key].isLoaded) {
            console.debug("Font " + key + " is still loading...");
            return false;
          }
        }

        console.debug("All fonts are loaded");
        return true;
      }

      return false;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Gets a font by the given name.
   * @param name The name of the font.
   */

  BitmapFontManager.getFont = function (name) {
    if (BitmapFontManager._fonts[name] === undefined) {
      throw new Error("A font named " + name + " does not exist.");
    }

    return BitmapFontManager._fonts[name];
  };
  /**
   * Loads registered fonts.
   */
  // public static load(): void {
  //     // Get the asset(s). TODO: This probably should come from a central asset manifest.
  //     let asset = AssetManager.getAsset("assets/fonts/fonts.json");
  //     if (asset !== undefined) {
  //         BitmapFontManager.processFontAsset(asset as JsonAsset);
  //     } else {
  //         // Listen for the asset load.
  //         // Message.subscribeCallback(MESSAGE_ASSET_LOADER_ASSET_LOADED + "assets/fonts/fonts.json",
  //         //     BitmapFontManager.onMessage);
  //     }
  // }


  BitmapFontManager.load = function () {
    var keys = Object.keys(BitmapFontManager._fonts);

    for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
      var key = keys_2[_i];

      BitmapFontManager._fonts[key].load();
    }
  };

  BitmapFontManager.updateReady = function () {
    var keys = Object.keys(BitmapFontManager._fonts);

    for (var _i = 0, keys_3 = keys; _i < keys_3.length; _i++) {
      var key = keys_3[_i];

      if (!BitmapFontManager._fonts[key].isLoaded) {
        console.debug("Font " + key + " is still loading...");
        return false;
      }
    }

    console.debug("All fonts are loaded...");
    return true;
  };

  BitmapFontManager.processFontAsset = function (asset) {
    var fonts = asset.data.bitmapFonts;

    if (fonts) {
      for (var _i = 0, fonts_1 = fonts; _i < fonts_1.length; _i++) {
        var font = fonts_1[_i];
        var f = BitmapFontConfig.fromJson(font);
        BitmapFontManager._fonts[font.name] = new _BitmapFont.BitmapFont(font.name, font.fontFile); // Start it loading, since all fonts should always be available.

        BitmapFontManager._fonts[font.name].load();
      }
    } // TODO: Should only set this if ALL queued assets have loaded.


    BitmapFontManager._configLoaded = true;
  };

  BitmapFontManager._configLoaded = false;
  BitmapFontManager._fonts = {};
  return BitmapFontManager;
}();

exports.BitmapFontManager = BitmapFontManager;
},{"./BitmapFont":"node_modules/xgl/dist/graphics/BitmapFont.js"}],"node_modules/xgl/dist/graphics/BitmapText.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BitmapText = void 0;

var _vector = require("../math/vector3");

var _glBuffer = require("../gl/glBuffer");

var _material = require("./material");

var _vertex = require("./vertex");

var _BitmapFontManager = require("./BitmapFontManager");

var _color = require("./color");

var _gl = require("../gl/gl");

/**
 * A bitmap text graphics object which is responsible for the underlying rendering
 * of text to the screen.
 */
var BitmapText =
/** @class */
function () {
  /**
   * Creates a new bitmap text graphics object.
   * @param name The name of the text object.
   * @param fontName The name of the font to be used.
   */
  function BitmapText(name, fontName) {
    this._isDirty = false;
    this._origin = _vector.Vector3.zero;
    this._vertices = [];
    this._name = name;
    this._fontName = fontName;
  }

  Object.defineProperty(BitmapText.prototype, "name", {
    /**
     * The name of this object.
     */
    get: function () {
      return this._name;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(BitmapText.prototype, "text", {
    /** Gets the text value of this object. */
    get: function () {
      return this._text;
    },

    /** Sets the text value of this object. */
    set: function (value) {
      if (this._text !== value) {
        this._text = value;
        this._isDirty = true;
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(BitmapText.prototype, "origin", {
    /** Gets the origin for this object. */
    get: function () {
      return this._origin;
    },

    /** Sets the origin for this object. */
    set: function (value) {
      this._origin = value;
      this.calculateVertices();
    },
    enumerable: true,
    configurable: true
  });
  /** Destroys this object. */

  BitmapText.prototype.destroy = function () {
    this._buffer.destroy();

    this._material.destroy();

    this._material = undefined;
  };
  /** Loads this bitmap text object. */


  BitmapText.prototype.load = function () {
    this._bitmapFont = _BitmapFontManager.BitmapFontManager.getFont(this._fontName); // TODO: probably need a simpler shader for UI elements such as this.
    // let shader = ShaderManager.GetShader(BuiltinShader.BASIC);
    // if (shader === undefined) {
    //     throw new Error("Unable to basic builtin shader.");
    // }

    this._material = new _material.Material("BITMAP_FONT_" + this.name + "_" + this._bitmapFont.size,
    /*shader,*/
    this._bitmapFont.textureName, _color.Color.white());
    this._buffer = new _glBuffer.GLBuffer();
    var positionAttribute = new _glBuffer.AttributeInfo();
    positionAttribute.location = 0;
    positionAttribute.size = 3;

    this._buffer.addAttributeLocation(positionAttribute);

    var texCoordAttribute = new _glBuffer.AttributeInfo();
    texCoordAttribute.location = 1;
    texCoordAttribute.size = 2;

    this._buffer.addAttributeLocation(texCoordAttribute);
  };
  /**
   * Updates this object.
   * @param time The amount of time in milliseconds since the last update.
   */


  BitmapText.prototype.update = function (time) {
    if (this._isDirty && this._bitmapFont.isLoaded) {
      this.calculateVertices();
      this._isDirty = false;
    }
  };

  BitmapText.prototype.draw = function (shader, model) {
    var modelLocation = shader.getUniformLocation("u_model");

    _gl.gl.uniformMatrix4fv(modelLocation, false, model.toFloat32Array());

    var colorLocation = shader.getUniformLocation("u_tint");

    _gl.gl.uniform4fv(colorLocation, this._material.tint.toFloat32Array());

    if (this._material.diffuseTexture != undefined) {
      this._material.diffuseTexture.activateAndBind(0);

      var diffuseLocation = shader.getUniformLocation("u_diffuse");

      _gl.gl.uniform1i(diffuseLocation, 0);
    }

    this._buffer.bind();

    this._buffer.draw();
  };

  BitmapText.prototype.calculateVertices = function () {
    this._vertices.length = 0;

    this._buffer.clearData();

    var x = 0;
    var y = 0;

    for (var _i = 0, _a = this._text; _i < _a.length; _i++) {
      var c = _a[_i];

      if (c === "\n") {
        x = 0;
        y += this._bitmapFont.size;
        continue;
      }

      var g = this._bitmapFont.getGlyph(c);

      var minX = x + g.xOffset;
      var minY = y + g.yOffset;
      var maxX = minX + g.width;
      var maxY = minY + g.height;
      var minu = g.x / this._bitmapFont.imageWidth;
      var minv = g.y / this._bitmapFont.imageHeight;
      var maxu = (g.x + g.width) / this._bitmapFont.imageWidth;
      var maxv = (g.y + g.height) / this._bitmapFont.imageHeight;

      this._vertices.push(new _vertex.Vertex(minX, minY, 0, minu, minv));

      this._vertices.push(new _vertex.Vertex(minX, maxY, 0, minu, maxv));

      this._vertices.push(new _vertex.Vertex(maxX, maxY, 0, maxu, maxv));

      this._vertices.push(new _vertex.Vertex(maxX, maxY, 0, maxu, maxv));

      this._vertices.push(new _vertex.Vertex(maxX, minY, 0, maxu, minv));

      this._vertices.push(new _vertex.Vertex(minX, minY, 0, minu, minv));

      x += g.xAdvance;
    }

    for (var _b = 0, _c = this._vertices; _b < _c.length; _b++) {
      var v = _c[_b];

      this._buffer.pushBackData(v.toArray());
    }

    this._buffer.upload();

    this._buffer.unbind();
  };

  return BitmapText;
}();

exports.BitmapText = BitmapText;
},{"../math/vector3":"node_modules/xgl/dist/math/vector3.js","../gl/glBuffer":"node_modules/xgl/dist/gl/glBuffer.js","./material":"node_modules/xgl/dist/graphics/material.js","./vertex":"node_modules/xgl/dist/graphics/vertex.js","./BitmapFontManager":"node_modules/xgl/dist/graphics/BitmapFontManager.js","./color":"node_modules/xgl/dist/graphics/color.js","../gl/gl":"node_modules/xgl/dist/gl/gl.js"}],"node_modules/xgl/dist/components/BitmapTextComponent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BitmapTextComponent = exports.BitmapTextComponentBuilder = exports.BitmapTextComponentData = void 0;

var _vector = require("../math/vector3");

var _baseComponent = require("./baseComponent");

var _BitmapText = require("../graphics/BitmapText");

var _message = require("../message/message");

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var BitmapTextComponentData =
/** @class */
function () {
  function BitmapTextComponentData() {
    this.origin = _vector.Vector3.zero;
  }

  BitmapTextComponentData.prototype.setFromJson = function (json) {
    if (json.name !== undefined) {
      this.name = String(json.name);
    }

    if (json.fontName !== undefined) {
      this.fontName = String(json.fontName);
    }

    if (json.text !== undefined) {
      this.text = String(json.text);
    }

    if (json.origin !== undefined) {
      this.origin.setFromJson(json.origin);
    }
  };

  return BitmapTextComponentData;
}();

exports.BitmapTextComponentData = BitmapTextComponentData;

var BitmapTextComponentBuilder =
/** @class */
function () {
  function BitmapTextComponentBuilder() {}

  Object.defineProperty(BitmapTextComponentBuilder.prototype, "type", {
    get: function () {
      return "bitmapText";
    },
    enumerable: true,
    configurable: true
  });

  BitmapTextComponentBuilder.prototype.buildFromJson = function (json) {
    var data = new BitmapTextComponentData();
    data.setFromJson(json);
    return new BitmapTextComponent(data);
  };

  return BitmapTextComponentBuilder;
}();

exports.BitmapTextComponentBuilder = BitmapTextComponentBuilder;

/**
 * A component which renders bitmap text.
 */
var BitmapTextComponent =
/** @class */
function (_super) {
  __extends(BitmapTextComponent, _super);
  /**
   * Creates a new BitmapTextComponent.
   * @param data The data to use for creation.
   */


  function BitmapTextComponent(data) {
    var _this = _super.call(this, data) || this;

    _this._fontName = data.fontName;
    _this._bitmapText = new _BitmapText.BitmapText(_this.name, _this._fontName);

    if (!data.origin.equals(_vector.Vector3.zero)) {
      _this._bitmapText.origin.copyFrom(data.origin);
    }

    _this._bitmapText.text = data.text; // Listen for text updates.

    _message.Message.subscribe(_this.name + ":SetText", _this);

    return _this;
  }
  /** Loads this component. */


  BitmapTextComponent.prototype.load = function () {
    this._bitmapText.load();
  };
  /**
   * Updates this component.
   * @param time The amount of time in milliseconds since the last update.
   */


  BitmapTextComponent.prototype.update = function (time) {
    this._bitmapText.update(time);
  };
  /**
   * Renders this component.
   * @param shader The shader to use for rendering.
   */


  BitmapTextComponent.prototype.render = function (shader) {
    this._bitmapText.draw(shader, this._owner.worldMatrix);

    _super.prototype.render.call(this, shader);
  };
  /**
   * The message handler.
   * @param message The message to be handled.
   */


  BitmapTextComponent.prototype.onMessage = function (message) {
    if (message.code === this.name + ":SetText") {
      this._bitmapText.text = String(message.context);
    }
  };

  return BitmapTextComponent;
}(_baseComponent.BaseComponent);

exports.BitmapTextComponent = BitmapTextComponent;
},{"../math/vector3":"node_modules/xgl/dist/math/vector3.js","./baseComponent":"node_modules/xgl/dist/components/baseComponent.js","../graphics/BitmapText":"node_modules/xgl/dist/graphics/BitmapText.js","../message/message":"node_modules/xgl/dist/message/message.js"}],"node_modules/xgl/dist/behaviors/MouseClickBehavior.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MouseClickBehavior = exports.MouseClickBehaviorBuilder = exports.MouseClickBehaviorData = void 0;

var _baseBehavior = require("./baseBehavior");

var _message = require("../message/message");

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

/**
 * The data for a mouse click behavior.
 */
var MouseClickBehaviorData =
/** @class */
function () {
  function MouseClickBehaviorData() {}
  /**
   * Sets this data from the provided json.
   * @param json The json to set from.
   */


  MouseClickBehaviorData.prototype.setFromJson = function (json) {
    if (json.name === undefined) {
      throw new Error("Name must be defined in behavior data.");
    }

    this.name = String(json.name);

    if (json.width === undefined) {
      throw new Error("width must be defined in behavior data.");
    } else {
      this.width = Number(json.width);
    }

    if (json.height === undefined) {
      throw new Error("height must be defined in behavior data.");
    } else {
      this.height = Number(json.height);
    }

    if (json.messageCode === undefined) {
      throw new Error("messageCode must be defined in behavior data.");
    } else {
      this.messageCode = String(json.messageCode);
    }
  };

  return MouseClickBehaviorData;
}();

exports.MouseClickBehaviorData = MouseClickBehaviorData;

/**
 * The builder for a MouseClick behavior.
 */
var MouseClickBehaviorBuilder =
/** @class */
function () {
  function MouseClickBehaviorBuilder() {}

  Object.defineProperty(MouseClickBehaviorBuilder.prototype, "type", {
    get: function () {
      return "mouseClick";
    },
    enumerable: true,
    configurable: true
  });

  MouseClickBehaviorBuilder.prototype.buildFromJson = function (json) {
    var data = new MouseClickBehaviorData();
    data.setFromJson(json);
    return new MouseClickBehavior(data);
  };

  return MouseClickBehaviorBuilder;
}();

exports.MouseClickBehaviorBuilder = MouseClickBehaviorBuilder;

/**
 * A behavior which detects clicks within a given width and height, relative to the
 * position of the object to which it is attached. When clicked, a message with the
 * configured message code is sent.
 */
var MouseClickBehavior =
/** @class */
function (_super) {
  __extends(MouseClickBehavior, _super);
  /**
   * Creates a new MouseClickBehavior.
   * @param data The data for this behavior.
   */


  function MouseClickBehavior(data) {
    var _this = _super.call(this, data) || this;

    _this._width = data.width;
    _this._height = data.height;
    _this._messageCode = data.messageCode;

    _message.Message.subscribe("MOUSE_UP", _this);

    return _this;
  }
  /**
   * The message handler.
   * @param message The message to be handled.
   */


  MouseClickBehavior.prototype.onMessage = function (message) {
    if (message.code === "MOUSE_UP") {
      if (!this._owner.isVisible) {
        return;
      }

      var context = message.context;

      var worldPos = this._owner.getWorldPosition();

      var extentsX = worldPos.x + this._width;
      var extentsY = worldPos.y + this._height;

      if (context.position.x >= worldPos.x && context.position.x <= extentsX && context.position.y >= worldPos.y && context.position.y <= extentsY) {
        // Send the c onfigured message. 
        _message.Message.send(this._messageCode, this);
      }
    }
  };

  return MouseClickBehavior;
}(_baseBehavior.BaseBehavior);

exports.MouseClickBehavior = MouseClickBehavior;
},{"./baseBehavior":"node_modules/xgl/dist/behaviors/baseBehavior.js","../message/message":"node_modules/xgl/dist/message/message.js"}],"node_modules/xgl/dist/behaviors/VisibilityOnMessageBehavior.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisibilityOnMessageBehavior = exports.VisibilityOnMessageBehaviorBuilder = exports.VisibilityOnMessageBehaviorData = void 0;

var _baseBehavior = require("./baseBehavior");

var _message = require("../message/message");

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var VisibilityOnMessageBehaviorData =
/** @class */
function () {
  function VisibilityOnMessageBehaviorData() {}

  VisibilityOnMessageBehaviorData.prototype.setFromJson = function (json) {
    if (json.messageCode === undefined) {
      throw new Error("VisibilityOnMessageBehaviorData requires 'messageCode' to be defined.");
    } else {
      this.messageCode = String(json.messageCode);
    }

    if (json.visible === undefined) {
      throw new Error("VisibilityOnMessageBehaviorData requires 'visible' to be defined.");
    } else {
      this.visible = Boolean(json.visible);
    }
  };

  return VisibilityOnMessageBehaviorData;
}();

exports.VisibilityOnMessageBehaviorData = VisibilityOnMessageBehaviorData;

var VisibilityOnMessageBehaviorBuilder =
/** @class */
function () {
  function VisibilityOnMessageBehaviorBuilder() {}

  Object.defineProperty(VisibilityOnMessageBehaviorBuilder.prototype, "type", {
    get: function () {
      return "visibilityOnMessage";
    },
    enumerable: true,
    configurable: true
  });

  VisibilityOnMessageBehaviorBuilder.prototype.buildFromJson = function (json) {
    var data = new VisibilityOnMessageBehaviorData();
    data.setFromJson(json);
    return new VisibilityOnMessageBehavior(data);
  };

  return VisibilityOnMessageBehaviorBuilder;
}();

exports.VisibilityOnMessageBehaviorBuilder = VisibilityOnMessageBehaviorBuilder;

/**
 * A behavior which enables or disables visibility when the configured message is recieved.
 */
var VisibilityOnMessageBehavior =
/** @class */
function (_super) {
  __extends(VisibilityOnMessageBehavior, _super);
  /**
   * Creates a new VisibilityOnMessageBehavior.
   * @param data The data for this behavior.
   */


  function VisibilityOnMessageBehavior(data) {
    var _this = _super.call(this, data) || this;

    _this._messageCode = data.messageCode;
    _this._visible = data.visible;

    _message.Message.subscribe(_this._messageCode, _this);

    return _this;
  }
  /**
   * The message handler.
   * @param message The message to be handled.
   */


  VisibilityOnMessageBehavior.prototype.onMessage = function (message) {
    if (message.code === this._messageCode) {
      this._owner.isVisible = this._visible;
    }
  };

  return VisibilityOnMessageBehavior;
}(_baseBehavior.BaseBehavior);

exports.VisibilityOnMessageBehavior = VisibilityOnMessageBehavior;
},{"./baseBehavior":"node_modules/xgl/dist/behaviors/baseBehavior.js","../message/message":"node_modules/xgl/dist/message/message.js"}],"node_modules/xgl/dist/xgl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XGLEngine = void 0;

var _glMatrix = require("gl-matrix");

var _gl = require("./gl/gl");

var _basicShader = require("./gl/shaders/basicShader");

var _spriteComponent = require("./components/spriteComponent");

var _animatedSpriteComponent = require("./components/animatedSpriteComponent");

var _assetManager = require("./assets/assetManager");

var _messageBus = require("./message/messageBus");

var _materialManager = require("./graphics/materialManager");

var _material = require("./graphics/material");

var _color = require("./graphics/color");

var _zoneManager = require("./world/zoneManager");

var _componentManager = require("./components/componentManager");

var _behaviorManager = require("./behaviors/behaviorManager");

var _rotationBehavior = require("./behaviors/rotationBehavior");

var _keyboardMovementBehavior = require("./behaviors/keyboardMovementBehavior");

var _inputManager = require("./input/inputManager");

var _audioManager = require("./audio/audioManager");

var _collisionComponent = require("./components/collisionComponent");

var _CollisionManager = require("./collision/CollisionManager");

var _PlayerBehavior = require("./behaviors/PlayerBehavior");

var _ScrollBehavior = require("./behaviors/ScrollBehavior");

var _BitmapFontManager = require("./graphics/BitmapFontManager");

var _BitmapTextComponent = require("./components/BitmapTextComponent");

var _MouseClickBehavior = require("./behaviors/MouseClickBehavior");

var _VisibilityOnMessageBehavior = require("./behaviors/VisibilityOnMessageBehavior");

var _matrix4x = require("./math/matrix4x4");

var _vector = require("./math/vector2");

var XGLEngine =
/** @class */
function () {
  function XGLEngine(width, height) {
    this._previousTime = 0;
    this._isFirstUpdate = true;
    if (width) this._gameWidth = width;
    if (height) this._gameHeight = height;
  }

  XGLEngine.prototype.start = function (elementName) {
    this._canvas = _gl.GLUtilities.init(elementName);

    if (this._gameWidth !== undefined && this._gameHeight !== undefined) {
      this._aspect = this._gameWidth / this._gameHeight;
    }

    _componentManager.ComponentManager.registerBuilder(new _spriteComponent.SpriteComponentBuilder());

    _componentManager.ComponentManager.registerBuilder(new _animatedSpriteComponent.AnimatedSpriteComponentBuilder());

    _componentManager.ComponentManager.registerBuilder(new _collisionComponent.CollisionComponentBuilder());

    _componentManager.ComponentManager.registerBuilder(new _BitmapTextComponent.BitmapTextComponentBuilder());

    _behaviorManager.BehaviorManager.registerBuilder(new _rotationBehavior.RotationBehaviorBuilder());

    _behaviorManager.BehaviorManager.registerBuilder(new _keyboardMovementBehavior.KeyboardMovementBehaviorBuilder());

    _behaviorManager.BehaviorManager.registerBuilder(new _PlayerBehavior.PlayerBehaviorBuilder());

    _behaviorManager.BehaviorManager.registerBuilder(new _ScrollBehavior.ScrollBehaviorBuilder());

    _behaviorManager.BehaviorManager.registerBuilder(new _MouseClickBehavior.MouseClickBehaviorBuilder());

    _behaviorManager.BehaviorManager.registerBuilder(new _VisibilityOnMessageBehavior.VisibilityOnMessageBehaviorBuilder());

    _assetManager.AssetManager.initialize();

    _inputManager.InputManager.initialize(this._canvas);

    _zoneManager.ZoneManager.initialize();

    this._basicShader = new _basicShader.BasicShader();

    this._basicShader.use();

    _BitmapFontManager.BitmapFontManager.addFont("default", "assets/fonts/text.txt");

    _BitmapFontManager.BitmapFontManager.load(); // TODO: This should not be here. This is part of the game


    _materialManager.MaterialManager.registerMaterial(new _material.Material('bg', 'assets/textures/bg.png', new _color.Color(255, 255, 255, 255)));

    _materialManager.MaterialManager.registerMaterial(new _material.Material('end', 'assets/textures/end.png', new _color.Color(255, 255, 255, 255)));

    _materialManager.MaterialManager.registerMaterial(new _material.Material('middle', 'assets/textures/middle.png', new _color.Color(255, 255, 255, 255)));

    _materialManager.MaterialManager.registerMaterial(new _material.Material('grass', 'assets/textures/grass.png', new _color.Color(255, 255, 255, 255)));

    _materialManager.MaterialManager.registerMaterial(new _material.Material('duck', 'assets/textures/duck.png', new _color.Color(255, 255, 255, 255)));

    _materialManager.MaterialManager.registerMaterial(new _material.Material('playbtn', 'assets/textures/playbtn.png', new _color.Color(255, 255, 255, 255)));

    _materialManager.MaterialManager.registerMaterial(new _material.Material('restartbtn', 'assets/textures/restartbtn.png', new _color.Color(255, 255, 255, 255)));

    _materialManager.MaterialManager.registerMaterial(new _material.Material('score', 'assets/textures/score.png', new _color.Color(255, 255, 255, 255)));

    _materialManager.MaterialManager.registerMaterial(new _material.Material('title', 'assets/textures/title.png', new _color.Color(255, 255, 255, 255)));

    _materialManager.MaterialManager.registerMaterial(new _material.Material('tutorial', 'assets/textures/tutorial.png', new _color.Color(255, 255, 255, 255)));

    _audioManager.AudioManager.loadSoundFile('flap', 'assets/sounds/flap.mp3', false);

    _audioManager.AudioManager.loadSoundFile('ting', 'assets/sounds/ting.mp3', false);

    _audioManager.AudioManager.loadSoundFile('dead', 'assets/sounds/dead.mp3', false);

    this._projection = _matrix4x.Matrix4x4.orthographic(0, this._canvas.width, this._canvas.height, 0, -100.0, 100.0);
    this.resize(); // Begin preloading phase waiting for all assets to be loaded before starting the game

    this.preloading();
  };
  /**
   * Resizes to fit the window.
   */


  XGLEngine.prototype.resize = function () {
    if (this._canvas !== undefined) {
      if (this._gameWidth === undefined || this._gameHeight === undefined) {
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;

        _gl.gl.viewport(0, 0, window.innerWidth, window.innerHeight);

        this._projection = _matrix4x.Matrix4x4.orthographic(0, window.innerWidth, window.innerHeight, 0, -100.0, 100.0);
      } else {
        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;
        var newWidthToHeight = newWidth / newHeight;
        var gameArea = document.getElementById("gameArea");

        if (newWidthToHeight > this._aspect) {
          newWidth = newHeight * this._aspect;
        } else {
          newHeight = newWidth * this._aspect;
        }

        gameArea.style.width = newWidth + 'px';
        gameArea.style.height = newHeight + 'px';
        gameArea.style.marginTop = -newHeight / 2 + 'px';
        gameArea.style.marginLeft = -newWidth / 2 + 'px';
        this._canvas.width = newWidth;
        this._canvas.height = newHeight;

        _gl.gl.viewport(0, 0, newWidth, newHeight);

        this._projection = _matrix4x.Matrix4x4.orthographic(0, this._gameWidth, this._gameHeight, 0, -100.0, 100.0);
        var resolutionScale = new _vector.Vector2(newWidth / this._gameWidth, newHeight / this._gameHeight);

        _inputManager.InputManager.setResolutionScale(resolutionScale);
      }
    }
  };

  XGLEngine.prototype.onMessage = function (message) {
    if (message.code === 'MOUSE_UP') {
      var context = message.context;
      document.title = "Pos: [" + context.position.x + "], [" + context.position.y + "]";
    }
  };

  XGLEngine.prototype.loop = function () {
    if (this._isFirstUpdate) {}

    this.update();
    this.render();
    requestAnimationFrame(this.loop.bind(this));
  };

  XGLEngine.prototype.preloading = function () {
    // Make sure we always update message bus
    _messageBus.MessageBus.update(0);

    if (!_BitmapFontManager.BitmapFontManager.updateReady()) {
      requestAnimationFrame(this.preloading.bind(this));
      return;
    } // Load up Zone. Make this configurable


    _zoneManager.ZoneManager.changeZone(0);

    this.loop();
  };

  XGLEngine.prototype.update = function () {
    var delta = performance.now() - this._previousTime;

    _messageBus.MessageBus.update(delta);

    _zoneManager.ZoneManager.update(delta);

    _CollisionManager.CollisionManager.update(delta);

    this._previousTime = performance.now();
  };

  XGLEngine.prototype.render = function () {
    _gl.GLUtilities.clearFrame();

    _zoneManager.ZoneManager.render(this._basicShader);

    var projectionPosition = this._basicShader.getUniformLocation('u_projection');

    _gl.gl.uniformMatrix4fv(projectionPosition, false, this._projection.toFloat32Array());
  };

  XGLEngine.prototype.createProjection = function () {
    var m = _glMatrix.mat4.create();

    return _glMatrix.mat4.ortho(m, 0, this._canvas.width, this._canvas.height, 0, -100.0, 100.0);
  };

  return XGLEngine;
}();

exports.XGLEngine = XGLEngine;
},{"gl-matrix":"node_modules/xgl/node_modules/gl-matrix/esm/index.js","./gl/gl":"node_modules/xgl/dist/gl/gl.js","./gl/shaders/basicShader":"node_modules/xgl/dist/gl/shaders/basicShader.js","./components/spriteComponent":"node_modules/xgl/dist/components/spriteComponent.js","./components/animatedSpriteComponent":"node_modules/xgl/dist/components/animatedSpriteComponent.js","./assets/assetManager":"node_modules/xgl/dist/assets/assetManager.js","./message/messageBus":"node_modules/xgl/dist/message/messageBus.js","./graphics/materialManager":"node_modules/xgl/dist/graphics/materialManager.js","./graphics/material":"node_modules/xgl/dist/graphics/material.js","./graphics/color":"node_modules/xgl/dist/graphics/color.js","./world/zoneManager":"node_modules/xgl/dist/world/zoneManager.js","./components/componentManager":"node_modules/xgl/dist/components/componentManager.js","./behaviors/behaviorManager":"node_modules/xgl/dist/behaviors/behaviorManager.js","./behaviors/rotationBehavior":"node_modules/xgl/dist/behaviors/rotationBehavior.js","./behaviors/keyboardMovementBehavior":"node_modules/xgl/dist/behaviors/keyboardMovementBehavior.js","./input/inputManager":"node_modules/xgl/dist/input/inputManager.js","./audio/audioManager":"node_modules/xgl/dist/audio/audioManager.js","./components/collisionComponent":"node_modules/xgl/dist/components/collisionComponent.js","./collision/CollisionManager":"node_modules/xgl/dist/collision/CollisionManager.js","./behaviors/PlayerBehavior":"node_modules/xgl/dist/behaviors/PlayerBehavior.js","./behaviors/ScrollBehavior":"node_modules/xgl/dist/behaviors/ScrollBehavior.js","./graphics/BitmapFontManager":"node_modules/xgl/dist/graphics/BitmapFontManager.js","./components/BitmapTextComponent":"node_modules/xgl/dist/components/BitmapTextComponent.js","./behaviors/MouseClickBehavior":"node_modules/xgl/dist/behaviors/MouseClickBehavior.js","./behaviors/VisibilityOnMessageBehavior":"node_modules/xgl/dist/behaviors/VisibilityOnMessageBehavior.js","./math/matrix4x4":"node_modules/xgl/dist/math/matrix4x4.js","./math/vector2":"node_modules/xgl/dist/math/vector2.js"}],"src/main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var xgl_1 = require("xgl");

var Island;

(function (Island) {
  var xgl;

  window.onload = function () {
    xgl = new xgl_1.XGLEngine(320, 480);
    xgl.start("viewport");
  };

  window.onresize = function () {
    xgl && xgl.resize();
  };
})(Island || (Island = {}));
},{"xgl":"node_modules/xgl/dist/xgl.js"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49487" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.ts"], null)
//# sourceMappingURL=/main.b0a109ad.js.map