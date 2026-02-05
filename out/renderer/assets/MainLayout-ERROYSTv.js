import { d as defineComponent, u as useAppStore, r as ref, j as onMounted, k as onUnmounted, c as createElementBlock, b as createBaseVNode, e as createVNode, i as createTextVNode, w as withCtx, g as resolveComponent, n as normalizeClass, t as toDisplayString, l as unref, m as notebook_default, p as home_filled_default, q as calendar_default, s as chat_dot_round_default, v as folder_opened_default, x as edit_pen_default, y as switch_button_default, z as menu_default, T as Transition, A as createBlock, B as resolveDynamicComponent, h as useRouter, o as openBlock } from "./index-BJrf-pER.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _hoisted_1 = { class: "app-container" };
const _hoisted_2 = { class: "sidebar" };
const _hoisted_3 = { class: "sidebar-header" };
const _hoisted_4 = { class: "sidebar-nav" };
const _hoisted_5 = { class: "nav-item-disabled" };
const _hoisted_6 = { class: "nav-item-disabled" };
const _hoisted_7 = { class: "nav-item-static" };
const _hoisted_8 = { class: "sidebar-footer" };
const _hoisted_9 = { class: "user-info" };
const _hoisted_10 = { class: "user-profile" };
const _hoisted_11 = { class: "username" };
const _hoisted_12 = { class: "main-content" };
const _hoisted_13 = { class: "top-bar" };
const _hoisted_14 = { class: "top-bar-left" };
const _hoisted_15 = { class: "current-time" };
const _hoisted_16 = { class: "content-view" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MainLayout",
  setup(__props) {
    const store = useAppStore();
    const router = useRouter();
    const currentTime = ref("");
    const updateTime = () => {
      const now = /* @__PURE__ */ new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const weekDays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      const week = weekDays[now.getDay()];
      const time = now.toTimeString().split(" ")[0];
      currentTime.value = `${year}年${month}月${day}日 ${week} ${time}`;
    };
    let timer;
    onMounted(() => {
      updateTime();
      timer = setInterval(updateTime, 1e3);
    });
    onUnmounted(() => {
      clearInterval(timer);
    });
    const handleLogout = () => {
      store.logout();
      router.push("/login");
    };
    return (_ctx, _cache) => {
      const _component_el_icon = resolveComponent("el-icon");
      const _component_router_link = resolveComponent("router-link");
      const _component_el_avatar = resolveComponent("el-avatar");
      const _component_el_button = resolveComponent("el-button");
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(_component_el_icon, { class: "header-icon" }, {
              default: withCtx(() => [
                createVNode(unref(notebook_default))
              ]),
              _: 1
            }),
            _cache[0] || (_cache[0] = createTextVNode(" My-Tools ", -1))
          ]),
          createBaseVNode("nav", _hoisted_4, [
            createVNode(_component_router_link, {
              to: "/",
              class: normalizeClass(["nav-item", { "nav-item-active": _ctx.$route.path === "/" }])
            }, {
              default: withCtx(() => [
                createVNode(_component_el_icon, { class: "nav-icon" }, {
                  default: withCtx(() => [
                    createVNode(unref(home_filled_default))
                  ]),
                  _: 1
                }),
                _cache[1] || (_cache[1] = createTextVNode(" 首页 ", -1))
              ]),
              _: 1
            }, 8, ["class"]),
            createVNode(_component_router_link, {
              to: "/calendar",
              class: normalizeClass(["nav-item", { "nav-item-active": _ctx.$route.path === "/calendar" }])
            }, {
              default: withCtx(() => [
                createVNode(_component_el_icon, { class: "nav-icon" }, {
                  default: withCtx(() => [
                    createVNode(unref(calendar_default))
                  ]),
                  _: 1
                }),
                _cache[2] || (_cache[2] = createTextVNode(" 日历记录 ", -1))
              ]),
              _: 1
            }, 8, ["class"]),
            _cache[6] || (_cache[6] = createBaseVNode("div", { class: "nav-section-title" }, " 工具箱 ", -1)),
            createBaseVNode("div", _hoisted_5, [
              createVNode(_component_el_icon, { class: "nav-icon" }, {
                default: withCtx(() => [
                  createVNode(unref(chat_dot_round_default))
                ]),
                _: 1
              }),
              _cache[3] || (_cache[3] = createTextVNode(" 微信 (开发中) ", -1))
            ]),
            createBaseVNode("div", _hoisted_6, [
              createVNode(_component_el_icon, { class: "nav-icon" }, {
                default: withCtx(() => [
                  createVNode(unref(folder_opened_default))
                ]),
                _: 1
              }),
              _cache[4] || (_cache[4] = createTextVNode(" 文件管理 ", -1))
            ]),
            createBaseVNode("div", _hoisted_7, [
              createVNode(_component_el_icon, { class: "nav-icon" }, {
                default: withCtx(() => [
                  createVNode(unref(edit_pen_default))
                ]),
                _: 1
              }),
              _cache[5] || (_cache[5] = createTextVNode(" 便签随记 ", -1))
            ])
          ]),
          createBaseVNode("div", _hoisted_8, [
            createBaseVNode("div", _hoisted_9, [
              createBaseVNode("div", _hoisted_10, [
                createVNode(_component_el_avatar, {
                  size: 32,
                  class: "avatar"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(store).user?.username.charAt(0).toUpperCase()), 1)
                  ]),
                  _: 1
                }),
                createBaseVNode("span", _hoisted_11, toDisplayString(unref(store).user?.username), 1)
              ]),
              createVNode(_component_el_button, {
                type: "text",
                onClick: handleLogout,
                class: "logout-btn"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(switch_button_default))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_12, [
          createBaseVNode("header", _hoisted_13, [
            createBaseVNode("div", _hoisted_14, [
              createVNode(_component_el_button, {
                type: "primary",
                circle: "",
                size: "small",
                class: "menu-btn"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(unref(menu_default))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createBaseVNode("span", _hoisted_15, toDisplayString(currentTime.value), 1)
            ]),
            _cache[7] || (_cache[7] = createBaseVNode("div", { class: "top-bar-right" }, null, -1))
          ]),
          createBaseVNode("main", _hoisted_16, [
            createVNode(_component_router_view, null, {
              default: withCtx(({ Component }) => [
                createVNode(Transition, {
                  name: "fade",
                  mode: "out-in"
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(Component)))
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
});
const MainLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5ffea42c"]]);
export {
  MainLayout as default
};
