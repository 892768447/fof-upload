module.exports=function(t){var e={};function o(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}return o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=17)}([function(t,e){t.exports=flarum.core.compat.app},,,function(t,e){t.exports=flarum.core.compat.extend},,,function(t,e,o){"use strict";function n(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}o.d(e,"a",(function(){return n}))},function(t,e){t.exports=flarum.core.compat["components/TextEditor"]},,function(t,e){t.exports=flarum.core.compat["components/Post"]},function(t,e){t.exports=flarum.core.compat.Component},function(t,e){t.exports=flarum.core.compat["helpers/icon"]},function(t,e){t.exports=flarum.core.compat["components/LoadingIndicator"]},,,,,function(t,e,o){"use strict";o.r(e);var n=o(0),r=o.n(n),i=o(3),a=o(9),s=o.n(a),u=o(7),p=o.n(u),l=o(6),d=o(10),c=o.n(d),f=o(11),h=o.n(f),g=o(12),v=o.n(g),b=function(t){function e(){return t.apply(this,arguments)||this}Object(l.a)(e,t);var o=e.prototype;return o.oninit=function(e){var o=this;t.prototype.oninit.call(this,e),this.attrs.uploader.on("uploaded",(function(){o.$("form")[0].reset(),m.redraw()}))},o.view=function(){var t=this.attrs.uploader.uploading?r.a.translator.trans("fof-upload.forum.states.loading"):r.a.translator.trans("fof-upload.forum.buttons.attach");return m(".Button.hasIcon.fof-upload-button.Button--icon",{className:this.attrs.uploader.uploading?"uploading":""},[this.attrs.uploader.uploading?v.a.component({size:"tiny",className:"LoadingIndicator--inline Button-icon"}):h()("fas fa-file-upload",{className:"Button-icon"}),m("span.Button-label",t),m("form",[m("input",{type:"file",multiple:!0,onchange:this.process.bind(this)})])])},o.process=function(t){var e=this.$("input").prop("files");this.attrs.uploader.upload(e)},e}(c.a),y=function(){function t(t,e){this.upload=t,this.composerElement=e,this.handlers={},this.supportsFileDragging()&&(this.composerElement.addEventListener("dragover",this.handlers.in=this.in.bind(this)),this.composerElement.addEventListener("dragleave",this.handlers.out=this.out.bind(this)),this.composerElement.addEventListener("dragend",this.handlers.out),this.composerElement.addEventListener("drop",this.handlers.dropping=this.dropping.bind(this)),this.isDropping=this.over=!1)}var e=t.prototype;return e.supportsFileDragging=function(){var t=document.createElement("div");return("draggable"in t||"ondragstart"in t&&"ondrop"in t)&&"FormData"in window&&"FileReader"in window},e.unload=function(){this.handlers.in&&(this.composerElement.removeEventListener("dragover",this.handlers.in),this.composerElement.removeEventListener("dragleave",this.handlers.out),this.composerElement.removeEventListener("dragend",this.handlers.out),this.composerElement.removeEventListener("drop",this.handlers.dropping))},e.isNotFile=function(t){if(t.dataTransfer.items)for(var e=0;e<t.dataTransfer.items.length;e++)if("file"!==t.dataTransfer.items[e].kind)return!0;return!1},e.in=function(t){this.isNotFile(t)||(t.preventDefault(),this.over||(this.composerElement.classList.add("fof-upload-dragging"),this.over=!0))},e.out=function(t){this.isNotFile(t)||(t.preventDefault(),this.over&&(this.composerElement.classList.remove("fof-upload-dragging"),this.over=!1))},e.dropping=function(t){var e=this;this.isNotFile(t)||(t.preventDefault(),this.isDropping||(this.isDropping=!0,this.composerElement.classList.add("fof-upload-dropping"),this.upload(t.dataTransfer.files,(function(){e.composerElement.classList.remove("fof-upload-dropping"),e.isDropping=!1}))))},t}(),E=function(){function t(t,e){this.upload=t,e.addEventListener("paste",this.paste.bind(this))}return t.prototype.paste=function(t){if(t.clipboardData&&t.clipboardData.items){for(var e=t.clipboardData.items,o=[],n=0;n<e.length;n++)-1!==e[n].type.indexOf("image")&&o.push(e[n].getAsFile());o.length>0&&(t.preventDefault(),this.upload(o))}},t}(),x=function(){function t(){this.callbacks={success:[],failure:[],uploading:[],uploaded:[]},this.uploading=!1}var e=t.prototype;return e.on=function(t,e){this.callbacks[t].push(e)},e.dispatch=function(t,e){this.callbacks[t].forEach((function(t){return t(e)}))},e.upload=function(t){var e=this;this.uploading=!0,this.dispatch("uploading",t),m.redraw();for(var o=new FormData,n=0;n<t.length;n++)o.append("files[]",t[n]);return app.request({method:"POST",url:app.forum.attribute("apiUrl")+"/fof/upload",serialize:function(t){return t},body:o}).then(this.uploaded.bind(this)).catch((function(t){throw e.uploading=!1,m.redraw(),t}))},e.uploaded=function(t){var e=this;this.uploading=!1,t.forEach((function(t){return e.dispatch("success",t)})),this.dispatch("uploaded")},t}();r.a.initializers.add("fof-upload",(function(){Object(i.extend)(p.a.prototype,"oninit",(function(){this.uploader=new x})),Object(i.extend)(p.a.prototype,"controlItems",(function(t){r.a.forum.attribute("fof-upload.canUpload")&&t.add("fof-upload",b.component({uploader:this.uploader}))})),Object(i.extend)(p.a.prototype,"oncreate",(function(t,e){var o=this;if(r.a.forum.attribute("fof-upload.canUpload")){this.uploader.on("success",(function(t){o.attrs.composer.editor.insertAtCursor(t+"\n");var e=r.a.composer.isFullScreen;r.a.composer.isFullScreen=function(){return!1},o.attrs.preview(),r.a.composer.isFullScreen=e}));var n=new y((function(t){return o.uploader.upload(t)}),this.$().parents(".Composer")[0]);this.$("textarea").bind("onunload",(function(){n.unload()})),new E((function(t){return o.uploader.upload(t)}),this.$("textarea")[0])}})),Object(i.extend)(s.a.prototype,"oncreate",(function(){var t=this;this.$("[data-fof-upload-download-uuid]").unbind("click").on("click",(function(e){if(e.preventDefault(),e.stopPropagation(),r.a.forum.attribute("fof-upload.canDownload")){var o=r.a.forum.attribute("apiUrl")+"/fof/download";o+="/"+e.currentTarget.dataset.fofUploadDownloadUuid,o+="/"+t.attrs.post.id(),o+="/"+r.a.session.csrfToken,window.open(o)}else alert(r.a.translator.trans("fof-upload.forum.states.unauthorized"))}))}))}))}]);
//# sourceMappingURL=forum.js.map