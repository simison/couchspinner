(this.webpackJsonpcouchspinner=this.webpackJsonpcouchspinner||[]).push([[4],{257:function(e,a,t){},259:function(e,a,t){"use strict";t.r(a);var s=t(34),n=t(0),l=t.n(n),c=t(20),r=t.n(c),o=t(247),d=t.n(o),m=(t(257),t(19)),i=t(4);d.a.setAppElement("#root"),a.default=function(e){var a=e.messages,t=e.userId,c=e.names,o=Object(n.useState)(!1),u=Object(s.a)(o,2),g=u[0],p=u[1];return l.a.createElement(i.g,null,l.a.createElement(i.e,null,"Messages"),l.a.createElement(i.b,null,a.length?l.a.createElement(l.a.Fragment,null,a.map((function(e){var a,s=function(e,a){if(e&&a)return parseInt(e.split(",").filter((function(e){return parseInt(e,10)!==a})).pop())}(null===e||void 0===e?void 0:e.user_ids_concatenated,t),n="".concat(null===e||void 0===e?void 0:e.user_ids_concatenated,"-").concat(null===e||void 0===e?void 0:e.created_at);return l.a.createElement("button",{className:"Message",key:n,onClick:function(){return e.messages.length>0&&p(e)}},l.a.createElement(i.d,{className:"Profile-reference-type",names:c,id:s}),l.a.createElement("div",{className:"Message-preview"},(null===(a=e.messages[e.messages.length-1])||void 0===a?void 0:a.body)||"Empty message."),l.a.createElement("div",null,(null===e||void 0===e?void 0:e.updated_at)&&l.a.createElement("span",{className:"Message-date"},Object(m.a)(e.updated_at)),l.a.createElement("br",null),l.a.createElement("span",{className:"Message-count"},0===e.messages.length&&"No messages.",1===e.messages.length&&"One message",e.messages.length>1&&"".concat(e.messages.length," messages"))))})),l.a.createElement(d.a,{isOpen:!!g,onRequestClose:function(){return p(!1)},contentLabel:"Message thread"},l.a.createElement("div",{className:"Message-thread"},l.a.createElement("button",{className:"Message-thread-close",onClick:function(){return p(!1)}},"\xd7"),g&&g.messages.map((function(e){return l.a.createElement("div",{className:"Message-thread-message",key:e.id},l.a.createElement("div",{className:"Message-meta"},l.a.createElement(i.d,{className:"Profile-reference-type",id:null===e||void 0===e?void 0:e.author_id,names:c,userId:t}),(null===g||void 0===g?void 0:g.updated_at)&&l.a.createElement("span",{className:"Message-date"},Object(m.a)(e.updated_at))),(null===e||void 0===e?void 0:e.body)&&l.a.createElement("div",{dangerouslySetInnerHTML:{__html:r()(null===e||void 0===e?void 0:e.body)}}),!(null===e||void 0===e?void 0:e.body)&&l.a.createElement("p",null,"Empty message."))}))))):l.a.createElement("p",null,"No messages. :-(")))}}}]);
//# sourceMappingURL=4.6e817121.chunk.js.map