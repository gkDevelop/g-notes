import { d as defineComponent, u as useAppStore, r as ref, a as reactive, c as createElementBlock, b as createBaseVNode, C as createCommentVNode, e as createVNode, t as toDisplayString, l as unref, w as withCtx, g as resolveComponent, F as Fragment, D as renderList, i as createTextVNode, G as plus_default, H as edit_default, E as ElMessage, o as openBlock, I as normalizeStyle, A as createBlock, J as price_tag_default, K as collection_tag_default, n as normalizeClass, L as circle_close_default, M as ElMessageBox } from "./index-BJrf-pER.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _hoisted_1 = { class: "main-container" };
const _hoisted_2 = { class: "header-section" };
const _hoisted_3 = { class: "page-title" };
const _hoisted_4 = {
  key: 0,
  class: "empty-state"
};
const _hoisted_5 = { class: "notes-grid" };
const _hoisted_6 = { class: "card-header" };
const _hoisted_7 = { class: "note-title" };
const _hoisted_8 = { class: "action-buttons" };
const _hoisted_9 = { class: "note-content" };
const _hoisted_10 = { class: "note-date" };
const _hoisted_11 = { class: "color-options" };
const _hoisted_12 = ["onClick"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Home",
  setup(__props) {
    const store = useAppStore();
    const showAddDialog = ref(false);
    const colors = [
      "#93d2ff",
      // 蓝色
      "#eddd52",
      // 黄色
      "#8cf594",
      // 绿色
      "#f797b7",
      // 粉色
      "#e697f1",
      // 紫色
      "#f37878"
      // 白色
    ];
    const newNote = reactive({
      title: "",
      content: "",
      color: "#93d2ff",
      isPinned: false,
      date: store.selectedDate
    });
    const handleAddNote = () => {
      if (!newNote.title || !newNote.content) {
        ElMessage.warning("请填写完整标题和内容");
        return;
      }
      store.addNote({
        title: newNote.title,
        content: newNote.content,
        color: newNote.color,
        isPinned: newNote.isPinned,
        date: store.selectedDate
      });
      showAddDialog.value = false;
      newNote.title = "";
      newNote.content = "";
      newNote.color = "#fff9c4";
      ElMessage.success("便签已保存");
    };
    const handleDelete = (id) => {
      ElMessageBox.confirm("确定要删除这条便签吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        store.deleteNote(id);
        ElMessage.success("已删除");
      }).catch(() => {
      });
    };
    const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    };
    return (_ctx, _cache) => {
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_form = resolveComponent("el-form");
      const _component_el_dialog = resolveComponent("el-dialog");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("h2", _hoisted_3, "便签随记 - " + toDisplayString(unref(store).selectedDate), 1),
          createVNode(_component_el_button, {
            type: "primary",
            onClick: _cache[0] || (_cache[0] = ($event) => showAddDialog.value = true),
            class: "add-btn"
          }, {
            default: withCtx(() => [
              createVNode(_component_el_icon, { class: "btn-icon" }, {
                default: withCtx(() => [
                  createVNode(unref(plus_default))
                ]),
                _: 1
              }),
              _cache[5] || (_cache[5] = createTextVNode(" 新建便签 ", -1))
            ]),
            _: 1
          })
        ]),
        unref(store).filteredNotes.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_4, [
          createVNode(_component_el_icon, {
            size: 48,
            class: "empty-icon"
          }, {
            default: withCtx(() => [
              createVNode(unref(edit_default))
            ]),
            _: 1
          }),
          _cache[6] || (_cache[6] = createBaseVNode("p", { class: "empty-text" }, "今天还没有便签，点击右上角新建一个吧", -1))
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_5, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(store).filteredNotes, (note) => {
            return openBlock(), createElementBlock("div", {
              key: note.id,
              class: "note-card",
              style: normalizeStyle({ backgroundColor: note.color })
            }, [
              createBaseVNode("div", _hoisted_6, [
                createBaseVNode("h3", _hoisted_7, toDisplayString(note.title), 1),
                createBaseVNode("div", _hoisted_8, [
                  createVNode(_component_el_button, {
                    type: "text",
                    size: "small",
                    class: normalizeClass(["pin-btn", note.isPinned ? "pinned" : "not-pinned"]),
                    onClick: ($event) => unref(store).togglePin(note.id)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_icon, { size: 18 }, {
                        default: withCtx(() => [
                          note.isPinned ? (openBlock(), createBlock(unref(price_tag_default), { key: 0 })) : (openBlock(), createBlock(unref(collection_tag_default), { key: 1 }))
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1032, ["class", "onClick"]),
                  createVNode(_component_el_button, {
                    type: "text",
                    size: "small",
                    class: "delete-btn",
                    onClick: ($event) => handleDelete(note.id)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_icon, { size: 18 }, {
                        default: withCtx(() => [
                          createVNode(unref(circle_close_default))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ])
              ]),
              createBaseVNode("div", _hoisted_9, toDisplayString(note.content), 1),
              createBaseVNode("div", _hoisted_10, toDisplayString(formatTime(note.createdAt)), 1)
            ], 4);
          }), 128))
        ]),
        createVNode(_component_el_dialog, {
          modelValue: showAddDialog.value,
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => showAddDialog.value = $event),
          title: "新建便签",
          width: "500px"
        }, {
          footer: withCtx(() => [
            createVNode(_component_el_button, {
              onClick: _cache[3] || (_cache[3] = ($event) => showAddDialog.value = false),
              class: "dialog-cancel-btn"
            }, {
              default: withCtx(() => [..._cache[7] || (_cache[7] = [
                createTextVNode("取消", -1)
              ])]),
              _: 1
            }),
            createVNode(_component_el_button, {
              type: "primary",
              onClick: handleAddNote,
              class: "dialog-confirm-btn"
            }, {
              default: withCtx(() => [..._cache[8] || (_cache[8] = [
                createTextVNode("确定", -1)
              ])]),
              _: 1
            })
          ]),
          default: withCtx(() => [
            createVNode(_component_el_form, {
              model: newNote,
              "label-width": "60px"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_form_item, { label: "标题" }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: newNote.title,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => newNote.title = $event),
                      placeholder: "请输入标题"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_form_item, { label: "内容" }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: newNote.content,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => newNote.content = $event),
                      type: "textarea",
                      rows: 5,
                      placeholder: "请输入内容...",
                      class: "note-content-input"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_form_item, { label: "颜色" }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_11, [
                      (openBlock(), createElementBlock(Fragment, null, renderList(colors, (color) => {
                        return createBaseVNode("div", {
                          key: color,
                          class: normalizeClass(["color-option", newNote.color === color ? "selected-color" : ""]),
                          style: normalizeStyle({ backgroundColor: color }),
                          onClick: ($event) => newNote.color = color
                        }, null, 14, _hoisted_12);
                      }), 64))
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model"])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
});
const Home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ec1a8445"]]);
export {
  Home as default
};
