<script>
  import {addResizeListener, removeResizeListener} from '../utils/resize-event';
  import getStyle from "../utils/getStyle";

  export default {
    name: "tab-nav",
    data() {
      return {
        activeData: 0,
        scrollable: false,
        disabledButton: '',
        currentLocation: 0,
        timeoutTimer: null
      }
    },
    props: {
      clickCurrent: Boolean,
      navData: {
        type: Array,
        default: []
      }
    },
    methods: {
      scrollPrev() {
        if (this.disabledButton === 'prev' || getStyle(this.$refs.navInner, 'transitionProperty') === 'transform') return;
        let navContainerSize = this.$refs.navContainer.offsetWidth;
        let moveLocation = this.currentLocation + navContainerSize;
        if (moveLocation >= 0) {
          moveLocation = 0;
        }
        this.currentLocation = moveLocation;
        this.setNavScroll();
      },
      scrollNext() {
        if (this.disabledButton === 'next' || getStyle(this.$refs.navInner, 'transitionProperty') === 'transform') return;
        let navSize = this.$refs.navInner.offsetWidth;
        let navContainerSize = this.$refs.navContainer.offsetWidth;
        let moveLocation = this.currentLocation - navContainerSize;
        if (moveLocation - navContainerSize <= -navSize) {
          moveLocation = navContainerSize - navSize;
        }
        this.currentLocation = moveLocation;
        this.setNavScroll();
      },
      setNavScroll() {
        if (this.timeoutTimer) clearTimeout(this.timeoutTimer);
        this.$refs.navInner.style.transition = 'transform 500ms'
        this.$refs.navInner.style.transform = 'translate3d(' + this.currentLocation + 'px,0,0)';
        this.clearNavInnerTransition();
        this.setButtonStatus();
      },
      clearNavInnerTransition() {
        this.timeoutTimer = setTimeout(() => {
          this.$refs.navInner.style.transition = 'none'
        }, 500);
      },
      tabClick(index, item) {
        if (!this.clickCurrent && this.activeData === index) return;
        this.activeData = index;
        this.$emit('change', item);
        this.$nextTick(this.updateLocation)
      },
      updateLocation() {
        let target = this.$el.querySelector('.active');
        if (!target) return;
        if (target.offsetLeft + this.currentLocation < 0) {
          this.currentLocation = -target.offsetLeft;
        } else if (target.offsetLeft + target.offsetWidth + this.currentLocation - this.$refs.navContainer.offsetWidth > 0) {
          this.currentLocation = -(target.offsetLeft + target.offsetWidth - this.$refs.navContainer.offsetWidth);
        }
        this.setNavScroll();
      },
      setButtonStatus() {
        if (this.currentLocation >= 0) {
          this.disabledButton = 'prev'
          return
        }
        if (this.currentLocation < 0 && this.currentLocation + this.$refs.navInner.offsetWidth - this.$refs.navContainer.offsetWidth <= 0) {
          this.disabledButton = 'next'
          return
        }
        this.disabledButton = ''
      },
      setScrollable() {
        this.scrollable = this.$refs.navInner.offsetWidth > this.$refs.navContainer.offsetWidth;
        let navSize = this.$refs.navInner.offsetWidth;
        let navContainerSize = this.$refs.navContainer.offsetWidth;
        if (this.scrollable) {
          if (navSize + this.currentLocation < navContainerSize) {
            this.currentLocation = navContainerSize - navSize;
          }
        } else {
          if (this.currentLocation > 0) this.currentLocation = 0;
        }
        this.setButtonStatus();
        this.setNavScroll();
      }
    },
    mounted() {
      this.$nextTick(this.setScrollable);
      addResizeListener(this.$el, this.setScrollable);
    },
    updated() {
      this.$nextTick(this.setScrollable);
    },
    beforeDestroy() {
      removeResizeListener(this.$el, this.setScrollable);
    },
    render(h) {
      const {
        scrollable,
        disabledButton,
        activeData,
        scrollPrev,
        scrollNext,
        tabClick
      } = this;
      let navInner = this.navData.map((item, index) => {
        return (
          <div class={{
            'crazy-tabs-nav-item': true,
            'active': activeData === index
          }}
               onClick={() => {
                 tabClick(index, item.data.attrs.value)
               }}>
            <div class="crazy-tabs-nav-item__inner">
              {item.componentOptions.children || item.data.attrs.label}
            </div>
          </div>
        )
      });
      return (
        <div class={{'crazy-tabs-nav__wrap': true, 'is-scrollable': !scrollable}}>
          <div ref="navContainer" class="crazy-tabs-nav__container">
            <div ref="navInner" class="crazy-tabs-nav__inner">{navInner}</div>
          </div>
          {scrollable ? <div
            class={{
              'icon-arrowleft': true,
              'crazy-tabs-nav__button': true,
              'crazy-tabs-nav-button__prev': true,
              'crazy-tabs-nav-button-disabled': disabledButton === 'prev'
            }}
            onClick={() => {
              scrollPrev()
            }}
          >
          </div> : null}
          {scrollable ? <div
            class={{
              'icon-arrowright': true,
              'crazy-tabs-nav__button': true,
              'crazy-tabs-nav-button__next': true,
              'crazy-tabs-nav-button-disabled': disabledButton === 'next'
            }}
            onClick={() => {
              scrollNext()
            }}
          >
          </div> : null}
        </div>
      )
    }
  }
</script>
