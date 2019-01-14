(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{125:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(13),c=a.n(l),o=(a(59),a(61),a(20)),s=a(14),i=a(15),m=a(17),u=a(16),g=a(18),h=(a(63),"https://www.omdbapi.com/?apikey=576f8801"),E=function(e,t){return fetch("".concat(h,"&s=").concat(e,"&page=").concat(t)).then(function(e){return e.json()}).catch(function(e){throw e})},p=function(e){return fetch("".concat(h,"&i=").concat(e)).then(function(e){return e.json()}).catch(function(e){throw e})},d=a(48),f=a(136),b=a(126),v=a(127),C=a(137),P=a(128),O=a(129),y=a(130),T=a(131),j=a(49),w=a.n(j),N=a(50),k=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e,t=this,a=this.props,n=a.titles,l=a.activePage,c=a.totalItemsCount,s=a.error;return r.a.createElement("div",null,!s&&r.a.createElement(b.a,{className:"mb-3"},r.a.createElement(v.a,null,r.a.createElement(N.CSVLink,{data:n,className:"btn bg-secondary"},"Export to CSV"))),r.a.createElement(b.a,null,n.map(function(e,a){return r.a.createElement(v.a,{key:a,sm:"3",className:"mb-5"},r.a.createElement(P.a,{className:"title",onClick:function(){return t.props.onGetInfo(e.imdbID)}},r.a.createElement(O.a,{className:"img-fluid",top:!0,src:e.Poster,alt:e.Title}),r.a.createElement(y.a,{className:"d-flex align-items-end"},r.a.createElement(T.a,{className:"title-name"},e.Title))))}),s&&r.a.createElement(v.a,null,s)),c>0&&r.a.createElement(b.a,null,r.a.createElement(v.a,null,r.a.createElement(w.a,(e={activePage:l,itemsCountPerPage:10,totalItemsCount:c,pageRangeDisplayed:5,onChange:this.props.onPageChange.bind(this),itemClass:"page-item",linkClass:"page-link",activeLinkClass:"active",prevPageText:"Prev",nextPageText:"Next"},Object(o.a)(e,"pageRangeDisplayed","5"),Object(o.a)(e,"hideDisabled",!0),e)))))}}]),t}(n.Component),R=a(138),S=a(132),D=a(133),x=a(134),I=a(135),M=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).toggle=function(){a.props.onToggle()},a}return Object(g.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.isOpen,a=e.title;return r.a.createElement(R.a,{isOpen:t,toggle:this.toggle,className:this.props.className},r.a.createElement(S.a,{toggle:this.toggle},a.Title),r.a.createElement(D.a,null,r.a.createElement("div",{className:"text-center title"},"N/A"!==a.Poster&&r.a.createElement("img",{src:a.Poster,alt:a.Title,className:"mb-3"})),r.a.createElement("div",{className:"px-3"},r.a.createElement("p",null,r.a.createElement("strong",null,"Plot"),r.a.createElement("br",null),a.Plot),r.a.createElement("p",null,r.a.createElement("strong",null,"Director"),r.a.createElement("br",null),a.Director),r.a.createElement("p",null,r.a.createElement("strong",null,"Actors"),r.a.createElement("br",null),a.Actors),r.a.createElement("p",null,r.a.createElement("strong",null,"Genre"),r.a.createElement("br",null),a.Genre),r.a.createElement("p",null,r.a.createElement("strong",null,"Release date"),r.a.createElement("br",null),a.Released),r.a.createElement("p",null,r.a.createElement("strong",null,"Runtime"),r.a.createElement("br",null),a.Runtime),r.a.createElement("p",null,r.a.createElement("strong",null,"Country"),r.a.createElement("br",null),a.Country),r.a.createElement("div",{className:"pb-3"},r.a.createElement("strong",null,"Ratings"),r.a.createElement("br",null),a.Ratings.map(function(e,t){return r.a.createElement("div",{key:t},e.Source,"- ",e.Value)})),r.a.createElement("p",null,r.a.createElement("strong",null,"On IMDB:"),r.a.createElement("br",null),r.a.createElement("a",{href:"http://imdb.com/title/".concat(a.imdbID),target:"_blank",rel:"noopener noreferrer"},"http://imdb.com/title/",a.imdbID)))),r.a.createElement(x.a,null,r.a.createElement(I.a,{color:"secondary",onClick:this.toggle},"Close")))}}]),t}(n.Component),B=a(53),A=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={currentTitle:"",titles:[],totalResults:0,activePage:1,totalPages:null,apiError:!1,apiErrorMsg:"",searching:!1,modal:!1,modalContent:""},a.modalToggle=function(){a.setState({modal:!a.state.modal})},a.search=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;e!==a.state.currentTitle&&a.clearContent(),e?(a.setState({currentTitle:e,searching:!0}),E(e,t).then(function(e){"True"===e.Response?a.setContent(e):a.setError(e)}).catch(function(){a.setState({apiError:!0,searching:!1})})):(a.clearContent(),a.setState({searching:!1}))},a.getTitleInfo=function(e){p(e).then(function(e){"True"===e.Response?a.setState({modalContent:e,modal:!0}):a.setError(e)}).catch(function(){a.setState({apiError:!0,searching:!1})})},a.setContent=function(e){e.totalResults?a.setState({titles:e.Search,totalResults:e.totalResults,totalPages:e.totalResults/10,searching:!1}):a.clearContent()},a.clearContent=function(){a.setState({currentTitle:"",titles:[],totalResults:0,activePage:1,totalPages:null,searching:!1,apiError:!1,apiErrorMsg:""})},a.setError=function(e){a.setState({apiError:!0,apiErrorMsg:e.Error,searching:!1})},a.handlePageChange=function(e){a.setState({activePage:e}),a.search(a.state.currentTitle,e)},a}return Object(g.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(f.a,{className:"py-5"},r.a.createElement("h1",{className:"text-center"},"OMDB search"),r.a.createElement(b.a,{className:"my-3"},r.a.createElement(v.a,null,r.a.createElement(d.Debounce,{time:"400",handler:"onChange"},r.a.createElement(C.a,{bsSize:"lg",placeholder:"Search movie, series or episodes","aria-label":"Type a movie, series or episode name to search",onChange:function(t){return e.search(t.target.value)}})))),r.a.createElement("div",{className:"text-center"},r.a.createElement(B.BeatLoader,{sizeUnit:"px",size:30,color:"#D8DBE2",loading:this.state.searching})),this.state.currentTitle&&!this.state.searching&&r.a.createElement(k,Object(o.a)({titles:this.state.titles,onGetInfo:this.getTitleInfo,error:this.state.apiErrorMsg,activePage:this.state.activePage,totalItemsCount:this.state.totalResults,onPageChange:this.handlePageChange},"error",this.state.apiErrorMsg)),this.state.modal&&r.a.createElement(M,{title:this.state.modalContent,isOpen:this.state.modal,onToggle:this.modalToggle}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},54:function(e,t,a){e.exports=a(125)},59:function(e,t,a){},63:function(e,t,a){}},[[54,2,1]]]);
//# sourceMappingURL=main.eb0dbbaf.chunk.js.map