import { d as defineComponent, u as useAppStore, r as ref, N as watch, c as createElementBlock, b as createBaseVNode, e as createVNode, w as withCtx, g as resolveComponent, C as createCommentVNode, i as createTextVNode, t as toDisplayString, l as unref, F as Fragment, D as renderList, n as normalizeClass, I as normalizeStyle, O as list_default, h as useRouter, o as openBlock } from "./index-BJrf-pER.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _hoisted_1 = { class: "mainContainer" };
const _hoisted_2 = { class: "mainGrid" };
const _hoisted_3 = { class: "calendarSection" };
const _hoisted_4 = { class: "calendarDayCell" };
const _hoisted_5 = { class: "dayNotesContainer" };
const _hoisted_6 = { class: "notesSection" };
const _hoisted_7 = { class: "notesHeader" };
const _hoisted_8 = {
  key: 0,
  class: "noNotesMessage"
};
const _hoisted_9 = { class: "notesList" };
const _hoisted_10 = { class: "noteTitle" };
const _hoisted_11 = { class: "noteContent" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CalendarView",
  setup(__props) {
    const store = useAppStore();
    const router = useRouter();
    const calendarDate = ref(new Date(store.selectedDate));
    watch(calendarDate, (newVal) => {
      const dateStr = newVal.toISOString().split("T")[0];
      if (dateStr) store.setSelectedDate(dateStr);
    });
    const getNotesForDate = (dateStr) => {
      return store.notes.filter((note) => note.date === dateStr);
    };
    const goToHome = () => {
      router.push("/");
    };
    const getDayClass = (data) => {
      return data.isSelected ? "selectedDay" : "normalDay";
    };
    const getNoteStyle = (note) => {
      return {
        borderLeftColor: note.color === "#ffffff" ? "#dcdfe6" : note.color
      };
    };
    return (_ctx, _cache) => {
      const _component_el_calendar = resolveComponent("el-calendar");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_button = resolveComponent("el-button");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[4] || (_cache[4] = createBaseVNode("h2", { class: "headerTitle" }, "日历选择记录", -1)),
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(_component_el_calendar, {
              modelValue: calendarDate.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => calendarDate.value = $event)
            }, {
              "date-cell": withCtx(({ data }) => [
                createBaseVNode("div", _hoisted_4, [
                  createBaseVNode("p", {
                    class: normalizeClass(getDayClass(data))
                  }, toDisplayString(data.day.split("-").slice(2).join("")), 3),
                  createBaseVNode("div", _hoisted_5, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(getNotesForDate(data.day), (note) => {
                      return openBlock(), createElementBlock("div", {
                        key: note.id,
                        class: "noteIndicator",
                        style: normalizeStyle({ backgroundColor: note.color })
                      }, null, 4);
                    }), 128))
                  ])
                ])
              ]),
              _: 1
            }, 8, ["modelValue"])
          ]),
          createBaseVNode("div", _hoisted_6, [
            createBaseVNode("h3", _hoisted_7, [
              createVNode(_component_el_icon, { class: "headerIcon" }, {
                default: withCtx(() => [
                  createVNode(unref(list_default))
                ]),
                _: 1
              }),
              createTextVNode(" " + toDisplayString(unref(store).selectedDate) + " 的便签 ", 1)
            ]),
            unref(store).filteredNotes.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_8, [
              _cache[2] || (_cache[2] = createBaseVNode("p", null, "该日期暂无记录", -1)),
              createVNode(_component_el_button, {
                type: "text",
                onClick: goToHome
              }, {
                default: withCtx(() => [..._cache[1] || (_cache[1] = [
                  createTextVNode("去创建", -1)
                ])]),
                _: 1
              })
            ])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_9, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(store).filteredNotes, (note) => {
                return openBlock(), createElementBlock("div", {
                  key: note.id,
                  class: "noteItem",
                  style: normalizeStyle(getNoteStyle(note))
                }, [
                  createBaseVNode("h4", _hoisted_10, toDisplayString(note.title), 1),
                  createBaseVNode("p", _hoisted_11, toDisplayString(note.content), 1)
                ], 4);
              }), 128))
            ]),
            createVNode(_component_el_button, {
              class: "manageButton",
              type: "primary",
              plain: "",
              onClick: goToHome
            }, {
              default: withCtx(() => [..._cache[3] || (_cache[3] = [
                createTextVNode(" 查看详情 / 管理 ", -1)
              ])]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
});
const CalendarView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7ae452fc"]]);
export {
  CalendarView as default
};
