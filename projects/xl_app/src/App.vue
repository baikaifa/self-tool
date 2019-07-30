<template>
	<navigation>
		<router-view></router-view>
	</navigation>
</template>
<script>
export default {
	name: 'app'
}
</script>
<style type="text/css">
body,div,span,ul,li,p,h1,h2,h3,h4,h5,table,thead,tbody,tr,th,td {
	margin: 0;
	padding: 0;
}
li {
	list-style: none;
}
img {
	vertical-align: middle;
}
body {
	background: #ffffff;
}
a {
	text-decoration: none;
}
.router-link {
	text-decoration: none;
}
input {
	background: none;
	outline: none;
	border: 0px;
}
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
::-webkit-scrollbar {
	width: 0px;
	height: 0px;
}
::-webkit-scrollbar-track {
	background: transparent;
}
::-webkit-scrollbar-thumb {
	background: rgba(0, 0, 0, 0.1);
}
</style>