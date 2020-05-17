<template>
  <div class="crazy-tabs">
    <tab-nav :nav-data="navData"></tab-nav>
  </div>
</template>

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
      disposeNavData() {
        if (!this.$slots.default) return;
        this.navData = this.$slots.default.filter(vnode => vnode.tag && vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'CTabItem');
      }
    },
    created() {
      this.disposeNavData();
    }
  }
</script>

<style lang="less">
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
      padding: 10px 24px;
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

          .crazy-tabs-nav-item {
            display: inline-block;
            white-space: nowrap;
            margin-right: 5px;
            background: #C0C4CC;
            cursor: pointer;
            padding: 12px 15px;

            .crazy-tabs-nav-item__inner {
              position: relative;
            }

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
        width: 24px;
        height: 36px;
        cursor: pointer;
        line-height: 36px;
        font-family: crazy, serif;
        transform: translateY(-50%);
        text-align: center;
        color: #b9b9b9;
        font-size: 24px;
        top: 50%;

        &.crazy-tabs-nav-button-disabled {
          color: #e0e0e0;
        }

        &:hover {
          color: #409EFF;

          &.crazy-tabs-nav-button-disabled {
            color: #e0e0e0;
          }
        }

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
