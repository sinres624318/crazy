<script>
  import tabNav from './tab-nav'

  export default {
    name: "CTabs",
    inheritAttrs: false,
    components: {
      tabNav
    },
    data() {
      return {
        navData: []
      }
    },
    methods: {
      change(value) {
        this.$emit('change', value);
      },
      disposeNavData() {
        if (!this.$slots.default) return;
        this.navData = this.$slots.default.filter(vnode => {
          return vnode.tag && vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'CTabItem'
        });
      }
    },
    created() {
      this.disposeNavData()
    },
    render(h) {
      let {navData, change} = this;
      return (
        <div class="crazy-tabs">
          <tab-nav navData={navData} onChange={change}></tab-nav>
        </div>
      )
    }
  }
</script>

<style lang="less" src="./tabs.less"></style>
