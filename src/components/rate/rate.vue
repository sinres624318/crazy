<template>
  <div :class="['crazy-rate',{'is-disabled':disabled}]"
       @mouseleave="resetCurrentValue">
    <span
      :class="['crazy-rate__item',currentValue > index?'crazy-rate-on':'crazy-rate-off',{'hover':currentHoverIndex > index}]"
      v-for="(item,index) in max"
      @mousemove="setCurrentValue(item,$event)"
      @click="confirmValue(item)"
      :key="index">
      <span class="crazy-rate-item-full icon-fav" :style="{color:voidColor}"></span>
      <span class="crazy-rate-item-part icon-favfill"
            :style="width(item,value)"></span>
    </span>
    <span v-if="showScore || showText" class="crazy-rate__text" :style="{color:textColor}">{{prompt}}</span>
  </div>
</template>

<script>
  export default {
    name: "CRate",
    inheritAttrs: false,
    data() {
      return {
        currentValue: 0,
        currentHoverIndex: -1
      }
    },
    props: {
      allowHalf: Boolean,
      showScore: Boolean,
      showText: Boolean,
      disabled: Boolean,
      textColor: {type:String,default:'#F7BA2A'},
      voidColor: {
        type: String,
        default: '#d1d2de'
      },
      lowThreshold: {
        type: Number,
        default: 2
      },
      highThreshold: {
        type: Number,
        default: 4
      },
      colors: {
        type: Array,
        default() {
          return ['#F7BA2A', '#F7BA2A', '#F7BA2A']
        }
      },
      texts: {
        type: Array,
        default: () => {
          return ['极差', '失望', '一般', '满意', '非常满意']
        }
      },
      max: {
        type: Number,
        default: 5
      },
      value: {
        type: Number,
        default: 0
      }
    },
    computed: {
      prompt() {
        if (this.showText) {
          return this.texts[Math.ceil(this.currentValue) - 1] || this.texts[this.texts.length - 1];
        }
        if (this.showScore) {
          return this.currentValue;
        }
      },
    },
    watch: {
      value(val) {
        this.currentValue = val;
      }
    },
    methods: {
      getColor(value) {
        let color = '';
        if (this.lowThreshold >= value) {
          color = this.colors[0]
        } else if (this.lowThreshold < value && this.highThreshold >= value) {
          color = this.colors[1]
        } else if (this.highThreshold < value) {
          color = this.colors[2]
        }
        return color || ''
      },
      width(item) {
        this.$emit('input', Number(this.value.toFixed(1)))
        let width = this.currentValue >= item ? 100 : this.currentValue - item < -1 ? 0 : this.currentValue.toFixed(2).replace(/^\d*\./g, '')
        return {
          width: width + '%',
          color: this.getColor(this.currentValue)
        }
      },
      confirmValue() {
        if (this.disabled) return;
        this.$emit('input', this.currentValue);
        this.$emit('change', this.currentValue);
      },
      setCurrentValue(value, event) {
        if (this.disabled) return;
        this.currentValue = this.allowHalf && event.target.offsetWidth >= event.offsetX * 2 ? value - 0.5 : value;
        this.currentHoverIndex = value;
      },
      resetCurrentValue() {
        this.currentValue = this.value;
        this.currentHoverIndex = -1;
      }
    },
    created() {
      this.resetCurrentValue();
    }
  }
</script>

<style lang="less" scoped>
  .crazy-rate {
    user-select: none;

    &.is-disabled {
      .crazy-rate__item {
        cursor: auto;
      }
    }

    .crazy-rate__item {
      display: inline-block;
      text-align: center;
      cursor: pointer;
      position: relative;
      font-size: 20px;
      margin-right: 5px;

      .crazy-rate-item-full {
        display: block;
        pointer-events: none;
        height: 100%;
        font-family: crazy, serif;
      }

      .crazy-rate-item-part {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        font-family: crazy, serif;
      }
    }
  }
</style>
