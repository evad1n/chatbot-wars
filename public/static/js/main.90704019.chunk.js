(this.webpackJsonptemp=this.webpackJsonptemp||[]).push([[0],{108:function(e,t,n){},140:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(12),i=n.n(r),s=(n(108),n(26)),o=n(14),l=n(2);var j=n(186),d=n(187),b=n(67),u=n(8),x=n(182),h=n(143),O=n(185),p=[{text:"test",mood:1}];function m(){var e=Object(a.useState)(p),t=Object(u.a)(e,1)[0];return Object(a.useEffect)((function(){return function(){}}),[]),Object(l.jsx)(c.a.Fragment,{children:Object(l.jsx)(x.a,{dense:!0,children:t.map((function(e,t){return Object(l.jsx)(h.a,{children:Object(l.jsx)(O.a,{primary:e.text})},t)}))})})}var f=Object(j.a)((function(e){return{container:{paddingTop:30},title:{fontSize:30}}}));var g=n(188),v=n(189),y=n(17),S=Object(j.a)((function(e){return{container:{height:"100%",flex:1,flexDirection:"column",fontSize:30,textAlign:"center"},title:{marginTop:30,marginBottom:50},feature:{marginTop:50,flexGrow:1}}}));var w=n(190),k=n(191),C=n(192),N=n(193),T=n(222),F=n(194),W=Object(j.a)((function(e){return{root:{display:"flex"},appBar:{zIndex:e.zIndex.drawer+1,backgroundColor:e.palette.primary.dark},appBarLeft:{width:240,flexShrink:1,fontSize:30,fontWeight:500},appBarRight:{flexGrow:1,paddingLeft:20,fontSize:30},drawer:{width:240,flexShrink:0},drawerPaper:{width:240},drawerContainer:{overflow:"auto"},activeNav:{fontWeight:"bold",color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.main,"&:hover":{backgroundColor:e.palette.secondary.main}},content:{paddingTop:e.layout.nav.appBarHeight,flexGrow:1,height:"100vh",display:"flex",flexDirection:"column",overflowX:"hidden"}}}));function E(e){var t=e.routes,n=e.children,c=W(),r=Object(a.useState)("Home"),i=Object(u.a)(r,2),s=i[0],j=i[1],d=Object(o.f)();return Object(a.useEffect)((function(){var e="/"+d.pathname.split("/")[1];return j(t[e].name),function(){}}),[d,t,s]),Object(l.jsxs)("div",{className:c.root,children:[Object(l.jsx)(w.a,{}),Object(l.jsx)(k.a,{position:"fixed",className:c.appBar,children:Object(l.jsxs)(C.a,{disableGutters:!0,children:[Object(l.jsx)(b.a,{className:c.appBarLeft,variant:"h4",align:"center",noWrap:!0,children:"Chatbot Wars"}),Object(l.jsx)(N.a,{orientation:"vertical",flexItem:!0}),Object(l.jsx)(b.a,{className:c.appBarRight,variant:"h5",align:"center",children:s})]})}),Object(l.jsxs)(T.a,{className:c.drawer,variant:"permanent",classes:{paper:c.drawerPaper},children:[Object(l.jsx)(C.a,{}),Object(l.jsx)("div",{className:c.drawerContainer,children:Object(l.jsx)(x.a,{children:Object.values(t).map((function(e,t){return Object(l.jsxs)(h.a,{button:!0,exact:e.exact||!1,component:y.c,activeClassName:c.activeNav,to:e.path,children:[Object(l.jsx)(F.a,{children:Object(l.jsx)(e.icon,{})}),Object(l.jsx)(O.a,{primary:e.name})]},t)}))})})]}),Object(l.jsx)("main",{className:c.content,children:n})]})}var z=n(211),B=n(212),G=n(213),L=n(16),H=n.n(L),A=n(32),M=n(199),R=n(221),D=n(223),I=n(116).default.create({baseURL:"/api"});function Q(){return Object(l.jsx)(c.a.Fragment,{children:Object(l.jsxs)(d.a,{item:!0,container:!0,spacing:3,alignContent:"space-around",style:{textAlign:"center",height:"100%"},children:[Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(b.a,{variant:"h6",children:"That's a good start."})}),Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(b.a,{variant:"h6",children:"You can keep working on your bot anytime by going back to the workshop."})}),Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(b.a,{variant:"h6",children:"Click 'To Glory' to send your bot to the battlefield!"})})]})})}var P=n(195),V=n(224),q=n(226),J=n(218),Y=n(198),K=["Happy","Angry","Sad"];function U(e){var t,n=e.autoFocus,a=e.error,r=e.errorMessages,i=e.label,s=e.line,o=e.updateLine;return Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsx)(d.a,{item:!0,xs:9,children:Object(l.jsx)(P.a,{fullWidth:!0,children:Object(l.jsx)(V.a,{autoFocus:n||!1,value:s.text,error:a,helperText:(t=r,t.join("\n")),label:i,variant:"outlined",onChange:function(e){o({text:e.target.value})}})})}),Object(l.jsx)(d.a,{item:!0,xs:3,children:Object(l.jsxs)(P.a,{variant:"outlined",fullWidth:!0,children:[Object(l.jsx)(q.a,{children:"Mood"}),Object(l.jsx)(J.a,{variant:"outlined",label:"Mood",onChange:function(e){o({mood:e.target.value})},value:s.mood,children:K.map((function(e,t){return Object(l.jsx)(Y.a,{value:t,children:e},t)}))})]})})]})}function X(e){var t=e.value,n=e.updateHandler,r=e.setValidator,i=e.titleStyle,s=Object(a.useState)(t[0]),o=Object(u.a)(s,2),j=o[0],x=o[1],h=Object(a.useState)(!1),O=Object(u.a)(h,2),p=O[0],m=O[1],f=Object(a.useState)([]),g=Object(u.a)(f,2),v=g[0],y=g[1],S=Object(a.useCallback)((function(){var e=[],t=j.text.length>0;return t||(m(!0),e.push("Greeting must be non-empty")),y(e),n([j]),t}),[j,n]);Object(a.useEffect)((function(){r(S)}),[r,S]);return Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsx)(d.a,{item:!0,xs:12,style:i,children:Object(l.jsx)(b.a,{variant:"h5",align:"center",children:"What's your bot gonna say prior to embarassing your foes?"})}),Object(l.jsx)(U,{autoFocus:!0,error:p,errorMessages:v,label:"Greeting",line:j,updateLine:function(e){var t=e.text,n=e.mood;x({text:void 0!==t?t:j.text,mood:void 0!==n?n:j.mood})}})]})}function Z(e){var t=e.value,n=e.updateHandler,r=e.setValidator,i=e.titleStyle,s=Object(a.useState)(t),o=Object(u.a)(s,2),j=o[0],x=o[1],h=Object(a.useState)(!1),O=Object(u.a)(h,2),p=O[0],m=O[1],f=Object(a.useCallback)((function(){var e=j.length>=3&&j.length<=30;return e?n(j):m(!0),e}),[j,n]);Object(a.useEffect)((function(){r(f)}),[r,f]);return Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsx)(d.a,{item:!0,xs:12,style:i,children:Object(l.jsx)(b.a,{variant:"h5",align:"center",children:"First thing's first, give your bot a name"})}),Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(P.a,{fullWidth:!0,children:Object(l.jsx)(V.a,{autoFocus:!0,error:p,helperText:p?"Name must be between 3 and 30 characters":"",label:"Name",variant:"outlined",value:j,onChange:function(e){x(e.target.value)}})})})]})}var $="Question must be non-empty";function _(e){var t=e.value,n=e.updateHandler,r=e.setValidator,i=e.titleStyle,s=Object(a.useState)(t[0]),o=Object(u.a)(s,2),j=o[0],x=o[1],h=Object(a.useState)(t[1]),O=Object(u.a)(h,2),p=O[0],m=O[1],f=Object(a.useState)(!1),g=Object(u.a)(f,2),v=g[0],y=g[1],S=Object(a.useState)(!1),w=Object(u.a)(S,2),k=w[0],C=w[1],N=Object(a.useState)([]),T=Object(u.a)(N,2),F=T[0],W=T[1],E=Object(a.useState)([]),z=Object(u.a)(E,2),B=z[0],G=z[1],L=Object(a.useCallback)((function(){y(!1),C(!1);var e=[],t=[],a=j.text.length>0,c=p.text.length>0;return a||(e.push($),y(!0)),c||(t.push($),C(!0)),W(e),G(t),n([j,p]),a&&c}),[j,p,n]);Object(a.useEffect)((function(){r(L)}),[r,L]);return Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsx)(d.a,{item:!0,xs:12,style:i,children:Object(l.jsx)(b.a,{variant:"h5",align:"center",children:"Everyone needs a conversation starter"})}),Object(l.jsx)(U,{autoFocus:!0,label:"Question 1",error:v,errorMessages:F,line:j,updateLine:function(e){var t=e.text,n=e.mood;x({text:void 0!==t?t:j.text,mood:void 0!==n?n:j.mood})}}),Object(l.jsx)(U,{label:"Question 2",error:k,errorMessages:B,line:p,updateLine:function(e){var t=e.text,n=e.mood;m({text:void 0!==t?t:p.text,mood:void 0!==n?n:p.mood})}})]})}var ee="Response must be non-empty";function te(e){var t=e.value,n=e.updateHandler,r=e.setValidator,i=e.titleStyle,s=Object(a.useState)(t[0]),o=Object(u.a)(s,2),j=o[0],x=o[1],h=Object(a.useState)(t[1]),O=Object(u.a)(h,2),p=O[0],m=O[1],f=Object(a.useState)(!1),g=Object(u.a)(f,2),v=g[0],y=g[1],S=Object(a.useState)(!1),w=Object(u.a)(S,2),k=w[0],C=w[1],N=Object(a.useState)([]),T=Object(u.a)(N,2),F=T[0],W=T[1],E=Object(a.useState)([]),z=Object(u.a)(E,2),B=z[0],G=z[1],L=Object(a.useCallback)((function(){y(!1),C(!1);var e=[],t=[],a=j.text.length>0,c=p.text.length>0;return a||(e.push(ee),y(!0)),c||(t.push(ee),C(!0)),W(e),G(t),n([j,p]),a&&c}),[j,p,n]);Object(a.useEffect)((function(){r(L)}),[r,L]);return Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsx)(d.a,{item:!0,xs:12,style:i,children:Object(l.jsx)(b.a,{variant:"h5",align:"center",children:"Time for some trash talk"})}),Object(l.jsx)(U,{autoFocus:!0,label:"Response 1",error:v,errorMessages:F,line:j,updateLine:function(e){var t=e.text,n=e.mood;x({text:void 0!==t?t:j.text,mood:void 0!==n?n:j.mood})}}),Object(l.jsx)(U,{label:"Response 2",error:k,errorMessages:B,line:p,updateLine:function(e){var t=e.text,n=e.mood;m({text:void 0!==t?t:p.text,mood:void 0!==n?n:p.mood})}})]})}var ne=Object(j.a)((function(e){return{root:{width:"100%",height:"100%",display:"flex",flexDirection:"column",padding:20},activeStep:{color:e.palette.success.light},stepContainer:{padding:20,flexGrow:1,textAlign:"center"},stepContent:{flexGrow:1,padding:"0 !important",alignContent:"flex-start"},stepButton:{alignSelf:"flex-end",textAlign:"center",display:"flex",justifyContent:"space-evenly"}}}));var ae=n(200),ce=n(201),re=n(202),ie=n(203),se=n(63),oe=n.n(se),le=Object(j.a)((function(e){return{container:{flexGrow:1},botsContainer:{paddingTop:20,alignContent:"flex-start"},noBots:{marginTop:"20%",marginBottom:20},delete:{"&:hover":{color:"red"}},loadingContainer:{alignContent:"center"},loading:{display:"flex",alignSelf:"center",justifyContent:"center",flexGrow:1}}}));var je=Object(j.a)((function(e){return{title:{padding:"10%",fontSize:40},directions:{fontSize:20}}}));var de=n(95),be=n(219),ue=n(210),xe=n(204),he=n(144),Oe=n(205),pe=n(206),me=n(207),fe=n(208),ge=n(209),ve=Object(j.a)((function(e){return{tableRow:{height:"70%"},table:{},row:{overflowWrap:"anywhere"},delete:{"&:hover":{color:"red"}}}})),ye=["Happy","Angry","Sad"];function Se(e){var t=e.botID,n=e.lineType,r=e.lines,i=e.refresh,s=ve(),o=Object(a.useState)({text:"",mood:0}),j=Object(u.a)(o,2),b=j[0],x=j[1],h=Object(a.useState)(!1),O=Object(u.a)(h,2),p=O[0],m=O[1],f=Object(a.useState)([]),g=Object(u.a)(f,2),y=g[0],S=g[1],w=function(){var e=Object(A.a)(H.a.mark((function e(){return H.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,I.post("/bots/".concat(t,"/").concat(n),b);case 3:i(),x({text:"",mood:0}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),k=function(){var e=Object(A.a)(H.a.mark((function e(a){return H.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.delete("/bots/".concat(t,"/").concat(n,"/").concat(a));case 2:i();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsx)(d.a,{item:!0,xs:12,className:s.tableRow,children:Object(l.jsx)(xe.a,{component:he.a,children:Object(l.jsxs)(Oe.a,{className:s.table,stickyHeader:!0,children:[Object(l.jsxs)("colgroup",{children:[Object(l.jsx)("col",{style:{width:"80%"}}),Object(l.jsx)("col",{style:{width:"10%"}}),Object(l.jsx)("col",{style:{width:"10%"}})]}),Object(l.jsx)(pe.a,{children:Object(l.jsxs)(me.a,{children:[Object(l.jsx)(fe.a,{align:"center",children:"Text"}),Object(l.jsx)(fe.a,{align:"center",children:"Mood"}),Object(l.jsx)(fe.a,{align:"center",children:"Delete"})]})}),Object(l.jsx)(ge.a,{children:r.map((function(e,t){return Object(l.jsxs)(me.a,{hover:!0,className:s.row,children:[Object(l.jsx)(fe.a,{align:"left",children:e.text}),Object(l.jsx)(fe.a,{align:"center",children:ye[e.mood]}),Object(l.jsx)(fe.a,{align:"center",children:Object(l.jsx)(ie.a,{className:s.delete,onClick:function(){return k(t)},children:Object(l.jsx)(oe.a,{})})})]},t)}))})]})})}),Object(l.jsxs)(d.a,{container:!0,spacing:3,item:!0,xs:12,children:[Object(l.jsx)(U,{label:"Add ".concat(n.substr(0,-1)),error:p,errorMessages:y,line:b,updateLine:function(e){var t=e.text,n=e.mood;x({text:void 0!==t?t:b.text,mood:void 0!==n?n:b.mood})}}),Object(l.jsx)(d.a,{item:!0,xs:12,style:{textAlign:"center"},children:Object(l.jsx)(v.a,{onClick:function(){m(!1);var e=[],t=b.text.length>0;t||(e.push("Question must be non-empty"),m(!0)),S(e),t&&w()},fullWidth:!0,size:"large",variant:"contained",color:"secondary",children:"Add"})})]})]})}var we=Object(j.a)((function(e){return{name:{fontSize:30,fontWeight:600,textAlign:"center",padding:5.5},tabContainer:{padding:20,height:"100%",flexGrow:1},generalContainer:{paddingTop:30,textAlign:"center",flexGrow:1,alignContent:"flex-start"},generalSave:{alignSelf:"flex-end"}}}));function ke(e){var t=e.children,n=e.value,a=e.index,c=Object(de.a)(e,["children","value","index"]),r=we();return Object(l.jsx)("div",Object(s.a)(Object(s.a)({role:"tabpanel",hidden:n!==a,style:{height:"100%"}},c),{},{children:n===a&&Object(l.jsx)(d.a,{container:!0,className:r.tabContainer,children:t})}))}var Ce={"/":{name:"Home",path:"/",component:function(){var e=S();return Object(l.jsxs)(g.a,{className:e.container,children:[Object(l.jsx)(b.a,{className:e.title,variant:"h4",children:"WELCOME TO CHATBOT WARS"}),Object(l.jsx)(b.a,{variant:"h6",children:"Build your own chatbot. Watch it crash and burn."}),Object(l.jsx)(v.a,{style:{marginTop:20},variant:"contained",color:"secondary",component:y.b,to:"/workshop",children:"Get Started"}),Object(l.jsxs)("div",{className:e.feature,children:[Object(l.jsx)(b.a,{variant:"h5",children:"Fight of the Day"}),Object(l.jsx)(m,{}),Object(l.jsx)("p",{children:"not yet..."})]})]})},exact:!0,icon:z.a},"/workshop":{name:"Workshop",path:"/workshop",component:function(e){var t=e.routes;return Object(l.jsx)(c.a.Fragment,{children:Object(l.jsx)(o.c,{children:t.map((function(e,t){return Object(l.jsx)(o.a,{exact:!0,path:e.path,children:Object(l.jsx)(e.component,{})},t)}))})})},icon:B.a,routes:[{path:"/workshop/",component:function(){var e=je();return Object(l.jsx)(c.a.Fragment,{children:Object(l.jsxs)(d.a,{container:!0,spacing:3,direction:"row",children:[Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(b.a,{className:e.title,align:"center",children:"WELCOME TO THE WORKSHOP"})}),Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(b.a,{className:e.directions,align:"center",children:"Start off by creating a bot"})}),Object(l.jsx)(d.a,{item:!0,xs:5,style:{margin:"auto"},children:Object(l.jsx)(v.a,{component:y.b,to:"/workshop/create",style:{fontSize:20},fullWidth:!0,size:"large",variant:"contained",color:"secondary",children:"Create"})}),Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(b.a,{className:e.directions,align:"center",children:"Or keep working on existing ones"})}),Object(l.jsx)(d.a,{item:!0,xs:5,style:{margin:"auto"},children:Object(l.jsx)(v.a,{component:y.b,to:"/workshop/edit",style:{fontSize:20},fullWidth:!0,size:"large",variant:"contained",color:"secondary",children:"Edit"})})]})})}},{path:"/workshop/create",component:function(){var e=ne(),t=Object(a.useState)(0),n=Object(u.a)(t,2),r=n[0],i=n[1],o=Object(a.useState)(new Set),j=Object(u.a)(o,2),x=j[0],h=j[1],O=function(){return x.size===U.length},p=function(e){return function(){x.has(e)&&i(e)}},m=function(){var e=new Set(x);if(!U[r].validate())return e.delete(r),void h(e);e.add(r),h(e),x.size!==U.length&&i(r+1)};function f(e){return x.has(e)}var g=Object(a.useState)(null),S=Object(u.a)(g,2),w=S[0],k=S[1],C=Object(a.useState)(""),N=Object(u.a)(C,2),T=N[0],F=N[1],W=Object(a.useState)([{text:"",mood:0}]),E=Object(u.a)(W,2),z=E[0],B=E[1],G=Object(a.useState)([{text:"",mood:0},{text:"",mood:0}]),L=Object(u.a)(G,2),P=L[0],V=L[1],q=Object(a.useState)([{text:"",mood:0},{text:"",mood:0}]),J=Object(u.a)(q,2),Y=J[0],K=J[1],U=[{title:"Name",component:Z,value:T,handler:F},{title:"Greetings",component:X,value:z,handler:B},{title:"Questions",component:_,value:P,handler:V},{title:"Responses",component:te,value:Y,handler:K},{title:"Finalize",component:Q,value:T,handler:null,validate:function(){return!0}}],$=function(){var e=Object(A.a)(H.a.mark((function e(){var t,n;return H.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={name:T,greetings:z,questions:P,responses:Y},console.log(t),e.next=4,I.post("/bots",t);case 4:n=e.sent,k(n.data.id),console.log(JSON.stringify(n.data));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(l.jsxs)("div",{className:e.root,children:[!O()&&Object(l.jsx)(D.a,{alternativeLabel:!0,nonLinear:!0,activeStep:r,children:U.map((function(e,t){return Object(l.jsx)(M.a,Object(s.a)(Object(s.a)({active:r===t},{}),{},{children:Object(l.jsx)(R.a,Object(s.a)(Object(s.a)({disabled:r!==t&&!f(t),onClick:p(t),completed:r!==t&&f(t)},{}),{},{children:e.title}))}),e.title)}))}),Object(l.jsx)(d.a,{container:!0,direction:"row",spacing:3,className:e.stepContainer,children:O()?Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(b.a,{variant:"h4",children:"Bot created successfully!"})}),Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(v.a,{to:"/workshop/edit/".concat(w),component:y.b,variant:"contained",color:"secondary",children:"See it in the workshop"})})]}):Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsx)(d.a,{container:!0,spacing:3,item:!0,xs:12,className:e.stepContent,children:c.a.createElement(U[r].component,{value:U[r].value,updateHandler:U[r].handler,setValidator:function(e){return U[r].validate=e},titleStyle:{padding:"30px 0px"}})}),Object(l.jsxs)(d.a,{item:!0,xs:12,className:e.stepButton,children:[Object(l.jsx)(v.a,{disabled:0===r,onClick:function(){i(r-1)},size:"large",variant:"contained",color:"secondary",children:"Back"}),r!==U.length-1?Object(l.jsx)(v.a,{onClick:m,size:"large",variant:"contained",color:"secondary",children:"Next"}):Object(l.jsx)(v.a,{onClick:function(){$(),m()},size:"large",variant:"contained",color:"secondary",children:"To Glory"})]})]})})]})}},{path:"/workshop/edit",component:function(){var e=le(),t=Object(a.useState)(!0),n=Object(u.a)(t,2),r=n[0],i=n[1],s=Object(a.useState)([]),o=Object(u.a)(s,2),j=o[0],p=o[1],m=Object(a.useCallback)(Object(A.a)(H.a.mark((function e(){var t;return H.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.get("/bots");case 2:t=e.sent,p(t.data),i(!1);case 5:case"end":return e.stop()}}),e)}))),[]);Object(a.useEffect)((function(){m()}),[m]);var f=function(){var e=Object(A.a)(H.a.mark((function e(t){return H.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.delete("/bots/".concat(t));case 2:m();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(l.jsx)(d.a,{container:!0,className:e.container,children:r?Object(l.jsx)(d.a,{item:!0,xs:12,className:e.loading,children:Object(l.jsx)(ae.a,{color:"secondary"})}):Object(l.jsx)(d.a,{container:!0,item:!0,xs:12,className:e.botsContainer,children:j.length>0?Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(b.a,{variant:"h5",align:"center",children:"Select a bot to edit"})}),Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsxs)(x.a,{component:"nav","aria-label":"contacts",children:[Object(l.jsx)(ce.a,{children:"Available bots"}),j.map((function(t,n){return Object(l.jsxs)(h.a,{component:y.b,to:"/workshop/edit/".concat(t.id),button:!0,children:[Object(l.jsx)(O.a,{primary:t.name}),Object(l.jsx)(re.a,{children:Object(l.jsx)(ie.a,{className:e.delete,onClick:function(){return f(t.id)},children:Object(l.jsx)(oe.a,{})})})]},n)}))]})})]}):Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsx)(d.a,{item:!0,xs:12,className:e.noBots,children:Object(l.jsx)(b.a,{variant:"h4",align:"center",children:"You haven't created any bots"})}),Object(l.jsx)(d.a,{item:!0,xs:12,style:{textAlign:"center"},children:Object(l.jsx)(v.a,{component:y.b,to:"/workshop/create",variant:"contained",color:"secondary",children:"Create a bot"})})]})})})}},{path:"/workshop/edit/:id",component:function(){var e=we(),t=c.a.useState(0),n=Object(u.a)(t,2),r=n[0],i=n[1],j=Object(a.useState)({}),x=Object(u.a)(j,2),h=x[0],O=x[1],p=Object(o.g)().id,m=Object(a.useState)(""),f=Object(u.a)(m,2),g=f[0],y=f[1],S=Object(a.useState)(!1),w=Object(u.a)(S,2),C=w[0],N=w[1],T=Object(a.useCallback)(Object(A.a)(H.a.mark((function e(){var t;return H.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.get("/bots/".concat(p));case 2:t=e.sent,O(t.data),y(t.data.name);case 5:case"end":return e.stop()}}),e)}))),[p]),F=function(){var e=Object(A.a)(H.a.mark((function e(){return H.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.put("/bots/".concat(p),Object(s.a)(Object(s.a)({},h),{},{name:g}));case 2:T();case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){T()}),[T]),Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsx)(b.a,{className:e.name,children:h.name}),Object(l.jsx)(k.a,{position:"static",children:Object(l.jsxs)(be.a,{value:r,onChange:function(e,t){i(t)},variant:"fullWidth",children:[Object(l.jsx)(ue.a,{label:"General"}),Object(l.jsx)(ue.a,{label:"Greetings"}),Object(l.jsx)(ue.a,{label:"Questions"}),Object(l.jsx)(ue.a,{label:"Responses"})]})}),Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsxs)(ke,{value:r,index:0,className:e.general,children:[Object(l.jsx)(d.a,{container:!0,spacing:3,item:!0,xs:12,className:e.generalContainer,children:Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(P.a,{fullWidth:!0,children:Object(l.jsx)(V.a,{autoFocus:!0,error:C,helperText:C?"Name must be between 3 and 30 characters":"",label:"Name",variant:"outlined",value:g,onChange:function(e){y(e.target.value)}})})})}),Object(l.jsx)(d.a,{item:!0,xs:12,className:e.generalSave,children:Object(l.jsx)(v.a,{onClick:function(){var e=g.length>=3&&g.length<=30;console.log(g),e||N(!0),e&&F()},fullWidth:!0,size:"large",variant:"contained",color:"secondary",children:"Save"})})]}),Object(l.jsx)(ke,{value:r,index:1,children:Object(l.jsx)(Se,{botID:h.id,lineType:"greetings",lines:h.greetings,refresh:T})}),Object(l.jsx)(ke,{value:r,index:2,children:Object(l.jsx)(Se,{botID:h.id,lineType:"questions",lines:h.questions,refresh:T})}),Object(l.jsx)(ke,{value:r,index:3,children:Object(l.jsx)(Se,{botID:h.id,lineType:"responses",lines:h.responses,refresh:T})})]})]})}}]},"/fight":{name:"Fight",path:"/fight",component:function(){var e=f();return Object(l.jsxs)(d.a,{container:!0,className:e.container,children:[Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(b.a,{className:e.title,align:"center",children:"WELCOME TO THE DEATH ZONE"})}),Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(m,{})})]})},icon:G.a}};function Ne(){return Object(l.jsx)(y.a,{children:Object(l.jsx)(E,{routes:Ce,children:Object(l.jsx)(o.c,{children:Object.values(Ce).map((function(e,t){return Object(l.jsx)(o.a,{exact:e.exact||!1,path:e.path,render:function(t){return Object(l.jsx)(e.component,Object(s.a)(Object(s.a)({},t),{},{routes:e.routes}))}},t)}))})})})}var Te=n(217),Fe=n(214),We=n(215),Ee=n(216),ze=Object(Fe.a)({palette:{primary:{light:We.a[300],main:We.a[600],dark:We.a[900],contrastText:"#fff"},secondary:{light:Ee.a[500],main:Ee.a[600],dark:Ee.a[800],contrastText:"#000"}},layout:{nav:{appBarHeight:64}}});function Be(){return Object(l.jsx)(Te.a,{theme:ze,children:Object(l.jsx)(Ne,{})})}var Ge=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,228)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),r(e),i(e)}))};i.a.render(Object(l.jsx)(c.a.StrictMode,{children:Object(l.jsx)(Be,{})}),document.getElementById("root")),Ge()}},[[140,1,2]]]);
//# sourceMappingURL=main.90704019.chunk.js.map