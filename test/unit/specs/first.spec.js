// 导入 Vue.js 和组件，进行测试
import Vue from "vue";
import First from "../../../src/pages/First.vue";
import { mount } from "@vue/test-utils";
import { expect } from "chai";

describe("First 组件", () => {

  const wrapper = mount(First);
  const vm = wrapper.vm;
  // 检查原始组件选项
  it("has a created hook", () => {
    expect(First.created).to.be.a("function");
  });

  // 评估原始组件选项中的函数的结果
  it("sets the correct default data", () => {
    expect(First.data).to.be.a("function");
    const defaultData = First.data();
    expect(defaultData.msg).to.equal("hello");
  });

  // 检查 mount 中的组件实例
  it("correctly sets the message when created", () => {
    expect(vm.msg).to.equal("world");
  });

  // 创建一个实例并检查渲染输出
  it("renders the correct message", () => {
    expect(wrapper.find("p").text()).to.equal("world");
  });

    // 设置组件的data
    it("correctly sets the message", () => {
      wrapper.setData({msg: "hello world"});
      expect(vm.msg).to.equal("hello world");
    });
});