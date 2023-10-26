<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";

	/*每个页面公共css，上面不能加 scoped */
	view,
	text,scroll-view {
		box-sizing: border-box;
	}

	.safe-area-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
		background: #fff;
	}
</style>