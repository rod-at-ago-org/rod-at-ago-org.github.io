(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2524],{25735:function(e,t,n){"use strict";var r,i=n(92379);function c(){return(c=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}t.Z=e=>i.createElement("svg",c({xmlns:"http://www.w3.org/2000/svg",width:14,height:14,fill:"none",viewBox:"0 0 16 16"},e),r||(r=i.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",d:"M2 8h6m0 0V2m0 6h6M8 8v6"})))},27545:function(e,t,n){"use strict";n.r(t),n.d(t,{blockContentLink:function(){return $},defaultLocale:function(){return s},excludeDraft:function(){return c},get404:function(){return x},getDocumentById:function(){return L},getDocumentBySlug:function(){return b},getDocumentPaths:function(){return j},getLocalisation:function(){return d},getSettings:function(){return y},getSlugById:function(){return k},internalLinkRefFields:function(){return v},linkResolver:function(){return m},locale:function(){return l},locales:function(){return o},localize:function(){return h},orderDraft:function(){return a},setLocale:function(){return u},slugField:function(){return p},slugs:function(){return _}});var r=n(85111);let i=function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return e?r.previewClient:r.client},c=function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return e?"":"&& !(_id in path('drafts.**'))"},a=function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return e?"|order(_updatedAt desc)":""},s={current:"en"},l={current:"en"},o={current:["en"]},u=(e,t,n)=>{e&&(l.current=e),t&&(s.current=t),n&&(o.current=n)};async function d(){let e=await r.client.fetch(`*[_type == 'locale']{'key': title, 'value': coalesce(${l.current}, title)}`),t={};return e.forEach(e=>{t[e.key]=e.value||e.key}),t}let h=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=[l.current,s.current];return Array.isArray(e)?e.map(e=>h(e)):e&&"object"==typeof e?/^locale[A-Z]/.test(e._type)?h(e[n.find(t=>e[t])])||null:Object.keys(e).reduce((n,r)=>(n[r]=-1===t.indexOf(r)?h(e[r]):e[r],n),{}):e},g=()=>`coalesce(slug.${l.current}.current, slug.${s.current}.current, '')`,f=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"/";return`coalesce(
		${e}slug.${t||l.current}.current, 
		${e}slug.${s.current}.current, 
		'${n}'
	)`},p=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;return l.current||t?`'slug': coalesce(${e}slug.${l.current||t}.current, ${e}slug.${s.current}.current)`:"slug"},_=()=>`
'slugs': {
	${o.current.map(e=>`'${e}': ${f("",e,"")}`)}
}`,v=()=>`
	${p("@.reference->")},
	'label': coalesce(label.${l.current}, @.reference->title.${l.current}),
	'docType': @.reference->_type
`,m=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"cta";return`${e} {
	...,
	_type == 'internalLink' || _type == 'internalLinkWithLabel' || selectedTab == 'internalLink' => {
		${v()},
	},
}`},$=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return`
...,
${o.current.map(t=>`
	${t}[] {
		...,
		_type == 'block' => {
			...,
			markDefs[] {
				...,
				_type == 'internalLink' => {
					${v()},
				}
			}
		},
		${e}
	`)}
}`};async function y(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return h(await i().fetch(`*[(_id in path('settings.*') ${e?'|| _id in path("drafts.settings.*")':""}) ${c(e)}] |order(_updatedAt asc) {
		...,
		_type == 'header' => {
			${m("links[]")},
			${m("cta")},
		},
		_type == 'footer' => {
			...,
			${m("links[]")},
			${m("smallLinks[]")},
			${m("ctas[]")},
			${m("legalsLink")},
			${m("socialLinks[]")},
		},
		_type == 'newsletter' => {
			...,
			optin {${$()}}
		}
	}`))}async function k(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return await i(t).fetch(`*[_id == '${e}' ${c(t)}]{
			_type,
			'slug': ${g()}
		}[0]`)}async function L(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=`*[_id == '${e}' ${c(t)}]{
		...,
		${n},
	}[0]`;return h(await i(t).fetch(r))}async function b(e,t){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";return h(await i(n).fetch(`*[_type == '${t}' && coalesce(slug.${l.current}.current, slug.${s.current}.current) == '${e}' ${c(n)}]{
			'id': slug.${s.current}.current,
			...,
			${r}
		}[0]`),["slug"])}async function j(e,t){let n=Array.isArray(t)?t:[t];return await i().fetch(`*[_type in [${n.map(e=>`'${e}'`).join(",")}] && defined(slug) ${c()}]{
			${e.map(e=>`'${e}': { 'params': {'locale': '${e}', ${p("",e)}, _updatedAt} }`).join(",")}
		}`)}async function x(e){return h(await i(e).fetch(`*[_id == 'errorPage' ${c()}]{
			'title': title.${l.current},
			image,
			homeCtaLabel
		}[0]`))}},85111:function(e,t,n){"use strict";var r=n(44675);let{createClient:i}=n(46058),c="production",a="213hidp5",s="preview.secret",l="2023-07-01",o={projectId:a,dataset:c,useCdn:!1,apiVersion:l,token:r.env.SANITY_API_TOKEN,previewSecretId:s},u=i(o),d=i({...o,perspective:"previewDrafts"}),h=i({...o,token:null,useCdn:!0});e.exports={dataset:c,projectId:a,previewSecretId:s,apiVersion:l,client:u,previewClient:d,cdnClient:h,nextRoutes:{home:"/",page:"/:slug",communityPage:"/community",opportunitiesPage:"/opportunities/",opportunityPage:"/opportunities/:slug",companiesPage:"/companies",companyPage:"/companies/:slug",articlePage:"/article/:slug",error:"/error"}}},82524:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return p}});var r=n(651),i=n(23725),c=n.n(i),a=n(92379),s=n(75214),l=n(12882),o=n(82198);let u=e=>{let{title:t,city:n,country:i,date:a,link:u=null,isDark:d=!1}=e;return(0,r.jsxs)(l.Z,{as:u?null:"article",link:u,disabled:!u,className:(0,s.cn)(c().item,d&&c().isDark,!u&&c().noLink,"container"),children:[(0,r.jsx)("div",{className:c().backdrop}),(0,r.jsxs)("div",{className:c().info,children:[(n||i)&&(0,r.jsxs)("p",{className:(0,s.cn)("hm-16 bold white",c().place),children:[n&&(0,r.jsx)("span",{children:n}),i&&(0,r.jsxs)("span",{children:[", ",i]})]}),a&&(0,r.jsx)("p",{className:(0,s.cn)("hm-16 bold grey",c().date),children:new Date(a).toLocaleDateString("en-us",{year:"numeric",month:"long",day:"numeric"})})]}),(0,r.jsx)("h3",{className:(0,s.cn)("hm-24 hd-30",c().itemTitle),children:t}),(0,r.jsx)("div",{className:c().buttonContainer,children:(0,r.jsx)(l.Z,{className:c().button,variant:"circle",children:(0,r.jsx)(o.Z,{})})})]})};var d=n(77093),h=n(25735),g=n(27545),f=n(25684),p=e=>{let{list:t=[],listLength:n=0,isDark:i=!1}=e,o=(0,a.useRef)();(0,f.Z)(o,!i);let[p,_]=(0,a.useState)(t),[v,m]=(0,a.useState)(t.length<10),[$,y]=(0,a.useTransition)(),[k,L]=(0,a.useState)(10),b=async()=>{let e=await fetch("/api/sanity/pagination",{method:"POST",body:JSON.stringify({customQuery:`
					*[_type == 'event'] | order(date asc)[${k}...${k+10}]{
						city,
						country,
						${(0,g.linkResolver)("link")},
						title,
						date,
					}
				`})}).then(e=>e.json());if(e.success&&0!==e.items.length){let t=[...p,...e.items];_(t),L(t.length),t.length===n&&m(!0)}};return(0,r.jsx)("div",{ref:o,className:(0,s.cn)(c().listContainer,i&&c().isDark),children:!!p.length&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("ul",{className:(0,s.cn)(c().list),children:p.map((e,t)=>(0,r.jsx)("li",{children:(0,r.jsx)(u,{...e,isDark:i})},t))}),!v&&(0,r.jsx)("div",{className:(0,s.cn)(c().paginationButtonContainer,"container"),children:(0,r.jsxs)(l.Z,{enableLoader:!0,loading:$,variant:"rounded",inverted:!0,disableIcon:!0,className:c().showMoreButton,onClick:()=>{y(()=>b())},children:[(0,r.jsx)(d.Z,{children:"Show more"}),(0,r.jsx)(h.Z,{width:"12",height:"12"})]})})]})})}},23725:function(e){e.exports={listContainer:"eventList_listContainer__S95XK",list:"eventList_list__5m8EW",noLink:"eventList_noLink__c7rTn",item:"eventList_item__vUveh",backdrop:"eventList_backdrop___c236",isDark:"eventList_isDark__upuJy",sectorTag:"eventList_sectorTag__Ixx1I",place:"eventList_place__tjn3u",itemTitle:"eventList_itemTitle__AOte6",info:"eventList_info__WZrq2",date:"eventList_date__ZRjxD",buttonContainer:"eventList_buttonContainer__Q5CKv",button:"eventList_button__RXCcr",paginationButtonContainer:"eventList_paginationButtonContainer__A7b3a",showMoreButton:"eventList_showMoreButton__p_5Ff"}}}]);