"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkrxing_web"] = self["webpackChunkrxing_web"] || []).push([["index_js"],{

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var rxing_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxing-wasm */ \"./node_modules/.pnpm/rxing-wasm@0.1.17/node_modules/rxing-wasm/rxing_wasm_bg.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([rxing_wasm__WEBPACK_IMPORTED_MODULE_0__]);\nrxing_wasm__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\r\n\r\nconst text_hints = [\"Other\", \"PossibleFormats\", \"CharacterSet\", \"AllowedLengths\", \"AllowedEanExtensions\"];\r\nconst bool_hints = [\"PureBarcode\", \"TryHarder\", \"AssumeCode39CheckDigit\", \"ReturnCodabarStartEnd\", \"AssumeGs1\", \"AlsoInverted\"]\r\n\r\nconst scan_btn = document.getElementById('scan_btn');\r\nconst input = document.getElementById('image_file_input');\r\nconst output = document.getElementById(\"output\");\r\n\r\ninput.addEventListener('change', handleFiles);\r\nscan_btn.addEventListener('click', onClickScan);\r\n\r\nfunction handleFiles(e) {\r\n    scan_btn.disabled = true;\r\n    output.hidden = true;\r\n    const canvas = document.getElementById('cvs');\r\n    const ctx = canvas.getContext('2d');\r\n    const img = new Image;\r\n    img.src = URL.createObjectURL(e.target.files[0]);\r\n    img.onload = function () {\r\n        canvas.width = img.width;\r\n        canvas.height = img.height;\r\n        ctx.drawImage(img, 0, 0, img.width, img.height);\r\n        scan_btn.disabled = false;\r\n    }\r\n}\r\n\r\nfunction onClickScan() {\r\n    const canvas = document.getElementById('cvs');\r\n    const context = canvas.getContext('2d');\r\n    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);\r\n    const luma_data = (0,rxing_wasm__WEBPACK_IMPORTED_MODULE_0__.convert_js_image_to_luma)(imageData.data);\r\n    const hints = getHints();\r\n    let result;\r\n    try {\r\n        result = (0,rxing_wasm__WEBPACK_IMPORTED_MODULE_0__.decode_barcode_with_hints)(luma_data, canvas.width, canvas.height, hints);\r\n    } catch (e) {\r\n        alert(\"Issue decoding: \" + e);\r\n    }\r\n    write_results(result.format(), result.text(), result.raw_bytes(), result.result_points(), result.get_meta_data());\r\n}\r\n\r\nfunction write_results(format, text, raw_bytes, _points, metadata) {\r\n    // const points_formatted = [];\r\n    // const chunkSize = 2;\r\n    // console.log(JSON.stringify(points));\r\n    // for (let i = 0; i < points.length; i += chunkSize) {\r\n    //     const chunk = points.slice(i, i + chunkSize);\r\n    //     points_formatted.push([chunk[0], chunk[1]]);\r\n    // }\r\n\r\n    let metadata_string = \"\";\r\n    metadata.forEach((k,v) => {metadata_string += `${k}: ${v}\\n`});\r\n    // for (const md_k of metadata.keys()){\r\n    //     // console.log(`${md_k}: ${metadata.get(md_k)}\\n`);\r\n    //     metadata += `${md_k}: ${metadata.get(md_k)}\\n`;\r\n    // }\r\n\r\n    document.getElementById(\"text_result_td\").innerText = text;\r\n\r\n    document.getElementById(\"format_result_td\").innerText = rxing_wasm__WEBPACK_IMPORTED_MODULE_0__.BarcodeFormat[format];\r\n\r\n    // document.getElementById(\"points_result_td\").innerText = points_formatted.reduce((acc, point) => { acc + \"(\" + point[0] + \",\" + point[1], \") \" }, \"\");\r\n\r\n    document.getElementById(\"raw_bytes_result_td\").innerText = Object.keys(raw_bytes).map((k) => raw_bytes[k]).join(', '); //.toString().split(\",\");//.reduce((acc,v)=>{acc + \"-\" + v}, \"\");\r\n\r\n    document.getElementById(\"medata_data_result_td\").innerText = metadata_string;\r\n\r\n    output.hidden = false;\r\n}\r\n\r\nfunction get_text_hint(id) {\r\n    const input = document.getElementById(id);\r\n    return input.value;\r\n}\r\n\r\nfunction get_bool_hint(id) {\r\n    const input = document.getElementById(id);\r\n    return input.checked.toString();\r\n}\r\n\r\nfunction getHints() {\r\n    const hint_dictionary = new rxing_wasm__WEBPACK_IMPORTED_MODULE_0__.DecodeHintDictionary();\r\n    for (const hint of text_hints) {\r\n        hint_dictionary.set_hint(rxing_wasm__WEBPACK_IMPORTED_MODULE_0__.DecodeHintTypes[hint], get_text_hint(hint));\r\n    }\r\n    for (const hint of bool_hints) {\r\n        hint_dictionary.set_hint(rxing_wasm__WEBPACK_IMPORTED_MODULE_0__.DecodeHintTypes[hint], get_bool_hint(hint));\r\n    }\r\n    if (get_bool_hint(\"PureBarcode\") == \"false\") {\r\n        hint_dictionary.remove_hint(rxing_wasm__WEBPACK_IMPORTED_MODULE_0__.DecodeHintTypes.PureBarcode);\r\n    }\r\n    return hint_dictionary;\r\n}\r\n\r\nclass Camvas {\r\n    ctx;\r\n    video;\r\n\r\n    constructor(ctx) {\r\n        this.ctx = ctx\r\n        this.setupVideo()\r\n    }\r\n\r\n    setupVideo(){\r\n        // We can't `new Video()` yet, so we'll resort to the vintage\r\n        // \"hidden div\" hack for dynamic loading.\r\n        const streamContainer = document.createElement('div')\r\n        this.video = document.createElement('video')\r\n\r\n        // If we don't do this, the stream will not be played.\r\n        // By the way, the play and pause controls work as usual\r\n        // for streamed videos.\r\n        this.video.setAttribute('autoplay', '1')\r\n\r\n        // The video should fill out all of the canvas\r\n        this.video.setAttribute('width', this.ctx.canvas.width)\r\n        this.video.setAttribute('height', this.ctx.canvas.height)\r\n\r\n        this.video.setAttribute('style', 'display:block')\r\n        streamContainer.appendChild(this.video)\r\n        document.body.appendChild(streamContainer)\r\n    }\r\n\r\n    async run() {\r\n        // The callback happens when we are starting to stream the video.\r\n        const stream = await navigator.mediaDevices.getUserMedia({video: true})\r\n\r\n        // Yay, now our webcam input is treated as a normal video and\r\n        // we can start having fun\r\n        try {\r\n            this.video.srcObject = stream;\r\n        } catch (error) {\r\n            console.log('video stream error', error)\r\n            this.video.src = URL.createObjectURL(stream);\r\n        }\r\n        // Let's start drawing the canvas!\r\n        this.update()\r\n    }\r\n\r\n    update() {\r\n        const self = this\r\n        let last = Date.now()\r\n        const loop = function() {\r\n            // For some effects, you might want to know how much time is passed\r\n            // since the last frame; that's why we pass along a Delta time `dt`\r\n            // variable (expressed in milliseconds)\r\n            var dt = Date.now() - last\r\n            self.draw(self.video, dt)\r\n            last = Date.now()\r\n            requestAnimationFrame(loop)\r\n        }\r\n        requestAnimationFrame(loop)\r\n    }\r\n\r\n    draw(video, dt) {\r\n        this.ctx.drawImage(video, 0, 0)\r\n    }\r\n}\r\n\r\nconst ctx = document.querySelector(\"#cvs\").getContext('2d')\r\nlet c = new Camvas(ctx)\r\nc.run()\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://rxing-web/./index.js?");

/***/ })

}]);