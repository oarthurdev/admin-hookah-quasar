(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{ec95:function(e,t,o){"use strict";o.r(t);var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("center",[o("h5",[e._v("Dashboard")])])},r=[],l={name:"Dashboard",data(){return{}},created(){let e=this;e.user.email=localStorage.getItem("email"),e.token=localStorage.getItem("token"),e.$axios.post("/user/get-photo",{email:e.user.email}).then((function(t){t.data?(e.user.photo=t.data.profile_picture,console.log(e.fullPath)):console.log("Error")})),e.$axios.post("/user/get-role",{email:e.user.email}).then((function(t){t.data?e.user.role=t.data.role_name:console.log("Error")}))}},n=l,s=o("2877"),u=Object(s["a"])(n,a,r,!1,null,null,null);t["default"]=u.exports}}]);