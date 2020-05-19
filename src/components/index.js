import CInput from './input';
import CTabs from './tabs';

const components = [
  CInput,
  CTabs
]

const install = function (Vue) {
  components.map(component => {
    Vue.use(component);
  });
};

export default {
  install
}
