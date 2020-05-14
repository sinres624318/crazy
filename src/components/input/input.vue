<template>
  <div
    :class="[type==='textarea'?'crazy-textarea':'crazy-input',{'crazy-input__focus':type==='number'&&isFocus},{'is-disabled':disabled}]"
    @mousedown="inputClick($event)">
    <template v-if="type!=='textarea'">
      <input
        class="crazy-input__inner"
        ref="input"
        :type="type==='number'?'text':type"
        :disabled="disabled"
        :readonly="readonly"
        v-bind="$attrs"
        @input="inputValueDispose($event.target)"
        @focus="handleFocus($event)"
        @blur="handleBlur($event)"
        @change="handleChange($event)"
        @compositionstart="compositionStart"
        @compositionend="compositionEnd($event.target)"/>
      <span v-if="wordLimitVisible && !disabled" class="crazy-input__count">
        {{ currentInputLength }}/{{ $attrs.maxlength }}
      </span>
      <div
        v-if="type==='number' && showStepButton && !disabled"
        @mousedown="inputButtonMousedown($event)"
        @mouseup="inputButtonMouseup"
        class="crazy-input-number-button__wrap">
        <span
          @mouseleave="inputButtonMouseup"
          :class="['crazy-input-number__button','crazy-input-number-button__top',{'crazy-input-number__button__mousedown':currentMousedownButton==='top'}]"></span>
        <span
          @mouseleave="inputButtonMouseup"
          :class="['crazy-input-number__button','crazy-input-number-button__bottom',{'crazy-input-number__button__mousedown':currentMousedownButton==='bottom'}]"></span>
      </div>
    </template>
    <template v-else>
      <textarea
        class="crazy-textarea__inner"
        ref="textarea"
        :tabindex="tabindex"
        :disabled="disabled"
        :readonly="readonly"
        v-bind="$attrs"
        @input="handleInput($event.target)"
        @focus="handleFocus($event)"
        @blur="handleBlur($event)"
        @change="handleChange($event)">
      </textarea>
      <span v-if="wordLimitVisible && !disabled" class="crazy-textarea__count">{{ currentInputLength }}/{{ $attrs.maxlength }}</span>
    </template>
  </div>
</template>

<script>
  export default {
    name: "CInput",
    inheritAttrs: false,
    data() {
      return {
        oldValue: '',
        isFocus: false,
        currentMousedownButton: "",
        intervalTimer: null,
        timeoutTimer: null,
        isComposition: false
      };
    },
    props: {
      value: [String, Number],
      tabindex: String,
      readonly: Boolean,
      disabled: Boolean,
      thousandMark: Boolean,
      valueThousandMark: Boolean,
      showWordLimit: Boolean,
      showStepButton: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: "text"
      },
      step: {
        type: Number,
        default: 1
      }
    },
    computed: {
      currentInputLength() {
        return (String(this.value) || '').length;
      },
      nativeInputValue() {
        return this.value === null || this.value === undefined ? '' : String(this.value);
      },
      wordLimitVisible() {
        return this.showWordLimit && this.$attrs.maxlength && (this.type === 'text' || this.type === 'textarea');
      }
    },
    watch: {
      nativeInputValue() {
        this.setNativeInputValue();
      },
      thousandMark() {
        this.setNativeInputValue(true);
      }
    },
    methods: {
      compositionStart() {
        if (this.type !== 'number') return;
        this.isComposition = true;
      },
      compositionEnd(input) {
        if (this.type !== 'number') return;
        this.isComposition = false;
        let value = input.value.replace(/,/g, '').replace(/([^.\-\d]|^\..*).*/g, "");
        input.value = this.thousandMark ? this.addThousandMark(value) : value;
      },
      setFocusStatus(status) {
        this.isFocus = status;
        !status && this.showStepButton && this.inputButtonMouseup();
      },
      focus() {
        this.getInput().focus();
      },
      blur() {
        this.getInput().blur();
      },
      handleFocus(event) {
        this.$emit('focus', event);
        this.type === 'number' && this.setFocusStatus(true);
      },
      handleBlur(event) {
        this.$emit('blur', event);
        this.type === 'number' && this.setFocusStatus(false);
      },
      handleChange(event) {
        this.$emit('change', this.getInputValue(event.target.value));
      },
      setNativeInputValue(setThousandMark) {
        const input = this.getInput();
        if (!input) return;
        let value = this.type === 'number' && this.thousandMark ? this.addThousandMark(this.nativeInputValue) : this.nativeInputValue;
        this.type === 'number' && this.setOldValue(value);
        if (this.getInputValue(input.value) === this.nativeInputValue && !setThousandMark) return;
        input.value = value;
      },
      setOldValue(value) {
        this.oldValue = value;
      },
      handleInput(input) {
        this.type === 'textarea' && this.wordLimitVisible && this.setTextareaScrollTop(input);
        let value = this.getInputValue(input.value);
        this.$emit('input', value);
        this.$nextTick(this.setNativeInputValue);
      },
      setTextareaScrollTop(input) {
        if (input.value.length === input.selectionEnd) {
          input.scrollTop = input.scrollHeight;
        }
      },
      getInput() {
        return this.$refs.input || this.$refs.textarea;
      },
      getInputValue(value) {
        return this.type === 'number' && this.thousandMark && !this.valueThousandMark ? this.removeThousandMark(value) : value;
      },
      inputButtonMouseup() {
        this.currentMousedownButton = "";
        this.clearTimer();
      },
      clearTimer() {
        clearTimeout(this.timeoutTimer);
        clearInterval(this.intervalTimer);
      },
      startTimer(direction) {
        this.inputValueOperation(direction);
        this.timeoutTimer = setTimeout(() => {
          this.intervalTimer = setInterval(() => {
            this.inputValueOperation(direction);
          }, 70);
        }, 300);
      },
      inputClick(e) {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
        e.preventDefault();
      },
      inputValueOperation(direction) {
        let input = this.getInput();
        if (!input.value) {
          if (direction === "top") {
            input.value = this.step;
          }
          if (direction === "bottom") {
            input.value = -this.step;
          }
        } else {
          if (direction === "top") {
            input.value = parseFloat(input.value.replace(/,/g, "")) + this.step;
          }
          if (direction === "bottom") {
            input.value = parseFloat(input.value.replace(/,/g, "")) - this.step;
          }
        }
        this.inputValueDispose(input);
      },
      inputButtonMousedown(e) {
        this.focus();
        let classNames = e.target.className.split(" ");
        let result = classNames.find(item =>
          item.startsWith("crazy-input-number-button")
        );
        this.currentMousedownButton = result.replace(/(crazy-input-number-button__)/g, "");
        this.clearTimer();
        this.startTimer(this.currentMousedownButton);
      },
      inputValueDispose(input) {
        if (this.isComposition) return;
        if (this.type === "number" && input.value) {
          input.value = input.value.replace(/([^.\-\d]|^\..*)/g, "");
          //3、负号后不能出现非数字
          let minusBehindNoNumber = /^-[^\d].*!/g;
          if (minusBehindNoNumber.test(input.value)) {
            input.value = "-";
          }
          //4、不能出现第二个点
          let findDotNumber = input.value.match(/\./g) || [];
          let findDot = new RegExp("\\.", "g");
          if (findDotNumber.length > 1) {
            findDot.exec(input.value);
            findDot.exec(input.value);
            input.value = input.value.slice(0, findDot.lastIndex - 1);
          }
          //5、以0或-0开头后边必须是点
          if (/(^0[^.]|^-0[^.])/g.test(input.value)) {
            input.value = input.value[0] === "-" ? "-0" : "0";
          }
          // 6、以0.或-0.开头后边不能出现非数字
          if (/(^0\.[^\d]|^-0\.[^\d])/g.test(input.value)) {
            input.value = input.value[0] === "-" ? "-0." : "0.";
          }
          // 7、数字和小数点后边不能出现其他符号
          if (/(\d[^\d^.].*|\.[^\d^.].*)/g.test(input.value)) {
            let index = /(\d[^\d^.].*|\.[^\d^.].*)/g.exec(input.value).index;
            input.value = input.value.slice(0, index + 1);
          }
          if (this.thousandMark) input.value = this.addThousandMark(input.value);
          if (input.value === this.oldValue) return;
        }
        this.handleInput(input);
        /**
         * 正则表达式内含有大量后行断言，IE、Edge、Safari等不支持
         * new RegExp可以打包成功，但是很多浏览器会报错
         * 直接用正则表达式替换，npm run dev正常运行，打包会报错
         */
        // let reg = new RegExp('([^\\-^\\.^\\d]|^\\..*|(?<=^\\-)\\D.*|(?<=\\..*)[\\.].*|(?<=(^0|^\\-0))[^\\.].*|(?<=(^0\\.\\d*|^\\-0\\.\\d*))[^\\d].*|(?<=(\\d|\\.))[\\-].*)','g')
        // this.moneyNumber = inputValue.replace(reg, '');
        // this.moneyNumber = inputValue.replace(/([^\-^\.^\d]|^\..*|(?<=^\-)\D.*|(?<=\..*)[\.].*|(?<=(^0|^\-0))[^\.].*|(?<=(^0\.\d*|^\-0\.\d*))[^\d].*|(?<=(\d|\.))[\-].*)/g, '');
      },
      addThousandMark(value) {
        return value.replace(/\B(?=(\d{3})+($|\.))/g, ",")
      },
      removeThousandMark(value) {
        return value.replace(/,/g, "")
      }
    },
    mounted() {
      this.setNativeInputValue();
    }
  };
</script>
<style lang="less" scoped>
  @import "./input";
</style>
