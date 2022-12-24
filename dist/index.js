(() => {
  var __defProp = Object.defineProperty;
  var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
    get: (a, b2) => (typeof require !== "undefined" ? require : a)[b2]
  }) : x2)(function(x2) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x2 + '" is not supported');
  });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // node_modules/device-decoder/dist/device.frontend.esm.js
  var __create = Object.create;
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require2 = ((x2) => typeof __require !== "undefined" ? __require : typeof Proxy !== "undefined" ? new Proxy(x2, { get: (a, b2) => (typeof __require !== "undefined" ? __require : a)[b2] }) : x2)(function(x2) {
    if (typeof __require !== "undefined")
      return __require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x2 + '" is not supported');
  });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require3() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target, mod));
  var createCapacitorPlatforms;
  var initPlatforms;
  var CapacitorPlatforms;
  var addPlatform;
  var setPlatform;
  var ExceptionCode;
  var CapacitorException;
  var getPlatformId;
  var createCapacitor;
  var initCapacitorGlobal;
  var Capacitor;
  var registerPlugin;
  var Plugins;
  var WebPlugin;
  var init_dist = __esm({ "ble/node_modules/@capacitor/core/dist/index.js"() {
    createCapacitorPlatforms = (win) => {
      const defaultPlatformMap = /* @__PURE__ */ new Map();
      defaultPlatformMap.set("web", { name: "web" });
      const capPlatforms = win.CapacitorPlatforms || { currentPlatform: { name: "web" }, platforms: defaultPlatformMap };
      const addPlatform2 = (name, platform) => {
        capPlatforms.platforms.set(name, platform);
      };
      const setPlatform2 = (name) => {
        if (capPlatforms.platforms.has(name)) {
          capPlatforms.currentPlatform = capPlatforms.platforms.get(name);
        }
      };
      capPlatforms.addPlatform = addPlatform2;
      capPlatforms.setPlatform = setPlatform2;
      return capPlatforms;
    };
    initPlatforms = (win) => win.CapacitorPlatforms = createCapacitorPlatforms(win);
    CapacitorPlatforms = initPlatforms(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
    addPlatform = CapacitorPlatforms.addPlatform;
    setPlatform = CapacitorPlatforms.setPlatform;
    (function(ExceptionCode2) {
      ExceptionCode2["Unimplemented"] = "UNIMPLEMENTED";
      ExceptionCode2["Unavailable"] = "UNAVAILABLE";
    })(ExceptionCode || (ExceptionCode = {}));
    CapacitorException = class extends Error {
      constructor(message, code, data) {
        super(message);
        this.message = message;
        this.code = code;
        this.data = data;
      }
    };
    getPlatformId = (win) => {
      var _a, _b;
      if (win === null || win === void 0 ? void 0 : win.androidBridge) {
        return "android";
      } else if ((_b = (_a = win === null || win === void 0 ? void 0 : win.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.bridge) {
        return "ios";
      } else {
        return "web";
      }
    };
    createCapacitor = (win) => {
      var _a, _b, _c, _d, _e;
      const capCustomPlatform = win.CapacitorCustomPlatform || null;
      const cap = win.Capacitor || {};
      const Plugins2 = cap.Plugins = cap.Plugins || {};
      const capPlatforms = win.CapacitorPlatforms;
      const defaultGetPlatform = () => {
        return capCustomPlatform !== null ? capCustomPlatform.name : getPlatformId(win);
      };
      const getPlatform = ((_a = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _a === void 0 ? void 0 : _a.getPlatform) || defaultGetPlatform;
      const defaultIsNativePlatform = () => getPlatform() !== "web";
      const isNativePlatform = ((_b = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _b === void 0 ? void 0 : _b.isNativePlatform) || defaultIsNativePlatform;
      const defaultIsPluginAvailable = (pluginName) => {
        const plugin = registeredPlugins.get(pluginName);
        if (plugin === null || plugin === void 0 ? void 0 : plugin.platforms.has(getPlatform())) {
          return true;
        }
        if (getPluginHeader(pluginName)) {
          return true;
        }
        return false;
      };
      const isPluginAvailable = ((_c = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _c === void 0 ? void 0 : _c.isPluginAvailable) || defaultIsPluginAvailable;
      const defaultGetPluginHeader = (pluginName) => {
        var _a2;
        return (_a2 = cap.PluginHeaders) === null || _a2 === void 0 ? void 0 : _a2.find((h) => h.name === pluginName);
      };
      const getPluginHeader = ((_d = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _d === void 0 ? void 0 : _d.getPluginHeader) || defaultGetPluginHeader;
      const handleError = (err) => win.console.error(err);
      const pluginMethodNoop = (_target, prop, pluginName) => {
        return Promise.reject(`${pluginName} does not have an implementation of "${prop}".`);
      };
      const registeredPlugins = /* @__PURE__ */ new Map();
      const defaultRegisterPlugin = (pluginName, jsImplementations = {}) => {
        const registeredPlugin = registeredPlugins.get(pluginName);
        if (registeredPlugin) {
          console.warn(`Capacitor plugin "${pluginName}" already registered. Cannot register plugins twice.`);
          return registeredPlugin.proxy;
        }
        const platform = getPlatform();
        const pluginHeader = getPluginHeader(pluginName);
        let jsImplementation;
        const loadPluginImplementation = async () => {
          if (!jsImplementation && platform in jsImplementations) {
            jsImplementation = typeof jsImplementations[platform] === "function" ? jsImplementation = await jsImplementations[platform]() : jsImplementation = jsImplementations[platform];
          } else if (capCustomPlatform !== null && !jsImplementation && "web" in jsImplementations) {
            jsImplementation = typeof jsImplementations["web"] === "function" ? jsImplementation = await jsImplementations["web"]() : jsImplementation = jsImplementations["web"];
          }
          return jsImplementation;
        };
        const createPluginMethod = (impl, prop) => {
          var _a2, _b2;
          if (pluginHeader) {
            const methodHeader = pluginHeader === null || pluginHeader === void 0 ? void 0 : pluginHeader.methods.find((m) => prop === m.name);
            if (methodHeader) {
              if (methodHeader.rtype === "promise") {
                return (options2) => cap.nativePromise(pluginName, prop.toString(), options2);
              } else {
                return (options2, callback) => cap.nativeCallback(pluginName, prop.toString(), options2, callback);
              }
            } else if (impl) {
              return (_a2 = impl[prop]) === null || _a2 === void 0 ? void 0 : _a2.bind(impl);
            }
          } else if (impl) {
            return (_b2 = impl[prop]) === null || _b2 === void 0 ? void 0 : _b2.bind(impl);
          } else {
            throw new CapacitorException(`"${pluginName}" plugin is not implemented on ${platform}`, ExceptionCode.Unimplemented);
          }
        };
        const createPluginMethodWrapper = (prop) => {
          let remove;
          const wrapper = (...args) => {
            const p = loadPluginImplementation().then((impl) => {
              const fn = createPluginMethod(impl, prop);
              if (fn) {
                const p2 = fn(...args);
                remove = p2 === null || p2 === void 0 ? void 0 : p2.remove;
                return p2;
              } else {
                throw new CapacitorException(`"${pluginName}.${prop}()" is not implemented on ${platform}`, ExceptionCode.Unimplemented);
              }
            });
            if (prop === "addListener") {
              p.remove = async () => remove();
            }
            return p;
          };
          wrapper.toString = () => `${prop.toString()}() { [capacitor code] }`;
          Object.defineProperty(wrapper, "name", { value: prop, writable: false, configurable: false });
          return wrapper;
        };
        const addListener = createPluginMethodWrapper("addListener");
        const removeListener = createPluginMethodWrapper("removeListener");
        const addListenerNative = (eventName, callback) => {
          const call = addListener({ eventName }, callback);
          const remove = async () => {
            const callbackId = await call;
            removeListener({ eventName, callbackId }, callback);
          };
          const p = new Promise((resolve) => call.then(() => resolve({ remove })));
          p.remove = async () => {
            console.warn(`Using addListener() without 'await' is deprecated.`);
            await remove();
          };
          return p;
        };
        const proxy = new Proxy({}, { get(_2, prop) {
          switch (prop) {
            case "$$typeof":
              return void 0;
            case "toJSON":
              return () => ({});
            case "addListener":
              return pluginHeader ? addListenerNative : addListener;
            case "removeListener":
              return removeListener;
            default:
              return createPluginMethodWrapper(prop);
          }
        } });
        Plugins2[pluginName] = proxy;
        registeredPlugins.set(pluginName, { name: pluginName, proxy, platforms: /* @__PURE__ */ new Set([...Object.keys(jsImplementations), ...pluginHeader ? [platform] : []]) });
        return proxy;
      };
      const registerPlugin2 = ((_e = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _e === void 0 ? void 0 : _e.registerPlugin) || defaultRegisterPlugin;
      if (!cap.convertFileSrc) {
        cap.convertFileSrc = (filePath) => filePath;
      }
      cap.getPlatform = getPlatform;
      cap.handleError = handleError;
      cap.isNativePlatform = isNativePlatform;
      cap.isPluginAvailable = isPluginAvailable;
      cap.pluginMethodNoop = pluginMethodNoop;
      cap.registerPlugin = registerPlugin2;
      cap.Exception = CapacitorException;
      cap.DEBUG = !!cap.DEBUG;
      cap.isLoggingEnabled = !!cap.isLoggingEnabled;
      cap.platform = cap.getPlatform();
      cap.isNative = cap.isNativePlatform();
      return cap;
    };
    initCapacitorGlobal = (win) => win.Capacitor = createCapacitor(win);
    Capacitor = initCapacitorGlobal(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
    registerPlugin = Capacitor.registerPlugin;
    Plugins = Capacitor.Plugins;
    WebPlugin = class {
      constructor(config) {
        this.listeners = {};
        this.windowListeners = {};
        if (config) {
          console.warn(`Capacitor WebPlugin "${config.name}" config object was deprecated in v3 and will be removed in v4.`);
          this.config = config;
        }
      }
      addListener(eventName, listenerFunc) {
        const listeners = this.listeners[eventName];
        if (!listeners) {
          this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(listenerFunc);
        const windowListener = this.windowListeners[eventName];
        if (windowListener && !windowListener.registered) {
          this.addWindowListener(windowListener);
        }
        const remove = async () => this.removeListener(eventName, listenerFunc);
        const p = Promise.resolve({ remove });
        Object.defineProperty(p, "remove", { value: async () => {
          console.warn(`Using addListener() without 'await' is deprecated.`);
          await remove();
        } });
        return p;
      }
      async removeAllListeners() {
        this.listeners = {};
        for (const listener in this.windowListeners) {
          this.removeWindowListener(this.windowListeners[listener]);
        }
        this.windowListeners = {};
      }
      notifyListeners(eventName, data) {
        const listeners = this.listeners[eventName];
        if (listeners) {
          listeners.forEach((listener) => listener(data));
        }
      }
      hasListeners(eventName) {
        return !!this.listeners[eventName].length;
      }
      registerWindowListener(windowEventName, pluginEventName) {
        this.windowListeners[pluginEventName] = { registered: false, windowEventName, pluginEventName, handler: (event) => {
          this.notifyListeners(pluginEventName, event);
        } };
      }
      unimplemented(msg = "not implemented") {
        return new Capacitor.Exception(msg, ExceptionCode.Unimplemented);
      }
      unavailable(msg = "not available") {
        return new Capacitor.Exception(msg, ExceptionCode.Unavailable);
      }
      async removeListener(eventName, listenerFunc) {
        const listeners = this.listeners[eventName];
        if (!listeners) {
          return;
        }
        const index = listeners.indexOf(listenerFunc);
        this.listeners[eventName].splice(index, 1);
        if (!this.listeners[eventName].length) {
          this.removeWindowListener(this.windowListeners[eventName]);
        }
      }
      addWindowListener(handle) {
        window.addEventListener(handle.windowEventName, handle.handler);
        handle.registered = true;
      }
      removeWindowListener(handle) {
        if (!handle) {
          return;
        }
        window.removeEventListener(handle.windowEventName, handle.handler);
        handle.registered = false;
      }
    };
  } });
  function numbersToDataView(value) {
    return new DataView(Uint8Array.from(value).buffer);
  }
  function dataViewToNumbers(value) {
    return Array.from(new Uint8Array(value.buffer));
  }
  function numberToUUID(value) {
    return `0000${value.toString(16).padStart(4, "0")}-0000-1000-8000-00805f9b34fb`;
  }
  function hexStringToDataView(value) {
    const numbers = value.trim().split(" ").filter((e) => e !== "").map((s) => parseInt(s, 16));
    return numbersToDataView(numbers);
  }
  function dataViewToHexString(value) {
    return dataViewToNumbers(value).map((n) => {
      let s = n.toString(16);
      if (s.length == 1) {
        s = "0" + s;
      }
      return s;
    }).join(" ");
  }
  function webUUIDToString(uuid) {
    if (typeof uuid === "string") {
      return uuid;
    } else if (typeof uuid === "number") {
      return numberToUUID(uuid);
    } else {
      throw new Error("Invalid UUID");
    }
  }
  function mapToObject(map) {
    const obj = {};
    if (!map) {
      return void 0;
    }
    map.forEach((value, key) => {
      obj[key.toString()] = value;
    });
    return obj;
  }
  var init_conversion = __esm({ "ble/node_modules/@capacitor-community/bluetooth-le/dist/esm/conversion.js"() {
  } });
  async function runWithTimeout(promise, time, exception) {
    let timer;
    return Promise.race([promise, new Promise((_2, reject) => {
      timer = setTimeout(() => reject(exception), time);
    })]).finally(() => clearTimeout(timer));
  }
  var init_timeout = __esm({ "ble/node_modules/@capacitor-community/bluetooth-le/dist/esm/timeout.js"() {
  } });
  var web_exports = {};
  __export2(web_exports, { BluetoothLeWeb: () => BluetoothLeWeb });
  var BluetoothLeWeb;
  var init_web = __esm({ "ble/node_modules/@capacitor-community/bluetooth-le/dist/esm/web.js"() {
    init_dist();
    init_conversion();
    init_timeout();
    BluetoothLeWeb = class extends WebPlugin {
      constructor() {
        super(...arguments);
        this.deviceMap = /* @__PURE__ */ new Map();
        this.discoveredDevices = /* @__PURE__ */ new Map();
        this.scan = null;
        this.DEFAULT_CONNECTION_TIMEOUT = 1e4;
        this.onAdvertisementReceivedCallback = this.onAdvertisementReceived.bind(this);
        this.onDisconnectedCallback = this.onDisconnected.bind(this);
        this.onCharacteristicValueChangedCallback = this.onCharacteristicValueChanged.bind(this);
      }
      async initialize() {
        if (typeof navigator === "undefined" || !navigator.bluetooth) {
          throw this.unavailable("Web Bluetooth API not available in this browser.");
        }
        const isAvailable = await navigator.bluetooth.getAvailability();
        if (!isAvailable) {
          throw this.unavailable("No Bluetooth radio available.");
        }
      }
      async isEnabled() {
        return { value: true };
      }
      async enable() {
        throw this.unavailable("enable is not available on web.");
      }
      async disable() {
        throw this.unavailable("disable is not available on web.");
      }
      async startEnabledNotifications() {
      }
      async stopEnabledNotifications() {
      }
      async isLocationEnabled() {
        throw this.unavailable("isLocationEnabled is not available on web.");
      }
      async openLocationSettings() {
        throw this.unavailable("openLocationSettings is not available on web.");
      }
      async openBluetoothSettings() {
        throw this.unavailable("openBluetoothSettings is not available on web.");
      }
      async openAppSettings() {
        throw this.unavailable("openAppSettings is not available on web.");
      }
      async setDisplayStrings() {
      }
      async requestDevice(options2) {
        const filters = this.getFilters(options2);
        const device = await navigator.bluetooth.requestDevice({ filters: filters.length ? filters : void 0, optionalServices: options2 === null || options2 === void 0 ? void 0 : options2.optionalServices, acceptAllDevices: filters.length === 0 });
        this.deviceMap.set(device.id, device);
        const bleDevice = this.getBleDevice(device);
        return bleDevice;
      }
      async requestLEScan(options2) {
        this.requestBleDeviceOptions = options2;
        const filters = this.getFilters(options2);
        await this.stopLEScan();
        this.discoveredDevices = /* @__PURE__ */ new Map();
        navigator.bluetooth.removeEventListener("advertisementreceived", this.onAdvertisementReceivedCallback);
        navigator.bluetooth.addEventListener("advertisementreceived", this.onAdvertisementReceivedCallback);
        this.scan = await navigator.bluetooth.requestLEScan({ filters: filters.length ? filters : void 0, acceptAllAdvertisements: filters.length === 0, keepRepeatedDevices: options2 === null || options2 === void 0 ? void 0 : options2.allowDuplicates });
      }
      onAdvertisementReceived(event) {
        var _a, _b;
        const deviceId = event.device.id;
        this.deviceMap.set(deviceId, event.device);
        const isNew = !this.discoveredDevices.has(deviceId);
        if (isNew || ((_a = this.requestBleDeviceOptions) === null || _a === void 0 ? void 0 : _a.allowDuplicates)) {
          this.discoveredDevices.set(deviceId, true);
          const device = this.getBleDevice(event.device);
          const result = { device, localName: device.name, rssi: event.rssi, txPower: event.txPower, manufacturerData: mapToObject(event.manufacturerData), serviceData: mapToObject(event.serviceData), uuids: (_b = event.uuids) === null || _b === void 0 ? void 0 : _b.map(webUUIDToString) };
          this.notifyListeners("onScanResult", result);
        }
      }
      async stopLEScan() {
        var _a;
        if ((_a = this.scan) === null || _a === void 0 ? void 0 : _a.active) {
          this.scan.stop();
        }
        this.scan = null;
      }
      async getDevices(_options) {
        const devices = await navigator.bluetooth.getDevices();
        const bleDevices = devices.map((device) => {
          this.deviceMap.set(device.id, device);
          const bleDevice = this.getBleDevice(device);
          return bleDevice;
        });
        return { devices: bleDevices };
      }
      async getConnectedDevices(_options) {
        const devices = await navigator.bluetooth.getDevices();
        const bleDevices = devices.filter((device) => {
          var _a;
          return (_a = device.gatt) === null || _a === void 0 ? void 0 : _a.connected;
        }).map((device) => {
          this.deviceMap.set(device.id, device);
          const bleDevice = this.getBleDevice(device);
          return bleDevice;
        });
        return { devices: bleDevices };
      }
      async connect(options2) {
        var _a, _b;
        const device = this.getDeviceFromMap(options2.deviceId);
        device.removeEventListener("gattserverdisconnected", this.onDisconnectedCallback);
        device.addEventListener("gattserverdisconnected", this.onDisconnectedCallback);
        const timeoutError = Symbol();
        if (device.gatt === void 0) {
          throw new Error("No gatt server available.");
        }
        try {
          const timeout = (_a = options2.timeout) !== null && _a !== void 0 ? _a : this.DEFAULT_CONNECTION_TIMEOUT;
          await runWithTimeout(device.gatt.connect(), timeout, timeoutError);
        } catch (error) {
          await ((_b = device.gatt) === null || _b === void 0 ? void 0 : _b.disconnect());
          if (error === timeoutError) {
            throw new Error("Connection timeout");
          } else {
            throw error;
          }
        }
      }
      onDisconnected(event) {
        const deviceId = event.target.id;
        const key = `disconnected|${deviceId}`;
        this.notifyListeners(key, null);
      }
      async createBond(_options) {
        throw this.unavailable("createBond is not available on web.");
      }
      async isBonded(_options) {
        throw this.unavailable("isBonded is not available on web.");
      }
      async disconnect(options2) {
        var _a;
        (_a = this.getDeviceFromMap(options2.deviceId).gatt) === null || _a === void 0 ? void 0 : _a.disconnect();
      }
      async getServices(options2) {
        var _a, _b;
        const services = (_b = await ((_a = this.getDeviceFromMap(options2.deviceId).gatt) === null || _a === void 0 ? void 0 : _a.getPrimaryServices())) !== null && _b !== void 0 ? _b : [];
        const bleServices = [];
        for (const service of services) {
          const characteristics = await service.getCharacteristics();
          const bleCharacteristics = [];
          for (const characteristic of characteristics) {
            bleCharacteristics.push({ uuid: characteristic.uuid, properties: this.getProperties(characteristic), descriptors: await this.getDescriptors(characteristic) });
          }
          bleServices.push({ uuid: service.uuid, characteristics: bleCharacteristics });
        }
        return { services: bleServices };
      }
      async getDescriptors(characteristic) {
        try {
          const descriptors = await characteristic.getDescriptors();
          return descriptors.map((descriptor) => ({ uuid: descriptor.uuid }));
        } catch (_a) {
          return [];
        }
      }
      getProperties(characteristic) {
        return { broadcast: characteristic.properties.broadcast, read: characteristic.properties.read, writeWithoutResponse: characteristic.properties.writeWithoutResponse, write: characteristic.properties.write, notify: characteristic.properties.notify, indicate: characteristic.properties.indicate, authenticatedSignedWrites: characteristic.properties.authenticatedSignedWrites, reliableWrite: characteristic.properties.reliableWrite, writableAuxiliaries: characteristic.properties.writableAuxiliaries };
      }
      async getCharacteristic(options2) {
        var _a;
        const service = await ((_a = this.getDeviceFromMap(options2.deviceId).gatt) === null || _a === void 0 ? void 0 : _a.getPrimaryService(options2 === null || options2 === void 0 ? void 0 : options2.service));
        return service === null || service === void 0 ? void 0 : service.getCharacteristic(options2 === null || options2 === void 0 ? void 0 : options2.characteristic);
      }
      async getDescriptor(options2) {
        const characteristic = await this.getCharacteristic(options2);
        return characteristic === null || characteristic === void 0 ? void 0 : characteristic.getDescriptor(options2 === null || options2 === void 0 ? void 0 : options2.descriptor);
      }
      async readRssi(_options) {
        throw this.unavailable("readRssi is not available on web.");
      }
      async read(options2) {
        const characteristic = await this.getCharacteristic(options2);
        const value = await (characteristic === null || characteristic === void 0 ? void 0 : characteristic.readValue());
        return { value };
      }
      async write(options2) {
        const characteristic = await this.getCharacteristic(options2);
        let dataView;
        if (typeof options2.value === "string") {
          dataView = hexStringToDataView(options2.value);
        } else {
          dataView = options2.value;
        }
        await (characteristic === null || characteristic === void 0 ? void 0 : characteristic.writeValueWithResponse(dataView));
      }
      async writeWithoutResponse(options2) {
        const characteristic = await this.getCharacteristic(options2);
        let dataView;
        if (typeof options2.value === "string") {
          dataView = hexStringToDataView(options2.value);
        } else {
          dataView = options2.value;
        }
        await (characteristic === null || characteristic === void 0 ? void 0 : characteristic.writeValueWithoutResponse(dataView));
      }
      async readDescriptor(options2) {
        const descriptor = await this.getDescriptor(options2);
        const value = await (descriptor === null || descriptor === void 0 ? void 0 : descriptor.readValue());
        return { value };
      }
      async writeDescriptor(options2) {
        const descriptor = await this.getDescriptor(options2);
        let dataView;
        if (typeof options2.value === "string") {
          dataView = hexStringToDataView(options2.value);
        } else {
          dataView = options2.value;
        }
        await (descriptor === null || descriptor === void 0 ? void 0 : descriptor.writeValue(dataView));
      }
      async startNotifications(options2) {
        const characteristic = await this.getCharacteristic(options2);
        characteristic === null || characteristic === void 0 ? void 0 : characteristic.removeEventListener("characteristicvaluechanged", this.onCharacteristicValueChangedCallback);
        characteristic === null || characteristic === void 0 ? void 0 : characteristic.addEventListener("characteristicvaluechanged", this.onCharacteristicValueChangedCallback);
        await (characteristic === null || characteristic === void 0 ? void 0 : characteristic.startNotifications());
      }
      onCharacteristicValueChanged(event) {
        var _a, _b;
        const characteristic = event.target;
        const key = `notification|${(_a = characteristic.service) === null || _a === void 0 ? void 0 : _a.device.id}|${(_b = characteristic.service) === null || _b === void 0 ? void 0 : _b.uuid}|${characteristic.uuid}`;
        this.notifyListeners(key, { value: characteristic.value });
      }
      async stopNotifications(options2) {
        const characteristic = await this.getCharacteristic(options2);
        await (characteristic === null || characteristic === void 0 ? void 0 : characteristic.stopNotifications());
      }
      getFilters(options2) {
        var _a;
        const filters = [];
        for (const service of (_a = options2 === null || options2 === void 0 ? void 0 : options2.services) !== null && _a !== void 0 ? _a : []) {
          filters.push({ services: [service], name: options2 === null || options2 === void 0 ? void 0 : options2.name, namePrefix: options2 === null || options2 === void 0 ? void 0 : options2.namePrefix });
        }
        if (((options2 === null || options2 === void 0 ? void 0 : options2.name) || (options2 === null || options2 === void 0 ? void 0 : options2.namePrefix)) && filters.length === 0) {
          filters.push({ name: options2.name, namePrefix: options2.namePrefix });
        }
        return filters;
      }
      getDeviceFromMap(deviceId) {
        const device = this.deviceMap.get(deviceId);
        if (device === void 0) {
          throw new Error('Device not found. Call "requestDevice", "requestLEScan" or "getDevices" first.');
        }
        return device;
      }
      getBleDevice(device) {
        var _a;
        const bleDevice = { deviceId: device.id, name: (_a = device.name) !== null && _a !== void 0 ? _a : void 0 };
        return bleDevice;
      }
    };
  } });
  var require_throat = __commonJS({ "ble/node_modules/throat/index.js"(exports, module) {
    "use strict";
    function throatInternal(size) {
      var queue = new Queue();
      var s = size | 0;
      function run(fn, self2, args) {
        if ((s | 0) !== 0) {
          s = (s | 0) - 1;
          return new Promise(function(resolve) {
            resolve(fn.apply(self2, args));
          }).then(onFulfill, onReject);
        }
        return new Promise(function(resolve) {
          queue.push(new Delayed(resolve, fn, self2, args));
        }).then(runDelayed);
      }
      function runDelayed(d2) {
        try {
          return Promise.resolve(d2.fn.apply(d2.self, d2.args)).then(onFulfill, onReject);
        } catch (ex) {
          onReject(ex);
        }
      }
      function onFulfill(result) {
        release();
        return result;
      }
      function onReject(error) {
        release();
        throw error;
      }
      function release() {
        var next = queue.shift();
        if (next) {
          next.resolve(next);
        } else {
          s = (s | 0) + 1;
        }
      }
      return run;
    }
    function earlyBound(size, fn) {
      const run = throatInternal(size | 0);
      return function() {
        var args = new Array(arguments.length);
        for (var i = 0; i < arguments.length; i++) {
          args[i] = arguments[i];
        }
        return run(fn, this, args);
      };
    }
    function lateBound(size) {
      const run = throatInternal(size | 0);
      return function(fn) {
        if (typeof fn !== "function") {
          throw new TypeError("Expected throat fn to be a function but got " + typeof fn);
        }
        var args = new Array(arguments.length - 1);
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i];
        }
        return run(fn, this, args);
      };
    }
    module.exports = function throat2(size, fn) {
      if (typeof size === "function") {
        var temp = fn;
        fn = size;
        size = temp;
      }
      if (typeof size !== "number") {
        throw new TypeError("Expected throat size to be a number but got " + typeof size);
      }
      if (fn !== void 0 && typeof fn !== "function") {
        throw new TypeError("Expected throat fn to be a function but got " + typeof fn);
      }
      if (typeof fn === "function") {
        return earlyBound(size | 0, fn);
      } else {
        return lateBound(size | 0);
      }
    };
    module.exports.default = module.exports;
    function Delayed(resolve, fn, self2, args) {
      this.resolve = resolve;
      this.fn = fn;
      this.self = self2 || null;
      this.args = args;
    }
    var blockSize = 64;
    function Queue() {
      this._s1 = [];
      this._s2 = [];
      this._shiftBlock = this._pushBlock = new Array(blockSize);
      this._pushIndex = 0;
      this._shiftIndex = 0;
    }
    Queue.prototype.push = function(value) {
      if (this._pushIndex === blockSize) {
        this._pushIndex = 0;
        this._s1[this._s1.length] = this._pushBlock = new Array(blockSize);
      }
      this._pushBlock[this._pushIndex++] = value;
    };
    Queue.prototype.shift = function() {
      if (this._shiftIndex === blockSize) {
        this._shiftIndex = 0;
        var s2 = this._s2;
        if (s2.length === 0) {
          var s1 = this._s1;
          if (s1.length === 0) {
            return void 0;
          }
          this._s1 = s2;
          s2 = this._s2 = s1.reverse();
        }
        this._shiftBlock = s2.pop();
      }
      if (this._pushBlock === this._shiftBlock && this._pushIndex === this._shiftIndex) {
        return void 0;
      }
      var result = this._shiftBlock[this._shiftIndex];
      this._shiftBlock[this._shiftIndex++] = null;
      return result;
    };
  } });
  var __create2 = Object.create;
  var __defProp22 = Object.defineProperty;
  var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames2 = Object.getOwnPropertyNames;
  var __getProtoOf2 = Object.getPrototypeOf;
  var __hasOwnProp2 = Object.prototype.hasOwnProperty;
  var __require22 = ((x2) => typeof __require2 !== "undefined" ? __require2 : typeof Proxy !== "undefined" ? new Proxy(x2, { get: (a, b2) => (typeof __require2 !== "undefined" ? __require2 : a)[b2] }) : x2)(function(x2) {
    if (typeof __require2 !== "undefined")
      return __require2.apply(this, arguments);
    throw new Error('Dynamic require of "' + x2 + '" is not supported');
  });
  var __commonJS2 = (cb, mod) => function __require222() {
    return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps2 = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames2(from))
        if (!__hasOwnProp2.call(to, key) && key !== except)
          __defProp22(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(isNodeMode || !mod || !mod.__esModule ? __defProp22(target, "default", { value: mod, enumerable: true }) : target, mod));
  var require_sjcl = __commonJS2({ "services/e2ee/sjcl.js"(exports, module) {
    "use strict";
    var sjcl2 = { cipher: {}, hash: {}, keyexchange: {}, mode: {}, misc: {}, codec: {}, exception: { corrupt: function(a) {
      this.toString = function() {
        return "CORRUPT: " + this.message;
      };
      this.message = a;
    }, invalid: function(a) {
      this.toString = function() {
        return "INVALID: " + this.message;
      };
      this.message = a;
    }, bug: function(a) {
      this.toString = function() {
        return "BUG: " + this.message;
      };
      this.message = a;
    }, notReady: function(a) {
      this.toString = function() {
        return "NOT READY: " + this.message;
      };
      this.message = a;
    } } };
    sjcl2.cipher.aes = function(a) {
      this.s[0][0][0] || this.O();
      var b2, c, d2, e, f = this.s[0][4], g = this.s[1];
      b2 = a.length;
      var h = 1;
      if (4 !== b2 && 6 !== b2 && 8 !== b2)
        throw new sjcl2.exception.invalid("invalid aes key size");
      this.b = [d2 = a.slice(0), e = []];
      for (a = b2; a < 4 * b2 + 28; a++) {
        c = d2[a - 1];
        if (0 === a % b2 || 8 === b2 && 4 === a % b2)
          c = f[c >>> 24] << 24 ^ f[c >> 16 & 255] << 16 ^ f[c >> 8 & 255] << 8 ^ f[c & 255], 0 === a % b2 && (c = c << 8 ^ c >>> 24 ^ h << 24, h = h << 1 ^ 283 * (h >> 7));
        d2[a] = d2[a - b2] ^ c;
      }
      for (b2 = 0; a; b2++, a--)
        c = d2[b2 & 3 ? a : a - 4], e[b2] = 4 >= a || 4 > b2 ? c : g[0][f[c >>> 24]] ^ g[1][f[c >> 16 & 255]] ^ g[2][f[c >> 8 & 255]] ^ g[3][f[c & 255]];
    };
    sjcl2.cipher.aes.prototype = { encrypt: function(a) {
      return t(this, a, 0);
    }, decrypt: function(a) {
      return t(this, a, 1);
    }, s: [[[], [], [], [], []], [[], [], [], [], []]], O: function() {
      var a = this.s[0], b2 = this.s[1], c = a[4], d2 = b2[4], e, f, g, h = [], k = [], l, n, m, p;
      for (e = 0; 256 > e; e++)
        k[(h[e] = e << 1 ^ 283 * (e >> 7)) ^ e] = e;
      for (f = g = 0; !c[f]; f ^= l || 1, g = k[g] || 1)
        for (m = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4, m = m >> 8 ^ m & 255 ^ 99, c[f] = m, d2[m] = f, n = h[e = h[l = h[f]]], p = 16843009 * n ^ 65537 * e ^ 257 * l ^ 16843008 * f, n = 257 * h[m] ^ 16843008 * m, e = 0; 4 > e; e++)
          a[e][f] = n = n << 24 ^ n >>> 8, b2[e][m] = p = p << 24 ^ p >>> 8;
      for (e = 0; 5 > e; e++)
        a[e] = a[e].slice(0), b2[e] = b2[e].slice(0);
    } };
    function t(a, b2, c) {
      if (4 !== b2.length)
        throw new sjcl2.exception.invalid("invalid aes block size");
      var d2 = a.b[c], e = b2[0] ^ d2[0], f = b2[c ? 3 : 1] ^ d2[1], g = b2[2] ^ d2[2];
      b2 = b2[c ? 1 : 3] ^ d2[3];
      var h, k, l, n = d2.length / 4 - 2, m, p = 4, r = [0, 0, 0, 0];
      h = a.s[c];
      a = h[0];
      var q = h[1], v2 = h[2], w2 = h[3], x2 = h[4];
      for (m = 0; m < n; m++)
        h = a[e >>> 24] ^ q[f >> 16 & 255] ^ v2[g >> 8 & 255] ^ w2[b2 & 255] ^ d2[p], k = a[f >>> 24] ^ q[g >> 16 & 255] ^ v2[b2 >> 8 & 255] ^ w2[e & 255] ^ d2[p + 1], l = a[g >>> 24] ^ q[b2 >> 16 & 255] ^ v2[e >> 8 & 255] ^ w2[f & 255] ^ d2[p + 2], b2 = a[b2 >>> 24] ^ q[e >> 16 & 255] ^ v2[f >> 8 & 255] ^ w2[g & 255] ^ d2[p + 3], p += 4, e = h, f = k, g = l;
      for (m = 0; 4 > m; m++)
        r[c ? 3 & -m : m] = x2[e >>> 24] << 24 ^ x2[f >> 16 & 255] << 16 ^ x2[g >> 8 & 255] << 8 ^ x2[b2 & 255] ^ d2[p++], h = e, e = f, f = g, g = b2, b2 = h;
      return r;
    }
    sjcl2.bitArray = { bitSlice: function(a, b2, c) {
      a = sjcl2.bitArray.$(a.slice(b2 / 32), 32 - (b2 & 31)).slice(1);
      return void 0 === c ? a : sjcl2.bitArray.clamp(a, c - b2);
    }, extract: function(a, b2, c) {
      var d2 = Math.floor(-b2 - c & 31);
      return ((b2 + c - 1 ^ b2) & -32 ? a[b2 / 32 | 0] << 32 - d2 ^ a[b2 / 32 + 1 | 0] >>> d2 : a[b2 / 32 | 0] >>> d2) & (1 << c) - 1;
    }, concat: function(a, b2) {
      if (0 === a.length || 0 === b2.length)
        return a.concat(b2);
      var c = a[a.length - 1], d2 = sjcl2.bitArray.getPartial(c);
      return 32 === d2 ? a.concat(b2) : sjcl2.bitArray.$(b2, d2, c | 0, a.slice(0, a.length - 1));
    }, bitLength: function(a) {
      var b2 = a.length;
      return 0 === b2 ? 0 : 32 * (b2 - 1) + sjcl2.bitArray.getPartial(a[b2 - 1]);
    }, clamp: function(a, b2) {
      if (32 * a.length < b2)
        return a;
      a = a.slice(0, Math.ceil(b2 / 32));
      var c = a.length;
      b2 = b2 & 31;
      0 < c && b2 && (a[c - 1] = sjcl2.bitArray.partial(b2, a[c - 1] & 2147483648 >> b2 - 1, 1));
      return a;
    }, partial: function(a, b2, c) {
      return 32 === a ? b2 : (c ? b2 | 0 : b2 << 32 - a) + 1099511627776 * a;
    }, getPartial: function(a) {
      return Math.round(a / 1099511627776) || 32;
    }, equal: function(a, b2) {
      if (sjcl2.bitArray.bitLength(a) !== sjcl2.bitArray.bitLength(b2))
        return false;
      var c = 0, d2;
      for (d2 = 0; d2 < a.length; d2++)
        c |= a[d2] ^ b2[d2];
      return 0 === c;
    }, $: function(a, b2, c, d2) {
      var e;
      e = 0;
      for (void 0 === d2 && (d2 = []); 32 <= b2; b2 -= 32)
        d2.push(c), c = 0;
      if (0 === b2)
        return d2.concat(a);
      for (e = 0; e < a.length; e++)
        d2.push(c | a[e] >>> b2), c = a[e] << 32 - b2;
      e = a.length ? a[a.length - 1] : 0;
      a = sjcl2.bitArray.getPartial(e);
      d2.push(sjcl2.bitArray.partial(b2 + a & 31, 32 < b2 + a ? c : d2.pop(), 1));
      return d2;
    }, i: function(a, b2) {
      return [a[0] ^ b2[0], a[1] ^ b2[1], a[2] ^ b2[2], a[3] ^ b2[3]];
    }, byteswapM: function(a) {
      var b2, c;
      for (b2 = 0; b2 < a.length; ++b2)
        c = a[b2], a[b2] = c >>> 24 | c >>> 8 & 65280 | (c & 65280) << 8 | c << 24;
      return a;
    } };
    sjcl2.codec.utf8String = { fromBits: function(a) {
      var b2 = "", c = sjcl2.bitArray.bitLength(a), d2, e;
      for (d2 = 0; d2 < c / 8; d2++)
        0 === (d2 & 3) && (e = a[d2 / 4]), b2 += String.fromCharCode(e >>> 8 >>> 8 >>> 8), e <<= 8;
      return decodeURIComponent(escape(b2));
    }, toBits: function(a) {
      a = unescape(encodeURIComponent(a));
      var b2 = [], c, d2 = 0;
      for (c = 0; c < a.length; c++)
        d2 = d2 << 8 | a.charCodeAt(c), 3 === (c & 3) && (b2.push(d2), d2 = 0);
      c & 3 && b2.push(sjcl2.bitArray.partial(8 * (c & 3), d2));
      return b2;
    } };
    sjcl2.codec.hex = { fromBits: function(a) {
      var b2 = "", c;
      for (c = 0; c < a.length; c++)
        b2 += ((a[c] | 0) + 263882790666240).toString(16).substr(4);
      return b2.substr(0, sjcl2.bitArray.bitLength(a) / 4);
    }, toBits: function(a) {
      var b2, c = [], d2;
      a = a.replace(/\s|0x/g, "");
      d2 = a.length;
      a = a + "00000000";
      for (b2 = 0; b2 < a.length; b2 += 8)
        c.push(parseInt(a.substr(b2, 8), 16) ^ 0);
      return sjcl2.bitArray.clamp(c, 4 * d2);
    } };
    sjcl2.codec.base32 = { B: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", X: "0123456789ABCDEFGHIJKLMNOPQRSTUV", BITS: 32, BASE: 5, REMAINING: 27, fromBits: function(a, b2, c) {
      var d2 = sjcl2.codec.base32.BASE, e = sjcl2.codec.base32.REMAINING, f = "", g = 0, h = sjcl2.codec.base32.B, k = 0, l = sjcl2.bitArray.bitLength(a);
      c && (h = sjcl2.codec.base32.X);
      for (c = 0; f.length * d2 < l; )
        f += h.charAt((k ^ a[c] >>> g) >>> e), g < d2 ? (k = a[c] << d2 - g, g += e, c++) : (k <<= d2, g -= d2);
      for (; f.length & 7 && !b2; )
        f += "=";
      return f;
    }, toBits: function(a, b2) {
      a = a.replace(/\s|=/g, "").toUpperCase();
      var c = sjcl2.codec.base32.BITS, d2 = sjcl2.codec.base32.BASE, e = sjcl2.codec.base32.REMAINING, f = [], g, h = 0, k = sjcl2.codec.base32.B, l = 0, n, m = "base32";
      b2 && (k = sjcl2.codec.base32.X, m = "base32hex");
      for (g = 0; g < a.length; g++) {
        n = k.indexOf(a.charAt(g));
        if (0 > n) {
          if (!b2)
            try {
              return sjcl2.codec.base32hex.toBits(a);
            } catch (p) {
            }
          throw new sjcl2.exception.invalid("this isn't " + m + "!");
        }
        h > e ? (h -= e, f.push(l ^ n >>> h), l = n << c - h) : (h += d2, l ^= n << c - h);
      }
      h & 56 && f.push(sjcl2.bitArray.partial(h & 56, l, 1));
      return f;
    } };
    sjcl2.codec.base32hex = { fromBits: function(a, b2) {
      return sjcl2.codec.base32.fromBits(a, b2, 1);
    }, toBits: function(a) {
      return sjcl2.codec.base32.toBits(a, 1);
    } };
    sjcl2.codec.base64 = { B: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", fromBits: function(a, b2, c) {
      var d2 = "", e = 0, f = sjcl2.codec.base64.B, g = 0, h = sjcl2.bitArray.bitLength(a);
      c && (f = f.substr(0, 62) + "-_");
      for (c = 0; 6 * d2.length < h; )
        d2 += f.charAt((g ^ a[c] >>> e) >>> 26), 6 > e ? (g = a[c] << 6 - e, e += 26, c++) : (g <<= 6, e -= 6);
      for (; d2.length & 3 && !b2; )
        d2 += "=";
      return d2;
    }, toBits: function(a, b2) {
      a = a.replace(/\s|=/g, "");
      var c = [], d2, e = 0, f = sjcl2.codec.base64.B, g = 0, h;
      b2 && (f = f.substr(0, 62) + "-_");
      for (d2 = 0; d2 < a.length; d2++) {
        h = f.indexOf(a.charAt(d2));
        if (0 > h)
          throw new sjcl2.exception.invalid("this isn't base64!");
        26 < e ? (e -= 26, c.push(g ^ h >>> e), g = h << 32 - e) : (e += 6, g ^= h << 32 - e);
      }
      e & 56 && c.push(sjcl2.bitArray.partial(e & 56, g, 1));
      return c;
    } };
    sjcl2.codec.base64url = { fromBits: function(a) {
      return sjcl2.codec.base64.fromBits(a, 1, 1);
    }, toBits: function(a) {
      return sjcl2.codec.base64.toBits(a, 1);
    } };
    sjcl2.hash.sha256 = function(a) {
      this.b[0] || this.O();
      a ? (this.F = a.F.slice(0), this.A = a.A.slice(0), this.l = a.l) : this.reset();
    };
    sjcl2.hash.sha256.hash = function(a) {
      return new sjcl2.hash.sha256().update(a).finalize();
    };
    sjcl2.hash.sha256.prototype = { blockSize: 512, reset: function() {
      this.F = this.Y.slice(0);
      this.A = [];
      this.l = 0;
      return this;
    }, update: function(a) {
      "string" === typeof a && (a = sjcl2.codec.utf8String.toBits(a));
      var b2, c = this.A = sjcl2.bitArray.concat(this.A, a);
      b2 = this.l;
      a = this.l = b2 + sjcl2.bitArray.bitLength(a);
      if (9007199254740991 < a)
        throw new sjcl2.exception.invalid("Cannot hash more than 2^53 - 1 bits");
      if ("undefined" !== typeof Uint32Array) {
        var d2 = new Uint32Array(c), e = 0;
        for (b2 = 512 + b2 - (512 + b2 & 511); b2 <= a; b2 += 512)
          u(this, d2.subarray(16 * e, 16 * (e + 1))), e += 1;
        c.splice(0, 16 * e);
      } else
        for (b2 = 512 + b2 - (512 + b2 & 511); b2 <= a; b2 += 512)
          u(this, c.splice(0, 16));
      return this;
    }, finalize: function() {
      var a, b2 = this.A, c = this.F, b2 = sjcl2.bitArray.concat(b2, [sjcl2.bitArray.partial(1, 1)]);
      for (a = b2.length + 2; a & 15; a++)
        b2.push(0);
      b2.push(Math.floor(this.l / 4294967296));
      for (b2.push(this.l | 0); b2.length; )
        u(this, b2.splice(0, 16));
      this.reset();
      return c;
    }, Y: [], b: [], O: function() {
      function a(a2) {
        return 4294967296 * (a2 - Math.floor(a2)) | 0;
      }
      for (var b2 = 0, c = 2, d2, e; 64 > b2; c++) {
        e = true;
        for (d2 = 2; d2 * d2 <= c; d2++)
          if (0 === c % d2) {
            e = false;
            break;
          }
        e && (8 > b2 && (this.Y[b2] = a(Math.pow(c, 0.5))), this.b[b2] = a(Math.pow(c, 1 / 3)), b2++);
      }
    } };
    function u(a, b2) {
      var c, d2, e, f = a.F, g = a.b, h = f[0], k = f[1], l = f[2], n = f[3], m = f[4], p = f[5], r = f[6], q = f[7];
      for (c = 0; 64 > c; c++)
        16 > c ? d2 = b2[c] : (d2 = b2[c + 1 & 15], e = b2[c + 14 & 15], d2 = b2[c & 15] = (d2 >>> 7 ^ d2 >>> 18 ^ d2 >>> 3 ^ d2 << 25 ^ d2 << 14) + (e >>> 17 ^ e >>> 19 ^ e >>> 10 ^ e << 15 ^ e << 13) + b2[c & 15] + b2[c + 9 & 15] | 0), d2 = d2 + q + (m >>> 6 ^ m >>> 11 ^ m >>> 25 ^ m << 26 ^ m << 21 ^ m << 7) + (r ^ m & (p ^ r)) + g[c], q = r, r = p, p = m, m = n + d2 | 0, n = l, l = k, k = h, h = d2 + (k & l ^ n & (k ^ l)) + (k >>> 2 ^ k >>> 13 ^ k >>> 22 ^ k << 30 ^ k << 19 ^ k << 10) | 0;
      f[0] = f[0] + h | 0;
      f[1] = f[1] + k | 0;
      f[2] = f[2] + l | 0;
      f[3] = f[3] + n | 0;
      f[4] = f[4] + m | 0;
      f[5] = f[5] + p | 0;
      f[6] = f[6] + r | 0;
      f[7] = f[7] + q | 0;
    }
    sjcl2.mode.ccm = { name: "ccm", G: [], listenProgress: function(a) {
      sjcl2.mode.ccm.G.push(a);
    }, unListenProgress: function(a) {
      a = sjcl2.mode.ccm.G.indexOf(a);
      -1 < a && sjcl2.mode.ccm.G.splice(a, 1);
    }, fa: function(a) {
      var b2 = sjcl2.mode.ccm.G.slice(), c;
      for (c = 0; c < b2.length; c += 1)
        b2[c](a);
    }, encrypt: function(a, b2, c, d2, e) {
      var f, g = b2.slice(0), h = sjcl2.bitArray, k = h.bitLength(c) / 8, l = h.bitLength(g) / 8;
      e = e || 64;
      d2 = d2 || [];
      if (7 > k)
        throw new sjcl2.exception.invalid("ccm: iv must be at least 7 bytes");
      for (f = 2; 4 > f && l >>> 8 * f; f++)
        ;
      f < 15 - k && (f = 15 - k);
      c = h.clamp(c, 8 * (15 - f));
      b2 = sjcl2.mode.ccm.V(a, b2, c, d2, e, f);
      g = sjcl2.mode.ccm.C(a, g, c, b2, e, f);
      return h.concat(g.data, g.tag);
    }, decrypt: function(a, b2, c, d2, e) {
      e = e || 64;
      d2 = d2 || [];
      var f = sjcl2.bitArray, g = f.bitLength(c) / 8, h = f.bitLength(b2), k = f.clamp(b2, h - e), l = f.bitSlice(b2, h - e), h = (h - e) / 8;
      if (7 > g)
        throw new sjcl2.exception.invalid("ccm: iv must be at least 7 bytes");
      for (b2 = 2; 4 > b2 && h >>> 8 * b2; b2++)
        ;
      b2 < 15 - g && (b2 = 15 - g);
      c = f.clamp(c, 8 * (15 - b2));
      k = sjcl2.mode.ccm.C(a, k, c, l, e, b2);
      a = sjcl2.mode.ccm.V(a, k.data, c, d2, e, b2);
      if (!f.equal(k.tag, a))
        throw new sjcl2.exception.corrupt("ccm: tag doesn't match");
      return k.data;
    }, na: function(a, b2, c, d2, e, f) {
      var g = [], h = sjcl2.bitArray, k = h.i;
      d2 = [h.partial(8, (b2.length ? 64 : 0) | d2 - 2 << 2 | f - 1)];
      d2 = h.concat(d2, c);
      d2[3] |= e;
      d2 = a.encrypt(d2);
      if (b2.length)
        for (c = h.bitLength(b2) / 8, 65279 >= c ? g = [h.partial(16, c)] : 4294967295 >= c && (g = h.concat([h.partial(16, 65534)], [c])), g = h.concat(g, b2), b2 = 0; b2 < g.length; b2 += 4)
          d2 = a.encrypt(k(d2, g.slice(b2, b2 + 4).concat([0, 0, 0])));
      return d2;
    }, V: function(a, b2, c, d2, e, f) {
      var g = sjcl2.bitArray, h = g.i;
      e /= 8;
      if (e % 2 || 4 > e || 16 < e)
        throw new sjcl2.exception.invalid("ccm: invalid tag length");
      if (4294967295 < d2.length || 4294967295 < b2.length)
        throw new sjcl2.exception.bug("ccm: can't deal with 4GiB or more data");
      c = sjcl2.mode.ccm.na(a, d2, c, e, g.bitLength(b2) / 8, f);
      for (d2 = 0; d2 < b2.length; d2 += 4)
        c = a.encrypt(h(c, b2.slice(d2, d2 + 4).concat([0, 0, 0])));
      return g.clamp(c, 8 * e);
    }, C: function(a, b2, c, d2, e, f) {
      var g, h = sjcl2.bitArray;
      g = h.i;
      var k = b2.length, l = h.bitLength(b2), n = k / 50, m = n;
      c = h.concat([h.partial(8, f - 1)], c).concat([0, 0, 0]).slice(0, 4);
      d2 = h.bitSlice(g(d2, a.encrypt(c)), 0, e);
      if (!k)
        return { tag: d2, data: [] };
      for (g = 0; g < k; g += 4)
        g > n && (sjcl2.mode.ccm.fa(g / k), n += m), c[3]++, e = a.encrypt(c), b2[g] ^= e[0], b2[g + 1] ^= e[1], b2[g + 2] ^= e[2], b2[g + 3] ^= e[3];
      return { tag: d2, data: h.clamp(b2, l) };
    } };
    sjcl2.mode.ocb2 = { name: "ocb2", encrypt: function(a, b2, c, d2, e, f) {
      if (128 !== sjcl2.bitArray.bitLength(c))
        throw new sjcl2.exception.invalid("ocb iv must be 128 bits");
      var g, h = sjcl2.mode.ocb2.S, k = sjcl2.bitArray, l = k.i, n = [0, 0, 0, 0];
      c = h(a.encrypt(c));
      var m, p = [];
      d2 = d2 || [];
      e = e || 64;
      for (g = 0; g + 4 < b2.length; g += 4)
        m = b2.slice(g, g + 4), n = l(n, m), p = p.concat(l(c, a.encrypt(l(c, m)))), c = h(c);
      m = b2.slice(g);
      b2 = k.bitLength(m);
      g = a.encrypt(l(c, [0, 0, 0, b2]));
      m = k.clamp(l(m.concat([0, 0, 0]), g), b2);
      n = l(n, l(m.concat([0, 0, 0]), g));
      n = a.encrypt(l(n, l(c, h(c))));
      d2.length && (n = l(n, f ? d2 : sjcl2.mode.ocb2.pmac(a, d2)));
      return p.concat(k.concat(m, k.clamp(n, e)));
    }, decrypt: function(a, b2, c, d2, e, f) {
      if (128 !== sjcl2.bitArray.bitLength(c))
        throw new sjcl2.exception.invalid("ocb iv must be 128 bits");
      e = e || 64;
      var g = sjcl2.mode.ocb2.S, h = sjcl2.bitArray, k = h.i, l = [0, 0, 0, 0], n = g(a.encrypt(c)), m, p, r = sjcl2.bitArray.bitLength(b2) - e, q = [];
      d2 = d2 || [];
      for (c = 0; c + 4 < r / 32; c += 4)
        m = k(n, a.decrypt(k(n, b2.slice(c, c + 4)))), l = k(l, m), q = q.concat(m), n = g(n);
      p = r - 32 * c;
      m = a.encrypt(k(n, [0, 0, 0, p]));
      m = k(m, h.clamp(b2.slice(c), p).concat([0, 0, 0]));
      l = k(l, m);
      l = a.encrypt(k(l, k(n, g(n))));
      d2.length && (l = k(l, f ? d2 : sjcl2.mode.ocb2.pmac(a, d2)));
      if (!h.equal(h.clamp(l, e), h.bitSlice(b2, r)))
        throw new sjcl2.exception.corrupt("ocb: tag doesn't match");
      return q.concat(h.clamp(m, p));
    }, pmac: function(a, b2) {
      var c, d2 = sjcl2.mode.ocb2.S, e = sjcl2.bitArray, f = e.i, g = [0, 0, 0, 0], h = a.encrypt([0, 0, 0, 0]), h = f(h, d2(d2(h)));
      for (c = 0; c + 4 < b2.length; c += 4)
        h = d2(h), g = f(g, a.encrypt(f(h, b2.slice(c, c + 4))));
      c = b2.slice(c);
      128 > e.bitLength(c) && (h = f(h, d2(h)), c = e.concat(c, [-2147483648, 0, 0, 0]));
      g = f(g, c);
      return a.encrypt(f(d2(f(h, d2(h))), g));
    }, S: function(a) {
      return [a[0] << 1 ^ a[1] >>> 31, a[1] << 1 ^ a[2] >>> 31, a[2] << 1 ^ a[3] >>> 31, a[3] << 1 ^ 135 * (a[0] >>> 31)];
    } };
    sjcl2.mode.gcm = { name: "gcm", encrypt: function(a, b2, c, d2, e) {
      var f = b2.slice(0);
      b2 = sjcl2.bitArray;
      d2 = d2 || [];
      a = sjcl2.mode.gcm.C(true, a, f, d2, c, e || 128);
      return b2.concat(a.data, a.tag);
    }, decrypt: function(a, b2, c, d2, e) {
      var f = b2.slice(0), g = sjcl2.bitArray, h = g.bitLength(f);
      e = e || 128;
      d2 = d2 || [];
      e <= h ? (b2 = g.bitSlice(f, h - e), f = g.bitSlice(f, 0, h - e)) : (b2 = f, f = []);
      a = sjcl2.mode.gcm.C(false, a, f, d2, c, e);
      if (!g.equal(a.tag, b2))
        throw new sjcl2.exception.corrupt("gcm: tag doesn't match");
      return a.data;
    }, ka: function(a, b2) {
      var c, d2, e, f, g, h = sjcl2.bitArray.i;
      e = [0, 0, 0, 0];
      f = b2.slice(0);
      for (c = 0; 128 > c; c++) {
        (d2 = 0 !== (a[Math.floor(c / 32)] & 1 << 31 - c % 32)) && (e = h(e, f));
        g = 0 !== (f[3] & 1);
        for (d2 = 3; 0 < d2; d2--)
          f[d2] = f[d2] >>> 1 | (f[d2 - 1] & 1) << 31;
        f[0] >>>= 1;
        g && (f[0] ^= -520093696);
      }
      return e;
    }, j: function(a, b2, c) {
      var d2, e = c.length;
      b2 = b2.slice(0);
      for (d2 = 0; d2 < e; d2 += 4)
        b2[0] ^= 4294967295 & c[d2], b2[1] ^= 4294967295 & c[d2 + 1], b2[2] ^= 4294967295 & c[d2 + 2], b2[3] ^= 4294967295 & c[d2 + 3], b2 = sjcl2.mode.gcm.ka(b2, a);
      return b2;
    }, C: function(a, b2, c, d2, e, f) {
      var g, h, k, l, n, m, p, r, q = sjcl2.bitArray;
      m = c.length;
      p = q.bitLength(c);
      r = q.bitLength(d2);
      h = q.bitLength(e);
      g = b2.encrypt([0, 0, 0, 0]);
      96 === h ? (e = e.slice(0), e = q.concat(e, [1])) : (e = sjcl2.mode.gcm.j(g, [0, 0, 0, 0], e), e = sjcl2.mode.gcm.j(g, e, [0, 0, Math.floor(h / 4294967296), h & 4294967295]));
      h = sjcl2.mode.gcm.j(g, [0, 0, 0, 0], d2);
      n = e.slice(0);
      d2 = h.slice(0);
      a || (d2 = sjcl2.mode.gcm.j(g, h, c));
      for (l = 0; l < m; l += 4)
        n[3]++, k = b2.encrypt(n), c[l] ^= k[0], c[l + 1] ^= k[1], c[l + 2] ^= k[2], c[l + 3] ^= k[3];
      c = q.clamp(c, p);
      a && (d2 = sjcl2.mode.gcm.j(g, h, c));
      a = [Math.floor(r / 4294967296), r & 4294967295, Math.floor(p / 4294967296), p & 4294967295];
      d2 = sjcl2.mode.gcm.j(g, d2, a);
      k = b2.encrypt(e);
      d2[0] ^= k[0];
      d2[1] ^= k[1];
      d2[2] ^= k[2];
      d2[3] ^= k[3];
      return { tag: q.bitSlice(d2, 0, f), data: c };
    } };
    sjcl2.misc.hmac = function(a, b2) {
      this.W = b2 = b2 || sjcl2.hash.sha256;
      var c = [[], []], d2, e = b2.prototype.blockSize / 32;
      this.w = [new b2(), new b2()];
      a.length > e && (a = b2.hash(a));
      for (d2 = 0; d2 < e; d2++)
        c[0][d2] = a[d2] ^ 909522486, c[1][d2] = a[d2] ^ 1549556828;
      this.w[0].update(c[0]);
      this.w[1].update(c[1]);
      this.R = new b2(this.w[0]);
    };
    sjcl2.misc.hmac.prototype.encrypt = sjcl2.misc.hmac.prototype.mac = function(a) {
      if (this.aa)
        throw new sjcl2.exception.invalid("encrypt on already updated hmac called!");
      this.update(a);
      return this.digest(a);
    };
    sjcl2.misc.hmac.prototype.reset = function() {
      this.R = new this.W(this.w[0]);
      this.aa = false;
    };
    sjcl2.misc.hmac.prototype.update = function(a) {
      this.aa = true;
      this.R.update(a);
    };
    sjcl2.misc.hmac.prototype.digest = function() {
      var a = this.R.finalize(), a = new this.W(this.w[1]).update(a).finalize();
      this.reset();
      return a;
    };
    sjcl2.misc.pbkdf2 = function(a, b2, c, d2, e) {
      c = c || 1e4;
      if (0 > d2 || 0 > c)
        throw new sjcl2.exception.invalid("invalid params to pbkdf2");
      "string" === typeof a && (a = sjcl2.codec.utf8String.toBits(a));
      "string" === typeof b2 && (b2 = sjcl2.codec.utf8String.toBits(b2));
      e = e || sjcl2.misc.hmac;
      a = new e(a);
      var f, g, h, k, l = [], n = sjcl2.bitArray;
      for (k = 1; 32 * l.length < (d2 || 1); k++) {
        e = f = a.encrypt(n.concat(b2, [k]));
        for (g = 1; g < c; g++)
          for (f = a.encrypt(f), h = 0; h < f.length; h++)
            e[h] ^= f[h];
        l = l.concat(e);
      }
      d2 && (l = n.clamp(l, d2));
      return l;
    };
    sjcl2.prng = function(a) {
      this.c = [new sjcl2.hash.sha256()];
      this.m = [0];
      this.P = 0;
      this.H = {};
      this.N = 0;
      this.U = {};
      this.Z = this.f = this.o = this.ha = 0;
      this.b = [0, 0, 0, 0, 0, 0, 0, 0];
      this.h = [0, 0, 0, 0];
      this.L = void 0;
      this.M = a;
      this.D = false;
      this.K = { progress: {}, seeded: {} };
      this.u = this.ga = 0;
      this.I = 1;
      this.J = 2;
      this.ca = 65536;
      this.T = [0, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024];
      this.da = 3e4;
      this.ba = 80;
    };
    sjcl2.prng.prototype = { randomWords: function(a, b2) {
      var c = [], d2;
      d2 = this.isReady(b2);
      var e;
      if (d2 === this.u)
        throw new sjcl2.exception.notReady("generator isn't seeded");
      if (d2 & this.J) {
        d2 = !(d2 & this.I);
        e = [];
        var f = 0, g;
        this.Z = e[0] = new Date().valueOf() + this.da;
        for (g = 0; 16 > g; g++)
          e.push(4294967296 * Math.random() | 0);
        for (g = 0; g < this.c.length && (e = e.concat(this.c[g].finalize()), f += this.m[g], this.m[g] = 0, d2 || !(this.P & 1 << g)); g++)
          ;
        this.P >= 1 << this.c.length && (this.c.push(new sjcl2.hash.sha256()), this.m.push(0));
        this.f -= f;
        f > this.o && (this.o = f);
        this.P++;
        this.b = sjcl2.hash.sha256.hash(this.b.concat(e));
        this.L = new sjcl2.cipher.aes(this.b);
        for (d2 = 0; 4 > d2 && (this.h[d2] = this.h[d2] + 1 | 0, !this.h[d2]); d2++)
          ;
      }
      for (d2 = 0; d2 < a; d2 += 4)
        0 === (d2 + 1) % this.ca && y2(this), e = z(this), c.push(e[0], e[1], e[2], e[3]);
      y2(this);
      return c.slice(0, a);
    }, setDefaultParanoia: function(a, b2) {
      if (0 === a && "Setting paranoia=0 will ruin your security; use it only for testing" !== b2)
        throw new sjcl2.exception.invalid("Setting paranoia=0 will ruin your security; use it only for testing");
      this.M = a;
    }, addEntropy: function(a, b2, c) {
      c = c || "user";
      var d2, e, f = new Date().valueOf(), g = this.H[c], h = this.isReady(), k = 0;
      d2 = this.U[c];
      void 0 === d2 && (d2 = this.U[c] = this.ha++);
      void 0 === g && (g = this.H[c] = 0);
      this.H[c] = (this.H[c] + 1) % this.c.length;
      switch (typeof a) {
        case "number":
          void 0 === b2 && (b2 = 1);
          this.c[g].update([d2, this.N++, 1, b2, f, 1, a | 0]);
          break;
        case "object":
          c = Object.prototype.toString.call(a);
          if ("[object Uint32Array]" === c) {
            e = [];
            for (c = 0; c < a.length; c++)
              e.push(a[c]);
            a = e;
          } else
            for ("[object Array]" !== c && (k = 1), c = 0; c < a.length && !k; c++)
              "number" !== typeof a[c] && (k = 1);
          if (!k) {
            if (void 0 === b2)
              for (c = b2 = 0; c < a.length; c++)
                for (e = a[c]; 0 < e; )
                  b2++, e = e >>> 1;
            this.c[g].update([d2, this.N++, 2, b2, f, a.length].concat(a));
          }
          break;
        case "string":
          void 0 === b2 && (b2 = a.length);
          this.c[g].update([d2, this.N++, 3, b2, f, a.length]);
          this.c[g].update(a);
          break;
        default:
          k = 1;
      }
      if (k)
        throw new sjcl2.exception.bug("random: addEntropy only supports number, array of numbers or string");
      this.m[g] += b2;
      this.f += b2;
      h === this.u && (this.isReady() !== this.u && A2("seeded", Math.max(this.o, this.f)), A2("progress", this.getProgress()));
    }, isReady: function(a) {
      a = this.T[void 0 !== a ? a : this.M];
      return this.o && this.o >= a ? this.m[0] > this.ba && new Date().valueOf() > this.Z ? this.J | this.I : this.I : this.f >= a ? this.J | this.u : this.u;
    }, getProgress: function(a) {
      a = this.T[a ? a : this.M];
      return this.o >= a ? 1 : this.f > a ? 1 : this.f / a;
    }, startCollectors: function() {
      if (!this.D) {
        this.a = { loadTimeCollector: B(this, this.ma), mouseCollector: B(this, this.oa), keyboardCollector: B(this, this.la), accelerometerCollector: B(this, this.ea), touchCollector: B(this, this.qa) };
        if (window.addEventListener)
          window.addEventListener("load", this.a.loadTimeCollector, false), window.addEventListener("mousemove", this.a.mouseCollector, false), window.addEventListener("keypress", this.a.keyboardCollector, false), window.addEventListener("devicemotion", this.a.accelerometerCollector, false), window.addEventListener("touchmove", this.a.touchCollector, false);
        else if (document.attachEvent)
          document.attachEvent("onload", this.a.loadTimeCollector), document.attachEvent("onmousemove", this.a.mouseCollector), document.attachEvent("keypress", this.a.keyboardCollector);
        else
          throw new sjcl2.exception.bug("can't attach event");
        this.D = true;
      }
    }, stopCollectors: function() {
      this.D && (window.removeEventListener ? (window.removeEventListener("load", this.a.loadTimeCollector, false), window.removeEventListener("mousemove", this.a.mouseCollector, false), window.removeEventListener("keypress", this.a.keyboardCollector, false), window.removeEventListener("devicemotion", this.a.accelerometerCollector, false), window.removeEventListener("touchmove", this.a.touchCollector, false)) : document.detachEvent && (document.detachEvent("onload", this.a.loadTimeCollector), document.detachEvent("onmousemove", this.a.mouseCollector), document.detachEvent("keypress", this.a.keyboardCollector)), this.D = false);
    }, addEventListener: function(a, b2) {
      this.K[a][this.ga++] = b2;
    }, removeEventListener: function(a, b2) {
      var c, d2, e = this.K[a], f = [];
      for (d2 in e)
        e.hasOwnProperty(d2) && e[d2] === b2 && f.push(d2);
      for (c = 0; c < f.length; c++)
        d2 = f[c], delete e[d2];
    }, la: function() {
      C2(this, 1);
    }, oa: function(a) {
      var b2, c;
      try {
        b2 = a.x || a.clientX || a.offsetX || 0, c = a.y || a.clientY || a.offsetY || 0;
      } catch (d2) {
        c = b2 = 0;
      }
      0 != b2 && 0 != c && this.addEntropy([b2, c], 2, "mouse");
      C2(this, 0);
    }, qa: function(a) {
      a = a.touches[0] || a.changedTouches[0];
      this.addEntropy([a.pageX || a.clientX, a.pageY || a.clientY], 1, "touch");
      C2(this, 0);
    }, ma: function() {
      C2(this, 2);
    }, ea: function(a) {
      a = a.accelerationIncludingGravity.x || a.accelerationIncludingGravity.y || a.accelerationIncludingGravity.z;
      if (window.orientation) {
        var b2 = window.orientation;
        "number" === typeof b2 && this.addEntropy(b2, 1, "accelerometer");
      }
      a && this.addEntropy(a, 2, "accelerometer");
      C2(this, 0);
    } };
    function A2(a, b2) {
      var c, d2 = sjcl2.random.K[a], e = [];
      for (c in d2)
        d2.hasOwnProperty(c) && e.push(d2[c]);
      for (c = 0; c < e.length; c++)
        e[c](b2);
    }
    function C2(a, b2) {
      "undefined" !== typeof window && window.performance && "function" === typeof window.performance.now ? a.addEntropy(window.performance.now(), b2, "loadtime") : a.addEntropy(new Date().valueOf(), b2, "loadtime");
    }
    function y2(a) {
      a.b = z(a).concat(z(a));
      a.L = new sjcl2.cipher.aes(a.b);
    }
    function z(a) {
      for (var b2 = 0; 4 > b2 && (a.h[b2] = a.h[b2] + 1 | 0, !a.h[b2]); b2++)
        ;
      return a.L.encrypt(a.h);
    }
    function B(a, b2) {
      return function() {
        b2.apply(a, arguments);
      };
    }
    sjcl2.random = new sjcl2.prng(6);
    a:
      try {
        if (G = "undefined" !== typeof module && module.exports) {
          try {
            H = __require22("crypto");
          } catch (a) {
            H = null;
          }
          G = E = H;
        }
        if (G && E.randomBytes)
          D = E.randomBytes(128), D = new Uint32Array(new Uint8Array(D).buffer), sjcl2.random.addEntropy(D, 1024, "crypto['randomBytes']");
        else if ("undefined" !== typeof window && "undefined" !== typeof Uint32Array) {
          F2 = new Uint32Array(32);
          if (window.crypto && window.crypto.getRandomValues)
            window.crypto.getRandomValues(F2);
          else if (window.msCrypto && window.msCrypto.getRandomValues)
            window.msCrypto.getRandomValues(F2);
          else
            break a;
          sjcl2.random.addEntropy(F2, 1024, "crypto['getRandomValues']");
        }
      } catch (a) {
        "undefined" !== typeof window && window.console && (console.log("There was an error collecting entropy from the browser:"), console.log(a));
      }
    var D;
    var E;
    var F2;
    var G;
    var H;
    sjcl2.json = { defaults: { v: 1, iter: 1e4, ks: 128, ts: 64, mode: "ccm", adata: "", cipher: "aes" }, ja: function(a, b2, c, d2) {
      c = c || {};
      d2 = d2 || {};
      var e = sjcl2.json, f = e.g({ iv: sjcl2.random.randomWords(4, 0) }, e.defaults), g;
      e.g(f, c);
      c = f.adata;
      "string" === typeof f.salt && (f.salt = sjcl2.codec.base64.toBits(f.salt));
      "string" === typeof f.iv && (f.iv = sjcl2.codec.base64.toBits(f.iv));
      if (!sjcl2.mode[f.mode] || !sjcl2.cipher[f.cipher] || "string" === typeof a && 100 >= f.iter || 64 !== f.ts && 96 !== f.ts && 128 !== f.ts || 128 !== f.ks && 192 !== f.ks && 256 !== f.ks || 2 > f.iv.length || 4 < f.iv.length)
        throw new sjcl2.exception.invalid("json encrypt: invalid parameters");
      "string" === typeof a ? (g = sjcl2.misc.cachedPbkdf2(a, f), a = g.key.slice(0, f.ks / 32), f.salt = g.salt) : sjcl2.ecc && a instanceof sjcl2.ecc.elGamal.publicKey && (g = a.kem(), f.kemtag = g.tag, a = g.key.slice(0, f.ks / 32));
      "string" === typeof b2 && (b2 = sjcl2.codec.utf8String.toBits(b2));
      "string" === typeof c && (f.adata = c = sjcl2.codec.utf8String.toBits(c));
      g = new sjcl2.cipher[f.cipher](a);
      e.g(d2, f);
      d2.key = a;
      f.ct = "ccm" === f.mode && sjcl2.arrayBuffer && sjcl2.arrayBuffer.ccm && b2 instanceof ArrayBuffer ? sjcl2.arrayBuffer.ccm.encrypt(g, b2, f.iv, c, f.ts) : sjcl2.mode[f.mode].encrypt(g, b2, f.iv, c, f.ts);
      return f;
    }, encrypt: function(a, b2, c, d2) {
      var e = sjcl2.json, f = e.ja.apply(e, arguments);
      return e.encode(f);
    }, ia: function(a, b2, c, d2) {
      c = c || {};
      d2 = d2 || {};
      var e = sjcl2.json;
      b2 = e.g(e.g(e.g({}, e.defaults), b2), c, true);
      var f, g;
      f = b2.adata;
      "string" === typeof b2.salt && (b2.salt = sjcl2.codec.base64.toBits(b2.salt));
      "string" === typeof b2.iv && (b2.iv = sjcl2.codec.base64.toBits(b2.iv));
      if (!sjcl2.mode[b2.mode] || !sjcl2.cipher[b2.cipher] || "string" === typeof a && 100 >= b2.iter || 64 !== b2.ts && 96 !== b2.ts && 128 !== b2.ts || 128 !== b2.ks && 192 !== b2.ks && 256 !== b2.ks || !b2.iv || 2 > b2.iv.length || 4 < b2.iv.length)
        throw new sjcl2.exception.invalid("json decrypt: invalid parameters");
      "string" === typeof a ? (g = sjcl2.misc.cachedPbkdf2(a, b2), a = g.key.slice(0, b2.ks / 32), b2.salt = g.salt) : sjcl2.ecc && a instanceof sjcl2.ecc.elGamal.secretKey && (a = a.unkem(sjcl2.codec.base64.toBits(b2.kemtag)).slice(0, b2.ks / 32));
      "string" === typeof f && (f = sjcl2.codec.utf8String.toBits(f));
      g = new sjcl2.cipher[b2.cipher](a);
      f = "ccm" === b2.mode && sjcl2.arrayBuffer && sjcl2.arrayBuffer.ccm && b2.ct instanceof ArrayBuffer ? sjcl2.arrayBuffer.ccm.decrypt(g, b2.ct, b2.iv, b2.tag, f, b2.ts) : sjcl2.mode[b2.mode].decrypt(g, b2.ct, b2.iv, f, b2.ts);
      e.g(d2, b2);
      d2.key = a;
      return 1 === c.raw ? f : sjcl2.codec.utf8String.fromBits(f);
    }, decrypt: function(a, b2, c, d2) {
      var e = sjcl2.json;
      return e.ia(a, e.decode(b2), c, d2);
    }, encode: function(a) {
      var b2, c = "{", d2 = "";
      for (b2 in a)
        if (a.hasOwnProperty(b2)) {
          if (!b2.match(/^[a-z0-9]+$/i))
            throw new sjcl2.exception.invalid("json encode: invalid property name");
          c += d2 + '"' + b2 + '":';
          d2 = ",";
          switch (typeof a[b2]) {
            case "number":
            case "boolean":
              c += a[b2];
              break;
            case "string":
              c += '"' + escape(a[b2]) + '"';
              break;
            case "object":
              c += '"' + sjcl2.codec.base64.fromBits(a[b2], 0) + '"';
              break;
            default:
              throw new sjcl2.exception.bug("json encode: unsupported type");
          }
        }
      return c + "}";
    }, decode: function(a) {
      a = a.replace(/\s/g, "");
      if (!a.match(/^\{.*\}$/))
        throw new sjcl2.exception.invalid("json decode: this isn't json!");
      a = a.replace(/^\{|\}$/g, "").split(/,/);
      var b2 = {}, c, d2;
      for (c = 0; c < a.length; c++) {
        if (!(d2 = a[c].match(/^\s*(?:(["']?)([a-z][a-z0-9]*)\1)\s*:\s*(?:(-?\d+)|"([a-z0-9+\/%*_.@=\-]*)"|(true|false))$/i)))
          throw new sjcl2.exception.invalid("json decode: this isn't json!");
        null != d2[3] ? b2[d2[2]] = parseInt(d2[3], 10) : null != d2[4] ? b2[d2[2]] = d2[2].match(/^(ct|adata|salt|iv)$/) ? sjcl2.codec.base64.toBits(d2[4]) : unescape(d2[4]) : null != d2[5] && (b2[d2[2]] = "true" === d2[5]);
      }
      return b2;
    }, g: function(a, b2, c) {
      void 0 === a && (a = {});
      if (void 0 === b2)
        return a;
      for (var d2 in b2)
        if (b2.hasOwnProperty(d2)) {
          if (c && void 0 !== a[d2] && a[d2] !== b2[d2])
            throw new sjcl2.exception.invalid("required parameter overridden");
          a[d2] = b2[d2];
        }
      return a;
    }, sa: function(a, b2) {
      var c = {}, d2;
      for (d2 in a)
        a.hasOwnProperty(d2) && a[d2] !== b2[d2] && (c[d2] = a[d2]);
      return c;
    }, ra: function(a, b2) {
      var c = {}, d2;
      for (d2 = 0; d2 < b2.length; d2++)
        void 0 !== a[b2[d2]] && (c[b2[d2]] = a[b2[d2]]);
      return c;
    } };
    sjcl2.encrypt = sjcl2.json.encrypt;
    sjcl2.decrypt = sjcl2.json.decrypt;
    sjcl2.misc.pa = {};
    sjcl2.misc.cachedPbkdf2 = function(a, b2) {
      var c = sjcl2.misc.pa, d2;
      b2 = b2 || {};
      d2 = b2.iter || 1e3;
      c = c[a] = c[a] || {};
      d2 = c[d2] = c[d2] || { firstSalt: b2.salt && b2.salt.length ? b2.salt.slice(0) : sjcl2.random.randomWords(2, 0) };
      c = void 0 === b2.salt ? d2.firstSalt : b2.salt;
      d2[c] = d2[c] || sjcl2.misc.pbkdf2(a, c, b2.iter);
      return { key: d2[c].slice(0), salt: c.slice(0) };
    };
    "undefined" !== typeof module && module.exports && (module.exports = sjcl2);
    "function" === typeof define && define([], function() {
      return sjcl2;
    });
  } });
  var require_browser = __commonJS2({ "node_modules/web-worker/cjs/browser.js"(exports, module) {
    module.exports = Worker;
  } });
  var EventHandler = class {
    constructor(data) {
      this.pushToState = {};
      this.data = {};
      this.triggers = {};
      this.setState = (updateObj) => {
        Object.assign(this.data, updateObj);
        for (const prop of Object.getOwnPropertyNames(updateObj)) {
          if (this.triggers[prop])
            this.triggers[prop].forEach((obj) => obj.onchange(this.data[prop]));
        }
        return this.data;
      };
      this.setValue = (key, value) => {
        this.data[key] = value;
        if (this.triggers[key])
          this.triggers[key].forEach((obj) => obj.onchange(this.data[key]));
      };
      this.subscribeTrigger = (key, onchange) => {
        if (key) {
          if (!this.triggers[key]) {
            this.triggers[key] = [];
          }
          let l = this.triggers[key].length;
          this.triggers[key].push({ sub: l, onchange });
          return this.triggers[key].length - 1;
        } else
          return void 0;
      };
      this.unsubscribeTrigger = (key, sub) => {
        let triggers = this.triggers[key];
        if (triggers) {
          if (!sub)
            delete this.triggers[key];
          else {
            let sub2 = void 0;
            let obj = triggers.find((o, i) => {
              if (o.sub === sub2) {
                sub2 = i;
                return true;
              }
            });
            if (obj)
              triggers.splice(sub2, 1);
            if (this.onRemoved)
              this.onRemoved(obj);
            return true;
          }
        }
      };
      this.subscribeTriggerOnce = (key, onchange) => {
        let sub;
        let changed = (value) => {
          onchange(value);
          this.unsubscribeTrigger(key, sub);
        };
        sub = this.subscribeTrigger(key, changed);
      };
      this.getTrigger = (key, sub) => {
        for (const s in this.triggers[key]) {
          if (this.triggers[key][s].sub === sub)
            return this.triggers[key][s];
        }
      };
      if (typeof data === "object")
        this.data = data;
    }
  };
  var state = new EventHandler();
  var GraphNode = class {
    constructor(properties, parent2, graph) {
      this.__node = { tag: `node${Math.floor(Math.random() * 1e15)}`, unique: `${Math.random()}`, state };
      this.__subscribe = (callback, key, subInput, bound, target) => {
        const subscribeToFunction = (k, setTarget = (callback2, target2) => callback2, triggerCallback = callback) => {
          let sub = this.__node.state.subscribeTrigger(k, triggerCallback);
          let trigger = this.__node.state.getTrigger(k, sub);
          trigger.source = this.__node.tag;
          if (key)
            trigger.key = key;
          trigger.target = setTarget(callback);
          if (bound)
            trigger.bound = bound;
          return sub;
        };
        const subscribeToGraph = (callback2) => {
          let fn = this.__node.graph.get(callback2);
          if (!fn && callback2.includes(".")) {
            let n = this.__node.graph.get(callback2.substring(0, callback2.lastIndexOf(".")));
            let key2 = callback2.substring(callback2.lastIndexOf(".") + 1);
            if (n && typeof n[key2] === "function")
              callback2 = (...args) => {
                return n[key2](...args);
              };
          }
        };
        if (key) {
          if (!this.__node.localState) {
            this.__addLocalState(this);
          }
          if (typeof callback === "string") {
            if (typeof this[callback] === "function")
              callback = this[callback];
            else if (this.__node.graph)
              subscribeToGraph(callback);
          }
          let sub;
          let k = subInput ? this.__node.unique + "." + key + "input" : this.__node.unique + "." + key;
          if (typeof callback === "function")
            sub = subscribeToFunction(k);
          else if (callback?.__node)
            sub = subscribeToFunction(k, (callback2, target2) => target2 ? target2 : callback2.__node.unique, (state2) => {
              if (callback.__operator)
                callback.__operator(state2);
            });
          return sub;
        } else {
          if (typeof callback === "string") {
            if (this.__node.graph)
              callback = this.__node.graph.get(callback);
            else
              callback = this.__node.graph.nodes.get(callback);
          }
          let sub;
          let k = subInput ? this.__node.unique + "input" : this.__node.unique;
          if (typeof callback === "function")
            sub = subscribeToFunction(k);
          else if (callback?.__node)
            sub = subscribeToFunction(k, (callback2, target2) => target2 ? target2 : callback2.__node.unique, (state2) => {
              if (callback.__operator)
                callback.__operator(state2);
            });
          return sub;
        }
      };
      this.__unsubscribe = (sub, key, subInput) => {
        if (key) {
          return this.__node.state.unsubscribeTrigger(subInput ? this.__node.unique + "." + key + "input" : this.__node.unique + "." + key, sub);
        } else
          return this.__node.state.unsubscribeTrigger(subInput ? this.__node.unique + "input" : this.__node.unique, sub);
      };
      this.__setOperator = (fn) => {
        fn = fn.bind(this);
        this.__operator = (...args) => {
          if (this.__node.inputState)
            this.__node.state.setValue(this.__node.unique + "input", args);
          let result = fn(...args);
          if (this.__node.state.triggers[this.__node.unique]) {
            if (typeof result?.then === "function") {
              result.then((res) => {
                if (res !== void 0)
                  this.__node.state.setValue(this.__node.unique, res);
              }).catch(console.error);
            } else if (result !== void 0)
              this.__node.state.setValue(this.__node.unique, result);
          }
          return result;
        };
        if (!this.__subscribedToParent) {
          if (this.__parent instanceof GraphNode && this.__parent.__operator) {
            let sub = this.__parent.__subscribe(this);
            let ondelete = () => {
              this.__parent?.__unsubscribe(sub);
              delete this.__subscribedToParent;
            };
            this.__addOndisconnected(ondelete);
            this.__subscribedToParent = true;
          }
        }
        return this.__operator;
      };
      this.__proxyObject = (obj) => {
        let allProps = getAllProperties(obj);
        for (const k of allProps) {
          if (typeof this[k] === "undefined") {
            if (typeof obj[k] === "function") {
              this[k] = (...args) => {
                if (this.__node.inputState)
                  this.__node.state.setValue(this.__node.unique + "." + k + "input", args);
                let result = obj[k](...args);
                if (this.__node.state.triggers[this.__node.unique + "." + k]) {
                  if (typeof result?.then === "function") {
                    result.then((res) => {
                      this.__node.state.setValue(this.__node.unique + "." + k, res);
                    }).catch(console.error);
                  } else
                    this.__node.state.setValue(this.__node.unique + "." + k, result);
                }
                return result;
              };
            } else {
              let definition = { get: () => {
                return obj[k];
              }, set: (value) => {
                obj[k] = value;
                if (this.__node.state.triggers[this.__node.unique + "." + k])
                  this.__node.state.setValue(this.__node.unique + "." + k, value);
              }, enumerable: true, configurable: true };
              Object.defineProperty(this, k, definition);
            }
          }
        }
      };
      let orig = properties;
      if (typeof properties === "function") {
        properties = { __operator: properties, __node: { forward: true, tag: properties.name } };
      } else if (typeof properties === "string") {
        if (graph?.get(properties)) {
          properties = graph.get(properties);
        }
      }
      if (!properties.__node.initial)
        properties.__node.initial = orig;
      if (typeof properties === "object") {
        if (properties.__props) {
          if (typeof properties.__props === "function")
            properties.__props = new properties.__props();
          if (typeof properties.__props === "object") {
            this.__proxyObject(properties.__props);
          }
        }
        if (typeof properties.__node === "string") {
          if (graph?.get(properties.__node.tag)) {
            properties = graph.get(properties.__node.tag);
          } else
            properties.__node = {};
        } else if (!properties.__node)
          properties.__node = {};
        if (!properties.__parent && parent2)
          properties.__parent = parent2;
        if (graph) {
          properties.__node.graph = graph;
        }
        if (properties.__operator) {
          if (typeof properties.__operator === "string") {
            if (graph) {
              let n = graph.get(properties.__operator);
              if (n)
                properties.__operator = n.__operator;
              if (!properties.__node.tag && properties.__operator.name)
                properties.__node.tag = properties.__operator.name;
            }
          }
          if (typeof properties.__operator === "function")
            properties.__operator = this.__setOperator(properties.__operator);
        }
        if (!properties.__node.tag) {
          if (properties.__operator?.name)
            properties.__node.tag = properties.__operator.name;
          else
            properties.__node.tag = `node${Math.floor(Math.random() * 1e15)}`;
        }
        if (parent2?.__node && !(parent2 instanceof Graph || properties instanceof Graph))
          properties.__node.tag = parent2.__node.tag + "." + properties.__node.tag;
        if (parent2 instanceof Graph && properties instanceof Graph) {
          if (properties.__node.loaders)
            Object.assign(parent2.__node.loaders ? parent2.__node.loaders : {}, properties.__node.loaders);
          if (parent2.__node.mapGraphs) {
            properties.__node.nodes.forEach((n) => {
              parent2.set(properties.__node.tag + "." + n.__node.tag, n);
            });
            let ondelete = () => {
              properties.__node.nodes.forEach((n) => {
                parent2.__node.nodes.delete(properties.__node.tag + "." + n.__node.tag);
              });
            };
            this.__addOndisconnected(ondelete);
          }
        }
        properties.__node = Object.assign(this.__node, properties.__node);
        let keys = Object.getOwnPropertyNames(properties);
        for (const key of keys) {
          this[key] = properties[key];
        }
        if (typeof properties.default === "function" && !properties.__operator) {
          let fn = properties.default.bind(this);
          this.default = (...args) => {
            if (this.__node.inputState)
              this.__node.state.setValue(this.__node.unique + "input", args);
            let result = fn(...args);
            if (typeof result?.then === "function") {
              result.then((res) => {
                if (res !== void 0)
                  this.__node.state.setValue(this.__node.unique, res);
              }).catch(console.error);
            } else if (result !== void 0)
              this.__node.state.setValue(this.__node.unique, result);
            return result;
          };
          properties.default = this.default;
        }
        if (properties instanceof Graph)
          this.__node.source = properties;
      }
    }
    __addLocalState(props) {
      if (!props)
        return;
      if (!this.__node.localState) {
        this.__node.localState = {};
      }
      let localState = this.__node.localState;
      for (let k in props) {
        if (this.__props && this.__props[k])
          continue;
        if (typeof props[k] === "function") {
          if (!k.startsWith("_")) {
            let fn = props[k].bind(this);
            props[k] = (...args) => {
              if (this.__node.inputState)
                this.__node.state.setValue(this.__node.unique + "." + k + "input", args);
              let result = fn(...args);
              if (typeof result?.then === "function") {
                if (this.__node.state.triggers[this.__node.unique + "." + k])
                  result.then((res) => {
                    this.__node.state.setValue(this.__node.unique + "." + k, res);
                  }).catch(console.error);
              } else if (this.__node.state.triggers[this.__node.unique + "." + k])
                this.__node.state.setValue(this.__node.unique + "." + k, result);
              return result;
            };
            this[k] = props[k];
          }
        } else {
          localState[k] = props[k];
          let definition = { get: () => {
            return localState[k];
          }, set: (v2) => {
            localState[k] = v2;
            if (this.__node.state.triggers[this.__node.unique + "." + k])
              this.__node.state.setValue(this.__node.unique + "." + k, v2);
          }, enumerable: true, configurable: true };
          Object.defineProperty(this, k, definition);
          if (typeof this.__node.initial === "object") {
            let dec = Object.getOwnPropertyDescriptor(this.__node.initial, k);
            if (dec === void 0 || dec?.configurable) {
              Object.defineProperty(this.__node.initial, k, definition);
            }
          }
        }
      }
    }
    __addOnconnected(callback) {
      if (Array.isArray(this.__ondisconnected)) {
        this.__onconnected.push(callback);
      } else if (typeof this.__onconnected === "function") {
        this.__onconnected = [callback, this.__onconnected];
      } else
        this.__onconnected = callback;
    }
    __addOndisconnected(callback) {
      if (Array.isArray(this.__ondisconnected)) {
        this.__ondisconnected.push(callback);
      } else if (typeof this.__ondisconnected === "function") {
        this.__ondisconnected = [callback, this.__ondisconnected];
      } else
        this.__ondisconnected = callback;
    }
    __callConnected(node = this) {
      if (typeof this.__onconnected === "function") {
        this.__onconnected(this);
      } else if (Array.isArray(this.__onconnected)) {
        this.__onconnected.forEach((o) => {
          o(this);
        });
      }
    }
    __callDisconnected(node = this) {
      if (typeof this.__ondisconnected === "function")
        this.__ondisconnected(this);
      else if (Array.isArray(this.__ondisconnected)) {
        this.__ondisconnected.forEach((o) => {
          o(this);
        });
      }
    }
  };
  var Graph = class {
    constructor(options2) {
      this.__node = { tag: `graph${Math.floor(Math.random() * 1e15)}`, nodes: /* @__PURE__ */ new Map(), state };
      this.init = (options22) => {
        if (options22) {
          recursivelyAssign(this.__node, options22);
          if (options22.tree)
            this.setTree(options22.tree);
        }
      };
      this.setTree = (tree) => {
        this.__node.tree = Object.assign(this.__node.tree ? this.__node.tree : {}, tree);
        let cpy = Object.assign({}, tree);
        if (cpy.__node)
          delete cpy.__node;
        let listeners = this.recursiveSet(cpy, this, void 0, tree);
        if (tree.__node) {
          if (!tree.__node.tag)
            tree.__node._tag = `tree${Math.floor(Math.random() * 1e15)}`;
          else if (!this.get(tree.__node.tag)) {
            let node = new GraphNode(tree, this, this);
            this.set(node.__node.tag, node);
            for (const l in this.__node.loaders) {
              if (typeof this.__node.loaders[l] === "object") {
                if (this.__node.loaders[l].init)
                  this.__node.loaders[l](node, parent, this, this.__node.tree, tree);
                if (this.__node.loaders[l].connected)
                  node.__addOnconnected(this.__node.loaders[l].connect);
                if (this.__node.loaders[l].disconnected)
                  node.__addOndisconnected(this.__node.loaders[l].disconnect);
              } else if (typeof this.__node.loaders === "function")
                this.__node.loaders[l](node, this, this, tree, tree, tree.__node.tag);
            }
            if (node.__listeners) {
              listeners[node.__node.tag] = node.__listeners;
            }
          }
        } else if (tree.__listeners) {
          this.setListeners(tree.__listeners);
        }
        this.setListeners(listeners);
        return cpy;
      };
      this.setLoaders = (loaders2, replace) => {
        if (replace)
          this.__node.loaders = loaders2;
        else
          Object.assign(this.__node.loaders, loaders2);
        return this.__node.loaders;
      };
      this.add = (properties, parent2) => {
        let listeners = {};
        if (typeof parent2 === "string")
          parent2 = this.get(parent2);
        if (typeof properties === "function")
          properties = { __operator: properties };
        else if (typeof properties === "string")
          properties = this.__node.tree[properties];
        let p = Object.assign({}, properties);
        if (!p.__node)
          p.__node = {};
        p.__node.initial = properties;
        if (typeof properties === "object" && (!p?.__node?.tag || !this.get(p.__node.tag))) {
          let node = new GraphNode(p, parent2, this);
          this.set(node.__node.tag, node);
          for (const l in this.__node.loaders) {
            if (typeof this.__node.loaders[l] === "object") {
              if (this.__node.loaders[l].init)
                this.__node.loaders[l](node, parent2, this, this.__node.tree, properties, node.__node.tag);
              if (this.__node.loaders[l].connected)
                node.__addOnconnected(this.__node.loaders[l].connect);
              if (this.__node.loaders[l].disconnected)
                node.__addOndisconnected(this.__node.loaders[l].disconnect);
            } else if (typeof this.__node.loaders === "function")
              this.__node.loaders[l](node, parent2, this, this.__node.tree, properties, node.__node.tag);
          }
          this.__node.tree[node.__node.tag] = properties;
          if (node.__listeners) {
            listeners[node.__node.tag] = node.__listeners;
          }
          if (node.__children) {
            node.__children = Object.assign({}, node.__children);
            this.recursiveSet(node.__children, node, listeners, node.__children);
          }
          this.setListeners(listeners);
          node.__callConnected();
          return node;
        }
        return;
      };
      this.recursiveSet = (t, parent2, listeners = {}, origin) => {
        let keys = Object.getOwnPropertyNames(origin);
        for (const key of keys) {
          if (key.includes("__"))
            continue;
          let p = origin[key];
          if (Array.isArray(p))
            continue;
          if (typeof p === "function")
            p = { __operator: p };
          else if (typeof p === "string")
            p = this.__node.tree[p];
          else if (typeof p === "boolean")
            p = this.__node.tree[key];
          if (typeof p === "object") {
            p = Object.assign({}, p);
            if (!p.__node)
              p.__node = {};
            if (!p.__node.tag)
              p.__node.tag = key;
            p.__node.initial = t[key];
            if (this.get(p.__node.tag) && !(parent2?.__node && this.get(parent2.__node.tag + "." + p.__node.tag)) || parent2?.__node && this.get(parent2.__node.tag + "." + p.__node.tag))
              continue;
            let node = new GraphNode(p, parent2, this);
            this.set(node.__node.tag, node);
            for (const l in this.__node.loaders) {
              this.__node.loaders[l](node, parent2, this, t, t[key], key);
            }
            t[key] = node;
            this.__node.tree[node.__node.tag] = p;
            if (node.__listeners) {
              listeners[node.__node.tag] = node.__listeners;
            }
            if (node.__children) {
              node.__children = Object.assign({}, node.__children);
              this.recursiveSet(node.__children, node, listeners, node.__children);
            }
            node.__callConnected();
          }
        }
        return listeners;
      };
      this.remove = (node, clearListeners = true) => {
        this.unsubscribe(node);
        if (typeof node === "string")
          node = this.get(node);
        if (node instanceof GraphNode) {
          this.delete(node.__node.tag);
          delete this.__node.tree[node.__node.tag];
          if (clearListeners) {
            this.clearListeners(node);
          }
          node.__callDisconnected();
          const recursiveRemove = (t) => {
            for (const key in t) {
              this.unsubscribe(t[key]);
              this.delete(t[key].__node.tag);
              delete this.__node.tree[t[key].__node.tag];
              this.delete(key);
              delete this.__node.tree[key];
              t[key].__node.tag = t[key].__node.tag.substring(t[key].__node.tag.lastIndexOf(".") + 1);
              if (clearListeners) {
                this.clearListeners(t[key]);
              }
              t[key].__callDisconnected();
              if (t[key].__children) {
                recursiveRemove(t[key].__children);
              }
            }
          };
          if (node.__children) {
            recursiveRemove(node.__children);
          }
        }
        if (node?.__node.tag && node?.__parent) {
          delete node?.__parent;
          node.__node.tag = node.__node.tag.substring(node.__node.tag.indexOf(".") + 1);
        }
        return node;
      };
      this.run = (node, ...args) => {
        if (typeof node === "string") {
          let nd = this.get(node);
          if (!nd && node.includes(".")) {
            nd = this.get(node.substring(0, node.lastIndexOf(".")));
            if (typeof nd?.[node.substring(node.lastIndexOf(".") + 1)] === "function")
              return nd[node.substring(node.lastIndexOf(".") + 1)](...args);
          } else if (nd?.__operator)
            return nd.__operator(...args);
        }
        if (node?.__operator) {
          return node?.__operator(...args);
        }
      };
      this.setListeners = (listeners) => {
        for (const key in listeners) {
          let node = this.get(key);
          if (typeof listeners[key] === "object") {
            for (const k in listeners[key]) {
              let n = this.get(k);
              let sub;
              if (typeof listeners[key][k] !== "object")
                listeners[key][k] = { __callback: listeners[key][k] };
              else if (!listeners[key][k].__callback) {
                for (const kk in listeners[key][k]) {
                  if (typeof listeners[key][k][kk] !== "object") {
                    listeners[key][k][kk] = { __callback: listeners[key][k][kk] };
                    if (listeners[key][k][kk].__callback === true)
                      listeners[key][k][kk].__callback = node.__operator;
                  }
                  let nn = this.get(kk);
                  if (nn) {
                    if (!nn) {
                      let tag = k.substring(0, k.lastIndexOf("."));
                      nn = this.get(tag);
                      if (n) {
                        sub = this.subscribe(nn, listeners[key][k][kk].__callback, k.substring(k.lastIndexOf(".") + 1), listeners[key][k][kk].inputState, key, k);
                        if (typeof node.__listeners[k][kk] !== "object")
                          node.__listeners[k][kk] = { __callback: listeners[key][k][kk].__callback, inputState: listeners[key][k][kk]?.inputState };
                        node.__listeners[k][kk].sub = sub;
                      }
                    } else {
                      sub = this.subscribe(nn, listeners[key][k][kk].__callback, void 0, listeners[key][k].inputState, key, k);
                      if (typeof node.__listeners[k][kk] !== "object")
                        node.__listeners[k][kk] = { __callback: listeners[key][k][kk].__callback, inputState: listeners[key][k][kk]?.inputState };
                      node.__listeners[k][kk].sub = sub;
                    }
                  }
                }
              }
              if (listeners[key][k].__callback) {
                if (listeners[key][k].__callback === true)
                  listeners[key][k].__callback = node.__operator;
                if (typeof listeners[key][k].__callback === "function")
                  listeners[key][k].__callback = listeners[key][k].__callback.bind(node);
                if (typeof node.__listeners !== "object")
                  node.__listeners = {};
                if (!n) {
                  let tag = k.substring(0, k.lastIndexOf("."));
                  n = this.get(tag);
                  if (n) {
                    sub = this.subscribe(n, listeners[key][k].__callback, k.substring(k.lastIndexOf(".") + 1), listeners[key][k].inputState, key, k);
                    if (typeof node.__listeners[k] !== "object")
                      node.__listeners[k] = { __callback: listeners[key][k].__callback, inputState: listeners[key][k]?.inputState };
                    node.__listeners[k].sub = sub;
                  }
                } else {
                  sub = this.subscribe(n, listeners[key][k].__callback, void 0, listeners[key][k].inputState, key, k);
                  if (typeof node.__listeners[k] !== "object")
                    node.__listeners[k] = { __callback: listeners[key][k].__callback, inputState: listeners[key][k]?.inputState };
                  node.__listeners[k].sub = sub;
                }
              }
            }
          }
        }
      };
      this.clearListeners = (node, listener) => {
        if (typeof node === "string")
          node = this.get(node);
        if (node?.__listeners) {
          for (const key in node.__listeners) {
            if (listener && key !== listener)
              continue;
            if (typeof node.__listeners[key].sub !== "number")
              continue;
            let n = this.get(key);
            if (!n) {
              n = this.get(key.substring(0, key.lastIndexOf(".")));
              if (n) {
                if (!node.__listeners[key].__callback) {
                  for (const k in node.__listeners[key]) {
                    this.unsubscribe(n, node.__listeners[key][k].sub, key.substring(key.lastIndexOf(".") + 1), node.__listeners[key][k].inputState);
                  }
                } else
                  this.unsubscribe(n, node.__listeners[key].sub, key.substring(key.lastIndexOf(".") + 1), node.__listeners[key].inputState);
              }
            } else {
              if (!node.__listeners[key].__callback) {
                for (const k in node.__listeners[key]) {
                  this.unsubscribe(n, node.__listeners[key][k].sub, void 0, node.__listeners[key][k].inputState);
                }
              } else
                this.unsubscribe(n, node.__listeners[key].sub, void 0, node.__listeners[key].inputState);
            }
            delete node.__listeners[key];
          }
        }
      };
      this.get = (tag) => {
        return this.__node.nodes.get(tag);
      };
      this.set = (tag, node) => {
        return this.__node.nodes.set(tag, node);
      };
      this.delete = (tag) => {
        return this.__node.nodes.delete(tag);
      };
      this.getProps = (node, getInitial) => {
        if (typeof node === "string")
          node = this.get(node);
        if (node instanceof GraphNode) {
          let cpy;
          if (getInitial)
            cpy = Object.assign({}, this.__node.tree[node.__node.tag]);
          else {
            cpy = Object.assign({}, node);
            delete cpy.__unsubscribe;
            delete cpy.__setOperator;
            delete cpy.__node;
            delete cpy.__subscribeState;
            delete cpy.__subscribe;
          }
        }
      };
      this.subscribe = (node, callback, key, subInput, target, bound) => {
        let nd = node;
        if (!(node instanceof GraphNode))
          nd = this.get(node);
        let sub;
        if (typeof callback === "string") {
          if (target) {
            let method = this.get(target)?.[callback];
            if (typeof method === "function")
              callback = method;
          } else
            callback = this.get(callback)?.__operator;
        }
        if (nd instanceof GraphNode) {
          sub = nd.__subscribe(callback, key, subInput, target, bound);
          let ondelete = () => {
            nd.__unsubscribe(sub, key, subInput);
          };
          nd.__addOndisconnected(ondelete);
        } else if (typeof node === "string") {
          if (this.get(node)) {
            if (callback instanceof GraphNode && callback.__operator) {
              sub = this.get(node).__subscribe(callback.__operator, key, subInput, target, bound);
              let ondelete = () => {
                this.get(node).__unsubscribe(sub);
              };
              callback.__addOndisconnected(ondelete);
            } else if (typeof callback === "function" || typeof callback === "string") {
              sub = this.get(node).__subscribe(callback, key, subInput, target, bound);
              this.__node.state.getTrigger(this.get(node).__node.unique, sub).source = node;
            }
          } else {
            if (typeof callback === "string")
              callback = this.__node.nodes.get(callback).__operator;
            if (typeof callback === "function")
              sub = this.__node.state.subscribeTrigger(node, callback);
          }
        }
        return sub;
      };
      this.unsubscribe = (node, sub, key, subInput) => {
        if (node instanceof GraphNode) {
          return node.__unsubscribe(sub, key, subInput);
        } else
          return this.get(node)?.__unsubscribe(sub, key, subInput);
      };
      this.setState = (update2) => {
        this.__node.state.setState(update2);
      };
      this.init(options2);
    }
  };
  function recursivelyAssign(target, obj) {
    for (const key in obj) {
      if (obj[key]?.constructor.name === "Object" && !Array.isArray(obj[key])) {
        if (target[key]?.constructor.name === "Object" && !Array.isArray(target[key]))
          recursivelyAssign(target[key], obj[key]);
        else
          target[key] = recursivelyAssign({}, obj[key]);
      } else {
        target[key] = obj[key];
      }
    }
    return target;
  }
  function getAllProperties(obj) {
    var allProps = [], curr = obj;
    do {
      var props = Object.getOwnPropertyNames(curr);
      props.forEach(function(prop) {
        if (allProps.indexOf(prop) === -1)
          allProps.push(prop);
      });
    } while (curr = Object.getPrototypeOf(curr));
    return allProps;
  }
  var backprop = (node, parent2, graph) => {
    if (node.__node.backward && parent2 instanceof GraphNode) {
      graph.setListeners({ [parent2.__node.tag]: { [node.__node.tag]: parent2 } });
    }
  };
  var loop = (node, parent2, graph) => {
    if (node.__operator && !node.__node.looperSet) {
      node.__node.looperSet = true;
      if (typeof node.__node.delay === "number") {
        let fn = node.__operator;
        node.__operator = (...args) => {
          return new Promise((res, rej) => {
            setTimeout(async () => {
              res(await fn(...args));
            }, node.__node.delay);
          });
        };
      } else if (node.__node.frame === true) {
        let fn = node.__operator;
        node.__operator = (...args) => {
          return new Promise((res, rej) => {
            requestAnimationFrame(async () => {
              res(await fn(...args));
            });
          });
        };
      }
      if (typeof node.__node.repeat === "number" || typeof node.__node.recursive === "number") {
        let fn = node.__operator;
        node.__operator = async (...args) => {
          let i = node.__node.repeat ? node.__node.repeat : node.__node.recursive;
          let result;
          let repeater = async (tick, ...inp) => {
            while (tick > 0) {
              if (node.__node.delay || node.__node.frame) {
                fn(...inp).then(async (res) => {
                  if (node.__node.recursive) {
                    await repeater(tick, res);
                  } else
                    await repeater(tick, ...inp);
                });
                break;
              } else
                result = await fn(...args);
              tick--;
            }
          };
          await repeater(i, ...args);
          return result;
        };
      }
      if (node.__node.loop && typeof node.__node.loop === "number") {
        let fn = node.__operator;
        node.__operator = (...args) => {
          if (!("looping" in node.__node))
            node.__node.looping = true;
          if (node.__node.looping) {
            fn(...args);
            setTimeout(() => {
              node.__operator(...args);
            }, node.__node.loop);
          }
        };
        if (node.__node.looping)
          node.__operator();
        let ondelete = (node2) => {
          if (node2.__node.looping)
            node2.__node.looping = false;
        };
        node.__addOndisconnected(ondelete);
      }
    }
  };
  var animate = (node, parent2, graph) => {
    if (node.__node.animate === true || node.__animation) {
      let fn = node.__operator;
      node.__operator = (...args) => {
        if (!("animating" in node.__node))
          node.__node.animating = true;
        if (node.__node.animating) {
          if (typeof node.__animation === "function")
            node.__animation(...args);
          else
            fn(...args);
          requestAnimationFrame(() => {
            node.__operator(...args);
          });
        }
      };
      if (node.__node.animating || (!("animating" in node.__node) || node.__node.animating) && node.__animation)
        setTimeout(() => {
          requestAnimationFrame(node.__operator());
        }, 10);
      let ondelete = (node2) => {
        if (node2.__node.animating)
          node2.__node.animating = false;
      };
      node.__addOndisconnected(ondelete);
    }
  };
  var branching = (node, parent2, graph) => {
    if (typeof node.__node.branch === "object" && node.__operator && !node.__node.branchApplied) {
      let fn = node.__operator;
      node.__node.branchApplied = true;
      node.__operator = (...args) => {
        let result = fn(...args);
        for (const key in node.__node.branch) {
          let triggered = () => {
            if (typeof node.__node.branch[key].then === "function") {
              node.__node.branch[key].then(result);
            } else if (node.__node.branch[key].then instanceof GraphNode && node.__node.branch[key].then.__operator) {
              node.__node.branch[key].then.__operator(result);
            } else
              result = node.__node.branch[key].then;
          };
          if (typeof node.__node.branch[key].if === "function") {
            if (node.__node.branch[key].if(result)) {
              triggered();
            }
          } else if (node.__node.branch[key].if === result) {
            triggered();
          }
        }
        return result;
      };
    }
    if (node.__listeners) {
      for (const key in node.__listeners) {
        if (typeof node.__listeners[key] === "object") {
          if (node.__listeners[key].branch && !node.__listeners[key].branchApplied) {
            let fn = node.__listeners[key].callback;
            node.__listeners[key].branchApplied = true;
            node.__listeners.callback = (ret) => {
              let triggered = () => {
                if (typeof node.__listeners[key].branch.then === "function") {
                  ret = node.__listeners[key].branch.then(ret);
                } else if (node.__listeners[key].branch.then instanceof GraphNode && node.__listeners[key].branch.then.__operator) {
                  ret = node.__listeners[key].branch.then.__operator(ret);
                } else
                  ret = node.__listeners[key].branch.then;
              };
              if (typeof node.__listeners[key].branch.if === "function") {
                if (node.__listeners[key].branch.if(ret)) {
                  triggered();
                }
              } else if (node.__listeners[key].branch.if === ret) {
                triggered();
              }
              return fn(ret);
            };
          }
        }
      }
    }
  };
  var triggerListenerOncreate = (node, parent2, graph) => {
    if (node.__listeners) {
      for (const key in node.__listeners) {
        if (typeof node.__listeners[key] === "object") {
          if (node.__listeners[key].oncreate) {
            node.__listeners[key].callback(node.__listeners[key].oncreate);
          }
        }
      }
    }
  };
  var bindListener = (node, parent2, graph) => {
    if (node.__listeners) {
      for (const key in node.__listeners) {
        if (typeof node.__listeners[key] === "object") {
          if (typeof node.__listeners[key].binding === "object") {
            node.__listeners.callback = node.__listeners.callback.bind(node.__listeners[key].binding);
          }
        }
      }
    }
  };
  var transformListenerResult = (node, parent2, graph) => {
    if (node.__listeners) {
      for (const key in node.__listeners) {
        if (typeof node.__listeners[key] === "object") {
          if (typeof node.__listeners[key].transform === "function" && !node.__listeners[key].transformApplied) {
            let fn = node.__listeners[key].callback;
            node.__listeners[key].transformApplied = true;
            node.__listeners.callback = (ret) => {
              ret = node.__listeners[key].transform(ret);
              return fn(ret);
            };
          }
        }
      }
    }
  };
  var substitute__operator = (node, parent2, graph) => {
    if (node.post && !node.__operator) {
      node.__setOperator(node.post);
    } else if (!node.__operator && typeof node.get == "function") {
      node.__setOperator(node.get);
    }
    if (!node.get && node.__operator) {
      node.get = node.__operator;
    }
    if (node.aliases) {
      node.aliases.forEach((a) => {
        graph.set(a, node);
        let ondelete = (node2) => {
          graph.__node.nodes.delete(a);
        };
        node.__addOndisconnected(ondelete);
      });
    }
    if (typeof graph.__node.tree[node.__node.tag] === "object" && node.get)
      graph.__node.tree[node.__node.tag].get = node.get;
  };
  var loaders = { backprop, loop, animate, branching, triggerListenerOncreate, bindListener, transformListenerResult, substitute__operator };
  var Service = class extends Graph {
    constructor(options2) {
      super({ ...options2, loaders: options2?.loaders ? Object.assign({ ...loaders }, options2.loaders) : { ...loaders } });
      this.name = `service${Math.floor(Math.random() * 1e15)}`;
      this.addServices = (services) => {
        for (const s in services) {
          if (typeof services[s] === "function")
            services[s] = new services[s]();
          if (services[s]?.__node?.loaders)
            Object.assign(this.__node.loaders, services[s].__node.loaders);
          if (services[s]?.__node?.nodes) {
            services[s].__node.nodes.forEach((n, tag) => {
              if (!this.get(tag)) {
                this.set(tag, n);
              } else
                this.set(s + "." + tag, n);
            });
            this.__node.nodes.forEach((n, k) => {
              if (!services[s].__node.nodes.get(k))
                services[s].__node.nodes.set(k, n);
            });
            let set = this.set;
            this.set = (tag, node) => {
              services[s].set(tag, node);
              return set(tag, node);
            };
            let del = this.delete;
            this.delete = (tag) => {
              services[s].delete(tag);
              return del(tag);
            };
          } else if (typeof services[s] === "object") {
            this.setTree(services[s]);
          }
        }
      };
      this.handleMethod = (route, method, args) => {
        let m = method.toLowerCase();
        let src = this.__node.nodes.get(route);
        if (!src) {
          src = this.__node.tree[route];
        }
        if (src?.[m]) {
          if (!(src[m] instanceof Function)) {
            if (args)
              src[m] = args;
            return src[m];
          } else
            return src[m](args);
        } else
          return this.handleServiceMessage({ route, args, method });
      };
      this.transmit = (...args) => {
        if (typeof args[0] === "object") {
          if (args[0].method) {
            return this.handleMethod(args[0].route, args[0].method, args[0].args);
          } else if (args[0].route) {
            return this.handleServiceMessage(args[0]);
          } else if (args[0].node) {
            return this.handleGraphNodeCall(args[0].node, args[0].args);
          } else if (this.__node.keepState) {
            if (args[0].route)
              this.setState({ [args[0].route]: args[0].args });
            if (args[0].node)
              this.setState({ [args[0].node]: args[0].args });
          }
          return args;
        } else
          return args;
      };
      this.receive = (...args) => {
        if (args[0]) {
          if (typeof args[0] === "string") {
            let substr = args[0].substring(0, 8);
            if (substr.includes("{") || substr.includes("[")) {
              if (substr.includes("\\"))
                args[0] = args[0].replace(/\\/g, "");
              if (args[0][0] === '"') {
                args[0] = args[0].substring(1, args[0].length - 1);
              }
              ;
              args[0] = JSON.parse(args[0]);
            }
          }
        }
        if (typeof args[0] === "object") {
          if (args[0].method) {
            return this.handleMethod(args[0].route, args[0].method, args[0].args);
          } else if (args[0].route) {
            return this.handleServiceMessage(args[0]);
          } else if (args[0].node) {
            return this.handleGraphNodeCall(args[0].node, args[0].args);
          } else if (this.__node.keepState) {
            if (args[0].route)
              this.setState({ [args[0].route]: args[0].args });
            if (args[0].node)
              this.setState({ [args[0].node]: args[0].args });
          }
          return args;
        } else
          return args;
      };
      this.pipe = (source, destination, endpoint, method, callback) => {
        if (source instanceof GraphNode) {
          if (callback)
            return this.subscribe(source, (res) => {
              let mod = callback(res);
              if (mod !== void 0)
                this.transmit({ route: destination, args: mod, method });
              else
                this.transmit({ route: destination, args: res, method }, endpoint);
            });
          else
            return this.subscribe(source, (res) => {
              this.transmit({ route: destination, args: res, method }, endpoint);
            });
        } else if (typeof source === "string")
          return this.subscribe(source, (res) => {
            this.transmit({ route: destination, args: res, method }, endpoint);
          });
      };
      this.pipeOnce = (source, destination, endpoint, method, callback) => {
        if (source instanceof GraphNode) {
          if (callback)
            return source.__node.state.subscribeTriggerOnce(source.__node.unique, (res) => {
              let mod = callback(res);
              if (mod !== void 0)
                this.transmit({ route: destination, args: mod, method });
              else
                this.transmit({ route: destination, args: res, method }, endpoint);
            });
          else
            return this.__node.state.subscribeTriggerOnce(source.__node.unique, (res) => {
              this.transmit({ route: destination, args: res, method }, endpoint);
            });
        } else if (typeof source === "string")
          return this.__node.state.subscribeTriggerOnce(this.__node.nodes.get(source).__node.unique, (res) => {
            this.transmit({ route: destination, args: res, method }, endpoint);
          });
      };
      this.terminate = (...args) => {
      };
      this.isTypedArray = isTypedArray;
      this.recursivelyAssign = recursivelyAssign2;
      this.spliceTypedArray = spliceTypedArray;
      this.ping = () => {
        console.log("pinged!");
        return "pong";
      };
      this.echo = (...args) => {
        this.transmit(...args);
        return args;
      };
      if (options2?.services)
        this.addServices(options2.services);
      this.setTree(this);
    }
    handleServiceMessage(message) {
      let call;
      if (typeof message === "object") {
        if (message.route)
          call = message.route;
        else if (message.node)
          call = message.node;
      }
      if (call) {
        if (Array.isArray(message.args))
          return this.run(call, ...message.args);
        else
          return this.run(call, message.args);
      } else
        return message;
    }
    handleGraphNodeCall(route, args) {
      if (!route)
        return args;
      if (args?.args) {
        this.handleServiceMessage(args);
      } else if (Array.isArray(args))
        return this.run(route, ...args);
      else
        return this.run(route, args);
    }
  };
  function isTypedArray(x2) {
    return ArrayBuffer.isView(x2) && Object.prototype.toString.call(x2) !== "[object DataView]";
  }
  var recursivelyAssign2 = (target, obj) => {
    for (const key in obj) {
      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        if (typeof target[key] === "object" && !Array.isArray(target[key]))
          recursivelyAssign2(target[key], obj[key]);
        else
          target[key] = recursivelyAssign2({}, obj[key]);
      } else
        target[key] = obj[key];
    }
    return target;
  };
  function spliceTypedArray(arr, start, end) {
    let s = arr.subarray(0, start);
    let e;
    if (end) {
      e = arr.subarray(end + 1);
    }
    let ta;
    if (s.length > 0 || e?.length > 0)
      ta = new arr.constructor(s.length + e.length);
    if (ta) {
      if (s.length > 0)
        ta.set(s);
      if (e && e.length > 0)
        ta.set(e, s.length);
    }
    return ta;
  }
  function parseFunctionFromText(method = "") {
    let getFunctionBody = (methodString) => {
      return methodString.replace(/^\W*(function[^{]+\{([\s\S]*)\}|[^=]+=>[^{]*\{([\s\S]*)\}|[^=]+=>(.+))/i, "$2$3$4");
    };
    let getFunctionHead = (methodString) => {
      let startindex = methodString.indexOf("=>") + 1;
      if (startindex <= 0) {
        startindex = methodString.indexOf("){");
      }
      if (startindex <= 0) {
        startindex = methodString.indexOf(") {");
      }
      return methodString.slice(0, methodString.indexOf("{", startindex) + 1);
    };
    let newFuncHead = getFunctionHead(method);
    let newFuncBody = getFunctionBody(method);
    let newFunc;
    if (newFuncHead.includes("function")) {
      let varName = newFuncHead.split("(")[1].split(")")[0];
      newFunc = new Function(varName, newFuncBody);
    } else {
      if (newFuncHead.substring(0, 6) === newFuncBody.substring(0, 6)) {
        let varName = newFuncHead.split("(")[1].split(")")[0];
        newFunc = new Function(varName, newFuncBody.substring(newFuncBody.indexOf("{") + 1, newFuncBody.length - 1));
      } else {
        try {
          newFunc = (0, eval)(newFuncHead + newFuncBody + "}");
        } catch {
        }
      }
    }
    return newFunc;
  }
  var stringifyWithCircularRefs = function() {
    const refs = /* @__PURE__ */ new Map();
    const parents = [];
    const path = ["this"];
    function clear2() {
      refs.clear();
      parents.length = 0;
      path.length = 1;
    }
    function updateParents(key, value) {
      var idx = parents.length - 1;
      var prev = parents[idx];
      if (typeof prev === "object") {
        if (prev[key] === value || idx === 0) {
          path.push(key);
          parents.push(value.pushed);
        } else {
          while (idx-- >= 0) {
            prev = parents[idx];
            if (typeof prev === "object") {
              if (prev[key] === value) {
                idx += 2;
                parents.length = idx;
                path.length = idx;
                --idx;
                parents[idx] = value;
                path[idx] = key;
                break;
              }
            }
            idx--;
          }
        }
      }
    }
    function checkCircular(key, value) {
      if (value != null) {
        if (typeof value === "object") {
          if (key) {
            updateParents(key, value);
          }
          let other = refs.get(value);
          if (other) {
            return "[Circular Reference]" + other;
          } else {
            refs.set(value, path.join("."));
          }
        }
      }
      return value;
    }
    return function stringifyWithCircularRefs2(obj, space) {
      try {
        parents.push(obj);
        return JSON.stringify(obj, checkCircular, space);
      } finally {
        clear2();
      }
    };
  }();
  if (JSON.stringifyWithCircularRefs === void 0) {
    JSON.stringifyWithCircularRefs = stringifyWithCircularRefs;
  }
  var stringifyFast = function() {
    const refs = /* @__PURE__ */ new Map();
    const parents = [];
    const path = ["this"];
    function clear2() {
      refs.clear();
      parents.length = 0;
      path.length = 1;
    }
    function updateParents(key, value) {
      var idx = parents.length - 1;
      if (parents[idx]) {
        var prev = parents[idx];
        if (typeof prev === "object") {
          if (prev[key] === value || idx === 0) {
            path.push(key);
            parents.push(value.pushed);
          } else {
            while (idx-- >= 0) {
              prev = parents[idx];
              if (typeof prev === "object") {
                if (prev[key] === value) {
                  idx += 2;
                  parents.length = idx;
                  path.length = idx;
                  --idx;
                  parents[idx] = value;
                  path[idx] = key;
                  break;
                }
              }
              idx++;
            }
          }
        }
      }
    }
    function checkValues(key, value) {
      let val;
      if (value != null) {
        if (typeof value === "object") {
          let c = value.constructor.name;
          if (key && c === "Object") {
            updateParents(key, value);
          }
          let other = refs.get(value);
          if (other) {
            return "[Circular Reference]" + other;
          } else {
            refs.set(value, path.join("."));
          }
          if (c === "Array") {
            if (value.length > 20) {
              val = value.slice(value.length - 20);
            } else
              val = value;
          } else if (c.includes("Set")) {
            val = Array.from(value);
          } else if (c !== "Object" && c !== "Number" && c !== "String" && c !== "Boolean") {
            val = "instanceof_" + c;
          } else if (c === "Object") {
            let obj = {};
            for (const prop in value) {
              if (value[prop] == null) {
                obj[prop] = value[prop];
              } else if (Array.isArray(value[prop])) {
                if (value[prop].length > 20)
                  obj[prop] = value[prop].slice(value[prop].length - 20);
                else
                  obj[prop] = value[prop];
              } else if (value[prop].constructor.name === "Object") {
                obj[prop] = {};
                for (const p in value[prop]) {
                  if (Array.isArray(value[prop][p])) {
                    if (value[prop][p].length > 20)
                      obj[prop][p] = value[prop][p].slice(value[prop][p].length - 20);
                    else
                      obj[prop][p] = value[prop][p];
                  } else {
                    if (value[prop][p] != null) {
                      let con = value[prop][p].constructor.name;
                      if (con.includes("Set")) {
                        obj[prop][p] = Array.from(value[prop][p]);
                      } else if (con !== "Number" && con !== "String" && con !== "Boolean") {
                        obj[prop][p] = "instanceof_" + con;
                      } else {
                        obj[prop][p] = value[prop][p];
                      }
                    } else {
                      obj[prop][p] = value[prop][p];
                    }
                  }
                }
              } else {
                let con = value[prop].constructor.name;
                if (con.includes("Set")) {
                  obj[prop] = Array.from(value[prop]);
                } else if (con !== "Number" && con !== "String" && con !== "Boolean") {
                  obj[prop] = "instanceof_" + con;
                } else {
                  obj[prop] = value[prop];
                }
              }
            }
            val = obj;
          } else {
            val = value;
          }
        } else {
          val = value;
        }
      }
      return val;
    }
    return function stringifyFast2(obj, space) {
      parents.push(obj);
      let res = JSON.stringify(obj, checkValues, space);
      clear2();
      return res;
    };
  }();
  if (JSON.stringifyFast === void 0) {
    JSON.stringifyFast = stringifyFast;
  }
  var unsafeRoutes = { setRoute: function(fn, fnName) {
    if (typeof fn === "string")
      fn = parseFunctionFromText(fn);
    if (typeof fn === "function") {
      if (!fnName)
        fnName = fn.name;
      if (this.__node.graph.get(fnName)) {
        this.__node.graph.get(fnName).__setOperator(fn);
      } else {
        let node = this.__node.graph.add({ __node: { tag: fnName }, __operator: fn });
      }
      return true;
    }
    return false;
  }, setNode: function(fn, fnName) {
    if (typeof fn === "string")
      fn = parseFunctionFromText(fn);
    if (typeof fn === "function") {
      if (!fnName)
        fnName = fn.name;
      if (this.__node.graph.get(fnName)) {
        this.__node.graph.get(fnName).__setOperator(fn);
      } else
        this.__node.graph.add({ __node: { tag: fnName }, __operator: fn });
      return true;
    }
    return false;
  }, setMethod: function(route, fn, fnName) {
    if (typeof fn === "string")
      fn = parseFunctionFromText(fn);
    if (typeof fn === "function") {
      if (!fnName)
        fnName = fn.name;
      if (this.__node.graph.get(route)) {
        this.__node.graph.get(route)[fnName] = fn;
      } else
        this.__node.graph.add({ __node: { tag: fnName, [fnName]: fn } });
      return true;
    }
    return false;
  }, assignRoute: function(route, source) {
    if (this.__node.graph.get(route) && typeof source === "object") {
      Object.assign(this.__node.graph.get(route), source);
    }
  }, transferClass: (classObj, className) => {
    if (typeof classObj === "object") {
      let str2 = classObj.toString();
      let message = { route: "receiveClass", args: [str2, className] };
      return message;
    }
    return false;
  }, receiveClass: function(stringified, className) {
    if (typeof stringified === "string") {
      if (stringified.indexOf("class") === 0) {
        let cls = (0, eval)("(" + stringified + ")");
        let name = className;
        if (!name)
          name = cls.name;
        this.__node.graph[name] = cls;
        return true;
      }
    }
    return false;
  }, setGlobal: (key, value) => {
    globalThis[key] = value;
    return true;
  }, assignGlobalObject: (target, source) => {
    if (!globalThis[target])
      return false;
    if (typeof source === "object")
      Object.assign(globalThis[target], source);
    return true;
  }, setValue: function(key, value) {
    this.__node.graph[key] = value;
    return true;
  }, assignObject: function(target, source) {
    if (!this.__node.graph[target])
      return false;
    if (typeof source === "object")
      Object.assign(this.__node.graph[target], source);
    return true;
  }, setGlobalFunction: (fn, fnName) => {
    if (typeof fn === "string")
      fn = parseFunctionFromText(fn);
    if (typeof fn === "function") {
      if (!fnName)
        fnName = fn.name;
      globalThis[fnName] = fn;
      return true;
    }
    return false;
  }, assignFunctionToGlobalObject: function(globalObjectName, fn, fnName) {
    if (!globalThis[globalObjectName])
      return false;
    if (typeof fn === "string")
      fn = parseFunctionFromText(fn);
    if (typeof fn === "function") {
      if (!fnName)
        fnName = fn.name;
      this.__node.graph[globalObjectName][fnName] = fn;
      return true;
    }
    return false;
  }, setFunction: function(fn, fnName) {
    if (typeof fn === "string")
      fn = parseFunctionFromText(fn);
    if (typeof fn === "function") {
      if (!fnName)
        fnName = fn.name;
      this.__node.graph[fnName] = fn;
      return true;
    }
    return false;
  }, assignFunctionToObject: function(objectName, fn, fnName) {
    if (!this.__node.graph[objectName])
      return false;
    if (typeof fn === "string")
      fn = parseFunctionFromText(fn);
    if (typeof fn === "function") {
      if (!fnName)
        fnName = fn.name;
      this.__node.graph[objectName][fnName] = fn;
      return true;
    }
    return false;
  } };
  var import_sjcl = __toESM2(require_sjcl());
  var _HTTPfrontend = class extends Service {
    constructor(options2, path, fetched) {
      super(options2);
      this.name = "http";
      this.fetchProxied = false;
      this.listening = {};
      this.GET = (url22 = "http://localhost:8080/ping", type = "", mimeType) => {
        if (type === "json")
          mimeType = "application/json";
        return new Promise((resolve, reject) => {
          let xhr = _HTTPfrontend.request({ method: "GET", url: url22, responseType: type, mimeType, onload: (ev) => {
            let data;
            if (xhr.responseType === "" || xhr.responseType === "text")
              data = xhr.responseText;
            else
              data = xhr.response;
            if (url22 instanceof URL)
              url22 = url22.toString();
            this.setState({ [url22]: data });
            resolve(data);
          }, onabort: (er) => {
            reject(er);
          } });
        }).catch(console.error);
      };
      this.POST = (message, url22 = "http://localhost:8080/echo", type = "", mimeType) => {
        if (typeof message === "object" && (type === "json" || type === "text" || !type)) {
          message = JSON.stringify(message);
        }
        if (type === "json")
          mimeType = "application/json";
        return new Promise((resolve, reject) => {
          let xhr = _HTTPfrontend.request({ method: "POST", url: url22, data: message, responseType: type, mimeType, onload: (ev) => {
            let data;
            if (xhr.responseType === "" || xhr.responseType === "text")
              data = xhr.responseText;
            else
              data = xhr.response;
            if (url22 instanceof URL)
              url22 = url22.toString();
            this.setState({ [url22]: data });
            resolve(data);
          }, onabort: (er) => {
            reject(er);
          } });
        }).catch(console.error);
      };
      this.transmit = (message, url22) => {
        let obj = message;
        if (typeof obj === "object") {
          message = JSON.stringify(obj);
        }
        if (obj?.method?.toLowerCase() == "get" || message?.toLowerCase() === "get")
          return this.GET(url22);
        return this.POST(message, url22);
      };
      this.transponder = (url22, message, type = "", mimeType) => {
        if (typeof message === "object")
          message = JSON.stringify(message);
        let method = "GET";
        if (message) {
          method = "POST";
        }
        if (type === "json")
          mimeType = "application/json";
        else
          return new Promise((resolve, reject) => {
            let xhr = _HTTPfrontend.request({ method, url: url22, data: message, responseType: type, onload: (ev) => {
              let body = xhr.response;
              if (typeof body === "string") {
                let substr = body.substring(0, 8);
                if (substr.includes("{") || substr.includes("[")) {
                  if (substr.includes("\\"))
                    body = body.replace(/\\/g, "");
                  if (body[0] === '"') {
                    body = body.substring(1, body.length - 1);
                  }
                  ;
                  body = JSON.parse(body);
                }
              }
              if (typeof body?.method === "string") {
                return resolve(this.handleMethod(body.route, body.method, body.args));
              } else if (typeof body?.route === "string") {
                return resolve(this.handleServiceMessage(body));
              } else if (typeof body?.node === "string" || body.node instanceof GraphNode) {
                return resolve(this.handleGraphNodeCall(body.node, body.args));
              } else
                return resolve(body);
            }, onabort: (er) => {
              reject(er);
            } });
          }).catch(console.error);
      };
      this.listen = (path2 = "0", fetched2 = async (clone, args, response) => {
        const result = await clone.text();
        const returned = this.receive(result);
        this.setState({ [response.url]: returned });
      }) => {
        this.listening[path2] = {};
        let listenerId = `${path2}${Math.floor(Math.random() * 1e15)}`;
        this.listening[path2][listenerId] = fetched2;
        if (!this.fetchProxied) {
          globalThis.fetch = new Proxy(globalThis.fetch, { apply(fetch, that, args) {
            const result = fetch.apply(that, args);
            result.then((response) => {
              if (!response.ok)
                return;
              if (this.listening["0"]) {
                for (const key in this.listeners) {
                  const clone = response.clone();
                  this.listening["0"][key](clone, args, response);
                }
              } else {
                for (const key in this.listening) {
                  if (response.url.includes(key)) {
                    for (const key2 in this.listening[path2]) {
                      const clone = response.clone();
                      this.listening[path2][key2](clone, args, response);
                    }
                    break;
                  }
                }
              }
            }).catch((er) => {
              console.error(er);
            });
            return result;
          } });
          this.fetchProxied = true;
        }
        return listenerId;
      };
      this.stopListening = (path2, listener) => {
        if (!path2 && path2 !== 0) {
          for (const key in this.listening)
            delete this.listening[key];
        } else {
          if (!listener)
            delete this.listening[path2];
          else
            delete this.listening[listener];
        }
      };
      this.setTree(this);
      this.listen(path, fetched);
    }
  };
  var HTTPfrontend = _HTTPfrontend;
  HTTPfrontend.request = (options2) => {
    const xhr = new XMLHttpRequest();
    if (options2.responseType)
      xhr.responseType = options2.responseType;
    else
      options2.responseType = "json";
    if (options2.mimeType) {
      xhr.overrideMimeType(options2.mimeType);
    }
    if (options2.onload)
      xhr.addEventListener("load", options2.onload, false);
    if (options2.onprogress)
      xhr.addEventListener("progress", options2.onprogress, false);
    if (options2.onabort)
      xhr.addEventListener("abort", options2.onabort, false);
    if (options2.onloadend)
      xhr.addEventListener("loadend", options2.onloadend, false);
    if (options2.onerror)
      xhr.addEventListener("error", options2.onerror, false);
    xhr.open(options2.method, options2.url, true, options2.user, options2.pass);
    if (!options2.onerror)
      xhr.onerror = function() {
        xhr.abort();
      };
    xhr.send(options2.data);
    return xhr;
  };
  var import_web_worker = __toESM2(require_browser());
  var WorkerService = class extends Service {
    constructor(options2) {
      super();
      this.name = "worker";
      this.workers = {};
      this.threadRot = 0;
      this.loadWorkerRoute = (rt, routeKey) => {
        if (rt.workerUrl)
          rt.url = rt.workerUrl;
        if (rt.workerId)
          rt.__node.tag = rt.workerId;
        if (!rt.__node.tag)
          rt.__node.tag = routeKey;
        rt._id = rt.__node.tag;
        let worker;
        if (this.workers[rt._id])
          worker = this.workers[rt._id];
        else if (rt.worker)
          worker = rt.worker;
        if (!worker) {
          worker = this.addWorker(rt);
          let ondelete = (rt2) => {
            rt2.worker?.terminate();
          };
          rt.__addOndisconnected(ondelete);
        }
        rt.worker = worker;
        if (rt.transferFunctions) {
          for (const prop in rt.transferFunctions) {
            this.transferFunction(worker, rt.transferFunctions[prop], prop);
          }
        }
        if (rt.transferClasses) {
          for (const prop in rt.transferClasses) {
            this.transferClass(worker, rt.transferClasses[prop], prop);
          }
        }
        if (worker) {
          if (!rt.__operator) {
            rt.__operator = (...args) => {
              if (rt.callback) {
                if (!this.__node.nodes.get(rt.__node.tag)?.__children)
                  worker.post(rt.callback, args);
                else
                  return worker.run(rt.callback, args);
              } else {
                if (!this.__node.nodes.get(rt.__node.tag)?.__children)
                  worker.send(args);
                else
                  return worker.request(args);
              }
            };
          }
          if (rt.init) {
            worker.run(rt.init, rt.initArgs, rt.initTransfer);
          }
          return worker;
        }
      };
      this.workerloader = { "workers": (node, parent2, graph, tree) => {
        let rt = node;
        if (!node.parentRoute && (parent2?.callback && parent2?.worker))
          node.parentRoute = parent2?.callback;
        if (rt?.worker || rt?.workerId || rt?.workerUrl) {
          let worker = this.loadWorkerRoute(rt, rt.__node.tag);
          if (worker) {
            if (!rt.parentRoute && rt.__parent?.callback)
              rt.parentRoute = rt.__parent.callback;
            if (rt.__parent && !rt.portId) {
              if (typeof rt.__parent === "string") {
                if (rt.__node.tag !== rt.__parent && worker._id !== rt.__parent)
                  rt.portId = this.establishMessageChannel(worker, rt.__parent);
              } else if (rt.__node.tag !== rt.__parent?.__node?.tag && worker._id !== rt.__parent.tag) {
                rt.portId = this.establishMessageChannel(worker, rt.__parent.worker);
              }
            }
            ;
            if (rt.parentRoute) {
              if (!rt.stopped) {
                if (typeof rt.__parent === "string" && rt.__parent === worker._id) {
                  worker.run("subscribe", [rt.parentRoute, void 0, rt.callback]);
                } else if (rt.__node.tag === rt.__parent?.__node?.tag || worker._id === rt.__parent?.__node?.tag) {
                  worker.run("subscribe", [rt.parentRoute, void 0, rt.callback]);
                } else
                  worker.run("subscribeToWorker", [rt.parentRoute, rt.portId, rt.callback, rt.blocking]).then((sub) => {
                    worker.workerSubs[rt.parentRoute + rt.portId].sub = sub;
                  });
              }
              if (!(typeof rt.__parent === "string" && rt.__parent === worker._id) && !(rt.__node.tag === rt.__parent?.__node?.tag || worker._id === rt.__parent?.__node?.tag))
                worker.workerSubs[rt.parentRoute + rt.portId] = { sub: null, route: rt.parentRoute, portId: rt.portId, callback: rt.callback, blocking: rt.blocking };
            } else if (rt.__parent) {
              if (typeof rt.__parent === "string") {
                if (!rt.stopped) {
                  if (rt.__parent === worker._id) {
                    worker.run("subscribe", [rt.__parent, void 0, rt.callback]);
                  } else
                    worker.run("subscribeToWorker", [rt.__parent, rt.portId, rt.callback, rt.blocking]).then((sub) => {
                      worker.workerSubs[rt.__parent + rt.portId].sub = sub;
                    });
                }
                if (!(typeof rt.__parent === "string" && rt.__parent === worker._id))
                  worker.workerSubs[rt + rt.portId] = { sub: null, route: worker._id, portId: rt.portId, callback: rt.callback, blocking: rt.blocking };
              } else if (rt.__parent?.__node?.tag && rt.__parent?.worker) {
                if (!rt.stopped) {
                  if (rt.__node.tag === rt.__parent.__node.tag || worker._id === rt.__parent.__node.tag) {
                    worker.run("subscribe", [rt.__parent.__node.tag, void 0, rt.callback]);
                  } else
                    worker.run("subscribeToWorker", [rt.__parent.__node.tag, rt.portId, rt.callback, rt.blocking]).then((sub) => {
                      worker.workerSubs[rt.__parent.__node.tag + rt.portId].sub = sub;
                    });
                }
                if (!(rt.__node.tag === rt.__parent?.__node?.tag || worker._id === rt.__parent?.__node?.tag))
                  worker.workerSubs[rt.__parent.__node.tag + rt.portId] = { sub: null, route: rt.__parent.__node.tag, portId: rt.portId, callback: rt.callback, blocking: rt.blocking };
              }
            }
          }
        } else if (rt.__parent && rt.parentRoute) {
          console.log(rt);
          if (typeof rt.__parent === "string" && tree[rt.__parent]?.worker) {
            tree[rt.__parent].worker.subscribe(rt.parentRoute, rt.__operator, rt.blocking);
          } else if (rt.__parent?.worker) {
            rt.__parent.worker.subscribe(rt.parentRoute, rt.__operator, rt.blocking);
          }
        }
        return rt;
      } };
      this.addDefaultMessageListener = () => {
        globalThis.onmessage = (ev) => {
          let result = this.receive(ev.data);
          if (this.__node.keepState)
            this.setState({ [this.name]: result });
        };
      };
      this.postMessage = (message, target, transfer) => {
        if (this.workers[target]) {
          this.workers[target].send(message, transfer);
        } else {
          globalThis.postMessage(message, target, transfer);
        }
      };
      this.addWorker = (options22) => {
        let worker;
        if (!options22._id)
          options22._id = `worker${Math.floor(Math.random() * 1e15)}`;
        if (options22.url)
          worker = new import_web_worker.default(options22.url);
        else if (options22.port) {
          worker = options22.port;
        } else if (this.workers[options22._id]) {
          if (this.workers[options22._id].port)
            worker = this.workers[options22._id].port;
          else
            worker = this.workers[options22._id].worker;
        }
        if (!worker)
          return;
        let send = (message, transfer) => {
          return this.transmit(message, worker, transfer);
        };
        let post = (route, args, transfer, method) => {
          let message = { route, args };
          if (method)
            message.method = method;
          return this.transmit(message, worker, transfer);
        };
        let run = (route, args, transfer, method) => {
          return new Promise((res, rej) => {
            let callbackId = Math.random();
            let req = { route: "runRequest", args: [{ route, args }, options22._id, callbackId] };
            if (method)
              req.args[0].method = method;
            let onmessage = (ev) => {
              if (typeof ev.data === "object") {
                if (ev.data.callbackId === callbackId) {
                  worker.removeEventListener("message", onmessage);
                  res(ev.data.args);
                }
              }
            };
            worker.addEventListener("message", onmessage);
            this.transmit(req, worker, transfer);
          });
        };
        let request = (message, transfer, method) => {
          return new Promise((res, rej) => {
            let callbackId = Math.random();
            let req = { route: "runRequest", args: [message, options22._id, callbackId] };
            if (method)
              req.method = method;
            let onmessage = (ev) => {
              if (typeof ev.data === "object") {
                if (ev.data.callbackId === callbackId) {
                  worker.removeEventListener("message", onmessage);
                  res(ev.data.args);
                }
              }
            };
            worker.addEventListener("message", onmessage);
            this.transmit(req, worker, transfer);
          });
        };
        let workerSubs = {};
        let subscribe = (route, callback, blocking) => {
          return this.subscribeToWorker(route, options22._id, callback, blocking);
        };
        let unsubscribe = (route, sub) => {
          return run("unsubscribe", [route, sub]);
        };
        let start = async (route, portId, callback, blocking) => {
          if (route)
            await run("subscribeToWorker", [route, portId, callback, blocking]).then((sub) => {
              if (sub)
                workerSubs[route + portId] = { sub, route, portId, callback, blocking };
            });
          else
            for (const key in workerSubs) {
              if (typeof workerSubs[key].sub !== "number")
                await run("subscribeToWorker", [workerSubs[key].route, workerSubs[key].portId, workerSubs[key].callback, workerSubs[key].blocking]).then((sub) => {
                  workerSubs[key].sub = sub;
                });
            }
          return true;
        };
        let stop = async (route, portId) => {
          if (route && portId && workerSubs[route + portId]) {
            await run("unsubscribe", [route, workerSubs[route + portId].sub]);
            workerSubs[route + portId].sub = false;
          } else {
            for (const key in workerSubs) {
              if (typeof workerSubs[key].sub === "number") {
                await run("unpipeWorkers", [workerSubs[key].route, workerSubs[key].portId, workerSubs[key].sub]);
              }
              workerSubs[key].sub = false;
            }
          }
          return true;
        };
        let terminate = () => {
          for (const key in workerSubs) {
            if (typeof workerSubs[key].sub === "number") {
              run("unpipeWorkers", [workerSubs[key].route, workerSubs[key].portId, workerSubs[key].sub]);
            }
            workerSubs[key].sub = false;
          }
          return this.terminate(options22._id);
        };
        if (!options22.onmessage)
          options22.onmessage = (ev) => {
            this.receive(ev.data);
            this.setState({ [options22._id]: ev.data });
          };
        if (!options22.onerror) {
          options22.onerror = (ev) => {
            console.error(ev.data);
          };
        }
        worker.onmessage = options22.onmessage;
        worker.onerror = options22.onerror;
        this.workers[options22._id] = { worker, send, post, run, request, subscribe, unsubscribe, terminate, start, stop, postMessage: worker.postMessage, workerSubs, graph: this, ...options22 };
        return this.workers[options22._id];
      };
      this.toObjectURL = (scriptTemplate) => {
        let blob = new Blob([scriptTemplate], { type: "text/javascript" });
        return URL.createObjectURL(blob);
      };
      this.transmit = (message, worker, transfer) => {
        if (!transfer) {
          transfer = this.getTransferable(message);
        }
        if (worker instanceof import_web_worker.default || worker instanceof MessagePort) {
          worker.postMessage(message, transfer);
        } else if (typeof worker === "string") {
          if (this.workers[worker]) {
            if (this.workers[worker].port)
              this.workers[worker].port.postMessage(message, transfer);
            else if (this.workers[worker].worker)
              this.workers[worker].worker.postMessage(message, transfer);
          }
        } else {
          let keys = Object.keys(this.workers);
          this.workers[keys[this.threadRot]].worker.postMessage(message, transfer);
          this.threadRot++;
          if (this.threadRot === keys.length)
            this.threadRot = 0;
        }
        return message;
      };
      this.terminate = (worker) => {
        let onclose;
        if (typeof worker === "string") {
          let obj = this.workers[worker];
          if (obj) {
            delete this.workers[worker];
            worker = obj.worker;
            if (obj.onclose)
              onclose = obj.onclose;
          }
        }
        if (worker instanceof import_web_worker.default) {
          worker.terminate();
          if (onclose)
            onclose(worker);
          return true;
        }
        if (worker instanceof MessagePort) {
          worker.close();
          if (onclose)
            onclose(worker);
          return true;
        }
        return false;
      };
      this.establishMessageChannel = (worker, worker2) => {
        let workerId;
        if (typeof worker === "string") {
          workerId = worker;
          if (this.workers[worker]) {
            if (this.workers[worker].port)
              worker = this.workers[worker].port;
            else
              worker2 = this.workers[worker].worker;
          }
        } else if (worker?.worker) {
          worker = worker.worker;
        }
        if (typeof worker2 === "string") {
          if (this.workers[worker2]) {
            if (this.workers[worker2].port)
              worker2 = this.workers[worker2].port;
            else
              worker2 = this.workers[worker2].worker;
          }
        } else if (worker2?.worker) {
          worker2 = worker2.worker;
        }
        if (worker instanceof import_web_worker.default || worker instanceof MessagePort) {
          let channel = new MessageChannel();
          let portId = `port${Math.floor(Math.random() * 1e15)}`;
          worker.postMessage({ route: "addWorker", args: { port: channel.port1, _id: portId } }, [channel.port1]);
          if (worker2 instanceof import_web_worker.default || worker2 instanceof MessagePort) {
            worker2.postMessage({ route: "addWorker", args: { port: channel.port2, _id: portId } }, [channel.port2]);
          } else if (workerId && this.workers[workerId]) {
            channel.port2.onmessage = this.workers[workerId].onmessage;
            this.workers[workerId].port = channel.port2;
          }
          return portId;
        }
        return false;
      };
      this.request = (message, workerId, transfer, method) => {
        let worker = this.workers[workerId].worker;
        return new Promise((res, rej) => {
          let callbackId = Math.random();
          let req = { route: "runRequest", args: [message, callbackId] };
          if (method)
            req.method = method;
          let onmessage = (ev) => {
            if (typeof ev.data === "object") {
              if (ev.data.callbackId === callbackId) {
                worker.removeEventListener("message", onmessage);
                res(ev.data.args);
              }
            }
          };
          worker.addEventListener("message", onmessage);
          this.transmit(req, worker, transfer);
        });
      };
      this.runRequest = (message, worker, callbackId) => {
        let res = this.receive(message);
        if (typeof worker === "string" && this.workers[worker]) {
          if (this.workers[worker].port)
            worker = this.workers[worker].port;
          else
            worker = this.workers[worker].worker;
        }
        if (res instanceof Promise) {
          res.then((r) => {
            if (worker instanceof import_web_worker.default || worker instanceof MessagePort)
              worker.postMessage({ args: r, callbackId });
            else if (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope)
              globalThis.postMessage({ args: r, callbackId });
          });
        } else {
          if (worker instanceof import_web_worker.default || worker instanceof MessagePort)
            worker.postMessage({ args: res, callbackId });
          else if (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope)
            globalThis.postMessage({ args: res, callbackId });
        }
        return res;
      };
      this.subscribeWorker = (route, worker, blocking, key, subInput) => {
        let callback;
        if (blocking) {
          let blocked = false;
          callback = (res) => {
            if (!blocked) {
              blocked = true;
              if (res instanceof Promise) {
                res.then((r) => {
                  if (worker?.run)
                    worker.run("triggerSubscription", [route, worker._id, r]).then((ret) => {
                      blocked = false;
                    });
                });
              } else {
                if (worker?.run)
                  worker.run("triggerSubscription", [route, worker._id, res]).then((ret) => {
                    blocked = false;
                  });
              }
            }
          };
        } else {
          callback = (res) => {
            if (res instanceof Promise) {
              res.then((r) => {
                if (worker?.postMessage)
                  worker.postMessage({ args: r, callbackId: route });
                else if (globalThis.postMessage)
                  globalThis.postMessage({ args: r, callbackId: route });
              });
            } else {
              if (worker?.postMessage)
                worker.postMessage({ args: res, callbackId: route });
              else if (globalThis.postMessage)
                globalThis.postMessage({ args: res, callbackId: route });
            }
          };
        }
        if (!blocking && worker?.port) {
          worker = worker.port;
        } else if (!blocking && worker?.worker) {
          worker = worker.worker;
        } else if (typeof worker === "string" && this.workers[worker]) {
          if (blocking)
            worker = this.workers[worker];
          else if (this.workers[worker].port)
            worker = this.workers[worker].port;
          else
            worker = this.workers[worker].worker;
        }
        return this.subscribe(route, callback, key, subInput);
      };
      this.subscribeToWorker = (route, workerId, callback, blocking, key, subInput) => {
        if (typeof workerId === "string" && this.workers[workerId]) {
          this.__node.state.subscribeTrigger(workerId, (res) => {
            if (res?.callbackId === route) {
              if (!callback)
                this.setState({ [workerId]: res.args });
              else if (typeof callback === "string") {
                this.run(callback, res.args);
              } else
                callback(res.args);
            }
          });
          return this.workers[workerId].run("subscribeWorker", [route, workerId, blocking, key, subInput]);
        }
      };
      this.triggerSubscription = async (route, workerId, result) => {
        if (this.__node.state.triggers[workerId])
          for (let i = 0; i < this.__node.state.triggers[workerId].length; i++) {
            await this.__node.state.triggers[workerId][i].onchange({ args: result, callbackId: route });
          }
        return true;
      };
      this.pipeWorkers = (sourceWorker, listenerWorker, sourceRoute, listenerRoute, portId, blocking) => {
        if (typeof sourceWorker === "string")
          sourceWorker = this.workers[sourceWorker];
        if (typeof listenerWorker === "string")
          listenerWorker = this.workers[listenerWorker];
        if (!portId) {
          portId = this.establishMessageChannel(sourceWorker.worker, listenerWorker.worker);
        }
        return listenerWorker.run("subscribeToWorker", [sourceRoute, portId, listenerRoute, blocking]);
      };
      this.unpipeWorkers = (sourceRoute, sourceWorker, sub) => {
        if (typeof sourceWorker === "string")
          sourceWorker = this.workers[sourceWorker];
        if (sourceWorker)
          return sourceWorker.run("unsubscribe", [sourceRoute, sub]);
      };
      this.connections = { workers: this.workers };
      if (options2?.services)
        this.addServices(options2.services);
      this.setTree(this);
      this.setLoaders(this.workerloader);
      if (options2)
        this.init(options2);
      if (typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope) {
        this.addDefaultMessageListener();
      }
    }
    getTransferable(message) {
      let transfer;
      if (typeof message === "object") {
        if (message.args) {
          if (message.args?.constructor?.name === "Object") {
            for (const key in message.args) {
              if (ArrayBuffer.isView(message.args[key])) {
                if (!transfer)
                  transfer = [message.args[key].buffer];
                else
                  transfer.push(message.args[key].buffer);
              } else if (message.args[key]?.constructor?.name === "ArrayBuffer") {
                if (!transfer)
                  transfer = [message.args[key]];
                else
                  transfer.push(message.args[key]);
              }
            }
          } else if (Array.isArray(message.args) && message.args.length < 11) {
            message.args.forEach((arg) => {
              if (ArrayBuffer.isView(arg)) {
                transfer = [arg.buffer];
              } else if (arg?.constructor?.name === "ArrayBuffer")
                transfer = [arg];
            });
          } else if (ArrayBuffer.isView(message.args)) {
            transfer = [message.args.buffer];
          } else if (message.args?.constructor?.name === "ArrayBuffer") {
            transfer = [message];
          }
        } else if (message?.constructor?.name === "Object") {
          for (const key in message) {
            if (ArrayBuffer.isView(message[key])) {
              if (!transfer)
                transfer = [message[key].buffer];
              else
                transfer.push(message[key].buffer);
            } else if (message[key]?.constructor?.name === "ArrayBuffer") {
              if (!transfer)
                transfer = [message[key]];
              else
                transfer.push(message[key]);
            }
          }
        } else if (Array.isArray(message) && message.length < 11) {
          message.forEach((arg) => {
            if (ArrayBuffer.isView(arg)) {
              transfer = [arg.buffer];
            } else if (arg.constructor?.name === "ArrayBuffer")
              transfer = [arg];
          });
        } else if (ArrayBuffer.isView(message)) {
          transfer = [message.buffer];
        } else if (message.constructor?.name === "ArrayBuffer") {
          transfer = [message];
        }
      }
      return transfer;
    }
    transferFunction(worker, fn, fnName) {
      if (!fnName)
        fnName = fn.name;
      return worker.request({ route: "setRoute", args: [fn.toString(), fnName] });
    }
    transferClass(worker, cls, className) {
      if (!className)
        className = cls.name;
      return worker.request({ route: "receiveClass", args: [cls.toString(), className] });
    }
  };
  var mouseEventHandler = makeSendPropertiesHandler(["ctrlKey", "metaKey", "shiftKey", "button", "pointerType", "clientX", "clientY", "pageX", "pageY"]);
  var wheelEventHandlerImpl = makeSendPropertiesHandler(["deltaX", "deltaY"]);
  var keydownEventHandler = makeSendPropertiesHandler(["ctrlKey", "metaKey", "shiftKey", "keyCode"]);
  function wheelEventHandler(event, sendFn) {
    event.preventDefault();
    wheelEventHandlerImpl(event, sendFn);
  }
  function preventDefaultHandler(event) {
    event.preventDefault();
  }
  function copyProperties(src, properties, dst) {
    for (const name of properties) {
      dst[name] = src[name];
    }
  }
  function makeSendPropertiesHandler(properties) {
    return function sendProperties(event, sendFn) {
      const data = { type: event.type };
      copyProperties(event, properties, data);
      sendFn(data);
    };
  }
  function touchEventHandler(event, sendFn) {
    const touches = [];
    const data = { type: event.type, touches };
    for (let i = 0; i < event.touches.length; ++i) {
      const touch = event.touches[i];
      touches.push({ pageX: touch.pageX, pageY: touch.pageY });
    }
    sendFn(data);
  }
  var orbitKeys = { "37": true, "38": true, "39": true, "40": true };
  function filteredKeydownEventHandler(event, sendFn) {
    const { keyCode } = event;
    if (orbitKeys[keyCode]) {
      event.preventDefault();
      keydownEventHandler(event, sendFn);
    }
  }
  var eventHandlers = { contextmenu: preventDefaultHandler, mousedown: mouseEventHandler, mousemove: mouseEventHandler, mouseup: mouseEventHandler, pointerdown: mouseEventHandler, pointermove: mouseEventHandler, pointerup: mouseEventHandler, touchstart: touchEventHandler, touchmove: touchEventHandler, touchend: touchEventHandler, wheel: wheelEventHandler, keydown: filteredKeydownEventHandler };
  function initProxyElement(element, worker, id) {
    if (!id)
      id = "proxy" + Math.floor(Math.random() * 1e15);
    const sendEvent = (data) => {
      if (!worker) {
        handleProxyEvent(data, id);
      } else
        worker.postMessage({ route: "handleProxyEvent", args: [data, id] });
    };
    let entries = Object.entries(eventHandlers);
    for (const [eventName, handler] of entries) {
      element.addEventListener(eventName, function(event) {
        handler(event, sendEvent);
      });
    }
    const sendSize = () => {
      const rect = element.getBoundingClientRect();
      sendEvent({ type: "resize", left: rect.left, top: rect.top, width: element.clientWidth, height: element.clientHeight });
    };
    sendSize();
    globalThis.addEventListener("resize", sendSize);
    return id;
  }
  var EventDispatcher = class {
    addEventListener(type, listener) {
      if (this.__listeners === void 0)
        this.__listeners = {};
      const listeners = this.__listeners;
      if (listeners[type] === void 0) {
        listeners[type] = [];
      }
      if (listeners[type].indexOf(listener) === -1) {
        listeners[type].push(listener);
      }
    }
    hasEventListener(type, listener) {
      if (this.__listeners === void 0)
        return false;
      const listeners = this.__listeners;
      return listeners[type] !== void 0 && listeners[type].indexOf(listener) !== -1;
    }
    removeEventListener(type, listener) {
      if (this.__listeners === void 0)
        return;
      const listeners = this.__listeners;
      const listenerArray = listeners[type];
      if (listenerArray !== void 0) {
        const index = listenerArray.indexOf(listener);
        if (index !== -1) {
          listenerArray.splice(index, 1);
        }
      }
    }
    dispatchEvent(event, target) {
      if (this.__listeners === void 0)
        return;
      const listeners = this.__listeners;
      const listenerArray = listeners[event.type];
      if (listenerArray !== void 0) {
        if (!target)
          event.target = this;
        else
          event.target = target;
        const array = listenerArray.slice(0);
        for (let i = 0, l = array.length; i < l; i++) {
          array[i].call(this, event);
        }
        event.target = null;
      }
    }
  };
  function noop() {
  }
  var ElementProxyReceiver = class extends EventDispatcher {
    constructor() {
      super();
      this.__listeners = {};
      this.style = {};
      this.setPointerCapture = () => {
      };
      this.releasePointerCapture = () => {
      };
      this.getBoundingClientRect = () => {
        return { left: this.left, top: this.top, width: this.width, height: this.height, right: this.left + this.width, bottom: this.top + this.height };
      };
      this.handleEvent = (data) => {
        if (data.type === "resize") {
          this.left = data.left;
          this.top = data.top;
          this.width = data.width;
          this.height = data.height;
          if (typeof this.proxied === "object") {
            this.proxied.style.width = this.width + "px";
            this.proxied.style.height = this.height + "px";
            this.proxied.clientWidth = this.width;
            this.proxied.clientHeight = this.height;
          }
        }
        data.preventDefault = noop;
        data.stopPropagation = noop;
        this.dispatchEvent(data, this.proxied);
      };
      this.style = {};
    }
    get clientWidth() {
      return this.width;
    }
    get clientHeight() {
      return this.height;
    }
    focus() {
    }
  };
  var ProxyManager = class {
    constructor() {
      this.targets = {};
      this.makeProxy = (id, addTo = void 0) => {
        if (!id)
          id = `proxyReceiver${Math.floor(Math.random() * 1e15)}`;
        let proxy;
        if (this.targets[id])
          proxy = this.targets[id];
        else {
          proxy = new ElementProxyReceiver();
          this.targets[id] = proxy;
        }
        if (typeof addTo === "object") {
          addTo.proxy = proxy;
          proxy.proxied = addTo;
          if (typeof WorkerGlobalScope !== "undefined")
            addTo.style = proxy.style;
          if (proxy.width) {
            addTo.style.width = proxy.width + "px";
            addTo.clientWidth = proxy.width;
          }
          if (proxy.height) {
            addTo.style.height = proxy.height + "px";
            addTo.clientHeight = proxy.height;
          }
          addTo.setPointerCapture = proxy.setPointerCapture.bind(proxy);
          addTo.releasePointerCapture = proxy.releasePointerCapture.bind(proxy);
          addTo.getBoundingClientRect = proxy.getBoundingClientRect.bind(proxy);
          addTo.addEventListener = proxy.addEventListener.bind(proxy);
          addTo.removeEventListener = proxy.removeEventListener.bind(proxy);
          addTo.handleEvent = proxy.handleEvent.bind(proxy);
          addTo.dispatchEvent = proxy.dispatchEvent.bind(proxy);
          addTo.focus = proxy.focus.bind(proxy);
        }
      };
      this.getProxy = (id) => {
        return this.targets[id];
      };
      this.handleEvent = (data, id) => {
        if (!this.targets[id])
          this.makeProxy(id);
        if (this.targets[id]) {
          this.targets[id].handleEvent(data);
          return true;
        }
        return void 0;
      };
      if (!globalThis.document)
        globalThis.document = {};
    }
  };
  function makeProxy(id, elm) {
    if (this?.__node?.graph) {
      if (!this.__node.graph.ProxyManager)
        this.__node.graph.ProxyManager = new ProxyManager();
      this.__node.graph.ProxyManager.makeProxy(id, elm);
    } else {
      if (!globalThis.ProxyManager)
        globalThis.ProxyManager = new ProxyManager();
      globalThis.ProxyManager.makeProxy(id, elm);
    }
    return id;
  }
  function handleProxyEvent(data, id) {
    if (this?.__node?.graph) {
      if (!this.__node.graph.ProxyManager)
        this.__node.graph.ProxyManager = new ProxyManager();
      if (this.__node.graph.ProxyManager.handleEvent(data, id))
        return data;
    } else {
      if (!globalThis.ProxyManager)
        globalThis.ProxyManager = new ProxyManager();
      if (globalThis.ProxyManager.handleEvent(data, id))
        return data;
    }
  }
  var proxyElementWorkerRoutes = { initProxyElement, makeProxy, handleProxyEvent };
  function Renderer(options2) {
    if (options2.worker) {
      let worker = options2.worker;
      let route = options2.route;
      if (worker instanceof Blob || typeof worker === "string") {
        worker = new Worker(worker);
      }
      delete options2.worker;
      delete options2.route;
      return transferCanvas(worker, options2, route);
    } else {
      initProxyElement(options2.canvas, void 0, options2._id);
      return setupCanvas(options2);
    }
  }
  function transferCanvas(worker, options2, route) {
    if (!options2)
      return void 0;
    if (!options2._id)
      options2._id = `canvas${Math.floor(Math.random() * 1e15)}`;
    let offscreen = options2.canvas.transferControlToOffscreen();
    if (!options2.width)
      options2.width = options2.canvas.clientWidth;
    if (!options2.height)
      options2.height = options2.canvas.clientHeight;
    let message = { route: route ? route : "setupCanvas", args: { ...options2, canvas: offscreen } };
    if (this?.__node?.graph)
      this.__node.graph.run("initProxyElement", options2.canvas, worker, options2._id);
    else
      initProxyElement(options2.canvas, worker, options2._id);
    if (options2.draw) {
      if (typeof options2.draw === "function")
        message.args.draw = options2.draw.toString();
      else
        message.args.draw = options2.draw;
    }
    if (options2.update) {
      if (typeof options2.update === "function")
        message.args.update = options2.update.toString();
      else
        message.args.update = options2.update;
    }
    if (options2.init) {
      if (typeof options2.init === "function")
        message.args.init = options2.init.toString();
      else
        message.args.init = options2.init;
    }
    if (options2.clear) {
      if (typeof options2.clear === "function")
        message.args.clear = options2.clear.toString();
      else
        message.args.clear = options2.clear;
    }
    let transfer = [offscreen];
    if (options2.transfer) {
      transfer.push(...options2.transfer);
      delete options2.transfer;
    }
    worker.postMessage(message, transfer);
    const canvascontrols = { _id: options2._id, width: options2.width, height: options2.height, worker, draw: (props) => {
      worker.postMessage({ route: "drawFrame", args: [props, options2._id] });
    }, update: (props) => {
      worker.postMessage({ route: "updateCanvas", args: [props, options2._id] });
    }, clear: () => {
      worker.postMessage({ route: "clearCanvas", args: options2._id });
    }, init: () => {
      worker.postMessage({ route: "initCanvas", args: options2._id });
    }, stop: () => {
      worker.postMessage({ route: "stopAnim", args: options2._id });
    }, start: () => {
      worker.postMessage({ route: "startAnim", args: options2._id });
    }, set: (newDrawProps) => {
      worker.postMessage({ route: "setDraw", args: [newDrawProps, options2._id] });
    }, terminate: () => {
      worker.terminate();
    } };
    return canvascontrols;
  }
  function setDraw(settings, _id) {
    let canvasopts;
    if (this?.__node?.graph) {
      if (_id)
        canvasopts = this.__node.graph.CANVASES?.[settings._id];
      else if (settings._id)
        canvasopts = this.__node.graph.CANVASES?.[settings._id];
      else
        canvasopts = this.__node.graph.CANVASES?.[Object.keys(this.__node.graph.CANVASES)[0]];
    } else {
      if (_id)
        canvasopts = globalThis.CANVASES?.[settings._id];
      else if (settings._id)
        canvasopts = globalThis.CANVASES?.[settings._id];
      else
        canvasopts = globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];
    }
    if (canvasopts) {
      if (settings.canvas) {
        canvasopts.canvas = settings.canvas;
        if (this?.__node?.graph)
          this.__node.graph.run("makeProxy", canvasopts._id, canvasopts.canvas);
        else
          proxyElementWorkerRoutes.makeProxy(canvasopts._id, canvasopts.canvas);
      }
      if (typeof settings.context === "string")
        canvasopts.context = canvasopts.canvas.getContext(settings.context);
      else if (settings.context)
        canvasopts.context = settings.context;
      if (settings.width)
        canvasopts.canvas.width = settings.width;
      if (settings.height)
        canvasopts.canvas.height = settings.height;
      if (typeof settings.draw === "string")
        settings.draw = parseFunctionFromText3(settings.draw);
      if (typeof settings.draw === "function") {
        canvasopts.draw = settings.draw;
      }
      if (typeof settings.update === "string")
        settings.update = parseFunctionFromText3(settings.update);
      if (typeof settings.update === "function") {
        canvasopts.update = settings.update;
      }
      if (typeof settings.init === "string")
        settings.init = parseFunctionFromText3(settings.init);
      if (typeof settings.init === "function") {
        canvasopts.init = settings.init;
      }
      if (typeof settings.clear === "string")
        settings.clear = parseFunctionFromText3(settings.clear);
      if (typeof settings.clear === "function") {
        canvasopts.clear = settings.clear;
      }
      return settings._id;
    }
    return void 0;
  }
  function setupCanvas(options2) {
    if (this?.__node?.graph) {
      if (!this.__node.graph.CANVASES)
        this.__node.graph.CANVASES = {};
    } else if (!globalThis.CANVASES)
      globalThis.CANVASES = {};
    let canvasOptions = options2;
    options2._id ? canvasOptions._id = options2._id : canvasOptions._id = `canvas${Math.floor(Math.random() * 1e15)}`;
    typeof options2.context === "string" ? canvasOptions.context = options2.canvas.getContext(options2.context) : canvasOptions.context = options2.context;
    "animating" in options2 ? canvasOptions.animating = options2.animating : canvasOptions.animating = true;
    if (this?.__node?.graph?.CANVASES[canvasOptions._id]) {
      this.__node.graph.run("setDraw", canvasOptions);
    } else if (globalThis.CANVASES?.[canvasOptions._id]) {
      setDraw(canvasOptions);
    } else {
      if (this?.__node?.graph)
        canvasOptions.graph = this.__node.graph;
      if (this?.__node?.graph)
        this.__node.graph.CANVASES[canvasOptions._id] = canvasOptions;
      else
        globalThis.CANVASES[canvasOptions._id] = canvasOptions;
      if (this?.__node.graph)
        this.__node.graph.run("makeProxy", canvasOptions._id, canvasOptions.canvas);
      else
        proxyElementWorkerRoutes.makeProxy(canvasOptions._id, canvasOptions.canvas);
      if (options2.width)
        canvasOptions.canvas.width = options2.width;
      if (options2.height)
        canvasOptions.canvas.height = options2.height;
      if (typeof canvasOptions.draw === "string") {
        canvasOptions.draw = parseFunctionFromText3(canvasOptions.draw);
      } else if (typeof canvasOptions.draw === "function") {
        canvasOptions.draw = canvasOptions.draw;
      }
      if (typeof canvasOptions.update === "string") {
        canvasOptions.update = parseFunctionFromText3(canvasOptions.update);
      } else if (typeof canvasOptions.update === "function") {
        canvasOptions.update = canvasOptions.update;
      }
      if (typeof canvasOptions.init === "string") {
        canvasOptions.init = parseFunctionFromText3(canvasOptions.init);
      } else if (typeof canvasOptions.init === "function") {
        canvasOptions.init = canvasOptions.init;
      }
      if (typeof canvasOptions.clear === "string") {
        canvasOptions.clear = parseFunctionFromText3(canvasOptions.clear);
      } else if (typeof canvasOptions.clear === "function") {
        canvasOptions.clear = canvasOptions.clear;
      }
      if (typeof canvasOptions.init === "function")
        canvasOptions.init(canvasOptions, canvasOptions.canvas, canvasOptions.context);
      canvasOptions.stop = () => {
        stopAnim(canvasOptions._id);
      };
      canvasOptions.start = (draw) => {
        startAnim(canvasOptions._id, draw);
      };
      canvasOptions.set = (settings) => {
        setDraw(settings, canvasOptions._id);
      };
      if (typeof canvasOptions.draw === "function" && canvasOptions.animating) {
        let draw = (s, canvas3, context) => {
          if (s.animating) {
            s.draw(s, canvas3, context);
            requestAnimationFrame(() => {
              draw(s, canvas3, context);
            });
          }
        };
        draw(canvasOptions, canvasOptions.canvas, canvasOptions.context);
      }
    }
    if (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope)
      return canvasOptions._id;
    else {
      const canvascontrols = { _id: options2._id, width: options2.width, height: options2.height, draw: (props) => {
        drawFrame(props, options2._id);
      }, update: (props) => {
        updateCanvas(props, options2._id);
      }, clear: () => {
        clearCanvas(options2._id);
      }, init: () => {
        initCanvas(options2._id);
      }, stop: () => {
        stopAnim(options2._id);
      }, start: () => {
        startAnim(options2._id);
      }, set: (newDrawProps) => {
        setDraw(newDrawProps, options2._id);
      }, terminate: () => {
        stopAnim(options2._id);
      } };
      return canvascontrols;
    }
  }
  function drawFrame(props, _id) {
    let canvasopts;
    if (this?.__node?.graph) {
      if (!_id)
        canvasopts = this.__node.graph.CANVASES?.[Object.keys(this.__node.graph.CANVASES)[0]];
      else
        canvasopts = this.__node.graph.CANVASES?.[_id];
    } else {
      if (!_id)
        canvasopts = globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];
      else
        canvasopts = globalThis.CANVASES?.[_id];
    }
    if (canvasopts) {
      if (props)
        Object.assign(canvasopts, props);
      if (canvasopts.draw) {
        canvasopts.draw(canvasopts, canvasopts.canvas, canvasopts.context);
        return _id;
      }
    }
    return void 0;
  }
  function clearCanvas(_id) {
    let canvasopts;
    if (this?.__node?.graph) {
      if (!_id)
        canvasopts = this.__node.graph.CANVASES?.[Object.keys(this.__node.graph.CANVASES)[0]];
      else
        canvasopts = this.__node.graph.CANVASES?.[_id];
    } else {
      if (!_id)
        canvasopts = globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];
      else
        canvasopts = globalThis.CANVASES?.[_id];
    }
    if (canvasopts?.clear) {
      canvasopts.clear(canvasopts, canvasopts.canvas, canvasopts.context);
      return _id;
    }
    return void 0;
  }
  function initCanvas(_id) {
    let canvasopts;
    if (this?.__node?.graph) {
      if (!_id)
        canvasopts = this.__node.graph.CANVASES?.[Object.keys(this.__node.graph.CANVASES)[0]];
      else
        canvasopts = this.__node.graph.CANVASES?.[_id];
    } else {
      if (!_id)
        canvasopts = globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];
      else
        canvasopts = globalThis.CANVASES?.[_id];
    }
    if (canvasopts?.init) {
      canvasopts.init(canvasopts, canvasopts.canvas, canvasopts.context);
      return _id;
    }
    return void 0;
  }
  function updateCanvas(input, _id) {
    let canvasopts;
    if (this?.__node?.graph) {
      if (!_id)
        canvasopts = this.__node.graph.CANVASES?.[Object.keys(this.__node.graph.CANVASES)[0]];
      else
        canvasopts = this.__node.graph.CANVASES?.[_id];
    } else {
      if (!_id)
        canvasopts = globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];
      else
        canvasopts = globalThis.CANVASES?.[_id];
    }
    if (canvasopts?.update) {
      canvasopts.update(canvasopts, canvasopts.canvas, canvasopts.context, input);
      return _id;
    }
    return void 0;
  }
  function setProps(props, _id) {
    let canvasopts;
    if (this?.__node?.graph) {
      if (!_id)
        canvasopts = this.__node.graph.CANVASES?.[Object.keys(this.__node.graph.CANVASES)[0]];
      else
        canvasopts = this.__node.graph.CANVASES?.[_id];
    } else {
      if (!_id)
        canvasopts = globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];
      else
        canvasopts = globalThis.CANVASES?.[_id];
    }
    if (canvasopts) {
      Object.assign(canvasopts, props);
      if (props.width)
        canvasopts.canvas.width = props.width;
      if (props.height)
        canvasopts.canvas.height = props.height;
      return _id;
    }
    return void 0;
  }
  function startAnim(_id, draw) {
    let canvasopts;
    if (this?.__node?.graph) {
      if (!_id)
        canvasopts = this.__node.graph.CANVASES?.[Object.keys(this.__node.graph.CANVASES)[0]];
      else
        canvasopts = this.__node.graph.CANVASES?.[_id];
    } else {
      if (!_id)
        canvasopts = globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];
      else
        canvasopts = globalThis.CANVASES?.[_id];
    }
    canvasopts.animating = true;
    if (canvasopts && draw) {
      if (typeof draw === "string")
        draw = parseFunctionFromText3(draw);
      if (typeof draw === "function") {
        canvasopts.draw = draw;
      }
      return _id;
    }
    if (typeof canvasopts?.draw === "function") {
      let draw2 = (s, canvas3, context) => {
        if (s.animating) {
          s.draw(s, canvas3, context);
          requestAnimationFrame(() => {
            draw2(s, canvas3, context);
          });
        }
      };
      if (typeof canvasopts.clear === "function")
        canvasopts.clear(canvasopts, canvasopts.canvas, canvasopts.context);
      if (typeof canvasopts.init === "function")
        canvasopts.init(canvasopts, canvasopts.canvas, canvasopts.context);
      draw2(canvasopts, canvasopts.canvas, canvasopts.context);
      return _id;
    }
    return void 0;
  }
  function stopAnim(_id) {
    let canvasopts;
    if (this?.__node?.graph) {
      if (!_id)
        canvasopts = this.__node.graph.CANVASES?.[Object.keys(this.__node.graph.CANVASES)[0]];
      else
        canvasopts = this.__node.graph.CANVASES?.[_id];
    } else {
      if (!_id)
        canvasopts = globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];
      else
        canvasopts = globalThis.CANVASES?.[_id];
    }
    if (canvasopts) {
      canvasopts.animating = false;
      if (typeof canvasopts.clear === "function")
        canvasopts.clear(canvasopts, canvasopts.canvas, canvasopts.context);
      return _id;
    }
    return void 0;
  }
  var workerCanvasRoutes = { ...proxyElementWorkerRoutes, Renderer, transferCanvas, setupCanvas, setDraw, drawFrame, clearCanvas, initCanvas, updateCanvas, setProps, startAnim, stopAnim };
  function parseFunctionFromText3(method = "") {
    let getFunctionBody = (methodString) => {
      return methodString.replace(/^\W*(function[^{]+\{([\s\S]*)\}|[^=]+=>[^{]*\{([\s\S]*)\}|[^=]+=>(.+))/i, "$2$3$4");
    };
    let getFunctionHead = (methodString) => {
      let startindex = methodString.indexOf("=>") + 1;
      if (startindex <= 0) {
        startindex = methodString.indexOf("){");
      }
      if (startindex <= 0) {
        startindex = methodString.indexOf(") {");
      }
      return methodString.slice(0, methodString.indexOf("{", startindex) + 1);
    };
    let newFuncHead = getFunctionHead(method);
    let newFuncBody = getFunctionBody(method);
    let newFunc;
    if (newFuncHead.includes("function")) {
      let varName = newFuncHead.split("(")[1].split(")")[0];
      newFunc = new Function(varName, newFuncBody);
    } else {
      if (newFuncHead.substring(0, 6) === newFuncBody.substring(0, 6)) {
        let varName = newFuncHead.split("(")[1].split(")")[0];
        newFunc = new Function(varName, newFuncBody.substring(newFuncBody.indexOf("{") + 1, newFuncBody.length - 1));
      } else {
        try {
          newFunc = (0, eval)(newFuncHead + newFuncBody + "}");
        } catch {
        }
      }
    }
    return newFunc;
  }
  var algorithms = {};
  var loadAlgorithms = (settings) => {
    return Object.assign(algorithms, settings);
  };
  function createSubprocess(options2, inputs) {
    let ctx = { _id: options2._id ? options2._id : `algorithm${Math.floor(Math.random() * 1e15)}`, ondata: options2.ondata, run: (data) => {
      return ctx.ondata(ctx, data);
    } };
    if (options2.structs)
      recursivelyAssign3(ctx, JSON.parse(JSON.stringify(options2.structs)));
    if (inputs)
      recursivelyAssign3(ctx, JSON.parse(JSON.stringify(inputs)));
    if (options2.oncreate) {
      ctx.oncreate = options2.oncreate;
    }
    if (ctx.oncreate) {
      ctx.oncreate(ctx);
    }
    return ctx;
  }
  var recursivelyAssign3 = (target, obj) => {
    for (const key in obj) {
      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        if (typeof target[key] === "object" && !Array.isArray(target[key]))
          recursivelyAssign3(target[key], obj[key]);
        else
          target[key] = recursivelyAssign3({}, obj[key]);
      } else
        target[key] = obj[key];
    }
    return target;
  };
  var subprocessRoutes = { ...unsafeRoutes, loadAlgorithms, "initSubprocesses": async function initSubprocesses(subprocesses, service) {
    if (!service)
      service = this.__node.graph;
    if (!service)
      return void 0;
    for (const p in subprocesses) {
      let s = subprocesses[p];
      if (!s.worker && s.url)
        s.worker = service.addWorker({ url: s.url });
      if (!s.worker)
        continue;
      let w2 = s.worker;
      let wpId;
      wpId = service.establishMessageChannel(w2.worker, s.source?.worker);
      if (!s.source)
        s.source = service;
      if (typeof s.subprocess === "object") {
        const p2 = s.subprocess;
        if (!p2.name)
          continue;
        if (typeof p2.oncreate === "function") {
          p2.oncreate = p2.oncreate.toString();
        }
        if (typeof p2.ondata === "function") {
          p2.ondata = p2.ondata.toString();
        }
        s.worker.post("addSubprocessTemplate", [p2.name, p2.structs, p2.oncreate, p2.ondata, p2.props]);
        s.subprocess = p2.name;
      }
      if (s.init) {
        let r = await w2.run(s.init, s.initArgs);
        s.otherArgs = r;
      }
      if (s.otherArgs) {
        w2.run("setValue", ["otherArgsProxy", Array.isArray(s.otherArgs) ? s.otherArgs : [s.otherArgs]]);
      }
      if (s.pipeTo) {
        w2.run("setValue", ["routeProxy", s.route]);
        w2.run("setValue", ["pipeRoute", s.pipeTo.route]);
        if (s.url && !s.pipeTo.worker) {
          let w22 = service.addWorker({ url: s.url });
          s.pipeTo.portId = service.establishMessageChannel(w2.worker, w22.worker);
          s.pipeTo.worker = w22;
        }
        if (s.pipeTo.init) {
          s.pipeTo.otherArgs = await s.pipeTo.worker.run(s.pipeTo.init, s.pipeTo.initArgs);
        }
        w2.run("setValue", ["pipePort", s.pipeTo.portId]);
        if (s.pipeTo.otherArgs)
          w2.run("setValue", ["otherPipeArgs", s.pipeTo.otherArgs]);
        service.transferFunction(w2, function pipeResults(data) {
          let inp = data;
          if (this.__node.graph.otherArgsProxy)
            inp = [data, ...this.__node.graph.otherArgsProxy];
          let r = this.__node.graph.run(this.__node.graph.routeProxy, inp);
          if (!s.blocking)
            return new Promise((res) => {
              if (r instanceof Promise) {
                r.then((rr) => {
                  if (rr !== void 0) {
                    let args = rr;
                    if (this.__node.graph.otherPipeArgs)
                      args = [rr, ...this.__node.graph.otherPipeArgs];
                    if (this.workers[this.__node.graph.pipePort]) {
                      s.blocking = true;
                      this.workers[this.__node.graph.pipePort].run(this.__node.graph.pipeRoute, args).then((result) => {
                        s.blocking = false;
                        res(result);
                      });
                    }
                  }
                });
              } else if (r !== void 0) {
                let args = r;
                if (this.__node.graph.otherPipeArgs)
                  args = [r, ...this.__node.graph.otherPipeArgs];
                if (this.workers[this.__node.graph.pipePort]) {
                  s.blocking = true;
                  this.workers[this.__node.graph.pipePort].run(this.__node.graph.pipeRoute, args).then((result) => {
                    s.blocking = false;
                    res(result);
                  });
                }
              }
            });
          return void 0;
        }, s.route + "_pipeResults");
        s.route = s.route + "_pipeResults";
      } else {
        w2.run("setValue", ["routeProxy", s.route]);
        service.transferFunction(w2, function routeProxy(data) {
          let r;
          if (this.__node.graph.otherArgsProxy)
            r = this.__node.graph.nodes.get(this.__node.graph.routeProxy).__operator(data, ...this.__node.graph.otherArgsProxy);
          else
            r = this.__node.graph.nodes.get(this.__node.graph.routeProxy).__operator(data);
          if (this.__node.graph.state.triggers[this.__node.graph.routeProxy]) {
            if (r instanceof Promise) {
              r.then((rr) => {
                this.setState({ [this.__node.graph.routeProxy]: rr });
              });
            } else
              this.setState({ [this.__node.graph.routeProxy]: r });
          }
          return r;
        }, s.route + "_routeProxy");
        s.route = s.route + "_routeProxy";
        if (!s.stopped)
          w2.run("subscribeToWorker", [s.subscribeRoute, wpId, s.route]).then((sub) => {
            s.sub = sub;
          });
      }
      s.stop = async () => {
        if (s.source && typeof s.sub === "number") {
          s.source.unsubscribe(s.subscribeRoute, s.sub);
          return true;
        }
        return void 0;
      };
      s.start = async () => {
        if (typeof s.sub !== "number")
          return w2.run("subscribeToWorker", [s.subscribeRoute, wpId, s.route, s.blocking]).then((sub) => {
            s.sub = sub;
          });
      };
      s.setArgs = async (args) => {
        if (Array.isArray(args))
          await w2.run("setValue", ["otherArgsProxy", args]);
        else if (typeof args === "object") {
          for (const key in args) {
            await w2.run("setValue", [key, args[key]]);
          }
        }
        return true;
      };
      s.terminate = () => {
        w2.terminate();
        if (s.source?.worker && typeof s.sub === "number") {
          s.source.post("unsubscribe", s.sub);
        }
        if (s.pipeTo?.worker) {
          s.pipeTo.worker.terminate();
        }
      };
      if (s.callback)
        w2.subscribe(s.route, (res) => {
          if (typeof s.callback === "string")
            this.__node.graph.run(s.callback, res);
          else
            s.callback(res);
        });
    }
    return subprocesses;
  }, "addSubprocessTemplate": function subprocesstempalte(name, structs, oncreate, ondata, props) {
    if (typeof oncreate === "string")
      oncreate = parseFunctionFromText(oncreate);
    if (typeof ondata === "string")
      ondata = parseFunctionFromText(ondata);
    if (typeof ondata === "function") {
      algorithms[name] = { ondata, oncreate: typeof oncreate === "function" ? oncreate : null, structs };
      if (typeof props === "object")
        Object.assign(algorithms[name], props);
      return true;
    }
  }, "updateSubprocess": function updatesubprocess(structs, _id) {
    if (!this.__node.graph.ALGORITHMS)
      this.__node.graph.ALGORITHMS = {};
    if (!_id)
      _id = Object.keys(this.__node.graph.ALGORITHMS)[0];
    if (!_id)
      return;
    Object.assign(this.__node.graph.ALGORITHMS[_id], structs);
  }, "createSubprocess": function creatsubprocess(options2, inputs) {
    if (!this.__node.graph.ALGORITHMS)
      this.__node.graph.ALGORITHMS = {};
    if (typeof options2 === "string") {
      options2 = algorithms[options2];
    }
    if (typeof options2 === "object") {
      if (typeof options2.ondata === "string")
        options2.ondata = parseFunctionFromText(options2.ondata);
      let ctx;
      if (typeof options2?.ondata === "function")
        ctx = createSubprocess(options2, inputs);
      if (ctx)
        this.__node.graph.ALGORITHMS[ctx._id] = ctx;
      console.log(ctx, options2);
      if (ctx)
        return ctx._id;
    }
    return false;
  }, "runSubprocess": function runsubprocess(data, _id) {
    if (!this.__node.graph.ALGORITHMS)
      this.__node.graph.ALGORITHMS = {};
    if (!_id)
      _id = Object.keys(this.__node.graph.ALGORITHMS)[0];
    if (!_id)
      return;
    let res = this.__node.graph.ALGORITHMS[_id].run(data);
    if (res !== void 0) {
      if (Array.isArray(res)) {
        let pass = [];
        res.forEach((r) => {
          if (r !== void 0) {
            pass.push(r);
            this.__node.graph.setState({ [_id]: r });
          }
        });
        if (pass.length > 0) {
          return pass;
        }
      } else {
        this.__node.graph.setState({ [_id]: res });
        return res;
      }
    }
  } };
  var url = URL.createObjectURL(new Blob([String(`(()=>{var __require=(x=>typeof require!=="undefined"?require:typeof Proxy!=="undefined"?new Proxy(x,{get:(a,b)=>(typeof require!=="undefined"?require:a)[b]}):x)(function(x){if(typeof require!=="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+x+'" is not supported')});var __create=Object.create;var __defProp=Object.defineProperty;var __getOwnPropDesc=Object.getOwnPropertyDescriptor;var __getOwnPropNames=Object.getOwnPropertyNames;var __getProtoOf=Object.getPrototypeOf;var __hasOwnProp=Object.prototype.hasOwnProperty;var __require2=(x=>typeof __require!=="undefined"?__require:typeof Proxy!=="undefined"?new Proxy(x,{get:(a,b)=>(typeof __require!=="undefined"?__require:a)[b]}):x)(function(x){if(typeof __require!=="undefined")return __require.apply(this,arguments);throw new Error('Dynamic require of "'+x+'" is not supported')});var __commonJS=(cb,mod)=>function __require22(){return mod||(0,cb[__getOwnPropNames(cb)[0]])((mod={exports:{}}).exports,mod),mod.exports};var __copyProps=(to,from,except,desc)=>{if(from&&typeof from==="object"||typeof from==="function"){for(let key of __getOwnPropNames(from))if(!__hasOwnProp.call(to,key)&&key!==except)__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable})}return to};var __toESM=(mod,isNodeMode,target)=>(target=mod!=null?__create(__getProtoOf(mod)):{},__copyProps(isNodeMode||!mod||!mod.__esModule?__defProp(target,"default",{value:mod,enumerable:true}):target,mod));var require_sjcl=__commonJS({"services/e2ee/sjcl.js"(exports,module){"use strict";var sjcl2={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(a){this.toString=function(){return"CORRUPT: "+this.message};this.message=a},invalid:function(a){this.toString=function(){return"INVALID: "+this.message};this.message=a},bug:function(a){this.toString=function(){return"BUG: "+this.message};this.message=a},notReady:function(a){this.toString=function(){return"NOT READY: "+this.message};this.message=a}}};sjcl2.cipher.aes=function(a){this.s[0][0][0]||this.O();var b,c,d,e,f=this.s[0][4],g=this.s[1];b=a.length;var h=1;if(4!==b&&6!==b&&8!==b)throw new sjcl2.exception.invalid("invalid aes key size");this.b=[d=a.slice(0),e=[]];for(a=b;a<4*b+28;a++){c=d[a-1];if(0===a%b||8===b&&4===a%b)c=f[c>>>24]<<24^f[c>>16&255]<<16^f[c>>8&255]<<8^f[c&255],0===a%b&&(c=c<<8^c>>>24^h<<24,h=h<<1^283*(h>>7));d[a]=d[a-b]^c}for(b=0;a;b++,a--)c=d[b&3?a:a-4],e[b]=4>=a||4>b?c:g[0][f[c>>>24]]^g[1][f[c>>16&255]]^g[2][f[c>>8&255]]^g[3][f[c&255]]};sjcl2.cipher.aes.prototype={encrypt:function(a){return t(this,a,0)},decrypt:function(a){return t(this,a,1)},s:[[[],[],[],[],[]],[[],[],[],[],[]]],O:function(){var a=this.s[0],b=this.s[1],c=a[4],d=b[4],e,f,g,h=[],k=[],l,n,m,p;for(e=0;256>e;e++)k[(h[e]=e<<1^283*(e>>7))^e]=e;for(f=g=0;!c[f];f^=l||1,g=k[g]||1)for(m=g^g<<1^g<<2^g<<3^g<<4,m=m>>8^m&255^99,c[f]=m,d[m]=f,n=h[e=h[l=h[f]]],p=16843009*n^65537*e^257*l^16843008*f,n=257*h[m]^16843008*m,e=0;4>e;e++)a[e][f]=n=n<<24^n>>>8,b[e][m]=p=p<<24^p>>>8;for(e=0;5>e;e++)a[e]=a[e].slice(0),b[e]=b[e].slice(0)}};function t(a,b,c){if(4!==b.length)throw new sjcl2.exception.invalid("invalid aes block size");var d=a.b[c],e=b[0]^d[0],f=b[c?3:1]^d[1],g=b[2]^d[2];b=b[c?1:3]^d[3];var h,k,l,n=d.length/4-2,m,p=4,r=[0,0,0,0];h=a.s[c];a=h[0];var q=h[1],v=h[2],w=h[3],x=h[4];for(m=0;m<n;m++)h=a[e>>>24]^q[f>>16&255]^v[g>>8&255]^w[b&255]^d[p],k=a[f>>>24]^q[g>>16&255]^v[b>>8&255]^w[e&255]^d[p+1],l=a[g>>>24]^q[b>>16&255]^v[e>>8&255]^w[f&255]^d[p+2],b=a[b>>>24]^q[e>>16&255]^v[f>>8&255]^w[g&255]^d[p+3],p+=4,e=h,f=k,g=l;for(m=0;4>m;m++)r[c?3&-m:m]=x[e>>>24]<<24^x[f>>16&255]<<16^x[g>>8&255]<<8^x[b&255]^d[p++],h=e,e=f,f=g,g=b,b=h;return r}sjcl2.bitArray={bitSlice:function(a,b,c){a=sjcl2.bitArray.$(a.slice(b/32),32-(b&31)).slice(1);return void 0===c?a:sjcl2.bitArray.clamp(a,c-b)},extract:function(a,b,c){var d=Math.floor(-b-c&31);return((b+c-1^b)&-32?a[b/32|0]<<32-d^a[b/32+1|0]>>>d:a[b/32|0]>>>d)&(1<<c)-1},concat:function(a,b){if(0===a.length||0===b.length)return a.concat(b);var c=a[a.length-1],d=sjcl2.bitArray.getPartial(c);return 32===d?a.concat(b):sjcl2.bitArray.$(b,d,c|0,a.slice(0,a.length-1))},bitLength:function(a){var b=a.length;return 0===b?0:32*(b-1)+sjcl2.bitArray.getPartial(a[b-1])},clamp:function(a,b){if(32*a.length<b)return a;a=a.slice(0,Math.ceil(b/32));var c=a.length;b=b&31;0<c&&b&&(a[c-1]=sjcl2.bitArray.partial(b,a[c-1]&2147483648>>b-1,1));return a},partial:function(a,b,c){return 32===a?b:(c?b|0:b<<32-a)+1099511627776*a},getPartial:function(a){return Math.round(a/1099511627776)||32},equal:function(a,b){if(sjcl2.bitArray.bitLength(a)!==sjcl2.bitArray.bitLength(b))return false;var c=0,d;for(d=0;d<a.length;d++)c|=a[d]^b[d];return 0===c},$:function(a,b,c,d){var e;e=0;for(void 0===d&&(d=[]);32<=b;b-=32)d.push(c),c=0;if(0===b)return d.concat(a);for(e=0;e<a.length;e++)d.push(c|a[e]>>>b),c=a[e]<<32-b;e=a.length?a[a.length-1]:0;a=sjcl2.bitArray.getPartial(e);d.push(sjcl2.bitArray.partial(b+a&31,32<b+a?c:d.pop(),1));return d},i:function(a,b){return[a[0]^b[0],a[1]^b[1],a[2]^b[2],a[3]^b[3]]},byteswapM:function(a){var b,c;for(b=0;b<a.length;++b)c=a[b],a[b]=c>>>24|c>>>8&65280|(c&65280)<<8|c<<24;return a}};sjcl2.codec.utf8String={fromBits:function(a){var b="",c=sjcl2.bitArray.bitLength(a),d,e;for(d=0;d<c/8;d++)0===(d&3)&&(e=a[d/4]),b+=String.fromCharCode(e>>>8>>>8>>>8),e<<=8;return decodeURIComponent(escape(b))},toBits:function(a){a=unescape(encodeURIComponent(a));var b=[],c,d=0;for(c=0;c<a.length;c++)d=d<<8|a.charCodeAt(c),3===(c&3)&&(b.push(d),d=0);c&3&&b.push(sjcl2.bitArray.partial(8*(c&3),d));return b}};sjcl2.codec.hex={fromBits:function(a){var b="",c;for(c=0;c<a.length;c++)b+=((a[c]|0)+0xf00000000000).toString(16).substr(4);return b.substr(0,sjcl2.bitArray.bitLength(a)/4)},toBits:function(a){var b,c=[],d;a=a.replace(/\\s|0x/g,"");d=a.length;a=a+"00000000";for(b=0;b<a.length;b+=8)c.push(parseInt(a.substr(b,8),16)^0);return sjcl2.bitArray.clamp(c,4*d)}};sjcl2.codec.base32={B:"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",X:"0123456789ABCDEFGHIJKLMNOPQRSTUV",BITS:32,BASE:5,REMAINING:27,fromBits:function(a,b,c){var d=sjcl2.codec.base32.BASE,e=sjcl2.codec.base32.REMAINING,f="",g=0,h=sjcl2.codec.base32.B,k=0,l=sjcl2.bitArray.bitLength(a);c&&(h=sjcl2.codec.base32.X);for(c=0;f.length*d<l;)f+=h.charAt((k^a[c]>>>g)>>>e),g<d?(k=a[c]<<d-g,g+=e,c++):(k<<=d,g-=d);for(;f.length&7&&!b;)f+="=";return f},toBits:function(a,b){a=a.replace(/\\s|=/g,"").toUpperCase();var c=sjcl2.codec.base32.BITS,d=sjcl2.codec.base32.BASE,e=sjcl2.codec.base32.REMAINING,f=[],g,h=0,k=sjcl2.codec.base32.B,l=0,n,m="base32";b&&(k=sjcl2.codec.base32.X,m="base32hex");for(g=0;g<a.length;g++){n=k.indexOf(a.charAt(g));if(0>n){if(!b)try{return sjcl2.codec.base32hex.toBits(a)}catch(p){}throw new sjcl2.exception.invalid("this isn't "+m+"!")}h>e?(h-=e,f.push(l^n>>>h),l=n<<c-h):(h+=d,l^=n<<c-h)}h&56&&f.push(sjcl2.bitArray.partial(h&56,l,1));return f}};sjcl2.codec.base32hex={fromBits:function(a,b){return sjcl2.codec.base32.fromBits(a,b,1)},toBits:function(a){return sjcl2.codec.base32.toBits(a,1)}};sjcl2.codec.base64={B:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fromBits:function(a,b,c){var d="",e=0,f=sjcl2.codec.base64.B,g=0,h=sjcl2.bitArray.bitLength(a);c&&(f=f.substr(0,62)+"-_");for(c=0;6*d.length<h;)d+=f.charAt((g^a[c]>>>e)>>>26),6>e?(g=a[c]<<6-e,e+=26,c++):(g<<=6,e-=6);for(;d.length&3&&!b;)d+="=";return d},toBits:function(a,b){a=a.replace(/\\s|=/g,"");var c=[],d,e=0,f=sjcl2.codec.base64.B,g=0,h;b&&(f=f.substr(0,62)+"-_");for(d=0;d<a.length;d++){h=f.indexOf(a.charAt(d));if(0>h)throw new sjcl2.exception.invalid("this isn't base64!");26<e?(e-=26,c.push(g^h>>>e),g=h<<32-e):(e+=6,g^=h<<32-e)}e&56&&c.push(sjcl2.bitArray.partial(e&56,g,1));return c}};sjcl2.codec.base64url={fromBits:function(a){return sjcl2.codec.base64.fromBits(a,1,1)},toBits:function(a){return sjcl2.codec.base64.toBits(a,1)}};sjcl2.hash.sha256=function(a){this.b[0]||this.O();a?(this.F=a.F.slice(0),this.A=a.A.slice(0),this.l=a.l):this.reset()};sjcl2.hash.sha256.hash=function(a){return new sjcl2.hash.sha256().update(a).finalize()};sjcl2.hash.sha256.prototype={blockSize:512,reset:function(){this.F=this.Y.slice(0);this.A=[];this.l=0;return this},update:function(a){"string"===typeof a&&(a=sjcl2.codec.utf8String.toBits(a));var b,c=this.A=sjcl2.bitArray.concat(this.A,a);b=this.l;a=this.l=b+sjcl2.bitArray.bitLength(a);if(9007199254740991<a)throw new sjcl2.exception.invalid("Cannot hash more than 2^53 - 1 bits");if("undefined"!==typeof Uint32Array){var d=new Uint32Array(c),e=0;for(b=512+b-(512+b&511);b<=a;b+=512)u(this,d.subarray(16*e,16*(e+1))),e+=1;c.splice(0,16*e)}else for(b=512+b-(512+b&511);b<=a;b+=512)u(this,c.splice(0,16));return this},finalize:function(){var a,b=this.A,c=this.F,b=sjcl2.bitArray.concat(b,[sjcl2.bitArray.partial(1,1)]);for(a=b.length+2;a&15;a++)b.push(0);b.push(Math.floor(this.l/4294967296));for(b.push(this.l|0);b.length;)u(this,b.splice(0,16));this.reset();return c},Y:[],b:[],O:function(){function a(a2){return 4294967296*(a2-Math.floor(a2))|0}for(var b=0,c=2,d,e;64>b;c++){e=true;for(d=2;d*d<=c;d++)if(0===c%d){e=false;break}e&&(8>b&&(this.Y[b]=a(Math.pow(c,.5))),this.b[b]=a(Math.pow(c,1/3)),b++)}}};function u(a,b){var c,d,e,f=a.F,g=a.b,h=f[0],k=f[1],l=f[2],n=f[3],m=f[4],p=f[5],r=f[6],q=f[7];for(c=0;64>c;c++)16>c?d=b[c]:(d=b[c+1&15],e=b[c+14&15],d=b[c&15]=(d>>>7^d>>>18^d>>>3^d<<25^d<<14)+(e>>>17^e>>>19^e>>>10^e<<15^e<<13)+b[c&15]+b[c+9&15]|0),d=d+q+(m>>>6^m>>>11^m>>>25^m<<26^m<<21^m<<7)+(r^m&(p^r))+g[c],q=r,r=p,p=m,m=n+d|0,n=l,l=k,k=h,h=d+(k&l^n&(k^l))+(k>>>2^k>>>13^k>>>22^k<<30^k<<19^k<<10)|0;f[0]=f[0]+h|0;f[1]=f[1]+k|0;f[2]=f[2]+l|0;f[3]=f[3]+n|0;f[4]=f[4]+m|0;f[5]=f[5]+p|0;f[6]=f[6]+r|0;f[7]=f[7]+q|0}sjcl2.mode.ccm={name:"ccm",G:[],listenProgress:function(a){sjcl2.mode.ccm.G.push(a)},unListenProgress:function(a){a=sjcl2.mode.ccm.G.indexOf(a);-1<a&&sjcl2.mode.ccm.G.splice(a,1)},fa:function(a){var b=sjcl2.mode.ccm.G.slice(),c;for(c=0;c<b.length;c+=1)b[c](a)},encrypt:function(a,b,c,d,e){var f,g=b.slice(0),h=sjcl2.bitArray,k=h.bitLength(c)/8,l=h.bitLength(g)/8;e=e||64;d=d||[];if(7>k)throw new sjcl2.exception.invalid("ccm: iv must be at least 7 bytes");for(f=2;4>f&&l>>>8*f;f++);f<15-k&&(f=15-k);c=h.clamp(c,8*(15-f));b=sjcl2.mode.ccm.V(a,b,c,d,e,f);g=sjcl2.mode.ccm.C(a,g,c,b,e,f);return h.concat(g.data,g.tag)},decrypt:function(a,b,c,d,e){e=e||64;d=d||[];var f=sjcl2.bitArray,g=f.bitLength(c)/8,h=f.bitLength(b),k=f.clamp(b,h-e),l=f.bitSlice(b,h-e),h=(h-e)/8;if(7>g)throw new sjcl2.exception.invalid("ccm: iv must be at least 7 bytes");for(b=2;4>b&&h>>>8*b;b++);b<15-g&&(b=15-g);c=f.clamp(c,8*(15-b));k=sjcl2.mode.ccm.C(a,k,c,l,e,b);a=sjcl2.mode.ccm.V(a,k.data,c,d,e,b);if(!f.equal(k.tag,a))throw new sjcl2.exception.corrupt("ccm: tag doesn't match");return k.data},na:function(a,b,c,d,e,f){var g=[],h=sjcl2.bitArray,k=h.i;d=[h.partial(8,(b.length?64:0)|d-2<<2|f-1)];d=h.concat(d,c);d[3]|=e;d=a.encrypt(d);if(b.length)for(c=h.bitLength(b)/8,65279>=c?g=[h.partial(16,c)]:4294967295>=c&&(g=h.concat([h.partial(16,65534)],[c])),g=h.concat(g,b),b=0;b<g.length;b+=4)d=a.encrypt(k(d,g.slice(b,b+4).concat([0,0,0])));return d},V:function(a,b,c,d,e,f){var g=sjcl2.bitArray,h=g.i;e/=8;if(e%2||4>e||16<e)throw new sjcl2.exception.invalid("ccm: invalid tag length");if(4294967295<d.length||4294967295<b.length)throw new sjcl2.exception.bug("ccm: can't deal with 4GiB or more data");c=sjcl2.mode.ccm.na(a,d,c,e,g.bitLength(b)/8,f);for(d=0;d<b.length;d+=4)c=a.encrypt(h(c,b.slice(d,d+4).concat([0,0,0])));return g.clamp(c,8*e)},C:function(a,b,c,d,e,f){var g,h=sjcl2.bitArray;g=h.i;var k=b.length,l=h.bitLength(b),n=k/50,m=n;c=h.concat([h.partial(8,f-1)],c).concat([0,0,0]).slice(0,4);d=h.bitSlice(g(d,a.encrypt(c)),0,e);if(!k)return{tag:d,data:[]};for(g=0;g<k;g+=4)g>n&&(sjcl2.mode.ccm.fa(g/k),n+=m),c[3]++,e=a.encrypt(c),b[g]^=e[0],b[g+1]^=e[1],b[g+2]^=e[2],b[g+3]^=e[3];return{tag:d,data:h.clamp(b,l)}}};sjcl2.mode.ocb2={name:"ocb2",encrypt:function(a,b,c,d,e,f){if(128!==sjcl2.bitArray.bitLength(c))throw new sjcl2.exception.invalid("ocb iv must be 128 bits");var g,h=sjcl2.mode.ocb2.S,k=sjcl2.bitArray,l=k.i,n=[0,0,0,0];c=h(a.encrypt(c));var m,p=[];d=d||[];e=e||64;for(g=0;g+4<b.length;g+=4)m=b.slice(g,g+4),n=l(n,m),p=p.concat(l(c,a.encrypt(l(c,m)))),c=h(c);m=b.slice(g);b=k.bitLength(m);g=a.encrypt(l(c,[0,0,0,b]));m=k.clamp(l(m.concat([0,0,0]),g),b);n=l(n,l(m.concat([0,0,0]),g));n=a.encrypt(l(n,l(c,h(c))));d.length&&(n=l(n,f?d:sjcl2.mode.ocb2.pmac(a,d)));return p.concat(k.concat(m,k.clamp(n,e)))},decrypt:function(a,b,c,d,e,f){if(128!==sjcl2.bitArray.bitLength(c))throw new sjcl2.exception.invalid("ocb iv must be 128 bits");e=e||64;var g=sjcl2.mode.ocb2.S,h=sjcl2.bitArray,k=h.i,l=[0,0,0,0],n=g(a.encrypt(c)),m,p,r=sjcl2.bitArray.bitLength(b)-e,q=[];d=d||[];for(c=0;c+4<r/32;c+=4)m=k(n,a.decrypt(k(n,b.slice(c,c+4)))),l=k(l,m),q=q.concat(m),n=g(n);p=r-32*c;m=a.encrypt(k(n,[0,0,0,p]));m=k(m,h.clamp(b.slice(c),p).concat([0,0,0]));l=k(l,m);l=a.encrypt(k(l,k(n,g(n))));d.length&&(l=k(l,f?d:sjcl2.mode.ocb2.pmac(a,d)));if(!h.equal(h.clamp(l,e),h.bitSlice(b,r)))throw new sjcl2.exception.corrupt("ocb: tag doesn't match");return q.concat(h.clamp(m,p))},pmac:function(a,b){var c,d=sjcl2.mode.ocb2.S,e=sjcl2.bitArray,f=e.i,g=[0,0,0,0],h=a.encrypt([0,0,0,0]),h=f(h,d(d(h)));for(c=0;c+4<b.length;c+=4)h=d(h),g=f(g,a.encrypt(f(h,b.slice(c,c+4))));c=b.slice(c);128>e.bitLength(c)&&(h=f(h,d(h)),c=e.concat(c,[-2147483648,0,0,0]));g=f(g,c);return a.encrypt(f(d(f(h,d(h))),g))},S:function(a){return[a[0]<<1^a[1]>>>31,a[1]<<1^a[2]>>>31,a[2]<<1^a[3]>>>31,a[3]<<1^135*(a[0]>>>31)]}};sjcl2.mode.gcm={name:"gcm",encrypt:function(a,b,c,d,e){var f=b.slice(0);b=sjcl2.bitArray;d=d||[];a=sjcl2.mode.gcm.C(true,a,f,d,c,e||128);return b.concat(a.data,a.tag)},decrypt:function(a,b,c,d,e){var f=b.slice(0),g=sjcl2.bitArray,h=g.bitLength(f);e=e||128;d=d||[];e<=h?(b=g.bitSlice(f,h-e),f=g.bitSlice(f,0,h-e)):(b=f,f=[]);a=sjcl2.mode.gcm.C(false,a,f,d,c,e);if(!g.equal(a.tag,b))throw new sjcl2.exception.corrupt("gcm: tag doesn't match");return a.data},ka:function(a,b){var c,d,e,f,g,h=sjcl2.bitArray.i;e=[0,0,0,0];f=b.slice(0);for(c=0;128>c;c++){(d=0!==(a[Math.floor(c/32)]&1<<31-c%32))&&(e=h(e,f));g=0!==(f[3]&1);for(d=3;0<d;d--)f[d]=f[d]>>>1|(f[d-1]&1)<<31;f[0]>>>=1;g&&(f[0]^=-520093696)}return e},j:function(a,b,c){var d,e=c.length;b=b.slice(0);for(d=0;d<e;d+=4)b[0]^=4294967295&c[d],b[1]^=4294967295&c[d+1],b[2]^=4294967295&c[d+2],b[3]^=4294967295&c[d+3],b=sjcl2.mode.gcm.ka(b,a);return b},C:function(a,b,c,d,e,f){var g,h,k,l,n,m,p,r,q=sjcl2.bitArray;m=c.length;p=q.bitLength(c);r=q.bitLength(d);h=q.bitLength(e);g=b.encrypt([0,0,0,0]);96===h?(e=e.slice(0),e=q.concat(e,[1])):(e=sjcl2.mode.gcm.j(g,[0,0,0,0],e),e=sjcl2.mode.gcm.j(g,e,[0,0,Math.floor(h/4294967296),h&4294967295]));h=sjcl2.mode.gcm.j(g,[0,0,0,0],d);n=e.slice(0);d=h.slice(0);a||(d=sjcl2.mode.gcm.j(g,h,c));for(l=0;l<m;l+=4)n[3]++,k=b.encrypt(n),c[l]^=k[0],c[l+1]^=k[1],c[l+2]^=k[2],c[l+3]^=k[3];c=q.clamp(c,p);a&&(d=sjcl2.mode.gcm.j(g,h,c));a=[Math.floor(r/4294967296),r&4294967295,Math.floor(p/4294967296),p&4294967295];d=sjcl2.mode.gcm.j(g,d,a);k=b.encrypt(e);d[0]^=k[0];d[1]^=k[1];d[2]^=k[2];d[3]^=k[3];return{tag:q.bitSlice(d,0,f),data:c}}};sjcl2.misc.hmac=function(a,b){this.W=b=b||sjcl2.hash.sha256;var c=[[],[]],d,e=b.prototype.blockSize/32;this.w=[new b,new b];a.length>e&&(a=b.hash(a));for(d=0;d<e;d++)c[0][d]=a[d]^909522486,c[1][d]=a[d]^1549556828;this.w[0].update(c[0]);this.w[1].update(c[1]);this.R=new b(this.w[0])};sjcl2.misc.hmac.prototype.encrypt=sjcl2.misc.hmac.prototype.mac=function(a){if(this.aa)throw new sjcl2.exception.invalid("encrypt on already updated hmac called!");this.update(a);return this.digest(a)};sjcl2.misc.hmac.prototype.reset=function(){this.R=new this.W(this.w[0]);this.aa=false};sjcl2.misc.hmac.prototype.update=function(a){this.aa=true;this.R.update(a)};sjcl2.misc.hmac.prototype.digest=function(){var a=this.R.finalize(),a=new this.W(this.w[1]).update(a).finalize();this.reset();return a};sjcl2.misc.pbkdf2=function(a,b,c,d,e){c=c||1e4;if(0>d||0>c)throw new sjcl2.exception.invalid("invalid params to pbkdf2");"string"===typeof a&&(a=sjcl2.codec.utf8String.toBits(a));"string"===typeof b&&(b=sjcl2.codec.utf8String.toBits(b));e=e||sjcl2.misc.hmac;a=new e(a);var f,g,h,k,l=[],n=sjcl2.bitArray;for(k=1;32*l.length<(d||1);k++){e=f=a.encrypt(n.concat(b,[k]));for(g=1;g<c;g++)for(f=a.encrypt(f),h=0;h<f.length;h++)e[h]^=f[h];l=l.concat(e)}d&&(l=n.clamp(l,d));return l};sjcl2.prng=function(a){this.c=[new sjcl2.hash.sha256];this.m=[0];this.P=0;this.H={};this.N=0;this.U={};this.Z=this.f=this.o=this.ha=0;this.b=[0,0,0,0,0,0,0,0];this.h=[0,0,0,0];this.L=void 0;this.M=a;this.D=false;this.K={progress:{},seeded:{}};this.u=this.ga=0;this.I=1;this.J=2;this.ca=65536;this.T=[0,48,64,96,128,192,256,384,512,768,1024];this.da=3e4;this.ba=80};sjcl2.prng.prototype={randomWords:function(a,b){var c=[],d;d=this.isReady(b);var e;if(d===this.u)throw new sjcl2.exception.notReady("generator isn't seeded");if(d&this.J){d=!(d&this.I);e=[];var f=0,g;this.Z=e[0]=new Date().valueOf()+this.da;for(g=0;16>g;g++)e.push(4294967296*Math.random()|0);for(g=0;g<this.c.length&&(e=e.concat(this.c[g].finalize()),f+=this.m[g],this.m[g]=0,d||!(this.P&1<<g));g++);this.P>=1<<this.c.length&&(this.c.push(new sjcl2.hash.sha256),this.m.push(0));this.f-=f;f>this.o&&(this.o=f);this.P++;this.b=sjcl2.hash.sha256.hash(this.b.concat(e));this.L=new sjcl2.cipher.aes(this.b);for(d=0;4>d&&(this.h[d]=this.h[d]+1|0,!this.h[d]);d++);}for(d=0;d<a;d+=4)0===(d+1)%this.ca&&y(this),e=z(this),c.push(e[0],e[1],e[2],e[3]);y(this);return c.slice(0,a)},setDefaultParanoia:function(a,b){if(0===a&&"Setting paranoia=0 will ruin your security; use it only for testing"!==b)throw new sjcl2.exception.invalid("Setting paranoia=0 will ruin your security; use it only for testing");this.M=a},addEntropy:function(a,b,c){c=c||"user";var d,e,f=new Date().valueOf(),g=this.H[c],h=this.isReady(),k=0;d=this.U[c];void 0===d&&(d=this.U[c]=this.ha++);void 0===g&&(g=this.H[c]=0);this.H[c]=(this.H[c]+1)%this.c.length;switch(typeof a){case"number":void 0===b&&(b=1);this.c[g].update([d,this.N++,1,b,f,1,a|0]);break;case"object":c=Object.prototype.toString.call(a);if("[object Uint32Array]"===c){e=[];for(c=0;c<a.length;c++)e.push(a[c]);a=e}else for("[object Array]"!==c&&(k=1),c=0;c<a.length&&!k;c++)"number"!==typeof a[c]&&(k=1);if(!k){if(void 0===b)for(c=b=0;c<a.length;c++)for(e=a[c];0<e;)b++,e=e>>>1;this.c[g].update([d,this.N++,2,b,f,a.length].concat(a))}break;case"string":void 0===b&&(b=a.length);this.c[g].update([d,this.N++,3,b,f,a.length]);this.c[g].update(a);break;default:k=1}if(k)throw new sjcl2.exception.bug("random: addEntropy only supports number, array of numbers or string");this.m[g]+=b;this.f+=b;h===this.u&&(this.isReady()!==this.u&&A("seeded",Math.max(this.o,this.f)),A("progress",this.getProgress()))},isReady:function(a){a=this.T[void 0!==a?a:this.M];return this.o&&this.o>=a?this.m[0]>this.ba&&new Date().valueOf()>this.Z?this.J|this.I:this.I:this.f>=a?this.J|this.u:this.u},getProgress:function(a){a=this.T[a?a:this.M];return this.o>=a?1:this.f>a?1:this.f/a},startCollectors:function(){if(!this.D){this.a={loadTimeCollector:B(this,this.ma),mouseCollector:B(this,this.oa),keyboardCollector:B(this,this.la),accelerometerCollector:B(this,this.ea),touchCollector:B(this,this.qa)};if(window.addEventListener)window.addEventListener("load",this.a.loadTimeCollector,false),window.addEventListener("mousemove",this.a.mouseCollector,false),window.addEventListener("keypress",this.a.keyboardCollector,false),window.addEventListener("devicemotion",this.a.accelerometerCollector,false),window.addEventListener("touchmove",this.a.touchCollector,false);else if(document.attachEvent)document.attachEvent("onload",this.a.loadTimeCollector),document.attachEvent("onmousemove",this.a.mouseCollector),document.attachEvent("keypress",this.a.keyboardCollector);else throw new sjcl2.exception.bug("can't attach event");this.D=true}},stopCollectors:function(){this.D&&(window.removeEventListener?(window.removeEventListener("load",this.a.loadTimeCollector,false),window.removeEventListener("mousemove",this.a.mouseCollector,false),window.removeEventListener("keypress",this.a.keyboardCollector,false),window.removeEventListener("devicemotion",this.a.accelerometerCollector,false),window.removeEventListener("touchmove",this.a.touchCollector,false)):document.detachEvent&&(document.detachEvent("onload",this.a.loadTimeCollector),document.detachEvent("onmousemove",this.a.mouseCollector),document.detachEvent("keypress",this.a.keyboardCollector)),this.D=false)},addEventListener:function(a,b){this.K[a][this.ga++]=b},removeEventListener:function(a,b){var c,d,e=this.K[a],f=[];for(d in e)e.hasOwnProperty(d)&&e[d]===b&&f.push(d);for(c=0;c<f.length;c++)d=f[c],delete e[d]},la:function(){C(this,1)},oa:function(a){var b,c;try{b=a.x||a.clientX||a.offsetX||0,c=a.y||a.clientY||a.offsetY||0}catch(d){c=b=0}0!=b&&0!=c&&this.addEntropy([b,c],2,"mouse");C(this,0)},qa:function(a){a=a.touches[0]||a.changedTouches[0];this.addEntropy([a.pageX||a.clientX,a.pageY||a.clientY],1,"touch");C(this,0)},ma:function(){C(this,2)},ea:function(a){a=a.accelerationIncludingGravity.x||a.accelerationIncludingGravity.y||a.accelerationIncludingGravity.z;if(window.orientation){var b=window.orientation;"number"===typeof b&&this.addEntropy(b,1,"accelerometer")}a&&this.addEntropy(a,2,"accelerometer");C(this,0)}};function A(a,b){var c,d=sjcl2.random.K[a],e=[];for(c in d)d.hasOwnProperty(c)&&e.push(d[c]);for(c=0;c<e.length;c++)e[c](b)}function C(a,b){"undefined"!==typeof window&&window.performance&&"function"===typeof window.performance.now?a.addEntropy(window.performance.now(),b,"loadtime"):a.addEntropy(new Date().valueOf(),b,"loadtime")}function y(a){a.b=z(a).concat(z(a));a.L=new sjcl2.cipher.aes(a.b)}function z(a){for(var b=0;4>b&&(a.h[b]=a.h[b]+1|0,!a.h[b]);b++);return a.L.encrypt(a.h)}function B(a,b){return function(){b.apply(a,arguments)}}sjcl2.random=new sjcl2.prng(6);a:try{if(G="undefined"!==typeof module&&module.exports){try{H=__require2("crypto")}catch(a){H=null}G=E=H}if(G&&E.randomBytes)D=E.randomBytes(128),D=new Uint32Array(new Uint8Array(D).buffer),sjcl2.random.addEntropy(D,1024,"crypto['randomBytes']");else if("undefined"!==typeof window&&"undefined"!==typeof Uint32Array){F=new Uint32Array(32);if(window.crypto&&window.crypto.getRandomValues)window.crypto.getRandomValues(F);else if(window.msCrypto&&window.msCrypto.getRandomValues)window.msCrypto.getRandomValues(F);else break a;sjcl2.random.addEntropy(F,1024,"crypto['getRandomValues']")}}catch(a){"undefined"!==typeof window&&window.console&&(console.log("There was an error collecting entropy from the browser:"),console.log(a))}var D;var E;var F;var G;var H;sjcl2.json={defaults:{v:1,iter:1e4,ks:128,ts:64,mode:"ccm",adata:"",cipher:"aes"},ja:function(a,b,c,d){c=c||{};d=d||{};var e=sjcl2.json,f=e.g({iv:sjcl2.random.randomWords(4,0)},e.defaults),g;e.g(f,c);c=f.adata;"string"===typeof f.salt&&(f.salt=sjcl2.codec.base64.toBits(f.salt));"string"===typeof f.iv&&(f.iv=sjcl2.codec.base64.toBits(f.iv));if(!sjcl2.mode[f.mode]||!sjcl2.cipher[f.cipher]||"string"===typeof a&&100>=f.iter||64!==f.ts&&96!==f.ts&&128!==f.ts||128!==f.ks&&192!==f.ks&&256!==f.ks||2>f.iv.length||4<f.iv.length)throw new sjcl2.exception.invalid("json encrypt: invalid parameters");"string"===typeof a?(g=sjcl2.misc.cachedPbkdf2(a,f),a=g.key.slice(0,f.ks/32),f.salt=g.salt):sjcl2.ecc&&a instanceof sjcl2.ecc.elGamal.publicKey&&(g=a.kem(),f.kemtag=g.tag,a=g.key.slice(0,f.ks/32));"string"===typeof b&&(b=sjcl2.codec.utf8String.toBits(b));"string"===typeof c&&(f.adata=c=sjcl2.codec.utf8String.toBits(c));g=new sjcl2.cipher[f.cipher](a);e.g(d,f);d.key=a;f.ct="ccm"===f.mode&&sjcl2.arrayBuffer&&sjcl2.arrayBuffer.ccm&&b instanceof ArrayBuffer?sjcl2.arrayBuffer.ccm.encrypt(g,b,f.iv,c,f.ts):sjcl2.mode[f.mode].encrypt(g,b,f.iv,c,f.ts);return f},encrypt:function(a,b,c,d){var e=sjcl2.json,f=e.ja.apply(e,arguments);return e.encode(f)},ia:function(a,b,c,d){c=c||{};d=d||{};var e=sjcl2.json;b=e.g(e.g(e.g({},e.defaults),b),c,true);var f,g;f=b.adata;"string"===typeof b.salt&&(b.salt=sjcl2.codec.base64.toBits(b.salt));"string"===typeof b.iv&&(b.iv=sjcl2.codec.base64.toBits(b.iv));if(!sjcl2.mode[b.mode]||!sjcl2.cipher[b.cipher]||"string"===typeof a&&100>=b.iter||64!==b.ts&&96!==b.ts&&128!==b.ts||128!==b.ks&&192!==b.ks&&256!==b.ks||!b.iv||2>b.iv.length||4<b.iv.length)throw new sjcl2.exception.invalid("json decrypt: invalid parameters");"string"===typeof a?(g=sjcl2.misc.cachedPbkdf2(a,b),a=g.key.slice(0,b.ks/32),b.salt=g.salt):sjcl2.ecc&&a instanceof sjcl2.ecc.elGamal.secretKey&&(a=a.unkem(sjcl2.codec.base64.toBits(b.kemtag)).slice(0,b.ks/32));"string"===typeof f&&(f=sjcl2.codec.utf8String.toBits(f));g=new sjcl2.cipher[b.cipher](a);f="ccm"===b.mode&&sjcl2.arrayBuffer&&sjcl2.arrayBuffer.ccm&&b.ct instanceof ArrayBuffer?sjcl2.arrayBuffer.ccm.decrypt(g,b.ct,b.iv,b.tag,f,b.ts):sjcl2.mode[b.mode].decrypt(g,b.ct,b.iv,f,b.ts);e.g(d,b);d.key=a;return 1===c.raw?f:sjcl2.codec.utf8String.fromBits(f)},decrypt:function(a,b,c,d){var e=sjcl2.json;return e.ia(a,e.decode(b),c,d)},encode:function(a){var b,c="{",d="";for(b in a)if(a.hasOwnProperty(b)){if(!b.match(/^[a-z0-9]+$/i))throw new sjcl2.exception.invalid("json encode: invalid property name");c+=d+'"'+b+'":';d=",";switch(typeof a[b]){case"number":case"boolean":c+=a[b];break;case"string":c+='"'+escape(a[b])+'"';break;case"object":c+='"'+sjcl2.codec.base64.fromBits(a[b],0)+'"';break;default:throw new sjcl2.exception.bug("json encode: unsupported type")}}return c+"}"},decode:function(a){a=a.replace(/\\s/g,"");if(!a.match(/^\\{.*\\}$/))throw new sjcl2.exception.invalid("json decode: this isn't json!");a=a.replace(/^\\{|\\}$/g,"").split(/,/);var b={},c,d;for(c=0;c<a.length;c++){if(!(d=a[c].match(/^\\s*(?:(["']?)([a-z][a-z0-9]*)\\1)\\s*:\\s*(?:(-?\\d+)|"([a-z0-9+\\/%*_.@=\\-]*)"|(true|false))$/i)))throw new sjcl2.exception.invalid("json decode: this isn't json!");null!=d[3]?b[d[2]]=parseInt(d[3],10):null!=d[4]?b[d[2]]=d[2].match(/^(ct|adata|salt|iv)$/)?sjcl2.codec.base64.toBits(d[4]):unescape(d[4]):null!=d[5]&&(b[d[2]]="true"===d[5])}return b},g:function(a,b,c){void 0===a&&(a={});if(void 0===b)return a;for(var d in b)if(b.hasOwnProperty(d)){if(c&&void 0!==a[d]&&a[d]!==b[d])throw new sjcl2.exception.invalid("required parameter overridden");a[d]=b[d]}return a},sa:function(a,b){var c={},d;for(d in a)a.hasOwnProperty(d)&&a[d]!==b[d]&&(c[d]=a[d]);return c},ra:function(a,b){var c={},d;for(d=0;d<b.length;d++)void 0!==a[b[d]]&&(c[b[d]]=a[b[d]]);return c}};sjcl2.encrypt=sjcl2.json.encrypt;sjcl2.decrypt=sjcl2.json.decrypt;sjcl2.misc.pa={};sjcl2.misc.cachedPbkdf2=function(a,b){var c=sjcl2.misc.pa,d;b=b||{};d=b.iter||1e3;c=c[a]=c[a]||{};d=c[d]=c[d]||{firstSalt:b.salt&&b.salt.length?b.salt.slice(0):sjcl2.random.randomWords(2,0)};c=void 0===b.salt?d.firstSalt:b.salt;d[c]=d[c]||sjcl2.misc.pbkdf2(a,c,b.iter);return{key:d[c].slice(0),salt:c.slice(0)}};"undefined"!==typeof module&&module.exports&&(module.exports=sjcl2);"function"===typeof define&&define([],function(){return sjcl2})}});var require_browser=__commonJS({"node_modules/web-worker/cjs/browser.js"(exports,module){module.exports=Worker}});var EventHandler=class{constructor(data){this.pushToState={};this.data={};this.triggers={};this.setState=updateObj=>{Object.assign(this.data,updateObj);for(const prop of Object.getOwnPropertyNames(updateObj)){if(this.triggers[prop])this.triggers[prop].forEach(obj=>obj.onchange(this.data[prop]))}return this.data};this.setValue=(key,value)=>{this.data[key]=value;if(this.triggers[key])this.triggers[key].forEach(obj=>obj.onchange(this.data[key]))};this.subscribeTrigger=(key,onchange)=>{if(key){if(!this.triggers[key]){this.triggers[key]=[]}let l=this.triggers[key].length;this.triggers[key].push({sub:l,onchange});return this.triggers[key].length-1}else return void 0};this.unsubscribeTrigger=(key,sub)=>{let triggers=this.triggers[key];if(triggers){if(!sub)delete this.triggers[key];else{let sub2=void 0;let obj=triggers.find((o,i)=>{if(o.sub===sub2){sub2=i;return true}});if(obj)triggers.splice(sub2,1);if(this.onRemoved)this.onRemoved(obj);return true}}};this.subscribeTriggerOnce=(key,onchange)=>{let sub;let changed=value=>{onchange(value);this.unsubscribeTrigger(key,sub)};sub=this.subscribeTrigger(key,changed)};this.getTrigger=(key,sub)=>{for(const s in this.triggers[key]){if(this.triggers[key][s].sub===sub)return this.triggers[key][s]}};if(typeof data==="object")this.data=data}};var state=new EventHandler;var GraphNode=class{constructor(properties,parent2,graph){this.__node={tag:\`node\${Math.floor(Math.random()*1e15)}\`,unique:\`\${Math.random()}\`,state};this.__subscribe=(callback,key,subInput,bound,target)=>{const subscribeToFunction=(k,setTarget=(callback2,target2)=>callback2,triggerCallback=callback)=>{let sub=this.__node.state.subscribeTrigger(k,triggerCallback);let trigger=this.__node.state.getTrigger(k,sub);trigger.source=this.__node.tag;if(key)trigger.key=key;trigger.target=setTarget(callback);if(bound)trigger.bound=bound;return sub};const subscribeToGraph=callback2=>{let fn=this.__node.graph.get(callback2);if(!fn&&callback2.includes(".")){let n=this.__node.graph.get(callback2.substring(0,callback2.lastIndexOf(".")));let key2=callback2.substring(callback2.lastIndexOf(".")+1);if(n&&typeof n[key2]==="function")callback2=(...args)=>{return n[key2](...args)}}};if(key){if(!this.__node.localState){this.__addLocalState(this)}if(typeof callback==="string"){if(typeof this[callback]==="function")callback=this[callback];else if(this.__node.graph)subscribeToGraph(callback)}let sub;let k=subInput?this.__node.unique+"."+key+"input":this.__node.unique+"."+key;if(typeof callback==="function")sub=subscribeToFunction(k);else if(callback?.__node)sub=subscribeToFunction(k,(callback2,target2)=>target2?target2:callback2.__node.unique,state2=>{if(callback.__operator)callback.__operator(state2)});return sub}else{if(typeof callback==="string"){if(this.__node.graph)callback=this.__node.graph.get(callback);else callback=this.__node.graph.nodes.get(callback)}let sub;let k=subInput?this.__node.unique+"input":this.__node.unique;if(typeof callback==="function")sub=subscribeToFunction(k);else if(callback?.__node)sub=subscribeToFunction(k,(callback2,target2)=>target2?target2:callback2.__node.unique,state2=>{if(callback.__operator)callback.__operator(state2)});return sub}};this.__unsubscribe=(sub,key,subInput)=>{if(key){return this.__node.state.unsubscribeTrigger(subInput?this.__node.unique+"."+key+"input":this.__node.unique+"."+key,sub)}else return this.__node.state.unsubscribeTrigger(subInput?this.__node.unique+"input":this.__node.unique,sub)};this.__setOperator=fn=>{fn=fn.bind(this);this.__operator=(...args)=>{if(this.__node.inputState)this.__node.state.setValue(this.__node.unique+"input",args);let result=fn(...args);if(this.__node.state.triggers[this.__node.unique]){if(typeof result?.then==="function"){result.then(res=>{if(res!==void 0)this.__node.state.setValue(this.__node.unique,res)}).catch(console.error)}else if(result!==void 0)this.__node.state.setValue(this.__node.unique,result)}return result};if(!this.__subscribedToParent){if(this.__parent instanceof GraphNode&&this.__parent.__operator){let sub=this.__parent.__subscribe(this);let ondelete=()=>{this.__parent?.__unsubscribe(sub);delete this.__subscribedToParent};this.__addOndisconnected(ondelete);this.__subscribedToParent=true}}return this.__operator};this.__proxyObject=obj=>{let allProps=getAllProperties(obj);for(const k of allProps){if(typeof this[k]==="undefined"){if(typeof obj[k]==="function"){this[k]=(...args)=>{if(this.__node.inputState)this.__node.state.setValue(this.__node.unique+"."+k+"input",args);let result=obj[k](...args);if(this.__node.state.triggers[this.__node.unique+"."+k]){if(typeof result?.then==="function"){result.then(res=>{this.__node.state.setValue(this.__node.unique+"."+k,res)}).catch(console.error)}else this.__node.state.setValue(this.__node.unique+"."+k,result)}return result}}else{let definition={get:()=>{return obj[k]},set:value=>{obj[k]=value;if(this.__node.state.triggers[this.__node.unique+"."+k])this.__node.state.setValue(this.__node.unique+"."+k,value)},enumerable:true,configurable:true};Object.defineProperty(this,k,definition)}}}};let orig=properties;if(typeof properties==="function"){properties={__operator:properties,__node:{forward:true,tag:properties.name}}}else if(typeof properties==="string"){if(graph?.get(properties)){properties=graph.get(properties)}}if(!properties.__node.initial)properties.__node.initial=orig;if(typeof properties==="object"){if(properties.__props){if(typeof properties.__props==="function")properties.__props=new properties.__props;if(typeof properties.__props==="object"){this.__proxyObject(properties.__props)}}if(typeof properties.__node==="string"){if(graph?.get(properties.__node.tag)){properties=graph.get(properties.__node.tag)}else properties.__node={}}else if(!properties.__node)properties.__node={};if(!properties.__parent&&parent2)properties.__parent=parent2;if(graph){properties.__node.graph=graph}if(properties.__operator){if(typeof properties.__operator==="string"){if(graph){let n=graph.get(properties.__operator);if(n)properties.__operator=n.__operator;if(!properties.__node.tag&&properties.__operator.name)properties.__node.tag=properties.__operator.name}}if(typeof properties.__operator==="function")properties.__operator=this.__setOperator(properties.__operator)}if(!properties.__node.tag){if(properties.__operator?.name)properties.__node.tag=properties.__operator.name;else properties.__node.tag=\`node\${Math.floor(Math.random()*1e15)}\`}if(parent2?.__node&&!(parent2 instanceof Graph||properties instanceof Graph))properties.__node.tag=parent2.__node.tag+"."+properties.__node.tag;if(parent2 instanceof Graph&&properties instanceof Graph){if(properties.__node.loaders)Object.assign(parent2.__node.loaders?parent2.__node.loaders:{},properties.__node.loaders);if(parent2.__node.mapGraphs){properties.__node.nodes.forEach(n=>{parent2.set(properties.__node.tag+"."+n.__node.tag,n)});let ondelete=()=>{properties.__node.nodes.forEach(n=>{parent2.__node.nodes.delete(properties.__node.tag+"."+n.__node.tag)})};this.__addOndisconnected(ondelete)}}properties.__node=Object.assign(this.__node,properties.__node);let keys=Object.getOwnPropertyNames(properties);for(const key of keys){this[key]=properties[key]}if(typeof properties.default==="function"&&!properties.__operator){let fn=properties.default.bind(this);this.default=(...args)=>{if(this.__node.inputState)this.__node.state.setValue(this.__node.unique+"input",args);let result=fn(...args);if(typeof result?.then==="function"){result.then(res=>{if(res!==void 0)this.__node.state.setValue(this.__node.unique,res)}).catch(console.error)}else if(result!==void 0)this.__node.state.setValue(this.__node.unique,result);return result};properties.default=this.default}if(properties instanceof Graph)this.__node.source=properties}}__addLocalState(props){if(!props)return;if(!this.__node.localState){this.__node.localState={}}let localState=this.__node.localState;for(let k in props){if(this.__props&&this.__props[k])continue;if(typeof props[k]==="function"){if(!k.startsWith("_")){let fn=props[k].bind(this);props[k]=(...args)=>{if(this.__node.inputState)this.__node.state.setValue(this.__node.unique+"."+k+"input",args);let result=fn(...args);if(typeof result?.then==="function"){if(this.__node.state.triggers[this.__node.unique+"."+k])result.then(res=>{this.__node.state.setValue(this.__node.unique+"."+k,res)}).catch(console.error)}else if(this.__node.state.triggers[this.__node.unique+"."+k])this.__node.state.setValue(this.__node.unique+"."+k,result);return result};this[k]=props[k]}}else{localState[k]=props[k];let definition={get:()=>{return localState[k]},set:v=>{localState[k]=v;if(this.__node.state.triggers[this.__node.unique+"."+k])this.__node.state.setValue(this.__node.unique+"."+k,v)},enumerable:true,configurable:true};Object.defineProperty(this,k,definition);if(typeof this.__node.initial==="object"){let dec=Object.getOwnPropertyDescriptor(this.__node.initial,k);if(dec===void 0||dec?.configurable){Object.defineProperty(this.__node.initial,k,definition)}}}}}__addOnconnected(callback){if(Array.isArray(this.__ondisconnected)){this.__onconnected.push(callback)}else if(typeof this.__onconnected==="function"){this.__onconnected=[callback,this.__onconnected]}else this.__onconnected=callback}__addOndisconnected(callback){if(Array.isArray(this.__ondisconnected)){this.__ondisconnected.push(callback)}else if(typeof this.__ondisconnected==="function"){this.__ondisconnected=[callback,this.__ondisconnected]}else this.__ondisconnected=callback}__callConnected(node=this){if(typeof this.__onconnected==="function"){this.__onconnected(this)}else if(Array.isArray(this.__onconnected)){this.__onconnected.forEach(o=>{o(this)})}}__callDisconnected(node=this){if(typeof this.__ondisconnected==="function")this.__ondisconnected(this);else if(Array.isArray(this.__ondisconnected)){this.__ondisconnected.forEach(o=>{o(this)})}}};var Graph=class{constructor(options){this.__node={tag:\`graph\${Math.floor(Math.random()*1e15)}\`,nodes:new Map,state};this.init=options2=>{if(options2){recursivelyAssign(this.__node,options2);if(options2.tree)this.setTree(options2.tree)}};this.setTree=tree=>{this.__node.tree=Object.assign(this.__node.tree?this.__node.tree:{},tree);let cpy=Object.assign({},tree);if(cpy.__node)delete cpy.__node;let listeners=this.recursiveSet(cpy,this,void 0,tree);if(tree.__node){if(!tree.__node.tag)tree.__node._tag=\`tree\${Math.floor(Math.random()*1e15)}\`;else if(!this.get(tree.__node.tag)){let node=new GraphNode(tree,this,this);this.set(node.__node.tag,node);for(const l in this.__node.loaders){if(typeof this.__node.loaders[l]==="object"){if(this.__node.loaders[l].init)this.__node.loaders[l](node,parent,this,this.__node.tree,tree);if(this.__node.loaders[l].connected)node.__addOnconnected(this.__node.loaders[l].connect);if(this.__node.loaders[l].disconnected)node.__addOndisconnected(this.__node.loaders[l].disconnect)}else if(typeof this.__node.loaders==="function")this.__node.loaders[l](node,this,this,tree,tree,tree.__node.tag)}if(node.__listeners){listeners[node.__node.tag]=node.__listeners}}}else if(tree.__listeners){this.setListeners(tree.__listeners)}this.setListeners(listeners);return cpy};this.setLoaders=(loaders2,replace)=>{if(replace)this.__node.loaders=loaders2;else Object.assign(this.__node.loaders,loaders2);return this.__node.loaders};this.add=(properties,parent2)=>{let listeners={};if(typeof parent2==="string")parent2=this.get(parent2);if(typeof properties==="function")properties={__operator:properties};else if(typeof properties==="string")properties=this.__node.tree[properties];let p=Object.assign({},properties);if(!p.__node)p.__node={};p.__node.initial=properties;if(typeof properties==="object"&&(!p?.__node?.tag||!this.get(p.__node.tag))){let node=new GraphNode(p,parent2,this);this.set(node.__node.tag,node);for(const l in this.__node.loaders){if(typeof this.__node.loaders[l]==="object"){if(this.__node.loaders[l].init)this.__node.loaders[l](node,parent2,this,this.__node.tree,properties,node.__node.tag);if(this.__node.loaders[l].connected)node.__addOnconnected(this.__node.loaders[l].connect);if(this.__node.loaders[l].disconnected)node.__addOndisconnected(this.__node.loaders[l].disconnect)}else if(typeof this.__node.loaders==="function")this.__node.loaders[l](node,parent2,this,this.__node.tree,properties,node.__node.tag)}this.__node.tree[node.__node.tag]=properties;if(node.__listeners){listeners[node.__node.tag]=node.__listeners}if(node.__children){node.__children=Object.assign({},node.__children);this.recursiveSet(node.__children,node,listeners,node.__children)}this.setListeners(listeners);node.__callConnected();return node}return};this.recursiveSet=(t,parent2,listeners={},origin)=>{let keys=Object.getOwnPropertyNames(origin);for(const key of keys){if(key.includes("__"))continue;let p=origin[key];if(Array.isArray(p))continue;if(typeof p==="function")p={__operator:p};else if(typeof p==="string")p=this.__node.tree[p];else if(typeof p==="boolean")p=this.__node.tree[key];if(typeof p==="object"){p=Object.assign({},p);if(!p.__node)p.__node={};if(!p.__node.tag)p.__node.tag=key;p.__node.initial=t[key];if(this.get(p.__node.tag)&&!(parent2?.__node&&this.get(parent2.__node.tag+"."+p.__node.tag))||parent2?.__node&&this.get(parent2.__node.tag+"."+p.__node.tag))continue;let node=new GraphNode(p,parent2,this);this.set(node.__node.tag,node);for(const l in this.__node.loaders){this.__node.loaders[l](node,parent2,this,t,t[key],key)}t[key]=node;this.__node.tree[node.__node.tag]=p;if(node.__listeners){listeners[node.__node.tag]=node.__listeners}if(node.__children){node.__children=Object.assign({},node.__children);this.recursiveSet(node.__children,node,listeners,node.__children)}node.__callConnected()}}return listeners};this.remove=(node,clearListeners=true)=>{this.unsubscribe(node);if(typeof node==="string")node=this.get(node);if(node instanceof GraphNode){this.delete(node.__node.tag);delete this.__node.tree[node.__node.tag];if(clearListeners){this.clearListeners(node)}node.__callDisconnected();const recursiveRemove=t=>{for(const key in t){this.unsubscribe(t[key]);this.delete(t[key].__node.tag);delete this.__node.tree[t[key].__node.tag];this.delete(key);delete this.__node.tree[key];t[key].__node.tag=t[key].__node.tag.substring(t[key].__node.tag.lastIndexOf(".")+1);if(clearListeners){this.clearListeners(t[key])}t[key].__callDisconnected();if(t[key].__children){recursiveRemove(t[key].__children)}}};if(node.__children){recursiveRemove(node.__children)}}if(node?.__node.tag&&node?.__parent){delete node?.__parent;node.__node.tag=node.__node.tag.substring(node.__node.tag.indexOf(".")+1)}return node};this.run=(node,...args)=>{if(typeof node==="string"){let nd=this.get(node);if(!nd&&node.includes(".")){nd=this.get(node.substring(0,node.lastIndexOf(".")));if(typeof nd?.[node.substring(node.lastIndexOf(".")+1)]==="function")return nd[node.substring(node.lastIndexOf(".")+1)](...args)}else if(nd?.__operator)return nd.__operator(...args)}if(node?.__operator){return node?.__operator(...args)}};this.setListeners=listeners=>{for(const key in listeners){let node=this.get(key);if(typeof listeners[key]==="object"){for(const k in listeners[key]){let n=this.get(k);let sub;if(typeof listeners[key][k]!=="object")listeners[key][k]={__callback:listeners[key][k]};else if(!listeners[key][k].__callback){for(const kk in listeners[key][k]){if(typeof listeners[key][k][kk]!=="object"){listeners[key][k][kk]={__callback:listeners[key][k][kk]};if(listeners[key][k][kk].__callback===true)listeners[key][k][kk].__callback=node.__operator}let nn=this.get(kk);if(nn){if(!nn){let tag=k.substring(0,k.lastIndexOf("."));nn=this.get(tag);if(n){sub=this.subscribe(nn,listeners[key][k][kk].__callback,k.substring(k.lastIndexOf(".")+1),listeners[key][k][kk].inputState,key,k);if(typeof node.__listeners[k][kk]!=="object")node.__listeners[k][kk]={__callback:listeners[key][k][kk].__callback,inputState:listeners[key][k][kk]?.inputState};node.__listeners[k][kk].sub=sub}}else{sub=this.subscribe(nn,listeners[key][k][kk].__callback,void 0,listeners[key][k].inputState,key,k);if(typeof node.__listeners[k][kk]!=="object")node.__listeners[k][kk]={__callback:listeners[key][k][kk].__callback,inputState:listeners[key][k][kk]?.inputState};node.__listeners[k][kk].sub=sub}}}}if(listeners[key][k].__callback){if(listeners[key][k].__callback===true)listeners[key][k].__callback=node.__operator;if(typeof listeners[key][k].__callback==="function")listeners[key][k].__callback=listeners[key][k].__callback.bind(node);if(typeof node.__listeners!=="object")node.__listeners={};if(!n){let tag=k.substring(0,k.lastIndexOf("."));n=this.get(tag);if(n){sub=this.subscribe(n,listeners[key][k].__callback,k.substring(k.lastIndexOf(".")+1),listeners[key][k].inputState,key,k);if(typeof node.__listeners[k]!=="object")node.__listeners[k]={__callback:listeners[key][k].__callback,inputState:listeners[key][k]?.inputState};node.__listeners[k].sub=sub}}else{sub=this.subscribe(n,listeners[key][k].__callback,void 0,listeners[key][k].inputState,key,k);if(typeof node.__listeners[k]!=="object")node.__listeners[k]={__callback:listeners[key][k].__callback,inputState:listeners[key][k]?.inputState};node.__listeners[k].sub=sub}}}}}};this.clearListeners=(node,listener)=>{if(typeof node==="string")node=this.get(node);if(node?.__listeners){for(const key in node.__listeners){if(listener&&key!==listener)continue;if(typeof node.__listeners[key].sub!=="number")continue;let n=this.get(key);if(!n){n=this.get(key.substring(0,key.lastIndexOf(".")));if(n){if(!node.__listeners[key].__callback){for(const k in node.__listeners[key]){this.unsubscribe(n,node.__listeners[key][k].sub,key.substring(key.lastIndexOf(".")+1),node.__listeners[key][k].inputState)}}else this.unsubscribe(n,node.__listeners[key].sub,key.substring(key.lastIndexOf(".")+1),node.__listeners[key].inputState)}}else{if(!node.__listeners[key].__callback){for(const k in node.__listeners[key]){this.unsubscribe(n,node.__listeners[key][k].sub,void 0,node.__listeners[key][k].inputState)}}else this.unsubscribe(n,node.__listeners[key].sub,void 0,node.__listeners[key].inputState)}delete node.__listeners[key]}}};this.get=tag=>{return this.__node.nodes.get(tag)};this.set=(tag,node)=>{return this.__node.nodes.set(tag,node)};this.delete=tag=>{return this.__node.nodes.delete(tag)};this.getProps=(node,getInitial)=>{if(typeof node==="string")node=this.get(node);if(node instanceof GraphNode){let cpy;if(getInitial)cpy=Object.assign({},this.__node.tree[node.__node.tag]);else{cpy=Object.assign({},node);delete cpy.__unsubscribe;delete cpy.__setOperator;delete cpy.__node;delete cpy.__subscribeState;delete cpy.__subscribe}}};this.subscribe=(node,callback,key,subInput,target,bound)=>{let nd=node;if(!(node instanceof GraphNode))nd=this.get(node);let sub;if(typeof callback==="string"){if(target){let method=this.get(target)?.[callback];if(typeof method==="function")callback=method}else callback=this.get(callback)?.__operator}if(nd instanceof GraphNode){sub=nd.__subscribe(callback,key,subInput,target,bound);let ondelete=()=>{nd.__unsubscribe(sub,key,subInput)};nd.__addOndisconnected(ondelete)}else if(typeof node==="string"){if(this.get(node)){if(callback instanceof GraphNode&&callback.__operator){sub=this.get(node).__subscribe(callback.__operator,key,subInput,target,bound);let ondelete=()=>{this.get(node).__unsubscribe(sub)};callback.__addOndisconnected(ondelete)}else if(typeof callback==="function"||typeof callback==="string"){sub=this.get(node).__subscribe(callback,key,subInput,target,bound);this.__node.state.getTrigger(this.get(node).__node.unique,sub).source=node}}else{if(typeof callback==="string")callback=this.__node.nodes.get(callback).__operator;if(typeof callback==="function")sub=this.__node.state.subscribeTrigger(node,callback)}}return sub};this.unsubscribe=(node,sub,key,subInput)=>{if(node instanceof GraphNode){return node.__unsubscribe(sub,key,subInput)}else return this.get(node)?.__unsubscribe(sub,key,subInput)};this.setState=update=>{this.__node.state.setState(update)};this.init(options)}};function recursivelyAssign(target,obj){for(const key in obj){if(obj[key]?.constructor.name==="Object"&&!Array.isArray(obj[key])){if(target[key]?.constructor.name==="Object"&&!Array.isArray(target[key]))recursivelyAssign(target[key],obj[key]);else target[key]=recursivelyAssign({},obj[key])}else{target[key]=obj[key]}}return target}function getAllProperties(obj){var allProps=[],curr=obj;do{var props=Object.getOwnPropertyNames(curr);props.forEach(function(prop){if(allProps.indexOf(prop)===-1)allProps.push(prop)})}while(curr=Object.getPrototypeOf(curr));return allProps}var backprop=(node,parent2,graph)=>{if(node.__node.backward&&parent2 instanceof GraphNode){graph.setListeners({[parent2.__node.tag]:{[node.__node.tag]:parent2}})}};var loop=(node,parent2,graph)=>{if(node.__operator&&!node.__node.looperSet){node.__node.looperSet=true;if(typeof node.__node.delay==="number"){let fn=node.__operator;node.__operator=(...args)=>{return new Promise((res,rej)=>{setTimeout(async()=>{res(await fn(...args))},node.__node.delay)})}}else if(node.__node.frame===true){let fn=node.__operator;node.__operator=(...args)=>{return new Promise((res,rej)=>{requestAnimationFrame(async()=>{res(await fn(...args))})})}}if(typeof node.__node.repeat==="number"||typeof node.__node.recursive==="number"){let fn=node.__operator;node.__operator=async(...args)=>{let i=node.__node.repeat?node.__node.repeat:node.__node.recursive;let result;let repeater=async(tick,...inp)=>{while(tick>0){if(node.__node.delay||node.__node.frame){fn(...inp).then(async res=>{if(node.__node.recursive){await repeater(tick,res)}else await repeater(tick,...inp)});break}else result=await fn(...args);tick--}};await repeater(i,...args);return result}}if(node.__node.loop&&typeof node.__node.loop==="number"){let fn=node.__operator;node.__operator=(...args)=>{if(!("looping"in node.__node))node.__node.looping=true;if(node.__node.looping){fn(...args);setTimeout(()=>{node.__operator(...args)},node.__node.loop)}};if(node.__node.looping)node.__operator();let ondelete=node2=>{if(node2.__node.looping)node2.__node.looping=false};node.__addOndisconnected(ondelete)}}};var animate=(node,parent2,graph)=>{if(node.__node.animate===true||node.__animation){let fn=node.__operator;node.__operator=(...args)=>{if(!("animating"in node.__node))node.__node.animating=true;if(node.__node.animating){if(typeof node.__animation==="function")node.__animation(...args);else fn(...args);requestAnimationFrame(()=>{node.__operator(...args)})}};if(node.__node.animating||(!("animating"in node.__node)||node.__node.animating)&&node.__animation)setTimeout(()=>{requestAnimationFrame(node.__operator())},10);let ondelete=node2=>{if(node2.__node.animating)node2.__node.animating=false};node.__addOndisconnected(ondelete)}};var branching=(node,parent2,graph)=>{if(typeof node.__node.branch==="object"&&node.__operator&&!node.__node.branchApplied){let fn=node.__operator;node.__node.branchApplied=true;node.__operator=(...args)=>{let result=fn(...args);for(const key in node.__node.branch){let triggered=()=>{if(typeof node.__node.branch[key].then==="function"){node.__node.branch[key].then(result)}else if(node.__node.branch[key].then instanceof GraphNode&&node.__node.branch[key].then.__operator){node.__node.branch[key].then.__operator(result)}else result=node.__node.branch[key].then};if(typeof node.__node.branch[key].if==="function"){if(node.__node.branch[key].if(result)){triggered()}}else if(node.__node.branch[key].if===result){triggered()}}return result}}if(node.__listeners){for(const key in node.__listeners){if(typeof node.__listeners[key]==="object"){if(node.__listeners[key].branch&&!node.__listeners[key].branchApplied){let fn=node.__listeners[key].callback;node.__listeners[key].branchApplied=true;node.__listeners.callback=ret=>{let triggered=()=>{if(typeof node.__listeners[key].branch.then==="function"){ret=node.__listeners[key].branch.then(ret)}else if(node.__listeners[key].branch.then instanceof GraphNode&&node.__listeners[key].branch.then.__operator){ret=node.__listeners[key].branch.then.__operator(ret)}else ret=node.__listeners[key].branch.then};if(typeof node.__listeners[key].branch.if==="function"){if(node.__listeners[key].branch.if(ret)){triggered()}}else if(node.__listeners[key].branch.if===ret){triggered()}return fn(ret)}}}}}};var triggerListenerOncreate=(node,parent2,graph)=>{if(node.__listeners){for(const key in node.__listeners){if(typeof node.__listeners[key]==="object"){if(node.__listeners[key].oncreate){node.__listeners[key].callback(node.__listeners[key].oncreate)}}}}};var bindListener=(node,parent2,graph)=>{if(node.__listeners){for(const key in node.__listeners){if(typeof node.__listeners[key]==="object"){if(typeof node.__listeners[key].binding==="object"){node.__listeners.callback=node.__listeners.callback.bind(node.__listeners[key].binding)}}}}};var transformListenerResult=(node,parent2,graph)=>{if(node.__listeners){for(const key in node.__listeners){if(typeof node.__listeners[key]==="object"){if(typeof node.__listeners[key].transform==="function"&&!node.__listeners[key].transformApplied){let fn=node.__listeners[key].callback;node.__listeners[key].transformApplied=true;node.__listeners.callback=ret=>{ret=node.__listeners[key].transform(ret);return fn(ret)}}}}}};var substitute__operator=(node,parent2,graph)=>{if(node.post&&!node.__operator){node.__setOperator(node.post)}else if(!node.__operator&&typeof node.get=="function"){node.__setOperator(node.get)}if(!node.get&&node.__operator){node.get=node.__operator}if(node.aliases){node.aliases.forEach(a=>{graph.set(a,node);let ondelete=node2=>{graph.__node.nodes.delete(a)};node.__addOndisconnected(ondelete)})}if(typeof graph.__node.tree[node.__node.tag]==="object"&&node.get)graph.__node.tree[node.__node.tag].get=node.get};var loaders={backprop,loop,animate,branching,triggerListenerOncreate,bindListener,transformListenerResult,substitute__operator};var Service=class extends Graph{constructor(options){super({...options,loaders:options?.loaders?Object.assign({...loaders},options.loaders):{...loaders}});this.name=\`service\${Math.floor(Math.random()*1e15)}\`;this.addServices=services=>{for(const s in services){if(typeof services[s]==="function")services[s]=new services[s];if(services[s]?.__node?.loaders)Object.assign(this.__node.loaders,services[s].__node.loaders);if(services[s]?.__node?.nodes){services[s].__node.nodes.forEach((n,tag)=>{if(!this.get(tag)){this.set(tag,n)}else this.set(s+"."+tag,n)});this.__node.nodes.forEach((n,k)=>{if(!services[s].__node.nodes.get(k))services[s].__node.nodes.set(k,n)});let set=this.set;this.set=(tag,node)=>{services[s].set(tag,node);return set(tag,node)};let del=this.delete;this.delete=tag=>{services[s].delete(tag);return del(tag)}}else if(typeof services[s]==="object"){this.setTree(services[s])}}};this.handleMethod=(route,method,args)=>{let m=method.toLowerCase();let src=this.__node.nodes.get(route);if(!src){src=this.__node.tree[route]}if(src?.[m]){if(!(src[m]instanceof Function)){if(args)src[m]=args;return src[m]}else return src[m](args)}else return this.handleServiceMessage({route,args,method})};this.transmit=(...args)=>{if(typeof args[0]==="object"){if(args[0].method){return this.handleMethod(args[0].route,args[0].method,args[0].args)}else if(args[0].route){return this.handleServiceMessage(args[0])}else if(args[0].node){return this.handleGraphNodeCall(args[0].node,args[0].args)}else if(this.__node.keepState){if(args[0].route)this.setState({[args[0].route]:args[0].args});if(args[0].node)this.setState({[args[0].node]:args[0].args})}return args}else return args};this.receive=(...args)=>{if(args[0]){if(typeof args[0]==="string"){let substr=args[0].substring(0,8);if(substr.includes("{")||substr.includes("[")){if(substr.includes("\\\\"))args[0]=args[0].replace(/\\\\/g,"");if(args[0][0]==='"'){args[0]=args[0].substring(1,args[0].length-1)};args[0]=JSON.parse(args[0])}}}if(typeof args[0]==="object"){if(args[0].method){return this.handleMethod(args[0].route,args[0].method,args[0].args)}else if(args[0].route){return this.handleServiceMessage(args[0])}else if(args[0].node){return this.handleGraphNodeCall(args[0].node,args[0].args)}else if(this.__node.keepState){if(args[0].route)this.setState({[args[0].route]:args[0].args});if(args[0].node)this.setState({[args[0].node]:args[0].args})}return args}else return args};this.pipe=(source,destination,endpoint,method,callback)=>{if(source instanceof GraphNode){if(callback)return this.subscribe(source,res=>{let mod=callback(res);if(mod!==void 0)this.transmit({route:destination,args:mod,method});else this.transmit({route:destination,args:res,method},endpoint)});else return this.subscribe(source,res=>{this.transmit({route:destination,args:res,method},endpoint)})}else if(typeof source==="string")return this.subscribe(source,res=>{this.transmit({route:destination,args:res,method},endpoint)})};this.pipeOnce=(source,destination,endpoint,method,callback)=>{if(source instanceof GraphNode){if(callback)return source.__node.state.subscribeTriggerOnce(source.__node.unique,res=>{let mod=callback(res);if(mod!==void 0)this.transmit({route:destination,args:mod,method});else this.transmit({route:destination,args:res,method},endpoint)});else return this.__node.state.subscribeTriggerOnce(source.__node.unique,res=>{this.transmit({route:destination,args:res,method},endpoint)})}else if(typeof source==="string")return this.__node.state.subscribeTriggerOnce(this.__node.nodes.get(source).__node.unique,res=>{this.transmit({route:destination,args:res,method},endpoint)})};this.terminate=(...args)=>{};this.isTypedArray=isTypedArray;this.recursivelyAssign=recursivelyAssign2;this.spliceTypedArray=spliceTypedArray;this.ping=()=>{console.log("pinged!");return"pong"};this.echo=(...args)=>{this.transmit(...args);return args};if(options?.services)this.addServices(options.services);this.setTree(this)}handleServiceMessage(message){let call;if(typeof message==="object"){if(message.route)call=message.route;else if(message.node)call=message.node}if(call){if(Array.isArray(message.args))return this.run(call,...message.args);else return this.run(call,message.args)}else return message}handleGraphNodeCall(route,args){if(!route)return args;if(args?.args){this.handleServiceMessage(args)}else if(Array.isArray(args))return this.run(route,...args);else return this.run(route,args)}};function isTypedArray(x){return ArrayBuffer.isView(x)&&Object.prototype.toString.call(x)!=="[object DataView]"}var recursivelyAssign2=(target,obj)=>{for(const key in obj){if(typeof obj[key]==="object"&&!Array.isArray(obj[key])){if(typeof target[key]==="object"&&!Array.isArray(target[key]))recursivelyAssign2(target[key],obj[key]);else target[key]=recursivelyAssign2({},obj[key])}else target[key]=obj[key]}return target};function spliceTypedArray(arr,start,end){let s=arr.subarray(0,start);let e;if(end){e=arr.subarray(end+1)}let ta;if(s.length>0||e?.length>0)ta=new arr.constructor(s.length+e.length);if(ta){if(s.length>0)ta.set(s);if(e&&e.length>0)ta.set(e,s.length)}return ta}function parseFunctionFromText(method=""){let getFunctionBody=methodString=>{return methodString.replace(/^\\W*(function[^{]+\\{([\\s\\S]*)\\}|[^=]+=>[^{]*\\{([\\s\\S]*)\\}|[^=]+=>(.+))/i,"$2$3$4")};let getFunctionHead=methodString=>{let startindex=methodString.indexOf("=>")+1;if(startindex<=0){startindex=methodString.indexOf("){")}if(startindex<=0){startindex=methodString.indexOf(") {")}return methodString.slice(0,methodString.indexOf("{",startindex)+1)};let newFuncHead=getFunctionHead(method);let newFuncBody=getFunctionBody(method);let newFunc;if(newFuncHead.includes("function")){let varName=newFuncHead.split("(")[1].split(")")[0];newFunc=new Function(varName,newFuncBody)}else{if(newFuncHead.substring(0,6)===newFuncBody.substring(0,6)){let varName=newFuncHead.split("(")[1].split(")")[0];newFunc=new Function(varName,newFuncBody.substring(newFuncBody.indexOf("{")+1,newFuncBody.length-1))}else{try{newFunc=(0,eval)(newFuncHead+newFuncBody+"}")}catch{}}}return newFunc}var stringifyWithCircularRefs=function(){const refs=new Map;const parents=[];const path=["this"];function clear(){refs.clear();parents.length=0;path.length=1}function updateParents(key,value){var idx=parents.length-1;var prev=parents[idx];if(typeof prev==="object"){if(prev[key]===value||idx===0){path.push(key);parents.push(value.pushed)}else{while(idx-->=0){prev=parents[idx];if(typeof prev==="object"){if(prev[key]===value){idx+=2;parents.length=idx;path.length=idx;--idx;parents[idx]=value;path[idx]=key;break}}idx--}}}}function checkCircular(key,value){if(value!=null){if(typeof value==="object"){if(key){updateParents(key,value)}let other=refs.get(value);if(other){return"[Circular Reference]"+other}else{refs.set(value,path.join("."))}}}return value}return function stringifyWithCircularRefs22(obj,space){try{parents.push(obj);return JSON.stringify(obj,checkCircular,space)}finally{clear()}}}();if(JSON.stringifyWithCircularRefs===void 0){JSON.stringifyWithCircularRefs=stringifyWithCircularRefs}var stringifyFast=function(){const refs=new Map;const parents=[];const path=["this"];function clear(){refs.clear();parents.length=0;path.length=1}function updateParents(key,value){var idx=parents.length-1;if(parents[idx]){var prev=parents[idx];if(typeof prev==="object"){if(prev[key]===value||idx===0){path.push(key);parents.push(value.pushed)}else{while(idx-->=0){prev=parents[idx];if(typeof prev==="object"){if(prev[key]===value){idx+=2;parents.length=idx;path.length=idx;--idx;parents[idx]=value;path[idx]=key;break}}idx++}}}}}function checkValues(key,value){let val;if(value!=null){if(typeof value==="object"){let c=value.constructor.name;if(key&&c==="Object"){updateParents(key,value)}let other=refs.get(value);if(other){return"[Circular Reference]"+other}else{refs.set(value,path.join("."))}if(c==="Array"){if(value.length>20){val=value.slice(value.length-20)}else val=value}else if(c.includes("Set")){val=Array.from(value)}else if(c!=="Object"&&c!=="Number"&&c!=="String"&&c!=="Boolean"){val="instanceof_"+c}else if(c==="Object"){let obj={};for(const prop in value){if(value[prop]==null){obj[prop]=value[prop]}else if(Array.isArray(value[prop])){if(value[prop].length>20)obj[prop]=value[prop].slice(value[prop].length-20);else obj[prop]=value[prop]}else if(value[prop].constructor.name==="Object"){obj[prop]={};for(const p in value[prop]){if(Array.isArray(value[prop][p])){if(value[prop][p].length>20)obj[prop][p]=value[prop][p].slice(value[prop][p].length-20);else obj[prop][p]=value[prop][p]}else{if(value[prop][p]!=null){let con=value[prop][p].constructor.name;if(con.includes("Set")){obj[prop][p]=Array.from(value[prop][p])}else if(con!=="Number"&&con!=="String"&&con!=="Boolean"){obj[prop][p]="instanceof_"+con}else{obj[prop][p]=value[prop][p]}}else{obj[prop][p]=value[prop][p]}}}}else{let con=value[prop].constructor.name;if(con.includes("Set")){obj[prop]=Array.from(value[prop])}else if(con!=="Number"&&con!=="String"&&con!=="Boolean"){obj[prop]="instanceof_"+con}else{obj[prop]=value[prop]}}}val=obj}else{val=value}}else{val=value}}return val}return function stringifyFast22(obj,space){parents.push(obj);let res=JSON.stringify(obj,checkValues,space);clear();return res}}();if(JSON.stringifyFast===void 0){JSON.stringifyFast=stringifyFast}var unsafeRoutes={setRoute:function(fn,fnName){if(typeof fn==="string")fn=parseFunctionFromText(fn);if(typeof fn==="function"){if(!fnName)fnName=fn.name;if(this.__node.graph.get(fnName)){this.__node.graph.get(fnName).__setOperator(fn)}else{let node=this.__node.graph.add({__node:{tag:fnName},__operator:fn})}return true}return false},setNode:function(fn,fnName){if(typeof fn==="string")fn=parseFunctionFromText(fn);if(typeof fn==="function"){if(!fnName)fnName=fn.name;if(this.__node.graph.get(fnName)){this.__node.graph.get(fnName).__setOperator(fn)}else this.__node.graph.add({__node:{tag:fnName},__operator:fn});return true}return false},setMethod:function(route,fn,fnName){if(typeof fn==="string")fn=parseFunctionFromText(fn);if(typeof fn==="function"){if(!fnName)fnName=fn.name;if(this.__node.graph.get(route)){this.__node.graph.get(route)[fnName]=fn}else this.__node.graph.add({__node:{tag:fnName,[fnName]:fn}});return true}return false},assignRoute:function(route,source){if(this.__node.graph.get(route)&&typeof source==="object"){Object.assign(this.__node.graph.get(route),source)}},transferClass:(classObj,className)=>{if(typeof classObj==="object"){let str2=classObj.toString();let message={route:"receiveClass",args:[str2,className]};return message}return false},receiveClass:function(stringified,className){if(typeof stringified==="string"){if(stringified.indexOf("class")===0){let cls=(0,eval)("("+stringified+")");let name=className;if(!name)name=cls.name;this.__node.graph[name]=cls;return true}}return false},setGlobal:(key,value)=>{globalThis[key]=value;return true},assignGlobalObject:(target,source)=>{if(!globalThis[target])return false;if(typeof source==="object")Object.assign(globalThis[target],source);return true},setValue:function(key,value){this.__node.graph[key]=value;return true},assignObject:function(target,source){if(!this.__node.graph[target])return false;if(typeof source==="object")Object.assign(this.__node.graph[target],source);return true},setGlobalFunction:(fn,fnName)=>{if(typeof fn==="string")fn=parseFunctionFromText(fn);if(typeof fn==="function"){if(!fnName)fnName=fn.name;globalThis[fnName]=fn;return true}return false},assignFunctionToGlobalObject:function(globalObjectName,fn,fnName){if(!globalThis[globalObjectName])return false;if(typeof fn==="string")fn=parseFunctionFromText(fn);if(typeof fn==="function"){if(!fnName)fnName=fn.name;this.__node.graph[globalObjectName][fnName]=fn;return true}return false},setFunction:function(fn,fnName){if(typeof fn==="string")fn=parseFunctionFromText(fn);if(typeof fn==="function"){if(!fnName)fnName=fn.name;this.__node.graph[fnName]=fn;return true}return false},assignFunctionToObject:function(objectName,fn,fnName){if(!this.__node.graph[objectName])return false;if(typeof fn==="string")fn=parseFunctionFromText(fn);if(typeof fn==="function"){if(!fnName)fnName=fn.name;this.__node.graph[objectName][fnName]=fn;return true}return false}};var import_sjcl=__toESM(require_sjcl());var _HTTPfrontend=class extends Service{constructor(options,path,fetched){super(options);this.name="http";this.fetchProxied=false;this.listening={};this.GET=(url="http://localhost:8080/ping",type="",mimeType)=>{if(type==="json")mimeType="application/json";return new Promise((resolve,reject)=>{let xhr=_HTTPfrontend.request({method:"GET",url,responseType:type,mimeType,onload:ev=>{let data;if(xhr.responseType===""||xhr.responseType==="text")data=xhr.responseText;else data=xhr.response;if(url instanceof URL)url=url.toString();this.setState({[url]:data});resolve(data)},onabort:er=>{reject(er)}})}).catch(console.error)};this.POST=(message,url="http://localhost:8080/echo",type="",mimeType)=>{if(typeof message==="object"&&(type==="json"||type==="text"||!type)){message=JSON.stringify(message)}if(type==="json")mimeType="application/json";return new Promise((resolve,reject)=>{let xhr=_HTTPfrontend.request({method:"POST",url,data:message,responseType:type,mimeType,onload:ev=>{let data;if(xhr.responseType===""||xhr.responseType==="text")data=xhr.responseText;else data=xhr.response;if(url instanceof URL)url=url.toString();this.setState({[url]:data});resolve(data)},onabort:er=>{reject(er)}})}).catch(console.error)};this.transmit=(message,url)=>{let obj=message;if(typeof obj==="object"){message=JSON.stringify(obj)}if(obj?.method?.toLowerCase()=="get"||message?.toLowerCase()==="get")return this.GET(url);return this.POST(message,url)};this.transponder=(url,message,type="",mimeType)=>{if(typeof message==="object")message=JSON.stringify(message);let method="GET";if(message){method="POST"}if(type==="json")mimeType="application/json";else return new Promise((resolve,reject)=>{let xhr=_HTTPfrontend.request({method,url,data:message,responseType:type,onload:ev=>{let body=xhr.response;if(typeof body==="string"){let substr=body.substring(0,8);if(substr.includes("{")||substr.includes("[")){if(substr.includes("\\\\"))body=body.replace(/\\\\/g,"");if(body[0]==='"'){body=body.substring(1,body.length-1)};body=JSON.parse(body)}}if(typeof body?.method==="string"){return resolve(this.handleMethod(body.route,body.method,body.args))}else if(typeof body?.route==="string"){return resolve(this.handleServiceMessage(body))}else if(typeof body?.node==="string"||body.node instanceof GraphNode){return resolve(this.handleGraphNodeCall(body.node,body.args))}else return resolve(body)},onabort:er=>{reject(er)}})}).catch(console.error)};this.listen=(path2="0",fetched2=async(clone,args,response)=>{const result=await clone.text();const returned=this.receive(result);this.setState({[response.url]:returned})})=>{this.listening[path2]={};let listenerId=\`\${path2}\${Math.floor(Math.random()*1e15)}\`;this.listening[path2][listenerId]=fetched2;if(!this.fetchProxied){globalThis.fetch=new Proxy(globalThis.fetch,{apply(fetch,that,args){const result=fetch.apply(that,args);result.then(response=>{if(!response.ok)return;if(this.listening["0"]){for(const key in this.listeners){const clone=response.clone();this.listening["0"][key](clone,args,response)}}else{for(const key in this.listening){if(response.url.includes(key)){for(const key2 in this.listening[path2]){const clone=response.clone();this.listening[path2][key2](clone,args,response)}break}}}}).catch(er=>{console.error(er)});return result}});this.fetchProxied=true}return listenerId};this.stopListening=(path2,listener)=>{if(!path2&&path2!==0){for(const key in this.listening)delete this.listening[key]}else{if(!listener)delete this.listening[path2];else delete this.listening[listener]}};this.setTree(this);this.listen(path,fetched)}};var HTTPfrontend=_HTTPfrontend;HTTPfrontend.request=options=>{const xhr=new XMLHttpRequest;if(options.responseType)xhr.responseType=options.responseType;else options.responseType="json";if(options.mimeType){xhr.overrideMimeType(options.mimeType)}if(options.onload)xhr.addEventListener("load",options.onload,false);if(options.onprogress)xhr.addEventListener("progress",options.onprogress,false);if(options.onabort)xhr.addEventListener("abort",options.onabort,false);if(options.onloadend)xhr.addEventListener("loadend",options.onloadend,false);if(options.onerror)xhr.addEventListener("error",options.onerror,false);xhr.open(options.method,options.url,true,options.user,options.pass);if(!options.onerror)xhr.onerror=function(){xhr.abort()};xhr.send(options.data);return xhr};var import_web_worker=__toESM(require_browser());var WorkerService=class extends Service{constructor(options){super();this.name="worker";this.workers={};this.threadRot=0;this.loadWorkerRoute=(rt,routeKey)=>{if(rt.workerUrl)rt.url=rt.workerUrl;if(rt.workerId)rt.__node.tag=rt.workerId;if(!rt.__node.tag)rt.__node.tag=routeKey;rt._id=rt.__node.tag;let worker;if(this.workers[rt._id])worker=this.workers[rt._id];else if(rt.worker)worker=rt.worker;if(!worker){worker=this.addWorker(rt);let ondelete=rt2=>{rt2.worker?.terminate()};rt.__addOndisconnected(ondelete)}rt.worker=worker;if(rt.transferFunctions){for(const prop in rt.transferFunctions){this.transferFunction(worker,rt.transferFunctions[prop],prop)}}if(rt.transferClasses){for(const prop in rt.transferClasses){this.transferClass(worker,rt.transferClasses[prop],prop)}}if(worker){if(!rt.__operator){rt.__operator=(...args)=>{if(rt.callback){if(!this.__node.nodes.get(rt.__node.tag)?.__children)worker.post(rt.callback,args);else return worker.run(rt.callback,args)}else{if(!this.__node.nodes.get(rt.__node.tag)?.__children)worker.send(args);else return worker.request(args)}}}if(rt.init){worker.run(rt.init,rt.initArgs,rt.initTransfer)}return worker}};this.workerloader={"workers":(node,parent2,graph,tree)=>{let rt=node;if(!node.parentRoute&&(parent2?.callback&&parent2?.worker))node.parentRoute=parent2?.callback;if(rt?.worker||rt?.workerId||rt?.workerUrl){let worker=this.loadWorkerRoute(rt,rt.__node.tag);if(worker){if(!rt.parentRoute&&rt.__parent?.callback)rt.parentRoute=rt.__parent.callback;if(rt.__parent&&!rt.portId){if(typeof rt.__parent==="string"){if(rt.__node.tag!==rt.__parent&&worker._id!==rt.__parent)rt.portId=this.establishMessageChannel(worker,rt.__parent)}else if(rt.__node.tag!==rt.__parent?.__node?.tag&&worker._id!==rt.__parent.tag){rt.portId=this.establishMessageChannel(worker,rt.__parent.worker)}};if(rt.parentRoute){if(!rt.stopped){if(typeof rt.__parent==="string"&&rt.__parent===worker._id){worker.run("subscribe",[rt.parentRoute,void 0,rt.callback])}else if(rt.__node.tag===rt.__parent?.__node?.tag||worker._id===rt.__parent?.__node?.tag){worker.run("subscribe",[rt.parentRoute,void 0,rt.callback])}else worker.run("subscribeToWorker",[rt.parentRoute,rt.portId,rt.callback,rt.blocking]).then(sub=>{worker.workerSubs[rt.parentRoute+rt.portId].sub=sub})}if(!(typeof rt.__parent==="string"&&rt.__parent===worker._id)&&!(rt.__node.tag===rt.__parent?.__node?.tag||worker._id===rt.__parent?.__node?.tag))worker.workerSubs[rt.parentRoute+rt.portId]={sub:null,route:rt.parentRoute,portId:rt.portId,callback:rt.callback,blocking:rt.blocking}}else if(rt.__parent){if(typeof rt.__parent==="string"){if(!rt.stopped){if(rt.__parent===worker._id){worker.run("subscribe",[rt.__parent,void 0,rt.callback])}else worker.run("subscribeToWorker",[rt.__parent,rt.portId,rt.callback,rt.blocking]).then(sub=>{worker.workerSubs[rt.__parent+rt.portId].sub=sub})}if(!(typeof rt.__parent==="string"&&rt.__parent===worker._id))worker.workerSubs[rt+rt.portId]={sub:null,route:worker._id,portId:rt.portId,callback:rt.callback,blocking:rt.blocking}}else if(rt.__parent?.__node?.tag&&rt.__parent?.worker){if(!rt.stopped){if(rt.__node.tag===rt.__parent.__node.tag||worker._id===rt.__parent.__node.tag){worker.run("subscribe",[rt.__parent.__node.tag,void 0,rt.callback])}else worker.run("subscribeToWorker",[rt.__parent.__node.tag,rt.portId,rt.callback,rt.blocking]).then(sub=>{worker.workerSubs[rt.__parent.__node.tag+rt.portId].sub=sub})}if(!(rt.__node.tag===rt.__parent?.__node?.tag||worker._id===rt.__parent?.__node?.tag))worker.workerSubs[rt.__parent.__node.tag+rt.portId]={sub:null,route:rt.__parent.__node.tag,portId:rt.portId,callback:rt.callback,blocking:rt.blocking}}}}}else if(rt.__parent&&rt.parentRoute){console.log(rt);if(typeof rt.__parent==="string"&&tree[rt.__parent]?.worker){tree[rt.__parent].worker.subscribe(rt.parentRoute,rt.__operator,rt.blocking)}else if(rt.__parent?.worker){rt.__parent.worker.subscribe(rt.parentRoute,rt.__operator,rt.blocking)}}return rt}};this.addDefaultMessageListener=()=>{globalThis.onmessage=ev=>{let result=this.receive(ev.data);if(this.__node.keepState)this.setState({[this.name]:result})}};this.postMessage=(message,target,transfer)=>{if(this.workers[target]){this.workers[target].send(message,transfer)}else{globalThis.postMessage(message,target,transfer)}};this.addWorker=options2=>{let worker;if(!options2._id)options2._id=\`worker\${Math.floor(Math.random()*1e15)}\`;if(options2.url)worker=new import_web_worker.default(options2.url);else if(options2.port){worker=options2.port}else if(this.workers[options2._id]){if(this.workers[options2._id].port)worker=this.workers[options2._id].port;else worker=this.workers[options2._id].worker}if(!worker)return;let send=(message,transfer)=>{return this.transmit(message,worker,transfer)};let post=(route,args,transfer,method)=>{let message={route,args};if(method)message.method=method;return this.transmit(message,worker,transfer)};let run=(route,args,transfer,method)=>{return new Promise((res,rej)=>{let callbackId=Math.random();let req={route:"runRequest",args:[{route,args},options2._id,callbackId]};if(method)req.args[0].method=method;let onmessage=ev=>{if(typeof ev.data==="object"){if(ev.data.callbackId===callbackId){worker.removeEventListener("message",onmessage);res(ev.data.args)}}};worker.addEventListener("message",onmessage);this.transmit(req,worker,transfer)})};let request=(message,transfer,method)=>{return new Promise((res,rej)=>{let callbackId=Math.random();let req={route:"runRequest",args:[message,options2._id,callbackId]};if(method)req.method=method;let onmessage=ev=>{if(typeof ev.data==="object"){if(ev.data.callbackId===callbackId){worker.removeEventListener("message",onmessage);res(ev.data.args)}}};worker.addEventListener("message",onmessage);this.transmit(req,worker,transfer)})};let workerSubs={};let subscribe=(route,callback,blocking)=>{return this.subscribeToWorker(route,options2._id,callback,blocking)};let unsubscribe=(route,sub)=>{return run("unsubscribe",[route,sub])};let start=async(route,portId,callback,blocking)=>{if(route)await run("subscribeToWorker",[route,portId,callback,blocking]).then(sub=>{if(sub)workerSubs[route+portId]={sub,route,portId,callback,blocking}});else for(const key in workerSubs){if(typeof workerSubs[key].sub!=="number")await run("subscribeToWorker",[workerSubs[key].route,workerSubs[key].portId,workerSubs[key].callback,workerSubs[key].blocking]).then(sub=>{workerSubs[key].sub=sub})}return true};let stop=async(route,portId)=>{if(route&&portId&&workerSubs[route+portId]){await run("unsubscribe",[route,workerSubs[route+portId].sub]);workerSubs[route+portId].sub=false}else{for(const key in workerSubs){if(typeof workerSubs[key].sub==="number"){await run("unpipeWorkers",[workerSubs[key].route,workerSubs[key].portId,workerSubs[key].sub])}workerSubs[key].sub=false}}return true};let terminate=()=>{for(const key in workerSubs){if(typeof workerSubs[key].sub==="number"){run("unpipeWorkers",[workerSubs[key].route,workerSubs[key].portId,workerSubs[key].sub])}workerSubs[key].sub=false}return this.terminate(options2._id)};if(!options2.onmessage)options2.onmessage=ev=>{this.receive(ev.data);this.setState({[options2._id]:ev.data})};if(!options2.onerror){options2.onerror=ev=>{console.error(ev.data)}}worker.onmessage=options2.onmessage;worker.onerror=options2.onerror;this.workers[options2._id]={worker,send,post,run,request,subscribe,unsubscribe,terminate,start,stop,postMessage:worker.postMessage,workerSubs,graph:this,...options2};return this.workers[options2._id]};this.toObjectURL=scriptTemplate=>{let blob=new Blob([scriptTemplate],{type:"text/javascript"});return URL.createObjectURL(blob)};this.transmit=(message,worker,transfer)=>{if(!transfer){transfer=this.getTransferable(message)}if(worker instanceof import_web_worker.default||worker instanceof MessagePort){worker.postMessage(message,transfer)}else if(typeof worker==="string"){if(this.workers[worker]){if(this.workers[worker].port)this.workers[worker].port.postMessage(message,transfer);else if(this.workers[worker].worker)this.workers[worker].worker.postMessage(message,transfer)}}else{let keys=Object.keys(this.workers);this.workers[keys[this.threadRot]].worker.postMessage(message,transfer);this.threadRot++;if(this.threadRot===keys.length)this.threadRot=0}return message};this.terminate=worker=>{let onclose;if(typeof worker==="string"){let obj=this.workers[worker];if(obj){delete this.workers[worker];worker=obj.worker;if(obj.onclose)onclose=obj.onclose}}if(worker instanceof import_web_worker.default){worker.terminate();if(onclose)onclose(worker);return true}if(worker instanceof MessagePort){worker.close();if(onclose)onclose(worker);return true}return false};this.establishMessageChannel=(worker,worker2)=>{let workerId;if(typeof worker==="string"){workerId=worker;if(this.workers[worker]){if(this.workers[worker].port)worker=this.workers[worker].port;else worker2=this.workers[worker].worker}}else if(worker?.worker){worker=worker.worker}if(typeof worker2==="string"){if(this.workers[worker2]){if(this.workers[worker2].port)worker2=this.workers[worker2].port;else worker2=this.workers[worker2].worker}}else if(worker2?.worker){worker2=worker2.worker}if(worker instanceof import_web_worker.default||worker instanceof MessagePort){let channel=new MessageChannel;let portId=\`port\${Math.floor(Math.random()*1e15)}\`;worker.postMessage({route:"addWorker",args:{port:channel.port1,_id:portId}},[channel.port1]);if(worker2 instanceof import_web_worker.default||worker2 instanceof MessagePort){worker2.postMessage({route:"addWorker",args:{port:channel.port2,_id:portId}},[channel.port2])}else if(workerId&&this.workers[workerId]){channel.port2.onmessage=this.workers[workerId].onmessage;this.workers[workerId].port=channel.port2}return portId}return false};this.request=(message,workerId,transfer,method)=>{let worker=this.workers[workerId].worker;return new Promise((res,rej)=>{let callbackId=Math.random();let req={route:"runRequest",args:[message,callbackId]};if(method)req.method=method;let onmessage=ev=>{if(typeof ev.data==="object"){if(ev.data.callbackId===callbackId){worker.removeEventListener("message",onmessage);res(ev.data.args)}}};worker.addEventListener("message",onmessage);this.transmit(req,worker,transfer)})};this.runRequest=(message,worker,callbackId)=>{let res=this.receive(message);if(typeof worker==="string"&&this.workers[worker]){if(this.workers[worker].port)worker=this.workers[worker].port;else worker=this.workers[worker].worker}if(res instanceof Promise){res.then(r=>{if(worker instanceof import_web_worker.default||worker instanceof MessagePort)worker.postMessage({args:r,callbackId});else if(typeof WorkerGlobalScope!=="undefined"&&self instanceof WorkerGlobalScope)globalThis.postMessage({args:r,callbackId})})}else{if(worker instanceof import_web_worker.default||worker instanceof MessagePort)worker.postMessage({args:res,callbackId});else if(typeof WorkerGlobalScope!=="undefined"&&self instanceof WorkerGlobalScope)globalThis.postMessage({args:res,callbackId})}return res};this.subscribeWorker=(route,worker,blocking,key,subInput)=>{let callback;if(blocking){let blocked=false;callback=res=>{if(!blocked){blocked=true;if(res instanceof Promise){res.then(r=>{if(worker?.run)worker.run("triggerSubscription",[route,worker._id,r]).then(ret=>{blocked=false})})}else{if(worker?.run)worker.run("triggerSubscription",[route,worker._id,res]).then(ret=>{blocked=false})}}}}else{callback=res=>{if(res instanceof Promise){res.then(r=>{if(worker?.postMessage)worker.postMessage({args:r,callbackId:route});else if(globalThis.postMessage)globalThis.postMessage({args:r,callbackId:route})})}else{if(worker?.postMessage)worker.postMessage({args:res,callbackId:route});else if(globalThis.postMessage)globalThis.postMessage({args:res,callbackId:route})}}}if(!blocking&&worker?.port){worker=worker.port}else if(!blocking&&worker?.worker){worker=worker.worker}else if(typeof worker==="string"&&this.workers[worker]){if(blocking)worker=this.workers[worker];else if(this.workers[worker].port)worker=this.workers[worker].port;else worker=this.workers[worker].worker}return this.subscribe(route,callback,key,subInput)};this.subscribeToWorker=(route,workerId,callback,blocking,key,subInput)=>{if(typeof workerId==="string"&&this.workers[workerId]){this.__node.state.subscribeTrigger(workerId,res=>{if(res?.callbackId===route){if(!callback)this.setState({[workerId]:res.args});else if(typeof callback==="string"){this.run(callback,res.args)}else callback(res.args)}});return this.workers[workerId].run("subscribeWorker",[route,workerId,blocking,key,subInput])}};this.triggerSubscription=async(route,workerId,result)=>{if(this.__node.state.triggers[workerId])for(let i=0;i<this.__node.state.triggers[workerId].length;i++){await this.__node.state.triggers[workerId][i].onchange({args:result,callbackId:route})}return true};this.pipeWorkers=(sourceWorker,listenerWorker,sourceRoute,listenerRoute,portId,blocking)=>{if(typeof sourceWorker==="string")sourceWorker=this.workers[sourceWorker];if(typeof listenerWorker==="string")listenerWorker=this.workers[listenerWorker];if(!portId){portId=this.establishMessageChannel(sourceWorker.worker,listenerWorker.worker)}return listenerWorker.run("subscribeToWorker",[sourceRoute,portId,listenerRoute,blocking])};this.unpipeWorkers=(sourceRoute,sourceWorker,sub)=>{if(typeof sourceWorker==="string")sourceWorker=this.workers[sourceWorker];if(sourceWorker)return sourceWorker.run("unsubscribe",[sourceRoute,sub])};this.connections={workers:this.workers};if(options?.services)this.addServices(options.services);this.setTree(this);this.setLoaders(this.workerloader);if(options)this.init(options);if(typeof WorkerGlobalScope!=="undefined"&&globalThis instanceof WorkerGlobalScope){this.addDefaultMessageListener()}}getTransferable(message){let transfer;if(typeof message==="object"){if(message.args){if(message.args?.constructor?.name==="Object"){for(const key in message.args){if(ArrayBuffer.isView(message.args[key])){if(!transfer)transfer=[message.args[key].buffer];else transfer.push(message.args[key].buffer)}else if(message.args[key]?.constructor?.name==="ArrayBuffer"){if(!transfer)transfer=[message.args[key]];else transfer.push(message.args[key])}}}else if(Array.isArray(message.args)&&message.args.length<11){message.args.forEach(arg=>{if(ArrayBuffer.isView(arg)){transfer=[arg.buffer]}else if(arg?.constructor?.name==="ArrayBuffer")transfer=[arg]})}else if(ArrayBuffer.isView(message.args)){transfer=[message.args.buffer]}else if(message.args?.constructor?.name==="ArrayBuffer"){transfer=[message]}}else if(message?.constructor?.name==="Object"){for(const key in message){if(ArrayBuffer.isView(message[key])){if(!transfer)transfer=[message[key].buffer];else transfer.push(message[key].buffer)}else if(message[key]?.constructor?.name==="ArrayBuffer"){if(!transfer)transfer=[message[key]];else transfer.push(message[key])}}}else if(Array.isArray(message)&&message.length<11){message.forEach(arg=>{if(ArrayBuffer.isView(arg)){transfer=[arg.buffer]}else if(arg.constructor?.name==="ArrayBuffer")transfer=[arg]})}else if(ArrayBuffer.isView(message)){transfer=[message.buffer]}else if(message.constructor?.name==="ArrayBuffer"){transfer=[message]}}return transfer}transferFunction(worker,fn,fnName){if(!fnName)fnName=fn.name;return worker.request({route:"setRoute",args:[fn.toString(),fnName]})}transferClass(worker,cls,className){if(!className)className=cls.name;return worker.request({route:"receiveClass",args:[cls.toString(),className]})}};var mouseEventHandler=makeSendPropertiesHandler(["ctrlKey","metaKey","shiftKey","button","pointerType","clientX","clientY","pageX","pageY"]);var wheelEventHandlerImpl=makeSendPropertiesHandler(["deltaX","deltaY"]);var keydownEventHandler=makeSendPropertiesHandler(["ctrlKey","metaKey","shiftKey","keyCode"]);function wheelEventHandler(event,sendFn){event.preventDefault();wheelEventHandlerImpl(event,sendFn)}function preventDefaultHandler(event){event.preventDefault()}function copyProperties(src,properties,dst){for(const name of properties){dst[name]=src[name]}}function makeSendPropertiesHandler(properties){return function sendProperties(event,sendFn){const data={type:event.type};copyProperties(event,properties,data);sendFn(data)}}function touchEventHandler(event,sendFn){const touches=[];const data={type:event.type,touches};for(let i=0;i<event.touches.length;++i){const touch=event.touches[i];touches.push({pageX:touch.pageX,pageY:touch.pageY})}sendFn(data)}var orbitKeys={"37":true,"38":true,"39":true,"40":true};function filteredKeydownEventHandler(event,sendFn){const{keyCode}=event;if(orbitKeys[keyCode]){event.preventDefault();keydownEventHandler(event,sendFn)}}var eventHandlers={contextmenu:preventDefaultHandler,mousedown:mouseEventHandler,mousemove:mouseEventHandler,mouseup:mouseEventHandler,pointerdown:mouseEventHandler,pointermove:mouseEventHandler,pointerup:mouseEventHandler,touchstart:touchEventHandler,touchmove:touchEventHandler,touchend:touchEventHandler,wheel:wheelEventHandler,keydown:filteredKeydownEventHandler};function initProxyElement(element,worker,id){if(!id)id="proxy"+Math.floor(Math.random()*1e15);const sendEvent=data=>{if(!worker){handleProxyEvent(data,id)}else worker.postMessage({route:"handleProxyEvent",args:[data,id]})};let entries=Object.entries(eventHandlers);for(const[eventName,handler]of entries){element.addEventListener(eventName,function(event){handler(event,sendEvent)})}const sendSize=()=>{const rect=element.getBoundingClientRect();sendEvent({type:"resize",left:rect.left,top:rect.top,width:element.clientWidth,height:element.clientHeight})};sendSize();globalThis.addEventListener("resize",sendSize);return id}var EventDispatcher=class{addEventListener(type,listener){if(this.__listeners===void 0)this.__listeners={};const listeners=this.__listeners;if(listeners[type]===void 0){listeners[type]=[]}if(listeners[type].indexOf(listener)===-1){listeners[type].push(listener)}}hasEventListener(type,listener){if(this.__listeners===void 0)return false;const listeners=this.__listeners;return listeners[type]!==void 0&&listeners[type].indexOf(listener)!==-1}removeEventListener(type,listener){if(this.__listeners===void 0)return;const listeners=this.__listeners;const listenerArray=listeners[type];if(listenerArray!==void 0){const index=listenerArray.indexOf(listener);if(index!==-1){listenerArray.splice(index,1)}}}dispatchEvent(event,target){if(this.__listeners===void 0)return;const listeners=this.__listeners;const listenerArray=listeners[event.type];if(listenerArray!==void 0){if(!target)event.target=this;else event.target=target;const array=listenerArray.slice(0);for(let i=0,l=array.length;i<l;i++){array[i].call(this,event)}event.target=null}}};function noop(){}var ElementProxyReceiver=class extends EventDispatcher{constructor(){super();this.__listeners={};this.style={};this.setPointerCapture=()=>{};this.releasePointerCapture=()=>{};this.getBoundingClientRect=()=>{return{left:this.left,top:this.top,width:this.width,height:this.height,right:this.left+this.width,bottom:this.top+this.height}};this.handleEvent=data=>{if(data.type==="resize"){this.left=data.left;this.top=data.top;this.width=data.width;this.height=data.height;if(typeof this.proxied==="object"){this.proxied.style.width=this.width+"px";this.proxied.style.height=this.height+"px";this.proxied.clientWidth=this.width;this.proxied.clientHeight=this.height}}data.preventDefault=noop;data.stopPropagation=noop;this.dispatchEvent(data,this.proxied)};this.style={}}get clientWidth(){return this.width}get clientHeight(){return this.height}focus(){}};var ProxyManager=class{constructor(){this.targets={};this.makeProxy=(id,addTo=void 0)=>{if(!id)id=\`proxyReceiver\${Math.floor(Math.random()*1e15)}\`;let proxy;if(this.targets[id])proxy=this.targets[id];else{proxy=new ElementProxyReceiver;this.targets[id]=proxy}if(typeof addTo==="object"){addTo.proxy=proxy;proxy.proxied=addTo;if(typeof WorkerGlobalScope!=="undefined")addTo.style=proxy.style;if(proxy.width){addTo.style.width=proxy.width+"px";addTo.clientWidth=proxy.width}if(proxy.height){addTo.style.height=proxy.height+"px";addTo.clientHeight=proxy.height}addTo.setPointerCapture=proxy.setPointerCapture.bind(proxy);addTo.releasePointerCapture=proxy.releasePointerCapture.bind(proxy);addTo.getBoundingClientRect=proxy.getBoundingClientRect.bind(proxy);addTo.addEventListener=proxy.addEventListener.bind(proxy);addTo.removeEventListener=proxy.removeEventListener.bind(proxy);addTo.handleEvent=proxy.handleEvent.bind(proxy);addTo.dispatchEvent=proxy.dispatchEvent.bind(proxy);addTo.focus=proxy.focus.bind(proxy)}};this.getProxy=id=>{return this.targets[id]};this.handleEvent=(data,id)=>{if(!this.targets[id])this.makeProxy(id);if(this.targets[id]){this.targets[id].handleEvent(data);return true}return void 0};if(!globalThis.document)globalThis.document={}}};function makeProxy(id,elm){if(this?.__node?.graph){if(!this.__node.graph.ProxyManager)this.__node.graph.ProxyManager=new ProxyManager;this.__node.graph.ProxyManager.makeProxy(id,elm)}else{if(!globalThis.ProxyManager)globalThis.ProxyManager=new ProxyManager;globalThis.ProxyManager.makeProxy(id,elm)}return id}function handleProxyEvent(data,id){if(this?.__node?.graph){if(!this.__node.graph.ProxyManager)this.__node.graph.ProxyManager=new ProxyManager;if(this.__node.graph.ProxyManager.handleEvent(data,id))return data}else{if(!globalThis.ProxyManager)globalThis.ProxyManager=new ProxyManager;if(globalThis.ProxyManager.handleEvent(data,id))return data}}var proxyElementWorkerRoutes={initProxyElement,makeProxy,handleProxyEvent};function Renderer(options){if(options.worker){let worker=options.worker;let route=options.route;if(worker instanceof Blob||typeof worker==="string"){worker=new Worker(worker)}delete options.worker;delete options.route;return transferCanvas(worker,options,route)}else{initProxyElement(options.canvas,void 0,options._id);return setupCanvas(options)}}function transferCanvas(worker,options,route){if(!options)return void 0;if(!options._id)options._id=\`canvas\${Math.floor(Math.random()*1e15)}\`;let offscreen=options.canvas.transferControlToOffscreen();if(!options.width)options.width=options.canvas.clientWidth;if(!options.height)options.height=options.canvas.clientHeight;let message={route:route?route:"setupCanvas",args:{...options,canvas:offscreen}};if(this?.__node?.graph)this.__node.graph.run("initProxyElement",options.canvas,worker,options._id);else initProxyElement(options.canvas,worker,options._id);if(options.draw){if(typeof options.draw==="function")message.args.draw=options.draw.toString();else message.args.draw=options.draw}if(options.update){if(typeof options.update==="function")message.args.update=options.update.toString();else message.args.update=options.update}if(options.init){if(typeof options.init==="function")message.args.init=options.init.toString();else message.args.init=options.init}if(options.clear){if(typeof options.clear==="function")message.args.clear=options.clear.toString();else message.args.clear=options.clear}let transfer=[offscreen];if(options.transfer){transfer.push(...options.transfer);delete options.transfer}worker.postMessage(message,transfer);const canvascontrols={_id:options._id,width:options.width,height:options.height,worker,draw:props=>{worker.postMessage({route:"drawFrame",args:[props,options._id]})},update:props=>{worker.postMessage({route:"updateCanvas",args:[props,options._id]})},clear:()=>{worker.postMessage({route:"clearCanvas",args:options._id})},init:()=>{worker.postMessage({route:"initCanvas",args:options._id})},stop:()=>{worker.postMessage({route:"stopAnim",args:options._id})},start:()=>{worker.postMessage({route:"startAnim",args:options._id})},set:newDrawProps=>{worker.postMessage({route:"setDraw",args:[newDrawProps,options._id]})},terminate:()=>{worker.terminate()}};return canvascontrols}function setDraw(settings,_id){let canvasopts;if(this?.__node?.graph){if(_id)canvasopts=this.__node.graph.CANVASES?.[settings._id];else if(settings._id)canvasopts=this.__node.graph.CANVASES?.[settings._id];else canvasopts=this.__node.graph.CANVASES?.[Object.keys(this.__node.graph.CANVASES)[0]]}else{if(_id)canvasopts=globalThis.CANVASES?.[settings._id];else if(settings._id)canvasopts=globalThis.CANVASES?.[settings._id];else canvasopts=globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]]}if(canvasopts){if(settings.canvas){canvasopts.canvas=settings.canvas;if(this?.__node?.graph)this.__node.graph.run("makeProxy",canvasopts._id,canvasopts.canvas);else proxyElementWorkerRoutes.makeProxy(canvasopts._id,canvasopts.canvas)}if(typeof settings.context==="string")canvasopts.context=canvasopts.canvas.getContext(settings.context);else if(settings.context)canvasopts.context=settings.context;if(settings.width)canvasopts.canvas.width=settings.width;if(settings.height)canvasopts.canvas.height=settings.height;if(typeof settings.draw==="string")settings.draw=parseFunctionFromText3(settings.draw);if(typeof settings.draw==="function"){canvasopts.draw=settings.draw}if(typeof settings.update==="string")settings.update=parseFunctionFromText3(settings.update);if(typeof settings.update==="function"){canvasopts.update=settings.update}if(typeof settings.init==="string")settings.init=parseFunctionFromText3(settings.init);if(typeof settings.init==="function"){canvasopts.init=settings.init}if(typeof settings.clear==="string")settings.clear=parseFunctionFromText3(settings.clear);if(typeof settings.clear==="function"){canvasopts.clear=settings.clear}return settings._id}return void 0}function setupCanvas(options){if(this?.__node?.graph){if(!this.__node.graph.CANVASES)this.__node.graph.CANVASES={}}else if(!globalThis.CANVASES)globalThis.CANVASES={};let canvasOptions=options;options._id?canvasOptions._id=options._id:canvasOptions._id=\`canvas\${Math.floor(Math.random()*1e15)}\`;typeof options.context==="string"?canvasOptions.context=options.canvas.getContext(options.context):canvasOptions.context=options.context;"animating"in options?canvasOptions.animating=options.animating:canvasOptions.animating=true;if(this?.__node?.graph?.CANVASES[canvasOptions._id]){this.__node.graph.run("setDraw",canvasOptions)}else if(globalThis.CANVASES?.[canvasOptions._id]){setDraw(canvasOptions)}else{if(this?.__node?.graph)canvasOptions.graph=this.__node.graph;if(this?.__node?.graph)this.__node.graph.CANVASES[canvasOptions._id]=canvasOptions;else globalThis.CANVASES[canvasOptions._id]=canvasOptions;if(this?.__node.graph)this.__node.graph.run("makeProxy",canvasOptions._id,canvasOptions.canvas);else proxyElementWorkerRoutes.makeProxy(canvasOptions._id,canvasOptions.canvas);if(options.width)canvasOptions.canvas.width=options.width;if(options.height)canvasOptions.canvas.height=options.height;if(typeof canvasOptions.draw==="string"){canvasOptions.draw=parseFunctionFromText3(canvasOptions.draw)}else if(typeof canvasOptions.draw==="function"){canvasOptions.draw=canvasOptions.draw}if(typeof canvasOptions.update==="string"){canvasOptions.update=parseFunctionFromText3(canvasOptions.update)}else if(typeof canvasOptions.update==="function"){canvasOptions.update=canvasOptions.update}if(typeof canvasOptions.init==="string"){canvasOptions.init=parseFunctionFromText3(canvasOptions.init)}else if(typeof canvasOptions.init==="function"){canvasOptions.init=canvasOptions.init}if(typeof canvasOptions.clear==="string"){canvasOptions.clear=parseFunctionFromText3(canvasOptions.clear)}else if(typeof canvasOptions.clear==="function"){canvasOptions.clear=canvasOptions.clear}if(typeof canvasOptions.init==="function")canvasOptions.init(canvasOptions,canvasOptions.canvas,canvasOptions.context);canvasOptions.stop=()=>{stopAnim(canvasOptions._id)};canvasOptions.start=draw=>{startAnim(canvasOptions._id,draw)};canvasOptions.set=settings=>{setDraw(settings,canvasOptions._id)};if(typeof canvasOptions.draw==="function"&&canvasOptions.animating){let draw=(s,canvas,context)=>{if(s.animating){s.draw(s,canvas,context);requestAnimationFrame(()=>{draw(s,canvas,context)})}};draw(canvasOptions,canvasOptions.canvas,canvasOptions.context)}}if(typeof WorkerGlobalScope!=="undefined"&&self instanceof WorkerGlobalScope)return canvasOptions._id;else{const canvascontrols={_id:options._id,width:options.width,height:options.height,draw:props=>{drawFrame(props,options._id)},update:props=>{updateCanvas(props,options._id)},clear:()=>{clearCanvas(options._id)},init:()=>{initCanvas(options._id)},stop:()=>{stopAnim(options._id)},start:()=>{startAnim(options._id)},set:newDrawProps=>{setDraw(newDrawProps,options._id)},terminate:()=>{stopAnim(options._id)}};return canvascontrols}}function drawFrame(props,_id){let canvasopts;if(this?.__node?.graph){if(!_id)canvasopts=this.__node.graph.CANVASES?.[Object.keys(this.__node.graph.CANVASES)[0]];else canvasopts=this.__node.graph.CANVASES?.[_id]}else{if(!_id)canvasopts=globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];else canvasopts=globalThis.CANVASES?.[_id]}if(canvasopts){if(props)Object.assign(canvasopts,props);if(canvasopts.draw){canvasopts.draw(canvasopts,canvasopts.canvas,canvasopts.context);return _id}}return void 0}function clearCanvas(_id){let canvasopts;if(this?.__node?.graph){if(!_id)canvasopts=this.__node.graph.CANVASES?.[Object.keys(this.__node.graph.CANVASES)[0]];else canvasopts=this.__node.graph.CANVASES?.[_id]}else{if(!_id)canvasopts=globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];else canvasopts=globalThis.CANVASES?.[_id]}if(canvasopts?.clear){canvasopts.clear(canvasopts,canvasopts.canvas,canvasopts.context);return _id}return void 0}function initCanvas(_id){let canvasopts;if(this?.__node?.graph){if(!_id)canvasopts=this.__node.graph.CANVASES?.[Object.keys(this.__node.graph.CANVASES)[0]];else canvasopts=this.__node.graph.CANVASES?.[_id]}else{if(!_id)canvasopts=globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];else canvasopts=globalThis.CANVASES?.[_id]}if(canvasopts?.init){canvasopts.init(canvasopts,canvasopts.canvas,canvasopts.context);return _id}return void 0}function updateCanvas(input,_id){let canvasopts;if(this?.__node?.graph){if(!_id)canvasopts=this.__node.graph.CANVASES?.[Object.keys(this.__node.graph.CANVASES)[0]];else canvasopts=this.__node.graph.CANVASES?.[_id]}else{if(!_id)canvasopts=globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];else canvasopts=globalThis.CANVASES?.[_id]}if(canvasopts?.update){canvasopts.update(canvasopts,canvasopts.canvas,canvasopts.context,input);return _id}return void 0}function setProps(props,_id){let canvasopts;if(this?.__node?.graph){if(!_id)canvasopts=this.__node.graph.CANVASES?.[Object.keys(this.__node.graph.CANVASES)[0]];else canvasopts=this.__node.graph.CANVASES?.[_id]}else{if(!_id)canvasopts=globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];else canvasopts=globalThis.CANVASES?.[_id]}if(canvasopts){Object.assign(canvasopts,props);if(props.width)canvasopts.canvas.width=props.width;if(props.height)canvasopts.canvas.height=props.height;return _id}return void 0}function startAnim(_id,draw){let canvasopts;if(this?.__node?.graph){if(!_id)canvasopts=this.__node.graph.CANVASES?.[Object.keys(this.__node.graph.CANVASES)[0]];else canvasopts=this.__node.graph.CANVASES?.[_id]}else{if(!_id)canvasopts=globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];else canvasopts=globalThis.CANVASES?.[_id]}canvasopts.animating=true;if(canvasopts&&draw){if(typeof draw==="string")draw=parseFunctionFromText3(draw);if(typeof draw==="function"){canvasopts.draw=draw}return _id}if(typeof canvasopts?.draw==="function"){let draw2=(s,canvas,context)=>{if(s.animating){s.draw(s,canvas,context);requestAnimationFrame(()=>{draw2(s,canvas,context)})}};if(typeof canvasopts.clear==="function")canvasopts.clear(canvasopts,canvasopts.canvas,canvasopts.context);if(typeof canvasopts.init==="function")canvasopts.init(canvasopts,canvasopts.canvas,canvasopts.context);draw2(canvasopts,canvasopts.canvas,canvasopts.context);return _id}return void 0}function stopAnim(_id){let canvasopts;if(this?.__node?.graph){if(!_id)canvasopts=this.__node.graph.CANVASES?.[Object.keys(this.__node.graph.CANVASES)[0]];else canvasopts=this.__node.graph.CANVASES?.[_id]}else{if(!_id)canvasopts=globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];else canvasopts=globalThis.CANVASES?.[_id]}if(canvasopts){canvasopts.animating=false;if(typeof canvasopts.clear==="function")canvasopts.clear(canvasopts,canvasopts.canvas,canvasopts.context);return _id}return void 0}var workerCanvasRoutes={...proxyElementWorkerRoutes,Renderer,transferCanvas,setupCanvas,setDraw,drawFrame,clearCanvas,initCanvas,updateCanvas,setProps,startAnim,stopAnim};function parseFunctionFromText3(method=""){let getFunctionBody=methodString=>{return methodString.replace(/^\\W*(function[^{]+\\{([\\s\\S]*)\\}|[^=]+=>[^{]*\\{([\\s\\S]*)\\}|[^=]+=>(.+))/i,"$2$3$4")};let getFunctionHead=methodString=>{let startindex=methodString.indexOf("=>")+1;if(startindex<=0){startindex=methodString.indexOf("){")}if(startindex<=0){startindex=methodString.indexOf(") {")}return methodString.slice(0,methodString.indexOf("{",startindex)+1)};let newFuncHead=getFunctionHead(method);let newFuncBody=getFunctionBody(method);let newFunc;if(newFuncHead.includes("function")){let varName=newFuncHead.split("(")[1].split(")")[0];newFunc=new Function(varName,newFuncBody)}else{if(newFuncHead.substring(0,6)===newFuncBody.substring(0,6)){let varName=newFuncHead.split("(")[1].split(")")[0];newFunc=new Function(varName,newFuncBody.substring(newFuncBody.indexOf("{")+1,newFuncBody.length-1))}else{try{newFunc=(0,eval)(newFuncHead+newFuncBody+"}")}catch{}}}return newFunc}var algorithms={};var loadAlgorithms=settings=>{return Object.assign(algorithms,settings)};function createSubprocess(options,inputs){let ctx={_id:options._id?options._id:\`algorithm\${Math.floor(Math.random()*1e15)}\`,ondata:options.ondata,run:data=>{return ctx.ondata(ctx,data)}};if(options.structs)recursivelyAssign3(ctx,JSON.parse(JSON.stringify(options.structs)));if(inputs)recursivelyAssign3(ctx,JSON.parse(JSON.stringify(inputs)));if(options.oncreate){ctx.oncreate=options.oncreate}if(ctx.oncreate){ctx.oncreate(ctx)}return ctx}var recursivelyAssign3=(target,obj)=>{for(const key in obj){if(typeof obj[key]==="object"&&!Array.isArray(obj[key])){if(typeof target[key]==="object"&&!Array.isArray(target[key]))recursivelyAssign3(target[key],obj[key]);else target[key]=recursivelyAssign3({},obj[key])}else target[key]=obj[key]}return target};var subprocessRoutes={...unsafeRoutes,loadAlgorithms,"initSubprocesses":async function initSubprocesses(subprocesses,service){if(!service)service=this.__node.graph;if(!service)return void 0;for(const p in subprocesses){let s=subprocesses[p];if(!s.worker&&s.url)s.worker=service.addWorker({url:s.url});if(!s.worker)continue;let w=s.worker;let wpId;wpId=service.establishMessageChannel(w.worker,s.source?.worker);if(!s.source)s.source=service;if(typeof s.subprocess==="object"){const p2=s.subprocess;if(!p2.name)continue;if(typeof p2.oncreate==="function"){p2.oncreate=p2.oncreate.toString()}if(typeof p2.ondata==="function"){p2.ondata=p2.ondata.toString()}s.worker.post("addSubprocessTemplate",[p2.name,p2.structs,p2.oncreate,p2.ondata,p2.props]);s.subprocess=p2.name}if(s.init){let r=await w.run(s.init,s.initArgs);s.otherArgs=r}if(s.otherArgs){w.run("setValue",["otherArgsProxy",Array.isArray(s.otherArgs)?s.otherArgs:[s.otherArgs]])}if(s.pipeTo){w.run("setValue",["routeProxy",s.route]);w.run("setValue",["pipeRoute",s.pipeTo.route]);if(s.url&&!s.pipeTo.worker){let w2=service.addWorker({url:s.url});s.pipeTo.portId=service.establishMessageChannel(w.worker,w2.worker);s.pipeTo.worker=w2}if(s.pipeTo.init){s.pipeTo.otherArgs=await s.pipeTo.worker.run(s.pipeTo.init,s.pipeTo.initArgs)}w.run("setValue",["pipePort",s.pipeTo.portId]);if(s.pipeTo.otherArgs)w.run("setValue",["otherPipeArgs",s.pipeTo.otherArgs]);service.transferFunction(w,function pipeResults(data){let inp=data;if(this.__node.graph.otherArgsProxy)inp=[data,...this.__node.graph.otherArgsProxy];let r=this.__node.graph.run(this.__node.graph.routeProxy,inp);if(!s.blocking)return new Promise(res=>{if(r instanceof Promise){r.then(rr=>{if(rr!==void 0){let args=rr;if(this.__node.graph.otherPipeArgs)args=[rr,...this.__node.graph.otherPipeArgs];if(this.workers[this.__node.graph.pipePort]){s.blocking=true;this.workers[this.__node.graph.pipePort].run(this.__node.graph.pipeRoute,args).then(result=>{s.blocking=false;res(result)})}}})}else if(r!==void 0){let args=r;if(this.__node.graph.otherPipeArgs)args=[r,...this.__node.graph.otherPipeArgs];if(this.workers[this.__node.graph.pipePort]){s.blocking=true;this.workers[this.__node.graph.pipePort].run(this.__node.graph.pipeRoute,args).then(result=>{s.blocking=false;res(result)})}}});return void 0},s.route+"_pipeResults");s.route=s.route+"_pipeResults"}else{w.run("setValue",["routeProxy",s.route]);service.transferFunction(w,function routeProxy(data){let r;if(this.__node.graph.otherArgsProxy)r=this.__node.graph.nodes.get(this.__node.graph.routeProxy).__operator(data,...this.__node.graph.otherArgsProxy);else r=this.__node.graph.nodes.get(this.__node.graph.routeProxy).__operator(data);if(this.__node.graph.state.triggers[this.__node.graph.routeProxy]){if(r instanceof Promise){r.then(rr=>{this.setState({[this.__node.graph.routeProxy]:rr})})}else this.setState({[this.__node.graph.routeProxy]:r})}return r},s.route+"_routeProxy");s.route=s.route+"_routeProxy";if(!s.stopped)w.run("subscribeToWorker",[s.subscribeRoute,wpId,s.route]).then(sub=>{s.sub=sub})}s.stop=async()=>{if(s.source&&typeof s.sub==="number"){s.source.unsubscribe(s.subscribeRoute,s.sub);return true}return void 0};s.start=async()=>{if(typeof s.sub!=="number")return w.run("subscribeToWorker",[s.subscribeRoute,wpId,s.route,s.blocking]).then(sub=>{s.sub=sub})};s.setArgs=async args=>{if(Array.isArray(args))await w.run("setValue",["otherArgsProxy",args]);else if(typeof args==="object"){for(const key in args){await w.run("setValue",[key,args[key]])}}return true};s.terminate=()=>{w.terminate();if(s.source?.worker&&typeof s.sub==="number"){s.source.post("unsubscribe",s.sub)}if(s.pipeTo?.worker){s.pipeTo.worker.terminate()}};if(s.callback)w.subscribe(s.route,res=>{if(typeof s.callback==="string")this.__node.graph.run(s.callback,res);else s.callback(res)})}return subprocesses},"addSubprocessTemplate":function subprocesstempalte(name,structs,oncreate,ondata,props){if(typeof oncreate==="string")oncreate=parseFunctionFromText(oncreate);if(typeof ondata==="string")ondata=parseFunctionFromText(ondata);if(typeof ondata==="function"){algorithms[name]={ondata,oncreate:typeof oncreate==="function"?oncreate:null,structs};if(typeof props==="object")Object.assign(algorithms[name],props);return true}},"updateSubprocess":function updatesubprocess(structs,_id){if(!this.__node.graph.ALGORITHMS)this.__node.graph.ALGORITHMS={};if(!_id)_id=Object.keys(this.__node.graph.ALGORITHMS)[0];if(!_id)return;Object.assign(this.__node.graph.ALGORITHMS[_id],structs)},"createSubprocess":function creatsubprocess(options,inputs){if(!this.__node.graph.ALGORITHMS)this.__node.graph.ALGORITHMS={};if(typeof options==="string"){options=algorithms[options]}if(typeof options==="object"){if(typeof options.ondata==="string")options.ondata=parseFunctionFromText(options.ondata);let ctx;if(typeof options?.ondata==="function")ctx=createSubprocess(options,inputs);if(ctx)this.__node.graph.ALGORITHMS[ctx._id]=ctx;console.log(ctx,options);if(ctx)return ctx._id}return false},"runSubprocess":function runsubprocess(data,_id){if(!this.__node.graph.ALGORITHMS)this.__node.graph.ALGORITHMS={};if(!_id)_id=Object.keys(this.__node.graph.ALGORITHMS)[0];if(!_id)return;let res=this.__node.graph.ALGORITHMS[_id].run(data);if(res!==void 0){if(Array.isArray(res)){let pass=[];res.forEach(r=>{if(r!==void 0){pass.push(r);this.__node.graph.setState({[_id]:r})}});if(pass.length>0){return pass}}else{this.__node.graph.setState({[_id]:res});return res}}}};var _ArrayManip=class{constructor(){this.recursivelyAssign=(target,obj)=>{for(const key in obj){if(typeof obj[key]==="object"){if(typeof target[key]==="object")this.recursivelyAssign(target[key],obj[key]);else target[key]=this.recursivelyAssign({},obj[key])}else target[key]=obj[key]}return target}}static autoscale(array,lineIdx=0,nLines=1,centerZero=false,ymin,ymax,clamp){if(array?.length===0)return array;let max=ymax?ymax:Math.max(...array);let min=ymin?ymin:Math.min(...array);let _lines=1/nLines;let scalar=1;if(centerZero){let absmax=Math.max(Math.abs(min),Math.abs(max));if(absmax!==0)scalar=_lines/absmax;return array.map(y=>{if(clamp){if(y<min)y=min;if(y>max)y=max}return y*scalar+(_lines*(lineIdx+1)*2-1-_lines)})}else{if(max===min){if(max!==0){scalar=_lines/max}else if(min!==0){scalar=_lines/Math.abs(min)}}else scalar=_lines/(max-min);return array.map(y=>{if(clamp){if(y<min)y=min;if(y>max)y=max}return 2*((y-min)*scalar-1/(2*nLines))+(_lines*(lineIdx+1)*2-1-_lines)})}}static genTimestamps(ct,sps9){let now=Date.now();let toInterp=[now-ct*1e3/sps9,now];return _ArrayManip.upsample(toInterp,ct)}static absmax(array){return Math.max(Math.abs(Math.min(...array)),Math.max(...array))}static downsample(array,fitCount,scalar=1){if(array.length>fitCount){let output=new Array(fitCount);let incr=array.length/fitCount;let lastIdx=array.length-1;let last=0;let counter=0;for(let i=incr;i<array.length;i+=incr){let rounded=Math.round(i);if(rounded>lastIdx)rounded=lastIdx;for(let j=last;j<rounded;j++){output[counter]+=array[j]}output[counter]/=(rounded-last)*scalar;counter++;last=rounded}return output}else return array}static upsample(array,fitCount,scalar=1){var linearInterpolate=function(before2,after2,atPoint2){return(before2+(after2-before2)*atPoint2)*scalar};var newData=new Array(fitCount);var springFactor=(array.length-1)/(fitCount-1);newData[0]=array[0];for(var i=1;i<fitCount-1;i++){var tmp=i*springFactor;var before=Math.floor(tmp);var after=Math.ceil(tmp);var atPoint=tmp-before;newData[i]=linearInterpolate(array[before],array[after],atPoint)}newData[fitCount-1]=array[array.length-1];return newData}static interpolate(array,fitCount,scalar=1){if(array.length>fitCount){return _ArrayManip.downsample(array,fitCount,scalar)}else if(array.length<fitCount){return _ArrayManip.upsample(array,fitCount,scalar)}return array}static HSLToRGB(h,s,l,scalar=255){s/=100;l/=100;let c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs(h/60%2-1)),m=l-c/2,r=0,g=0,b=0;if(0<=h&&h<60){r=c;g=x;b=0}else if(60<=h&&h<120){r=x;g=c;b=0}else if(120<=h&&h<180){r=0;g=c;b=x}else if(180<=h&&h<240){r=0;g=x;b=c}else if(240<=h&&h<300){r=x;g=0;b=c}else if(300<=h&&h<360){r=c;g=0;b=x}r=(r+m)*scalar;g=(g+m)*scalar;b=(b+m)*scalar;return[r,g,b]}static circularBuffer(arr,newEntries){if(newEntries.length<arr.length){let slice=arr.slice(newEntries.length);let len=arr.length;arr.splice(0,len,...slice,...newEntries)}else if(newEntries.length>arr.length){let len=arr.length;arr.splice(0,len,newEntries.slice(len-newEntries.length))}else{arr.splice(0,arr.length,...newEntries)}return arr}static reformatData(data,key){if(Array.isArray(data)){if(Array.isArray(data[0])){let d={};data.forEach((arr,i)=>{d[i]=arr});data=d;if(isNaN(data[0][0]))return void 0}else if(key){data={[key]:data};if(isNaN(data[key][0]))return void 0}else{data={0:data};if(isNaN(data[0][0]))return void 0}}else if(typeof data==="object"){for(const key2 in data){if(typeof data[key2]==="number")data[key2]=[data[key2]];else if(data[key2]?.values){if(typeof data[key2].values==="number")data[key2].values=[data[key2].values]}if(isNaN(data[key2][0]))return void 0}}else if(typeof data==="string"){let split;if(data.includes("\\r\\n")){let lines=data.split("\\r\\n");data={};lines.forEach((l,j)=>{if(l.includes("	")){split=l.split("	")}else if(l.includes(",")){split=l.split(",")}else if(l.includes("|")){split=l.split("|")}if(Array.isArray(split)){split.forEach((val,i)=>{if(val.includes(":")){let[key2,v]=val.split(":");let fl=parseFloat(v);if(fl)data[key2]=[fl];else return void 0}else{let fl=parseFloat(val);if(fl)data[i]=[fl];else return void 0}})}})}else if(data.includes("	")){split=data.split("	")}else if(data.includes(",")){split=data.split(",")}else if(data.includes("|")){split=data.split("|")}data={};if(Array.isArray(split)){split.forEach((val,i)=>{if(val.includes(":")){let[key2,v]=val.split(":");let fl=parseFloat(v);if(fl)data[key2]=[fl];else return void 0}else{let fl=parseFloat(val);if(fl)data[i]=[fl];else return void 0}})}}else if(typeof data==="number"){if(key)data={[key]:[data]};else data={0:[data]}}return data}static padTime(data,lastValue,time,targetFit){let slopeIncr=(data[0]-lastValue)/time/targetFit;let padded=[...new Array(targetFit-data.length).map((_,i)=>lastValue+slopeIncr*(i+1)),...data];return padded}static interpolateForTime(data,time,targetSPS){return _ArrayManip.interpolate(data,Math.ceil(targetSPS*time))}isTypedArray(x){return ArrayBuffer.isView(x)&&Object.prototype.toString.call(x)!=="[object DataView]"}spliceTypedArray(arr,start,end){let s=arr.subarray(0,start);let e;if(end){e=arr.subarray(end+1)}let n;if(s.length>0||e?.length>0)n=new arr.constructor(s.length+e.length);if(s.length>0)n.set(s);if(e&&e.length>0)n.set(e,s.length);return n}};var ArrayManip=_ArrayManip;ArrayManip.bufferValues=(objects,property,keys,buffer)=>{if(!Array.isArray(keys)&&typeof keys==="object")keys=Object.keys(keys);if(!buffer){let object_keys=Object.keys(objects);if(keys)buffer=new Float32Array(object_keys.length*keys.length);else{if(typeof objects[object_keys[0]][property]==="object"){keys=Object.keys(objects[object_keys[0]][property]);buffer=new Float32Array(object_keys.length*keys.length)}else buffer=new Float32Array(object_keys.length)}}let i=0;for(const key in objects){if(objects[key][property]){if(keys){for(let j=0;j<keys.length;j++){buffer[i]=objects[key][property][keys[j]];i++}}else{buffer[i]=objects[key][property];i++}}}return buffer};var rechk=/^([<>])?(([1-9]\\d*)?([xcbB?hHiIfdsp]))*$/;var refmt=/([1-9]\\d*)?([xcbB?hHiIfdsp])/g;var str=(v,o,c)=>String.fromCharCode(...new Uint8Array(v.buffer,v.byteOffset+o,c));var rts=(v,o,c,s)=>new Uint8Array(v.buffer,v.byteOffset+o,c).set(s.split("").map(str2=>str2.charCodeAt(0)));var pst=(v,o,c)=>str(v,o+1,Math.min(v.getUint8(o),c-1));var tsp=(v,o,c,s)=>{v.setUint8(o,s.length);rts(v,o+1,c-1,s)};var lut=le=>({x:c=>[1,c,0],c:c=>[c,1,o=>({u:v=>str(v,o,1),p:(v,c2)=>rts(v,o,1,c2)})],"?":c=>[c,1,o=>({u:v=>Boolean(v.getUint8(o)),p:(v,B)=>v.setUint8(o,B)})],b:c=>[c,1,o=>({u:v=>v.getInt8(o),p:(v,b)=>v.setInt8(o,b)})],B:c=>[c,1,o=>({u:v=>v.getUint8(o),p:(v,B)=>v.setUint8(o,B)})],h:c=>[c,2,o=>({u:v=>v.getInt16(o,le),p:(v,h)=>v.setInt16(o,h,le)})],H:c=>[c,2,o=>({u:v=>v.getUint16(o,le),p:(v,H)=>v.setUint16(o,H,le)})],i:c=>[c,4,o=>({u:v=>v.getInt32(o,le),p:(v,i)=>v.setInt32(o,i,le)})],I:c=>[c,4,o=>({u:v=>v.getUint32(o,le),p:(v,I)=>v.setUint32(o,I,le)})],f:c=>[c,4,o=>({u:v=>v.getFloat32(o,le),p:(v,f)=>v.setFloat32(o,f,le)})],d:c=>[c,8,o=>({u:v=>v.getFloat64(o,le),p:(v,d)=>v.setFloat64(o,d,le)})],s:c=>[1,c,o=>({u:v=>str(v,o,c),p:(v,s)=>rts(v,o,c,s.slice(0,c))})],p:c=>[1,c,o=>({u:v=>pst(v,o,c),p:(v,s)=>tsp(v,o,c,s.slice(0,c-1))})]});var errbuf=new RangeError("Structure larger than remaining buffer");var errval=new RangeError("Not enough values for structure");var _ByteParser=class extends ArrayManip{static toDataView(value){if(!(value instanceof DataView)){if(typeof value==="string"&&parseInt(value))value=parseInt(value);if(typeof value==="string"){let enc=new TextEncoder;let hascodes={};for(const code in _ByteParser.codes){while(value.indexOf(code)>-1){let idx=value.indexOf(code);value=value.replace(code,"");hascodes[idx]=code}}let encoded=Array.from(enc.encode(value));for(const key in hascodes){encoded.splice(parseInt(key),0,_ByteParser.codes[hascodes[key]])}value=new DataView(new Uint8Array(encoded).buffer)}else if(typeof value==="number"){let tmp=value;if(value<256){value=new DataView(new ArrayBuffer(1));value.setUint8(0,tmp)}else if(value<65536){value=new DataView(new ArrayBuffer(2));value.setInt16(0,tmp)}else{value=new DataView(new ArrayBuffer(4));value.setUint32(0,tmp)}}else if(value instanceof ArrayBuffer||typeof SharedArrayBuffer!=="undefined"&&value instanceof SharedArrayBuffer){value=new DataView(value)}else if(Array.isArray(value)){value=new DataView(Uint8Array.from(value).buffer)}else if(typeof value==="object"){value=new TextEncoder().encode(JSON.stringify(value))}}return value}static searchBuffer(buffer,searchString,limit){var needle=searchString;var haystack=buffer;var search=_ByteParser.boyerMoore(needle);var skip=search.byteLength;var indices=[];for(var i=search(haystack);i!==-1;i=search(haystack,i+skip)){indices.push(i);if(limit){if(indices.length>=limit)break}}return indices}static bytesToInt16(x0,x1){let int16=(255&x0)<<8|255&x1;if((int16&32768)>0){int16|=4294901760}else{int16&=65535}return int16}static bytesToUInt16(x0,x1){return x0*256+x1}static Uint16ToBytes(y){return[y&255,y>>8&255]}static bytesToInt24(x0,x1,x2){let int24=(255&x0)<<16|(255&x1)<<8|255&x2;if((int24&8388608)>0){int24|=4278190080}else{int24&=16777215}return int24}static bytesToUInt24(x0,x1,x2){return x0*65536+x1*256+x2}static Uint24ToBytes(y){return[y&255,y>>8&255,y>>16&255]}static bytesToInt32(x0,x1,x2,x3){let int32=(255&x0)<<24|(255&x1)<<16|(255&x2)<<8|255&x3;if((int32&2147483648)>0){int32|=0}else{int32&=4294967295}return int32}static bytesToUInt32(x0,x1,x2,x3){return x0*16777216+x1*65536+x2*256+x3}static Uint32ToBytes(y){return[y&255,y>>8&255,y>>16&255,y>>24&255]}static get2sCompliment(val,nbits3){if(val>4294967296)return null;return val<<32-nbits3>>32-nbits3}static getSignedInt(...args){let pos=0;function getInt(size){var value=0;var first=true;while(size--){if(first){let byte=args[pos++];value+=byte&127;if(byte&128){value-=128}first=false}else{value*=256;value+=args[pos++]}}return value}return getInt(args.length)}static asUint8Array(input){if(input instanceof Uint8Array){return input}else if(typeof input==="string"){var arr=new Uint8Array(input.length);for(var i=0;i<input.length;i++){var c=input.charCodeAt(i);if(c>127){throw new TypeError("Only ASCII patterns are supported")}arr[i]=c}return arr}else{return new Uint8Array(input)}}static boyerMoore(patternBuffer){var pattern=_ByteParser.asUint8Array(patternBuffer);var M=pattern.length;if(M===0){throw new TypeError("patternBuffer must be at least 1 byte long")}var R=256;var rightmost_positions=new Int32Array(R);for(var c=0;c<R;c++){rightmost_positions[c]=-1}for(var j=0;j<M;j++){rightmost_positions[pattern[j]]=j}var boyerMooreSearch=(txtBuffer,start,end)=>{var txt=_ByteParser.asUint8Array(txtBuffer);if(start===void 0)start=0;if(end===void 0)end=txt.length;var pat=pattern;var right=rightmost_positions;var lastIndex=end-pat.length;var lastPatIndex=pat.length-1;var skip;for(var i=start;i<=lastIndex;i+=skip){skip=0;for(var j2=lastPatIndex;j2>=0;j2--){var c2=txt[i+j2];if(pat[j2]!==c2){skip=Math.max(1,j2-right[c2]);break}}if(skip===0){return i}}return-1};boyerMooreSearch.byteLength=pattern.byteLength;return boyerMooreSearch}static struct(format){let fns=[],size=0,m=rechk.exec(format);if(!m){throw new RangeError("Invalid format string")}const t=lut("<"===m[1]),lu=(n,c)=>t[c](n?parseInt(n,10):1);while(m=refmt.exec(format)){((r,s,f)=>{for(let i=0;i<r;++i,size+=s){if(f){fns.push(f(size))}}})(...lu(...m.slice(1)))}const unpack_from=(arrb,offs)=>{if(arrb.byteLength<(offs|0)+size){throw errbuf}let v=new DataView(arrb,offs|0);return fns.map(f=>f.u(v))};const pack_into=(arrb,offs,...values)=>{if(values.length<fns.length){throw errval}if(arrb.byteLength<offs+size){throw errbuf}const v=new DataView(arrb,offs);new Uint8Array(arrb,offs,size).fill(0);fns.forEach((f,i)=>f.p(v,values[i]))};const pack=(...values)=>{let b=new ArrayBuffer(size);pack_into(b,0,...values);return b};const unpack=arrb=>unpack_from(arrb,0);function*iter_unpack(arrb){for(let offs=0;offs+size<=arrb.byteLength;offs+=size){yield unpack_from(arrb,offs)}}return Object.freeze({unpack,pack,unpack_from,pack_into,iter_unpack,format,size})}};var ByteParser=_ByteParser;ByteParser.codes={"\\\\n":10,"\\\\r":13,"\\\\t":9,"\\\\s":32,"\\\\b":8,"\\\\f":12,"\\\\":92};var WebSerial=class extends ByteParser{constructor(){super(...arguments);this.streams={};this.createStream=options=>{let stream={_id:options._id?options._id:\`stream\${Math.floor(Math.random()*1e15)}\`,info:options.port.getInfo(),running:false,...options};if(options.port?.readable){if(options.transforms){stream.reader=WebSerial.setStreamTransforms(options.port.readable,options.transforms).getReader()}else{stream.reader=options.port.readable.getReader()}}this.streams[stream._id]=stream;return stream}}getPorts(){return navigator.serial.getPorts()}requestPort(usbVendorId,usbProductId){let options={};if(usbVendorId){options.usbVendorId=usbVendorId}if(usbProductId){options.usbProductId=usbProductId}if(options.usbVendorId)return navigator.serial.requestPort({filters:[options]});else return navigator.serial.requestPort()}openPort(port,options){if(options)options=Object.assign({},options);if(options?.ondisconnect){port.ondisconnect=options.ondisconnect;delete options.ondisconnect}return port.open(options).then(()=>{if(options?.onconnect)options.onconnect(port)})}async readWithTimeout(port,timeout){const reader=port.readable.getReader();const timer=setTimeout(()=>{reader.releaseLock()},timeout);const result=await reader.read();clearTimeout(timer);reader.releaseLock();return result}async writePort(port,message){const writer=port.writable.getWriter();await writer.write(WebSerial.toDataView(message));writer.releaseLock();return true}getSignals(port){return port.getSignals()}setSignals(port,signals){return port.setSignals(signals)}readStream(stream){if(stream.reader&&!stream.running){let reader=stream.reader;if(stream.buffering){if(typeof stream.buffering!=="object")stream.buffering={};if(!stream.buffering.buffer){stream.buffering.buffer=[]}if(!stream.buffering.searchBytes)stream.buffering.searchBytes=new Uint8Array([13,10])}let readLoop=()=>{if(stream.port.readable&&stream.running){reader.read().then(result=>{if(result.done)reader.releaseLock();else{if(stream.buffering){stream.buffering.buffer.push(...result.value);const needle=stream.buffering.searchBytes;const haystack=stream.buffering.buffer;const search=WebSerial.boyerMoore(needle);const skip=search.byteLength;let nextIndex=-1;for(var i=search(haystack);i!==-1;i=search(haystack,i+skip)){if(!stream.buffering.locked&&!("lockIdx"in stream.buffering))stream.buffering.lockIdx=i;else{nextIndex=i;if(nextIndex>=0){if(!stream.buffering.locked){stream.ondata(new Uint8Array(stream.buffering.buffer.splice(stream.buffering.lockIdx+stream.buffering.searchBytes.length,nextIndex+stream.buffering.searchBytes.length)));stream.buffering.buffer.splice(0,stream.buffering.searchBytes.length);stream.buffering.locked=true}else if(nextIndex>0){stream.ondata(new Uint8Array(stream.buffering.buffer.splice(stream.buffering.searchBytes.length,nextIndex)))}}}}}else stream.ondata(result.value);setTimeout(()=>{readLoop()},stream.frequency)}}).catch(er=>{console.error(stream._id," Read error:",er);if(er.message.includes("overrun")||er.message.includes("framing")){delete stream.reader;this.reconnect(stream)}})}else if(!stream.running&&stream.port.readable){try{reader.releaseLock()}catch(er){console.error(er)}}};stream.running=true;readLoop();return stream}return void 0}writeStream(stream,message){if(typeof stream==="string")stream=this.streams[stream];if(stream.port.writable){let writer=stream.port.writable.getWriter();writer.write(WebSerial.toDataView(message));writer.releaseLock();return true}return void 0}closeStream(stream,onclose){if(typeof stream==="string")stream=this.streams[stream];stream.running=false;return new Promise((res,rej)=>{if(stream.settings.beforedisconnect){stream.settings.beforedisconnect(this,stream.port)}setTimeout(async()=>{if(stream.port.readable&&stream.reader){try{stream.reader.releaseLock()}catch(er){console.error(er)}if(stream.transforms)try{await stream.reader.cancel()}catch(err){console.error(err)}}try{await stream.port.close().then(()=>{if(onclose)onclose(this.streams[stream._id])});delete this.streams[stream._id];res(true)}catch(er){rej(er)}},300)})}reconnect(stream,options){if(typeof stream==="string")stream=this.streams[stream];return new Promise((res,rej)=>{if(typeof stream!=="object"){rej(void 0);return}let info=stream.port.getInfo();this.closeStream(stream._id).then(closed=>{setTimeout(()=>{this.getPorts().then(ports=>{for(let i=0;i<ports.length;i++){if(ports[i].getInfo().usbVendorId===info.usbVendorId&&ports[i].getInfo().usbProductId===info.usbProductId){if(!options)options=stream;else options._id=stream._id;delete options.port;this.openPort(ports[i],options.settings).then(()=>{const stream2=this.createStream({...options,port:ports[i]});this.readStream(stream2);res(stream2)}).catch(rej)}}}).catch(rej)},100)})})}static setStreamTransforms(stream,transforms){let transform=[];Object.keys(transforms).forEach(t=>{let opt=transforms[t];if(opt instanceof TransformStream){transform.push(opt)}else{if(!opt.start)opt.start=function start(){};if(!opt.flush)opt.flush=function flush(){};let transformer=new TransformStream({start:opt.start,transform:opt.transform,flush:opt.flush},opt.writableStrategy,opt.readableStrategy);transform.push(transformer)}});let str2=stream;transform.forEach(transform2=>{str2=str2.pipeThrough(transform2)});return str2}};function ads131m08codec(data){let arr;if(data.getInt8)arr=new Uint8Array(data.buffer);else if(!data.buffer)arr=new Uint8Array(data);else arr=data;let output={0:new Array(9),1:new Array(9),2:new Array(9),3:new Array(9),4:new Array(9),5:new Array(9),6:new Array(9),7:new Array(9),timestamp:Date.now()};for(let i=0;i<9;i++){let j=i*25;output[0][i]=ByteParser.bytesToInt24(arr[j],arr[j+1],arr[j+2]);output[1][i]=ByteParser.bytesToInt24(arr[j+3],arr[j+4],arr[j+5]);output[2][i]=ByteParser.bytesToInt24(arr[j+6],arr[j+7],arr[j+8]);output[3][i]=ByteParser.bytesToInt24(arr[j+9],arr[j+10],arr[j+11]);output[4][i]=ByteParser.bytesToInt24(arr[j+12],arr[j+13],arr[j+14]);output[5][i]=ByteParser.bytesToInt24(arr[j+15],arr[j+16],arr[j+17]);output[6][i]=ByteParser.bytesToInt24(arr[j+18],arr[j+19],arr[j+20]);output[7][i]=ByteParser.bytesToInt24(arr[j+21],arr[j+22],arr[j+23])}return output}var decoder=new TextDecoder;function ads131m08_arduinocodec(data){const parsed=decoder.decode(data);let split;if(parsed.includes("|"))split=parsed.split("|");else if(split.includes(","))split=parsed.split(",");else split=parsed.split("	");return{"0":parseInt(split[0]),"1":parseInt(split[1]),"2":parseInt(split[2]),"3":parseInt(split[3]),"4":parseInt(split[4]),"5":parseInt(split[5]),"6":parseInt(split[6]),"7":parseInt(split[7]),timestamp:Date.now()}}var sps=250;var defaultChartSetting={nSec:10,sps,units:"mV"};var ads131m08ChartSettings={lines:{"0":JSON.parse(JSON.stringify(defaultChartSetting)),"1":JSON.parse(JSON.stringify(defaultChartSetting)),"2":JSON.parse(JSON.stringify(defaultChartSetting)),"3":JSON.parse(JSON.stringify(defaultChartSetting)),"4":JSON.parse(JSON.stringify(defaultChartSetting)),"5":JSON.parse(JSON.stringify(defaultChartSetting)),"6":JSON.parse(JSON.stringify(defaultChartSetting)),"7":JSON.parse(JSON.stringify(defaultChartSetting))}};var gain=32;var nbits=24;var vref=1.2;var defaultsetting={sps,useDCBlock:false,useBandpass:false,bandpassLower:3,bandpassUpper:45,useScaling:true,scalar:.96*1e3*vref/(gain*(Math.pow(2,nbits)-1))};var ads131m08FilterSettings={"0":JSON.parse(JSON.stringify(defaultsetting)),"1":JSON.parse(JSON.stringify(defaultsetting)),"2":JSON.parse(JSON.stringify(defaultsetting)),"3":JSON.parse(JSON.stringify(defaultsetting)),"4":JSON.parse(JSON.stringify(defaultsetting)),"5":JSON.parse(JSON.stringify(defaultsetting)),"6":JSON.parse(JSON.stringify(defaultsetting)),"7":JSON.parse(JSON.stringify(defaultsetting))};function cytoncodec(data){let arr;if(!data.buffer)arr=new Uint8Array(data);else arr=data;let output={};for(let i=0;i<8;i++){let idx=1+3*i;output[i]=ByteParser.bytesToInt24(arr[idx],arr[idx+1],arr[idx+2])}let accIdx=25;output.ax=ByteParser.bytesToInt16(arr[accIdx],arr[accIdx+1]);output.ay=ByteParser.bytesToInt16(arr[accIdx+2],arr[accIdx+3]);output.az=ByteParser.bytesToInt16(arr[accIdx+4],arr[accIdx+5]);output.gx=ByteParser.bytesToInt16(arr[accIdx+6],arr[accIdx+7]);output.gy=ByteParser.bytesToInt16(arr[accIdx+8],arr[accIdx+9]);output.gz=ByteParser.bytesToInt16(arr[accIdx+10],arr[accIdx+11]);output.timestamp=Date.now();return output}function daisycytoncodec(data){let arr;if(data.getInt8)arr=new Uint8Array(data.buffer);else if(!data.buffer)arr=new Uint8Array(data);else arr=data;let output={};for(let i=0;i<8;i++){let idx=1+3*i;if(arr[0]%2===0)output[i+7]=ByteParser.bytesToInt24(arr[idx],arr[idx+1],arr[idx+2]);else output[i]=ByteParser.bytesToInt24(arr[idx],arr[idx+1],arr[idx+2])}let accIdx=25;output.ax=ByteParser.bytesToInt16(arr[accIdx],arr[accIdx+1]);output.ay=ByteParser.bytesToInt16(arr[accIdx+2],arr[accIdx+3]);output.az=ByteParser.bytesToInt16(arr[accIdx+4],arr[accIdx+5]);output.gx=ByteParser.bytesToInt16(arr[accIdx+6],arr[accIdx+7]);output.gy=ByteParser.bytesToInt16(arr[accIdx+8],arr[accIdx+9]);output.gz=ByteParser.bytesToInt16(arr[accIdx+10],arr[accIdx+11]);return output}var sps2=250;var cytonSerialSettings={baudRate:115200,codec:cytoncodec,write:"b",beforedisconnect:(client,port)=>{client.writePort(port,"s")},buffering:{searchBytes:new Uint8Array([192,160])},sps:sps2};var daisycytonSerialSettings={baudRate:115200,codec:daisycytoncodec,write:"b",beforedisconnect:(client,port)=>{client.writePort(port,"s")},buffering:{searchBytes:new Uint8Array([192,160])},sps:sps2};var defaultChartSetting2={nSec:10,sps:sps2,units:"mV"};var defaultChartSetting22={nSec:10,sps:sps2};var cytonChartSettings={lines:{"0":JSON.parse(JSON.stringify(defaultChartSetting2)),"1":JSON.parse(JSON.stringify(defaultChartSetting2)),"2":JSON.parse(JSON.stringify(defaultChartSetting2)),"3":JSON.parse(JSON.stringify(defaultChartSetting2)),"4":JSON.parse(JSON.stringify(defaultChartSetting2)),"5":JSON.parse(JSON.stringify(defaultChartSetting2)),"6":JSON.parse(JSON.stringify(defaultChartSetting2)),"7":JSON.parse(JSON.stringify(defaultChartSetting2)),"ax":JSON.parse(JSON.stringify(defaultChartSetting22)),"ay":JSON.parse(JSON.stringify(defaultChartSetting22)),"az":JSON.parse(JSON.stringify(defaultChartSetting22)),"gx":JSON.parse(JSON.stringify(defaultChartSetting22)),"gy":JSON.parse(JSON.stringify(defaultChartSetting22)),"gz":JSON.parse(JSON.stringify(defaultChartSetting22))},generateNewLines:true};var defaultsetting2={sps:sps2,useDCBlock:true,useBandpass:true,bandpassLower:3,bandpassUpper:45,useScaling:true,scalar:1e3*4.5/(24*(Math.pow(2,23)-1))};var cytonFilterSettings={"0":JSON.parse(JSON.stringify(defaultsetting2)),"1":JSON.parse(JSON.stringify(defaultsetting2)),"2":JSON.parse(JSON.stringify(defaultsetting2)),"3":JSON.parse(JSON.stringify(defaultsetting2)),"4":JSON.parse(JSON.stringify(defaultsetting2)),"5":JSON.parse(JSON.stringify(defaultsetting2)),"6":JSON.parse(JSON.stringify(defaultsetting2)),"7":JSON.parse(JSON.stringify(defaultsetting2)),"8":JSON.parse(JSON.stringify(defaultsetting2)),"9":JSON.parse(JSON.stringify(defaultsetting2)),"10":JSON.parse(JSON.stringify(defaultsetting2)),"11":JSON.parse(JSON.stringify(defaultsetting2)),"12":JSON.parse(JSON.stringify(defaultsetting2)),"13":JSON.parse(JSON.stringify(defaultsetting2)),"14":JSON.parse(JSON.stringify(defaultsetting2)),"15":JSON.parse(JSON.stringify(defaultsetting2))};function freeeeg128codec(data){let arr;if(data.getInt8)arr=new Uint8Array(data.buffer);else if(!data.buffer)arr=new Uint8Array(data);else arr=data;let output={};for(let i=0;i<128;i++){let idx=i*3+1;output[i]=ByteParser.bytesToInt24(arr[idx],arr[idx+1],arr[idx+2])}let accIdx=385;output["ax"]=ByteParser.bytesToInt16(arr[accIdx],arr[accIdx+1]);output["ay"]=ByteParser.bytesToInt16(arr[accIdx+2],arr[accIdx+3]);output["az"]=ByteParser.bytesToInt16(arr[accIdx+4],arr[accIdx+5]);output["gx"]=ByteParser.bytesToInt16(arr[accIdx+6],arr[accIdx+7]);output["gy"]=ByteParser.bytesToInt16(arr[accIdx+8],arr[accIdx+9]);output["gz"]=ByteParser.bytesToInt16(arr[accIdx+10],arr[accIdx+11]);output.timestamp=Date.now();return output}var sps3=250;var freeeeg128SerialSettings={baudRate:921600,bufferSize:2e3,frequency:1.9,codec:freeeeg128codec,sps:sps3,buffering:{searchBytes:new Uint8Array([192,160])}};var freeeeg128ChartSettings={lines:{"ax":{nSec:10,sps:sps3},"ay":{nSec:10,sps:sps3},"az":{nSec:10,sps:sps3},"gx":{nSec:10,sps:sps3},"gy":{nSec:10,sps:sps3},"gz":{nSec:10,sps:sps3}}};var freeeeg128FilterSettings={};for(let i=0;i<128;i++){freeeeg128ChartSettings.lines[i]={sps:sps3,nSec:10,units:"mV"};freeeeg128FilterSettings[i]={sps:250,useDCBlock:true,useBandpass:true,bandpassLower:3,bandpassUpper:45,scalar:1e3*2.5/(32*(Math.pow(2,24)-1))}}function freeeeg32codec(data){let arr;if(data.getInt8)arr=new Uint8Array(data.buffer);else if(!data.buffer)arr=new Uint8Array(data);else arr=data;let output={};for(let i=0;i<32;i++){let idx=i*3+1;output[i]=ByteParser.bytesToInt24(arr[idx],arr[idx+1],arr[idx+2])}let accIdx=97;output["ax"]=ByteParser.bytesToInt16(arr[accIdx],arr[accIdx+1]);output["ay"]=ByteParser.bytesToInt16(arr[accIdx+2],arr[accIdx+3]);output["az"]=ByteParser.bytesToInt16(arr[accIdx+4],arr[accIdx+5]);output["gx"]=ByteParser.bytesToInt16(arr[accIdx+6],arr[accIdx+7]);output["gy"]=ByteParser.bytesToInt16(arr[accIdx+8],arr[accIdx+9]);output["gz"]=ByteParser.bytesToInt16(arr[accIdx+10],arr[accIdx+11]);output.timestamp=Date.now();return output}var sps4=512;var freeeeg32SerialSettings={baudRate:921600,bufferSize:2e3,frequency:1.9,codec:freeeeg32codec,sps:sps4,buffering:{searchBytes:new Uint8Array([192,160])}};var freeeeg32_optical_SerialSettings={baudRate:1e6,bufferSize:2e3,frequency:1.9,codec:freeeeg32codec,sps:sps4,buffering:{searchBytes:new Uint8Array([192,160])}};var defaultChartSetting3={nSec:10,sps:sps4};var freeeeg32ChartSettings={lines:{"ax":JSON.parse(JSON.stringify(defaultChartSetting3)),"ay":JSON.parse(JSON.stringify(defaultChartSetting3)),"az":JSON.parse(JSON.stringify(defaultChartSetting3)),"gx":JSON.parse(JSON.stringify(defaultChartSetting3)),"gy":JSON.parse(JSON.stringify(defaultChartSetting3)),"gz":JSON.parse(JSON.stringify(defaultChartSetting3))}};var freeeeg32FilterSettings={};for(let i=0;i<32;i++){freeeeg32ChartSettings.lines[i]={sps:sps4,nSec:10,units:"mV"};freeeeg32FilterSettings[i]={sps:sps4,useDCBlock:true,useBandpass:true,bandpassLower:3,bandpassUpper:45,useScaling:true,scalar:1e3*2.5/(8*(Math.pow(2,24)-1))}}var textdecoder=new TextDecoder;function hegduinocodec(value){let output={timestamp:0,red:0,infrared:0,heg:0,ambient:0,temperature:0};let txt=textdecoder.decode(value);let line=txt.split("|");if(line.length===3){output.timestamp=Date.now();output.red=parseInt(line[0]);output.infrared=parseInt(line[1]);output.heg=parseFloat(line[2])}else if(line.length>=2){output.timestamp=Date.now();output.red=parseInt(line[1]);output.infrared=parseInt(line[2]);output.heg=parseFloat(line[3]);if(line[4])output.ambient=parseFloat(line[4]);if(line[5])output.temperature=parseFloat(line[5]);return output}else return txt}var sps5=40;var hegduinoSerialSettings={baudRate:115200,write:"t\\n",codec:hegduinocodec,sps:sps5};var hegduinoV1SerialSettings=Object.assign({},hegduinoSerialSettings);hegduinoV1SerialSettings.sps=19;var hegduinoBLESettings={sps:sps5,services:{["6E400001-B5A3-F393-E0A9-E50E24DCCA9E".toLowerCase()]:{"6e400002-b5a3-f393-e0a9-e50e24dcca9e":{write:"t"},"6e400003-b5a3-f393-e0a9-e50e24dcca9e":{notify:true,notifyCallback:void 0,codec:hegduinocodec,sps:sps5}},["6E400004-B5A3-F393-E0A9-E50E24DCCA9E".toLowerCase()]:{["6E400005-B5A3-F393-E0A9-E50E24DCCA9E".toLowerCase()]:{read:true},["6E400006-B5A3-F393-E0A9-E50E24DCCA9E".toLowerCase()]:{write:void 0,notify:true,notifyCallback:void 0},["6E400007-B5A3-F393-E0A9-E50E24DCCA9E".toLowerCase()]:{read:true}}},androidWebBLE:"o"};var hegduinoV1BLESettings=Object.assign({},hegduinoSerialSettings);hegduinoV1BLESettings.sps=19;function max3010xcodec(data){let arr;if(data.getInt8)arr=new Uint8Array(data.buffer);else if(!data.buffer)arr=new Uint8Array(data);else arr=data;const output={"red":new Array(32),"ir":new Array(32),"max_dietemp":ByteParser.get2sCompliment(arr[193],8)+.0625*arr[194],"timestamp":Date.now()};let i=0;while(i<32){let idx=i*6;if(i%2===0){output["ir"][i]=(arr[idx+1]<<16|arr[idx+2]<<8|arr[idx+3])&524287;output["ir"][i+1]=(arr[idx+4]<<16|arr[idx+5]<<8|arr[idx+6])&524287}else{output["red"][i-1]=(arr[idx+1]<<16|arr[idx+2]<<8|arr[idx+3])&524287;output["red"][i]=(arr[idx+4]<<16|arr[idx+5]<<8|arr[idx+6])&524287}i++}return output}function mpu6050codec(data){let arr;if(data.getInt8)arr=new Uint8Array(data.buffer);else if(!data.buffer)arr=new Uint8Array(data);else arr=data;let output={"ax":new Array(20),"ay":new Array(20),"az":new Array(20),"gx":new Array(20),"gy":new Array(20),"gz":new Array(20),"mpu_dietemp":(ByteParser.bytesToInt16(arr[241],arr[242])+521)/340+35,timestamp:Date.now()};for(let i=0;i<20;i++){let idx=i*12;output.ax[i]=ByteParser.bytesToInt16(arr[idx+1],arr[idx+2]);output.ay[i]=ByteParser.bytesToInt16(arr[idx+3],arr[idx+4]);output.az[i]=ByteParser.bytesToInt16(arr[idx+5],arr[idx+6]);output.gx[i]=ByteParser.bytesToInt16(arr[idx+7],arr[idx+8]);output.gy[i]=ByteParser.bytesToInt16(arr[idx+9],arr[idx+10]);output.gz[i]=ByteParser.bytesToInt16(arr[idx+11],arr[idx+12])}return output}function cognixionONE_EEG_codec(data){let arr;if(data.getInt8)arr=new Uint8Array(data.buffer);else if(!data.buffer)arr=new Uint8Array(data);else arr=data;let output={0:new Array,1:new Array,2:new Array,3:new Array,4:new Array,5:new Array,6:new Array,7:new Array,timestamp:Date.now()};for(let i=0;i<7;i++){let j=i*26+1;if(!arr[j+23])break;output[0][i]=ByteParser.bytesToUInt24(arr[j],arr[j+1],arr[j+2]);output[1][i]=ByteParser.bytesToUInt24(arr[j+3],arr[j+4],arr[j+5]);output[2][i]=ByteParser.bytesToUInt24(arr[j+6],arr[j+7],arr[j+8]);output[3][i]=ByteParser.bytesToUInt24(arr[j+9],arr[j+10],arr[j+11]);output[4][i]=ByteParser.bytesToUInt24(arr[j+12],arr[j+13],arr[j+14]);output[5][i]=ByteParser.bytesToUInt24(arr[j+15],arr[j+16],arr[j+17]);output[6][i]=ByteParser.bytesToUInt24(arr[j+18],arr[j+19],arr[j+20]);output[7][i]=ByteParser.bytesToUInt24(arr[j+21],arr[j+22],arr[j+23])}return output}var sps6=250;var cognixionONEBLESettings={services:{["82046698-6313-4BB1-9645-6BA28BF86DF5".toLowerCase()]:{["8204669A-6313-4BB1-9645-6BA28BF86DF5".toLowerCase()]:{notify:true,notifyCallback:void 0,codec:cognixionONE_EEG_codec,sps:sps6}},["82E12914-9AFA-4648-BD1B-8E2B3DC6DAAF".toLowerCase()]:{["82E12915-9AFA-4648-BD1B-8E2B3DC6DAAF".toLowerCase()]:{write:void 0},["82E12916-9AFA-4648-BD1B-8E2B3DC6DAAF".toLowerCase()]:{read:true}}},sps:sps6};var defaultChartSetting4={nSec:10,sps:sps6,units:"mV"};var cognixionONEChartSettings={lines:{"0":JSON.parse(JSON.stringify(defaultChartSetting4)),"1":JSON.parse(JSON.stringify(defaultChartSetting4)),"2":JSON.parse(JSON.stringify(defaultChartSetting4)),"3":JSON.parse(JSON.stringify(defaultChartSetting4)),"4":JSON.parse(JSON.stringify(defaultChartSetting4)),"5":JSON.parse(JSON.stringify(defaultChartSetting4)),"6":JSON.parse(JSON.stringify(defaultChartSetting4)),"7":JSON.parse(JSON.stringify(defaultChartSetting4))}};var PeanutCodes={2:{type:"POOR_SIGNAL",format:"<B",byteLength:1},144:{type:"heg",format:"<i",byteLength:4},145:{type:"filteredHEG",format:"<i",byteLength:4},147:{type:"rawdata4",format:"<iiii",byteLength:4*4},148:{type:"rawdata6",format:"<iiiiii",byteLength:4*6},160:{type:"sampleNumber",format:"<i",byteLength:4},176:{type:"debug0",format:"<i",byteLength:4},177:{type:"debug1",format:"<i",byteLength:4},178:{type:"debug2",format:"<i",byteLength:4},179:{type:"debug3",format:"<i",byteLength:4},180:{type:"debug4",format:"<iiiiii",byteLength:4*6},181:{type:"debug4",format:"<iiiiii",byteLength:4*6},182:{type:"rawdata27",format:"<B"+"i".repeat(26),byteLength:1+4*26}};function peanutcodec(data){let result={};let i=0;while(i<data.length){if(PeanutCodes[data[i]]&&i+1+PeanutCodes[data[i]].byteLength<=data.length){let slice=data.slice(i+1,i+1+PeanutCodes[data[i]].byteLength).buffer;let unpacked=ByteParser.struct(PeanutCodes[data[i]].format).unpack(slice);let code=PeanutCodes[data[i]].type;if(code==="unfilteredHEG"||code==="heg")unpacked=unpacked[0]/256;else if(code==="POOR_SIGNAL"||code==="sampleNumber"||code==="debug0"||code==="debug1"||code==="debug2"||code==="debug3")unpacked=unpacked[0];if(!result[PeanutCodes[data[i]].type]){if(Array.isArray(unpacked))result[PeanutCodes[data[i]].type]=unpacked;else result[PeanutCodes[data[i]].type]=[unpacked]}else{if(Array.isArray(unpacked))result[PeanutCodes[data[i]].type].push(...unpacked);else result[PeanutCodes[data[i]].type].push(unpacked)}i+=PeanutCodes[data[i]].byteLength+1}else i++}result.timestamp=Date.now();return result}var peanutSerialSettings={baudRate:38400,bufferSize:400,write:"protocol 3\\n",buffering:{searchBytes:new Uint8Array([170,170])},codec:peanutcodec,sps:10.101};var sealevel_hpa=1013.25;var bme280codec=data=>{let arr;if(data.getInt8)arr=new Uint8Array(data.buffer);else if(!data.buffer)arr=new Uint8Array(data);else arr=data;let output={temp:[],pressure:[],humidity:[],altitude:[]};for(let j=0;j<3;j++){let i=j*24;let tint=ByteParser.bytesToUInt32(arr[0+i],arr[1+i],arr[2+i],arr[3+i]);let tfrac=ByteParser.bytesToUInt32(arr[4+i],arr[5+i],arr[6+i],arr[7+i]);output.temp.push(tint+tfrac/Math.pow(10,Math.ceil(Math.log10(tfrac))));let pint=ByteParser.bytesToUInt32(arr[8+i],arr[9+i],arr[10+i],arr[11+i]);let pfrac=ByteParser.bytesToUInt32(arr[12+i],arr[13+i],arr[14+i],arr[15+i]);output.pressure.push(pint+pfrac/Math.pow(10,Math.ceil(Math.log10(pfrac))));let hint=ByteParser.bytesToUInt32(arr[16+i],arr[17+i],arr[18+i],arr[19+i]);let hfrac=ByteParser.bytesToUInt32(arr[20+i],arr[21+i],arr[22+i],arr[23+i]);output.humidity.push(hint+hfrac/Math.pow(10,Math.ceil(Math.log10(hfrac))));output.altitude.push(altitude(output.pressure[j],output.temp[j]))}return output};var exponent=1/5.257;var denom=1/.0065;function altitude(pressure,temperature){return(Math.pow(sealevel_hpa/pressure,exponent)-1)*(temperature+273.15)*denom}function nrf5x_usbcodec(data){let arr;if(data.getInt8)arr=new Uint8Array(data.buffer);else if(!data.buffer)arr=new Uint8Array(data);else arr=data;const output={};if(arr[0]===2){Object.assign(output,ads131m08codec(arr.subarray(2)))}else if(arr[0]===3){let result=ads131m08codec(arr.subarray(2));Object.keys(result).forEach((key,i)=>{output[i+8]=result[key]})}else if(arr[0]===4){Object.assign(output,mpu6050codec(arr.subarray(2)))}else if(arr[0]===5){Object.assign(output,max3010xcodec(arr.subarray(2)))}else if(arr[0]===6){Object.assign(output,bme280codec(arr.subarray(2)))}else{Object.assign(output,ads131m08codec(arr))}return output}var nrf5xSerialSettings={baudRate:115200,buffering:{searchBytes:new Uint8Array([240,240])},codec:nrf5x_usbcodec,sps:250};var nrf5xBLESettings={sps:250,services:{"0000cafe-b0ba-8bad-f00d-deadbeef0000":{"0001cafe-b0ba-8bad-f00d-deadbeef0000":{write:void 0},"0002cafe-b0ba-8bad-f00d-deadbeef0000":{notify:true,notifyCallback:void 0,codec:ads131m08codec,sps:250},"0003cafe-b0ba-8bad-f00d-deadbeef0000":{notify:true,notifyCallback:void 0,codec:max3010xcodec,sps:100},"0004cafe-b0ba-8bad-f00d-deadbeef0000":{notify:true,notifyCallback:void 0,codec:mpu6050codec,sps:100},"0005cafe-b0ba-8bad-f00d-deadbeef0000":{notify:true,notifyCallback:void 0,codec:ads131m08codec,sps:250},"0006cafe-b0ba-8bad-f00d-deadbeef0000":{notify:true,notifyCallback:void 0,codec:bme280codec,sps:3.33}}}};var defaultChartSetting5={nSec:10,sps:250,units:"mV"};var nrf5x_usbChartSettings={lines:{"0":JSON.parse(JSON.stringify(defaultChartSetting5)),"1":JSON.parse(JSON.stringify(defaultChartSetting5)),"2":JSON.parse(JSON.stringify(defaultChartSetting5)),"3":JSON.parse(JSON.stringify(defaultChartSetting5)),"4":JSON.parse(JSON.stringify(defaultChartSetting5)),"5":JSON.parse(JSON.stringify(defaultChartSetting5)),"6":JSON.parse(JSON.stringify(defaultChartSetting5)),"7":JSON.parse(JSON.stringify(defaultChartSetting5))},generateNewLines:true,cleanGeneration:false};var gain2=32;var nbits2=24;var vref2=1.2;var defaultsetting3={sps:250,useDCBlock:false,useBandpass:false,bandpassLower:3,bandpassUpper:45,useScaling:true,scalar:.96*1e3*vref2/(gain2*(Math.pow(2,nbits2)-1))};var nrf5x_usbFilterSettings={"0":JSON.parse(JSON.stringify(defaultsetting3)),"1":JSON.parse(JSON.stringify(defaultsetting3)),"2":JSON.parse(JSON.stringify(defaultsetting3)),"3":JSON.parse(JSON.stringify(defaultsetting3)),"4":JSON.parse(JSON.stringify(defaultsetting3)),"5":JSON.parse(JSON.stringify(defaultsetting3)),"6":JSON.parse(JSON.stringify(defaultsetting3)),"7":JSON.parse(JSON.stringify(defaultsetting3)),"8":JSON.parse(JSON.stringify(defaultsetting3)),"9":JSON.parse(JSON.stringify(defaultsetting3)),"10":JSON.parse(JSON.stringify(defaultsetting3)),"11":JSON.parse(JSON.stringify(defaultsetting3)),"12":JSON.parse(JSON.stringify(defaultsetting3)),"13":JSON.parse(JSON.stringify(defaultsetting3)),"14":JSON.parse(JSON.stringify(defaultsetting3)),"15":JSON.parse(JSON.stringify(defaultsetting3))};var textdecoder2=new TextDecoder;function statechangercodec(value){let output={timestamp:0,left_red:0,left_infrared:0,left_heg:0,center_red:0,center_infrared:0,center_heg:0,right_red:0,right_infrared:0,right_heg:0};let txt=textdecoder2.decode(value);let line=txt.split("|");if(line.length>=5){output.timestamp=Date.now();output.left_red=parseInt(line[1]);output.left_infrared=parseInt(line[2]);output.left_heg=parseFloat(line[3]);output.center_red=parseInt(line[4]);output.center_infrared=parseInt(line[5]);output.center_heg=parseFloat(line[6]);output.right_red=parseInt(line[7]);output.right_infrared=parseInt(line[8]);output.right_heg=parseFloat(line[9]);return output}else return txt}var statechangerSerialSettings={baudRate:115200,codec:statechangercodec};var statechangerBLESettings={services:{["6E400001-B5A3-F393-E0A9-E50E24DCCA9E".toLowerCase()]:{"6e400002-b5a3-f393-e0a9-e50e24dcca9e":{write:"t"},"6e400003-b5a3-f393-e0a9-e50e24dcca9e":{notify:true,notifyCallback:void 0,codec:statechangercodec}},["6E400004-B5A3-F393-E0A9-E50E24DCCA9E".toLowerCase()]:{["6E400005-B5A3-F393-E0A9-E50E24DCCA9E".toLowerCase()]:{read:true},["6E400006-B5A3-F393-E0A9-E50E24DCCA9E".toLowerCase()]:{write:void 0,notify:true,notifyCallback:void 0},["6E400007-B5A3-F393-E0A9-E50E24DCCA9E".toLowerCase()]:{read:true}}},androidWebBLE:"o"};function blueberrycodec(value){let output={red:value.getInt32(2),ir:value.getInt32(6),ir2:value.getInt32(10),timestamp:Date.now()};output.heg=output.red/(.5*(output.ir+output.ir2));return output}var sps7=40;var blueberryBLESettings={namePrefix:"blueberry",services:{"0f0e0d0c-0b0a-0908-0706-050403020100":{"1f1e1d1c-1b1a-1918-1716-151413121110":{write:void 0},"3f3e3d3c-3b3a-3938-3736-353433323130":{notify:true,notifyCallback:void 0,codec:blueberrycodec,sps:sps7}}},sps:sps7};function blueberryshortcodec(value){let output={sred:value.getInt32(2),sir:value.getInt32(6),sir2:value.getInt32(10),timestamp:Date.now()};output.sheg=output.sred/(.5*(output.sir+output.sir2));return output}function blueberrylongcodec(value){let output={red:value.getInt32(2),ir:value.getInt32(6),ir2:value.getInt32(10),timestamp:Date.now()};output.heg=output.sred/(.5*(output.ir+output.ir2));return output}var sps8=40;var blueberry2BLESettings={namePrefix:"blueberry",services:{"0f0e0d0c-0b0a-0908-0706-050403020100":{"1f1e1d1c-1b1a-1918-1716-151413121110":{write:void 0},"4f4e4d4c-4b6a-6968-6766-656463426160":{notify:true,notifyCallback:void 0,codec:blueberrylongcodec,sps:sps8},"4f4e4d4c-4b5a-5958-5756-555453425150":{notify:true,notifyCallback:void 0,codec:blueberryshortcodec,sps:sps8}}},sps:sps8};var defaultsetting1={sps:250,useDCBlock:true,useBandpass:true,bandpassLower:3,bandpassUpper:45};var ganglionFilterSettings={"0":JSON.parse(JSON.stringify(defaultsetting1)),"1":JSON.parse(JSON.stringify(defaultsetting1)),"2":JSON.parse(JSON.stringify(defaultsetting1)),"3":JSON.parse(JSON.stringify(defaultsetting1))};var defaultChartSetting6={nSec:10,sps:250,units:"mV"};var ganglionChartSettings={lines:{"0":JSON.parse(JSON.stringify(defaultChartSetting6)),"1":JSON.parse(JSON.stringify(defaultChartSetting6)),"2":JSON.parse(JSON.stringify(defaultChartSetting6)),"3":JSON.parse(JSON.stringify(defaultChartSetting6)),"ax":{nSec:10,sps:250,units:"mg"},"ay":{nSec:10,sps:250,units:"mg"},"az":{nSec:10,sps:250,units:"mg"}},generateNewLines:true};var defaultsetting4={sps:250,useDCBlock:true,useBandpass:true,bandpassLower:3,bandpassUpper:45};var museFilterSettings={"0":JSON.parse(JSON.stringify(defaultsetting4)),"1":JSON.parse(JSON.stringify(defaultsetting4)),"2":JSON.parse(JSON.stringify(defaultsetting4)),"3":JSON.parse(JSON.stringify(defaultsetting4)),"4":JSON.parse(JSON.stringify(defaultsetting4))};function hrcodec(data){return{hr:data.getInt8(1),timestamp:Date.now()}}var heartRateBLESettings={services:{"heart_rate":{"heart_rate_measurement":{notify:true,notifyCallback:void 0,codec:hrcodec}}}};var simulatorSettings={sps:250,simulate:{"0":{sps:250,freq:1,amplitude:1,offset:0},"1":{sps:250,freq:10,amplitude:1,offset:0},"2":{sps:250,freq:100,amplitude:.5,offset:.5},"3":{sps:250,freq:25,amplitude:1,offset:0}},connect:(settings={})=>{return new Promise(async(res,rej)=>{let _id=\`simulated\${Math.floor(Math.random()*1e15)}\`;let info={_id,settings:Object.assign(Object.assign({},simulatorSettings),settings)};info.settings.looping=true;let loopTime=50;let lastTime=Date.now();let loop2=()=>{if(info.settings.looping){let newData={};let now=Date.now();let frame=now-lastTime;for(const key in info.settings.simulate){let newPoints=Math.floor(info.settings.simulate[key].sps*frame/1e3);newData[key]=new Array(newPoints).fill(0);newData[key]=newData[key].map((v,i)=>{return Math.sin(2*Math.PI*info.settings.simulate[key].freq*.001*(lastTime+frame*(i+1)/newPoints))*info.settings.simulate[key].amplitude+info.settings.simulate[key].offset})}lastTime=now;newData.timestamp=lastTime;info.settings.ondata(newData);setTimeout(()=>{loop2()},loopTime)}};loop2();if(info.settings.onconnect)info.settings.onconnect(info);res(info)})},codec:reading=>{return reading},disconnect:info=>{console.log(info);info.settings.looping=false;info.settings.ondisconnect(info)},onconnect:info=>{console.log("simulator connected!",info)},ondisconnect:info=>{console.log("simulator disconnected!",info)},ondata:data=>{}};var Devices={BLE:{"nrf5x":nrf5xBLESettings,"hegduino":hegduinoBLESettings,"hegduinoV1":hegduinoV1BLESettings,"cognixionONE":cognixionONEBLESettings,"statechanger":statechangerBLESettings,"blueberry":blueberryBLESettings,"blueberry2":blueberry2BLESettings,"heart_rate":heartRateBLESettings},USB:{"nrf5x":nrf5xSerialSettings,"freeEEG32":freeeeg32SerialSettings,"freeEEG32_optical":freeeeg32_optical_SerialSettings,"freeEEG128":freeeeg128SerialSettings,"hegduino":hegduinoSerialSettings,"hegduinoV1":hegduinoV1SerialSettings,"cyton":cytonSerialSettings,"cyton_daisy":daisycytonSerialSettings,"peanut":peanutSerialSettings,"statechanger":statechangerSerialSettings,"cognixionONE":cytonSerialSettings},BLE_OTHER:{},USB_OTHER:{},OTHER:{"simulator":simulatorSettings}};var textdecoder3=new TextDecoder;var decoders={"raw":data=>{if(data?.buffer)return Array.from(new Uint8Array(data));else return data},"utf8":data=>{return textdecoder3.decode(data)},"console-f12":data=>{if(data?.buffer)data=Array.from(new Uint8Array(data));console.log(data);return data},"debug":(data,debugmessage)=>{if(data?.buffer)data=Array.from(new Uint8Array(data));console.log(debugmessage,data);return data},"ads131m08":ads131m08codec,"arduino_ads131m08":ads131m08_arduinocodec,"max3010x":max3010xcodec,"mpu6050":mpu6050codec,"bme280":bme280codec,"freeeeg32":freeeeg32codec,"freeeeg128":freeeeg128codec,"cyton":cytoncodec,"cognixionONE_BLE":cognixionONE_EEG_codec,"hegduino":hegduinocodec,"nrf5x":nrf5x_usbcodec,"peanut":peanutcodec,"statechanger":statechangercodec,"blueberry":blueberrycodec,"heart_rate":hrcodec};var BiquadChannelFilterer=class{constructor(options={sps:512,useSMA4:false,useNotch50:true,useNotch60:true,useLowpass:false,lowpassHz:100,useBandpass:false,bandpassLower:3,bandpassUpper:45,useDCBlock:true,DCBresonance:.995,trimOutliers:false,outlierTolerance:.2,useScaling:false,scalar:1}){this.idx=0;this.sps=options.sps;this.bandpassLower=options.bandpassLower?options.bandpassLower:3;this.bandpassUpper=options.bandpassUpper?options.bandpassUpper:45;this.useSMA4=options.useSMA4;this.last4=[];this.useNotch50=options.useNotch50;this.useNotch60=options.useNotch60;this.useLowpass=options.useLowpass;this.lowpassHz=options.lowpassHz?options.lowpassHz:100;this.useBandpass=options.useBandpass;this.useDCBlock=options.useDCBlock;this.DCBresonance=options.DCBresonance?options.DCBresonance:.995;this.useScaling=options.useScaling;this.scalar=options.scalar;this.trimOutliers=options.trimOutliers;this.outlierTolerance=options.outlierTolerance;let sps9=this.sps;this.notch50=[makeNotchFilter(50,sps9,2),makeNotchFilter(100,sps9,2)];this.notch60=[makeNotchFilter(60,sps9,2),makeNotchFilter(120,sps9,2)];this.lp1=[new Biquad("lowpass",this.lowpassHz,sps9),new Biquad("lowpass",this.lowpassHz,sps9),new Biquad("lowpass",this.lowpassHz,sps9),new Biquad("lowpass",this.lowpassHz,sps9)];this.bp1=[makeBandpassFilter(this.bandpassLower,this.bandpassUpper,sps9,1),makeBandpassFilter(this.bandpassLower,this.bandpassUpper,sps9,1),makeBandpassFilter(this.bandpassLower,this.bandpassUpper,sps9,1),makeBandpassFilter(this.bandpassLower,this.bandpassUpper,sps9,1)];this.dcb=new DCBlocker(options.DCBresonance?options.DCBresonance:.995)}reset(sps9=this.sps){this.notch50=[makeNotchFilter(50,sps9,2),makeNotchFilter(100,sps9,2)];this.notch60=[makeNotchFilter(60,sps9,2),makeNotchFilter(120,sps9,2)];this.lp1=[new Biquad("lowpass",this.lowpassHz,sps9),new Biquad("lowpass",this.lowpassHz,sps9),new Biquad("lowpass",this.lowpassHz,sps9),new Biquad("lowpass",this.lowpassHz,sps9)];this.bp1=[makeBandpassFilter(this.bandpassLower,this.bandpassUpper,sps9,1),makeBandpassFilter(this.bandpassLower,this.bandpassUpper,sps9,1),makeBandpassFilter(this.bandpassLower,this.bandpassUpper,sps9,1),makeBandpassFilter(this.bandpassLower,this.bandpassUpper,sps9,1)];this.dcb=new DCBlocker(this.DCBresonance)}setBandpass(bandpassLower=this.bandpassLower,bandpassUpper=this.bandpassUpper,sps9=this.sps){this.bandpassLower=bandpassLower;this.bandpassUpper=bandpassUpper;this.bp1=[makeBandpassFilter(bandpassLower,bandpassUpper,sps9),makeBandpassFilter(bandpassLower,bandpassUpper,sps9),makeBandpassFilter(bandpassLower,bandpassUpper,sps9),makeBandpassFilter(bandpassLower,bandpassUpper,sps9)]}apply(latestData=0){let out=latestData;if(this.useScaling===true){out*=this.scalar}if(this.filtered&&this.trimOutliers&&this.outlierTolerance){if(Math.abs(out-this.filtered)>this.outlierTolerance){out=this.filtered}}if(this.useDCBlock===true){out=this.dcb.applyFilter(out)}if(this.useSMA4===true){if(this.last4.length<4){this.last4.push(out)}else{out=this.last4.reduce((accumulator,currentValue)=>accumulator+currentValue)/this.last4.length;this.last4.shift();this.last4.push(out)}}if(this.useNotch50===true){this.notch50.forEach((f,i)=>{out=f.applyFilter(out)})}if(this.useNotch60===true){this.notch60.forEach((f,i)=>{out=f.applyFilter(out)})}if(this.useLowpass===true){this.lp1.forEach((f,i)=>{out=f.applyFilter(out)})}if(this.useBandpass===true){this.bp1.forEach((f,i)=>{out=f.applyFilter(out)})}this.filtered=out;this.idx++;return out}};var Biquad=class{constructor(type,freq,sps9,Q=1/Math.sqrt(2),dbGain=0){this.a0=0;this.a1=0;this.a2=0;this.b0=0;this.b1=0;this.b2=0;this.x1=0;this.x2=0;this.y1=0;this.y2=0;let types=["lowpass","highpass","bandpass","notch","peak","lowshelf","highshelf"];if(types.indexOf(type)<0){console.error("Valid types: 'lowpass','highpass','bandpass','notch','peak','lowshelf','highshelf'");return}this.type=type;this.freq=freq;this.sps=sps9;this.Q=Q;this.dbGain=dbGain;let A=Math.pow(10,dbGain/40);let omega=2*Math.PI*freq/sps9;let sn=Math.sin(omega);let cs=Math.cos(omega);let alpha=sn/(2*Q);let beta=Math.sqrt(A+A);this[type](A,sn,cs,alpha,beta);this.b0/=this.a0;this.b1/=this.a0;this.b2/=this.a0;this.a1/=this.a0;this.a2/=this.a0}lowpass(A,sn,cs,alpha,beta){this.b0=(1-cs)*.5;this.b1=1-cs;this.b2=(1-cs)*.5;this.a0=1+alpha;this.a1=-2*cs;this.a2=1-alpha}highpass(A,sn,cs,alpha,beta){this.b0=(1+cs)*.5;this.b1=-(1+cs);this.b2=(1+cs)*.5;this.a0=1+alpha;this.a1=-2*cs;this.a2=1-alpha}bandpass(A,sn,cs,alpha,beta){this.b0=alpha;this.b1=0;this.b2=-alpha;this.a0=1+alpha;this.a1=-2*cs;this.a2=1-alpha}notch(A,sn,cs,alpha,beta){this.b0=1;this.b1=-2*cs;this.b2=1;this.a0=1+alpha;this.a1=-2*cs;this.a2=1-alpha}peak(A,sn,cs,alpha,beta){this.b0=1+alpha*A;this.b1=-2*cs;this.b2=1-alpha*A;this.a0=1+alpha/A;this.a1=-2*cs;this.a2=1-alpha/A}lowshelf(A,sn,cs,alpha,beta){this.b0=A*(A+1-(A-1)*cs+beta*sn);this.b1=2*A*(A-1-(A+1)*cs);this.b2=A*(A+1-(A-1)*cs-beta*sn);this.a0=A+1+(A+1)*cs+beta*sn;this.a1=2*(A-1+(A+1)*cs);this.a2=A+1+(A-1)*cs-beta*sn}highshelf(A,sn,cs,alpha,beta){this.b0=A*(A+1+(A-1)*cs+beta*sn);this.b1=2*A*(A-1+(A+1)*cs);this.b2=A*(A+1-(A-1)*cs-beta*sn);this.a0=A+1-(A+1)*cs-beta*sn;this.a1=2*(A-1-(A+1)*cs);this.a2=A+1-(A-1)*cs-beta*sn}applyFilter(signal_step){let y=this.b0*signal_step+this.b1*this.x1+this.b2*this.x2-this.a1*this.y1-this.a2*this.y2;this.x2=this.x1;this.x1=signal_step;this.y2=this.y1;this.y1=y;return y}zResult(freq){try{let phi=Math.pow(Math.sin(Math.PI*freq*2/(2*this.sps)),2);let result=(Math.pow(this.b0+this.b1+this.b2,2)-4*(this.b0*this.b1+4*this.b0*this.b2+this.b1*this.b2)*phi+16*this.b0*this.b2*phi*phi)/(Math.pow(1+this.a1+this.a2,2)-4*(this.a1+4*this.a2+this.a1*this.a2)*phi+16*this.a2*phi*phi);return result}catch(err){return-200}}static calcCenterFrequency(freqStart,freqEnd){return(freqStart+freqEnd)/2}static calcBandwidth(freqStart,freqEnd){return freqEnd-this.calcCenterFrequency(freqStart,freqEnd)}static calcBandpassQ(frequency,bandwidth,resonance=Math.pow(10,Math.floor(Math.log10(frequency)))){let Q=resonance*Math.sqrt((frequency-bandwidth)*(frequency+bandwidth))/(2*bandwidth);return Q}static calcNotchQ(frequency,bandwidth,resonance=Math.pow(10,Math.floor(Math.log10(frequency)))){let Q=resonance*frequency*bandwidth/Math.sqrt((frequency-bandwidth)*(frequency+bandwidth));return Q}};var DCBlocker=class{constructor(r=.995){this.r=r;this.y1=this.y2=this.x1=this.x2=0}applyFilter(signal_step){this.x2=this.x1;this.x1=signal_step;let y=this.x1-this.x2+this.r*this.y1;this.y2=this.y1;this.y1=y;return y}};var makeNotchFilter=(frequency,sps9,bandwidth)=>{return new Biquad("notch",frequency,sps9,Biquad.calcNotchQ(frequency,bandwidth),0)};var makeBandpassFilter=(freqStart,freqEnd,sps9,resonance=Math.pow(10,Math.floor(Math.log10(Biquad.calcCenterFrequency(freqStart,freqEnd)))))=>{return new Biquad("bandpass",Biquad.calcCenterFrequency(freqStart,freqEnd),sps9,Biquad.calcBandpassQ(Biquad.calcCenterFrequency(freqStart,freqEnd),Biquad.calcBandwidth(freqStart,freqEnd),resonance),0)};function parseFunctionFromText2(method=""){let getFunctionBody=methodString=>{return methodString.replace(/^\\W*(function[^{]+\\{([\\s\\S]*)\\}|[^=]+=>[^{]*\\{([\\s\\S]*)\\}|[^=]+=>(.+))/i,"$2$3$4")};let getFunctionHead=methodString=>{let startindex=methodString.indexOf("=>")+1;if(startindex<=0){startindex=methodString.indexOf("){")}if(startindex<=0){startindex=methodString.indexOf(") {")}return methodString.slice(0,methodString.indexOf("{",startindex)+1)};let newFuncHead=getFunctionHead(method);let newFuncBody=getFunctionBody(method);let newFunc;if(newFuncHead.includes("function")){let varName=newFuncHead.split("(")[1].split(")")[0];newFunc=new Function(varName,newFuncBody)}else{if(newFuncHead.substring(0,6)===newFuncBody.substring(0,6)){let varName=newFuncHead.split("(")[1].split(")")[0];newFunc=new Function(varName,newFuncBody.substring(newFuncBody.indexOf("{")+1,newFuncBody.length-1))}else{try{newFunc=(0,eval)(newFuncHead+newFuncBody+"}")}catch{}}}return newFunc}var stringifyWithCircularRefs2=function(){const refs=new Map;const parents=[];const path=["this"];function clear(){refs.clear();parents.length=0;path.length=1}function updateParents(key,value){var idx=parents.length-1;var prev=parents[idx];if(typeof prev==="object"){if(prev[key]===value||idx===0){path.push(key);parents.push(value.pushed)}else{while(idx-->=0){prev=parents[idx];if(typeof prev==="object"){if(prev[key]===value){idx+=2;parents.length=idx;path.length=idx;--idx;parents[idx]=value;path[idx]=key;break}}idx--}}}}function checkCircular(key,value){if(value!=null){if(typeof value==="object"){if(key){updateParents(key,value)}let other=refs.get(value);if(other){return"[Circular Reference]"+other}else{refs.set(value,path.join("."))}}}return value}return function stringifyWithCircularRefs3(obj,space){try{parents.push(obj);return JSON.stringify(obj,checkCircular,space)}finally{clear()}}}();if(JSON.stringifyWithCircularRefs===void 0){JSON.stringifyWithCircularRefs=stringifyWithCircularRefs2}var stringifyFast2=function(){const refs=new Map;const parents=[];const path=["this"];function clear(){refs.clear();parents.length=0;path.length=1}function updateParents(key,value){var idx=parents.length-1;if(parents[idx]){var prev=parents[idx];if(typeof prev==="object"){if(prev[key]===value||idx===0){path.push(key);parents.push(value.pushed)}else{while(idx-->=0){prev=parents[idx];if(typeof prev==="object"){if(prev[key]===value){idx+=2;parents.length=idx;path.length=idx;--idx;parents[idx]=value;path[idx]=key;break}}idx++}}}}}function checkValues(key,value){let val;if(value!=null){if(typeof value==="object"){let c=value.constructor.name;if(key&&c==="Object"){updateParents(key,value)}let other=refs.get(value);if(other){return"[Circular Reference]"+other}else{refs.set(value,path.join("."))}if(c==="Array"){if(value.length>20){val=value.slice(value.length-20)}else val=value}else if(c.includes("Set")){val=Array.from(value)}else if(c!=="Object"&&c!=="Number"&&c!=="String"&&c!=="Boolean"){val="instanceof_"+c}else if(c==="Object"){let obj={};for(const prop in value){if(value[prop]==null){obj[prop]=value[prop]}else if(Array.isArray(value[prop])){if(value[prop].length>20)obj[prop]=value[prop].slice(value[prop].length-20);else obj[prop]=value[prop]}else if(value[prop].constructor.name==="Object"){obj[prop]={};for(const p in value[prop]){if(Array.isArray(value[prop][p])){if(value[prop][p].length>20)obj[prop][p]=value[prop][p].slice(value[prop][p].length-20);else obj[prop][p]=value[prop][p]}else{if(value[prop][p]!=null){let con=value[prop][p].constructor.name;if(con.includes("Set")){obj[prop][p]=Array.from(value[prop][p])}else if(con!=="Number"&&con!=="String"&&con!=="Boolean"){obj[prop][p]="instanceof_"+con}else{obj[prop][p]=value[prop][p]}}else{obj[prop][p]=value[prop][p]}}}}else{let con=value[prop].constructor.name;if(con.includes("Set")){obj[prop]=Array.from(value[prop])}else if(con!=="Number"&&con!=="String"&&con!=="Boolean"){obj[prop]="instanceof_"+con}else{obj[prop]=value[prop]}}}val=obj}else{val=value}}else{val=value}}return val}return function stringifyFast3(obj,space){parents.push(obj);let res=JSON.stringify(obj,checkValues,space);clear();return res}}();if(JSON.stringifyFast===void 0){JSON.stringifyFast=stringifyFast2}function loadStreamWorkerGlobals(){globalThis.WebSerial=WebSerial;globalThis.decoders=decoders;globalThis.decoder="raw";globalThis.ByteParser=ByteParser;globalThis.Devices=Devices;globalThis.filtering=true;globalThis.filters={};globalThis.BiquadChannelFilterer=BiquadChannelFilterer;globalThis.ArrayManip=ArrayManip}if(typeof WorkerGlobalScope!=="undefined"&&self instanceof WorkerGlobalScope){loadStreamWorkerGlobals()}var streamWorkerRoutes={"receiveDecoder":function receiveDecoder(decoder2,decoderName){globalThis.decoders[decoderName]=(0,eval)("("+decoder2+")")},"receiveCodec":function receiveDeviceCodec(decoder2,deviceType,device,service,characteristic){let codec=parseFunctionFromText2(decoder2);if(codec){if(deviceType==="BLE"&&service&&characteristic){if(globalThis.Devices[deviceType][device]){if(globalThis.Devices[deviceType][device][service]){if(globalThis.Devices[deviceType][device][characteristic]){globalThis.Devices[deviceType][device][characteristic].codec=codec}else{globalThis.Devices[deviceType][device][characteristic]={codec}}}else{globalThis.Devices[deviceType][device]={[characteristic]:{codec}}}}}else if(globalThis.Devices[deviceType][device]?.codec){if(globalThis.Devices[deviceType][device])globalThis.Devices[deviceType][device].codec=codec;else{globalThis.Devices[deviceType][device]={codec}}}}},"decode":function decode(data){return globalThis.decoder(data)},"decodeAndParse":function decodeAndParse(data){let decoded=this.__node.graph.run("decode",data);if(decoded){let parsed=globalThis.ArrayManip.reformatData(decoded);if(parsed){if(globalThis.filtering){for(const prop in parsed){if(globalThis.filters[prop]){let filter=globalThis.filters[prop];if(Array.isArray(parsed[prop])){parsed[prop]=parsed[prop].map(v=>filter.apply(v))}else if(parsed[prop]?.values){parsed[prop].values=parsed[prop].values.map(v=>filter.apply(v))}}}}return parsed}}return decoded},"setActiveDecoder":function setActiveDecoder(deviceType,device,service,characteristic){if(globalThis.Devices[deviceType][device]?.codec)globalThis.decoder=globalThis.Devices[deviceType][device]?.codec;else if(deviceType==="BLE"&&service&&characteristic&&globalThis.Devices[deviceType][device]?.[service]?.[characteristic]?.codec)globalThis.decoder=globalThis.Devices[deviceType][device][service][characteristic].codec;return true},"decodeDevice":function decodeDevice(data,deviceType,device,service,characteristic){if(globalThis.Devices[deviceType][device]?.codec)return globalThis.Devices[deviceType][device].codec(data);else if(deviceType==="BLE"&&service&&characteristic&&globalThis.Devices[deviceType][device]?.[service]?.[characteristic]?.codec)return globalThis.Devices[deviceType][device][service][characteristic].codec(data)},"decodeAndParseDevice":function decodeAndParseDevice(data,deviceType,deviceName,service,characteristic){let decoded;if(deviceType==="BLE"&&service&&characteristic&&globalThis.Devices[deviceType][deviceName]?.services[service]?.[characteristic]?.codec)decoded=globalThis.Devices[deviceType][deviceName].services[service][characteristic].codec(data);else if(globalThis.Devices[deviceType][deviceName]?.codec)decoded=globalThis.Devices[deviceType][deviceName].codec(data);else decoded=data;if(decoded){let parsed=globalThis.ArrayManip.reformatData(decoded);if(parsed){if(globalThis.filtering){for(const prop in parsed){if(globalThis.filters[prop]){let filter=globalThis.filters[prop];if(Array.isArray(parsed[prop])){parsed[prop]=parsed[prop].map(v=>filter.apply(v))}else if(parsed[prop]?.values){parsed[prop].values=parsed[prop].values.map(v=>filter.apply(v))}else if(typeof parsed[prop]==="number"){parsed[prop]=filter.apply(parsed[prop])}}}}return parsed}}return decoded},"toggleAnim":function toggleAnim(){globalThis.runningAnim=!globalThis.runningAnim;return globalThis.runningAnim},"setFilters":function setFilters(filters,clearFilters=false){if(!globalThis.filters||clearFilters)globalThis.filters={};for(const key in filters){globalThis.filters[key]=new BiquadChannelFilterer(filters[key])}return true},"getFilterSettings":function getFilterSettings(){if(globalThis.filters){let filters={};for(const key in globalThis.filters){filters[key]={sps:globalThis.filters[key].sps,useScaling:globalThis.filters[key].useScaling,scalar:globalThis.filters[key].scalar,useNotch50:globalThis.filters[key].useNotch50,useNotch60:globalThis.filters[key].useNotch60,useDCBlock:globalThis.filters[key].useDCBlock,useLowpass:globalThis.filters[key].useLowpass,lowpassHz:globalThis.filters[key].lowpassHz,useBandpass:globalThis.filters[key].useBandpass,bandpassLower:globalThis.filters[key].bandpassLower,bandpassUpper:globalThis.filters[key].bandpassUpper}}return filters}return void 0},"setupSerial":function setupSerial(){globalThis.Serial=new globalThis.WebSerial;globalThis.decoder="raw";console.log("worker: Setting up Serial",globalThis.Serial);return true},"openPort":function openPort(settings){const WorkerService2=this.__node.graph;if(!globalThis.Serial)WorkerService2.run("setupSerial");return new Promise((res,rej)=>{globalThis.Serial.getPorts().then(ports=>{const Serial=globalThis.Serial;let port=ports.find(port2=>{return port2.getInfo().usbVendorId===settings.usbVendorId&&port2.getInfo().usbProductId===settings.usbProductId});if(port){let options=Object.assign({},settings);if(typeof settings.pipeTo==="object"&&settings.pipeTo.extraArgs&&globalThis.Devices?.[settings.pipeTo.extraArgs[0]]?.[settings.pipeTo.extraArgs[1]]){options.onconnect=globalThis.Devices[settings.pipeTo.extraArgs[0]][settings.pipeTo.extraArgs[1]].onconnect;options.ondisconnect=globalThis.Devices[settings.pipeTo.extraArgs[0]][settings.pipeTo.extraArgs[1]].ondisconnect;options.beforedisconnect=globalThis.Devices[settings.pipeTo.extraArgs[0]][settings.pipeTo.extraArgs[1]].beforedisconnect}Serial.openPort(port,options).then(()=>{const stream=Serial.createStream({port,settings:options,frequency:settings.frequency?settings.frequency:10,buffering:settings.buffering,ondata:value=>{if(stream.settings.pipeTo){if(typeof stream.settings.pipeTo==="string")WorkerService2.transmit(value,stream.settings.pipeTo,[value.buffer]);else if(stream.settings.pipeTo?.route){let args=value;if(stream.settings.pipeTo.extraArgs)args=[value,...stream.settings.pipeTo.extraArgs];WorkerService2.transmit({route:stream.settings.pipeTo.route,args},stream.settings.pipeTo._id,[value.buffer])}}else{WorkerService2.transmit(value,void 0,[value.buffer])}}});Serial.readStream(stream);port.ondisconnect=()=>{postMessage(\`\${stream._id} disconnected\`)};res({_id:stream._id,settings,info:stream.info})}).catch(()=>{postMessage(\`disconnected\`)});;}else{rej(false)}})})},"closeStream":function closeStream(streamId){return new Promise((res,rej)=>{const Serial=globalThis.Serial;let ondisconnect;if(Serial.streams[streamId].port?.ondisconnect)ondisconnect=Serial.streams[streamId].port.ondisconnect;Serial.closeStream(Serial.streams[streamId]).then(resolved=>{if(ondisconnect)ondisconnect(void 0);res(resolved)}).catch(rej)})},"writeStream":function writeStream(streamId,message){globalThis.Serial.writeStream(globalThis.Serial.streams[streamId],message);return true},"updateStreamSettings":function updateStreamSettings(streamId,settings){if(globalThis.Serial?.streams[streamId]){for(const key in settings){if(typeof settings[key]==="object"){Object.assign(globalThis.Serial.streams[streamId].settings[key],settings[key])}else globalThis.Serial.streams[streamId][key]=settings[key]}}}};if(typeof WorkerGlobalScope!=="undefined"&&self instanceof WorkerGlobalScope){const worker=new WorkerService({tree:{...workerCanvasRoutes,...subprocessRoutes,...streamWorkerRoutes}})}var stream_worker_default=self;})();
`)], { type: "text/javascript" }));
  var stream_worker_default = url;
  var _ArrayManip = class {
    constructor() {
      this.recursivelyAssign = (target, obj) => {
        for (const key in obj) {
          if (typeof obj[key] === "object") {
            if (typeof target[key] === "object")
              this.recursivelyAssign(target[key], obj[key]);
            else
              target[key] = this.recursivelyAssign({}, obj[key]);
          } else
            target[key] = obj[key];
        }
        return target;
      };
    }
    static autoscale(array, lineIdx = 0, nLines = 1, centerZero = false, ymin, ymax, clamp) {
      if (array?.length === 0)
        return array;
      let max = ymax ? ymax : Math.max(...array);
      let min = ymin ? ymin : Math.min(...array);
      let _lines = 1 / nLines;
      let scalar = 1;
      if (centerZero) {
        let absmax = Math.max(Math.abs(min), Math.abs(max));
        if (absmax !== 0)
          scalar = _lines / absmax;
        return array.map((y2) => {
          if (clamp) {
            if (y2 < min)
              y2 = min;
            if (y2 > max)
              y2 = max;
          }
          return y2 * scalar + (_lines * (lineIdx + 1) * 2 - 1 - _lines);
        });
      } else {
        if (max === min) {
          if (max !== 0) {
            scalar = _lines / max;
          } else if (min !== 0) {
            scalar = _lines / Math.abs(min);
          }
        } else
          scalar = _lines / (max - min);
        return array.map((y2) => {
          if (clamp) {
            if (y2 < min)
              y2 = min;
            if (y2 > max)
              y2 = max;
          }
          return 2 * ((y2 - min) * scalar - 1 / (2 * nLines)) + (_lines * (lineIdx + 1) * 2 - 1 - _lines);
        });
      }
    }
    static genTimestamps(ct, sps10) {
      let now = Date.now();
      let toInterp = [now - ct * 1e3 / sps10, now];
      return _ArrayManip.upsample(toInterp, ct);
    }
    static absmax(array) {
      return Math.max(Math.abs(Math.min(...array)), Math.max(...array));
    }
    static downsample(array, fitCount, scalar = 1) {
      if (array.length > fitCount) {
        let output = new Array(fitCount);
        let incr = array.length / fitCount;
        let lastIdx = array.length - 1;
        let last = 0;
        let counter = 0;
        for (let i = incr; i < array.length; i += incr) {
          let rounded = Math.round(i);
          if (rounded > lastIdx)
            rounded = lastIdx;
          for (let j = last; j < rounded; j++) {
            output[counter] += array[j];
          }
          output[counter] /= (rounded - last) * scalar;
          counter++;
          last = rounded;
        }
        return output;
      } else
        return array;
    }
    static upsample(array, fitCount, scalar = 1) {
      var linearInterpolate = function(before2, after2, atPoint2) {
        return (before2 + (after2 - before2) * atPoint2) * scalar;
      };
      var newData = new Array(fitCount);
      var springFactor = (array.length - 1) / (fitCount - 1);
      newData[0] = array[0];
      for (var i = 1; i < fitCount - 1; i++) {
        var tmp = i * springFactor;
        var before = Math.floor(tmp);
        var after = Math.ceil(tmp);
        var atPoint = tmp - before;
        newData[i] = linearInterpolate(array[before], array[after], atPoint);
      }
      newData[fitCount - 1] = array[array.length - 1];
      return newData;
    }
    static interpolate(array, fitCount, scalar = 1) {
      if (array.length > fitCount) {
        return _ArrayManip.downsample(array, fitCount, scalar);
      } else if (array.length < fitCount) {
        return _ArrayManip.upsample(array, fitCount, scalar);
      }
      return array;
    }
    static HSLToRGB(h, s, l, scalar = 255) {
      s /= 100;
      l /= 100;
      let c = (1 - Math.abs(2 * l - 1)) * s, x2 = c * (1 - Math.abs(h / 60 % 2 - 1)), m = l - c / 2, r = 0, g = 0, b2 = 0;
      if (0 <= h && h < 60) {
        r = c;
        g = x2;
        b2 = 0;
      } else if (60 <= h && h < 120) {
        r = x2;
        g = c;
        b2 = 0;
      } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b2 = x2;
      } else if (180 <= h && h < 240) {
        r = 0;
        g = x2;
        b2 = c;
      } else if (240 <= h && h < 300) {
        r = x2;
        g = 0;
        b2 = c;
      } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b2 = x2;
      }
      r = (r + m) * scalar;
      g = (g + m) * scalar;
      b2 = (b2 + m) * scalar;
      return [r, g, b2];
    }
    static circularBuffer(arr, newEntries) {
      if (newEntries.length < arr.length) {
        let slice = arr.slice(newEntries.length);
        let len = arr.length;
        arr.splice(0, len, ...slice, ...newEntries);
      } else if (newEntries.length > arr.length) {
        let len = arr.length;
        arr.splice(0, len, newEntries.slice(len - newEntries.length));
      } else {
        arr.splice(0, arr.length, ...newEntries);
      }
      return arr;
    }
    static reformatData(data, key) {
      if (Array.isArray(data)) {
        if (Array.isArray(data[0])) {
          let d2 = {};
          data.forEach((arr, i) => {
            d2[i] = arr;
          });
          data = d2;
          if (isNaN(data[0][0]))
            return void 0;
        } else if (key) {
          data = { [key]: data };
          if (isNaN(data[key][0]))
            return void 0;
        } else {
          data = { 0: data };
          if (isNaN(data[0][0]))
            return void 0;
        }
      } else if (typeof data === "object") {
        for (const key2 in data) {
          if (typeof data[key2] === "number")
            data[key2] = [data[key2]];
          else if (data[key2]?.values) {
            if (typeof data[key2].values === "number")
              data[key2].values = [data[key2].values];
          }
          if (isNaN(data[key2][0]))
            return void 0;
        }
      } else if (typeof data === "string") {
        let split;
        if (data.includes("\r\n")) {
          let lines = data.split("\r\n");
          data = {};
          lines.forEach((l, j) => {
            if (l.includes("	")) {
              split = l.split("	");
            } else if (l.includes(",")) {
              split = l.split(",");
            } else if (l.includes("|")) {
              split = l.split("|");
            }
            if (Array.isArray(split)) {
              split.forEach((val, i) => {
                if (val.includes(":")) {
                  let [key2, v2] = val.split(":");
                  let fl = parseFloat(v2);
                  if (fl)
                    data[key2] = [fl];
                  else
                    return void 0;
                } else {
                  let fl = parseFloat(val);
                  if (fl)
                    data[i] = [fl];
                  else
                    return void 0;
                }
              });
            }
          });
        } else if (data.includes("	")) {
          split = data.split("	");
        } else if (data.includes(",")) {
          split = data.split(",");
        } else if (data.includes("|")) {
          split = data.split("|");
        }
        data = {};
        if (Array.isArray(split)) {
          split.forEach((val, i) => {
            if (val.includes(":")) {
              let [key2, v2] = val.split(":");
              let fl = parseFloat(v2);
              if (fl)
                data[key2] = [fl];
              else
                return void 0;
            } else {
              let fl = parseFloat(val);
              if (fl)
                data[i] = [fl];
              else
                return void 0;
            }
          });
        }
      } else if (typeof data === "number") {
        if (key)
          data = { [key]: [data] };
        else
          data = { 0: [data] };
      }
      return data;
    }
    static padTime(data, lastValue, time, targetFit) {
      let slopeIncr = (data[0] - lastValue) / time / targetFit;
      let padded = [...new Array(targetFit - data.length).map((_2, i) => lastValue + slopeIncr * (i + 1)), ...data];
      return padded;
    }
    static interpolateForTime(data, time, targetSPS) {
      return _ArrayManip.interpolate(data, Math.ceil(targetSPS * time));
    }
    isTypedArray(x2) {
      return ArrayBuffer.isView(x2) && Object.prototype.toString.call(x2) !== "[object DataView]";
    }
    spliceTypedArray(arr, start, end) {
      let s = arr.subarray(0, start);
      let e;
      if (end) {
        e = arr.subarray(end + 1);
      }
      let n;
      if (s.length > 0 || e?.length > 0)
        n = new arr.constructor(s.length + e.length);
      if (s.length > 0)
        n.set(s);
      if (e && e.length > 0)
        n.set(e, s.length);
      return n;
    }
  };
  var ArrayManip = _ArrayManip;
  ArrayManip.bufferValues = (objects, property, keys, buffer) => {
    if (!Array.isArray(keys) && typeof keys === "object")
      keys = Object.keys(keys);
    if (!buffer) {
      let object_keys = Object.keys(objects);
      if (keys)
        buffer = new Float32Array(object_keys.length * keys.length);
      else {
        if (typeof objects[object_keys[0]][property] === "object") {
          keys = Object.keys(objects[object_keys[0]][property]);
          buffer = new Float32Array(object_keys.length * keys.length);
        } else
          buffer = new Float32Array(object_keys.length);
      }
    }
    let i = 0;
    for (const key in objects) {
      if (objects[key][property]) {
        if (keys) {
          for (let j = 0; j < keys.length; j++) {
            buffer[i] = objects[key][property][keys[j]];
            i++;
          }
        } else {
          buffer[i] = objects[key][property];
          i++;
        }
      }
    }
    return buffer;
  };
  var rechk = /^([<>])?(([1-9]\d*)?([xcbB?hHiIfdsp]))*$/;
  var refmt = /([1-9]\d*)?([xcbB?hHiIfdsp])/g;
  var str = (v2, o, c) => String.fromCharCode(...new Uint8Array(v2.buffer, v2.byteOffset + o, c));
  var rts = (v2, o, c, s) => new Uint8Array(v2.buffer, v2.byteOffset + o, c).set(s.split("").map((str2) => str2.charCodeAt(0)));
  var pst = (v2, o, c) => str(v2, o + 1, Math.min(v2.getUint8(o), c - 1));
  var tsp = (v2, o, c, s) => {
    v2.setUint8(o, s.length);
    rts(v2, o + 1, c - 1, s);
  };
  var lut = (le) => ({ x: (c) => [1, c, 0], c: (c) => [c, 1, (o) => ({ u: (v2) => str(v2, o, 1), p: (v2, c2) => rts(v2, o, 1, c2) })], "?": (c) => [c, 1, (o) => ({ u: (v2) => Boolean(v2.getUint8(o)), p: (v2, B) => v2.setUint8(o, B) })], b: (c) => [c, 1, (o) => ({ u: (v2) => v2.getInt8(o), p: (v2, b2) => v2.setInt8(o, b2) })], B: (c) => [c, 1, (o) => ({ u: (v2) => v2.getUint8(o), p: (v2, B) => v2.setUint8(o, B) })], h: (c) => [c, 2, (o) => ({ u: (v2) => v2.getInt16(o, le), p: (v2, h) => v2.setInt16(o, h, le) })], H: (c) => [c, 2, (o) => ({ u: (v2) => v2.getUint16(o, le), p: (v2, H) => v2.setUint16(o, H, le) })], i: (c) => [c, 4, (o) => ({ u: (v2) => v2.getInt32(o, le), p: (v2, i) => v2.setInt32(o, i, le) })], I: (c) => [c, 4, (o) => ({ u: (v2) => v2.getUint32(o, le), p: (v2, I) => v2.setUint32(o, I, le) })], f: (c) => [c, 4, (o) => ({ u: (v2) => v2.getFloat32(o, le), p: (v2, f) => v2.setFloat32(o, f, le) })], d: (c) => [c, 8, (o) => ({ u: (v2) => v2.getFloat64(o, le), p: (v2, d2) => v2.setFloat64(o, d2, le) })], s: (c) => [1, c, (o) => ({ u: (v2) => str(v2, o, c), p: (v2, s) => rts(v2, o, c, s.slice(0, c)) })], p: (c) => [1, c, (o) => ({ u: (v2) => pst(v2, o, c), p: (v2, s) => tsp(v2, o, c, s.slice(0, c - 1)) })] });
  var errbuf = new RangeError("Structure larger than remaining buffer");
  var errval = new RangeError("Not enough values for structure");
  var _ByteParser = class extends ArrayManip {
    static toDataView(value) {
      if (!(value instanceof DataView)) {
        if (typeof value === "string" && parseInt(value))
          value = parseInt(value);
        if (typeof value === "string") {
          let enc = new TextEncoder();
          let hascodes = {};
          for (const code in _ByteParser.codes) {
            while (value.indexOf(code) > -1) {
              let idx = value.indexOf(code);
              value = value.replace(code, "");
              hascodes[idx] = code;
            }
          }
          let encoded = Array.from(enc.encode(value));
          for (const key in hascodes) {
            encoded.splice(parseInt(key), 0, _ByteParser.codes[hascodes[key]]);
          }
          value = new DataView(new Uint8Array(encoded).buffer);
        } else if (typeof value === "number") {
          let tmp = value;
          if (value < 256) {
            value = new DataView(new ArrayBuffer(1));
            value.setUint8(0, tmp);
          } else if (value < 65536) {
            value = new DataView(new ArrayBuffer(2));
            value.setInt16(0, tmp);
          } else {
            value = new DataView(new ArrayBuffer(4));
            value.setUint32(0, tmp);
          }
        } else if (value instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && value instanceof SharedArrayBuffer) {
          value = new DataView(value);
        } else if (Array.isArray(value)) {
          value = new DataView(Uint8Array.from(value).buffer);
        } else if (typeof value === "object") {
          value = new TextEncoder().encode(JSON.stringify(value));
        }
      }
      return value;
    }
    static searchBuffer(buffer, searchString, limit) {
      var needle = searchString;
      var haystack = buffer;
      var search = _ByteParser.boyerMoore(needle);
      var skip = search.byteLength;
      var indices = [];
      for (var i = search(haystack); i !== -1; i = search(haystack, i + skip)) {
        indices.push(i);
        if (limit) {
          if (indices.length >= limit)
            break;
        }
      }
      return indices;
    }
    static bytesToInt16(x0, x1) {
      let int16 = (255 & x0) << 8 | 255 & x1;
      if ((int16 & 32768) > 0) {
        int16 |= 4294901760;
      } else {
        int16 &= 65535;
      }
      return int16;
    }
    static bytesToUInt16(x0, x1) {
      return x0 * 256 + x1;
    }
    static Uint16ToBytes(y2) {
      return [y2 & 255, y2 >> 8 & 255];
    }
    static bytesToInt24(x0, x1, x2) {
      let int24 = (255 & x0) << 16 | (255 & x1) << 8 | 255 & x2;
      if ((int24 & 8388608) > 0) {
        int24 |= 4278190080;
      } else {
        int24 &= 16777215;
      }
      return int24;
    }
    static bytesToUInt24(x0, x1, x2) {
      return x0 * 65536 + x1 * 256 + x2;
    }
    static Uint24ToBytes(y2) {
      return [y2 & 255, y2 >> 8 & 255, y2 >> 16 & 255];
    }
    static bytesToInt32(x0, x1, x2, x3) {
      let int32 = (255 & x0) << 24 | (255 & x1) << 16 | (255 & x2) << 8 | 255 & x3;
      if ((int32 & 2147483648) > 0) {
        int32 |= 0;
      } else {
        int32 &= 4294967295;
      }
      return int32;
    }
    static bytesToUInt32(x0, x1, x2, x3) {
      return x0 * 16777216 + x1 * 65536 + x2 * 256 + x3;
    }
    static Uint32ToBytes(y2) {
      return [y2 & 255, y2 >> 8 & 255, y2 >> 16 & 255, y2 >> 24 & 255];
    }
    static get2sCompliment(val, nbits3) {
      if (val > 4294967296)
        return null;
      return val << 32 - nbits3 >> 32 - nbits3;
    }
    static getSignedInt(...args) {
      let pos = 0;
      function getInt(size) {
        var value = 0;
        var first = true;
        while (size--) {
          if (first) {
            let byte = args[pos++];
            value += byte & 127;
            if (byte & 128) {
              value -= 128;
            }
            first = false;
          } else {
            value *= 256;
            value += args[pos++];
          }
        }
        return value;
      }
      return getInt(args.length);
    }
    static asUint8Array(input) {
      if (input instanceof Uint8Array) {
        return input;
      } else if (typeof input === "string") {
        var arr = new Uint8Array(input.length);
        for (var i = 0; i < input.length; i++) {
          var c = input.charCodeAt(i);
          if (c > 127) {
            throw new TypeError("Only ASCII patterns are supported");
          }
          arr[i] = c;
        }
        return arr;
      } else {
        return new Uint8Array(input);
      }
    }
    static boyerMoore(patternBuffer) {
      var pattern = _ByteParser.asUint8Array(patternBuffer);
      var M2 = pattern.length;
      if (M2 === 0) {
        throw new TypeError("patternBuffer must be at least 1 byte long");
      }
      var R2 = 256;
      var rightmost_positions = new Int32Array(R2);
      for (var c = 0; c < R2; c++) {
        rightmost_positions[c] = -1;
      }
      for (var j = 0; j < M2; j++) {
        rightmost_positions[pattern[j]] = j;
      }
      var boyerMooreSearch = (txtBuffer, start, end) => {
        var txt = _ByteParser.asUint8Array(txtBuffer);
        if (start === void 0)
          start = 0;
        if (end === void 0)
          end = txt.length;
        var pat = pattern;
        var right = rightmost_positions;
        var lastIndex = end - pat.length;
        var lastPatIndex = pat.length - 1;
        var skip;
        for (var i = start; i <= lastIndex; i += skip) {
          skip = 0;
          for (var j2 = lastPatIndex; j2 >= 0; j2--) {
            var c2 = txt[i + j2];
            if (pat[j2] !== c2) {
              skip = Math.max(1, j2 - right[c2]);
              break;
            }
          }
          if (skip === 0) {
            return i;
          }
        }
        return -1;
      };
      boyerMooreSearch.byteLength = pattern.byteLength;
      return boyerMooreSearch;
    }
    static struct(format) {
      let fns = [], size = 0, m = rechk.exec(format);
      if (!m) {
        throw new RangeError("Invalid format string");
      }
      const t = lut("<" === m[1]), lu = (n, c) => t[c](n ? parseInt(n, 10) : 1);
      while (m = refmt.exec(format)) {
        ((r, s, f) => {
          for (let i = 0; i < r; ++i, size += s) {
            if (f) {
              fns.push(f(size));
            }
          }
        })(...lu(...m.slice(1)));
      }
      const unpack_from = (arrb, offs) => {
        if (arrb.byteLength < (offs | 0) + size) {
          throw errbuf;
        }
        let v2 = new DataView(arrb, offs | 0);
        return fns.map((f) => f.u(v2));
      };
      const pack_into = (arrb, offs, ...values) => {
        if (values.length < fns.length) {
          throw errval;
        }
        if (arrb.byteLength < offs + size) {
          throw errbuf;
        }
        const v2 = new DataView(arrb, offs);
        new Uint8Array(arrb, offs, size).fill(0);
        fns.forEach((f, i) => f.p(v2, values[i]));
      };
      const pack = (...values) => {
        let b2 = new ArrayBuffer(size);
        pack_into(b2, 0, ...values);
        return b2;
      };
      const unpack = (arrb) => unpack_from(arrb, 0);
      function* iter_unpack(arrb) {
        for (let offs = 0; offs + size <= arrb.byteLength; offs += size) {
          yield unpack_from(arrb, offs);
        }
      }
      return Object.freeze({ unpack, pack, unpack_from, pack_into, iter_unpack, format, size });
    }
  };
  var ByteParser = _ByteParser;
  ByteParser.codes = { "\\n": 10, "\\r": 13, "\\t": 9, "\\s": 32, "\\b": 8, "\\f": 12, "\\": 92 };
  var ScanMode;
  (function(ScanMode2) {
    ScanMode2[ScanMode2["SCAN_MODE_LOW_POWER"] = 0] = "SCAN_MODE_LOW_POWER";
    ScanMode2[ScanMode2["SCAN_MODE_BALANCED"] = 1] = "SCAN_MODE_BALANCED";
    ScanMode2[ScanMode2["SCAN_MODE_LOW_LATENCY"] = 2] = "SCAN_MODE_LOW_LATENCY";
  })(ScanMode || (ScanMode = {}));
  init_dist();
  init_conversion();
  init_dist();
  var BluetoothLe = registerPlugin("BluetoothLe", { web: () => Promise.resolve().then(() => (init_web(), web_exports)).then((m) => new m.BluetoothLeWeb()) });
  var import_throat = __toESM(require_throat());
  function getQueue(enabled) {
    if (enabled) {
      return (0, import_throat.default)(1);
    } else {
      return (fn) => fn();
    }
  }
  function validateUUID(uuid) {
    if (typeof uuid !== "string") {
      throw new Error(`Invalid UUID type ${typeof uuid}. Expected string.`);
    }
    uuid = uuid.toLowerCase();
    const is128BitUuid = uuid.search(/^[0-9a-f]{8}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{12}$/) >= 0;
    if (!is128BitUuid) {
      throw new Error(`Invalid UUID format ${uuid}. Expected 128 bit string (e.g. "0000180d-0000-1000-8000-00805f9b34fb").`);
    }
    return uuid;
  }
  var BleClientClass = class {
    constructor() {
      this.scanListener = null;
      this.eventListeners = /* @__PURE__ */ new Map();
      this.queue = getQueue(true);
    }
    enableQueue() {
      this.queue = getQueue(true);
    }
    disableQueue() {
      this.queue = getQueue(false);
    }
    async initialize(options2) {
      await this.queue(async () => {
        await BluetoothLe.initialize(options2);
      });
    }
    async getEnabled() {
      return this.isEnabled();
    }
    async isEnabled() {
      const enabled = await this.queue(async () => {
        const result = await BluetoothLe.isEnabled();
        return result.value;
      });
      return enabled;
    }
    async enable() {
      await this.queue(async () => {
        await BluetoothLe.enable();
      });
    }
    async disable() {
      await this.queue(async () => {
        await BluetoothLe.disable();
      });
    }
    async startEnabledNotifications(callback) {
      await this.queue(async () => {
        var _a;
        const key = `onEnabledChanged`;
        await ((_a = this.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove());
        const listener = await BluetoothLe.addListener(key, (result) => {
          callback(result.value);
        });
        this.eventListeners.set(key, listener);
        await BluetoothLe.startEnabledNotifications();
      });
    }
    async stopEnabledNotifications() {
      await this.queue(async () => {
        var _a;
        const key = `onEnabledChanged`;
        await ((_a = this.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove());
        this.eventListeners.delete(key);
        await BluetoothLe.stopEnabledNotifications();
      });
    }
    async isLocationEnabled() {
      const enabled = await this.queue(async () => {
        const result = await BluetoothLe.isLocationEnabled();
        return result.value;
      });
      return enabled;
    }
    async openLocationSettings() {
      await this.queue(async () => {
        await BluetoothLe.openLocationSettings();
      });
    }
    async openBluetoothSettings() {
      await this.queue(async () => {
        await BluetoothLe.openBluetoothSettings();
      });
    }
    async openAppSettings() {
      await this.queue(async () => {
        await BluetoothLe.openAppSettings();
      });
    }
    async setDisplayStrings(displayStrings) {
      await this.queue(async () => {
        await BluetoothLe.setDisplayStrings(displayStrings);
      });
    }
    async requestDevice(options2) {
      const result = await this.queue(async () => {
        const device = await BluetoothLe.requestDevice(options2);
        return device;
      });
      return result;
    }
    async requestLEScan(options2, callback) {
      await this.queue(async () => {
        var _a;
        await ((_a = this.scanListener) === null || _a === void 0 ? void 0 : _a.remove());
        this.scanListener = await BluetoothLe.addListener("onScanResult", (resultInternal) => {
          const result = Object.assign(Object.assign({}, resultInternal), { manufacturerData: this.convertObject(resultInternal.manufacturerData), serviceData: this.convertObject(resultInternal.serviceData), rawAdvertisement: resultInternal.rawAdvertisement ? this.convertValue(resultInternal.rawAdvertisement) : void 0 });
          callback(result);
        });
        await BluetoothLe.requestLEScan(options2);
      });
    }
    async stopLEScan() {
      await this.queue(async () => {
        var _a;
        await ((_a = this.scanListener) === null || _a === void 0 ? void 0 : _a.remove());
        this.scanListener = null;
        await BluetoothLe.stopLEScan();
      });
    }
    async getDevices(deviceIds) {
      return this.queue(async () => {
        const result = await BluetoothLe.getDevices({ deviceIds });
        return result.devices;
      });
    }
    async getConnectedDevices(services) {
      return this.queue(async () => {
        const result = await BluetoothLe.getConnectedDevices({ services });
        return result.devices;
      });
    }
    async connect(deviceId, onDisconnect, options2) {
      await this.queue(async () => {
        var _a;
        if (onDisconnect) {
          const key = `disconnected|${deviceId}`;
          await ((_a = this.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove());
          const listener = await BluetoothLe.addListener(key, () => {
            onDisconnect(deviceId);
          });
          this.eventListeners.set(key, listener);
        }
        await BluetoothLe.connect(Object.assign({ deviceId }, options2));
      });
    }
    async createBond(deviceId) {
      await this.queue(async () => {
        await BluetoothLe.createBond({ deviceId });
      });
    }
    async isBonded(deviceId) {
      const isBonded = await this.queue(async () => {
        const result = await BluetoothLe.isBonded({ deviceId });
        return result.value;
      });
      return isBonded;
    }
    async disconnect(deviceId) {
      await this.queue(async () => {
        await BluetoothLe.disconnect({ deviceId });
      });
    }
    async getServices(deviceId) {
      const services = await this.queue(async () => {
        const result = await BluetoothLe.getServices({ deviceId });
        return result.services;
      });
      return services;
    }
    async readRssi(deviceId) {
      const value = await this.queue(async () => {
        const result = await BluetoothLe.readRssi({ deviceId });
        return parseFloat(result.value);
      });
      return value;
    }
    async read(deviceId, service, characteristic, options2) {
      service = validateUUID(service);
      characteristic = validateUUID(characteristic);
      const value = await this.queue(async () => {
        const result = await BluetoothLe.read(Object.assign({ deviceId, service, characteristic }, options2));
        return this.convertValue(result.value);
      });
      return value;
    }
    async write(deviceId, service, characteristic, value, options2) {
      service = validateUUID(service);
      characteristic = validateUUID(characteristic);
      return this.queue(async () => {
        if (!(value === null || value === void 0 ? void 0 : value.buffer)) {
          throw new Error("Invalid data.");
        }
        let writeValue = value;
        if (Capacitor.getPlatform() !== "web") {
          writeValue = dataViewToHexString(value);
        }
        await BluetoothLe.write(Object.assign({ deviceId, service, characteristic, value: writeValue }, options2));
      });
    }
    async writeWithoutResponse(deviceId, service, characteristic, value, options2) {
      service = validateUUID(service);
      characteristic = validateUUID(characteristic);
      await this.queue(async () => {
        if (!(value === null || value === void 0 ? void 0 : value.buffer)) {
          throw new Error("Invalid data.");
        }
        let writeValue = value;
        if (Capacitor.getPlatform() !== "web") {
          writeValue = dataViewToHexString(value);
        }
        await BluetoothLe.writeWithoutResponse(Object.assign({ deviceId, service, characteristic, value: writeValue }, options2));
      });
    }
    async readDescriptor(deviceId, service, characteristic, descriptor, options2) {
      service = validateUUID(service);
      characteristic = validateUUID(characteristic);
      descriptor = validateUUID(descriptor);
      const value = await this.queue(async () => {
        const result = await BluetoothLe.readDescriptor(Object.assign({ deviceId, service, characteristic, descriptor }, options2));
        return this.convertValue(result.value);
      });
      return value;
    }
    async writeDescriptor(deviceId, service, characteristic, descriptor, value, options2) {
      service = validateUUID(service);
      characteristic = validateUUID(characteristic);
      descriptor = validateUUID(descriptor);
      return this.queue(async () => {
        if (!(value === null || value === void 0 ? void 0 : value.buffer)) {
          throw new Error("Invalid data.");
        }
        let writeValue = value;
        if (Capacitor.getPlatform() !== "web") {
          writeValue = dataViewToHexString(value);
        }
        await BluetoothLe.writeDescriptor(Object.assign({ deviceId, service, characteristic, descriptor, value: writeValue }, options2));
      });
    }
    async startNotifications(deviceId, service, characteristic, callback) {
      service = validateUUID(service);
      characteristic = validateUUID(characteristic);
      await this.queue(async () => {
        var _a;
        const key = `notification|${deviceId}|${service}|${characteristic}`;
        await ((_a = this.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove());
        const listener = await BluetoothLe.addListener(key, (event) => {
          callback(this.convertValue(event === null || event === void 0 ? void 0 : event.value));
        });
        this.eventListeners.set(key, listener);
        await BluetoothLe.startNotifications({ deviceId, service, characteristic });
      });
    }
    async stopNotifications(deviceId, service, characteristic) {
      service = validateUUID(service);
      characteristic = validateUUID(characteristic);
      await this.queue(async () => {
        var _a;
        const key = `notification|${deviceId}|${service}|${characteristic}`;
        await ((_a = this.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove());
        this.eventListeners.delete(key);
        await BluetoothLe.stopNotifications({ deviceId, service, characteristic });
      });
    }
    convertValue(value) {
      if (typeof value === "string") {
        return hexStringToDataView(value);
      } else if (value === void 0) {
        return new DataView(new ArrayBuffer(0));
      }
      return value;
    }
    convertObject(obj) {
      if (obj === void 0) {
        return void 0;
      }
      const result = {};
      for (const key of Object.keys(obj)) {
        result[key] = this.convertValue(obj[key]);
      }
      return result;
    }
  };
  var BleClient = new BleClientClass();
  init_conversion();
  var BLEClient = class extends ByteParser {
    constructor(options2, location) {
      super();
      this.client = BleClient;
      this.devices = {};
      this.location = false;
      this.initialized = false;
      this.setupDevice = (device, options3) => {
        return new Promise(async (res, rej) => {
          this.devices[device.deviceId] = { device, deviceId: device.deviceId, ...options3 };
          this.client.connect(device.deviceId, (deviceId) => {
            if (this.devices[device.deviceId]?.ondisconnect)
              this.devices[device.deviceId].ondisconnect(deviceId);
          }, options3?.connectOptions).then(async () => {
            let services = await this.getServices(device.deviceId);
            for (const service in options3?.services) {
              let svc = services.find((o) => {
                if (o.uuid === service)
                  return true;
              });
              if (svc)
                for (const characteristic in options3.services[service]) {
                  if (!svc.characteristics.find((o) => {
                    if (o.uuid === characteristic)
                      return true;
                  }))
                    continue;
                  let opt = options3.services[service][characteristic];
                  if (opt.write) {
                    await this.write(device, service, characteristic, opt.write, opt.writeCallback, opt.writeOptions);
                  }
                  if (opt.read) {
                    await this.read(device, service, characteristic, opt.readCallback, opt.readOptions);
                  }
                  if (opt.notify && opt.notifyCallback) {
                    await this.subscribe(device, service, characteristic, opt.notifyCallback);
                    opt.notifying = true;
                  }
                }
            }
          }).catch(rej);
          res(this.devices[device.deviceId]);
        });
      };
      this.triangulate = (device, duration = 1500, sampleRate = 60) => {
        return new Promise((res, rej) => {
          if ("Accelerometer" in globalThis) {
            if (typeof globalThis.Accelerometer === "function") {
              let acl = new globalThis.Accelerometer({ frequency: sampleRate });
              let start = performance.now();
              let now = start;
              let result = { samples: [], vector: {} };
              let onread = () => {
                if (now - start < duration) {
                  this.readRssi(device).then((rssi) => {
                    let x2 = acl.x;
                    let y2 = acl.y;
                    let z = acl.z;
                    now = performance.now();
                    result.samples.push({ x: x2, y: y2, z, rssi, timestamp: now });
                  });
                } else {
                  let vector = { x: 0, y: 0, z: 0, rssiAvg: 0 };
                  result.samples.forEach((s) => {
                  });
                  acl.removeEventListener("reading", onread);
                }
              };
              acl.addEventListener("reading", onread);
            }
          } else
            rej(new Error("No Accelerometer API detected"));
        });
      };
      if (location)
        this.location = location;
      if (options2) {
        this.setup(options2);
      }
    }
    setup(options2, location = this.location) {
      let services = [];
      if (options2) {
        for (const serviceuuid in options2.services) {
          services.push(serviceuuid);
        }
      }
      let opts = {};
      if (!location)
        opts.androidNeverForLocation = false;
      return new Promise(async (res, rej) => {
        if (!this.initialized) {
          await this.client.initialize(opts);
          this.initialized = true;
        }
        if (options2?.deviceId) {
          res(await this.reconnect(options2.deviceId));
        } else {
          if (options2) {
            let deviceRequest = { filters: [{ services }] };
            if (!this.isMobile())
              deviceRequest.optionalServices = services;
            if (options2?.namePrefix)
              deviceRequest.filters[0].namePrefix = options2.namePrefix;
            if (options2?.name)
              deviceRequest.filters[0].name = options2.name;
            this.client.requestDevice(deviceRequest).then((device) => {
              res(this.setupDevice(device, options2));
            }).catch(rej);
          } else {
            this.client.requestDevice().then((device) => {
              res(this.setupDevice(device, options2));
            }).catch(rej);
          }
        }
      });
    }
    initialize(options2) {
      return new Promise((res, rej) => {
        this.client.initialize(options2).then(() => {
          res(true);
        }).catch(rej);
      });
    }
    requestDevice(request, options2) {
      return new Promise((res, rej) => {
        this.client.requestDevice(request).then((device) => {
          this.devices[device.deviceId] = { device, deviceId: device.deviceId, ...options2 };
          res(device);
        }).catch(rej);
      });
    }
    getServices(deviceId) {
      return this.client.getServices(deviceId);
    }
    connect(device, options2) {
      return new Promise((res, rej) => {
        this.client.connect(device.deviceId, (deviceId) => {
          if (options2?.ondisconnect)
            options2.ondisconnect(deviceId);
        }, options2?.connectOptions).then((connected) => {
          res(device);
        }).catch(rej);
      });
    }
    reconnect(deviceId, options2) {
      return new Promise((res, rej) => {
        let android = this.isAndroid();
        let mobile = this.isMobile();
        console.log(deviceId);
        let opts = options2;
        if (this.devices[deviceId])
          opts = Object.assign(Object.assign({}, this.devices[deviceId]), opts);
        if (opts?.deviceId)
          delete opts.deviceId;
        if (!mobile && !navigator.bluetooth?.getDevices) {
          this.setup(opts).then((device) => {
            res(device);
          });
        }
        if (android) {
          this.client.getDevices([deviceId]).then((devices) => {
            this.setupDevice(devices[0], opts).then((device) => {
              res(device);
            });
          }).catch(rej);
        }
      });
    }
    disconnect(device) {
      if (typeof device === "object") {
        if (device?.deviceId) {
          device = device.deviceId;
        }
        ;
      }
      if (typeof device === "string") {
        let info = this.devices[device];
        if (info.beforedisconnect)
          info.beforedisconnect(this, info);
        delete this.devices[device];
        this.client.disconnect(device);
      }
    }
    write(device, service, characteristic, value, callback, options2) {
      if (typeof device === "object")
        device = device.deviceId;
      if (callback) {
        return this.client.write(device, service, characteristic, BLEClient.toDataView(value)).then(callback);
      } else
        return this.client.writeWithoutResponse(device, service, characteristic, BLEClient.toDataView(value), options2);
    }
    read(device, service, characteristic, ondata, options2) {
      if (typeof device === "object")
        device = device.deviceId;
      if (ondata)
        return this.client.read(device, service, characteristic, options2).then(ondata);
      else
        return this.client.read(device, service, characteristic, options2);
    }
    subscribe(device, service, characteristic, ondata) {
      if (typeof device === "object")
        device = device.deviceId;
      return this.client.startNotifications(device, service, characteristic, ondata);
    }
    unsubscribe(device, service, characteristic) {
      if (typeof device === "object")
        device = device.deviceId;
      return this.client.stopNotifications(device, service, characteristic);
    }
    scan(options2, callback) {
      return this.client.requestLEScan(options2, callback);
    }
    stopScanning() {
      return this.client.stopLEScan();
    }
    readDescriptor(device, service, characteristic, descriptor, options2) {
      return this.client.readDescriptor(device.deviceId, service, characteristic, descriptor, options2);
    }
    writeDescriptor(device, service, characteristic, descriptor, value, options2) {
      return this.client.writeDescriptor(device.deviceId, service, characteristic, descriptor, BLEClient.toDataView(value), options2);
    }
    readRssi(device) {
      return this.client.readRssi(device.deviceId);
    }
    isMobile() {
      let check = false;
      (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
          check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    }
    isAndroid() {
      const device = navigator.userAgent.toLowerCase();
      return device.indexOf("android") > -1;
    }
    async distance(device, txPower, x2, exp, c) {
      let rssi = await this.readRssi(device);
      if (rssi == 0)
        return void 0;
      let ratio = rssi / txPower;
      if (ratio < 1) {
        return Math.pow(ratio, 10);
      } else {
        return x2 * Math.pow(ratio, exp) + c;
      }
    }
    async distanceFromPhone(device, txPower, model) {
      let x2, exp, c;
      if (model) {
        if (model === "nexus5") {
          x2 = 0.42093;
          exp = 6.9476;
          c = 0.54992;
        } else if (model === "motoX") {
          x2 = 0.9401940951;
          exp = 6.170094565;
          c = 0;
        } else if (model === "iphone5") {
          x2 = 0.89976;
          exp = 7.7095;
          c = 0.111;
        }
      }
      return await this.distance(device, txPower, x2, exp, c);
    }
  };
  var WebSerial = class extends ByteParser {
    constructor() {
      super(...arguments);
      this.streams = {};
      this.createStream = (options2) => {
        let stream = { _id: options2._id ? options2._id : `stream${Math.floor(Math.random() * 1e15)}`, info: options2.port.getInfo(), running: false, ...options2 };
        if (options2.port?.readable) {
          if (options2.transforms) {
            stream.reader = WebSerial.setStreamTransforms(options2.port.readable, options2.transforms).getReader();
          } else {
            stream.reader = options2.port.readable.getReader();
          }
        }
        this.streams[stream._id] = stream;
        return stream;
      };
    }
    getPorts() {
      return navigator.serial.getPorts();
    }
    requestPort(usbVendorId, usbProductId) {
      let options2 = {};
      if (usbVendorId) {
        options2.usbVendorId = usbVendorId;
      }
      if (usbProductId) {
        options2.usbProductId = usbProductId;
      }
      if (options2.usbVendorId)
        return navigator.serial.requestPort({ filters: [options2] });
      else
        return navigator.serial.requestPort();
    }
    openPort(port, options2) {
      if (options2)
        options2 = Object.assign({}, options2);
      if (options2?.ondisconnect) {
        port.ondisconnect = options2.ondisconnect;
        delete options2.ondisconnect;
      }
      return port.open(options2).then(() => {
        if (options2?.onconnect)
          options2.onconnect(port);
      });
    }
    async readWithTimeout(port, timeout) {
      const reader = port.readable.getReader();
      const timer = setTimeout(() => {
        reader.releaseLock();
      }, timeout);
      const result = await reader.read();
      clearTimeout(timer);
      reader.releaseLock();
      return result;
    }
    async writePort(port, message) {
      const writer = port.writable.getWriter();
      await writer.write(WebSerial.toDataView(message));
      writer.releaseLock();
      return true;
    }
    getSignals(port) {
      return port.getSignals();
    }
    setSignals(port, signals) {
      return port.setSignals(signals);
    }
    readStream(stream) {
      if (stream.reader && !stream.running) {
        let reader = stream.reader;
        if (stream.buffering) {
          if (typeof stream.buffering !== "object")
            stream.buffering = {};
          if (!stream.buffering.buffer) {
            stream.buffering.buffer = [];
          }
          if (!stream.buffering.searchBytes)
            stream.buffering.searchBytes = new Uint8Array([13, 10]);
        }
        let readLoop = () => {
          if (stream.port.readable && stream.running) {
            reader.read().then((result) => {
              if (result.done)
                reader.releaseLock();
              else {
                if (stream.buffering) {
                  stream.buffering.buffer.push(...result.value);
                  const needle = stream.buffering.searchBytes;
                  const haystack = stream.buffering.buffer;
                  const search = WebSerial.boyerMoore(needle);
                  const skip = search.byteLength;
                  let nextIndex = -1;
                  for (var i = search(haystack); i !== -1; i = search(haystack, i + skip)) {
                    if (!stream.buffering.locked && !("lockIdx" in stream.buffering))
                      stream.buffering.lockIdx = i;
                    else {
                      nextIndex = i;
                      if (nextIndex >= 0) {
                        if (!stream.buffering.locked) {
                          stream.ondata(new Uint8Array(stream.buffering.buffer.splice(stream.buffering.lockIdx + stream.buffering.searchBytes.length, nextIndex + stream.buffering.searchBytes.length)));
                          stream.buffering.buffer.splice(0, stream.buffering.searchBytes.length);
                          stream.buffering.locked = true;
                        } else if (nextIndex > 0) {
                          stream.ondata(new Uint8Array(stream.buffering.buffer.splice(stream.buffering.searchBytes.length, nextIndex)));
                        }
                      }
                    }
                  }
                } else
                  stream.ondata(result.value);
                setTimeout(() => {
                  readLoop();
                }, stream.frequency);
              }
            }).catch((er) => {
              console.error(stream._id, " Read error:", er);
              if (er.message.includes("overrun") || er.message.includes("framing")) {
                delete stream.reader;
                this.reconnect(stream);
              }
            });
          } else if (!stream.running && stream.port.readable) {
            try {
              reader.releaseLock();
            } catch (er) {
              console.error(er);
            }
          }
        };
        stream.running = true;
        readLoop();
        return stream;
      }
      return void 0;
    }
    writeStream(stream, message) {
      if (typeof stream === "string")
        stream = this.streams[stream];
      if (stream.port.writable) {
        let writer = stream.port.writable.getWriter();
        writer.write(WebSerial.toDataView(message));
        writer.releaseLock();
        return true;
      }
      return void 0;
    }
    closeStream(stream, onclose) {
      if (typeof stream === "string")
        stream = this.streams[stream];
      stream.running = false;
      return new Promise((res, rej) => {
        if (stream.settings.beforedisconnect) {
          stream.settings.beforedisconnect(this, stream.port);
        }
        setTimeout(async () => {
          if (stream.port.readable && stream.reader) {
            try {
              stream.reader.releaseLock();
            } catch (er) {
              console.error(er);
            }
            if (stream.transforms)
              try {
                await stream.reader.cancel();
              } catch (err) {
                console.error(err);
              }
          }
          try {
            await stream.port.close().then(() => {
              if (onclose)
                onclose(this.streams[stream._id]);
            });
            delete this.streams[stream._id];
            res(true);
          } catch (er) {
            rej(er);
          }
        }, 300);
      });
    }
    reconnect(stream, options2) {
      if (typeof stream === "string")
        stream = this.streams[stream];
      return new Promise((res, rej) => {
        if (typeof stream !== "object") {
          rej(void 0);
          return;
        }
        let info = stream.port.getInfo();
        this.closeStream(stream._id).then((closed) => {
          setTimeout(() => {
            this.getPorts().then((ports) => {
              for (let i = 0; i < ports.length; i++) {
                if (ports[i].getInfo().usbVendorId === info.usbVendorId && ports[i].getInfo().usbProductId === info.usbProductId) {
                  if (!options2)
                    options2 = stream;
                  else
                    options2._id = stream._id;
                  delete options2.port;
                  this.openPort(ports[i], options2.settings).then(() => {
                    const stream2 = this.createStream({ ...options2, port: ports[i] });
                    this.readStream(stream2);
                    res(stream2);
                  }).catch(rej);
                }
              }
            }).catch(rej);
          }, 100);
        });
      });
    }
    static setStreamTransforms(stream, transforms) {
      let transform = [];
      Object.keys(transforms).forEach((t) => {
        let opt = transforms[t];
        if (opt instanceof TransformStream) {
          transform.push(opt);
        } else {
          if (!opt.start)
            opt.start = function start() {
            };
          if (!opt.flush)
            opt.flush = function flush() {
            };
          let transformer = new TransformStream({ start: opt.start, transform: opt.transform, flush: opt.flush }, opt.writableStrategy, opt.readableStrategy);
          transform.push(transformer);
        }
      });
      let str2 = stream;
      transform.forEach((transform2) => {
        str2 = str2.pipeThrough(transform2);
      });
      return str2;
    }
  };
  function ads131m08codec(data) {
    let arr;
    if (data.getInt8)
      arr = new Uint8Array(data.buffer);
    else if (!data.buffer)
      arr = new Uint8Array(data);
    else
      arr = data;
    let output = { 0: new Array(9), 1: new Array(9), 2: new Array(9), 3: new Array(9), 4: new Array(9), 5: new Array(9), 6: new Array(9), 7: new Array(9), timestamp: Date.now() };
    for (let i = 0; i < 9; i++) {
      let j = i * 25;
      output[0][i] = ByteParser.bytesToInt24(arr[j], arr[j + 1], arr[j + 2]);
      output[1][i] = ByteParser.bytesToInt24(arr[j + 3], arr[j + 4], arr[j + 5]);
      output[2][i] = ByteParser.bytesToInt24(arr[j + 6], arr[j + 7], arr[j + 8]);
      output[3][i] = ByteParser.bytesToInt24(arr[j + 9], arr[j + 10], arr[j + 11]);
      output[4][i] = ByteParser.bytesToInt24(arr[j + 12], arr[j + 13], arr[j + 14]);
      output[5][i] = ByteParser.bytesToInt24(arr[j + 15], arr[j + 16], arr[j + 17]);
      output[6][i] = ByteParser.bytesToInt24(arr[j + 18], arr[j + 19], arr[j + 20]);
      output[7][i] = ByteParser.bytesToInt24(arr[j + 21], arr[j + 22], arr[j + 23]);
    }
    return output;
  }
  var decoder = new TextDecoder();
  var sps = 250;
  var defaultChartSetting = { nSec: 10, sps, units: "mV" };
  var ads131m08ChartSettings = { lines: { "0": JSON.parse(JSON.stringify(defaultChartSetting)), "1": JSON.parse(JSON.stringify(defaultChartSetting)), "2": JSON.parse(JSON.stringify(defaultChartSetting)), "3": JSON.parse(JSON.stringify(defaultChartSetting)), "4": JSON.parse(JSON.stringify(defaultChartSetting)), "5": JSON.parse(JSON.stringify(defaultChartSetting)), "6": JSON.parse(JSON.stringify(defaultChartSetting)), "7": JSON.parse(JSON.stringify(defaultChartSetting)) } };
  var gain = 32;
  var nbits = 24;
  var vref = 1.2;
  var defaultsetting = { sps, useDCBlock: false, useBandpass: false, bandpassLower: 3, bandpassUpper: 45, useScaling: true, scalar: 0.96 * 1e3 * vref / (gain * (Math.pow(2, nbits) - 1)) };
  var ads131m08FilterSettings = { "0": JSON.parse(JSON.stringify(defaultsetting)), "1": JSON.parse(JSON.stringify(defaultsetting)), "2": JSON.parse(JSON.stringify(defaultsetting)), "3": JSON.parse(JSON.stringify(defaultsetting)), "4": JSON.parse(JSON.stringify(defaultsetting)), "5": JSON.parse(JSON.stringify(defaultsetting)), "6": JSON.parse(JSON.stringify(defaultsetting)), "7": JSON.parse(JSON.stringify(defaultsetting)) };
  function cytoncodec(data) {
    let arr;
    if (!data.buffer)
      arr = new Uint8Array(data);
    else
      arr = data;
    let output = {};
    for (let i = 0; i < 8; i++) {
      let idx = 1 + 3 * i;
      output[i] = ByteParser.bytesToInt24(arr[idx], arr[idx + 1], arr[idx + 2]);
    }
    let accIdx = 25;
    output.ax = ByteParser.bytesToInt16(arr[accIdx], arr[accIdx + 1]);
    output.ay = ByteParser.bytesToInt16(arr[accIdx + 2], arr[accIdx + 3]);
    output.az = ByteParser.bytesToInt16(arr[accIdx + 4], arr[accIdx + 5]);
    output.gx = ByteParser.bytesToInt16(arr[accIdx + 6], arr[accIdx + 7]);
    output.gy = ByteParser.bytesToInt16(arr[accIdx + 8], arr[accIdx + 9]);
    output.gz = ByteParser.bytesToInt16(arr[accIdx + 10], arr[accIdx + 11]);
    output.timestamp = Date.now();
    return output;
  }
  function daisycytoncodec(data) {
    let arr;
    if (data.getInt8)
      arr = new Uint8Array(data.buffer);
    else if (!data.buffer)
      arr = new Uint8Array(data);
    else
      arr = data;
    let output = {};
    for (let i = 0; i < 8; i++) {
      let idx = 1 + 3 * i;
      if (arr[0] % 2 === 0)
        output[i + 7] = ByteParser.bytesToInt24(arr[idx], arr[idx + 1], arr[idx + 2]);
      else
        output[i] = ByteParser.bytesToInt24(arr[idx], arr[idx + 1], arr[idx + 2]);
    }
    let accIdx = 25;
    output.ax = ByteParser.bytesToInt16(arr[accIdx], arr[accIdx + 1]);
    output.ay = ByteParser.bytesToInt16(arr[accIdx + 2], arr[accIdx + 3]);
    output.az = ByteParser.bytesToInt16(arr[accIdx + 4], arr[accIdx + 5]);
    output.gx = ByteParser.bytesToInt16(arr[accIdx + 6], arr[accIdx + 7]);
    output.gy = ByteParser.bytesToInt16(arr[accIdx + 8], arr[accIdx + 9]);
    output.gz = ByteParser.bytesToInt16(arr[accIdx + 10], arr[accIdx + 11]);
    return output;
  }
  var sps2 = 250;
  var cytonSerialSettings = { baudRate: 115200, codec: cytoncodec, write: "b", beforedisconnect: (client, port) => {
    client.writePort(port, "s");
  }, buffering: { searchBytes: new Uint8Array([192, 160]) }, sps: sps2 };
  var daisycytonSerialSettings = { baudRate: 115200, codec: daisycytoncodec, write: "b", beforedisconnect: (client, port) => {
    client.writePort(port, "s");
  }, buffering: { searchBytes: new Uint8Array([192, 160]) }, sps: sps2 };
  var defaultChartSetting2 = { nSec: 10, sps: sps2, units: "mV" };
  var defaultChartSetting22 = { nSec: 10, sps: sps2 };
  var cytonChartSettings = { lines: { "0": JSON.parse(JSON.stringify(defaultChartSetting2)), "1": JSON.parse(JSON.stringify(defaultChartSetting2)), "2": JSON.parse(JSON.stringify(defaultChartSetting2)), "3": JSON.parse(JSON.stringify(defaultChartSetting2)), "4": JSON.parse(JSON.stringify(defaultChartSetting2)), "5": JSON.parse(JSON.stringify(defaultChartSetting2)), "6": JSON.parse(JSON.stringify(defaultChartSetting2)), "7": JSON.parse(JSON.stringify(defaultChartSetting2)), "ax": JSON.parse(JSON.stringify(defaultChartSetting22)), "ay": JSON.parse(JSON.stringify(defaultChartSetting22)), "az": JSON.parse(JSON.stringify(defaultChartSetting22)), "gx": JSON.parse(JSON.stringify(defaultChartSetting22)), "gy": JSON.parse(JSON.stringify(defaultChartSetting22)), "gz": JSON.parse(JSON.stringify(defaultChartSetting22)) }, generateNewLines: true };
  var defaultsetting2 = { sps: sps2, useDCBlock: true, useBandpass: true, bandpassLower: 3, bandpassUpper: 45, useScaling: true, scalar: 1e3 * 4.5 / (24 * (Math.pow(2, 23) - 1)) };
  var cytonFilterSettings = { "0": JSON.parse(JSON.stringify(defaultsetting2)), "1": JSON.parse(JSON.stringify(defaultsetting2)), "2": JSON.parse(JSON.stringify(defaultsetting2)), "3": JSON.parse(JSON.stringify(defaultsetting2)), "4": JSON.parse(JSON.stringify(defaultsetting2)), "5": JSON.parse(JSON.stringify(defaultsetting2)), "6": JSON.parse(JSON.stringify(defaultsetting2)), "7": JSON.parse(JSON.stringify(defaultsetting2)), "8": JSON.parse(JSON.stringify(defaultsetting2)), "9": JSON.parse(JSON.stringify(defaultsetting2)), "10": JSON.parse(JSON.stringify(defaultsetting2)), "11": JSON.parse(JSON.stringify(defaultsetting2)), "12": JSON.parse(JSON.stringify(defaultsetting2)), "13": JSON.parse(JSON.stringify(defaultsetting2)), "14": JSON.parse(JSON.stringify(defaultsetting2)), "15": JSON.parse(JSON.stringify(defaultsetting2)) };
  function freeeeg128codec(data) {
    let arr;
    if (data.getInt8)
      arr = new Uint8Array(data.buffer);
    else if (!data.buffer)
      arr = new Uint8Array(data);
    else
      arr = data;
    let output = {};
    for (let i = 0; i < 128; i++) {
      let idx = i * 3 + 1;
      output[i] = ByteParser.bytesToInt24(arr[idx], arr[idx + 1], arr[idx + 2]);
    }
    let accIdx = 385;
    output["ax"] = ByteParser.bytesToInt16(arr[accIdx], arr[accIdx + 1]);
    output["ay"] = ByteParser.bytesToInt16(arr[accIdx + 2], arr[accIdx + 3]);
    output["az"] = ByteParser.bytesToInt16(arr[accIdx + 4], arr[accIdx + 5]);
    output["gx"] = ByteParser.bytesToInt16(arr[accIdx + 6], arr[accIdx + 7]);
    output["gy"] = ByteParser.bytesToInt16(arr[accIdx + 8], arr[accIdx + 9]);
    output["gz"] = ByteParser.bytesToInt16(arr[accIdx + 10], arr[accIdx + 11]);
    output.timestamp = Date.now();
    return output;
  }
  var sps3 = 250;
  var freeeeg128SerialSettings = { baudRate: 921600, bufferSize: 2e3, frequency: 1.9, codec: freeeeg128codec, sps: sps3, buffering: { searchBytes: new Uint8Array([192, 160]) } };
  var freeeeg128ChartSettings = { lines: { "ax": { nSec: 10, sps: sps3 }, "ay": { nSec: 10, sps: sps3 }, "az": { nSec: 10, sps: sps3 }, "gx": { nSec: 10, sps: sps3 }, "gy": { nSec: 10, sps: sps3 }, "gz": { nSec: 10, sps: sps3 } } };
  var freeeeg128FilterSettings = {};
  for (let i = 0; i < 128; i++) {
    freeeeg128ChartSettings.lines[i] = { sps: sps3, nSec: 10, units: "mV" };
    freeeeg128FilterSettings[i] = { sps: 250, useDCBlock: true, useBandpass: true, bandpassLower: 3, bandpassUpper: 45, scalar: 1e3 * 2.5 / (32 * (Math.pow(2, 24) - 1)) };
  }
  function freeeeg32codec(data) {
    let arr;
    if (data.getInt8)
      arr = new Uint8Array(data.buffer);
    else if (!data.buffer)
      arr = new Uint8Array(data);
    else
      arr = data;
    let output = {};
    for (let i = 0; i < 32; i++) {
      let idx = i * 3 + 1;
      output[i] = ByteParser.bytesToInt24(arr[idx], arr[idx + 1], arr[idx + 2]);
    }
    let accIdx = 97;
    output["ax"] = ByteParser.bytesToInt16(arr[accIdx], arr[accIdx + 1]);
    output["ay"] = ByteParser.bytesToInt16(arr[accIdx + 2], arr[accIdx + 3]);
    output["az"] = ByteParser.bytesToInt16(arr[accIdx + 4], arr[accIdx + 5]);
    output["gx"] = ByteParser.bytesToInt16(arr[accIdx + 6], arr[accIdx + 7]);
    output["gy"] = ByteParser.bytesToInt16(arr[accIdx + 8], arr[accIdx + 9]);
    output["gz"] = ByteParser.bytesToInt16(arr[accIdx + 10], arr[accIdx + 11]);
    output.timestamp = Date.now();
    return output;
  }
  var sps4 = 512;
  var freeeeg32SerialSettings = { baudRate: 921600, bufferSize: 2e3, frequency: 1.9, codec: freeeeg32codec, sps: sps4, buffering: { searchBytes: new Uint8Array([192, 160]) } };
  var freeeeg32_optical_SerialSettings = { baudRate: 1e6, bufferSize: 2e3, frequency: 1.9, codec: freeeeg32codec, sps: sps4, buffering: { searchBytes: new Uint8Array([192, 160]) } };
  var defaultChartSetting3 = { nSec: 10, sps: sps4 };
  var freeeeg32ChartSettings = { lines: { "ax": JSON.parse(JSON.stringify(defaultChartSetting3)), "ay": JSON.parse(JSON.stringify(defaultChartSetting3)), "az": JSON.parse(JSON.stringify(defaultChartSetting3)), "gx": JSON.parse(JSON.stringify(defaultChartSetting3)), "gy": JSON.parse(JSON.stringify(defaultChartSetting3)), "gz": JSON.parse(JSON.stringify(defaultChartSetting3)) } };
  var freeeeg32FilterSettings = {};
  for (let i = 0; i < 32; i++) {
    freeeeg32ChartSettings.lines[i] = { sps: sps4, nSec: 10, units: "mV" };
    freeeeg32FilterSettings[i] = { sps: sps4, useDCBlock: true, useBandpass: true, bandpassLower: 3, bandpassUpper: 45, useScaling: true, scalar: 1e3 * 2.5 / (8 * (Math.pow(2, 24) - 1)) };
  }
  var textdecoder = new TextDecoder();
  function hegduinocodec(value) {
    let output = { timestamp: 0, red: 0, infrared: 0, heg: 0, ambient: 0, temperature: 0 };
    let txt = textdecoder.decode(value);
    let line = txt.split("|");
    if (line.length === 3) {
      output.timestamp = Date.now();
      output.red = parseInt(line[0]);
      output.infrared = parseInt(line[1]);
      output.heg = parseFloat(line[2]);
    } else if (line.length >= 2) {
      output.timestamp = Date.now();
      output.red = parseInt(line[1]);
      output.infrared = parseInt(line[2]);
      output.heg = parseFloat(line[3]);
      if (line[4])
        output.ambient = parseFloat(line[4]);
      if (line[5])
        output.temperature = parseFloat(line[5]);
      return output;
    } else
      return txt;
  }
  var sps5 = 40;
  var hegduinoSerialSettings = { baudRate: 115200, write: "t\n", codec: hegduinocodec, sps: sps5 };
  var hegduinoV1SerialSettings = Object.assign({}, hegduinoSerialSettings);
  hegduinoV1SerialSettings.sps = 19;
  var hegduinoBLESettings = { sps: sps5, services: { ["6E400001-B5A3-F393-E0A9-E50E24DCCA9E".toLowerCase()]: { "6e400002-b5a3-f393-e0a9-e50e24dcca9e": { write: "t" }, "6e400003-b5a3-f393-e0a9-e50e24dcca9e": { notify: true, notifyCallback: void 0, codec: hegduinocodec, sps: sps5 } }, ["6E400004-B5A3-F393-E0A9-E50E24DCCA9E".toLowerCase()]: { ["6E400005-B5A3-F393-E0A9-E50E24DCCA9E".toLowerCase()]: { read: true }, ["6E400006-B5A3-F393-E0A9-E50E24DCCA9E".toLowerCase()]: { write: void 0, notify: true, notifyCallback: void 0 }, ["6E400007-B5A3-F393-E0A9-E50E24DCCA9E".toLowerCase()]: { read: true } } }, androidWebBLE: "o" };
  var hegduinoV1BLESettings = Object.assign({}, hegduinoSerialSettings);
  hegduinoV1BLESettings.sps = 19;
  function max3010xcodec(data) {
    let arr;
    if (data.getInt8)
      arr = new Uint8Array(data.buffer);
    else if (!data.buffer)
      arr = new Uint8Array(data);
    else
      arr = data;
    const output = { "red": new Array(32), "ir": new Array(32), "max_dietemp": ByteParser.get2sCompliment(arr[193], 8) + 0.0625 * arr[194], "timestamp": Date.now() };
    let i = 0;
    while (i < 32) {
      let idx = i * 6;
      if (i % 2 === 0) {
        output["ir"][i] = (arr[idx + 1] << 16 | arr[idx + 2] << 8 | arr[idx + 3]) & 524287;
        output["ir"][i + 1] = (arr[idx + 4] << 16 | arr[idx + 5] << 8 | arr[idx + 6]) & 524287;
      } else {
        output["red"][i - 1] = (arr[idx + 1] << 16 | arr[idx + 2] << 8 | arr[idx + 3]) & 524287;
        output["red"][i] = (arr[idx + 4] << 16 | arr[idx + 5] << 8 | arr[idx + 6]) & 524287;
      }
      i++;
    }
    return output;
  }
  function mpu6050codec(data) {
    let arr;
    if (data.getInt8)
      arr = new Uint8Array(data.buffer);
    else if (!data.buffer)
      arr = new Uint8Array(data);
    else
      arr = data;
    let output = { "ax": new Array(20), "ay": new Array(20), "az": new Array(20), "gx": new Array(20), "gy": new Array(20), "gz": new Array(20), "mpu_dietemp": (ByteParser.bytesToInt16(arr[241], arr[242]) + 521) / 340 + 35, timestamp: Date.now() };
    for (let i = 0; i < 20; i++) {
      let idx = i * 12;
      output.ax[i] = ByteParser.bytesToInt16(arr[idx + 1], arr[idx + 2]);
      output.ay[i] = ByteParser.bytesToInt16(arr[idx + 3], arr[idx + 4]);
      output.az[i] = ByteParser.bytesToInt16(arr[idx + 5], arr[idx + 6]);
      output.gx[i] = ByteParser.bytesToInt16(arr[idx + 7], arr[idx + 8]);
      output.gy[i] = ByteParser.bytesToInt16(arr[idx + 9], arr[idx + 10]);
      output.gz[i] = ByteParser.bytesToInt16(arr[idx + 11], arr[idx + 12]);
    }
    return output;
  }
  function cognixionONE_EEG_codec(data) {
    let arr;
    if (data.getInt8)
      arr = new Uint8Array(data.buffer);
    else if (!data.buffer)
      arr = new Uint8Array(data);
    else
      arr = data;
    let output = { 0: new Array(), 1: new Array(), 2: new Array(), 3: new Array(), 4: new Array(), 5: new Array(), 6: new Array(), 7: new Array(), timestamp: Date.now() };
    for (let i = 0; i < 7; i++) {
      let j = i * 26 + 1;
      if (!arr[j + 23])
        break;
      output[0][i] = ByteParser.bytesToUInt24(arr[j], arr[j + 1], arr[j + 2]);
      output[1][i] = ByteParser.bytesToUInt24(arr[j + 3], arr[j + 4], arr[j + 5]);
      output[2][i] = ByteParser.bytesToUInt24(arr[j + 6], arr[j + 7], arr[j + 8]);
      output[3][i] = ByteParser.bytesToUInt24(arr[j + 9], arr[j + 10], arr[j + 11]);
      output[4][i] = ByteParser.bytesToUInt24(arr[j + 12], arr[j + 13], arr[j + 14]);
      output[5][i] = ByteParser.bytesToUInt24(arr[j + 15], arr[j + 16], arr[j + 17]);
      output[6][i] = ByteParser.bytesToUInt24(arr[j + 18], arr[j + 19], arr[j + 20]);
      output[7][i] = ByteParser.bytesToUInt24(arr[j + 21], arr[j + 22], arr[j + 23]);
    }
    return output;
  }
  var sps7 = 250;
  var cognixionONEBLESettings = { services: { ["82046698-6313-4BB1-9645-6BA28BF86DF5".toLowerCase()]: { ["8204669A-6313-4BB1-9645-6BA28BF86DF5".toLowerCase()]: { notify: true, notifyCallback: void 0, codec: cognixionONE_EEG_codec, sps: sps7 } }, ["82E12914-9AFA-4648-BD1B-8E2B3DC6DAAF".toLowerCase()]: { ["82E12915-9AFA-4648-BD1B-8E2B3DC6DAAF".toLowerCase()]: { write: void 0 }, ["82E12916-9AFA-4648-BD1B-8E2B3DC6DAAF".toLowerCase()]: { read: true } } }, sps: sps7 };
  var defaultChartSetting4 = { nSec: 10, sps: sps7, units: "mV" };
  var cognixionONEChartSettings = { lines: { "0": JSON.parse(JSON.stringify(defaultChartSetting4)), "1": JSON.parse(JSON.stringify(defaultChartSetting4)), "2": JSON.parse(JSON.stringify(defaultChartSetting4)), "3": JSON.parse(JSON.stringify(defaultChartSetting4)), "4": JSON.parse(JSON.stringify(defaultChartSetting4)), "5": JSON.parse(JSON.stringify(defaultChartSetting4)), "6": JSON.parse(JSON.stringify(defaultChartSetting4)), "7": JSON.parse(JSON.stringify(defaultChartSetting4)) } };
  var PeanutCodes = { 2: { type: "POOR_SIGNAL", format: "<B", byteLength: 1 }, 144: { type: "heg", format: "<i", byteLength: 4 }, 145: { type: "filteredHEG", format: "<i", byteLength: 4 }, 147: { type: "rawdata4", format: "<iiii", byteLength: 4 * 4 }, 148: { type: "rawdata6", format: "<iiiiii", byteLength: 4 * 6 }, 160: { type: "sampleNumber", format: "<i", byteLength: 4 }, 176: { type: "debug0", format: "<i", byteLength: 4 }, 177: { type: "debug1", format: "<i", byteLength: 4 }, 178: { type: "debug2", format: "<i", byteLength: 4 }, 179: { type: "debug3", format: "<i", byteLength: 4 }, 180: { type: "debug4", format: "<iiiiii", byteLength: 4 * 6 }, 181: { type: "debug4", format: "<iiiiii", byteLength: 4 * 6 }, 182: { type: "rawdata27", format: "<B" + "i".repeat(26), byteLength: 1 + 4 * 26 } };
  function peanutcodec(data) {
    let result = {};
    let i = 0;
    while (i < data.length) {
      if (PeanutCodes[data[i]] && i + 1 + PeanutCodes[data[i]].byteLength <= data.length) {
        let slice = data.slice(i + 1, i + 1 + PeanutCodes[data[i]].byteLength).buffer;
        let unpacked = ByteParser.struct(PeanutCodes[data[i]].format).unpack(slice);
        let code = PeanutCodes[data[i]].type;
        if (code === "unfilteredHEG" || code === "heg")
          unpacked = unpacked[0] / 256;
        else if (code === "POOR_SIGNAL" || code === "sampleNumber" || code === "debug0" || code === "debug1" || code === "debug2" || code === "debug3")
          unpacked = unpacked[0];
        if (!result[PeanutCodes[data[i]].type]) {
          if (Array.isArray(unpacked))
            result[PeanutCodes[data[i]].type] = unpacked;
          else
            result[PeanutCodes[data[i]].type] = [unpacked];
        } else {
          if (Array.isArray(unpacked))
            result[PeanutCodes[data[i]].type].push(...unpacked);
          else
            result[PeanutCodes[data[i]].type].push(unpacked);
        }
        i += PeanutCodes[data[i]].byteLength + 1;
      } else
        i++;
    }
    result.timestamp = Date.now();
    return result;
  }
  var peanutSerialSettings = { baudRate: 38400, bufferSize: 400, write: "protocol 3\n", buffering: { searchBytes: new Uint8Array([170, 170]) }, codec: peanutcodec, sps: 10.101 };
  var sealevel_hpa = 1013.25;
  var bme280codec = (data) => {
    let arr;
    if (data.getInt8)
      arr = new Uint8Array(data.buffer);
    else if (!data.buffer)
      arr = new Uint8Array(data);
    else
      arr = data;
    let output = { temp: [], pressure: [], humidity: [], altitude: [] };
    for (let j = 0; j < 3; j++) {
      let i = j * 24;
      let tint = ByteParser.bytesToUInt32(arr[0 + i], arr[1 + i], arr[2 + i], arr[3 + i]);
      let tfrac = ByteParser.bytesToUInt32(arr[4 + i], arr[5 + i], arr[6 + i], arr[7 + i]);
      output.temp.push(tint + tfrac / Math.pow(10, Math.ceil(Math.log10(tfrac))));
      let pint = ByteParser.bytesToUInt32(arr[8 + i], arr[9 + i], arr[10 + i], arr[11 + i]);
      let pfrac = ByteParser.bytesToUInt32(arr[12 + i], arr[13 + i], arr[14 + i], arr[15 + i]);
      output.pressure.push(pint + pfrac / Math.pow(10, Math.ceil(Math.log10(pfrac))));
      let hint = ByteParser.bytesToUInt32(arr[16 + i], arr[17 + i], arr[18 + i], arr[19 + i]);
      let hfrac = ByteParser.bytesToUInt32(arr[20 + i], arr[21 + i], arr[22 + i], arr[23 + i]);
      output.humidity.push(hint + hfrac / Math.pow(10, Math.ceil(Math.log10(hfrac))));
      output.altitude.push(altitude(output.pressure[j], output.temp[j]));
    }
    return output;
  };
  var exponent = 1 / 5.257;
  var denom = 1 / 65e-4;
  function altitude(pressure2, temperature2) {
    return (Math.pow(sealevel_hpa / pressure2, exponent) - 1) * (temperature2 + 273.15) * denom;
  }
  function nrf5x_usbcodec(data) {
    let arr;
    if (data.getInt8)
      arr = new Uint8Array(data.buffer);
    else if (!data.buffer)
      arr = new Uint8Array(data);
    else
      arr = data;
    const output = {};
    if (arr[0] === 2) {
      Object.assign(output, ads131m08codec(arr.subarray(2)));
    } else if (arr[0] === 3) {
      let result = ads131m08codec(arr.subarray(2));
      Object.keys(result).forEach((key, i) => {
        output[i + 8] = result[key];
      });
    } else if (arr[0] === 4) {
      Object.assign(output, mpu6050codec(arr.subarray(2)));
    } else if (arr[0] === 5) {
      Object.assign(output, max3010xcodec(arr.subarray(2)));
    } else if (arr[0] === 6) {
      Object.assign(output, bme280codec(arr.subarray(2)));
    } else {
      Object.assign(output, ads131m08codec(arr));
    }
    return output;
  }
  var nrf5xSerialSettings = { baudRate: 115200, buffering: { searchBytes: new Uint8Array([240, 240]) }, codec: nrf5x_usbcodec, sps: 250 };
  var nrf5xBLESettings = { sps: 250, services: { "0000cafe-b0ba-8bad-f00d-deadbeef0000": { "0001cafe-b0ba-8bad-f00d-deadbeef0000": { write: void 0 }, "0002cafe-b0ba-8bad-f00d-deadbeef0000": { notify: true, notifyCallback: void 0, codec: ads131m08codec, sps: 250 }, "0003cafe-b0ba-8bad-f00d-deadbeef0000": { notify: true, notifyCallback: void 0, codec: max3010xcodec, sps: 100 }, "0004cafe-b0ba-8bad-f00d-deadbeef0000": { notify: true, notifyCallback: void 0, codec: mpu6050codec, sps: 100 }, "0005cafe-b0ba-8bad-f00d-deadbeef0000": { notify: true, notifyCallback: void 0, codec: ads131m08codec, sps: 250 }, "0006cafe-b0ba-8bad-f00d-deadbeef0000": { notify: true, notifyCallback: void 0, codec: bme280codec, sps: 3.33 } } } };
  var defaultChartSetting5 = { nSec: 10, sps: 250, units: "mV" };
  var nrf5x_usbChartSettings = { lines: { "0": JSON.parse(JSON.stringify(defaultChartSetting5)), "1": JSON.parse(JSON.stringify(defaultChartSetting5)), "2": JSON.parse(JSON.stringify(defaultChartSetting5)), "3": JSON.parse(JSON.stringify(defaultChartSetting5)), "4": JSON.parse(JSON.stringify(defaultChartSetting5)), "5": JSON.parse(JSON.stringify(defaultChartSetting5)), "6": JSON.parse(JSON.stringify(defaultChartSetting5)), "7": JSON.parse(JSON.stringify(defaultChartSetting5)) }, generateNewLines: true, cleanGeneration: false };
  var gain2 = 32;
  var nbits2 = 24;
  var vref2 = 1.2;
  var defaultsetting3 = { sps: 250, useDCBlock: false, useBandpass: false, bandpassLower: 3, bandpassUpper: 45, useScaling: true, scalar: 0.96 * 1e3 * vref2 / (gain2 * (Math.pow(2, nbits2) - 1)) };
  var nrf5x_usbFilterSettings = { "0": JSON.parse(JSON.stringify(defaultsetting3)), "1": JSON.parse(JSON.stringify(defaultsetting3)), "2": JSON.parse(JSON.stringify(defaultsetting3)), "3": JSON.parse(JSON.stringify(defaultsetting3)), "4": JSON.parse(JSON.stringify(defaultsetting3)), "5": JSON.parse(JSON.stringify(defaultsetting3)), "6": JSON.parse(JSON.stringify(defaultsetting3)), "7": JSON.parse(JSON.stringify(defaultsetting3)), "8": JSON.parse(JSON.stringify(defaultsetting3)), "9": JSON.parse(JSON.stringify(defaultsetting3)), "10": JSON.parse(JSON.stringify(defaultsetting3)), "11": JSON.parse(JSON.stringify(defaultsetting3)), "12": JSON.parse(JSON.stringify(defaultsetting3)), "13": JSON.parse(JSON.stringify(defaultsetting3)), "14": JSON.parse(JSON.stringify(defaultsetting3)), "15": JSON.parse(JSON.stringify(defaultsetting3)) };
  var textdecoder2 = new TextDecoder();
  function statechangercodec(value) {
    let output = { timestamp: 0, left_red: 0, left_infrared: 0, left_heg: 0, center_red: 0, center_infrared: 0, center_heg: 0, right_red: 0, right_infrared: 0, right_heg: 0 };
    let txt = textdecoder2.decode(value);
    let line = txt.split("|");
    if (line.length >= 5) {
      output.timestamp = Date.now();
      output.left_red = parseInt(line[1]);
      output.left_infrared = parseInt(line[2]);
      output.left_heg = parseFloat(line[3]);
      output.center_red = parseInt(line[4]);
      output.center_infrared = parseInt(line[5]);
      output.center_heg = parseFloat(line[6]);
      output.right_red = parseInt(line[7]);
      output.right_infrared = parseInt(line[8]);
      output.right_heg = parseFloat(line[9]);
      return output;
    } else
      return txt;
  }
  var statechangerSerialSettings = { baudRate: 115200, codec: statechangercodec };
  var statechangerBLESettings = { services: { ["6E400001-B5A3-F393-E0A9-E50E24DCCA9E".toLowerCase()]: { "6e400002-b5a3-f393-e0a9-e50e24dcca9e": { write: "t" }, "6e400003-b5a3-f393-e0a9-e50e24dcca9e": { notify: true, notifyCallback: void 0, codec: statechangercodec } }, ["6E400004-B5A3-F393-E0A9-E50E24DCCA9E".toLowerCase()]: { ["6E400005-B5A3-F393-E0A9-E50E24DCCA9E".toLowerCase()]: { read: true }, ["6E400006-B5A3-F393-E0A9-E50E24DCCA9E".toLowerCase()]: { write: void 0, notify: true, notifyCallback: void 0 }, ["6E400007-B5A3-F393-E0A9-E50E24DCCA9E".toLowerCase()]: { read: true } } }, androidWebBLE: "o" };
  function blueberrycodec(value) {
    let output = { red: value.getInt32(2), ir: value.getInt32(6), ir2: value.getInt32(10), timestamp: Date.now() };
    output.heg = output.red / (0.5 * (output.ir + output.ir2));
    return output;
  }
  var sps8 = 40;
  var blueberryBLESettings = { namePrefix: "blueberry", services: { "0f0e0d0c-0b0a-0908-0706-050403020100": { "1f1e1d1c-1b1a-1918-1716-151413121110": { write: void 0 }, "3f3e3d3c-3b3a-3938-3736-353433323130": { notify: true, notifyCallback: void 0, codec: blueberrycodec, sps: sps8 } } }, sps: sps8 };
  function blueberryshortcodec(value) {
    let output = { sred: value.getInt32(2), sir: value.getInt32(6), sir2: value.getInt32(10), timestamp: Date.now() };
    output.sheg = output.sred / (0.5 * (output.sir + output.sir2));
    return output;
  }
  function blueberrylongcodec(value) {
    let output = { red: value.getInt32(2), ir: value.getInt32(6), ir2: value.getInt32(10), timestamp: Date.now() };
    output.heg = output.sred / (0.5 * (output.ir + output.ir2));
    return output;
  }
  var sps9 = 40;
  var blueberry2BLESettings = { namePrefix: "blueberry", services: { "0f0e0d0c-0b0a-0908-0706-050403020100": { "1f1e1d1c-1b1a-1918-1716-151413121110": { write: void 0 }, "4f4e4d4c-4b6a-6968-6766-656463426160": { notify: true, notifyCallback: void 0, codec: blueberrylongcodec, sps: sps9 }, "4f4e4d4c-4b5a-5958-5756-555453425150": { notify: true, notifyCallback: void 0, codec: blueberryshortcodec, sps: sps9 } } }, sps: sps9 };
  var defaultsetting1 = { sps: 250, useDCBlock: true, useBandpass: true, bandpassLower: 3, bandpassUpper: 45 };
  var ganglionFilterSettings = { "0": JSON.parse(JSON.stringify(defaultsetting1)), "1": JSON.parse(JSON.stringify(defaultsetting1)), "2": JSON.parse(JSON.stringify(defaultsetting1)), "3": JSON.parse(JSON.stringify(defaultsetting1)) };
  var defaultChartSetting6 = { nSec: 10, sps: 250, units: "mV" };
  var ganglionChartSettings = { lines: { "0": JSON.parse(JSON.stringify(defaultChartSetting6)), "1": JSON.parse(JSON.stringify(defaultChartSetting6)), "2": JSON.parse(JSON.stringify(defaultChartSetting6)), "3": JSON.parse(JSON.stringify(defaultChartSetting6)), "ax": { nSec: 10, sps: 250, units: "mg" }, "ay": { nSec: 10, sps: 250, units: "mg" }, "az": { nSec: 10, sps: 250, units: "mg" } }, generateNewLines: true };
  var defaultsetting4 = { sps: 250, useDCBlock: true, useBandpass: true, bandpassLower: 3, bandpassUpper: 45 };
  var museFilterSettings = { "0": JSON.parse(JSON.stringify(defaultsetting4)), "1": JSON.parse(JSON.stringify(defaultsetting4)), "2": JSON.parse(JSON.stringify(defaultsetting4)), "3": JSON.parse(JSON.stringify(defaultsetting4)), "4": JSON.parse(JSON.stringify(defaultsetting4)) };
  function hrcodec(data) {
    return { hr: data.getInt8(1), timestamp: Date.now() };
  }
  var heartRateBLESettings = { services: { "heart_rate": { "heart_rate_measurement": { notify: true, notifyCallback: void 0, codec: hrcodec } } } };
  var simulatorSettings = { sps: 250, simulate: { "0": { sps: 250, freq: 1, amplitude: 1, offset: 0 }, "1": { sps: 250, freq: 10, amplitude: 1, offset: 0 }, "2": { sps: 250, freq: 100, amplitude: 0.5, offset: 0.5 }, "3": { sps: 250, freq: 25, amplitude: 1, offset: 0 } }, connect: (settings = {}) => {
    return new Promise(async (res, rej) => {
      let _id = `simulated${Math.floor(Math.random() * 1e15)}`;
      let info = { _id, settings: Object.assign(Object.assign({}, simulatorSettings), settings) };
      info.settings.looping = true;
      let loopTime = 50;
      let lastTime = Date.now();
      let loop2 = () => {
        if (info.settings.looping) {
          let newData = {};
          let now = Date.now();
          let frame = now - lastTime;
          for (const key in info.settings.simulate) {
            let newPoints = Math.floor(info.settings.simulate[key].sps * frame / 1e3);
            newData[key] = new Array(newPoints).fill(0);
            newData[key] = newData[key].map((v2, i) => {
              return Math.sin(2 * Math.PI * info.settings.simulate[key].freq * 1e-3 * (lastTime + frame * (i + 1) / newPoints)) * info.settings.simulate[key].amplitude + info.settings.simulate[key].offset;
            });
          }
          lastTime = now;
          newData.timestamp = lastTime;
          info.settings.ondata(newData);
          setTimeout(() => {
            loop2();
          }, loopTime);
        }
      };
      loop2();
      if (info.settings.onconnect)
        info.settings.onconnect(info);
      res(info);
    });
  }, codec: (reading) => {
    return reading;
  }, disconnect: (info) => {
    console.log(info);
    info.settings.looping = false;
    info.settings.ondisconnect(info);
  }, onconnect: (info) => {
    console.log("simulator connected!", info);
  }, ondisconnect: (info) => {
    console.log("simulator disconnected!", info);
  }, ondata: (data) => {
  } };
  var Devices = { BLE: { "nrf5x": nrf5xBLESettings, "hegduino": hegduinoBLESettings, "hegduinoV1": hegduinoV1BLESettings, "cognixionONE": cognixionONEBLESettings, "statechanger": statechangerBLESettings, "blueberry": blueberryBLESettings, "blueberry2": blueberry2BLESettings, "heart_rate": heartRateBLESettings }, USB: { "nrf5x": nrf5xSerialSettings, "freeEEG32": freeeeg32SerialSettings, "freeEEG32_optical": freeeeg32_optical_SerialSettings, "freeEEG128": freeeeg128SerialSettings, "hegduino": hegduinoSerialSettings, "hegduinoV1": hegduinoV1SerialSettings, "cyton": cytonSerialSettings, "cyton_daisy": daisycytonSerialSettings, "peanut": peanutSerialSettings, "statechanger": statechangerSerialSettings, "cognixionONE": cytonSerialSettings }, BLE_OTHER: {}, USB_OTHER: {}, OTHER: { "simulator": simulatorSettings } };
  var textdecoder3 = new TextDecoder();
  var BLE = new BLEClient();
  var workers = new WorkerService({ tree: { ...workerCanvasRoutes, ...subprocessRoutes } });
  function initDevice(deviceType, deviceName, options2) {
    if (!options2.devices)
      options2.devices = Devices;
    const settings = options2.devices[deviceType][deviceName];
    if (!settings)
      return void 0;
    if (!options2.workerUrl)
      options2.workerUrl = stream_worker_default;
    if (!options2.service)
      options2.service = workers;
    let streamworker = options2.service.addWorker({ url: options2.workerUrl });
    if (options2.tree) {
      for (const key in options2.tree) {
        let __parent = { callback: "decodeAndParseDevice", worker: streamworker };
        options2.tree[key].__parent = options2.tree[key].__parent ? Object.assign(options2.tree[key].__parent, __parent) : __parent;
      }
      options2.service.setTree(options2.tree);
    }
    if (deviceType.includes("OTHER")) {
      return new Promise(async (res, rej) => {
        settings.ondata = (data) => {
          streamworker.run("decodeAndParseDevice", [data, deviceType, deviceName]).then((result) => {
            if (typeof options2.ondecoded === "function")
              options2.ondecoded(result);
          });
        };
        settings.ondisconnect = () => {
          options2.service.terminate(streamworker._id);
          if (options2.tree) {
            for (const key in options2.tree) {
              options2.service.remove(key);
            }
          }
        };
        let init2 = await settings.connect(settings);
        let info = { workers: { streamworker }, disconnect: () => {
          settings.disconnect(init2);
          if (options2.ondisconnect)
            options2.ondisconnect(info);
          if (options2.tree) {
            for (const key in options2.tree) {
              options2.service.remove(key);
            }
          }
        }, device: init2, options: options2, read: (command) => {
          if (settings.read)
            return new Promise((res2, rej2) => {
              res2(settings.read(settings, command));
            });
        }, write: (command) => {
          if (settings.write)
            return new Promise((res2, rej2) => {
              res2(settings.write(settings, command));
            });
        }, tree: options2.tree };
        if (options2.onconnect)
          options2.onconnect(info);
        res(info);
      }).catch((er) => {
        console.error(er);
        options2.service.terminate(streamworker._id);
        if (options2.tree) {
          for (const key in options2.tree) {
            options2.service.remove(key);
          }
        }
      });
    } else if (deviceType === "BLE") {
      for (const primaryUUID in settings.services) {
        for (const characteristic in settings.services[primaryUUID]) {
          if (typeof options2.ondecoded === "function") {
            if (settings.services?.[primaryUUID]?.[characteristic]?.notify) {
              settings.services[primaryUUID][characteristic].notifyCallback = (data) => {
                streamworker.run("decodeAndParseDevice", [data, deviceType, deviceName, primaryUUID, characteristic], [data.buffer]).then(options2.ondecoded);
              };
              break;
            }
          } else if (typeof options2.ondecoded === "object") {
            if (options2.ondecoded[characteristic]) {
              if (settings.services?.[primaryUUID]?.[characteristic]?.notify) {
                settings.services[primaryUUID][characteristic].notifyCallback = (data) => {
                  streamworker.run("decodeAndParseDevice", [data, deviceType, deviceName, primaryUUID, characteristic], [data.buffer]).then(options2.ondecoded[characteristic]);
                };
              }
              if (settings.services?.[primaryUUID]?.[characteristic]?.read) {
                settings.services[characteristic].readCallback = (data) => {
                  streamworker.run("decodeAndParseDevice", [data, deviceType, deviceName, primaryUUID, characteristic], [data.buffer]).then(options2.ondecoded[characteristic]);
                };
              }
            }
          }
        }
      }
      return new Promise((res, rej) => {
        BLE.setup(settings).then((result) => {
          let info = { workers: { streamworker }, options: options2, device: result, disconnect: async () => {
            await BLE.disconnect(result.deviceId);
            if (options2.ondisconnect)
              options2.ondisconnect(info);
            streamworker.terminate();
            if (options2.tree) {
              for (const key in options2.tree) {
                options2.service.remove(key);
              }
            }
          }, read: (command) => {
            return BLE.read(result.device, command.service, command.characteristic, command.ondata, command.timeout);
          }, write: (command) => {
            return BLE.write(result.device, command.service, command.characteristic, command.data, command.callback, command.timeout);
          }, tree: options2.tree };
          if (options2.onconnect)
            options2.onconnect(info);
          res(info);
        }).catch((er) => {
          console.error(er);
          streamworker.terminate();
          if (options2.tree) {
            for (const key in options2.tree) {
              options2.service.remove(key);
            }
          }
          rej(er);
        });
      });
    } else if (deviceType === "USB") {
      let serialworker = options2.service.addWorker({ url: options2.workerUrl });
      serialworker.worker.addEventListener("message", (ev) => {
        if (typeof ev.data === "string") {
          if (ev.data.includes("disconnected")) {
            options2.service.terminate(serialworker._id);
            options2.service.terminate(streamworker._id);
            if (options2.tree) {
              for (const key in options2.tree) {
                options2.service.remove(key);
              }
            }
          }
        }
      });
      serialworker.post("setupSerial");
      let portId = options2.service.establishMessageChannel(streamworker.worker, serialworker.worker);
      const WS = new WebSerial();
      return new Promise((res, rej) => {
        WS.requestPort(settings.usbVendorId, settings.usbProductId).then((port) => {
          let info = port.getInfo();
          serialworker.run("openPort", { baudRate: settings.baudRate, usbVendorId: info.usbVendorId, usbProductId: info.usbProductId, bufferSize: settings.bufferSize, buffering: settings.buffering ? settings.buffering : void 0, frequency: settings.frequency ? settings.frequency : void 0, pipeTo: { route: "decodeAndParseDevice", _id: portId, extraArgs: [deviceType, deviceName] } }).then((result) => {
            if (settings.write)
              serialworker.post("writeStream", [result._id, settings.write]);
            if (typeof options2.ondecoded === "function")
              streamworker.subscribe("decodeAndParseDevice", options2.ondecoded);
            let info2 = { workers: { streamworker, serialworker }, device: result, options: options2, disconnect: () => {
              serialworker.post("closeStream", result._id);
              if (options2.ondisconnect)
                options2.ondisconnect(info2);
            }, read: () => {
              return new Promise((res2, rej2) => {
                let sub;
                sub = streamworker.subscribe("decodeAndParseDevice", (result2) => {
                  serialworker.unsubscribe("decodeAndParseDevice", sub);
                  res2(result2);
                });
              });
            }, write: (command) => {
              return serialworker.run("writeStream", [result._id, command]);
            }, tree: options2.tree };
            if (options2.onconnect)
              options2.onconnect(info2);
            res(info2);
          });
        }).catch((er) => {
          console.error(er);
          options2.service.terminate(serialworker._id);
          options2.service.terminate(streamworker._id);
          if (options2.tree) {
            for (const key in options2.tree) {
              options2.service.remove(key);
            }
          }
          rej(er);
        });
      });
    } else
      return void 0;
  }

  // components/heg.js
  var heg_exports = {};
  __export(heg_exports, {
    default: () => heg_default
  });
  var heg_default = (data) => {
    console.log("HEG", data);
  };

  // components/eeg.js
  var eeg_exports = {};
  __export(eeg_exports, {
    default: () => eeg_default
  });
  var eeg_default = (data) => {
    console.log("EEG", data);
  };

  // components/emg.js
  var emg_exports = {};
  __export(emg_exports, {
    default: () => emg_default
  });
  var emg_default = (data) => {
    console.log("EMG", data);
  };

  // components/generic.js
  var generic_exports = {};
  __export(generic_exports, {
    accelerometer: () => accelerometer,
    default: () => generic_default,
    gyroscope: () => gyroscope
  });
  var generic_default = (data) => {
    console.log("Generic", data);
  };
  var accelerometer = (data) => {
    console.log("Accelerometer", data);
  };
  var gyroscope = (data) => {
    console.log("Accelerometer", data);
  };

  // components/environment.js
  var environment_exports = {};
  __export(environment_exports, {
    altitude: () => altitude2,
    default: () => environment_default,
    humidity: () => humidity,
    pressure: () => pressure,
    temperature: () => temperature
  });
  var environment_default = (data) => {
    console.log("Environment", data);
  };
  var temperature = (data) => {
    console.log("Temperature", data);
  };
  var pressure = (data) => {
    console.log("Pressure", data);
  };
  var altitude2 = (data) => {
    console.log("Altitude", data);
  };
  var humidity = (data) => {
    console.log("Humidity", data);
  };

  // modules/webglplot/plotter.ts
  var plotter_exports = {};
  __export(plotter_exports, {
    canvas: () => canvas,
    default: () => plotter_default,
    failed: () => failed,
    options: () => options,
    overlay: () => overlay,
    plot: () => plot
  });

  // node_modules/webgl-plot-utils/dist/index.esm.js
  var b = class {
    constructor(e, t, s, h) {
      this.r = e, this.g = t, this.b = s, this.a = h;
    }
  };
  var x = class {
    constructor() {
      this.scaleX = 1, this.scaleY = 1, this.offsetX = 0, this.offsetY = 0, this.loop = false, this._vbuffer = 0, this._coord = 0, this.visible = true, this.intensity = 1, this.xy = new Float32Array([]), this.numPoints = 0, this.color = new b(0, 0, 0, 1), this.webglNumPoints = 0;
    }
  };
  var v = class extends x {
    constructor(e, t) {
      super(), this.currentIndex = 0, this.webglNumPoints = t, this.numPoints = t, this.color = e, this.xy = new Float32Array(2 * this.webglNumPoints);
    }
    setX(e, t) {
      this.xy[e * 2] = t;
    }
    setY(e, t) {
      this.xy[e * 2 + 1] = t;
    }
    getX(e) {
      return this.xy[e * 2];
    }
    getY(e) {
      return this.xy[e * 2 + 1];
    }
    lineSpaceX(e, t) {
      for (let s = 0; s < this.numPoints; s++)
        this.setX(s, e + t * s);
    }
    arrangeX() {
      this.lineSpaceX(-1, 2 / this.numPoints);
    }
    constY(e) {
      for (let t = 0; t < this.numPoints; t++)
        this.setY(t, e);
    }
    shiftAdd(e) {
      let t = e.length;
      for (let s = 0; s < this.numPoints - t; s++)
        this.setY(s, this.getY(s + t));
      for (let s = 0; s < t; s++)
        this.setY(s + this.numPoints - t, e[s]);
    }
    addArrayY(e) {
      if (this.currentIndex + e.length <= this.numPoints)
        for (let t = 0; t < e.length; t++)
          this.setY(this.currentIndex, e[t]), this.currentIndex++;
    }
    replaceArrayY(e) {
      if (e.length == this.numPoints)
        for (let t = 0; t < this.numPoints; t++)
          this.setY(t, e[t]);
    }
  };
  var Y = (f, e, t) => {
    let s = { x: 0, y: 0 };
    return s.x = f.x + e.x * t, s.y = f.y + e.y * t, s;
  };
  var _ = (f) => P(-f.y, f.x);
  var w = (f, e) => {
    let t = T(f, e);
    return t = M(t), t;
  };
  var S = (f, e) => {
    let t = { x: 0, y: 0 };
    return t.x = f.x + e.x, t.y = f.y + e.y, t;
  };
  var R = (f, e) => f.x * e.x + f.y * e.y;
  var M = (f) => {
    let e = { x: 0, y: 0 }, t = f.x * f.x + f.y * f.y;
    return t > 0 && (t = 1 / Math.sqrt(t), e.x = f.x * t, e.y = f.y * t), e;
  };
  var P = (f, e) => {
    let t = { x: 0, y: 0 };
    return t.x = f, t.y = e, t;
  };
  var T = (f, e) => {
    let t = { x: 0, y: 0 };
    return t.x = f.x - e.x, t.y = f.y - e.y, t;
  };
  var C = (f) => {
    let e, t = { x: 0, y: 0 }, s = { x: 0, y: 0 }, h = [], r = (n, l) => {
      h.push({ vec2: n, miterLength: l });
    }, a = (n) => ({ x: f[n * 2], y: f[n * 2 + 1] });
    t = w(a(1), a(0)), e = _(t), r(e, 1);
    let o = f.length / 2;
    for (let n = 1; n < o - 1; n++) {
      let l = a(n - 1), i = a(n), u = a(n + 1);
      t = w(i, l), e = _(t), s = w(u, i);
      let c = F(t, s), g = N(t, c, 1);
      r(c, g);
    }
    return t = w(a(o - 1), a(o - 2)), e = _(t), r(e, 1), h;
  };
  var F = (f, e) => {
    let t = S(f, e);
    return t = M(t), P(-t.y, t.x);
  };
  var N = (f, e, t) => {
    let s = P(-f.y, f.x);
    return t / R(e, s);
  };
  var d = class extends x {
    constructor(e, t, s) {
      super(), this.currentIndex = 0, this._thicknessRequested = 0, this._actualThickness = 0, this.webglNumPoints = t * 2, this.numPoints = t, this.color = e, this._thicknessRequested = s, this._linePoints = new Float32Array(t * 2), this.xy = new Float32Array(2 * this.webglNumPoints);
    }
    convertToTriPoints() {
      let e = this._actualThickness / 2, t = C(this._linePoints);
      for (let s = 0; s < this.numPoints; s++) {
        let h = this._linePoints[2 * s], r = this._linePoints[2 * s + 1], a = { x: h, y: r }, o = Y(a, t[s].vec2, t[s].miterLength * e), n = Y(a, t[s].vec2, -t[s].miterLength * e);
        this.xy[s * 4] = o.x, this.xy[s * 4 + 1] = o.y, this.xy[s * 4 + 2] = n.x, this.xy[s * 4 + 3] = n.y;
      }
    }
    setX(e, t) {
      this._linePoints[e * 2] = t;
    }
    setY(e, t) {
      this._linePoints[e * 2 + 1] = t;
    }
    lineSpaceX(e, t) {
      for (let s = 0; s < this.numPoints; s++)
        this.setX(s, e + t * s);
    }
    setThickness(e) {
      this._thicknessRequested = e;
    }
    getThickness() {
      return this._thicknessRequested;
    }
    setActualThickness(e) {
      this._actualThickness = e;
    }
  };
  var A = class {
    constructor(e, t) {
      this.debug = false, this.addLine = this.addDataLine, t == null ? this.webgl = e.getContext("webgl", { antialias: true, transparent: false }) : (this.webgl = e.getContext("webgl", { antialias: t.antialias, transparent: t.transparent, desynchronized: t.deSync, powerPerformance: t.powerPerformance, preserveDrawing: t.preserveDrawing }), this.debug = t.debug == null ? false : t.debug), this.log("canvas type is: " + e.constructor.name), this.log(`[webgl-plot]:width=${e.width}, height=${e.height}`), this._linesData = [], this._linesAux = [], this._thickLines = [], this._surfaces = [], this.gScaleX = 1, this.gScaleY = 1, this.gXYratio = 1, this.gOffsetX = 0, this.gOffsetY = 0, this.gLog10X = false, this.gLog10Y = false, this.webgl.clear(this.webgl.COLOR_BUFFER_BIT), this.webgl.viewport(0, 0, e.width, e.height), this._progLine = this.webgl.createProgram(), this.initThinLineProgram(), this.webgl.enable(this.webgl.BLEND), this.webgl.blendFunc(this.webgl.SRC_ALPHA, this.webgl.ONE_MINUS_SRC_ALPHA);
    }
    get linesData() {
      return this._linesData;
    }
    get linesAux() {
      return this._linesAux;
    }
    get thickLines() {
      return this._thickLines;
    }
    get surfaces() {
      return this._surfaces;
    }
    _drawLines(e) {
      let t = this.webgl;
      e.forEach((s) => {
        if (s.visible) {
          t.useProgram(this._progLine);
          let h = t.getUniformLocation(this._progLine, "uscale");
          t.uniformMatrix2fv(h, false, new Float32Array([s.scaleX * this.gScaleX * (this.gLog10X ? 1 / Math.log(10) : 1), 0, 0, s.scaleY * this.gScaleY * this.gXYratio * (this.gLog10Y ? 1 / Math.log(10) : 1)]));
          let r = t.getUniformLocation(this._progLine, "uoffset");
          t.uniform2fv(r, new Float32Array([s.offsetX + this.gOffsetX, s.offsetY + this.gOffsetY]));
          let a = t.getUniformLocation(this._progLine, "is_log");
          t.uniform2iv(a, new Int32Array([this.gLog10X ? 1 : 0, this.gLog10Y ? 1 : 0]));
          let o = t.getUniformLocation(this._progLine, "uColor");
          t.uniform4fv(o, [s.color.r, s.color.g, s.color.b, s.color.a]), t.bufferData(t.ARRAY_BUFFER, s.xy, t.STREAM_DRAW), t.drawArrays(s.loop ? t.LINE_LOOP : t.LINE_STRIP, 0, s.webglNumPoints);
        }
      });
    }
    _drawSurfaces(e) {
      let t = this.webgl;
      e.forEach((s) => {
        if (s.visible) {
          t.useProgram(this._progLine);
          let h = t.getUniformLocation(this._progLine, "uscale");
          t.uniformMatrix2fv(h, false, new Float32Array([s.scaleX * this.gScaleX * (this.gLog10X ? 1 / Math.log(10) : 1), 0, 0, s.scaleY * this.gScaleY * this.gXYratio * (this.gLog10Y ? 1 / Math.log(10) : 1)]));
          let r = t.getUniformLocation(this._progLine, "uoffset");
          t.uniform2fv(r, new Float32Array([s.offsetX + this.gOffsetX, s.offsetY + this.gOffsetY]));
          let a = t.getUniformLocation(this._progLine, "is_log");
          t.uniform2iv(a, new Int32Array([this.gLog10X ? 1 : 0, this.gLog10Y ? 1 : 0]));
          let o = t.getUniformLocation(this._progLine, "uColor");
          t.uniform4fv(o, [s.color.r, s.color.g, s.color.b, s.color.a]), t.bufferData(t.ARRAY_BUFFER, s.xy, t.STREAM_DRAW), t.drawArrays(t.TRIANGLE_STRIP, 0, s.webglNumPoints);
        }
      });
    }
    _drawTriangles(e) {
      let t = this.webgl;
      t.bufferData(t.ARRAY_BUFFER, e.xy, t.STREAM_DRAW), t.useProgram(this._progLine);
      let s = t.getUniformLocation(this._progLine, "uscale");
      t.uniformMatrix2fv(s, false, new Float32Array([e.scaleX * this.gScaleX * (this.gLog10X ? 1 / Math.log(10) : 1), 0, 0, e.scaleY * this.gScaleY * this.gXYratio * (this.gLog10Y ? 1 / Math.log(10) : 1)]));
      let h = t.getUniformLocation(this._progLine, "uoffset");
      t.uniform2fv(h, new Float32Array([e.offsetX + this.gOffsetX, e.offsetY + this.gOffsetY]));
      let r = t.getUniformLocation(this._progLine, "is_log");
      t.uniform2iv(r, new Int32Array([0, 0]));
      let a = t.getUniformLocation(this._progLine, "uColor");
      t.uniform4fv(a, [e.color.r, e.color.g, e.color.b, e.color.a]), t.drawArrays(t.TRIANGLE_STRIP, 0, e.xy.length / 2);
    }
    _drawThickLines() {
      this._thickLines.forEach((e) => {
        if (e.visible) {
          let t = Math.min(this.gScaleX, this.gScaleY);
          e.setActualThickness(e.getThickness() / t), e.convertToTriPoints(), this._drawTriangles(e);
        }
      });
    }
    update() {
      this.clear(), this.draw();
    }
    draw() {
      this._drawLines(this.linesData), this._drawLines(this.linesAux), this._drawThickLines(), this._drawSurfaces(this.surfaces);
    }
    clear() {
      this.webgl.clear(this.webgl.COLOR_BUFFER_BIT);
    }
    _addLine(e) {
      e._vbuffer = this.webgl.createBuffer(), this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, e._vbuffer), this.webgl.bufferData(this.webgl.ARRAY_BUFFER, e.xy, this.webgl.STREAM_DRAW), e._coord = this.webgl.getAttribLocation(this._progLine, "coordinates"), this.webgl.vertexAttribPointer(e._coord, 2, this.webgl.FLOAT, false, 0, 0), this.webgl.enableVertexAttribArray(e._coord);
    }
    addDataLine(e) {
      this._addLine(e), this.linesData.push(e);
    }
    addAuxLine(e) {
      this._addLine(e), this.linesAux.push(e);
    }
    addThickLine(e) {
      this._addLine(e), this._thickLines.push(e);
    }
    addSurface(e) {
      this._addLine(e), this.surfaces.push(e);
    }
    initThinLineProgram() {
      let e = `
      attribute vec2 coordinates;
      uniform mat2 uscale;
      uniform vec2 uoffset;
      uniform ivec2 is_log;

      void main(void) {
         float x = (is_log[0]==1) ? log(coordinates.x) : coordinates.x;
         float y = (is_log[1]==1) ? log(coordinates.y) : coordinates.y;
         vec2 line = vec2(x, y);
         gl_Position = vec4(uscale*line + uoffset, 0.0, 1.0);
      }`, t = this.webgl.createShader(this.webgl.VERTEX_SHADER);
      this.webgl.shaderSource(t, e), this.webgl.compileShader(t);
      let s = `
         precision mediump float;
         uniform highp vec4 uColor;
         void main(void) {
            gl_FragColor =  uColor;
         }`, h = this.webgl.createShader(this.webgl.FRAGMENT_SHADER);
      this.webgl.shaderSource(h, s), this.webgl.compileShader(h), this._progLine = this.webgl.createProgram(), this.webgl.attachShader(this._progLine, t), this.webgl.attachShader(this._progLine, h), this.webgl.linkProgram(this._progLine);
    }
    popDataLine() {
      this.linesData.pop();
    }
    removeAllLines() {
      this._linesData = [], this._linesAux = [], this._thickLines = [], this._surfaces = [];
    }
    removeDataLines() {
      this._linesData = [];
    }
    removeAuxLines() {
      this._linesAux = [];
    }
    viewport(e, t, s, h) {
      this.webgl.viewport(e, t, s, h);
    }
    log(e) {
      this.debug && console.log("[webgl-plot]:" + e);
    }
  };
  var y = class {
    constructor() {
      this.plots = {};
    }
    initPlot(e, t) {
      if (t || (t = new A(e.canvas, e.webglOptions)), !e._id)
        e._id = `plot${Math.floor(Math.random() * 1e15)}`;
      else if (this.plots[e._id]) {
        let l = this.plots[e._id].initial;
        if (e.lines) {
          for (let i in e.lines)
            if (l.lines[i] && Array.isArray(e.lines[i])) {
              let u = e.lines[i];
              e.lines[i] = l.lines[i];
            }
        }
        e = Object.assign(l, e);
      }
      e.overlay && (typeof e.overlay != "object" && (e.overlay = document.createElement("canvas"), e.overlay.style.position = "absolute", e.overlay.width = e.canvas.width, e.overlay.height = e.canvas.height, e.canvas.appendChild(e.overlay)), e.overlayCtx || (e.overlayCtx = e.overlay.getContext("2d"))), e.width && (e.canvas.width = e.width, e.canvas.style && (e.canvas.style.width = e.width + "px"), typeof e.overlay == "object" && (e.overlay.width = e.width, e.overlay.style && (e.overlay.style.width = e.width + "px"))), e.height && (e.canvas.height = e.height, e.canvas.style && (e.canvas.style.height = e.height + "px"), typeof e.overlay == "object" && (e.overlay.height = e.height, e.overlay.style && (e.overlay.style.height = e.height + "px"))), e.lines?.timestamp && delete e.lines.timestamp, e.lines || (e.lines = {});
      let s = {};
      for (let l in e.lines)
        s[l] = Object.assign({}, s[l]), "viewing" in e.lines[l] || (e.lines[l].viewing = true), s[l].viewing = e.lines[l].viewing, s[l].sps = e.lines[l].sps, s[l].nSec = e.lines[l].nSec, s[l].nPoints = e.lines[l].nPoints, s[l].ymin = e.lines[l].ymin, s[l].ymax = e.lines[l].ymax, s[l].units = e.lines[l].units;
      let h = { plot: t, settings: e, initial: Object.assign(Object.assign({}, e), { lines: s }), anim: () => {
        t.update();
      } };
      this.plots[e._id] = h;
      let r = 0, a = 0;
      Object.keys(e.lines).forEach((l) => {
        e.lines[l]?.viewing !== false && a++;
      }), e.nLines = a;
      let o, n;
      typeof e.overlay == "object" && (o = e.overlay, n = e.overlayCtx, n.clearRect(0, 0, e.overlay.width, e.overlay.height), n.font = e.overlayFont ? e.overlayFont : "1em Courier", n.fillStyle = e.overlayColor ? e.overlayColor : "white");
      for (let l in e.lines) {
        let i = e.lines[l];
        if (Array.isArray(i) && (i = { values: i }, e.lines[l] = i), "viewing" in i || (i.viewing = true), i.color)
          Array.isArray(i.color) && (i.color = new b(...i.color));
        else {
          let m = y.HSLToRGB(360 * (r / a) % 360, 100, 50, 1);
          h.initial.lines[l].color = [...m, 1], i.color = new b(...m, 1);
        }
        let u;
        if (i.nSec && i.sps ? u = Math.ceil(i.nSec * i.sps) : i.nPoints ? u = i.nPoints : i.points ? u = i.points : e.linePoints ? u = e.linePoints : i.values ? u = i.values.length : u = 1e3, i.points = u, e.lines[l].viewing === false)
          continue;
        if ((i.width || e.lineWidth) && i.width !== 0) {
          let m = e.lineWidth;
          m || (m = i.width), i.width ? i.line = new d(i.color, u, i.width) : e.lineWidth && (i.line = new d(i.color, u, e.lineWidth)), i.line.lineSpaceX(-1, 2 / i.line.numPoints);
        } else
          i.line = new v(i.color, u), i.line.arrangeX();
        i.values?.length === i.points ? i.values.length !== u && (i.interpolate ? i.values.length > u ? i.values = y.downsample(i.values, u) : i.values.length < u && (i.values = y.upsample(i.values, u)) : i.values.length > i.points ? i.values = i.values.slice(i.values.length - i.points) : i.values = [...new Array(i.points - i.values.length).fill(0), ...i.values]) : Array.isArray(i.values) ? i.values.length > u ? i.values = i.values.slice(i.values.length - u) : i.values.length < u && (i.values = [...new Array(u - i.values.length).fill(0), ...i.values]) : i.values = new Array(i.points).fill(0);
        let c = i.ymin, g = i.ymax;
        if (c === g ? (g = i.values.length <= 1e5 ? Math.max(...i.values) : 1, c = i.values.length <= 1e5 ? Math.min(...i.values) : 0) : isNaN(g) && (g = i.values.length <= 1e5 ? Math.max(...i.values) : 1), isNaN(c) && (c = i.values.length <= 1e5 ? Math.min(...i.values) : 0), c > g) {
          let m = c;
          g = c, c = m;
        }
        let p = Math.abs(c);
        if (i.absmax = p > g ? p : g, "autoscale" in i || (i.autoscale = true), i.position || (i.position = e.nLines - r - 1), i.autoscale ? i.autoscale === 2 ? ("clamp" in i || (i.clamp = true), i.scaled = y.autoscale(i.values, i.position, a, i.centerZero, c, g, i.clamp)) : (i.scaled = i.values, i.line.scaleY = y.getYScalar(i.values, a, i.centerZero, c, g), i.line.offsetY = y.getYOffset(i.position, a, c, i.line.scaleY)) : i.scaled = i.values, i.scaled.forEach((m, L) => i.line.setY(L, m)), i.line instanceof d ? t.addThickLine(i.line) : i.line instanceof v && t.addDataLine(i.line), "xAxis" in i || (i.xAxis = true), i.xAxis) {
          i.xColor ? Array.isArray(i.xColor) && (i.xColor = new b(...i.xColor)) : i.xColor = new b(1, 1, 1, 0.3);
          let m = new v(i.xColor, 2), L = i.autoscale ? (r + 1) * 2 / a - 1 - 1 / a : 0;
          m.constY(L), m.arrangeX(), m.xy[2] = 1, i.x = m, t.addAuxLine(m);
        }
        if (a > 1 && i.autoscale && r !== a - 1) {
          e.dividerColor ? Array.isArray(e.dividerColor) && (e.dividerColor = new b(...e.dividerColor)) : e.dividerColor = new b(1, 1, 1, 1);
          let m = new v(e.dividerColor, 2);
          m.constY(i.autoscale ? (r + 1) * 2 / a - 1 : 1), m.arrangeX(), m.xy[2] = 1, i.divider = m, t.addAuxLine(m);
        }
        if (typeof e.overlay == "object" && (i.useOverlay || !("useOverlay" in i))) {
          let m = e.nLines - i.position - 1;
          n.fillText(l, 20, o.height * (m + 0.2) / e.nLines), n.fillText(`${Math.floor(g) === g ? g : g?.toFixed(5)} ${i.units ? i.units : ""}`, o.width - 100, o.height * (m + 0.2) / e.nLines), n.fillText(`${Math.floor(c) === c ? c : c?.toFixed(5)} ${i.units ? i.units : ""}`, o.width - 100, o.height * (m + 0.9) / e.nLines);
        }
        r++;
      }
      return requestAnimationFrame(h.anim), this.plots[e._id];
    }
    deinitPlot(e) {
      return typeof e == "string" && (e = this.plots[e]), e.plot.clear(), e.plot.removeAllLines(), true;
    }
    reinitPlot(e, t) {
      if (typeof e == "string") {
        let s = e;
        e = this.plots[e], t._id || (t._id = s);
      }
      if (!!e.plot)
        return e.plot.clear(), e.plot.removeAllLines(), e.settings.overlayCtx && e.settings.overlayCtx.clearRect(0, 0, e.settings.overlay?.width, e.settings.overlay?.height), this.initPlot(t, e.plot);
    }
    getChartSettings(e, t) {
      let s = this.plots[e];
      if (s) {
        let h = Object.assign({}, s.initial);
        for (let r in s.initial.lines)
          typeof s.initial.lines[r]?.ymax != "number" && (h.lines[r].ymax = s.settings.lines[r]?.ymax), typeof s.initial.lines[r]?.ymin != "number" && (h.lines[r].ymin = s.settings.lines[r]?.ymin), t && (h.lines[r].values = s.settings.lines[r].values);
        return delete h.canvas, delete h.overlay, delete h.overlayCtx, h;
      }
    }
    update(e, t, s = true) {
      if (typeof e == "string" && (e = this.plots[e]), !e)
        return false;
      if (t) {
        let h = false, r, a;
        typeof e.settings.overlay == "object" && (r = e.settings.overlay, a = e.settings.overlayCtx, a.font = e.settings.overlayFont ? e.settings.overlayFont : "1em Courier", a.fillStyle = e.settings.overlayColor ? e.settings.overlayColor : "white");
        for (let o in t)
          if (e.settings.lines[o] && e.settings.lines[o].line) {
            if (e.settings.lines[o]?.viewing === false)
              continue;
            let n = e.settings.lines[o];
            if (Array.isArray(t[o]) && n.values.length < 1e5 ? (n.values.length === 0 && (n.values.length = n.points ? n.points : 1e3), t[o].length === n.values.length ? n.values = t[o] : y.circularBuffer(n.values, t[o])) : typeof t[o] == "number" ? (n.values.push(t[o]), n.values.shift()) : t[o]?.values && (n.values.length === 0 && (n.values.length = n.points ? n.points : 1e3), t[o].values.length === n.values.length ? n.values = t[o].values : y.circularBuffer(n.values, t[o].values)), n.values) {
              n.values.length !== n.points && (n.interpolate ? n.values.length > n.points ? n.values = y.downsample(n.values, n.points) : n.scaled.length < n.points && (n.values = y.upsample(n.values, n.points)) : n.values.length > n.points ? n.values.splice(0, n.values.length - n.points) : n.values = new Array(n.points).fill(0).splice(n.points - n.values.length, 0, n.values));
              let l = n.ymin, i = n.ymax;
              if (l === i ? (i = n.values.length <= 1e5 ? Math.max(...n.values) : 1, l = n.values.length <= 1e5 ? Math.min(...n.values) : 0) : isNaN(i) && (i = n.values.length <= 1e5 ? Math.max(...n.values) : 1), isNaN(l) && (l = n.values.length <= 1e5 ? Math.min(...n.values) : 0), l > i) {
                let c = l;
                i = l, l = c;
              }
              let u = Math.abs(l);
              if (n.absmax = u > i ? u : i, n.autoscale ? n.autoscale === 2 ? n.scaled = y.autoscale(n.values, n.position, e.settings.nLines, n.centerZero, l, i, n.clamp) : (n.scaled = n.values, n.line.scaleY = y.getYScalar(n.values, e.settings.nLines, n.centerZero, l, i), n.line.offsetY = y.getYOffset(n.position, e.settings.nLines, l, n.line.scaleY)) : n.scaled = n.values, n.scaled.forEach((c, g) => {
                !n.autoscale && n.absmax > 1 ? n.line.setY(g, c / n.absmax) : n.line.setY(g, c);
              }), typeof e.settings.overlay == "object" && (n.useOverlay || !("useOverlay" in n))) {
                let c = e.settings.nLines - n.position - 1;
                a.clearRect(0, r.height * c / e.settings.nLines, r.width, r.height / e.settings.nLines), a.fillText(o, 20, r.height * (c + 0.2) / e.settings.nLines), a.fillText(`${Math.floor(i) === i ? i : i?.toFixed(5)} ${n.units ? n.units : ""}`, r.width - 100, r.height * (c + 0.2) / e.settings.nLines), a.fillText(`${Math.floor(l) === l ? l : l?.toFixed(5)} ${n.units ? n.units : ""}`, r.width - 100, r.height * (c + 0.9) / e.settings.nLines);
              }
            }
          } else
            e.settings.generateNewLines && !o.includes("timestamp") && (Array.isArray(t[o]) && (t[o] = { values: t[o] }), !t[o].nSec && !t[o].nPoints && !e.settings.linePoints && (t[o].nPoints = 1e3), h = true);
        if (h)
          return e.settings.cleanGeneration || Object.keys(e.initial.lines).forEach((o) => {
            t[o] ? t[o] = Object.assign(e.initial.lines[o], t[o]) : t[o] = e.initial.lines[o];
          }), this.reinitPlot(e, { _id: e.settings._id, lines: t }), true;
      }
      return s && requestAnimationFrame(e.anim), true;
    }
    updateLine(e, t, s, h, r, a, o) {
      return e.numPoints !== t.length && (s ? e.numPoints > t.length ? t = y.downsample(t, e.numPoints) : e.numPoints < t.length && (t = y.upsample(t, e.numPoints)) : t.length > e.numPoints ? t = t.slice(t.length - e.numPoints) : t = [...new Array(t.length).fill(0), ...t]), h && (t = y.autoscale(t, r, a, o)), t.forEach((n, l) => e.setY(l, n)), true;
    }
    static autoscale(e, t = 0, s = 1, h = false, r, a, o) {
      if (e?.length === 0)
        return e;
      let n = typeof a == "number" ? a : e.length <= 1e5 ? Math.max(...e) : 1, l = typeof r == "number" ? r : e.length <= 1e5 ? Math.min(...e) : 0, i = 1 / s, u = 1;
      if (h) {
        let c = Math.max(Math.abs(l), Math.abs(n));
        return c !== 0 && (u = i / c), e.map((g) => (o && (g < l && (g = l), g > n && (g = n)), g * u + (i * (t + 1) * 2 - 1 - i)));
      } else
        return n === l ? n !== 0 ? u = i / n : l !== 0 && (u = i / Math.abs(l)) : u = i / (n - l), e.map((c) => (o && (c < l && (c = l), c > n && (c = n)), 2 * ((c - l) * u - 1 / (2 * s)) + (i * (t + 1) * 2 - 1 - i)));
    }
    static getYScalar(e, t = 1, s = false, h, r) {
      if (e?.length === 0)
        return e;
      let a = typeof r == "number" ? r : e.length <= 1e5 ? Math.max(...e) : 1, o = typeof h == "number" ? h : e.length <= 1e5 ? Math.min(...e) : 0, n = 1 / t, l = 1;
      if (s) {
        let i = Math.max(Math.abs(o), Math.abs(a));
        return i !== 0 && (l = n / i), 2 * l;
      } else
        return a === o ? a !== 0 ? l = n / a : o !== 0 && (l = n / Math.abs(o)) : l = n / (a - o), 2 * l;
    }
    static getYOffset(e = 0, t = 1, s = 0, h = 1) {
      let r = 1 / t, a = r * (e + 1) * 2 - 1 - r;
      return s > 0 && (a -= s * h + 1 / t), a;
    }
    static absmax(e) {
      return Math.max(Math.abs(Math.min(...e)), Math.max(...e));
    }
    static downsample(e, t, s = 1) {
      if (e.length > t) {
        let h = new Array(t), r = e.length / t, a = e.length - 1, o = 0, n = 0;
        for (let l = r; l < e.length; l += r) {
          let i = Math.round(l);
          i > a && (i = a);
          for (let u = o; u < i; u++)
            h[n] += e[u];
          h[n] /= (i - o) * s, n++, o = i;
        }
        return h;
      } else
        return e;
    }
    static upsample(e, t, s = 1) {
      var h = function(c, g, p) {
        return (c + (g - c) * p) * s;
      }, r = new Array(t), a = (e.length - 1) / (t - 1);
      r[0] = e[0];
      for (var o = 1; o < t - 1; o++) {
        var n = o * a, l = Math.floor(n), i = Math.ceil(n), u = n - l;
        r[o] = h(e[l], e[i], u);
      }
      return r[t - 1] = e[e.length - 1], r;
    }
    static interpolate(e, t, s = 1) {
      return e.length > t ? y.downsample(e, t, s) : e.length < t ? y.upsample(e, t, s) : e;
    }
    static HSLToRGB(e, t, s, h = 255) {
      t /= 100, s /= 100;
      let r = (1 - Math.abs(2 * s - 1)) * t, a = r * (1 - Math.abs(e / 60 % 2 - 1)), o = s - r / 2, n = 0, l = 0, i = 0;
      return 0 <= e && e < 60 ? (n = r, l = a, i = 0) : 60 <= e && e < 120 ? (n = a, l = r, i = 0) : 120 <= e && e < 180 ? (n = 0, l = r, i = a) : 180 <= e && e < 240 ? (n = 0, l = a, i = r) : 240 <= e && e < 300 ? (n = a, l = 0, i = r) : 300 <= e && e < 360 && (n = r, l = 0, i = a), n = (n + o) * h, l = (l + o) * h, i = (i + o) * h, [n, l, i];
    }
    static circularBuffer(e, t) {
      if (t.length < e.length) {
        let s = e.slice(t.length), h = e.length;
        e.splice(0, h, ...s, ...t);
      } else if (t.length > e.length) {
        let s = e.length;
        e.splice(0, s, ...t.slice(t.length - s));
      } else
        e.splice(0, e.length, ...t);
      return e;
    }
    static formatDataForCharts(e, t) {
      if (Array.isArray(e)) {
        if (Array.isArray(e[0])) {
          let s = {};
          if (e.forEach((h, r) => {
            s[r] = h;
          }), e = s, isNaN(e[0][0]))
            return;
        } else if (t) {
          if (e = { [t]: e }, isNaN(e[t][0]))
            return;
        } else if (e = { 0: e }, isNaN(e[0][0]))
          return;
      } else if (typeof e == "object") {
        for (let s in e)
          if (typeof e[s] == "number" ? e[s] = [e[s]] : e[s]?.values && typeof e[s].values == "number" && (e[s].values = [e[s].values]), isNaN(e[s][0]))
            return;
      } else if (typeof e == "string") {
        let s;
        if (e.includes(`\r
`)) {
          let h = e.split(`\r
`);
          e = {}, h.forEach((r, a) => {
            r.includes("	") ? s = r.split("	") : r.includes(",") ? s = r.split(",") : r.includes("|") && (s = r.split("|")), s && s.forEach((o, n) => {
              if (o.includes(":")) {
                let [l, i] = o.split(":"), u = parseFloat(i);
                isNaN(u) || (e[l] = [u]);
              } else {
                let l = parseFloat(o);
                isNaN(l) || (e[n] = [l]);
              }
            });
          });
        } else
          e.includes("	") ? s = e.split("	") : e.includes(",") ? s = e.split(",") : e.includes("|") && (s = e.split("|"));
        e = {}, s && s.forEach((h, r) => {
          if (h.includes(":")) {
            let [a, o] = h.split(":"), n = parseFloat(o);
            isNaN(n) || (e[a] = [n]);
          } else {
            let a = parseFloat(h);
            isNaN(a) || (e[r] = [a]);
          }
        });
      } else
        typeof e == "number" && (t ? e = { [t]: [e] } : e = { 0: [e] });
      return e;
    }
    static padTime(e, t, s, h) {
      let r = (e[0] - t) / s / h;
      return [...new Array(h - e.length).map((o, n) => t + r * (n + 1)), ...e];
    }
    static interpolateForTime(e, t, s) {
      return y.interpolate(e, Math.ceil(s * t));
    }
  };

  // modules/webglplot/canvas.worker.ts
  var url2 = URL.createObjectURL(new Blob([String('(()=>{var mouseEventHandler=makeSendPropertiesHandler(["ctrlKey","metaKey","shiftKey","button","pointerType","clientX","clientY","pageX","pageY"]);var wheelEventHandlerImpl=makeSendPropertiesHandler(["deltaX","deltaY"]);var keydownEventHandler=makeSendPropertiesHandler(["ctrlKey","metaKey","shiftKey","keyCode"]);function wheelEventHandler(event,sendFn){event.preventDefault();wheelEventHandlerImpl(event,sendFn)}function preventDefaultHandler(event){event.preventDefault()}function copyProperties(src,properties,dst){for(const name of properties){dst[name]=src[name]}}function makeSendPropertiesHandler(properties){return function sendProperties(event,sendFn){const data={type:event.type};copyProperties(event,properties,data);sendFn(data)}}function touchEventHandler(event,sendFn){const touches=[];const data={type:event.type,touches};for(let i=0;i<event.touches.length;++i){const touch=event.touches[i];touches.push({pageX:touch.pageX,pageY:touch.pageY})}sendFn(data)}var orbitKeys={"37":true,"38":true,"39":true,"40":true};function filteredKeydownEventHandler(event,sendFn){const{keyCode}=event;if(orbitKeys[keyCode]){event.preventDefault();keydownEventHandler(event,sendFn)}}var eventHandlers={contextmenu:preventDefaultHandler,mousedown:mouseEventHandler,mousemove:mouseEventHandler,mouseup:mouseEventHandler,pointerdown:mouseEventHandler,pointermove:mouseEventHandler,pointerup:mouseEventHandler,touchstart:touchEventHandler,touchmove:touchEventHandler,touchend:touchEventHandler,wheel:wheelEventHandler,keydown:filteredKeydownEventHandler};function initProxyElement(element,worker,id){if(!id)id="proxy"+Math.floor(Math.random()*1e15);const sendEvent=data=>{worker.postMessage({route:"handleProxyEvent",args:[data,id]})};let entries=Object.entries(eventHandlers);for(const[eventName,handler]of entries){element.addEventListener(eventName,function(event){handler(event,sendEvent)})}const sendSize=()=>{const rect=element.getBoundingClientRect();sendEvent({type:"resize",left:rect.left,top:rect.top,width:element.clientWidth,height:element.clientHeight})};sendSize();globalThis.addEventListener("resize",sendSize);return id}var EventDispatcher=class{addEventListener(type,listener){if(this._listeners===void 0)this._listeners={};const listeners=this._listeners;if(listeners[type]===void 0){listeners[type]=[]}if(listeners[type].indexOf(listener)===-1){listeners[type].push(listener)}}hasEventListener(type,listener){if(this._listeners===void 0)return false;const listeners=this._listeners;return listeners[type]!==void 0&&listeners[type].indexOf(listener)!==-1}removeEventListener(type,listener){if(this._listeners===void 0)return;const listeners=this._listeners;const listenerArray=listeners[type];if(listenerArray!==void 0){const index=listenerArray.indexOf(listener);if(index!==-1){listenerArray.splice(index,1)}}}dispatchEvent(event,target){if(this._listeners===void 0)return;const listeners=this._listeners;const listenerArray=listeners[event.type];if(listenerArray!==void 0){if(!target)event.target=this;else event.target=target;const array=listenerArray.slice(0);for(let i=0,l=array.length;i<l;i++){array[i].call(this,event)}event.target=null}}};function noop(){}var ElementProxyReceiver=class extends EventDispatcher{constructor(){super();this._listeners={};this.style={};this.setPointerCapture=()=>{};this.releasePointerCapture=()=>{};this.getBoundingClientRect=()=>{return{left:this.left,top:this.top,width:this.width,height:this.height,right:this.left+this.width,bottom:this.top+this.height}};this.handleEvent=data=>{if(data.type==="resize"){this.left=data.left;this.top=data.top;this.width=data.width;this.height=data.height;if(typeof this.proxied==="object"){this.proxied.style.width=this.width+"px";this.proxied.style.height=this.height+"px";this.proxied.clientWidth=this.width;this.proxied.clientHeight=this.height}}data.preventDefault=noop;data.stopPropagation=noop;this.dispatchEvent(data,this.proxied)};this.style={}}get clientWidth(){return this.width}get clientHeight(){return this.height}focus(){}};var ProxyManager=class{constructor(){this.targets={};this.makeProxy=(id,addTo=void 0)=>{if(!id)id=`proxyReceiver${Math.floor(Math.random()*1e15)}`;let proxy;if(this.targets[id])proxy=this.targets[id];else{proxy=new ElementProxyReceiver;this.targets[id]=proxy}if(typeof addTo==="object"){addTo.proxy=proxy;proxy.proxied=addTo;if(typeof WorkerGlobalScope!=="undefined")addTo.style=proxy.style;if(proxy.width){addTo.style.width=proxy.width+"px";addTo.clientWidth=proxy.width}if(proxy.height){addTo.style.height=proxy.height+"px";addTo.clientHeight=proxy.height}addTo.setPointerCapture=proxy.setPointerCapture.bind(proxy);addTo.releasePointerCapture=proxy.releasePointerCapture.bind(proxy);addTo.getBoundingClientRect=proxy.getBoundingClientRect.bind(proxy);addTo.addEventListener=proxy.addEventListener.bind(proxy);addTo.removeEventListener=proxy.removeEventListener.bind(proxy);addTo.handleEvent=proxy.handleEvent.bind(proxy);addTo.dispatchEvent=proxy.dispatchEvent.bind(proxy);addTo.focus=proxy.focus.bind(proxy)}};this.getProxy=id=>{return this.targets[id]};this.handleEvent=(data,id)=>{if(!this.targets[id])this.makeProxy(id);if(this.targets[id]){this.targets[id].handleEvent(data);return true}return void 0};if(!globalThis.document)globalThis.document={}}};function makeProxy(id,elm){if(this.graph){if(!this.graph.ProxyManager)this.graph.ProxyManager=new ProxyManager;this.graph.ProxyManager.makeProxy(id,elm)}else{if(!globalThis.ProxyManager)globalThis.ProxyManager=new ProxyManager;globalThis.ProxyManager.makeProxy(id,elm)}return id}function handleProxyEvent(data,id){if(this.graph){if(!this.graph.ProxyManager)this.graph.ProxyManager=new ProxyManager;if(this.graph.ProxyManager.handleEvent(data,id))return data}else{if(!globalThis.ProxyManager)globalThis.ProxyManager=new ProxyManager;if(globalThis.ProxyManager.handleEvent(data,id))return data}}var proxyElementWorkerRoutes={initProxyElement,makeProxy,handleProxyEvent};function Renderer(options){if(options.worker){let worker=options.worker;let route=options.route;if(worker instanceof Blob||typeof worker==="string"){worker=new Worker(worker)}delete options.worker;delete options.route;return transferCanvas(worker,options,route)}else return setupCanvas(options)}function transferCanvas(worker,options,route){if(!options)return void 0;if(!options._id)options._id=`canvas${Math.floor(Math.random()*1e15)}`;let offscreen=options.canvas.transferControlToOffscreen();if(!options.width)options.width=options.canvas.clientWidth;if(!options.height)options.height=options.canvas.clientHeight;let message={route:route?route:"setupCanvas",args:{...options,canvas:offscreen}};if(this.graph)this.graph.run("initProxyElement",options.canvas,worker,options._id);else initProxyElement(options.canvas,worker,options._id);if(options.draw){if(typeof options.draw==="function")message.args.draw=options.draw.toString();else message.args.draw=options.draw}if(options.update){if(typeof options.update==="function")message.args.update=options.update.toString();else message.args.update=options.update}if(options.init){if(typeof options.init==="function")message.args.init=options.init.toString();else message.args.init=options.init}if(options.clear){if(typeof options.clear==="function")message.args.clear=options.clear.toString();else message.args.clear=options.clear}let transfer=[offscreen];if(options.transfer){transfer.push(...options.transfer);delete options.transfer}worker.postMessage(message,transfer);const canvascontrols={_id:options._id,width:options.width,height:options.height,worker,draw:props=>{worker.postMessage({route:"drawFrame",args:[props,options._id]})},update:props=>{worker.postMessage({route:"updateCanvas",args:[props,options._id]})},clear:()=>{worker.postMessage({route:"clearCanvas",args:options._id})},init:()=>{worker.postMessage({route:"initCanvas",args:options._id})},stop:()=>{worker.postMessage({route:"stopAnim",args:options._id})},start:()=>{worker.postMessage({route:"startAnim",args:options._id})},set:newDrawProps=>{worker.postMessage({route:"setDraw",args:[newDrawProps,options._id]})},terminate:()=>{worker.terminate()}};return canvascontrols}function setDraw(settings,_id){let canvasopts;if(this.graph){if(_id)canvasopts=this.graph.CANVASES?.[settings._id];else if(settings._id)canvasopts=this.graph.CANVASES?.[settings._id];else canvasopts=this.graph.CANVASES?.[Object.keys(this.graph.CANVASES)[0]]}else{if(_id)canvasopts=globalThis.CANVASES?.[settings._id];else if(settings._id)canvasopts=globalThis.CANVASES?.[settings._id];else canvasopts=globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]]}if(canvasopts){if(settings.canvas){canvasopts.canvas=settings.canvas;if(this.graph)this.graph.run("makeProxy",canvasopts._id,canvasopts.canvas);else proxyElementWorkerRoutes.makeProxy(canvasopts._id,canvasopts.canvas)}if(typeof settings.context==="string")canvasopts.context=canvasopts.canvas.getContext(settings.context);else if(settings.context)canvasopts.context=settings.context;if(settings.width)canvasopts.canvas.width=settings.width;if(settings.height)canvasopts.canvas.height=settings.height;if(typeof settings.draw==="string")settings.draw=parseFunctionFromText(settings.draw);if(typeof settings.draw==="function"){canvasopts.draw=settings.draw}if(typeof settings.update==="string")settings.update=parseFunctionFromText(settings.update);if(typeof settings.update==="function"){canvasopts.update=settings.update}if(typeof settings.init==="string")settings.init=parseFunctionFromText(settings.init);if(typeof settings.init==="function"){canvasopts.init=settings.init}if(typeof settings.clear==="string")settings.clear=parseFunctionFromText(settings.clear);if(typeof settings.clear==="function"){canvasopts.clear=settings.clear}return settings._id}return void 0}function setupCanvas(options){if(this.graph){if(!this.graph.CANVASES)this.graph.CANVASES={}}else if(!globalThis.CANVASES)globalThis.CANVASES={};let canvasOptions=options;options._id?canvasOptions._id=options._id:canvasOptions._id=`canvas${Math.floor(Math.random()*1e15)}`;typeof options.context==="string"?canvasOptions.context=options.canvas.getContext(options.context):canvasOptions.context=options.context;"animating"in options?canvasOptions.animating=options.animating:canvasOptions.animating=true;if(this.graph?.CANVASES[canvasOptions._id]){this.graph.run("setDraw",canvasOptions)}else if(globalThis.CANVASES?.[canvasOptions._id]){setDraw(canvasOptions)}else{canvasOptions.graph=this.graph;if(this.graph)this.graph.CANVASES[canvasOptions._id]=canvasOptions;else globalThis.CANVASES[canvasOptions._id]=canvasOptions;if(this.graph)this.graph.run("makeProxy",canvasOptions._id,canvasOptions.canvas);else proxyElementWorkerRoutes.makeProxy(canvasOptions._id,canvasOptions.canvas);if(options.width)canvasOptions.canvas.width=options.width;if(options.height)canvasOptions.canvas.height=options.height;if(typeof canvasOptions.draw==="string"){canvasOptions.draw=parseFunctionFromText(canvasOptions.draw)}else if(typeof canvasOptions.draw==="function"){canvasOptions.draw=canvasOptions.draw}if(typeof canvasOptions.update==="string"){canvasOptions.update=parseFunctionFromText(canvasOptions.update)}else if(typeof canvasOptions.update==="function"){canvasOptions.update=canvasOptions.update}if(typeof canvasOptions.init==="string"){canvasOptions.init=parseFunctionFromText(canvasOptions.init)}else if(typeof canvasOptions.init==="function"){canvasOptions.init=canvasOptions.init}if(typeof canvasOptions.clear==="string"){canvasOptions.clear=parseFunctionFromText(canvasOptions.clear)}else if(typeof canvasOptions.clear==="function"){canvasOptions.clear=canvasOptions.clear}if(typeof canvasOptions.init==="function")canvasOptions.init(canvasOptions,canvasOptions.canvas,canvasOptions.context);canvasOptions.stop=()=>{stopAnim(canvasOptions._id)};canvasOptions.start=draw=>{startAnim(canvasOptions._id,draw)};canvasOptions.set=settings=>{setDraw(settings,canvasOptions._id)};if(typeof canvasOptions.draw==="function"&&canvasOptions.animating){let draw=(s,canvas,context)=>{if(s.animating){s.draw(s,canvas,context);requestAnimationFrame(()=>{draw(s,canvas,context)})}};draw(canvasOptions,canvasOptions.canvas,canvasOptions.context)}}if(typeof WorkerGlobalScope!=="undefined"&&self instanceof WorkerGlobalScope)return canvasOptions._id;else{const canvascontrols={_id:options._id,width:options.width,height:options.height,draw:props=>{drawFrame(props,options._id)},update:props=>{updateCanvas(props,options._id)},clear:()=>{clearCanvas(options._id)},init:()=>{initCanvas(options._id)},stop:()=>{stopAnim(options._id)},start:()=>{startAnim(options._id)},set:newDrawProps=>{setDraw(newDrawProps,options._id)},terminate:()=>{stopAnim(options._id)}};return canvascontrols}}function drawFrame(props,_id){let canvasopts;if(this.graph){if(!_id)canvasopts=this.graph.CANVASES?.[Object.keys(this.graph.CANVASES)[0]];else canvasopts=this.graph.CANVASES?.[_id]}else{if(!_id)canvasopts=globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];else canvasopts=globalThis.CANVASES?.[_id]}if(canvasopts){if(props)Object.assign(canvasopts,props);if(canvasopts.draw){canvasopts.draw(canvasopts,canvasopts.canvas,canvasopts.context);return _id}}return void 0}function clearCanvas(_id){let canvasopts;if(this.graph){if(!_id)canvasopts=this.graph.CANVASES?.[Object.keys(this.graph.CANVASES)[0]];else canvasopts=this.graph.CANVASES?.[_id]}else{if(!_id)canvasopts=globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];else canvasopts=globalThis.CANVASES?.[_id]}if(canvasopts?.clear){canvasopts.clear(canvasopts,canvasopts.canvas,canvasopts.context);return _id}return void 0}function initCanvas(_id){let canvasopts;if(this.graph){if(!_id)canvasopts=this.graph.CANVASES?.[Object.keys(this.graph.CANVASES)[0]];else canvasopts=this.graph.CANVASES?.[_id]}else{if(!_id)canvasopts=globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];else canvasopts=globalThis.CANVASES?.[_id]}if(canvasopts?.init){canvasopts.init(canvasopts,canvasopts.canvas,canvasopts.context);return _id}return void 0}function updateCanvas(input,_id){let canvasopts;if(this.graph){if(!_id)canvasopts=this.graph.CANVASES?.[Object.keys(this.graph.CANVASES)[0]];else canvasopts=this.graph.CANVASES?.[_id]}else{if(!_id)canvasopts=globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];else canvasopts=globalThis.CANVASES?.[_id]}if(canvasopts?.update){canvasopts.update(canvasopts,canvasopts.canvas,canvasopts.context,input);return _id}return void 0}function setProps(props,_id){let canvasopts;if(this.graph){if(!_id)canvasopts=this.graph.CANVASES?.[Object.keys(this.graph.CANVASES)[0]];else canvasopts=this.graph.CANVASES?.[_id]}else{if(!_id)canvasopts=globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];else canvasopts=globalThis.CANVASES?.[_id]}if(canvasopts){Object.assign(canvasopts,props);if(props.width)canvasopts.canvas.width=props.width;if(props.height)canvasopts.canvas.height=props.height;return _id}return void 0}function startAnim(_id,draw){let canvasopts;if(this.graph){if(!_id)canvasopts=this.graph.CANVASES?.[Object.keys(this.graph.CANVASES)[0]];else canvasopts=this.graph.CANVASES?.[_id]}else{if(!_id)canvasopts=globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];else canvasopts=globalThis.CANVASES?.[_id]}canvasopts.animating=true;if(canvasopts&&draw){if(typeof draw==="string")draw=parseFunctionFromText(draw);if(typeof draw==="function"){canvasopts.draw=draw}return _id}if(typeof canvasopts?.draw==="function"){let draw2=(s,canvas,context)=>{if(s.animating){s.draw(s,canvas,context);requestAnimationFrame(()=>{draw2(s,canvas,context)})}};if(typeof canvasopts.clear==="function")canvasopts.clear(canvasopts,canvasopts.canvas,canvasopts.context);if(typeof canvasopts.init==="function")canvasopts.init(canvasopts,canvasopts.canvas,canvasopts.context);draw2(canvasopts,canvasopts.canvas,canvasopts.context);return _id}return void 0}function stopAnim(_id){let canvasopts;if(this.graph){if(!_id)canvasopts=this.graph.CANVASES?.[Object.keys(this.graph.CANVASES)[0]];else canvasopts=this.graph.CANVASES?.[_id]}else{if(!_id)canvasopts=globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];else canvasopts=globalThis.CANVASES?.[_id]}if(canvasopts){canvasopts.animating=false;if(typeof canvasopts.clear==="function")canvasopts.clear(canvasopts,canvasopts.canvas,canvasopts.context);return _id}return void 0}var workerCanvasRoutes={...proxyElementWorkerRoutes,Renderer,transferCanvas,setupCanvas,setDraw,drawFrame,clearCanvas,initCanvas,updateCanvas,setProps,startAnim,stopAnim};function parseFunctionFromText(method=""){let getFunctionBody=methodString=>{return methodString.replace(/^\\W*(function[^{]+\\{([\\s\\S]*)\\}|[^=]+=>[^{]*\\{([\\s\\S]*)\\}|[^=]+=>(.+))/i,"$2$3$4")};let getFunctionHead=methodString=>{let startindex=methodString.indexOf("=>")+1;if(startindex<=0){startindex=methodString.indexOf("){")}if(startindex<=0){startindex=methodString.indexOf(") {")}return methodString.slice(0,methodString.indexOf("{",startindex)+1)};let newFuncHead=getFunctionHead(method);let newFuncBody=getFunctionBody(method);let newFunc;if(newFuncHead.includes("function")){let varName=newFuncHead.split("(")[1].split(")")[0];newFunc=new Function(varName,newFuncBody)}else{if(newFuncHead.substring(0,6)===newFuncBody.substring(0,6)){let varName=newFuncHead.split("(")[1].split(")")[0];newFunc=new Function(varName,newFuncBody.substring(newFuncBody.indexOf("{")+1,newFuncBody.length-1))}else{try{newFunc=(0,eval)(newFuncHead+newFuncBody+"}")}catch{}}}return newFunc}var b=class{constructor(e,t,s,h){this.r=e,this.g=t,this.b=s,this.a=h}};var x=class{constructor(){this.scaleX=1,this.scaleY=1,this.offsetX=0,this.offsetY=0,this.loop=false,this._vbuffer=0,this._coord=0,this.visible=true,this.intensity=1,this.xy=new Float32Array([]),this.numPoints=0,this.color=new b(0,0,0,1),this.webglNumPoints=0}};var v=class extends x{constructor(e,t){super(),this.currentIndex=0,this.webglNumPoints=t,this.numPoints=t,this.color=e,this.xy=new Float32Array(2*this.webglNumPoints)}setX(e,t){this.xy[e*2]=t}setY(e,t){this.xy[e*2+1]=t}getX(e){return this.xy[e*2]}getY(e){return this.xy[e*2+1]}lineSpaceX(e,t){for(let s=0;s<this.numPoints;s++)this.setX(s,e+t*s)}arrangeX(){this.lineSpaceX(-1,2/this.numPoints)}constY(e){for(let t=0;t<this.numPoints;t++)this.setY(t,e)}shiftAdd(e){let t=e.length;for(let s=0;s<this.numPoints-t;s++)this.setY(s,this.getY(s+t));for(let s=0;s<t;s++)this.setY(s+this.numPoints-t,e[s])}addArrayY(e){if(this.currentIndex+e.length<=this.numPoints)for(let t=0;t<e.length;t++)this.setY(this.currentIndex,e[t]),this.currentIndex++}replaceArrayY(e){if(e.length==this.numPoints)for(let t=0;t<this.numPoints;t++)this.setY(t,e[t])}};var Y=(f,e,t)=>{let s={x:0,y:0};return s.x=f.x+e.x*t,s.y=f.y+e.y*t,s};var _=f=>P(-f.y,f.x);var w=(f,e)=>{let t=T(f,e);return t=M(t),t};var S=(f,e)=>{let t={x:0,y:0};return t.x=f.x+e.x,t.y=f.y+e.y,t};var R=(f,e)=>f.x*e.x+f.y*e.y;var M=f=>{let e={x:0,y:0},t=f.x*f.x+f.y*f.y;return t>0&&(t=1/Math.sqrt(t),e.x=f.x*t,e.y=f.y*t),e};var P=(f,e)=>{let t={x:0,y:0};return t.x=f,t.y=e,t};var T=(f,e)=>{let t={x:0,y:0};return t.x=f.x-e.x,t.y=f.y-e.y,t};var C=f=>{let e,t={x:0,y:0},s={x:0,y:0},h=[],r=(n,l)=>{h.push({vec2:n,miterLength:l})},a=n=>({x:f[n*2],y:f[n*2+1]});t=w(a(1),a(0)),e=_(t),r(e,1);let o=f.length/2;for(let n=1;n<o-1;n++){let l=a(n-1),i=a(n),u=a(n+1);t=w(i,l),e=_(t),s=w(u,i);let c=F(t,s),g=N(t,c,1);r(c,g)}return t=w(a(o-1),a(o-2)),e=_(t),r(e,1),h};var F=(f,e)=>{let t=S(f,e);return t=M(t),P(-t.y,t.x)};var N=(f,e,t)=>{let s=P(-f.y,f.x);return t/R(e,s)};var d=class extends x{constructor(e,t,s){super(),this.currentIndex=0,this._thicknessRequested=0,this._actualThickness=0,this.webglNumPoints=t*2,this.numPoints=t,this.color=e,this._thicknessRequested=s,this._linePoints=new Float32Array(t*2),this.xy=new Float32Array(2*this.webglNumPoints)}convertToTriPoints(){let e=this._actualThickness/2,t=C(this._linePoints);for(let s=0;s<this.numPoints;s++){let h=this._linePoints[2*s],r=this._linePoints[2*s+1],a={x:h,y:r},o=Y(a,t[s].vec2,t[s].miterLength*e),n=Y(a,t[s].vec2,-t[s].miterLength*e);this.xy[s*4]=o.x,this.xy[s*4+1]=o.y,this.xy[s*4+2]=n.x,this.xy[s*4+3]=n.y}}setX(e,t){this._linePoints[e*2]=t}setY(e,t){this._linePoints[e*2+1]=t}lineSpaceX(e,t){for(let s=0;s<this.numPoints;s++)this.setX(s,e+t*s)}setThickness(e){this._thicknessRequested=e}getThickness(){return this._thicknessRequested}setActualThickness(e){this._actualThickness=e}};var A=class{constructor(e,t){this.debug=false,this.addLine=this.addDataLine,t==null?this.webgl=e.getContext("webgl",{antialias:true,transparent:false}):(this.webgl=e.getContext("webgl",{antialias:t.antialias,transparent:t.transparent,desynchronized:t.deSync,powerPerformance:t.powerPerformance,preserveDrawing:t.preserveDrawing}),this.debug=t.debug==null?false:t.debug),this.log("canvas type is: "+e.constructor.name),this.log(`[webgl-plot]:width=${e.width}, height=${e.height}`),this._linesData=[],this._linesAux=[],this._thickLines=[],this._surfaces=[],this.gScaleX=1,this.gScaleY=1,this.gXYratio=1,this.gOffsetX=0,this.gOffsetY=0,this.gLog10X=false,this.gLog10Y=false,this.webgl.clear(this.webgl.COLOR_BUFFER_BIT),this.webgl.viewport(0,0,e.width,e.height),this._progLine=this.webgl.createProgram(),this.initThinLineProgram(),this.webgl.enable(this.webgl.BLEND),this.webgl.blendFunc(this.webgl.SRC_ALPHA,this.webgl.ONE_MINUS_SRC_ALPHA)}get linesData(){return this._linesData}get linesAux(){return this._linesAux}get thickLines(){return this._thickLines}get surfaces(){return this._surfaces}_drawLines(e){let t=this.webgl;e.forEach(s=>{if(s.visible){t.useProgram(this._progLine);let h=t.getUniformLocation(this._progLine,"uscale");t.uniformMatrix2fv(h,false,new Float32Array([s.scaleX*this.gScaleX*(this.gLog10X?1/Math.log(10):1),0,0,s.scaleY*this.gScaleY*this.gXYratio*(this.gLog10Y?1/Math.log(10):1)]));let r=t.getUniformLocation(this._progLine,"uoffset");t.uniform2fv(r,new Float32Array([s.offsetX+this.gOffsetX,s.offsetY+this.gOffsetY]));let a=t.getUniformLocation(this._progLine,"is_log");t.uniform2iv(a,new Int32Array([this.gLog10X?1:0,this.gLog10Y?1:0]));let o=t.getUniformLocation(this._progLine,"uColor");t.uniform4fv(o,[s.color.r,s.color.g,s.color.b,s.color.a]),t.bufferData(t.ARRAY_BUFFER,s.xy,t.STREAM_DRAW),t.drawArrays(s.loop?t.LINE_LOOP:t.LINE_STRIP,0,s.webglNumPoints)}})}_drawSurfaces(e){let t=this.webgl;e.forEach(s=>{if(s.visible){t.useProgram(this._progLine);let h=t.getUniformLocation(this._progLine,"uscale");t.uniformMatrix2fv(h,false,new Float32Array([s.scaleX*this.gScaleX*(this.gLog10X?1/Math.log(10):1),0,0,s.scaleY*this.gScaleY*this.gXYratio*(this.gLog10Y?1/Math.log(10):1)]));let r=t.getUniformLocation(this._progLine,"uoffset");t.uniform2fv(r,new Float32Array([s.offsetX+this.gOffsetX,s.offsetY+this.gOffsetY]));let a=t.getUniformLocation(this._progLine,"is_log");t.uniform2iv(a,new Int32Array([this.gLog10X?1:0,this.gLog10Y?1:0]));let o=t.getUniformLocation(this._progLine,"uColor");t.uniform4fv(o,[s.color.r,s.color.g,s.color.b,s.color.a]),t.bufferData(t.ARRAY_BUFFER,s.xy,t.STREAM_DRAW),t.drawArrays(t.TRIANGLE_STRIP,0,s.webglNumPoints)}})}_drawTriangles(e){let t=this.webgl;t.bufferData(t.ARRAY_BUFFER,e.xy,t.STREAM_DRAW),t.useProgram(this._progLine);let s=t.getUniformLocation(this._progLine,"uscale");t.uniformMatrix2fv(s,false,new Float32Array([e.scaleX*this.gScaleX*(this.gLog10X?1/Math.log(10):1),0,0,e.scaleY*this.gScaleY*this.gXYratio*(this.gLog10Y?1/Math.log(10):1)]));let h=t.getUniformLocation(this._progLine,"uoffset");t.uniform2fv(h,new Float32Array([e.offsetX+this.gOffsetX,e.offsetY+this.gOffsetY]));let r=t.getUniformLocation(this._progLine,"is_log");t.uniform2iv(r,new Int32Array([0,0]));let a=t.getUniformLocation(this._progLine,"uColor");t.uniform4fv(a,[e.color.r,e.color.g,e.color.b,e.color.a]),t.drawArrays(t.TRIANGLE_STRIP,0,e.xy.length/2)}_drawThickLines(){this._thickLines.forEach(e=>{if(e.visible){let t=Math.min(this.gScaleX,this.gScaleY);e.setActualThickness(e.getThickness()/t),e.convertToTriPoints(),this._drawTriangles(e)}})}update(){this.clear(),this.draw()}draw(){this._drawLines(this.linesData),this._drawLines(this.linesAux),this._drawThickLines(),this._drawSurfaces(this.surfaces)}clear(){this.webgl.clear(this.webgl.COLOR_BUFFER_BIT)}_addLine(e){e._vbuffer=this.webgl.createBuffer(),this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER,e._vbuffer),this.webgl.bufferData(this.webgl.ARRAY_BUFFER,e.xy,this.webgl.STREAM_DRAW),e._coord=this.webgl.getAttribLocation(this._progLine,"coordinates"),this.webgl.vertexAttribPointer(e._coord,2,this.webgl.FLOAT,false,0,0),this.webgl.enableVertexAttribArray(e._coord)}addDataLine(e){this._addLine(e),this.linesData.push(e)}addAuxLine(e){this._addLine(e),this.linesAux.push(e)}addThickLine(e){this._addLine(e),this._thickLines.push(e)}addSurface(e){this._addLine(e),this.surfaces.push(e)}initThinLineProgram(){let e=`\n      attribute vec2 coordinates;\n      uniform mat2 uscale;\n      uniform vec2 uoffset;\n      uniform ivec2 is_log;\n\n      void main(void) {\n         float x = (is_log[0]==1) ? log(coordinates.x) : coordinates.x;\n         float y = (is_log[1]==1) ? log(coordinates.y) : coordinates.y;\n         vec2 line = vec2(x, y);\n         gl_Position = vec4(uscale*line + uoffset, 0.0, 1.0);\n      }`,t=this.webgl.createShader(this.webgl.VERTEX_SHADER);this.webgl.shaderSource(t,e),this.webgl.compileShader(t);let s=`\n         precision mediump float;\n         uniform highp vec4 uColor;\n         void main(void) {\n            gl_FragColor =  uColor;\n         }`,h=this.webgl.createShader(this.webgl.FRAGMENT_SHADER);this.webgl.shaderSource(h,s),this.webgl.compileShader(h),this._progLine=this.webgl.createProgram(),this.webgl.attachShader(this._progLine,t),this.webgl.attachShader(this._progLine,h),this.webgl.linkProgram(this._progLine)}popDataLine(){this.linesData.pop()}removeAllLines(){this._linesData=[],this._linesAux=[],this._thickLines=[],this._surfaces=[]}removeDataLines(){this._linesData=[]}removeAuxLines(){this._linesAux=[]}viewport(e,t,s,h){this.webgl.viewport(e,t,s,h)}log(e){this.debug&&console.log("[webgl-plot]:"+e)}};var y=class{constructor(){this.plots={}}initPlot(e,t){if(t||(t=new A(e.canvas,e.webglOptions)),!e._id)e._id=`plot${Math.floor(Math.random()*1e15)}`;else if(this.plots[e._id]){let l=this.plots[e._id].initial;if(e.lines){for(let i in e.lines)if(l.lines[i]&&Array.isArray(e.lines[i])){let u=e.lines[i];e.lines[i]=l.lines[i]}}e=Object.assign(l,e)}e.overlay&&(typeof e.overlay!="object"&&(e.overlay=document.createElement("canvas"),e.overlay.style.position="absolute",e.overlay.width=e.canvas.width,e.overlay.height=e.canvas.height,e.canvas.appendChild(e.overlay)),e.overlayCtx||(e.overlayCtx=e.overlay.getContext("2d"))),e.width&&(e.canvas.width=e.width,e.canvas.style&&(e.canvas.style.width=e.width+"px"),typeof e.overlay=="object"&&(e.overlay.width=e.width,e.overlay.style&&(e.overlay.style.width=e.width+"px"))),e.height&&(e.canvas.height=e.height,e.canvas.style&&(e.canvas.style.height=e.height+"px"),typeof e.overlay=="object"&&(e.overlay.height=e.height,e.overlay.style&&(e.overlay.style.height=e.height+"px"))),e.lines?.timestamp&&delete e.lines.timestamp,e.lines||(e.lines={});let s={};for(let l in e.lines)s[l]=Object.assign({},s[l]),"viewing"in e.lines[l]||(e.lines[l].viewing=true),s[l].viewing=e.lines[l].viewing,s[l].sps=e.lines[l].sps,s[l].nSec=e.lines[l].nSec,s[l].nPoints=e.lines[l].nPoints,s[l].ymin=e.lines[l].ymin,s[l].ymax=e.lines[l].ymax,s[l].units=e.lines[l].units;let h={plot:t,settings:e,initial:Object.assign(Object.assign({},e),{lines:s}),anim:()=>{t.update()}};this.plots[e._id]=h;let r=0,a=0;Object.keys(e.lines).forEach(l=>{e.lines[l]?.viewing!==false&&a++}),e.nLines=a;let o,n;typeof e.overlay=="object"&&(o=e.overlay,n=e.overlayCtx,n.clearRect(0,0,e.overlay.width,e.overlay.height),n.font=e.overlayFont?e.overlayFont:"1em Courier",n.fillStyle=e.overlayColor?e.overlayColor:"white");for(let l in e.lines){let i=e.lines[l];if(Array.isArray(i)&&(i={values:i},e.lines[l]=i),"viewing"in i||(i.viewing=true),i.color)Array.isArray(i.color)&&(i.color=new b(...i.color));else{let m=y.HSLToRGB(360*(r/a)%360,100,50,1);h.initial.lines[l].color=[...m,1],i.color=new b(...m,1)}let u;if(i.nSec&&i.sps?u=Math.ceil(i.nSec*i.sps):i.nPoints?u=i.nPoints:i.points?u=i.points:e.linePoints?u=e.linePoints:i.values?u=i.values.length:u=1e3,i.points=u,e.lines[l].viewing===false)continue;if((i.width||e.lineWidth)&&i.width!==0){let m=e.lineWidth;m||(m=i.width),i.width?i.line=new d(i.color,u,i.width):e.lineWidth&&(i.line=new d(i.color,u,e.lineWidth)),i.line.lineSpaceX(-1,2/i.line.numPoints)}else i.line=new v(i.color,u),i.line.arrangeX();i.values?.length===i.points?i.values.length!==u&&(i.interpolate?i.values.length>u?i.values=y.downsample(i.values,u):i.values.length<u&&(i.values=y.upsample(i.values,u)):i.values.length>i.points?i.values=i.values.slice(i.values.length-i.points):i.values=[...new Array(i.points-i.values.length).fill(0),...i.values]):Array.isArray(i.values)?i.values.length>u?i.values=i.values.slice(i.values.length-u):i.values.length<u&&(i.values=[...new Array(u-i.values.length).fill(0),...i.values]):i.values=new Array(i.points).fill(0);let c=i.ymin,g=i.ymax;if(c===g?(g=i.values.length<=1e5?Math.max(...i.values):1,c=i.values.length<=1e5?Math.min(...i.values):0):isNaN(g)&&(g=i.values.length<=1e5?Math.max(...i.values):1),isNaN(c)&&(c=i.values.length<=1e5?Math.min(...i.values):0),c>g){let m=c;g=c,c=m}let p=Math.abs(c);if(i.absmax=p>g?p:g,"autoscale"in i||(i.autoscale=true),i.position||(i.position=e.nLines-r-1),i.autoscale?i.autoscale===2?("clamp"in i||(i.clamp=true),i.scaled=y.autoscale(i.values,i.position,a,i.centerZero,c,g,i.clamp)):(i.scaled=i.values,i.line.scaleY=y.getYScalar(i.values,a,i.centerZero,c,g),i.line.offsetY=y.getYOffset(i.position,a,c,i.line.scaleY)):i.scaled=i.values,i.scaled.forEach((m,L)=>i.line.setY(L,m)),i.line instanceof d?t.addThickLine(i.line):i.line instanceof v&&t.addDataLine(i.line),"xAxis"in i||(i.xAxis=true),i.xAxis){i.xColor?Array.isArray(i.xColor)&&(i.xColor=new b(...i.xColor)):i.xColor=new b(1,1,1,.3);let m=new v(i.xColor,2),L=i.autoscale?(r+1)*2/a-1-1/a:0;m.constY(L),m.arrangeX(),m.xy[2]=1,i.x=m,t.addAuxLine(m)}if(a>1&&i.autoscale&&r!==a-1){e.dividerColor?Array.isArray(e.dividerColor)&&(e.dividerColor=new b(...e.dividerColor)):e.dividerColor=new b(1,1,1,1);let m=new v(e.dividerColor,2);m.constY(i.autoscale?(r+1)*2/a-1:1),m.arrangeX(),m.xy[2]=1,i.divider=m,t.addAuxLine(m)}if(typeof e.overlay=="object"&&(i.useOverlay||!("useOverlay"in i))){let m=e.nLines-i.position-1;n.fillText(l,20,o.height*(m+.2)/e.nLines),n.fillText(`${Math.floor(g)===g?g:g?.toFixed(5)} ${i.units?i.units:""}`,o.width-100,o.height*(m+.2)/e.nLines),n.fillText(`${Math.floor(c)===c?c:c?.toFixed(5)} ${i.units?i.units:""}`,o.width-100,o.height*(m+.9)/e.nLines)}r++}return requestAnimationFrame(h.anim),this.plots[e._id]}deinitPlot(e){return typeof e=="string"&&(e=this.plots[e]),e.plot.clear(),e.plot.removeAllLines(),true}reinitPlot(e,t){if(typeof e=="string"){let s=e;e=this.plots[e],t._id||(t._id=s)}if(!!e.plot)return e.plot.clear(),e.plot.removeAllLines(),e.settings.overlayCtx&&e.settings.overlayCtx.clearRect(0,0,e.settings.overlay?.width,e.settings.overlay?.height),this.initPlot(t,e.plot)}getChartSettings(e,t){let s=this.plots[e];if(s){let h=Object.assign({},s.initial);for(let r in s.initial.lines)typeof s.initial.lines[r]?.ymax!="number"&&(h.lines[r].ymax=s.settings.lines[r]?.ymax),typeof s.initial.lines[r]?.ymin!="number"&&(h.lines[r].ymin=s.settings.lines[r]?.ymin),t&&(h.lines[r].values=s.settings.lines[r].values);return delete h.canvas,delete h.overlay,delete h.overlayCtx,h}}update(e,t,s=true){if(typeof e=="string"&&(e=this.plots[e]),!e)return false;if(t){let h=false,r,a;typeof e.settings.overlay=="object"&&(r=e.settings.overlay,a=e.settings.overlayCtx,a.font=e.settings.overlayFont?e.settings.overlayFont:"1em Courier",a.fillStyle=e.settings.overlayColor?e.settings.overlayColor:"white");for(let o in t)if(e.settings.lines[o]&&e.settings.lines[o].line){if(e.settings.lines[o]?.viewing===false)continue;let n=e.settings.lines[o];if(Array.isArray(t[o])&&n.values.length<1e5?(n.values.length===0&&(n.values.length=n.points?n.points:1e3),t[o].length===n.values.length?n.values=t[o]:y.circularBuffer(n.values,t[o])):typeof t[o]=="number"?(n.values.push(t[o]),n.values.shift()):t[o]?.values&&(n.values.length===0&&(n.values.length=n.points?n.points:1e3),t[o].values.length===n.values.length?n.values=t[o].values:y.circularBuffer(n.values,t[o].values)),n.values){n.values.length!==n.points&&(n.interpolate?n.values.length>n.points?n.values=y.downsample(n.values,n.points):n.scaled.length<n.points&&(n.values=y.upsample(n.values,n.points)):n.values.length>n.points?n.values.splice(0,n.values.length-n.points):n.values=new Array(n.points).fill(0).splice(n.points-n.values.length,0,n.values));let l=n.ymin,i=n.ymax;if(l===i?(i=n.values.length<=1e5?Math.max(...n.values):1,l=n.values.length<=1e5?Math.min(...n.values):0):isNaN(i)&&(i=n.values.length<=1e5?Math.max(...n.values):1),isNaN(l)&&(l=n.values.length<=1e5?Math.min(...n.values):0),l>i){let c=l;i=l,l=c}let u=Math.abs(l);if(n.absmax=u>i?u:i,n.autoscale?n.autoscale===2?n.scaled=y.autoscale(n.values,n.position,e.settings.nLines,n.centerZero,l,i,n.clamp):(n.scaled=n.values,n.line.scaleY=y.getYScalar(n.values,e.settings.nLines,n.centerZero,l,i),n.line.offsetY=y.getYOffset(n.position,e.settings.nLines,l,n.line.scaleY)):n.scaled=n.values,n.scaled.forEach((c,g)=>{!n.autoscale&&n.absmax>1?n.line.setY(g,c/n.absmax):n.line.setY(g,c)}),typeof e.settings.overlay=="object"&&(n.useOverlay||!("useOverlay"in n))){let c=e.settings.nLines-n.position-1;a.clearRect(0,r.height*c/e.settings.nLines,r.width,r.height/e.settings.nLines),a.fillText(o,20,r.height*(c+.2)/e.settings.nLines),a.fillText(`${Math.floor(i)===i?i:i?.toFixed(5)} ${n.units?n.units:""}`,r.width-100,r.height*(c+.2)/e.settings.nLines),a.fillText(`${Math.floor(l)===l?l:l?.toFixed(5)} ${n.units?n.units:""}`,r.width-100,r.height*(c+.9)/e.settings.nLines)}}}else e.settings.generateNewLines&&!o.includes("timestamp")&&(Array.isArray(t[o])&&(t[o]={values:t[o]}),!t[o].nSec&&!t[o].nPoints&&!e.settings.linePoints&&(t[o].nPoints=1e3),h=true);if(h)return e.settings.cleanGeneration||Object.keys(e.initial.lines).forEach(o=>{t[o]?t[o]=Object.assign(e.initial.lines[o],t[o]):t[o]=e.initial.lines[o]}),this.reinitPlot(e,{_id:e.settings._id,lines:t}),true}return s&&requestAnimationFrame(e.anim),true}updateLine(e,t,s,h,r,a,o){return e.numPoints!==t.length&&(s?e.numPoints>t.length?t=y.downsample(t,e.numPoints):e.numPoints<t.length&&(t=y.upsample(t,e.numPoints)):t.length>e.numPoints?t=t.slice(t.length-e.numPoints):t=[...new Array(t.length).fill(0),...t]),h&&(t=y.autoscale(t,r,a,o)),t.forEach((n,l)=>e.setY(l,n)),true}static autoscale(e,t=0,s=1,h=false,r,a,o){if(e?.length===0)return e;let n=typeof a=="number"?a:e.length<=1e5?Math.max(...e):1,l=typeof r=="number"?r:e.length<=1e5?Math.min(...e):0,i=1/s,u=1;if(h){let c=Math.max(Math.abs(l),Math.abs(n));return c!==0&&(u=i/c),e.map(g=>(o&&(g<l&&(g=l),g>n&&(g=n)),g*u+(i*(t+1)*2-1-i)))}else return n===l?n!==0?u=i/n:l!==0&&(u=i/Math.abs(l)):u=i/(n-l),e.map(c=>(o&&(c<l&&(c=l),c>n&&(c=n)),2*((c-l)*u-1/(2*s))+(i*(t+1)*2-1-i)))}static getYScalar(e,t=1,s=false,h,r){if(e?.length===0)return e;let a=typeof r=="number"?r:e.length<=1e5?Math.max(...e):1,o=typeof h=="number"?h:e.length<=1e5?Math.min(...e):0,n=1/t,l=1;if(s){let i=Math.max(Math.abs(o),Math.abs(a));return i!==0&&(l=n/i),2*l}else return a===o?a!==0?l=n/a:o!==0&&(l=n/Math.abs(o)):l=n/(a-o),2*l}static getYOffset(e=0,t=1,s=0,h=1){let r=1/t,a=r*(e+1)*2-1-r;return s>0&&(a-=s*h+1/t),a}static absmax(e){return Math.max(Math.abs(Math.min(...e)),Math.max(...e))}static downsample(e,t,s=1){if(e.length>t){let h=new Array(t),r=e.length/t,a=e.length-1,o=0,n=0;for(let l=r;l<e.length;l+=r){let i=Math.round(l);i>a&&(i=a);for(let u=o;u<i;u++)h[n]+=e[u];h[n]/=(i-o)*s,n++,o=i}return h}else return e}static upsample(e,t,s=1){var h=function(c,g,p){return(c+(g-c)*p)*s},r=new Array(t),a=(e.length-1)/(t-1);r[0]=e[0];for(var o=1;o<t-1;o++){var n=o*a,l=Math.floor(n),i=Math.ceil(n),u=n-l;r[o]=h(e[l],e[i],u)}return r[t-1]=e[e.length-1],r}static interpolate(e,t,s=1){return e.length>t?y.downsample(e,t,s):e.length<t?y.upsample(e,t,s):e}static HSLToRGB(e,t,s,h=255){t/=100,s/=100;let r=(1-Math.abs(2*s-1))*t,a=r*(1-Math.abs(e/60%2-1)),o=s-r/2,n=0,l=0,i=0;return 0<=e&&e<60?(n=r,l=a,i=0):60<=e&&e<120?(n=a,l=r,i=0):120<=e&&e<180?(n=0,l=r,i=a):180<=e&&e<240?(n=0,l=a,i=r):240<=e&&e<300?(n=a,l=0,i=r):300<=e&&e<360&&(n=r,l=0,i=a),n=(n+o)*h,l=(l+o)*h,i=(i+o)*h,[n,l,i]}static circularBuffer(e,t){if(t.length<e.length){let s=e.slice(t.length),h=e.length;e.splice(0,h,...s,...t)}else if(t.length>e.length){let s=e.length;e.splice(0,s,...t.slice(t.length-s))}else e.splice(0,e.length,...t);return e}static formatDataForCharts(e,t){if(Array.isArray(e)){if(Array.isArray(e[0])){let s={};if(e.forEach((h,r)=>{s[r]=h}),e=s,isNaN(e[0][0]))return}else if(t){if(e={[t]:e},isNaN(e[t][0]))return}else if(e={0:e},isNaN(e[0][0]))return}else if(typeof e=="object"){for(let s in e)if(typeof e[s]=="number"?e[s]=[e[s]]:e[s]?.values&&typeof e[s].values=="number"&&(e[s].values=[e[s].values]),isNaN(e[s][0]))return}else if(typeof e=="string"){let s;if(e.includes(`\\r\n`)){let h=e.split(`\\r\n`);e={},h.forEach((r,a)=>{r.includes("	")?s=r.split("	"):r.includes(",")?s=r.split(","):r.includes("|")&&(s=r.split("|")),s&&s.forEach((o,n)=>{if(o.includes(":")){let[l,i]=o.split(":"),u=parseFloat(i);isNaN(u)||(e[l]=[u])}else{let l=parseFloat(o);isNaN(l)||(e[n]=[l])}})})}else e.includes("	")?s=e.split("	"):e.includes(",")?s=e.split(","):e.includes("|")&&(s=e.split("|"));e={},s&&s.forEach((h,r)=>{if(h.includes(":")){let[a,o]=h.split(":"),n=parseFloat(o);isNaN(n)||(e[a]=[n])}else{let a=parseFloat(h);isNaN(a)||(e[r]=[a])}})}else typeof e=="number"&&(t?e={[t]:[e]}:e={0:[e]});return e}static padTime(e,t,s,h){let r=(e[0]-t)/s/h;return[...new Array(h-e.length).map((o,n)=>t+r*(n+1)),...e]}static interpolateForTime(e,t,s){return y.interpolate(e,Math.ceil(s*t))}};if(typeof WorkerGlobalScope!=="undefined"){globalThis.plotter=new y;const routes={...workerCanvasRoutes};self.onmessage=ev=>{if(ev.data.route){if(Array.isArray(ev.data.args)){routes[ev.data.route](...ev.data.args)}else routes[ev.data.route](ev.data.args)}}}var canvas_worker_default=self;})();\n')], { type: "text/javascript" }));
  var canvas_worker_default = url2;

  // node_modules/graphscript/services/worker/ProxyListener.ts
  var mouseEventHandler2 = makeSendPropertiesHandler2([
    "ctrlKey",
    "metaKey",
    "shiftKey",
    "button",
    "pointerType",
    "clientX",
    "clientY",
    "pageX",
    "pageY"
  ]);
  var wheelEventHandlerImpl2 = makeSendPropertiesHandler2([
    "deltaX",
    "deltaY"
  ]);
  var keydownEventHandler2 = makeSendPropertiesHandler2([
    "ctrlKey",
    "metaKey",
    "shiftKey",
    "keyCode"
  ]);
  function wheelEventHandler2(event, sendFn) {
    event.preventDefault();
    wheelEventHandlerImpl2(event, sendFn);
  }
  function preventDefaultHandler2(event) {
    event.preventDefault();
  }
  function copyProperties2(src, properties, dst) {
    for (const name of properties) {
      dst[name] = src[name];
    }
  }
  function makeSendPropertiesHandler2(properties) {
    return function sendProperties(event, sendFn) {
      const data = { type: event.type };
      copyProperties2(event, properties, data);
      sendFn(data);
    };
  }
  function touchEventHandler2(event, sendFn) {
    const touches = [];
    const data = { type: event.type, touches };
    for (let i = 0; i < event.touches.length; ++i) {
      const touch = event.touches[i];
      touches.push({
        pageX: touch.pageX,
        pageY: touch.pageY
      });
    }
    sendFn(data);
  }
  var orbitKeys2 = {
    "37": true,
    "38": true,
    "39": true,
    "40": true
  };
  function filteredKeydownEventHandler2(event, sendFn) {
    const { keyCode } = event;
    if (orbitKeys2[keyCode]) {
      event.preventDefault();
      keydownEventHandler2(event, sendFn);
    }
  }
  var eventHandlers2 = {
    contextmenu: preventDefaultHandler2,
    mousedown: mouseEventHandler2,
    mousemove: mouseEventHandler2,
    mouseup: mouseEventHandler2,
    pointerdown: mouseEventHandler2,
    pointermove: mouseEventHandler2,
    pointerup: mouseEventHandler2,
    touchstart: touchEventHandler2,
    touchmove: touchEventHandler2,
    touchend: touchEventHandler2,
    wheel: wheelEventHandler2,
    keydown: filteredKeydownEventHandler2
  };
  function initProxyElement2(element, worker, id) {
    if (!id)
      id = "proxy" + Math.floor(Math.random() * 1e15);
    const sendEvent = (data) => {
      worker.postMessage({ route: "handleProxyEvent", args: [data, id] });
    };
    let entries = Object.entries(eventHandlers2);
    for (const [eventName, handler] of entries) {
      element.addEventListener(eventName, function(event) {
        handler(event, sendEvent);
      });
    }
    const sendSize = () => {
      const rect = element.getBoundingClientRect();
      sendEvent({
        type: "resize",
        left: rect.left,
        top: rect.top,
        width: element.clientWidth,
        height: element.clientHeight
      });
    };
    sendSize();
    globalThis.addEventListener("resize", sendSize);
    return id;
  }
  var EventDispatcher2 = class {
    addEventListener(type, listener) {
      if (this._listeners === void 0)
        this._listeners = {};
      const listeners = this._listeners;
      if (listeners[type] === void 0) {
        listeners[type] = [];
      }
      if (listeners[type].indexOf(listener) === -1) {
        listeners[type].push(listener);
      }
    }
    hasEventListener(type, listener) {
      if (this._listeners === void 0)
        return false;
      const listeners = this._listeners;
      return listeners[type] !== void 0 && listeners[type].indexOf(listener) !== -1;
    }
    removeEventListener(type, listener) {
      if (this._listeners === void 0)
        return;
      const listeners = this._listeners;
      const listenerArray = listeners[type];
      if (listenerArray !== void 0) {
        const index = listenerArray.indexOf(listener);
        if (index !== -1) {
          listenerArray.splice(index, 1);
        }
      }
    }
    dispatchEvent(event, target) {
      if (this._listeners === void 0)
        return;
      const listeners = this._listeners;
      const listenerArray = listeners[event.type];
      if (listenerArray !== void 0) {
        if (!target)
          event.target = this;
        else
          event.target = target;
        const array = listenerArray.slice(0);
        for (let i = 0, l = array.length; i < l; i++) {
          array[i].call(this, event);
        }
        event.target = null;
      }
    }
  };
  function noop2() {
  }
  var ElementProxyReceiver2 = class extends EventDispatcher2 {
    constructor() {
      super();
      this._listeners = {};
      this.style = {};
      this.setPointerCapture = () => {
      };
      this.releasePointerCapture = () => {
      };
      this.getBoundingClientRect = () => {
        return {
          left: this.left,
          top: this.top,
          width: this.width,
          height: this.height,
          right: this.left + this.width,
          bottom: this.top + this.height
        };
      };
      this.handleEvent = (data) => {
        if (data.type === "resize") {
          this.left = data.left;
          this.top = data.top;
          this.width = data.width;
          this.height = data.height;
          if (typeof this.proxied === "object") {
            this.proxied.style.width = this.width + "px";
            this.proxied.style.height = this.height + "px";
            this.proxied.clientWidth = this.width;
            this.proxied.clientHeight = this.height;
          }
        }
        data.preventDefault = noop2;
        data.stopPropagation = noop2;
        this.dispatchEvent(data, this.proxied);
      };
      this.style = {};
    }
    get clientWidth() {
      return this.width;
    }
    get clientHeight() {
      return this.height;
    }
    focus() {
    }
  };
  var ProxyManager2 = class {
    constructor() {
      this.targets = {};
      this.makeProxy = (id, addTo = void 0) => {
        if (!id)
          id = `proxyReceiver${Math.floor(Math.random() * 1e15)}`;
        let proxy;
        if (this.targets[id])
          proxy = this.targets[id];
        else {
          proxy = new ElementProxyReceiver2();
          this.targets[id] = proxy;
        }
        if (typeof addTo === "object") {
          addTo.proxy = proxy;
          proxy.proxied = addTo;
          if (typeof WorkerGlobalScope !== "undefined")
            addTo.style = proxy.style;
          if (proxy.width) {
            addTo.style.width = proxy.width + "px";
            addTo.clientWidth = proxy.width;
          }
          if (proxy.height) {
            addTo.style.height = proxy.height + "px";
            addTo.clientHeight = proxy.height;
          }
          addTo.setPointerCapture = proxy.setPointerCapture.bind(proxy);
          addTo.releasePointerCapture = proxy.releasePointerCapture.bind(proxy);
          addTo.getBoundingClientRect = proxy.getBoundingClientRect.bind(proxy);
          addTo.addEventListener = proxy.addEventListener.bind(proxy);
          addTo.removeEventListener = proxy.removeEventListener.bind(proxy);
          addTo.handleEvent = proxy.handleEvent.bind(proxy);
          addTo.dispatchEvent = proxy.dispatchEvent.bind(proxy);
          addTo.focus = proxy.focus.bind(proxy);
        }
      };
      this.getProxy = (id) => {
        return this.targets[id];
      };
      this.handleEvent = (data, id) => {
        if (!this.targets[id])
          this.makeProxy(id);
        if (this.targets[id]) {
          this.targets[id].handleEvent(data);
          return true;
        }
        return void 0;
      };
      if (!globalThis.document)
        globalThis.document = {};
    }
  };
  function makeProxy2(id, elm) {
    if (this.graph) {
      if (!this.graph.ProxyManager)
        this.graph.ProxyManager = new ProxyManager2();
      this.graph.ProxyManager.makeProxy(id, elm);
    } else {
      if (!globalThis.ProxyManager)
        globalThis.ProxyManager = new ProxyManager2();
      globalThis.ProxyManager.makeProxy(id, elm);
    }
    return id;
  }
  function handleProxyEvent2(data, id) {
    if (this.graph) {
      if (!this.graph.ProxyManager)
        this.graph.ProxyManager = new ProxyManager2();
      if (this.graph.ProxyManager.handleEvent(data, id))
        return data;
    } else {
      if (!globalThis.ProxyManager)
        globalThis.ProxyManager = new ProxyManager2();
      if (globalThis.ProxyManager.handleEvent(data, id))
        return data;
    }
  }
  var proxyElementWorkerRoutes2 = {
    initProxyElement: initProxyElement2,
    makeProxy: makeProxy2,
    handleProxyEvent: handleProxyEvent2
  };

  // node_modules/graphscript/services/worker/WorkerCanvas.ts
  function Renderer2(options2) {
    if (options2.worker) {
      let worker = options2.worker;
      let route = options2.route;
      if (worker instanceof Blob || typeof worker === "string") {
        worker = new Worker(worker);
      }
      delete options2.worker;
      delete options2.route;
      return transferCanvas2(worker, options2, route);
    } else
      return setupCanvas2(options2);
  }
  function transferCanvas2(worker, options2, route) {
    if (!options2)
      return void 0;
    if (!options2._id)
      options2._id = `canvas${Math.floor(Math.random() * 1e15)}`;
    let offscreen = options2.canvas.transferControlToOffscreen();
    if (!options2.width)
      options2.width = options2.canvas.clientWidth;
    if (!options2.height)
      options2.height = options2.canvas.clientHeight;
    let message = { route: route ? route : "setupCanvas", args: {
      ...options2,
      canvas: offscreen
    } };
    if (this.graph)
      this.graph.run("initProxyElement", options2.canvas, worker, options2._id);
    else
      initProxyElement2(options2.canvas, worker, options2._id);
    if (options2.draw) {
      if (typeof options2.draw === "function")
        message.args.draw = options2.draw.toString();
      else
        message.args.draw = options2.draw;
    }
    if (options2.update) {
      if (typeof options2.update === "function")
        message.args.update = options2.update.toString();
      else
        message.args.update = options2.update;
    }
    if (options2.init) {
      if (typeof options2.init === "function")
        message.args.init = options2.init.toString();
      else
        message.args.init = options2.init;
    }
    if (options2.clear) {
      if (typeof options2.clear === "function")
        message.args.clear = options2.clear.toString();
      else
        message.args.clear = options2.clear;
    }
    let transfer = [offscreen];
    if (options2.transfer) {
      transfer.push(...options2.transfer);
      delete options2.transfer;
    }
    worker.postMessage(message, transfer);
    const canvascontrols = {
      _id: options2._id,
      width: options2.width,
      height: options2.height,
      worker,
      draw: (props) => {
        worker.postMessage({ route: "drawFrame", args: [props, options2._id] });
      },
      update: (props) => {
        worker.postMessage({ route: "updateCanvas", args: [props, options2._id] });
      },
      clear: () => {
        worker.postMessage({ route: "clearCanvas", args: options2._id });
      },
      init: () => {
        worker.postMessage({ route: "initCanvas", args: options2._id });
      },
      stop: () => {
        worker.postMessage({ route: "stopAnim", args: options2._id });
      },
      start: () => {
        worker.postMessage({ route: "startAnim", args: options2._id });
      },
      set: (newDrawProps) => {
        worker.postMessage({ route: "setDraw", args: [newDrawProps, options2._id] });
      },
      terminate: () => {
        worker.terminate();
      }
    };
    return canvascontrols;
  }
  function setDraw2(settings, _id) {
    let canvasopts;
    if (this.graph) {
      if (_id)
        canvasopts = this.graph.CANVASES?.[settings._id];
      else if (settings._id)
        canvasopts = this.graph.CANVASES?.[settings._id];
      else
        canvasopts = this.graph.CANVASES?.[Object.keys(this.graph.CANVASES)[0]];
    } else {
      if (_id)
        canvasopts = globalThis.CANVASES?.[settings._id];
      else if (settings._id)
        canvasopts = globalThis.CANVASES?.[settings._id];
      else
        canvasopts = globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];
    }
    if (canvasopts) {
      if (settings.canvas) {
        canvasopts.canvas = settings.canvas;
        if (this.graph)
          this.graph.run("makeProxy", canvasopts._id, canvasopts.canvas);
        else
          proxyElementWorkerRoutes2.makeProxy(canvasopts._id, canvasopts.canvas);
      }
      if (typeof settings.context === "string")
        canvasopts.context = canvasopts.canvas.getContext(settings.context);
      else if (settings.context)
        canvasopts.context = settings.context;
      if (settings.width)
        canvasopts.canvas.width = settings.width;
      if (settings.height)
        canvasopts.canvas.height = settings.height;
      if (typeof settings.draw === "string")
        settings.draw = parseFunctionFromText2(settings.draw);
      if (typeof settings.draw === "function") {
        canvasopts.draw = settings.draw;
      }
      if (typeof settings.update === "string")
        settings.update = parseFunctionFromText2(settings.update);
      if (typeof settings.update === "function") {
        canvasopts.update = settings.update;
      }
      if (typeof settings.init === "string")
        settings.init = parseFunctionFromText2(settings.init);
      if (typeof settings.init === "function") {
        canvasopts.init = settings.init;
      }
      if (typeof settings.clear === "string")
        settings.clear = parseFunctionFromText2(settings.clear);
      if (typeof settings.clear === "function") {
        canvasopts.clear = settings.clear;
      }
      return settings._id;
    }
    return void 0;
  }
  function setupCanvas2(options2) {
    if (this.graph) {
      if (!this.graph.CANVASES)
        this.graph.CANVASES = {};
    } else if (!globalThis.CANVASES)
      globalThis.CANVASES = {};
    let canvasOptions = options2;
    options2._id ? canvasOptions._id = options2._id : canvasOptions._id = `canvas${Math.floor(Math.random() * 1e15)}`;
    typeof options2.context === "string" ? canvasOptions.context = options2.canvas.getContext(options2.context) : canvasOptions.context = options2.context;
    "animating" in options2 ? canvasOptions.animating = options2.animating : canvasOptions.animating = true;
    if (this.graph?.CANVASES[canvasOptions._id]) {
      this.graph.run("setDraw", canvasOptions);
    } else if (globalThis.CANVASES?.[canvasOptions._id]) {
      setDraw2(canvasOptions);
    } else {
      canvasOptions.graph = this.graph;
      if (this.graph)
        this.graph.CANVASES[canvasOptions._id] = canvasOptions;
      else
        globalThis.CANVASES[canvasOptions._id] = canvasOptions;
      if (this.graph)
        this.graph.run("makeProxy", canvasOptions._id, canvasOptions.canvas);
      else
        proxyElementWorkerRoutes2.makeProxy(canvasOptions._id, canvasOptions.canvas);
      if (options2.width)
        canvasOptions.canvas.width = options2.width;
      if (options2.height)
        canvasOptions.canvas.height = options2.height;
      if (typeof canvasOptions.draw === "string") {
        canvasOptions.draw = parseFunctionFromText2(canvasOptions.draw);
      } else if (typeof canvasOptions.draw === "function") {
        canvasOptions.draw = canvasOptions.draw;
      }
      if (typeof canvasOptions.update === "string") {
        canvasOptions.update = parseFunctionFromText2(canvasOptions.update);
      } else if (typeof canvasOptions.update === "function") {
        canvasOptions.update = canvasOptions.update;
      }
      if (typeof canvasOptions.init === "string") {
        canvasOptions.init = parseFunctionFromText2(canvasOptions.init);
      } else if (typeof canvasOptions.init === "function") {
        canvasOptions.init = canvasOptions.init;
      }
      if (typeof canvasOptions.clear === "string") {
        canvasOptions.clear = parseFunctionFromText2(canvasOptions.clear);
      } else if (typeof canvasOptions.clear === "function") {
        canvasOptions.clear = canvasOptions.clear;
      }
      if (typeof canvasOptions.init === "function")
        canvasOptions.init(canvasOptions, canvasOptions.canvas, canvasOptions.context);
      canvasOptions.stop = () => {
        stopAnim2(canvasOptions._id);
      };
      canvasOptions.start = (draw) => {
        startAnim2(canvasOptions._id, draw);
      };
      canvasOptions.set = (settings) => {
        setDraw2(settings, canvasOptions._id);
      };
      if (typeof canvasOptions.draw === "function" && canvasOptions.animating) {
        let draw = (s, canvas3, context) => {
          if (s.animating) {
            s.draw(s, canvas3, context);
            requestAnimationFrame(() => {
              draw(s, canvas3, context);
            });
          }
        };
        draw(canvasOptions, canvasOptions.canvas, canvasOptions.context);
      }
    }
    if (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope)
      return canvasOptions._id;
    else {
      const canvascontrols = {
        _id: options2._id,
        width: options2.width,
        height: options2.height,
        draw: (props) => {
          drawFrame2(props, options2._id);
        },
        update: (props) => {
          updateCanvas2(props, options2._id);
        },
        clear: () => {
          clearCanvas2(options2._id);
        },
        init: () => {
          initCanvas2(options2._id);
        },
        stop: () => {
          stopAnim2(options2._id);
        },
        start: () => {
          startAnim2(options2._id);
        },
        set: (newDrawProps) => {
          setDraw2(newDrawProps, options2._id);
        },
        terminate: () => {
          stopAnim2(options2._id);
        }
      };
      return canvascontrols;
    }
  }
  function drawFrame2(props, _id) {
    let canvasopts;
    if (this.graph) {
      if (!_id)
        canvasopts = this.graph.CANVASES?.[Object.keys(this.graph.CANVASES)[0]];
      else
        canvasopts = this.graph.CANVASES?.[_id];
    } else {
      if (!_id)
        canvasopts = globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];
      else
        canvasopts = globalThis.CANVASES?.[_id];
    }
    if (canvasopts) {
      if (props)
        Object.assign(canvasopts, props);
      if (canvasopts.draw) {
        canvasopts.draw(canvasopts, canvasopts.canvas, canvasopts.context);
        return _id;
      }
    }
    return void 0;
  }
  function clearCanvas2(_id) {
    let canvasopts;
    if (this.graph) {
      if (!_id)
        canvasopts = this.graph.CANVASES?.[Object.keys(this.graph.CANVASES)[0]];
      else
        canvasopts = this.graph.CANVASES?.[_id];
    } else {
      if (!_id)
        canvasopts = globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];
      else
        canvasopts = globalThis.CANVASES?.[_id];
    }
    if (canvasopts?.clear) {
      canvasopts.clear(canvasopts, canvasopts.canvas, canvasopts.context);
      return _id;
    }
    return void 0;
  }
  function initCanvas2(_id) {
    let canvasopts;
    if (this.graph) {
      if (!_id)
        canvasopts = this.graph.CANVASES?.[Object.keys(this.graph.CANVASES)[0]];
      else
        canvasopts = this.graph.CANVASES?.[_id];
    } else {
      if (!_id)
        canvasopts = globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];
      else
        canvasopts = globalThis.CANVASES?.[_id];
    }
    if (canvasopts?.init) {
      canvasopts.init(canvasopts, canvasopts.canvas, canvasopts.context);
      return _id;
    }
    return void 0;
  }
  function updateCanvas2(input, _id) {
    let canvasopts;
    if (this.graph) {
      if (!_id)
        canvasopts = this.graph.CANVASES?.[Object.keys(this.graph.CANVASES)[0]];
      else
        canvasopts = this.graph.CANVASES?.[_id];
    } else {
      if (!_id)
        canvasopts = globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];
      else
        canvasopts = globalThis.CANVASES?.[_id];
    }
    if (canvasopts?.update) {
      canvasopts.update(canvasopts, canvasopts.canvas, canvasopts.context, input);
      return _id;
    }
    return void 0;
  }
  function setProps2(props, _id) {
    let canvasopts;
    if (this.graph) {
      if (!_id)
        canvasopts = this.graph.CANVASES?.[Object.keys(this.graph.CANVASES)[0]];
      else
        canvasopts = this.graph.CANVASES?.[_id];
    } else {
      if (!_id)
        canvasopts = globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];
      else
        canvasopts = globalThis.CANVASES?.[_id];
    }
    if (canvasopts) {
      Object.assign(canvasopts, props);
      if (props.width)
        canvasopts.canvas.width = props.width;
      if (props.height)
        canvasopts.canvas.height = props.height;
      return _id;
    }
    return void 0;
  }
  function startAnim2(_id, draw) {
    let canvasopts;
    if (this.graph) {
      if (!_id)
        canvasopts = this.graph.CANVASES?.[Object.keys(this.graph.CANVASES)[0]];
      else
        canvasopts = this.graph.CANVASES?.[_id];
    } else {
      if (!_id)
        canvasopts = globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];
      else
        canvasopts = globalThis.CANVASES?.[_id];
    }
    canvasopts.animating = true;
    if (canvasopts && draw) {
      if (typeof draw === "string")
        draw = parseFunctionFromText2(draw);
      if (typeof draw === "function") {
        canvasopts.draw = draw;
      }
      return _id;
    }
    if (typeof canvasopts?.draw === "function") {
      let draw2 = (s, canvas3, context) => {
        if (s.animating) {
          s.draw(s, canvas3, context);
          requestAnimationFrame(() => {
            draw2(s, canvas3, context);
          });
        }
      };
      if (typeof canvasopts.clear === "function")
        canvasopts.clear(canvasopts, canvasopts.canvas, canvasopts.context);
      if (typeof canvasopts.init === "function")
        canvasopts.init(canvasopts, canvasopts.canvas, canvasopts.context);
      draw2(canvasopts, canvasopts.canvas, canvasopts.context);
      return _id;
    }
    return void 0;
  }
  function stopAnim2(_id) {
    let canvasopts;
    if (this.graph) {
      if (!_id)
        canvasopts = this.graph.CANVASES?.[Object.keys(this.graph.CANVASES)[0]];
      else
        canvasopts = this.graph.CANVASES?.[_id];
    } else {
      if (!_id)
        canvasopts = globalThis.CANVASES?.[Object.keys(globalThis.CANVASES)[0]];
      else
        canvasopts = globalThis.CANVASES?.[_id];
    }
    if (canvasopts) {
      canvasopts.animating = false;
      if (typeof canvasopts.clear === "function")
        canvasopts.clear(canvasopts, canvasopts.canvas, canvasopts.context);
      return _id;
    }
    return void 0;
  }
  var workerCanvasRoutes2 = {
    ...proxyElementWorkerRoutes2,
    Renderer: Renderer2,
    transferCanvas: transferCanvas2,
    setupCanvas: setupCanvas2,
    setDraw: setDraw2,
    drawFrame: drawFrame2,
    clearCanvas: clearCanvas2,
    initCanvas: initCanvas2,
    updateCanvas: updateCanvas2,
    setProps: setProps2,
    startAnim: startAnim2,
    stopAnim: stopAnim2
  };
  function parseFunctionFromText2(method = "") {
    let getFunctionBody = (methodString) => {
      return methodString.replace(/^\W*(function[^{]+\{([\s\S]*)\}|[^=]+=>[^{]*\{([\s\S]*)\}|[^=]+=>(.+))/i, "$2$3$4");
    };
    let getFunctionHead = (methodString) => {
      let startindex = methodString.indexOf("=>") + 1;
      if (startindex <= 0) {
        startindex = methodString.indexOf("){");
      }
      if (startindex <= 0) {
        startindex = methodString.indexOf(") {");
      }
      return methodString.slice(0, methodString.indexOf("{", startindex) + 1);
    };
    let newFuncHead = getFunctionHead(method);
    let newFuncBody = getFunctionBody(method);
    let newFunc;
    if (newFuncHead.includes("function")) {
      let varName = newFuncHead.split("(")[1].split(")")[0];
      newFunc = new Function(varName, newFuncBody);
    } else {
      if (newFuncHead.substring(0, 6) === newFuncBody.substring(0, 6)) {
        let varName = newFuncHead.split("(")[1].split(")")[0];
        newFunc = new Function(varName, newFuncBody.substring(newFuncBody.indexOf("{") + 1, newFuncBody.length - 1));
      } else {
        try {
          newFunc = (0, eval)(newFuncHead + newFuncBody + "}");
        } catch {
        }
      }
    }
    return newFunc;
  }

  // modules/webglplot/plotter.ts
  globalThis.plotter = new y();
  var init = (options2, canvas3, context) => {
    globalThis.plotter.initPlot(options2);
    let onresize = (o) => {
      canvas3.width = canvas3.clientWidth;
      canvas3.height = canvas3.clientHeight;
      options2.overlay.width = canvas3.clientWidth;
      options2.overlay.height = canvas3.clientHeight;
      globalThis.plotter.plots[options2._id].plot.webgl.viewport(0, 0, canvas3.width, canvas3.height);
    };
    if (typeof window !== "undefined")
      window.addEventListener("resize", onresize);
    else
      canvas3.addEventListener("resize", onresize);
    setTimeout(() => {
      onresize(canvas3);
    }, 10);
  };
  var update = (options2, canvas3, context, input) => {
    globalThis.plotter.update(options2._id, input);
  };
  var clear = (options2, canvas3, context) => {
    globalThis.plotter.deinitPlot(options2._id);
  };
  var plot;
  var options;
  var canvas;
  var overlay;
  var failed = false;
  function create(context) {
    const options2 = context.options;
    options2.init = init;
    options2.update = update;
    options2.clear = clear;
    if (typeof context.overlay === "string")
      context.overlay = document.querySelector(context.overlay);
    if (typeof context.canvas === "string")
      context.canvas = document.querySelector(context.canvas);
    options2.canvas = context.canvas;
    options2.overlay = context.overlay;
    const originalOptions = { ...options2 };
    try {
      if (options2.worker) {
        try {
          if (typeof canvas_worker_default === "object")
            options2.worker = false;
          if (options2.worker === true) {
            options2.worker = new Worker(canvas_worker_default);
          } else if (typeof options2.worker === "string" || options2.worker instanceof Blob)
            options2.worker = new Worker(options2.worker);
          if (options2.overlay) {
            let offscreen = options2.overlay.transferControlToOffscreen();
            options2.overlay = offscreen;
            options2.transfer = [options2.overlay];
          }
          context.plot = workerCanvasRoutes2.Renderer(options2);
        } catch (e) {
          originalOptions.worker = false;
          console.warn("Could not create canvas with worker. Will try to use a standard canvas instead.", originalOptions, e);
        }
      }
      if (!context.plot)
        context.plot = workerCanvasRoutes2.Renderer(originalOptions);
    } catch (e) {
      console.error("Could not create a plot using the current options", e);
      context.failed = true;
    }
    return context.plot;
  }
  function plotter_default(args) {
    if (!this.failed) {
      if (!this.plot)
        create(this);
      if (this.plot)
        this.plot.update(args);
    }
  }

  // index.ts
  var canvas2 = document.createElement("canvas");
  var overlay2 = document.createElement("canvas");
  canvas2.style.backgroundColor = "black";
  canvas2.style.position = "absolute";
  canvas2.style.width = "100%";
  canvas2.style.height = "100%";
  overlay2.style.position = "absolute";
  overlay2.style.width = canvas2.style.width;
  overlay2.style.height = canvas2.style.height;
  document.body.appendChild(canvas2);
  document.body.appendChild(overlay2);
  var sampleCt = 1e3;
  var plotterInstance = Object.assign(Object.assign({}, plotter_exports), {
    canvas: canvas2,
    overlay: overlay2,
    options: {
      worker: false,
      overlayFont: "10px Verdana",
      overlayColor: "orange",
      generateNewLines: true,
      cleanGeneration: false,
      lineWidth: 4e-3
    }
  });
  console.log("Plot: ", plotterInstance);
  var count = 0;
  var anim = () => {
    let now = Date.now();
    const arr1 = new Array(sampleCt).fill(0).map((v2, i) => {
      return Math.sin(2 * Math.PI * 5 * (now / 1e3 + i / sampleCt));
    });
    const arr2 = new Array(sampleCt).fill(0).map((v2, i) => {
      return 1 + Math.sin(2 * Math.PI * 15 * (now / 1e3 + i / sampleCt));
    });
    const arr3 = new Array(sampleCt).fill(0).map((v2, i) => {
      return 2 + 0.5 * Math.sin(2 * Math.PI * 10 * (now / 1e3 + i / sampleCt));
    });
    const arr4 = new Array(sampleCt).fill(0).map((v2, i) => {
      return 0.5 * Math.sin(2 * Math.PI * 25 * (now / 1e3 + i / sampleCt));
    });
    const arr5 = new Array(sampleCt).fill(0).map((v2, i) => {
      return 0.5 * Math.sin(2 * Math.PI * 1 * (now / 1e3 + i / sampleCt));
    });
    const arr6 = new Array(sampleCt).fill(0).map((v2, i) => {
      return 0.5 * Math.sin(2 * Math.PI * 3 * (now / 1e3 + i / sampleCt));
    });
    const obj = {
      0: arr1,
      1: arr2,
      2: arr3,
      3: arr4,
      4: arr5,
      5: arr6
    };
    plotterInstance.default(obj);
    count += sampleCt;
    requestAnimationFrame(anim);
  };
  setTimeout(() => anim());
  var connect = document.createElement("button");
  connect.innerText = "Connect";
  connect.onclick = () => {
    initDevice(
      "BLE",
      "nrf5x",
      {
        ondecoded: {
          "0002cafe-b0ba-8bad-f00d-deadbeef0000": (data) => {
            console.log(data);
            eeg_exports.default(data);
            emg_exports.default(data);
          },
          "0003cafe-b0ba-8bad-f00d-deadbeef0000": (data) => {
            console.log(data);
            heg_exports.default(data);
          },
          "0004cafe-b0ba-8bad-f00d-deadbeef0000": (data) => {
            console.log(data);
            generic_exports.accelerometer({
              x: data.ax,
              y: data.ay,
              z: data.az,
              timestamp: data.timestamp
            });
            generic_exports.gyroscope({
              x: data.gx,
              y: data.gy,
              timestamp: data.timestamp
            });
          },
          "0005cafe-b0ba-8bad-f00d-deadbeef0000": (data) => {
            console.log(data);
            eeg_exports.default(data);
            emg_exports.default(data);
          },
          "0006cafe-b0ba-8bad-f00d-deadbeef0000": (data) => {
            console.log(data);
            environment_exports.temperature(data);
            environment_exports.pressure(data);
            environment_exports.humidity(data);
            environment_exports.altitude(data);
          }
        }
      }
    );
  };
  document.body.insertAdjacentElement("beforeend", connect);
})();
/*! Capacitor: https://capacitorjs.com/ - MIT License */
