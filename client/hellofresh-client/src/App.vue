<template>
    <div id="app">
			<div>
			</div>
        <!-- <Skills /> -->
        <search />
				<!-- <font-awesome-icon :icon="['far', 'user-secret']" /> -->

				<!-- <hello/> -->

    </div>
</template>
<script>
// import Skills from "./components/Skills";
import search from "./components/searchbar";
// import hello from "./components/hello";
export default {
    name: "app",
    components: {
        // Skills,
				search,
				// hello
    }
};
</script>

<style scoped >
#app {
    /* background: #eeeeee;
		height: 100%; */
}
</style>
