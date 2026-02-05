import { d as defineComponent, u as useAppStore, r as ref, a as reactive, c as createElementBlock, b as createBaseVNode, e as createVNode, w as withCtx, f as withModifiers, g as resolveComponent, h as useRouter, o as openBlock, i as createTextVNode, E as ElMessage } from "./index-BJrf-pER.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _hoisted_1 = { class: "flex items-center justify-center h-screen bg-gray-100 login-img" };
const _hoisted_2 = { class: "p-8 bg-white rounded-lg shadow-md w-96 login-container" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Login",
  setup(__props) {
    const router = useRouter();
    const store = useAppStore();
    const loading = ref(false);
    const form = reactive({
      username: "admin",
      password: "123456"
    });
    const handleLogin = () => {
      if (!form.username) {
        ElMessage.warning("请输入用户名");
        return;
      }
      if (!form.password) {
        ElMessage.warning("请输入密码");
        return;
      }
      if (form.username !== "admin" || form.password !== "123456") {
        ElMessage.error("用户名或密码错误");
        return;
      }
      loading.value = true;
      setTimeout(() => {
        store.login(form.username);
        ElMessage.success("登录成功");
        router.push("/");
        loading.value = false;
      }, 800);
    };
    return (_ctx, _cache) => {
      const _component_el_input = resolveComponent("el-input");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_form = resolveComponent("el-form");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[3] || (_cache[3] = createBaseVNode("h1", { class: "mb-6 text-2xl font-bold text-center text-gray-800" }, "本地便签登录", -1)),
          createVNode(_component_el_form, {
            model: form,
            onSubmit: withModifiers(handleLogin, ["prevent"])
          }, {
            default: withCtx(() => [
              createVNode(_component_el_form_item, null, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: form.username,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => form.username = $event),
                    placeholder: "用户名",
                    "prefix-icon": "User"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_form_item, null, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: form.password,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => form.password = $event),
                    type: "password",
                    placeholder: "密码 (任意输入)",
                    "prefix-icon": "Lock",
                    "show-password": ""
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_el_button, {
                type: "primary",
                class: "w-full",
                onClick: handleLogin,
                loading: loading.value
              }, {
                default: withCtx(() => [..._cache[2] || (_cache[2] = [
                  createTextVNode("登录", -1)
                ])]),
                _: 1
              }, 8, ["loading"])
            ]),
            _: 1
          }, 8, ["model"])
        ])
      ]);
    };
  }
});
const Login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bd8d8b73"]]);
export {
  Login as default
};
