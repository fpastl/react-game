(()=>{"use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function a(e,t,a){return t&&n(e.prototype,t),a&&n(e,a),e}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&o(e,t)}function o(e,t){return(o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function c(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,a=s(e);if(t){var r=s(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return i(this,n)}}function i(t,n){return!n||"object"!==e(n)&&"function"!=typeof n?l(t):n}function l(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function s(e){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m=function(e){r(o,React.Component);var n=c(o);function o(e){var a;return t(this,o),u(l(a=n.call(this,e)),"pageChange",(function(e){a.props.ChangePage(e)})),a}return a(o,[{key:"render",value:function(){var e=this,t=null!==localStorage.getItem("BoardElements")&&null!==localStorage.getItem("Score")&&null!==localStorage.getItem("Size")&&localStorage.getItem("Elements");return React.createElement("div",{id:"MainMenu"},React.createElement("div",{onClick:function(){return e.pageChange(1)},className:"buttons"},"New game"),React.createElement("div",{onClick:t?function(){return e.pageChange(2)}:function(){return!1},className:"buttons"+(t?"":" notActive")},"Continue"),React.createElement("div",{onClick:function(){return e.pageChange(3)},className:"buttons"},"Settings"),React.createElement("div",{onClick:function(){return e.pageChange(4)},className:"buttons"},"high scores"),React.createElement("div",{onClick:function(){return e.pageChange(5)},className:"buttons"},"hot keys"))}}]),o}(),f=function(e){r(o,React.Component);var n=c(o);function o(e){var a;return t(this,o),u(l(a=n.call(this,e)),"saveSettings",(function(e){var t=a.state,n=t.Theme,r=t.Elements,o=t.BoardSize;a.props.SettingsChange(n,r,o),a.props.ChangePage(e)})),u(l(a),"settingChange",(function(e,t){switch(e){case"theme":a.setState({Theme:t});break;case"size":a.setState({BoardSize:t});break;case"elements":a.setState({Elements:t})}})),a.state={Theme:a.props.Theme,Elements:a.props.Elements,BoardSize:a.props.BoardSize},a}return a(o,[{key:"render",value:function(){for(var e=this,t=["color","iconColor","icon"],n=this.state,a=n.Theme,r=n.Elements,o=n.BoardSize,c=[],i=[],l=[],s=0;s<20;s++)c[s]=React.createElement(g,{ClassStyle:t[0]+(s%5+1)}),l[s]=React.createElement(g,{ClassStyle:t[1]+(s%5+1)}),i[s]=React.createElement(g,{ClassStyle:t[2]+(s%5+1)});return React.createElement("div",{id:"Settings"},React.createElement("div",{id:"theme",className:"ChangeBlock"},React.createElement("p",null,"Style of blocks"),React.createElement(h,{key:"t1",id:"t1",name:"theme",value:"color",ClassListLabel:"Row settingsChangerTheme",inValue:c,ChdeckedThis:a,onChange:function(){return e.settingChange("theme","color")}}),React.createElement(h,{key:"t2",id:"t2",name:"theme",value:"iconColor",ClassListLabel:"Row settingsChangerTheme",inValue:l,ChdeckedThis:a,onChange:function(){return e.settingChange("theme","iconColor")}}),React.createElement(h,{key:"t3",id:"t3",name:"theme",value:"icon",ClassListLabel:"Row settingsChangerTheme",inValue:i,ChdeckedThis:a,onChange:function(){return e.settingChange("theme","icon")}})),React.createElement("div",{id:"size",className:"Row ChangeBlock"},React.createElement("p",null,"Size of board"),React.createElement(h,{key:"e1",id:"e1",name:"size",value:[10,10],inValue:"10x10",ClassListLabel:"settingsChangerOther",ClassListDiv:" LineBlock",ChdeckedThis:o,onChange:function(){return e.settingChange("size",[10,10])}}),React.createElement(h,{key:"e2",id:"e2",name:"size",value:[15,15],inValue:"15x15",ClassListLabel:"settingsChangerOther",ClassListDiv:" LineBlock",ChdeckedThis:o,onChange:function(){return e.settingChange("size",[15,15])}}),React.createElement(h,{key:"e3",id:"e3",name:"size",value:[20,20],inValue:"20x20",ClassListLabel:"settingsChangerOther",ClassListDiv:" LineBlock",ChdeckedThis:o,onChange:function(){return e.settingChange("size",[20,20])}})),React.createElement("div",{id:"elements",className:"Row ChangeBlock"},React.createElement("p",null,"number of blocks"),React.createElement(h,{key:"s1",id:"s1",name:"elements",value:3,inValue:3,ClassListLabel:"settingsChangerOther",ClassListDiv:" LineBlock",ChdeckedThis:r,onChange:function(){return e.settingChange("elements",3)}}),React.createElement(h,{key:"s2",id:"s2",name:"elements",value:4,inValue:4,ClassListLabel:"settingsChangerOther",ClassListDiv:" LineBlock",ChdeckedThis:r,onChange:function(){return e.settingChange("elements",4)}}),React.createElement(h,{key:"s3",id:"s3",name:"elements",value:5,inValue:5,ClassListLabel:"settingsChangerOther",ClassListDiv:" LineBlock",ChdeckedThis:r,onChange:function(){return e.settingChange("elements",5)}})),React.createElement("div",{className:"buttons",onClick:function(){return e.props.ChangePage(0)}},"Go home"),React.createElement("div",{className:"buttons",onClick:function(){return e.saveSettings(0)}},"save"))}}]),o}();function h(e){var t=e.name,n=e.id,a=e.ClassListDiv,r=e.value,o=e.ClassListLabel,c=e.inValue,i=e.ChdeckedThis;return React.createElement("div",{className:"ControlChange"+(a||"")},React.createElement("input",{type:"radio",id:n,name:t,value:r,defaultChecked:JSON.stringify(i)==JSON.stringify(r),onChange:e.onChange}),React.createElement("label",{htmlFor:n,className:o},c))}function g(e){var t=e.ClassStyle;return React.createElement("div",{className:"boardCel "+t})}var d=function(e){r(o,React.Component);var n=c(o);function o(e){var a;return t(this,o),u(l(a=n.call(this,e)),"changeParam",(function(e){a.setState({Size:e})})),a.state={Size:a.props.Size},a}return a(o,[{key:"render",value:function(){var e=this,t=this.state.Size;return React.createElement("div",{id:"b",className:"lines"},React.createElement("div",{id:"size",className:"Row ChangeBlock"},React.createElement(h,{key:"e1",id:"e1",name:"size",value:[10,10],inValue:"10x10",ClassListLabel:"settingsChangerOther",ClassListDiv:" LineBlock",ChdeckedThis:t,onChange:function(){return e.changeParam([10,10])}}),React.createElement(h,{key:"e2",id:"e2",name:"size",value:[15,15],inValue:"15x15",ClassListLabel:"settingsChangerOther",ClassListDiv:" LineBlock",ChdeckedThis:t,onChange:function(){return e.changeParam([15,15])}}),React.createElement(h,{key:"e3",id:"e3",name:"size",value:[20,20],inValue:"20x20",ClassListLabel:"settingsChangerOther",ClassListDiv:" LineBlock",ChdeckedThis:t,onChange:function(){return e.changeParam([20,20])}})),React.createElement(p,{Size:t}),React.createElement("div",{className:"buttons",onClick:function(){return e.props.ChangePage(0)}},"Go home"))}}]),o}();function p(e){var t=e.Size,n=JSON.parse(localStorage.getItem("ScoreList"+t[0]+"x"+t[1])),a=[];if(null!=n){for(var r=n.length,o=0;o<r;o++)a[o]=React.createElement(y,{data:n[o],position:o+1});if(r<10)for(var c=r;c<10;c++)a[c]=React.createElement(y,{data:["aaa","0000"],position:c+1})}else for(var i=0;i<10;i++)a[i]=React.createElement(y,{data:["aaa","0000"],position:i+1});return React.createElement("table",null,React.createElement(y,{data:["Name","Score"],position:"#"}),a)}function y(e){var t=e.data,n=e.position;return React.createElement("tr",null,React.createElement("td",null,n),React.createElement("td",null,t[0]),React.createElement("td",null,t[1]))}function v(e){return React.createElement("div",{id:"b",className:"lines"},React.createElement(C,{MenuItem:"New Game",Key:"n"}),React.createElement(C,{MenuItem:"continue",Key:"c"}),React.createElement(C,{MenuItem:"settings",Key:"s"}),React.createElement(C,{MenuItem:"high scores",Key:"h"}),React.createElement(C,{MenuItem:"hot keys",Key:"k"}),React.createElement(C,{MenuItem:"go home",Key:"q"}),React.createElement("div",{className:"buttons",onClick:function(){return e.ChangePage(0)}},"Go home"))}function C(e){var t=e.MenuItem,n=e.Key;return React.createElement("div",{className:"Row HK"},React.createElement("span",{className:"MenuItem"},t+":"),React.createElement("span",{className:"key"},n))}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var E=function(e){return Math.floor(1+Math.random()*e)},S=function(e,t){for(var n=e.length-1,a=e[0].length,r=!1,o=0;o<a;o++)if(!e[n][o]){var c=R(e,o,n,1,a);if(c)for(var i=n;i>=0&&!e[i][o];i--){var l=o+c;e[i][o]=e[i][l],e[i][l]=!1;var s=i+"-"+l,u=document.getElementById(s);u.style.right,u.style.right,t.push(s),r=!0}}return r},R=function e(t,n,a,r,o){var c=n+r;return c<o&&(t[a][c]?r:e(t,n,a,r+1,o))},k=function e(t,n,a,r){var o=n-r;return o>=0&&(t[o][a]?r:e(t,n,a,r+1))},O=function(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]&&arguments[3],r=[e+"-"+t],o=n[e][t];if(w(r,o,n,0),a){var c=r.map((function(e){return e.split("-").map((function(e){return+e}))}));if(!(r.length>1))return n[c[0][0]][c[0][1]]=!1,!1;for(var i=0;i<c.length;i++)n[c[i][0]][c[i][1]]=a}return r},w=function e(t,n,a,r){var o,c,i=(o=t[r].split("-"),c=2,function(e){if(Array.isArray(e))return e}(o)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],a=!0,r=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(a=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);a=!0);}catch(e){r=!0,o=e}finally{try{a||null==i.return||i.return()}finally{if(r)throw o}}return n}}(o,c)||function(e,t){if(e){if("string"==typeof e)return b(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?b(e,t):void 0}}(o,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),l=i[0],s=i[1];l>0&&a[+l-1][s]==n&&!t.includes(+l-1+"-"+s)&&t.push(+l-1+"-"+s),s>0&&a[l][+s-1]==n&&!t.includes(l+"-"+(+s-1))&&t.push(l+"-"+(+s-1)),+l+1 in a&&a[+l+1][s]==n&&!t.includes(+l+1+"-"+s)&&t.push(+l+1+"-"+s),+s+1 in a[l]&&a[l][+s+1]==n&&!t.includes(l+"-"+(+s+1))&&t.push(l+"-"+(+s+1)),t.length>+r+1&&e(t,n,a,r+1)},L=function(e){for(var t=e,n=[],a=0,r=0;r<t.length;r++)for(var o=0;o<t[r].length;o++)if(Number.isInteger(t[r][o])){a++;var c=O(r,o,t,"c"+a);c&&(n["c"+a]=c)}return[n,t]};function N(e){return(N="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function B(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function P(e,t){return(P=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function T(e,t){return!t||"object"!==N(t)&&"function"!=typeof t?A(e):t}function A(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function z(e){return(z=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function I(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var _=new Audio("./music/effect.mp3"),M=new Audio("./music/effect_second.mp3"),K=new Audio("./music/effect_new_game.mp3");function J(e){return React.createElement("div",{className:e.class+" boardCel",onClick:e.click,onMouseOver:e.mouseOver,onMouseOut:e.mouseOut,id:e.id})}function x(e){var t,n,a=(t=React.useState("NAME"),n=2,function(e){if(Array.isArray(e))return e}(t)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],a=!0,r=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(a=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);a=!0);}catch(e){r=!0,o=e}finally{try{a||null==i.return||i.return()}finally{if(r)throw o}}return n}}(t,n)||function(e,t){if(e){if("string"==typeof e)return j(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?j(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=a[0],o=a[1],c=e.Size,i=e.Score;return React.createElement("div",{id:"endGame",className:"lines"},React.createElement("p",null,"moves are over"),React.createElement("p",null,"your score: ",i),React.createElement("p",null,"your name:",React.createElement("input",{maxLength:"7",id:"endGameName",placeholder:"name",onChange:function(e){var t=e.target.value;o(t=t||"NAME")}})," "),React.createElement("div",{className:"buttons",onClick:function(){return t="ScoreList"+c[0]+"x"+c[1],(n=JSON.parse(localStorage.getItem(t)))?(n.push([r,i]),n.sort((function(e,t){return+e[1]>+t[1]?-1:1})),n.length>10&&n.pop()):n=[[r,i]],localStorage.setItem(t,JSON.stringify(n)),localStorage.removeItem("Score"),void e.NewGame();var t,n}},"save"))}var G=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&P(e,t)}(c,React.Component);var t,n,a,r,o=(a=c,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=z(a);if(r){var n=z(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return T(this,e)});function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),I(A(t=o.call(this,e)),"calculateScore",(function(e){var n=t.state,a=n.Size,r=n.Elements;return 10*r*e+200*r*Math.round(e/(a[0]*a[1]))})),I(A(t),"SaveGame",(function(){var e=t.state,n=e.BoardElements,a=e.Score,r=e.Size,o=e.Elements;localStorage.setItem("Score",a),localStorage.setItem("BoardElements",JSON.stringify(n)),localStorage.setItem("Size",JSON.stringify(r)),localStorage.setItem("Elements",o)})),I(A(t),"updateBoard",(function(){if(t.state.Load==t.props.load){t.clearTimers(),document.getElementById("board").classList.remove("disactive");var e=t.startGenerateBoard();t.props.Effects&&K.play(),t.setState({BoardElements:e[0],ListCombo:e[1][0],ActiveElements:e[1][1],Score:0,Autoplay:!1})}else{var n=JSON.parse(localStorage.BoardElements),a=JSON.parse(localStorage.Score),r=JSON.parse(localStorage.Size),o=JSON.parse(localStorage.Elements),c=L(JSON.parse(JSON.stringify(n)));t.setState({BoardElements:n,ActiveElements:c[1],ListCombo:c[0],Score:a,Size:r,Elements:o,Load:!0})}})),I(A(t),"componentDidMount",(function(){t.AutoGameTimer=0,t.updateTimer=0,t.updateBoard()})),I(A(t),"componentWillUnmount",(function(){t.clearTimers(),document.getElementById("board").classList.remove("disactive")})),I(A(t),"clearTimers",(function(){clearTimeout(t.AutoGameTimer),clearTimeout(t.updateTimer)})),I(A(t),"startGenerateBoard",(function(){var e=function(e,t,n){e=e>5?e:6,t=t>5?t:6,n=n>=3?n:4;for(var a=new Array(e),r=0;r<e;r++){a[r]=new Array(t);for(var o=0;o<t;o++)a[r][o]=E(n)}return a}(t.state.Size[0],t.state.Size[1],t.state.Elements);return[e,L(JSON.parse(JSON.stringify(e)))]})),I(A(t),"processingCrush",(function(e){t.props.Effects&&_.play(),document.getElementById("board").classList.add("disactive");var n=JSON.parse(JSON.stringify(t.state.BoardElements)),a=t.state.ListCombo[e],r=a.length,o=function(e,t){for(var n=t.sort().map((function(e){return e.split("-").map((function(e){return+e}))})),a=[],r=[],o=0;o<n.length;o++){var c=n[o][0],i=n[o][1];e[c][i]=!1,document.getElementById(t[o]).style.visibility="hidden",r.push(t[o]),a[i]=i in a&&a[i]>c?a[i]:c}return function(e,t,n){for(var a=e[0].length,r=0;r<a;r++)if(void 0!==t[r])for(var o=1,c=t[r];c>0&&(o=k(e,c,r,o));c--){var i=c-o;e[c][r]=e[i][r],e[i][r]=!1;var l=i+"-"+r,s=document.getElementById(l);s.style.top="0px",s.style.top=15*o+"px",n.push(l)}}(e,a,r),[r,S(e,r)]}(n,a),c=L(JSON.parse(JSON.stringify(n)));t.updateTimer=setTimeout((function(){console.log("work"),function(e){for(var t=0;t<e.length;t++)document.getElementById(e[t]).removeAttribute("style")}(o[0]),o[1]&&t.props.Effects&&M.play(),t.state.Autoplay||document.getElementById("board").classList.remove("disactive"),t.setState((function(e){return{BoardElements:n,ListCombo:c[0],ActiveElements:c[1],ActiveCombo:[],Score:+e.Score+ +t.calculateScore(r)}}),(function(){return t.SaveGame()}))}),300),console.log("crusher"),console.log(t.updateTimer)})),I(A(t),"selectCombo",(function(e){t.setState({ActiveCombo:e})})),I(A(t),"outSelect",(function(){t.setState({ActiveCombo:[]})})),I(A(t),"arrayToJsx",(function(e,n,a,r,o){return e=e.map((function(e,c){var i=n+"-"+c,l=a[n][c];return React.createElement(J,{key:i,id:i,class:o+e+" "+(e?l===r?"activeCel ":"":"hidden "),click:l?function(){return t.processingCrush(l)}:function(){return!1},mouseOver:l?function(){return t.selectCombo(l)}:function(){return!1},mouseOut:l?function(){return t.outSelect()}:function(){return!1},combo:l})})),React.createElement("div",{key:n,className:"Row"},e)})),I(A(t),"autoChangeCombo",(function(){var e=t.state.ListCombo,n=Object.keys(e).length;if(n>0){var a,r,o=1;for(var c in r=E(n),e){if(o==r){a=c;break}o++}t.selectCombo(a),t.AutoGameTimer=setTimeout(t.autoCrush,300,a)}else document.getElementById("board").classList.remove("disactive"),t.setState({Autoplay:!1})})),I(A(t),"autoCrush",(function(e){t.processingCrush(e),t.AutoGameTimer=setTimeout(t.autoPlay,100)})),I(A(t),"autoPlay",(function(){t.state.Autoplay?t.AutoGameTimer=setTimeout(t.autoChangeCombo,300):t.updateBoard})),t.state={BoardElements:[],ActiveElements:[],ListCombo:[],ActiveCombo:"",Score:0,Size:[e.row,e.line],Elements:e.howElem,Load:!1,Autoplay:!1},t}return t=c,(n=[{key:"render",value:function(){for(var e=this,t=this.state,n=t.Score,a=t.ListCombo,r=t.Size,o=t.Autoplay,c=Object.keys(a).length,i=JSON.parse(JSON.stringify(this.state.BoardElements)),l=this.state.ActiveElements,s=this.state.ActiveCombo,u=0;u<i.length;u++){var m=this.props.theme;i[u]=this.arrayToJsx(i[u],u,l,s,m)}return React.createElement("div",{id:"b"},React.createElement("div",{className:"buttons",onClick:function(){return e.props.ChangePage(0)}},"Go home"),React.createElement("div",{className:"buttons",onClick:function(){return e.updateBoard()}},"new game"),React.createElement("div",{className:"buttons",onClick:function(){e.setState((function(e){return{Autoplay:!e.Autoplay}}),(function(){document.getElementById("board").classList.add("disactive"),e.autoPlay()}))}},o?"stop autoplay":"autoplay"),React.createElement(D,{Score:n,ComboCount:c}),React.createElement("div",{id:"board",className:"lines"},i,c?"":React.createElement(x,{Score:n,Size:r,NewGame:this.updateBoard})))}}])&&B(t.prototype,n),c}();function D(e){return React.createElement("div",{className:"info"},React.createElement("div",null,"Score: ",e.Score," "),React.createElement("div",null,"available moves: ",e.ComboCount))}function V(e){return(V="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function H(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function U(e,t){return(U=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function F(e,t){return!t||"object"!==V(t)&&"function"!=typeof t?Q(e):t}function Q(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function $(e){return($=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function q(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var W=["Bio Unit - Aerial.mp3","Bio Unit - Fire Flies.mp3"],X=new Audio,Y=function e(t,n,a){var r=t%a.length;n.src="./music/"+a[r],n.play(),n.onended=function(){return e(r+1,n,a)}},Z=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&U(e,t)}(c,React.Component);var t,n,a,r,o=(a=c,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=$(a);if(r){var n=$(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return F(this,e)});function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),q(Q(t=o.call(this,e)),"componentDidMount",(function(){window.addEventListener("keyup",(function(){return t.HotKeys(event)}))})),q(Q(t),"HotKeys",(function(e){if("input"!=e.target.tagName&&["KeyN","KeyC","KeyS","KeyH","KeyQ","KeyK"].includes(e.code))switch(e.code){case"KeyN":t.ChangePage(1);break;case"KeyC":null!==localStorage.getItem("BoardElements")&&null!==localStorage.getItem("Score")&&null!==localStorage.getItem("Size")&&localStorage.getItem("Elements")&&t.ChangePage(2);break;case"KeyS":t.ChangePage(3);break;case"KeyH":t.ChangePage(4);break;case"KeyK":t.ChangePage(5);break;case"KeyQ":0!=t.state.page&&t.ChangePage(0)}})),q(Q(t),"MusicChange",(function(e,n){"music"==n?(e?Y(0,X,W):X.pause(),t.setState({Sound:e})):t.setState({Effects:e})})),q(Q(t),"SelectPage",(function(){switch(t.state.Page){case 1:var e=t.state,n=e.BoardSize,a=e.Elements,r=e.Effects,o=e.Theme;return React.createElement(G,{key:"board",row:n[0],line:n[1],howElem:a,ChangePage:t.ChangePage,Effects:r,theme:o,load:!1});case 2:var c=t.state,i=c.Effects,l=c.Theme;return React.createElement(G,{key:"board",load:!0,ChangePage:t.ChangePage,Effects:i,theme:l});case 3:var s=t.state,u=s.Theme,h=s.Elements,g=s.BoardSize;return React.createElement(f,{ChangePage:t.ChangePage,Theme:u,Elements:h,BoardSize:g,SettingsChange:t.SettingsChange});case 4:return React.createElement(d,{Size:t.state.BoardSize,ChangePage:t.ChangePage});case 5:return React.createElement(v,{ChangePage:t.ChangePage});default:return React.createElement(m,{ChangePage:t.ChangePage})}})),q(Q(t),"SettingsChange",(function(e,n,a){t.setState({Theme:e,Elements:n,BoardSize:a})})),q(Q(t),"ChangePage",(function(e){t.setState({Page:e})})),t.state={Sound:!1,Effects:!1,BoardSize:[20,20],Elements:5,Page:0,Theme:"color"},t}return t=c,(n=[{key:"render",value:function(){var e=this.state.Page;return React.createElement(React.Fragment,null,React.createElement("div",{id:"sound"},1==e||2==e?React.createElement(ee,{onClick:this.MusicChange,checked:this.state.Effects,sound:"effect"}):"",React.createElement(ee,{onClick:this.MusicChange,sound:"music"})),this.SelectPage(),React.createElement(te,null))}}])&&H(t.prototype,n),c}();function ee(e){var t=e.sound;return React.createElement("label",{title:t},React.createElement("input",{checked:e.checked,type:"checkbox",onClick:function(n){e.onClick(n.target.checked,t)},className:"SoundConrol "+t}),React.createElement("span",null))}function te(){return React.createElement("footer",null,React.createElement("p",null,"Created by ",React.createElement("a",{href:"https://github.com/fpastl"},"Stas Smoliar")," / 2021"),React.createElement("a",{href:"https://rs.school/react/",className:"logoRS"},React.createElement("img",{src:"./img/rs_school.svg"})))}ReactDOM.render(React.createElement(Z,null),document.getElementById("root"))})();