/*!
 * jQuery JavaScript Library v3.1.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2016-09-22T22:30Z
 */
;( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.1.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			resolve.call( undefined, value );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.call( undefined, value );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && jQuery.nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

function manipulationTarget( elem, content ) {
	if ( jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE <=9 only
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var val,
		valueIsBorderBox = true,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE <=11 only
	// Running getBoundingClientRect on a disconnected node
	// in IE throws an error.
	if ( elem.getClientRects().length ) {
		val = elem.getBoundingClientRect()[ name ];
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function raf() {
	if ( timerId ) {
		window.requestAnimationFrame( raf );
		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off or if document is hidden
	if ( jQuery.fx.off || document.hidden ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.requestAnimationFrame ?
			window.requestAnimationFrame( raf ) :
			window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	if ( window.cancelAnimationFrame ) {
		window.cancelAnimationFrame( timerId );
	} else {
		window.clearInterval( timerId );
	}

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( jQuery.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win, rect, doc,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		// Make sure element is not hidden (display: none)
		if ( rect.width || rect.height ) {
			doc = elem.ownerDocument;
			win = getWindow( doc );
			docElem = doc.documentElement;

			return {
				top: rect.top + win.pageYOffset - docElem.clientTop,
				left: rect.left + win.pageXOffset - docElem.clientLeft
			};
		}

		// Return zeros for disconnected and hidden elements (gh-2310)
		return rect;
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.parseJSON = JSON.parse;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}





return jQuery;
} );
/*!
 * jQuery Validation Plugin v1.16.0
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2016 Jörn Zaefferer
 * Released under the MIT license
 */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery"], factory );
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory( require( "jquery" ) );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

$.extend( $.fn, {

	// http://jqueryvalidation.org/validate/
	validate: function( options ) {

		// If nothing is selected, return nothing; can't chain anyway
		if ( !this.length ) {
			if ( options && options.debug && window.console ) {
				console.warn( "Nothing selected, can't validate, returning nothing." );
			}
			return;
		}

		// Check if a validator for this form was already created
		var validator = $.data( this[ 0 ], "validator" );
		if ( validator ) {
			return validator;
		}

		// Add novalidate tag if HTML5.
		this.attr( "novalidate", "novalidate" );

		validator = new $.validator( options, this[ 0 ] );
		$.data( this[ 0 ], "validator", validator );

		if ( validator.settings.onsubmit ) {

			this.on( "click.validate", ":submit", function( event ) {
				if ( validator.settings.submitHandler ) {
					validator.submitButton = event.target;
				}

				// Allow suppressing validation by adding a cancel class to the submit button
				if ( $( this ).hasClass( "cancel" ) ) {
					validator.cancelSubmit = true;
				}

				// Allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
				if ( $( this ).attr( "formnovalidate" ) !== undefined ) {
					validator.cancelSubmit = true;
				}
			} );

			// Validate the form on submit
			this.on( "submit.validate", function( event ) {
				if ( validator.settings.debug ) {

					// Prevent form submit to be able to see console output
					event.preventDefault();
				}
				function handle() {
					var hidden, result;
					if ( validator.settings.submitHandler ) {
						if ( validator.submitButton ) {

							// Insert a hidden input as a replacement for the missing submit button
							hidden = $( "<input type='hidden'/>" )
								.attr( "name", validator.submitButton.name )
								.val( $( validator.submitButton ).val() )
								.appendTo( validator.currentForm );
						}
						result = validator.settings.submitHandler.call( validator, validator.currentForm, event );
						if ( validator.submitButton ) {

							// And clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						if ( result !== undefined ) {
							return result;
						}
						return false;
					}
					return true;
				}

				// Prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			} );
		}

		return validator;
	},

	// http://jqueryvalidation.org/valid/
	valid: function() {
		var valid, validator, errorList;

		if ( $( this[ 0 ] ).is( "form" ) ) {
			valid = this.validate().form();
		} else {
			errorList = [];
			valid = true;
			validator = $( this[ 0 ].form ).validate();
			this.each( function() {
				valid = validator.element( this ) && valid;
				if ( !valid ) {
					errorList = errorList.concat( validator.errorList );
				}
			} );
			validator.errorList = errorList;
		}
		return valid;
	},

	// http://jqueryvalidation.org/rules/
	rules: function( command, argument ) {
		var element = this[ 0 ],
			settings, staticRules, existingRules, data, param, filtered;

		// If nothing is selected, return empty object; can't chain anyway
		if ( element == null || element.form == null ) {
			return;
		}

		if ( command ) {
			settings = $.data( element.form, "validator" ).settings;
			staticRules = settings.rules;
			existingRules = $.validator.staticRules( element );
			switch ( command ) {
			case "add":
				$.extend( existingRules, $.validator.normalizeRule( argument ) );

				// Remove messages from rules, but allow them to be set separately
				delete existingRules.messages;
				staticRules[ element.name ] = existingRules;
				if ( argument.messages ) {
					settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
				}
				break;
			case "remove":
				if ( !argument ) {
					delete staticRules[ element.name ];
					return existingRules;
				}
				filtered = {};
				$.each( argument.split( /\s/ ), function( index, method ) {
					filtered[ method ] = existingRules[ method ];
					delete existingRules[ method ];
					if ( method === "required" ) {
						$( element ).removeAttr( "aria-required" );
					}
				} );
				return filtered;
			}
		}

		data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.classRules( element ),
			$.validator.attributeRules( element ),
			$.validator.dataRules( element ),
			$.validator.staticRules( element )
		), element );

		// Make sure required is at front
		if ( data.required ) {
			param = data.required;
			delete data.required;
			data = $.extend( { required: param }, data );
			$( element ).attr( "aria-required", "true" );
		}

		// Make sure remote is at back
		if ( data.remote ) {
			param = data.remote;
			delete data.remote;
			data = $.extend( data, { remote: param } );
		}

		return data;
	}
} );

// Custom selectors
$.extend( $.expr.pseudos || $.expr[ ":" ], {		// '|| $.expr[ ":" ]' here enables backwards compatibility to jQuery 1.7. Can be removed when dropping jQ 1.7.x support

	// http://jqueryvalidation.org/blank-selector/
	blank: function( a ) {
		return !$.trim( "" + $( a ).val() );
	},

	// http://jqueryvalidation.org/filled-selector/
	filled: function( a ) {
		var val = $( a ).val();
		return val !== null && !!$.trim( "" + val );
	},

	// http://jqueryvalidation.org/unchecked-selector/
	unchecked: function( a ) {
		return !$( a ).prop( "checked" );
	}
} );

// Constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

// http://jqueryvalidation.org/jQuery.validator.format/
$.validator.format = function( source, params ) {
	if ( arguments.length === 1 ) {
		return function() {
			var args = $.makeArray( arguments );
			args.unshift( source );
			return $.validator.format.apply( this, args );
		};
	}
	if ( params === undefined ) {
		return source;
	}
	if ( arguments.length > 2 && params.constructor !== Array  ) {
		params = $.makeArray( arguments ).slice( 1 );
	}
	if ( params.constructor !== Array ) {
		params = [ params ];
	}
	$.each( params, function( i, n ) {
		source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
			return n;
		} );
	} );
	return source;
};

$.extend( $.validator, {

	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		pendingClass: "pending",
		validClass: "valid",
		errorElement: "label",
		focusCleanup: false,
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: ":hidden",
		ignoreTitle: false,
		onfocusin: function( element ) {
			this.lastActive = element;

			// Hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup ) {
				if ( this.settings.unhighlight ) {
					this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				}
				this.hideThese( this.errorsFor( element ) );
			}
		},
		onfocusout: function( element ) {
			if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
				this.element( element );
			}
		},
		onkeyup: function( element, event ) {

			// Avoid revalidate the field when pressing one of the following keys
			// Shift       => 16
			// Ctrl        => 17
			// Alt         => 18
			// Caps lock   => 20
			// End         => 35
			// Home        => 36
			// Left arrow  => 37
			// Up arrow    => 38
			// Right arrow => 39
			// Down arrow  => 40
			// Insert      => 45
			// Num lock    => 144
			// AltGr key   => 225
			var excludedKeys = [
				16, 17, 18, 20, 35, 36, 37,
				38, 39, 40, 45, 144, 225
			];

			if ( event.which === 9 && this.elementValue( element ) === "" || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
				return;
			} else if ( element.name in this.submitted || element.name in this.invalid ) {
				this.element( element );
			}
		},
		onclick: function( element ) {

			// Click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted ) {
				this.element( element );

			// Or option elements, check parent select in that case
			} else if ( element.parentNode.name in this.submitted ) {
				this.element( element.parentNode );
			}
		},
		highlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
			} else {
				$( element ).addClass( errorClass ).removeClass( validClass );
			}
		},
		unhighlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
			} else {
				$( element ).removeClass( errorClass ).addClass( validClass );
			}
		}
	},

	// http://jqueryvalidation.org/jQuery.validator.setDefaults/
	setDefaults: function( settings ) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		equalTo: "Please enter the same value again.",
		maxlength: $.validator.format( "Please enter no more than {0} characters." ),
		minlength: $.validator.format( "Please enter at least {0} characters." ),
		rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
		range: $.validator.format( "Please enter a value between {0} and {1}." ),
		max: $.validator.format( "Please enter a value less than or equal to {0}." ),
		min: $.validator.format( "Please enter a value greater than or equal to {0}." ),
		step: $.validator.format( "Please enter a multiple of {0}." )
	},

	autoCreateRanges: false,

	prototype: {

		init: function() {
			this.labelContainer = $( this.settings.errorLabelContainer );
			this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
			this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();

			var groups = ( this.groups = {} ),
				rules;
			$.each( this.settings.groups, function( key, value ) {
				if ( typeof value === "string" ) {
					value = value.split( /\s/ );
				}
				$.each( value, function( index, name ) {
					groups[ name ] = key;
				} );
			} );
			rules = this.settings.rules;
			$.each( rules, function( key, value ) {
				rules[ key ] = $.validator.normalizeRule( value );
			} );

			function delegate( event ) {

				// Set form expando on contenteditable
				if ( !this.form && this.hasAttribute( "contenteditable" ) ) {
					this.form = $( this ).closest( "form" )[ 0 ];
				}

				var validator = $.data( this.form, "validator" ),
					eventType = "on" + event.type.replace( /^validate/, "" ),
					settings = validator.settings;
				if ( settings[ eventType ] && !$( this ).is( settings.ignore ) ) {
					settings[ eventType ].call( validator, this, event );
				}
			}

			$( this.currentForm )
				.on( "focusin.validate focusout.validate keyup.validate",
					":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
					"[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
					"[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
					"[type='radio'], [type='checkbox'], [contenteditable], [type='button']", delegate )

				// Support: Chrome, oldIE
				// "select" is provided as event.target when clicking a option
				.on( "click.validate", "select, option, [type='radio'], [type='checkbox']", delegate );

			if ( this.settings.invalidHandler ) {
				$( this.currentForm ).on( "invalid-form.validate", this.settings.invalidHandler );
			}

			// Add aria-required to any Static/Data/Class required fields before first validation
			// Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
			$( this.currentForm ).find( "[required], [data-rule-required], .required" ).attr( "aria-required", "true" );
		},

		// http://jqueryvalidation.org/Validator.form/
		form: function() {
			this.checkForm();
			$.extend( this.submitted, this.errorMap );
			this.invalid = $.extend( {}, this.errorMap );
			if ( !this.valid() ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
			}
			this.showErrors();
			return this.valid();
		},

		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
				this.check( elements[ i ] );
			}
			return this.valid();
		},

		// http://jqueryvalidation.org/Validator.element/
		element: function( element ) {
			var cleanElement = this.clean( element ),
				checkElement = this.validationTargetFor( cleanElement ),
				v = this,
				result = true,
				rs, group;

			if ( checkElement === undefined ) {
				delete this.invalid[ cleanElement.name ];
			} else {
				this.prepareElement( checkElement );
				this.currentElements = $( checkElement );

				// If this element is grouped, then validate all group elements already
				// containing a value
				group = this.groups[ checkElement.name ];
				if ( group ) {
					$.each( this.groups, function( name, testgroup ) {
						if ( testgroup === group && name !== checkElement.name ) {
							cleanElement = v.validationTargetFor( v.clean( v.findByName( name ) ) );
							if ( cleanElement && cleanElement.name in v.invalid ) {
								v.currentElements.push( cleanElement );
								result = v.check( cleanElement ) && result;
							}
						}
					} );
				}

				rs = this.check( checkElement ) !== false;
				result = result && rs;
				if ( rs ) {
					this.invalid[ checkElement.name ] = false;
				} else {
					this.invalid[ checkElement.name ] = true;
				}

				if ( !this.numberOfInvalids() ) {

					// Hide error containers on last error
					this.toHide = this.toHide.add( this.containers );
				}
				this.showErrors();

				// Add aria-invalid status for screen readers
				$( element ).attr( "aria-invalid", !rs );
			}

			return result;
		},

		// http://jqueryvalidation.org/Validator.showErrors/
		showErrors: function( errors ) {
			if ( errors ) {
				var validator = this;

				// Add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = $.map( this.errorMap, function( message, name ) {
					return {
						message: message,
						element: validator.findByName( name )[ 0 ]
					};
				} );

				// Remove items from success list
				this.successList = $.grep( this.successList, function( element ) {
					return !( element.name in errors );
				} );
			}
			if ( this.settings.showErrors ) {
				this.settings.showErrors.call( this, this.errorMap, this.errorList );
			} else {
				this.defaultShowErrors();
			}
		},

		// http://jqueryvalidation.org/Validator.resetForm/
		resetForm: function() {
			if ( $.fn.resetForm ) {
				$( this.currentForm ).resetForm();
			}
			this.invalid = {};
			this.submitted = {};
			this.prepareForm();
			this.hideErrors();
			var elements = this.elements()
				.removeData( "previousValue" )
				.removeAttr( "aria-invalid" );

			this.resetElements( elements );
		},

		resetElements: function( elements ) {
			var i;

			if ( this.settings.unhighlight ) {
				for ( i = 0; elements[ i ]; i++ ) {
					this.settings.unhighlight.call( this, elements[ i ],
						this.settings.errorClass, "" );
					this.findByName( elements[ i ].name ).removeClass( this.settings.validClass );
				}
			} else {
				elements
					.removeClass( this.settings.errorClass )
					.removeClass( this.settings.validClass );
			}
		},

		numberOfInvalids: function() {
			return this.objectLength( this.invalid );
		},

		objectLength: function( obj ) {
			/* jshint unused: false */
			var count = 0,
				i;
			for ( i in obj ) {
				if ( obj[ i ] ) {
					count++;
				}
			}
			return count;
		},

		hideErrors: function() {
			this.hideThese( this.toHide );
		},

		hideThese: function( errors ) {
			errors.not( this.containers ).text( "" );
			this.addWrapper( errors ).hide();
		},

		valid: function() {
			return this.size() === 0;
		},

		size: function() {
			return this.errorList.length;
		},

		focusInvalid: function() {
			if ( this.settings.focusInvalid ) {
				try {
					$( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [] )
					.filter( ":visible" )
					.focus()

					// Manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger( "focusin" );
				} catch ( e ) {

					// Ignore IE throwing errors when focusing hidden elements
				}
			}
		},

		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep( this.errorList, function( n ) {
				return n.element.name === lastActive.name;
			} ).length === 1 && lastActive;
		},

		elements: function() {
			var validator = this,
				rulesCache = {};

			// Select all valid inputs inside the form (no submit or reset buttons)
			return $( this.currentForm )
			.find( "input, select, textarea, [contenteditable]" )
			.not( ":submit, :reset, :image, :disabled" )
			.not( this.settings.ignore )
			.filter( function() {
				var name = this.name || $( this ).attr( "name" ); // For contenteditable
				if ( !name && validator.settings.debug && window.console ) {
					console.error( "%o has no name assigned", this );
				}

				// Set form expando on contenteditable
				if ( this.hasAttribute( "contenteditable" ) ) {
					this.form = $( this ).closest( "form" )[ 0 ];
				}

				// Select only the first element for each name, and only those with rules specified
				if ( name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
					return false;
				}

				rulesCache[ name ] = true;
				return true;
			} );
		},

		clean: function( selector ) {
			return $( selector )[ 0 ];
		},

		errors: function() {
			var errorClass = this.settings.errorClass.split( " " ).join( "." );
			return $( this.settings.errorElement + "." + errorClass, this.errorContext );
		},

		resetInternals: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $( [] );
			this.toHide = $( [] );
		},

		reset: function() {
			this.resetInternals();
			this.currentElements = $( [] );
		},

		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},

		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor( element );
		},

		elementValue: function( element ) {
			var $element = $( element ),
				type = element.type,
				val, idx;

			if ( type === "radio" || type === "checkbox" ) {
				return this.findByName( element.name ).filter( ":checked" ).val();
			} else if ( type === "number" && typeof element.validity !== "undefined" ) {
				return element.validity.badInput ? "NaN" : $element.val();
			}

			if ( element.hasAttribute( "contenteditable" ) ) {
				val = $element.text();
			} else {
				val = $element.val();
			}

			if ( type === "file" ) {

				// Modern browser (chrome & safari)
				if ( val.substr( 0, 12 ) === "C:\\fakepath\\" ) {
					return val.substr( 12 );
				}

				// Legacy browsers
				// Unix-based path
				idx = val.lastIndexOf( "/" );
				if ( idx >= 0 ) {
					return val.substr( idx + 1 );
				}

				// Windows-based path
				idx = val.lastIndexOf( "\\" );
				if ( idx >= 0 ) {
					return val.substr( idx + 1 );
				}

				// Just the file name
				return val;
			}

			if ( typeof val === "string" ) {
				return val.replace( /\r/g, "" );
			}
			return val;
		},

		check: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $( element ).rules(),
				rulesCount = $.map( rules, function( n, i ) {
					return i;
				} ).length,
				dependencyMismatch = false,
				val = this.elementValue( element ),
				result, method, rule;

			// If a normalizer is defined for this element, then
			// call it to retreive the changed value instead
			// of using the real one.
			// Note that `this` in the normalizer is `element`.
			if ( typeof rules.normalizer === "function" ) {
				val = rules.normalizer.call( element, val );

				if ( typeof val !== "string" ) {
					throw new TypeError( "The normalizer should return a string value." );
				}

				// Delete the normalizer from rules to avoid treating
				// it as a pre-defined method.
				delete rules.normalizer;
			}

			for ( method in rules ) {
				rule = { method: method, parameters: rules[ method ] };
				try {
					result = $.validator.methods[ method ].call( this, val, element, rule.parameters );

					// If a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result === "dependency-mismatch" && rulesCount === 1 ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;

					if ( result === "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor( element ) );
						return;
					}

					if ( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch ( e ) {
					if ( this.settings.debug && window.console ) {
						console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
					}
					if ( e instanceof TypeError ) {
						e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
					}

					throw e;
				}
			}
			if ( dependencyMismatch ) {
				return;
			}
			if ( this.objectLength( rules ) ) {
				this.successList.push( element );
			}
			return true;
		},

		// Return the custom message for the given element and validation method
		// specified in the element's HTML5 data attribute
		// return the generic message if present and no method specific message is present
		customDataMessage: function( element, method ) {
			return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
				method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
		},

		// Return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[ name ];
			return m && ( m.constructor === String ? m : m[ method ] );
		},

		// Return the first defined argument, allowing empty strings
		findDefined: function() {
			for ( var i = 0; i < arguments.length; i++ ) {
				if ( arguments[ i ] !== undefined ) {
					return arguments[ i ];
				}
			}
			return undefined;
		},

		// The second parameter 'rule' used to be a string, and extended to an object literal
		// of the following form:
		// rule = {
		//     method: "method name",
		//     parameters: "the given method parameters"
		// }
		//
		// The old behavior still supported, kept to maintain backward compatibility with
		// old code, and will be removed in the next major release.
		defaultMessage: function( element, rule ) {
			if ( typeof rule === "string" ) {
				rule = { method: rule };
			}

			var message = this.findDefined(
					this.customMessage( element.name, rule.method ),
					this.customDataMessage( element, rule.method ),

					// 'title' is never undefined, so handle empty string as undefined
					!this.settings.ignoreTitle && element.title || undefined,
					$.validator.messages[ rule.method ],
					"<strong>Warning: No message defined for " + element.name + "</strong>"
				),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message === "function" ) {
				message = message.call( this, rule.parameters, element );
			} else if ( theregex.test( message ) ) {
				message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
			}

			return message;
		},

		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule );

			this.errorList.push( {
				message: message,
				element: element,
				method: rule.method
			} );

			this.errorMap[ element.name ] = message;
			this.submitted[ element.name ] = message;
		},

		addWrapper: function( toToggle ) {
			if ( this.settings.wrapper ) {
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			}
			return toToggle;
		},

		defaultShowErrors: function() {
			var i, elements, error;
			for ( i = 0; this.errorList[ i ]; i++ ) {
				error = this.errorList[ i ];
				if ( this.settings.highlight ) {
					this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				}
				this.showLabel( error.element, error.message );
			}
			if ( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if ( this.settings.success ) {
				for ( i = 0; this.successList[ i ]; i++ ) {
					this.showLabel( this.successList[ i ] );
				}
			}
			if ( this.settings.unhighlight ) {
				for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
					this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},

		validElements: function() {
			return this.currentElements.not( this.invalidElements() );
		},

		invalidElements: function() {
			return $( this.errorList ).map( function() {
				return this.element;
			} );
		},

		showLabel: function( element, message ) {
			var place, group, errorID, v,
				error = this.errorsFor( element ),
				elementID = this.idOrName( element ),
				describedBy = $( element ).attr( "aria-describedby" );

			if ( error.length ) {

				// Refresh error/success class
				error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );

				// Replace message on existing label
				error.html( message );
			} else {

				// Create error element
				error = $( "<" + this.settings.errorElement + ">" )
					.attr( "id", elementID + "-error" )
					.addClass( this.settings.errorClass )
					.html( message || "" );

				// Maintain reference to the element to be placed into the DOM
				place = error;
				if ( this.settings.wrapper ) {

					// Make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
				}
				if ( this.labelContainer.length ) {
					this.labelContainer.append( place );
				} else if ( this.settings.errorPlacement ) {
					this.settings.errorPlacement.call( this, place, $( element ) );
				} else {
					place.insertAfter( element );
				}

				// Link error back to the element
				if ( error.is( "label" ) ) {

					// If the error is a label, then associate using 'for'
					error.attr( "for", elementID );

					// If the element is not a child of an associated label, then it's necessary
					// to explicitly apply aria-describedby
				} else if ( error.parents( "label[for='" + this.escapeCssMeta( elementID ) + "']" ).length === 0 ) {
					errorID = error.attr( "id" );

					// Respect existing non-error aria-describedby
					if ( !describedBy ) {
						describedBy = errorID;
					} else if ( !describedBy.match( new RegExp( "\\b" + this.escapeCssMeta( errorID ) + "\\b" ) ) ) {

						// Add to end of list if not already present
						describedBy += " " + errorID;
					}
					$( element ).attr( "aria-describedby", describedBy );

					// If this element is grouped, then assign to all elements in the same group
					group = this.groups[ element.name ];
					if ( group ) {
						v = this;
						$.each( v.groups, function( name, testgroup ) {
							if ( testgroup === group ) {
								$( "[name='" + v.escapeCssMeta( name ) + "']", v.currentForm )
									.attr( "aria-describedby", error.attr( "id" ) );
							}
						} );
					}
				}
			}
			if ( !message && this.settings.success ) {
				error.text( "" );
				if ( typeof this.settings.success === "string" ) {
					error.addClass( this.settings.success );
				} else {
					this.settings.success( error, element );
				}
			}
			this.toShow = this.toShow.add( error );
		},

		errorsFor: function( element ) {
			var name = this.escapeCssMeta( this.idOrName( element ) ),
				describer = $( element ).attr( "aria-describedby" ),
				selector = "label[for='" + name + "'], label[for='" + name + "'] *";

			// 'aria-describedby' should directly reference the error element
			if ( describer ) {
				selector = selector + ", #" + this.escapeCssMeta( describer )
					.replace( /\s+/g, ", #" );
			}

			return this
				.errors()
				.filter( selector );
		},

		// See https://api.jquery.com/category/selectors/, for CSS
		// meta-characters that should be escaped in order to be used with JQuery
		// as a literal part of a name/id or any selector.
		escapeCssMeta: function( string ) {
			return string.replace( /([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1" );
		},

		idOrName: function( element ) {
			return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
		},

		validationTargetFor: function( element ) {

			// If radio/checkbox, validate first element in group instead
			if ( this.checkable( element ) ) {
				element = this.findByName( element.name );
			}

			// Always apply ignore filter
			return $( element ).not( this.settings.ignore )[ 0 ];
		},

		checkable: function( element ) {
			return ( /radio|checkbox/i ).test( element.type );
		},

		findByName: function( name ) {
			return $( this.currentForm ).find( "[name='" + this.escapeCssMeta( name ) + "']" );
		},

		getLength: function( value, element ) {
			switch ( element.nodeName.toLowerCase() ) {
			case "select":
				return $( "option:selected", element ).length;
			case "input":
				if ( this.checkable( element ) ) {
					return this.findByName( element.name ).filter( ":checked" ).length;
				}
			}
			return value.length;
		},

		depend: function( param, element ) {
			return this.dependTypes[ typeof param ] ? this.dependTypes[ typeof param ]( param, element ) : true;
		},

		dependTypes: {
			"boolean": function( param ) {
				return param;
			},
			"string": function( param, element ) {
				return !!$( param, element.form ).length;
			},
			"function": function( param, element ) {
				return param( element );
			}
		},

		optional: function( element ) {
			var val = this.elementValue( element );
			return !$.validator.methods.required.call( this, val, element ) && "dependency-mismatch";
		},

		startRequest: function( element ) {
			if ( !this.pending[ element.name ] ) {
				this.pendingRequest++;
				$( element ).addClass( this.settings.pendingClass );
				this.pending[ element.name ] = true;
			}
		},

		stopRequest: function( element, valid ) {
			this.pendingRequest--;

			// Sometimes synchronization fails, make sure pendingRequest is never < 0
			if ( this.pendingRequest < 0 ) {
				this.pendingRequest = 0;
			}
			delete this.pending[ element.name ];
			$( element ).removeClass( this.settings.pendingClass );
			if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
				$( this.currentForm ).submit();
				this.formSubmitted = false;
			} else if ( !valid && this.pendingRequest === 0 && this.formSubmitted ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
				this.formSubmitted = false;
			}
		},

		previousValue: function( element, method ) {
			method = typeof method === "string" && method || "remote";

			return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, { method: method } )
			} );
		},

		// Cleans up all forms and elements, removes validator-specific events
		destroy: function() {
			this.resetForm();

			$( this.currentForm )
				.off( ".validate" )
				.removeData( "validator" )
				.find( ".validate-equalTo-blur" )
					.off( ".validate-equalTo" )
					.removeClass( "validate-equalTo-blur" );
		}

	},

	classRuleSettings: {
		required: { required: true },
		email: { email: true },
		url: { url: true },
		date: { date: true },
		dateISO: { dateISO: true },
		number: { number: true },
		digits: { digits: true },
		creditcard: { creditcard: true }
	},

	addClassRules: function( className, rules ) {
		if ( className.constructor === String ) {
			this.classRuleSettings[ className ] = rules;
		} else {
			$.extend( this.classRuleSettings, className );
		}
	},

	classRules: function( element ) {
		var rules = {},
			classes = $( element ).attr( "class" );

		if ( classes ) {
			$.each( classes.split( " " ), function() {
				if ( this in $.validator.classRuleSettings ) {
					$.extend( rules, $.validator.classRuleSettings[ this ] );
				}
			} );
		}
		return rules;
	},

	normalizeAttributeRule: function( rules, type, method, value ) {

		// Convert the value to a number for number inputs, and for text for backwards compability
		// allows type="date" and others to be compared as strings
		if ( /min|max|step/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
			value = Number( value );

			// Support Opera Mini, which returns NaN for undefined minlength
			if ( isNaN( value ) ) {
				value = undefined;
			}
		}

		if ( value || value === 0 ) {
			rules[ method ] = value;
		} else if ( type === method && type !== "range" ) {

			// Exception: the jquery validate 'range' method
			// does not test for the html5 'range' type
			rules[ method ] = true;
		}
	},

	attributeRules: function( element ) {
		var rules = {},
			$element = $( element ),
			type = element.getAttribute( "type" ),
			method, value;

		for ( method in $.validator.methods ) {

			// Support for <input required> in both html5 and older browsers
			if ( method === "required" ) {
				value = element.getAttribute( method );

				// Some browsers return an empty string for the required attribute
				// and non-HTML5 browsers might have required="" markup
				if ( value === "" ) {
					value = true;
				}

				// Force non-HTML5 browsers to return bool
				value = !!value;
			} else {
				value = $element.attr( method );
			}

			this.normalizeAttributeRule( rules, type, method, value );
		}

		// 'maxlength' may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
		if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
			delete rules.maxlength;
		}

		return rules;
	},

	dataRules: function( element ) {
		var rules = {},
			$element = $( element ),
			type = element.getAttribute( "type" ),
			method, value;

		for ( method in $.validator.methods ) {
			value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );
			this.normalizeAttributeRule( rules, type, method, value );
		}
		return rules;
	},

	staticRules: function( element ) {
		var rules = {},
			validator = $.data( element.form, "validator" );

		if ( validator.settings.rules ) {
			rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
		}
		return rules;
	},

	normalizeRules: function( rules, element ) {

		// Handle dependency check
		$.each( rules, function( prop, val ) {

			// Ignore rule when param is explicitly false, eg. required:false
			if ( val === false ) {
				delete rules[ prop ];
				return;
			}
			if ( val.param || val.depends ) {
				var keepRule = true;
				switch ( typeof val.depends ) {
				case "string":
					keepRule = !!$( val.depends, element.form ).length;
					break;
				case "function":
					keepRule = val.depends.call( element, element );
					break;
				}
				if ( keepRule ) {
					rules[ prop ] = val.param !== undefined ? val.param : true;
				} else {
					$.data( element.form, "validator" ).resetElements( $( element ) );
					delete rules[ prop ];
				}
			}
		} );

		// Evaluate parameters
		$.each( rules, function( rule, parameter ) {
			rules[ rule ] = $.isFunction( parameter ) && rule !== "normalizer" ? parameter( element ) : parameter;
		} );

		// Clean number parameters
		$.each( [ "minlength", "maxlength" ], function() {
			if ( rules[ this ] ) {
				rules[ this ] = Number( rules[ this ] );
			}
		} );
		$.each( [ "rangelength", "range" ], function() {
			var parts;
			if ( rules[ this ] ) {
				if ( $.isArray( rules[ this ] ) ) {
					rules[ this ] = [ Number( rules[ this ][ 0 ] ), Number( rules[ this ][ 1 ] ) ];
				} else if ( typeof rules[ this ] === "string" ) {
					parts = rules[ this ].replace( /[\[\]]/g, "" ).split( /[\s,]+/ );
					rules[ this ] = [ Number( parts[ 0 ] ), Number( parts[ 1 ] ) ];
				}
			}
		} );

		if ( $.validator.autoCreateRanges ) {

			// Auto-create ranges
			if ( rules.min != null && rules.max != null ) {
				rules.range = [ rules.min, rules.max ];
				delete rules.min;
				delete rules.max;
			}
			if ( rules.minlength != null && rules.maxlength != null ) {
				rules.rangelength = [ rules.minlength, rules.maxlength ];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}

		return rules;
	},

	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function( data ) {
		if ( typeof data === "string" ) {
			var transformed = {};
			$.each( data.split( /\s/ ), function() {
				transformed[ this ] = true;
			} );
			data = transformed;
		}
		return data;
	},

	// http://jqueryvalidation.org/jQuery.validator.addMethod/
	addMethod: function( name, method, message ) {
		$.validator.methods[ name ] = method;
		$.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
		if ( method.length < 3 ) {
			$.validator.addClassRules( name, $.validator.normalizeRule( name ) );
		}
	},

	// http://jqueryvalidation.org/jQuery.validator.methods/
	methods: {

		// http://jqueryvalidation.org/required-method/
		required: function( value, element, param ) {

			// Check if dependency is met
			if ( !this.depend( param, element ) ) {
				return "dependency-mismatch";
			}
			if ( element.nodeName.toLowerCase() === "select" ) {

				// Could be an array for select-multiple or a string, both are fine this way
				var val = $( element ).val();
				return val && val.length > 0;
			}
			if ( this.checkable( element ) ) {
				return this.getLength( value, element ) > 0;
			}
			return value.length > 0;
		},

		// http://jqueryvalidation.org/email-method/
		email: function( value, element ) {

			// From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
			// Retrieved 2014-01-14
			// If you have a problem with this implementation, report a bug against the above spec
			// Or use custom methods to implement your own email validation
			return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
		},

		// http://jqueryvalidation.org/url-method/
		url: function( value, element ) {

			// Copyright (c) 2010-2013 Diego Perini, MIT licensed
			// https://gist.github.com/dperini/729294
			// see also https://mathiasbynens.be/demo/url-regex
			// modified to allow protocol-relative URLs
			return this.optional( element ) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
		},

		// http://jqueryvalidation.org/date-method/
		date: function( value, element ) {
			return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
		},

		// http://jqueryvalidation.org/dateISO-method/
		dateISO: function( value, element ) {
			return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
		},

		// http://jqueryvalidation.org/number-method/
		number: function( value, element ) {
			return this.optional( element ) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
		},

		// http://jqueryvalidation.org/digits-method/
		digits: function( value, element ) {
			return this.optional( element ) || /^\d+$/.test( value );
		},

		// http://jqueryvalidation.org/minlength-method/
		minlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || length >= param;
		},

		// http://jqueryvalidation.org/maxlength-method/
		maxlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || length <= param;
		},

		// http://jqueryvalidation.org/rangelength-method/
		rangelength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
		},

		// http://jqueryvalidation.org/min-method/
		min: function( value, element, param ) {
			return this.optional( element ) || value >= param;
		},

		// http://jqueryvalidation.org/max-method/
		max: function( value, element, param ) {
			return this.optional( element ) || value <= param;
		},

		// http://jqueryvalidation.org/range-method/
		range: function( value, element, param ) {
			return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
		},

		// http://jqueryvalidation.org/step-method/
		step: function( value, element, param ) {
			var type = $( element ).attr( "type" ),
				errorMessage = "Step attribute on input type " + type + " is not supported.",
				supportedTypes = [ "text", "number", "range" ],
				re = new RegExp( "\\b" + type + "\\b" ),
				notSupported = type && !re.test( supportedTypes.join() ),
				decimalPlaces = function( num ) {
					var match = ( "" + num ).match( /(?:\.(\d+))?$/ );
					if ( !match ) {
						return 0;
					}

					// Number of digits right of decimal point.
					return match[ 1 ] ? match[ 1 ].length : 0;
				},
				toInt = function( num ) {
					return Math.round( num * Math.pow( 10, decimals ) );
				},
				valid = true,
				decimals;

			// Works only for text, number and range input types
			// TODO find a way to support input types date, datetime, datetime-local, month, time and week
			if ( notSupported ) {
				throw new Error( errorMessage );
			}

			decimals = decimalPlaces( param );

			// Value can't have too many decimals
			if ( decimalPlaces( value ) > decimals || toInt( value ) % toInt( param ) !== 0 ) {
				valid = false;
			}

			return this.optional( element ) || valid;
		},

		// http://jqueryvalidation.org/equalTo-method/
		equalTo: function( value, element, param ) {

			// Bind to the blur event of the target in order to revalidate whenever the target field is updated
			var target = $( param );
			if ( this.settings.onfocusout && target.not( ".validate-equalTo-blur" ).length ) {
				target.addClass( "validate-equalTo-blur" ).on( "blur.validate-equalTo", function() {
					$( element ).valid();
				} );
			}
			return value === target.val();
		},

		// http://jqueryvalidation.org/remote-method/
		remote: function( value, element, param, method ) {
			if ( this.optional( element ) ) {
				return "dependency-mismatch";
			}

			method = typeof method === "string" && method || "remote";

			var previous = this.previousValue( element, method ),
				validator, data, optionDataString;

			if ( !this.settings.messages[ element.name ] ) {
				this.settings.messages[ element.name ] = {};
			}
			previous.originalMessage = previous.originalMessage || this.settings.messages[ element.name ][ method ];
			this.settings.messages[ element.name ][ method ] = previous.message;

			param = typeof param === "string" && { url: param } || param;
			optionDataString = $.param( $.extend( { data: value }, param.data ) );
			if ( previous.old === optionDataString ) {
				return previous.valid;
			}

			previous.old = optionDataString;
			validator = this;
			this.startRequest( element );
			data = {};
			data[ element.name ] = value;
			$.ajax( $.extend( true, {
				mode: "abort",
				port: "validate" + element.name,
				dataType: "json",
				data: data,
				context: validator.currentForm,
				success: function( response ) {
					var valid = response === true || response === "true",
						errors, message, submitted;

					validator.settings.messages[ element.name ][ method ] = previous.originalMessage;
					if ( valid ) {
						submitted = validator.formSubmitted;
						validator.resetInternals();
						validator.toHide = validator.errorsFor( element );
						validator.formSubmitted = submitted;
						validator.successList.push( element );
						validator.invalid[ element.name ] = false;
						validator.showErrors();
					} else {
						errors = {};
						message = response || validator.defaultMessage( element, { method: method, parameters: value } );
						errors[ element.name ] = previous.message = message;
						validator.invalid[ element.name ] = true;
						validator.showErrors( errors );
					}
					previous.valid = valid;
					validator.stopRequest( element, valid );
				}
			}, param ) );
			return "pending";
		}
	}

} );

// Ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

var pendingRequests = {},
	ajax;

// Use a prefilter if available (1.5+)
if ( $.ajaxPrefilter ) {
	$.ajaxPrefilter( function( settings, _, xhr ) {
		var port = settings.port;
		if ( settings.mode === "abort" ) {
			if ( pendingRequests[ port ] ) {
				pendingRequests[ port ].abort();
			}
			pendingRequests[ port ] = xhr;
		}
	} );
} else {

	// Proxy ajax
	ajax = $.ajax;
	$.ajax = function( settings ) {
		var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
			port = ( "port" in settings ? settings : $.ajaxSettings ).port;
		if ( mode === "abort" ) {
			if ( pendingRequests[ port ] ) {
				pendingRequests[ port ].abort();
			}
			pendingRequests[ port ] = ajax.apply( this, arguments );
			return pendingRequests[ port ];
		}
		return ajax.apply( this, arguments );
	};
}
return $;
}));
/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
;
if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/**
 * Rangy, a cross-browser JavaScript range and selection library
 * https://github.com/timdown/rangy
 *
 * Copyright 2015, Tim Down
 * Licensed under the MIT license.
 * Version: 1.3.0
 * Build date: 10 May 2015
 */

(function(factory, root) {
    if (typeof define == "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof module != "undefined" && typeof exports == "object") {
        // Node/CommonJS style
        module.exports = factory();
    } else {
        // No AMD or CommonJS support so we place Rangy in (probably) the global variable
        root.rangy = factory();
    }
})(function() {

    var OBJECT = "object", FUNCTION = "function", UNDEFINED = "undefined";

    // Minimal set of properties required for DOM Level 2 Range compliance. Comparison constants such as START_TO_START
    // are omitted because ranges in KHTML do not have them but otherwise work perfectly well. See issue 113.
    var domRangeProperties = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed",
        "commonAncestorContainer"];

    // Minimal set of methods required for DOM Level 2 Range compliance
    var domRangeMethods = ["setStart", "setStartBefore", "setStartAfter", "setEnd", "setEndBefore",
        "setEndAfter", "collapse", "selectNode", "selectNodeContents", "compareBoundaryPoints", "deleteContents",
        "extractContents", "cloneContents", "insertNode", "surroundContents", "cloneRange", "toString", "detach"];

    var textRangeProperties = ["boundingHeight", "boundingLeft", "boundingTop", "boundingWidth", "htmlText", "text"];

    // Subset of TextRange's full set of methods that we're interested in
    var textRangeMethods = ["collapse", "compareEndPoints", "duplicate", "moveToElementText", "parentElement", "select",
        "setEndPoint", "getBoundingClientRect"];

    /*----------------------------------------------------------------------------------------------------------------*/

    // Trio of functions taken from Peter Michaux's article:
    // http://peter.michaux.ca/articles/feature-detection-state-of-the-art-browser-scripting
    function isHostMethod(o, p) {
        var t = typeof o[p];
        return t == FUNCTION || (!!(t == OBJECT && o[p])) || t == "unknown";
    }

    function isHostObject(o, p) {
        return !!(typeof o[p] == OBJECT && o[p]);
    }

    function isHostProperty(o, p) {
        return typeof o[p] != UNDEFINED;
    }

    // Creates a convenience function to save verbose repeated calls to tests functions
    function createMultiplePropertyTest(testFunc) {
        return function(o, props) {
            var i = props.length;
            while (i--) {
                if (!testFunc(o, props[i])) {
                    return false;
                }
            }
            return true;
        };
    }

    // Next trio of functions are a convenience to save verbose repeated calls to previous two functions
    var areHostMethods = createMultiplePropertyTest(isHostMethod);
    var areHostObjects = createMultiplePropertyTest(isHostObject);
    var areHostProperties = createMultiplePropertyTest(isHostProperty);

    function isTextRange(range) {
        return range && areHostMethods(range, textRangeMethods) && areHostProperties(range, textRangeProperties);
    }

    function getBody(doc) {
        return isHostObject(doc, "body") ? doc.body : doc.getElementsByTagName("body")[0];
    }

    var forEach = [].forEach ?
        function(arr, func) {
            arr.forEach(func);
        } :
        function(arr, func) {
            for (var i = 0, len = arr.length; i < len; ++i) {
                func(arr[i], i);
            }
        };

    var modules = {};

    var isBrowser = (typeof window != UNDEFINED && typeof document != UNDEFINED);

    var util = {
        isHostMethod: isHostMethod,
        isHostObject: isHostObject,
        isHostProperty: isHostProperty,
        areHostMethods: areHostMethods,
        areHostObjects: areHostObjects,
        areHostProperties: areHostProperties,
        isTextRange: isTextRange,
        getBody: getBody,
        forEach: forEach
    };

    var api = {
        version: "1.3.0",
        initialized: false,
        isBrowser: isBrowser,
        supported: true,
        util: util,
        features: {},
        modules: modules,
        config: {
            alertOnFail: false,
            alertOnWarn: false,
            preferTextRange: false,
            autoInitialize: (typeof rangyAutoInitialize == UNDEFINED) ? true : rangyAutoInitialize
        }
    };

    function consoleLog(msg) {
        if (typeof console != UNDEFINED && isHostMethod(console, "log")) {
            console.log(msg);
        }
    }

    function alertOrLog(msg, shouldAlert) {
        if (isBrowser && shouldAlert) {
            alert(msg);
        } else  {
            consoleLog(msg);
        }
    }

    function fail(reason) {
        api.initialized = true;
        api.supported = false;
        alertOrLog("Rangy is not supported in this environment. Reason: " + reason, api.config.alertOnFail);
    }

    api.fail = fail;

    function warn(msg) {
        alertOrLog("Rangy warning: " + msg, api.config.alertOnWarn);
    }

    api.warn = warn;

    // Add utility extend() method
    var extend;
    if ({}.hasOwnProperty) {
        util.extend = extend = function(obj, props, deep) {
            var o, p;
            for (var i in props) {
                if (props.hasOwnProperty(i)) {
                    o = obj[i];
                    p = props[i];
                    if (deep && o !== null && typeof o == "object" && p !== null && typeof p == "object") {
                        extend(o, p, true);
                    }
                    obj[i] = p;
                }
            }
            // Special case for toString, which does not show up in for...in loops in IE <= 8
            if (props.hasOwnProperty("toString")) {
                obj.toString = props.toString;
            }
            return obj;
        };

        util.createOptions = function(optionsParam, defaults) {
            var options = {};
            extend(options, defaults);
            if (optionsParam) {
                extend(options, optionsParam);
            }
            return options;
        };
    } else {
        fail("hasOwnProperty not supported");
    }

    // Test whether we're in a browser and bail out if not
    if (!isBrowser) {
        fail("Rangy can only run in a browser");
    }

    // Test whether Array.prototype.slice can be relied on for NodeLists and use an alternative toArray() if not
    (function() {
        var toArray;

        if (isBrowser) {
            var el = document.createElement("div");
            el.appendChild(document.createElement("span"));
            var slice = [].slice;
            try {
                if (slice.call(el.childNodes, 0)[0].nodeType == 1) {
                    toArray = function(arrayLike) {
                        return slice.call(arrayLike, 0);
                    };
                }
            } catch (e) {}
        }

        if (!toArray) {
            toArray = function(arrayLike) {
                var arr = [];
                for (var i = 0, len = arrayLike.length; i < len; ++i) {
                    arr[i] = arrayLike[i];
                }
                return arr;
            };
        }

        util.toArray = toArray;
    })();

    // Very simple event handler wrapper function that doesn't attempt to solve issues such as "this" handling or
    // normalization of event properties
    var addListener;
    if (isBrowser) {
        if (isHostMethod(document, "addEventListener")) {
            addListener = function(obj, eventType, listener) {
                obj.addEventListener(eventType, listener, false);
            };
        } else if (isHostMethod(document, "attachEvent")) {
            addListener = function(obj, eventType, listener) {
                obj.attachEvent("on" + eventType, listener);
            };
        } else {
            fail("Document does not have required addEventListener or attachEvent method");
        }

        util.addListener = addListener;
    }

    var initListeners = [];

    function getErrorDesc(ex) {
        return ex.message || ex.description || String(ex);
    }

    // Initialization
    function init() {
        if (!isBrowser || api.initialized) {
            return;
        }
        var testRange;
        var implementsDomRange = false, implementsTextRange = false;

        // First, perform basic feature tests

        if (isHostMethod(document, "createRange")) {
            testRange = document.createRange();
            if (areHostMethods(testRange, domRangeMethods) && areHostProperties(testRange, domRangeProperties)) {
                implementsDomRange = true;
            }
        }

        var body = getBody(document);
        if (!body || body.nodeName.toLowerCase() != "body") {
            fail("No body element found");
            return;
        }

        if (body && isHostMethod(body, "createTextRange")) {
            testRange = body.createTextRange();
            if (isTextRange(testRange)) {
                implementsTextRange = true;
            }
        }

        if (!implementsDomRange && !implementsTextRange) {
            fail("Neither Range nor TextRange are available");
            return;
        }

        api.initialized = true;
        api.features = {
            implementsDomRange: implementsDomRange,
            implementsTextRange: implementsTextRange
        };

        // Initialize modules
        var module, errorMessage;
        for (var moduleName in modules) {
            if ( (module = modules[moduleName]) instanceof Module ) {
                module.init(module, api);
            }
        }

        // Call init listeners
        for (var i = 0, len = initListeners.length; i < len; ++i) {
            try {
                initListeners[i](api);
            } catch (ex) {
                errorMessage = "Rangy init listener threw an exception. Continuing. Detail: " + getErrorDesc(ex);
                consoleLog(errorMessage);
            }
        }
    }

    function deprecationNotice(deprecated, replacement, module) {
        if (module) {
            deprecated += " in module " + module.name;
        }
        api.warn("DEPRECATED: " + deprecated + " is deprecated. Please use " +
        replacement + " instead.");
    }

    function createAliasForDeprecatedMethod(owner, deprecated, replacement, module) {
        owner[deprecated] = function() {
            deprecationNotice(deprecated, replacement, module);
            return owner[replacement].apply(owner, util.toArray(arguments));
        };
    }

    util.deprecationNotice = deprecationNotice;
    util.createAliasForDeprecatedMethod = createAliasForDeprecatedMethod;

    // Allow external scripts to initialize this library in case it's loaded after the document has loaded
    api.init = init;

    // Execute listener immediately if already initialized
    api.addInitListener = function(listener) {
        if (api.initialized) {
            listener(api);
        } else {
            initListeners.push(listener);
        }
    };

    var shimListeners = [];

    api.addShimListener = function(listener) {
        shimListeners.push(listener);
    };

    function shim(win) {
        win = win || window;
        init();

        // Notify listeners
        for (var i = 0, len = shimListeners.length; i < len; ++i) {
            shimListeners[i](win);
        }
    }

    if (isBrowser) {
        api.shim = api.createMissingNativeApi = shim;
        createAliasForDeprecatedMethod(api, "createMissingNativeApi", "shim");
    }

    function Module(name, dependencies, initializer) {
        this.name = name;
        this.dependencies = dependencies;
        this.initialized = false;
        this.supported = false;
        this.initializer = initializer;
    }

    Module.prototype = {
        init: function() {
            var requiredModuleNames = this.dependencies || [];
            for (var i = 0, len = requiredModuleNames.length, requiredModule, moduleName; i < len; ++i) {
                moduleName = requiredModuleNames[i];

                requiredModule = modules[moduleName];
                if (!requiredModule || !(requiredModule instanceof Module)) {
                    throw new Error("required module '" + moduleName + "' not found");
                }

                requiredModule.init();

                if (!requiredModule.supported) {
                    throw new Error("required module '" + moduleName + "' not supported");
                }
            }

            // Now run initializer
            this.initializer(this);
        },

        fail: function(reason) {
            this.initialized = true;
            this.supported = false;
            throw new Error(reason);
        },

        warn: function(msg) {
            api.warn("Module " + this.name + ": " + msg);
        },

        deprecationNotice: function(deprecated, replacement) {
            api.warn("DEPRECATED: " + deprecated + " in module " + this.name + " is deprecated. Please use " +
                replacement + " instead");
        },

        createError: function(msg) {
            return new Error("Error in Rangy " + this.name + " module: " + msg);
        }
    };

    function createModule(name, dependencies, initFunc) {
        var newModule = new Module(name, dependencies, function(module) {
            if (!module.initialized) {
                module.initialized = true;
                try {
                    initFunc(api, module);
                    module.supported = true;
                } catch (ex) {
                    var errorMessage = "Module '" + name + "' failed to load: " + getErrorDesc(ex);
                    consoleLog(errorMessage);
                    if (ex.stack) {
                        consoleLog(ex.stack);
                    }
                }
            }
        });
        modules[name] = newModule;
        return newModule;
    }

    api.createModule = function(name) {
        // Allow 2 or 3 arguments (second argument is an optional array of dependencies)
        var initFunc, dependencies;
        if (arguments.length == 2) {
            initFunc = arguments[1];
            dependencies = [];
        } else {
            initFunc = arguments[2];
            dependencies = arguments[1];
        }

        var module = createModule(name, dependencies, initFunc);

        // Initialize the module immediately if the core is already initialized
        if (api.initialized && api.supported) {
            module.init();
        }
    };

    api.createCoreModule = function(name, dependencies, initFunc) {
        createModule(name, dependencies, initFunc);
    };

    /*----------------------------------------------------------------------------------------------------------------*/

    // Ensure rangy.rangePrototype and rangy.selectionPrototype are available immediately

    function RangePrototype() {}
    api.RangePrototype = RangePrototype;
    api.rangePrototype = new RangePrototype();

    function SelectionPrototype() {}
    api.selectionPrototype = new SelectionPrototype();

    /*----------------------------------------------------------------------------------------------------------------*/

    // DOM utility methods used by Rangy
    api.createCoreModule("DomUtil", [], function(api, module) {
        var UNDEF = "undefined";
        var util = api.util;
        var getBody = util.getBody;

        // Perform feature tests
        if (!util.areHostMethods(document, ["createDocumentFragment", "createElement", "createTextNode"])) {
            module.fail("document missing a Node creation method");
        }

        if (!util.isHostMethod(document, "getElementsByTagName")) {
            module.fail("document missing getElementsByTagName method");
        }

        var el = document.createElement("div");
        if (!util.areHostMethods(el, ["insertBefore", "appendChild", "cloneNode"] ||
                !util.areHostObjects(el, ["previousSibling", "nextSibling", "childNodes", "parentNode"]))) {
            module.fail("Incomplete Element implementation");
        }

        // innerHTML is required for Range's createContextualFragment method
        if (!util.isHostProperty(el, "innerHTML")) {
            module.fail("Element is missing innerHTML property");
        }

        var textNode = document.createTextNode("test");
        if (!util.areHostMethods(textNode, ["splitText", "deleteData", "insertData", "appendData", "cloneNode"] ||
                !util.areHostObjects(el, ["previousSibling", "nextSibling", "childNodes", "parentNode"]) ||
                !util.areHostProperties(textNode, ["data"]))) {
            module.fail("Incomplete Text Node implementation");
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        // Removed use of indexOf because of a bizarre bug in Opera that is thrown in one of the Acid3 tests. I haven't been
        // able to replicate it outside of the test. The bug is that indexOf returns -1 when called on an Array that
        // contains just the document as a single element and the value searched for is the document.
        var arrayContains = /*Array.prototype.indexOf ?
            function(arr, val) {
                return arr.indexOf(val) > -1;
            }:*/

            function(arr, val) {
                var i = arr.length;
                while (i--) {
                    if (arr[i] === val) {
                        return true;
                    }
                }
                return false;
            };

        // Opera 11 puts HTML elements in the null namespace, it seems, and IE 7 has undefined namespaceURI
        function isHtmlNamespace(node) {
            var ns;
            return typeof node.namespaceURI == UNDEF || ((ns = node.namespaceURI) === null || ns == "http://www.w3.org/1999/xhtml");
        }

        function parentElement(node) {
            var parent = node.parentNode;
            return (parent.nodeType == 1) ? parent : null;
        }

        function getNodeIndex(node) {
            var i = 0;
            while( (node = node.previousSibling) ) {
                ++i;
            }
            return i;
        }

        function getNodeLength(node) {
            switch (node.nodeType) {
                case 7:
                case 10:
                    return 0;
                case 3:
                case 8:
                    return node.length;
                default:
                    return node.childNodes.length;
            }
        }

        function getCommonAncestor(node1, node2) {
            var ancestors = [], n;
            for (n = node1; n; n = n.parentNode) {
                ancestors.push(n);
            }

            for (n = node2; n; n = n.parentNode) {
                if (arrayContains(ancestors, n)) {
                    return n;
                }
            }

            return null;
        }

        function isAncestorOf(ancestor, descendant, selfIsAncestor) {
            var n = selfIsAncestor ? descendant : descendant.parentNode;
            while (n) {
                if (n === ancestor) {
                    return true;
                } else {
                    n = n.parentNode;
                }
            }
            return false;
        }

        function isOrIsAncestorOf(ancestor, descendant) {
            return isAncestorOf(ancestor, descendant, true);
        }

        function getClosestAncestorIn(node, ancestor, selfIsAncestor) {
            var p, n = selfIsAncestor ? node : node.parentNode;
            while (n) {
                p = n.parentNode;
                if (p === ancestor) {
                    return n;
                }
                n = p;
            }
            return null;
        }

        function isCharacterDataNode(node) {
            var t = node.nodeType;
            return t == 3 || t == 4 || t == 8 ; // Text, CDataSection or Comment
        }

        function isTextOrCommentNode(node) {
            if (!node) {
                return false;
            }
            var t = node.nodeType;
            return t == 3 || t == 8 ; // Text or Comment
        }

        function insertAfter(node, precedingNode) {
            var nextNode = precedingNode.nextSibling, parent = precedingNode.parentNode;
            if (nextNode) {
                parent.insertBefore(node, nextNode);
            } else {
                parent.appendChild(node);
            }
            return node;
        }

        // Note that we cannot use splitText() because it is bugridden in IE 9.
        function splitDataNode(node, index, positionsToPreserve) {
            var newNode = node.cloneNode(false);
            newNode.deleteData(0, index);
            node.deleteData(index, node.length - index);
            insertAfter(newNode, node);

            // Preserve positions
            if (positionsToPreserve) {
                for (var i = 0, position; position = positionsToPreserve[i++]; ) {
                    // Handle case where position was inside the portion of node after the split point
                    if (position.node == node && position.offset > index) {
                        position.node = newNode;
                        position.offset -= index;
                    }
                    // Handle the case where the position is a node offset within node's parent
                    else if (position.node == node.parentNode && position.offset > getNodeIndex(node)) {
                        ++position.offset;
                    }
                }
            }
            return newNode;
        }

        function getDocument(node) {
            if (node.nodeType == 9) {
                return node;
            } else if (typeof node.ownerDocument != UNDEF) {
                return node.ownerDocument;
            } else if (typeof node.document != UNDEF) {
                return node.document;
            } else if (node.parentNode) {
                return getDocument(node.parentNode);
            } else {
                throw module.createError("getDocument: no document found for node");
            }
        }

        function getWindow(node) {
            var doc = getDocument(node);
            if (typeof doc.defaultView != UNDEF) {
                return doc.defaultView;
            } else if (typeof doc.parentWindow != UNDEF) {
                return doc.parentWindow;
            } else {
                throw module.createError("Cannot get a window object for node");
            }
        }

        function getIframeDocument(iframeEl) {
            if (typeof iframeEl.contentDocument != UNDEF) {
                return iframeEl.contentDocument;
            } else if (typeof iframeEl.contentWindow != UNDEF) {
                return iframeEl.contentWindow.document;
            } else {
                throw module.createError("getIframeDocument: No Document object found for iframe element");
            }
        }

        function getIframeWindow(iframeEl) {
            if (typeof iframeEl.contentWindow != UNDEF) {
                return iframeEl.contentWindow;
            } else if (typeof iframeEl.contentDocument != UNDEF) {
                return iframeEl.contentDocument.defaultView;
            } else {
                throw module.createError("getIframeWindow: No Window object found for iframe element");
            }
        }

        // This looks bad. Is it worth it?
        function isWindow(obj) {
            return obj && util.isHostMethod(obj, "setTimeout") && util.isHostObject(obj, "document");
        }

        function getContentDocument(obj, module, methodName) {
            var doc;

            if (!obj) {
                doc = document;
            }

            // Test if a DOM node has been passed and obtain a document object for it if so
            else if (util.isHostProperty(obj, "nodeType")) {
                doc = (obj.nodeType == 1 && obj.tagName.toLowerCase() == "iframe") ?
                    getIframeDocument(obj) : getDocument(obj);
            }

            // Test if the doc parameter appears to be a Window object
            else if (isWindow(obj)) {
                doc = obj.document;
            }

            if (!doc) {
                throw module.createError(methodName + "(): Parameter must be a Window object or DOM node");
            }

            return doc;
        }

        function getRootContainer(node) {
            var parent;
            while ( (parent = node.parentNode) ) {
                node = parent;
            }
            return node;
        }

        function comparePoints(nodeA, offsetA, nodeB, offsetB) {
            // See http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html#Level-2-Range-Comparing
            var nodeC, root, childA, childB, n;
            if (nodeA == nodeB) {
                // Case 1: nodes are the same
                return offsetA === offsetB ? 0 : (offsetA < offsetB) ? -1 : 1;
            } else if ( (nodeC = getClosestAncestorIn(nodeB, nodeA, true)) ) {
                // Case 2: node C (container B or an ancestor) is a child node of A
                return offsetA <= getNodeIndex(nodeC) ? -1 : 1;
            } else if ( (nodeC = getClosestAncestorIn(nodeA, nodeB, true)) ) {
                // Case 3: node C (container A or an ancestor) is a child node of B
                return getNodeIndex(nodeC) < offsetB  ? -1 : 1;
            } else {
                root = getCommonAncestor(nodeA, nodeB);
                if (!root) {
                    throw new Error("comparePoints error: nodes have no common ancestor");
                }

                // Case 4: containers are siblings or descendants of siblings
                childA = (nodeA === root) ? root : getClosestAncestorIn(nodeA, root, true);
                childB = (nodeB === root) ? root : getClosestAncestorIn(nodeB, root, true);

                if (childA === childB) {
                    // This shouldn't be possible
                    throw module.createError("comparePoints got to case 4 and childA and childB are the same!");
                } else {
                    n = root.firstChild;
                    while (n) {
                        if (n === childA) {
                            return -1;
                        } else if (n === childB) {
                            return 1;
                        }
                        n = n.nextSibling;
                    }
                }
            }
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        // Test for IE's crash (IE 6/7) or exception (IE >= 8) when a reference to garbage-collected text node is queried
        var crashyTextNodes = false;

        function isBrokenNode(node) {
            var n;
            try {
                n = node.parentNode;
                return false;
            } catch (e) {
                return true;
            }
        }

        (function() {
            var el = document.createElement("b");
            el.innerHTML = "1";
            var textNode = el.firstChild;
            el.innerHTML = "<br />";
            crashyTextNodes = isBrokenNode(textNode);

            api.features.crashyTextNodes = crashyTextNodes;
        })();

        /*----------------------------------------------------------------------------------------------------------------*/

        function inspectNode(node) {
            if (!node) {
                return "[No node]";
            }
            if (crashyTextNodes && isBrokenNode(node)) {
                return "[Broken node]";
            }
            if (isCharacterDataNode(node)) {
                return '"' + node.data + '"';
            }
            if (node.nodeType == 1) {
                var idAttr = node.id ? ' id="' + node.id + '"' : "";
                return "<" + node.nodeName + idAttr + ">[index:" + getNodeIndex(node) + ",length:" + node.childNodes.length + "][" + (node.innerHTML || "[innerHTML not supported]").slice(0, 25) + "]";
            }
            return node.nodeName;
        }

        function fragmentFromNodeChildren(node) {
            var fragment = getDocument(node).createDocumentFragment(), child;
            while ( (child = node.firstChild) ) {
                fragment.appendChild(child);
            }
            return fragment;
        }

        var getComputedStyleProperty;
        if (typeof window.getComputedStyle != UNDEF) {
            getComputedStyleProperty = function(el, propName) {
                return getWindow(el).getComputedStyle(el, null)[propName];
            };
        } else if (typeof document.documentElement.currentStyle != UNDEF) {
            getComputedStyleProperty = function(el, propName) {
                return el.currentStyle ? el.currentStyle[propName] : "";
            };
        } else {
            module.fail("No means of obtaining computed style properties found");
        }

        function createTestElement(doc, html, contentEditable) {
            var body = getBody(doc);
            var el = doc.createElement("div");
            el.contentEditable = "" + !!contentEditable;
            if (html) {
                el.innerHTML = html;
            }

            // Insert the test element at the start of the body to prevent scrolling to the bottom in iOS (issue #292)
            var bodyFirstChild = body.firstChild;
            if (bodyFirstChild) {
                body.insertBefore(el, bodyFirstChild);
            } else {
                body.appendChild(el);
            }

            return el;
        }

        function removeNode(node) {
            return node.parentNode.removeChild(node);
        }

        function NodeIterator(root) {
            this.root = root;
            this._next = root;
        }

        NodeIterator.prototype = {
            _current: null,

            hasNext: function() {
                return !!this._next;
            },

            next: function() {
                var n = this._current = this._next;
                var child, next;
                if (this._current) {
                    child = n.firstChild;
                    if (child) {
                        this._next = child;
                    } else {
                        next = null;
                        while ((n !== this.root) && !(next = n.nextSibling)) {
                            n = n.parentNode;
                        }
                        this._next = next;
                    }
                }
                return this._current;
            },

            detach: function() {
                this._current = this._next = this.root = null;
            }
        };

        function createIterator(root) {
            return new NodeIterator(root);
        }

        function DomPosition(node, offset) {
            this.node = node;
            this.offset = offset;
        }

        DomPosition.prototype = {
            equals: function(pos) {
                return !!pos && this.node === pos.node && this.offset == pos.offset;
            },

            inspect: function() {
                return "[DomPosition(" + inspectNode(this.node) + ":" + this.offset + ")]";
            },

            toString: function() {
                return this.inspect();
            }
        };

        function DOMException(codeName) {
            this.code = this[codeName];
            this.codeName = codeName;
            this.message = "DOMException: " + this.codeName;
        }

        DOMException.prototype = {
            INDEX_SIZE_ERR: 1,
            HIERARCHY_REQUEST_ERR: 3,
            WRONG_DOCUMENT_ERR: 4,
            NO_MODIFICATION_ALLOWED_ERR: 7,
            NOT_FOUND_ERR: 8,
            NOT_SUPPORTED_ERR: 9,
            INVALID_STATE_ERR: 11,
            INVALID_NODE_TYPE_ERR: 24
        };

        DOMException.prototype.toString = function() {
            return this.message;
        };

        api.dom = {
            arrayContains: arrayContains,
            isHtmlNamespace: isHtmlNamespace,
            parentElement: parentElement,
            getNodeIndex: getNodeIndex,
            getNodeLength: getNodeLength,
            getCommonAncestor: getCommonAncestor,
            isAncestorOf: isAncestorOf,
            isOrIsAncestorOf: isOrIsAncestorOf,
            getClosestAncestorIn: getClosestAncestorIn,
            isCharacterDataNode: isCharacterDataNode,
            isTextOrCommentNode: isTextOrCommentNode,
            insertAfter: insertAfter,
            splitDataNode: splitDataNode,
            getDocument: getDocument,
            getWindow: getWindow,
            getIframeWindow: getIframeWindow,
            getIframeDocument: getIframeDocument,
            getBody: getBody,
            isWindow: isWindow,
            getContentDocument: getContentDocument,
            getRootContainer: getRootContainer,
            comparePoints: comparePoints,
            isBrokenNode: isBrokenNode,
            inspectNode: inspectNode,
            getComputedStyleProperty: getComputedStyleProperty,
            createTestElement: createTestElement,
            removeNode: removeNode,
            fragmentFromNodeChildren: fragmentFromNodeChildren,
            createIterator: createIterator,
            DomPosition: DomPosition
        };

        api.DOMException = DOMException;
    });

    /*----------------------------------------------------------------------------------------------------------------*/

    // Pure JavaScript implementation of DOM Range
    api.createCoreModule("DomRange", ["DomUtil"], function(api, module) {
        var dom = api.dom;
        var util = api.util;
        var DomPosition = dom.DomPosition;
        var DOMException = api.DOMException;

        var isCharacterDataNode = dom.isCharacterDataNode;
        var getNodeIndex = dom.getNodeIndex;
        var isOrIsAncestorOf = dom.isOrIsAncestorOf;
        var getDocument = dom.getDocument;
        var comparePoints = dom.comparePoints;
        var splitDataNode = dom.splitDataNode;
        var getClosestAncestorIn = dom.getClosestAncestorIn;
        var getNodeLength = dom.getNodeLength;
        var arrayContains = dom.arrayContains;
        var getRootContainer = dom.getRootContainer;
        var crashyTextNodes = api.features.crashyTextNodes;

        var removeNode = dom.removeNode;

        /*----------------------------------------------------------------------------------------------------------------*/

        // Utility functions

        function isNonTextPartiallySelected(node, range) {
            return (node.nodeType != 3) &&
                   (isOrIsAncestorOf(node, range.startContainer) || isOrIsAncestorOf(node, range.endContainer));
        }

        function getRangeDocument(range) {
            return range.document || getDocument(range.startContainer);
        }

        function getRangeRoot(range) {
            return getRootContainer(range.startContainer);
        }

        function getBoundaryBeforeNode(node) {
            return new DomPosition(node.parentNode, getNodeIndex(node));
        }

        function getBoundaryAfterNode(node) {
            return new DomPosition(node.parentNode, getNodeIndex(node) + 1);
        }

        function insertNodeAtPosition(node, n, o) {
            var firstNodeInserted = node.nodeType == 11 ? node.firstChild : node;
            if (isCharacterDataNode(n)) {
                if (o == n.length) {
                    dom.insertAfter(node, n);
                } else {
                    n.parentNode.insertBefore(node, o == 0 ? n : splitDataNode(n, o));
                }
            } else if (o >= n.childNodes.length) {
                n.appendChild(node);
            } else {
                n.insertBefore(node, n.childNodes[o]);
            }
            return firstNodeInserted;
        }

        function rangesIntersect(rangeA, rangeB, touchingIsIntersecting) {
            assertRangeValid(rangeA);
            assertRangeValid(rangeB);

            if (getRangeDocument(rangeB) != getRangeDocument(rangeA)) {
                throw new DOMException("WRONG_DOCUMENT_ERR");
            }

            var startComparison = comparePoints(rangeA.startContainer, rangeA.startOffset, rangeB.endContainer, rangeB.endOffset),
                endComparison = comparePoints(rangeA.endContainer, rangeA.endOffset, rangeB.startContainer, rangeB.startOffset);

            return touchingIsIntersecting ? startComparison <= 0 && endComparison >= 0 : startComparison < 0 && endComparison > 0;
        }

        function cloneSubtree(iterator) {
            var partiallySelected;
            for (var node, frag = getRangeDocument(iterator.range).createDocumentFragment(), subIterator; node = iterator.next(); ) {
                partiallySelected = iterator.isPartiallySelectedSubtree();
                node = node.cloneNode(!partiallySelected);
                if (partiallySelected) {
                    subIterator = iterator.getSubtreeIterator();
                    node.appendChild(cloneSubtree(subIterator));
                    subIterator.detach();
                }

                if (node.nodeType == 10) { // DocumentType
                    throw new DOMException("HIERARCHY_REQUEST_ERR");
                }
                frag.appendChild(node);
            }
            return frag;
        }

        function iterateSubtree(rangeIterator, func, iteratorState) {
            var it, n;
            iteratorState = iteratorState || { stop: false };
            for (var node, subRangeIterator; node = rangeIterator.next(); ) {
                if (rangeIterator.isPartiallySelectedSubtree()) {
                    if (func(node) === false) {
                        iteratorState.stop = true;
                        return;
                    } else {
                        // The node is partially selected by the Range, so we can use a new RangeIterator on the portion of
                        // the node selected by the Range.
                        subRangeIterator = rangeIterator.getSubtreeIterator();
                        iterateSubtree(subRangeIterator, func, iteratorState);
                        subRangeIterator.detach();
                        if (iteratorState.stop) {
                            return;
                        }
                    }
                } else {
                    // The whole node is selected, so we can use efficient DOM iteration to iterate over the node and its
                    // descendants
                    it = dom.createIterator(node);
                    while ( (n = it.next()) ) {
                        if (func(n) === false) {
                            iteratorState.stop = true;
                            return;
                        }
                    }
                }
            }
        }

        function deleteSubtree(iterator) {
            var subIterator;
            while (iterator.next()) {
                if (iterator.isPartiallySelectedSubtree()) {
                    subIterator = iterator.getSubtreeIterator();
                    deleteSubtree(subIterator);
                    subIterator.detach();
                } else {
                    iterator.remove();
                }
            }
        }

        function extractSubtree(iterator) {
            for (var node, frag = getRangeDocument(iterator.range).createDocumentFragment(), subIterator; node = iterator.next(); ) {

                if (iterator.isPartiallySelectedSubtree()) {
                    node = node.cloneNode(false);
                    subIterator = iterator.getSubtreeIterator();
                    node.appendChild(extractSubtree(subIterator));
                    subIterator.detach();
                } else {
                    iterator.remove();
                }
                if (node.nodeType == 10) { // DocumentType
                    throw new DOMException("HIERARCHY_REQUEST_ERR");
                }
                frag.appendChild(node);
            }
            return frag;
        }

        function getNodesInRange(range, nodeTypes, filter) {
            var filterNodeTypes = !!(nodeTypes && nodeTypes.length), regex;
            var filterExists = !!filter;
            if (filterNodeTypes) {
                regex = new RegExp("^(" + nodeTypes.join("|") + ")$");
            }

            var nodes = [];
            iterateSubtree(new RangeIterator(range, false), function(node) {
                if (filterNodeTypes && !regex.test(node.nodeType)) {
                    return;
                }
                if (filterExists && !filter(node)) {
                    return;
                }
                // Don't include a boundary container if it is a character data node and the range does not contain any
                // of its character data. See issue 190.
                var sc = range.startContainer;
                if (node == sc && isCharacterDataNode(sc) && range.startOffset == sc.length) {
                    return;
                }

                var ec = range.endContainer;
                if (node == ec && isCharacterDataNode(ec) && range.endOffset == 0) {
                    return;
                }

                nodes.push(node);
            });
            return nodes;
        }

        function inspect(range) {
            var name = (typeof range.getName == "undefined") ? "Range" : range.getName();
            return "[" + name + "(" + dom.inspectNode(range.startContainer) + ":" + range.startOffset + ", " +
                    dom.inspectNode(range.endContainer) + ":" + range.endOffset + ")]";
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        // RangeIterator code partially borrows from IERange by Tim Ryan (http://github.com/timcameronryan/IERange)

        function RangeIterator(range, clonePartiallySelectedTextNodes) {
            this.range = range;
            this.clonePartiallySelectedTextNodes = clonePartiallySelectedTextNodes;


            if (!range.collapsed) {
                this.sc = range.startContainer;
                this.so = range.startOffset;
                this.ec = range.endContainer;
                this.eo = range.endOffset;
                var root = range.commonAncestorContainer;

                if (this.sc === this.ec && isCharacterDataNode(this.sc)) {
                    this.isSingleCharacterDataNode = true;
                    this._first = this._last = this._next = this.sc;
                } else {
                    this._first = this._next = (this.sc === root && !isCharacterDataNode(this.sc)) ?
                        this.sc.childNodes[this.so] : getClosestAncestorIn(this.sc, root, true);
                    this._last = (this.ec === root && !isCharacterDataNode(this.ec)) ?
                        this.ec.childNodes[this.eo - 1] : getClosestAncestorIn(this.ec, root, true);
                }
            }
        }

        RangeIterator.prototype = {
            _current: null,
            _next: null,
            _first: null,
            _last: null,
            isSingleCharacterDataNode: false,

            reset: function() {
                this._current = null;
                this._next = this._first;
            },

            hasNext: function() {
                return !!this._next;
            },

            next: function() {
                // Move to next node
                var current = this._current = this._next;
                if (current) {
                    this._next = (current !== this._last) ? current.nextSibling : null;

                    // Check for partially selected text nodes
                    if (isCharacterDataNode(current) && this.clonePartiallySelectedTextNodes) {
                        if (current === this.ec) {
                            (current = current.cloneNode(true)).deleteData(this.eo, current.length - this.eo);
                        }
                        if (this._current === this.sc) {
                            (current = current.cloneNode(true)).deleteData(0, this.so);
                        }
                    }
                }

                return current;
            },

            remove: function() {
                var current = this._current, start, end;

                if (isCharacterDataNode(current) && (current === this.sc || current === this.ec)) {
                    start = (current === this.sc) ? this.so : 0;
                    end = (current === this.ec) ? this.eo : current.length;
                    if (start != end) {
                        current.deleteData(start, end - start);
                    }
                } else {
                    if (current.parentNode) {
                        removeNode(current);
                    } else {
                    }
                }
            },

            // Checks if the current node is partially selected
            isPartiallySelectedSubtree: function() {
                var current = this._current;
                return isNonTextPartiallySelected(current, this.range);
            },

            getSubtreeIterator: function() {
                var subRange;
                if (this.isSingleCharacterDataNode) {
                    subRange = this.range.cloneRange();
                    subRange.collapse(false);
                } else {
                    subRange = new Range(getRangeDocument(this.range));
                    var current = this._current;
                    var startContainer = current, startOffset = 0, endContainer = current, endOffset = getNodeLength(current);

                    if (isOrIsAncestorOf(current, this.sc)) {
                        startContainer = this.sc;
                        startOffset = this.so;
                    }
                    if (isOrIsAncestorOf(current, this.ec)) {
                        endContainer = this.ec;
                        endOffset = this.eo;
                    }

                    updateBoundaries(subRange, startContainer, startOffset, endContainer, endOffset);
                }
                return new RangeIterator(subRange, this.clonePartiallySelectedTextNodes);
            },

            detach: function() {
                this.range = this._current = this._next = this._first = this._last = this.sc = this.so = this.ec = this.eo = null;
            }
        };

        /*----------------------------------------------------------------------------------------------------------------*/

        var beforeAfterNodeTypes = [1, 3, 4, 5, 7, 8, 10];
        var rootContainerNodeTypes = [2, 9, 11];
        var readonlyNodeTypes = [5, 6, 10, 12];
        var insertableNodeTypes = [1, 3, 4, 5, 7, 8, 10, 11];
        var surroundNodeTypes = [1, 3, 4, 5, 7, 8];

        function createAncestorFinder(nodeTypes) {
            return function(node, selfIsAncestor) {
                var t, n = selfIsAncestor ? node : node.parentNode;
                while (n) {
                    t = n.nodeType;
                    if (arrayContains(nodeTypes, t)) {
                        return n;
                    }
                    n = n.parentNode;
                }
                return null;
            };
        }

        var getDocumentOrFragmentContainer = createAncestorFinder( [9, 11] );
        var getReadonlyAncestor = createAncestorFinder(readonlyNodeTypes);
        var getDocTypeNotationEntityAncestor = createAncestorFinder( [6, 10, 12] );

        function assertNoDocTypeNotationEntityAncestor(node, allowSelf) {
            if (getDocTypeNotationEntityAncestor(node, allowSelf)) {
                throw new DOMException("INVALID_NODE_TYPE_ERR");
            }
        }

        function assertValidNodeType(node, invalidTypes) {
            if (!arrayContains(invalidTypes, node.nodeType)) {
                throw new DOMException("INVALID_NODE_TYPE_ERR");
            }
        }

        function assertValidOffset(node, offset) {
            if (offset < 0 || offset > (isCharacterDataNode(node) ? node.length : node.childNodes.length)) {
                throw new DOMException("INDEX_SIZE_ERR");
            }
        }

        function assertSameDocumentOrFragment(node1, node2) {
            if (getDocumentOrFragmentContainer(node1, true) !== getDocumentOrFragmentContainer(node2, true)) {
                throw new DOMException("WRONG_DOCUMENT_ERR");
            }
        }

        function assertNodeNotReadOnly(node) {
            if (getReadonlyAncestor(node, true)) {
                throw new DOMException("NO_MODIFICATION_ALLOWED_ERR");
            }
        }

        function assertNode(node, codeName) {
            if (!node) {
                throw new DOMException(codeName);
            }
        }

        function isValidOffset(node, offset) {
            return offset <= (isCharacterDataNode(node) ? node.length : node.childNodes.length);
        }

        function isRangeValid(range) {
            return (!!range.startContainer && !!range.endContainer &&
                    !(crashyTextNodes && (dom.isBrokenNode(range.startContainer) || dom.isBrokenNode(range.endContainer))) &&
                    getRootContainer(range.startContainer) == getRootContainer(range.endContainer) &&
                    isValidOffset(range.startContainer, range.startOffset) &&
                    isValidOffset(range.endContainer, range.endOffset));
        }

        function assertRangeValid(range) {
            if (!isRangeValid(range)) {
                throw new Error("Range error: Range is not valid. This usually happens after DOM mutation. Range: (" + range.inspect() + ")");
            }
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        // Test the browser's innerHTML support to decide how to implement createContextualFragment
        var styleEl = document.createElement("style");
        var htmlParsingConforms = false;
        try {
            styleEl.innerHTML = "<b>x</b>";
            htmlParsingConforms = (styleEl.firstChild.nodeType == 3); // Opera incorrectly creates an element node
        } catch (e) {
            // IE 6 and 7 throw
        }

        api.features.htmlParsingConforms = htmlParsingConforms;

        var createContextualFragment = htmlParsingConforms ?

            // Implementation as per HTML parsing spec, trusting in the browser's implementation of innerHTML. See
            // discussion and base code for this implementation at issue 67.
            // Spec: http://html5.org/specs/dom-parsing.html#extensions-to-the-range-interface
            // Thanks to Aleks Williams.
            function(fragmentStr) {
                // "Let node the context object's start's node."
                var node = this.startContainer;
                var doc = getDocument(node);

                // "If the context object's start's node is null, raise an INVALID_STATE_ERR
                // exception and abort these steps."
                if (!node) {
                    throw new DOMException("INVALID_STATE_ERR");
                }

                // "Let element be as follows, depending on node's interface:"
                // Document, Document Fragment: null
                var el = null;

                // "Element: node"
                if (node.nodeType == 1) {
                    el = node;

                // "Text, Comment: node's parentElement"
                } else if (isCharacterDataNode(node)) {
                    el = dom.parentElement(node);
                }

                // "If either element is null or element's ownerDocument is an HTML document
                // and element's local name is "html" and element's namespace is the HTML
                // namespace"
                if (el === null || (
                    el.nodeName == "HTML" &&
                    dom.isHtmlNamespace(getDocument(el).documentElement) &&
                    dom.isHtmlNamespace(el)
                )) {

                // "let element be a new Element with "body" as its local name and the HTML
                // namespace as its namespace.""
                    el = doc.createElement("body");
                } else {
                    el = el.cloneNode(false);
                }

                // "If the node's document is an HTML document: Invoke the HTML fragment parsing algorithm."
                // "If the node's document is an XML document: Invoke the XML fragment parsing algorithm."
                // "In either case, the algorithm must be invoked with fragment as the input
                // and element as the context element."
                el.innerHTML = fragmentStr;

                // "If this raises an exception, then abort these steps. Otherwise, let new
                // children be the nodes returned."

                // "Let fragment be a new DocumentFragment."
                // "Append all new children to fragment."
                // "Return fragment."
                return dom.fragmentFromNodeChildren(el);
            } :

            // In this case, innerHTML cannot be trusted, so fall back to a simpler, non-conformant implementation that
            // previous versions of Rangy used (with the exception of using a body element rather than a div)
            function(fragmentStr) {
                var doc = getRangeDocument(this);
                var el = doc.createElement("body");
                el.innerHTML = fragmentStr;

                return dom.fragmentFromNodeChildren(el);
            };

        function splitRangeBoundaries(range, positionsToPreserve) {
            assertRangeValid(range);

            var sc = range.startContainer, so = range.startOffset, ec = range.endContainer, eo = range.endOffset;
            var startEndSame = (sc === ec);

            if (isCharacterDataNode(ec) && eo > 0 && eo < ec.length) {
                splitDataNode(ec, eo, positionsToPreserve);
            }

            if (isCharacterDataNode(sc) && so > 0 && so < sc.length) {
                sc = splitDataNode(sc, so, positionsToPreserve);
                if (startEndSame) {
                    eo -= so;
                    ec = sc;
                } else if (ec == sc.parentNode && eo >= getNodeIndex(sc)) {
                    eo++;
                }
                so = 0;
            }
            range.setStartAndEnd(sc, so, ec, eo);
        }

        function rangeToHtml(range) {
            assertRangeValid(range);
            var container = range.commonAncestorContainer.parentNode.cloneNode(false);
            container.appendChild( range.cloneContents() );
            return container.innerHTML;
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        var rangeProperties = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed",
            "commonAncestorContainer"];

        var s2s = 0, s2e = 1, e2e = 2, e2s = 3;
        var n_b = 0, n_a = 1, n_b_a = 2, n_i = 3;

        util.extend(api.rangePrototype, {
            compareBoundaryPoints: function(how, range) {
                assertRangeValid(this);
                assertSameDocumentOrFragment(this.startContainer, range.startContainer);

                var nodeA, offsetA, nodeB, offsetB;
                var prefixA = (how == e2s || how == s2s) ? "start" : "end";
                var prefixB = (how == s2e || how == s2s) ? "start" : "end";
                nodeA = this[prefixA + "Container"];
                offsetA = this[prefixA + "Offset"];
                nodeB = range[prefixB + "Container"];
                offsetB = range[prefixB + "Offset"];
                return comparePoints(nodeA, offsetA, nodeB, offsetB);
            },

            insertNode: function(node) {
                assertRangeValid(this);
                assertValidNodeType(node, insertableNodeTypes);
                assertNodeNotReadOnly(this.startContainer);

                if (isOrIsAncestorOf(node, this.startContainer)) {
                    throw new DOMException("HIERARCHY_REQUEST_ERR");
                }

                // No check for whether the container of the start of the Range is of a type that does not allow
                // children of the type of node: the browser's DOM implementation should do this for us when we attempt
                // to add the node

                var firstNodeInserted = insertNodeAtPosition(node, this.startContainer, this.startOffset);
                this.setStartBefore(firstNodeInserted);
            },

            cloneContents: function() {
                assertRangeValid(this);

                var clone, frag;
                if (this.collapsed) {
                    return getRangeDocument(this).createDocumentFragment();
                } else {
                    if (this.startContainer === this.endContainer && isCharacterDataNode(this.startContainer)) {
                        clone = this.startContainer.cloneNode(true);
                        clone.data = clone.data.slice(this.startOffset, this.endOffset);
                        frag = getRangeDocument(this).createDocumentFragment();
                        frag.appendChild(clone);
                        return frag;
                    } else {
                        var iterator = new RangeIterator(this, true);
                        clone = cloneSubtree(iterator);
                        iterator.detach();
                    }
                    return clone;
                }
            },

            canSurroundContents: function() {
                assertRangeValid(this);
                assertNodeNotReadOnly(this.startContainer);
                assertNodeNotReadOnly(this.endContainer);

                // Check if the contents can be surrounded. Specifically, this means whether the range partially selects
                // no non-text nodes.
                var iterator = new RangeIterator(this, true);
                var boundariesInvalid = (iterator._first && (isNonTextPartiallySelected(iterator._first, this)) ||
                        (iterator._last && isNonTextPartiallySelected(iterator._last, this)));
                iterator.detach();
                return !boundariesInvalid;
            },

            surroundContents: function(node) {
                assertValidNodeType(node, surroundNodeTypes);

                if (!this.canSurroundContents()) {
                    throw new DOMException("INVALID_STATE_ERR");
                }

                // Extract the contents
                var content = this.extractContents();

                // Clear the children of the node
                if (node.hasChildNodes()) {
                    while (node.lastChild) {
                        node.removeChild(node.lastChild);
                    }
                }

                // Insert the new node and add the extracted contents
                insertNodeAtPosition(node, this.startContainer, this.startOffset);
                node.appendChild(content);

                this.selectNode(node);
            },

            cloneRange: function() {
                assertRangeValid(this);
                var range = new Range(getRangeDocument(this));
                var i = rangeProperties.length, prop;
                while (i--) {
                    prop = rangeProperties[i];
                    range[prop] = this[prop];
                }
                return range;
            },

            toString: function() {
                assertRangeValid(this);
                var sc = this.startContainer;
                if (sc === this.endContainer && isCharacterDataNode(sc)) {
                    return (sc.nodeType == 3 || sc.nodeType == 4) ? sc.data.slice(this.startOffset, this.endOffset) : "";
                } else {
                    var textParts = [], iterator = new RangeIterator(this, true);
                    iterateSubtree(iterator, function(node) {
                        // Accept only text or CDATA nodes, not comments
                        if (node.nodeType == 3 || node.nodeType == 4) {
                            textParts.push(node.data);
                        }
                    });
                    iterator.detach();
                    return textParts.join("");
                }
            },

            // The methods below are all non-standard. The following batch were introduced by Mozilla but have since
            // been removed from Mozilla.

            compareNode: function(node) {
                assertRangeValid(this);

                var parent = node.parentNode;
                var nodeIndex = getNodeIndex(node);

                if (!parent) {
                    throw new DOMException("NOT_FOUND_ERR");
                }

                var startComparison = this.comparePoint(parent, nodeIndex),
                    endComparison = this.comparePoint(parent, nodeIndex + 1);

                if (startComparison < 0) { // Node starts before
                    return (endComparison > 0) ? n_b_a : n_b;
                } else {
                    return (endComparison > 0) ? n_a : n_i;
                }
            },

            comparePoint: function(node, offset) {
                assertRangeValid(this);
                assertNode(node, "HIERARCHY_REQUEST_ERR");
                assertSameDocumentOrFragment(node, this.startContainer);

                if (comparePoints(node, offset, this.startContainer, this.startOffset) < 0) {
                    return -1;
                } else if (comparePoints(node, offset, this.endContainer, this.endOffset) > 0) {
                    return 1;
                }
                return 0;
            },

            createContextualFragment: createContextualFragment,

            toHtml: function() {
                return rangeToHtml(this);
            },

            // touchingIsIntersecting determines whether this method considers a node that borders a range intersects
            // with it (as in WebKit) or not (as in Gecko pre-1.9, and the default)
            intersectsNode: function(node, touchingIsIntersecting) {
                assertRangeValid(this);
                if (getRootContainer(node) != getRangeRoot(this)) {
                    return false;
                }

                var parent = node.parentNode, offset = getNodeIndex(node);
                if (!parent) {
                    return true;
                }

                var startComparison = comparePoints(parent, offset, this.endContainer, this.endOffset),
                    endComparison = comparePoints(parent, offset + 1, this.startContainer, this.startOffset);

                return touchingIsIntersecting ? startComparison <= 0 && endComparison >= 0 : startComparison < 0 && endComparison > 0;
            },

            isPointInRange: function(node, offset) {
                assertRangeValid(this);
                assertNode(node, "HIERARCHY_REQUEST_ERR");
                assertSameDocumentOrFragment(node, this.startContainer);

                return (comparePoints(node, offset, this.startContainer, this.startOffset) >= 0) &&
                       (comparePoints(node, offset, this.endContainer, this.endOffset) <= 0);
            },

            // The methods below are non-standard and invented by me.

            // Sharing a boundary start-to-end or end-to-start does not count as intersection.
            intersectsRange: function(range) {
                return rangesIntersect(this, range, false);
            },

            // Sharing a boundary start-to-end or end-to-start does count as intersection.
            intersectsOrTouchesRange: function(range) {
                return rangesIntersect(this, range, true);
            },

            intersection: function(range) {
                if (this.intersectsRange(range)) {
                    var startComparison = comparePoints(this.startContainer, this.startOffset, range.startContainer, range.startOffset),
                        endComparison = comparePoints(this.endContainer, this.endOffset, range.endContainer, range.endOffset);

                    var intersectionRange = this.cloneRange();
                    if (startComparison == -1) {
                        intersectionRange.setStart(range.startContainer, range.startOffset);
                    }
                    if (endComparison == 1) {
                        intersectionRange.setEnd(range.endContainer, range.endOffset);
                    }
                    return intersectionRange;
                }
                return null;
            },

            union: function(range) {
                if (this.intersectsOrTouchesRange(range)) {
                    var unionRange = this.cloneRange();
                    if (comparePoints(range.startContainer, range.startOffset, this.startContainer, this.startOffset) == -1) {
                        unionRange.setStart(range.startContainer, range.startOffset);
                    }
                    if (comparePoints(range.endContainer, range.endOffset, this.endContainer, this.endOffset) == 1) {
                        unionRange.setEnd(range.endContainer, range.endOffset);
                    }
                    return unionRange;
                } else {
                    throw new DOMException("Ranges do not intersect");
                }
            },

            containsNode: function(node, allowPartial) {
                if (allowPartial) {
                    return this.intersectsNode(node, false);
                } else {
                    return this.compareNode(node) == n_i;
                }
            },

            containsNodeContents: function(node) {
                return this.comparePoint(node, 0) >= 0 && this.comparePoint(node, getNodeLength(node)) <= 0;
            },

            containsRange: function(range) {
                var intersection = this.intersection(range);
                return intersection !== null && range.equals(intersection);
            },

            containsNodeText: function(node) {
                var nodeRange = this.cloneRange();
                nodeRange.selectNode(node);
                var textNodes = nodeRange.getNodes([3]);
                if (textNodes.length > 0) {
                    nodeRange.setStart(textNodes[0], 0);
                    var lastTextNode = textNodes.pop();
                    nodeRange.setEnd(lastTextNode, lastTextNode.length);
                    return this.containsRange(nodeRange);
                } else {
                    return this.containsNodeContents(node);
                }
            },

            getNodes: function(nodeTypes, filter) {
                assertRangeValid(this);
                return getNodesInRange(this, nodeTypes, filter);
            },

            getDocument: function() {
                return getRangeDocument(this);
            },

            collapseBefore: function(node) {
                this.setEndBefore(node);
                this.collapse(false);
            },

            collapseAfter: function(node) {
                this.setStartAfter(node);
                this.collapse(true);
            },

            getBookmark: function(containerNode) {
                var doc = getRangeDocument(this);
                var preSelectionRange = api.createRange(doc);
                containerNode = containerNode || dom.getBody(doc);
                preSelectionRange.selectNodeContents(containerNode);
                var range = this.intersection(preSelectionRange);
                var start = 0, end = 0;
                if (range) {
                    preSelectionRange.setEnd(range.startContainer, range.startOffset);
                    start = preSelectionRange.toString().length;
                    end = start + range.toString().length;
                }

                return {
                    start: start,
                    end: end,
                    containerNode: containerNode
                };
            },

            moveToBookmark: function(bookmark) {
                var containerNode = bookmark.containerNode;
                var charIndex = 0;
                this.setStart(containerNode, 0);
                this.collapse(true);
                var nodeStack = [containerNode], node, foundStart = false, stop = false;
                var nextCharIndex, i, childNodes;

                while (!stop && (node = nodeStack.pop())) {
                    if (node.nodeType == 3) {
                        nextCharIndex = charIndex + node.length;
                        if (!foundStart && bookmark.start >= charIndex && bookmark.start <= nextCharIndex) {
                            this.setStart(node, bookmark.start - charIndex);
                            foundStart = true;
                        }
                        if (foundStart && bookmark.end >= charIndex && bookmark.end <= nextCharIndex) {
                            this.setEnd(node, bookmark.end - charIndex);
                            stop = true;
                        }
                        charIndex = nextCharIndex;
                    } else {
                        childNodes = node.childNodes;
                        i = childNodes.length;
                        while (i--) {
                            nodeStack.push(childNodes[i]);
                        }
                    }
                }
            },

            getName: function() {
                return "DomRange";
            },

            equals: function(range) {
                return Range.rangesEqual(this, range);
            },

            isValid: function() {
                return isRangeValid(this);
            },

            inspect: function() {
                return inspect(this);
            },

            detach: function() {
                // In DOM4, detach() is now a no-op.
            }
        });

        function copyComparisonConstantsToObject(obj) {
            obj.START_TO_START = s2s;
            obj.START_TO_END = s2e;
            obj.END_TO_END = e2e;
            obj.END_TO_START = e2s;

            obj.NODE_BEFORE = n_b;
            obj.NODE_AFTER = n_a;
            obj.NODE_BEFORE_AND_AFTER = n_b_a;
            obj.NODE_INSIDE = n_i;
        }

        function copyComparisonConstants(constructor) {
            copyComparisonConstantsToObject(constructor);
            copyComparisonConstantsToObject(constructor.prototype);
        }

        function createRangeContentRemover(remover, boundaryUpdater) {
            return function() {
                assertRangeValid(this);

                var sc = this.startContainer, so = this.startOffset, root = this.commonAncestorContainer;

                var iterator = new RangeIterator(this, true);

                // Work out where to position the range after content removal
                var node, boundary;
                if (sc !== root) {
                    node = getClosestAncestorIn(sc, root, true);
                    boundary = getBoundaryAfterNode(node);
                    sc = boundary.node;
                    so = boundary.offset;
                }

                // Check none of the range is read-only
                iterateSubtree(iterator, assertNodeNotReadOnly);

                iterator.reset();

                // Remove the content
                var returnValue = remover(iterator);
                iterator.detach();

                // Move to the new position
                boundaryUpdater(this, sc, so, sc, so);

                return returnValue;
            };
        }

        function createPrototypeRange(constructor, boundaryUpdater) {
            function createBeforeAfterNodeSetter(isBefore, isStart) {
                return function(node) {
                    assertValidNodeType(node, beforeAfterNodeTypes);
                    assertValidNodeType(getRootContainer(node), rootContainerNodeTypes);

                    var boundary = (isBefore ? getBoundaryBeforeNode : getBoundaryAfterNode)(node);
                    (isStart ? setRangeStart : setRangeEnd)(this, boundary.node, boundary.offset);
                };
            }

            function setRangeStart(range, node, offset) {
                var ec = range.endContainer, eo = range.endOffset;
                if (node !== range.startContainer || offset !== range.startOffset) {
                    // Check the root containers of the range and the new boundary, and also check whether the new boundary
                    // is after the current end. In either case, collapse the range to the new position
                    if (getRootContainer(node) != getRootContainer(ec) || comparePoints(node, offset, ec, eo) == 1) {
                        ec = node;
                        eo = offset;
                    }
                    boundaryUpdater(range, node, offset, ec, eo);
                }
            }

            function setRangeEnd(range, node, offset) {
                var sc = range.startContainer, so = range.startOffset;
                if (node !== range.endContainer || offset !== range.endOffset) {
                    // Check the root containers of the range and the new boundary, and also check whether the new boundary
                    // is after the current end. In either case, collapse the range to the new position
                    if (getRootContainer(node) != getRootContainer(sc) || comparePoints(node, offset, sc, so) == -1) {
                        sc = node;
                        so = offset;
                    }
                    boundaryUpdater(range, sc, so, node, offset);
                }
            }

            // Set up inheritance
            var F = function() {};
            F.prototype = api.rangePrototype;
            constructor.prototype = new F();

            util.extend(constructor.prototype, {
                setStart: function(node, offset) {
                    assertNoDocTypeNotationEntityAncestor(node, true);
                    assertValidOffset(node, offset);

                    setRangeStart(this, node, offset);
                },

                setEnd: function(node, offset) {
                    assertNoDocTypeNotationEntityAncestor(node, true);
                    assertValidOffset(node, offset);

                    setRangeEnd(this, node, offset);
                },

                /**
                 * Convenience method to set a range's start and end boundaries. Overloaded as follows:
                 * - Two parameters (node, offset) creates a collapsed range at that position
                 * - Three parameters (node, startOffset, endOffset) creates a range contained with node starting at
                 *   startOffset and ending at endOffset
                 * - Four parameters (startNode, startOffset, endNode, endOffset) creates a range starting at startOffset in
                 *   startNode and ending at endOffset in endNode
                 */
                setStartAndEnd: function() {
                    var args = arguments;
                    var sc = args[0], so = args[1], ec = sc, eo = so;

                    switch (args.length) {
                        case 3:
                            eo = args[2];
                            break;
                        case 4:
                            ec = args[2];
                            eo = args[3];
                            break;
                    }

                    boundaryUpdater(this, sc, so, ec, eo);
                },

                setBoundary: function(node, offset, isStart) {
                    this["set" + (isStart ? "Start" : "End")](node, offset);
                },

                setStartBefore: createBeforeAfterNodeSetter(true, true),
                setStartAfter: createBeforeAfterNodeSetter(false, true),
                setEndBefore: createBeforeAfterNodeSetter(true, false),
                setEndAfter: createBeforeAfterNodeSetter(false, false),

                collapse: function(isStart) {
                    assertRangeValid(this);
                    if (isStart) {
                        boundaryUpdater(this, this.startContainer, this.startOffset, this.startContainer, this.startOffset);
                    } else {
                        boundaryUpdater(this, this.endContainer, this.endOffset, this.endContainer, this.endOffset);
                    }
                },

                selectNodeContents: function(node) {
                    assertNoDocTypeNotationEntityAncestor(node, true);

                    boundaryUpdater(this, node, 0, node, getNodeLength(node));
                },

                selectNode: function(node) {
                    assertNoDocTypeNotationEntityAncestor(node, false);
                    assertValidNodeType(node, beforeAfterNodeTypes);

                    var start = getBoundaryBeforeNode(node), end = getBoundaryAfterNode(node);
                    boundaryUpdater(this, start.node, start.offset, end.node, end.offset);
                },

                extractContents: createRangeContentRemover(extractSubtree, boundaryUpdater),

                deleteContents: createRangeContentRemover(deleteSubtree, boundaryUpdater),

                canSurroundContents: function() {
                    assertRangeValid(this);
                    assertNodeNotReadOnly(this.startContainer);
                    assertNodeNotReadOnly(this.endContainer);

                    // Check if the contents can be surrounded. Specifically, this means whether the range partially selects
                    // no non-text nodes.
                    var iterator = new RangeIterator(this, true);
                    var boundariesInvalid = (iterator._first && isNonTextPartiallySelected(iterator._first, this) ||
                            (iterator._last && isNonTextPartiallySelected(iterator._last, this)));
                    iterator.detach();
                    return !boundariesInvalid;
                },

                splitBoundaries: function() {
                    splitRangeBoundaries(this);
                },

                splitBoundariesPreservingPositions: function(positionsToPreserve) {
                    splitRangeBoundaries(this, positionsToPreserve);
                },

                normalizeBoundaries: function() {
                    assertRangeValid(this);

                    var sc = this.startContainer, so = this.startOffset, ec = this.endContainer, eo = this.endOffset;

                    var mergeForward = function(node) {
                        var sibling = node.nextSibling;
                        if (sibling && sibling.nodeType == node.nodeType) {
                            ec = node;
                            eo = node.length;
                            node.appendData(sibling.data);
                            removeNode(sibling);
                        }
                    };

                    var mergeBackward = function(node) {
                        var sibling = node.previousSibling;
                        if (sibling && sibling.nodeType == node.nodeType) {
                            sc = node;
                            var nodeLength = node.length;
                            so = sibling.length;
                            node.insertData(0, sibling.data);
                            removeNode(sibling);
                            if (sc == ec) {
                                eo += so;
                                ec = sc;
                            } else if (ec == node.parentNode) {
                                var nodeIndex = getNodeIndex(node);
                                if (eo == nodeIndex) {
                                    ec = node;
                                    eo = nodeLength;
                                } else if (eo > nodeIndex) {
                                    eo--;
                                }
                            }
                        }
                    };

                    var normalizeStart = true;
                    var sibling;

                    if (isCharacterDataNode(ec)) {
                        if (eo == ec.length) {
                            mergeForward(ec);
                        } else if (eo == 0) {
                            sibling = ec.previousSibling;
                            if (sibling && sibling.nodeType == ec.nodeType) {
                                eo = sibling.length;
                                if (sc == ec) {
                                    normalizeStart = false;
                                }
                                sibling.appendData(ec.data);
                                removeNode(ec);
                                ec = sibling;
                            }
                        }
                    } else {
                        if (eo > 0) {
                            var endNode = ec.childNodes[eo - 1];
                            if (endNode && isCharacterDataNode(endNode)) {
                                mergeForward(endNode);
                            }
                        }
                        normalizeStart = !this.collapsed;
                    }

                    if (normalizeStart) {
                        if (isCharacterDataNode(sc)) {
                            if (so == 0) {
                                mergeBackward(sc);
                            } else if (so == sc.length) {
                                sibling = sc.nextSibling;
                                if (sibling && sibling.nodeType == sc.nodeType) {
                                    if (ec == sibling) {
                                        ec = sc;
                                        eo += sc.length;
                                    }
                                    sc.appendData(sibling.data);
                                    removeNode(sibling);
                                }
                            }
                        } else {
                            if (so < sc.childNodes.length) {
                                var startNode = sc.childNodes[so];
                                if (startNode && isCharacterDataNode(startNode)) {
                                    mergeBackward(startNode);
                                }
                            }
                        }
                    } else {
                        sc = ec;
                        so = eo;
                    }

                    boundaryUpdater(this, sc, so, ec, eo);
                },

                collapseToPoint: function(node, offset) {
                    assertNoDocTypeNotationEntityAncestor(node, true);
                    assertValidOffset(node, offset);
                    this.setStartAndEnd(node, offset);
                }
            });

            copyComparisonConstants(constructor);
        }

        /*----------------------------------------------------------------------------------------------------------------*/

        // Updates commonAncestorContainer and collapsed after boundary change
        function updateCollapsedAndCommonAncestor(range) {
            range.collapsed = (range.startContainer === range.endContainer && range.startOffset === range.endOffset);
            range.commonAncestorContainer = range.collapsed ?
                range.startContainer : dom.getCommonAncestor(range.startContainer, range.endContainer);
        }

        function updateBoundaries(range, startContainer, startOffset, endContainer, endOffset) {
            range.startContainer = startContainer;
            range.startOffset = startOffset;
            range.endContainer = endContainer;
            range.endOffset = endOffset;
            range.document = dom.getDocument(startContainer);

            updateCollapsedAndCommonAncestor(range);
        }

        function Range(doc) {
            this.startContainer = doc;
            this.startOffset = 0;
            this.endContainer = doc;
            this.endOffset = 0;
            this.document = doc;
            updateCollapsedAndCommonAncestor(this);
        }

        createPrototypeRange(Range, updateBoundaries);

        util.extend(Range, {
            rangeProperties: rangeProperties,
            RangeIterator: RangeIterator,
            copyComparisonConstants: copyComparisonConstants,
            createPrototypeRange: createPrototypeRange,
            inspect: inspect,
            toHtml: rangeToHtml,
            getRangeDocument: getRangeDocument,
            rangesEqual: function(r1, r2) {
                return r1.startContainer === r2.startContainer &&
                    r1.startOffset === r2.startOffset &&
                    r1.endContainer === r2.endContainer &&
                    r1.endOffset === r2.endOffset;
            }
        });

        api.DomRange = Range;
    });

    /*----------------------------------------------------------------------------------------------------------------*/

    // Wrappers for the browser's native DOM Range and/or TextRange implementation
    api.createCoreModule("WrappedRange", ["DomRange"], function(api, module) {
        var WrappedRange, WrappedTextRange;
        var dom = api.dom;
        var util = api.util;
        var DomPosition = dom.DomPosition;
        var DomRange = api.DomRange;
        var getBody = dom.getBody;
        var getContentDocument = dom.getContentDocument;
        var isCharacterDataNode = dom.isCharacterDataNode;


        /*----------------------------------------------------------------------------------------------------------------*/

        if (api.features.implementsDomRange) {
            // This is a wrapper around the browser's native DOM Range. It has two aims:
            // - Provide workarounds for specific browser bugs
            // - provide convenient extensions, which are inherited from Rangy's DomRange

            (function() {
                var rangeProto;
                var rangeProperties = DomRange.rangeProperties;

                function updateRangeProperties(range) {
                    var i = rangeProperties.length, prop;
                    while (i--) {
                        prop = rangeProperties[i];
                        range[prop] = range.nativeRange[prop];
                    }
                    // Fix for broken collapsed property in IE 9.
                    range.collapsed = (range.startContainer === range.endContainer && range.startOffset === range.endOffset);
                }

                function updateNativeRange(range, startContainer, startOffset, endContainer, endOffset) {
                    var startMoved = (range.startContainer !== startContainer || range.startOffset != startOffset);
                    var endMoved = (range.endContainer !== endContainer || range.endOffset != endOffset);
                    var nativeRangeDifferent = !range.equals(range.nativeRange);

                    // Always set both boundaries for the benefit of IE9 (see issue 35)
                    if (startMoved || endMoved || nativeRangeDifferent) {
                        range.setEnd(endContainer, endOffset);
                        range.setStart(startContainer, startOffset);
                    }
                }

                var createBeforeAfterNodeSetter;

                WrappedRange = function(range) {
                    if (!range) {
                        throw module.createError("WrappedRange: Range must be specified");
                    }
                    this.nativeRange = range;
                    updateRangeProperties(this);
                };

                DomRange.createPrototypeRange(WrappedRange, updateNativeRange);

                rangeProto = WrappedRange.prototype;

                rangeProto.selectNode = function(node) {
                    this.nativeRange.selectNode(node);
                    updateRangeProperties(this);
                };

                rangeProto.cloneContents = function() {
                    return this.nativeRange.cloneContents();
                };

                // Due to a long-standing Firefox bug that I have not been able to find a reliable way to detect,
                // insertNode() is never delegated to the native range.

                rangeProto.surroundContents = function(node) {
                    this.nativeRange.surroundContents(node);
                    updateRangeProperties(this);
                };

                rangeProto.collapse = function(isStart) {
                    this.nativeRange.collapse(isStart);
                    updateRangeProperties(this);
                };

                rangeProto.cloneRange = function() {
                    return new WrappedRange(this.nativeRange.cloneRange());
                };

                rangeProto.refresh = function() {
                    updateRangeProperties(this);
                };

                rangeProto.toString = function() {
                    return this.nativeRange.toString();
                };

                // Create test range and node for feature detection

                var testTextNode = document.createTextNode("test");
                getBody(document).appendChild(testTextNode);
                var range = document.createRange();

                /*--------------------------------------------------------------------------------------------------------*/

                // Test for Firefox 2 bug that prevents moving the start of a Range to a point after its current end and
                // correct for it

                range.setStart(testTextNode, 0);
                range.setEnd(testTextNode, 0);

                try {
                    range.setStart(testTextNode, 1);

                    rangeProto.setStart = function(node, offset) {
                        this.nativeRange.setStart(node, offset);
                        updateRangeProperties(this);
                    };

                    rangeProto.setEnd = function(node, offset) {
                        this.nativeRange.setEnd(node, offset);
                        updateRangeProperties(this);
                    };

                    createBeforeAfterNodeSetter = function(name) {
                        return function(node) {
                            this.nativeRange[name](node);
                            updateRangeProperties(this);
                        };
                    };

                } catch(ex) {

                    rangeProto.setStart = function(node, offset) {
                        try {
                            this.nativeRange.setStart(node, offset);
                        } catch (ex) {
                            this.nativeRange.setEnd(node, offset);
                            this.nativeRange.setStart(node, offset);
                        }
                        updateRangeProperties(this);
                    };

                    rangeProto.setEnd = function(node, offset) {
                        try {
                            this.nativeRange.setEnd(node, offset);
                        } catch (ex) {
                            this.nativeRange.setStart(node, offset);
                            this.nativeRange.setEnd(node, offset);
                        }
                        updateRangeProperties(this);
                    };

                    createBeforeAfterNodeSetter = function(name, oppositeName) {
                        return function(node) {
                            try {
                                this.nativeRange[name](node);
                            } catch (ex) {
                                this.nativeRange[oppositeName](node);
                                this.nativeRange[name](node);
                            }
                            updateRangeProperties(this);
                        };
                    };
                }

                rangeProto.setStartBefore = createBeforeAfterNodeSetter("setStartBefore", "setEndBefore");
                rangeProto.setStartAfter = createBeforeAfterNodeSetter("setStartAfter", "setEndAfter");
                rangeProto.setEndBefore = createBeforeAfterNodeSetter("setEndBefore", "setStartBefore");
                rangeProto.setEndAfter = createBeforeAfterNodeSetter("setEndAfter", "setStartAfter");

                /*--------------------------------------------------------------------------------------------------------*/

                // Always use DOM4-compliant selectNodeContents implementation: it's simpler and less code than testing
                // whether the native implementation can be trusted
                rangeProto.selectNodeContents = function(node) {
                    this.setStartAndEnd(node, 0, dom.getNodeLength(node));
                };

                /*--------------------------------------------------------------------------------------------------------*/

                // Test for and correct WebKit bug that has the behaviour of compareBoundaryPoints round the wrong way for
                // constants START_TO_END and END_TO_START: https://bugs.webkit.org/show_bug.cgi?id=20738

                range.selectNodeContents(testTextNode);
                range.setEnd(testTextNode, 3);

                var range2 = document.createRange();
                range2.selectNodeContents(testTextNode);
                range2.setEnd(testTextNode, 4);
                range2.setStart(testTextNode, 2);

                if (range.compareBoundaryPoints(range.START_TO_END, range2) == -1 &&
                        range.compareBoundaryPoints(range.END_TO_START, range2) == 1) {
                    // This is the wrong way round, so correct for it

                    rangeProto.compareBoundaryPoints = function(type, range) {
                        range = range.nativeRange || range;
                        if (type == range.START_TO_END) {
                            type = range.END_TO_START;
                        } else if (type == range.END_TO_START) {
                            type = range.START_TO_END;
                        }
                        return this.nativeRange.compareBoundaryPoints(type, range);
                    };
                } else {
                    rangeProto.compareBoundaryPoints = function(type, range) {
                        return this.nativeRange.compareBoundaryPoints(type, range.nativeRange || range);
                    };
                }

                /*--------------------------------------------------------------------------------------------------------*/

                // Test for IE deleteContents() and extractContents() bug and correct it. See issue 107.

                var el = document.createElement("div");
                el.innerHTML = "123";
                var textNode = el.firstChild;
                var body = getBody(document);
                body.appendChild(el);

                range.setStart(textNode, 1);
                range.setEnd(textNode, 2);
                range.deleteContents();

                if (textNode.data == "13") {
                    // Behaviour is correct per DOM4 Range so wrap the browser's implementation of deleteContents() and
                    // extractContents()
                    rangeProto.deleteContents = function() {
                        this.nativeRange.deleteContents();
                        updateRangeProperties(this);
                    };

                    rangeProto.extractContents = function() {
                        var frag = this.nativeRange.extractContents();
                        updateRangeProperties(this);
                        return frag;
                    };
                } else {
                }

                body.removeChild(el);
                body = null;

                /*--------------------------------------------------------------------------------------------------------*/

                // Test for existence of createContextualFragment and delegate to it if it exists
                if (util.isHostMethod(range, "createContextualFragment")) {
                    rangeProto.createContextualFragment = function(fragmentStr) {
                        return this.nativeRange.createContextualFragment(fragmentStr);
                    };
                }

                /*--------------------------------------------------------------------------------------------------------*/

                // Clean up
                getBody(document).removeChild(testTextNode);

                rangeProto.getName = function() {
                    return "WrappedRange";
                };

                api.WrappedRange = WrappedRange;

                api.createNativeRange = function(doc) {
                    doc = getContentDocument(doc, module, "createNativeRange");
                    return doc.createRange();
                };
            })();
        }

        if (api.features.implementsTextRange) {
            /*
            This is a workaround for a bug where IE returns the wrong container element from the TextRange's parentElement()
            method. For example, in the following (where pipes denote the selection boundaries):

            <ul id="ul"><li id="a">| a </li><li id="b"> b |</li></ul>

            var range = document.selection.createRange();
            alert(range.parentElement().id); // Should alert "ul" but alerts "b"

            This method returns the common ancestor node of the following:
            - the parentElement() of the textRange
            - the parentElement() of the textRange after calling collapse(true)
            - the parentElement() of the textRange after calling collapse(false)
            */
            var getTextRangeContainerElement = function(textRange) {
                var parentEl = textRange.parentElement();
                var range = textRange.duplicate();
                range.collapse(true);
                var startEl = range.parentElement();
                range = textRange.duplicate();
                range.collapse(false);
                var endEl = range.parentElement();
                var startEndContainer = (startEl == endEl) ? startEl : dom.getCommonAncestor(startEl, endEl);

                return startEndContainer == parentEl ? startEndContainer : dom.getCommonAncestor(parentEl, startEndContainer);
            };

            var textRangeIsCollapsed = function(textRange) {
                return textRange.compareEndPoints("StartToEnd", textRange) == 0;
            };

            // Gets the boundary of a TextRange expressed as a node and an offset within that node. This function started
            // out as an improved version of code found in Tim Cameron Ryan's IERange (http://code.google.com/p/ierange/)
            // but has grown, fixing problems with line breaks in preformatted text, adding workaround for IE TextRange
            // bugs, handling for inputs and images, plus optimizations.
            var getTextRangeBoundaryPosition = function(textRange, wholeRangeContainerElement, isStart, isCollapsed, startInfo) {
                var workingRange = textRange.duplicate();
                workingRange.collapse(isStart);
                var containerElement = workingRange.parentElement();

                // Sometimes collapsing a TextRange that's at the start of a text node can move it into the previous node, so
                // check for that
                if (!dom.isOrIsAncestorOf(wholeRangeContainerElement, containerElement)) {
                    containerElement = wholeRangeContainerElement;
                }


                // Deal with nodes that cannot "contain rich HTML markup". In practice, this means form inputs, images and
                // similar. See http://msdn.microsoft.com/en-us/library/aa703950%28VS.85%29.aspx
                if (!containerElement.canHaveHTML) {
                    var pos = new DomPosition(containerElement.parentNode, dom.getNodeIndex(containerElement));
                    return {
                        boundaryPosition: pos,
                        nodeInfo: {
                            nodeIndex: pos.offset,
                            containerElement: pos.node
                        }
                    };
                }

                var workingNode = dom.getDocument(containerElement).createElement("span");

                // Workaround for HTML5 Shiv's insane violation of document.createElement(). See Rangy issue 104 and HTML5
                // Shiv issue 64: https://github.com/aFarkas/html5shiv/issues/64
                if (workingNode.parentNode) {
                    dom.removeNode(workingNode);
                }

                var comparison, workingComparisonType = isStart ? "StartToStart" : "StartToEnd";
                var previousNode, nextNode, boundaryPosition, boundaryNode;
                var start = (startInfo && startInfo.containerElement == containerElement) ? startInfo.nodeIndex : 0;
                var childNodeCount = containerElement.childNodes.length;
                var end = childNodeCount;

                // Check end first. Code within the loop assumes that the endth child node of the container is definitely
                // after the range boundary.
                var nodeIndex = end;

                while (true) {
                    if (nodeIndex == childNodeCount) {
                        containerElement.appendChild(workingNode);
                    } else {
                        containerElement.insertBefore(workingNode, containerElement.childNodes[nodeIndex]);
                    }
                    workingRange.moveToElementText(workingNode);
                    comparison = workingRange.compareEndPoints(workingComparisonType, textRange);
                    if (comparison == 0 || start == end) {
                        break;
                    } else if (comparison == -1) {
                        if (end == start + 1) {
                            // We know the endth child node is after the range boundary, so we must be done.
                            break;
                        } else {
                            start = nodeIndex;
                        }
                    } else {
                        end = (end == start + 1) ? start : nodeIndex;
                    }
                    nodeIndex = Math.floor((start + end) / 2);
                    containerElement.removeChild(workingNode);
                }


                // We've now reached or gone past the boundary of the text range we're interested in
                // so have identified the node we want
                boundaryNode = workingNode.nextSibling;

                if (comparison == -1 && boundaryNode && isCharacterDataNode(boundaryNode)) {
                    // This is a character data node (text, comment, cdata). The working range is collapsed at the start of
                    // the node containing the text range's boundary, so we move the end of the working range to the
                    // boundary point and measure the length of its text to get the boundary's offset within the node.
                    workingRange.setEndPoint(isStart ? "EndToStart" : "EndToEnd", textRange);

                    var offset;

                    if (/[\r\n]/.test(boundaryNode.data)) {
                        /*
                        For the particular case of a boundary within a text node containing rendered line breaks (within a
                        <pre> element, for example), we need a slightly complicated approach to get the boundary's offset in
                        IE. The facts:

                        - Each line break is represented as \r in the text node's data/nodeValue properties
                        - Each line break is represented as \r\n in the TextRange's 'text' property
                        - The 'text' property of the TextRange does not contain trailing line breaks

                        To get round the problem presented by the final fact above, we can use the fact that TextRange's
                        moveStart() and moveEnd() methods return the actual number of characters moved, which is not
                        necessarily the same as the number of characters it was instructed to move. The simplest approach is
                        to use this to store the characters moved when moving both the start and end of the range to the
                        start of the document body and subtracting the start offset from the end offset (the
                        "move-negative-gazillion" method). However, this is extremely slow when the document is large and
                        the range is near the end of it. Clearly doing the mirror image (i.e. moving the range boundaries to
                        the end of the document) has the same problem.

                        Another approach that works is to use moveStart() to move the start boundary of the range up to the
                        end boundary one character at a time and incrementing a counter with the value returned by the
                        moveStart() call. However, the check for whether the start boundary has reached the end boundary is
                        expensive, so this method is slow (although unlike "move-negative-gazillion" is largely unaffected
                        by the location of the range within the document).

                        The approach used below is a hybrid of the two methods above. It uses the fact that a string
                        containing the TextRange's 'text' property with each \r\n converted to a single \r character cannot
                        be longer than the text of the TextRange, so the start of the range is moved that length initially
                        and then a character at a time to make up for any trailing line breaks not contained in the 'text'
                        property. This has good performance in most situations compared to the previous two methods.
                        */
                        var tempRange = workingRange.duplicate();
                        var rangeLength = tempRange.text.replace(/\r\n/g, "\r").length;

                        offset = tempRange.moveStart("character", rangeLength);
                        while ( (comparison = tempRange.compareEndPoints("StartToEnd", tempRange)) == -1) {
                            offset++;
                            tempRange.moveStart("character", 1);
                        }
                    } else {
                        offset = workingRange.text.length;
                    }
                    boundaryPosition = new DomPosition(boundaryNode, offset);
                } else {

                    // If the boundary immediately follows a character data node and this is the end boundary, we should favour
                    // a position within that, and likewise for a start boundary preceding a character data node
                    previousNode = (isCollapsed || !isStart) && workingNode.previousSibling;
                    nextNode = (isCollapsed || isStart) && workingNode.nextSibling;
                    if (nextNode && isCharacterDataNode(nextNode)) {
                        boundaryPosition = new DomPosition(nextNode, 0);
                    } else if (previousNode && isCharacterDataNode(previousNode)) {
                        boundaryPosition = new DomPosition(previousNode, previousNode.data.length);
                    } else {
                        boundaryPosition = new DomPosition(containerElement, dom.getNodeIndex(workingNode));
                    }
                }

                // Clean up
                dom.removeNode(workingNode);

                return {
                    boundaryPosition: boundaryPosition,
                    nodeInfo: {
                        nodeIndex: nodeIndex,
                        containerElement: containerElement
                    }
                };
            };

            // Returns a TextRange representing the boundary of a TextRange expressed as a node and an offset within that
            // node. This function started out as an optimized version of code found in Tim Cameron Ryan's IERange
            // (http://code.google.com/p/ierange/)
            var createBoundaryTextRange = function(boundaryPosition, isStart) {
                var boundaryNode, boundaryParent, boundaryOffset = boundaryPosition.offset;
                var doc = dom.getDocument(boundaryPosition.node);
                var workingNode, childNodes, workingRange = getBody(doc).createTextRange();
                var nodeIsDataNode = isCharacterDataNode(boundaryPosition.node);

                if (nodeIsDataNode) {
                    boundaryNode = boundaryPosition.node;
                    boundaryParent = boundaryNode.parentNode;
                } else {
                    childNodes = boundaryPosition.node.childNodes;
                    boundaryNode = (boundaryOffset < childNodes.length) ? childNodes[boundaryOffset] : null;
                    boundaryParent = boundaryPosition.node;
                }

                // Position the range immediately before the node containing the boundary
                workingNode = doc.createElement("span");

                // Making the working element non-empty element persuades IE to consider the TextRange boundary to be within
                // the element rather than immediately before or after it
                workingNode.innerHTML = "&#feff;";

                // insertBefore is supposed to work like appendChild if the second parameter is null. However, a bug report
                // for IERange suggests that it can crash the browser: http://code.google.com/p/ierange/issues/detail?id=12
                if (boundaryNode) {
                    boundaryParent.insertBefore(workingNode, boundaryNode);
                } else {
                    boundaryParent.appendChild(workingNode);
                }

                workingRange.moveToElementText(workingNode);
                workingRange.collapse(!isStart);

                // Clean up
                boundaryParent.removeChild(workingNode);

                // Move the working range to the text offset, if required
                if (nodeIsDataNode) {
                    workingRange[isStart ? "moveStart" : "moveEnd"]("character", boundaryOffset);
                }

                return workingRange;
            };

            /*------------------------------------------------------------------------------------------------------------*/

            // This is a wrapper around a TextRange, providing full DOM Range functionality using rangy's DomRange as a
            // prototype

            WrappedTextRange = function(textRange) {
                this.textRange = textRange;
                this.refresh();
            };

            WrappedTextRange.prototype = new DomRange(document);

            WrappedTextRange.prototype.refresh = function() {
                var start, end, startBoundary;

                // TextRange's parentElement() method cannot be trusted. getTextRangeContainerElement() works around that.
                var rangeContainerElement = getTextRangeContainerElement(this.textRange);

                if (textRangeIsCollapsed(this.textRange)) {
                    end = start = getTextRangeBoundaryPosition(this.textRange, rangeContainerElement, true,
                        true).boundaryPosition;
                } else {
                    startBoundary = getTextRangeBoundaryPosition(this.textRange, rangeContainerElement, true, false);
                    start = startBoundary.boundaryPosition;

                    // An optimization used here is that if the start and end boundaries have the same parent element, the
                    // search scope for the end boundary can be limited to exclude the portion of the element that precedes
                    // the start boundary
                    end = getTextRangeBoundaryPosition(this.textRange, rangeContainerElement, false, false,
                        startBoundary.nodeInfo).boundaryPosition;
                }

                this.setStart(start.node, start.offset);
                this.setEnd(end.node, end.offset);
            };

            WrappedTextRange.prototype.getName = function() {
                return "WrappedTextRange";
            };

            DomRange.copyComparisonConstants(WrappedTextRange);

            var rangeToTextRange = function(range) {
                if (range.collapsed) {
                    return createBoundaryTextRange(new DomPosition(range.startContainer, range.startOffset), true);
                } else {
                    var startRange = createBoundaryTextRange(new DomPosition(range.startContainer, range.startOffset), true);
                    var endRange = createBoundaryTextRange(new DomPosition(range.endContainer, range.endOffset), false);
                    var textRange = getBody( DomRange.getRangeDocument(range) ).createTextRange();
                    textRange.setEndPoint("StartToStart", startRange);
                    textRange.setEndPoint("EndToEnd", endRange);
                    return textRange;
                }
            };

            WrappedTextRange.rangeToTextRange = rangeToTextRange;

            WrappedTextRange.prototype.toTextRange = function() {
                return rangeToTextRange(this);
            };

            api.WrappedTextRange = WrappedTextRange;

            // IE 9 and above have both implementations and Rangy makes both available. The next few lines sets which
            // implementation to use by default.
            if (!api.features.implementsDomRange || api.config.preferTextRange) {
                // Add WrappedTextRange as the Range property of the global object to allow expression like Range.END_TO_END to work
                var globalObj = (function(f) { return f("return this;")(); })(Function);
                if (typeof globalObj.Range == "undefined") {
                    globalObj.Range = WrappedTextRange;
                }

                api.createNativeRange = function(doc) {
                    doc = getContentDocument(doc, module, "createNativeRange");
                    return getBody(doc).createTextRange();
                };

                api.WrappedRange = WrappedTextRange;
            }
        }

        api.createRange = function(doc) {
            doc = getContentDocument(doc, module, "createRange");
            return new api.WrappedRange(api.createNativeRange(doc));
        };

        api.createRangyRange = function(doc) {
            doc = getContentDocument(doc, module, "createRangyRange");
            return new DomRange(doc);
        };

        util.createAliasForDeprecatedMethod(api, "createIframeRange", "createRange");
        util.createAliasForDeprecatedMethod(api, "createIframeRangyRange", "createRangyRange");

        api.addShimListener(function(win) {
            var doc = win.document;
            if (typeof doc.createRange == "undefined") {
                doc.createRange = function() {
                    return api.createRange(doc);
                };
            }
            doc = win = null;
        });
    });

    /*----------------------------------------------------------------------------------------------------------------*/

    // This module creates a selection object wrapper that conforms as closely as possible to the Selection specification
    // in the HTML Editing spec (http://dvcs.w3.org/hg/editing/raw-file/tip/editing.html#selections)
    api.createCoreModule("WrappedSelection", ["DomRange", "WrappedRange"], function(api, module) {
        api.config.checkSelectionRanges = true;

        var BOOLEAN = "boolean";
        var NUMBER = "number";
        var dom = api.dom;
        var util = api.util;
        var isHostMethod = util.isHostMethod;
        var DomRange = api.DomRange;
        var WrappedRange = api.WrappedRange;
        var DOMException = api.DOMException;
        var DomPosition = dom.DomPosition;
        var getNativeSelection;
        var selectionIsCollapsed;
        var features = api.features;
        var CONTROL = "Control";
        var getDocument = dom.getDocument;
        var getBody = dom.getBody;
        var rangesEqual = DomRange.rangesEqual;


        // Utility function to support direction parameters in the API that may be a string ("backward", "backwards",
        // "forward" or "forwards") or a Boolean (true for backwards).
        function isDirectionBackward(dir) {
            return (typeof dir == "string") ? /^backward(s)?$/i.test(dir) : !!dir;
        }

        function getWindow(win, methodName) {
            if (!win) {
                return window;
            } else if (dom.isWindow(win)) {
                return win;
            } else if (win instanceof WrappedSelection) {
                return win.win;
            } else {
                var doc = dom.getContentDocument(win, module, methodName);
                return dom.getWindow(doc);
            }
        }

        function getWinSelection(winParam) {
            return getWindow(winParam, "getWinSelection").getSelection();
        }

        function getDocSelection(winParam) {
            return getWindow(winParam, "getDocSelection").document.selection;
        }

        function winSelectionIsBackward(sel) {
            var backward = false;
            if (sel.anchorNode) {
                backward = (dom.comparePoints(sel.anchorNode, sel.anchorOffset, sel.focusNode, sel.focusOffset) == 1);
            }
            return backward;
        }

        // Test for the Range/TextRange and Selection features required
        // Test for ability to retrieve selection
        var implementsWinGetSelection = isHostMethod(window, "getSelection"),
            implementsDocSelection = util.isHostObject(document, "selection");

        features.implementsWinGetSelection = implementsWinGetSelection;
        features.implementsDocSelection = implementsDocSelection;

        var useDocumentSelection = implementsDocSelection && (!implementsWinGetSelection || api.config.preferTextRange);

        if (useDocumentSelection) {
            getNativeSelection = getDocSelection;
            api.isSelectionValid = function(winParam) {
                var doc = getWindow(winParam, "isSelectionValid").document, nativeSel = doc.selection;

                // Check whether the selection TextRange is actually contained within the correct document
                return (nativeSel.type != "None" || getDocument(nativeSel.createRange().parentElement()) == doc);
            };
        } else if (implementsWinGetSelection) {
            getNativeSelection = getWinSelection;
            api.isSelectionValid = function() {
                return true;
            };
        } else {
            module.fail("Neither document.selection or window.getSelection() detected.");
            return false;
        }

        api.getNativeSelection = getNativeSelection;

        var testSelection = getNativeSelection();

        // In Firefox, the selection is null in an iframe with display: none. See issue #138.
        if (!testSelection) {
            module.fail("Native selection was null (possibly issue 138?)");
            return false;
        }

        var testRange = api.createNativeRange(document);
        var body = getBody(document);

        // Obtaining a range from a selection
        var selectionHasAnchorAndFocus = util.areHostProperties(testSelection,
            ["anchorNode", "focusNode", "anchorOffset", "focusOffset"]);

        features.selectionHasAnchorAndFocus = selectionHasAnchorAndFocus;

        // Test for existence of native selection extend() method
        var selectionHasExtend = isHostMethod(testSelection, "extend");
        features.selectionHasExtend = selectionHasExtend;

        // Test if rangeCount exists
        var selectionHasRangeCount = (typeof testSelection.rangeCount == NUMBER);
        features.selectionHasRangeCount = selectionHasRangeCount;

        var selectionSupportsMultipleRanges = false;
        var collapsedNonEditableSelectionsSupported = true;

        var addRangeBackwardToNative = selectionHasExtend ?
            function(nativeSelection, range) {
                var doc = DomRange.getRangeDocument(range);
                var endRange = api.createRange(doc);
                endRange.collapseToPoint(range.endContainer, range.endOffset);
                nativeSelection.addRange(getNativeRange(endRange));
                nativeSelection.extend(range.startContainer, range.startOffset);
            } : null;

        if (util.areHostMethods(testSelection, ["addRange", "getRangeAt", "removeAllRanges"]) &&
                typeof testSelection.rangeCount == NUMBER && features.implementsDomRange) {

            (function() {
                // Previously an iframe was used but this caused problems in some circumstances in IE, so tests are
                // performed on the current document's selection. See issue 109.

                // Note also that if a selection previously existed, it is wiped and later restored by these tests. This
                // will result in the selection direction begin reversed if the original selection was backwards and the
                // browser does not support setting backwards selections (Internet Explorer, I'm looking at you).
                var sel = window.getSelection();
                if (sel) {
                    // Store the current selection
                    var originalSelectionRangeCount = sel.rangeCount;
                    var selectionHasMultipleRanges = (originalSelectionRangeCount > 1);
                    var originalSelectionRanges = [];
                    var originalSelectionBackward = winSelectionIsBackward(sel);
                    for (var i = 0; i < originalSelectionRangeCount; ++i) {
                        originalSelectionRanges[i] = sel.getRangeAt(i);
                    }

                    // Create some test elements
                    var testEl = dom.createTestElement(document, "", false);
                    var textNode = testEl.appendChild( document.createTextNode("\u00a0\u00a0\u00a0") );

                    // Test whether the native selection will allow a collapsed selection within a non-editable element
                    var r1 = document.createRange();

                    r1.setStart(textNode, 1);
                    r1.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(r1);
                    collapsedNonEditableSelectionsSupported = (sel.rangeCount == 1);
                    sel.removeAllRanges();

                    // Test whether the native selection is capable of supporting multiple ranges.
                    if (!selectionHasMultipleRanges) {
                        // Doing the original feature test here in Chrome 36 (and presumably later versions) prints a
                        // console error of "Discontiguous selection is not supported." that cannot be suppressed. There's
                        // nothing we can do about this while retaining the feature test so we have to resort to a browser
                        // sniff. I'm not happy about it. See
                        // https://code.google.com/p/chromium/issues/detail?id=399791
                        var chromeMatch = window.navigator.appVersion.match(/Chrome\/(.*?) /);
                        if (chromeMatch && parseInt(chromeMatch[1]) >= 36) {
                            selectionSupportsMultipleRanges = false;
                        } else {
                            var r2 = r1.cloneRange();
                            r1.setStart(textNode, 0);
                            r2.setEnd(textNode, 3);
                            r2.setStart(textNode, 2);
                            sel.addRange(r1);
                            sel.addRange(r2);
                            selectionSupportsMultipleRanges = (sel.rangeCount == 2);
                        }
                    }

                    // Clean up
                    dom.removeNode(testEl);
                    sel.removeAllRanges();

                    for (i = 0; i < originalSelectionRangeCount; ++i) {
                        if (i == 0 && originalSelectionBackward) {
                            if (addRangeBackwardToNative) {
                                addRangeBackwardToNative(sel, originalSelectionRanges[i]);
                            } else {
                                api.warn("Rangy initialization: original selection was backwards but selection has been restored forwards because the browser does not support Selection.extend");
                                sel.addRange(originalSelectionRanges[i]);
                            }
                        } else {
                            sel.addRange(originalSelectionRanges[i]);
                        }
                    }
                }
            })();
        }

        features.selectionSupportsMultipleRanges = selectionSupportsMultipleRanges;
        features.collapsedNonEditableSelectionsSupported = collapsedNonEditableSelectionsSupported;

        // ControlRanges
        var implementsControlRange = false, testControlRange;

        if (body && isHostMethod(body, "createControlRange")) {
            testControlRange = body.createControlRange();
            if (util.areHostProperties(testControlRange, ["item", "add"])) {
                implementsControlRange = true;
            }
        }
        features.implementsControlRange = implementsControlRange;

        // Selection collapsedness
        if (selectionHasAnchorAndFocus) {
            selectionIsCollapsed = function(sel) {
                return sel.anchorNode === sel.focusNode && sel.anchorOffset === sel.focusOffset;
            };
        } else {
            selectionIsCollapsed = function(sel) {
                return sel.rangeCount ? sel.getRangeAt(sel.rangeCount - 1).collapsed : false;
            };
        }

        function updateAnchorAndFocusFromRange(sel, range, backward) {
            var anchorPrefix = backward ? "end" : "start", focusPrefix = backward ? "start" : "end";
            sel.anchorNode = range[anchorPrefix + "Container"];
            sel.anchorOffset = range[anchorPrefix + "Offset"];
            sel.focusNode = range[focusPrefix + "Container"];
            sel.focusOffset = range[focusPrefix + "Offset"];
        }

        function updateAnchorAndFocusFromNativeSelection(sel) {
            var nativeSel = sel.nativeSelection;
            sel.anchorNode = nativeSel.anchorNode;
            sel.anchorOffset = nativeSel.anchorOffset;
            sel.focusNode = nativeSel.focusNode;
            sel.focusOffset = nativeSel.focusOffset;
        }

        function updateEmptySelection(sel) {
            sel.anchorNode = sel.focusNode = null;
            sel.anchorOffset = sel.focusOffset = 0;
            sel.rangeCount = 0;
            sel.isCollapsed = true;
            sel._ranges.length = 0;
        }

        function getNativeRange(range) {
            var nativeRange;
            if (range instanceof DomRange) {
                nativeRange = api.createNativeRange(range.getDocument());
                nativeRange.setEnd(range.endContainer, range.endOffset);
                nativeRange.setStart(range.startContainer, range.startOffset);
            } else if (range instanceof WrappedRange) {
                nativeRange = range.nativeRange;
            } else if (features.implementsDomRange && (range instanceof dom.getWindow(range.startContainer).Range)) {
                nativeRange = range;
            }
            return nativeRange;
        }

        function rangeContainsSingleElement(rangeNodes) {
            if (!rangeNodes.length || rangeNodes[0].nodeType != 1) {
                return false;
            }
            for (var i = 1, len = rangeNodes.length; i < len; ++i) {
                if (!dom.isAncestorOf(rangeNodes[0], rangeNodes[i])) {
                    return false;
                }
            }
            return true;
        }

        function getSingleElementFromRange(range) {
            var nodes = range.getNodes();
            if (!rangeContainsSingleElement(nodes)) {
                throw module.createError("getSingleElementFromRange: range " + range.inspect() + " did not consist of a single element");
            }
            return nodes[0];
        }

        // Simple, quick test which only needs to distinguish between a TextRange and a ControlRange
        function isTextRange(range) {
            return !!range && typeof range.text != "undefined";
        }

        function updateFromTextRange(sel, range) {
            // Create a Range from the selected TextRange
            var wrappedRange = new WrappedRange(range);
            sel._ranges = [wrappedRange];

            updateAnchorAndFocusFromRange(sel, wrappedRange, false);
            sel.rangeCount = 1;
            sel.isCollapsed = wrappedRange.collapsed;
        }

        function updateControlSelection(sel) {
            // Update the wrapped selection based on what's now in the native selection
            sel._ranges.length = 0;
            if (sel.docSelection.type == "None") {
                updateEmptySelection(sel);
            } else {
                var controlRange = sel.docSelection.createRange();
                if (isTextRange(controlRange)) {
                    // This case (where the selection type is "Control" and calling createRange() on the selection returns
                    // a TextRange) can happen in IE 9. It happens, for example, when all elements in the selected
                    // ControlRange have been removed from the ControlRange and removed from the document.
                    updateFromTextRange(sel, controlRange);
                } else {
                    sel.rangeCount = controlRange.length;
                    var range, doc = getDocument(controlRange.item(0));
                    for (var i = 0; i < sel.rangeCount; ++i) {
                        range = api.createRange(doc);
                        range.selectNode(controlRange.item(i));
                        sel._ranges.push(range);
                    }
                    sel.isCollapsed = sel.rangeCount == 1 && sel._ranges[0].collapsed;
                    updateAnchorAndFocusFromRange(sel, sel._ranges[sel.rangeCount - 1], false);
                }
            }
        }

        function addRangeToControlSelection(sel, range) {
            var controlRange = sel.docSelection.createRange();
            var rangeElement = getSingleElementFromRange(range);

            // Create a new ControlRange containing all the elements in the selected ControlRange plus the element
            // contained by the supplied range
            var doc = getDocument(controlRange.item(0));
            var newControlRange = getBody(doc).createControlRange();
            for (var i = 0, len = controlRange.length; i < len; ++i) {
                newControlRange.add(controlRange.item(i));
            }
            try {
                newControlRange.add(rangeElement);
            } catch (ex) {
                throw module.createError("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)");
            }
            newControlRange.select();

            // Update the wrapped selection based on what's now in the native selection
            updateControlSelection(sel);
        }

        var getSelectionRangeAt;

        if (isHostMethod(testSelection, "getRangeAt")) {
            // try/catch is present because getRangeAt() must have thrown an error in some browser and some situation.
            // Unfortunately, I didn't write a comment about the specifics and am now scared to take it out. Let that be a
            // lesson to us all, especially me.
            getSelectionRangeAt = function(sel, index) {
                try {
                    return sel.getRangeAt(index);
                } catch (ex) {
                    return null;
                }
            };
        } else if (selectionHasAnchorAndFocus) {
            getSelectionRangeAt = function(sel) {
                var doc = getDocument(sel.anchorNode);
                var range = api.createRange(doc);
                range.setStartAndEnd(sel.anchorNode, sel.anchorOffset, sel.focusNode, sel.focusOffset);

                // Handle the case when the selection was selected backwards (from the end to the start in the
                // document)
                if (range.collapsed !== this.isCollapsed) {
                    range.setStartAndEnd(sel.focusNode, sel.focusOffset, sel.anchorNode, sel.anchorOffset);
                }

                return range;
            };
        }

        function WrappedSelection(selection, docSelection, win) {
            this.nativeSelection = selection;
            this.docSelection = docSelection;
            this._ranges = [];
            this.win = win;
            this.refresh();
        }

        WrappedSelection.prototype = api.selectionPrototype;

        function deleteProperties(sel) {
            sel.win = sel.anchorNode = sel.focusNode = sel._ranges = null;
            sel.rangeCount = sel.anchorOffset = sel.focusOffset = 0;
            sel.detached = true;
        }

        var cachedRangySelections = [];

        function actOnCachedSelection(win, action) {
            var i = cachedRangySelections.length, cached, sel;
            while (i--) {
                cached = cachedRangySelections[i];
                sel = cached.selection;
                if (action == "deleteAll") {
                    deleteProperties(sel);
                } else if (cached.win == win) {
                    if (action == "delete") {
                        cachedRangySelections.splice(i, 1);
                        return true;
                    } else {
                        return sel;
                    }
                }
            }
            if (action == "deleteAll") {
                cachedRangySelections.length = 0;
            }
            return null;
        }

        var getSelection = function(win) {
            // Check if the parameter is a Rangy Selection object
            if (win && win instanceof WrappedSelection) {
                win.refresh();
                return win;
            }

            win = getWindow(win, "getNativeSelection");

            var sel = actOnCachedSelection(win);
            var nativeSel = getNativeSelection(win), docSel = implementsDocSelection ? getDocSelection(win) : null;
            if (sel) {
                sel.nativeSelection = nativeSel;
                sel.docSelection = docSel;
                sel.refresh();
            } else {
                sel = new WrappedSelection(nativeSel, docSel, win);
                cachedRangySelections.push( { win: win, selection: sel } );
            }
            return sel;
        };

        api.getSelection = getSelection;

        util.createAliasForDeprecatedMethod(api, "getIframeSelection", "getSelection");

        var selProto = WrappedSelection.prototype;

        function createControlSelection(sel, ranges) {
            // Ensure that the selection becomes of type "Control"
            var doc = getDocument(ranges[0].startContainer);
            var controlRange = getBody(doc).createControlRange();
            for (var i = 0, el, len = ranges.length; i < len; ++i) {
                el = getSingleElementFromRange(ranges[i]);
                try {
                    controlRange.add(el);
                } catch (ex) {
                    throw module.createError("setRanges(): Element within one of the specified Ranges could not be added to control selection (does it have layout?)");
                }
            }
            controlRange.select();

            // Update the wrapped selection based on what's now in the native selection
            updateControlSelection(sel);
        }

        // Selecting a range
        if (!useDocumentSelection && selectionHasAnchorAndFocus && util.areHostMethods(testSelection, ["removeAllRanges", "addRange"])) {
            selProto.removeAllRanges = function() {
                this.nativeSelection.removeAllRanges();
                updateEmptySelection(this);
            };

            var addRangeBackward = function(sel, range) {
                addRangeBackwardToNative(sel.nativeSelection, range);
                sel.refresh();
            };

            if (selectionHasRangeCount) {
                selProto.addRange = function(range, direction) {
                    if (implementsControlRange && implementsDocSelection && this.docSelection.type == CONTROL) {
                        addRangeToControlSelection(this, range);
                    } else {
                        if (isDirectionBackward(direction) && selectionHasExtend) {
                            addRangeBackward(this, range);
                        } else {
                            var previousRangeCount;
                            if (selectionSupportsMultipleRanges) {
                                previousRangeCount = this.rangeCount;
                            } else {
                                this.removeAllRanges();
                                previousRangeCount = 0;
                            }
                            // Clone the native range so that changing the selected range does not affect the selection.
                            // This is contrary to the spec but is the only way to achieve consistency between browsers. See
                            // issue 80.
                            var clonedNativeRange = getNativeRange(range).cloneRange();
                            try {
                                this.nativeSelection.addRange(clonedNativeRange);
                            } catch (ex) {
                            }

                            // Check whether adding the range was successful
                            this.rangeCount = this.nativeSelection.rangeCount;

                            if (this.rangeCount == previousRangeCount + 1) {
                                // The range was added successfully

                                // Check whether the range that we added to the selection is reflected in the last range extracted from
                                // the selection
                                if (api.config.checkSelectionRanges) {
                                    var nativeRange = getSelectionRangeAt(this.nativeSelection, this.rangeCount - 1);
                                    if (nativeRange && !rangesEqual(nativeRange, range)) {
                                        // Happens in WebKit with, for example, a selection placed at the start of a text node
                                        range = new WrappedRange(nativeRange);
                                    }
                                }
                                this._ranges[this.rangeCount - 1] = range;
                                updateAnchorAndFocusFromRange(this, range, selectionIsBackward(this.nativeSelection));
                                this.isCollapsed = selectionIsCollapsed(this);
                            } else {
                                // The range was not added successfully. The simplest thing is to refresh
                                this.refresh();
                            }
                        }
                    }
                };
            } else {
                selProto.addRange = function(range, direction) {
                    if (isDirectionBackward(direction) && selectionHasExtend) {
                        addRangeBackward(this, range);
                    } else {
                        this.nativeSelection.addRange(getNativeRange(range));
                        this.refresh();
                    }
                };
            }

            selProto.setRanges = function(ranges) {
                if (implementsControlRange && implementsDocSelection && ranges.length > 1) {
                    createControlSelection(this, ranges);
                } else {
                    this.removeAllRanges();
                    for (var i = 0, len = ranges.length; i < len; ++i) {
                        this.addRange(ranges[i]);
                    }
                }
            };
        } else if (isHostMethod(testSelection, "empty") && isHostMethod(testRange, "select") &&
                   implementsControlRange && useDocumentSelection) {

            selProto.removeAllRanges = function() {
                // Added try/catch as fix for issue #21
                try {
                    this.docSelection.empty();

                    // Check for empty() not working (issue #24)
                    if (this.docSelection.type != "None") {
                        // Work around failure to empty a control selection by instead selecting a TextRange and then
                        // calling empty()
                        var doc;
                        if (this.anchorNode) {
                            doc = getDocument(this.anchorNode);
                        } else if (this.docSelection.type == CONTROL) {
                            var controlRange = this.docSelection.createRange();
                            if (controlRange.length) {
                                doc = getDocument( controlRange.item(0) );
                            }
                        }
                        if (doc) {
                            var textRange = getBody(doc).createTextRange();
                            textRange.select();
                            this.docSelection.empty();
                        }
                    }
                } catch(ex) {}
                updateEmptySelection(this);
            };

            selProto.addRange = function(range) {
                if (this.docSelection.type == CONTROL) {
                    addRangeToControlSelection(this, range);
                } else {
                    api.WrappedTextRange.rangeToTextRange(range).select();
                    this._ranges[0] = range;
                    this.rangeCount = 1;
                    this.isCollapsed = this._ranges[0].collapsed;
                    updateAnchorAndFocusFromRange(this, range, false);
                }
            };

            selProto.setRanges = function(ranges) {
                this.removeAllRanges();
                var rangeCount = ranges.length;
                if (rangeCount > 1) {
                    createControlSelection(this, ranges);
                } else if (rangeCount) {
                    this.addRange(ranges[0]);
                }
            };
        } else {
            module.fail("No means of selecting a Range or TextRange was found");
            return false;
        }

        selProto.getRangeAt = function(index) {
            if (index < 0 || index >= this.rangeCount) {
                throw new DOMException("INDEX_SIZE_ERR");
            } else {
                // Clone the range to preserve selection-range independence. See issue 80.
                return this._ranges[index].cloneRange();
            }
        };

        var refreshSelection;

        if (useDocumentSelection) {
            refreshSelection = function(sel) {
                var range;
                if (api.isSelectionValid(sel.win)) {
                    range = sel.docSelection.createRange();
                } else {
                    range = getBody(sel.win.document).createTextRange();
                    range.collapse(true);
                }

                if (sel.docSelection.type == CONTROL) {
                    updateControlSelection(sel);
                } else if (isTextRange(range)) {
                    updateFromTextRange(sel, range);
                } else {
                    updateEmptySelection(sel);
                }
            };
        } else if (isHostMethod(testSelection, "getRangeAt") && typeof testSelection.rangeCount == NUMBER) {
            refreshSelection = function(sel) {
                if (implementsControlRange && implementsDocSelection && sel.docSelection.type == CONTROL) {
                    updateControlSelection(sel);
                } else {
                    sel._ranges.length = sel.rangeCount = sel.nativeSelection.rangeCount;
                    if (sel.rangeCount) {
                        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                            sel._ranges[i] = new api.WrappedRange(sel.nativeSelection.getRangeAt(i));
                        }
                        updateAnchorAndFocusFromRange(sel, sel._ranges[sel.rangeCount - 1], selectionIsBackward(sel.nativeSelection));
                        sel.isCollapsed = selectionIsCollapsed(sel);
                    } else {
                        updateEmptySelection(sel);
                    }
                }
            };
        } else if (selectionHasAnchorAndFocus && typeof testSelection.isCollapsed == BOOLEAN && typeof testRange.collapsed == BOOLEAN && features.implementsDomRange) {
            refreshSelection = function(sel) {
                var range, nativeSel = sel.nativeSelection;
                if (nativeSel.anchorNode) {
                    range = getSelectionRangeAt(nativeSel, 0);
                    sel._ranges = [range];
                    sel.rangeCount = 1;
                    updateAnchorAndFocusFromNativeSelection(sel);
                    sel.isCollapsed = selectionIsCollapsed(sel);
                } else {
                    updateEmptySelection(sel);
                }
            };
        } else {
            module.fail("No means of obtaining a Range or TextRange from the user's selection was found");
            return false;
        }

        selProto.refresh = function(checkForChanges) {
            var oldRanges = checkForChanges ? this._ranges.slice(0) : null;
            var oldAnchorNode = this.anchorNode, oldAnchorOffset = this.anchorOffset;

            refreshSelection(this);
            if (checkForChanges) {
                // Check the range count first
                var i = oldRanges.length;
                if (i != this._ranges.length) {
                    return true;
                }

                // Now check the direction. Checking the anchor position is the same is enough since we're checking all the
                // ranges after this
                if (this.anchorNode != oldAnchorNode || this.anchorOffset != oldAnchorOffset) {
                    return true;
                }

                // Finally, compare each range in turn
                while (i--) {
                    if (!rangesEqual(oldRanges[i], this._ranges[i])) {
                        return true;
                    }
                }
                return false;
            }
        };

        // Removal of a single range
        var removeRangeManually = function(sel, range) {
            var ranges = sel.getAllRanges();
            sel.removeAllRanges();
            for (var i = 0, len = ranges.length; i < len; ++i) {
                if (!rangesEqual(range, ranges[i])) {
                    sel.addRange(ranges[i]);
                }
            }
            if (!sel.rangeCount) {
                updateEmptySelection(sel);
            }
        };

        if (implementsControlRange && implementsDocSelection) {
            selProto.removeRange = function(range) {
                if (this.docSelection.type == CONTROL) {
                    var controlRange = this.docSelection.createRange();
                    var rangeElement = getSingleElementFromRange(range);

                    // Create a new ControlRange containing all the elements in the selected ControlRange minus the
                    // element contained by the supplied range
                    var doc = getDocument(controlRange.item(0));
                    var newControlRange = getBody(doc).createControlRange();
                    var el, removed = false;
                    for (var i = 0, len = controlRange.length; i < len; ++i) {
                        el = controlRange.item(i);
                        if (el !== rangeElement || removed) {
                            newControlRange.add(controlRange.item(i));
                        } else {
                            removed = true;
                        }
                    }
                    newControlRange.select();

                    // Update the wrapped selection based on what's now in the native selection
                    updateControlSelection(this);
                } else {
                    removeRangeManually(this, range);
                }
            };
        } else {
            selProto.removeRange = function(range) {
                removeRangeManually(this, range);
            };
        }

        // Detecting if a selection is backward
        var selectionIsBackward;
        if (!useDocumentSelection && selectionHasAnchorAndFocus && features.implementsDomRange) {
            selectionIsBackward = winSelectionIsBackward;

            selProto.isBackward = function() {
                return selectionIsBackward(this);
            };
        } else {
            selectionIsBackward = selProto.isBackward = function() {
                return false;
            };
        }

        // Create an alias for backwards compatibility. From 1.3, everything is "backward" rather than "backwards"
        selProto.isBackwards = selProto.isBackward;

        // Selection stringifier
        // This is conformant to the old HTML5 selections draft spec but differs from WebKit and Mozilla's implementation.
        // The current spec does not yet define this method.
        selProto.toString = function() {
            var rangeTexts = [];
            for (var i = 0, len = this.rangeCount; i < len; ++i) {
                rangeTexts[i] = "" + this._ranges[i];
            }
            return rangeTexts.join("");
        };

        function assertNodeInSameDocument(sel, node) {
            if (sel.win.document != getDocument(node)) {
                throw new DOMException("WRONG_DOCUMENT_ERR");
            }
        }

        // No current browser conforms fully to the spec for this method, so Rangy's own method is always used
        selProto.collapse = function(node, offset) {
            assertNodeInSameDocument(this, node);
            var range = api.createRange(node);
            range.collapseToPoint(node, offset);
            this.setSingleRange(range);
            this.isCollapsed = true;
        };

        selProto.collapseToStart = function() {
            if (this.rangeCount) {
                var range = this._ranges[0];
                this.collapse(range.startContainer, range.startOffset);
            } else {
                throw new DOMException("INVALID_STATE_ERR");
            }
        };

        selProto.collapseToEnd = function() {
            if (this.rangeCount) {
                var range = this._ranges[this.rangeCount - 1];
                this.collapse(range.endContainer, range.endOffset);
            } else {
                throw new DOMException("INVALID_STATE_ERR");
            }
        };

        // The spec is very specific on how selectAllChildren should be implemented and not all browsers implement it as
        // specified so the native implementation is never used by Rangy.
        selProto.selectAllChildren = function(node) {
            assertNodeInSameDocument(this, node);
            var range = api.createRange(node);
            range.selectNodeContents(node);
            this.setSingleRange(range);
        };

        selProto.deleteFromDocument = function() {
            // Sepcial behaviour required for IE's control selections
            if (implementsControlRange && implementsDocSelection && this.docSelection.type == CONTROL) {
                var controlRange = this.docSelection.createRange();
                var element;
                while (controlRange.length) {
                    element = controlRange.item(0);
                    controlRange.remove(element);
                    dom.removeNode(element);
                }
                this.refresh();
            } else if (this.rangeCount) {
                var ranges = this.getAllRanges();
                if (ranges.length) {
                    this.removeAllRanges();
                    for (var i = 0, len = ranges.length; i < len; ++i) {
                        ranges[i].deleteContents();
                    }
                    // The spec says nothing about what the selection should contain after calling deleteContents on each
                    // range. Firefox moves the selection to where the final selected range was, so we emulate that
                    this.addRange(ranges[len - 1]);
                }
            }
        };

        // The following are non-standard extensions
        selProto.eachRange = function(func, returnValue) {
            for (var i = 0, len = this._ranges.length; i < len; ++i) {
                if ( func( this.getRangeAt(i) ) ) {
                    return returnValue;
                }
            }
        };

        selProto.getAllRanges = function() {
            var ranges = [];
            this.eachRange(function(range) {
                ranges.push(range);
            });
            return ranges;
        };

        selProto.setSingleRange = function(range, direction) {
            this.removeAllRanges();
            this.addRange(range, direction);
        };

        selProto.callMethodOnEachRange = function(methodName, params) {
            var results = [];
            this.eachRange( function(range) {
                results.push( range[methodName].apply(range, params || []) );
            } );
            return results;
        };

        function createStartOrEndSetter(isStart) {
            return function(node, offset) {
                var range;
                if (this.rangeCount) {
                    range = this.getRangeAt(0);
                    range["set" + (isStart ? "Start" : "End")](node, offset);
                } else {
                    range = api.createRange(this.win.document);
                    range.setStartAndEnd(node, offset);
                }
                this.setSingleRange(range, this.isBackward());
            };
        }

        selProto.setStart = createStartOrEndSetter(true);
        selProto.setEnd = createStartOrEndSetter(false);

        // Add select() method to Range prototype. Any existing selection will be removed.
        api.rangePrototype.select = function(direction) {
            getSelection( this.getDocument() ).setSingleRange(this, direction);
        };

        selProto.changeEachRange = function(func) {
            var ranges = [];
            var backward = this.isBackward();

            this.eachRange(function(range) {
                func(range);
                ranges.push(range);
            });

            this.removeAllRanges();
            if (backward && ranges.length == 1) {
                this.addRange(ranges[0], "backward");
            } else {
                this.setRanges(ranges);
            }
        };

        selProto.containsNode = function(node, allowPartial) {
            return this.eachRange( function(range) {
                return range.containsNode(node, allowPartial);
            }, true ) || false;
        };

        selProto.getBookmark = function(containerNode) {
            return {
                backward: this.isBackward(),
                rangeBookmarks: this.callMethodOnEachRange("getBookmark", [containerNode])
            };
        };

        selProto.moveToBookmark = function(bookmark) {
            var selRanges = [];
            for (var i = 0, rangeBookmark, range; rangeBookmark = bookmark.rangeBookmarks[i++]; ) {
                range = api.createRange(this.win);
                range.moveToBookmark(rangeBookmark);
                selRanges.push(range);
            }
            if (bookmark.backward) {
                this.setSingleRange(selRanges[0], "backward");
            } else {
                this.setRanges(selRanges);
            }
        };

        selProto.saveRanges = function() {
            return {
                backward: this.isBackward(),
                ranges: this.callMethodOnEachRange("cloneRange")
            };
        };

        selProto.restoreRanges = function(selRanges) {
            this.removeAllRanges();
            for (var i = 0, range; range = selRanges.ranges[i]; ++i) {
                this.addRange(range, (selRanges.backward && i == 0));
            }
        };

        selProto.toHtml = function() {
            var rangeHtmls = [];
            this.eachRange(function(range) {
                rangeHtmls.push( DomRange.toHtml(range) );
            });
            return rangeHtmls.join("");
        };

        if (features.implementsTextRange) {
            selProto.getNativeTextRange = function() {
                var sel, textRange;
                if ( (sel = this.docSelection) ) {
                    var range = sel.createRange();
                    if (isTextRange(range)) {
                        return range;
                    } else {
                        throw module.createError("getNativeTextRange: selection is a control selection");
                    }
                } else if (this.rangeCount > 0) {
                    return api.WrappedTextRange.rangeToTextRange( this.getRangeAt(0) );
                } else {
                    throw module.createError("getNativeTextRange: selection contains no range");
                }
            };
        }

        function inspect(sel) {
            var rangeInspects = [];
            var anchor = new DomPosition(sel.anchorNode, sel.anchorOffset);
            var focus = new DomPosition(sel.focusNode, sel.focusOffset);
            var name = (typeof sel.getName == "function") ? sel.getName() : "Selection";

            if (typeof sel.rangeCount != "undefined") {
                for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                    rangeInspects[i] = DomRange.inspect(sel.getRangeAt(i));
                }
            }
            return "[" + name + "(Ranges: " + rangeInspects.join(", ") +
                    ")(anchor: " + anchor.inspect() + ", focus: " + focus.inspect() + "]";
        }

        selProto.getName = function() {
            return "WrappedSelection";
        };

        selProto.inspect = function() {
            return inspect(this);
        };

        selProto.detach = function() {
            actOnCachedSelection(this.win, "delete");
            deleteProperties(this);
        };

        WrappedSelection.detachAll = function() {
            actOnCachedSelection(null, "deleteAll");
        };

        WrappedSelection.inspect = inspect;
        WrappedSelection.isDirectionBackward = isDirectionBackward;

        api.Selection = WrappedSelection;

        api.selectionPrototype = selProto;

        api.addShimListener(function(win) {
            if (typeof win.getSelection == "undefined") {
                win.getSelection = function() {
                    return getSelection(win);
                };
            }
            win = null;
        });
    });
    

    /*----------------------------------------------------------------------------------------------------------------*/

    // Wait for document to load before initializing
    var docReady = false;

    var loadHandler = function(e) {
        if (!docReady) {
            docReady = true;
            if (!api.initialized && api.config.autoInitialize) {
                init();
            }
        }
    };

    if (isBrowser) {
        // Test whether the document has already been loaded and initialize immediately if so
        if (document.readyState == "complete") {
            loadHandler();
        } else {
            if (isHostMethod(document, "addEventListener")) {
                document.addEventListener("DOMContentLoaded", loadHandler, false);
            }

            // Add a fallback in case the DOMContentLoaded event isn't supported
            addListener(window, "load", loadHandler);
        }
    }

    return api;
}, this);
/**
 * Class Applier module for Rangy.
 * Adds, removes and toggles classes on Ranges and Selections
 *
 * Part of Rangy, a cross-browser JavaScript range and selection library
 * https://github.com/timdown/rangy
 *
 * Depends on Rangy core.
 *
 * Copyright 2015, Tim Down
 * Licensed under the MIT license.
 * Version: 1.3.0
 * Build date: 10 May 2015
 */
(function(factory, root) {
    if (typeof define == "function" && define.amd) {
        // AMD. Register as an anonymous module with a dependency on Rangy.
        define(["./rangy-core"], factory);
    } else if (typeof module != "undefined" && typeof exports == "object") {
        // Node/CommonJS style
        module.exports = factory( require("rangy") );
    } else {
        // No AMD or CommonJS support so we use the rangy property of root (probably the global variable)
        factory(root.rangy);
    }
})(function(rangy) {
    rangy.createModule("ClassApplier", ["WrappedSelection"], function(api, module) {
        var dom = api.dom;
        var DomPosition = dom.DomPosition;
        var contains = dom.arrayContains;
        var util = api.util;
        var forEach = util.forEach;


        var defaultTagName = "span";
        var createElementNSSupported = util.isHostMethod(document, "createElementNS");

        function each(obj, func) {
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    if (func(i, obj[i]) === false) {
                        return false;
                    }
                }
            }
            return true;
        }

        function trim(str) {
            return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
        }

        function classNameContainsClass(fullClassName, className) {
            return !!fullClassName && new RegExp("(?:^|\\s)" + className + "(?:\\s|$)").test(fullClassName);
        }

        // Inefficient, inelegant nonsense for IE's svg element, which has no classList and non-HTML className implementation
        function hasClass(el, className) {
            if (typeof el.classList == "object") {
                return el.classList.contains(className);
            } else {
                var classNameSupported = (typeof el.className == "string");
                var elClass = classNameSupported ? el.className : el.getAttribute("class");
                return classNameContainsClass(elClass, className);
            }
        }

        function addClass(el, className) {
            if (typeof el.classList == "object") {
                el.classList.add(className);
            } else {
                var classNameSupported = (typeof el.className == "string");
                var elClass = classNameSupported ? el.className : el.getAttribute("class");
                if (elClass) {
                    if (!classNameContainsClass(elClass, className)) {
                        elClass += " " + className;
                    }
                } else {
                    elClass = className;
                }
                if (classNameSupported) {
                    el.className = elClass;
                } else {
                    el.setAttribute("class", elClass);
                }
            }
        }

        var removeClass = (function() {
            function replacer(matched, whiteSpaceBefore, whiteSpaceAfter) {
                return (whiteSpaceBefore && whiteSpaceAfter) ? " " : "";
            }

            return function(el, className) {
                if (typeof el.classList == "object") {
                    el.classList.remove(className);
                } else {
                    var classNameSupported = (typeof el.className == "string");
                    var elClass = classNameSupported ? el.className : el.getAttribute("class");
                    elClass = elClass.replace(new RegExp("(^|\\s)" + className + "(\\s|$)"), replacer);
                    if (classNameSupported) {
                        el.className = elClass;
                    } else {
                        el.setAttribute("class", elClass);
                    }
                }
            };
        })();

        function getClass(el) {
            var classNameSupported = (typeof el.className == "string");
            return classNameSupported ? el.className : el.getAttribute("class");
        }

        function sortClassName(className) {
            return className && className.split(/\s+/).sort().join(" ");
        }

        function getSortedClassName(el) {
            return sortClassName( getClass(el) );
        }

        function haveSameClasses(el1, el2) {
            return getSortedClassName(el1) == getSortedClassName(el2);
        }

        function hasAllClasses(el, className) {
            var classes = className.split(/\s+/);
            for (var i = 0, len = classes.length; i < len; ++i) {
                if (!hasClass(el, trim(classes[i]))) {
                    return false;
                }
            }
            return true;
        }

        function canTextBeStyled(textNode) {
            var parent = textNode.parentNode;
            return (parent && parent.nodeType == 1 && !/^(textarea|style|script|select|iframe)$/i.test(parent.nodeName));
        }

        function movePosition(position, oldParent, oldIndex, newParent, newIndex) {
            var posNode = position.node, posOffset = position.offset;
            var newNode = posNode, newOffset = posOffset;

            if (posNode == newParent && posOffset > newIndex) {
                ++newOffset;
            }

            if (posNode == oldParent && (posOffset == oldIndex  || posOffset == oldIndex + 1)) {
                newNode = newParent;
                newOffset += newIndex - oldIndex;
            }

            if (posNode == oldParent && posOffset > oldIndex + 1) {
                --newOffset;
            }

            position.node = newNode;
            position.offset = newOffset;
        }

        function movePositionWhenRemovingNode(position, parentNode, index) {
            if (position.node == parentNode && position.offset > index) {
                --position.offset;
            }
        }

        function movePreservingPositions(node, newParent, newIndex, positionsToPreserve) {
            // For convenience, allow newIndex to be -1 to mean "insert at the end".
            if (newIndex == -1) {
                newIndex = newParent.childNodes.length;
            }

            var oldParent = node.parentNode;
            var oldIndex = dom.getNodeIndex(node);

            forEach(positionsToPreserve, function(position) {
                movePosition(position, oldParent, oldIndex, newParent, newIndex);
            });

            // Now actually move the node.
            if (newParent.childNodes.length == newIndex) {
                newParent.appendChild(node);
            } else {
                newParent.insertBefore(node, newParent.childNodes[newIndex]);
            }
        }

        function removePreservingPositions(node, positionsToPreserve) {

            var oldParent = node.parentNode;
            var oldIndex = dom.getNodeIndex(node);

            forEach(positionsToPreserve, function(position) {
                movePositionWhenRemovingNode(position, oldParent, oldIndex);
            });

            dom.removeNode(node);
        }

        function moveChildrenPreservingPositions(node, newParent, newIndex, removeNode, positionsToPreserve) {
            var child, children = [];
            while ( (child = node.firstChild) ) {
                movePreservingPositions(child, newParent, newIndex++, positionsToPreserve);
                children.push(child);
            }
            if (removeNode) {
                removePreservingPositions(node, positionsToPreserve);
            }
            return children;
        }

        function replaceWithOwnChildrenPreservingPositions(element, positionsToPreserve) {
            return moveChildrenPreservingPositions(element, element.parentNode, dom.getNodeIndex(element), true, positionsToPreserve);
        }

        function rangeSelectsAnyText(range, textNode) {
            var textNodeRange = range.cloneRange();
            textNodeRange.selectNodeContents(textNode);

            var intersectionRange = textNodeRange.intersection(range);
            var text = intersectionRange ? intersectionRange.toString() : "";

            return text != "";
        }

        function getEffectiveTextNodes(range) {
            var nodes = range.getNodes([3]);

            // Optimization as per issue 145

            // Remove non-intersecting text nodes from the start of the range
            var start = 0, node;
            while ( (node = nodes[start]) && !rangeSelectsAnyText(range, node) ) {
                ++start;
            }

            // Remove non-intersecting text nodes from the start of the range
            var end = nodes.length - 1;
            while ( (node = nodes[end]) && !rangeSelectsAnyText(range, node) ) {
                --end;
            }

            return nodes.slice(start, end + 1);
        }

        function elementsHaveSameNonClassAttributes(el1, el2) {
            if (el1.attributes.length != el2.attributes.length) return false;
            for (var i = 0, len = el1.attributes.length, attr1, attr2, name; i < len; ++i) {
                attr1 = el1.attributes[i];
                name = attr1.name;
                if (name != "class") {
                    attr2 = el2.attributes.getNamedItem(name);
                    if ( (attr1 === null) != (attr2 === null) ) return false;
                    if (attr1.specified != attr2.specified) return false;
                    if (attr1.specified && attr1.nodeValue !== attr2.nodeValue) return false;
                }
            }
            return true;
        }

        function elementHasNonClassAttributes(el, exceptions) {
            for (var i = 0, len = el.attributes.length, attrName; i < len; ++i) {
                attrName = el.attributes[i].name;
                if ( !(exceptions && contains(exceptions, attrName)) && el.attributes[i].specified && attrName != "class") {
                    return true;
                }
            }
            return false;
        }

        var getComputedStyleProperty = dom.getComputedStyleProperty;
        var isEditableElement = (function() {
            var testEl = document.createElement("div");
            return typeof testEl.isContentEditable == "boolean" ?
                function (node) {
                    return node && node.nodeType == 1 && node.isContentEditable;
                } :
                function (node) {
                    if (!node || node.nodeType != 1 || node.contentEditable == "false") {
                        return false;
                    }
                    return node.contentEditable == "true" || isEditableElement(node.parentNode);
                };
        })();

        function isEditingHost(node) {
            var parent;
            return node && node.nodeType == 1 &&
                (( (parent = node.parentNode) && parent.nodeType == 9 && parent.designMode == "on") ||
                (isEditableElement(node) && !isEditableElement(node.parentNode)));
        }

        function isEditable(node) {
            return (isEditableElement(node) || (node.nodeType != 1 && isEditableElement(node.parentNode))) && !isEditingHost(node);
        }

        var inlineDisplayRegex = /^inline(-block|-table)?$/i;

        function isNonInlineElement(node) {
            return node && node.nodeType == 1 && !inlineDisplayRegex.test(getComputedStyleProperty(node, "display"));
        }

        // White space characters as defined by HTML 4 (http://www.w3.org/TR/html401/struct/text.html)
        var htmlNonWhiteSpaceRegex = /[^\r\n\t\f \u200B]/;

        function isUnrenderedWhiteSpaceNode(node) {
            if (node.data.length == 0) {
                return true;
            }
            if (htmlNonWhiteSpaceRegex.test(node.data)) {
                return false;
            }
            var cssWhiteSpace = getComputedStyleProperty(node.parentNode, "whiteSpace");
            switch (cssWhiteSpace) {
                case "pre":
                case "pre-wrap":
                case "-moz-pre-wrap":
                    return false;
                case "pre-line":
                    if (/[\r\n]/.test(node.data)) {
                        return false;
                    }
            }

            // We now have a whitespace-only text node that may be rendered depending on its context. If it is adjacent to a
            // non-inline element, it will not be rendered. This seems to be a good enough definition.
            return isNonInlineElement(node.previousSibling) || isNonInlineElement(node.nextSibling);
        }

        function getRangeBoundaries(ranges) {
            var positions = [], i, range;
            for (i = 0; range = ranges[i++]; ) {
                positions.push(
                    new DomPosition(range.startContainer, range.startOffset),
                    new DomPosition(range.endContainer, range.endOffset)
                );
            }
            return positions;
        }

        function updateRangesFromBoundaries(ranges, positions) {
            for (var i = 0, range, start, end, len = ranges.length; i < len; ++i) {
                range = ranges[i];
                start = positions[i * 2];
                end = positions[i * 2 + 1];
                range.setStartAndEnd(start.node, start.offset, end.node, end.offset);
            }
        }

        function isSplitPoint(node, offset) {
            if (dom.isCharacterDataNode(node)) {
                if (offset == 0) {
                    return !!node.previousSibling;
                } else if (offset == node.length) {
                    return !!node.nextSibling;
                } else {
                    return true;
                }
            }

            return offset > 0 && offset < node.childNodes.length;
        }

        function splitNodeAt(node, descendantNode, descendantOffset, positionsToPreserve) {
            var newNode, parentNode;
            var splitAtStart = (descendantOffset == 0);

            if (dom.isAncestorOf(descendantNode, node)) {
                return node;
            }

            if (dom.isCharacterDataNode(descendantNode)) {
                var descendantIndex = dom.getNodeIndex(descendantNode);
                if (descendantOffset == 0) {
                    descendantOffset = descendantIndex;
                } else if (descendantOffset == descendantNode.length) {
                    descendantOffset = descendantIndex + 1;
                } else {
                    throw module.createError("splitNodeAt() should not be called with offset in the middle of a data node (" +
                        descendantOffset + " in " + descendantNode.data);
                }
                descendantNode = descendantNode.parentNode;
            }

            if (isSplitPoint(descendantNode, descendantOffset)) {
                // descendantNode is now guaranteed not to be a text or other character node
                newNode = descendantNode.cloneNode(false);
                parentNode = descendantNode.parentNode;
                if (newNode.id) {
                    newNode.removeAttribute("id");
                }
                var child, newChildIndex = 0;

                while ( (child = descendantNode.childNodes[descendantOffset]) ) {
                    movePreservingPositions(child, newNode, newChildIndex++, positionsToPreserve);
                }
                movePreservingPositions(newNode, parentNode, dom.getNodeIndex(descendantNode) + 1, positionsToPreserve);
                return (descendantNode == node) ? newNode : splitNodeAt(node, parentNode, dom.getNodeIndex(newNode), positionsToPreserve);
            } else if (node != descendantNode) {
                newNode = descendantNode.parentNode;

                // Work out a new split point in the parent node
                var newNodeIndex = dom.getNodeIndex(descendantNode);

                if (!splitAtStart) {
                    newNodeIndex++;
                }
                return splitNodeAt(node, newNode, newNodeIndex, positionsToPreserve);
            }
            return node;
        }

        function areElementsMergeable(el1, el2) {
            return el1.namespaceURI == el2.namespaceURI &&
                el1.tagName.toLowerCase() == el2.tagName.toLowerCase() &&
                haveSameClasses(el1, el2) &&
                elementsHaveSameNonClassAttributes(el1, el2) &&
                getComputedStyleProperty(el1, "display") == "inline" &&
                getComputedStyleProperty(el2, "display") == "inline";
        }

        function createAdjacentMergeableTextNodeGetter(forward) {
            var siblingPropName = forward ? "nextSibling" : "previousSibling";

            return function(textNode, checkParentElement) {
                var el = textNode.parentNode;
                var adjacentNode = textNode[siblingPropName];
                if (adjacentNode) {
                    // Can merge if the node's previous/next sibling is a text node
                    if (adjacentNode && adjacentNode.nodeType == 3) {
                        return adjacentNode;
                    }
                } else if (checkParentElement) {
                    // Compare text node parent element with its sibling
                    adjacentNode = el[siblingPropName];
                    if (adjacentNode && adjacentNode.nodeType == 1 && areElementsMergeable(el, adjacentNode)) {
                        var adjacentNodeChild = adjacentNode[forward ? "firstChild" : "lastChild"];
                        if (adjacentNodeChild && adjacentNodeChild.nodeType == 3) {
                            return adjacentNodeChild;
                        }
                    }
                }
                return null;
            };
        }

        var getPreviousMergeableTextNode = createAdjacentMergeableTextNodeGetter(false),
            getNextMergeableTextNode = createAdjacentMergeableTextNodeGetter(true);

    
        function Merge(firstNode) {
            this.isElementMerge = (firstNode.nodeType == 1);
            this.textNodes = [];
            var firstTextNode = this.isElementMerge ? firstNode.lastChild : firstNode;
            if (firstTextNode) {
                this.textNodes[0] = firstTextNode;
            }
        }

        Merge.prototype = {
            doMerge: function(positionsToPreserve) {
                var textNodes = this.textNodes;
                var firstTextNode = textNodes[0];
                if (textNodes.length > 1) {
                    var firstTextNodeIndex = dom.getNodeIndex(firstTextNode);
                    var textParts = [], combinedTextLength = 0, textNode, parent;
                    forEach(textNodes, function(textNode, i) {
                        parent = textNode.parentNode;
                        if (i > 0) {
                            parent.removeChild(textNode);
                            if (!parent.hasChildNodes()) {
                                dom.removeNode(parent);
                            }
                            if (positionsToPreserve) {
                                forEach(positionsToPreserve, function(position) {
                                    // Handle case where position is inside the text node being merged into a preceding node
                                    if (position.node == textNode) {
                                        position.node = firstTextNode;
                                        position.offset += combinedTextLength;
                                    }
                                    // Handle case where both text nodes precede the position within the same parent node
                                    if (position.node == parent && position.offset > firstTextNodeIndex) {
                                        --position.offset;
                                        if (position.offset == firstTextNodeIndex + 1 && i < len - 1) {
                                            position.node = firstTextNode;
                                            position.offset = combinedTextLength;
                                        }
                                    }
                                });
                            }
                        }
                        textParts[i] = textNode.data;
                        combinedTextLength += textNode.data.length;
                    });
                    firstTextNode.data = textParts.join("");
                }
                return firstTextNode.data;
            },

            getLength: function() {
                var i = this.textNodes.length, len = 0;
                while (i--) {
                    len += this.textNodes[i].length;
                }
                return len;
            },

            toString: function() {
                var textParts = [];
                forEach(this.textNodes, function(textNode, i) {
                    textParts[i] = "'" + textNode.data + "'";
                });
                return "[Merge(" + textParts.join(",") + ")]";
            }
        };

        var optionProperties = ["elementTagName", "ignoreWhiteSpace", "applyToEditableOnly", "useExistingElements",
            "removeEmptyElements", "onElementCreate"];

        // TODO: Populate this with every attribute name that corresponds to a property with a different name. Really??
        var attrNamesForProperties = {};

        function ClassApplier(className, options, tagNames) {
            var normalize, i, len, propName, applier = this;
            applier.cssClass = applier.className = className; // cssClass property is for backward compatibility

            var elementPropertiesFromOptions = null, elementAttributes = {};

            // Initialize from options object
            if (typeof options == "object" && options !== null) {
                if (typeof options.elementTagName !== "undefined") {
                    options.elementTagName = options.elementTagName.toLowerCase();
                }
                tagNames = options.tagNames;
                elementPropertiesFromOptions = options.elementProperties;
                elementAttributes = options.elementAttributes;

                for (i = 0; propName = optionProperties[i++]; ) {
                    if (options.hasOwnProperty(propName)) {
                        applier[propName] = options[propName];
                    }
                }
                normalize = options.normalize;
            } else {
                normalize = options;
            }

            // Backward compatibility: the second parameter can also be a Boolean indicating to normalize after unapplying
            applier.normalize = (typeof normalize == "undefined") ? true : normalize;

            // Initialize element properties and attribute exceptions
            applier.attrExceptions = [];
            var el = document.createElement(applier.elementTagName);
            applier.elementProperties = applier.copyPropertiesToElement(elementPropertiesFromOptions, el, true);
            each(elementAttributes, function(attrName, attrValue) {
                applier.attrExceptions.push(attrName);
                // Ensure each attribute value is a string
                elementAttributes[attrName] = "" + attrValue;
            });
            applier.elementAttributes = elementAttributes;

            applier.elementSortedClassName = applier.elementProperties.hasOwnProperty("className") ?
                sortClassName(applier.elementProperties.className + " " + className) : className;

            // Initialize tag names
            applier.applyToAnyTagName = false;
            var type = typeof tagNames;
            if (type == "string") {
                if (tagNames == "*") {
                    applier.applyToAnyTagName = true;
                } else {
                    applier.tagNames = trim(tagNames.toLowerCase()).split(/\s*,\s*/);
                }
            } else if (type == "object" && typeof tagNames.length == "number") {
                applier.tagNames = [];
                for (i = 0, len = tagNames.length; i < len; ++i) {
                    if (tagNames[i] == "*") {
                        applier.applyToAnyTagName = true;
                    } else {
                        applier.tagNames.push(tagNames[i].toLowerCase());
                    }
                }
            } else {
                applier.tagNames = [applier.elementTagName];
            }
        }

        ClassApplier.prototype = {
            elementTagName: defaultTagName,
            elementProperties: {},
            elementAttributes: {},
            ignoreWhiteSpace: true,
            applyToEditableOnly: false,
            useExistingElements: true,
            removeEmptyElements: true,
            onElementCreate: null,

            copyPropertiesToElement: function(props, el, createCopy) {
                var s, elStyle, elProps = {}, elPropsStyle, propValue, elPropValue, attrName;

                for (var p in props) {
                    if (props.hasOwnProperty(p)) {
                        propValue = props[p];
                        elPropValue = el[p];

                        // Special case for class. The copied properties object has the applier's class as well as its own
                        // to simplify checks when removing styling elements
                        if (p == "className") {
                            addClass(el, propValue);
                            addClass(el, this.className);
                            el[p] = sortClassName(el[p]);
                            if (createCopy) {
                                elProps[p] = propValue;
                            }
                        }

                        // Special case for style
                        else if (p == "style") {
                            elStyle = elPropValue;
                            if (createCopy) {
                                elProps[p] = elPropsStyle = {};
                            }
                            for (s in props[p]) {
                                if (props[p].hasOwnProperty(s)) {
                                    elStyle[s] = propValue[s];
                                    if (createCopy) {
                                        elPropsStyle[s] = elStyle[s];
                                    }
                                }
                            }
                            this.attrExceptions.push(p);
                        } else {
                            el[p] = propValue;
                            // Copy the property back from the dummy element so that later comparisons to check whether
                            // elements may be removed are checking against the right value. For example, the href property
                            // of an element returns a fully qualified URL even if it was previously assigned a relative
                            // URL.
                            if (createCopy) {
                                elProps[p] = el[p];

                                // Not all properties map to identically-named attributes
                                attrName = attrNamesForProperties.hasOwnProperty(p) ? attrNamesForProperties[p] : p;
                                this.attrExceptions.push(attrName);
                            }
                        }
                    }
                }

                return createCopy ? elProps : "";
            },

            copyAttributesToElement: function(attrs, el) {
                for (var attrName in attrs) {
                    if (attrs.hasOwnProperty(attrName) && !/^class(?:Name)?$/i.test(attrName)) {
                        el.setAttribute(attrName, attrs[attrName]);
                    }
                }
            },

            appliesToElement: function(el) {
                return contains(this.tagNames, el.tagName.toLowerCase());
            },

            getEmptyElements: function(range) {
                var applier = this;
                return range.getNodes([1], function(el) {
                    return applier.appliesToElement(el) && !el.hasChildNodes();
                });
            },

            hasClass: function(node) {
                return node.nodeType == 1 &&
                    (this.applyToAnyTagName || this.appliesToElement(node)) &&
                    hasClass(node, this.className);
            },

            getSelfOrAncestorWithClass: function(node) {
                while (node) {
                    if (this.hasClass(node)) {
                        return node;
                    }
                    node = node.parentNode;
                }
                return null;
            },

            isModifiable: function(node) {
                return !this.applyToEditableOnly || isEditable(node);
            },

            // White space adjacent to an unwrappable node can be ignored for wrapping
            isIgnorableWhiteSpaceNode: function(node) {
                return this.ignoreWhiteSpace && node && node.nodeType == 3 && isUnrenderedWhiteSpaceNode(node);
            },

            // Normalizes nodes after applying a class to a Range.
            postApply: function(textNodes, range, positionsToPreserve, isUndo) {
                var firstNode = textNodes[0], lastNode = textNodes[textNodes.length - 1];

                var merges = [], currentMerge;

                var rangeStartNode = firstNode, rangeEndNode = lastNode;
                var rangeStartOffset = 0, rangeEndOffset = lastNode.length;

                var textNode, precedingTextNode;

                // Check for every required merge and create a Merge object for each
                forEach(textNodes, function(textNode) {
                    precedingTextNode = getPreviousMergeableTextNode(textNode, !isUndo);
                    if (precedingTextNode) {
                        if (!currentMerge) {
                            currentMerge = new Merge(precedingTextNode);
                            merges.push(currentMerge);
                        }
                        currentMerge.textNodes.push(textNode);
                        if (textNode === firstNode) {
                            rangeStartNode = currentMerge.textNodes[0];
                            rangeStartOffset = rangeStartNode.length;
                        }
                        if (textNode === lastNode) {
                            rangeEndNode = currentMerge.textNodes[0];
                            rangeEndOffset = currentMerge.getLength();
                        }
                    } else {
                        currentMerge = null;
                    }
                });

                // Test whether the first node after the range needs merging
                var nextTextNode = getNextMergeableTextNode(lastNode, !isUndo);

                if (nextTextNode) {
                    if (!currentMerge) {
                        currentMerge = new Merge(lastNode);
                        merges.push(currentMerge);
                    }
                    currentMerge.textNodes.push(nextTextNode);
                }

                // Apply the merges
                if (merges.length) {
                    for (i = 0, len = merges.length; i < len; ++i) {
                        merges[i].doMerge(positionsToPreserve);
                    }

                    // Set the range boundaries
                    range.setStartAndEnd(rangeStartNode, rangeStartOffset, rangeEndNode, rangeEndOffset);
                }
            },

            createContainer: function(parentNode) {
                var doc = dom.getDocument(parentNode);
                var namespace;
                var el = createElementNSSupported && !dom.isHtmlNamespace(parentNode) && (namespace = parentNode.namespaceURI) ?
                    doc.createElementNS(parentNode.namespaceURI, this.elementTagName) :
                    doc.createElement(this.elementTagName);

                this.copyPropertiesToElement(this.elementProperties, el, false);
                this.copyAttributesToElement(this.elementAttributes, el);
                addClass(el, this.className);
                if (this.onElementCreate) {
                    this.onElementCreate(el, this);
                }
                return el;
            },

            elementHasProperties: function(el, props) {
                var applier = this;
                return each(props, function(p, propValue) {
                    if (p == "className") {
                        // For checking whether we should reuse an existing element, we just want to check that the element
                        // has all the classes specified in the className property. When deciding whether the element is
                        // removable when unapplying a class, there is separate special handling to check whether the
                        // element has extra classes so the same simple check will do.
                        return hasAllClasses(el, propValue);
                    } else if (typeof propValue == "object") {
                        if (!applier.elementHasProperties(el[p], propValue)) {
                            return false;
                        }
                    } else if (el[p] !== propValue) {
                        return false;
                    }
                });
            },

            elementHasAttributes: function(el, attrs) {
                return each(attrs, function(name, value) {
                    if (el.getAttribute(name) !== value) {
                        return false;
                    }
                });
            },

            applyToTextNode: function(textNode, positionsToPreserve) {

                // Check whether the text node can be styled. Text within a <style> or <script> element, for example,
                // should not be styled. See issue 283.
                if (canTextBeStyled(textNode)) {
                    var parent = textNode.parentNode;
                    if (parent.childNodes.length == 1 &&
                        this.useExistingElements &&
                        this.appliesToElement(parent) &&
                        this.elementHasProperties(parent, this.elementProperties) &&
                        this.elementHasAttributes(parent, this.elementAttributes)) {

                        addClass(parent, this.className);
                    } else {
                        var textNodeParent = textNode.parentNode;
                        var el = this.createContainer(textNodeParent);
                        textNodeParent.insertBefore(el, textNode);
                        el.appendChild(textNode);
                    }
                }

            },

            isRemovable: function(el) {
                return el.tagName.toLowerCase() == this.elementTagName &&
                    getSortedClassName(el) == this.elementSortedClassName &&
                    this.elementHasProperties(el, this.elementProperties) &&
                    !elementHasNonClassAttributes(el, this.attrExceptions) &&
                    this.elementHasAttributes(el, this.elementAttributes) &&
                    this.isModifiable(el);
            },

            isEmptyContainer: function(el) {
                var childNodeCount = el.childNodes.length;
                return el.nodeType == 1 &&
                    this.isRemovable(el) &&
                    (childNodeCount == 0 || (childNodeCount == 1 && this.isEmptyContainer(el.firstChild)));
            },

            removeEmptyContainers: function(range) {
                var applier = this;
                var nodesToRemove = range.getNodes([1], function(el) {
                    return applier.isEmptyContainer(el);
                });

                var rangesToPreserve = [range];
                var positionsToPreserve = getRangeBoundaries(rangesToPreserve);

                forEach(nodesToRemove, function(node) {
                    removePreservingPositions(node, positionsToPreserve);
                });

                // Update the range from the preserved boundary positions
                updateRangesFromBoundaries(rangesToPreserve, positionsToPreserve);
            },

            undoToTextNode: function(textNode, range, ancestorWithClass, positionsToPreserve) {
                if (!range.containsNode(ancestorWithClass)) {
                    // Split out the portion of the ancestor from which we can remove the class
                    //var parent = ancestorWithClass.parentNode, index = dom.getNodeIndex(ancestorWithClass);
                    var ancestorRange = range.cloneRange();
                    ancestorRange.selectNode(ancestorWithClass);
                    if (ancestorRange.isPointInRange(range.endContainer, range.endOffset)) {
                        splitNodeAt(ancestorWithClass, range.endContainer, range.endOffset, positionsToPreserve);
                        range.setEndAfter(ancestorWithClass);
                    }
                    if (ancestorRange.isPointInRange(range.startContainer, range.startOffset)) {
                        ancestorWithClass = splitNodeAt(ancestorWithClass, range.startContainer, range.startOffset, positionsToPreserve);
                    }
                }

                if (this.isRemovable(ancestorWithClass)) {
                    replaceWithOwnChildrenPreservingPositions(ancestorWithClass, positionsToPreserve);
                } else {
                    removeClass(ancestorWithClass, this.className);
                }
            },

            splitAncestorWithClass: function(container, offset, positionsToPreserve) {
                var ancestorWithClass = this.getSelfOrAncestorWithClass(container);
                if (ancestorWithClass) {
                    splitNodeAt(ancestorWithClass, container, offset, positionsToPreserve);
                }
            },

            undoToAncestor: function(ancestorWithClass, positionsToPreserve) {
                if (this.isRemovable(ancestorWithClass)) {
                    replaceWithOwnChildrenPreservingPositions(ancestorWithClass, positionsToPreserve);
                } else {
                    removeClass(ancestorWithClass, this.className);
                }
            },

            applyToRange: function(range, rangesToPreserve) {
                var applier = this;
                rangesToPreserve = rangesToPreserve || [];

                // Create an array of range boundaries to preserve
                var positionsToPreserve = getRangeBoundaries(rangesToPreserve || []);

                range.splitBoundariesPreservingPositions(positionsToPreserve);

                // Tidy up the DOM by removing empty containers
                if (applier.removeEmptyElements) {
                    applier.removeEmptyContainers(range);
                }

                var textNodes = getEffectiveTextNodes(range);

                if (textNodes.length) {
                    forEach(textNodes, function(textNode) {
                        if (!applier.isIgnorableWhiteSpaceNode(textNode) && !applier.getSelfOrAncestorWithClass(textNode) &&
                                applier.isModifiable(textNode)) {
                            applier.applyToTextNode(textNode, positionsToPreserve);
                        }
                    });
                    var lastTextNode = textNodes[textNodes.length - 1];
                    range.setStartAndEnd(textNodes[0], 0, lastTextNode, lastTextNode.length);
                    if (applier.normalize) {
                        applier.postApply(textNodes, range, positionsToPreserve, false);
                    }

                    // Update the ranges from the preserved boundary positions
                    updateRangesFromBoundaries(rangesToPreserve, positionsToPreserve);
                }

                // Apply classes to any appropriate empty elements
                var emptyElements = applier.getEmptyElements(range);

                forEach(emptyElements, function(el) {
                    addClass(el, applier.className);
                });
            },

            applyToRanges: function(ranges) {

                var i = ranges.length;
                while (i--) {
                    this.applyToRange(ranges[i], ranges);
                }


                return ranges;
            },

            applyToSelection: function(win) {
                var sel = api.getSelection(win);
                sel.setRanges( this.applyToRanges(sel.getAllRanges()) );
            },

            undoToRange: function(range, rangesToPreserve) {
                var applier = this;
                // Create an array of range boundaries to preserve
                rangesToPreserve = rangesToPreserve || [];
                var positionsToPreserve = getRangeBoundaries(rangesToPreserve);


                range.splitBoundariesPreservingPositions(positionsToPreserve);

                // Tidy up the DOM by removing empty containers
                if (applier.removeEmptyElements) {
                    applier.removeEmptyContainers(range, positionsToPreserve);
                }

                var textNodes = getEffectiveTextNodes(range);
                var textNode, ancestorWithClass;
                var lastTextNode = textNodes[textNodes.length - 1];

                if (textNodes.length) {
                    applier.splitAncestorWithClass(range.endContainer, range.endOffset, positionsToPreserve);
                    applier.splitAncestorWithClass(range.startContainer, range.startOffset, positionsToPreserve);
                    for (var i = 0, len = textNodes.length; i < len; ++i) {
                        textNode = textNodes[i];
                        ancestorWithClass = applier.getSelfOrAncestorWithClass(textNode);
                        if (ancestorWithClass && applier.isModifiable(textNode)) {
                            applier.undoToAncestor(ancestorWithClass, positionsToPreserve);
                        }
                    }
                    // Ensure the range is still valid
                    range.setStartAndEnd(textNodes[0], 0, lastTextNode, lastTextNode.length);


                    if (applier.normalize) {
                        applier.postApply(textNodes, range, positionsToPreserve, true);
                    }

                    // Update the ranges from the preserved boundary positions
                    updateRangesFromBoundaries(rangesToPreserve, positionsToPreserve);
                }

                // Remove class from any appropriate empty elements
                var emptyElements = applier.getEmptyElements(range);

                forEach(emptyElements, function(el) {
                    removeClass(el, applier.className);
                });
            },

            undoToRanges: function(ranges) {
                // Get ranges returned in document order
                var i = ranges.length;

                while (i--) {
                    this.undoToRange(ranges[i], ranges);
                }

                return ranges;
            },

            undoToSelection: function(win) {
                var sel = api.getSelection(win);
                var ranges = api.getSelection(win).getAllRanges();
                this.undoToRanges(ranges);
                sel.setRanges(ranges);
            },

            isAppliedToRange: function(range) {
                if (range.collapsed || range.toString() == "") {
                    return !!this.getSelfOrAncestorWithClass(range.commonAncestorContainer);
                } else {
                    var textNodes = range.getNodes( [3] );
                    if (textNodes.length)
                    for (var i = 0, textNode; textNode = textNodes[i++]; ) {
                        if (!this.isIgnorableWhiteSpaceNode(textNode) && rangeSelectsAnyText(range, textNode) &&
                                this.isModifiable(textNode) && !this.getSelfOrAncestorWithClass(textNode)) {
                            return false;
                        }
                    }
                    return true;
                }
            },

            isAppliedToRanges: function(ranges) {
                var i = ranges.length;
                if (i == 0) {
                    return false;
                }
                while (i--) {
                    if (!this.isAppliedToRange(ranges[i])) {
                        return false;
                    }
                }
                return true;
            },

            isAppliedToSelection: function(win) {
                var sel = api.getSelection(win);
                return this.isAppliedToRanges(sel.getAllRanges());
            },

            toggleRange: function(range) {
                if (this.isAppliedToRange(range)) {
                    this.undoToRange(range);
                } else {
                    this.applyToRange(range);
                }
            },

            toggleSelection: function(win) {
                if (this.isAppliedToSelection(win)) {
                    this.undoToSelection(win);
                } else {
                    this.applyToSelection(win);
                }
            },

            getElementsWithClassIntersectingRange: function(range) {
                var elements = [];
                var applier = this;
                range.getNodes([3], function(textNode) {
                    var el = applier.getSelfOrAncestorWithClass(textNode);
                    if (el && !contains(elements, el)) {
                        elements.push(el);
                    }
                });
                return elements;
            },

            detach: function() {}
        };

        function createClassApplier(className, options, tagNames) {
            return new ClassApplier(className, options, tagNames);
        }

        ClassApplier.util = {
            hasClass: hasClass,
            addClass: addClass,
            removeClass: removeClass,
            getClass: getClass,
            hasSameClasses: haveSameClasses,
            hasAllClasses: hasAllClasses,
            replaceWithOwnChildren: replaceWithOwnChildrenPreservingPositions,
            elementsHaveSameNonClassAttributes: elementsHaveSameNonClassAttributes,
            elementHasNonClassAttributes: elementHasNonClassAttributes,
            splitNodeAt: splitNodeAt,
            isEditableElement: isEditableElement,
            isEditingHost: isEditingHost,
            isEditable: isEditable
        };

        api.CssClassApplier = api.ClassApplier = ClassApplier;
        api.createClassApplier = createClassApplier;
        util.createAliasForDeprecatedMethod(api, "createCssClassApplier", "createClassApplier", module);
    });
    
    return rangy;
}, this);

;var tableSelector = {
	getID : function (el) {
		id = el.data('id');
		return id;
	},
	goUrl : function (el, url) {
		id = this.getID(el);
		
		if (typeof(id) != "undefined") {
			window.location = url + '/' + id;
		}
	},
	init: function(url) {
		$('.table').find('tbody tr').on('click', function (){
			tableSelector.goUrl($(this), url);
		});
	}
};
/*!
 * jQuery twitter bootstrap wizard plugin
 * Examples and documentation at: http://github.com/VinceG/twitter-bootstrap-wizard
 * version 1.3.1
 * Requires jQuery v1.3.2 or later
 * Supports Bootstrap 2.2.x, 2.3.x, 3.0
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Authors: Vadim Vincent Gabriel (http://vadimg.com), Jason Gill (www.gilluminate.com)
 */
;(function($) {
var bootstrapWizardCreate = function(element, options) {
	var element = $(element);
	var obj = this;

	// selector skips any 'li' elements that do not contain a child with a tab data-toggle
	var baseItemSelector = 'li:has([data-toggle="tab"])';
	var historyStack = [];

	// Merge options with defaults
	var $settings = $.extend({}, $.fn.bootstrapWizard.defaults, options);
	var $activeTab = null;
	var $navigation = null;

	this.rebindClick = function(selector, fn)
	{
		selector.unbind('click', fn).bind('click', fn);
	}

	this.fixNavigationButtons = function() {
		// Get the current active tab
		if(!$activeTab.length) {
			// Select first one
			$navigation.find('a:first').tab('show');
			$activeTab = $navigation.find(baseItemSelector + ':first');
		}

		// See if we're currently in the first/last then disable the previous and last buttons
		$($settings.previousSelector, element).toggleClass('disabled', (obj.firstIndex() >= obj.currentIndex()));
		$($settings.nextSelector, element).toggleClass('disabled', (obj.currentIndex() >= obj.navigationLength()));
		$($settings.nextSelector, element).toggleClass('hidden', (obj.currentIndex() >= obj.navigationLength() && $($settings.finishSelector, element).length > 0));
		$($settings.lastSelector, element).toggleClass('hidden', (obj.currentIndex() >= obj.navigationLength() && $($settings.finishSelector, element).length > 0));
		$($settings.finishSelector, element).toggleClass('hidden', (obj.currentIndex() < obj.navigationLength()));
		$($settings.backSelector, element).toggleClass('disabled', (historyStack.length == 0));
		$($settings.backSelector, element).toggleClass('hidden', (obj.currentIndex() >= obj.navigationLength() && $($settings.finishSelector, element).length > 0));

		// We are unbinding and rebinding to ensure single firing and no double-click errors
		obj.rebindClick($($settings.nextSelector, element), obj.next);
		obj.rebindClick($($settings.previousSelector, element), obj.previous);
		obj.rebindClick($($settings.lastSelector, element), obj.last);
		obj.rebindClick($($settings.firstSelector, element), obj.first);
		obj.rebindClick($($settings.finishSelector, element), obj.finish);
		obj.rebindClick($($settings.backSelector, element), obj.back);

		if($settings.onTabShow && typeof $settings.onTabShow === 'function' && $settings.onTabShow($activeTab, $navigation, obj.currentIndex())===false){
			return false;
		}
	};

	this.next = function(e) {
		// If we clicked the last then dont activate this
		if(element.hasClass('last')) {
			return false;
		}

		if($settings.onNext && typeof $settings.onNext === 'function' && $settings.onNext($activeTab, $navigation, obj.nextIndex())===false){
			return false;
		}

		var formerIndex = obj.currentIndex();
		var $index = obj.nextIndex();

	  // Did we click the last button
		if($index > obj.navigationLength()) {
		} else {
		  historyStack.push(formerIndex);
		  $navigation.find(baseItemSelector + ($settings.withVisible ? ':visible' : '') + ':eq(' + $index + ') a').tab('show');
		}
	};

	this.previous = function(e) {
		// If we clicked the first then dont activate this
		if(element.hasClass('first')) {
			return false;
		}

		if($settings.onPrevious && typeof $settings.onPrevious === 'function' && $settings.onPrevious($activeTab, $navigation, obj.previousIndex())===false){
			return false;
		}

		var formerIndex = obj.currentIndex();
		var $index = obj.previousIndex();

		if($index < 0) {
		} else {
		  historyStack.push(formerIndex);
		  $navigation.find(baseItemSelector + ($settings.withVisible ? ':visible' : '') + ':eq(' + $index + ') a').tab('show');
		}
	};

	this.first = function (e) {
		if($settings.onFirst && typeof $settings.onFirst === 'function' && $settings.onFirst($activeTab, $navigation, obj.firstIndex())===false){
			return false;
		}

		// If the element is disabled then we won't do anything
		if(element.hasClass('disabled')) {
			return false;
		}

		historyStack.push(obj.currentIndex());
		$navigation.find(baseItemSelector + ':eq(0) a').tab('show');
	};

	this.last = function(e) {
		if($settings.onLast && typeof $settings.onLast === 'function' && $settings.onLast($activeTab, $navigation, obj.lastIndex())===false){
			return false;
		}

		// If the element is disabled then we won't do anything
		if(element.hasClass('disabled')) {
			return false;
		}

		historyStack.push(obj.currentIndex());
		$navigation.find(baseItemSelector + ':eq(' + obj.navigationLength() + ') a').tab('show');
	};

	this.finish = function (e) {
	  if ($settings.onFinish && typeof $settings.onFinish === 'function') {
	    $settings.onFinish($activeTab, $navigation, obj.lastIndex());
	  }
	};

	this.back = function () {
	  if (historyStack.length == 0) {
	    return null;
	  }

	  var formerIndex = historyStack.pop();
	  if ($settings.onBack && typeof $settings.onBack === 'function' && $settings.onBack($activeTab, $navigation, formerIndex) === false) {
	    historyStack.push(formerIndex);
	    return false;
	  }

	  element.find(baseItemSelector + ':eq(' + formerIndex + ') a').tab('show');
	};

	this.currentIndex = function() {
		return $navigation.find(baseItemSelector).index($activeTab);
	};

	this.firstIndex = function() {
		return 0;
	};

	this.lastIndex = function() {
		return obj.navigationLength();
	};
	
	this.getIndex = function(e) {
		return $navigation.find(baseItemSelector).index(e);
	};
	
	this.nextIndex = function() {
		var nextIndexCandidate=this.currentIndex();
		var nextTabCandidate=null;
		do {
			nextIndexCandidate++;
			nextTabCandidate = $navigation.find(baseItemSelector + ":eq(" + nextIndexCandidate + ")");
		} while ((nextTabCandidate)&&(nextTabCandidate.hasClass("disabled")));
		return nextIndexCandidate;
	};
	this.previousIndex = function() {
		var prevIndexCandidate=this.currentIndex();
		var prevTabCandidate=null;
		do {
			prevIndexCandidate--;
			prevTabCandidate = $navigation.find(baseItemSelector + ":eq(" + prevIndexCandidate + ")");
		} while ((prevTabCandidate)&&(prevTabCandidate.hasClass("disabled")));
		return prevIndexCandidate;
	};	
	this.navigationLength = function() {
		return $navigation.find(baseItemSelector).length - 1;
	};
	this.activeTab = function() {
		return $activeTab;
	};
	this.nextTab = function() {
		return $navigation.find(baseItemSelector + ':eq('+(obj.currentIndex()+1)+')').length ? $navigation.find(baseItemSelector + ':eq('+(obj.currentIndex()+1)+')') : null;
	};
	this.previousTab = function() {
		if(obj.currentIndex() <= 0) {
			return null;
		}
		return $navigation.find(baseItemSelector + ':eq('+parseInt(obj.currentIndex()-1)+')');
	};
	this.show = function(index) {
	  var tabToShow = isNaN(index) ?
      element.find(baseItemSelector + ' a[href="#' + index + '"]') :
      element.find(baseItemSelector + ':eq(' + index + ') a');
	  if (tabToShow.length > 0) {
	    historyStack.push(obj.currentIndex());
	    tabToShow.tab('show');
	  }
	};
	this.disable = function (index) {
		$navigation.find(baseItemSelector + ':eq('+index+')').addClass('disabled');
	};
	this.enable = function(index) {
		$navigation.find(baseItemSelector + ':eq('+index+')').removeClass('disabled');
	};
	this.hide = function(index) {
		$navigation.find(baseItemSelector + ':eq('+index+')').hide();
	};
	this.display = function(index) {
		$navigation.find(baseItemSelector + ':eq('+index+')').show();
	};
	this.remove = function(args) {
		var $index = args[0];
		var $removeTabPane = typeof args[1] != 'undefined' ? args[1] : false;
		var $item = $navigation.find(baseItemSelector + ':eq('+$index+')');

		// Remove the tab pane first if needed
		if($removeTabPane) {
			var $href = $item.find('a').attr('href');
			$($href).remove();
		}

		// Remove menu item
		$item.remove();
	};

	var innerTabClick = function (e) {
		// Get the index of the clicked tab
		var $ul = $navigation.find(baseItemSelector);
		var clickedIndex = $ul.index($(e.currentTarget).parent(baseItemSelector));
		var $clickedTab = $( $ul[clickedIndex] );
		if($settings.onTabClick && typeof $settings.onTabClick === 'function' && $settings.onTabClick($activeTab, $navigation, obj.currentIndex(), clickedIndex, $clickedTab)===false){
		    return false;
		}
	};

	var innerTabShown = function (e) {  
		var $element = $(e.target).parent();
		var nextTab = $navigation.find(baseItemSelector).index($element);

		// If it's disabled then do not change
		if($element.hasClass('disabled')) {
			return false;
		}

		if($settings.onTabChange && typeof $settings.onTabChange === 'function' && $settings.onTabChange($activeTab, $navigation, obj.currentIndex(), nextTab)===false){
				return false;
		}

		$activeTab = $element; // activated tab
		obj.fixNavigationButtons();
	};

	this.resetWizard = function() {

		// remove the existing handlers
		$('a[data-toggle="tab"]', $navigation).off('click', innerTabClick);
		$('a[data-toggle="tab"]', $navigation).off('show show.bs.tab', innerTabShown);

		// reset elements based on current state of the DOM
		$navigation = element.find('ul:first', element);
		$activeTab = $navigation.find(baseItemSelector + '.active', element);

		// re-add handlers
		$('a[data-toggle="tab"]', $navigation).on('click', innerTabClick);
		$('a[data-toggle="tab"]', $navigation).on('show show.bs.tab', innerTabShown);

		obj.fixNavigationButtons();
	};

	$navigation = element.find('ul:first', element);
	$activeTab = $navigation.find(baseItemSelector + '.active', element);

	if(!$navigation.hasClass($settings.tabClass)) {
		$navigation.addClass($settings.tabClass);
	}

	// Load onInit
	if($settings.onInit && typeof $settings.onInit === 'function'){
		$settings.onInit($activeTab, $navigation, 0);
	}

	// Load onShow
	if($settings.onShow && typeof $settings.onShow === 'function'){
		$settings.onShow($activeTab, $navigation, obj.nextIndex());
	}

	$('a[data-toggle="tab"]', $navigation).on('click', innerTabClick);

	// attach to both show and show.bs.tab to support Bootstrap versions 2.3.2 and 3.0.0
	$('a[data-toggle="tab"]', $navigation).on('show show.bs.tab', innerTabShown);
};
$.fn.bootstrapWizard = function(options) {
	//expose methods
	if (typeof options == 'string') {
		var args = Array.prototype.slice.call(arguments, 1)
		if(args.length === 1) {
			args.toString();
		}
		return this.data('bootstrapWizard')[options](args);
	}
	return this.each(function(index){
		var element = $(this);
		// Return early if this element already has a plugin instance
		if (element.data('bootstrapWizard')) return;
		// pass options to plugin constructor
		var wizard = new bootstrapWizardCreate(element, options);
		// Store plugin object in this element's data
		element.data('bootstrapWizard', wizard);
		// and then trigger initial change
		wizard.fixNavigationButtons();
	});
};

// expose options
$.fn.bootstrapWizard.defaults = {
	withVisible:      true,
	tabClass:         'nav nav-pills',
	nextSelector:     '.wizard li.next',
	previousSelector: '.wizard li.previous',
	firstSelector:    '.wizard li.first',
	lastSelector:     '.wizard li.last',
  	finishSelector:   '.wizard li.finish',
	backSelector:     '.wizard li.back',
	onShow:           null,
	onInit:           null,
	onNext:           null,
	onPrevious:       null,
	onLast:           null,
	onFirst:          null,
  	onFinish:         null,
  	onBack:           null,
	onTabChange:      null,
	onTabClick:       null,
	onTabShow:        null
};

})(jQuery);

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

eval("$(document).ready(function(){\n\t$(\".comp_input_mask\").inputmask();\n});//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2pzL0NvbXBvbmVudHMvaW5wdXQuanM/MTJmYiJdLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuXHQkKFwiLmNvbXBfaW5wdXRfbWFza1wiKS5pbnB1dG1hc2soKTtcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2pzL0NvbXBvbmVudHMvaW5wdXQuanMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 1 */
/***/ function(module, exports) {

eval("/*!\n* jquery.inputmask.bundle.js\n* https://github.com/RobinHerbots/jquery.inputmask\n* Copyright (c) 2010 - 2016 Robin Herbots\n* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)\n* Version: 3.3.4-113\n*/\n!function(a){function b(d,e){return this instanceof b?(a.isPlainObject(d)?e=d:(e=e||{},e.alias=d),this.el=void 0,this.opts=a.extend(!0,{},this.defaults,e),this.maskset=void 0,this.noMasksCache=e&&void 0!==e.definitions,this.userOptions=e||{},this.events={},this.dataAttribute=\"data-inputmask\",this.isRTL=this.opts.numericInput,void c(this.opts.alias,e,this.opts)):new b(d,e)}function c(b,d,e){var f=e.aliases[b];return f?(f.alias&&c(f.alias,void 0,e),a.extend(!0,e,f),a.extend(!0,e,d),!0):(null===e.mask&&(e.mask=b),!1)}function d(c,d){function e(c,e,f){if(null!==c&&\"\"!==c){if(1===c.length&&f.greedy===!1&&0!==f.repeat&&(f.placeholder=\"\"),f.repeat>0||\"*\"===f.repeat||\"+\"===f.repeat){var g=\"*\"===f.repeat?0:\"+\"===f.repeat?1:f.repeat;c=f.groupmarker.start+c+f.groupmarker.end+f.quantifiermarker.start+g+\",\"+f.repeat+f.quantifiermarker.end}var h;return void 0===b.prototype.masksCache[c]||d===!0?(h={mask:c,maskToken:b.prototype.analyseMask(c,f),validPositions:{},_buffer:void 0,buffer:void 0,tests:{},metadata:e,maskLength:void 0},d!==!0&&(b.prototype.masksCache[f.numericInput?c.split(\"\").reverse().join(\"\"):c]=h,h=a.extend(!0,{},b.prototype.masksCache[f.numericInput?c.split(\"\").reverse().join(\"\"):c]))):h=a.extend(!0,{},b.prototype.masksCache[f.numericInput?c.split(\"\").reverse().join(\"\"):c]),h}}var f;if(a.isFunction(c.mask)&&(c.mask=c.mask(c)),a.isArray(c.mask)){if(c.mask.length>1){c.keepStatic=null===c.keepStatic||c.keepStatic;var g=c.groupmarker.start;return a.each(c.numericInput?c.mask.reverse():c.mask,function(b,d){g.length>1&&(g+=c.groupmarker.end+c.alternatormarker+c.groupmarker.start),g+=void 0===d.mask||a.isFunction(d.mask)?d:d.mask}),g+=c.groupmarker.end,e(g,c.mask,c)}c.mask=c.mask.pop()}return c.mask&&(f=void 0===c.mask.mask||a.isFunction(c.mask.mask)?e(c.mask,c.mask,c):e(c.mask.mask,c.mask,c)),f}function e(c,d,f){function k(a,b,c){b=b||0;var d,e,g,h=[],i=0,j=n();T=void 0!==W?W.maxLength:void 0,T===-1&&(T=void 0);do a===!0&&l().validPositions[i]?(g=l().validPositions[i],e=g.match,d=g.locator.slice(),h.push(c===!0?g.input:c===!1?e.nativeDef:F(i,e))):(g=q(i,d,i-1),e=g.match,d=g.locator.slice(),(f.jitMasking===!1||i<j||Number.isFinite(f.jitMasking)&&f.jitMasking>i)&&h.push(c===!1?e.nativeDef:F(i,e))),i++;while((void 0===T||i<T)&&(null!==e.fn||\"\"!==e.def)||b>i);return\"\"===h[h.length-1]&&h.pop(),l().maskLength=i+1,h}function l(){return d}function m(a){var b=l();b.buffer=void 0,a!==!0&&(b._buffer=void 0,b.validPositions={},b.p=0)}function n(a,b,c){var d=-1,e=-1,f=c||l().validPositions;void 0===a&&(a=-1);for(var g in f){var h=parseInt(g);f[h]&&(b||null!==f[h].match.fn)&&(h<=a&&(d=h),h>=a&&(e=h))}return d!==-1&&a-d>1||e<a?d:e}function o(b,c,d,e){function g(a){var b=l().validPositions[a];if(void 0!==b&&null===b.match.fn){var c=l().validPositions[a-1],d=l().validPositions[a+1];return void 0!==c&&void 0!==d}return!1}var h,i=b,j=a.extend(!0,{},l().validPositions),k=!1;for(l().p=b,h=c-1;h>=i;h--)void 0!==l().validPositions[h]&&(d!==!0&&(!l().validPositions[h].match.optionality&&g(h)||f.canClearPosition(l(),h,n(),e,f)===!1)||delete l().validPositions[h]);for(m(!0),h=i+1;h<=n();){for(;void 0!==l().validPositions[i];)i++;var o=l().validPositions[i];if(h<i&&(h=i+1),void 0===l().validPositions[h]&&A(h)||void 0!==o)h++;else{var p=q(h);k===!1&&j[i]&&j[i].match.def===p.match.def?(l().validPositions[i]=a.extend(!0,{},j[i]),l().validPositions[i].input=p.input,delete l().validPositions[h],h++):s(i,p.match.def)?z(i,p.input||F(h),!0)!==!1&&(delete l().validPositions[h],h++,k=!0):A(h)||(h++,i--),i++}}m(!0)}function p(a,b){for(var c,d=a,e=n(),g=l().validPositions[e]||t(0)[0],h=void 0!==g.alternation?g.locator[g.alternation].toString().split(\",\"):[],i=0;i<d.length&&(c=d[i],!(c.match&&(f.greedy&&c.match.optionalQuantifier!==!0||(c.match.optionality===!1||c.match.newBlockMarker===!1)&&c.match.optionalQuantifier!==!0)&&(void 0===g.alternation||g.alternation!==c.alternation||void 0!==c.locator[g.alternation]&&y(c.locator[g.alternation].toString().split(\",\"),h)))||b===!0&&(null!==c.match.fn||/[0-9a-bA-Z]/.test(c.match.def)));i++);return c}function q(a,b,c){return l().validPositions[a]||p(t(a,b?b.slice():b,c))}function r(a){return l().validPositions[a]?l().validPositions[a]:t(a)[0]}function s(a,b){for(var c=!1,d=t(a),e=0;e<d.length;e++)if(d[e].match&&d[e].match.def===b){c=!0;break}return c}function t(b,c,d){function e(c,d,g,h){function j(g,h,m){function p(b,c){var d=0===a.inArray(b,c.matches);return d||a.each(c.matches,function(a,e){if(e.isQuantifier===!0&&(d=p(b,c.matches[a-1])))return!1}),d}function r(b,c,d){var e,f;return(l().tests[b]||l().validPositions[b])&&a.each(l().tests[b]||[l().validPositions[b]],function(a,b){var g=void 0!==d?d:b.alternation,h=void 0!==b.locator[g]?b.locator[g].toString().indexOf(c):-1;(void 0===f||h<f)&&h!==-1&&(e=b,f=h)}),e?e.locator.slice((void 0!==d?d:e.alternation)+1):void 0!==d?r(b,c):void 0}function s(a,c){return null===a.match.fn&&null!==c.match.fn&&c.match.fn.test(a.match.def,l(),b,!1,f,!1)}if(k>1e4)throw\"Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. \"+l().mask;if(k===b&&void 0===g.matches)return n.push({match:g,locator:h.reverse(),cd:q}),!0;if(void 0!==g.matches){if(g.isGroup&&m!==g){if(g=j(c.matches[a.inArray(g,c.matches)+1],h))return!0}else if(g.isOptional){var t=g;if(g=e(g,d,h,m)){if(i=n[n.length-1].match,!p(i,t))return!0;o=!0,k=b}}else if(g.isAlternator){var u,v=g,w=[],x=n.slice(),y=h.length,z=d.length>0?d.shift():-1;if(z===-1||\"string\"==typeof z){var A,B=k,C=d.slice(),D=[];if(\"string\"==typeof z)D=z.split(\",\");else for(A=0;A<v.matches.length;A++)D.push(A);for(var E=0;E<D.length;E++){if(A=parseInt(D[E]),n=[],d=r(k,A,y)||C.slice(),g=j(v.matches[A]||c.matches[A],[A].concat(h),m)||g,g!==!0&&void 0!==g&&D[D.length-1]<v.matches.length){var F=a.inArray(g,c.matches)+1;c.matches.length>F&&(g=j(c.matches[F],[F].concat(h.slice(1,h.length)),m),g&&(D.push(F.toString()),a.each(n,function(a,b){b.alternation=h.length-1})))}u=n.slice(),k=B,n=[];for(var G=0;G<u.length;G++){var H=u[G],I=!1;H.alternation=H.alternation||y;for(var J=0;J<w.length;J++){var K=w[J];if((\"string\"!=typeof z||a.inArray(H.locator[H.alternation].toString(),D)!==-1)&&(H.match.def===K.match.def||s(H,K))){I=H.match.nativeDef===K.match.nativeDef,H.alternation==K.alternation&&K.locator[K.alternation].toString().indexOf(H.locator[H.alternation])===-1&&(K.locator[K.alternation]=K.locator[K.alternation]+\",\"+H.locator[H.alternation],K.alternation=H.alternation,null==H.match.fn&&(K.na=K.na||H.locator[H.alternation].toString(),K.na.indexOf(H.locator[H.alternation])===-1&&(K.na=K.na+\",\"+H.locator[H.alternation])));break}}I||w.push(H)}}\"string\"==typeof z&&(w=a.map(w,function(b,c){if(isFinite(c)){var d,e=b.alternation,f=b.locator[e].toString().split(\",\");b.locator[e]=void 0,b.alternation=void 0;for(var g=0;g<f.length;g++)d=a.inArray(f[g],D)!==-1,d&&(void 0!==b.locator[e]?(b.locator[e]+=\",\",b.locator[e]+=f[g]):b.locator[e]=parseInt(f[g]),b.alternation=e);if(void 0!==b.locator[e])return b}})),n=x.concat(w),k=b,o=n.length>0,d=C.slice()}else g=j(v.matches[z]||c.matches[z],[z].concat(h),m);if(g)return!0}else if(g.isQuantifier&&m!==c.matches[a.inArray(g,c.matches)-1])for(var L=g,M=d.length>0?d.shift():0;M<(isNaN(L.quantifier.max)?M+1:L.quantifier.max)&&k<=b;M++){var N=c.matches[a.inArray(L,c.matches)-1];if(g=j(N,[M].concat(h),N)){if(i=n[n.length-1].match,i.optionalQuantifier=M>L.quantifier.min-1,p(i,N)){if(M>L.quantifier.min-1){o=!0,k=b;break}return!0}return!0}}else if(g=e(g,d,h,m))return!0}else k++}for(var m=d.length>0?d.shift():0;m<c.matches.length;m++)if(c.matches[m].isQuantifier!==!0){var p=j(c.matches[m],[m].concat(g),h);if(p&&k===b)return p;if(k>b)break}}function g(b){var c=[];return a.isArray(b)||(b=[b]),b.length>0&&(void 0===b[0].alternation?(c=p(b.slice()).locator.slice(),0===c.length&&(c=b[0].locator.slice())):a.each(b,function(a,b){if(\"\"!==b.def)if(0===c.length)c=b.locator.slice();else for(var d=0;d<c.length;d++)b.locator[d]&&c[d].toString().indexOf(b.locator[d])===-1&&(c[d]+=\",\"+b.locator[d])})),c}function h(a){return f.keepStatic&&b>0&&a.length>1+(\"\"===a[a.length-1].match.def?1:0)&&a[0].match.optionality!==!0&&a[0].match.optionalQuantifier!==!0&&null===a[0].match.fn&&!/[0-9a-bA-Z]/.test(a[0].match.def)?[p(a)]:a}var i,j=l().maskToken,k=c?d:0,m=c?c.slice():[0],n=[],o=!1,q=c?c.join(\"\"):\"\";if(b>-1){if(void 0===c){for(var r,s=b-1;void 0===(r=l().validPositions[s]||l().tests[s])&&s>-1;)s--;void 0!==r&&s>-1&&(m=g(r),q=m.join(\"\"),k=s)}if(l().tests[b]&&l().tests[b][0].cd===q)return h(l().tests[b]);for(var t=m.shift();t<j.length;t++){var u=e(j[t],m,[t]);if(u&&k===b||k>b)break}}return(0===n.length||o)&&n.push({match:{fn:null,cardinality:0,optionality:!0,casing:null,def:\"\",placeholder:\"\"},locator:[],cd:q}),void 0!==c&&l().tests[b]?h(a.extend(!0,[],n)):(l().tests[b]=a.extend(!0,[],n),h(l().tests[b]))}function u(){return void 0===l()._buffer&&(l()._buffer=k(!1,1),void 0===l().buffer&&l()._buffer.slice()),l()._buffer}function v(a){return void 0!==l().buffer&&a!==!0||(l().buffer=k(!0,n(),!0)),l().buffer}function w(a,b,c){var d;if(a===!0)m(),a=0,b=c.length;else for(d=a;d<b;d++)delete l().validPositions[d];for(d=a;d<b;d++)m(!0),c[d]!==f.skipOptionalPartCharacter&&z(d,c[d],!0,!0)}function x(a,c,d){switch(f.casing||c.casing){case\"upper\":a=a.toUpperCase();break;case\"lower\":a=a.toLowerCase();break;case\"title\":var e=l().validPositions[d-1];a=0===d||e&&e.input===String.fromCharCode(b.keyCode.SPACE)?a.toUpperCase():a.toLowerCase()}return a}function y(b,c){for(var d=f.greedy?c:c.slice(0,1),e=!1,g=0;g<b.length;g++)if(a.inArray(b[g],d)!==-1){e=!0;break}return e}function z(c,d,e,g,h){function i(a){var b=X?a.begin-a.end>1||a.begin-a.end===1&&f.insertMode:a.end-a.begin>1||a.end-a.begin===1&&f.insertMode;return b&&0===a.begin&&a.end===l().maskLength?\"full\":b}function j(b,d,e){var h=!1;return a.each(t(b),function(j,k){for(var p=k.match,q=d?1:0,r=\"\",s=p.cardinality;s>q;s--)r+=D(b-(s-1));if(d&&(r+=d),v(!0),h=null!=p.fn?p.fn.test(r,l(),b,e,f,i(c)):(d===p.def||d===f.skipOptionalPartCharacter)&&\"\"!==p.def&&{c:p.placeholder||p.def,pos:b},h!==!1){var t=void 0!==h.c?h.c:d;t=t===f.skipOptionalPartCharacter&&null===p.fn?p.placeholder||p.def:t;var y=b,A=v();if(void 0!==h.remove&&(a.isArray(h.remove)||(h.remove=[h.remove]),a.each(h.remove.sort(function(a,b){return b-a}),function(a,b){o(b,b+1,!0)})),void 0!==h.insert&&(a.isArray(h.insert)||(h.insert=[h.insert]),a.each(h.insert.sort(function(a,b){return a-b}),function(a,b){z(b.pos,b.c,!0,g)})),h.refreshFromBuffer){var B=h.refreshFromBuffer;if(e=!0,w(B===!0?B:B.start,B.end,A),void 0===h.pos&&void 0===h.c)return h.pos=n(),!1;if(y=void 0!==h.pos?h.pos:b,y!==b)return h=a.extend(h,z(y,t,!0,g)),!1}else if(h!==!0&&void 0!==h.pos&&h.pos!==b&&(y=h.pos,w(b,y,v().slice()),y!==b))return h=a.extend(h,z(y,t,!0)),!1;return(h===!0||void 0!==h.pos||void 0!==h.c)&&(j>0&&m(!0),u(y,a.extend({},k,{input:x(t,p,y)}),g,i(c))||(h=!1),!1)}}),h}function k(b,c,d){var e,h,i,j,k,o,p,q,r=a.extend(!0,{},l().validPositions),s=!1,u=n();for(j=l().validPositions[u];u>=0;u--)if(i=l().validPositions[u],i&&void 0!==i.alternation){if(e=u,h=l().validPositions[e].alternation,j.locator[i.alternation]!==i.locator[i.alternation])break;j=i}if(void 0!==h){q=parseInt(e);var v=void 0!==j.locator[j.alternation||h]?j.locator[j.alternation||h]:p[0];v.length>0&&(v=v.split(\",\")[0]);var w=l().validPositions[q],x=l().validPositions[q-1];a.each(t(q,x?x.locator:void 0,q-1),function(e,i){p=i.locator[h]?i.locator[h].toString().split(\",\"):[];for(var j=0;j<p.length;j++){var t=[],u=0,x=0,y=!1;if(v<p[j]&&(void 0===i.na||a.inArray(p[j],i.na.split(\",\"))===-1)){l().validPositions[q]=a.extend(!0,{},i);var A=l().validPositions[q].locator;for(l().validPositions[q].locator[h]=parseInt(p[j]),null==i.match.fn?(w.input!==i.match.def&&(y=!0,w.generatedInput!==!0&&t.push(w.input)),x++,l().validPositions[q].generatedInput=!/[0-9a-bA-Z]/.test(i.match.def),l().validPositions[q].input=i.match.def):l().validPositions[q].input=w.input,k=q+1;k<n(void 0,!0)+1;k++)o=l().validPositions[k],o&&o.generatedInput!==!0&&/[0-9a-bA-Z]/.test(o.input)?t.push(o.input):k<b&&u++,delete l().validPositions[k];for(y&&t[0]===i.match.def&&t.shift(),m(!0),s=!0;t.length>0;){var B=t.shift();if(B!==f.skipOptionalPartCharacter&&!(s=z(n(void 0,!0)+1,B,!1,g,!0)))break}if(s){l().validPositions[q].locator=A;var C=n(b)+1;for(k=q+1;k<n()+1;k++)o=l().validPositions[k],(void 0===o||null==o.match.fn)&&k<b+(x-u)&&x++;b+=x-u,s=z(b>C?C:b,c,d,g,!0)}if(s)return!1;m(),l().validPositions=a.extend(!0,{},r)}}})}return s}function r(b,c){var d=l().validPositions[c];if(d)for(var e=d.locator,f=e.length,g=b;g<c;g++)if(void 0===l().validPositions[g]&&!A(g,!0)){var h=t(g),i=h[0],j=-1;a.each(h,function(a,b){for(var c=0;c<f&&(void 0!==b.locator[c]&&y(b.locator[c].toString().split(\",\"),e[c].toString().split(\",\")));c++)j<c&&(j=c,i=b)}),u(g,a.extend({},i,{input:i.match.placeholder||i.match.def}),!0)}}function u(b,c,d,e){if(e||f.insertMode&&void 0!==l().validPositions[b]&&void 0===d){var g,h=a.extend(!0,{},l().validPositions),i=n(void 0,!0);for(g=b;g<=i;g++)delete l().validPositions[g];l().validPositions[b]=a.extend(!0,{},c);var j,k=!0,o=l().validPositions,p=!1,q=l().maskLength;for(g=j=b;g<=i;g++){var r=h[g];if(void 0!==r)for(var t=j;t<l().maskLength&&(null==r.match.fn&&o[g]&&(o[g].match.optionalQuantifier===!0||o[g].match.optionality===!0)||null!=r.match.fn);){if(t++,p===!1&&h[t]&&h[t].match.def===r.match.def)l().validPositions[t]=a.extend(!0,{},h[t]),l().validPositions[t].input=r.input,C(t),j=t,k=!0;else if(s(t,r.match.def)){var u=z(t,r.input,!0,!0);k=u!==!1,j=u.caret||u.insert?n():t,p=!0}else k=r.generatedInput===!0;if(l().maskLength<q&&(l().maskLength=q),k)break}if(!k)break}if(!k)return l().validPositions=a.extend(!0,{},h),m(!0),!1}else l().validPositions[b]=a.extend(!0,{},c);return m(!0),!0}function C(b){for(var c=b-1;c>-1&&!l().validPositions[c];c--);var d,e;for(c++;c<b;c++)void 0===l().validPositions[c]&&(f.jitMasking===!1||f.jitMasking>c)&&(e=t(c,q(c-1).locator,c-1).slice(),\"\"===e[e.length-1].match.def&&e.pop(),d=p(e),d&&(d.match.def===f.radixPointDefinitionSymbol||!A(c,!0)||a.inArray(f.radixPoint,v())<c&&d.match.fn&&d.match.fn.test(F(c),l(),c,!1,f))&&(G=j(c,d.match.placeholder||(null==d.match.fn?d.match.def:\"\"!==F(c)?F(c):v()[c]),!0),G!==!1&&(l().validPositions[G.pos||c].generatedInput=!0)))}e=e===!0;var E=c;void 0!==c.begin&&(E=X&&!i(c)?c.end:c.begin);var G=!1,H=a.extend(!0,{},l().validPositions);if(C(E),i(c)&&(N(void 0,b.keyCode.DELETE,c),E=l().p),E<l().maskLength&&(G=j(E,d,e),(!e||g===!0)&&G===!1)){var I=l().validPositions[E];if(!I||null!==I.match.fn||I.match.def!==d&&d!==f.skipOptionalPartCharacter){if((f.insertMode||void 0===l().validPositions[B(E)])&&!A(E,!0)){var J=t(E).slice();\"\"===J[J.length-1].match.def&&J.pop();var K=p(J,!0);K&&null===K.match.fn&&(K=K.match.placeholder||K.match.def,j(E,K,e),l().validPositions[E].generatedInput=!0);for(var L=E+1,M=B(E);L<=M;L++)if(G=j(L,d,e),G!==!1){r(E,void 0!==G.pos?G.pos:L),E=L;break}}}else G={caret:B(E)}}return G===!1&&f.keepStatic&&!e&&h!==!0&&(G=k(E,d,e)),G===!0&&(G={pos:E}),a.isFunction(f.postValidation)&&G!==!1&&!e&&g!==!0&&(G=!!f.postValidation(v(!0),G,f)&&G),void 0===G.pos&&(G.pos=E),G===!1&&(m(!0),l().validPositions=a.extend(!0,{},H)),G}function A(a,b){var c;if(b?(c=q(a).match,\"\"===c.def&&(c=r(a).match)):c=r(a).match,null!=c.fn)return c.fn;if(b!==!0&&a>-1){var d=t(a);return d.length>1+(\"\"===d[d.length-1].match.def?1:0)}return!1}function B(a,b){var c=l().maskLength;if(a>=c)return c;for(var d=a;++d<c&&(b===!0&&(r(d).match.newBlockMarker!==!0||!A(d))||b!==!0&&!A(d)););return d}function C(a,b){var c,d=a;if(d<=0)return 0;for(;--d>0&&(b===!0&&r(d).match.newBlockMarker!==!0||b!==!0&&!A(d)&&(c=t(d),c.length<2||2===c.length&&\"\"===c[1].match.def)););return d}function D(a){return void 0===l().validPositions[a]?F(a):l().validPositions[a].input}function E(b,c,d,e,g){if(e&&a.isFunction(f.onBeforeWrite)){var h=f.onBeforeWrite(e,c,d,f);if(h){if(h.refreshFromBuffer){var i=h.refreshFromBuffer;w(i===!0?i:i.start,i.end,h.buffer||c),c=v(!0)}void 0!==d&&(d=void 0!==h.caret?h.caret:d)}}b.inputmask._valueSet(c.join(\"\")),void 0===d||void 0!==e&&\"blur\"===e.type?P(b,c,d):I(b,d),g===!0&&(Z=!0,a(b).trigger(\"input\"))}function F(a,b){if(b=b||r(a).match,void 0!==b.placeholder)return b.placeholder;if(null===b.fn){if(a>-1&&void 0===l().validPositions[a]){var c,d=t(a),e=[];if(d.length>1+(\"\"===d[d.length-1].match.def?1:0))for(var g=0;g<d.length;g++)if(d[g].match.optionality!==!0&&d[g].match.optionalQuantifier!==!0&&(null===d[g].match.fn||void 0===c||d[g].match.fn.test(c.match.def,l(),a,!0,f)!==!1)&&(e.push(d[g]),null===d[g].match.fn&&(c=d[g]),e.length>1&&/[0-9a-bA-Z]/.test(e[0].match.def)))return f.placeholder.charAt(a%f.placeholder.length)}return b.def}return f.placeholder.charAt(a%f.placeholder.length)}function G(c,d,e,g,h,i){function j(){var a=!1,b=u().slice(p,B(p)).join(\"\").indexOf(o);if(b!==-1&&!A(p)){a=!0;for(var c=u().slice(p,p+b),d=0;d<c.length;d++)if(\" \"!==c[d]){a=!1;break}}return a}var k=g.slice(),o=\"\",p=0,r=void 0;if(m(),l().p=B(-1),!e)if(f.autoUnmask!==!0){var s=u().slice(0,B(-1)).join(\"\"),t=k.join(\"\").match(new RegExp(\"^\"+b.escapeRegex(s),\"g\"));t&&t.length>0&&(k.splice(0,t.length*s.length),p=B(p))}else p=B(p);if(a.each(k,function(b,d){if(void 0!==d){var g=new a.Event(\"keypress\");g.which=d.charCodeAt(0),o+=d;var h=n(void 0,!0),i=l().validPositions[h],k=q(h+1,i?i.locator.slice():void 0,h);if(!j()||e||f.autoUnmask){var s=e?b:null==k.match.fn&&k.match.optionality&&h+1<l().p?h+1:l().p;r=ba.keypressEvent.call(c,g,!0,!1,e,s),p=s+1,o=\"\"}else r=ba.keypressEvent.call(c,g,!0,!1,!0,h+1);if(!e&&a.isFunction(f.onBeforeWrite)&&(r=f.onBeforeWrite(g,v(),r.forwardPosition,f),r&&r.refreshFromBuffer)){var t=r.refreshFromBuffer;w(t===!0?t:t.start,t.end,r.buffer),m(!0),r.caret&&(l().p=r.caret)}}}),d){var x=void 0,y=n();document.activeElement===c&&(h||r)&&(x=I(c).begin,h&&r===!1&&(x=B(n(x))),r&&i!==!0&&(x<y+1||y===-1)&&(x=f.numericInput&&void 0===r.caret?C(r.forwardPosition):r.forwardPosition)),E(c,v(),x,h||new a.Event(\"checkval\"))}}function H(b){if(b&&void 0===b.inputmask)return b.value;var c=[],d=l().validPositions;for(var e in d)d[e].match&&null!=d[e].match.fn&&c.push(d[e].input);var g=0===c.length?\"\":(X?c.reverse():c).join(\"\");if(a.isFunction(f.onUnMask)){var h=(X?v().slice().reverse():v()).join(\"\");g=f.onUnMask(h,g,f)||g}return g}function I(a,b,c,d){function e(a){if(d!==!0&&X&&\"number\"==typeof a&&(!f.greedy||\"\"!==f.placeholder)){var b=v().join(\"\").length;a=b-a}return a}var h;if(\"number\"!=typeof b)return a.setSelectionRange?(b=a.selectionStart,c=a.selectionEnd):window.getSelection?(h=window.getSelection().getRangeAt(0),h.commonAncestorContainer.parentNode!==a&&h.commonAncestorContainer!==a||(b=h.startOffset,c=h.endOffset)):document.selection&&document.selection.createRange&&(h=document.selection.createRange(),b=0-h.duplicate().moveStart(\"character\",-a.inputmask._valueGet().length),c=b+h.text.length),{begin:e(b),end:e(c)};b=e(b),c=e(c),c=\"number\"==typeof c?c:b;var i=parseInt(((a.ownerDocument.defaultView||window).getComputedStyle?(a.ownerDocument.defaultView||window).getComputedStyle(a,null):a.currentStyle).fontSize)*c;if(a.scrollLeft=i>a.scrollWidth?i:0,g||f.insertMode!==!1||b!==c||c++,a.setSelectionRange)a.selectionStart=b,a.selectionEnd=c;else if(window.getSelection){if(h=document.createRange(),void 0===a.firstChild||null===a.firstChild){var j=document.createTextNode(\"\");a.appendChild(j)}h.setStart(a.firstChild,b<a.inputmask._valueGet().length?b:a.inputmask._valueGet().length),h.setEnd(a.firstChild,c<a.inputmask._valueGet().length?c:a.inputmask._valueGet().length),h.collapse(!0);var k=window.getSelection();k.removeAllRanges(),k.addRange(h)}else a.createTextRange&&(h=a.createTextRange(),h.collapse(!0),h.moveEnd(\"character\",c),h.moveStart(\"character\",b),h.select());P(a,void 0,{begin:b,end:c})}function J(b){var c,d,e=v(),f=e.length,g=n(),h={},i=l().validPositions[g],j=void 0!==i?i.locator.slice():void 0;for(c=g+1;c<e.length;c++)d=q(c,j,c-1),j=d.locator.slice(),h[c]=a.extend(!0,{},d);var k=i&&void 0!==i.alternation?i.locator[i.alternation]:void 0;for(c=f-1;c>g&&(d=h[c],(d.match.optionality||d.match.optionalQuantifier||k&&(k!==h[c].locator[i.alternation]&&null!=d.match.fn||null===d.match.fn&&d.locator[i.alternation]&&y(d.locator[i.alternation].toString().split(\",\"),k.toString().split(\",\"))&&\"\"!==t(c)[0].def))&&e[c]===F(c,d.match));c--)f--;return b?{l:f,def:h[f]?h[f].match:void 0}:f}function K(a){for(var b=J(),c=a.length-1;c>b&&!A(c);c--);return a.splice(b,c+1-b),a}function L(b){if(a.isFunction(f.isComplete))return f.isComplete(b,f);if(\"*\"!==f.repeat){var c=!1,d=J(!0),e=C(d.l);if(void 0===d.def||d.def.newBlockMarker||d.def.optionality||d.def.optionalQuantifier){c=!0;for(var g=0;g<=e;g++){var h=q(g).match;if(null!==h.fn&&void 0===l().validPositions[g]&&h.optionality!==!0&&h.optionalQuantifier!==!0||null===h.fn&&b[g]!==F(g,h)){c=!1;break}}}return c}}function M(b){function c(b){if(a.valHooks&&(void 0===a.valHooks[b]||a.valHooks[b].inputmaskpatch!==!0)){var c=a.valHooks[b]&&a.valHooks[b].get?a.valHooks[b].get:function(a){return a.value},d=a.valHooks[b]&&a.valHooks[b].set?a.valHooks[b].set:function(a,b){return a.value=b,a};a.valHooks[b]={get:function(a){if(a.inputmask){if(a.inputmask.opts.autoUnmask)return a.inputmask.unmaskedvalue();var b=c(a);return n(void 0,void 0,a.inputmask.maskset.validPositions)!==-1||f.nullable!==!0?b:\"\"}return c(a)},set:function(b,c){var e,f=a(b);return e=d(b,c),b.inputmask&&f.trigger(\"setvalue\"),e},inputmaskpatch:!0}}}function d(){return this.inputmask?this.inputmask.opts.autoUnmask?this.inputmask.unmaskedvalue():n()!==-1||f.nullable!==!0?document.activeElement===this&&f.clearMaskOnLostFocus?(X?K(v().slice()).reverse():K(v().slice())).join(\"\"):h.call(this):\"\":h.call(this)}function e(b){i.call(this,b),this.inputmask&&a(this).trigger(\"setvalue\")}function g(b){aa.on(b,\"mouseenter\",function(b){var c=a(this),d=this,e=d.inputmask._valueGet();e!==v().join(\"\")&&c.trigger(\"setvalue\")})}var h,i;if(!b.inputmask.__valueGet){if(f.noValuePatching!==!0){if(Object.getOwnPropertyDescriptor){\"function\"!=typeof Object.getPrototypeOf&&(Object.getPrototypeOf=\"object\"==typeof\"test\".__proto__?function(a){return a.__proto__}:function(a){return a.constructor.prototype});var j=Object.getPrototypeOf?Object.getOwnPropertyDescriptor(Object.getPrototypeOf(b),\"value\"):void 0;j&&j.get&&j.set?(h=j.get,i=j.set,Object.defineProperty(b,\"value\",{get:d,set:e,configurable:!0})):\"INPUT\"!==b.tagName&&(h=function(){return this.textContent},i=function(a){this.textContent=a},Object.defineProperty(b,\"value\",{get:d,set:e,configurable:!0}))}else document.__lookupGetter__&&b.__lookupGetter__(\"value\")&&(h=b.__lookupGetter__(\"value\"),i=b.__lookupSetter__(\"value\"),b.__defineGetter__(\"value\",d),b.__defineSetter__(\"value\",e));b.inputmask.__valueGet=h,b.inputmask.__valueSet=i}b.inputmask._valueGet=function(a){return X&&a!==!0?h.call(this.el).split(\"\").reverse().join(\"\"):h.call(this.el)},b.inputmask._valueSet=function(a,b){i.call(this.el,null===a||void 0===a?\"\":b!==!0&&X?a.split(\"\").reverse().join(\"\"):a)},void 0===h&&(h=function(){return this.value},i=function(a){this.value=a},c(b.type),g(b))}}function N(c,d,e,g){function h(){if(f.keepStatic){for(var b=[],d=n(-1,!0),e=a.extend(!0,{},l().validPositions),g=l().validPositions[d];d>=0;d--){var h=l().validPositions[d];if(h){if(h.generatedInput!==!0&&/[0-9a-bA-Z]/.test(h.input)&&b.push(h.input),delete l().validPositions[d],void 0!==h.alternation&&h.locator[h.alternation]!==g.locator[h.alternation])break;g=h}}if(d>-1)for(l().p=B(n(-1,!0));b.length>0;){var i=new a.Event(\"keypress\");i.which=b.pop().charCodeAt(0),ba.keypressEvent.call(c,i,!0,!1,!1,l().p)}else l().validPositions=a.extend(!0,{},e)}}if((f.numericInput||X)&&(d===b.keyCode.BACKSPACE?d=b.keyCode.DELETE:d===b.keyCode.DELETE&&(d=b.keyCode.BACKSPACE),X)){var i=e.end;e.end=e.begin,e.begin=i}d===b.keyCode.BACKSPACE&&(e.end-e.begin<1||f.insertMode===!1)?(e.begin=C(e.begin),void 0===l().validPositions[e.begin]||l().validPositions[e.begin].input!==f.groupSeparator&&l().validPositions[e.begin].input!==f.radixPoint||e.begin--):d===b.keyCode.DELETE&&e.begin===e.end&&(e.end=A(e.end,!0)?e.end+1:B(e.end)+1,void 0===l().validPositions[e.begin]||l().validPositions[e.begin].input!==f.groupSeparator&&l().validPositions[e.begin].input!==f.radixPoint||e.end++),o(e.begin,e.end,!1,g),g!==!0&&h();var j=n(e.begin,!0);j<e.begin?l().p=B(j):g!==!0&&(l().p=e.begin)}function O(b){function c(a){var c,d=document.createElement(\"span\");for(var e in g)isNaN(e)&&e.indexOf(\"font\")!==-1&&(d.style[e]=g[e]);d.style.textTransform=g.textTransform,d.style.letterSpacing=g.letterSpacing,d.style.position=\"absolute\",d.style.height=\"auto\",d.style.width=\"auto\",d.style.visibility=\"hidden\",d.style.whiteSpace=\"nowrap\",document.body.appendChild(d);var f,h=b.inputmask._valueGet(),i=0;for(c=0,f=h.length;c<=f;c++){if(d.innerHTML+=h.charAt(c)||\"_\",d.offsetWidth>=a){var j=a-i,k=d.offsetWidth-a;d.innerHTML=h.charAt(c),j-=d.offsetWidth/3,c=j<k?c-1:c;break}i=d.offsetWidth}return document.body.removeChild(d),c}function d(){U.style.position=\"absolute\",U.style.top=e.top+\"px\",U.style.left=e.left+\"px\",U.style.width=parseInt(b.offsetWidth)-parseInt(g.paddingLeft)-parseInt(g.paddingRight)-parseInt(g.borderLeftWidth)-parseInt(g.borderRightWidth)+\"px\",U.style.height=parseInt(b.offsetHeight)-parseInt(g.paddingTop)-parseInt(g.paddingBottom)-parseInt(g.borderTopWidth)-parseInt(g.borderBottomWidth)+\"px\",U.style.lineHeight=U.style.height,U.style.zIndex=isNaN(g.zIndex)?-1:g.zIndex-1,U.style.webkitAppearance=\"textfield\",U.style.mozAppearance=\"textfield\",U.style.Appearance=\"textfield\"}var e=a(b).position(),g=(b.ownerDocument.defaultView||window).getComputedStyle(b,null);b.parentNode;U=document.createElement(\"div\"),document.body.appendChild(U);for(var h in g)isNaN(h)&&\"cssText\"!==h&&h.indexOf(\"webkit\")==-1&&(U.style[h]=g[h]);b.style.backgroundColor=\"transparent\",b.style.color=\"transparent\",b.style.webkitAppearance=\"caret\",b.style.mozAppearance=\"caret\",b.style.Appearance=\"caret\",d(),a(window).on(\"resize\",function(c){e=a(b).position(),g=(b.ownerDocument.defaultView||window).getComputedStyle(b,null),d()}),a(b).on(\"click\",function(a){return I(b,c(a.clientX)),ba.clickEvent.call(this,[a])}),a(b).on(\"keydown\",function(a){a.shiftKey||f.insertMode===!1||setTimeout(function(){P(b)},0)})}function P(a,b,c){function d(){g||null!==i.fn&&void 0!==j.input?g&&null!==i.fn&&void 0!==j.input&&(g=!1,e+=\"</span>\"):(g=!0,e+=\"<span class='im-static''>\")}if(void 0!==U){b=b||v(),void 0===c?c=I(a):void 0===c.begin&&(c={begin:c,end:c});var e=\"\",g=!1;if(\"\"!=b){var h,i,j,k=0,m=n();do k===c.begin&&document.activeElement===a&&(e+=\"<span class='im-caret' style='border-right-width: 1px;border-right-style: solid;'></span>\"),l().validPositions[k]?(j=l().validPositions[k],i=j.match,h=j.locator.slice(),d(),e+=j.input):(j=q(k,h,k-1),i=j.match,h=j.locator.slice(),(f.jitMasking===!1||k<m||Number.isFinite(f.jitMasking)&&f.jitMasking>k)&&(d(),e+=F(k,i))),k++;while((void 0===T||k<T)&&(null!==i.fn||\"\"!==i.def)||m>k)}U.innerHTML=e}}function Q(b){function c(b,c){var d=b.getAttribute(\"type\"),e=\"INPUT\"===b.tagName&&a.inArray(d,c.supportsInputType)!==-1||b.isContentEditable||\"TEXTAREA\"===b.tagName;if(!e&&\"INPUT\"===b.tagName){var f=document.createElement(\"input\");f.setAttribute(\"type\",d),e=\"text\"===f.type,f=null}return e}if(c(b,f)&&(W=b,S=a(W),f.showTooltip&&(W.title=f.tooltip||l().mask),(\"rtl\"===W.dir||f.rightAlign)&&(W.style.textAlign=\"right\"),(\"rtl\"===W.dir||f.numericInput)&&(W.dir=\"ltr\",W.removeAttribute(\"dir\"),W.inputmask.isRTL=!0,X=!0),f.colorMask===!0&&O(W),j&&(W.hasOwnProperty(\"inputmode\")&&(W.inputmode=f.inputmode,W.setAttribute(\"inputmode\",f.inputmode)),\"rtfm\"===f.androidHack&&(f.colorMask!==!0&&O(W),W.type=\"password\")),aa.off(W),M(W),aa.on(W,\"submit\",ba.submitEvent),aa.on(W,\"reset\",ba.resetEvent),aa.on(W,\"mouseenter\",ba.mouseenterEvent),aa.on(W,\"blur\",ba.blurEvent),aa.on(W,\"focus\",ba.focusEvent),aa.on(W,\"mouseleave\",ba.mouseleaveEvent),f.colorMask!==!0&&aa.on(W,\"click\",ba.clickEvent),aa.on(W,\"dblclick\",ba.dblclickEvent),aa.on(W,\"paste\",ba.pasteEvent),aa.on(W,\"dragdrop\",ba.pasteEvent),aa.on(W,\"drop\",ba.pasteEvent),aa.on(W,\"cut\",ba.cutEvent),aa.on(W,\"complete\",f.oncomplete),aa.on(W,\"incomplete\",f.onincomplete),aa.on(W,\"cleared\",f.oncleared),f.inputEventOnly!==!0&&(aa.on(W,\"keydown\",ba.keydownEvent),aa.on(W,\"keypress\",ba.keypressEvent)),aa.on(W,\"compositionstart\",a.noop),aa.on(W,\"compositionupdate\",a.noop),aa.on(W,\"compositionend\",a.noop),aa.on(W,\"keyup\",a.noop),aa.on(W,\"input\",ba.inputFallBackEvent),aa.on(W,\"setvalue\",ba.setValueEvent),u(),\"\"!==W.inputmask._valueGet()||f.clearMaskOnLostFocus===!1||document.activeElement===W)){var d=a.isFunction(f.onBeforeMask)?f.onBeforeMask(W.inputmask._valueGet(),f)||W.inputmask._valueGet():W.inputmask._valueGet();G(W,!0,!1,d.split(\"\"));var e=v().slice();R=e.join(\"\"),L(e)===!1&&f.clearIncomplete&&m(),f.clearMaskOnLostFocus&&document.activeElement!==W&&(n()===-1?e=[]:K(e)),E(W,e),document.activeElement===W&&I(W,B(n()))}}d=d||this.maskset,f=f||this.opts;var R,S,T,U,V,W=this.el,X=this.isRTL,Y=!1,Z=!1,$=!1,_=!1,aa={on:function(c,d,e){var g=function(c){if(void 0===this.inputmask&&\"FORM\"!==this.nodeName){var d=a.data(this,\"_inputmask_opts\");d?new b(d).mask(this):aa.off(this)}else{if(\"setvalue\"===c.type||!(this.disabled||this.readOnly&&!(\"keydown\"===c.type&&c.ctrlKey&&67===c.keyCode||f.tabThrough===!1&&c.keyCode===b.keyCode.TAB))){switch(c.type){case\"input\":if(Z===!0)return Z=!1,c.preventDefault();break;case\"keydown\":Y=!1,Z=!1;break;case\"keypress\":if(Y===!0)return c.preventDefault();Y=!0;break;case\"click\":if(h||i){var g=this,j=arguments;return setTimeout(function(){e.apply(g,j)},0),!1}}var k=e.apply(this,arguments);return k===!1&&(c.preventDefault(),c.stopPropagation()),k}c.preventDefault()}};c.inputmask.events[d]=c.inputmask.events[d]||[],c.inputmask.events[d].push(g),a.inArray(d,[\"submit\",\"reset\"])!==-1?null!=c.form&&a(c.form).on(d,g):a(c).on(d,g)},off:function(b,c){if(b.inputmask&&b.inputmask.events){var d;c?(d=[],d[c]=b.inputmask.events[c]):d=b.inputmask.events,a.each(d,function(c,d){for(;d.length>0;){var e=d.pop();a.inArray(c,[\"submit\",\"reset\"])!==-1?null!=b.form&&a(b.form).off(c,e):a(b).off(c,e)}delete b.inputmask.events[c]})}}},ba={keydownEvent:function(c){function d(a){var b=document.createElement(\"input\"),c=\"on\"+a,d=c in b;return d||(b.setAttribute(c,\"return;\"),d=\"function\"==typeof b[c]),b=null,d}var e=this,g=a(e),h=c.keyCode,j=I(e);if(h===b.keyCode.BACKSPACE||h===b.keyCode.DELETE||i&&h===b.keyCode.BACKSPACE_SAFARI||c.ctrlKey&&h===b.keyCode.X&&!d(\"cut\"))c.preventDefault(),N(e,h,j),E(e,v(!0),l().p,c,e.inputmask._valueGet()!==v().join(\"\")),e.inputmask._valueGet()===u().join(\"\")?g.trigger(\"cleared\"):L(v())===!0&&g.trigger(\"complete\"),f.showTooltip&&(e.title=f.tooltip||l().mask);else if(h===b.keyCode.END||h===b.keyCode.PAGE_DOWN){c.preventDefault();var k=B(n());f.insertMode||k!==l().maskLength||c.shiftKey||k--,I(e,c.shiftKey?j.begin:k,k,!0)}else h===b.keyCode.HOME&&!c.shiftKey||h===b.keyCode.PAGE_UP?(c.preventDefault(),I(e,0,c.shiftKey?j.begin:0,!0)):(f.undoOnEscape&&h===b.keyCode.ESCAPE||90===h&&c.ctrlKey)&&c.altKey!==!0?(G(e,!0,!1,R.split(\"\")),g.trigger(\"click\")):h!==b.keyCode.INSERT||c.shiftKey||c.ctrlKey?f.tabThrough===!0&&h===b.keyCode.TAB?(c.shiftKey===!0?(null===r(j.begin).match.fn&&(j.begin=B(j.begin)),j.end=C(j.begin,!0),j.begin=C(j.end,!0)):(j.begin=B(j.begin,!0),j.end=B(j.begin,!0),j.end<l().maskLength&&j.end--),j.begin<l().maskLength&&(c.preventDefault(),I(e,j.begin,j.end))):c.shiftKey||f.insertMode===!1&&(h===b.keyCode.RIGHT?setTimeout(function(){var a=I(e);I(e,a.begin)},0):h===b.keyCode.LEFT&&setTimeout(function(){var a=I(e);I(e,X?a.begin+1:a.begin-1)},0)):(f.insertMode=!f.insertMode,I(e,f.insertMode||j.begin!==l().maskLength?j.begin:j.begin-1));f.onKeyDown.call(this,c,v(),I(e).begin,f),$=a.inArray(h,f.ignorables)!==-1},keypressEvent:function(c,d,e,g,h){\nvar i=this,j=a(i),k=c.which||c.charCode||c.keyCode;if(!(d===!0||c.ctrlKey&&c.altKey)&&(c.ctrlKey||c.metaKey||$))return k===b.keyCode.ENTER&&R!==v().join(\"\")&&(R=v().join(\"\"),setTimeout(function(){j.trigger(\"change\")},0)),!0;if(k){46===k&&c.shiftKey===!1&&\",\"===f.radixPoint&&(k=44);var n,o=d?{begin:h,end:h}:I(i),p=String.fromCharCode(k);l().writeOutBuffer=!0;var q=z(o,p,g);if(q!==!1&&(m(!0),n=void 0!==q.caret?q.caret:d?q.pos+1:B(q.pos),l().p=n),e!==!1){var r=this;if(setTimeout(function(){f.onKeyValidation.call(r,k,q,f)},0),l().writeOutBuffer&&q!==!1){var s=v();E(i,s,f.numericInput&&void 0===q.caret?C(n):n,c,d!==!0),d!==!0&&setTimeout(function(){L(s)===!0&&j.trigger(\"complete\")},0)}}if(f.showTooltip&&(i.title=f.tooltip||l().mask),c.preventDefault(),d)return q.forwardPosition=n,q}},pasteEvent:function(b){var c,d=this,e=b.originalEvent||b,g=a(d),h=d.inputmask._valueGet(!0),i=I(d);X&&(c=i.end,i.end=i.begin,i.begin=c);var j=h.substr(0,i.begin),k=h.substr(i.end,h.length);if(j===(X?u().reverse():u()).slice(0,i.begin).join(\"\")&&(j=\"\"),k===(X?u().reverse():u()).slice(i.end).join(\"\")&&(k=\"\"),X&&(c=j,j=k,k=c),window.clipboardData&&window.clipboardData.getData)h=j+window.clipboardData.getData(\"Text\")+k;else{if(!e.clipboardData||!e.clipboardData.getData)return!0;h=j+e.clipboardData.getData(\"text/plain\")+k}var l=h;if(a.isFunction(f.onBeforePaste)){if(l=f.onBeforePaste(h,f),l===!1)return b.preventDefault();l||(l=h)}return G(d,!1,!1,X?l.split(\"\").reverse():l.toString().split(\"\")),E(d,v(),B(n()),b,R!==v().join(\"\")),L(v())===!0&&g.trigger(\"complete\"),b.preventDefault()},inputFallBackEvent:function(c){var d=this,e=d.inputmask._valueGet();if(v().join(\"\")!==e){var f=I(d);if(e=e.replace(new RegExp(\"(\"+b.escapeRegex(u().join(\"\"))+\")*\"),\"\"),h){var g=e.replace(v().join(\"\"),\"\");if(1===g.length){var i=new a.Event(\"keypress\");return i.which=g.charCodeAt(0),ba.keypressEvent.call(d,i,!0,!0,!1,l().validPositions[f.begin-1]?f.begin:f.begin-1),!1}}if(f.begin>e.length&&(I(d,e.length),f=I(d)),v().length-e.length!==1||e.charAt(f.begin)===v()[f.begin]||e.charAt(f.begin+1)===v()[f.begin]||A(f.begin)){for(var j=n()+1,k=u().join(\"\");null===e.match(b.escapeRegex(k)+\"$\");)k=k.slice(1);e=e.replace(k,\"\"),e=e.split(\"\"),G(d,!0,!1,e,c,f.begin<j),L(v())===!0&&a(d).trigger(\"complete\")}else c.keyCode=b.keyCode.BACKSPACE,ba.keydownEvent.call(d,c);c.preventDefault()}},setValueEvent:function(b){var c=this,d=c.inputmask._valueGet();G(c,!0,!1,(a.isFunction(f.onBeforeMask)?f.onBeforeMask(d,f)||d:d).split(\"\")),R=v().join(\"\"),(f.clearMaskOnLostFocus||f.clearIncomplete)&&c.inputmask._valueGet()===u().join(\"\")&&c.inputmask._valueSet(\"\")},focusEvent:function(a){var b=this,c=b.inputmask._valueGet();f.showMaskOnFocus&&(!f.showMaskOnHover||f.showMaskOnHover&&\"\"===c)&&(b.inputmask._valueGet()!==v().join(\"\")?E(b,v(),B(n())):_===!1&&I(b,B(n()))),f.positionCaretOnTab===!0&&setTimeout(function(){ba.clickEvent.apply(this,[a])},0),R=v().join(\"\")},mouseleaveEvent:function(a){var b=this;if(_=!1,f.clearMaskOnLostFocus&&document.activeElement!==b){var c=v().slice(),d=b.inputmask._valueGet();d!==b.getAttribute(\"placeholder\")&&\"\"!==d&&(n()===-1&&d===u().join(\"\")?c=[]:K(c),E(b,c))}},clickEvent:function(b){function c(b){if(\"\"!==f.radixPoint){var c=l().validPositions;if(void 0===c[b]||c[b].input===F(b)){if(b<B(-1))return!0;var d=a.inArray(f.radixPoint,v());if(d!==-1){for(var e in c)if(d<e&&c[e].input!==F(e))return!1;return!0}}}return!1}var d=this;setTimeout(function(){if(document.activeElement===d){var b=I(d);if(b.begin===b.end)switch(f.positionCaretOnClick){case\"none\":break;case\"radixFocus\":if(c(b.begin)){var e=a.inArray(f.radixPoint,v().join(\"\"));I(d,f.numericInput?B(e):e);break}default:var g=b.begin,h=n(g,!0),i=B(h);if(g<i)I(d,A(g)||A(g-1)?g:B(g));else{var j=F(i);(\"\"!==j&&v()[i]!==j&&r(i).match.optionalQuantifier!==!0||!A(i)&&r(i).match.def===j)&&(i=B(i)),I(d,i)}}}},0)},dblclickEvent:function(a){var b=this;setTimeout(function(){I(b,0,B(n()))},0)},cutEvent:function(c){var d=this,e=a(d),g=I(d),h=c.originalEvent||c,i=window.clipboardData||h.clipboardData,j=X?v().slice(g.end,g.begin):v().slice(g.begin,g.end);i.setData(\"text\",X?j.reverse().join(\"\"):j.join(\"\")),document.execCommand&&document.execCommand(\"copy\"),N(d,b.keyCode.DELETE,g),E(d,v(),l().p,c,R!==v().join(\"\")),d.inputmask._valueGet()===u().join(\"\")&&e.trigger(\"cleared\"),f.showTooltip&&(d.title=f.tooltip||l().mask)},blurEvent:function(b){var c=a(this),d=this;if(d.inputmask){var e=d.inputmask._valueGet(),g=v().slice();R!==g.join(\"\")&&setTimeout(function(){c.trigger(\"change\"),R=g.join(\"\")},0),\"\"!==e&&(f.clearMaskOnLostFocus&&(n()===-1&&e===u().join(\"\")?g=[]:K(g)),L(g)===!1&&(setTimeout(function(){c.trigger(\"incomplete\")},0),f.clearIncomplete&&(m(),g=f.clearMaskOnLostFocus?[]:u().slice())),E(d,g,void 0,b))}},mouseenterEvent:function(a){var b=this;_=!0,document.activeElement!==b&&f.showMaskOnHover&&b.inputmask._valueGet()!==v().join(\"\")&&E(b,v())},submitEvent:function(a){R!==v().join(\"\")&&S.trigger(\"change\"),f.clearMaskOnLostFocus&&n()===-1&&W.inputmask._valueGet&&W.inputmask._valueGet()===u().join(\"\")&&W.inputmask._valueSet(\"\"),f.removeMaskOnSubmit&&(W.inputmask._valueSet(W.inputmask.unmaskedvalue(),!0),setTimeout(function(){E(W,v())},0))},resetEvent:function(a){setTimeout(function(){S.trigger(\"setvalue\")},0)}};if(void 0!==c)switch(c.action){case\"isComplete\":return W=c.el,L(v());case\"unmaskedvalue\":return void 0!==W&&void 0===c.value||(V=c.value,V=(a.isFunction(f.onBeforeMask)?f.onBeforeMask(V,f)||V:V).split(\"\"),G(void 0,!1,!1,X?V.reverse():V),a.isFunction(f.onBeforeWrite)&&f.onBeforeWrite(void 0,v(),0,f)),H(W);case\"mask\":Q(W);break;case\"format\":return V=(a.isFunction(f.onBeforeMask)?f.onBeforeMask(c.value,f)||c.value:c.value).split(\"\"),G(void 0,!1,!1,X?V.reverse():V),a.isFunction(f.onBeforeWrite)&&f.onBeforeWrite(void 0,v(),0,f),c.metadata?{value:X?v().slice().reverse().join(\"\"):v().join(\"\"),metadata:e.call(this,{action:\"getmetadata\"},d,f)}:X?v().slice().reverse().join(\"\"):v().join(\"\");case\"isValid\":c.value?(V=c.value.split(\"\"),G(void 0,!1,!0,X?V.reverse():V)):c.value=v().join(\"\");for(var ca=v(),da=J(),ea=ca.length-1;ea>da&&!A(ea);ea--);return ca.splice(da,ea+1-da),L(ca)&&c.value===v().join(\"\");case\"getemptymask\":return u().join(\"\");case\"remove\":if(W){S=a(W),W.inputmask._valueSet(H(W)),aa.off(W);var fa;Object.getOwnPropertyDescriptor&&Object.getPrototypeOf?(fa=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(W),\"value\"),fa&&W.inputmask.__valueGet&&Object.defineProperty(W,\"value\",{get:W.inputmask.__valueGet,set:W.inputmask.__valueSet,configurable:!0})):document.__lookupGetter__&&W.__lookupGetter__(\"value\")&&W.inputmask.__valueGet&&(W.__defineGetter__(\"value\",W.inputmask.__valueGet),W.__defineSetter__(\"value\",W.inputmask.__valueSet)),W.inputmask=void 0}return W;case\"getmetadata\":if(a.isArray(d.metadata)){var ga=k(!0,0,!1).join(\"\");return a.each(d.metadata,function(a,b){if(b.mask===ga)return ga=b,!1}),ga}return d.metadata}}var f=navigator.userAgent,g=/mobile/i.test(f),h=/iemobile/i.test(f),i=/iphone/i.test(f)&&!h,j=/android/i.test(f)&&!h;return b.prototype={defaults:{placeholder:\"_\",optionalmarker:{start:\"[\",end:\"]\"},quantifiermarker:{start:\"{\",end:\"}\"},groupmarker:{start:\"(\",end:\")\"},alternatormarker:\"|\",escapeChar:\"\\\\\",mask:null,oncomplete:a.noop,onincomplete:a.noop,oncleared:a.noop,repeat:0,greedy:!0,autoUnmask:!1,removeMaskOnSubmit:!1,clearMaskOnLostFocus:!0,insertMode:!0,clearIncomplete:!1,aliases:{},alias:null,onKeyDown:a.noop,onBeforeMask:null,onBeforePaste:function(b,c){return a.isFunction(c.onBeforeMask)?c.onBeforeMask(b,c):b},onBeforeWrite:null,onUnMask:null,showMaskOnFocus:!0,showMaskOnHover:!0,onKeyValidation:a.noop,skipOptionalPartCharacter:\" \",showTooltip:!1,tooltip:void 0,numericInput:!1,rightAlign:!1,undoOnEscape:!0,radixPoint:\"\",radixPointDefinitionSymbol:void 0,groupSeparator:\"\",keepStatic:null,positionCaretOnTab:!0,tabThrough:!1,supportsInputType:[\"text\",\"tel\",\"password\"],definitions:{9:{validator:\"[0-9]\",cardinality:1,definitionSymbol:\"*\"},a:{validator:\"[A-Za-z\\u0410-\\u044f\\u0401\\u0451\\xc0-\\xff\\xb5]\",cardinality:1,definitionSymbol:\"*\"},\"*\":{validator:\"[0-9A-Za-z\\u0410-\\u044f\\u0401\\u0451\\xc0-\\xff\\xb5]\",cardinality:1}},ignorables:[8,9,13,19,27,33,34,35,36,37,38,39,40,45,46,93,112,113,114,115,116,117,118,119,120,121,122,123],isComplete:null,canClearPosition:a.noop,postValidation:null,staticDefinitionSymbol:void 0,jitMasking:!1,nullable:!0,inputEventOnly:!1,noValuePatching:!1,positionCaretOnClick:\"lvp\",casing:null,inputmode:\"verbatim\",colorMask:!1,androidHack:!1},masksCache:{},mask:function(f){function g(b,d,e,f){function g(a,c){c=void 0!==c?c:b.getAttribute(f+\"-\"+a),null!==c&&(\"string\"==typeof c&&(0===a.indexOf(\"on\")?c=window[c]:\"false\"===c?c=!1:\"true\"===c&&(c=!0)),e[a]=c)}var h,i,j,k,l=b.getAttribute(f);if(l&&\"\"!==l&&(l=l.replace(new RegExp(\"'\",\"g\"),'\"'),i=JSON.parse(\"{\"+l+\"}\")),i){j=void 0;for(k in i)if(\"alias\"===k.toLowerCase()){j=i[k];break}}g(\"alias\",j),e.alias&&c(e.alias,e,d);for(h in d){if(i){j=void 0;for(k in i)if(k.toLowerCase()===h.toLowerCase()){j=i[k];break}}g(h,j)}return a.extend(!0,d,e),d}var h=this;return\"string\"==typeof f&&(f=document.getElementById(f)||document.querySelectorAll(f)),f=f.nodeName?[f]:f,a.each(f,function(c,f){var i=a.extend(!0,{},h.opts);g(f,i,a.extend(!0,{},h.userOptions),h.dataAttribute);var j=d(i,h.noMasksCache);void 0!==j&&(void 0!==f.inputmask&&f.inputmask.remove(),f.inputmask=new b,f.inputmask.opts=i,f.inputmask.noMasksCache=h.noMasksCache,f.inputmask.userOptions=a.extend(!0,{},h.userOptions),f.inputmask.el=f,f.inputmask.maskset=j,a.data(f,\"_inputmask_opts\",i),e.call(f.inputmask,{action:\"mask\"}))}),f&&f[0]?f[0].inputmask||this:this},option:function(b,c){return\"string\"==typeof b?this.opts[b]:\"object\"==typeof b?(a.extend(this.userOptions,b),this.el&&c!==!0&&this.mask(this.el),this):void 0},unmaskedvalue:function(a){return this.maskset=this.maskset||d(this.opts,this.noMasksCache),e.call(this,{action:\"unmaskedvalue\",value:a})},remove:function(){return e.call(this,{action:\"remove\"})},getemptymask:function(){return this.maskset=this.maskset||d(this.opts,this.noMasksCache),e.call(this,{action:\"getemptymask\"})},hasMaskedValue:function(){return!this.opts.autoUnmask},isComplete:function(){return this.maskset=this.maskset||d(this.opts,this.noMasksCache),e.call(this,{action:\"isComplete\"})},getmetadata:function(){return this.maskset=this.maskset||d(this.opts,this.noMasksCache),e.call(this,{action:\"getmetadata\"})},isValid:function(a){return this.maskset=this.maskset||d(this.opts,this.noMasksCache),e.call(this,{action:\"isValid\",value:a})},format:function(a,b){return this.maskset=this.maskset||d(this.opts,this.noMasksCache),e.call(this,{action:\"format\",value:a,metadata:b})},analyseMask:function(b,c){function d(a,b,c,d){this.matches=[],this.isGroup=a||!1,this.isOptional=b||!1,this.isQuantifier=c||!1,this.isAlternator=d||!1,this.quantifier={min:1,max:1}}function e(b,d,e){var f=c.definitions[d];e=void 0!==e?e:b.matches.length;var g=b.matches[e-1];if(f&&!r){f.placeholder=a.isFunction(f.placeholder)?f.placeholder(c):f.placeholder;for(var h=f.prevalidator,i=h?h.length:0,j=1;j<f.cardinality;j++){var k=i>=j?h[j-1]:[],l=k.validator,m=k.cardinality;b.matches.splice(e++,0,{fn:l?\"string\"==typeof l?new RegExp(l):new function(){this.test=l}:new RegExp(\".\"),cardinality:m?m:1,optionality:b.isOptional,newBlockMarker:void 0===g||g.def!==(f.definitionSymbol||d),casing:f.casing,def:f.definitionSymbol||d,placeholder:f.placeholder,nativeDef:d}),g=b.matches[e-1]}b.matches.splice(e++,0,{fn:f.validator?\"string\"==typeof f.validator?new RegExp(f.validator):new function(){this.test=f.validator}:new RegExp(\".\"),cardinality:f.cardinality,optionality:b.isOptional,newBlockMarker:void 0===g||g.def!==(f.definitionSymbol||d),casing:f.casing,def:f.definitionSymbol||d,placeholder:f.placeholder,nativeDef:d})}else b.matches.splice(e++,0,{fn:null,cardinality:0,optionality:b.isOptional,newBlockMarker:void 0===g||g.def!==d,casing:null,def:c.staticDefinitionSymbol||d,placeholder:void 0!==c.staticDefinitionSymbol?d:void 0,nativeDef:d}),r=!1}function f(a,b){a&&a.isGroup&&(a.isGroup=!1,e(a,c.groupmarker.start,0),b!==!0&&e(a,c.groupmarker.end))}function g(a,b,c,d){b.matches.length>0&&(void 0===d||d)&&(c=b.matches[b.matches.length-1],f(c)),e(b,a)}function h(){if(t.length>0){if(m=t[t.length-1],g(k,m,o,!m.isAlternator),m.isAlternator){n=t.pop();for(var a=0;a<n.matches.length;a++)n.matches[a].isGroup=!1;t.length>0?(m=t[t.length-1],m.matches.push(n)):s.matches.push(n)}}else g(k,s,o)}function i(a){function b(a){return a===c.optionalmarker.start?a=c.optionalmarker.end:a===c.optionalmarker.end?a=c.optionalmarker.start:a===c.groupmarker.start?a=c.groupmarker.end:a===c.groupmarker.end&&(a=c.groupmarker.start),a}a.matches=a.matches.reverse();for(var d in a.matches){var e=parseInt(d);if(a.matches[d].isQuantifier&&a.matches[e+1]&&a.matches[e+1].isGroup){var f=a.matches[d];a.matches.splice(d,1),a.matches.splice(e+1,0,f)}void 0!==a.matches[d].matches?a.matches[d]=i(a.matches[d]):a.matches[d]=b(a.matches[d])}return a}for(var j,k,l,m,n,o,p,q=/(?:[?*+]|\\{[0-9\\+\\*]+(?:,[0-9\\+\\*]*)?\\})|[^.?*+^${[]()|\\\\]+|./g,r=!1,s=new d,t=[],u=[];j=q.exec(b);)if(k=j[0],r)h();else switch(k.charAt(0)){case c.escapeChar:r=!0;break;case c.optionalmarker.end:case c.groupmarker.end:if(l=t.pop(),void 0!==l)if(t.length>0){if(m=t[t.length-1],m.matches.push(l),m.isAlternator){n=t.pop();for(var v=0;v<n.matches.length;v++)n.matches[v].isGroup=!1;t.length>0?(m=t[t.length-1],m.matches.push(n)):s.matches.push(n)}}else s.matches.push(l);else h();break;case c.optionalmarker.start:f(s.matches[s.matches.length-1]),t.push(new d((!1),(!0)));break;case c.groupmarker.start:f(s.matches[s.matches.length-1]),t.push(new d((!0)));break;case c.quantifiermarker.start:var w=new d((!1),(!1),(!0));k=k.replace(/[{}]/g,\"\");var x=k.split(\",\"),y=isNaN(x[0])?x[0]:parseInt(x[0]),z=1===x.length?y:isNaN(x[1])?x[1]:parseInt(x[1]);if(\"*\"!==z&&\"+\"!==z||(y=\"*\"===z?0:1),w.quantifier={min:y,max:z},t.length>0){var A=t[t.length-1].matches;j=A.pop(),j.isGroup||(p=new d((!0)),p.matches.push(j),j=p),A.push(j),A.push(w)}else j=s.matches.pop(),j.isGroup||(p=new d((!0)),p.matches.push(j),j=p),s.matches.push(j),s.matches.push(w);break;case c.alternatormarker:t.length>0?(m=t[t.length-1],o=m.matches.pop()):o=s.matches.pop(),o.isAlternator?t.push(o):(n=new d((!1),(!1),(!1),(!0)),n.matches.push(o),t.push(n));break;default:h()}for(;t.length>0;)l=t.pop(),f(l,!0),s.matches.push(l);return s.matches.length>0&&(o=s.matches[s.matches.length-1],f(o),u.push(s)),c.numericInput&&i(u[0]),u}},b.extendDefaults=function(c){a.extend(!0,b.prototype.defaults,c)},b.extendDefinitions=function(c){a.extend(!0,b.prototype.defaults.definitions,c)},b.extendAliases=function(c){a.extend(!0,b.prototype.defaults.aliases,c)},b.format=function(a,c,d){return b(c).format(a,d)},b.unmask=function(a,c){return b(c).unmaskedvalue(a)},b.isValid=function(a,c){return b(c).isValid(a)},b.remove=function(b){a.each(b,function(a,b){b.inputmask&&b.inputmask.remove()})},b.escapeRegex=function(a){var b=[\"/\",\".\",\"*\",\"+\",\"?\",\"|\",\"(\",\")\",\"[\",\"]\",\"{\",\"}\",\"\\\\\",\"$\",\"^\"];return a.replace(new RegExp(\"(\\\\\"+b.join(\"|\\\\\")+\")\",\"gim\"),\"\\\\$1\")},b.keyCode={ALT:18,BACKSPACE:8,BACKSPACE_SAFARI:127,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91,X:88},window.Inputmask=b,b}(jQuery),function(a,b){return void 0===a.fn.inputmask&&(a.fn.inputmask=function(c,d){var e,f=this[0];if(void 0===d&&(d={}),\"string\"==typeof c)switch(c){case\"unmaskedvalue\":return f&&f.inputmask?f.inputmask.unmaskedvalue():a(f).val();case\"remove\":return this.each(function(){this.inputmask&&this.inputmask.remove()});case\"getemptymask\":return f&&f.inputmask?f.inputmask.getemptymask():\"\";case\"hasMaskedValue\":return!(!f||!f.inputmask)&&f.inputmask.hasMaskedValue();case\"isComplete\":return!f||!f.inputmask||f.inputmask.isComplete();case\"getmetadata\":return f&&f.inputmask?f.inputmask.getmetadata():void 0;case\"setvalue\":a(f).val(d),f&&void 0===f.inputmask&&a(f).triggerHandler(\"setvalue\");break;case\"option\":if(\"string\"!=typeof d)return this.each(function(){if(void 0!==this.inputmask)return this.inputmask.option(d)});if(f&&void 0!==f.inputmask)return f.inputmask.option(d);break;default:return d.alias=c,e=new b(d),this.each(function(){e.mask(this)})}else{if(\"object\"==typeof c)return e=new b(c),void 0===c.mask&&void 0===c.alias?this.each(function(){return void 0!==this.inputmask?this.inputmask.option(c):void e.mask(this)}):this.each(function(){e.mask(this)});if(void 0===c)return this.each(function(){e=new b(d),e.mask(this)})}}),a.fn.inputmask}(jQuery,Inputmask),function(a,b){}(jQuery,Inputmask),function(a,b){function c(a){return isNaN(a)||29===new Date(a,2,0).getDate()}return b.extendAliases({\"dd/mm/yyyy\":{mask:\"1/2/y\",placeholder:\"dd/mm/yyyy\",regex:{val1pre:new RegExp(\"[0-3]\"),val1:new RegExp(\"0[1-9]|[12][0-9]|3[01]\"),val2pre:function(a){var c=b.escapeRegex.call(this,a);return new RegExp(\"((0[1-9]|[12][0-9]|3[01])\"+c+\"[01])\")},val2:function(a){var c=b.escapeRegex.call(this,a);return new RegExp(\"((0[1-9]|[12][0-9])\"+c+\"(0[1-9]|1[012]))|(30\"+c+\"(0[13-9]|1[012]))|(31\"+c+\"(0[13578]|1[02]))\")}},leapday:\"29/02/\",separator:\"/\",yearrange:{minyear:1900,maxyear:2099},isInYearRange:function(a,b,c){if(isNaN(a))return!1;var d=parseInt(a.concat(b.toString().slice(a.length))),e=parseInt(a.concat(c.toString().slice(a.length)));return!isNaN(d)&&(b<=d&&d<=c)||!isNaN(e)&&(b<=e&&e<=c)},determinebaseyear:function(a,b,c){var d=(new Date).getFullYear();if(a>d)return a;if(b<d){for(var e=b.toString().slice(0,2),f=b.toString().slice(2,4);b<e+c;)e--;var g=e+f;return a>g?a:g}if(a<=d&&d<=b){for(var h=d.toString().slice(0,2);b<h+c;)h--;var i=h+c;return i<a?a:i}return d},onKeyDown:function(c,d,e,f){var g=a(this);if(c.ctrlKey&&c.keyCode===b.keyCode.RIGHT){var h=new Date;g.val(h.getDate().toString()+(h.getMonth()+1).toString()+h.getFullYear().toString()),g.trigger(\"setvalue\")}},getFrontValue:function(a,b,c){for(var d=0,e=0,f=0;f<a.length&&\"2\"!==a.charAt(f);f++){var g=c.definitions[a.charAt(f)];g?(d+=e,e=g.cardinality):e++}return b.join(\"\").substr(d,e)},postValidation:function(a,b,d){var e,f,g=a.join(\"\");return 0===d.mask.indexOf(\"y\")?(f=g.substr(0,4),e=g.substr(4,11)):(f=g.substr(6,11),e=g.substr(0,6)),b&&(e!==d.leapday||c(f))},definitions:{1:{validator:function(a,b,c,d,e){var f=e.regex.val1.test(a);return d||f||a.charAt(1)!==e.separator&&\"-./\".indexOf(a.charAt(1))===-1||!(f=e.regex.val1.test(\"0\"+a.charAt(0)))?f:(b.buffer[c-1]=\"0\",{refreshFromBuffer:{start:c-1,end:c},pos:c,c:a.charAt(0)})},cardinality:2,prevalidator:[{validator:function(a,b,c,d,e){var f=a;isNaN(b.buffer[c+1])||(f+=b.buffer[c+1]);var g=1===f.length?e.regex.val1pre.test(f):e.regex.val1.test(f);if(!d&&!g){if(g=e.regex.val1.test(a+\"0\"))return b.buffer[c]=a,b.buffer[++c]=\"0\",{pos:c,c:\"0\"};if(g=e.regex.val1.test(\"0\"+a))return b.buffer[c]=\"0\",c++,{pos:c}}return g},cardinality:1}]},2:{validator:function(a,b,c,d,e){var f=e.getFrontValue(b.mask,b.buffer,e);f.indexOf(e.placeholder[0])!==-1&&(f=\"01\"+e.separator);var g=e.regex.val2(e.separator).test(f+a);return d||g||a.charAt(1)!==e.separator&&\"-./\".indexOf(a.charAt(1))===-1||!(g=e.regex.val2(e.separator).test(f+\"0\"+a.charAt(0)))?g:(b.buffer[c-1]=\"0\",{refreshFromBuffer:{start:c-1,end:c},pos:c,c:a.charAt(0)})},cardinality:2,prevalidator:[{validator:function(a,b,c,d,e){isNaN(b.buffer[c+1])||(a+=b.buffer[c+1]);var f=e.getFrontValue(b.mask,b.buffer,e);f.indexOf(e.placeholder[0])!==-1&&(f=\"01\"+e.separator);var g=1===a.length?e.regex.val2pre(e.separator).test(f+a):e.regex.val2(e.separator).test(f+a);return d||g||!(g=e.regex.val2(e.separator).test(f+\"0\"+a))?g:(b.buffer[c]=\"0\",c++,{pos:c})},cardinality:1}]},y:{validator:function(a,b,c,d,e){return e.isInYearRange(a,e.yearrange.minyear,e.yearrange.maxyear)},cardinality:4,prevalidator:[{validator:function(a,b,c,d,e){var f=e.isInYearRange(a,e.yearrange.minyear,e.yearrange.maxyear);if(!d&&!f){var g=e.determinebaseyear(e.yearrange.minyear,e.yearrange.maxyear,a+\"0\").toString().slice(0,1);if(f=e.isInYearRange(g+a,e.yearrange.minyear,e.yearrange.maxyear))return b.buffer[c++]=g.charAt(0),{pos:c};if(g=e.determinebaseyear(e.yearrange.minyear,e.yearrange.maxyear,a+\"0\").toString().slice(0,2),f=e.isInYearRange(g+a,e.yearrange.minyear,e.yearrange.maxyear))return b.buffer[c++]=g.charAt(0),b.buffer[c++]=g.charAt(1),{pos:c}}return f},cardinality:1},{validator:function(a,b,c,d,e){var f=e.isInYearRange(a,e.yearrange.minyear,e.yearrange.maxyear);if(!d&&!f){var g=e.determinebaseyear(e.yearrange.minyear,e.yearrange.maxyear,a).toString().slice(0,2);if(f=e.isInYearRange(a[0]+g[1]+a[1],e.yearrange.minyear,e.yearrange.maxyear))return b.buffer[c++]=g.charAt(1),{pos:c};if(g=e.determinebaseyear(e.yearrange.minyear,e.yearrange.maxyear,a).toString().slice(0,2),f=e.isInYearRange(g+a,e.yearrange.minyear,e.yearrange.maxyear))return b.buffer[c-1]=g.charAt(0),b.buffer[c++]=g.charAt(1),b.buffer[c++]=a.charAt(0),{refreshFromBuffer:{start:c-3,end:c},pos:c}}return f},cardinality:2},{validator:function(a,b,c,d,e){return e.isInYearRange(a,e.yearrange.minyear,e.yearrange.maxyear)},cardinality:3}]}},insertMode:!1,autoUnmask:!1},\"mm/dd/yyyy\":{placeholder:\"mm/dd/yyyy\",alias:\"dd/mm/yyyy\",regex:{val2pre:function(a){var c=b.escapeRegex.call(this,a);return new RegExp(\"((0[13-9]|1[012])\"+c+\"[0-3])|(02\"+c+\"[0-2])\")},val2:function(a){var c=b.escapeRegex.call(this,a);return new RegExp(\"((0[1-9]|1[012])\"+c+\"(0[1-9]|[12][0-9]))|((0[13-9]|1[012])\"+c+\"30)|((0[13578]|1[02])\"+c+\"31)\")},val1pre:new RegExp(\"[01]\"),val1:new RegExp(\"0[1-9]|1[012]\")},leapday:\"02/29/\",onKeyDown:function(c,d,e,f){var g=a(this);if(c.ctrlKey&&c.keyCode===b.keyCode.RIGHT){var h=new Date;g.val((h.getMonth()+1).toString()+h.getDate().toString()+h.getFullYear().toString()),g.trigger(\"setvalue\")}}},\"yyyy/mm/dd\":{mask:\"y/1/2\",placeholder:\"yyyy/mm/dd\",alias:\"mm/dd/yyyy\",leapday:\"/02/29\",onKeyDown:function(c,d,e,f){var g=a(this);if(c.ctrlKey&&c.keyCode===b.keyCode.RIGHT){var h=new Date;g.val(h.getFullYear().toString()+(h.getMonth()+1).toString()+h.getDate().toString()),g.trigger(\"setvalue\")}}},\"dd.mm.yyyy\":{mask:\"1.2.y\",placeholder:\"dd.mm.yyyy\",leapday:\"29.02.\",separator:\".\",alias:\"dd/mm/yyyy\"},\"dd-mm-yyyy\":{mask:\"1-2-y\",placeholder:\"dd-mm-yyyy\",leapday:\"29-02-\",separator:\"-\",alias:\"dd/mm/yyyy\"},\"mm.dd.yyyy\":{mask:\"1.2.y\",placeholder:\"mm.dd.yyyy\",leapday:\"02.29.\",separator:\".\",alias:\"mm/dd/yyyy\"},\"mm-dd-yyyy\":{mask:\"1-2-y\",placeholder:\"mm-dd-yyyy\",leapday:\"02-29-\",separator:\"-\",alias:\"mm/dd/yyyy\"},\"yyyy.mm.dd\":{mask:\"y.1.2\",placeholder:\"yyyy.mm.dd\",leapday:\".02.29\",separator:\".\",alias:\"yyyy/mm/dd\"},\"yyyy-mm-dd\":{mask:\"y-1-2\",placeholder:\"yyyy-mm-dd\",leapday:\"-02-29\",separator:\"-\",alias:\"yyyy/mm/dd\"},datetime:{mask:\"1/2/y h:s\",placeholder:\"dd/mm/yyyy hh:mm\",alias:\"dd/mm/yyyy\",regex:{hrspre:new RegExp(\"[012]\"),hrs24:new RegExp(\"2[0-4]|1[3-9]\"),hrs:new RegExp(\"[01][0-9]|2[0-4]\"),ampm:new RegExp(\"^[a|p|A|P][m|M]\"),mspre:new RegExp(\"[0-5]\"),ms:new RegExp(\"[0-5][0-9]\")},timeseparator:\":\",hourFormat:\"24\",definitions:{h:{validator:function(a,b,c,d,e){if(\"24\"===e.hourFormat&&24===parseInt(a,10))return b.buffer[c-1]=\"0\",b.buffer[c]=\"0\",{refreshFromBuffer:{start:c-1,end:c},c:\"0\"};var f=e.regex.hrs.test(a);if(!d&&!f&&(a.charAt(1)===e.timeseparator||\"-.:\".indexOf(a.charAt(1))!==-1)&&(f=e.regex.hrs.test(\"0\"+a.charAt(0))))return b.buffer[c-1]=\"0\",b.buffer[c]=a.charAt(0),c++,{refreshFromBuffer:{start:c-2,end:c},pos:c,c:e.timeseparator};if(f&&\"24\"!==e.hourFormat&&e.regex.hrs24.test(a)){var g=parseInt(a,10);return 24===g?(b.buffer[c+5]=\"a\",b.buffer[c+6]=\"m\"):(b.buffer[c+5]=\"p\",b.buffer[c+6]=\"m\"),g-=12,g<10?(b.buffer[c]=g.toString(),b.buffer[c-1]=\"0\"):(b.buffer[c]=g.toString().charAt(1),b.buffer[c-1]=g.toString().charAt(0)),{refreshFromBuffer:{start:c-1,end:c+6},c:b.buffer[c]}}return f},cardinality:2,prevalidator:[{validator:function(a,b,c,d,e){var f=e.regex.hrspre.test(a);return d||f||!(f=e.regex.hrs.test(\"0\"+a))?f:(b.buffer[c]=\"0\",c++,{pos:c})},cardinality:1}]},s:{validator:\"[0-5][0-9]\",cardinality:2,prevalidator:[{validator:function(a,b,c,d,e){var f=e.regex.mspre.test(a);return d||f||!(f=e.regex.ms.test(\"0\"+a))?f:(b.buffer[c]=\"0\",c++,{pos:c})},cardinality:1}]},t:{validator:function(a,b,c,d,e){return e.regex.ampm.test(a+\"m\")},casing:\"lower\",cardinality:1}},insertMode:!1,autoUnmask:!1},datetime12:{mask:\"1/2/y h:s t\\\\m\",placeholder:\"dd/mm/yyyy hh:mm xm\",alias:\"datetime\",hourFormat:\"12\"},\"mm/dd/yyyy hh:mm xm\":{mask:\"1/2/y h:s t\\\\m\",placeholder:\"mm/dd/yyyy hh:mm xm\",alias:\"datetime12\",regex:{val2pre:function(a){var c=b.escapeRegex.call(this,a);return new RegExp(\"((0[13-9]|1[012])\"+c+\"[0-3])|(02\"+c+\"[0-2])\")},val2:function(a){var c=b.escapeRegex.call(this,a);return new RegExp(\"((0[1-9]|1[012])\"+c+\"(0[1-9]|[12][0-9]))|((0[13-9]|1[012])\"+c+\"30)|((0[13578]|1[02])\"+c+\"31)\")},val1pre:new RegExp(\"[01]\"),val1:new RegExp(\"0[1-9]|1[012]\")},leapday:\"02/29/\",onKeyDown:function(c,d,e,f){var g=a(this);if(c.ctrlKey&&c.keyCode===b.keyCode.RIGHT){var h=new Date;g.val((h.getMonth()+1).toString()+h.getDate().toString()+h.getFullYear().toString()),g.trigger(\"setvalue\")}}},\"hh:mm t\":{mask:\"h:s t\\\\m\",placeholder:\"hh:mm xm\",alias:\"datetime\",hourFormat:\"12\"},\"h:s t\":{mask:\"h:s t\\\\m\",placeholder:\"hh:mm xm\",alias:\"datetime\",hourFormat:\"12\"},\"hh:mm:ss\":{mask:\"h:s:s\",placeholder:\"hh:mm:ss\",alias:\"datetime\",autoUnmask:!1},\"hh:mm\":{mask:\"h:s\",placeholder:\"hh:mm\",alias:\"datetime\",autoUnmask:!1},date:{alias:\"dd/mm/yyyy\"},\"mm/yyyy\":{mask:\"1/y\",placeholder:\"mm/yyyy\",leapday:\"donotuse\",separator:\"/\",alias:\"mm/dd/yyyy\"},shamsi:{regex:{val2pre:function(a){var c=b.escapeRegex.call(this,a);return new RegExp(\"((0[1-9]|1[012])\"+c+\"[0-3])\")},val2:function(a){var c=b.escapeRegex.call(this,a);return new RegExp(\"((0[1-9]|1[012])\"+c+\"(0[1-9]|[12][0-9]))|((0[1-9]|1[012])\"+c+\"30)|((0[1-6])\"+c+\"31)\")},val1pre:new RegExp(\"[01]\"),val1:new RegExp(\"0[1-9]|1[012]\")},yearrange:{minyear:1300,maxyear:1499},mask:\"y/1/2\",leapday:\"/12/30\",placeholder:\"yyyy/mm/dd\",alias:\"mm/dd/yyyy\",clearIncomplete:!0}}),b}(jQuery,Inputmask),function(a,b){return b.extendDefinitions({A:{validator:\"[A-Za-z\\u0410-\\u044f\\u0401\\u0451\\xc0-\\xff\\xb5]\",cardinality:1,casing:\"upper\"},\"&\":{validator:\"[0-9A-Za-z\\u0410-\\u044f\\u0401\\u0451\\xc0-\\xff\\xb5]\",cardinality:1,casing:\"upper\"},\"#\":{validator:\"[0-9A-Fa-f]\",cardinality:1,casing:\"upper\"}}),b.extendAliases({url:{definitions:{i:{validator:\".\",cardinality:1}},mask:\"(\\\\http://)|(\\\\http\\\\s://)|(ftp://)|(ftp\\\\s://)i{+}\",insertMode:!1,autoUnmask:!1,inputmode:\"url\"},ip:{mask:\"i[i[i]].i[i[i]].i[i[i]].i[i[i]]\",definitions:{i:{validator:function(a,b,c,d,e){return c-1>-1&&\".\"!==b.buffer[c-1]?(a=b.buffer[c-1]+a,a=c-2>-1&&\".\"!==b.buffer[c-2]?b.buffer[c-2]+a:\"0\"+a):a=\"00\"+a,new RegExp(\"25[0-5]|2[0-4][0-9]|[01][0-9][0-9]\").test(a)},cardinality:1}},onUnMask:function(a,b,c){return a},inputmode:\"numeric\"},email:{mask:\"*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]\",greedy:!1,onBeforePaste:function(a,b){return a=a.toLowerCase(),a.replace(\"mailto:\",\"\")},definitions:{\"*\":{validator:\"[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]\",cardinality:1,casing:\"lower\"},\"-\":{validator:\"[0-9A-Za-z-]\",cardinality:1,casing:\"lower\"}},onUnMask:function(a,b,c){return a},inputmode:\"email\"},mac:{mask:\"##:##:##:##:##:##\"},vin:{mask:\"V{13}9{4}\",definitions:{V:{validator:\"[A-HJ-NPR-Za-hj-npr-z\\\\d]\",cardinality:1,casing:\"upper\"}},clearIncomplete:!0,autoUnmask:!0}}),b}(jQuery,Inputmask),function(a,b){return b.extendAliases({numeric:{mask:function(a){function c(b){for(var c=\"\",d=0;d<b.length;d++)c+=a.definitions[b.charAt(d)]||a.optionalmarker.start===b.charAt(d)||a.optionalmarker.end===b.charAt(d)||a.quantifiermarker.start===b.charAt(d)||a.quantifiermarker.end===b.charAt(d)||a.groupmarker.start===b.charAt(d)||a.groupmarker.end===b.charAt(d)||a.alternatormarker===b.charAt(d)?\"\\\\\"+b.charAt(d):b.charAt(d);return c}if(0!==a.repeat&&isNaN(a.integerDigits)&&(a.integerDigits=a.repeat),a.repeat=0,a.groupSeparator===a.radixPoint&&(\".\"===a.radixPoint?a.groupSeparator=\",\":\",\"===a.radixPoint?a.groupSeparator=\".\":a.groupSeparator=\"\"),\" \"===a.groupSeparator&&(a.skipOptionalPartCharacter=void 0),a.autoGroup=a.autoGroup&&\"\"!==a.groupSeparator,a.autoGroup&&(\"string\"==typeof a.groupSize&&isFinite(a.groupSize)&&(a.groupSize=parseInt(a.groupSize)),isFinite(a.integerDigits))){var d=Math.floor(a.integerDigits/a.groupSize),e=a.integerDigits%a.groupSize;a.integerDigits=parseInt(a.integerDigits)+(0===e?d-1:d),a.integerDigits<1&&(a.integerDigits=\"*\")}a.placeholder.length>1&&(a.placeholder=a.placeholder.charAt(0)),\"radixFocus\"===a.positionCaretOnClick&&\"\"===a.placeholder&&a.integerOptional===!1&&(a.positionCaretOnClick=\"lvp\"),a.definitions[\";\"]=a.definitions[\"~\"],a.definitions[\";\"].definitionSymbol=\"~\",a.numericInput===!0&&(a.positionCaretOnClick=\"radixFocus\"===a.positionCaretOnClick?\"lvp\":a.positionCaretOnClick,a.digitsOptional=!1,isNaN(a.digits)&&(a.digits=2),a.decimalProtect=!1);var f=\"[+]\";if(f+=c(a.prefix),f+=a.integerOptional===!0?\"~{1,\"+a.integerDigits+\"}\":\"~{\"+a.integerDigits+\"}\",void 0!==a.digits){a.decimalProtect&&(a.radixPointDefinitionSymbol=\":\");var g=a.digits.toString().split(\",\");isFinite(g[0]&&g[1]&&isFinite(g[1]))?f+=(a.decimalProtect?\":\":a.radixPoint)+\";{\"+a.digits+\"}\":(isNaN(a.digits)||parseInt(a.digits)>0)&&(f+=a.digitsOptional?\"[\"+(a.decimalProtect?\":\":a.radixPoint)+\";{1,\"+a.digits+\"}]\":(a.decimalProtect?\":\":a.radixPoint)+\";{\"+a.digits+\"}\")}return f+=c(a.suffix),f+=\"[-]\",a.greedy=!1,null!==a.min&&(a.min=a.min.toString().replace(new RegExp(b.escapeRegex(a.groupSeparator),\"g\"),\"\"),\",\"===a.radixPoint&&(a.min=a.min.replace(a.radixPoint,\".\"))),null!==a.max&&(a.max=a.max.toString().replace(new RegExp(b.escapeRegex(a.groupSeparator),\"g\"),\"\"),\",\"===a.radixPoint&&(a.max=a.max.replace(a.radixPoint,\".\"))),f},placeholder:\"\",greedy:!1,digits:\"*\",digitsOptional:!0,radixPoint:\".\",positionCaretOnClick:\"radixFocus\",groupSize:3,groupSeparator:\"\",autoGroup:!1,allowPlus:!0,allowMinus:!0,negationSymbol:{front:\"-\",back:\"\"},integerDigits:\"+\",integerOptional:!0,prefix:\"\",suffix:\"\",rightAlign:!0,decimalProtect:!0,min:null,max:null,step:1,insertMode:!0,autoUnmask:!1,unmaskAsNumber:!1,inputmode:\"numeric\",postFormat:function(c,d,e){e.numericInput===!0&&(c=c.reverse(),isFinite(d)&&(d=c.join(\"\").length-d-1));var f,g;d=d>=c.length?c.length-1:d<0?0:d;var h=c[d],i=c.slice();h===e.groupSeparator&&(i.splice(d--,1),h=i[d]);var j=i.join(\"\").match(new RegExp(\"^\"+b.escapeRegex(e.negationSymbol.front)));j=null!==j&&1===j.length,d>(j?e.negationSymbol.front.length:0)+e.prefix.length&&d<i.length-e.suffix.length&&(i[d]=\"!\");var k=i.join(\"\"),l=i.join();if(j&&(k=k.replace(new RegExp(\"^\"+b.escapeRegex(e.negationSymbol.front)),\"\"),k=k.replace(new RegExp(b.escapeRegex(e.negationSymbol.back)+\"$\"),\"\")),k=k.replace(new RegExp(b.escapeRegex(e.suffix)+\"$\"),\"\"),k=k.replace(new RegExp(\"^\"+b.escapeRegex(e.prefix)),\"\"),k.length>0&&e.autoGroup||k.indexOf(e.groupSeparator)!==-1){var m=b.escapeRegex(e.groupSeparator);k=k.replace(new RegExp(m,\"g\"),\"\");var n=k.split(h===e.radixPoint?\"!\":e.radixPoint);if(k=\"\"===e.radixPoint?k:n[0],h!==e.negationSymbol.front&&(k=k.replace(\"!\",\"?\")),k.length>e.groupSize)for(var o=new RegExp(\"([-+]?[\\\\d?]+)([\\\\d?]{\"+e.groupSize+\"})\");o.test(k)&&\"\"!==e.groupSeparator;)k=k.replace(o,\"$1\"+e.groupSeparator+\"$2\"),k=k.replace(e.groupSeparator+e.groupSeparator,e.groupSeparator);k=k.replace(\"?\",\"!\"),\"\"!==e.radixPoint&&n.length>1&&(k+=(h===e.radixPoint?\"!\":e.radixPoint)+n[1])}k=e.prefix+k+e.suffix,j&&(k=e.negationSymbol.front+k+e.negationSymbol.back);var p=l!==k.split(\"\").join(),q=a.inArray(\"!\",k);if(q===-1&&(q=d),p){for(c.length=k.length,f=0,g=k.length;f<g;f++)c[f]=k.charAt(f);c[q]=h}return q=e.numericInput&&isFinite(d)?c.join(\"\").length-q-1:q,e.numericInput&&(c=c.reverse(),a.inArray(e.radixPoint,c)<q&&c.join(\"\").length-e.suffix.length!==q&&(q-=1)),\n{pos:q,refreshFromBuffer:p,buffer:c,isNegative:j}},onBeforeWrite:function(c,d,e,f){var g;if(c&&(\"blur\"===c.type||\"checkval\"===c.type||\"keydown\"===c.type)){var h=f.numericInput?d.slice().reverse().join(\"\"):d.join(\"\"),i=h.replace(f.prefix,\"\");i=i.replace(f.suffix,\"\"),i=i.replace(new RegExp(b.escapeRegex(f.groupSeparator),\"g\"),\"\"),\",\"===f.radixPoint&&(i=i.replace(f.radixPoint,\".\"));var j=i.match(new RegExp(\"[-\"+b.escapeRegex(f.negationSymbol.front)+\"]\",\"g\"));if(j=null!==j&&1===j.length,i=i.replace(new RegExp(\"[-\"+b.escapeRegex(f.negationSymbol.front)+\"]\",\"g\"),\"\"),i=i.replace(new RegExp(b.escapeRegex(f.negationSymbol.back)+\"$\"),\"\"),isNaN(f.placeholder)&&(i=i.replace(new RegExp(b.escapeRegex(f.placeholder),\"g\"),\"\")),i=i===f.negationSymbol.front?i+\"0\":i,\"\"!==i&&isFinite(i)){var k=parseFloat(i),l=j?k*-1:k;if(null!==f.min&&isFinite(f.min)&&l<parseFloat(f.min)?(k=Math.abs(f.min),j=f.min<0,h=void 0):null!==f.max&&isFinite(f.max)&&l>parseFloat(f.max)&&(k=Math.abs(f.max),j=f.max<0,h=void 0),i=k.toString().replace(\".\",f.radixPoint).split(\"\"),isFinite(f.digits)){var m=a.inArray(f.radixPoint,i),n=a.inArray(f.radixPoint,h);m===-1&&(i.push(f.radixPoint),m=i.length-1);for(var o=1;o<=f.digits;o++)f.digitsOptional||void 0!==i[m+o]&&i[m+o]!==f.placeholder.charAt(0)?n!==-1&&void 0!==h[n+o]&&(i[m+o]=i[m+o]||h[n+o]):i[m+o]=\"0\";i[i.length-1]===f.radixPoint&&delete i[i.length-1]}if(k.toString()!==i&&k.toString()+\".\"!==i||j)return i=(f.prefix+i.join(\"\")).split(\"\"),!j||0===k&&\"blur\"===c.type||(i.unshift(f.negationSymbol.front),i.push(f.negationSymbol.back)),f.numericInput&&(i=i.reverse()),g=f.postFormat(i,f.numericInput?e:e-1,f),g.buffer&&(g.refreshFromBuffer=g.buffer.join(\"\")!==d.join(\"\")),g}}if(f.autoGroup)return g=f.postFormat(d,f.numericInput?e:e-1,f),g.caret=e<(g.isNegative?f.negationSymbol.front.length:0)+f.prefix.length||e>g.buffer.length-(g.isNegative?f.negationSymbol.back.length:0)?g.pos:g.pos+1,g},regex:{integerPart:function(a){return new RegExp(\"[\"+b.escapeRegex(a.negationSymbol.front)+\"+]?\\\\d+\")},integerNPart:function(a){return new RegExp(\"[\\\\d\"+b.escapeRegex(a.groupSeparator)+b.escapeRegex(a.placeholder.charAt(0))+\"]+\")}},signHandler:function(a,b,c,d,e){if(!d&&e.allowMinus&&\"-\"===a||e.allowPlus&&\"+\"===a){var f=b.buffer.join(\"\").match(e.regex.integerPart(e));if(f&&f[0].length>0)return b.buffer[f.index]===(\"-\"===a?\"+\":e.negationSymbol.front)?\"-\"===a?\"\"!==e.negationSymbol.back?{pos:0,c:e.negationSymbol.front,remove:0,caret:c,insert:{pos:b.buffer.length-1,c:e.negationSymbol.back}}:{pos:0,c:e.negationSymbol.front,remove:0,caret:c}:\"\"!==e.negationSymbol.back?{pos:0,c:\"+\",remove:[0,b.buffer.length-1],caret:c}:{pos:0,c:\"+\",remove:0,caret:c}:b.buffer[0]===(\"-\"===a?e.negationSymbol.front:\"+\")?\"-\"===a&&\"\"!==e.negationSymbol.back?{remove:[0,b.buffer.length-1],caret:c-1}:{remove:0,caret:c-1}:\"-\"===a?\"\"!==e.negationSymbol.back?{pos:0,c:e.negationSymbol.front,caret:c+1,insert:{pos:b.buffer.length,c:e.negationSymbol.back}}:{pos:0,c:e.negationSymbol.front,caret:c+1}:{pos:0,c:a,caret:c+1}}return!1},radixHandler:function(b,c,d,e,f){if(!e&&f.numericInput!==!0&&b===f.radixPoint&&void 0!==f.digits&&(isNaN(f.digits)||parseInt(f.digits)>0)){var g=a.inArray(f.radixPoint,c.buffer),h=c.buffer.join(\"\").match(f.regex.integerPart(f));if(g!==-1&&c.validPositions[g])return c.validPositions[g-1]?{caret:g+1}:{pos:h.index,c:h[0],caret:g+1};if(!h||\"0\"===h[0]&&h.index+1!==d)return c.buffer[h?h.index:d]=\"0\",{pos:(h?h.index:d)+1,c:f.radixPoint}}return!1},leadingZeroHandler:function(b,c,d,e,f,g){if(!e){var h=c.buffer.slice(\"\");if(h.splice(0,f.prefix.length),h.splice(h.length-f.suffix.length,f.suffix.length),f.numericInput===!0){var h=h.reverse(),i=h[0];if(\"0\"===i&&void 0===c.validPositions[d-1])return{pos:d,remove:h.length-1}}else{d-=f.prefix.length;var j=a.inArray(f.radixPoint,h),k=h.slice(0,j!==-1?j:void 0).join(\"\").match(f.regex.integerNPart(f));if(k&&(j===-1||d<=j)){var l=j===-1?0:parseInt(h.slice(j+1).join(\"\"));if(0===k[0].indexOf(\"\"!==f.placeholder?f.placeholder.charAt(0):\"0\")&&(k.index+1===d||g!==!0&&0===l))return c.buffer.splice(k.index+f.prefix.length,1),{pos:k.index+f.prefix.length,remove:k.index+f.prefix.length};if(\"0\"===b&&d<=k.index&&k[0]!==f.groupSeparator)return!1}}}return!0},definitions:{\"~\":{validator:function(c,d,e,f,g,h){var i=g.signHandler(c,d,e,f,g);if(!i&&(i=g.radixHandler(c,d,e,f,g),!i&&(i=f?new RegExp(\"[0-9\"+b.escapeRegex(g.groupSeparator)+\"]\").test(c):new RegExp(\"[0-9]\").test(c),i===!0&&(i=g.leadingZeroHandler(c,d,e,f,g,h),i===!0)))){var j=a.inArray(g.radixPoint,d.buffer);i=j!==-1&&(g.digitsOptional===!1||d.validPositions[e])&&g.numericInput!==!0&&e>j&&!f?{pos:e,remove:e}:{pos:e}}return i},cardinality:1},\"+\":{validator:function(a,b,c,d,e){var f=e.signHandler(a,b,c,d,e);return!f&&(d&&e.allowMinus&&a===e.negationSymbol.front||e.allowMinus&&\"-\"===a||e.allowPlus&&\"+\"===a)&&(f=!(!d&&\"-\"===a)||(\"\"!==e.negationSymbol.back?{pos:c,c:\"-\"===a?e.negationSymbol.front:\"+\",caret:c+1,insert:{pos:b.buffer.length,c:e.negationSymbol.back}}:{pos:c,c:\"-\"===a?e.negationSymbol.front:\"+\",caret:c+1})),f},cardinality:1,placeholder:\"\"},\"-\":{validator:function(a,b,c,d,e){var f=e.signHandler(a,b,c,d,e);return!f&&d&&e.allowMinus&&a===e.negationSymbol.back&&(f=!0),f},cardinality:1,placeholder:\"\"},\":\":{validator:function(a,c,d,e,f){var g=f.signHandler(a,c,d,e,f);if(!g){var h=\"[\"+b.escapeRegex(f.radixPoint)+\"]\";g=new RegExp(h).test(a),g&&c.validPositions[d]&&c.validPositions[d].match.placeholder===f.radixPoint&&(g={caret:d+1})}return g},cardinality:1,placeholder:function(a){return a.radixPoint}}},onUnMask:function(a,c,d){if(\"\"===c&&d.nullable===!0)return c;var e=a.replace(d.prefix,\"\");return e=e.replace(d.suffix,\"\"),e=e.replace(new RegExp(b.escapeRegex(d.groupSeparator),\"g\"),\"\"),d.unmaskAsNumber?(\"\"!==d.radixPoint&&e.indexOf(d.radixPoint)!==-1&&(e=e.replace(b.escapeRegex.call(this,d.radixPoint),\".\")),Number(e)):e},isComplete:function(a,c){var d=a.join(\"\"),e=a.slice();if(c.postFormat(e,0,c),e.join(\"\")!==d)return!1;var f=d.replace(c.prefix,\"\");return f=f.replace(c.suffix,\"\"),f=f.replace(new RegExp(b.escapeRegex(c.groupSeparator),\"g\"),\"\"),\",\"===c.radixPoint&&(f=f.replace(b.escapeRegex(c.radixPoint),\".\")),isFinite(f)},onBeforeMask:function(a,c){if(c.numericInput===!0&&(a=a.split(\"\").reverse().join(\"\")),\"\"!==c.radixPoint&&isFinite(a)){var d=a.split(\".\"),e=\"\"!==c.groupSeparator?parseInt(c.groupSize):0;2===d.length&&(d[0].length>e||d[1].length>e)&&(a=a.toString().replace(\".\",c.radixPoint))}var f=a.match(/,/g),g=a.match(/\\./g);if(g&&f?g.length>f.length?(a=a.replace(/\\./g,\"\"),a=a.replace(\",\",c.radixPoint)):f.length>g.length?(a=a.replace(/,/g,\"\"),a=a.replace(\".\",c.radixPoint)):a=a.indexOf(\".\")<a.indexOf(\",\")?a.replace(/\\./g,\"\"):a=a.replace(/,/g,\"\"):a=a.replace(new RegExp(b.escapeRegex(c.groupSeparator),\"g\"),\"\"),0===c.digits&&(a.indexOf(\".\")!==-1?a=a.substring(0,a.indexOf(\".\")):a.indexOf(\",\")!==-1&&(a=a.substring(0,a.indexOf(\",\")))),\"\"!==c.radixPoint&&isFinite(c.digits)&&a.indexOf(c.radixPoint)!==-1){var h=a.split(c.radixPoint),i=h[1].match(new RegExp(\"\\\\d*\"))[0];if(parseInt(c.digits)<i.toString().length){var j=Math.pow(10,parseInt(c.digits));a=a.replace(b.escapeRegex(c.radixPoint),\".\"),a=Math.round(parseFloat(a)*j)/j,a=a.toString().replace(\".\",c.radixPoint)}}return c.numericInput===!0&&(a=a.split(\"\").reverse().join(\"\")),a.toString()},canClearPosition:function(a,b,c,d,e){var f=a.validPositions[b].input,g=f!==e.radixPoint||null!==a.validPositions[b].match.fn&&e.decimalProtect===!1||isFinite(f)||b===c||f===e.groupSeparator||f===e.negationSymbol.front||f===e.negationSymbol.back;return g},onKeyDown:function(c,d,e,f){var g=a(this);if(c.ctrlKey)switch(c.keyCode){case b.keyCode.UP:g.val(parseFloat(this.inputmask.unmaskedvalue())+parseInt(f.step)),g.trigger(\"setvalue\");break;case b.keyCode.DOWN:g.val(parseFloat(this.inputmask.unmaskedvalue())-parseInt(f.step)),g.trigger(\"setvalue\")}}},currency:{prefix:\"$ \",groupSeparator:\",\",alias:\"numeric\",placeholder:\"0\",autoGroup:!0,digits:2,digitsOptional:!1,clearMaskOnLostFocus:!1},decimal:{alias:\"numeric\"},integer:{alias:\"numeric\",digits:0,radixPoint:\"\"},percentage:{alias:\"numeric\",digits:2,radixPoint:\".\",placeholder:\"0\",autoGroup:!1,min:0,max:100,suffix:\" %\",allowPlus:!1,allowMinus:!1}}),b}(jQuery,Inputmask),function(a,b){function c(a,b){var c=(a.mask||a).replace(/#/g,\"9\").replace(/\\)/,\"9\").replace(/[+()#-]/g,\"\"),d=(b.mask||b).replace(/#/g,\"9\").replace(/\\)/,\"9\").replace(/[+()#-]/g,\"\"),e=(a.mask||a).split(\"#\")[0],f=(b.mask||b).split(\"#\")[0];return 0===f.indexOf(e)?-1:0===e.indexOf(f)?1:c.localeCompare(d)}var d=b.prototype.analyseMask;return b.prototype.analyseMask=function(b,c){function e(a,c,d){c=c||\"\",d=d||g,\"\"!==c&&(d[c]={});for(var f=\"\",h=d[c]||d,i=a.length-1;i>=0;i--)b=a[i].mask||a[i],f=b.substr(0,1),h[f]=h[f]||[],h[f].unshift(b.substr(1)),a.splice(i,1);for(var j in h)h[j].length>500&&e(h[j].slice(),j,h)}function f(b){var d=\"\",e=[];for(var g in b)a.isArray(b[g])?1===b[g].length?e.push(g+b[g]):e.push(g+c.groupmarker.start+b[g].join(c.groupmarker.end+c.alternatormarker+c.groupmarker.start)+c.groupmarker.end):e.push(g+f(b[g]));return d+=1===e.length?e[0]:c.groupmarker.start+e.join(c.groupmarker.end+c.alternatormarker+c.groupmarker.start)+c.groupmarker.end}var g={};c.phoneCodes&&c.phoneCodes.length>1e3&&(b=b.substr(1,b.length-2),e(b.split(c.groupmarker.end+c.alternatormarker+c.groupmarker.start)),b=f(g));var h=d.call(this,b,c);return h},b.extendAliases({abstractphone:{groupmarker:{start:\"<\",end:\">\"},countrycode:\"\",phoneCodes:[],mask:function(a){return a.definitions={\"#\":a.definitions[9]},a.phoneCodes.sort(c)},keepStatic:!0,onBeforeMask:function(a,b){var c=a.replace(/^0{1,2}/,\"\").replace(/[\\s]/g,\"\");return(c.indexOf(b.countrycode)>1||c.indexOf(b.countrycode)===-1)&&(c=\"+\"+b.countrycode+c),c},onUnMask:function(a,b,c){return b},inputmode:\"tel\"}}),b}(jQuery,Inputmask),function(a,b){return b.extendAliases({Regex:{mask:\"r\",greedy:!1,repeat:\"*\",regex:null,regexTokens:null,tokenizer:/\\[\\^?]?(?:[^\\\\\\]]+|\\\\[\\S\\s]?)*]?|\\\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\\S\\s]?)|\\((?:\\?[:=!]?)?|(?:[?*+]|\\{[0-9]+(?:,[0-9]*)?\\})\\??|[^.?*+^${[()|\\\\]+|./g,quantifierFilter:/[0-9]+[^,]/,isComplete:function(a,b){return new RegExp(b.regex).test(a.join(\"\"))},definitions:{r:{validator:function(b,c,d,e,f){function g(a,b){this.matches=[],this.isGroup=a||!1,this.isQuantifier=b||!1,this.quantifier={min:1,max:1},this.repeaterPart=void 0}function h(){var a,b,c=new g,d=[];for(f.regexTokens=[];a=f.tokenizer.exec(f.regex);)switch(b=a[0],b.charAt(0)){case\"(\":d.push(new g((!0)));break;case\")\":k=d.pop(),d.length>0?d[d.length-1].matches.push(k):c.matches.push(k);break;case\"{\":case\"+\":case\"*\":var e=new g((!1),(!0));b=b.replace(/[{}]/g,\"\");var h=b.split(\",\"),i=isNaN(h[0])?h[0]:parseInt(h[0]),j=1===h.length?i:isNaN(h[1])?h[1]:parseInt(h[1]);if(e.quantifier={min:i,max:j},d.length>0){var l=d[d.length-1].matches;a=l.pop(),a.isGroup||(k=new g((!0)),k.matches.push(a),a=k),l.push(a),l.push(e)}else a=c.matches.pop(),a.isGroup||(k=new g((!0)),k.matches.push(a),a=k),c.matches.push(a),c.matches.push(e);break;default:d.length>0?d[d.length-1].matches.push(b):c.matches.push(b)}c.matches.length>0&&f.regexTokens.push(c)}function i(b,c){var d=!1;c&&(m+=\"(\",o++);for(var e=0;e<b.matches.length;e++){var f=b.matches[e];if(f.isGroup===!0)d=i(f,!0);else if(f.isQuantifier===!0){var g=a.inArray(f,b.matches),h=b.matches[g-1],k=m;if(isNaN(f.quantifier.max)){for(;f.repeaterPart&&f.repeaterPart!==m&&f.repeaterPart.length>m.length&&!(d=i(h,!0)););d=d||i(h,!0),d&&(f.repeaterPart=m),m=k+f.quantifier.max}else{for(var l=0,n=f.quantifier.max-1;l<n&&!(d=i(h,!0));l++);m=k+\"{\"+f.quantifier.min+\",\"+f.quantifier.max+\"}\"}}else if(void 0!==f.matches)for(var p=0;p<f.length&&!(d=i(f[p],c));p++);else{var q;if(\"[\"==f.charAt(0)){q=m,q+=f;for(var r=0;r<o;r++)q+=\")\";var s=new RegExp(\"^(\"+q+\")$\");d=s.test(j)}else for(var t=0,u=f.length;t<u;t++)if(\"\\\\\"!==f.charAt(t)){q=m,q+=f.substr(0,t+1),q=q.replace(/\\|$/,\"\");for(var r=0;r<o;r++)q+=\")\";var s=new RegExp(\"^(\"+q+\")$\");if(d=s.test(j))break}m+=f}if(d)break}return c&&(m+=\")\",o--),d}var j,k,l=c.buffer.slice(),m=\"\",n=!1,o=0;null===f.regexTokens&&h(),l.splice(d,0,b),j=l.join(\"\");for(var p=0;p<f.regexTokens.length;p++){var q=f.regexTokens[p];if(n=i(q,q.isGroup))break}return n},cardinality:1}}}}),b}(jQuery,Inputmask);//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2pzL1BsdWdpbnMvaW5wdXRtYXNrLm1pbi5qcz82NDk0Il0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuKiBqcXVlcnkuaW5wdXRtYXNrLmJ1bmRsZS5qc1xuKiBodHRwczovL2dpdGh1Yi5jb20vUm9iaW5IZXJib3RzL2pxdWVyeS5pbnB1dG1hc2tcbiogQ29weXJpZ2h0IChjKSAyMDEwIC0gMjAxNiBSb2JpbiBIZXJib3RzXG4qIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSAoaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHApXG4qIFZlcnNpb246IDMuMy40LTExM1xuKi9cbiFmdW5jdGlvbihhKXtmdW5jdGlvbiBiKGQsZSl7cmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBiPyhhLmlzUGxhaW5PYmplY3QoZCk/ZT1kOihlPWV8fHt9LGUuYWxpYXM9ZCksdGhpcy5lbD12b2lkIDAsdGhpcy5vcHRzPWEuZXh0ZW5kKCEwLHt9LHRoaXMuZGVmYXVsdHMsZSksdGhpcy5tYXNrc2V0PXZvaWQgMCx0aGlzLm5vTWFza3NDYWNoZT1lJiZ2b2lkIDAhPT1lLmRlZmluaXRpb25zLHRoaXMudXNlck9wdGlvbnM9ZXx8e30sdGhpcy5ldmVudHM9e30sdGhpcy5kYXRhQXR0cmlidXRlPVwiZGF0YS1pbnB1dG1hc2tcIix0aGlzLmlzUlRMPXRoaXMub3B0cy5udW1lcmljSW5wdXQsdm9pZCBjKHRoaXMub3B0cy5hbGlhcyxlLHRoaXMub3B0cykpOm5ldyBiKGQsZSl9ZnVuY3Rpb24gYyhiLGQsZSl7dmFyIGY9ZS5hbGlhc2VzW2JdO3JldHVybiBmPyhmLmFsaWFzJiZjKGYuYWxpYXMsdm9pZCAwLGUpLGEuZXh0ZW5kKCEwLGUsZiksYS5leHRlbmQoITAsZSxkKSwhMCk6KG51bGw9PT1lLm1hc2smJihlLm1hc2s9YiksITEpfWZ1bmN0aW9uIGQoYyxkKXtmdW5jdGlvbiBlKGMsZSxmKXtpZihudWxsIT09YyYmXCJcIiE9PWMpe2lmKDE9PT1jLmxlbmd0aCYmZi5ncmVlZHk9PT0hMSYmMCE9PWYucmVwZWF0JiYoZi5wbGFjZWhvbGRlcj1cIlwiKSxmLnJlcGVhdD4wfHxcIipcIj09PWYucmVwZWF0fHxcIitcIj09PWYucmVwZWF0KXt2YXIgZz1cIipcIj09PWYucmVwZWF0PzA6XCIrXCI9PT1mLnJlcGVhdD8xOmYucmVwZWF0O2M9Zi5ncm91cG1hcmtlci5zdGFydCtjK2YuZ3JvdXBtYXJrZXIuZW5kK2YucXVhbnRpZmllcm1hcmtlci5zdGFydCtnK1wiLFwiK2YucmVwZWF0K2YucXVhbnRpZmllcm1hcmtlci5lbmR9dmFyIGg7cmV0dXJuIHZvaWQgMD09PWIucHJvdG90eXBlLm1hc2tzQ2FjaGVbY118fGQ9PT0hMD8oaD17bWFzazpjLG1hc2tUb2tlbjpiLnByb3RvdHlwZS5hbmFseXNlTWFzayhjLGYpLHZhbGlkUG9zaXRpb25zOnt9LF9idWZmZXI6dm9pZCAwLGJ1ZmZlcjp2b2lkIDAsdGVzdHM6e30sbWV0YWRhdGE6ZSxtYXNrTGVuZ3RoOnZvaWQgMH0sZCE9PSEwJiYoYi5wcm90b3R5cGUubWFza3NDYWNoZVtmLm51bWVyaWNJbnB1dD9jLnNwbGl0KFwiXCIpLnJldmVyc2UoKS5qb2luKFwiXCIpOmNdPWgsaD1hLmV4dGVuZCghMCx7fSxiLnByb3RvdHlwZS5tYXNrc0NhY2hlW2YubnVtZXJpY0lucHV0P2Muc3BsaXQoXCJcIikucmV2ZXJzZSgpLmpvaW4oXCJcIik6Y10pKSk6aD1hLmV4dGVuZCghMCx7fSxiLnByb3RvdHlwZS5tYXNrc0NhY2hlW2YubnVtZXJpY0lucHV0P2Muc3BsaXQoXCJcIikucmV2ZXJzZSgpLmpvaW4oXCJcIik6Y10pLGh9fXZhciBmO2lmKGEuaXNGdW5jdGlvbihjLm1hc2spJiYoYy5tYXNrPWMubWFzayhjKSksYS5pc0FycmF5KGMubWFzaykpe2lmKGMubWFzay5sZW5ndGg+MSl7Yy5rZWVwU3RhdGljPW51bGw9PT1jLmtlZXBTdGF0aWN8fGMua2VlcFN0YXRpYzt2YXIgZz1jLmdyb3VwbWFya2VyLnN0YXJ0O3JldHVybiBhLmVhY2goYy5udW1lcmljSW5wdXQ/Yy5tYXNrLnJldmVyc2UoKTpjLm1hc2ssZnVuY3Rpb24oYixkKXtnLmxlbmd0aD4xJiYoZys9Yy5ncm91cG1hcmtlci5lbmQrYy5hbHRlcm5hdG9ybWFya2VyK2MuZ3JvdXBtYXJrZXIuc3RhcnQpLGcrPXZvaWQgMD09PWQubWFza3x8YS5pc0Z1bmN0aW9uKGQubWFzayk/ZDpkLm1hc2t9KSxnKz1jLmdyb3VwbWFya2VyLmVuZCxlKGcsYy5tYXNrLGMpfWMubWFzaz1jLm1hc2sucG9wKCl9cmV0dXJuIGMubWFzayYmKGY9dm9pZCAwPT09Yy5tYXNrLm1hc2t8fGEuaXNGdW5jdGlvbihjLm1hc2subWFzayk/ZShjLm1hc2ssYy5tYXNrLGMpOmUoYy5tYXNrLm1hc2ssYy5tYXNrLGMpKSxmfWZ1bmN0aW9uIGUoYyxkLGYpe2Z1bmN0aW9uIGsoYSxiLGMpe2I9Ynx8MDt2YXIgZCxlLGcsaD1bXSxpPTAsaj1uKCk7VD12b2lkIDAhPT1XP1cubWF4TGVuZ3RoOnZvaWQgMCxUPT09LTEmJihUPXZvaWQgMCk7ZG8gYT09PSEwJiZsKCkudmFsaWRQb3NpdGlvbnNbaV0/KGc9bCgpLnZhbGlkUG9zaXRpb25zW2ldLGU9Zy5tYXRjaCxkPWcubG9jYXRvci5zbGljZSgpLGgucHVzaChjPT09ITA/Zy5pbnB1dDpjPT09ITE/ZS5uYXRpdmVEZWY6RihpLGUpKSk6KGc9cShpLGQsaS0xKSxlPWcubWF0Y2gsZD1nLmxvY2F0b3Iuc2xpY2UoKSwoZi5qaXRNYXNraW5nPT09ITF8fGk8anx8TnVtYmVyLmlzRmluaXRlKGYuaml0TWFza2luZykmJmYuaml0TWFza2luZz5pKSYmaC5wdXNoKGM9PT0hMT9lLm5hdGl2ZURlZjpGKGksZSkpKSxpKys7d2hpbGUoKHZvaWQgMD09PVR8fGk8VCkmJihudWxsIT09ZS5mbnx8XCJcIiE9PWUuZGVmKXx8Yj5pKTtyZXR1cm5cIlwiPT09aFtoLmxlbmd0aC0xXSYmaC5wb3AoKSxsKCkubWFza0xlbmd0aD1pKzEsaH1mdW5jdGlvbiBsKCl7cmV0dXJuIGR9ZnVuY3Rpb24gbShhKXt2YXIgYj1sKCk7Yi5idWZmZXI9dm9pZCAwLGEhPT0hMCYmKGIuX2J1ZmZlcj12b2lkIDAsYi52YWxpZFBvc2l0aW9ucz17fSxiLnA9MCl9ZnVuY3Rpb24gbihhLGIsYyl7dmFyIGQ9LTEsZT0tMSxmPWN8fGwoKS52YWxpZFBvc2l0aW9uczt2b2lkIDA9PT1hJiYoYT0tMSk7Zm9yKHZhciBnIGluIGYpe3ZhciBoPXBhcnNlSW50KGcpO2ZbaF0mJihifHxudWxsIT09ZltoXS5tYXRjaC5mbikmJihoPD1hJiYoZD1oKSxoPj1hJiYoZT1oKSl9cmV0dXJuIGQhPT0tMSYmYS1kPjF8fGU8YT9kOmV9ZnVuY3Rpb24gbyhiLGMsZCxlKXtmdW5jdGlvbiBnKGEpe3ZhciBiPWwoKS52YWxpZFBvc2l0aW9uc1thXTtpZih2b2lkIDAhPT1iJiZudWxsPT09Yi5tYXRjaC5mbil7dmFyIGM9bCgpLnZhbGlkUG9zaXRpb25zW2EtMV0sZD1sKCkudmFsaWRQb3NpdGlvbnNbYSsxXTtyZXR1cm4gdm9pZCAwIT09YyYmdm9pZCAwIT09ZH1yZXR1cm4hMX12YXIgaCxpPWIsaj1hLmV4dGVuZCghMCx7fSxsKCkudmFsaWRQb3NpdGlvbnMpLGs9ITE7Zm9yKGwoKS5wPWIsaD1jLTE7aD49aTtoLS0pdm9pZCAwIT09bCgpLnZhbGlkUG9zaXRpb25zW2hdJiYoZCE9PSEwJiYoIWwoKS52YWxpZFBvc2l0aW9uc1toXS5tYXRjaC5vcHRpb25hbGl0eSYmZyhoKXx8Zi5jYW5DbGVhclBvc2l0aW9uKGwoKSxoLG4oKSxlLGYpPT09ITEpfHxkZWxldGUgbCgpLnZhbGlkUG9zaXRpb25zW2hdKTtmb3IobSghMCksaD1pKzE7aDw9bigpOyl7Zm9yKDt2b2lkIDAhPT1sKCkudmFsaWRQb3NpdGlvbnNbaV07KWkrKzt2YXIgbz1sKCkudmFsaWRQb3NpdGlvbnNbaV07aWYoaDxpJiYoaD1pKzEpLHZvaWQgMD09PWwoKS52YWxpZFBvc2l0aW9uc1toXSYmQShoKXx8dm9pZCAwIT09byloKys7ZWxzZXt2YXIgcD1xKGgpO2s9PT0hMSYmaltpXSYmaltpXS5tYXRjaC5kZWY9PT1wLm1hdGNoLmRlZj8obCgpLnZhbGlkUG9zaXRpb25zW2ldPWEuZXh0ZW5kKCEwLHt9LGpbaV0pLGwoKS52YWxpZFBvc2l0aW9uc1tpXS5pbnB1dD1wLmlucHV0LGRlbGV0ZSBsKCkudmFsaWRQb3NpdGlvbnNbaF0saCsrKTpzKGkscC5tYXRjaC5kZWYpP3ooaSxwLmlucHV0fHxGKGgpLCEwKSE9PSExJiYoZGVsZXRlIGwoKS52YWxpZFBvc2l0aW9uc1toXSxoKyssaz0hMCk6QShoKXx8KGgrKyxpLS0pLGkrK319bSghMCl9ZnVuY3Rpb24gcChhLGIpe2Zvcih2YXIgYyxkPWEsZT1uKCksZz1sKCkudmFsaWRQb3NpdGlvbnNbZV18fHQoMClbMF0saD12b2lkIDAhPT1nLmFsdGVybmF0aW9uP2cubG9jYXRvcltnLmFsdGVybmF0aW9uXS50b1N0cmluZygpLnNwbGl0KFwiLFwiKTpbXSxpPTA7aTxkLmxlbmd0aCYmKGM9ZFtpXSwhKGMubWF0Y2gmJihmLmdyZWVkeSYmYy5tYXRjaC5vcHRpb25hbFF1YW50aWZpZXIhPT0hMHx8KGMubWF0Y2gub3B0aW9uYWxpdHk9PT0hMXx8Yy5tYXRjaC5uZXdCbG9ja01hcmtlcj09PSExKSYmYy5tYXRjaC5vcHRpb25hbFF1YW50aWZpZXIhPT0hMCkmJih2b2lkIDA9PT1nLmFsdGVybmF0aW9ufHxnLmFsdGVybmF0aW9uIT09Yy5hbHRlcm5hdGlvbnx8dm9pZCAwIT09Yy5sb2NhdG9yW2cuYWx0ZXJuYXRpb25dJiZ5KGMubG9jYXRvcltnLmFsdGVybmF0aW9uXS50b1N0cmluZygpLnNwbGl0KFwiLFwiKSxoKSkpfHxiPT09ITAmJihudWxsIT09Yy5tYXRjaC5mbnx8L1swLTlhLWJBLVpdLy50ZXN0KGMubWF0Y2guZGVmKSkpO2krKyk7cmV0dXJuIGN9ZnVuY3Rpb24gcShhLGIsYyl7cmV0dXJuIGwoKS52YWxpZFBvc2l0aW9uc1thXXx8cCh0KGEsYj9iLnNsaWNlKCk6YixjKSl9ZnVuY3Rpb24gcihhKXtyZXR1cm4gbCgpLnZhbGlkUG9zaXRpb25zW2FdP2woKS52YWxpZFBvc2l0aW9uc1thXTp0KGEpWzBdfWZ1bmN0aW9uIHMoYSxiKXtmb3IodmFyIGM9ITEsZD10KGEpLGU9MDtlPGQubGVuZ3RoO2UrKylpZihkW2VdLm1hdGNoJiZkW2VdLm1hdGNoLmRlZj09PWIpe2M9ITA7YnJlYWt9cmV0dXJuIGN9ZnVuY3Rpb24gdChiLGMsZCl7ZnVuY3Rpb24gZShjLGQsZyxoKXtmdW5jdGlvbiBqKGcsaCxtKXtmdW5jdGlvbiBwKGIsYyl7dmFyIGQ9MD09PWEuaW5BcnJheShiLGMubWF0Y2hlcyk7cmV0dXJuIGR8fGEuZWFjaChjLm1hdGNoZXMsZnVuY3Rpb24oYSxlKXtpZihlLmlzUXVhbnRpZmllcj09PSEwJiYoZD1wKGIsYy5tYXRjaGVzW2EtMV0pKSlyZXR1cm4hMX0pLGR9ZnVuY3Rpb24gcihiLGMsZCl7dmFyIGUsZjtyZXR1cm4obCgpLnRlc3RzW2JdfHxsKCkudmFsaWRQb3NpdGlvbnNbYl0pJiZhLmVhY2gobCgpLnRlc3RzW2JdfHxbbCgpLnZhbGlkUG9zaXRpb25zW2JdXSxmdW5jdGlvbihhLGIpe3ZhciBnPXZvaWQgMCE9PWQ/ZDpiLmFsdGVybmF0aW9uLGg9dm9pZCAwIT09Yi5sb2NhdG9yW2ddP2IubG9jYXRvcltnXS50b1N0cmluZygpLmluZGV4T2YoYyk6LTE7KHZvaWQgMD09PWZ8fGg8ZikmJmghPT0tMSYmKGU9YixmPWgpfSksZT9lLmxvY2F0b3Iuc2xpY2UoKHZvaWQgMCE9PWQ/ZDplLmFsdGVybmF0aW9uKSsxKTp2b2lkIDAhPT1kP3IoYixjKTp2b2lkIDB9ZnVuY3Rpb24gcyhhLGMpe3JldHVybiBudWxsPT09YS5tYXRjaC5mbiYmbnVsbCE9PWMubWF0Y2guZm4mJmMubWF0Y2guZm4udGVzdChhLm1hdGNoLmRlZixsKCksYiwhMSxmLCExKX1pZihrPjFlNCl0aHJvd1wiSW5wdXRtYXNrOiBUaGVyZSBpcyBwcm9iYWJseSBhbiBlcnJvciBpbiB5b3VyIG1hc2sgZGVmaW5pdGlvbiBvciBpbiB0aGUgY29kZS4gQ3JlYXRlIGFuIGlzc3VlIG9uIGdpdGh1YiB3aXRoIGFuIGV4YW1wbGUgb2YgdGhlIG1hc2sgeW91IGFyZSB1c2luZy4gXCIrbCgpLm1hc2s7aWYoaz09PWImJnZvaWQgMD09PWcubWF0Y2hlcylyZXR1cm4gbi5wdXNoKHttYXRjaDpnLGxvY2F0b3I6aC5yZXZlcnNlKCksY2Q6cX0pLCEwO2lmKHZvaWQgMCE9PWcubWF0Y2hlcyl7aWYoZy5pc0dyb3VwJiZtIT09Zyl7aWYoZz1qKGMubWF0Y2hlc1thLmluQXJyYXkoZyxjLm1hdGNoZXMpKzFdLGgpKXJldHVybiEwfWVsc2UgaWYoZy5pc09wdGlvbmFsKXt2YXIgdD1nO2lmKGc9ZShnLGQsaCxtKSl7aWYoaT1uW24ubGVuZ3RoLTFdLm1hdGNoLCFwKGksdCkpcmV0dXJuITA7bz0hMCxrPWJ9fWVsc2UgaWYoZy5pc0FsdGVybmF0b3Ipe3ZhciB1LHY9Zyx3PVtdLHg9bi5zbGljZSgpLHk9aC5sZW5ndGgsej1kLmxlbmd0aD4wP2Quc2hpZnQoKTotMTtpZih6PT09LTF8fFwic3RyaW5nXCI9PXR5cGVvZiB6KXt2YXIgQSxCPWssQz1kLnNsaWNlKCksRD1bXTtpZihcInN0cmluZ1wiPT10eXBlb2YgeilEPXouc3BsaXQoXCIsXCIpO2Vsc2UgZm9yKEE9MDtBPHYubWF0Y2hlcy5sZW5ndGg7QSsrKUQucHVzaChBKTtmb3IodmFyIEU9MDtFPEQubGVuZ3RoO0UrKyl7aWYoQT1wYXJzZUludChEW0VdKSxuPVtdLGQ9cihrLEEseSl8fEMuc2xpY2UoKSxnPWoodi5tYXRjaGVzW0FdfHxjLm1hdGNoZXNbQV0sW0FdLmNvbmNhdChoKSxtKXx8ZyxnIT09ITAmJnZvaWQgMCE9PWcmJkRbRC5sZW5ndGgtMV08di5tYXRjaGVzLmxlbmd0aCl7dmFyIEY9YS5pbkFycmF5KGcsYy5tYXRjaGVzKSsxO2MubWF0Y2hlcy5sZW5ndGg+RiYmKGc9aihjLm1hdGNoZXNbRl0sW0ZdLmNvbmNhdChoLnNsaWNlKDEsaC5sZW5ndGgpKSxtKSxnJiYoRC5wdXNoKEYudG9TdHJpbmcoKSksYS5lYWNoKG4sZnVuY3Rpb24oYSxiKXtiLmFsdGVybmF0aW9uPWgubGVuZ3RoLTF9KSkpfXU9bi5zbGljZSgpLGs9QixuPVtdO2Zvcih2YXIgRz0wO0c8dS5sZW5ndGg7RysrKXt2YXIgSD11W0ddLEk9ITE7SC5hbHRlcm5hdGlvbj1ILmFsdGVybmF0aW9ufHx5O2Zvcih2YXIgSj0wO0o8dy5sZW5ndGg7SisrKXt2YXIgSz13W0pdO2lmKChcInN0cmluZ1wiIT10eXBlb2Ygenx8YS5pbkFycmF5KEgubG9jYXRvcltILmFsdGVybmF0aW9uXS50b1N0cmluZygpLEQpIT09LTEpJiYoSC5tYXRjaC5kZWY9PT1LLm1hdGNoLmRlZnx8cyhILEspKSl7ST1ILm1hdGNoLm5hdGl2ZURlZj09PUsubWF0Y2gubmF0aXZlRGVmLEguYWx0ZXJuYXRpb249PUsuYWx0ZXJuYXRpb24mJksubG9jYXRvcltLLmFsdGVybmF0aW9uXS50b1N0cmluZygpLmluZGV4T2YoSC5sb2NhdG9yW0guYWx0ZXJuYXRpb25dKT09PS0xJiYoSy5sb2NhdG9yW0suYWx0ZXJuYXRpb25dPUsubG9jYXRvcltLLmFsdGVybmF0aW9uXStcIixcIitILmxvY2F0b3JbSC5hbHRlcm5hdGlvbl0sSy5hbHRlcm5hdGlvbj1ILmFsdGVybmF0aW9uLG51bGw9PUgubWF0Y2guZm4mJihLLm5hPUsubmF8fEgubG9jYXRvcltILmFsdGVybmF0aW9uXS50b1N0cmluZygpLEsubmEuaW5kZXhPZihILmxvY2F0b3JbSC5hbHRlcm5hdGlvbl0pPT09LTEmJihLLm5hPUsubmErXCIsXCIrSC5sb2NhdG9yW0guYWx0ZXJuYXRpb25dKSkpO2JyZWFrfX1JfHx3LnB1c2goSCl9fVwic3RyaW5nXCI9PXR5cGVvZiB6JiYodz1hLm1hcCh3LGZ1bmN0aW9uKGIsYyl7aWYoaXNGaW5pdGUoYykpe3ZhciBkLGU9Yi5hbHRlcm5hdGlvbixmPWIubG9jYXRvcltlXS50b1N0cmluZygpLnNwbGl0KFwiLFwiKTtiLmxvY2F0b3JbZV09dm9pZCAwLGIuYWx0ZXJuYXRpb249dm9pZCAwO2Zvcih2YXIgZz0wO2c8Zi5sZW5ndGg7ZysrKWQ9YS5pbkFycmF5KGZbZ10sRCkhPT0tMSxkJiYodm9pZCAwIT09Yi5sb2NhdG9yW2VdPyhiLmxvY2F0b3JbZV0rPVwiLFwiLGIubG9jYXRvcltlXSs9ZltnXSk6Yi5sb2NhdG9yW2VdPXBhcnNlSW50KGZbZ10pLGIuYWx0ZXJuYXRpb249ZSk7aWYodm9pZCAwIT09Yi5sb2NhdG9yW2VdKXJldHVybiBifX0pKSxuPXguY29uY2F0KHcpLGs9YixvPW4ubGVuZ3RoPjAsZD1DLnNsaWNlKCl9ZWxzZSBnPWoodi5tYXRjaGVzW3pdfHxjLm1hdGNoZXNbel0sW3pdLmNvbmNhdChoKSxtKTtpZihnKXJldHVybiEwfWVsc2UgaWYoZy5pc1F1YW50aWZpZXImJm0hPT1jLm1hdGNoZXNbYS5pbkFycmF5KGcsYy5tYXRjaGVzKS0xXSlmb3IodmFyIEw9ZyxNPWQubGVuZ3RoPjA/ZC5zaGlmdCgpOjA7TTwoaXNOYU4oTC5xdWFudGlmaWVyLm1heCk/TSsxOkwucXVhbnRpZmllci5tYXgpJiZrPD1iO00rKyl7dmFyIE49Yy5tYXRjaGVzW2EuaW5BcnJheShMLGMubWF0Y2hlcyktMV07aWYoZz1qKE4sW01dLmNvbmNhdChoKSxOKSl7aWYoaT1uW24ubGVuZ3RoLTFdLm1hdGNoLGkub3B0aW9uYWxRdWFudGlmaWVyPU0+TC5xdWFudGlmaWVyLm1pbi0xLHAoaSxOKSl7aWYoTT5MLnF1YW50aWZpZXIubWluLTEpe289ITAsaz1iO2JyZWFrfXJldHVybiEwfXJldHVybiEwfX1lbHNlIGlmKGc9ZShnLGQsaCxtKSlyZXR1cm4hMH1lbHNlIGsrK31mb3IodmFyIG09ZC5sZW5ndGg+MD9kLnNoaWZ0KCk6MDttPGMubWF0Y2hlcy5sZW5ndGg7bSsrKWlmKGMubWF0Y2hlc1ttXS5pc1F1YW50aWZpZXIhPT0hMCl7dmFyIHA9aihjLm1hdGNoZXNbbV0sW21dLmNvbmNhdChnKSxoKTtpZihwJiZrPT09YilyZXR1cm4gcDtpZihrPmIpYnJlYWt9fWZ1bmN0aW9uIGcoYil7dmFyIGM9W107cmV0dXJuIGEuaXNBcnJheShiKXx8KGI9W2JdKSxiLmxlbmd0aD4wJiYodm9pZCAwPT09YlswXS5hbHRlcm5hdGlvbj8oYz1wKGIuc2xpY2UoKSkubG9jYXRvci5zbGljZSgpLDA9PT1jLmxlbmd0aCYmKGM9YlswXS5sb2NhdG9yLnNsaWNlKCkpKTphLmVhY2goYixmdW5jdGlvbihhLGIpe2lmKFwiXCIhPT1iLmRlZilpZigwPT09Yy5sZW5ndGgpYz1iLmxvY2F0b3Iuc2xpY2UoKTtlbHNlIGZvcih2YXIgZD0wO2Q8Yy5sZW5ndGg7ZCsrKWIubG9jYXRvcltkXSYmY1tkXS50b1N0cmluZygpLmluZGV4T2YoYi5sb2NhdG9yW2RdKT09PS0xJiYoY1tkXSs9XCIsXCIrYi5sb2NhdG9yW2RdKX0pKSxjfWZ1bmN0aW9uIGgoYSl7cmV0dXJuIGYua2VlcFN0YXRpYyYmYj4wJiZhLmxlbmd0aD4xKyhcIlwiPT09YVthLmxlbmd0aC0xXS5tYXRjaC5kZWY/MTowKSYmYVswXS5tYXRjaC5vcHRpb25hbGl0eSE9PSEwJiZhWzBdLm1hdGNoLm9wdGlvbmFsUXVhbnRpZmllciE9PSEwJiZudWxsPT09YVswXS5tYXRjaC5mbiYmIS9bMC05YS1iQS1aXS8udGVzdChhWzBdLm1hdGNoLmRlZik/W3AoYSldOmF9dmFyIGksaj1sKCkubWFza1Rva2VuLGs9Yz9kOjAsbT1jP2Muc2xpY2UoKTpbMF0sbj1bXSxvPSExLHE9Yz9jLmpvaW4oXCJcIik6XCJcIjtpZihiPi0xKXtpZih2b2lkIDA9PT1jKXtmb3IodmFyIHIscz1iLTE7dm9pZCAwPT09KHI9bCgpLnZhbGlkUG9zaXRpb25zW3NdfHxsKCkudGVzdHNbc10pJiZzPi0xOylzLS07dm9pZCAwIT09ciYmcz4tMSYmKG09ZyhyKSxxPW0uam9pbihcIlwiKSxrPXMpfWlmKGwoKS50ZXN0c1tiXSYmbCgpLnRlc3RzW2JdWzBdLmNkPT09cSlyZXR1cm4gaChsKCkudGVzdHNbYl0pO2Zvcih2YXIgdD1tLnNoaWZ0KCk7dDxqLmxlbmd0aDt0Kyspe3ZhciB1PWUoalt0XSxtLFt0XSk7aWYodSYmaz09PWJ8fGs+YilicmVha319cmV0dXJuKDA9PT1uLmxlbmd0aHx8bykmJm4ucHVzaCh7bWF0Y2g6e2ZuOm51bGwsY2FyZGluYWxpdHk6MCxvcHRpb25hbGl0eTohMCxjYXNpbmc6bnVsbCxkZWY6XCJcIixwbGFjZWhvbGRlcjpcIlwifSxsb2NhdG9yOltdLGNkOnF9KSx2b2lkIDAhPT1jJiZsKCkudGVzdHNbYl0/aChhLmV4dGVuZCghMCxbXSxuKSk6KGwoKS50ZXN0c1tiXT1hLmV4dGVuZCghMCxbXSxuKSxoKGwoKS50ZXN0c1tiXSkpfWZ1bmN0aW9uIHUoKXtyZXR1cm4gdm9pZCAwPT09bCgpLl9idWZmZXImJihsKCkuX2J1ZmZlcj1rKCExLDEpLHZvaWQgMD09PWwoKS5idWZmZXImJmwoKS5fYnVmZmVyLnNsaWNlKCkpLGwoKS5fYnVmZmVyfWZ1bmN0aW9uIHYoYSl7cmV0dXJuIHZvaWQgMCE9PWwoKS5idWZmZXImJmEhPT0hMHx8KGwoKS5idWZmZXI9ayghMCxuKCksITApKSxsKCkuYnVmZmVyfWZ1bmN0aW9uIHcoYSxiLGMpe3ZhciBkO2lmKGE9PT0hMCltKCksYT0wLGI9Yy5sZW5ndGg7ZWxzZSBmb3IoZD1hO2Q8YjtkKyspZGVsZXRlIGwoKS52YWxpZFBvc2l0aW9uc1tkXTtmb3IoZD1hO2Q8YjtkKyspbSghMCksY1tkXSE9PWYuc2tpcE9wdGlvbmFsUGFydENoYXJhY3RlciYmeihkLGNbZF0sITAsITApfWZ1bmN0aW9uIHgoYSxjLGQpe3N3aXRjaChmLmNhc2luZ3x8Yy5jYXNpbmcpe2Nhc2VcInVwcGVyXCI6YT1hLnRvVXBwZXJDYXNlKCk7YnJlYWs7Y2FzZVwibG93ZXJcIjphPWEudG9Mb3dlckNhc2UoKTticmVhaztjYXNlXCJ0aXRsZVwiOnZhciBlPWwoKS52YWxpZFBvc2l0aW9uc1tkLTFdO2E9MD09PWR8fGUmJmUuaW5wdXQ9PT1TdHJpbmcuZnJvbUNoYXJDb2RlKGIua2V5Q29kZS5TUEFDRSk/YS50b1VwcGVyQ2FzZSgpOmEudG9Mb3dlckNhc2UoKX1yZXR1cm4gYX1mdW5jdGlvbiB5KGIsYyl7Zm9yKHZhciBkPWYuZ3JlZWR5P2M6Yy5zbGljZSgwLDEpLGU9ITEsZz0wO2c8Yi5sZW5ndGg7ZysrKWlmKGEuaW5BcnJheShiW2ddLGQpIT09LTEpe2U9ITA7YnJlYWt9cmV0dXJuIGV9ZnVuY3Rpb24geihjLGQsZSxnLGgpe2Z1bmN0aW9uIGkoYSl7dmFyIGI9WD9hLmJlZ2luLWEuZW5kPjF8fGEuYmVnaW4tYS5lbmQ9PT0xJiZmLmluc2VydE1vZGU6YS5lbmQtYS5iZWdpbj4xfHxhLmVuZC1hLmJlZ2luPT09MSYmZi5pbnNlcnRNb2RlO3JldHVybiBiJiYwPT09YS5iZWdpbiYmYS5lbmQ9PT1sKCkubWFza0xlbmd0aD9cImZ1bGxcIjpifWZ1bmN0aW9uIGooYixkLGUpe3ZhciBoPSExO3JldHVybiBhLmVhY2godChiKSxmdW5jdGlvbihqLGspe2Zvcih2YXIgcD1rLm1hdGNoLHE9ZD8xOjAscj1cIlwiLHM9cC5jYXJkaW5hbGl0eTtzPnE7cy0tKXIrPUQoYi0ocy0xKSk7aWYoZCYmKHIrPWQpLHYoITApLGg9bnVsbCE9cC5mbj9wLmZuLnRlc3QocixsKCksYixlLGYsaShjKSk6KGQ9PT1wLmRlZnx8ZD09PWYuc2tpcE9wdGlvbmFsUGFydENoYXJhY3RlcikmJlwiXCIhPT1wLmRlZiYme2M6cC5wbGFjZWhvbGRlcnx8cC5kZWYscG9zOmJ9LGghPT0hMSl7dmFyIHQ9dm9pZCAwIT09aC5jP2guYzpkO3Q9dD09PWYuc2tpcE9wdGlvbmFsUGFydENoYXJhY3RlciYmbnVsbD09PXAuZm4/cC5wbGFjZWhvbGRlcnx8cC5kZWY6dDt2YXIgeT1iLEE9digpO2lmKHZvaWQgMCE9PWgucmVtb3ZlJiYoYS5pc0FycmF5KGgucmVtb3ZlKXx8KGgucmVtb3ZlPVtoLnJlbW92ZV0pLGEuZWFjaChoLnJlbW92ZS5zb3J0KGZ1bmN0aW9uKGEsYil7cmV0dXJuIGItYX0pLGZ1bmN0aW9uKGEsYil7byhiLGIrMSwhMCl9KSksdm9pZCAwIT09aC5pbnNlcnQmJihhLmlzQXJyYXkoaC5pbnNlcnQpfHwoaC5pbnNlcnQ9W2guaW5zZXJ0XSksYS5lYWNoKGguaW5zZXJ0LnNvcnQoZnVuY3Rpb24oYSxiKXtyZXR1cm4gYS1ifSksZnVuY3Rpb24oYSxiKXt6KGIucG9zLGIuYywhMCxnKX0pKSxoLnJlZnJlc2hGcm9tQnVmZmVyKXt2YXIgQj1oLnJlZnJlc2hGcm9tQnVmZmVyO2lmKGU9ITAsdyhCPT09ITA/QjpCLnN0YXJ0LEIuZW5kLEEpLHZvaWQgMD09PWgucG9zJiZ2b2lkIDA9PT1oLmMpcmV0dXJuIGgucG9zPW4oKSwhMTtpZih5PXZvaWQgMCE9PWgucG9zP2gucG9zOmIseSE9PWIpcmV0dXJuIGg9YS5leHRlbmQoaCx6KHksdCwhMCxnKSksITF9ZWxzZSBpZihoIT09ITAmJnZvaWQgMCE9PWgucG9zJiZoLnBvcyE9PWImJih5PWgucG9zLHcoYix5LHYoKS5zbGljZSgpKSx5IT09YikpcmV0dXJuIGg9YS5leHRlbmQoaCx6KHksdCwhMCkpLCExO3JldHVybihoPT09ITB8fHZvaWQgMCE9PWgucG9zfHx2b2lkIDAhPT1oLmMpJiYoaj4wJiZtKCEwKSx1KHksYS5leHRlbmQoe30sayx7aW5wdXQ6eCh0LHAseSl9KSxnLGkoYykpfHwoaD0hMSksITEpfX0pLGh9ZnVuY3Rpb24gayhiLGMsZCl7dmFyIGUsaCxpLGosayxvLHAscSxyPWEuZXh0ZW5kKCEwLHt9LGwoKS52YWxpZFBvc2l0aW9ucykscz0hMSx1PW4oKTtmb3Ioaj1sKCkudmFsaWRQb3NpdGlvbnNbdV07dT49MDt1LS0paWYoaT1sKCkudmFsaWRQb3NpdGlvbnNbdV0saSYmdm9pZCAwIT09aS5hbHRlcm5hdGlvbil7aWYoZT11LGg9bCgpLnZhbGlkUG9zaXRpb25zW2VdLmFsdGVybmF0aW9uLGoubG9jYXRvcltpLmFsdGVybmF0aW9uXSE9PWkubG9jYXRvcltpLmFsdGVybmF0aW9uXSlicmVhaztqPWl9aWYodm9pZCAwIT09aCl7cT1wYXJzZUludChlKTt2YXIgdj12b2lkIDAhPT1qLmxvY2F0b3Jbai5hbHRlcm5hdGlvbnx8aF0/ai5sb2NhdG9yW2ouYWx0ZXJuYXRpb258fGhdOnBbMF07di5sZW5ndGg+MCYmKHY9di5zcGxpdChcIixcIilbMF0pO3ZhciB3PWwoKS52YWxpZFBvc2l0aW9uc1txXSx4PWwoKS52YWxpZFBvc2l0aW9uc1txLTFdO2EuZWFjaCh0KHEseD94LmxvY2F0b3I6dm9pZCAwLHEtMSksZnVuY3Rpb24oZSxpKXtwPWkubG9jYXRvcltoXT9pLmxvY2F0b3JbaF0udG9TdHJpbmcoKS5zcGxpdChcIixcIik6W107Zm9yKHZhciBqPTA7ajxwLmxlbmd0aDtqKyspe3ZhciB0PVtdLHU9MCx4PTAseT0hMTtpZih2PHBbal0mJih2b2lkIDA9PT1pLm5hfHxhLmluQXJyYXkocFtqXSxpLm5hLnNwbGl0KFwiLFwiKSk9PT0tMSkpe2woKS52YWxpZFBvc2l0aW9uc1txXT1hLmV4dGVuZCghMCx7fSxpKTt2YXIgQT1sKCkudmFsaWRQb3NpdGlvbnNbcV0ubG9jYXRvcjtmb3IobCgpLnZhbGlkUG9zaXRpb25zW3FdLmxvY2F0b3JbaF09cGFyc2VJbnQocFtqXSksbnVsbD09aS5tYXRjaC5mbj8ody5pbnB1dCE9PWkubWF0Y2guZGVmJiYoeT0hMCx3LmdlbmVyYXRlZElucHV0IT09ITAmJnQucHVzaCh3LmlucHV0KSkseCsrLGwoKS52YWxpZFBvc2l0aW9uc1txXS5nZW5lcmF0ZWRJbnB1dD0hL1swLTlhLWJBLVpdLy50ZXN0KGkubWF0Y2guZGVmKSxsKCkudmFsaWRQb3NpdGlvbnNbcV0uaW5wdXQ9aS5tYXRjaC5kZWYpOmwoKS52YWxpZFBvc2l0aW9uc1txXS5pbnB1dD13LmlucHV0LGs9cSsxO2s8bih2b2lkIDAsITApKzE7aysrKW89bCgpLnZhbGlkUG9zaXRpb25zW2tdLG8mJm8uZ2VuZXJhdGVkSW5wdXQhPT0hMCYmL1swLTlhLWJBLVpdLy50ZXN0KG8uaW5wdXQpP3QucHVzaChvLmlucHV0KTprPGImJnUrKyxkZWxldGUgbCgpLnZhbGlkUG9zaXRpb25zW2tdO2Zvcih5JiZ0WzBdPT09aS5tYXRjaC5kZWYmJnQuc2hpZnQoKSxtKCEwKSxzPSEwO3QubGVuZ3RoPjA7KXt2YXIgQj10LnNoaWZ0KCk7aWYoQiE9PWYuc2tpcE9wdGlvbmFsUGFydENoYXJhY3RlciYmIShzPXoobih2b2lkIDAsITApKzEsQiwhMSxnLCEwKSkpYnJlYWt9aWYocyl7bCgpLnZhbGlkUG9zaXRpb25zW3FdLmxvY2F0b3I9QTt2YXIgQz1uKGIpKzE7Zm9yKGs9cSsxO2s8bigpKzE7aysrKW89bCgpLnZhbGlkUG9zaXRpb25zW2tdLCh2b2lkIDA9PT1vfHxudWxsPT1vLm1hdGNoLmZuKSYmazxiKyh4LXUpJiZ4Kys7Yis9eC11LHM9eihiPkM/QzpiLGMsZCxnLCEwKX1pZihzKXJldHVybiExO20oKSxsKCkudmFsaWRQb3NpdGlvbnM9YS5leHRlbmQoITAse30scil9fX0pfXJldHVybiBzfWZ1bmN0aW9uIHIoYixjKXt2YXIgZD1sKCkudmFsaWRQb3NpdGlvbnNbY107aWYoZClmb3IodmFyIGU9ZC5sb2NhdG9yLGY9ZS5sZW5ndGgsZz1iO2c8YztnKyspaWYodm9pZCAwPT09bCgpLnZhbGlkUG9zaXRpb25zW2ddJiYhQShnLCEwKSl7dmFyIGg9dChnKSxpPWhbMF0saj0tMTthLmVhY2goaCxmdW5jdGlvbihhLGIpe2Zvcih2YXIgYz0wO2M8ZiYmKHZvaWQgMCE9PWIubG9jYXRvcltjXSYmeShiLmxvY2F0b3JbY10udG9TdHJpbmcoKS5zcGxpdChcIixcIiksZVtjXS50b1N0cmluZygpLnNwbGl0KFwiLFwiKSkpO2MrKylqPGMmJihqPWMsaT1iKX0pLHUoZyxhLmV4dGVuZCh7fSxpLHtpbnB1dDppLm1hdGNoLnBsYWNlaG9sZGVyfHxpLm1hdGNoLmRlZn0pLCEwKX19ZnVuY3Rpb24gdShiLGMsZCxlKXtpZihlfHxmLmluc2VydE1vZGUmJnZvaWQgMCE9PWwoKS52YWxpZFBvc2l0aW9uc1tiXSYmdm9pZCAwPT09ZCl7dmFyIGcsaD1hLmV4dGVuZCghMCx7fSxsKCkudmFsaWRQb3NpdGlvbnMpLGk9bih2b2lkIDAsITApO2ZvcihnPWI7Zzw9aTtnKyspZGVsZXRlIGwoKS52YWxpZFBvc2l0aW9uc1tnXTtsKCkudmFsaWRQb3NpdGlvbnNbYl09YS5leHRlbmQoITAse30sYyk7dmFyIGosaz0hMCxvPWwoKS52YWxpZFBvc2l0aW9ucyxwPSExLHE9bCgpLm1hc2tMZW5ndGg7Zm9yKGc9aj1iO2c8PWk7ZysrKXt2YXIgcj1oW2ddO2lmKHZvaWQgMCE9PXIpZm9yKHZhciB0PWo7dDxsKCkubWFza0xlbmd0aCYmKG51bGw9PXIubWF0Y2guZm4mJm9bZ10mJihvW2ddLm1hdGNoLm9wdGlvbmFsUXVhbnRpZmllcj09PSEwfHxvW2ddLm1hdGNoLm9wdGlvbmFsaXR5PT09ITApfHxudWxsIT1yLm1hdGNoLmZuKTspe2lmKHQrKyxwPT09ITEmJmhbdF0mJmhbdF0ubWF0Y2guZGVmPT09ci5tYXRjaC5kZWYpbCgpLnZhbGlkUG9zaXRpb25zW3RdPWEuZXh0ZW5kKCEwLHt9LGhbdF0pLGwoKS52YWxpZFBvc2l0aW9uc1t0XS5pbnB1dD1yLmlucHV0LEModCksaj10LGs9ITA7ZWxzZSBpZihzKHQsci5tYXRjaC5kZWYpKXt2YXIgdT16KHQsci5pbnB1dCwhMCwhMCk7az11IT09ITEsaj11LmNhcmV0fHx1Lmluc2VydD9uKCk6dCxwPSEwfWVsc2Ugaz1yLmdlbmVyYXRlZElucHV0PT09ITA7aWYobCgpLm1hc2tMZW5ndGg8cSYmKGwoKS5tYXNrTGVuZ3RoPXEpLGspYnJlYWt9aWYoIWspYnJlYWt9aWYoIWspcmV0dXJuIGwoKS52YWxpZFBvc2l0aW9ucz1hLmV4dGVuZCghMCx7fSxoKSxtKCEwKSwhMX1lbHNlIGwoKS52YWxpZFBvc2l0aW9uc1tiXT1hLmV4dGVuZCghMCx7fSxjKTtyZXR1cm4gbSghMCksITB9ZnVuY3Rpb24gQyhiKXtmb3IodmFyIGM9Yi0xO2M+LTEmJiFsKCkudmFsaWRQb3NpdGlvbnNbY107Yy0tKTt2YXIgZCxlO2ZvcihjKys7YzxiO2MrKyl2b2lkIDA9PT1sKCkudmFsaWRQb3NpdGlvbnNbY10mJihmLmppdE1hc2tpbmc9PT0hMXx8Zi5qaXRNYXNraW5nPmMpJiYoZT10KGMscShjLTEpLmxvY2F0b3IsYy0xKS5zbGljZSgpLFwiXCI9PT1lW2UubGVuZ3RoLTFdLm1hdGNoLmRlZiYmZS5wb3AoKSxkPXAoZSksZCYmKGQubWF0Y2guZGVmPT09Zi5yYWRpeFBvaW50RGVmaW5pdGlvblN5bWJvbHx8IUEoYywhMCl8fGEuaW5BcnJheShmLnJhZGl4UG9pbnQsdigpKTxjJiZkLm1hdGNoLmZuJiZkLm1hdGNoLmZuLnRlc3QoRihjKSxsKCksYywhMSxmKSkmJihHPWooYyxkLm1hdGNoLnBsYWNlaG9sZGVyfHwobnVsbD09ZC5tYXRjaC5mbj9kLm1hdGNoLmRlZjpcIlwiIT09RihjKT9GKGMpOnYoKVtjXSksITApLEchPT0hMSYmKGwoKS52YWxpZFBvc2l0aW9uc1tHLnBvc3x8Y10uZ2VuZXJhdGVkSW5wdXQ9ITApKSl9ZT1lPT09ITA7dmFyIEU9Yzt2b2lkIDAhPT1jLmJlZ2luJiYoRT1YJiYhaShjKT9jLmVuZDpjLmJlZ2luKTt2YXIgRz0hMSxIPWEuZXh0ZW5kKCEwLHt9LGwoKS52YWxpZFBvc2l0aW9ucyk7aWYoQyhFKSxpKGMpJiYoTih2b2lkIDAsYi5rZXlDb2RlLkRFTEVURSxjKSxFPWwoKS5wKSxFPGwoKS5tYXNrTGVuZ3RoJiYoRz1qKEUsZCxlKSwoIWV8fGc9PT0hMCkmJkc9PT0hMSkpe3ZhciBJPWwoKS52YWxpZFBvc2l0aW9uc1tFXTtpZighSXx8bnVsbCE9PUkubWF0Y2guZm58fEkubWF0Y2guZGVmIT09ZCYmZCE9PWYuc2tpcE9wdGlvbmFsUGFydENoYXJhY3Rlcil7aWYoKGYuaW5zZXJ0TW9kZXx8dm9pZCAwPT09bCgpLnZhbGlkUG9zaXRpb25zW0IoRSldKSYmIUEoRSwhMCkpe3ZhciBKPXQoRSkuc2xpY2UoKTtcIlwiPT09SltKLmxlbmd0aC0xXS5tYXRjaC5kZWYmJkoucG9wKCk7dmFyIEs9cChKLCEwKTtLJiZudWxsPT09Sy5tYXRjaC5mbiYmKEs9Sy5tYXRjaC5wbGFjZWhvbGRlcnx8Sy5tYXRjaC5kZWYsaihFLEssZSksbCgpLnZhbGlkUG9zaXRpb25zW0VdLmdlbmVyYXRlZElucHV0PSEwKTtmb3IodmFyIEw9RSsxLE09QihFKTtMPD1NO0wrKylpZihHPWooTCxkLGUpLEchPT0hMSl7cihFLHZvaWQgMCE9PUcucG9zP0cucG9zOkwpLEU9TDticmVha319fWVsc2UgRz17Y2FyZXQ6QihFKX19cmV0dXJuIEc9PT0hMSYmZi5rZWVwU3RhdGljJiYhZSYmaCE9PSEwJiYoRz1rKEUsZCxlKSksRz09PSEwJiYoRz17cG9zOkV9KSxhLmlzRnVuY3Rpb24oZi5wb3N0VmFsaWRhdGlvbikmJkchPT0hMSYmIWUmJmchPT0hMCYmKEc9ISFmLnBvc3RWYWxpZGF0aW9uKHYoITApLEcsZikmJkcpLHZvaWQgMD09PUcucG9zJiYoRy5wb3M9RSksRz09PSExJiYobSghMCksbCgpLnZhbGlkUG9zaXRpb25zPWEuZXh0ZW5kKCEwLHt9LEgpKSxHfWZ1bmN0aW9uIEEoYSxiKXt2YXIgYztpZihiPyhjPXEoYSkubWF0Y2gsXCJcIj09PWMuZGVmJiYoYz1yKGEpLm1hdGNoKSk6Yz1yKGEpLm1hdGNoLG51bGwhPWMuZm4pcmV0dXJuIGMuZm47aWYoYiE9PSEwJiZhPi0xKXt2YXIgZD10KGEpO3JldHVybiBkLmxlbmd0aD4xKyhcIlwiPT09ZFtkLmxlbmd0aC0xXS5tYXRjaC5kZWY/MTowKX1yZXR1cm4hMX1mdW5jdGlvbiBCKGEsYil7dmFyIGM9bCgpLm1hc2tMZW5ndGg7aWYoYT49YylyZXR1cm4gYztmb3IodmFyIGQ9YTsrK2Q8YyYmKGI9PT0hMCYmKHIoZCkubWF0Y2gubmV3QmxvY2tNYXJrZXIhPT0hMHx8IUEoZCkpfHxiIT09ITAmJiFBKGQpKTspO3JldHVybiBkfWZ1bmN0aW9uIEMoYSxiKXt2YXIgYyxkPWE7aWYoZDw9MClyZXR1cm4gMDtmb3IoOy0tZD4wJiYoYj09PSEwJiZyKGQpLm1hdGNoLm5ld0Jsb2NrTWFya2VyIT09ITB8fGIhPT0hMCYmIUEoZCkmJihjPXQoZCksYy5sZW5ndGg8Mnx8Mj09PWMubGVuZ3RoJiZcIlwiPT09Y1sxXS5tYXRjaC5kZWYpKTspO3JldHVybiBkfWZ1bmN0aW9uIEQoYSl7cmV0dXJuIHZvaWQgMD09PWwoKS52YWxpZFBvc2l0aW9uc1thXT9GKGEpOmwoKS52YWxpZFBvc2l0aW9uc1thXS5pbnB1dH1mdW5jdGlvbiBFKGIsYyxkLGUsZyl7aWYoZSYmYS5pc0Z1bmN0aW9uKGYub25CZWZvcmVXcml0ZSkpe3ZhciBoPWYub25CZWZvcmVXcml0ZShlLGMsZCxmKTtpZihoKXtpZihoLnJlZnJlc2hGcm9tQnVmZmVyKXt2YXIgaT1oLnJlZnJlc2hGcm9tQnVmZmVyO3coaT09PSEwP2k6aS5zdGFydCxpLmVuZCxoLmJ1ZmZlcnx8YyksYz12KCEwKX12b2lkIDAhPT1kJiYoZD12b2lkIDAhPT1oLmNhcmV0P2guY2FyZXQ6ZCl9fWIuaW5wdXRtYXNrLl92YWx1ZVNldChjLmpvaW4oXCJcIikpLHZvaWQgMD09PWR8fHZvaWQgMCE9PWUmJlwiYmx1clwiPT09ZS50eXBlP1AoYixjLGQpOkkoYixkKSxnPT09ITAmJihaPSEwLGEoYikudHJpZ2dlcihcImlucHV0XCIpKX1mdW5jdGlvbiBGKGEsYil7aWYoYj1ifHxyKGEpLm1hdGNoLHZvaWQgMCE9PWIucGxhY2Vob2xkZXIpcmV0dXJuIGIucGxhY2Vob2xkZXI7aWYobnVsbD09PWIuZm4pe2lmKGE+LTEmJnZvaWQgMD09PWwoKS52YWxpZFBvc2l0aW9uc1thXSl7dmFyIGMsZD10KGEpLGU9W107aWYoZC5sZW5ndGg+MSsoXCJcIj09PWRbZC5sZW5ndGgtMV0ubWF0Y2guZGVmPzE6MCkpZm9yKHZhciBnPTA7ZzxkLmxlbmd0aDtnKyspaWYoZFtnXS5tYXRjaC5vcHRpb25hbGl0eSE9PSEwJiZkW2ddLm1hdGNoLm9wdGlvbmFsUXVhbnRpZmllciE9PSEwJiYobnVsbD09PWRbZ10ubWF0Y2guZm58fHZvaWQgMD09PWN8fGRbZ10ubWF0Y2guZm4udGVzdChjLm1hdGNoLmRlZixsKCksYSwhMCxmKSE9PSExKSYmKGUucHVzaChkW2ddKSxudWxsPT09ZFtnXS5tYXRjaC5mbiYmKGM9ZFtnXSksZS5sZW5ndGg+MSYmL1swLTlhLWJBLVpdLy50ZXN0KGVbMF0ubWF0Y2guZGVmKSkpcmV0dXJuIGYucGxhY2Vob2xkZXIuY2hhckF0KGElZi5wbGFjZWhvbGRlci5sZW5ndGgpfXJldHVybiBiLmRlZn1yZXR1cm4gZi5wbGFjZWhvbGRlci5jaGFyQXQoYSVmLnBsYWNlaG9sZGVyLmxlbmd0aCl9ZnVuY3Rpb24gRyhjLGQsZSxnLGgsaSl7ZnVuY3Rpb24gaigpe3ZhciBhPSExLGI9dSgpLnNsaWNlKHAsQihwKSkuam9pbihcIlwiKS5pbmRleE9mKG8pO2lmKGIhPT0tMSYmIUEocCkpe2E9ITA7Zm9yKHZhciBjPXUoKS5zbGljZShwLHArYiksZD0wO2Q8Yy5sZW5ndGg7ZCsrKWlmKFwiIFwiIT09Y1tkXSl7YT0hMTticmVha319cmV0dXJuIGF9dmFyIGs9Zy5zbGljZSgpLG89XCJcIixwPTAscj12b2lkIDA7aWYobSgpLGwoKS5wPUIoLTEpLCFlKWlmKGYuYXV0b1VubWFzayE9PSEwKXt2YXIgcz11KCkuc2xpY2UoMCxCKC0xKSkuam9pbihcIlwiKSx0PWsuam9pbihcIlwiKS5tYXRjaChuZXcgUmVnRXhwKFwiXlwiK2IuZXNjYXBlUmVnZXgocyksXCJnXCIpKTt0JiZ0Lmxlbmd0aD4wJiYoay5zcGxpY2UoMCx0Lmxlbmd0aCpzLmxlbmd0aCkscD1CKHApKX1lbHNlIHA9QihwKTtpZihhLmVhY2goayxmdW5jdGlvbihiLGQpe2lmKHZvaWQgMCE9PWQpe3ZhciBnPW5ldyBhLkV2ZW50KFwia2V5cHJlc3NcIik7Zy53aGljaD1kLmNoYXJDb2RlQXQoMCksbys9ZDt2YXIgaD1uKHZvaWQgMCwhMCksaT1sKCkudmFsaWRQb3NpdGlvbnNbaF0saz1xKGgrMSxpP2kubG9jYXRvci5zbGljZSgpOnZvaWQgMCxoKTtpZighaigpfHxlfHxmLmF1dG9Vbm1hc2spe3ZhciBzPWU/YjpudWxsPT1rLm1hdGNoLmZuJiZrLm1hdGNoLm9wdGlvbmFsaXR5JiZoKzE8bCgpLnA/aCsxOmwoKS5wO3I9YmEua2V5cHJlc3NFdmVudC5jYWxsKGMsZywhMCwhMSxlLHMpLHA9cysxLG89XCJcIn1lbHNlIHI9YmEua2V5cHJlc3NFdmVudC5jYWxsKGMsZywhMCwhMSwhMCxoKzEpO2lmKCFlJiZhLmlzRnVuY3Rpb24oZi5vbkJlZm9yZVdyaXRlKSYmKHI9Zi5vbkJlZm9yZVdyaXRlKGcsdigpLHIuZm9yd2FyZFBvc2l0aW9uLGYpLHImJnIucmVmcmVzaEZyb21CdWZmZXIpKXt2YXIgdD1yLnJlZnJlc2hGcm9tQnVmZmVyO3codD09PSEwP3Q6dC5zdGFydCx0LmVuZCxyLmJ1ZmZlciksbSghMCksci5jYXJldCYmKGwoKS5wPXIuY2FyZXQpfX19KSxkKXt2YXIgeD12b2lkIDAseT1uKCk7ZG9jdW1lbnQuYWN0aXZlRWxlbWVudD09PWMmJihofHxyKSYmKHg9SShjKS5iZWdpbixoJiZyPT09ITEmJih4PUIobih4KSkpLHImJmkhPT0hMCYmKHg8eSsxfHx5PT09LTEpJiYoeD1mLm51bWVyaWNJbnB1dCYmdm9pZCAwPT09ci5jYXJldD9DKHIuZm9yd2FyZFBvc2l0aW9uKTpyLmZvcndhcmRQb3NpdGlvbikpLEUoYyx2KCkseCxofHxuZXcgYS5FdmVudChcImNoZWNrdmFsXCIpKX19ZnVuY3Rpb24gSChiKXtpZihiJiZ2b2lkIDA9PT1iLmlucHV0bWFzaylyZXR1cm4gYi52YWx1ZTt2YXIgYz1bXSxkPWwoKS52YWxpZFBvc2l0aW9ucztmb3IodmFyIGUgaW4gZClkW2VdLm1hdGNoJiZudWxsIT1kW2VdLm1hdGNoLmZuJiZjLnB1c2goZFtlXS5pbnB1dCk7dmFyIGc9MD09PWMubGVuZ3RoP1wiXCI6KFg/Yy5yZXZlcnNlKCk6Yykuam9pbihcIlwiKTtpZihhLmlzRnVuY3Rpb24oZi5vblVuTWFzaykpe3ZhciBoPShYP3YoKS5zbGljZSgpLnJldmVyc2UoKTp2KCkpLmpvaW4oXCJcIik7Zz1mLm9uVW5NYXNrKGgsZyxmKXx8Z31yZXR1cm4gZ31mdW5jdGlvbiBJKGEsYixjLGQpe2Z1bmN0aW9uIGUoYSl7aWYoZCE9PSEwJiZYJiZcIm51bWJlclwiPT10eXBlb2YgYSYmKCFmLmdyZWVkeXx8XCJcIiE9PWYucGxhY2Vob2xkZXIpKXt2YXIgYj12KCkuam9pbihcIlwiKS5sZW5ndGg7YT1iLWF9cmV0dXJuIGF9dmFyIGg7aWYoXCJudW1iZXJcIiE9dHlwZW9mIGIpcmV0dXJuIGEuc2V0U2VsZWN0aW9uUmFuZ2U/KGI9YS5zZWxlY3Rpb25TdGFydCxjPWEuc2VsZWN0aW9uRW5kKTp3aW5kb3cuZ2V0U2VsZWN0aW9uPyhoPXdpbmRvdy5nZXRTZWxlY3Rpb24oKS5nZXRSYW5nZUF0KDApLGguY29tbW9uQW5jZXN0b3JDb250YWluZXIucGFyZW50Tm9kZSE9PWEmJmguY29tbW9uQW5jZXN0b3JDb250YWluZXIhPT1hfHwoYj1oLnN0YXJ0T2Zmc2V0LGM9aC5lbmRPZmZzZXQpKTpkb2N1bWVudC5zZWxlY3Rpb24mJmRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSYmKGg9ZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCksYj0wLWguZHVwbGljYXRlKCkubW92ZVN0YXJ0KFwiY2hhcmFjdGVyXCIsLWEuaW5wdXRtYXNrLl92YWx1ZUdldCgpLmxlbmd0aCksYz1iK2gudGV4dC5sZW5ndGgpLHtiZWdpbjplKGIpLGVuZDplKGMpfTtiPWUoYiksYz1lKGMpLGM9XCJudW1iZXJcIj09dHlwZW9mIGM/YzpiO3ZhciBpPXBhcnNlSW50KCgoYS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3fHx3aW5kb3cpLmdldENvbXB1dGVkU3R5bGU/KGEub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlld3x8d2luZG93KS5nZXRDb21wdXRlZFN0eWxlKGEsbnVsbCk6YS5jdXJyZW50U3R5bGUpLmZvbnRTaXplKSpjO2lmKGEuc2Nyb2xsTGVmdD1pPmEuc2Nyb2xsV2lkdGg/aTowLGd8fGYuaW5zZXJ0TW9kZSE9PSExfHxiIT09Y3x8YysrLGEuc2V0U2VsZWN0aW9uUmFuZ2UpYS5zZWxlY3Rpb25TdGFydD1iLGEuc2VsZWN0aW9uRW5kPWM7ZWxzZSBpZih3aW5kb3cuZ2V0U2VsZWN0aW9uKXtpZihoPWRvY3VtZW50LmNyZWF0ZVJhbmdlKCksdm9pZCAwPT09YS5maXJzdENoaWxkfHxudWxsPT09YS5maXJzdENoaWxkKXt2YXIgaj1kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKTthLmFwcGVuZENoaWxkKGopfWguc2V0U3RhcnQoYS5maXJzdENoaWxkLGI8YS5pbnB1dG1hc2suX3ZhbHVlR2V0KCkubGVuZ3RoP2I6YS5pbnB1dG1hc2suX3ZhbHVlR2V0KCkubGVuZ3RoKSxoLnNldEVuZChhLmZpcnN0Q2hpbGQsYzxhLmlucHV0bWFzay5fdmFsdWVHZXQoKS5sZW5ndGg/YzphLmlucHV0bWFzay5fdmFsdWVHZXQoKS5sZW5ndGgpLGguY29sbGFwc2UoITApO3ZhciBrPXdpbmRvdy5nZXRTZWxlY3Rpb24oKTtrLnJlbW92ZUFsbFJhbmdlcygpLGsuYWRkUmFuZ2UoaCl9ZWxzZSBhLmNyZWF0ZVRleHRSYW5nZSYmKGg9YS5jcmVhdGVUZXh0UmFuZ2UoKSxoLmNvbGxhcHNlKCEwKSxoLm1vdmVFbmQoXCJjaGFyYWN0ZXJcIixjKSxoLm1vdmVTdGFydChcImNoYXJhY3RlclwiLGIpLGguc2VsZWN0KCkpO1AoYSx2b2lkIDAse2JlZ2luOmIsZW5kOmN9KX1mdW5jdGlvbiBKKGIpe3ZhciBjLGQsZT12KCksZj1lLmxlbmd0aCxnPW4oKSxoPXt9LGk9bCgpLnZhbGlkUG9zaXRpb25zW2ddLGo9dm9pZCAwIT09aT9pLmxvY2F0b3Iuc2xpY2UoKTp2b2lkIDA7Zm9yKGM9ZysxO2M8ZS5sZW5ndGg7YysrKWQ9cShjLGosYy0xKSxqPWQubG9jYXRvci5zbGljZSgpLGhbY109YS5leHRlbmQoITAse30sZCk7dmFyIGs9aSYmdm9pZCAwIT09aS5hbHRlcm5hdGlvbj9pLmxvY2F0b3JbaS5hbHRlcm5hdGlvbl06dm9pZCAwO2ZvcihjPWYtMTtjPmcmJihkPWhbY10sKGQubWF0Y2gub3B0aW9uYWxpdHl8fGQubWF0Y2gub3B0aW9uYWxRdWFudGlmaWVyfHxrJiYoayE9PWhbY10ubG9jYXRvcltpLmFsdGVybmF0aW9uXSYmbnVsbCE9ZC5tYXRjaC5mbnx8bnVsbD09PWQubWF0Y2guZm4mJmQubG9jYXRvcltpLmFsdGVybmF0aW9uXSYmeShkLmxvY2F0b3JbaS5hbHRlcm5hdGlvbl0udG9TdHJpbmcoKS5zcGxpdChcIixcIiksay50b1N0cmluZygpLnNwbGl0KFwiLFwiKSkmJlwiXCIhPT10KGMpWzBdLmRlZikpJiZlW2NdPT09RihjLGQubWF0Y2gpKTtjLS0pZi0tO3JldHVybiBiP3tsOmYsZGVmOmhbZl0/aFtmXS5tYXRjaDp2b2lkIDB9OmZ9ZnVuY3Rpb24gSyhhKXtmb3IodmFyIGI9SigpLGM9YS5sZW5ndGgtMTtjPmImJiFBKGMpO2MtLSk7cmV0dXJuIGEuc3BsaWNlKGIsYysxLWIpLGF9ZnVuY3Rpb24gTChiKXtpZihhLmlzRnVuY3Rpb24oZi5pc0NvbXBsZXRlKSlyZXR1cm4gZi5pc0NvbXBsZXRlKGIsZik7aWYoXCIqXCIhPT1mLnJlcGVhdCl7dmFyIGM9ITEsZD1KKCEwKSxlPUMoZC5sKTtpZih2b2lkIDA9PT1kLmRlZnx8ZC5kZWYubmV3QmxvY2tNYXJrZXJ8fGQuZGVmLm9wdGlvbmFsaXR5fHxkLmRlZi5vcHRpb25hbFF1YW50aWZpZXIpe2M9ITA7Zm9yKHZhciBnPTA7Zzw9ZTtnKyspe3ZhciBoPXEoZykubWF0Y2g7aWYobnVsbCE9PWguZm4mJnZvaWQgMD09PWwoKS52YWxpZFBvc2l0aW9uc1tnXSYmaC5vcHRpb25hbGl0eSE9PSEwJiZoLm9wdGlvbmFsUXVhbnRpZmllciE9PSEwfHxudWxsPT09aC5mbiYmYltnXSE9PUYoZyxoKSl7Yz0hMTticmVha319fXJldHVybiBjfX1mdW5jdGlvbiBNKGIpe2Z1bmN0aW9uIGMoYil7aWYoYS52YWxIb29rcyYmKHZvaWQgMD09PWEudmFsSG9va3NbYl18fGEudmFsSG9va3NbYl0uaW5wdXRtYXNrcGF0Y2ghPT0hMCkpe3ZhciBjPWEudmFsSG9va3NbYl0mJmEudmFsSG9va3NbYl0uZ2V0P2EudmFsSG9va3NbYl0uZ2V0OmZ1bmN0aW9uKGEpe3JldHVybiBhLnZhbHVlfSxkPWEudmFsSG9va3NbYl0mJmEudmFsSG9va3NbYl0uc2V0P2EudmFsSG9va3NbYl0uc2V0OmZ1bmN0aW9uKGEsYil7cmV0dXJuIGEudmFsdWU9YixhfTthLnZhbEhvb2tzW2JdPXtnZXQ6ZnVuY3Rpb24oYSl7aWYoYS5pbnB1dG1hc2spe2lmKGEuaW5wdXRtYXNrLm9wdHMuYXV0b1VubWFzaylyZXR1cm4gYS5pbnB1dG1hc2sudW5tYXNrZWR2YWx1ZSgpO3ZhciBiPWMoYSk7cmV0dXJuIG4odm9pZCAwLHZvaWQgMCxhLmlucHV0bWFzay5tYXNrc2V0LnZhbGlkUG9zaXRpb25zKSE9PS0xfHxmLm51bGxhYmxlIT09ITA/YjpcIlwifXJldHVybiBjKGEpfSxzZXQ6ZnVuY3Rpb24oYixjKXt2YXIgZSxmPWEoYik7cmV0dXJuIGU9ZChiLGMpLGIuaW5wdXRtYXNrJiZmLnRyaWdnZXIoXCJzZXR2YWx1ZVwiKSxlfSxpbnB1dG1hc2twYXRjaDohMH19fWZ1bmN0aW9uIGQoKXtyZXR1cm4gdGhpcy5pbnB1dG1hc2s/dGhpcy5pbnB1dG1hc2sub3B0cy5hdXRvVW5tYXNrP3RoaXMuaW5wdXRtYXNrLnVubWFza2VkdmFsdWUoKTpuKCkhPT0tMXx8Zi5udWxsYWJsZSE9PSEwP2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQ9PT10aGlzJiZmLmNsZWFyTWFza09uTG9zdEZvY3VzPyhYP0sodigpLnNsaWNlKCkpLnJldmVyc2UoKTpLKHYoKS5zbGljZSgpKSkuam9pbihcIlwiKTpoLmNhbGwodGhpcyk6XCJcIjpoLmNhbGwodGhpcyl9ZnVuY3Rpb24gZShiKXtpLmNhbGwodGhpcyxiKSx0aGlzLmlucHV0bWFzayYmYSh0aGlzKS50cmlnZ2VyKFwic2V0dmFsdWVcIil9ZnVuY3Rpb24gZyhiKXthYS5vbihiLFwibW91c2VlbnRlclwiLGZ1bmN0aW9uKGIpe3ZhciBjPWEodGhpcyksZD10aGlzLGU9ZC5pbnB1dG1hc2suX3ZhbHVlR2V0KCk7ZSE9PXYoKS5qb2luKFwiXCIpJiZjLnRyaWdnZXIoXCJzZXR2YWx1ZVwiKX0pfXZhciBoLGk7aWYoIWIuaW5wdXRtYXNrLl9fdmFsdWVHZXQpe2lmKGYubm9WYWx1ZVBhdGNoaW5nIT09ITApe2lmKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ipe1wiZnVuY3Rpb25cIiE9dHlwZW9mIE9iamVjdC5nZXRQcm90b3R5cGVPZiYmKE9iamVjdC5nZXRQcm90b3R5cGVPZj1cIm9iamVjdFwiPT10eXBlb2ZcInRlc3RcIi5fX3Byb3RvX18/ZnVuY3Rpb24oYSl7cmV0dXJuIGEuX19wcm90b19ffTpmdW5jdGlvbihhKXtyZXR1cm4gYS5jb25zdHJ1Y3Rvci5wcm90b3R5cGV9KTt2YXIgaj1PYmplY3QuZ2V0UHJvdG90eXBlT2Y/T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPYmplY3QuZ2V0UHJvdG90eXBlT2YoYiksXCJ2YWx1ZVwiKTp2b2lkIDA7aiYmai5nZXQmJmouc2V0PyhoPWouZ2V0LGk9ai5zZXQsT2JqZWN0LmRlZmluZVByb3BlcnR5KGIsXCJ2YWx1ZVwiLHtnZXQ6ZCxzZXQ6ZSxjb25maWd1cmFibGU6ITB9KSk6XCJJTlBVVFwiIT09Yi50YWdOYW1lJiYoaD1mdW5jdGlvbigpe3JldHVybiB0aGlzLnRleHRDb250ZW50fSxpPWZ1bmN0aW9uKGEpe3RoaXMudGV4dENvbnRlbnQ9YX0sT2JqZWN0LmRlZmluZVByb3BlcnR5KGIsXCJ2YWx1ZVwiLHtnZXQ6ZCxzZXQ6ZSxjb25maWd1cmFibGU6ITB9KSl9ZWxzZSBkb2N1bWVudC5fX2xvb2t1cEdldHRlcl9fJiZiLl9fbG9va3VwR2V0dGVyX18oXCJ2YWx1ZVwiKSYmKGg9Yi5fX2xvb2t1cEdldHRlcl9fKFwidmFsdWVcIiksaT1iLl9fbG9va3VwU2V0dGVyX18oXCJ2YWx1ZVwiKSxiLl9fZGVmaW5lR2V0dGVyX18oXCJ2YWx1ZVwiLGQpLGIuX19kZWZpbmVTZXR0ZXJfXyhcInZhbHVlXCIsZSkpO2IuaW5wdXRtYXNrLl9fdmFsdWVHZXQ9aCxiLmlucHV0bWFzay5fX3ZhbHVlU2V0PWl9Yi5pbnB1dG1hc2suX3ZhbHVlR2V0PWZ1bmN0aW9uKGEpe3JldHVybiBYJiZhIT09ITA/aC5jYWxsKHRoaXMuZWwpLnNwbGl0KFwiXCIpLnJldmVyc2UoKS5qb2luKFwiXCIpOmguY2FsbCh0aGlzLmVsKX0sYi5pbnB1dG1hc2suX3ZhbHVlU2V0PWZ1bmN0aW9uKGEsYil7aS5jYWxsKHRoaXMuZWwsbnVsbD09PWF8fHZvaWQgMD09PWE/XCJcIjpiIT09ITAmJlg/YS5zcGxpdChcIlwiKS5yZXZlcnNlKCkuam9pbihcIlwiKTphKX0sdm9pZCAwPT09aCYmKGg9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52YWx1ZX0saT1mdW5jdGlvbihhKXt0aGlzLnZhbHVlPWF9LGMoYi50eXBlKSxnKGIpKX19ZnVuY3Rpb24gTihjLGQsZSxnKXtmdW5jdGlvbiBoKCl7aWYoZi5rZWVwU3RhdGljKXtmb3IodmFyIGI9W10sZD1uKC0xLCEwKSxlPWEuZXh0ZW5kKCEwLHt9LGwoKS52YWxpZFBvc2l0aW9ucyksZz1sKCkudmFsaWRQb3NpdGlvbnNbZF07ZD49MDtkLS0pe3ZhciBoPWwoKS52YWxpZFBvc2l0aW9uc1tkXTtpZihoKXtpZihoLmdlbmVyYXRlZElucHV0IT09ITAmJi9bMC05YS1iQS1aXS8udGVzdChoLmlucHV0KSYmYi5wdXNoKGguaW5wdXQpLGRlbGV0ZSBsKCkudmFsaWRQb3NpdGlvbnNbZF0sdm9pZCAwIT09aC5hbHRlcm5hdGlvbiYmaC5sb2NhdG9yW2guYWx0ZXJuYXRpb25dIT09Zy5sb2NhdG9yW2guYWx0ZXJuYXRpb25dKWJyZWFrO2c9aH19aWYoZD4tMSlmb3IobCgpLnA9QihuKC0xLCEwKSk7Yi5sZW5ndGg+MDspe3ZhciBpPW5ldyBhLkV2ZW50KFwia2V5cHJlc3NcIik7aS53aGljaD1iLnBvcCgpLmNoYXJDb2RlQXQoMCksYmEua2V5cHJlc3NFdmVudC5jYWxsKGMsaSwhMCwhMSwhMSxsKCkucCl9ZWxzZSBsKCkudmFsaWRQb3NpdGlvbnM9YS5leHRlbmQoITAse30sZSl9fWlmKChmLm51bWVyaWNJbnB1dHx8WCkmJihkPT09Yi5rZXlDb2RlLkJBQ0tTUEFDRT9kPWIua2V5Q29kZS5ERUxFVEU6ZD09PWIua2V5Q29kZS5ERUxFVEUmJihkPWIua2V5Q29kZS5CQUNLU1BBQ0UpLFgpKXt2YXIgaT1lLmVuZDtlLmVuZD1lLmJlZ2luLGUuYmVnaW49aX1kPT09Yi5rZXlDb2RlLkJBQ0tTUEFDRSYmKGUuZW5kLWUuYmVnaW48MXx8Zi5pbnNlcnRNb2RlPT09ITEpPyhlLmJlZ2luPUMoZS5iZWdpbiksdm9pZCAwPT09bCgpLnZhbGlkUG9zaXRpb25zW2UuYmVnaW5dfHxsKCkudmFsaWRQb3NpdGlvbnNbZS5iZWdpbl0uaW5wdXQhPT1mLmdyb3VwU2VwYXJhdG9yJiZsKCkudmFsaWRQb3NpdGlvbnNbZS5iZWdpbl0uaW5wdXQhPT1mLnJhZGl4UG9pbnR8fGUuYmVnaW4tLSk6ZD09PWIua2V5Q29kZS5ERUxFVEUmJmUuYmVnaW49PT1lLmVuZCYmKGUuZW5kPUEoZS5lbmQsITApP2UuZW5kKzE6QihlLmVuZCkrMSx2b2lkIDA9PT1sKCkudmFsaWRQb3NpdGlvbnNbZS5iZWdpbl18fGwoKS52YWxpZFBvc2l0aW9uc1tlLmJlZ2luXS5pbnB1dCE9PWYuZ3JvdXBTZXBhcmF0b3ImJmwoKS52YWxpZFBvc2l0aW9uc1tlLmJlZ2luXS5pbnB1dCE9PWYucmFkaXhQb2ludHx8ZS5lbmQrKyksbyhlLmJlZ2luLGUuZW5kLCExLGcpLGchPT0hMCYmaCgpO3ZhciBqPW4oZS5iZWdpbiwhMCk7ajxlLmJlZ2luP2woKS5wPUIoaik6ZyE9PSEwJiYobCgpLnA9ZS5iZWdpbil9ZnVuY3Rpb24gTyhiKXtmdW5jdGlvbiBjKGEpe3ZhciBjLGQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7Zm9yKHZhciBlIGluIGcpaXNOYU4oZSkmJmUuaW5kZXhPZihcImZvbnRcIikhPT0tMSYmKGQuc3R5bGVbZV09Z1tlXSk7ZC5zdHlsZS50ZXh0VHJhbnNmb3JtPWcudGV4dFRyYW5zZm9ybSxkLnN0eWxlLmxldHRlclNwYWNpbmc9Zy5sZXR0ZXJTcGFjaW5nLGQuc3R5bGUucG9zaXRpb249XCJhYnNvbHV0ZVwiLGQuc3R5bGUuaGVpZ2h0PVwiYXV0b1wiLGQuc3R5bGUud2lkdGg9XCJhdXRvXCIsZC5zdHlsZS52aXNpYmlsaXR5PVwiaGlkZGVuXCIsZC5zdHlsZS53aGl0ZVNwYWNlPVwibm93cmFwXCIsZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkKTt2YXIgZixoPWIuaW5wdXRtYXNrLl92YWx1ZUdldCgpLGk9MDtmb3IoYz0wLGY9aC5sZW5ndGg7Yzw9ZjtjKyspe2lmKGQuaW5uZXJIVE1MKz1oLmNoYXJBdChjKXx8XCJfXCIsZC5vZmZzZXRXaWR0aD49YSl7dmFyIGo9YS1pLGs9ZC5vZmZzZXRXaWR0aC1hO2QuaW5uZXJIVE1MPWguY2hhckF0KGMpLGotPWQub2Zmc2V0V2lkdGgvMyxjPWo8az9jLTE6YzticmVha31pPWQub2Zmc2V0V2lkdGh9cmV0dXJuIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZCksY31mdW5jdGlvbiBkKCl7VS5zdHlsZS5wb3NpdGlvbj1cImFic29sdXRlXCIsVS5zdHlsZS50b3A9ZS50b3ArXCJweFwiLFUuc3R5bGUubGVmdD1lLmxlZnQrXCJweFwiLFUuc3R5bGUud2lkdGg9cGFyc2VJbnQoYi5vZmZzZXRXaWR0aCktcGFyc2VJbnQoZy5wYWRkaW5nTGVmdCktcGFyc2VJbnQoZy5wYWRkaW5nUmlnaHQpLXBhcnNlSW50KGcuYm9yZGVyTGVmdFdpZHRoKS1wYXJzZUludChnLmJvcmRlclJpZ2h0V2lkdGgpK1wicHhcIixVLnN0eWxlLmhlaWdodD1wYXJzZUludChiLm9mZnNldEhlaWdodCktcGFyc2VJbnQoZy5wYWRkaW5nVG9wKS1wYXJzZUludChnLnBhZGRpbmdCb3R0b20pLXBhcnNlSW50KGcuYm9yZGVyVG9wV2lkdGgpLXBhcnNlSW50KGcuYm9yZGVyQm90dG9tV2lkdGgpK1wicHhcIixVLnN0eWxlLmxpbmVIZWlnaHQ9VS5zdHlsZS5oZWlnaHQsVS5zdHlsZS56SW5kZXg9aXNOYU4oZy56SW5kZXgpPy0xOmcuekluZGV4LTEsVS5zdHlsZS53ZWJraXRBcHBlYXJhbmNlPVwidGV4dGZpZWxkXCIsVS5zdHlsZS5tb3pBcHBlYXJhbmNlPVwidGV4dGZpZWxkXCIsVS5zdHlsZS5BcHBlYXJhbmNlPVwidGV4dGZpZWxkXCJ9dmFyIGU9YShiKS5wb3NpdGlvbigpLGc9KGIub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlld3x8d2luZG93KS5nZXRDb21wdXRlZFN0eWxlKGIsbnVsbCk7Yi5wYXJlbnROb2RlO1U9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKFUpO2Zvcih2YXIgaCBpbiBnKWlzTmFOKGgpJiZcImNzc1RleHRcIiE9PWgmJmguaW5kZXhPZihcIndlYmtpdFwiKT09LTEmJihVLnN0eWxlW2hdPWdbaF0pO2Iuc3R5bGUuYmFja2dyb3VuZENvbG9yPVwidHJhbnNwYXJlbnRcIixiLnN0eWxlLmNvbG9yPVwidHJhbnNwYXJlbnRcIixiLnN0eWxlLndlYmtpdEFwcGVhcmFuY2U9XCJjYXJldFwiLGIuc3R5bGUubW96QXBwZWFyYW5jZT1cImNhcmV0XCIsYi5zdHlsZS5BcHBlYXJhbmNlPVwiY2FyZXRcIixkKCksYSh3aW5kb3cpLm9uKFwicmVzaXplXCIsZnVuY3Rpb24oYyl7ZT1hKGIpLnBvc2l0aW9uKCksZz0oYi5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3fHx3aW5kb3cpLmdldENvbXB1dGVkU3R5bGUoYixudWxsKSxkKCl9KSxhKGIpLm9uKFwiY2xpY2tcIixmdW5jdGlvbihhKXtyZXR1cm4gSShiLGMoYS5jbGllbnRYKSksYmEuY2xpY2tFdmVudC5jYWxsKHRoaXMsW2FdKX0pLGEoYikub24oXCJrZXlkb3duXCIsZnVuY3Rpb24oYSl7YS5zaGlmdEtleXx8Zi5pbnNlcnRNb2RlPT09ITF8fHNldFRpbWVvdXQoZnVuY3Rpb24oKXtQKGIpfSwwKX0pfWZ1bmN0aW9uIFAoYSxiLGMpe2Z1bmN0aW9uIGQoKXtnfHxudWxsIT09aS5mbiYmdm9pZCAwIT09ai5pbnB1dD9nJiZudWxsIT09aS5mbiYmdm9pZCAwIT09ai5pbnB1dCYmKGc9ITEsZSs9XCI8L3NwYW4+XCIpOihnPSEwLGUrPVwiPHNwYW4gY2xhc3M9J2ltLXN0YXRpYycnPlwiKX1pZih2b2lkIDAhPT1VKXtiPWJ8fHYoKSx2b2lkIDA9PT1jP2M9SShhKTp2b2lkIDA9PT1jLmJlZ2luJiYoYz17YmVnaW46YyxlbmQ6Y30pO3ZhciBlPVwiXCIsZz0hMTtpZihcIlwiIT1iKXt2YXIgaCxpLGosaz0wLG09bigpO2RvIGs9PT1jLmJlZ2luJiZkb2N1bWVudC5hY3RpdmVFbGVtZW50PT09YSYmKGUrPVwiPHNwYW4gY2xhc3M9J2ltLWNhcmV0JyBzdHlsZT0nYm9yZGVyLXJpZ2h0LXdpZHRoOiAxcHg7Ym9yZGVyLXJpZ2h0LXN0eWxlOiBzb2xpZDsnPjwvc3Bhbj5cIiksbCgpLnZhbGlkUG9zaXRpb25zW2tdPyhqPWwoKS52YWxpZFBvc2l0aW9uc1trXSxpPWoubWF0Y2gsaD1qLmxvY2F0b3Iuc2xpY2UoKSxkKCksZSs9ai5pbnB1dCk6KGo9cShrLGgsay0xKSxpPWoubWF0Y2gsaD1qLmxvY2F0b3Iuc2xpY2UoKSwoZi5qaXRNYXNraW5nPT09ITF8fGs8bXx8TnVtYmVyLmlzRmluaXRlKGYuaml0TWFza2luZykmJmYuaml0TWFza2luZz5rKSYmKGQoKSxlKz1GKGssaSkpKSxrKys7d2hpbGUoKHZvaWQgMD09PVR8fGs8VCkmJihudWxsIT09aS5mbnx8XCJcIiE9PWkuZGVmKXx8bT5rKX1VLmlubmVySFRNTD1lfX1mdW5jdGlvbiBRKGIpe2Z1bmN0aW9uIGMoYixjKXt2YXIgZD1iLmdldEF0dHJpYnV0ZShcInR5cGVcIiksZT1cIklOUFVUXCI9PT1iLnRhZ05hbWUmJmEuaW5BcnJheShkLGMuc3VwcG9ydHNJbnB1dFR5cGUpIT09LTF8fGIuaXNDb250ZW50RWRpdGFibGV8fFwiVEVYVEFSRUFcIj09PWIudGFnTmFtZTtpZighZSYmXCJJTlBVVFwiPT09Yi50YWdOYW1lKXt2YXIgZj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7Zi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsZCksZT1cInRleHRcIj09PWYudHlwZSxmPW51bGx9cmV0dXJuIGV9aWYoYyhiLGYpJiYoVz1iLFM9YShXKSxmLnNob3dUb29sdGlwJiYoVy50aXRsZT1mLnRvb2x0aXB8fGwoKS5tYXNrKSwoXCJydGxcIj09PVcuZGlyfHxmLnJpZ2h0QWxpZ24pJiYoVy5zdHlsZS50ZXh0QWxpZ249XCJyaWdodFwiKSwoXCJydGxcIj09PVcuZGlyfHxmLm51bWVyaWNJbnB1dCkmJihXLmRpcj1cImx0clwiLFcucmVtb3ZlQXR0cmlidXRlKFwiZGlyXCIpLFcuaW5wdXRtYXNrLmlzUlRMPSEwLFg9ITApLGYuY29sb3JNYXNrPT09ITAmJk8oVyksaiYmKFcuaGFzT3duUHJvcGVydHkoXCJpbnB1dG1vZGVcIikmJihXLmlucHV0bW9kZT1mLmlucHV0bW9kZSxXLnNldEF0dHJpYnV0ZShcImlucHV0bW9kZVwiLGYuaW5wdXRtb2RlKSksXCJydGZtXCI9PT1mLmFuZHJvaWRIYWNrJiYoZi5jb2xvck1hc2shPT0hMCYmTyhXKSxXLnR5cGU9XCJwYXNzd29yZFwiKSksYWEub2ZmKFcpLE0oVyksYWEub24oVyxcInN1Ym1pdFwiLGJhLnN1Ym1pdEV2ZW50KSxhYS5vbihXLFwicmVzZXRcIixiYS5yZXNldEV2ZW50KSxhYS5vbihXLFwibW91c2VlbnRlclwiLGJhLm1vdXNlZW50ZXJFdmVudCksYWEub24oVyxcImJsdXJcIixiYS5ibHVyRXZlbnQpLGFhLm9uKFcsXCJmb2N1c1wiLGJhLmZvY3VzRXZlbnQpLGFhLm9uKFcsXCJtb3VzZWxlYXZlXCIsYmEubW91c2VsZWF2ZUV2ZW50KSxmLmNvbG9yTWFzayE9PSEwJiZhYS5vbihXLFwiY2xpY2tcIixiYS5jbGlja0V2ZW50KSxhYS5vbihXLFwiZGJsY2xpY2tcIixiYS5kYmxjbGlja0V2ZW50KSxhYS5vbihXLFwicGFzdGVcIixiYS5wYXN0ZUV2ZW50KSxhYS5vbihXLFwiZHJhZ2Ryb3BcIixiYS5wYXN0ZUV2ZW50KSxhYS5vbihXLFwiZHJvcFwiLGJhLnBhc3RlRXZlbnQpLGFhLm9uKFcsXCJjdXRcIixiYS5jdXRFdmVudCksYWEub24oVyxcImNvbXBsZXRlXCIsZi5vbmNvbXBsZXRlKSxhYS5vbihXLFwiaW5jb21wbGV0ZVwiLGYub25pbmNvbXBsZXRlKSxhYS5vbihXLFwiY2xlYXJlZFwiLGYub25jbGVhcmVkKSxmLmlucHV0RXZlbnRPbmx5IT09ITAmJihhYS5vbihXLFwia2V5ZG93blwiLGJhLmtleWRvd25FdmVudCksYWEub24oVyxcImtleXByZXNzXCIsYmEua2V5cHJlc3NFdmVudCkpLGFhLm9uKFcsXCJjb21wb3NpdGlvbnN0YXJ0XCIsYS5ub29wKSxhYS5vbihXLFwiY29tcG9zaXRpb251cGRhdGVcIixhLm5vb3ApLGFhLm9uKFcsXCJjb21wb3NpdGlvbmVuZFwiLGEubm9vcCksYWEub24oVyxcImtleXVwXCIsYS5ub29wKSxhYS5vbihXLFwiaW5wdXRcIixiYS5pbnB1dEZhbGxCYWNrRXZlbnQpLGFhLm9uKFcsXCJzZXR2YWx1ZVwiLGJhLnNldFZhbHVlRXZlbnQpLHUoKSxcIlwiIT09Vy5pbnB1dG1hc2suX3ZhbHVlR2V0KCl8fGYuY2xlYXJNYXNrT25Mb3N0Rm9jdXM9PT0hMXx8ZG9jdW1lbnQuYWN0aXZlRWxlbWVudD09PVcpKXt2YXIgZD1hLmlzRnVuY3Rpb24oZi5vbkJlZm9yZU1hc2spP2Yub25CZWZvcmVNYXNrKFcuaW5wdXRtYXNrLl92YWx1ZUdldCgpLGYpfHxXLmlucHV0bWFzay5fdmFsdWVHZXQoKTpXLmlucHV0bWFzay5fdmFsdWVHZXQoKTtHKFcsITAsITEsZC5zcGxpdChcIlwiKSk7dmFyIGU9digpLnNsaWNlKCk7Uj1lLmpvaW4oXCJcIiksTChlKT09PSExJiZmLmNsZWFySW5jb21wbGV0ZSYmbSgpLGYuY2xlYXJNYXNrT25Mb3N0Rm9jdXMmJmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQhPT1XJiYobigpPT09LTE/ZT1bXTpLKGUpKSxFKFcsZSksZG9jdW1lbnQuYWN0aXZlRWxlbWVudD09PVcmJkkoVyxCKG4oKSkpfX1kPWR8fHRoaXMubWFza3NldCxmPWZ8fHRoaXMub3B0czt2YXIgUixTLFQsVSxWLFc9dGhpcy5lbCxYPXRoaXMuaXNSVEwsWT0hMSxaPSExLCQ9ITEsXz0hMSxhYT17b246ZnVuY3Rpb24oYyxkLGUpe3ZhciBnPWZ1bmN0aW9uKGMpe2lmKHZvaWQgMD09PXRoaXMuaW5wdXRtYXNrJiZcIkZPUk1cIiE9PXRoaXMubm9kZU5hbWUpe3ZhciBkPWEuZGF0YSh0aGlzLFwiX2lucHV0bWFza19vcHRzXCIpO2Q/bmV3IGIoZCkubWFzayh0aGlzKTphYS5vZmYodGhpcyl9ZWxzZXtpZihcInNldHZhbHVlXCI9PT1jLnR5cGV8fCEodGhpcy5kaXNhYmxlZHx8dGhpcy5yZWFkT25seSYmIShcImtleWRvd25cIj09PWMudHlwZSYmYy5jdHJsS2V5JiY2Nz09PWMua2V5Q29kZXx8Zi50YWJUaHJvdWdoPT09ITEmJmMua2V5Q29kZT09PWIua2V5Q29kZS5UQUIpKSl7c3dpdGNoKGMudHlwZSl7Y2FzZVwiaW5wdXRcIjppZihaPT09ITApcmV0dXJuIFo9ITEsYy5wcmV2ZW50RGVmYXVsdCgpO2JyZWFrO2Nhc2VcImtleWRvd25cIjpZPSExLFo9ITE7YnJlYWs7Y2FzZVwia2V5cHJlc3NcIjppZihZPT09ITApcmV0dXJuIGMucHJldmVudERlZmF1bHQoKTtZPSEwO2JyZWFrO2Nhc2VcImNsaWNrXCI6aWYoaHx8aSl7dmFyIGc9dGhpcyxqPWFyZ3VtZW50cztyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe2UuYXBwbHkoZyxqKX0sMCksITF9fXZhciBrPWUuYXBwbHkodGhpcyxhcmd1bWVudHMpO3JldHVybiBrPT09ITEmJihjLnByZXZlbnREZWZhdWx0KCksYy5zdG9wUHJvcGFnYXRpb24oKSksa31jLnByZXZlbnREZWZhdWx0KCl9fTtjLmlucHV0bWFzay5ldmVudHNbZF09Yy5pbnB1dG1hc2suZXZlbnRzW2RdfHxbXSxjLmlucHV0bWFzay5ldmVudHNbZF0ucHVzaChnKSxhLmluQXJyYXkoZCxbXCJzdWJtaXRcIixcInJlc2V0XCJdKSE9PS0xP251bGwhPWMuZm9ybSYmYShjLmZvcm0pLm9uKGQsZyk6YShjKS5vbihkLGcpfSxvZmY6ZnVuY3Rpb24oYixjKXtpZihiLmlucHV0bWFzayYmYi5pbnB1dG1hc2suZXZlbnRzKXt2YXIgZDtjPyhkPVtdLGRbY109Yi5pbnB1dG1hc2suZXZlbnRzW2NdKTpkPWIuaW5wdXRtYXNrLmV2ZW50cyxhLmVhY2goZCxmdW5jdGlvbihjLGQpe2Zvcig7ZC5sZW5ndGg+MDspe3ZhciBlPWQucG9wKCk7YS5pbkFycmF5KGMsW1wic3VibWl0XCIsXCJyZXNldFwiXSkhPT0tMT9udWxsIT1iLmZvcm0mJmEoYi5mb3JtKS5vZmYoYyxlKTphKGIpLm9mZihjLGUpfWRlbGV0ZSBiLmlucHV0bWFzay5ldmVudHNbY119KX19fSxiYT17a2V5ZG93bkV2ZW50OmZ1bmN0aW9uKGMpe2Z1bmN0aW9uIGQoYSl7dmFyIGI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpLGM9XCJvblwiK2EsZD1jIGluIGI7cmV0dXJuIGR8fChiLnNldEF0dHJpYnV0ZShjLFwicmV0dXJuO1wiKSxkPVwiZnVuY3Rpb25cIj09dHlwZW9mIGJbY10pLGI9bnVsbCxkfXZhciBlPXRoaXMsZz1hKGUpLGg9Yy5rZXlDb2RlLGo9SShlKTtpZihoPT09Yi5rZXlDb2RlLkJBQ0tTUEFDRXx8aD09PWIua2V5Q29kZS5ERUxFVEV8fGkmJmg9PT1iLmtleUNvZGUuQkFDS1NQQUNFX1NBRkFSSXx8Yy5jdHJsS2V5JiZoPT09Yi5rZXlDb2RlLlgmJiFkKFwiY3V0XCIpKWMucHJldmVudERlZmF1bHQoKSxOKGUsaCxqKSxFKGUsdighMCksbCgpLnAsYyxlLmlucHV0bWFzay5fdmFsdWVHZXQoKSE9PXYoKS5qb2luKFwiXCIpKSxlLmlucHV0bWFzay5fdmFsdWVHZXQoKT09PXUoKS5qb2luKFwiXCIpP2cudHJpZ2dlcihcImNsZWFyZWRcIik6TCh2KCkpPT09ITAmJmcudHJpZ2dlcihcImNvbXBsZXRlXCIpLGYuc2hvd1Rvb2x0aXAmJihlLnRpdGxlPWYudG9vbHRpcHx8bCgpLm1hc2spO2Vsc2UgaWYoaD09PWIua2V5Q29kZS5FTkR8fGg9PT1iLmtleUNvZGUuUEFHRV9ET1dOKXtjLnByZXZlbnREZWZhdWx0KCk7dmFyIGs9QihuKCkpO2YuaW5zZXJ0TW9kZXx8ayE9PWwoKS5tYXNrTGVuZ3RofHxjLnNoaWZ0S2V5fHxrLS0sSShlLGMuc2hpZnRLZXk/ai5iZWdpbjprLGssITApfWVsc2UgaD09PWIua2V5Q29kZS5IT01FJiYhYy5zaGlmdEtleXx8aD09PWIua2V5Q29kZS5QQUdFX1VQPyhjLnByZXZlbnREZWZhdWx0KCksSShlLDAsYy5zaGlmdEtleT9qLmJlZ2luOjAsITApKTooZi51bmRvT25Fc2NhcGUmJmg9PT1iLmtleUNvZGUuRVNDQVBFfHw5MD09PWgmJmMuY3RybEtleSkmJmMuYWx0S2V5IT09ITA/KEcoZSwhMCwhMSxSLnNwbGl0KFwiXCIpKSxnLnRyaWdnZXIoXCJjbGlja1wiKSk6aCE9PWIua2V5Q29kZS5JTlNFUlR8fGMuc2hpZnRLZXl8fGMuY3RybEtleT9mLnRhYlRocm91Z2g9PT0hMCYmaD09PWIua2V5Q29kZS5UQUI/KGMuc2hpZnRLZXk9PT0hMD8obnVsbD09PXIoai5iZWdpbikubWF0Y2guZm4mJihqLmJlZ2luPUIoai5iZWdpbikpLGouZW5kPUMoai5iZWdpbiwhMCksai5iZWdpbj1DKGouZW5kLCEwKSk6KGouYmVnaW49QihqLmJlZ2luLCEwKSxqLmVuZD1CKGouYmVnaW4sITApLGouZW5kPGwoKS5tYXNrTGVuZ3RoJiZqLmVuZC0tKSxqLmJlZ2luPGwoKS5tYXNrTGVuZ3RoJiYoYy5wcmV2ZW50RGVmYXVsdCgpLEkoZSxqLmJlZ2luLGouZW5kKSkpOmMuc2hpZnRLZXl8fGYuaW5zZXJ0TW9kZT09PSExJiYoaD09PWIua2V5Q29kZS5SSUdIVD9zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dmFyIGE9SShlKTtJKGUsYS5iZWdpbil9LDApOmg9PT1iLmtleUNvZGUuTEVGVCYmc2V0VGltZW91dChmdW5jdGlvbigpe3ZhciBhPUkoZSk7SShlLFg/YS5iZWdpbisxOmEuYmVnaW4tMSl9LDApKTooZi5pbnNlcnRNb2RlPSFmLmluc2VydE1vZGUsSShlLGYuaW5zZXJ0TW9kZXx8ai5iZWdpbiE9PWwoKS5tYXNrTGVuZ3RoP2ouYmVnaW46ai5iZWdpbi0xKSk7Zi5vbktleURvd24uY2FsbCh0aGlzLGMsdigpLEkoZSkuYmVnaW4sZiksJD1hLmluQXJyYXkoaCxmLmlnbm9yYWJsZXMpIT09LTF9LGtleXByZXNzRXZlbnQ6ZnVuY3Rpb24oYyxkLGUsZyxoKXtcbnZhciBpPXRoaXMsaj1hKGkpLGs9Yy53aGljaHx8Yy5jaGFyQ29kZXx8Yy5rZXlDb2RlO2lmKCEoZD09PSEwfHxjLmN0cmxLZXkmJmMuYWx0S2V5KSYmKGMuY3RybEtleXx8Yy5tZXRhS2V5fHwkKSlyZXR1cm4gaz09PWIua2V5Q29kZS5FTlRFUiYmUiE9PXYoKS5qb2luKFwiXCIpJiYoUj12KCkuam9pbihcIlwiKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ai50cmlnZ2VyKFwiY2hhbmdlXCIpfSwwKSksITA7aWYoayl7NDY9PT1rJiZjLnNoaWZ0S2V5PT09ITEmJlwiLFwiPT09Zi5yYWRpeFBvaW50JiYoaz00NCk7dmFyIG4sbz1kP3tiZWdpbjpoLGVuZDpofTpJKGkpLHA9U3RyaW5nLmZyb21DaGFyQ29kZShrKTtsKCkud3JpdGVPdXRCdWZmZXI9ITA7dmFyIHE9eihvLHAsZyk7aWYocSE9PSExJiYobSghMCksbj12b2lkIDAhPT1xLmNhcmV0P3EuY2FyZXQ6ZD9xLnBvcysxOkIocS5wb3MpLGwoKS5wPW4pLGUhPT0hMSl7dmFyIHI9dGhpcztpZihzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Zi5vbktleVZhbGlkYXRpb24uY2FsbChyLGsscSxmKX0sMCksbCgpLndyaXRlT3V0QnVmZmVyJiZxIT09ITEpe3ZhciBzPXYoKTtFKGkscyxmLm51bWVyaWNJbnB1dCYmdm9pZCAwPT09cS5jYXJldD9DKG4pOm4sYyxkIT09ITApLGQhPT0hMCYmc2V0VGltZW91dChmdW5jdGlvbigpe0wocyk9PT0hMCYmai50cmlnZ2VyKFwiY29tcGxldGVcIil9LDApfX1pZihmLnNob3dUb29sdGlwJiYoaS50aXRsZT1mLnRvb2x0aXB8fGwoKS5tYXNrKSxjLnByZXZlbnREZWZhdWx0KCksZClyZXR1cm4gcS5mb3J3YXJkUG9zaXRpb249bixxfX0scGFzdGVFdmVudDpmdW5jdGlvbihiKXt2YXIgYyxkPXRoaXMsZT1iLm9yaWdpbmFsRXZlbnR8fGIsZz1hKGQpLGg9ZC5pbnB1dG1hc2suX3ZhbHVlR2V0KCEwKSxpPUkoZCk7WCYmKGM9aS5lbmQsaS5lbmQ9aS5iZWdpbixpLmJlZ2luPWMpO3ZhciBqPWguc3Vic3RyKDAsaS5iZWdpbiksaz1oLnN1YnN0cihpLmVuZCxoLmxlbmd0aCk7aWYoaj09PShYP3UoKS5yZXZlcnNlKCk6dSgpKS5zbGljZSgwLGkuYmVnaW4pLmpvaW4oXCJcIikmJihqPVwiXCIpLGs9PT0oWD91KCkucmV2ZXJzZSgpOnUoKSkuc2xpY2UoaS5lbmQpLmpvaW4oXCJcIikmJihrPVwiXCIpLFgmJihjPWosaj1rLGs9Yyksd2luZG93LmNsaXBib2FyZERhdGEmJndpbmRvdy5jbGlwYm9hcmREYXRhLmdldERhdGEpaD1qK3dpbmRvdy5jbGlwYm9hcmREYXRhLmdldERhdGEoXCJUZXh0XCIpK2s7ZWxzZXtpZighZS5jbGlwYm9hcmREYXRhfHwhZS5jbGlwYm9hcmREYXRhLmdldERhdGEpcmV0dXJuITA7aD1qK2UuY2xpcGJvYXJkRGF0YS5nZXREYXRhKFwidGV4dC9wbGFpblwiKStrfXZhciBsPWg7aWYoYS5pc0Z1bmN0aW9uKGYub25CZWZvcmVQYXN0ZSkpe2lmKGw9Zi5vbkJlZm9yZVBhc3RlKGgsZiksbD09PSExKXJldHVybiBiLnByZXZlbnREZWZhdWx0KCk7bHx8KGw9aCl9cmV0dXJuIEcoZCwhMSwhMSxYP2wuc3BsaXQoXCJcIikucmV2ZXJzZSgpOmwudG9TdHJpbmcoKS5zcGxpdChcIlwiKSksRShkLHYoKSxCKG4oKSksYixSIT09digpLmpvaW4oXCJcIikpLEwodigpKT09PSEwJiZnLnRyaWdnZXIoXCJjb21wbGV0ZVwiKSxiLnByZXZlbnREZWZhdWx0KCl9LGlucHV0RmFsbEJhY2tFdmVudDpmdW5jdGlvbihjKXt2YXIgZD10aGlzLGU9ZC5pbnB1dG1hc2suX3ZhbHVlR2V0KCk7aWYodigpLmpvaW4oXCJcIikhPT1lKXt2YXIgZj1JKGQpO2lmKGU9ZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoXCIrYi5lc2NhcGVSZWdleCh1KCkuam9pbihcIlwiKSkrXCIpKlwiKSxcIlwiKSxoKXt2YXIgZz1lLnJlcGxhY2UodigpLmpvaW4oXCJcIiksXCJcIik7aWYoMT09PWcubGVuZ3RoKXt2YXIgaT1uZXcgYS5FdmVudChcImtleXByZXNzXCIpO3JldHVybiBpLndoaWNoPWcuY2hhckNvZGVBdCgwKSxiYS5rZXlwcmVzc0V2ZW50LmNhbGwoZCxpLCEwLCEwLCExLGwoKS52YWxpZFBvc2l0aW9uc1tmLmJlZ2luLTFdP2YuYmVnaW46Zi5iZWdpbi0xKSwhMX19aWYoZi5iZWdpbj5lLmxlbmd0aCYmKEkoZCxlLmxlbmd0aCksZj1JKGQpKSx2KCkubGVuZ3RoLWUubGVuZ3RoIT09MXx8ZS5jaGFyQXQoZi5iZWdpbik9PT12KClbZi5iZWdpbl18fGUuY2hhckF0KGYuYmVnaW4rMSk9PT12KClbZi5iZWdpbl18fEEoZi5iZWdpbikpe2Zvcih2YXIgaj1uKCkrMSxrPXUoKS5qb2luKFwiXCIpO251bGw9PT1lLm1hdGNoKGIuZXNjYXBlUmVnZXgoaykrXCIkXCIpOylrPWsuc2xpY2UoMSk7ZT1lLnJlcGxhY2UoayxcIlwiKSxlPWUuc3BsaXQoXCJcIiksRyhkLCEwLCExLGUsYyxmLmJlZ2luPGopLEwodigpKT09PSEwJiZhKGQpLnRyaWdnZXIoXCJjb21wbGV0ZVwiKX1lbHNlIGMua2V5Q29kZT1iLmtleUNvZGUuQkFDS1NQQUNFLGJhLmtleWRvd25FdmVudC5jYWxsKGQsYyk7Yy5wcmV2ZW50RGVmYXVsdCgpfX0sc2V0VmFsdWVFdmVudDpmdW5jdGlvbihiKXt2YXIgYz10aGlzLGQ9Yy5pbnB1dG1hc2suX3ZhbHVlR2V0KCk7RyhjLCEwLCExLChhLmlzRnVuY3Rpb24oZi5vbkJlZm9yZU1hc2spP2Yub25CZWZvcmVNYXNrKGQsZil8fGQ6ZCkuc3BsaXQoXCJcIikpLFI9digpLmpvaW4oXCJcIiksKGYuY2xlYXJNYXNrT25Mb3N0Rm9jdXN8fGYuY2xlYXJJbmNvbXBsZXRlKSYmYy5pbnB1dG1hc2suX3ZhbHVlR2V0KCk9PT11KCkuam9pbihcIlwiKSYmYy5pbnB1dG1hc2suX3ZhbHVlU2V0KFwiXCIpfSxmb2N1c0V2ZW50OmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMsYz1iLmlucHV0bWFzay5fdmFsdWVHZXQoKTtmLnNob3dNYXNrT25Gb2N1cyYmKCFmLnNob3dNYXNrT25Ib3Zlcnx8Zi5zaG93TWFza09uSG92ZXImJlwiXCI9PT1jKSYmKGIuaW5wdXRtYXNrLl92YWx1ZUdldCgpIT09digpLmpvaW4oXCJcIik/RShiLHYoKSxCKG4oKSkpOl89PT0hMSYmSShiLEIobigpKSkpLGYucG9zaXRpb25DYXJldE9uVGFiPT09ITAmJnNldFRpbWVvdXQoZnVuY3Rpb24oKXtiYS5jbGlja0V2ZW50LmFwcGx5KHRoaXMsW2FdKX0sMCksUj12KCkuam9pbihcIlwiKX0sbW91c2VsZWF2ZUV2ZW50OmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXM7aWYoXz0hMSxmLmNsZWFyTWFza09uTG9zdEZvY3VzJiZkb2N1bWVudC5hY3RpdmVFbGVtZW50IT09Yil7dmFyIGM9digpLnNsaWNlKCksZD1iLmlucHV0bWFzay5fdmFsdWVHZXQoKTtkIT09Yi5nZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiKSYmXCJcIiE9PWQmJihuKCk9PT0tMSYmZD09PXUoKS5qb2luKFwiXCIpP2M9W106SyhjKSxFKGIsYykpfX0sY2xpY2tFdmVudDpmdW5jdGlvbihiKXtmdW5jdGlvbiBjKGIpe2lmKFwiXCIhPT1mLnJhZGl4UG9pbnQpe3ZhciBjPWwoKS52YWxpZFBvc2l0aW9ucztpZih2b2lkIDA9PT1jW2JdfHxjW2JdLmlucHV0PT09RihiKSl7aWYoYjxCKC0xKSlyZXR1cm4hMDt2YXIgZD1hLmluQXJyYXkoZi5yYWRpeFBvaW50LHYoKSk7aWYoZCE9PS0xKXtmb3IodmFyIGUgaW4gYylpZihkPGUmJmNbZV0uaW5wdXQhPT1GKGUpKXJldHVybiExO3JldHVybiEwfX19cmV0dXJuITF9dmFyIGQ9dGhpcztzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7aWYoZG9jdW1lbnQuYWN0aXZlRWxlbWVudD09PWQpe3ZhciBiPUkoZCk7aWYoYi5iZWdpbj09PWIuZW5kKXN3aXRjaChmLnBvc2l0aW9uQ2FyZXRPbkNsaWNrKXtjYXNlXCJub25lXCI6YnJlYWs7Y2FzZVwicmFkaXhGb2N1c1wiOmlmKGMoYi5iZWdpbikpe3ZhciBlPWEuaW5BcnJheShmLnJhZGl4UG9pbnQsdigpLmpvaW4oXCJcIikpO0koZCxmLm51bWVyaWNJbnB1dD9CKGUpOmUpO2JyZWFrfWRlZmF1bHQ6dmFyIGc9Yi5iZWdpbixoPW4oZywhMCksaT1CKGgpO2lmKGc8aSlJKGQsQShnKXx8QShnLTEpP2c6QihnKSk7ZWxzZXt2YXIgaj1GKGkpOyhcIlwiIT09aiYmdigpW2ldIT09aiYmcihpKS5tYXRjaC5vcHRpb25hbFF1YW50aWZpZXIhPT0hMHx8IUEoaSkmJnIoaSkubWF0Y2guZGVmPT09aikmJihpPUIoaSkpLEkoZCxpKX19fX0sMCl9LGRibGNsaWNrRXZlbnQ6ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcztzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7SShiLDAsQihuKCkpKX0sMCl9LGN1dEV2ZW50OmZ1bmN0aW9uKGMpe3ZhciBkPXRoaXMsZT1hKGQpLGc9SShkKSxoPWMub3JpZ2luYWxFdmVudHx8YyxpPXdpbmRvdy5jbGlwYm9hcmREYXRhfHxoLmNsaXBib2FyZERhdGEsaj1YP3YoKS5zbGljZShnLmVuZCxnLmJlZ2luKTp2KCkuc2xpY2UoZy5iZWdpbixnLmVuZCk7aS5zZXREYXRhKFwidGV4dFwiLFg/ai5yZXZlcnNlKCkuam9pbihcIlwiKTpqLmpvaW4oXCJcIikpLGRvY3VtZW50LmV4ZWNDb21tYW5kJiZkb2N1bWVudC5leGVjQ29tbWFuZChcImNvcHlcIiksTihkLGIua2V5Q29kZS5ERUxFVEUsZyksRShkLHYoKSxsKCkucCxjLFIhPT12KCkuam9pbihcIlwiKSksZC5pbnB1dG1hc2suX3ZhbHVlR2V0KCk9PT11KCkuam9pbihcIlwiKSYmZS50cmlnZ2VyKFwiY2xlYXJlZFwiKSxmLnNob3dUb29sdGlwJiYoZC50aXRsZT1mLnRvb2x0aXB8fGwoKS5tYXNrKX0sYmx1ckV2ZW50OmZ1bmN0aW9uKGIpe3ZhciBjPWEodGhpcyksZD10aGlzO2lmKGQuaW5wdXRtYXNrKXt2YXIgZT1kLmlucHV0bWFzay5fdmFsdWVHZXQoKSxnPXYoKS5zbGljZSgpO1IhPT1nLmpvaW4oXCJcIikmJnNldFRpbWVvdXQoZnVuY3Rpb24oKXtjLnRyaWdnZXIoXCJjaGFuZ2VcIiksUj1nLmpvaW4oXCJcIil9LDApLFwiXCIhPT1lJiYoZi5jbGVhck1hc2tPbkxvc3RGb2N1cyYmKG4oKT09PS0xJiZlPT09dSgpLmpvaW4oXCJcIik/Zz1bXTpLKGcpKSxMKGcpPT09ITEmJihzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Yy50cmlnZ2VyKFwiaW5jb21wbGV0ZVwiKX0sMCksZi5jbGVhckluY29tcGxldGUmJihtKCksZz1mLmNsZWFyTWFza09uTG9zdEZvY3VzP1tdOnUoKS5zbGljZSgpKSksRShkLGcsdm9pZCAwLGIpKX19LG1vdXNlZW50ZXJFdmVudDpmdW5jdGlvbihhKXt2YXIgYj10aGlzO189ITAsZG9jdW1lbnQuYWN0aXZlRWxlbWVudCE9PWImJmYuc2hvd01hc2tPbkhvdmVyJiZiLmlucHV0bWFzay5fdmFsdWVHZXQoKSE9PXYoKS5qb2luKFwiXCIpJiZFKGIsdigpKX0sc3VibWl0RXZlbnQ6ZnVuY3Rpb24oYSl7UiE9PXYoKS5qb2luKFwiXCIpJiZTLnRyaWdnZXIoXCJjaGFuZ2VcIiksZi5jbGVhck1hc2tPbkxvc3RGb2N1cyYmbigpPT09LTEmJlcuaW5wdXRtYXNrLl92YWx1ZUdldCYmVy5pbnB1dG1hc2suX3ZhbHVlR2V0KCk9PT11KCkuam9pbihcIlwiKSYmVy5pbnB1dG1hc2suX3ZhbHVlU2V0KFwiXCIpLGYucmVtb3ZlTWFza09uU3VibWl0JiYoVy5pbnB1dG1hc2suX3ZhbHVlU2V0KFcuaW5wdXRtYXNrLnVubWFza2VkdmFsdWUoKSwhMCksc2V0VGltZW91dChmdW5jdGlvbigpe0UoVyx2KCkpfSwwKSl9LHJlc2V0RXZlbnQ6ZnVuY3Rpb24oYSl7c2V0VGltZW91dChmdW5jdGlvbigpe1MudHJpZ2dlcihcInNldHZhbHVlXCIpfSwwKX19O2lmKHZvaWQgMCE9PWMpc3dpdGNoKGMuYWN0aW9uKXtjYXNlXCJpc0NvbXBsZXRlXCI6cmV0dXJuIFc9Yy5lbCxMKHYoKSk7Y2FzZVwidW5tYXNrZWR2YWx1ZVwiOnJldHVybiB2b2lkIDAhPT1XJiZ2b2lkIDA9PT1jLnZhbHVlfHwoVj1jLnZhbHVlLFY9KGEuaXNGdW5jdGlvbihmLm9uQmVmb3JlTWFzayk/Zi5vbkJlZm9yZU1hc2soVixmKXx8VjpWKS5zcGxpdChcIlwiKSxHKHZvaWQgMCwhMSwhMSxYP1YucmV2ZXJzZSgpOlYpLGEuaXNGdW5jdGlvbihmLm9uQmVmb3JlV3JpdGUpJiZmLm9uQmVmb3JlV3JpdGUodm9pZCAwLHYoKSwwLGYpKSxIKFcpO2Nhc2VcIm1hc2tcIjpRKFcpO2JyZWFrO2Nhc2VcImZvcm1hdFwiOnJldHVybiBWPShhLmlzRnVuY3Rpb24oZi5vbkJlZm9yZU1hc2spP2Yub25CZWZvcmVNYXNrKGMudmFsdWUsZil8fGMudmFsdWU6Yy52YWx1ZSkuc3BsaXQoXCJcIiksRyh2b2lkIDAsITEsITEsWD9WLnJldmVyc2UoKTpWKSxhLmlzRnVuY3Rpb24oZi5vbkJlZm9yZVdyaXRlKSYmZi5vbkJlZm9yZVdyaXRlKHZvaWQgMCx2KCksMCxmKSxjLm1ldGFkYXRhP3t2YWx1ZTpYP3YoKS5zbGljZSgpLnJldmVyc2UoKS5qb2luKFwiXCIpOnYoKS5qb2luKFwiXCIpLG1ldGFkYXRhOmUuY2FsbCh0aGlzLHthY3Rpb246XCJnZXRtZXRhZGF0YVwifSxkLGYpfTpYP3YoKS5zbGljZSgpLnJldmVyc2UoKS5qb2luKFwiXCIpOnYoKS5qb2luKFwiXCIpO2Nhc2VcImlzVmFsaWRcIjpjLnZhbHVlPyhWPWMudmFsdWUuc3BsaXQoXCJcIiksRyh2b2lkIDAsITEsITAsWD9WLnJldmVyc2UoKTpWKSk6Yy52YWx1ZT12KCkuam9pbihcIlwiKTtmb3IodmFyIGNhPXYoKSxkYT1KKCksZWE9Y2EubGVuZ3RoLTE7ZWE+ZGEmJiFBKGVhKTtlYS0tKTtyZXR1cm4gY2Euc3BsaWNlKGRhLGVhKzEtZGEpLEwoY2EpJiZjLnZhbHVlPT09digpLmpvaW4oXCJcIik7Y2FzZVwiZ2V0ZW1wdHltYXNrXCI6cmV0dXJuIHUoKS5qb2luKFwiXCIpO2Nhc2VcInJlbW92ZVwiOmlmKFcpe1M9YShXKSxXLmlucHV0bWFzay5fdmFsdWVTZXQoSChXKSksYWEub2ZmKFcpO3ZhciBmYTtPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJiZPYmplY3QuZ2V0UHJvdG90eXBlT2Y/KGZhPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0LmdldFByb3RvdHlwZU9mKFcpLFwidmFsdWVcIiksZmEmJlcuaW5wdXRtYXNrLl9fdmFsdWVHZXQmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eShXLFwidmFsdWVcIix7Z2V0OlcuaW5wdXRtYXNrLl9fdmFsdWVHZXQsc2V0OlcuaW5wdXRtYXNrLl9fdmFsdWVTZXQsY29uZmlndXJhYmxlOiEwfSkpOmRvY3VtZW50Ll9fbG9va3VwR2V0dGVyX18mJlcuX19sb29rdXBHZXR0ZXJfXyhcInZhbHVlXCIpJiZXLmlucHV0bWFzay5fX3ZhbHVlR2V0JiYoVy5fX2RlZmluZUdldHRlcl9fKFwidmFsdWVcIixXLmlucHV0bWFzay5fX3ZhbHVlR2V0KSxXLl9fZGVmaW5lU2V0dGVyX18oXCJ2YWx1ZVwiLFcuaW5wdXRtYXNrLl9fdmFsdWVTZXQpKSxXLmlucHV0bWFzaz12b2lkIDB9cmV0dXJuIFc7Y2FzZVwiZ2V0bWV0YWRhdGFcIjppZihhLmlzQXJyYXkoZC5tZXRhZGF0YSkpe3ZhciBnYT1rKCEwLDAsITEpLmpvaW4oXCJcIik7cmV0dXJuIGEuZWFjaChkLm1ldGFkYXRhLGZ1bmN0aW9uKGEsYil7aWYoYi5tYXNrPT09Z2EpcmV0dXJuIGdhPWIsITF9KSxnYX1yZXR1cm4gZC5tZXRhZGF0YX19dmFyIGY9bmF2aWdhdG9yLnVzZXJBZ2VudCxnPS9tb2JpbGUvaS50ZXN0KGYpLGg9L2llbW9iaWxlL2kudGVzdChmKSxpPS9pcGhvbmUvaS50ZXN0KGYpJiYhaCxqPS9hbmRyb2lkL2kudGVzdChmKSYmIWg7cmV0dXJuIGIucHJvdG90eXBlPXtkZWZhdWx0czp7cGxhY2Vob2xkZXI6XCJfXCIsb3B0aW9uYWxtYXJrZXI6e3N0YXJ0OlwiW1wiLGVuZDpcIl1cIn0scXVhbnRpZmllcm1hcmtlcjp7c3RhcnQ6XCJ7XCIsZW5kOlwifVwifSxncm91cG1hcmtlcjp7c3RhcnQ6XCIoXCIsZW5kOlwiKVwifSxhbHRlcm5hdG9ybWFya2VyOlwifFwiLGVzY2FwZUNoYXI6XCJcXFxcXCIsbWFzazpudWxsLG9uY29tcGxldGU6YS5ub29wLG9uaW5jb21wbGV0ZTphLm5vb3Asb25jbGVhcmVkOmEubm9vcCxyZXBlYXQ6MCxncmVlZHk6ITAsYXV0b1VubWFzazohMSxyZW1vdmVNYXNrT25TdWJtaXQ6ITEsY2xlYXJNYXNrT25Mb3N0Rm9jdXM6ITAsaW5zZXJ0TW9kZTohMCxjbGVhckluY29tcGxldGU6ITEsYWxpYXNlczp7fSxhbGlhczpudWxsLG9uS2V5RG93bjphLm5vb3Asb25CZWZvcmVNYXNrOm51bGwsb25CZWZvcmVQYXN0ZTpmdW5jdGlvbihiLGMpe3JldHVybiBhLmlzRnVuY3Rpb24oYy5vbkJlZm9yZU1hc2spP2Mub25CZWZvcmVNYXNrKGIsYyk6Yn0sb25CZWZvcmVXcml0ZTpudWxsLG9uVW5NYXNrOm51bGwsc2hvd01hc2tPbkZvY3VzOiEwLHNob3dNYXNrT25Ib3ZlcjohMCxvbktleVZhbGlkYXRpb246YS5ub29wLHNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXI6XCIgXCIsc2hvd1Rvb2x0aXA6ITEsdG9vbHRpcDp2b2lkIDAsbnVtZXJpY0lucHV0OiExLHJpZ2h0QWxpZ246ITEsdW5kb09uRXNjYXBlOiEwLHJhZGl4UG9pbnQ6XCJcIixyYWRpeFBvaW50RGVmaW5pdGlvblN5bWJvbDp2b2lkIDAsZ3JvdXBTZXBhcmF0b3I6XCJcIixrZWVwU3RhdGljOm51bGwscG9zaXRpb25DYXJldE9uVGFiOiEwLHRhYlRocm91Z2g6ITEsc3VwcG9ydHNJbnB1dFR5cGU6W1widGV4dFwiLFwidGVsXCIsXCJwYXNzd29yZFwiXSxkZWZpbml0aW9uczp7OTp7dmFsaWRhdG9yOlwiWzAtOV1cIixjYXJkaW5hbGl0eToxLGRlZmluaXRpb25TeW1ib2w6XCIqXCJ9LGE6e3ZhbGlkYXRvcjpcIltBLVphLXpcXHUwNDEwLVxcdTA0NGZcXHUwNDAxXFx1MDQ1MVxceGMwLVxceGZmXFx4YjVdXCIsY2FyZGluYWxpdHk6MSxkZWZpbml0aW9uU3ltYm9sOlwiKlwifSxcIipcIjp7dmFsaWRhdG9yOlwiWzAtOUEtWmEtelxcdTA0MTAtXFx1MDQ0ZlxcdTA0MDFcXHUwNDUxXFx4YzAtXFx4ZmZcXHhiNV1cIixjYXJkaW5hbGl0eToxfX0saWdub3JhYmxlczpbOCw5LDEzLDE5LDI3LDMzLDM0LDM1LDM2LDM3LDM4LDM5LDQwLDQ1LDQ2LDkzLDExMiwxMTMsMTE0LDExNSwxMTYsMTE3LDExOCwxMTksMTIwLDEyMSwxMjIsMTIzXSxpc0NvbXBsZXRlOm51bGwsY2FuQ2xlYXJQb3NpdGlvbjphLm5vb3AscG9zdFZhbGlkYXRpb246bnVsbCxzdGF0aWNEZWZpbml0aW9uU3ltYm9sOnZvaWQgMCxqaXRNYXNraW5nOiExLG51bGxhYmxlOiEwLGlucHV0RXZlbnRPbmx5OiExLG5vVmFsdWVQYXRjaGluZzohMSxwb3NpdGlvbkNhcmV0T25DbGljazpcImx2cFwiLGNhc2luZzpudWxsLGlucHV0bW9kZTpcInZlcmJhdGltXCIsY29sb3JNYXNrOiExLGFuZHJvaWRIYWNrOiExfSxtYXNrc0NhY2hlOnt9LG1hc2s6ZnVuY3Rpb24oZil7ZnVuY3Rpb24gZyhiLGQsZSxmKXtmdW5jdGlvbiBnKGEsYyl7Yz12b2lkIDAhPT1jP2M6Yi5nZXRBdHRyaWJ1dGUoZitcIi1cIithKSxudWxsIT09YyYmKFwic3RyaW5nXCI9PXR5cGVvZiBjJiYoMD09PWEuaW5kZXhPZihcIm9uXCIpP2M9d2luZG93W2NdOlwiZmFsc2VcIj09PWM/Yz0hMTpcInRydWVcIj09PWMmJihjPSEwKSksZVthXT1jKX12YXIgaCxpLGosayxsPWIuZ2V0QXR0cmlidXRlKGYpO2lmKGwmJlwiXCIhPT1sJiYobD1sLnJlcGxhY2UobmV3IFJlZ0V4cChcIidcIixcImdcIiksJ1wiJyksaT1KU09OLnBhcnNlKFwie1wiK2wrXCJ9XCIpKSxpKXtqPXZvaWQgMDtmb3IoayBpbiBpKWlmKFwiYWxpYXNcIj09PWsudG9Mb3dlckNhc2UoKSl7aj1pW2tdO2JyZWFrfX1nKFwiYWxpYXNcIixqKSxlLmFsaWFzJiZjKGUuYWxpYXMsZSxkKTtmb3IoaCBpbiBkKXtpZihpKXtqPXZvaWQgMDtmb3IoayBpbiBpKWlmKGsudG9Mb3dlckNhc2UoKT09PWgudG9Mb3dlckNhc2UoKSl7aj1pW2tdO2JyZWFrfX1nKGgsail9cmV0dXJuIGEuZXh0ZW5kKCEwLGQsZSksZH12YXIgaD10aGlzO3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiBmJiYoZj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChmKXx8ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChmKSksZj1mLm5vZGVOYW1lP1tmXTpmLGEuZWFjaChmLGZ1bmN0aW9uKGMsZil7dmFyIGk9YS5leHRlbmQoITAse30saC5vcHRzKTtnKGYsaSxhLmV4dGVuZCghMCx7fSxoLnVzZXJPcHRpb25zKSxoLmRhdGFBdHRyaWJ1dGUpO3ZhciBqPWQoaSxoLm5vTWFza3NDYWNoZSk7dm9pZCAwIT09aiYmKHZvaWQgMCE9PWYuaW5wdXRtYXNrJiZmLmlucHV0bWFzay5yZW1vdmUoKSxmLmlucHV0bWFzaz1uZXcgYixmLmlucHV0bWFzay5vcHRzPWksZi5pbnB1dG1hc2subm9NYXNrc0NhY2hlPWgubm9NYXNrc0NhY2hlLGYuaW5wdXRtYXNrLnVzZXJPcHRpb25zPWEuZXh0ZW5kKCEwLHt9LGgudXNlck9wdGlvbnMpLGYuaW5wdXRtYXNrLmVsPWYsZi5pbnB1dG1hc2subWFza3NldD1qLGEuZGF0YShmLFwiX2lucHV0bWFza19vcHRzXCIsaSksZS5jYWxsKGYuaW5wdXRtYXNrLHthY3Rpb246XCJtYXNrXCJ9KSl9KSxmJiZmWzBdP2ZbMF0uaW5wdXRtYXNrfHx0aGlzOnRoaXN9LG9wdGlvbjpmdW5jdGlvbihiLGMpe3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiBiP3RoaXMub3B0c1tiXTpcIm9iamVjdFwiPT10eXBlb2YgYj8oYS5leHRlbmQodGhpcy51c2VyT3B0aW9ucyxiKSx0aGlzLmVsJiZjIT09ITAmJnRoaXMubWFzayh0aGlzLmVsKSx0aGlzKTp2b2lkIDB9LHVubWFza2VkdmFsdWU6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMubWFza3NldD10aGlzLm1hc2tzZXR8fGQodGhpcy5vcHRzLHRoaXMubm9NYXNrc0NhY2hlKSxlLmNhbGwodGhpcyx7YWN0aW9uOlwidW5tYXNrZWR2YWx1ZVwiLHZhbHVlOmF9KX0scmVtb3ZlOmZ1bmN0aW9uKCl7cmV0dXJuIGUuY2FsbCh0aGlzLHthY3Rpb246XCJyZW1vdmVcIn0pfSxnZXRlbXB0eW1hc2s6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5tYXNrc2V0PXRoaXMubWFza3NldHx8ZCh0aGlzLm9wdHMsdGhpcy5ub01hc2tzQ2FjaGUpLGUuY2FsbCh0aGlzLHthY3Rpb246XCJnZXRlbXB0eW1hc2tcIn0pfSxoYXNNYXNrZWRWYWx1ZTpmdW5jdGlvbigpe3JldHVybiF0aGlzLm9wdHMuYXV0b1VubWFza30saXNDb21wbGV0ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLm1hc2tzZXQ9dGhpcy5tYXNrc2V0fHxkKHRoaXMub3B0cyx0aGlzLm5vTWFza3NDYWNoZSksZS5jYWxsKHRoaXMse2FjdGlvbjpcImlzQ29tcGxldGVcIn0pfSxnZXRtZXRhZGF0YTpmdW5jdGlvbigpe3JldHVybiB0aGlzLm1hc2tzZXQ9dGhpcy5tYXNrc2V0fHxkKHRoaXMub3B0cyx0aGlzLm5vTWFza3NDYWNoZSksZS5jYWxsKHRoaXMse2FjdGlvbjpcImdldG1ldGFkYXRhXCJ9KX0saXNWYWxpZDpmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5tYXNrc2V0PXRoaXMubWFza3NldHx8ZCh0aGlzLm9wdHMsdGhpcy5ub01hc2tzQ2FjaGUpLGUuY2FsbCh0aGlzLHthY3Rpb246XCJpc1ZhbGlkXCIsdmFsdWU6YX0pfSxmb3JtYXQ6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gdGhpcy5tYXNrc2V0PXRoaXMubWFza3NldHx8ZCh0aGlzLm9wdHMsdGhpcy5ub01hc2tzQ2FjaGUpLGUuY2FsbCh0aGlzLHthY3Rpb246XCJmb3JtYXRcIix2YWx1ZTphLG1ldGFkYXRhOmJ9KX0sYW5hbHlzZU1hc2s6ZnVuY3Rpb24oYixjKXtmdW5jdGlvbiBkKGEsYixjLGQpe3RoaXMubWF0Y2hlcz1bXSx0aGlzLmlzR3JvdXA9YXx8ITEsdGhpcy5pc09wdGlvbmFsPWJ8fCExLHRoaXMuaXNRdWFudGlmaWVyPWN8fCExLHRoaXMuaXNBbHRlcm5hdG9yPWR8fCExLHRoaXMucXVhbnRpZmllcj17bWluOjEsbWF4OjF9fWZ1bmN0aW9uIGUoYixkLGUpe3ZhciBmPWMuZGVmaW5pdGlvbnNbZF07ZT12b2lkIDAhPT1lP2U6Yi5tYXRjaGVzLmxlbmd0aDt2YXIgZz1iLm1hdGNoZXNbZS0xXTtpZihmJiYhcil7Zi5wbGFjZWhvbGRlcj1hLmlzRnVuY3Rpb24oZi5wbGFjZWhvbGRlcik/Zi5wbGFjZWhvbGRlcihjKTpmLnBsYWNlaG9sZGVyO2Zvcih2YXIgaD1mLnByZXZhbGlkYXRvcixpPWg/aC5sZW5ndGg6MCxqPTE7ajxmLmNhcmRpbmFsaXR5O2orKyl7dmFyIGs9aT49aj9oW2otMV06W10sbD1rLnZhbGlkYXRvcixtPWsuY2FyZGluYWxpdHk7Yi5tYXRjaGVzLnNwbGljZShlKyssMCx7Zm46bD9cInN0cmluZ1wiPT10eXBlb2YgbD9uZXcgUmVnRXhwKGwpOm5ldyBmdW5jdGlvbigpe3RoaXMudGVzdD1sfTpuZXcgUmVnRXhwKFwiLlwiKSxjYXJkaW5hbGl0eTptP206MSxvcHRpb25hbGl0eTpiLmlzT3B0aW9uYWwsbmV3QmxvY2tNYXJrZXI6dm9pZCAwPT09Z3x8Zy5kZWYhPT0oZi5kZWZpbml0aW9uU3ltYm9sfHxkKSxjYXNpbmc6Zi5jYXNpbmcsZGVmOmYuZGVmaW5pdGlvblN5bWJvbHx8ZCxwbGFjZWhvbGRlcjpmLnBsYWNlaG9sZGVyLG5hdGl2ZURlZjpkfSksZz1iLm1hdGNoZXNbZS0xXX1iLm1hdGNoZXMuc3BsaWNlKGUrKywwLHtmbjpmLnZhbGlkYXRvcj9cInN0cmluZ1wiPT10eXBlb2YgZi52YWxpZGF0b3I/bmV3IFJlZ0V4cChmLnZhbGlkYXRvcik6bmV3IGZ1bmN0aW9uKCl7dGhpcy50ZXN0PWYudmFsaWRhdG9yfTpuZXcgUmVnRXhwKFwiLlwiKSxjYXJkaW5hbGl0eTpmLmNhcmRpbmFsaXR5LG9wdGlvbmFsaXR5OmIuaXNPcHRpb25hbCxuZXdCbG9ja01hcmtlcjp2b2lkIDA9PT1nfHxnLmRlZiE9PShmLmRlZmluaXRpb25TeW1ib2x8fGQpLGNhc2luZzpmLmNhc2luZyxkZWY6Zi5kZWZpbml0aW9uU3ltYm9sfHxkLHBsYWNlaG9sZGVyOmYucGxhY2Vob2xkZXIsbmF0aXZlRGVmOmR9KX1lbHNlIGIubWF0Y2hlcy5zcGxpY2UoZSsrLDAse2ZuOm51bGwsY2FyZGluYWxpdHk6MCxvcHRpb25hbGl0eTpiLmlzT3B0aW9uYWwsbmV3QmxvY2tNYXJrZXI6dm9pZCAwPT09Z3x8Zy5kZWYhPT1kLGNhc2luZzpudWxsLGRlZjpjLnN0YXRpY0RlZmluaXRpb25TeW1ib2x8fGQscGxhY2Vob2xkZXI6dm9pZCAwIT09Yy5zdGF0aWNEZWZpbml0aW9uU3ltYm9sP2Q6dm9pZCAwLG5hdGl2ZURlZjpkfSkscj0hMX1mdW5jdGlvbiBmKGEsYil7YSYmYS5pc0dyb3VwJiYoYS5pc0dyb3VwPSExLGUoYSxjLmdyb3VwbWFya2VyLnN0YXJ0LDApLGIhPT0hMCYmZShhLGMuZ3JvdXBtYXJrZXIuZW5kKSl9ZnVuY3Rpb24gZyhhLGIsYyxkKXtiLm1hdGNoZXMubGVuZ3RoPjAmJih2b2lkIDA9PT1kfHxkKSYmKGM9Yi5tYXRjaGVzW2IubWF0Y2hlcy5sZW5ndGgtMV0sZihjKSksZShiLGEpfWZ1bmN0aW9uIGgoKXtpZih0Lmxlbmd0aD4wKXtpZihtPXRbdC5sZW5ndGgtMV0sZyhrLG0sbywhbS5pc0FsdGVybmF0b3IpLG0uaXNBbHRlcm5hdG9yKXtuPXQucG9wKCk7Zm9yKHZhciBhPTA7YTxuLm1hdGNoZXMubGVuZ3RoO2ErKyluLm1hdGNoZXNbYV0uaXNHcm91cD0hMTt0Lmxlbmd0aD4wPyhtPXRbdC5sZW5ndGgtMV0sbS5tYXRjaGVzLnB1c2gobikpOnMubWF0Y2hlcy5wdXNoKG4pfX1lbHNlIGcoayxzLG8pfWZ1bmN0aW9uIGkoYSl7ZnVuY3Rpb24gYihhKXtyZXR1cm4gYT09PWMub3B0aW9uYWxtYXJrZXIuc3RhcnQ/YT1jLm9wdGlvbmFsbWFya2VyLmVuZDphPT09Yy5vcHRpb25hbG1hcmtlci5lbmQ/YT1jLm9wdGlvbmFsbWFya2VyLnN0YXJ0OmE9PT1jLmdyb3VwbWFya2VyLnN0YXJ0P2E9Yy5ncm91cG1hcmtlci5lbmQ6YT09PWMuZ3JvdXBtYXJrZXIuZW5kJiYoYT1jLmdyb3VwbWFya2VyLnN0YXJ0KSxhfWEubWF0Y2hlcz1hLm1hdGNoZXMucmV2ZXJzZSgpO2Zvcih2YXIgZCBpbiBhLm1hdGNoZXMpe3ZhciBlPXBhcnNlSW50KGQpO2lmKGEubWF0Y2hlc1tkXS5pc1F1YW50aWZpZXImJmEubWF0Y2hlc1tlKzFdJiZhLm1hdGNoZXNbZSsxXS5pc0dyb3VwKXt2YXIgZj1hLm1hdGNoZXNbZF07YS5tYXRjaGVzLnNwbGljZShkLDEpLGEubWF0Y2hlcy5zcGxpY2UoZSsxLDAsZil9dm9pZCAwIT09YS5tYXRjaGVzW2RdLm1hdGNoZXM/YS5tYXRjaGVzW2RdPWkoYS5tYXRjaGVzW2RdKTphLm1hdGNoZXNbZF09YihhLm1hdGNoZXNbZF0pfXJldHVybiBhfWZvcih2YXIgaixrLGwsbSxuLG8scCxxPS8oPzpbPyorXXxcXHtbMC05XFwrXFwqXSsoPzosWzAtOVxcK1xcKl0qKT9cXH0pfFteLj8qK14ke1tdKCl8XFxcXF0rfC4vZyxyPSExLHM9bmV3IGQsdD1bXSx1PVtdO2o9cS5leGVjKGIpOylpZihrPWpbMF0sciloKCk7ZWxzZSBzd2l0Y2goay5jaGFyQXQoMCkpe2Nhc2UgYy5lc2NhcGVDaGFyOnI9ITA7YnJlYWs7Y2FzZSBjLm9wdGlvbmFsbWFya2VyLmVuZDpjYXNlIGMuZ3JvdXBtYXJrZXIuZW5kOmlmKGw9dC5wb3AoKSx2b2lkIDAhPT1sKWlmKHQubGVuZ3RoPjApe2lmKG09dFt0Lmxlbmd0aC0xXSxtLm1hdGNoZXMucHVzaChsKSxtLmlzQWx0ZXJuYXRvcil7bj10LnBvcCgpO2Zvcih2YXIgdj0wO3Y8bi5tYXRjaGVzLmxlbmd0aDt2Kyspbi5tYXRjaGVzW3ZdLmlzR3JvdXA9ITE7dC5sZW5ndGg+MD8obT10W3QubGVuZ3RoLTFdLG0ubWF0Y2hlcy5wdXNoKG4pKTpzLm1hdGNoZXMucHVzaChuKX19ZWxzZSBzLm1hdGNoZXMucHVzaChsKTtlbHNlIGgoKTticmVhaztjYXNlIGMub3B0aW9uYWxtYXJrZXIuc3RhcnQ6ZihzLm1hdGNoZXNbcy5tYXRjaGVzLmxlbmd0aC0xXSksdC5wdXNoKG5ldyBkKCghMSksKCEwKSkpO2JyZWFrO2Nhc2UgYy5ncm91cG1hcmtlci5zdGFydDpmKHMubWF0Y2hlc1tzLm1hdGNoZXMubGVuZ3RoLTFdKSx0LnB1c2gobmV3IGQoKCEwKSkpO2JyZWFrO2Nhc2UgYy5xdWFudGlmaWVybWFya2VyLnN0YXJ0OnZhciB3PW5ldyBkKCghMSksKCExKSwoITApKTtrPWsucmVwbGFjZSgvW3t9XS9nLFwiXCIpO3ZhciB4PWsuc3BsaXQoXCIsXCIpLHk9aXNOYU4oeFswXSk/eFswXTpwYXJzZUludCh4WzBdKSx6PTE9PT14Lmxlbmd0aD95OmlzTmFOKHhbMV0pP3hbMV06cGFyc2VJbnQoeFsxXSk7aWYoXCIqXCIhPT16JiZcIitcIiE9PXp8fCh5PVwiKlwiPT09ej8wOjEpLHcucXVhbnRpZmllcj17bWluOnksbWF4Onp9LHQubGVuZ3RoPjApe3ZhciBBPXRbdC5sZW5ndGgtMV0ubWF0Y2hlcztqPUEucG9wKCksai5pc0dyb3VwfHwocD1uZXcgZCgoITApKSxwLm1hdGNoZXMucHVzaChqKSxqPXApLEEucHVzaChqKSxBLnB1c2godyl9ZWxzZSBqPXMubWF0Y2hlcy5wb3AoKSxqLmlzR3JvdXB8fChwPW5ldyBkKCghMCkpLHAubWF0Y2hlcy5wdXNoKGopLGo9cCkscy5tYXRjaGVzLnB1c2goaikscy5tYXRjaGVzLnB1c2godyk7YnJlYWs7Y2FzZSBjLmFsdGVybmF0b3JtYXJrZXI6dC5sZW5ndGg+MD8obT10W3QubGVuZ3RoLTFdLG89bS5tYXRjaGVzLnBvcCgpKTpvPXMubWF0Y2hlcy5wb3AoKSxvLmlzQWx0ZXJuYXRvcj90LnB1c2gobyk6KG49bmV3IGQoKCExKSwoITEpLCghMSksKCEwKSksbi5tYXRjaGVzLnB1c2gobyksdC5wdXNoKG4pKTticmVhaztkZWZhdWx0OmgoKX1mb3IoO3QubGVuZ3RoPjA7KWw9dC5wb3AoKSxmKGwsITApLHMubWF0Y2hlcy5wdXNoKGwpO3JldHVybiBzLm1hdGNoZXMubGVuZ3RoPjAmJihvPXMubWF0Y2hlc1tzLm1hdGNoZXMubGVuZ3RoLTFdLGYobyksdS5wdXNoKHMpKSxjLm51bWVyaWNJbnB1dCYmaSh1WzBdKSx1fX0sYi5leHRlbmREZWZhdWx0cz1mdW5jdGlvbihjKXthLmV4dGVuZCghMCxiLnByb3RvdHlwZS5kZWZhdWx0cyxjKX0sYi5leHRlbmREZWZpbml0aW9ucz1mdW5jdGlvbihjKXthLmV4dGVuZCghMCxiLnByb3RvdHlwZS5kZWZhdWx0cy5kZWZpbml0aW9ucyxjKX0sYi5leHRlbmRBbGlhc2VzPWZ1bmN0aW9uKGMpe2EuZXh0ZW5kKCEwLGIucHJvdG90eXBlLmRlZmF1bHRzLmFsaWFzZXMsYyl9LGIuZm9ybWF0PWZ1bmN0aW9uKGEsYyxkKXtyZXR1cm4gYihjKS5mb3JtYXQoYSxkKX0sYi51bm1hc2s9ZnVuY3Rpb24oYSxjKXtyZXR1cm4gYihjKS51bm1hc2tlZHZhbHVlKGEpfSxiLmlzVmFsaWQ9ZnVuY3Rpb24oYSxjKXtyZXR1cm4gYihjKS5pc1ZhbGlkKGEpfSxiLnJlbW92ZT1mdW5jdGlvbihiKXthLmVhY2goYixmdW5jdGlvbihhLGIpe2IuaW5wdXRtYXNrJiZiLmlucHV0bWFzay5yZW1vdmUoKX0pfSxiLmVzY2FwZVJlZ2V4PWZ1bmN0aW9uKGEpe3ZhciBiPVtcIi9cIixcIi5cIixcIipcIixcIitcIixcIj9cIixcInxcIixcIihcIixcIilcIixcIltcIixcIl1cIixcIntcIixcIn1cIixcIlxcXFxcIixcIiRcIixcIl5cIl07cmV0dXJuIGEucmVwbGFjZShuZXcgUmVnRXhwKFwiKFxcXFxcIitiLmpvaW4oXCJ8XFxcXFwiKStcIilcIixcImdpbVwiKSxcIlxcXFwkMVwiKX0sYi5rZXlDb2RlPXtBTFQ6MTgsQkFDS1NQQUNFOjgsQkFDS1NQQUNFX1NBRkFSSToxMjcsQ0FQU19MT0NLOjIwLENPTU1BOjE4OCxDT01NQU5EOjkxLENPTU1BTkRfTEVGVDo5MSxDT01NQU5EX1JJR0hUOjkzLENPTlRST0w6MTcsREVMRVRFOjQ2LERPV046NDAsRU5EOjM1LEVOVEVSOjEzLEVTQ0FQRToyNyxIT01FOjM2LElOU0VSVDo0NSxMRUZUOjM3LE1FTlU6OTMsTlVNUEFEX0FERDoxMDcsTlVNUEFEX0RFQ0lNQUw6MTEwLE5VTVBBRF9ESVZJREU6MTExLE5VTVBBRF9FTlRFUjoxMDgsTlVNUEFEX01VTFRJUExZOjEwNixOVU1QQURfU1VCVFJBQ1Q6MTA5LFBBR0VfRE9XTjozNCxQQUdFX1VQOjMzLFBFUklPRDoxOTAsUklHSFQ6MzksU0hJRlQ6MTYsU1BBQ0U6MzIsVEFCOjksVVA6MzgsV0lORE9XUzo5MSxYOjg4fSx3aW5kb3cuSW5wdXRtYXNrPWIsYn0oalF1ZXJ5KSxmdW5jdGlvbihhLGIpe3JldHVybiB2b2lkIDA9PT1hLmZuLmlucHV0bWFzayYmKGEuZm4uaW5wdXRtYXNrPWZ1bmN0aW9uKGMsZCl7dmFyIGUsZj10aGlzWzBdO2lmKHZvaWQgMD09PWQmJihkPXt9KSxcInN0cmluZ1wiPT10eXBlb2YgYylzd2l0Y2goYyl7Y2FzZVwidW5tYXNrZWR2YWx1ZVwiOnJldHVybiBmJiZmLmlucHV0bWFzaz9mLmlucHV0bWFzay51bm1hc2tlZHZhbHVlKCk6YShmKS52YWwoKTtjYXNlXCJyZW1vdmVcIjpyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dGhpcy5pbnB1dG1hc2smJnRoaXMuaW5wdXRtYXNrLnJlbW92ZSgpfSk7Y2FzZVwiZ2V0ZW1wdHltYXNrXCI6cmV0dXJuIGYmJmYuaW5wdXRtYXNrP2YuaW5wdXRtYXNrLmdldGVtcHR5bWFzaygpOlwiXCI7Y2FzZVwiaGFzTWFza2VkVmFsdWVcIjpyZXR1cm4hKCFmfHwhZi5pbnB1dG1hc2spJiZmLmlucHV0bWFzay5oYXNNYXNrZWRWYWx1ZSgpO2Nhc2VcImlzQ29tcGxldGVcIjpyZXR1cm4hZnx8IWYuaW5wdXRtYXNrfHxmLmlucHV0bWFzay5pc0NvbXBsZXRlKCk7Y2FzZVwiZ2V0bWV0YWRhdGFcIjpyZXR1cm4gZiYmZi5pbnB1dG1hc2s/Zi5pbnB1dG1hc2suZ2V0bWV0YWRhdGEoKTp2b2lkIDA7Y2FzZVwic2V0dmFsdWVcIjphKGYpLnZhbChkKSxmJiZ2b2lkIDA9PT1mLmlucHV0bWFzayYmYShmKS50cmlnZ2VySGFuZGxlcihcInNldHZhbHVlXCIpO2JyZWFrO2Nhc2VcIm9wdGlvblwiOmlmKFwic3RyaW5nXCIhPXR5cGVvZiBkKXJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtpZih2b2lkIDAhPT10aGlzLmlucHV0bWFzaylyZXR1cm4gdGhpcy5pbnB1dG1hc2sub3B0aW9uKGQpfSk7aWYoZiYmdm9pZCAwIT09Zi5pbnB1dG1hc2spcmV0dXJuIGYuaW5wdXRtYXNrLm9wdGlvbihkKTticmVhaztkZWZhdWx0OnJldHVybiBkLmFsaWFzPWMsZT1uZXcgYihkKSx0aGlzLmVhY2goZnVuY3Rpb24oKXtlLm1hc2sodGhpcyl9KX1lbHNle2lmKFwib2JqZWN0XCI9PXR5cGVvZiBjKXJldHVybiBlPW5ldyBiKGMpLHZvaWQgMD09PWMubWFzayYmdm9pZCAwPT09Yy5hbGlhcz90aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm4gdm9pZCAwIT09dGhpcy5pbnB1dG1hc2s/dGhpcy5pbnB1dG1hc2sub3B0aW9uKGMpOnZvaWQgZS5tYXNrKHRoaXMpfSk6dGhpcy5lYWNoKGZ1bmN0aW9uKCl7ZS5tYXNrKHRoaXMpfSk7aWYodm9pZCAwPT09YylyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7ZT1uZXcgYihkKSxlLm1hc2sodGhpcyl9KX19KSxhLmZuLmlucHV0bWFza30oalF1ZXJ5LElucHV0bWFzayksZnVuY3Rpb24oYSxiKXt9KGpRdWVyeSxJbnB1dG1hc2spLGZ1bmN0aW9uKGEsYil7ZnVuY3Rpb24gYyhhKXtyZXR1cm4gaXNOYU4oYSl8fDI5PT09bmV3IERhdGUoYSwyLDApLmdldERhdGUoKX1yZXR1cm4gYi5leHRlbmRBbGlhc2VzKHtcImRkL21tL3l5eXlcIjp7bWFzazpcIjEvMi95XCIscGxhY2Vob2xkZXI6XCJkZC9tbS95eXl5XCIscmVnZXg6e3ZhbDFwcmU6bmV3IFJlZ0V4cChcIlswLTNdXCIpLHZhbDE6bmV3IFJlZ0V4cChcIjBbMS05XXxbMTJdWzAtOV18M1swMV1cIiksdmFsMnByZTpmdW5jdGlvbihhKXt2YXIgYz1iLmVzY2FwZVJlZ2V4LmNhbGwodGhpcyxhKTtyZXR1cm4gbmV3IFJlZ0V4cChcIigoMFsxLTldfFsxMl1bMC05XXwzWzAxXSlcIitjK1wiWzAxXSlcIil9LHZhbDI6ZnVuY3Rpb24oYSl7dmFyIGM9Yi5lc2NhcGVSZWdleC5jYWxsKHRoaXMsYSk7cmV0dXJuIG5ldyBSZWdFeHAoXCIoKDBbMS05XXxbMTJdWzAtOV0pXCIrYytcIigwWzEtOV18MVswMTJdKSl8KDMwXCIrYytcIigwWzEzLTldfDFbMDEyXSkpfCgzMVwiK2MrXCIoMFsxMzU3OF18MVswMl0pKVwiKX19LGxlYXBkYXk6XCIyOS8wMi9cIixzZXBhcmF0b3I6XCIvXCIseWVhcnJhbmdlOnttaW55ZWFyOjE5MDAsbWF4eWVhcjoyMDk5fSxpc0luWWVhclJhbmdlOmZ1bmN0aW9uKGEsYixjKXtpZihpc05hTihhKSlyZXR1cm4hMTt2YXIgZD1wYXJzZUludChhLmNvbmNhdChiLnRvU3RyaW5nKCkuc2xpY2UoYS5sZW5ndGgpKSksZT1wYXJzZUludChhLmNvbmNhdChjLnRvU3RyaW5nKCkuc2xpY2UoYS5sZW5ndGgpKSk7cmV0dXJuIWlzTmFOKGQpJiYoYjw9ZCYmZDw9Yyl8fCFpc05hTihlKSYmKGI8PWUmJmU8PWMpfSxkZXRlcm1pbmViYXNleWVhcjpmdW5jdGlvbihhLGIsYyl7dmFyIGQ9KG5ldyBEYXRlKS5nZXRGdWxsWWVhcigpO2lmKGE+ZClyZXR1cm4gYTtpZihiPGQpe2Zvcih2YXIgZT1iLnRvU3RyaW5nKCkuc2xpY2UoMCwyKSxmPWIudG9TdHJpbmcoKS5zbGljZSgyLDQpO2I8ZStjOyllLS07dmFyIGc9ZStmO3JldHVybiBhPmc/YTpnfWlmKGE8PWQmJmQ8PWIpe2Zvcih2YXIgaD1kLnRvU3RyaW5nKCkuc2xpY2UoMCwyKTtiPGgrYzspaC0tO3ZhciBpPWgrYztyZXR1cm4gaTxhP2E6aX1yZXR1cm4gZH0sb25LZXlEb3duOmZ1bmN0aW9uKGMsZCxlLGYpe3ZhciBnPWEodGhpcyk7aWYoYy5jdHJsS2V5JiZjLmtleUNvZGU9PT1iLmtleUNvZGUuUklHSFQpe3ZhciBoPW5ldyBEYXRlO2cudmFsKGguZ2V0RGF0ZSgpLnRvU3RyaW5nKCkrKGguZ2V0TW9udGgoKSsxKS50b1N0cmluZygpK2guZ2V0RnVsbFllYXIoKS50b1N0cmluZygpKSxnLnRyaWdnZXIoXCJzZXR2YWx1ZVwiKX19LGdldEZyb250VmFsdWU6ZnVuY3Rpb24oYSxiLGMpe2Zvcih2YXIgZD0wLGU9MCxmPTA7ZjxhLmxlbmd0aCYmXCIyXCIhPT1hLmNoYXJBdChmKTtmKyspe3ZhciBnPWMuZGVmaW5pdGlvbnNbYS5jaGFyQXQoZildO2c/KGQrPWUsZT1nLmNhcmRpbmFsaXR5KTplKyt9cmV0dXJuIGIuam9pbihcIlwiKS5zdWJzdHIoZCxlKX0scG9zdFZhbGlkYXRpb246ZnVuY3Rpb24oYSxiLGQpe3ZhciBlLGYsZz1hLmpvaW4oXCJcIik7cmV0dXJuIDA9PT1kLm1hc2suaW5kZXhPZihcInlcIik/KGY9Zy5zdWJzdHIoMCw0KSxlPWcuc3Vic3RyKDQsMTEpKTooZj1nLnN1YnN0cig2LDExKSxlPWcuc3Vic3RyKDAsNikpLGImJihlIT09ZC5sZWFwZGF5fHxjKGYpKX0sZGVmaW5pdGlvbnM6ezE6e3ZhbGlkYXRvcjpmdW5jdGlvbihhLGIsYyxkLGUpe3ZhciBmPWUucmVnZXgudmFsMS50ZXN0KGEpO3JldHVybiBkfHxmfHxhLmNoYXJBdCgxKSE9PWUuc2VwYXJhdG9yJiZcIi0uL1wiLmluZGV4T2YoYS5jaGFyQXQoMSkpPT09LTF8fCEoZj1lLnJlZ2V4LnZhbDEudGVzdChcIjBcIithLmNoYXJBdCgwKSkpP2Y6KGIuYnVmZmVyW2MtMV09XCIwXCIse3JlZnJlc2hGcm9tQnVmZmVyOntzdGFydDpjLTEsZW5kOmN9LHBvczpjLGM6YS5jaGFyQXQoMCl9KX0sY2FyZGluYWxpdHk6MixwcmV2YWxpZGF0b3I6W3t2YWxpZGF0b3I6ZnVuY3Rpb24oYSxiLGMsZCxlKXt2YXIgZj1hO2lzTmFOKGIuYnVmZmVyW2MrMV0pfHwoZis9Yi5idWZmZXJbYysxXSk7dmFyIGc9MT09PWYubGVuZ3RoP2UucmVnZXgudmFsMXByZS50ZXN0KGYpOmUucmVnZXgudmFsMS50ZXN0KGYpO2lmKCFkJiYhZyl7aWYoZz1lLnJlZ2V4LnZhbDEudGVzdChhK1wiMFwiKSlyZXR1cm4gYi5idWZmZXJbY109YSxiLmJ1ZmZlclsrK2NdPVwiMFwiLHtwb3M6YyxjOlwiMFwifTtpZihnPWUucmVnZXgudmFsMS50ZXN0KFwiMFwiK2EpKXJldHVybiBiLmJ1ZmZlcltjXT1cIjBcIixjKysse3BvczpjfX1yZXR1cm4gZ30sY2FyZGluYWxpdHk6MX1dfSwyOnt2YWxpZGF0b3I6ZnVuY3Rpb24oYSxiLGMsZCxlKXt2YXIgZj1lLmdldEZyb250VmFsdWUoYi5tYXNrLGIuYnVmZmVyLGUpO2YuaW5kZXhPZihlLnBsYWNlaG9sZGVyWzBdKSE9PS0xJiYoZj1cIjAxXCIrZS5zZXBhcmF0b3IpO3ZhciBnPWUucmVnZXgudmFsMihlLnNlcGFyYXRvcikudGVzdChmK2EpO3JldHVybiBkfHxnfHxhLmNoYXJBdCgxKSE9PWUuc2VwYXJhdG9yJiZcIi0uL1wiLmluZGV4T2YoYS5jaGFyQXQoMSkpPT09LTF8fCEoZz1lLnJlZ2V4LnZhbDIoZS5zZXBhcmF0b3IpLnRlc3QoZitcIjBcIithLmNoYXJBdCgwKSkpP2c6KGIuYnVmZmVyW2MtMV09XCIwXCIse3JlZnJlc2hGcm9tQnVmZmVyOntzdGFydDpjLTEsZW5kOmN9LHBvczpjLGM6YS5jaGFyQXQoMCl9KX0sY2FyZGluYWxpdHk6MixwcmV2YWxpZGF0b3I6W3t2YWxpZGF0b3I6ZnVuY3Rpb24oYSxiLGMsZCxlKXtpc05hTihiLmJ1ZmZlcltjKzFdKXx8KGErPWIuYnVmZmVyW2MrMV0pO3ZhciBmPWUuZ2V0RnJvbnRWYWx1ZShiLm1hc2ssYi5idWZmZXIsZSk7Zi5pbmRleE9mKGUucGxhY2Vob2xkZXJbMF0pIT09LTEmJihmPVwiMDFcIitlLnNlcGFyYXRvcik7dmFyIGc9MT09PWEubGVuZ3RoP2UucmVnZXgudmFsMnByZShlLnNlcGFyYXRvcikudGVzdChmK2EpOmUucmVnZXgudmFsMihlLnNlcGFyYXRvcikudGVzdChmK2EpO3JldHVybiBkfHxnfHwhKGc9ZS5yZWdleC52YWwyKGUuc2VwYXJhdG9yKS50ZXN0KGYrXCIwXCIrYSkpP2c6KGIuYnVmZmVyW2NdPVwiMFwiLGMrKyx7cG9zOmN9KX0sY2FyZGluYWxpdHk6MX1dfSx5Ont2YWxpZGF0b3I6ZnVuY3Rpb24oYSxiLGMsZCxlKXtyZXR1cm4gZS5pc0luWWVhclJhbmdlKGEsZS55ZWFycmFuZ2UubWlueWVhcixlLnllYXJyYW5nZS5tYXh5ZWFyKX0sY2FyZGluYWxpdHk6NCxwcmV2YWxpZGF0b3I6W3t2YWxpZGF0b3I6ZnVuY3Rpb24oYSxiLGMsZCxlKXt2YXIgZj1lLmlzSW5ZZWFyUmFuZ2UoYSxlLnllYXJyYW5nZS5taW55ZWFyLGUueWVhcnJhbmdlLm1heHllYXIpO2lmKCFkJiYhZil7dmFyIGc9ZS5kZXRlcm1pbmViYXNleWVhcihlLnllYXJyYW5nZS5taW55ZWFyLGUueWVhcnJhbmdlLm1heHllYXIsYStcIjBcIikudG9TdHJpbmcoKS5zbGljZSgwLDEpO2lmKGY9ZS5pc0luWWVhclJhbmdlKGcrYSxlLnllYXJyYW5nZS5taW55ZWFyLGUueWVhcnJhbmdlLm1heHllYXIpKXJldHVybiBiLmJ1ZmZlcltjKytdPWcuY2hhckF0KDApLHtwb3M6Y307aWYoZz1lLmRldGVybWluZWJhc2V5ZWFyKGUueWVhcnJhbmdlLm1pbnllYXIsZS55ZWFycmFuZ2UubWF4eWVhcixhK1wiMFwiKS50b1N0cmluZygpLnNsaWNlKDAsMiksZj1lLmlzSW5ZZWFyUmFuZ2UoZythLGUueWVhcnJhbmdlLm1pbnllYXIsZS55ZWFycmFuZ2UubWF4eWVhcikpcmV0dXJuIGIuYnVmZmVyW2MrK109Zy5jaGFyQXQoMCksYi5idWZmZXJbYysrXT1nLmNoYXJBdCgxKSx7cG9zOmN9fXJldHVybiBmfSxjYXJkaW5hbGl0eToxfSx7dmFsaWRhdG9yOmZ1bmN0aW9uKGEsYixjLGQsZSl7dmFyIGY9ZS5pc0luWWVhclJhbmdlKGEsZS55ZWFycmFuZ2UubWlueWVhcixlLnllYXJyYW5nZS5tYXh5ZWFyKTtpZighZCYmIWYpe3ZhciBnPWUuZGV0ZXJtaW5lYmFzZXllYXIoZS55ZWFycmFuZ2UubWlueWVhcixlLnllYXJyYW5nZS5tYXh5ZWFyLGEpLnRvU3RyaW5nKCkuc2xpY2UoMCwyKTtpZihmPWUuaXNJblllYXJSYW5nZShhWzBdK2dbMV0rYVsxXSxlLnllYXJyYW5nZS5taW55ZWFyLGUueWVhcnJhbmdlLm1heHllYXIpKXJldHVybiBiLmJ1ZmZlcltjKytdPWcuY2hhckF0KDEpLHtwb3M6Y307aWYoZz1lLmRldGVybWluZWJhc2V5ZWFyKGUueWVhcnJhbmdlLm1pbnllYXIsZS55ZWFycmFuZ2UubWF4eWVhcixhKS50b1N0cmluZygpLnNsaWNlKDAsMiksZj1lLmlzSW5ZZWFyUmFuZ2UoZythLGUueWVhcnJhbmdlLm1pbnllYXIsZS55ZWFycmFuZ2UubWF4eWVhcikpcmV0dXJuIGIuYnVmZmVyW2MtMV09Zy5jaGFyQXQoMCksYi5idWZmZXJbYysrXT1nLmNoYXJBdCgxKSxiLmJ1ZmZlcltjKytdPWEuY2hhckF0KDApLHtyZWZyZXNoRnJvbUJ1ZmZlcjp7c3RhcnQ6Yy0zLGVuZDpjfSxwb3M6Y319cmV0dXJuIGZ9LGNhcmRpbmFsaXR5OjJ9LHt2YWxpZGF0b3I6ZnVuY3Rpb24oYSxiLGMsZCxlKXtyZXR1cm4gZS5pc0luWWVhclJhbmdlKGEsZS55ZWFycmFuZ2UubWlueWVhcixlLnllYXJyYW5nZS5tYXh5ZWFyKX0sY2FyZGluYWxpdHk6M31dfX0saW5zZXJ0TW9kZTohMSxhdXRvVW5tYXNrOiExfSxcIm1tL2RkL3l5eXlcIjp7cGxhY2Vob2xkZXI6XCJtbS9kZC95eXl5XCIsYWxpYXM6XCJkZC9tbS95eXl5XCIscmVnZXg6e3ZhbDJwcmU6ZnVuY3Rpb24oYSl7dmFyIGM9Yi5lc2NhcGVSZWdleC5jYWxsKHRoaXMsYSk7cmV0dXJuIG5ldyBSZWdFeHAoXCIoKDBbMTMtOV18MVswMTJdKVwiK2MrXCJbMC0zXSl8KDAyXCIrYytcIlswLTJdKVwiKX0sdmFsMjpmdW5jdGlvbihhKXt2YXIgYz1iLmVzY2FwZVJlZ2V4LmNhbGwodGhpcyxhKTtyZXR1cm4gbmV3IFJlZ0V4cChcIigoMFsxLTldfDFbMDEyXSlcIitjK1wiKDBbMS05XXxbMTJdWzAtOV0pKXwoKDBbMTMtOV18MVswMTJdKVwiK2MrXCIzMCl8KCgwWzEzNTc4XXwxWzAyXSlcIitjK1wiMzEpXCIpfSx2YWwxcHJlOm5ldyBSZWdFeHAoXCJbMDFdXCIpLHZhbDE6bmV3IFJlZ0V4cChcIjBbMS05XXwxWzAxMl1cIil9LGxlYXBkYXk6XCIwMi8yOS9cIixvbktleURvd246ZnVuY3Rpb24oYyxkLGUsZil7dmFyIGc9YSh0aGlzKTtpZihjLmN0cmxLZXkmJmMua2V5Q29kZT09PWIua2V5Q29kZS5SSUdIVCl7dmFyIGg9bmV3IERhdGU7Zy52YWwoKGguZ2V0TW9udGgoKSsxKS50b1N0cmluZygpK2guZ2V0RGF0ZSgpLnRvU3RyaW5nKCkraC5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCkpLGcudHJpZ2dlcihcInNldHZhbHVlXCIpfX19LFwieXl5eS9tbS9kZFwiOnttYXNrOlwieS8xLzJcIixwbGFjZWhvbGRlcjpcInl5eXkvbW0vZGRcIixhbGlhczpcIm1tL2RkL3l5eXlcIixsZWFwZGF5OlwiLzAyLzI5XCIsb25LZXlEb3duOmZ1bmN0aW9uKGMsZCxlLGYpe3ZhciBnPWEodGhpcyk7aWYoYy5jdHJsS2V5JiZjLmtleUNvZGU9PT1iLmtleUNvZGUuUklHSFQpe3ZhciBoPW5ldyBEYXRlO2cudmFsKGguZ2V0RnVsbFllYXIoKS50b1N0cmluZygpKyhoLmdldE1vbnRoKCkrMSkudG9TdHJpbmcoKStoLmdldERhdGUoKS50b1N0cmluZygpKSxnLnRyaWdnZXIoXCJzZXR2YWx1ZVwiKX19fSxcImRkLm1tLnl5eXlcIjp7bWFzazpcIjEuMi55XCIscGxhY2Vob2xkZXI6XCJkZC5tbS55eXl5XCIsbGVhcGRheTpcIjI5LjAyLlwiLHNlcGFyYXRvcjpcIi5cIixhbGlhczpcImRkL21tL3l5eXlcIn0sXCJkZC1tbS15eXl5XCI6e21hc2s6XCIxLTIteVwiLHBsYWNlaG9sZGVyOlwiZGQtbW0teXl5eVwiLGxlYXBkYXk6XCIyOS0wMi1cIixzZXBhcmF0b3I6XCItXCIsYWxpYXM6XCJkZC9tbS95eXl5XCJ9LFwibW0uZGQueXl5eVwiOnttYXNrOlwiMS4yLnlcIixwbGFjZWhvbGRlcjpcIm1tLmRkLnl5eXlcIixsZWFwZGF5OlwiMDIuMjkuXCIsc2VwYXJhdG9yOlwiLlwiLGFsaWFzOlwibW0vZGQveXl5eVwifSxcIm1tLWRkLXl5eXlcIjp7bWFzazpcIjEtMi15XCIscGxhY2Vob2xkZXI6XCJtbS1kZC15eXl5XCIsbGVhcGRheTpcIjAyLTI5LVwiLHNlcGFyYXRvcjpcIi1cIixhbGlhczpcIm1tL2RkL3l5eXlcIn0sXCJ5eXl5Lm1tLmRkXCI6e21hc2s6XCJ5LjEuMlwiLHBsYWNlaG9sZGVyOlwieXl5eS5tbS5kZFwiLGxlYXBkYXk6XCIuMDIuMjlcIixzZXBhcmF0b3I6XCIuXCIsYWxpYXM6XCJ5eXl5L21tL2RkXCJ9LFwieXl5eS1tbS1kZFwiOnttYXNrOlwieS0xLTJcIixwbGFjZWhvbGRlcjpcInl5eXktbW0tZGRcIixsZWFwZGF5OlwiLTAyLTI5XCIsc2VwYXJhdG9yOlwiLVwiLGFsaWFzOlwieXl5eS9tbS9kZFwifSxkYXRldGltZTp7bWFzazpcIjEvMi95IGg6c1wiLHBsYWNlaG9sZGVyOlwiZGQvbW0veXl5eSBoaDptbVwiLGFsaWFzOlwiZGQvbW0veXl5eVwiLHJlZ2V4OntocnNwcmU6bmV3IFJlZ0V4cChcIlswMTJdXCIpLGhyczI0Om5ldyBSZWdFeHAoXCIyWzAtNF18MVszLTldXCIpLGhyczpuZXcgUmVnRXhwKFwiWzAxXVswLTldfDJbMC00XVwiKSxhbXBtOm5ldyBSZWdFeHAoXCJeW2F8cHxBfFBdW218TV1cIiksbXNwcmU6bmV3IFJlZ0V4cChcIlswLTVdXCIpLG1zOm5ldyBSZWdFeHAoXCJbMC01XVswLTldXCIpfSx0aW1lc2VwYXJhdG9yOlwiOlwiLGhvdXJGb3JtYXQ6XCIyNFwiLGRlZmluaXRpb25zOntoOnt2YWxpZGF0b3I6ZnVuY3Rpb24oYSxiLGMsZCxlKXtpZihcIjI0XCI9PT1lLmhvdXJGb3JtYXQmJjI0PT09cGFyc2VJbnQoYSwxMCkpcmV0dXJuIGIuYnVmZmVyW2MtMV09XCIwXCIsYi5idWZmZXJbY109XCIwXCIse3JlZnJlc2hGcm9tQnVmZmVyOntzdGFydDpjLTEsZW5kOmN9LGM6XCIwXCJ9O3ZhciBmPWUucmVnZXguaHJzLnRlc3QoYSk7aWYoIWQmJiFmJiYoYS5jaGFyQXQoMSk9PT1lLnRpbWVzZXBhcmF0b3J8fFwiLS46XCIuaW5kZXhPZihhLmNoYXJBdCgxKSkhPT0tMSkmJihmPWUucmVnZXguaHJzLnRlc3QoXCIwXCIrYS5jaGFyQXQoMCkpKSlyZXR1cm4gYi5idWZmZXJbYy0xXT1cIjBcIixiLmJ1ZmZlcltjXT1hLmNoYXJBdCgwKSxjKysse3JlZnJlc2hGcm9tQnVmZmVyOntzdGFydDpjLTIsZW5kOmN9LHBvczpjLGM6ZS50aW1lc2VwYXJhdG9yfTtpZihmJiZcIjI0XCIhPT1lLmhvdXJGb3JtYXQmJmUucmVnZXguaHJzMjQudGVzdChhKSl7dmFyIGc9cGFyc2VJbnQoYSwxMCk7cmV0dXJuIDI0PT09Zz8oYi5idWZmZXJbYys1XT1cImFcIixiLmJ1ZmZlcltjKzZdPVwibVwiKTooYi5idWZmZXJbYys1XT1cInBcIixiLmJ1ZmZlcltjKzZdPVwibVwiKSxnLT0xMixnPDEwPyhiLmJ1ZmZlcltjXT1nLnRvU3RyaW5nKCksYi5idWZmZXJbYy0xXT1cIjBcIik6KGIuYnVmZmVyW2NdPWcudG9TdHJpbmcoKS5jaGFyQXQoMSksYi5idWZmZXJbYy0xXT1nLnRvU3RyaW5nKCkuY2hhckF0KDApKSx7cmVmcmVzaEZyb21CdWZmZXI6e3N0YXJ0OmMtMSxlbmQ6Yys2fSxjOmIuYnVmZmVyW2NdfX1yZXR1cm4gZn0sY2FyZGluYWxpdHk6MixwcmV2YWxpZGF0b3I6W3t2YWxpZGF0b3I6ZnVuY3Rpb24oYSxiLGMsZCxlKXt2YXIgZj1lLnJlZ2V4Lmhyc3ByZS50ZXN0KGEpO3JldHVybiBkfHxmfHwhKGY9ZS5yZWdleC5ocnMudGVzdChcIjBcIithKSk/ZjooYi5idWZmZXJbY109XCIwXCIsYysrLHtwb3M6Y30pfSxjYXJkaW5hbGl0eToxfV19LHM6e3ZhbGlkYXRvcjpcIlswLTVdWzAtOV1cIixjYXJkaW5hbGl0eToyLHByZXZhbGlkYXRvcjpbe3ZhbGlkYXRvcjpmdW5jdGlvbihhLGIsYyxkLGUpe3ZhciBmPWUucmVnZXgubXNwcmUudGVzdChhKTtyZXR1cm4gZHx8Znx8IShmPWUucmVnZXgubXMudGVzdChcIjBcIithKSk/ZjooYi5idWZmZXJbY109XCIwXCIsYysrLHtwb3M6Y30pfSxjYXJkaW5hbGl0eToxfV19LHQ6e3ZhbGlkYXRvcjpmdW5jdGlvbihhLGIsYyxkLGUpe3JldHVybiBlLnJlZ2V4LmFtcG0udGVzdChhK1wibVwiKX0sY2FzaW5nOlwibG93ZXJcIixjYXJkaW5hbGl0eToxfX0saW5zZXJ0TW9kZTohMSxhdXRvVW5tYXNrOiExfSxkYXRldGltZTEyOnttYXNrOlwiMS8yL3kgaDpzIHRcXFxcbVwiLHBsYWNlaG9sZGVyOlwiZGQvbW0veXl5eSBoaDptbSB4bVwiLGFsaWFzOlwiZGF0ZXRpbWVcIixob3VyRm9ybWF0OlwiMTJcIn0sXCJtbS9kZC95eXl5IGhoOm1tIHhtXCI6e21hc2s6XCIxLzIveSBoOnMgdFxcXFxtXCIscGxhY2Vob2xkZXI6XCJtbS9kZC95eXl5IGhoOm1tIHhtXCIsYWxpYXM6XCJkYXRldGltZTEyXCIscmVnZXg6e3ZhbDJwcmU6ZnVuY3Rpb24oYSl7dmFyIGM9Yi5lc2NhcGVSZWdleC5jYWxsKHRoaXMsYSk7cmV0dXJuIG5ldyBSZWdFeHAoXCIoKDBbMTMtOV18MVswMTJdKVwiK2MrXCJbMC0zXSl8KDAyXCIrYytcIlswLTJdKVwiKX0sdmFsMjpmdW5jdGlvbihhKXt2YXIgYz1iLmVzY2FwZVJlZ2V4LmNhbGwodGhpcyxhKTtyZXR1cm4gbmV3IFJlZ0V4cChcIigoMFsxLTldfDFbMDEyXSlcIitjK1wiKDBbMS05XXxbMTJdWzAtOV0pKXwoKDBbMTMtOV18MVswMTJdKVwiK2MrXCIzMCl8KCgwWzEzNTc4XXwxWzAyXSlcIitjK1wiMzEpXCIpfSx2YWwxcHJlOm5ldyBSZWdFeHAoXCJbMDFdXCIpLHZhbDE6bmV3IFJlZ0V4cChcIjBbMS05XXwxWzAxMl1cIil9LGxlYXBkYXk6XCIwMi8yOS9cIixvbktleURvd246ZnVuY3Rpb24oYyxkLGUsZil7dmFyIGc9YSh0aGlzKTtpZihjLmN0cmxLZXkmJmMua2V5Q29kZT09PWIua2V5Q29kZS5SSUdIVCl7dmFyIGg9bmV3IERhdGU7Zy52YWwoKGguZ2V0TW9udGgoKSsxKS50b1N0cmluZygpK2guZ2V0RGF0ZSgpLnRvU3RyaW5nKCkraC5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCkpLGcudHJpZ2dlcihcInNldHZhbHVlXCIpfX19LFwiaGg6bW0gdFwiOnttYXNrOlwiaDpzIHRcXFxcbVwiLHBsYWNlaG9sZGVyOlwiaGg6bW0geG1cIixhbGlhczpcImRhdGV0aW1lXCIsaG91ckZvcm1hdDpcIjEyXCJ9LFwiaDpzIHRcIjp7bWFzazpcImg6cyB0XFxcXG1cIixwbGFjZWhvbGRlcjpcImhoOm1tIHhtXCIsYWxpYXM6XCJkYXRldGltZVwiLGhvdXJGb3JtYXQ6XCIxMlwifSxcImhoOm1tOnNzXCI6e21hc2s6XCJoOnM6c1wiLHBsYWNlaG9sZGVyOlwiaGg6bW06c3NcIixhbGlhczpcImRhdGV0aW1lXCIsYXV0b1VubWFzazohMX0sXCJoaDptbVwiOnttYXNrOlwiaDpzXCIscGxhY2Vob2xkZXI6XCJoaDptbVwiLGFsaWFzOlwiZGF0ZXRpbWVcIixhdXRvVW5tYXNrOiExfSxkYXRlOnthbGlhczpcImRkL21tL3l5eXlcIn0sXCJtbS95eXl5XCI6e21hc2s6XCIxL3lcIixwbGFjZWhvbGRlcjpcIm1tL3l5eXlcIixsZWFwZGF5OlwiZG9ub3R1c2VcIixzZXBhcmF0b3I6XCIvXCIsYWxpYXM6XCJtbS9kZC95eXl5XCJ9LHNoYW1zaTp7cmVnZXg6e3ZhbDJwcmU6ZnVuY3Rpb24oYSl7dmFyIGM9Yi5lc2NhcGVSZWdleC5jYWxsKHRoaXMsYSk7cmV0dXJuIG5ldyBSZWdFeHAoXCIoKDBbMS05XXwxWzAxMl0pXCIrYytcIlswLTNdKVwiKX0sdmFsMjpmdW5jdGlvbihhKXt2YXIgYz1iLmVzY2FwZVJlZ2V4LmNhbGwodGhpcyxhKTtyZXR1cm4gbmV3IFJlZ0V4cChcIigoMFsxLTldfDFbMDEyXSlcIitjK1wiKDBbMS05XXxbMTJdWzAtOV0pKXwoKDBbMS05XXwxWzAxMl0pXCIrYytcIjMwKXwoKDBbMS02XSlcIitjK1wiMzEpXCIpfSx2YWwxcHJlOm5ldyBSZWdFeHAoXCJbMDFdXCIpLHZhbDE6bmV3IFJlZ0V4cChcIjBbMS05XXwxWzAxMl1cIil9LHllYXJyYW5nZTp7bWlueWVhcjoxMzAwLG1heHllYXI6MTQ5OX0sbWFzazpcInkvMS8yXCIsbGVhcGRheTpcIi8xMi8zMFwiLHBsYWNlaG9sZGVyOlwieXl5eS9tbS9kZFwiLGFsaWFzOlwibW0vZGQveXl5eVwiLGNsZWFySW5jb21wbGV0ZTohMH19KSxifShqUXVlcnksSW5wdXRtYXNrKSxmdW5jdGlvbihhLGIpe3JldHVybiBiLmV4dGVuZERlZmluaXRpb25zKHtBOnt2YWxpZGF0b3I6XCJbQS1aYS16XFx1MDQxMC1cXHUwNDRmXFx1MDQwMVxcdTA0NTFcXHhjMC1cXHhmZlxceGI1XVwiLGNhcmRpbmFsaXR5OjEsY2FzaW5nOlwidXBwZXJcIn0sXCImXCI6e3ZhbGlkYXRvcjpcIlswLTlBLVphLXpcXHUwNDEwLVxcdTA0NGZcXHUwNDAxXFx1MDQ1MVxceGMwLVxceGZmXFx4YjVdXCIsY2FyZGluYWxpdHk6MSxjYXNpbmc6XCJ1cHBlclwifSxcIiNcIjp7dmFsaWRhdG9yOlwiWzAtOUEtRmEtZl1cIixjYXJkaW5hbGl0eToxLGNhc2luZzpcInVwcGVyXCJ9fSksYi5leHRlbmRBbGlhc2VzKHt1cmw6e2RlZmluaXRpb25zOntpOnt2YWxpZGF0b3I6XCIuXCIsY2FyZGluYWxpdHk6MX19LG1hc2s6XCIoXFxcXGh0dHA6Ly8pfChcXFxcaHR0cFxcXFxzOi8vKXwoZnRwOi8vKXwoZnRwXFxcXHM6Ly8paXsrfVwiLGluc2VydE1vZGU6ITEsYXV0b1VubWFzazohMSxpbnB1dG1vZGU6XCJ1cmxcIn0saXA6e21hc2s6XCJpW2lbaV1dLmlbaVtpXV0uaVtpW2ldXS5pW2lbaV1dXCIsZGVmaW5pdGlvbnM6e2k6e3ZhbGlkYXRvcjpmdW5jdGlvbihhLGIsYyxkLGUpe3JldHVybiBjLTE+LTEmJlwiLlwiIT09Yi5idWZmZXJbYy0xXT8oYT1iLmJ1ZmZlcltjLTFdK2EsYT1jLTI+LTEmJlwiLlwiIT09Yi5idWZmZXJbYy0yXT9iLmJ1ZmZlcltjLTJdK2E6XCIwXCIrYSk6YT1cIjAwXCIrYSxuZXcgUmVnRXhwKFwiMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdWzAtOV1bMC05XVwiKS50ZXN0KGEpfSxjYXJkaW5hbGl0eToxfX0sb25Vbk1hc2s6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiBhfSxpbnB1dG1vZGU6XCJudW1lcmljXCJ9LGVtYWlsOnttYXNrOlwiKnsxLDY0fVsuKnsxLDY0fV1bLip7MSw2NH1dWy4qezEsNjN9XUAtezEsNjN9Li17MSw2M31bLi17MSw2M31dWy4tezEsNjN9XVwiLGdyZWVkeTohMSxvbkJlZm9yZVBhc3RlOmZ1bmN0aW9uKGEsYil7cmV0dXJuIGE9YS50b0xvd2VyQ2FzZSgpLGEucmVwbGFjZShcIm1haWx0bzpcIixcIlwiKX0sZGVmaW5pdGlvbnM6e1wiKlwiOnt2YWxpZGF0b3I6XCJbMC05QS1aYS16ISMkJSYnKisvPT9eX2B7fH1+LV1cIixjYXJkaW5hbGl0eToxLGNhc2luZzpcImxvd2VyXCJ9LFwiLVwiOnt2YWxpZGF0b3I6XCJbMC05QS1aYS16LV1cIixjYXJkaW5hbGl0eToxLGNhc2luZzpcImxvd2VyXCJ9fSxvblVuTWFzazpmdW5jdGlvbihhLGIsYyl7cmV0dXJuIGF9LGlucHV0bW9kZTpcImVtYWlsXCJ9LG1hYzp7bWFzazpcIiMjOiMjOiMjOiMjOiMjOiMjXCJ9LHZpbjp7bWFzazpcIlZ7MTN9OXs0fVwiLGRlZmluaXRpb25zOntWOnt2YWxpZGF0b3I6XCJbQS1ISi1OUFItWmEtaGotbnByLXpcXFxcZF1cIixjYXJkaW5hbGl0eToxLGNhc2luZzpcInVwcGVyXCJ9fSxjbGVhckluY29tcGxldGU6ITAsYXV0b1VubWFzazohMH19KSxifShqUXVlcnksSW5wdXRtYXNrKSxmdW5jdGlvbihhLGIpe3JldHVybiBiLmV4dGVuZEFsaWFzZXMoe251bWVyaWM6e21hc2s6ZnVuY3Rpb24oYSl7ZnVuY3Rpb24gYyhiKXtmb3IodmFyIGM9XCJcIixkPTA7ZDxiLmxlbmd0aDtkKyspYys9YS5kZWZpbml0aW9uc1tiLmNoYXJBdChkKV18fGEub3B0aW9uYWxtYXJrZXIuc3RhcnQ9PT1iLmNoYXJBdChkKXx8YS5vcHRpb25hbG1hcmtlci5lbmQ9PT1iLmNoYXJBdChkKXx8YS5xdWFudGlmaWVybWFya2VyLnN0YXJ0PT09Yi5jaGFyQXQoZCl8fGEucXVhbnRpZmllcm1hcmtlci5lbmQ9PT1iLmNoYXJBdChkKXx8YS5ncm91cG1hcmtlci5zdGFydD09PWIuY2hhckF0KGQpfHxhLmdyb3VwbWFya2VyLmVuZD09PWIuY2hhckF0KGQpfHxhLmFsdGVybmF0b3JtYXJrZXI9PT1iLmNoYXJBdChkKT9cIlxcXFxcIitiLmNoYXJBdChkKTpiLmNoYXJBdChkKTtyZXR1cm4gY31pZigwIT09YS5yZXBlYXQmJmlzTmFOKGEuaW50ZWdlckRpZ2l0cykmJihhLmludGVnZXJEaWdpdHM9YS5yZXBlYXQpLGEucmVwZWF0PTAsYS5ncm91cFNlcGFyYXRvcj09PWEucmFkaXhQb2ludCYmKFwiLlwiPT09YS5yYWRpeFBvaW50P2EuZ3JvdXBTZXBhcmF0b3I9XCIsXCI6XCIsXCI9PT1hLnJhZGl4UG9pbnQ/YS5ncm91cFNlcGFyYXRvcj1cIi5cIjphLmdyb3VwU2VwYXJhdG9yPVwiXCIpLFwiIFwiPT09YS5ncm91cFNlcGFyYXRvciYmKGEuc2tpcE9wdGlvbmFsUGFydENoYXJhY3Rlcj12b2lkIDApLGEuYXV0b0dyb3VwPWEuYXV0b0dyb3VwJiZcIlwiIT09YS5ncm91cFNlcGFyYXRvcixhLmF1dG9Hcm91cCYmKFwic3RyaW5nXCI9PXR5cGVvZiBhLmdyb3VwU2l6ZSYmaXNGaW5pdGUoYS5ncm91cFNpemUpJiYoYS5ncm91cFNpemU9cGFyc2VJbnQoYS5ncm91cFNpemUpKSxpc0Zpbml0ZShhLmludGVnZXJEaWdpdHMpKSl7dmFyIGQ9TWF0aC5mbG9vcihhLmludGVnZXJEaWdpdHMvYS5ncm91cFNpemUpLGU9YS5pbnRlZ2VyRGlnaXRzJWEuZ3JvdXBTaXplO2EuaW50ZWdlckRpZ2l0cz1wYXJzZUludChhLmludGVnZXJEaWdpdHMpKygwPT09ZT9kLTE6ZCksYS5pbnRlZ2VyRGlnaXRzPDEmJihhLmludGVnZXJEaWdpdHM9XCIqXCIpfWEucGxhY2Vob2xkZXIubGVuZ3RoPjEmJihhLnBsYWNlaG9sZGVyPWEucGxhY2Vob2xkZXIuY2hhckF0KDApKSxcInJhZGl4Rm9jdXNcIj09PWEucG9zaXRpb25DYXJldE9uQ2xpY2smJlwiXCI9PT1hLnBsYWNlaG9sZGVyJiZhLmludGVnZXJPcHRpb25hbD09PSExJiYoYS5wb3NpdGlvbkNhcmV0T25DbGljaz1cImx2cFwiKSxhLmRlZmluaXRpb25zW1wiO1wiXT1hLmRlZmluaXRpb25zW1wiflwiXSxhLmRlZmluaXRpb25zW1wiO1wiXS5kZWZpbml0aW9uU3ltYm9sPVwiflwiLGEubnVtZXJpY0lucHV0PT09ITAmJihhLnBvc2l0aW9uQ2FyZXRPbkNsaWNrPVwicmFkaXhGb2N1c1wiPT09YS5wb3NpdGlvbkNhcmV0T25DbGljaz9cImx2cFwiOmEucG9zaXRpb25DYXJldE9uQ2xpY2ssYS5kaWdpdHNPcHRpb25hbD0hMSxpc05hTihhLmRpZ2l0cykmJihhLmRpZ2l0cz0yKSxhLmRlY2ltYWxQcm90ZWN0PSExKTt2YXIgZj1cIlsrXVwiO2lmKGYrPWMoYS5wcmVmaXgpLGYrPWEuaW50ZWdlck9wdGlvbmFsPT09ITA/XCJ+ezEsXCIrYS5pbnRlZ2VyRGlnaXRzK1wifVwiOlwifntcIithLmludGVnZXJEaWdpdHMrXCJ9XCIsdm9pZCAwIT09YS5kaWdpdHMpe2EuZGVjaW1hbFByb3RlY3QmJihhLnJhZGl4UG9pbnREZWZpbml0aW9uU3ltYm9sPVwiOlwiKTt2YXIgZz1hLmRpZ2l0cy50b1N0cmluZygpLnNwbGl0KFwiLFwiKTtpc0Zpbml0ZShnWzBdJiZnWzFdJiZpc0Zpbml0ZShnWzFdKSk/Zis9KGEuZGVjaW1hbFByb3RlY3Q/XCI6XCI6YS5yYWRpeFBvaW50KStcIjt7XCIrYS5kaWdpdHMrXCJ9XCI6KGlzTmFOKGEuZGlnaXRzKXx8cGFyc2VJbnQoYS5kaWdpdHMpPjApJiYoZis9YS5kaWdpdHNPcHRpb25hbD9cIltcIisoYS5kZWNpbWFsUHJvdGVjdD9cIjpcIjphLnJhZGl4UG9pbnQpK1wiO3sxLFwiK2EuZGlnaXRzK1wifV1cIjooYS5kZWNpbWFsUHJvdGVjdD9cIjpcIjphLnJhZGl4UG9pbnQpK1wiO3tcIithLmRpZ2l0cytcIn1cIil9cmV0dXJuIGYrPWMoYS5zdWZmaXgpLGYrPVwiWy1dXCIsYS5ncmVlZHk9ITEsbnVsbCE9PWEubWluJiYoYS5taW49YS5taW4udG9TdHJpbmcoKS5yZXBsYWNlKG5ldyBSZWdFeHAoYi5lc2NhcGVSZWdleChhLmdyb3VwU2VwYXJhdG9yKSxcImdcIiksXCJcIiksXCIsXCI9PT1hLnJhZGl4UG9pbnQmJihhLm1pbj1hLm1pbi5yZXBsYWNlKGEucmFkaXhQb2ludCxcIi5cIikpKSxudWxsIT09YS5tYXgmJihhLm1heD1hLm1heC50b1N0cmluZygpLnJlcGxhY2UobmV3IFJlZ0V4cChiLmVzY2FwZVJlZ2V4KGEuZ3JvdXBTZXBhcmF0b3IpLFwiZ1wiKSxcIlwiKSxcIixcIj09PWEucmFkaXhQb2ludCYmKGEubWF4PWEubWF4LnJlcGxhY2UoYS5yYWRpeFBvaW50LFwiLlwiKSkpLGZ9LHBsYWNlaG9sZGVyOlwiXCIsZ3JlZWR5OiExLGRpZ2l0czpcIipcIixkaWdpdHNPcHRpb25hbDohMCxyYWRpeFBvaW50OlwiLlwiLHBvc2l0aW9uQ2FyZXRPbkNsaWNrOlwicmFkaXhGb2N1c1wiLGdyb3VwU2l6ZTozLGdyb3VwU2VwYXJhdG9yOlwiXCIsYXV0b0dyb3VwOiExLGFsbG93UGx1czohMCxhbGxvd01pbnVzOiEwLG5lZ2F0aW9uU3ltYm9sOntmcm9udDpcIi1cIixiYWNrOlwiXCJ9LGludGVnZXJEaWdpdHM6XCIrXCIsaW50ZWdlck9wdGlvbmFsOiEwLHByZWZpeDpcIlwiLHN1ZmZpeDpcIlwiLHJpZ2h0QWxpZ246ITAsZGVjaW1hbFByb3RlY3Q6ITAsbWluOm51bGwsbWF4Om51bGwsc3RlcDoxLGluc2VydE1vZGU6ITAsYXV0b1VubWFzazohMSx1bm1hc2tBc051bWJlcjohMSxpbnB1dG1vZGU6XCJudW1lcmljXCIscG9zdEZvcm1hdDpmdW5jdGlvbihjLGQsZSl7ZS5udW1lcmljSW5wdXQ9PT0hMCYmKGM9Yy5yZXZlcnNlKCksaXNGaW5pdGUoZCkmJihkPWMuam9pbihcIlwiKS5sZW5ndGgtZC0xKSk7dmFyIGYsZztkPWQ+PWMubGVuZ3RoP2MubGVuZ3RoLTE6ZDwwPzA6ZDt2YXIgaD1jW2RdLGk9Yy5zbGljZSgpO2g9PT1lLmdyb3VwU2VwYXJhdG9yJiYoaS5zcGxpY2UoZC0tLDEpLGg9aVtkXSk7dmFyIGo9aS5qb2luKFwiXCIpLm1hdGNoKG5ldyBSZWdFeHAoXCJeXCIrYi5lc2NhcGVSZWdleChlLm5lZ2F0aW9uU3ltYm9sLmZyb250KSkpO2o9bnVsbCE9PWomJjE9PT1qLmxlbmd0aCxkPihqP2UubmVnYXRpb25TeW1ib2wuZnJvbnQubGVuZ3RoOjApK2UucHJlZml4Lmxlbmd0aCYmZDxpLmxlbmd0aC1lLnN1ZmZpeC5sZW5ndGgmJihpW2RdPVwiIVwiKTt2YXIgaz1pLmpvaW4oXCJcIiksbD1pLmpvaW4oKTtpZihqJiYoaz1rLnJlcGxhY2UobmV3IFJlZ0V4cChcIl5cIitiLmVzY2FwZVJlZ2V4KGUubmVnYXRpb25TeW1ib2wuZnJvbnQpKSxcIlwiKSxrPWsucmVwbGFjZShuZXcgUmVnRXhwKGIuZXNjYXBlUmVnZXgoZS5uZWdhdGlvblN5bWJvbC5iYWNrKStcIiRcIiksXCJcIikpLGs9ay5yZXBsYWNlKG5ldyBSZWdFeHAoYi5lc2NhcGVSZWdleChlLnN1ZmZpeCkrXCIkXCIpLFwiXCIpLGs9ay5yZXBsYWNlKG5ldyBSZWdFeHAoXCJeXCIrYi5lc2NhcGVSZWdleChlLnByZWZpeCkpLFwiXCIpLGsubGVuZ3RoPjAmJmUuYXV0b0dyb3VwfHxrLmluZGV4T2YoZS5ncm91cFNlcGFyYXRvcikhPT0tMSl7dmFyIG09Yi5lc2NhcGVSZWdleChlLmdyb3VwU2VwYXJhdG9yKTtrPWsucmVwbGFjZShuZXcgUmVnRXhwKG0sXCJnXCIpLFwiXCIpO3ZhciBuPWsuc3BsaXQoaD09PWUucmFkaXhQb2ludD9cIiFcIjplLnJhZGl4UG9pbnQpO2lmKGs9XCJcIj09PWUucmFkaXhQb2ludD9rOm5bMF0saCE9PWUubmVnYXRpb25TeW1ib2wuZnJvbnQmJihrPWsucmVwbGFjZShcIiFcIixcIj9cIikpLGsubGVuZ3RoPmUuZ3JvdXBTaXplKWZvcih2YXIgbz1uZXcgUmVnRXhwKFwiKFstK10/W1xcXFxkP10rKShbXFxcXGQ/XXtcIitlLmdyb3VwU2l6ZStcIn0pXCIpO28udGVzdChrKSYmXCJcIiE9PWUuZ3JvdXBTZXBhcmF0b3I7KWs9ay5yZXBsYWNlKG8sXCIkMVwiK2UuZ3JvdXBTZXBhcmF0b3IrXCIkMlwiKSxrPWsucmVwbGFjZShlLmdyb3VwU2VwYXJhdG9yK2UuZ3JvdXBTZXBhcmF0b3IsZS5ncm91cFNlcGFyYXRvcik7az1rLnJlcGxhY2UoXCI/XCIsXCIhXCIpLFwiXCIhPT1lLnJhZGl4UG9pbnQmJm4ubGVuZ3RoPjEmJihrKz0oaD09PWUucmFkaXhQb2ludD9cIiFcIjplLnJhZGl4UG9pbnQpK25bMV0pfWs9ZS5wcmVmaXgraytlLnN1ZmZpeCxqJiYoaz1lLm5lZ2F0aW9uU3ltYm9sLmZyb250K2srZS5uZWdhdGlvblN5bWJvbC5iYWNrKTt2YXIgcD1sIT09ay5zcGxpdChcIlwiKS5qb2luKCkscT1hLmluQXJyYXkoXCIhXCIsayk7aWYocT09PS0xJiYocT1kKSxwKXtmb3IoYy5sZW5ndGg9ay5sZW5ndGgsZj0wLGc9ay5sZW5ndGg7ZjxnO2YrKyljW2ZdPWsuY2hhckF0KGYpO2NbcV09aH1yZXR1cm4gcT1lLm51bWVyaWNJbnB1dCYmaXNGaW5pdGUoZCk/Yy5qb2luKFwiXCIpLmxlbmd0aC1xLTE6cSxlLm51bWVyaWNJbnB1dCYmKGM9Yy5yZXZlcnNlKCksYS5pbkFycmF5KGUucmFkaXhQb2ludCxjKTxxJiZjLmpvaW4oXCJcIikubGVuZ3RoLWUuc3VmZml4Lmxlbmd0aCE9PXEmJihxLT0xKSksXG57cG9zOnEscmVmcmVzaEZyb21CdWZmZXI6cCxidWZmZXI6Yyxpc05lZ2F0aXZlOmp9fSxvbkJlZm9yZVdyaXRlOmZ1bmN0aW9uKGMsZCxlLGYpe3ZhciBnO2lmKGMmJihcImJsdXJcIj09PWMudHlwZXx8XCJjaGVja3ZhbFwiPT09Yy50eXBlfHxcImtleWRvd25cIj09PWMudHlwZSkpe3ZhciBoPWYubnVtZXJpY0lucHV0P2Quc2xpY2UoKS5yZXZlcnNlKCkuam9pbihcIlwiKTpkLmpvaW4oXCJcIiksaT1oLnJlcGxhY2UoZi5wcmVmaXgsXCJcIik7aT1pLnJlcGxhY2UoZi5zdWZmaXgsXCJcIiksaT1pLnJlcGxhY2UobmV3IFJlZ0V4cChiLmVzY2FwZVJlZ2V4KGYuZ3JvdXBTZXBhcmF0b3IpLFwiZ1wiKSxcIlwiKSxcIixcIj09PWYucmFkaXhQb2ludCYmKGk9aS5yZXBsYWNlKGYucmFkaXhQb2ludCxcIi5cIikpO3ZhciBqPWkubWF0Y2gobmV3IFJlZ0V4cChcIlstXCIrYi5lc2NhcGVSZWdleChmLm5lZ2F0aW9uU3ltYm9sLmZyb250KStcIl1cIixcImdcIikpO2lmKGo9bnVsbCE9PWomJjE9PT1qLmxlbmd0aCxpPWkucmVwbGFjZShuZXcgUmVnRXhwKFwiWy1cIitiLmVzY2FwZVJlZ2V4KGYubmVnYXRpb25TeW1ib2wuZnJvbnQpK1wiXVwiLFwiZ1wiKSxcIlwiKSxpPWkucmVwbGFjZShuZXcgUmVnRXhwKGIuZXNjYXBlUmVnZXgoZi5uZWdhdGlvblN5bWJvbC5iYWNrKStcIiRcIiksXCJcIiksaXNOYU4oZi5wbGFjZWhvbGRlcikmJihpPWkucmVwbGFjZShuZXcgUmVnRXhwKGIuZXNjYXBlUmVnZXgoZi5wbGFjZWhvbGRlciksXCJnXCIpLFwiXCIpKSxpPWk9PT1mLm5lZ2F0aW9uU3ltYm9sLmZyb250P2krXCIwXCI6aSxcIlwiIT09aSYmaXNGaW5pdGUoaSkpe3ZhciBrPXBhcnNlRmxvYXQoaSksbD1qP2sqLTE6aztpZihudWxsIT09Zi5taW4mJmlzRmluaXRlKGYubWluKSYmbDxwYXJzZUZsb2F0KGYubWluKT8oaz1NYXRoLmFicyhmLm1pbiksaj1mLm1pbjwwLGg9dm9pZCAwKTpudWxsIT09Zi5tYXgmJmlzRmluaXRlKGYubWF4KSYmbD5wYXJzZUZsb2F0KGYubWF4KSYmKGs9TWF0aC5hYnMoZi5tYXgpLGo9Zi5tYXg8MCxoPXZvaWQgMCksaT1rLnRvU3RyaW5nKCkucmVwbGFjZShcIi5cIixmLnJhZGl4UG9pbnQpLnNwbGl0KFwiXCIpLGlzRmluaXRlKGYuZGlnaXRzKSl7dmFyIG09YS5pbkFycmF5KGYucmFkaXhQb2ludCxpKSxuPWEuaW5BcnJheShmLnJhZGl4UG9pbnQsaCk7bT09PS0xJiYoaS5wdXNoKGYucmFkaXhQb2ludCksbT1pLmxlbmd0aC0xKTtmb3IodmFyIG89MTtvPD1mLmRpZ2l0cztvKyspZi5kaWdpdHNPcHRpb25hbHx8dm9pZCAwIT09aVttK29dJiZpW20rb10hPT1mLnBsYWNlaG9sZGVyLmNoYXJBdCgwKT9uIT09LTEmJnZvaWQgMCE9PWhbbitvXSYmKGlbbStvXT1pW20rb118fGhbbitvXSk6aVttK29dPVwiMFwiO2lbaS5sZW5ndGgtMV09PT1mLnJhZGl4UG9pbnQmJmRlbGV0ZSBpW2kubGVuZ3RoLTFdfWlmKGsudG9TdHJpbmcoKSE9PWkmJmsudG9TdHJpbmcoKStcIi5cIiE9PWl8fGopcmV0dXJuIGk9KGYucHJlZml4K2kuam9pbihcIlwiKSkuc3BsaXQoXCJcIiksIWp8fDA9PT1rJiZcImJsdXJcIj09PWMudHlwZXx8KGkudW5zaGlmdChmLm5lZ2F0aW9uU3ltYm9sLmZyb250KSxpLnB1c2goZi5uZWdhdGlvblN5bWJvbC5iYWNrKSksZi5udW1lcmljSW5wdXQmJihpPWkucmV2ZXJzZSgpKSxnPWYucG9zdEZvcm1hdChpLGYubnVtZXJpY0lucHV0P2U6ZS0xLGYpLGcuYnVmZmVyJiYoZy5yZWZyZXNoRnJvbUJ1ZmZlcj1nLmJ1ZmZlci5qb2luKFwiXCIpIT09ZC5qb2luKFwiXCIpKSxnfX1pZihmLmF1dG9Hcm91cClyZXR1cm4gZz1mLnBvc3RGb3JtYXQoZCxmLm51bWVyaWNJbnB1dD9lOmUtMSxmKSxnLmNhcmV0PWU8KGcuaXNOZWdhdGl2ZT9mLm5lZ2F0aW9uU3ltYm9sLmZyb250Lmxlbmd0aDowKStmLnByZWZpeC5sZW5ndGh8fGU+Zy5idWZmZXIubGVuZ3RoLShnLmlzTmVnYXRpdmU/Zi5uZWdhdGlvblN5bWJvbC5iYWNrLmxlbmd0aDowKT9nLnBvczpnLnBvcysxLGd9LHJlZ2V4OntpbnRlZ2VyUGFydDpmdW5jdGlvbihhKXtyZXR1cm4gbmV3IFJlZ0V4cChcIltcIitiLmVzY2FwZVJlZ2V4KGEubmVnYXRpb25TeW1ib2wuZnJvbnQpK1wiK10/XFxcXGQrXCIpfSxpbnRlZ2VyTlBhcnQ6ZnVuY3Rpb24oYSl7cmV0dXJuIG5ldyBSZWdFeHAoXCJbXFxcXGRcIitiLmVzY2FwZVJlZ2V4KGEuZ3JvdXBTZXBhcmF0b3IpK2IuZXNjYXBlUmVnZXgoYS5wbGFjZWhvbGRlci5jaGFyQXQoMCkpK1wiXStcIil9fSxzaWduSGFuZGxlcjpmdW5jdGlvbihhLGIsYyxkLGUpe2lmKCFkJiZlLmFsbG93TWludXMmJlwiLVwiPT09YXx8ZS5hbGxvd1BsdXMmJlwiK1wiPT09YSl7dmFyIGY9Yi5idWZmZXIuam9pbihcIlwiKS5tYXRjaChlLnJlZ2V4LmludGVnZXJQYXJ0KGUpKTtpZihmJiZmWzBdLmxlbmd0aD4wKXJldHVybiBiLmJ1ZmZlcltmLmluZGV4XT09PShcIi1cIj09PWE/XCIrXCI6ZS5uZWdhdGlvblN5bWJvbC5mcm9udCk/XCItXCI9PT1hP1wiXCIhPT1lLm5lZ2F0aW9uU3ltYm9sLmJhY2s/e3BvczowLGM6ZS5uZWdhdGlvblN5bWJvbC5mcm9udCxyZW1vdmU6MCxjYXJldDpjLGluc2VydDp7cG9zOmIuYnVmZmVyLmxlbmd0aC0xLGM6ZS5uZWdhdGlvblN5bWJvbC5iYWNrfX06e3BvczowLGM6ZS5uZWdhdGlvblN5bWJvbC5mcm9udCxyZW1vdmU6MCxjYXJldDpjfTpcIlwiIT09ZS5uZWdhdGlvblN5bWJvbC5iYWNrP3twb3M6MCxjOlwiK1wiLHJlbW92ZTpbMCxiLmJ1ZmZlci5sZW5ndGgtMV0sY2FyZXQ6Y306e3BvczowLGM6XCIrXCIscmVtb3ZlOjAsY2FyZXQ6Y306Yi5idWZmZXJbMF09PT0oXCItXCI9PT1hP2UubmVnYXRpb25TeW1ib2wuZnJvbnQ6XCIrXCIpP1wiLVwiPT09YSYmXCJcIiE9PWUubmVnYXRpb25TeW1ib2wuYmFjaz97cmVtb3ZlOlswLGIuYnVmZmVyLmxlbmd0aC0xXSxjYXJldDpjLTF9OntyZW1vdmU6MCxjYXJldDpjLTF9OlwiLVwiPT09YT9cIlwiIT09ZS5uZWdhdGlvblN5bWJvbC5iYWNrP3twb3M6MCxjOmUubmVnYXRpb25TeW1ib2wuZnJvbnQsY2FyZXQ6YysxLGluc2VydDp7cG9zOmIuYnVmZmVyLmxlbmd0aCxjOmUubmVnYXRpb25TeW1ib2wuYmFja319Ontwb3M6MCxjOmUubmVnYXRpb25TeW1ib2wuZnJvbnQsY2FyZXQ6YysxfTp7cG9zOjAsYzphLGNhcmV0OmMrMX19cmV0dXJuITF9LHJhZGl4SGFuZGxlcjpmdW5jdGlvbihiLGMsZCxlLGYpe2lmKCFlJiZmLm51bWVyaWNJbnB1dCE9PSEwJiZiPT09Zi5yYWRpeFBvaW50JiZ2b2lkIDAhPT1mLmRpZ2l0cyYmKGlzTmFOKGYuZGlnaXRzKXx8cGFyc2VJbnQoZi5kaWdpdHMpPjApKXt2YXIgZz1hLmluQXJyYXkoZi5yYWRpeFBvaW50LGMuYnVmZmVyKSxoPWMuYnVmZmVyLmpvaW4oXCJcIikubWF0Y2goZi5yZWdleC5pbnRlZ2VyUGFydChmKSk7aWYoZyE9PS0xJiZjLnZhbGlkUG9zaXRpb25zW2ddKXJldHVybiBjLnZhbGlkUG9zaXRpb25zW2ctMV0/e2NhcmV0OmcrMX06e3BvczpoLmluZGV4LGM6aFswXSxjYXJldDpnKzF9O2lmKCFofHxcIjBcIj09PWhbMF0mJmguaW5kZXgrMSE9PWQpcmV0dXJuIGMuYnVmZmVyW2g/aC5pbmRleDpkXT1cIjBcIix7cG9zOihoP2guaW5kZXg6ZCkrMSxjOmYucmFkaXhQb2ludH19cmV0dXJuITF9LGxlYWRpbmdaZXJvSGFuZGxlcjpmdW5jdGlvbihiLGMsZCxlLGYsZyl7aWYoIWUpe3ZhciBoPWMuYnVmZmVyLnNsaWNlKFwiXCIpO2lmKGguc3BsaWNlKDAsZi5wcmVmaXgubGVuZ3RoKSxoLnNwbGljZShoLmxlbmd0aC1mLnN1ZmZpeC5sZW5ndGgsZi5zdWZmaXgubGVuZ3RoKSxmLm51bWVyaWNJbnB1dD09PSEwKXt2YXIgaD1oLnJldmVyc2UoKSxpPWhbMF07aWYoXCIwXCI9PT1pJiZ2b2lkIDA9PT1jLnZhbGlkUG9zaXRpb25zW2QtMV0pcmV0dXJue3BvczpkLHJlbW92ZTpoLmxlbmd0aC0xfX1lbHNle2QtPWYucHJlZml4Lmxlbmd0aDt2YXIgaj1hLmluQXJyYXkoZi5yYWRpeFBvaW50LGgpLGs9aC5zbGljZSgwLGohPT0tMT9qOnZvaWQgMCkuam9pbihcIlwiKS5tYXRjaChmLnJlZ2V4LmludGVnZXJOUGFydChmKSk7aWYoayYmKGo9PT0tMXx8ZDw9aikpe3ZhciBsPWo9PT0tMT8wOnBhcnNlSW50KGguc2xpY2UoaisxKS5qb2luKFwiXCIpKTtpZigwPT09a1swXS5pbmRleE9mKFwiXCIhPT1mLnBsYWNlaG9sZGVyP2YucGxhY2Vob2xkZXIuY2hhckF0KDApOlwiMFwiKSYmKGsuaW5kZXgrMT09PWR8fGchPT0hMCYmMD09PWwpKXJldHVybiBjLmJ1ZmZlci5zcGxpY2Uoay5pbmRleCtmLnByZWZpeC5sZW5ndGgsMSkse3BvczprLmluZGV4K2YucHJlZml4Lmxlbmd0aCxyZW1vdmU6ay5pbmRleCtmLnByZWZpeC5sZW5ndGh9O2lmKFwiMFwiPT09YiYmZDw9ay5pbmRleCYma1swXSE9PWYuZ3JvdXBTZXBhcmF0b3IpcmV0dXJuITF9fX1yZXR1cm4hMH0sZGVmaW5pdGlvbnM6e1wiflwiOnt2YWxpZGF0b3I6ZnVuY3Rpb24oYyxkLGUsZixnLGgpe3ZhciBpPWcuc2lnbkhhbmRsZXIoYyxkLGUsZixnKTtpZighaSYmKGk9Zy5yYWRpeEhhbmRsZXIoYyxkLGUsZixnKSwhaSYmKGk9Zj9uZXcgUmVnRXhwKFwiWzAtOVwiK2IuZXNjYXBlUmVnZXgoZy5ncm91cFNlcGFyYXRvcikrXCJdXCIpLnRlc3QoYyk6bmV3IFJlZ0V4cChcIlswLTldXCIpLnRlc3QoYyksaT09PSEwJiYoaT1nLmxlYWRpbmdaZXJvSGFuZGxlcihjLGQsZSxmLGcsaCksaT09PSEwKSkpKXt2YXIgaj1hLmluQXJyYXkoZy5yYWRpeFBvaW50LGQuYnVmZmVyKTtpPWohPT0tMSYmKGcuZGlnaXRzT3B0aW9uYWw9PT0hMXx8ZC52YWxpZFBvc2l0aW9uc1tlXSkmJmcubnVtZXJpY0lucHV0IT09ITAmJmU+aiYmIWY/e3BvczplLHJlbW92ZTplfTp7cG9zOmV9fXJldHVybiBpfSxjYXJkaW5hbGl0eToxfSxcIitcIjp7dmFsaWRhdG9yOmZ1bmN0aW9uKGEsYixjLGQsZSl7dmFyIGY9ZS5zaWduSGFuZGxlcihhLGIsYyxkLGUpO3JldHVybiFmJiYoZCYmZS5hbGxvd01pbnVzJiZhPT09ZS5uZWdhdGlvblN5bWJvbC5mcm9udHx8ZS5hbGxvd01pbnVzJiZcIi1cIj09PWF8fGUuYWxsb3dQbHVzJiZcIitcIj09PWEpJiYoZj0hKCFkJiZcIi1cIj09PWEpfHwoXCJcIiE9PWUubmVnYXRpb25TeW1ib2wuYmFjaz97cG9zOmMsYzpcIi1cIj09PWE/ZS5uZWdhdGlvblN5bWJvbC5mcm9udDpcIitcIixjYXJldDpjKzEsaW5zZXJ0Ontwb3M6Yi5idWZmZXIubGVuZ3RoLGM6ZS5uZWdhdGlvblN5bWJvbC5iYWNrfX06e3BvczpjLGM6XCItXCI9PT1hP2UubmVnYXRpb25TeW1ib2wuZnJvbnQ6XCIrXCIsY2FyZXQ6YysxfSkpLGZ9LGNhcmRpbmFsaXR5OjEscGxhY2Vob2xkZXI6XCJcIn0sXCItXCI6e3ZhbGlkYXRvcjpmdW5jdGlvbihhLGIsYyxkLGUpe3ZhciBmPWUuc2lnbkhhbmRsZXIoYSxiLGMsZCxlKTtyZXR1cm4hZiYmZCYmZS5hbGxvd01pbnVzJiZhPT09ZS5uZWdhdGlvblN5bWJvbC5iYWNrJiYoZj0hMCksZn0sY2FyZGluYWxpdHk6MSxwbGFjZWhvbGRlcjpcIlwifSxcIjpcIjp7dmFsaWRhdG9yOmZ1bmN0aW9uKGEsYyxkLGUsZil7dmFyIGc9Zi5zaWduSGFuZGxlcihhLGMsZCxlLGYpO2lmKCFnKXt2YXIgaD1cIltcIitiLmVzY2FwZVJlZ2V4KGYucmFkaXhQb2ludCkrXCJdXCI7Zz1uZXcgUmVnRXhwKGgpLnRlc3QoYSksZyYmYy52YWxpZFBvc2l0aW9uc1tkXSYmYy52YWxpZFBvc2l0aW9uc1tkXS5tYXRjaC5wbGFjZWhvbGRlcj09PWYucmFkaXhQb2ludCYmKGc9e2NhcmV0OmQrMX0pfXJldHVybiBnfSxjYXJkaW5hbGl0eToxLHBsYWNlaG9sZGVyOmZ1bmN0aW9uKGEpe3JldHVybiBhLnJhZGl4UG9pbnR9fX0sb25Vbk1hc2s6ZnVuY3Rpb24oYSxjLGQpe2lmKFwiXCI9PT1jJiZkLm51bGxhYmxlPT09ITApcmV0dXJuIGM7dmFyIGU9YS5yZXBsYWNlKGQucHJlZml4LFwiXCIpO3JldHVybiBlPWUucmVwbGFjZShkLnN1ZmZpeCxcIlwiKSxlPWUucmVwbGFjZShuZXcgUmVnRXhwKGIuZXNjYXBlUmVnZXgoZC5ncm91cFNlcGFyYXRvciksXCJnXCIpLFwiXCIpLGQudW5tYXNrQXNOdW1iZXI/KFwiXCIhPT1kLnJhZGl4UG9pbnQmJmUuaW5kZXhPZihkLnJhZGl4UG9pbnQpIT09LTEmJihlPWUucmVwbGFjZShiLmVzY2FwZVJlZ2V4LmNhbGwodGhpcyxkLnJhZGl4UG9pbnQpLFwiLlwiKSksTnVtYmVyKGUpKTplfSxpc0NvbXBsZXRlOmZ1bmN0aW9uKGEsYyl7dmFyIGQ9YS5qb2luKFwiXCIpLGU9YS5zbGljZSgpO2lmKGMucG9zdEZvcm1hdChlLDAsYyksZS5qb2luKFwiXCIpIT09ZClyZXR1cm4hMTt2YXIgZj1kLnJlcGxhY2UoYy5wcmVmaXgsXCJcIik7cmV0dXJuIGY9Zi5yZXBsYWNlKGMuc3VmZml4LFwiXCIpLGY9Zi5yZXBsYWNlKG5ldyBSZWdFeHAoYi5lc2NhcGVSZWdleChjLmdyb3VwU2VwYXJhdG9yKSxcImdcIiksXCJcIiksXCIsXCI9PT1jLnJhZGl4UG9pbnQmJihmPWYucmVwbGFjZShiLmVzY2FwZVJlZ2V4KGMucmFkaXhQb2ludCksXCIuXCIpKSxpc0Zpbml0ZShmKX0sb25CZWZvcmVNYXNrOmZ1bmN0aW9uKGEsYyl7aWYoYy5udW1lcmljSW5wdXQ9PT0hMCYmKGE9YS5zcGxpdChcIlwiKS5yZXZlcnNlKCkuam9pbihcIlwiKSksXCJcIiE9PWMucmFkaXhQb2ludCYmaXNGaW5pdGUoYSkpe3ZhciBkPWEuc3BsaXQoXCIuXCIpLGU9XCJcIiE9PWMuZ3JvdXBTZXBhcmF0b3I/cGFyc2VJbnQoYy5ncm91cFNpemUpOjA7Mj09PWQubGVuZ3RoJiYoZFswXS5sZW5ndGg+ZXx8ZFsxXS5sZW5ndGg+ZSkmJihhPWEudG9TdHJpbmcoKS5yZXBsYWNlKFwiLlwiLGMucmFkaXhQb2ludCkpfXZhciBmPWEubWF0Y2goLywvZyksZz1hLm1hdGNoKC9cXC4vZyk7aWYoZyYmZj9nLmxlbmd0aD5mLmxlbmd0aD8oYT1hLnJlcGxhY2UoL1xcLi9nLFwiXCIpLGE9YS5yZXBsYWNlKFwiLFwiLGMucmFkaXhQb2ludCkpOmYubGVuZ3RoPmcubGVuZ3RoPyhhPWEucmVwbGFjZSgvLC9nLFwiXCIpLGE9YS5yZXBsYWNlKFwiLlwiLGMucmFkaXhQb2ludCkpOmE9YS5pbmRleE9mKFwiLlwiKTxhLmluZGV4T2YoXCIsXCIpP2EucmVwbGFjZSgvXFwuL2csXCJcIik6YT1hLnJlcGxhY2UoLywvZyxcIlwiKTphPWEucmVwbGFjZShuZXcgUmVnRXhwKGIuZXNjYXBlUmVnZXgoYy5ncm91cFNlcGFyYXRvciksXCJnXCIpLFwiXCIpLDA9PT1jLmRpZ2l0cyYmKGEuaW5kZXhPZihcIi5cIikhPT0tMT9hPWEuc3Vic3RyaW5nKDAsYS5pbmRleE9mKFwiLlwiKSk6YS5pbmRleE9mKFwiLFwiKSE9PS0xJiYoYT1hLnN1YnN0cmluZygwLGEuaW5kZXhPZihcIixcIikpKSksXCJcIiE9PWMucmFkaXhQb2ludCYmaXNGaW5pdGUoYy5kaWdpdHMpJiZhLmluZGV4T2YoYy5yYWRpeFBvaW50KSE9PS0xKXt2YXIgaD1hLnNwbGl0KGMucmFkaXhQb2ludCksaT1oWzFdLm1hdGNoKG5ldyBSZWdFeHAoXCJcXFxcZCpcIikpWzBdO2lmKHBhcnNlSW50KGMuZGlnaXRzKTxpLnRvU3RyaW5nKCkubGVuZ3RoKXt2YXIgaj1NYXRoLnBvdygxMCxwYXJzZUludChjLmRpZ2l0cykpO2E9YS5yZXBsYWNlKGIuZXNjYXBlUmVnZXgoYy5yYWRpeFBvaW50KSxcIi5cIiksYT1NYXRoLnJvdW5kKHBhcnNlRmxvYXQoYSkqaikvaixhPWEudG9TdHJpbmcoKS5yZXBsYWNlKFwiLlwiLGMucmFkaXhQb2ludCl9fXJldHVybiBjLm51bWVyaWNJbnB1dD09PSEwJiYoYT1hLnNwbGl0KFwiXCIpLnJldmVyc2UoKS5qb2luKFwiXCIpKSxhLnRvU3RyaW5nKCl9LGNhbkNsZWFyUG9zaXRpb246ZnVuY3Rpb24oYSxiLGMsZCxlKXt2YXIgZj1hLnZhbGlkUG9zaXRpb25zW2JdLmlucHV0LGc9ZiE9PWUucmFkaXhQb2ludHx8bnVsbCE9PWEudmFsaWRQb3NpdGlvbnNbYl0ubWF0Y2guZm4mJmUuZGVjaW1hbFByb3RlY3Q9PT0hMXx8aXNGaW5pdGUoZil8fGI9PT1jfHxmPT09ZS5ncm91cFNlcGFyYXRvcnx8Zj09PWUubmVnYXRpb25TeW1ib2wuZnJvbnR8fGY9PT1lLm5lZ2F0aW9uU3ltYm9sLmJhY2s7cmV0dXJuIGd9LG9uS2V5RG93bjpmdW5jdGlvbihjLGQsZSxmKXt2YXIgZz1hKHRoaXMpO2lmKGMuY3RybEtleSlzd2l0Y2goYy5rZXlDb2RlKXtjYXNlIGIua2V5Q29kZS5VUDpnLnZhbChwYXJzZUZsb2F0KHRoaXMuaW5wdXRtYXNrLnVubWFza2VkdmFsdWUoKSkrcGFyc2VJbnQoZi5zdGVwKSksZy50cmlnZ2VyKFwic2V0dmFsdWVcIik7YnJlYWs7Y2FzZSBiLmtleUNvZGUuRE9XTjpnLnZhbChwYXJzZUZsb2F0KHRoaXMuaW5wdXRtYXNrLnVubWFza2VkdmFsdWUoKSktcGFyc2VJbnQoZi5zdGVwKSksZy50cmlnZ2VyKFwic2V0dmFsdWVcIil9fX0sY3VycmVuY3k6e3ByZWZpeDpcIiQgXCIsZ3JvdXBTZXBhcmF0b3I6XCIsXCIsYWxpYXM6XCJudW1lcmljXCIscGxhY2Vob2xkZXI6XCIwXCIsYXV0b0dyb3VwOiEwLGRpZ2l0czoyLGRpZ2l0c09wdGlvbmFsOiExLGNsZWFyTWFza09uTG9zdEZvY3VzOiExfSxkZWNpbWFsOnthbGlhczpcIm51bWVyaWNcIn0saW50ZWdlcjp7YWxpYXM6XCJudW1lcmljXCIsZGlnaXRzOjAscmFkaXhQb2ludDpcIlwifSxwZXJjZW50YWdlOnthbGlhczpcIm51bWVyaWNcIixkaWdpdHM6MixyYWRpeFBvaW50OlwiLlwiLHBsYWNlaG9sZGVyOlwiMFwiLGF1dG9Hcm91cDohMSxtaW46MCxtYXg6MTAwLHN1ZmZpeDpcIiAlXCIsYWxsb3dQbHVzOiExLGFsbG93TWludXM6ITF9fSksYn0oalF1ZXJ5LElucHV0bWFzayksZnVuY3Rpb24oYSxiKXtmdW5jdGlvbiBjKGEsYil7dmFyIGM9KGEubWFza3x8YSkucmVwbGFjZSgvIy9nLFwiOVwiKS5yZXBsYWNlKC9cXCkvLFwiOVwiKS5yZXBsYWNlKC9bKygpIy1dL2csXCJcIiksZD0oYi5tYXNrfHxiKS5yZXBsYWNlKC8jL2csXCI5XCIpLnJlcGxhY2UoL1xcKS8sXCI5XCIpLnJlcGxhY2UoL1srKCkjLV0vZyxcIlwiKSxlPShhLm1hc2t8fGEpLnNwbGl0KFwiI1wiKVswXSxmPShiLm1hc2t8fGIpLnNwbGl0KFwiI1wiKVswXTtyZXR1cm4gMD09PWYuaW5kZXhPZihlKT8tMTowPT09ZS5pbmRleE9mKGYpPzE6Yy5sb2NhbGVDb21wYXJlKGQpfXZhciBkPWIucHJvdG90eXBlLmFuYWx5c2VNYXNrO3JldHVybiBiLnByb3RvdHlwZS5hbmFseXNlTWFzaz1mdW5jdGlvbihiLGMpe2Z1bmN0aW9uIGUoYSxjLGQpe2M9Y3x8XCJcIixkPWR8fGcsXCJcIiE9PWMmJihkW2NdPXt9KTtmb3IodmFyIGY9XCJcIixoPWRbY118fGQsaT1hLmxlbmd0aC0xO2k+PTA7aS0tKWI9YVtpXS5tYXNrfHxhW2ldLGY9Yi5zdWJzdHIoMCwxKSxoW2ZdPWhbZl18fFtdLGhbZl0udW5zaGlmdChiLnN1YnN0cigxKSksYS5zcGxpY2UoaSwxKTtmb3IodmFyIGogaW4gaCloW2pdLmxlbmd0aD41MDAmJmUoaFtqXS5zbGljZSgpLGosaCl9ZnVuY3Rpb24gZihiKXt2YXIgZD1cIlwiLGU9W107Zm9yKHZhciBnIGluIGIpYS5pc0FycmF5KGJbZ10pPzE9PT1iW2ddLmxlbmd0aD9lLnB1c2goZytiW2ddKTplLnB1c2goZytjLmdyb3VwbWFya2VyLnN0YXJ0K2JbZ10uam9pbihjLmdyb3VwbWFya2VyLmVuZCtjLmFsdGVybmF0b3JtYXJrZXIrYy5ncm91cG1hcmtlci5zdGFydCkrYy5ncm91cG1hcmtlci5lbmQpOmUucHVzaChnK2YoYltnXSkpO3JldHVybiBkKz0xPT09ZS5sZW5ndGg/ZVswXTpjLmdyb3VwbWFya2VyLnN0YXJ0K2Uuam9pbihjLmdyb3VwbWFya2VyLmVuZCtjLmFsdGVybmF0b3JtYXJrZXIrYy5ncm91cG1hcmtlci5zdGFydCkrYy5ncm91cG1hcmtlci5lbmR9dmFyIGc9e307Yy5waG9uZUNvZGVzJiZjLnBob25lQ29kZXMubGVuZ3RoPjFlMyYmKGI9Yi5zdWJzdHIoMSxiLmxlbmd0aC0yKSxlKGIuc3BsaXQoYy5ncm91cG1hcmtlci5lbmQrYy5hbHRlcm5hdG9ybWFya2VyK2MuZ3JvdXBtYXJrZXIuc3RhcnQpKSxiPWYoZykpO3ZhciBoPWQuY2FsbCh0aGlzLGIsYyk7cmV0dXJuIGh9LGIuZXh0ZW5kQWxpYXNlcyh7YWJzdHJhY3RwaG9uZTp7Z3JvdXBtYXJrZXI6e3N0YXJ0OlwiPFwiLGVuZDpcIj5cIn0sY291bnRyeWNvZGU6XCJcIixwaG9uZUNvZGVzOltdLG1hc2s6ZnVuY3Rpb24oYSl7cmV0dXJuIGEuZGVmaW5pdGlvbnM9e1wiI1wiOmEuZGVmaW5pdGlvbnNbOV19LGEucGhvbmVDb2Rlcy5zb3J0KGMpfSxrZWVwU3RhdGljOiEwLG9uQmVmb3JlTWFzazpmdW5jdGlvbihhLGIpe3ZhciBjPWEucmVwbGFjZSgvXjB7MSwyfS8sXCJcIikucmVwbGFjZSgvW1xcc10vZyxcIlwiKTtyZXR1cm4oYy5pbmRleE9mKGIuY291bnRyeWNvZGUpPjF8fGMuaW5kZXhPZihiLmNvdW50cnljb2RlKT09PS0xKSYmKGM9XCIrXCIrYi5jb3VudHJ5Y29kZStjKSxjfSxvblVuTWFzazpmdW5jdGlvbihhLGIsYyl7cmV0dXJuIGJ9LGlucHV0bW9kZTpcInRlbFwifX0pLGJ9KGpRdWVyeSxJbnB1dG1hc2spLGZ1bmN0aW9uKGEsYil7cmV0dXJuIGIuZXh0ZW5kQWxpYXNlcyh7UmVnZXg6e21hc2s6XCJyXCIsZ3JlZWR5OiExLHJlcGVhdDpcIipcIixyZWdleDpudWxsLHJlZ2V4VG9rZW5zOm51bGwsdG9rZW5pemVyOi9cXFtcXF4/XT8oPzpbXlxcXFxcXF1dK3xcXFxcW1xcU1xcc10/KSpdP3xcXFxcKD86MCg/OlswLTNdWzAtN117MCwyfXxbNC03XVswLTddPyk/fFsxLTldWzAtOV0qfHhbMC05QS1GYS1mXXsyfXx1WzAtOUEtRmEtZl17NH18Y1tBLVphLXpdfFtcXFNcXHNdPyl8XFwoKD86XFw/Wzo9IV0/KT98KD86Wz8qK118XFx7WzAtOV0rKD86LFswLTldKik/XFx9KVxcPz98W14uPyorXiR7WygpfFxcXFxdK3wuL2cscXVhbnRpZmllckZpbHRlcjovWzAtOV0rW14sXS8saXNDb21wbGV0ZTpmdW5jdGlvbihhLGIpe3JldHVybiBuZXcgUmVnRXhwKGIucmVnZXgpLnRlc3QoYS5qb2luKFwiXCIpKX0sZGVmaW5pdGlvbnM6e3I6e3ZhbGlkYXRvcjpmdW5jdGlvbihiLGMsZCxlLGYpe2Z1bmN0aW9uIGcoYSxiKXt0aGlzLm1hdGNoZXM9W10sdGhpcy5pc0dyb3VwPWF8fCExLHRoaXMuaXNRdWFudGlmaWVyPWJ8fCExLHRoaXMucXVhbnRpZmllcj17bWluOjEsbWF4OjF9LHRoaXMucmVwZWF0ZXJQYXJ0PXZvaWQgMH1mdW5jdGlvbiBoKCl7dmFyIGEsYixjPW5ldyBnLGQ9W107Zm9yKGYucmVnZXhUb2tlbnM9W107YT1mLnRva2VuaXplci5leGVjKGYucmVnZXgpOylzd2l0Y2goYj1hWzBdLGIuY2hhckF0KDApKXtjYXNlXCIoXCI6ZC5wdXNoKG5ldyBnKCghMCkpKTticmVhaztjYXNlXCIpXCI6az1kLnBvcCgpLGQubGVuZ3RoPjA/ZFtkLmxlbmd0aC0xXS5tYXRjaGVzLnB1c2goayk6Yy5tYXRjaGVzLnB1c2goayk7YnJlYWs7Y2FzZVwie1wiOmNhc2VcIitcIjpjYXNlXCIqXCI6dmFyIGU9bmV3IGcoKCExKSwoITApKTtiPWIucmVwbGFjZSgvW3t9XS9nLFwiXCIpO3ZhciBoPWIuc3BsaXQoXCIsXCIpLGk9aXNOYU4oaFswXSk/aFswXTpwYXJzZUludChoWzBdKSxqPTE9PT1oLmxlbmd0aD9pOmlzTmFOKGhbMV0pP2hbMV06cGFyc2VJbnQoaFsxXSk7aWYoZS5xdWFudGlmaWVyPXttaW46aSxtYXg6an0sZC5sZW5ndGg+MCl7dmFyIGw9ZFtkLmxlbmd0aC0xXS5tYXRjaGVzO2E9bC5wb3AoKSxhLmlzR3JvdXB8fChrPW5ldyBnKCghMCkpLGsubWF0Y2hlcy5wdXNoKGEpLGE9ayksbC5wdXNoKGEpLGwucHVzaChlKX1lbHNlIGE9Yy5tYXRjaGVzLnBvcCgpLGEuaXNHcm91cHx8KGs9bmV3IGcoKCEwKSksay5tYXRjaGVzLnB1c2goYSksYT1rKSxjLm1hdGNoZXMucHVzaChhKSxjLm1hdGNoZXMucHVzaChlKTticmVhaztkZWZhdWx0OmQubGVuZ3RoPjA/ZFtkLmxlbmd0aC0xXS5tYXRjaGVzLnB1c2goYik6Yy5tYXRjaGVzLnB1c2goYil9Yy5tYXRjaGVzLmxlbmd0aD4wJiZmLnJlZ2V4VG9rZW5zLnB1c2goYyl9ZnVuY3Rpb24gaShiLGMpe3ZhciBkPSExO2MmJihtKz1cIihcIixvKyspO2Zvcih2YXIgZT0wO2U8Yi5tYXRjaGVzLmxlbmd0aDtlKyspe3ZhciBmPWIubWF0Y2hlc1tlXTtpZihmLmlzR3JvdXA9PT0hMClkPWkoZiwhMCk7ZWxzZSBpZihmLmlzUXVhbnRpZmllcj09PSEwKXt2YXIgZz1hLmluQXJyYXkoZixiLm1hdGNoZXMpLGg9Yi5tYXRjaGVzW2ctMV0saz1tO2lmKGlzTmFOKGYucXVhbnRpZmllci5tYXgpKXtmb3IoO2YucmVwZWF0ZXJQYXJ0JiZmLnJlcGVhdGVyUGFydCE9PW0mJmYucmVwZWF0ZXJQYXJ0Lmxlbmd0aD5tLmxlbmd0aCYmIShkPWkoaCwhMCkpOyk7ZD1kfHxpKGgsITApLGQmJihmLnJlcGVhdGVyUGFydD1tKSxtPWsrZi5xdWFudGlmaWVyLm1heH1lbHNle2Zvcih2YXIgbD0wLG49Zi5xdWFudGlmaWVyLm1heC0xO2w8biYmIShkPWkoaCwhMCkpO2wrKyk7bT1rK1wie1wiK2YucXVhbnRpZmllci5taW4rXCIsXCIrZi5xdWFudGlmaWVyLm1heCtcIn1cIn19ZWxzZSBpZih2b2lkIDAhPT1mLm1hdGNoZXMpZm9yKHZhciBwPTA7cDxmLmxlbmd0aCYmIShkPWkoZltwXSxjKSk7cCsrKTtlbHNle3ZhciBxO2lmKFwiW1wiPT1mLmNoYXJBdCgwKSl7cT1tLHErPWY7Zm9yKHZhciByPTA7cjxvO3IrKylxKz1cIilcIjt2YXIgcz1uZXcgUmVnRXhwKFwiXihcIitxK1wiKSRcIik7ZD1zLnRlc3Qoail9ZWxzZSBmb3IodmFyIHQ9MCx1PWYubGVuZ3RoO3Q8dTt0KyspaWYoXCJcXFxcXCIhPT1mLmNoYXJBdCh0KSl7cT1tLHErPWYuc3Vic3RyKDAsdCsxKSxxPXEucmVwbGFjZSgvXFx8JC8sXCJcIik7Zm9yKHZhciByPTA7cjxvO3IrKylxKz1cIilcIjt2YXIgcz1uZXcgUmVnRXhwKFwiXihcIitxK1wiKSRcIik7aWYoZD1zLnRlc3QoaikpYnJlYWt9bSs9Zn1pZihkKWJyZWFrfXJldHVybiBjJiYobSs9XCIpXCIsby0tKSxkfXZhciBqLGssbD1jLmJ1ZmZlci5zbGljZSgpLG09XCJcIixuPSExLG89MDtudWxsPT09Zi5yZWdleFRva2VucyYmaCgpLGwuc3BsaWNlKGQsMCxiKSxqPWwuam9pbihcIlwiKTtmb3IodmFyIHA9MDtwPGYucmVnZXhUb2tlbnMubGVuZ3RoO3ArKyl7dmFyIHE9Zi5yZWdleFRva2Vuc1twXTtpZihuPWkocSxxLmlzR3JvdXApKWJyZWFrfXJldHVybiBufSxjYXJkaW5hbGl0eToxfX19fSksYn0oalF1ZXJ5LElucHV0bWFzayk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvanMvUGx1Z2lucy9pbnB1dG1hc2subWluLmpzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQU9BO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

eval("// plugins\n__webpack_require__(1);\n\n// components\n__webpack_require__(0);\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2pzL2FwcC5qcz84YjY3Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIHBsdWdpbnNcbnJlcXVpcmUoJy4vUGx1Z2lucy9pbnB1dG1hc2subWluLmpzJyk7XG5cbi8vIGNvbXBvbmVudHNcbnJlcXVpcmUoJy4vQ29tcG9uZW50cy9pbnB1dC5qcycpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvanMvYXBwLmpzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7O0FBRUE7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map
