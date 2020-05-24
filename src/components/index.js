import CInput from './input';
import CTabs from './tabs';
import CRate from './rate';

const components = [
  CInput,
  CTabs,
  CRate
]

const install = function (Vue) {
  components.map(component => {
    Vue.use(component);
  });
};

export default {
  install
}
