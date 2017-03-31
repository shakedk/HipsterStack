import { observe, observable, extendObservable } from 'mobx';
import { assign } from 'lodash';

export default class ViewModelCollection {
  @observable viewModels = [];

  constructor(models, template) {
    this.viewModelMap = new Map();
    this.template = template;

    observe(models, (e) => {
      // housekeeping
      e.added.forEach((item) => {
        // console.log("++", item)
        this.viewModels.push(this.viewModelForObject(item));
      });

      e.removed.forEach((item) => {
        // console.log("--", item)
        this.viewModels.splice(this.viewModels.indexOf(this.viewModelMap.get(item)), 1);
      });
    }, true);
  }

  viewModelForObject(o) {
    let m = this.viewModelMap.get(o);
    if (!m) {
      // no model yet, create new
      m = this.makeViewModel(o);
      this.viewModelMap.set(o, m);
    }
    return m;
  }

  makeViewModel(o) {
    // update function to assign new values
    function update(oo) {
      assign(this, oo);
    }

    return extendObservable({
      update,
      __data: o,
      id: o.id,
    }, this.template);
  }
}