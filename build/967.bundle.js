(self.webpackChunk_ircam_sc_components_doc=self.webpackChunk_ircam_sc_components_doc||[]).push([[967],{1967:function(u){u.exports=function(){"use strict";function u(u,D){return u(D={exports:{}},D.exports),D.exports}var D=u((function(u){var D=u.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=D)})),e=u((function(u){var D=u.exports={version:"2.6.5"};"number"==typeof __e&&(__e=D)})),r=(e.version,function(u){return"object"==typeof u?null!==u:"function"==typeof u}),t=function(u){if(!r(u))throw TypeError(u+" is not an object!");return u},F=function(u){try{return!!u()}catch(u){return!0}},n=!F((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})),C=D.document,A=r(C)&&r(C.createElement),E=!n&&!F((function(){return 7!=Object.defineProperty((u="div",A?C.createElement(u):{}),"a",{get:function(){return 7}}).a;var u})),i=Object.defineProperty,o={f:n?Object.defineProperty:function(u,D,e){if(t(u),D=function(u,D){if(!r(u))return u;var e,t;if(D&&"function"==typeof(e=u.toString)&&!r(t=e.call(u)))return t;if("function"==typeof(e=u.valueOf)&&!r(t=e.call(u)))return t;if(!D&&"function"==typeof(e=u.toString)&&!r(t=e.call(u)))return t;throw TypeError("Can't convert object to primitive value")}(D,!0),t(e),E)try{return i(u,D,e)}catch(u){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(u[D]=e.value),u}},a=n?function(u,D,e){return o.f(u,D,function(u,D){return{enumerable:!(1&u),configurable:!(2&u),writable:!(4&u),value:D}}(1,e))}:function(u,D,e){return u[D]=e,u},c={}.hasOwnProperty,B=function(u,D){return c.call(u,D)},f=0,s=Math.random(),l=u((function(u){var r="__core-js_shared__",t=D[r]||(D[r]={});(u.exports=function(u,D){return t[u]||(t[u]=void 0!==D?D:{})})("versions",[]).push({version:e.version,mode:"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})})),d=l("native-function-to-string",Function.toString),v=u((function(u){var r=function(u){return"Symbol(".concat(void 0===u?"":u,")_",(++f+s).toString(36))}("src"),t="toString",F=(""+d).split(t);e.inspectSource=function(u){return d.call(u)},(u.exports=function(u,e,t,n){var C="function"==typeof t;C&&(B(t,"name")||a(t,"name",e)),u[e]!==t&&(C&&(B(t,r)||a(t,r,u[e]?""+u[e]:F.join(String(e)))),u===D?u[e]=t:n?u[e]?u[e]=t:a(u,e,t):(delete u[e],a(u,e,t)))})(Function.prototype,t,(function(){return"function"==typeof this&&this[r]||d.call(this)}))})),p=function(u,D,e){if(function(u){if("function"!=typeof u)throw TypeError(u+" is not a function!")}(u),void 0===D)return u;switch(e){case 1:return function(e){return u.call(D,e)};case 2:return function(e,r){return u.call(D,e,r)};case 3:return function(e,r,t){return u.call(D,e,r,t)}}return function(){return u.apply(D,arguments)}},h="prototype",m=function(u,r,t){var F,n,C,A,E=u&m.F,i=u&m.G,o=u&m.S,c=u&m.P,B=u&m.B,f=i?D:o?D[r]||(D[r]={}):(D[r]||{})[h],s=i?e:e[r]||(e[r]={}),l=s[h]||(s[h]={});for(F in i&&(t=r),t)C=((n=!E&&f&&void 0!==f[F])?f:t)[F],A=B&&n?p(C,D):c&&"function"==typeof C?p(Function.call,C):C,f&&v(f,F,C,u&m.U),s[F]!=C&&a(s,F,A),c&&l[F]!=C&&(l[F]=C)};D.core=e,m.F=1,m.G=2,m.S=4,m.P=8,m.B=16,m.W=32,m.U=64,m.R=128;var y=m,g=Math.ceil,w=Math.floor,b=function(u){return isNaN(u=+u)?0:(u>0?w:g)(u)},S=function(u,D){var e,r,t=String(function(u){if(null==u)throw TypeError("Can't call method on  "+u);return u}(u)),F=b(D),n=t.length;return F<0||F>=n?void 0:(e=t.charCodeAt(F))<55296||e>56319||F+1===n||(r=t.charCodeAt(F+1))<56320||r>57343?e:r-56320+(e-55296<<10)+65536};y(y.P,"String",{codePointAt:function(u){return S(this,u)}}),e.String.codePointAt;var x=Math.max,N=Math.min,P=String.fromCharCode,_=String.fromCodePoint;y(y.S+y.F*(!!_&&1!=_.length),"String",{fromCodePoint:function(u){for(var D,e=arguments,r=[],t=arguments.length,F=0;t>F;){if(D=+e[F++],C=1114111,((n=b(n=D))<0?x(n+C,0):N(n,C))!==D)throw RangeError(D+" is not a valid code point");r.push(D<65536?P(D):P(55296+((D-=65536)>>10),D%1024+56320))}var n,C;return r.join("")}}),e.String.fromCodePoint;var O,j,I,k,V,M,J,L,T,z,$,R,G,U,Z={Space_Separator:/[\u1680\u2000-\u200A\u202F\u205F\u3000]/,ID_Start:/[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/,ID_Continue:/[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/},q=function(u){return"string"==typeof u&&Z.Space_Separator.test(u)},W=function(u){return"string"==typeof u&&(u>="a"&&u<="z"||u>="A"&&u<="Z"||"$"===u||"_"===u||Z.ID_Start.test(u))},X=function(u){return"string"==typeof u&&(u>="a"&&u<="z"||u>="A"&&u<="Z"||u>="0"&&u<="9"||"$"===u||"_"===u||"‌"===u||"‍"===u||Z.ID_Continue.test(u))},H=function(u){return"string"==typeof u&&/[0-9]/.test(u)},K=function(u){return"string"==typeof u&&/[0-9A-Fa-f]/.test(u)};function Q(u,D,e){var r=u[D];if(null!=r&&"object"==typeof r)if(Array.isArray(r))for(var t=0;t<r.length;t++){var F=String(t),n=Q(r,F,e);void 0===n?delete r[F]:Object.defineProperty(r,F,{value:n,writable:!0,enumerable:!0,configurable:!0})}else for(var C in r){var A=Q(r,C,e);void 0===A?delete r[C]:Object.defineProperty(r,C,{value:A,writable:!0,enumerable:!0,configurable:!0})}return e.call(u,D,r)}function Y(){for(z="default",$="",R=!1,G=1;;){U=uu();var u=eu[z]();if(u)return u}}function uu(){if(O[k])return String.fromCodePoint(O.codePointAt(k))}function Du(){var u=uu();return"\n"===u?(V++,M=0):u?M+=u.length:M++,u&&(k+=u.length),u}var eu={default:function(){switch(U){case"\t":case"\v":case"\f":case" ":case" ":case"\ufeff":case"\n":case"\r":case"\u2028":case"\u2029":return void Du();case"/":return Du(),void(z="comment");case void 0:return Du(),ru("eof")}if(!q(U))return eu[j]();Du()},comment:function(){switch(U){case"*":return Du(),void(z="multiLineComment");case"/":return Du(),void(z="singleLineComment")}throw Eu(Du())},multiLineComment:function(){switch(U){case"*":return Du(),void(z="multiLineCommentAsterisk");case void 0:throw Eu(Du())}Du()},multiLineCommentAsterisk:function(){switch(U){case"*":return void Du();case"/":return Du(),void(z="default");case void 0:throw Eu(Du())}Du(),z="multiLineComment"},singleLineComment:function(){switch(U){case"\n":case"\r":case"\u2028":case"\u2029":return Du(),void(z="default");case void 0:return Du(),ru("eof")}Du()},value:function(){switch(U){case"{":case"[":return ru("punctuator",Du());case"n":return Du(),tu("ull"),ru("null",null);case"t":return Du(),tu("rue"),ru("boolean",!0);case"f":return Du(),tu("alse"),ru("boolean",!1);case"-":case"+":return"-"===Du()&&(G=-1),void(z="sign");case".":return $=Du(),void(z="decimalPointLeading");case"0":return $=Du(),void(z="zero");case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return $=Du(),void(z="decimalInteger");case"I":return Du(),tu("nfinity"),ru("numeric",1/0);case"N":return Du(),tu("aN"),ru("numeric",NaN);case'"':case"'":return R='"'===Du(),$="",void(z="string")}throw Eu(Du())},identifierNameStartEscape:function(){if("u"!==U)throw Eu(Du());Du();var u=Fu();switch(u){case"$":case"_":break;default:if(!W(u))throw ou()}$+=u,z="identifierName"},identifierName:function(){switch(U){case"$":case"_":case"‌":case"‍":return void($+=Du());case"\\":return Du(),void(z="identifierNameEscape")}if(!X(U))return ru("identifier",$);$+=Du()},identifierNameEscape:function(){if("u"!==U)throw Eu(Du());Du();var u=Fu();switch(u){case"$":case"_":case"‌":case"‍":break;default:if(!X(u))throw ou()}$+=u,z="identifierName"},sign:function(){switch(U){case".":return $=Du(),void(z="decimalPointLeading");case"0":return $=Du(),void(z="zero");case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return $=Du(),void(z="decimalInteger");case"I":return Du(),tu("nfinity"),ru("numeric",G*(1/0));case"N":return Du(),tu("aN"),ru("numeric",NaN)}throw Eu(Du())},zero:function(){switch(U){case".":return $+=Du(),void(z="decimalPoint");case"e":case"E":return $+=Du(),void(z="decimalExponent");case"x":case"X":return $+=Du(),void(z="hexadecimal")}return ru("numeric",0*G)},decimalInteger:function(){switch(U){case".":return $+=Du(),void(z="decimalPoint");case"e":case"E":return $+=Du(),void(z="decimalExponent")}if(!H(U))return ru("numeric",G*Number($));$+=Du()},decimalPointLeading:function(){if(H(U))return $+=Du(),void(z="decimalFraction");throw Eu(Du())},decimalPoint:function(){switch(U){case"e":case"E":return $+=Du(),void(z="decimalExponent")}return H(U)?($+=Du(),void(z="decimalFraction")):ru("numeric",G*Number($))},decimalFraction:function(){switch(U){case"e":case"E":return $+=Du(),void(z="decimalExponent")}if(!H(U))return ru("numeric",G*Number($));$+=Du()},decimalExponent:function(){switch(U){case"+":case"-":return $+=Du(),void(z="decimalExponentSign")}if(H(U))return $+=Du(),void(z="decimalExponentInteger");throw Eu(Du())},decimalExponentSign:function(){if(H(U))return $+=Du(),void(z="decimalExponentInteger");throw Eu(Du())},decimalExponentInteger:function(){if(!H(U))return ru("numeric",G*Number($));$+=Du()},hexadecimal:function(){if(K(U))return $+=Du(),void(z="hexadecimalInteger");throw Eu(Du())},hexadecimalInteger:function(){if(!K(U))return ru("numeric",G*Number($));$+=Du()},string:function(){switch(U){case"\\":return Du(),void($+=function(){switch(uu()){case"b":return Du(),"\b";case"f":return Du(),"\f";case"n":return Du(),"\n";case"r":return Du(),"\r";case"t":return Du(),"\t";case"v":return Du(),"\v";case"0":if(Du(),H(uu()))throw Eu(Du());return"\0";case"x":return Du(),function(){var u="",D=uu();if(!K(D))throw Eu(Du());if(u+=Du(),D=uu(),!K(D))throw Eu(Du());return u+=Du(),String.fromCodePoint(parseInt(u,16))}();case"u":return Du(),Fu();case"\n":case"\u2028":case"\u2029":return Du(),"";case"\r":return Du(),"\n"===uu()&&Du(),"";case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":case void 0:throw Eu(Du())}return Du()}());case'"':return R?(Du(),ru("string",$)):void($+=Du());case"'":return R?void($+=Du()):(Du(),ru("string",$));case"\n":case"\r":throw Eu(Du());case"\u2028":case"\u2029":!function(u){console.warn("JSON5: '"+au(u)+"' in strings is not valid ECMAScript; consider escaping")}(U);break;case void 0:throw Eu(Du())}$+=Du()},start:function(){switch(U){case"{":case"[":return ru("punctuator",Du())}z="value"},beforePropertyName:function(){switch(U){case"$":case"_":return $=Du(),void(z="identifierName");case"\\":return Du(),void(z="identifierNameStartEscape");case"}":return ru("punctuator",Du());case'"':case"'":return R='"'===Du(),void(z="string")}if(W(U))return $+=Du(),void(z="identifierName");throw Eu(Du())},afterPropertyName:function(){if(":"===U)return ru("punctuator",Du());throw Eu(Du())},beforePropertyValue:function(){z="value"},afterPropertyValue:function(){switch(U){case",":case"}":return ru("punctuator",Du())}throw Eu(Du())},beforeArrayValue:function(){if("]"===U)return ru("punctuator",Du());z="value"},afterArrayValue:function(){switch(U){case",":case"]":return ru("punctuator",Du())}throw Eu(Du())},end:function(){throw Eu(Du())}};function ru(u,D){return{type:u,value:D,line:V,column:M}}function tu(u){for(var D=0,e=u;D<e.length;D+=1){var r=e[D];if(uu()!==r)throw Eu(Du());Du()}}function Fu(){for(var u="",D=4;D-- >0;){var e=uu();if(!K(e))throw Eu(Du());u+=Du()}return String.fromCodePoint(parseInt(u,16))}var nu={start:function(){if("eof"===J.type)throw iu();Cu()},beforePropertyName:function(){switch(J.type){case"identifier":case"string":return L=J.value,void(j="afterPropertyName");case"punctuator":return void Au();case"eof":throw iu()}},afterPropertyName:function(){if("eof"===J.type)throw iu();j="beforePropertyValue"},beforePropertyValue:function(){if("eof"===J.type)throw iu();Cu()},beforeArrayValue:function(){if("eof"===J.type)throw iu();"punctuator"!==J.type||"]"!==J.value?Cu():Au()},afterPropertyValue:function(){if("eof"===J.type)throw iu();switch(J.value){case",":return void(j="beforePropertyName");case"}":Au()}},afterArrayValue:function(){if("eof"===J.type)throw iu();switch(J.value){case",":return void(j="beforeArrayValue");case"]":Au()}},end:function(){}};function Cu(){var u;switch(J.type){case"punctuator":switch(J.value){case"{":u={};break;case"[":u=[]}break;case"null":case"boolean":case"numeric":case"string":u=J.value}if(void 0===T)T=u;else{var D=I[I.length-1];Array.isArray(D)?D.push(u):Object.defineProperty(D,L,{value:u,writable:!0,enumerable:!0,configurable:!0})}if(null!==u&&"object"==typeof u)I.push(u),j=Array.isArray(u)?"beforeArrayValue":"beforePropertyName";else{var e=I[I.length-1];j=null==e?"end":Array.isArray(e)?"afterArrayValue":"afterPropertyValue"}}function Au(){I.pop();var u=I[I.length-1];j=null==u?"end":Array.isArray(u)?"afterArrayValue":"afterPropertyValue"}function Eu(u){return cu(void 0===u?"JSON5: invalid end of input at "+V+":"+M:"JSON5: invalid character '"+au(u)+"' at "+V+":"+M)}function iu(){return cu("JSON5: invalid end of input at "+V+":"+M)}function ou(){return cu("JSON5: invalid identifier character at "+V+":"+(M-=5))}function au(u){var D={"'":"\\'",'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\v":"\\v","\0":"\\0","\u2028":"\\u2028","\u2029":"\\u2029"};if(D[u])return D[u];if(u<" "){var e=u.charCodeAt(0).toString(16);return"\\x"+("00"+e).substring(e.length)}return u}function cu(u){var D=new SyntaxError(u);return D.lineNumber=V,D.columnNumber=M,D}return{parse:function(u,D){O=String(u),j="start",I=[],k=0,V=1,M=0,J=void 0,L=void 0,T=void 0;do{J=Y(),nu[j]()}while("eof"!==J.type);return"function"==typeof D?Q({"":T},"",D):T},stringify:function(u,D,e){var r,t,F,n=[],C="",A="";if(null==D||"object"!=typeof D||Array.isArray(D)||(e=D.space,F=D.quote,D=D.replacer),"function"==typeof D)t=D;else if(Array.isArray(D)){r=[];for(var E=0,i=D;E<i.length;E+=1){var o=i[E],a=void 0;"string"==typeof o?a=o:("number"==typeof o||o instanceof String||o instanceof Number)&&(a=String(o)),void 0!==a&&r.indexOf(a)<0&&r.push(a)}}return e instanceof Number?e=Number(e):e instanceof String&&(e=String(e)),"number"==typeof e?e>0&&(e=Math.min(10,Math.floor(e)),A="          ".substr(0,e)):"string"==typeof e&&(A=e.substr(0,10)),c("",{"":u});function c(u,D){var e=D[u];switch(null!=e&&("function"==typeof e.toJSON5?e=e.toJSON5(u):"function"==typeof e.toJSON&&(e=e.toJSON(u))),t&&(e=t.call(D,u,e)),e instanceof Number?e=Number(e):e instanceof String?e=String(e):e instanceof Boolean&&(e=e.valueOf()),e){case null:return"null";case!0:return"true";case!1:return"false"}return"string"==typeof e?B(e):"number"==typeof e?String(e):"object"==typeof e?Array.isArray(e)?function(u){if(n.indexOf(u)>=0)throw TypeError("Converting circular structure to JSON5");n.push(u);var D=C;C+=A;for(var e,r=[],t=0;t<u.length;t++){var F=c(String(t),u);r.push(void 0!==F?F:"null")}if(0===r.length)e="[]";else if(""===A)e="["+r.join(",")+"]";else{var E=",\n"+C,i=r.join(E);e="[\n"+C+i+",\n"+D+"]"}return n.pop(),C=D,e}(e):function(u){if(n.indexOf(u)>=0)throw TypeError("Converting circular structure to JSON5");n.push(u);var D=C;C+=A;for(var e,t,F=[],E=0,i=r||Object.keys(u);E<i.length;E+=1){var o=i[E],a=c(o,u);if(void 0!==a){var B=f(o)+":";""!==A&&(B+=" "),B+=a,F.push(B)}}if(0===F.length)e="{}";else if(""===A)e="{"+(t=F.join(","))+"}";else{var s=",\n"+C;t=F.join(s),e="{\n"+C+t+",\n"+D+"}"}return n.pop(),C=D,e}(e):void 0}function B(u){for(var D={"'":.1,'"':.2},e={"'":"\\'",'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\v":"\\v","\0":"\\0","\u2028":"\\u2028","\u2029":"\\u2029"},r="",t=0;t<u.length;t++){var n=u[t];switch(n){case"'":case'"':D[n]++,r+=n;continue;case"\0":if(H(u[t+1])){r+="\\x00";continue}}if(e[n])r+=e[n];else if(n<" "){var C=n.charCodeAt(0).toString(16);r+="\\x"+("00"+C).substring(C.length)}else r+=n}var A=F||Object.keys(D).reduce((function(u,e){return D[u]<D[e]?u:e}));return A+(r=r.replace(new RegExp(A,"g"),e[A]))+A}function f(u){if(0===u.length)return B(u);var D=String.fromCodePoint(u.codePointAt(0));if(!W(D))return B(u);for(var e=D.length;e<u.length;e++)if(!X(String.fromCodePoint(u.codePointAt(e))))return B(u);return u}}}}()}}]);