define("@disperse/main",(require, exports)=>{
  var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/main/index.tsx
__export(exports, {
  Footer: () => Footer,
  MainLauncher: () => MainLauncher,
  Nav: () => Nav,
  Result: () => Result
});
var import_components7 = __toModule(require("@ijstech/components"));

// src/main/index.css.ts
var import_components = __toModule(require("@ijstech/components"));
var import_assets = __toModule(require("@disperse/assets"));
var Theme = import_components.Styles.Theme.ThemeVars;
import_components.Styles.Theme.darkTheme.background.default = "#212128";
import_components.Styles.Theme.darkTheme.background.gradient = "transparent linear-gradient(270deg, #FF9900 0%, #FC7428 100%) 0% 0% no-repeat padding-box";
import_components.Styles.Theme.darkTheme.background.modal = "#000";
import_components.Styles.Theme.darkTheme.background.main = "#222237", import_components.Styles.Theme.darkTheme.colors.primary.dark = "#F05E61";
import_components.Styles.Theme.darkTheme.colors.primary.main = "#F29224";
import_components.Styles.Theme.darkTheme.colors.secondary.dark = "#f7d063";
import_components.Styles.Theme.darkTheme.colors.secondary.main = "#FF8800";
import_components.Styles.Theme.darkTheme.text.secondary = "hsla(0, 0%, 100%, 0.55)";
import_components.Styles.Theme.darkTheme.typography.fontFamily = "Proxima Nova";
import_components.Styles.Theme.darkTheme.colors.warning.dark = "#f57c00";
import_components.Styles.Theme.darkTheme.colors.warning.light = "#F6C958";
import_components.Styles.Theme.darkTheme.colors.warning.main = "#ffa726";
import_components.Styles.Theme.darkTheme.divider = "#0E132E";
import_components.Styles.Theme.darkTheme.typography.fontSize = "16px";
var colorVar = {
  primaryButton: "transparent linear-gradient(270deg, #FF9900 0%, #FC7428 100%) 0% 0% no-repeat padding-box",
  primaryGradient: "linear-gradient(270deg, #FF9900 0%, #FC7428 100%)",
  darkBg: "#181E3E 0% 0% no-repeat padding-box",
  primaryDisabled: "transparent linear-gradient(270deg, #7B7B7B 0%, #929292 100%) 0% 0% no-repeat padding-box"
};
var index_css_default = import_components.Styles.style({
  $nest: {
    "#pageWrap": {
      zIndex: 1
    },
    ".overflow-inherit": {
      overflow: "inherit"
    },
    "::selection": {
      color: "#fff",
      background: "#1890ff"
    },
    ".template-layout": {
      maxWidth: "1420px",
      marginInline: "auto"
    },
    ".container-layout": {
      width: "100%",
      padding: "20px 10px"
    },
    ".btn-os": {
      background: colorVar.primaryButton,
      height: "auto !important",
      color: "#fff",
      transition: "background .3s ease",
      fontSize: "1rem",
      $nest: {
        "i-icon.loading-icon": {
          marginInline: "0.25rem",
          width: "16px !important",
          height: "16px !important"
        }
      }
    },
    ".btn-os:not(.disabled):not(.is-spinning):hover, .btn-os:not(.disabled):not(.is-spinning):focus": {
      background: colorVar.primaryGradient,
      backgroundColor: "transparent",
      boxShadow: "none",
      opacity: 0.9
    },
    ".btn-os:not(.disabled):not(.is-spinning):focus": {
      boxShadow: "0 0 0 0.2rem rgb(0 123 255 / 25%)"
    },
    ".btn-os.disabled, .btn-os.is-spinning": {
      background: colorVar.primaryDisabled,
      opacity: 0.9,
      $nest: {
        "&:hover": {
          background: `${colorVar.primaryDisabled} !important`
        }
      }
    },
    ".dark-bg, .dark-modal > div > div": {
      background: colorVar.darkBg,
      borderRadius: 5
    },
    ".network-msg": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "15rem",
      $nest: {
        "span": {
          fontSize: "1.25rem",
          color: Theme.colors.primary.main
        }
      }
    },
    ".break-word": {
      wordBreak: "break-word"
    },
    ".text-right": {
      textAlign: "right"
    },
    "i-modal": {
      $nest: {
        ".modal": {
          background: Theme.background.modal
        },
        ".i-modal_header": {
          marginBottom: "1rem",
          paddingBlock: "0.5rem",
          fontSize: "1.25rem",
          fontWeight: 700,
          $nest: {
            "i-icon": {
              padding: "3.5px",
              width: "18px !important",
              height: "18px !important",
              background: Theme.colors.primary.main,
              fill: "#fff !important"
            },
            "span": {
              fontWeight: 700,
              fontSize: "1rem",
              color: Theme.colors.secondary.main
            }
          }
        }
      }
    },
    ".account-dropdown": {
      $nest: {
        ".modal": {
          background: Theme.background.main,
          border: `2px solid ${Theme.divider}`,
          padding: "10px",
          minWidth: 200,
          marginTop: 10
        },
        "i-button": {
          background: colorVar.primaryButton,
          cursor: "pointer",
          padding: ".5rem .75rem"
        },
        ".icon": {
          backgroundColor: "transparent",
          height: "auto",
          width: "auto",
          padding: ".5rem .75rem .5rem 0"
        },
        "i-icon": {
          height: 14,
          width: 14
        }
      }
    },
    ".hidden": {
      display: "none !important"
    },
    ".actions-dropdown": {
      cursor: "pointer",
      position: "relative",
      $nest: {
        "> i-button": {
          height: "auto",
          minWidth: "auto",
          padding: ".5rem .75rem",
          border: "none",
          background: colorVar.primaryButton,
          lineHeight: "1.25rem",
          fontWeight: "bold",
          fontSize: "1rem",
          $nest: {
            "&.disabled": {
              background: colorVar.primaryDisabled,
              opacity: 0.9,
              cursor: "default"
            }
          }
        },
        ".modal": {
          background: Theme.background.modal,
          border: `2px solid ${Theme.divider}`,
          padding: "10px",
          marginTop: 0,
          minWidth: 0,
          $nest: {
            "i-button": {
              background: colorVar.primaryButton,
              marginBottom: "0.5rem",
              paddingBlock: "0.675rem",
              border: "none",
              transition: "all .2s ease-out",
              borderRadius: 5,
              padding: "0.25rem 1.5rem",
              opacity: 1,
              whiteSpace: "nowrap",
              $nest: {
                "&.disabled": {
                  background: colorVar.primaryDisabled
                },
                "&:last-child": {
                  marginBottom: 0
                }
              }
            }
          }
        },
        ".icon": {
          backgroundColor: "transparent",
          height: "auto",
          width: "auto",
          padding: ".5rem .75rem .5rem 0"
        },
        "i-icon": {
          height: "16px !important",
          width: "16px !important",
          display: "flex"
        },
        ".loading-icon": {
          marginLeft: "0.15rem"
        }
      }
    },
    "@media screen and (max-width: 768px)": {
      $nest: {
        ".actions-dropdown .button": {
          padding: "0.15rem"
        }
      }
    }
  }
});
import_components.Styles.fontFace({
  fontFamily: "Proxima Nova",
  src: `url("${import_assets.default.fullPath("fonts/proxima_nova/ProximaNovaBold.ttf")}") format("truetype")`,
  fontWeight: "bold",
  fontStyle: "normal"
});
import_components.Styles.fontFace({
  fontFamily: "Proxima Nova",
  src: `url("${import_assets.default.fullPath("fonts/proxima_nova/ProximaNovaBoldIt.ttf")}") format("truetype")`,
  fontWeight: "bold",
  fontStyle: "italic"
});
import_components.Styles.fontFace({
  fontFamily: "Proxima Nova",
  src: `url("${import_assets.default.fullPath("fonts/proxima_nova/ProximaNovaLight.ttf")}") format("truetype")`,
  fontWeight: "300",
  fontStyle: "normal"
});
import_components.Styles.fontFace({
  fontFamily: "Proxima Nova",
  src: `url("${import_assets.default.fullPath("fonts/proxima_nova/ProximaNovaLightIt.ttf")}") format("truetype")`,
  fontWeight: "300",
  fontStyle: "italic"
});
import_components.Styles.fontFace({
  fontFamily: "Proxima Nova",
  src: `url("${import_assets.default.fullPath("fonts/proxima_nova/ProximaNovaReg.ttf")}") format("truetype")`,
  fontWeight: "normal",
  fontStyle: "normal"
});
import_components.Styles.fontFace({
  fontFamily: "Proxima Nova",
  src: `url("${import_assets.default.fullPath("fonts/proxima_nova/ProximaNovaRegIt.ttf")}") format("truetype")`,
  fontWeight: "normal",
  fontStyle: "italic"
});
import_components.Styles.fontFace({
  fontFamily: "Proxima Nova",
  src: `url("${import_assets.default.fullPath("fonts/proxima_nova/ProximaNovaBold.ttf")}") format("truetype")`,
  fontWeight: "bold",
  fontStyle: "normal"
});
import_components.Styles.fontFace({
  fontFamily: "Apple SD Gothic Neo",
  src: `url("${import_assets.default.fullPath("fonts/FontsFree-Net-Apple-SD-Gothic-Neo-Bold.ttf")}") format("truetype")`,
  fontWeight: "bold",
  fontStyle: "normal"
});
import_components.Styles.fontFace({
  fontFamily: "Montserrat",
  src: `url("${import_assets.default.fullPath("fonts/montserrat/Montserrat-Regular.ttf")}") format("truetype")`,
  fontWeight: "nomal",
  fontStyle: "normal"
});
import_components.Styles.fontFace({
  fontFamily: "Montserrat",
  src: `url("${import_assets.default.fullPath("fonts/montserrat/Montserrat-Bold.ttf")}") format("truetype")`,
  fontWeight: "bold",
  fontStyle: "normal"
});
import_components.Styles.fontFace({
  fontFamily: "Montserrat Light",
  src: `url("${import_assets.default.fullPath("fonts/montserrat/Montserrat-Light.ttf")}") format("truetype")`,
  fontStyle: "normal"
});
import_components.Styles.fontFace({
  fontFamily: "Montserrat Medium",
  src: `url("${import_assets.default.fullPath("fonts/montserrat/Montserrat-Medium.ttf")}") format("truetype")`,
  fontStyle: "normal"
});
import_components.Styles.fontFace({
  fontFamily: "Montserrat SemiBold",
  src: `url("${import_assets.default.fullPath("fonts/montserrat/Montserrat-SemiBold.ttf")}") format("truetype")`,
  fontStyle: "normal"
});

// src/main/result.tsx
var import_components3 = __toModule(require("@ijstech/components"));
var import_store = __toModule(require("@disperse/store"));
var import_global = __toModule(require("@disperse/global"));

// src/main/result.css.ts
var import_components2 = __toModule(require("@ijstech/components"));
var result_css_default = import_components2.Styles.style({
  textAlign: "center",
  $nest: {
    "i-label > *": {
      fontSize: ".875rem",
      wordBreak: "normal"
    },
    ".modal": {
      minWidth: "25%",
      maxWidth: "100%",
      width: 455
    },
    ".i-modal_content": {
      padding: "0 2.563rem 3rem"
    },
    ".i-modal_header": {
      borderBottom: "none !important"
    },
    "i-button": {
      padding: "1rem 2rem",
      textAlign: "center"
    }
  }
});

// src/main/result.tsx
var import_assets2 = __toModule(require("@disperse/assets"));
var Theme2 = import_components3.Styles.Theme.ThemeVars;
var Result = class extends import_components3.Module {
  get message() {
    return this._message;
  }
  set message(value) {
    this._message = value;
    this.renderUI();
  }
  constructor(parent, options) {
    super(parent, options);
  }
  async init() {
    this.classList.add(result_css_default);
    super.init();
    this.confirmModal.onClose = () => this.onCloseRedirect();
  }
  closeModal() {
    this.confirmModal.visible = false;
  }
  showModal() {
    this.confirmModal.visible = true;
  }
  onCloseRedirect() {
    var _a;
    const customRedirect = (_a = this.message) == null ? void 0 : _a.customRedirect;
    if (customRedirect && customRedirect.name) {
      this._message.customRedirect = null;
      if (customRedirect.params) {
        const queries = new URLSearchParams(customRedirect.params).toString();
        window.location.assign(`/#/${customRedirect.name}?${queries}`);
      } else {
        window.location.assign(`/#/${customRedirect.name}`);
      }
    }
  }
  async buildLink() {
    if (this.message.txtHash) {
      const chainId = await (0, import_store.getWallet)().getChainId();
      (0, import_global.viewOnExplorerByTxHash)(chainId, this.message.txtHash);
    }
  }
  async renderUI() {
    this.mainContent.innerHTML = "";
    const mainSection = await import_components3.VStack.create({
      horizontalAlignment: "center"
    });
    if (this.message.status === "warning") {
      mainSection.id = "warningSection";
      const loading = /* @__PURE__ */ this.$render("i-panel", {
        height: 100
      }, /* @__PURE__ */ this.$render("i-vstack", {
        id: "loadingElm",
        class: "i-loading-overlay",
        height: "100%",
        background: { color: "transparent" }
      }, /* @__PURE__ */ this.$render("i-vstack", {
        class: "i-loading-spinner",
        horizontalAlignment: "center",
        verticalAlignment: "center"
      }, /* @__PURE__ */ this.$render("i-icon", {
        class: "i-loading-spinner_icon",
        image: { url: import_assets2.default.fullPath("img/loading.svg"), width: 24, height: 24 }
      }), /* @__PURE__ */ this.$render("i-label", {
        caption: "Loading...",
        font: { color: Theme2.colors.primary.main },
        class: "i-loading-spinner_text"
      }))));
      mainSection.appendChild(loading);
      const section = new import_components3.VStack();
      section.margin = { bottom: 20 };
      const captionList = ["Waiting For Confirmation", this.message.content || "", "Confirm this transaction in your wallet"];
      const options = [{ font: { color: Theme2.colors.warning.light, size: "20px" }, marginBottom: 15 }, { marginBottom: 15 }, { font: { color: "#C2C3CB" } }];
      for (let i = 0; i < captionList.length; i++) {
        const caption = captionList[i];
        const option = options[i] || {};
        const label = await import_components3.Label.create(__spreadValues({}, option));
        label.caption = caption;
        section.appendChild(label);
      }
      ;
      mainSection.appendChild(section);
    } else if (this.message.status === "success") {
      const chainId = await (0, import_store.getWallet)().getChainId();
      const networkType = (0, import_store.getNetworkType)(chainId);
      const image = await import_components3.Image.create({
        width: "50px",
        url: import_assets2.default.fullPath("img/success-icon.svg"),
        margin: { bottom: 30 },
        display: "inline-block"
      });
      mainSection.appendChild(image);
      const label = await import_components3.Label.create({
        caption: "Transaction Submitted",
        margin: { bottom: 10 },
        font: { size: "20px", color: Theme2.colors.warning.light }
      });
      mainSection.appendChild(label);
      const contentSection = await import_components3.Panel.create();
      contentSection.id = "contentSection";
      mainSection.appendChild(contentSection);
      const contentLabel = await import_components3.Label.create();
      contentLabel.caption = this.message.content || "";
      contentSection.appendChild(contentLabel);
      if (this.message.txtHash) {
        const section = new import_components3.VStack();
        const label1 = await import_components3.Label.create({
          caption: this.message.txtHash.substr(0, 33),
          margin: { bottom: 15 }
        });
        section.appendChild(label1);
        const label2 = await import_components3.Label.create({
          caption: this.message.txtHash.substr(33, this.message.txtHash.length),
          margin: { bottom: 15 }
        });
        section.appendChild(label2);
        const link = await import_components3.Label.create({
          caption: `View on ${networkType}`,
          display: "block",
          font: { color: "#FF9900" }
        });
        link.onClick = this.buildLink.bind(this);
        link.classList.add("pointer");
        section.appendChild(link);
        contentSection.appendChild(section);
      }
      const button = new import_components3.Button(mainSection, {
        width: "100%",
        caption: "Close"
      });
      button.classList.add("btn-os");
      button.classList.add("btn-approve");
      button.classList.add("mt-1");
      button.onClick = () => this.closeModal();
      mainSection.appendChild(button);
    } else {
      const image = await import_components3.Image.create({
        width: "50px",
        url: import_assets2.default.fullPath("img/warning-icon.png"),
        display: "inline-block",
        margin: { bottom: 30 }
      });
      mainSection.appendChild(image);
      const label = await import_components3.Label.create({
        caption: "Transaction Rejected.",
        font: { size: "18px", color: Theme2.colors.warning.light },
        margin: { bottom: 10 }
      });
      mainSection.appendChild(label);
      const section = await import_components3.VStack.create();
      section.id = "contentSection";
      const err = await this.onErrMsgChanged();
      const contentLabel = await import_components3.Label.create({
        caption: err,
        margin: { bottom: 15 },
        visible: !!err
      });
      section.appendChild(contentLabel);
      mainSection.appendChild(section);
      const button = new import_components3.Button(mainSection, {
        width: "100%",
        caption: "Cancel"
      });
      button.classList.add("btn-os");
      button.classList.add("btn-approve");
      button.classList.add("mt-1");
      button.onClick = () => this.closeModal();
      mainSection.appendChild(button);
    }
    this.mainContent.appendChild(mainSection);
  }
  async onErrMsgChanged() {
    if (this.message.status !== "error")
      return this.message.content;
    if (this.message.content.message && this.message.content.message.includes("Internal JSON-RPC error.")) {
      this.message.content.message = JSON.parse(this.message.content.message.replace("Internal JSON-RPC error.\n", "")).message;
    }
    return await (0, import_global.parseContractError)(this.message.content.message, this.message.obj);
  }
  render() {
    return /* @__PURE__ */ this.$render("i-modal", {
      id: "confirmModal",
      closeIcon: { name: "times" },
      class: "dark-modal confirm-modal",
      minHeight: "280px"
    }, /* @__PURE__ */ this.$render("i-panel", {
      id: "mainContent",
      class: "i-modal_content"
    }));
  }
};
Result = __decorateClass([
  (0, import_components3.customElements)("disperse-result")
], Result);

// src/main/index.tsx
var import_global3 = __toModule(require("@disperse/global"));
var import_store4 = __toModule(require("@disperse/store"));

// src/main/nav.tsx
var import_components5 = __toModule(require("@ijstech/components"));
var import_eth_wallet = __toModule(require("@ijstech/eth-wallet"));
var import_global2 = __toModule(require("@disperse/global"));
var import_store2 = __toModule(require("@disperse/store"));

// src/main/nav.css.ts
var import_components4 = __toModule(require("@ijstech/components"));
var Theme3 = import_components4.Styles.Theme.ThemeVars;
var nav_css_default = import_components4.Styles.style({
  backgroundColor: "#000",
  $nest: {
    "::-webkit-scrollbar-track": {
      background: "#FFB82F"
    },
    "::-webkit-scrollbar": {
      width: "5px"
    },
    "::-webkit-scrollbar-thumb": {
      background: Theme3.colors.secondary.main,
      borderRadius: "5px"
    },
    ".nav": {
      padding: ".2rem 1rem",
      fontWeight: "600",
      letterSpacing: ".015em",
      lineHeight: "19px",
      minHeight: 80,
      display: "block",
      alignItems: "center",
      borderBottom: `2px solid ${Theme3.colors.primary.main}`,
      position: "relative"
    },
    ".os-menu": {
      display: "block",
      $nest: {
        ".heading": {
          textTransform: "capitalize",
          fontSize: "1rem",
          lineHeight: "1rem",
          fontWeight: 400,
          whiteSpace: "nowrap",
          color: Theme3.text.secondary,
          maxHeight: 80,
          width: "100%",
          padding: ".75rem 1rem"
        },
        "> nav > div > i-menu-item > .desktop .title .heading": {
          borderRadius: "5px",
          padding: ".625rem 1.5rem"
        },
        ".show-dropdown > .link > .title .heading": {
          background: Theme3.background.main,
          color: Theme3.text.primary
        },
        "i-menu-item.menu-active > .desktop .title > .heading": {
          background: Theme3.background.main,
          color: Theme3.text.primary
        },
        "i-menu-item .title:hover > .heading": {
          background: Theme3.background.main,
          color: Theme3.text.primary
        },
        "i-menu-item > .desktop.dropdown > .link": {
          textOverflow: "ellipsis",
          borderBottom: "none",
          display: "block",
          width: "100%",
          padding: "0"
        },
        "i-menu-item > .desktop > button.link": {
          width: "100%"
        },
        "i-menu-item > .desktop.dropdown > .link .title": {
          paddingLeft: 0,
          height: "100%"
        },
        "i-menu-item > i-menu > .dropdown": {
          background: "#252a48",
          boxShadow: "0 4px 8px 0 rgb(0 0 0 / 20%)"
        },
        "i-menu-item": {
          transformOrigin: "0 0",
          width: "100%"
        },
        "i-menu-item .title .heading": {
          transition: "color .3s cubic-bezier(.645,.045,.355,1),border-color .3s cubic-bezier(.645,.045,.355,1),background .3s cubic-bezier(.645,.045,.355,1),padding .15s cubic-bezier(.645,.045,.355,1)"
        },
        "i-menu > .desktop.dropdown": {
          width: "auto",
          minWidth: 160,
          paddingTop: ".25rem",
          paddingBottom: ".25rem",
          transition: "border-color .3s cubic-bezier(.645,.045,.355,1),background .3s cubic-bezier(.645,.045,.355,1),padding .15s cubic-bezier(.645,.045,.355,1)"
        },
        "> nav > div > i-menu-item i-menu i-menu-item i-menu": {
          position: "absolute",
          left: "100%",
          top: 0,
          paddingLeft: "5px",
          $nest: {
            ".desktop.dropdown": {
              position: "relative"
            }
          }
        }
      }
    },
    ".os-mobile": {
      backgroundColor: "#252a48",
      position: "absolute",
      left: -999,
      top: "62px",
      transition: "all .3s ease-out",
      minWidth: "290px",
      zIndex: "9999",
      $nest: {
        "&.show-menu": {
          left: 0,
          transition: "all .5s ease-in"
        },
        "i-menu-item": {
          color: Theme3.colors.primary.main,
          whiteSpace: "nowrap",
          width: "100%",
          $nest: {
            "> .desktop": {
              padding: ".75rem 1rem",
              borderLeft: `2px solid transparent`
            }
          }
        },
        "i-menu-item.menu-active > .desktop": {
          borderLeft: `2px solid ${Theme3.colors.primary.main}`,
          background: "#464b65"
        },
        "i-menu-item:hover > .desktop": {
          background: "#303552"
        },
        ".heading, .heading i-label *": {
          fontWeight: "normal",
          fontSize: "1rem",
          color: Theme3.colors.primary.main
        },
        "> nav > div > i-menu-item .title .heading": {
          width: "100%",
          $nest: {
            "*": {
              fontWeight: 400,
              fontSize: 20
            },
            "i-slot": {
              width: "100%"
            }
          }
        },
        "> nav > div > i-menu-item.menu-active .title .heading *": {
          fontWeight: 700
        }
      }
    },
    ".btn-hamburger": {
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
      $nest: {
        "&:not(.disabled):hover": {
          backgroundColor: "transparent",
          background: "transparent",
          boxShadow: "none"
        }
      }
    },
    "i-menu.i-menu--horizontal > .desktop > .align": {
      alignItems: "stretch !important",
      gridGap: "5px !important"
    },
    ".dir-icon": {
      transition: "transform .24s"
    },
    ".btn": {
      height: "auto !important",
      cursor: "pointer",
      fontWeight: 600,
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "5px",
      backgroundColor: "transparent",
      $nest: {
        "&:hover": {
          transition: "all .2s ease-out"
        }
      }
    },
    ".btn-network": {
      padding: "6px 12px",
      backgroundColor: Theme3.background.main,
      border: "2px solid #FFB82F",
      color: Theme3.text.primary,
      borderRadius: 6,
      fontWeight: 400,
      $nest: {
        "&:hover": {
          backgroundColor: Theme3.background.main
        }
      }
    },
    ".btn-connect": {
      padding: ".375rem .5rem",
      border: "none",
      transition: "all .2s ease-out",
      $nest: {
        "&:hover": {
          opacity: ".9",
          transition: "all .2s ease-out"
        }
      }
    },
    ".my-wallet": {
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      background: Theme3.background.main,
      borderRadius: 6,
      height: 36,
      textAlign: "center",
      padding: "6px 10px",
      position: "relative"
    },
    ".address-info": {
      display: "flex",
      gap: ".5rem",
      lineHeight: "30px",
      alignItems: "center",
      justifyContent: "flex-end",
      marginTop: ".25rem"
    },
    ".os-modal": {
      borderRadius: 20,
      boxSizing: "border-box",
      fontSize: ".875rem",
      fontWeight: 400,
      $nest: {
        "i-icon": {
          display: "inline-block"
        },
        ".mr-2-5": {
          marginRight: "2.5rem"
        },
        "&.connect-modal > div > div": {
          width: 440,
          maxWidth: "100%",
          height: "auto"
        },
        "&.connect-modal .i-modal_content": {
          padding: "0 1.5rem"
        },
        "&.account-modal .i-modal_content": {
          padding: "1rem 1.5rem"
        },
        "&.account-modal > div > div": {
          height: "auto",
          minHeight: 200,
          width: 440,
          maxWidth: "100%"
        },
        "> div > div": {
          backgroundColor: Theme3.background.modal,
          height: "calc(100% - 160px)",
          borderRadius: 15,
          lineHeight: 1.5,
          wordWrap: "break-word",
          padding: 0,
          minHeight: 400,
          width: 360
        },
        ".i-modal_content": {
          padding: "0 1.25rem"
        },
        ".i-modal_header": {
          borderRadius: "20px 20px 0 0",
          background: "unset",
          padding: "16px 24px 0"
        },
        ".networkSection": {
          marginLeft: "-1.25rem",
          marginRight: "-1.25rem"
        },
        ".list-view": {
          $nest: {
            ".list-item:hover": {
              backgroundColor: "#51515c",
              $nest: {
                "> *": {
                  opacity: 1
                }
              }
            },
            ".list-item:not(:first-child)": {
              marginTop: ".5rem"
            },
            ".list-item": {
              backgroundColor: "#34343A",
              minHeight: "50px",
              position: "relative",
              borderRadius: 10,
              cursor: "pointer",
              border: "none",
              transition: "all .3s ease-in",
              overflow: "unset",
              $nest: {
                "&.disabled-network-selection": {
                  cursor: "default",
                  $nest: {
                    "&:hover > *": {
                      backgroundColor: "#34343A",
                      opacity: "0.5 !important"
                    }
                  }
                },
                "> *": {
                  opacity: 0.8
                }
              }
            },
            ".list-item.is-actived": {
              backgroundColor: "#51515c",
              $nest: {
                "> *": {
                  opacity: 1
                },
                "&:after": {
                  content: "''",
                  top: "50%",
                  left: 9,
                  position: "absolute",
                  background: "#20bf55",
                  borderRadius: "50%",
                  width: 10,
                  height: 10,
                  transform: "translate3d(-50%,-50%,0)"
                },
                ".custom-img": {
                  marginLeft: ".75rem"
                }
              }
            }
          }
        },
        ".networks": {
          marginTop: "1.5rem",
          height: "calc(100% - 160px)",
          overflowY: "auto",
          width: "100% !important",
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          $nest: {
            ".list-item": {
              padding: ".5rem"
            }
          }
        },
        ".wallets": {
          marginTop: ".5rem",
          $nest: {
            ".list-item": {
              padding: ".5rem",
              position: "relative"
            },
            ".list-item .image-container": {
              order: 2
            }
          }
        },
        ".small-label > *": {
          fontSize: ".875rem"
        },
        ".large-label > *": {
          fontSize: "1.25rem",
          lineHeight: 1.5
        },
        ".custom-link *": {
          color: Theme3.text.primary
        },
        ".custom-link a": {
          display: "inline-flex",
          alignItems: "center"
        }
      }
    },
    "@media screen and (max-width: 768px)": {
      $nest: {
        "#walletContainer": {
          marginLeft: "auto"
        },
        "#networkBalanceContainer": {
          $nest: {
            "i-label": {
              display: "none"
            },
            "i-image": {
              width: "2rem !important",
              height: "2rem"
            },
            ".btn-network": {
              background: "transparent",
              border: "none",
              boxShadow: "none",
              padding: 0,
              marginRight: "0.5rem !important"
            },
            ".my-wallet": {
              display: "none"
            }
          }
        }
      }
    }
  }
});

// src/main/nav.tsx
var import_assets3 = __toModule(require("@disperse/assets"));
var import_store3 = __toModule(require("@disperse/store"));
var Theme4 = import_components5.Styles.Theme.ThemeVars;
var Nav = class extends import_components5.Module {
  constructor(parent, options) {
    super(parent, options);
    this.walletInfo = {
      address: "",
      balance: "",
      networkId: 0
    };
    this.onChainChanged = async (chainId) => {
      this.walletInfo.networkId = chainId;
      this.selectedNetwork = import_store3.Networks[chainId];
      let wallet = import_eth_wallet.Wallet.getInstance();
      this.renderMobileMenu();
      this.renderDesktopMenu();
      const isConnected = wallet.isConnected;
      this.walletInfo.balance = isConnected ? (0, import_global2.formatNumber)((await wallet.balance).toFixed(), 2) : "0";
      this.updateConnectedStatus(isConnected);
      this.updateList(isConnected);
      if (!isConnected) {
        this.renderNetworkButton();
        const acivedElm = this.networkGroup.querySelector(".is-actived");
        acivedElm && acivedElm.classList.remove("is-actived");
        const connectingElm = this.networkGroup.querySelector(`[data-key="${chainId}"]`);
        connectingElm && connectingElm.classList.add("is-actived");
      }
    };
    this.updateConnectedStatus = (value) => {
      if (value) {
        this.renderNetworkButton();
        if (this.networkBalanceContainer.contains(this.walletBalanceElm)) {
          this.networkBalanceContainer.removeChild(this.walletBalanceElm);
        }
        const balanceLabel = this.walletBalanceElm.firstChild;
        balanceLabel.caption = this.walletInfo.balance;
        this.lbTokenSymbol.caption = this.getSymbol();
        this.networkBalanceContainer.append(this.walletBalanceElm);
        if (this.walletContainer.contains(this.walletConnectButton)) {
          this.walletContainer.removeChild(this.walletConnectButton);
        }
        this.walletDetailButton.caption = this.shortlyAddress;
        this.walletShortlyAddress = this.shortlyAddress;
        this.walletDetailPanel.append(this.walletDetailButton);
      } else {
        if (this.networkBalanceContainer.contains(this.walletBalanceElm)) {
          this.networkBalanceContainer.removeChild(this.walletBalanceElm);
        }
        if (this.walletDetailPanel.contains(this.walletDetailButton)) {
          this.walletDetailPanel.removeChild(this.walletDetailButton);
        }
        this.walletContainer.append(this.walletConnectButton);
      }
    };
    this.logout = async () => {
      await (0, import_store2.logoutWallet)();
      this.updateConnectedStatus(false);
      this.updateList(false);
      this.accountModal.visible = false;
    };
    this.openConnectModal = () => {
      this.showModal("connectModal", "Connect Wallet");
    };
    this.$eventBus = import_components5.application.EventBus;
    this.registerEvent();
  }
  get shortlyAddress() {
    const address = this.walletInfo.address;
    if (!address)
      return "No address selected";
    return address.substr(0, 6) + "..." + address.substr(-4);
  }
  registerEvent() {
    let wallet = import_eth_wallet.Wallet.getInstance();
    this.$eventBus.register(this, import_global2.EventId.ConnectWallet, this.openConnectModal);
    this.$eventBus.register(this, import_global2.EventId.ChangeNetwork, () => this.showModal("switchModal"));
    this.$eventBus.register(this, import_global2.EventId.IsWalletConnected, async (connected) => {
      if (connected) {
        this.walletInfo.address = wallet.address;
        this.walletInfo.balance = (0, import_global2.formatNumber)((await wallet.balance).toFixed(), 2);
        this.walletInfo.networkId = wallet.chainId;
      }
      this.selectedNetwork = import_store3.Networks[wallet.chainId];
      this.renderMobileMenu();
      this.renderDesktopMenu();
      this.updateConnectedStatus(connected);
      this.updateList(connected);
    });
    this.$eventBus.register(this, import_global2.EventId.IsWalletDisconnected, async (connected) => {
      this.selectedNetwork = import_store3.Networks[wallet.chainId];
      this.updateConnectedStatus(connected);
      this.updateList(connected);
    });
    this.$eventBus.register(this, import_global2.EventId.chainChanged, async (chainId) => {
      this.onChainChanged(chainId);
    });
  }
  async requestAccounts() {
    try {
      await this.wallet.web3.eth.requestAccounts();
    } catch (error) {
      console.error(error);
    }
  }
  async initData() {
    let accountsChangedEventHandler = async (account) => {
      (0, import_store3.setTokenMap)();
    };
    let chainChangedEventHandler = async (hexChainId) => {
      this.updateConnectedStatus(true);
      (0, import_store3.setTokenMap)();
    };
    const selectedProvider = localStorage.getItem("walletProvider");
    const isValidProvider = Object.values(import_eth_wallet.WalletPlugin).includes(selectedProvider);
    if ((0, import_store2.hasWallet)() && isValidProvider) {
      this.wallet = await (0, import_store2.connectWallet)(selectedProvider, {
        "accountsChanged": accountsChangedEventHandler,
        "chainChanged": chainChangedEventHandler
      });
    }
  }
  _getMenuData(list, mode, validMenuItemsFn) {
    const menuItems = [];
    list.filter(validMenuItemsFn).forEach((item, key) => {
      const linkTarget = item.isToExternal ? "_blank" : "_self";
      const _menuItem = {
        title: item.text,
        link: { href: item.to, target: linkTarget }
      };
      if (mode === "mobile" && item.img) {
        _menuItem.icon = { width: 24, height: 24, image: { width: 24, height: 24, url: import_assets3.default.fullPath(item.img) } };
      }
      if (item.subItems && item.subItems.length) {
        _menuItem.items = this._getMenuData(item.subItems, mode, validMenuItemsFn);
      }
      menuItems.push(_menuItem);
    });
    return menuItems;
  }
  getMenuData(list, mode) {
    var _a;
    let chainId = ((_a = this.selectedNetwork) == null ? void 0 : _a.chainId) || import_eth_wallet.Wallet.getInstance().chainId;
    let siteEnv = (0, import_store3.getSiteEnv)();
    let validMenuItemsFn;
    if (chainId) {
      validMenuItemsFn = (item) => !item.isDisabled && (!item.supportedChainIds || item.supportedChainIds.includes(chainId)) && (!item.env || item.env.some((v) => v === siteEnv));
    } else {
      validMenuItemsFn = (item) => !item.isDisabled && (!item.env || item.env.some((v) => v === siteEnv));
    }
    return this._getMenuData(list, mode, validMenuItemsFn);
  }
  renderMobileMenu() {
    const data = this.getMenuData(this._menuItems, "mobile");
    this.mobileMenu.data = data;
  }
  renderDesktopMenu() {
    const data = this.getMenuData(this._menuItems, "desktop");
    this.desktopMenu.data = data;
  }
  toggleMenu() {
    if (!this.enabled) {
      this.mobileMenu.classList.remove("show-menu");
      return;
    }
    const shownMenu = this.mobileMenu.classList.contains("show-menu");
    shownMenu ? this.mobileMenu.classList.remove("show-menu") : this.mobileMenu.classList.add("show-menu");
  }
  showModal(name, title = "") {
    const modalELm = this[name];
    title && (modalELm.title = title);
    if (name === "switchModal") {
      this.updateListNetworkUI();
    } else if (name === "accountModal") {
      this.explorerName.caption = `<i-icon name="external-link-alt" width=${16} height=${16} fill="${Theme4.text.primary}"></i-icon> View on ${(0, import_store2.getNetworkType)(this.walletInfo.networkId)}`;
    }
    modalELm.visible = true;
  }
  isLive(walletPlugin) {
    var _a;
    const provider = walletPlugin == null ? void 0 : walletPlugin.toLowerCase();
    return import_eth_wallet.Wallet.isInstalled(walletPlugin) && ((_a = import_eth_wallet.Wallet.getInstance().clientSideProvider) == null ? void 0 : _a.walletPlugin) === provider;
  }
  isNetworkLive(chainId) {
    return import_eth_wallet.Wallet.getInstance().chainId === chainId;
  }
  async switchNetwork(chainId) {
    if (!chainId)
      return;
    await (0, import_store2.switchNetwork)(chainId);
    this.switchModal.visible = false;
  }
  openLink(link) {
    return window.open(link, "_blank");
  }
  async connectToProviderFunc(walletPlugin) {
    if (import_eth_wallet.Wallet.isInstalled(walletPlugin)) {
      await (0, import_store2.connectWallet)(walletPlugin);
    } else {
      let config = import_eth_wallet.WalletPluginConfig[walletPlugin];
      let homepage = (config == null ? void 0 : config.homepage) ? config.homepage() : "";
      this.openLink(homepage);
    }
    this.connectModal.visible = false;
  }
  getSymbol() {
    var _a;
    let symbol = "";
    if (((_a = this.selectedNetwork) == null ? void 0 : _a.chainId) && import_store3.ChainNativeTokenByChainId[this.selectedNetwork.chainId]) {
      symbol = import_store3.ChainNativeTokenByChainId[this.selectedNetwork.chainId].symbol;
    }
    return symbol;
  }
  openWalletAddressInExplorer() {
    let explorerURL = import_global2.explorerAddressUrlsByChainId[this.walletInfo.networkId];
    if (!explorerURL)
      return console.log(`Failed to find a block explorer for network ${this.walletInfo.networkId}`);
    this.openLink(explorerURL + this.walletInfo.address);
  }
  async renderWalletBalance() {
    this.walletBalanceElm = new import_components5.Panel();
    this.walletBalanceElm.classList.add("my-wallet");
    const balanceLabel = await import_components5.Label.create({ font: { size: "15px" } });
    balanceLabel.caption = this.walletInfo.balance;
    this.walletBalanceElm.appendChild(balanceLabel);
    this.lbTokenSymbol = await import_components5.Label.create({ font: { size: "15px" } });
    this.lbTokenSymbol.id = "lbTokenSymbol";
    this.lbTokenSymbol.caption = this.getSymbol();
    this.lbTokenSymbol.style.marginLeft = "4px";
    this.walletBalanceElm.appendChild(this.lbTokenSymbol);
  }
  async renderWalletButton() {
    this.walletDetailButton = await import_components5.Button.create({
      caption: this.shortlyAddress,
      padding: { top: "0.5rem", bottom: "0.5rem", left: "0.75rem", right: "0.75rem" },
      margin: { left: 12 },
      font: { size: "15px" }
    });
    const modalElm = await import_components5.Modal.create({
      maxWidth: "200px",
      showBackdrop: false,
      height: "auto",
      popupPlacement: "bottomRight"
    });
    modalElm.classList.add("account-dropdown");
    const vstack = await import_components5.VStack.create({
      gap: "15px"
    });
    const itemCaptions = ["Account", "Switch wallet", "Logout"];
    const itemFunctions = [
      () => this.showModal("accountModal"),
      () => this.showModal("connectModal", "Switch wallet"),
      this.logout
    ];
    itemCaptions.forEach(async (caption, i) => {
      const buttonItem = await import_components5.Button.create({
        caption,
        width: "100%",
        height: "auto",
        padding: { top: "0.5rem", bottom: "0.5rem", left: "0.75rem", right: "0.75rem" }
      });
      buttonItem.onClick = (source, event) => {
        event.stopPropagation();
        modalElm.visible = false;
        itemFunctions[i]();
        return true;
      };
      vstack.appendChild(buttonItem);
      modalElm.item = vstack;
    });
    this.walletDetailPanel.appendChild(modalElm);
    this.walletDetailButton.classList.add("btn-os");
    this.walletDetailButton.onClick = () => modalElm.visible = !modalElm.visible;
    this.walletConnectButton = await import_components5.Button.create({
      caption: "Connect Wallet",
      margin: { left: 8 }
    });
    this.walletConnectButton.classList.add("btn", "btn-os", "btn-connect");
    this.walletConnectButton.onClick = this.openConnectModal;
    this.walletContainer.append(this.walletConnectButton);
  }
  async renderNetworkButton() {
    var _a, _b;
    const hStack = await import_components5.HStack.create();
    hStack.verticalAlignment = "center";
    if ((_a = this.selectedNetwork) == null ? void 0 : _a.icon) {
      const image = await import_components5.Image.create();
      image.url = import_assets3.default.fullPath(`img/network/${this.selectedNetwork.icon}`);
      image.width = "24px";
      image.classList.add("inline-block");
      hStack.appendChild(image);
    }
    const label = await import_components5.Label.create({
      caption: ((_b = this.selectedNetwork) == null ? void 0 : _b.label) || "Unsupported Network",
      font: { size: "15px" },
      margin: { left: 4 }
    });
    hStack.appendChild(label);
    this.networkButton = await import_components5.Button.create({ margin: { right: 16 } });
    this.networkButton.classList.add("btn", "btn-network");
    this.networkButton.onClick = () => this.showModal("switchModal");
    this.networkButton.appendChild(hStack);
    this.networkButtonContainer.clearInnerHTML();
    this.networkButtonContainer.appendChild(this.networkButton);
  }
  renderNetworks() {
    this.networkGroup.clearInnerHTML();
    const networksList = (0, import_store2.listsNetworkShow)();
    this.networkGroup.append(...networksList.map((network) => {
      return /* @__PURE__ */ this.$render("i-hstack", {
        onClick: () => this.switchNetwork(network.chainId),
        class: this.isNetworkLive(network.chainId) ? "is-actived list-item" : "list-item",
        "data-key": network.chainId,
        verticalAlignment: "center",
        gap: 10
      }, /* @__PURE__ */ this.$render("i-image", {
        url: import_assets3.default.fullPath(`img/network/${network.img}`),
        width: 32,
        height: 32,
        display: "inline-block",
        margin: { left: 12 }
      }), /* @__PURE__ */ this.$render("i-label", {
        caption: network.label
      }));
    }));
  }
  renderWalletList() {
    this.walletListElm.clearInnerHTML();
    let wallets = [];
    let walletsDisabled = [];
    import_store2.walletList.forEach((wallet) => {
      let walletEnabled = this.isWalletEnabled(wallet.name);
      let walletJSX = /* @__PURE__ */ this.$render("i-hstack", {
        onClick: () => this.connectToProviderFunc(wallet.name),
        class: this.isLive(wallet.name) ? "is-actived list-item" : "list-item",
        "data-key": wallet.name,
        enabled: walletEnabled,
        verticalAlignment: "center",
        gap: 10
      }, /* @__PURE__ */ this.$render("i-image", {
        url: import_assets3.default.fullPath(`img/wallet/${wallet.iconFile}`),
        width: 32,
        height: 32,
        class: "inline-block custom-img"
      }), /* @__PURE__ */ this.$render("i-label", {
        caption: wallet.displayName
      }));
      walletEnabled ? wallets.push(walletJSX) : walletsDisabled.push(walletJSX);
    });
    this.walletListElm.append(...wallets);
    this.walletListElm.append(...walletsDisabled);
  }
  updateDot(parent, connected, type) {
    var _a;
    const acivedElm = parent.querySelector(".is-actived");
    acivedElm && acivedElm.classList.remove("is-actived");
    if (connected) {
      const wallet = import_eth_wallet.Wallet.getInstance();
      const connectingVal = type === "network" ? wallet.chainId : (_a = wallet.clientSideProvider) == null ? void 0 : _a.walletPlugin;
      const connectingElm = parent.querySelector(`[data-key="${connectingVal}"]`);
      connectingElm && connectingElm.classList.add("is-actived");
    }
  }
  isWalletEnabled(walletName) {
    switch ((0, import_store3.getSiteEnv)()) {
      case import_global2.SITE_ENV.TESTNET: {
        switch (walletName) {
          case import_eth_wallet.WalletPlugin.ONTOWallet:
          case import_eth_wallet.WalletPlugin.Coin98:
          case import_eth_wallet.WalletPlugin.TrustWallet:
            return false;
        }
        break;
      }
      case import_global2.SITE_ENV.MAINNET: {
        break;
      }
      case import_global2.SITE_ENV.DEV: {
        break;
      }
    }
    return true;
  }
  updateListNetworkUI() {
    var _a, _b;
    const listElm = ((_a = this.networkGroup) == null ? void 0 : _a.querySelectorAll(".list-item")) || [];
    const isConnected = (_b = import_eth_wallet.Wallet.getInstance()) == null ? void 0 : _b.isConnected;
    const isMetaMask = (0, import_store2.getWalletProvider)() === import_eth_wallet.WalletPlugin.MetaMask;
    for (const elm of listElm) {
      if (isMetaMask || !isConnected) {
        elm.classList.remove("disabled-network-selection");
      } else {
        elm.classList.add("disabled-network-selection");
      }
    }
  }
  updateList(connected) {
    if (connected) {
      this.noteNetworkLabel.caption = (0, import_store2.getWalletProvider)() === import_eth_wallet.WalletPlugin.MetaMask ? "We supports the following networks, please click to connect." : "We supports the following networks, please switch network in the connected wallet.";
    } else {
      this.noteNetworkLabel.caption = "We supports the following networks, please click to connect.";
    }
    this.updateDot(this.walletListElm, connected, "wallet");
    this.updateDot(this.networkGroup, connected, "network");
  }
  controlMenuDisplay() {
    if (window.innerWidth < 768) {
      this.mobileMenuStack.visible = true;
      this.desktopMenuStack.visible = false;
    } else {
      this.mobileMenuStack.visible = false;
      this.desktopMenuStack.visible = true;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("resize", (e) => {
      this.controlMenuDisplay();
    });
  }
  getElementProperty(name) {
    let value;
    if (this.attrs[name] && this.attrs[name].__target) {
      value = this.getValue(this.attrs[name].__target, this.attrs[name].__path);
    }
    return value;
  }
  async init() {
    document.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    this.classList.add(nav_css_default);
    this.selectedNetwork = import_store3.Networks[(0, import_store2.getDefaultChainId)()];
    super.init();
    this._menuItems = this.getElementProperty("menuItems");
    this.renderMobileMenu();
    this.renderDesktopMenu();
    this.controlMenuDisplay();
    this.renderWalletBalance();
    await this.renderWalletButton();
    this.renderNetworkButton();
    this.renderNetworks();
    this.renderWalletList();
    this.walletShortlyAddress = this.shortlyAddress;
    await this.initData();
    this.getSymbol();
    this.copyIcon.onClick = () => import_components5.application.copyToClipboard(this.walletInfo.address || "");
  }
  async render() {
    return /* @__PURE__ */ this.$render("i-hstack", {
      width: "100%",
      height: "5rem",
      border: { bottom: { width: "2px", style: "solid", color: "#FF8800" } },
      padding: { top: "0.9375rem", bottom: "0.625rem", left: "1rem", right: "1rem" }
    }, /* @__PURE__ */ this.$render("i-hstack", {
      stack: { grow: "1" },
      horizontalAlignment: "space-between",
      verticalAlignment: "center"
    }, /* @__PURE__ */ this.$render("i-hstack", {
      id: "mobileMenuStack",
      class: "mobile",
      verticalAlignment: "center",
      visible: false
    }, /* @__PURE__ */ this.$render("i-button", {
      id: "hamburger",
      onClick: this.toggleMenu,
      class: "btn-hamburger mr-1"
    }, /* @__PURE__ */ this.$render("i-image", {
      url: import_assets3.default.fullPath("img/burger-menu-24.png"),
      width: "20px",
      height: "20px",
      class: "inline-block"
    })), /* @__PURE__ */ this.$render("i-menu", {
      id: "mobileMenu",
      mode: "vertical",
      class: "os-mobile"
    }), /* @__PURE__ */ this.$render("i-image", {
      url: import_assets3.default.fullPath("img/sc-header.png"),
      width: 40,
      height: 40,
      onClick: () => window.location.assign("#/disperse"),
      class: "mobile-logo pointer"
    })), /* @__PURE__ */ this.$render("i-hstack", {
      id: "desktopMenuStack",
      wrap: "nowrap",
      verticalAlignment: "center",
      maxWidth: "calc(100% - 640px)"
    }, /* @__PURE__ */ this.$render("i-image", {
      stack: { shrink: "0" },
      width: 200,
      url: import_assets3.default.fullPath("img/sc-logo.svg"),
      onClick: () => window.location.assign("#/disperse"),
      margin: { left: 8, right: 20 },
      class: "desktop-logo pointer"
    }), /* @__PURE__ */ this.$render("i-menu", {
      id: "desktopMenu",
      class: "os-menu"
    })), /* @__PURE__ */ this.$render("i-hstack", {
      id: "walletContainer",
      horizontalAlignment: "end",
      verticalAlignment: "center"
    }, /* @__PURE__ */ this.$render("i-hstack", {
      id: "networkBalanceContainer",
      verticalAlignment: "center",
      padding: { left: "1rem" }
    }, /* @__PURE__ */ this.$render("i-hstack", {
      id: "networkButtonContainer"
    })), /* @__PURE__ */ this.$render("i-panel", {
      id: "walletDetailPanel"
    }))), /* @__PURE__ */ this.$render("i-modal", {
      id: "switchModal",
      title: "Supported Network",
      closeIcon: { name: "times" },
      class: "os-modal"
    }, /* @__PURE__ */ this.$render("i-vstack", {
      height: "100%",
      class: "i-modal_content"
    }, /* @__PURE__ */ this.$render("i-label", {
      id: "noteNetworkLabel",
      class: "mt-1 small-label",
      caption: "We supports the following networks, please click to connect."
    }), /* @__PURE__ */ this.$render("i-panel", {
      class: "flex networkSection",
      height: "100%"
    }, /* @__PURE__ */ this.$render("i-grid-layout", {
      id: "networkGroup",
      class: "list-view networks",
      columnsPerRow: 1,
      templateRows: ["max-content"]
    })))), /* @__PURE__ */ this.$render("i-modal", {
      id: "connectModal",
      title: "Connect Wallet",
      class: "os-modal connect-modal",
      closeIcon: { name: "times", fill: Theme4.colors.secondary.main }
    }, /* @__PURE__ */ this.$render("i-panel", {
      class: "i-modal_content"
    }, /* @__PURE__ */ this.$render("i-label", {
      class: "mt-1 small-label",
      caption: "Recommended wallet for Chrome"
    }), /* @__PURE__ */ this.$render("i-panel", {
      padding: { bottom: 16 }
    }, /* @__PURE__ */ this.$render("i-grid-layout", {
      id: "walletListElm",
      class: "list-view wallets",
      columnsPerRow: 1,
      templateRows: ["max-content"]
    })))), /* @__PURE__ */ this.$render("i-modal", {
      id: "accountModal",
      title: "Account",
      class: "os-modal account-modal",
      closeIcon: { name: "times", fill: Theme4.colors.secondary.main }
    }, /* @__PURE__ */ this.$render("i-panel", {
      class: "i-modal_content"
    }, /* @__PURE__ */ this.$render("i-hstack", {
      horizontalAlignment: "space-between",
      verticalAlignment: "center"
    }, /* @__PURE__ */ this.$render("i-label", {
      class: "small-label",
      caption: "Connected with"
    }), /* @__PURE__ */ this.$render("i-button", {
      caption: "Logout",
      class: "btn btn-os btn-connect",
      onClick: this.logout
    })), /* @__PURE__ */ this.$render("i-label", {
      caption: this.walletShortlyAddress,
      class: "large-label bold"
    }), /* @__PURE__ */ this.$render("i-hstack", {
      verticalAlignment: "center",
      margin: { top: 8 },
      gap: "4px"
    }, /* @__PURE__ */ this.$render("i-label", {
      id: "copyIcon",
      caption: `<i-icon name="copy" width=${16} height=${16} fill="${Theme4.text.primary}"></i-icon><span>Copy Address</span>`,
      class: "pointer bold small-label mr-2-5",
      tooltip: { content: `The address has been copied`, trigger: "click" }
    }), /* @__PURE__ */ this.$render("i-label", {
      id: "explorerName",
      caption: `<i-icon name="external-link-alt" width=${16} height=${16} fill="${Theme4.text.primary}"></i-icon><span>View on Etherscan</span`,
      class: "custom-link pointer",
      font: { size: ".875rem", bold: true },
      onClick: this.openWalletAddressInExplorer
    })))));
  }
};
__decorateClass([
  (0, import_components5.observable)()
], Nav.prototype, "walletShortlyAddress", 2);
__decorateClass([
  (0, import_components5.observable)()
], Nav.prototype, "walletInfo", 2);
Nav = __decorateClass([
  (0, import_components5.customElements)("disperse-main-nav")
], Nav);

// src/main/footer.tsx
var import_components6 = __toModule(require("@ijstech/components"));
var import_assets4 = __toModule(require("@disperse/assets"));
var Footer = class extends import_components6.Module {
  constructor(parent, options) {
    super(parent, options);
  }
  getElementProperty(name) {
    let value;
    if (this.attrs[name] && this.attrs[name].__target) {
      value = this.getValue(this.attrs[name].__target, this.attrs[name].__path);
    }
    return value;
  }
  controlPageStackDisplay() {
    this.pagesStack.visible = window.innerWidth >= 768;
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("resize", (e) => {
      this.controlPageStackDisplay();
    });
  }
  async init() {
    super.init();
    const params = this.getElementProperty("params");
    const projectInfo = params.projectInfo;
    this.secureComputeStack.appendChild(/* @__PURE__ */ this.$render("i-image", {
      url: import_assets4.default.fullPath(projectInfo.img)
    }));
    this.secureComputeStack.appendChild(/* @__PURE__ */ this.$render("i-vstack", {
      gap: 4,
      margin: { top: 10 }
    }, /* @__PURE__ */ this.$render("i-label", {
      font: { size: "1rem", bold: true },
      caption: "SECURE COMPUTE"
    }), /* @__PURE__ */ this.$render("i-label", {
      font: { size: "0.85rem" },
      caption: projectInfo.versionText
    })));
    if (params.socialMediaInfo) {
      const socialMediaInfoList = params.socialMediaInfo;
      for (const info of socialMediaInfoList) {
        this.socialMediaStack.appendChild(/* @__PURE__ */ this.$render("i-label", {
          link: { href: info.link }
        }, /* @__PURE__ */ this.$render("i-image", {
          url: import_assets4.default.fullPath(info.img),
          width: "24px"
        })));
      }
    }
    if (params.footerPagesInfo) {
      const footerPagesInfoList = params.footerPagesInfo;
      for (const info of footerPagesInfoList) {
        this.pagesStack.appendChild(/* @__PURE__ */ this.$render("i-label", {
          font: { color: "#fff" },
          link: { href: info.link }
        }, /* @__PURE__ */ this.$render("i-label", {
          font: { size: "0.85rem" },
          caption: info.caption
        })));
      }
    }
    this.controlPageStackDisplay();
  }
  render() {
    return /* @__PURE__ */ this.$render("i-hstack", {
      background: { color: "#F29224" },
      wrap: "nowrap",
      padding: { top: "1rem", bottom: "1rem", right: "2rem", left: "2rem" },
      width: "100%",
      horizontalAlignment: "space-between",
      verticalAlignment: "center"
    }, /* @__PURE__ */ this.$render("i-hstack", {
      id: "secureComputeStack",
      gap: 8
    }), /* @__PURE__ */ this.$render("i-hstack", {
      id: "pagesStack",
      gap: 24,
      verticalAlignment: "center"
    }), /* @__PURE__ */ this.$render("i-hstack", {
      id: "socialMediaStack",
      gap: 16,
      horizontalAlignment: "end",
      verticalAlignment: "center"
    }));
  }
};
Footer = __decorateClass([
  (0, import_components6.customElements)("disperse-main-footer")
], Footer);

// src/main/index.tsx
import_components7.Styles.Theme.applyTheme(import_components7.Styles.Theme.darkTheme);
var MainLauncher = class extends import_components7.Module {
  constructor(parent, options) {
    super(parent, options);
    this.modules = {};
    this.moduleDependenciesMapper = new Map();
    this.classList.add(index_css_default);
    this.modulesMapper = new Map();
    let defaultRoute;
    if (options) {
      this.siteEnv = options.env || "";
      (0, import_store4.setSiteEnv)(this.siteEnv);
      (0, import_store4.setCurrentChainId)((0, import_store4.getDefaultChainId)());
      this.params = options.params;
      this.menuItems = options.menuItems || [];
      if (Array.isArray(options.routes)) {
        for (let i = 0; i < options.routes.length; i++) {
          let route = options.routes[i];
          if (route.default)
            defaultRoute = route;
          this.modulesMapper.set(route.url, route.module);
          this.moduleDependenciesMapper.set(route.module, route);
        }
      }
    }
    window.onhashchange = this.locationHashChanged.bind(this);
    if (defaultRoute && !location.hash)
      location.hash = defaultRoute.url;
    else
      setTimeout(() => {
        this.locationHashChanged();
      }, 1);
    this.$eventBus = import_components7.application.EventBus;
  }
  get isTestnet() {
    return this.siteEnv === import_global3.SITE_ENV.TESTNET;
  }
  async locationHashChanged() {
    var _a;
    const path = location.hash.split("?")[0];
    if (this.currentPath === path)
      return;
    await this.hideModule(this.currentPath);
    this.currentPath = path;
    if (!this.pageWrap) {
      this.pageWrap = document.getElementById("pageWrap");
    }
    if (!this.modulesMapper.has(path)) {
      this.networkMsg.visible = true;
      this.networkMsg.caption = "Page Not Available";
    } else {
      const modulePath = (_a = this.modulesMapper.get(path)) != null ? _a : "";
      await this.handleLoadModule(modulePath);
    }
  }
  async handleLoadModule(modulePath) {
    var _a;
    if (!this.checkTestingEnabled()) {
      if (!this.currentPath) {
        this.currentPath = location.hash.split("?")[0];
      }
      this.networkMsg.visible = true;
      this.networkMsg.caption = (0, import_store4.isWalletConnected)() ? `This network <b>${((_a = import_store4.Networks[(0, import_store4.getChainId)()]) == null ? void 0 : _a.label) || ""}</b> is not supported!` : "Please connect with your wallet!";
      this.hideModule(this.currentPath);
      return;
    }
    this.networkMsg.visible = false;
    let module2 = await this.loadModule(modulePath);
    if (module2) {
      if (this.pageWrap.contains(module2))
        module2.style.display = "initial";
      else
        this.pageWrap.append(module2);
      module2.onLoad();
    }
  }
  async loadModule(modulePath) {
    if (this.modules[modulePath])
      return this.modules[modulePath];
    let module2 = await import_components7.application.newModule(modulePath, this.moduleDependenciesMapper.get(modulePath));
    if (module2)
      this.modules[modulePath] = module2;
    return module2;
  }
  async hideModule(path) {
    var _a;
    if (!path || !this.modulesMapper.has(path))
      return;
    const modulePath = (_a = this.modulesMapper.get(path)) != null ? _a : "";
    let module2 = this.modules[modulePath];
    if (module2)
      module2.style.display = "none";
  }
  reloadModule() {
    var _a;
    if (this.isTestnet) {
      const modulePath = (_a = this.modulesMapper.get(this.currentPath)) != null ? _a : "";
      this.handleLoadModule(modulePath);
    }
  }
  checkTestingEnabled() {
    if (this.isTestnet) {
      const chainId = (0, import_store4.getChainId)();
      return (0, import_store4.listsNetworkShow)().some((network) => network.chainId === chainId);
    }
    return true;
  }
  registerEvent() {
    this.$eventBus.register(this, import_global3.EventId.IsWalletConnected, this.reloadModule);
    this.$eventBus.register(this, import_global3.EventId.chainChanged, this.reloadModule);
  }
  init() {
    super.init();
    this.handleResultModal();
    this.registerEvent();
  }
  handleResultModal() {
    this.resultMain = new Result();
    this.appendChild(this.resultMain);
    this.$eventBus.register(this, import_global3.EventId.ShowResult, () => {
      this.resultMain.showModal();
    });
    this.$eventBus.register(this, import_global3.EventId.SetResultMessage, (message) => {
      this.resultMain.message = message;
    });
  }
  render() {
    return /* @__PURE__ */ this.$render("i-vstack", {
      height: "100vh"
    }, /* @__PURE__ */ this.$render("disperse-main-nav", {
      menuItems: this.menuItems,
      height: "auto",
      width: "100%"
    }), /* @__PURE__ */ this.$render("i-panel", {
      id: "pageWrap",
      stack: { grow: "1", shrink: "0" }
    }, /* @__PURE__ */ this.$render("i-label", {
      id: "networkMsg",
      class: "network-msg"
    })), /* @__PURE__ */ this.$render("disperse-main-footer", {
      params: this.params,
      stack: { shrink: "0" },
      width: "100%"
    }));
  }
};
MainLauncher = __decorateClass([
  import_components7.customModule,
  (0, import_components7.customElements)("disperse-main-launcher")
], MainLauncher);
  
  });