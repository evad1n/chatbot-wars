(this.webpackJsonptemp=this.webpackJsonptemp||[]).push([[0],{122:function(e,t,n){},154:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(12),s=n.n(r),i=(n(122),n(28)),o=n(15),l=n(2);var j=n(192),d=n(198),u=n(58),b=n(101),x=n(13),h=n.n(x),O=n(96),p=n(18),m=n(7),f=n(106),g=n(199),v=n(235),y=n(230),S=n(202),w=n(203),C=n(194),k=n(204),N=n(156),T=n(196),F=n(130).default.create({baseURL:"/api"}),B=["Happy","Angry","Sad"],M=F,W=n(229),L=n(197),z=Object(j.a)((function(e){return{container:{flexGrow:1,maxHeight:"100%"},line:{display:"flex"},name:{fontWeight:700}}}));function E(e){var t=e.roomHash,n=e.scrollContainerRef,r=z(),s=Object(a.useRef)(null),i=Object(a.useState)([]),o=Object(m.a)(i,2),j=o[0],d=o[1];return Object(a.useEffect)((function(){var e=n.current;s.current&&e.scrollHeight-e.clientHeight-e.scrollTop<80&&s.current.scrollIntoView({behaviour:"smooth"})}),[j.length,n]),Object(a.useEffect)((function(){var e=setInterval(Object(p.a)(h.a.mark((function e(){var n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M.get("/rooms/".concat(t));case 2:n=e.sent,d(n.data);case 4:case"end":return e.stop()}}),e)}))),1e3);return function(){clearInterval(e),M.delete("/rooms/".concat(t))}}),[t]),Object(l.jsx)(W.a,{className:r.container,children:Object(l.jsx)(C.a,{children:0===j.length?Object(l.jsx)(N.a,{children:Object(l.jsx)(T.a,{primary:"Waiting for messages..."})}):j.map((function(e,t){return Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsx)(N.a,{ref:t===j.length-1?s:null,children:Object(l.jsxs)(W.a,{className:"MuiListItemText-root MuiListItemText-multiline",children:[Object(l.jsxs)("p",{className:"MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock",children:[Object(l.jsx)("strong",{children:e.name}),": ",e.line.text]}),Object(l.jsx)("p",{className:"MuiTypography-root MuiListItemText-secondary MuiTypography-body2 MuiTypography-colorTextSecondary MuiTypography-displayBlock",children:B[e.line.mood]})]})}),t!==j.length-1&&Object(l.jsx)(L.a,{})]},t)}))})})}var G=Object(j.a)((function(e){return{container:{flexGrow:1,height:"100%",border:"1px solid #bbb"},sideBar:{borderRight:"1px solid grey",alignContent:"flex-start"},select:{padding:10,borderBottom:"1px solid grey"},addButton:{marginTop:5},notStartedContainer:{textAlign:"center",justifyContent:"center",alignContent:"center"},notStartedMsg:{textAlign:"center",fontSize:20},transcriptContainer:{overflow:"auto",maxHeight:"100%"}}}));function H(){var e=G(),t=Object(a.useRef)(null),n=Object(a.useState)([]),c=Object(m.a)(n,2),r=c[0],s=c[1],i=Object(a.useState)([]),o=Object(m.a)(i,2),j=o[0],u=o[1],x=Object(a.useState)(""),F=Object(m.a)(x,2),B=F[0],W=F[1],L=Object(a.useState)(""),z=Object(m.a)(L,2),H=z[0],A=z[1],I=Object(a.useState)(!1),R=Object(m.a)(I,2),D=R[0],P=R[1],Q=function(){var e=Object(p.a)(h.a.mark((function e(){var t,n,a,c;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M.post("/rooms");case 2:t=e.sent,W(t.data.hash),n=Object(O.a)(j),e.prev=5,n.s();case 7:if((a=n.n()).done){e.next=13;break}return c=a.value,e.next=11,M.put("/rooms/".concat(t.data.hash,"/").concat(c.id));case 11:e.next=7;break;case 13:e.next=18;break;case 15:e.prev=15,e.t0=e.catch(5),n.e(e.t0);case 18:return e.prev=18,n.f(),e.finish(18);case 21:P(!0);case 22:case"end":return e.stop()}}),e,null,[[5,15,18,21]])})));return function(){return e.apply(this,arguments)}}();Object(a.useEffect)((function(){(function(){var e=Object(p.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M.get("/bots");case 2:t=e.sent,s(t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[B]);return Object(l.jsxs)(d.a,{component:f.a,container:!0,item:!0,xs:12,className:e.container,children:[Object(l.jsxs)(d.a,{container:!0,item:!0,xs:3,className:e.sideBar,children:[Object(l.jsx)(d.a,{item:!0,xs:12,className:e.select,children:Object(l.jsxs)(g.a,{variant:"outlined",fullWidth:!0,children:[Object(l.jsx)(v.a,{children:"Add a bot"}),Object(l.jsxs)(y.a,{variant:"outlined",label:"Add a bot",onChange:function(e){A(e.target.value)},value:H,children:[Object(l.jsx)(S.a,{value:"",children:Object(l.jsx)("em",{children:"None"})}),r.map((function(e,t){return Object(l.jsx)(S.a,{value:t,children:e.name},t)}))]}),Object(l.jsx)(w.a,{onClick:function(){if(""!==H){var e=r[H];j.some((function(t){return t.id===e.id}))||(D&&M.put("/rooms/".concat(B,"/").concat(e.id)),u([].concat(Object(b.a)(j),[{name:e.name,id:e.id}])))}},variant:"contained",color:"secondary",className:e.addButton,children:"Add"})]})}),Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsxs)(C.a,{children:[Object(l.jsx)(k.a,{style:{textAlign:"center"},children:"Current Bots"}),j.map((function(e,t){return Object(l.jsx)(N.a,{children:Object(l.jsx)(T.a,{primary:e.name})},t)}))]})})]}),Object(l.jsx)(d.a,{container:!0,item:!0,xs:9,className:e.transcriptContainer,ref:t,children:D?Object(l.jsx)(E,{roomHash:B,scrollContainerRef:t}):Object(l.jsx)(d.a,{container:!0,className:e.notStartedContainer,item:!0,xs:12,children:Object(l.jsxs)(d.a,{item:!0,xs:12,children:[Object(l.jsx)("p",{className:e.notStartedMsg,children:"Start the room to see messages"}),Object(l.jsx)(w.a,{onClick:Q,variant:"contained",color:"secondary",children:"Start"})]})})})]})}var A=Object(j.a)((function(e){return{container:{paddingTop:30,flexGrow:1,alignContent:"flex-start"},title:{fontSize:30},fightZone:{flexGrow:1,padding:20,height:"80vh"}}}));var I=n(21),R=Object(j.a)((function(e){return{container:{flex:1,flexDirection:"column",fontSize:30,textAlign:"center",justifyContent:"space-around"},title:{marginTop:30,marginBottom:50},feature:{marginTop:50,flexGrow:1},button:{margin:"0 10%",marginTop:20,marginBottom:200,fontSize:30,padding:"20px 40px"}}}));var D=n(205),P=n(206),Q=n(207),V=n(237),q=n(208),J=Object(j.a)((function(e){return{root:{display:"flex"},appBar:{zIndex:e.zIndex.drawer+1,backgroundColor:e.palette.primary.dark},appBarLeft:{width:240,flexShrink:1,fontSize:30,fontWeight:500},appBarRight:{flexGrow:1,paddingLeft:20,fontSize:30},drawer:{width:240,flexShrink:0},drawerPaper:{width:240},drawerContainer:{overflow:"auto"},activeNav:{fontWeight:"bold",color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.main,"&:hover":{backgroundColor:e.palette.secondary.main}},content:{paddingTop:e.layout.nav.appBarHeight,flexGrow:1,height:"100vh",display:"flex",flexDirection:"column",overflowX:"hidden"}}}));function Z(e){var t=e.routes,n=e.children,c=J(),r=Object(a.useState)("Home"),s=Object(m.a)(r,2),i=s[0],j=s[1],d=Object(o.g)();return Object(a.useEffect)((function(){var e="/"+d.pathname.split("/")[1];return j(t[e].name),function(){}}),[d,t,i]),Object(l.jsxs)("div",{className:c.root,children:[Object(l.jsx)(D.a,{}),Object(l.jsx)(P.a,{position:"fixed",className:c.appBar,children:Object(l.jsxs)(Q.a,{disableGutters:!0,children:[Object(l.jsx)(u.a,{className:c.appBarLeft,variant:"h4",align:"center",noWrap:!0,children:"Chatbot Wars"}),Object(l.jsx)(L.a,{orientation:"vertical",flexItem:!0}),Object(l.jsx)(u.a,{className:c.appBarRight,variant:"h5",align:"center",children:i})]})}),Object(l.jsxs)(V.a,{className:c.drawer,variant:"permanent",classes:{paper:c.drawerPaper},children:[Object(l.jsx)(Q.a,{}),Object(l.jsx)("div",{className:c.drawerContainer,children:Object(l.jsx)(C.a,{children:Object.values(t).map((function(e,t){return Object(l.jsxs)(N.a,{button:!0,exact:e.exact||!1,component:I.c,activeClassName:c.activeNav,to:e.path,children:[Object(l.jsx)(q.a,{children:Object(l.jsx)(e.icon,{})}),Object(l.jsx)(T.a,{primary:e.name})]},t)}))})})]}),Object(l.jsx)("main",{className:c.content,children:n})]})}var K=n(222),Y=n(223),U=n(224),X=n(209),$=n(232),_=n(233);function ee(){return Object(l.jsx)(c.a.Fragment,{children:Object(l.jsxs)(d.a,{item:!0,container:!0,spacing:3,alignContent:"space-around",style:{textAlign:"center",height:"100%"},children:[Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(u.a,{variant:"h6",children:"That's a good start."})}),Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(u.a,{variant:"h6",children:"You can keep working on your bot anytime by going back to the workshop."})}),Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(u.a,{variant:"h6",children:"Click 'To Glory' to send your bot to the battlefield!"})})]})})}var te=n(238);function ne(e){var t,n=e.autoFocus,a=e.error,r=e.errorMessages,s=e.label,i=e.line,o=e.updateLine;return Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsx)(d.a,{item:!0,xs:9,children:Object(l.jsx)(g.a,{fullWidth:!0,children:Object(l.jsx)(te.a,{autoFocus:n||!1,value:i.text,error:a,helperText:(t=r,t.join("\n")),label:s,variant:"outlined",onChange:function(e){o({text:e.target.value})}})})}),Object(l.jsx)(d.a,{item:!0,xs:3,children:Object(l.jsxs)(g.a,{variant:"outlined",fullWidth:!0,children:[Object(l.jsx)(v.a,{children:"Mood"}),Object(l.jsx)(y.a,{variant:"outlined",label:"Mood",onChange:function(e){o({mood:e.target.value})},value:i.mood,children:B.map((function(e,t){return Object(l.jsx)(S.a,{value:t,children:e},t)}))})]})})]})}function ae(e){var t=e.value,n=e.updateHandler,r=e.setValidator,s=e.titleStyle,i=Object(a.useState)(t[0]),o=Object(m.a)(i,2),j=o[0],b=o[1],x=Object(a.useState)(!1),h=Object(m.a)(x,2),O=h[0],p=h[1],f=Object(a.useState)([]),g=Object(m.a)(f,2),v=g[0],y=g[1],S=Object(a.useCallback)((function(){var e=[],t=j.text.length>0;return t||(p(!0),e.push("Greeting must be non-empty")),y(e),n([j]),t}),[j,n]);Object(a.useEffect)((function(){r(S)}),[r,S]);return Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsx)(d.a,{item:!0,xs:12,style:s,children:Object(l.jsx)(u.a,{variant:"h5",align:"center",children:"What's your bot gonna say prior to embarassing your foes?"})}),Object(l.jsx)(ne,{autoFocus:!0,error:O,errorMessages:v,label:"Greeting",line:j,updateLine:function(e){var t=e.text,n=e.mood;b({text:void 0!==t?t:j.text,mood:void 0!==n?n:j.mood})}})]})}function ce(e){var t=e.value,n=e.updateHandler,r=e.setValidator,s=e.titleStyle,i=Object(a.useState)(t),o=Object(m.a)(i,2),j=o[0],b=o[1],x=Object(a.useState)(!1),h=Object(m.a)(x,2),O=h[0],p=h[1],f=Object(a.useCallback)((function(){var e=j.length>=3&&j.length<=30;return e?n(j):p(!0),e}),[j,n]);Object(a.useEffect)((function(){r(f)}),[r,f]);return Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsx)(d.a,{item:!0,xs:12,style:s,children:Object(l.jsx)(u.a,{variant:"h5",align:"center",children:"First thing's first, give your bot a name"})}),Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(g.a,{fullWidth:!0,children:Object(l.jsx)(te.a,{autoFocus:!0,error:O,helperText:O?"Name must be between 3 and 30 characters":"",label:"Name",variant:"outlined",value:j,onChange:function(e){b(e.target.value)}})})})]})}var re="Question must be non-empty";function se(e){var t=e.value,n=e.updateHandler,r=e.setValidator,s=e.titleStyle,i=Object(a.useState)(t[0]),o=Object(m.a)(i,2),j=o[0],b=o[1],x=Object(a.useState)(t[1]),h=Object(m.a)(x,2),O=h[0],p=h[1],f=Object(a.useState)(!1),g=Object(m.a)(f,2),v=g[0],y=g[1],S=Object(a.useState)(!1),w=Object(m.a)(S,2),C=w[0],k=w[1],N=Object(a.useState)([]),T=Object(m.a)(N,2),F=T[0],B=T[1],M=Object(a.useState)([]),W=Object(m.a)(M,2),L=W[0],z=W[1],E=Object(a.useCallback)((function(){y(!1),k(!1);var e=[],t=[],a=j.text.length>0,c=O.text.length>0;return a||(e.push(re),y(!0)),c||(t.push(re),k(!0)),B(e),z(t),n([j,O]),a&&c}),[j,O,n]);Object(a.useEffect)((function(){r(E)}),[r,E]);return Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsx)(d.a,{item:!0,xs:12,style:s,children:Object(l.jsx)(u.a,{variant:"h5",align:"center",children:"Everyone needs a conversation starter"})}),Object(l.jsx)(ne,{autoFocus:!0,label:"Question 1",error:v,errorMessages:F,line:j,updateLine:function(e){var t=e.text,n=e.mood;b({text:void 0!==t?t:j.text,mood:void 0!==n?n:j.mood})}}),Object(l.jsx)(ne,{label:"Question 2",error:C,errorMessages:L,line:O,updateLine:function(e){var t=e.text,n=e.mood;p({text:void 0!==t?t:O.text,mood:void 0!==n?n:O.mood})}})]})}var ie="Response must be non-empty";function oe(e){var t=e.value,n=e.updateHandler,r=e.setValidator,s=e.titleStyle,i=Object(a.useState)(t[0]),o=Object(m.a)(i,2),j=o[0],b=o[1],x=Object(a.useState)(t[1]),h=Object(m.a)(x,2),O=h[0],p=h[1],f=Object(a.useState)(!1),g=Object(m.a)(f,2),v=g[0],y=g[1],S=Object(a.useState)(!1),w=Object(m.a)(S,2),C=w[0],k=w[1],N=Object(a.useState)([]),T=Object(m.a)(N,2),F=T[0],B=T[1],M=Object(a.useState)([]),W=Object(m.a)(M,2),L=W[0],z=W[1],E=Object(a.useCallback)((function(){y(!1),k(!1);var e=[],t=[],a=j.text.length>0,c=O.text.length>0;return a||(e.push(ie),y(!0)),c||(t.push(ie),k(!0)),B(e),z(t),n([j,O]),a&&c}),[j,O,n]);Object(a.useEffect)((function(){r(E)}),[r,E]);return Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsx)(d.a,{item:!0,xs:12,style:s,children:Object(l.jsx)(u.a,{variant:"h5",align:"center",children:"Time for some trash talk"})}),Object(l.jsx)(ne,{autoFocus:!0,label:"Response 1",error:v,errorMessages:F,line:j,updateLine:function(e){var t=e.text,n=e.mood;b({text:void 0!==t?t:j.text,mood:void 0!==n?n:j.mood})}}),Object(l.jsx)(ne,{label:"Response 2",error:C,errorMessages:L,line:O,updateLine:function(e){var t=e.text,n=e.mood;p({text:void 0!==t?t:O.text,mood:void 0!==n?n:O.mood})}})]})}var le=Object(j.a)((function(e){return{root:{width:"100%",height:"100%",display:"flex",flexDirection:"column",padding:20},activeStep:{color:e.palette.success.light},stepContainer:{padding:20,flexGrow:1,textAlign:"center"},stepContent:{flexGrow:1,padding:"0 !important",alignContent:"flex-start"},stepButton:{alignSelf:"flex-end",textAlign:"center",display:"flex",justifyContent:"space-evenly"}}}));var je=n(214),de=n(215),ue=n(216),be=n(217),xe=n(218),he=n(219),Oe=n(220),pe=n(210),me=n(211),fe=n(212),ge=n(213),ve=n(100),ye=n.n(ve),Se=Object(j.a)({delete:{"&:hover":{color:"red"}}});function we(e){var t=e.onConfirm,n=e.type,r=Se(),s=Object(a.useState)(!1),i=Object(m.a)(s,2),o=i[0],j=i[1],d=function(){j(!1)};return Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsx)(pe.a,{className:r.delete,onClick:function(){j(!0)},children:Object(l.jsx)(ye.a,{})}),Object(l.jsxs)(me.a,{onClose:d,open:o,children:[Object(l.jsxs)(fe.a,{children:["Are you sure you want to delete this ",n,"?"]}),Object(l.jsxs)(ge.a,{style:{justifyContent:"center"},children:[Object(l.jsx)(w.a,{autoFocus:!0,onClick:d,color:"primary",children:"Cancel"}),Object(l.jsx)(w.a,{onClick:function(){t(),d()},color:"primary",className:r.delete,children:"Delete"})]})]})]})}var Ce=Object(j.a)((function(e){return{container:{flexGrow:1},botsContainer:{paddingTop:20,alignContent:"flex-start"},noBots:{marginTop:"20%",marginBottom:20},tableContainer:{padding:20},selectBot:{textDecoration:"none",color:"black",cursor:"pointer","&:hover":{color:"green"}},delete:{"&:hover":{color:"red"}},loadingContainer:{alignContent:"center"},loading:{display:"flex",alignSelf:"center",justifyContent:"center",flexGrow:1}}}));var ke=Object(j.a)((function(e){return{title:{padding:"10%",fontSize:40},directions:{fontSize:20}}}));var Ne=n(102),Te=n(231),Fe=n(221),Be=Object(j.a)((function(e){return{container:{height:"70%"},row:{overflowWrap:"break-word"},delete:{"&:hover":{color:"red"}}}}));function Me(e){var t=e.botID,n=e.lineType,r=e.lines,s=e.min,i=e.refresh,o=Be(),j=Object(a.useState)({text:"",mood:0}),u=Object(m.a)(j,2),b=u[0],x=u[1],O=Object(a.useState)(!1),g=Object(m.a)(O,2),v=g[0],y=g[1],S=Object(a.useState)([]),C=Object(m.a)(S,2),k=C[0],N=C[1],T=Object(a.useState)(!1),F=Object(m.a)(T,2),W=F[0],L=F[1],z=function(){var e=Object(p.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,M.post("/bots/".concat(t,"/").concat(n),b);case 3:i(),x({text:"",mood:0}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),E=function(){var e=Object(p.a)(h.a.mark((function e(a){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(r.length<=s)){e.next=3;break}return L(!0),e.abrupt("return");case 3:return e.next=5,M.delete("/bots/".concat(t,"/").concat(n,"/").concat(a));case 5:i();case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsxs)(me.a,{onClose:function(){return L(!1)},open:W,children:[Object(l.jsxs)(fe.a,{children:["Must have at least ",s," ",n]}),Object(l.jsx)(ge.a,{style:{justifyContent:"center"},children:Object(l.jsx)(w.a,{autoFocus:!0,onClick:function(){return L(!1)},color:"primary",children:"OK"})})]}),Object(l.jsx)(d.a,{item:!0,xs:12,className:o.container,children:Object(l.jsx)(de.a,{component:f.a,children:Object(l.jsxs)(ue.a,{stickyHeader:!0,children:[Object(l.jsxs)("colgroup",{children:[Object(l.jsx)("col",{style:{width:"80%"}}),Object(l.jsx)("col",{style:{width:"10%"}}),Object(l.jsx)("col",{style:{width:"10%"}})]}),Object(l.jsx)(be.a,{children:Object(l.jsxs)(xe.a,{children:[Object(l.jsx)(he.a,{align:"center",children:"Text"}),Object(l.jsx)(he.a,{align:"center",children:"Mood"}),Object(l.jsx)(he.a,{align:"center",children:"Delete"})]})}),Object(l.jsx)(Oe.a,{children:r.map((function(e,t){return Object(l.jsxs)(xe.a,{hover:!0,className:o.row,children:[Object(l.jsx)(he.a,{align:"left",children:e.text}),Object(l.jsx)(he.a,{align:"center",children:B[e.mood]}),Object(l.jsx)(he.a,{align:"center",children:Object(l.jsx)(we,{onConfirm:function(){return E(t)},type:"line"})})]},t)}))})]})})}),Object(l.jsxs)(d.a,{container:!0,spacing:3,item:!0,xs:12,children:[Object(l.jsx)(ne,{label:"Add ".concat(n.substr(0,-1)),error:v,errorMessages:k,line:b,updateLine:function(e){var t=e.text,n=e.mood;x({text:void 0!==t?t:b.text,mood:void 0!==n?n:b.mood})}}),Object(l.jsx)(d.a,{item:!0,xs:12,style:{textAlign:"center"},children:Object(l.jsx)(w.a,{onClick:function(){y(!1);var e=[],t=b.text.length>0;t||(e.push("Question must be non-empty"),y(!0)),N(e),t&&z()},fullWidth:!0,size:"large",variant:"contained",color:"secondary",children:"Add"})})]})]})}var We=Object(j.a)((function(e){return{name:{fontSize:30,fontWeight:600,textAlign:"center",padding:5.5},tabContainer:{padding:20,height:"100%",flexGrow:1},generalContainer:{paddingTop:30,textAlign:"center",flexGrow:1,alignContent:"flex-start"},generalSave:{alignSelf:"flex-end"},errorList:{textAlign:"center",color:"red"},loading:{display:"flex",alignSelf:"center",justifyContent:"center",flexGrow:1}}}));function Le(e){var t=e.children,n=e.value,a=e.index,c=Object(Ne.a)(e,["children","value","index"]),r=We();return Object(l.jsx)("div",Object(i.a)(Object(i.a)({role:"tabpanel",hidden:n!==a,style:{height:"100%"}},c),{},{children:n===a&&Object(l.jsx)(d.a,{container:!0,className:r.tabContainer,children:t})}))}var ze={"/":{name:"Home",path:"/",component:function(){var e=R();return Object(l.jsxs)(d.a,{container:!0,className:e.container,children:[Object(l.jsx)(u.a,{className:e.title,variant:"h4",children:"WELCOME TO CHATBOT WARS"}),Object(l.jsx)(u.a,{variant:"h6",children:"Build your own chatbot. Watch it crash and burn."}),Object(l.jsx)(w.a,{className:e.button,size:"large",variant:"contained",color:"secondary",component:I.b,to:"/workshop",children:"Get Started"})]})},exact:!0,icon:K.a},"/workshop":{name:"Workshop",path:"/workshop",component:function(e){var t=e.routes;return Object(l.jsx)(c.a.Fragment,{children:Object(l.jsx)(o.c,{children:t.map((function(e,t){return Object(l.jsx)(o.a,{exact:!0,path:e.path,children:Object(l.jsx)(e.component,{})},t)}))})})},icon:Y.a,routes:[{path:"/workshop/",component:function(){var e=ke();return Object(l.jsx)(c.a.Fragment,{children:Object(l.jsxs)(d.a,{container:!0,spacing:3,direction:"row",children:[Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(u.a,{className:e.title,align:"center",children:"WELCOME TO THE WORKSHOP"})}),Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(u.a,{className:e.directions,align:"center",children:"Start off by creating a bot"})}),Object(l.jsx)(d.a,{item:!0,xs:5,style:{margin:"auto"},children:Object(l.jsx)(w.a,{component:I.b,to:"/workshop/create",style:{fontSize:20},fullWidth:!0,size:"large",variant:"contained",color:"secondary",children:"Create"})}),Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(u.a,{className:e.directions,align:"center",children:"Or keep working on existing ones"})}),Object(l.jsx)(d.a,{item:!0,xs:5,style:{margin:"auto"},children:Object(l.jsx)(w.a,{component:I.b,to:"/workshop/edit",style:{fontSize:20},fullWidth:!0,size:"large",variant:"contained",color:"secondary",children:"Edit"})})]})})}},{path:"/workshop/create",component:function(){var e=le(),t=Object(a.useState)(0),n=Object(m.a)(t,2),r=n[0],s=n[1],o=Object(a.useState)(new Set),j=Object(m.a)(o,2),b=j[0],x=j[1],O=function(){return b.size===q.length},f=function(e){return function(){b.has(e)&&s(e)}},g=function(){var e=new Set(b);if(!q[r].validate())return e.delete(r),void x(e);e.add(r),x(e),b.size!==q.length&&s(r+1)};function v(e){return b.has(e)}var y=Object(a.useState)(null),S=Object(m.a)(y,2),C=S[0],k=S[1],N=Object(a.useState)(""),T=Object(m.a)(N,2),F=T[0],B=T[1],W=Object(a.useState)([{text:"",mood:0}]),L=Object(m.a)(W,2),z=L[0],E=L[1],G=Object(a.useState)([{text:"",mood:0},{text:"",mood:0}]),H=Object(m.a)(G,2),A=H[0],R=H[1],D=Object(a.useState)([{text:"",mood:0},{text:"",mood:0}]),P=Object(m.a)(D,2),Q=P[0],V=P[1],q=[{title:"Name",component:ce,value:F,handler:B},{title:"Greetings",component:ae,value:z,handler:E},{title:"Questions",component:se,value:A,handler:R},{title:"Responses",component:oe,value:Q,handler:V},{title:"Finalize",component:ee,value:F,handler:null,validate:function(){return!0}}],J=function(){var e=Object(p.a)(h.a.mark((function e(){var t,n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={name:F,greetings:z,questions:A,responses:Q},console.log(t),e.next=4,M.post("/bots",t);case 4:n=e.sent,k(n.data.id),console.log(JSON.stringify(n.data));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(l.jsxs)("div",{className:e.root,children:[!O()&&Object(l.jsx)(_.a,{alternativeLabel:!0,nonLinear:!0,activeStep:r,children:q.map((function(e,t){return Object(l.jsx)(X.a,Object(i.a)(Object(i.a)({active:r===t},{}),{},{children:Object(l.jsx)($.a,Object(i.a)(Object(i.a)({disabled:r!==t&&!v(t),onClick:f(t),completed:r!==t&&v(t)},{}),{},{children:e.title}))}),e.title)}))}),Object(l.jsx)(d.a,{container:!0,direction:"row",spacing:3,className:e.stepContainer,children:O()?Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(u.a,{variant:"h4",children:"Bot created successfully!"})}),Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(w.a,{to:"/workshop/edit/".concat(C),component:I.b,variant:"contained",color:"secondary",children:"See it in the workshop"})})]}):Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsx)(d.a,{container:!0,spacing:3,item:!0,xs:12,className:e.stepContent,children:c.a.createElement(q[r].component,{value:q[r].value,updateHandler:q[r].handler,setValidator:function(e){return q[r].validate=e},titleStyle:{padding:"30px 0px"}})}),Object(l.jsxs)(d.a,{item:!0,xs:12,className:e.stepButton,children:[Object(l.jsx)(w.a,{disabled:0===r,onClick:function(){s(r-1)},size:"large",variant:"contained",color:"secondary",children:"Back"}),r!==q.length-1?Object(l.jsx)(w.a,{onClick:g,size:"large",variant:"contained",color:"secondary",children:"Next"}):Object(l.jsx)(w.a,{onClick:function(){J(),g()},size:"large",variant:"contained",color:"secondary",children:"To Glory"})]})]})})]})}},{path:"/workshop/edit",component:function(){var e=Ce(),t=Object(a.useState)(!0),n=Object(m.a)(t,2),r=n[0],s=n[1],i=Object(a.useState)([]),j=Object(m.a)(i,2),b=j[0],x=j[1],O=Object(o.f)(),g=Object(a.useCallback)(Object(p.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M.get("/bots");case 2:t=e.sent,x(t.data),s(!1);case 5:case"end":return e.stop()}}),e)}))),[]);Object(a.useEffect)((function(){g()}),[g]);var v=function(){var e=Object(p.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M.delete("/bots/".concat(t));case 2:g();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(l.jsx)(d.a,{container:!0,className:e.container,children:r?Object(l.jsx)(d.a,{item:!0,xs:12,className:e.loading,children:Object(l.jsx)(je.a,{color:"secondary"})}):Object(l.jsx)(d.a,{container:!0,item:!0,xs:12,className:e.botsContainer,children:b.length>0?Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(u.a,{variant:"h5",align:"center",children:"Select a bot to edit"})}),Object(l.jsx)(d.a,{item:!0,xs:12,className:e.tableContainer,children:Object(l.jsx)(de.a,{component:f.a,children:Object(l.jsxs)(ue.a,{stickyHeader:!0,children:[Object(l.jsxs)("colgroup",{children:[Object(l.jsx)("col",{style:{width:"80%"}}),Object(l.jsx)("col",{style:{width:"20%"}})]}),Object(l.jsx)(be.a,{children:Object(l.jsxs)(xe.a,{children:[Object(l.jsx)(he.a,{children:"Name"}),Object(l.jsx)(he.a,{align:"center",children:"Delete"})]})}),Object(l.jsx)(Oe.a,{children:b.map((function(t,n){return Object(l.jsxs)(xe.a,{hover:!0,children:[Object(l.jsx)(he.a,{className:e.selectBot,onClick:function(){var e;e=t.id,O.push("/workshop/edit/".concat(e))},align:"left",children:t.name}),Object(l.jsx)(he.a,{align:"center",children:Object(l.jsx)(we,{onConfirm:function(){return v(t.id)},type:"bot"})})]},n)}))})]})})})]}):Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsx)(d.a,{item:!0,xs:12,className:e.noBots,children:Object(l.jsx)(u.a,{variant:"h4",align:"center",children:"You haven't created any bots"})}),Object(l.jsx)(d.a,{item:!0,xs:12,style:{textAlign:"center"},children:Object(l.jsx)(w.a,{component:I.b,to:"/workshop/create",variant:"contained",color:"secondary",children:"Create a bot"})})]})})})}},{path:"/workshop/edit/:id",component:function(){var e=We(),t=Object(a.useState)(!0),n=Object(m.a)(t,2),r=n[0],s=n[1],j=c.a.useState(0),b=Object(m.a)(j,2),x=b[0],O=b[1],f=Object(a.useState)({}),v=Object(m.a)(f,2),y=v[0],S=v[1],k=Object(o.h)().id,F=Object(a.useState)(""),B=Object(m.a)(F,2),W=B[0],L=B[1],z=Object(a.useState)([]),E=Object(m.a)(z,2),G=E[0],H=E[1],A=Object(a.useState)(!1),I=Object(m.a)(A,2),R=I[0],D=I[1],Q=Object(a.useState)(!1),V=Object(m.a)(Q,2),q=V[0],J=V[1],Z=Object(a.useCallback)(Object(p.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M.get("/bots/".concat(k));case 2:t=e.sent,S(t.data),L(t.data.name),s(!1);case 6:case"end":return e.stop()}}),e)}))),[k]),K=function(){var e=Object(p.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M.put("/bots/".concat(k),Object(i.a)(Object(i.a)({},y),{},{name:W}));case 2:Z();case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){Z()}),[Z]),Object(l.jsxs)(c.a.Fragment,{children:[r?Object(l.jsx)(d.a,{container:!0,style:{flexGrow:1},children:Object(l.jsx)(d.a,{item:!0,xs:12,className:e.loading,children:Object(l.jsx)(je.a,{color:"secondary"})})}):Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsx)(u.a,{className:e.name,children:y.name}),Object(l.jsx)(P.a,{position:"static",children:Object(l.jsxs)(Te.a,{value:x,onChange:function(e,t){O(t)},variant:"fullWidth",children:[Object(l.jsx)(Fe.a,{label:"General"}),Object(l.jsx)(Fe.a,{label:"Greetings"}),Object(l.jsx)(Fe.a,{label:"Questions"}),Object(l.jsx)(Fe.a,{label:"Responses"})]})}),Object(l.jsxs)(c.a.Fragment,{children:[Object(l.jsxs)(Le,{value:x,index:0,className:e.general,children:[Object(l.jsx)(d.a,{container:!0,spacing:3,item:!0,xs:12,className:e.generalContainer,children:Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(g.a,{fullWidth:!0,children:Object(l.jsx)(te.a,{autoFocus:!0,error:q,helperText:q?"Name must be between 3 and 30 characters":"",label:"Name",variant:"outlined",value:W,onChange:function(e){L(e.target.value)}})})})}),R&&Object(l.jsx)(d.a,{item:!0,xs:12,className:e.errorList,children:Object(l.jsx)(C.a,{subheader:"Please fix the following errors",children:G.map((function(t,n){return Object(l.jsx)(N.a,{children:Object(l.jsx)(T.a,{primary:t,className:e.errorList})},n)}))})}),Object(l.jsx)(d.a,{item:!0,xs:12,className:e.generalSave,children:Object(l.jsx)(w.a,{onClick:function(){var e=[],t=W.length>=3&&W.length<=30,n=y.greetings.length>=2,a=y.questions.length>=2,c=y.responses.length>=2;t||(J(!0),D(!0)),n||(e.push("Must have at least 1 greeting"),D(!0)),a||(e.push("Must have at least 2 questions"),D(!0)),c||(e.push("Must have at least 2 responses"),D(!0)),t&&n&&a&&c?K():H(e)},fullWidth:!0,size:"large",variant:"contained",color:"secondary",children:"Save"})})]}),Object(l.jsx)(Le,{value:x,index:1,children:Object(l.jsx)(Me,{botID:y.id,lineType:"greetings",lines:y.greetings,min:1,refresh:Z})}),Object(l.jsx)(Le,{value:x,index:2,children:Object(l.jsx)(Me,{botID:y.id,lineType:"questions",lines:y.questions,min:2,refresh:Z})}),Object(l.jsx)(Le,{value:x,index:3,children:Object(l.jsx)(Me,{botID:y.id,lineType:"responses",lines:y.responses,min:2,refresh:Z})})]})]})," "]})}}]},"/fight":{name:"Fight",path:"/fight",component:function(){var e=A();return Object(l.jsxs)(d.a,{container:!0,className:e.container,children:[Object(l.jsx)(d.a,{item:!0,xs:12,children:Object(l.jsx)(u.a,{className:e.title,align:"center",children:"WELCOME TO THE DEATH ZONE"})}),Object(l.jsx)(d.a,{item:!0,xs:12,className:e.fightZone,children:Object(l.jsx)(H,{})})]})},icon:U.a}};function Ee(){return Object(l.jsx)(I.a,{children:Object(l.jsx)(Z,{routes:ze,children:Object(l.jsx)(o.c,{children:Object.values(ze).map((function(e,t){return Object(l.jsx)(o.a,{exact:e.exact||!1,path:e.path,render:function(t){return Object(l.jsx)(e.component,Object(i.a)(Object(i.a)({},t),{},{routes:e.routes}))}},t)}))})})})}var Ge=n(228),He=n(225),Ae=n(226),Ie=n(227),Re=Object(He.a)({palette:{primary:{light:Ae.a[300],main:Ae.a[600],dark:Ae.a[900],contrastText:"#fff"},secondary:{light:Ie.a[500],main:Ie.a[600],dark:Ie.a[800],contrastText:"#000"}},layout:{nav:{appBarHeight:64}}});function De(){return Object(l.jsx)(Ge.a,{theme:Re,children:Object(l.jsx)(Ee,{})})}var Pe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,239)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))};s.a.render(Object(l.jsx)(c.a.StrictMode,{children:Object(l.jsx)(De,{})}),document.getElementById("root")),Pe()}},[[154,1,2]]]);
//# sourceMappingURL=main.3c1140ce.chunk.js.map