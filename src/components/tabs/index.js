import CTabs from './tabs';
import CTabItem from './tab-item';

CTabs.install = function (Vue) {
  Vue.component(CTabs.name, CTabs);
  Vue.component(CTabItem.name, CTabItem);
};


export default CTabs;
