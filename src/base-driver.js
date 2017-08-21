import {shallow} from 'enzyme';
import React from 'react';

export default class BaseDriver {


  constructor({path, mocks, isRelativePathFromRoot = true, rootFolder = 'src/', targetImport = 'default',
                commonjs, component}) {
    if (!component) {
      this.mocks = mocks;
      this.rootFolder = rootFolder;
      this.targetImport = targetImport;
      this.path = isRelativePathFromRoot ? `../../../${this.rootFolder}${path}` : path;
      this.commonjs = commonjs;
    } else {
      this._component = component;
    }
  }

  render(props) {
    if (!this._component) {
      const ComponentModule = require('proxyquire').noCallThru()(this.path, {...this.mocks});
      this._component = this.commonjs ? ComponentModule : ComponentModule[this.targetImport];
    }
    this.component = shallow(<this._component {...props}/>);
    return this;
  }

  renderChild(testId) {
    const child = this.byId(testId).node;
    return new BaseDriver({component: child.type}).render(child.props);
  }

  getElementByTestId(testId) {
    console.warn('--- DEPRECATED --- getElementByTestId is deprecated. use byId instead'); // eslint-disable-line
    return this.byId(testId);
  }

  propsOf(testId) {
    return this.byId(testId).props();
  }

  childrenOf(testId) {
    return this.propsOf(testId).children;
  }

  byId(testId) {
    const el = this.component.findWhere(node => node.prop('testID') === testId);
    return el;
  }

  get state() {
    return this.component.state();
  }

  setState(state) {
    this.component.setState(state);
  }

}
