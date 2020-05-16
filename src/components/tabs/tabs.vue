<template>
  <div class="crazy-tabs">
    <div :class="['crazy-tabs-nav__wrap',{'is-scrollable':!scrollable}]">
      <div ref="navContainer" class="crazy-tabs-nav__container">
        <div ref="navInner" class="crazy-tabs-nav__inner">
          <div :class="['crazy-tabs-nav__item',{'active':activeData === item}]" v-for="(item, index) in tabsData"
               @click="tabClick($event, index, item)">{{item+123123123}}
          </div>
        </div>
      </div>
      <div v-if="scrollable"
           @click="scrollPrev"
           :class="['crazy-tabs-nav__button', 'crazy-tabs-nav-button__prev', {'crazy-tabs-nav-button-disabled':disabledButton==='prev'}]">
        1
      </div>
      <div v-if="scrollable"
           @click="scrollNext"
           :class="['crazy-tabs-nav__button','crazy-tabs-nav-button__next',{'crazy-tabs-nav-button-disabled':disabledButton==='next'}]">
        2
      </div>
    </div>
  </div>
</template>

<script>
  import {addResizeListener} from '../utils/resize-event';
  import getStyle from "../utils/getStyle";

  export default {
    name: "CTabs",
    inheritAttrs: false,
    props: {
      clickCurrent: Boolean,
      tabsData: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        activeData: 0,
        scrollable: false,
        disabledButton: '',
        currentLocation: 0
      }
    },
    methods: {
      scrollPrev() {
        if (this.disabledButton === 'prev' || getStyle(this.$refs.navInner, 'transitionProperty') === 'transform') return;
        let navSize = this.$refs.navInner.offsetWidth;
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
      setNavScroll(isNone) {
        this.$refs.navInner.style.transition = isNone ? 'none' : 'transform 500ms'
        this.$refs.navInner.style.transform = 'translate3d(' + this.currentLocation + 'px,0,0)';
        this.clearNavInnerTransition();
        this.setButtonStatus();
      },
      clearNavInnerTransition() {
        setTimeout(() => {
          this.$refs.navInner.style.transition = 'none'
        }, 500);
      },
      tabClick(event, index, id) {
        if (!this.clickCurrent && this.activeData === id) return;
        this.activeData = id;
        let target = event.target;
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
        this.setNavScroll(true);
      }
    },
    mounted() {
      this.$nextTick(this.setScrollable);
      addResizeListener(this.$el, this.setScrollable);
    }
  }
</script>

<style lang="less" scoped>
  .clearFix {
    &::after {
      content: '';
      display: block;
      height: 0;
      overflow: hidden;
      clear: both;
    }
  }

  .crazy-tabs {

    .crazy-tabs-nav__wrap {
      user-select: none;
      padding: 10px 40px;
      position: relative;

      &.is-scrollable {
        padding-left: 0;
        padding-right: 0;
      }

      .crazy-tabs-nav__container {
        overflow: hidden;

        .crazy-tabs-nav__inner {
          white-space: nowrap;
          float: left;

          .crazy-tabs-nav__item {
            display: inline-block;
            white-space: nowrap;
            margin-right: 5px;
            background: #C0C4CC;
            cursor: pointer;

            &.active {
              background: #409EFF;
            }

            &:last-of-type {
              margin: 0;
            }
          }
        }
      }

      .crazy-tabs-nav__button {
        position: absolute;
        height: 100%;
        width: 36px;
        top: 0;
        background: #606266;
        cursor: pointer;

        &.crazy-tabs-nav-button__prev {
          left: 0;
        }

        &.crazy-tabs-nav-button__next {
          right: 0;
        }

        &.crazy-tabs-nav-button-disabled {
          cursor: no-drop;
        }
      }
    }
  }
</style>
