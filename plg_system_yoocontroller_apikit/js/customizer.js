/*
 * @package    PageBuilder Toolkit System Plugin
 * @version    1.5.0
 * @author     Alex Revo - alexrevo.pw
 * @copyright  Copyright (c) 2019 - 2023 Alex Revo. All rights reserved.
 * @license    Commerce
 * @link       https://alexrevo.pw/
 */
//TODO
// - check image size for background column
// - fix scoll when delete many items
// - prevent open Jivochat for admin
// - fix first line codemirror CSS
// - zoolanders form vars
// - copy image ratio
//notify status

//NEED CHECK
// - fix update image info after replace image
// -get file size for iOs

document.addEventListener("DOMContentLoaded", function () {
  if (!window.jQuery) {
    var tag = document.createElement("script");
    tag.src =
      "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
    document.querySelector("head").appendChild(tag);
  }
});

function isIOSDevice() {
  return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
  var matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace("/([.$?*|{}()[]\\/+^])/g, '\\$1'") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : 0;
}

function unsecuredCopyToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Unable to copy to clipboard", err);
  }
  document.body.removeChild(textArea);
}

function sendnotify(icon, clipboard, timeout) {
  UIkit.notification({
    message: "<span uk-icon='icon: " + icon + "'></span> " + clipboard,
    pos: "bottom-left",
    status: "success",
    timeout: timeout,
  });
}
//Сodemirror handler
setTimeout(function () {
  let movedByMouse = false;
  let clipboard = "";

  jQuery(document).ready(function ($) {
    //$('body').prepend('<style></style>');

    //		CodeMirror.registerHelper("hint","yourOwnHint",function(cm,options){
    //    let cur=cm.getCursor(),token=cm.getTokenAt(cur);
    //		let start=token.start,end=token.end;
    // //Perform any opertaion or check before providing completion
    //
    //		 return {
    //			 list:["cms39_error_handler_db","cms39_array_to_string","cms39_string_to_array","cms39_html_compress","cms39_sanitize_output","cms39_requiretolet","cms39_session_start","cms39_getvaluefrompath","cms39_setvaluefrompath","cms39_arraytoxml"],
    //			 from: CodeMirror.Pos(cur.line, start),
    //						 to: CodeMirror.Pos(cur.line, end)
    //		 }
    //	 });

    function initCodeMirror(clipboard) {
      let hasCodeMirror =
        document.querySelector("div.yo-editor > div > div.CodeMirror") !== null;
      let loadedCodeMirror =
        jQuery(".CodeMirror").data("wz-loaded") == "loaded";
      //console.log(hasCodeMirror, loadedCodeMirror);
      //console.log("loaded " + loadedCodeMirror);
      //if (hasCodeMirror && !loadedCodeMirror) {
      jQuery(".CodeMirror").data("wz-loaded", "loaded");
      runCodeMirror(clipboard);
      //}
    }

    function runCodeMirror(clipboard) {
      let editors = document.querySelectorAll("div.CodeMirror");
      //console.log("run " + clipboard);

      for (let i = 0; i < editors.length; i++) {
        let editor = editors[i].CodeMirror;
        //editor.options.spellcheck = true;
        editor.options.scrollbarStyle = "overlay";
        //editor.options.viewportMargin = "Infinity";
        //bypass scroll for editor
        /*editors[i].addEventListener("wheel", function (e) {
          if (e.deltaY > 0)
            jQuery(this).closest(
              ".yo-sidebar-fields.yo-sidebar-tabs-section"
            )[0].scrollTop += 120;
          else
            jQuery(editors[i]).closest(
              ".yo-sidebar-fields.yo-sidebar-tabs-section"
            ).scrollTop -= 120;
          console.log(
            jQuery(this).closest(
              ".yo-sidebar-fields.yo-sidebar-tabs-section"
            )[0]
          );
        }); */

        //check ASCII mode status
        editor.on("beforeChange", function (cm, changeObj) {
          let checkedACSII = jQuery("#wz-ascii").is(":checked");
          if (!checkedACSII) {
            return;
          }
          //prevent input non-ASCII
          for (let i = 0; i < changeObj.text.length; i++) {
            let validRegex = /^[\x00-\x7F]*$/.test(changeObj.text[i]);
            if (!validRegex) {
              changeObj.cancel();
            }
          }
        });

        //easy selectors insert
        editor.on("focus", function (e) {
          //console.log("focus " + clipboard);
          if (clipboard != "") {
            movedByMouse = false;
            let cursor = editor.getCursor();
            let line = cursor.line;
            let ch = cursor.ch;
            editor.setCursor(line, ch);
            editor.replaceRange(clipboard, {
              line: line,
              ch: ch,
            });
            clipboard = "";
            editor.setCursor(line + 1, ch);
            cursor = editor.getCursor();
            //console.log("done " + clipboard);
          }
        });
      }
      //let editor = editors[editors.length - 1].CodeMirror;
    }

    /*jQuery(document).on("click", ".mediaquery", function (e) {
      e.preventDefault();
      let iframePreview = jQuery(".yo-preview-iframe");
      let width = iframePreview.width();
      //let mediaQuery = '@media (max-width: ' + width + 'px) {\n}\n';
      let checkedScroll = jQuery("#wz-scroll").is(":checked");
      if (checkedScroll) width = width - 15;
      clipboard = "@media (max-width: " + width + "px) {\n\n}\n";
      //console.log("mq " + clipboard);
      sendnotify("copy", clipboard, 500);
      initCodeMirror(clipboard);
      clipboard = "";
    });*/

    jQuery(document).on("mousedown", ".mediaquery", function (event) {
      if (event.button == 2) {
        clipboard = "@media (max-width: 640px) {\n\n}\n";
        //console.log("mq " + clipboard);
        sendnotify("copy", clipboard, 500);
        initCodeMirror(clipboard);
        clipboard = "";
        jQuery(this).contextmenu(function () {
          return false;
        });
      } else {
        event.preventDefault();
        let iframePreview = jQuery(".yo-preview-iframe");
        let width = iframePreview.width();
        //let mediaQuery = '@media (max-width: ' + width + 'px) {\n}\n';
        let checkedScroll = jQuery("#wz-scroll").is(":checked");
        if (checkedScroll) width = width - 15;
        clipboard = "@media (max-width: " + width + "px) {\n\n}\n";
        //console.log("mq " + clipboard);
        sendnotify("copy", clipboard, 500);
        initCodeMirror(clipboard);
        clipboard = "";
      }
    });

    jQuery(document).on("click", ".CodeMirror", function (e) {
      initCodeMirror(clipboard);
    });

    //copy element selectors and other muted text
    let clipboard = "";
    jQuery(document).on("click", ".uk-text-muted code", function (e) {
      let code = jQuery(this).text();
      clipboard = String(clipboard);
      //console.log("code0:" + code);
      //console.log("clipboard0:" + clipboard);
      if (clipboard != "" && clipboard != "null") {
        switch (true) {
          case clipboard === "200":
            clipboard = "250";
            sendnotify("copy", clipboard, 500);
            break;
          case clipboard === "250":
            clipboard = "300";
            sendnotify("copy", clipboard, 500);
            break;
          case clipboard === "300":
            clipboard = "350";
            sendnotify("copy", clipboard, 500);
            break;
          case clipboard === "350":
            clipboard = "400";
            sendnotify("copy", clipboard, 500);
            break;
          case clipboard === "400":
            clipboard = "null";
            sendnotify("copy", clipboard, 500);
            break;
          default:
            break;
        }
        return;
      }
      //console.log("code1:" + code);
      //console.log("clipboard1:" + clipboard);
      switch (true) {
        case code === "=":
        case code === "blue, white, black":
          clipboard = "";
          code = "";
          break;
        case code[0] === ".":
          code += " {\n\n}\n";
          clipboard = code;
          //console.log("mt " + clipboard);
          sendnotify("copy", clipboard, 500);
          initCodeMirror(clipboard);
          clipboard = "";
          break;
        case code === "2017-05-01T22:00:00+00:00":
          clipboard = new Date().toISOString();
          sendnotify("copy", clipboard, 500);
          break;
        case code === "images/*.{jpg,png}":
          clipboard = "images/*.{jpg,png,jpeg,gif,svg,tiff,bmp}";
          sendnotify("copy", clipboard, 500);
          break;
        case code === "200":
          clipboard = "200";
          sendnotify("copy", clipboard, 500);
          break;
        default:
          clipboard = code + "\n";
          sendnotify("copy", clipboard, 500);
          initCodeMirror(clipboard);
          clipboard = "";
          //console.log("default");
          break;
      }
      // console.log("code2:" + code);
      // console.log("clipboard2:" + clipboard);
    });
    //copy section name as shortcode
    jQuery(document).on(
      "mousedown",
      "h3.yo-sidebar-subheading.uk-drag",
      function (e) {
        if (e.button == 2) {
          headline = "[[" + jQuery(this).text() + "]]";
          if (!navigator.clipboard) {
            unsecuredCopyToClipboard(headline);
          } else {
            window.navigator.clipboard.writeText(headline);
          }
          //clipboardData.setData(headline)
          sendnotify("copy", headline, 500);
          jQuery(this).contextmenu(function () {
            return false;
          });
        }
      }
    );
    //clean clipboard
    jQuery(document).on("click", ".clipboard", function (e) {
      if (clipboard) {
        clipboard = "";
        sendnotify("check", "Clipboard is cleared", 500);
      } else sendnotify("close", "Clipboard is empty", 500);
    });
    //copy section name
    jQuery(document).on(
      "click",
      "h3.yo-sidebar-subheading.uk-drag",
      function (e) {
        headline = jQuery(this).text().trim();
        if (!navigator.clipboard) {
          unsecuredCopyToClipboard(headline);
        } else {
          window.navigator.clipboard.writeText(headline);
        }
        sendnotify("copy", headline, 500);
      }
    );
    //copy library entries shortcode by right click
    jQuery(document).on(
      "mousedown",
      "a > span.uk-text-middle",
      function (event) {
        if (event.button == 2) {
          let headline = "[[" + jQuery(this).text() + "]]";
          if (!navigator.clipboard) {
            unsecuredCopyToClipboard(headline);
          } else {
            window.navigator.clipboard.writeText(headline);
          }
          sendnotify("copy", headline, 500);
          console.log(headline);
          jQuery(this).contextmenu(function () {
            return false;
          });
        }
      }
    );
    //copy library entries shortcode by right click
    jQuery(document).on("mousedown", "a.uk-link-reset", function (event) {
      if (event.button == 2) {
        let headline = "[[" + jQuery(this).text().trim() + "]]";
        if (!navigator.clipboard) {
          unsecuredCopyToClipboard(headline);
        } else {
          window.navigator.clipboard.writeText(headline);
        }
        sendnotify("copy", headline, 500);
        console.log(headline);
        jQuery(this).contextmenu(function () {
          return false;
        });
      }
    });
    //insert file path pattern
    jQuery(document).on(
      "click",
      'input[class="uk-input yo-input-iconnav-right"]',
      function (e) {
        if (clipboard) {
          jQuery(this).val(clipboard);
          this.setSelectionRange(7, 7);
          this.dispatchEvent(new Event("input", { composed: true }));
          clipboard = "";
        }
      }
    );
    //insert animation delay
    jQuery(document).on("click", 'input[placeholder="0"]', function (e) {
      if (clipboard) {
        jQuery(this).val(clipboard);
        this.dispatchEvent(new Event("input", { composed: true }));
        clipboard = "";
      }
    });
    //insert other input
    jQuery(document).on("click", 'input[class="uk-input"]', function (e) {
      if (clipboard) {
        jQuery(this).val(clipboard);
        this.dispatchEvent(new Event("input", { composed: true }));
        clipboard = "";
      }
    });
  });
}, 1000);

function byteCount(s) {
  return encodeURI(s).split(/%..|./).length - 1;
}

setTimeout(function () {
  if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, "startsWith", {
      enumerable: false,
      configurable: false,
      writable: false,
      value: function (searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
      },
    });
  }

  jQuery(document).ready(function ($) {
    function runDeviceSize() {
      let Yoopanel = jQuery(".yo-sidebar-footer").length > 0;
      if (!Yoopanel) {
        setTimeout(runDeviceSize, 2000);
        return;
      }

      /*
       * Create a device list selector
       */

      function createSelectDeviceSize() {
        let divElement = jQuery("<div/>");
        divElement.prop("id", "select-device-size");
        divElement.css("marginBottom", "15px");
        let selectElement = jQuery("<select/>");
        selectElement.prop("name", "device");
        selectElement.prop("class", "uk-select");
        let defaultOption = jQuery("<option/>");
        defaultOption.val(
          JSON.stringify({
            width: 0,
            height: 0,
          })
        );
        defaultOption.text("Select device size");
        selectElement.append(defaultOption);
        let data = JSON.parse(
          `{
            "devices": [
                { "device": "Mobile (general) [640x720]", "width": 640, "height": 720 },
                { "device": "Galaxy Fold [280x653]", "width": 280, "height": 653 },
                { "device": "iPhone 5/SE [320x568]", "width": 320, "height": 568 },
                { "device": "iPhone 12 mini [360x780]", "width": 360, "height": 780 },
                { "device": "iPhone 6/7/8 [375x667]", "width": 375, "height": 667 },
                { "device": "iPhone X/XS/11 Pro/13 mini [375x812]", "width": 375, "height": 812 },
                { "device": "iPhone 12/13/12 Pro/13 Pro/14 [390x844]", "width": 390, "height": 844 },
                { "device": "iPhone 14 Pro/15 [393x852]", "width": 393, "height": 852 },
                { "device": "Samsung Z Flip [412x1004]", "width": 412, "height": 1004 },
                { "device": "iPhone 6/7/8 Plus [414x736]", "width": 414, "height": 736 },
                { "device": "iPhone XR/XS Max/11 Pro Max [414x896]", "width": 414, "height": 896 },
                { "device": "iPhone 12/13 Pro Max/14 Plus [428x926]", "width": 428, "height": 926 },
                { "device": "iPhone 14/15 Pro Max/15 Plus [430x932]", "width": 430, "height": 932 },
                { "device": "Nokia N9 [480x854]", "width": 480, "height": 854 },
                { "device": "Surface Duo [540x720]", "width": 540, "height": 720 },
                { "device": "BlackBerry PlayBook [600x1024]", "width": 600, "height": 1024 },
                { "device": "Nexus 7 [600x960]", "width": 600, "height": 960 },
                { "device": "Microsoft Lumia 550 [640x360]", "width": 640, "height": 360 },
                { "device": "iPad Mini 6 [744x1133]", "width": 744, "height": 1133 },
                { "device": "iPad / iPad Mini [768x1024]", "width": 768, "height": 1024 },
                { "device": "Samsung Fold [768x1076]", "width": 768, "height": 1076 },
                { "device": "Nexus 10 [800x1280]", "width": 800, "height": 1280 },
                { "device": "iPad 7/8/9 [810x1080]", "width": 810, "height": 1080 },
                { "device": "iPad Air [820x1180]", "width": 820, "height": 1180 },
                { "device": "iPad Pro (10.5)/Air 3 [834x1112]", "width": 834, "height": 1112 },
                { "device": "iPad Pro (11) [834x1194]", "width": 834, "height": 1194 },
                { "device": "Samsung Z Fold 2/3 [884x1104]", "width": 884, "height": 1104 },
                { "device": "Surface Pro 7 [912x1368]", "width": 912, "height": 1368 },
                { "device": "iPad Pro (12.9) [1024x1366]", "width": 1024, "height": 1366 },
                { "device": "Laptop MDPI [1280x800]", "width": 1280, "height": 800 },
                { "device": "720p HD Television [1280x720]", "width": 1280, "height": 720 },
                { "device": "Laptop WXGA [1366x768]", "width": 1366, "height": 768 },
                { "device": "Laptop HiDPI [1440x900]", "width": 1440, "height": 900 },
                { "device": "Laptop HD+ [1600x900]", "width": 1600, "height": 900 },
                { "device": "1080p Full HD Television [1920x1080]", "width": 1920, "height": 1080 },
                { "device": "4K Ultra HD Television [3840x2160]", "width": 3840, "height": 2160 }
            ]
        }
        `
        );
        //console.log(data.devices.length);
        for (let i = 0; i < data.devices.length; i++) {
          let item = data.devices[i];
          let optionElement = jQuery("<option/>");
          let value = JSON.stringify({
            width: item.width,
            height: item.height,
          });
          optionElement.text(item.device);
          optionElement.val(value);
          selectElement.append(optionElement);
          divElement.append(selectElement);
        }

        return divElement;
      }

      /*
       * Add toogle to the Footer
       */

      let html =
        '<li data-index="4" style="" class="uk-animation-slide-bottom-small"><a icon="chevron-down" uk-icon="" class="uk-icon uk-icon-link mediapanel"></a></li>';
      jQuery(".yo-sidebar-footer ul.uk-grid").append(html);

      let container = jQuery("<div/>");
      container.prop("id", "device-size");
      container.css("display", "none");

      /*
       * Create plugin panel
       */
      //let id = document.querySelector("div.yo-customizer > div > div > iframe")
      // .contentWindow.$customizer.page.id;
      let htmlOptionsBar = `<div class="uk-text-center uk-grid-small" uk-grid>
       <div class="uk-width-auto">
           <div class="mediaselector" style="">
               <a href="#" class="uk-icon mediaquery" uk-tooltip="Copy media query" uk-icon="code"></a>
           </div>
       </div>
       <div class="uk-width-1-2"><div id="select" class="select"></div></div>
       <div class="uk-width-expand">
           <div class="uk-flex">
               <input type="text" class="uk-input devicewidth" uk-tooltip="Width" value="" placeholder="width" name="devicewidth" />
               <a href="#" class="reverse" uk-tooltip="Reverse size"><svg width="20" height="20" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" fill-rule="evenodd" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" transform="translate(4 2)"> <path d="m4.5 8.5-4 4 4 4"></path> <path d="m12.5 12.5h-12"></path> <path d="m8.5.5 4 4-4 4"></path> <path d="m12.5 4.5h-12"></path> </g> </g></svg></a>
               <input type="text" class="uk-input deviceheight" value="" uk-tooltip="Height" placeholder="height" name="deviceheight" />
               <a href="#" class="uk-icon update" uk-tooltip="Reset to device size" uk-icon="refresh">                   
               </a>
           </div>
       </div>
   </div>
   <div class="slider" id="pbtdm" hidden>
  <div class="container-slider">
  <span class="sun">☀</span><input type="range" min="0.1" max="1" step="0.01" value="0.5" id="bright">  <div class="val" id="final">50</div>
  </div>
</div>
   <div class="uk-text-center uk-margin-small-bottom">
   <!--<a href="#" onclick="false;" uk-tooltip="Previous version [coming soon]" style="opacity: 0.3;" class="uk-icon undo" uk-icon="reply">          
       </a>    -->
   <label for="wz-scroll">+scroll</label><input id="wz-scroll" type="checkbox" style="vertical-align: middle; margin-right: 5px;" /><label for="wz-ascii">ASCII only</label>
       <input id="wz-ascii" type="checkbox" style="vertical-align: middle;" />
       <a href="#" data-debug="off" style="opacity: 0.5;" class="uk-icon debug" uk-tooltip="Debug / Copy LESS vars" uk-icon="lifesaver">           
       </a>
       <a href="#" uk-tooltip="Show non breaking spaces" class="nbsp uk-icon" style="opacity: 0.3;" uk-icon="star">          
       </a>
       <a href="#" uk-tooltip="Clean clipboard" class="clipboard" style="opacity: 0.3;" class="uk-icon" uk-icon="trash">          
       </a>       
       <a href="#" onclick="false;" uk-tooltip="Dark mode" style="opacity: 0.3;" class="darkmode icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20"><circle fill="none" stroke="#444" stroke-miterlimit="10" stroke-width="32" cx="256" cy="256" r="208"></circle><path d="M256 176v160a80 80 0 000-160zm0-128v128a80 80 0 000 160v128c-114.88 0-208-93.12-208-208S141.12 48 256 48z"></path></svg> </a>
       <a href="#" onclick="false;" uk-tooltip="UIKIT docs" style="opacity: 0.3;" class="uk-icon uikit" uk-icon="uikit">          
       </a>       
       <!--<a href="#" onclick="false;" uk-tooltip="Snippets [coming soon]" style="opacity: 0.3;" class="uk-icon snippets" uk-icon="album">          
       </a>
       <a href="#" onclick="false;" uk-tooltip="Next version  [coming soon]" style="opacity: 0.3;" class="uk-icon redo" uk-icon="forward">          
       </a>
       -->    
   </div>
<div class="uk-modal-full" id="uikit" uk-modal>
    <div class="uk-modal-dialog">
        <button class="uk-modal-close-full uk-close-large" type="button" uk-close></button>
        <iframe src="https://getuikit.com/docs/accordion" id="uikitdocs" width="1920" height="1080" uk-responsive></iframe>
    </div>
</div>
   `;
      //TODO iframe src="/index.php?option=com_content&view=article&id='+id+'&amp;layout=modal&amp;tmpl=component"

      container.append(htmlOptionsBar);

      if (!jQuery(".yo-sidebar-content").length) {
        setTimeout(function () {
          jQuery(".yo-sidebar-content").after(container);
        }, 1500);
      } else jQuery(".yo-sidebar-content").after(container);

      //show brightless slider
      if (getCookie("builder_darkmode") == 1) {
        jQuery("#pbtdm").removeAttr("hidden");
        if (getCookie("darkmode_value")) {
          document.querySelector("#bright").value = getCookie("darkmode_value");
          document.querySelector("#final").innerHTML = Math.round(
            document.querySelector("#bright").value * 100
          );
          jQuery(".yo-preview").css({
            filter:
              "brightness(" + document.querySelector("#bright").value + ")",
          });
        }
      }

      /*
       * Create a device list
       */

      let selectElement = createSelectDeviceSize();

      jQuery(".select").append(selectElement);

      /*
       * set current width and height
       */

      let iframePreview = jQuery(".yo-preview-iframe");
      jQuery('input[name="devicewidth"]').val(iframePreview.width());
      //console.log(iframePreview.width());
      jQuery('input[name="deviceheight"]').val(iframePreview.height());
      //console.log(iframePreview.height());

      /*
       * update Iframe size
       */

      function updateIframe(iframePreview) {
        let option = jQuery('#select select[name="device"]').find(
          "option:selected"
        );

        let data = JSON.parse(option.val());
        let checkedScroll = jQuery("#wz-scroll").is(":checked");

        iframePreview.prop("style", "");
        if (option.text() == "Select device size") {
          let width = jQuery(".yo-preview-iframe").width();
          let height = jQuery(".yo-preview-iframe").height();
          jQuery('input[name="devicewidth"]').val(width);
          jQuery('input[name="deviceheight"]').val(height);

          let iframeWidth = checkedScroll ? width + 15 : width;

          iframePreview.css({
            width: iframeWidth + "px",
            height: height + "px",
          });
          return;
        }

        jQuery('input[name="devicewidth"]').val(data.width);
        jQuery('input[name="deviceheight"]').val(data.height);

        let iframeWidth = checkedScroll ? data.width + 15 : data.width;

        iframePreview.css({
          width: iframeWidth + "px",
          height: data.height + "px",
        });
      }

      /*
       * Events
       */

      jQuery(document).on(
        "click",
        ".yo-sidebar-footer .uk-grid a",
        function () {
          let hasMediaPanel = jQuery(this).hasClass("mediapanel");
          if (hasMediaPanel && jQuery("#device-size").is(":hidden")) {
            jQuery(".mediapanel").html(
              '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-up"><polyline fill="none" stroke="#000" stroke-width="1.03" points="4 13 10 7 16 13"></polyline></svg>'
            );
            jQuery(".yo-sidebar-footer .uk-grid li").removeClass("uk-active");
            jQuery(this).closest("li").addClass("uk-active");
            jQuery(".yo-sidebar-content").css({
              bottom: "145px",
            });
            jQuery("#device-size").show(0, function () {
              setTimeout(function () {
                updateIframe(iframePreview);
                //if (!isIOSDevice()) jQuery("#wz-scroll").prop("checked", true);
                //jQuery("#wz-ascii").prop("checked", true);
              }, 100);
            });
          } else if (hasMediaPanel && jQuery("#device-size").is(":visible")) {
            jQuery(".mediapanel").html(
              '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-svg="chevron-down"><polyline fill="none" stroke="#000" stroke-width="1.03" points="16 7 10 13 4 7"></polyline></svg>'
            );
            jQuery(".yo-sidebar-footer .uk-grid li").removeClass("uk-active");
            jQuery("#device-size").hide();
            jQuery(".yo-sidebar-content").css({
              bottom: "60px",
            });
          }
          if (getCookie("builder_darkmode") == 1) {
            jQuery(".yo-preview").css({
              filter:
                "brightness(" + document.querySelector("#bright").value + ")",
            });
          }
        }
      );

      jQuery('input[name="devicewidth"], input[name="deviceheight"]').keyup(
        function () {
          let width = jQuery('input[name="devicewidth"]').val();
          let height = jQuery('input[name="deviceheight"]').val();
          let checkedScroll = jQuery("#wz-scroll").is(":checked");
          width = checkedScroll ? parseFloat(width) + 15 : width;
          iframePreview.css({
            width: width + "px",
            height: height + "px",
          });
        }
      );

      jQuery(document).on("click", ".update", function (e) {
        e.preventDefault();
        updateIframe(iframePreview);
      });

      //show UIKIT docs
      jQuery(document).on("click", ".uikit.uk-icon", function (e) {
        e.preventDefault();
        UIkit.modal("#uikit").show();
      });

      //dark mode
      jQuery(document).on("click", ".darkmode.icon", function (e) {
        e.preventDefault();
        if (getCookie("builder_darkmode") == 1) {
          setCookie("builder_darkmode", 0);
          location.reload();
        } else {
          setCookie("builder_darkmode", 1);
          location.reload();
        }
      });
      //adjust darkmode brightness
      jQuery(document).on("change", "#bright", function (e) {
        e.preventDefault();
        document.querySelector("#final").innerHTML = Math.round(
          document.querySelector("#bright").value * 100
        );
        jQuery(".yo-preview").css({
          filter: "brightness(" + document.querySelector("#bright").value + ")",
        });
        jQuery(".yo-preview >iframe svg").css({
          filter: "brightness(" + document.querySelector("#bright").value + ")",
        });
        setCookie("darkmode_value", document.querySelector("#bright").value);
      });
      jQuery(document).on("input", "#bright", function (e) {
        e.preventDefault();
        document.querySelector("#final").innerHTML = Math.round(
          document.querySelector("#bright").value * 100
        );
      });

      jQuery(document).on("click", ".reverse", function (e) {
        e.preventDefault();
        let width = jQuery('input[name="deviceheight"]').val();
        let height = jQuery('input[name="devicewidth"]').val();
        jQuery('input[name="devicewidth"]').val(width);
        jQuery('input[name="deviceheight"]').val(height);
        let checkedScroll = jQuery("#wz-scroll").is(":checked");
        let iframeWidth = checkedScroll ? parseFloat(width) + 15 : width;

        iframePreview.css({
          width: iframeWidth + "px",
          height: height + "px",
        });
      });

      jQuery(document).on("change", 'select[name="device"]', function () {
        updateIframe(iframePreview);
      });

      jQuery(document).on(
        "click",
        ".yo-sidebar-footer .uk-icon-link",
        function (e) {
          iframePreview.prop("style", "");
        }
      );

      jQuery(document).on("change", "#wz-scroll", function () {
        let checkedScroll = jQuery("#wz-scroll").is(":checked");
        let option = jQuery('#select select[name="device"]').find(
          "option:selected"
        );
        if (option.text() == "Select device size") {
          width = document.querySelector(
            "div.yo-customizer > div > div > iframe"
          ).clientWidth;
        } else {
          width = jQuery('input[name="devicewidth"]').val();
        }
        let height = jQuery('input[name="deviceheight"]').val();
        if (checkedScroll) iframeWidth = parseFloat(width) + 15;
        else if (option.text() == "Select device size") {
          iframeWidth = parseFloat(width) - 15;
        } else iframeWidth = parseFloat(width);
        //let iframeWidth = checkedScroll
        //          ? parseFloat(width) + 15
        //        : parseFloat(width) - 15;

        iframePreview.css({
          width: iframeWidth + "px",
          height: height + "px",
        });

        return;

        //updateIframe(iframePreview);
      });
    }

    runDeviceSize();
  });
}, 3000);
/*
 * Calculate aspect ratio
 */
function gcd(a, b) {
  return b == 0 ? a : gcd(b, a % b);
}

function getSRC() {
  if (
    typeof document.querySelector("div.yo-customizer > div > div > iframe")
      .contentWindow.$customizer.page !== "undefined"
  ) {
    id = document.querySelector("div.yo-customizer > div > div > iframe")
      .contentWindow.$customizer.page.id;
  } else {
    sendnotify("ban", "This page is not an article.", 500);
    return false;
  }
  if (jQuery('.yo-savebar:not([style="display: none;"])').length) {
    sendnotify("warning", "Please save the page layout first.", 500);
    return false;
  }

  // jQuery(".artparams").attr(
  //   "src",
  //   "/administrator/index.php?option=com_content&view=article&layout=modal&tmpl=component&" +
  //     Joomla.getOptions("csrf.token", "") +
  //     "=1&task=article.edit&id=" +
  //     id
  // );
  // UIkit.modal("div#artparams").show();

  // // Iframe actions
  // let modal = document.querySelector("#artparams");
  // iframe = modal.querySelector("iframe");
  // let iframeSave = false;

  // //console.log("before");
  // iframe.addEventListener("load", function () {
  //   let iframeBody = iframe.contentWindow.document.body;
  //   // console.log("load");
  //   // Save params
  //   let saveButton = iframeBody.querySelector("#saveBtn");
  //   if (saveButton) {
  //     modal
  //       .querySelector('button[type="button"]')
  //       .addEventListener("click", function (event) {
  //         event.preventDefault();
  //         saveButton.dispatchEvent(new Event("click"));
  //         iframeSave = true;
  //         UIkit.modal("div#artparams").hide();
  //         document.location.reload();
  //       });
  //   }
  //   let closeButton = iframeBody.querySelector("#closeBtn");
  //   if (closeButton) {
  //     modal
  //       .querySelector("button.uk-modal-close")
  //       .addEventListener("click", function (event) {
  //         event.preventDefault();
  //         closeButton.dispatchEvent(new Event("click"));
  //         document.location.reload();
  //       });
  //   }
  //if (iframeSave) {
  //let preview = document.querySelector("iframe[name]");
  //preview.contentWindow.location = preview.contentWindow.location;
  //iframeSave = false;
  //document
  //.querySelector("yo-preview-iframe > iframe")
  //.contentWindow.location.reload();
  //}
  //});
}

setTimeout(function ($) {
  jQuery(document).ready(function () {
    let debug = false;
    let letiable = "";
    let ukTooltipHover = "";
    let ukTooltipBlur = "";

    //show non breaking spaces
    jQuery(document).on("click", ".nbsp", function (e) {
      e.preventDefault();
      var newScript = document.createElement("script");
      var preview = document.querySelector(
        "div.yo-customizer > div.yo-preview > div > iframe"
      );
      newScript.type = "text/javascript";
      newScript.text = `function shownbsp() {
        UIkit.util.$$('*').forEach(function(el) {
          el.innerHTML = el.innerHTML.replace(/&nbsp;/g,'<span class="pbtspace">&nbsp;</span>');
       });  
      }setTimeout(shownbsp, 500);`;
      var newStyle = `<style>.pbtspace::after {   content: " ";   position: absolute;   transform: translate(-5px, 12px);   width: 5px;   height: 5px;   border-radius: 50%;   background-color: red;   -webkit-animation: pbtpulse 2s linear infinite;   animation: pbtpulse 2s infinite; } @-webkit-keyframes pbtpulse {   0% {     -webkit-box-shadow: 0 0 0 0 rgba(255, 13, 13, 0.4);   }   70% {     -webkit-box-shadow: 0 0 0 10px rgba(255, 13, 13, 0.6);   }   100% {     -webkit-box-shadow: 0 0 0 0 rgba(255, 13, 13, 0.8);   } }  @keyframes pbtpulse {   0% {     -moz-box-shadow: 0 0 0 0 rgba(255, 13, 13, 0.4);     box-shadow: 0 0 0 0 rgba(255, 13, 13, 0.4);   }   70% {     -moz-box-shadow: 0 0 0 10px rgba(255, 13, 13, 0);     box-shadow: 0 0 0 10px rgba(255, 13, 13, 0);   }   100% {     -moz-box-shadow: 0 0 0 0 rgba(255, 13, 13, 0);     box-shadow: 0 0 0 0 rgba(255, 13, 13, 0);   } }</style>`;
      preview.contentWindow.document.body.insertAdjacentHTML(
        "beforeend",
        newStyle
      );
      preview.contentWindow.document.body.appendChild(newScript);
    });

    function watchChanges() {
      //let selector = ".uk-tooltip.uk-active";
      let selector = ".uk-tooltip.uk-active > div.uk-tooltip-inner";
      let elem = document.querySelector(selector);
      //console.log(elem);
      if (elem) {
        letiable = elem.innerHTML;
      } else {
        setTimeout(watchChanges, 300);
      }
    }

    //copy LESS vars and debug
    jQuery(document).on("click", ".debug", function (e) {
      e.preventDefault();
      let dataDebug = jQuery(this).data("debug");
      if (dataDebug == "off") {
        debug = true;
        let layout = document.querySelector(
          "body > div.yo-customizer > div.yo-preview > div > iframe"
        ).contentWindow.$customizer;

        jQuery(this).data("debug", "on");
        jQuery(this).css("opacity", "1");
        sendnotify("lifesaver", "open the browser's console log", 2000);
        jQuery(".yo-sidebar-fields").each(function () {
          /*console.log($(this).find("span").attr('uk-tooltip')); */
          jQuery(this)
            .find("span")
            .attr("uk-tooltip", "delay: 100; pos: top-left");
        });
        if (typeof layout.page !== "undefined") {
          console.log("%c↓↓↓ - Current JSON layout - ↓↓↓", "color:#018a9c");
          console.log(JSON.stringify(layout.page.content));
          console.log(
            "%c→ → → Check the markup on https://jsonlint.com",
            "color:#018a9c"
          );
          size = ((byteCount(layout.page.content) * 100) / 16777215).toFixed(2);
          if (size < 70) {
            console.log(
              "%cCurrent layout size: " + size + "%",
              "color:#539e09"
            );
          } else if (size < 90) {
            console.log("%cCurrent layout size: " + size + "%", "color:orange");
          } else if (size > 90) {
            console.log(
              "%cCurrent layout size: " + size + "%",
              "color:#ff3e4b"
            );
          }
        } else if (typeof layout.template !== "undefined") {
          console.log("%cCurrent template:" + layout.template, "color:#539e09");
          console.log("%c↓↓↓ - JSON layout - ↓↓↓", "color:#018a9c");
          console.log(JSON.stringify($builder.templates));
          console.log(
            "%c→ → → Check the markup on https://jsonlint.com",
            "color:#018a9c"
          );
        }
        console.log("Max Input Vars: " + pbt.MIV + " | recommended: 10 000");
        console.log("Post Max Size: " + pbt.PMS + " | recommended: > 16M");
        //$customizer.config.custom_less.attrs.debounce = 5000;
      } else {
        debug = false;
        jQuery(this).data("debug", "off");
        jQuery(this).css("opacity", "0.5");
        jQuery(".yo-sidebar-fields").each(function () {
          /* console.log($(this).find("span").attr('uk-tooltip')); */
          jQuery(this)
            .find("span")
            .attr("uk-tooltip", "delay: 100; pos: top-left");
        });
      }
    });

    jQuery(document).on(
      "mouseenter",
      ".yo-sidebar-fields span[uk-tooltip]:not(.uk-invisible-hover)",
      function () {
        if (debug) {
          watchChanges();
          // console.log("watch");
        } else {
          //  console.log("no debug");
        }
      }
    );

    jQuery(document).on(
      "click",
      ".yo-sidebar-fields span[uk-tooltip]:not(.uk-invisible-hover)",
      function () {
        if (letiable === "") {
          //console.log("run");
          return;
        }

        if (debug) {
          console.log(letiable);

          if (!navigator.clipboard) {
            unsecuredCopyToClipboard(letiable);
          } else {
            navigator.clipboard.writeText(letiable);
          }

          sendnotify("copy", letiable, 500);
          letiable = "";
        }
      }
    );

    //copy library entries shortcode by right click
    jQuery(document).on("mousedown", ".uk-select", function (event) {
      if (event.button == 2) {
        jQuery(this).contextmenu(function () {
          return false;
        });
        SortSelect(this);
      }
    });

    //copy input value
    jQuery(document).on("click", ".yo-sidebar-section", function (e) {
      //console.log("section click");
      //Auto Height for Select
      if (getCookie("builder_darkmode") == 1) {
        setTimeout(function () {
          jQuery("img").css({
            filter:
              "brightness(" + document.querySelector("#bright").value + ")",
          });
        }, 1500);
      }
      let items = document.querySelectorAll(".uk-select.uk-height-small");
      for (var i = 0; i < items.length; i++) {
        jQuery(items[i])
          .parent()
          .before(
            "<div>Use <code class='select" +
              i +
              "'>right click</code> to sort the option list | Switch to <code class='chosen" +
              i +
              "'>chosen</code> mode</div>"
          );
        jQuery(items[i]).attr("class", "uk-select select" + i + "");
        jQuery(items[i]).attr("size", items[i].length);
        jQuery(document).on("click", "code.select" + i, function (e) {
          els = jQuery(e.target).parent().next().children()[0];
          SortSelect(els);
        });
        //add chosen
        jQuery(document).on("click", "code.chosen" + i, function (e) {
          els = jQuery(e.target).parent().next().children()[0];
          jQuery(els).chosen({
            width: "100%",
            no_results_text: "Not found",
          });
        });
      }
      jQuery(document).on("click", "a[uk-icon='table']", function (e) {
        //console.log(e);
        //e.stopPropagation();
        finder_preview();
      });

      //  function set_media_columns() {
      //  console.log("set columns0");
      //const panel = document.querySelector(".yo-finder-body");
      //jQuery(".yo-finder-body").length > 0
      //? panel.classList.add("eight")
      //: console.log("set columns1");
      //if (panel.length) panel.classList.add("eight");
      //}

      /*  jQuery(".uk-margin-small").mouseenter(function () {
        let button;
        let textbox = jQuery(this).children().first();
        let inputsize = textbox.width();
        let sidebarsize = jQuery(".yo-sidebar").width();
        if (
          textbox.is("input:text") &&
          textbox.is(":enabled") &&
          textbox.val()
        ) {
          if (!(textbox.children(".copy").length === 0)) {
            button = textbox.jQuery(".copy");
          } else {
            //jQuery(this).addClass("uk-inline");
            button = jQuery(
              '<span class="uk-form-icon uk-form-icon-flip copy" uk-icon="icon: copy"></span>'
            );
          }
          button.insertBefore(textbox);
          //button.css('right',sidebarsize-inputsize-60+'px');
          button.click(function () {
            textbox.select();
            document.execCommand("copy");
            textbox.next("span").remove();
          });
        }
      });

      jQuery(".uk-margin-small").mouseleave(function () {
        let textbox = jQuery(this).children().first();
        if (
          textbox.is("input:text") &&
          textbox.is(":enabled") &&
          textbox.val()
        ) {
          textbox.next("span").remove();
        }
      });
*/

      //Hover to preview image
      setTimeout(function () {
        jQuery(".uk-icon.uk-icon-image.yo-nav-image").hover(
          function (e) {
            if (
              !jQuery(this).children("#pop-up").length > 0 ||
              !jQuery(this).css("background-image") ||
              jQuery(this).children("#pop-up img").src == "none"
            ) {
              //remove if src = none
              if (jQuery(this).children("#pop-up").length > 0)
                jQuery(this).children("#pop-up").hide();
              //create pop-up
              var bg = jQuery(this).css("background-image");
              bg = bg.replace("url(", "").replace(")", "").replace(/\"/gi, "");
              var br = 1;
              if (getCookie("builder_darkmode") == 1) {
                br = document.querySelector("#bright").value;
              }
              jQuery(this).append(
                '<div id="pop-up"><img id="hoverimage" style="filter:brightness(' +
                  br +
                  ')" src="' +
                  bg +
                  '"/></div>'
              );
              jQuery(this).children("#pop-up").show();
            } else if (
              jQuery(this).children("#pop-up").children("#hoverimage").length >
              0
            ) {
              jQuery(this).children("#pop-up").show();
            }
          },
          function () {
            jQuery("div#pop-up").hide();
            //jQuery("div#pop-up").remove();
          }
        );
        jQuery("a > span.uk-icon.uk-icon-image.yo-nav-image").mousemove(
          function (e) {
            var moveLeft = 65;
            var moveDown = 5;
            jQuery(this)
              .children("#pop-up")
              .css("top", moveDown)
              .css("left", moveLeft);
          }
        );
      }, 1500);

      //finder panel
      function finder_preview() {
        jQuery(".yo-finder-body td > img").hover(
          function (e) {
            if (!jQuery(this).siblings("#pop-up").length > 0) {
              //console.log(jQuery(this)[0]);
              var bg = jQuery(this)[0].src;
              var br = 1;
              if (getCookie("builder_darkmode") == 1) {
                br = document.querySelector("#bright").value;
              }
              jQuery(this).after(
                '<div id="pop-up"><img id="hoverimage" style="filter:brightness(' +
                  br +
                  ')" src="' +
                  bg +
                  '"/></div>'
              );
              jQuery(this).siblings("#pop-up").show();
            } else if (
              jQuery(this).siblings("#pop-up").children("#hoverimage").length >
              0
            ) {
              jQuery(this).siblings("#pop-up").show();
            }
          },
          function () {
            jQuery("div#pop-up").hide();
            //jQuery("div#pop-up").remove();
          }
        );
        jQuery(".yo-finder-body td>img").mousemove(function (e) {
          //console.log(jQuery(this)[0].getBoundingClientRect());
          jQuery(this)
            .siblings("#pop-up")
            .css("top", jQuery(this)[0].getBoundingClientRect().top - 54)
            .css("left", 175);
        });
      }
      setTimeout(function () {
        finder_preview();
      }, 1500);

      //end
    });

    //fix sidebar margin
    if (jQuery("#device-size").is(":visible")) {
      jQuery(".yo-sidebar-content").css({
        bottom: "145px",
      });
    }
    function Sort(el) {
      console.log(jQuery(el));
      var target = "select" + String(el);
      console.log(document.querySelector(target));
      SortSelect(document.querySelector("select" + String(el)));
    }
    //Sorting select options
    function SortSelect(el) {
      var sel = jQuery(el);
      //console.log(jQuery("select option", el).context);
      var selected = sel.val(); // cache selected value, before reordering
      var opts_list = sel.find("option");
      opts_list.sort(function (a, b) {
        return jQuery(a).text().toLowerCase() > jQuery(b).text().toLowerCase()
          ? 1
          : -1;
      });
      sel.html("").append(opts_list);
      sel.val(selected);
    }

    //display image info
    function getSafe(iTime) {
      try {
        if (iTime.transferSize) return iTime.transferSize;
        else if (iTime.encodedBodySize) return iTime.encodedBodySize;
        else if (iTime.decodedBodySize) return iTime.decodedBodySize;
      } catch (e) {
        return "";
      }
    }

    function getSize() {
      if (!jQuery("div").is(".imghint")) return;
      if (
        jQuery(".yo-thumbnail").children("img").attr("src").indexOf("http") !==
        -1
      ) {
        url = jQuery(".yo-thumbnail").children("img").attr("src");
      } else {
        url =
          window.location.protocol +
          "//" +
          document.location.hostname +
          "" +
          jQuery(".yo-thumbnail").children("img").attr("src");
      }
      //console.log(url);
      let exactSize = "";
      if (url && url.length > 0) {
        performance.getEntries();
        iTime = performance.getEntriesByName(url)[0];
        //console.log(iTime);
        size = getSafe(iTime);
        let fSExt = new Array("Bytes", "Kb", "Mb", "Gb"),
          i = 0;
        while (size > 900) {
          size /= 1024;
          i++;
        }
        size
          ? (exactSize = Math.round(size * 100) / 100 + " " + fSExt[i])
          : (exactSize = "");
      }
      if (jQuery(".imghint").length != 0 && exactSize) {
        jQuery(".imghint")
          .children("#filesize")
          .html("| " + exactSize);
      }
      //console.log(exactSize);
    }
    var field = 0;
    function dii() {
      if (jQuery("div").is(".uk-modal-container.uk-modal.uk-open")) return;
      //console.log("dii start");
      //FillAlt();
      if (jQuery(".yo-thumbnail").length === 0) return;
      i = 0;
      jQuery(".yo-thumbnail").each(function () {
        //console.log(jQuery(this));
        // console.log("dii found");
        ++i;
        if (jQuery(this).length === 0) return;
        let w = jQuery(this).children("img").get(0).naturalWidth;
        let h = jQuery(this).children("img").get(0).naturalHeight;
        let r = gcd(w, h);

        if (jQuery("div").is(".imghint.t" + i)) {
          jQuery(this)
            .find("div.imghint.t" + i)
            .remove();
        }

        if (
          jQuery(this)
            .children("a")
            .children(".imghint.t" + i).length < 1
        ) {
          jQuery(this)
            .children("a")
            .after(
              '<div uk-tooltip="title: Click to fill the image size; delay: 500" class="imghint t' +
                i +
                '">' +
                '<span class="imghint-sizeimage t' +
                i +
                '"  data-width="' +
                w +
                '" data-height="' +
                h +
                '">' +
                w +
                "x" +
                h +
                " px</span> | " +
                w / r +
                ":" +
                h / r +
                '<span id="filesize"></span></div>'
            );
        }

        //insert image sizes

        //image element
        parents_inp = jQuery(this)
          .parents(".yo-sidebar-fields")
          .children("div:eq(1)")
          .children(".yo-sidebar-grid");
        //overlay element
        if (!jQuery(parents_inp).length) {
          parents_inp = jQuery(this)
            .parents(".yo-sidebar-fields")
            .children("div:eq(3)")
            .children(".yo-sidebar-grid");
        }
        //panel element
        if (!jQuery(parents_inp).length) {
          parents_inp = jQuery(".imghint-sizeimage.t" + i)
            .parents(".yo-sidebar-fields")
            .children("div:eq(4)")
            .children(".yo-sidebar-grid");
        }
        //map element
        if (!jQuery(parents_inp).length) {
          parents_inp = jQuery(".imghint-sizeimage.t" + i)
            .parents(".yo-sidebar-fields")
            .children("div:eq(7)")
            .children(".yo-sidebar-grid");
        }

        //mobile logo
        if (i == 2) {
          parents_inp = jQuery(".imghint-sizeimage.t" + i)
            .parents(".yo-sidebar-fields")
            .children("div:eq(6)")
            .children(".yo-sidebar-grid");
          //console.log(parents_inp.length);
          //map cluster
          if (!parents_inp.length) {
            parents_inp = jQuery(".imghint-sizeimage.t" + i)
              .parents(".yo-sidebar-fields")
              .children("div:eq(6)")
              .children(".yo-sidebar-grid");
          }
          //console.log(parents_inp.length);
        }
        //dialog logo
        if (i == 3) {
          parents_inp = jQuery(".imghint-sizeimage.t" + i)
            .parents(".yo-sidebar-fields")
            .children("div:eq(9)")
            .children(".yo-sidebar-grid");
        }
        //custom map marker
        if (i == 4) {
          parents_inp = jQuery(".imghint-sizeimage.t" + i)
            .parents(".yo-sidebar-fields")
            .children("div:eq(13)")
            .children(".yo-sidebar-grid");
        }
        inp_width = parents_inp.children("div:eq(0)").find("input");

        inp_height = parents_inp.children("div:eq(1)").find("input");
        if (inp_width.length > 0) {
          //if (!inp_width.hasClass("t1") && !inp_width.hasClass("t2")) {
          inp_width.attr("data-width", w).addClass("img-width-inp t" + i);
          inp_height.attr("data-height", h).addClass("img-height-inp t" + i);
          //}
          if (!inp_width.val().length) {
            //inp_width.focus();
            if (inp_height.val().length) {
              inp_width.val(((inp_height.val() * w) / h).toFixed(0));
            } else {
              inp_width.val(w);
            }
            //console.log("set width done");
            // height y = ((x * h) / w).toFixed(0);

            //emulate input event to customizer
            document
              .querySelector(".img-width-inp.t" + i)
              .addEventListener("input", function (evt) {});
            document
              .querySelector(".img-width-inp.t" + i)
              .dispatchEvent(new Event("input", { composed: true }));
          }
          if (!inp_height.val().length) {
            //inp_height.focus();
            if (inp_width.val().length) {
              inp_height.val(
                //((inp_width.val() * w) / inp_height.val()).toFixed(0)
                ((h * inp_width.val()) / w).toFixed(0)
              );
            } else {
              inp_height.val(h);
            }

            document
              .querySelector(".img-height-inp.t" + i)
              .addEventListener("input", function (evt) {});
            document
              .querySelector(".img-height-inp.t" + i)
              .dispatchEvent(new Event("input", { composed: true }));
          }
          inp_width.parent("div").addClass("parent-icon-link t" + i);

          if (inp_width.parent("div").children(".icon-link").length > 0) {
          }
          if (!jQuery(".img-width-inp.t" + field + " + .icon-link").length) {
            if (Number(inp_width.val()) / Number(inp_height.val()) == w / h) {
              inp_width.after(
                '<div class="icon-link connect t' + i + '"></div>'
              );
            } else {
              inp_width.after(
                '<div class="icon-link no-connect t' + i + '"></div>'
              );
            }
          }
        }
        ext = false;
        img = jQuery(this).next(".uk-margin-small-top").children("input").val();
        if (!img) {
          img = jQuery(this).next().find(".uk-input.yo-input-iconnav-right");
        } else {
          if (img.substring(0, 4) == "http") {
            ext = true;
          } else {
            ext = false;
          }
        }
        //lock icon
        if (
          jQuery(this)
            .next()
            .find("div.uk-transition-fade.uk-position-top-left").length
        ) {
          jQuery(this)
            .next()
            .find("div.uk-transition-fade.uk-position-top-left")
            .remove();
        }
        if (ext) {
          icon_lock =
            '<div class="uk-transition-fade uk-position-top-left yo-thumbnail-badge2 uk-light"><a href="" uk-icon="warning" uk-tooltip="title: Images with the domain name will not be cached and dynamically resized on the front side of the site! Click to unlock the cache/resize.; delay: 500" class="uk-icon-link src uk-icon" aria-expanded="false"></a></div>';
        } else {
          icon_lock =
            '<div class="uk-transition-fade uk-position-top-left yo-thumbnail-badge uk-light"><a href="" title="" uk-icon="lock" uk-tooltip="title: Disable cache/resize; delay: 500" class="src uk-icon-link uk-icon"></a></div>';
        }
        jQuery(this).append(icon_lock);
        //download icon
        if (
          jQuery(this)
            .next()
            .find("div.uk-transition-fade.uk-position-bottom-left").length
        ) {
          jQuery(this)
            .next()
            .find("div.uk-transition-fade.uk-position-bottom-left")
            .remove();
        }
        icon_lock =
          '<div class="uk-transition-fade uk-position-bottom-left yo-thumbnail-badge uk-light"><a href="" title="" uk-icon="download" uk-tooltip="title: Download image; delay: 500" class="uk-icon-link uk-icon dwn"></a></div>';
        jQuery(this).append(icon_lock);

        try {
          getSize();
        } catch (e) {
          return;
        }

        //console.log(jQuery(this).children("img").get(0));
        jQuery(this).children("img").get(0).onload = function () {
          getSize();
          // console.log(1);
        };
        //  jQuery(this).children("img").get(0).onerror = function () {
        //    console.log(2);
        //     setTimeout(getSize, 1000);
        //};
      });
      field = 0;
    }

    jQuery(".yo-sidebar-content").on("click", function (e) {
      const selList = [
        { Id: 1, Name: "uk-accordion-content" },
        { Id: 2, Name: "uk-active" },
        { Id: 3, Name: "uk-alert-close" },
        { Id: 4, Name: "uk-alert-danger" },
        { Id: 5, Name: "uk-alert-primary" },
        { Id: 6, Name: "uk-alert-success" },
        { Id: 7, Name: "uk-alert-warning" },
        { Id: 8, Name: "uk-align-center" },
        { Id: 9, Name: "uk-align-right" },
        { Id: 10, Name: "uk-animation-fade" },
        { Id: 11, Name: "uk-animation-fast" },
        { Id: 12, Name: "uk-animation-kenburns" },
        { Id: 13, Name: "uk-animation-reverse" },
        { Id: 14, Name: "uk-animation-scale-down" },
        { Id: 15, Name: "uk-animation-scale-up" },
        { Id: 16, Name: "uk-animation-shake" },
        { Id: 17, Name: "uk-animation-slide-bottom" },
        { Id: 18, Name: "uk-animation-slide-bottom-medium" },
        { Id: 19, Name: "uk-animation-slide-bottom-small" },
        { Id: 20, Name: "uk-animation-slide-left" },
        { Id: 21, Name: "uk-animation-slide-left-medium" },
        { Id: 22, Name: "uk-animation-slide-left-small" },
        { Id: 23, Name: "uk-animation-slide-right" },
        { Id: 24, Name: "uk-animation-slide-right-medium" },
        { Id: 25, Name: "uk-animation-slide-right-small" },
        { Id: 26, Name: "uk-animation-slide-top" },
        { Id: 27, Name: "uk-animation-slide-top-medium" },
        { Id: 28, Name: "uk-animation-slide-top-small" },
        { Id: 29, Name: "uk-animation-stroke" },
        { Id: 30, Name: "uk-animation-toggle" },
        { Id: 31, Name: "uk-article-meta" },
        { Id: 32, Name: "uk-article-title" },
        { Id: 33, Name: "uk-background-blend-color" },
        { Id: 34, Name: "uk-background-blend-color-burn" },
        { Id: 35, Name: "uk-background-blend-color-dodge" },
        { Id: 36, Name: "uk-background-blend-darken" },
        { Id: 37, Name: "uk-background-blend-difference" },
        { Id: 38, Name: "uk-background-blend-exclusion" },
        { Id: 39, Name: "uk-background-blend-hard-light" },
        { Id: 40, Name: "uk-background-blend-hue" },
        { Id: 41, Name: "uk-background-blend-lighten" },
        { Id: 42, Name: "uk-background-blend-luminosity" },
        { Id: 43, Name: "uk-background-blend-multiply" },
        { Id: 44, Name: "uk-background-blend-overlay" },
        { Id: 45, Name: "uk-background-blend-saturation" },
        { Id: 46, Name: "uk-background-blend-screen" },
        { Id: 47, Name: "uk-background-blend-soft-light" },
        { Id: 48, Name: "uk-background-bottom-center" },
        { Id: 49, Name: "uk-background-bottom-left" },
        { Id: 50, Name: "uk-background-bottom-right" },
        { Id: 51, Name: "uk-background-center-center" },
        { Id: 52, Name: "uk-background-center-left" },
        { Id: 53, Name: "uk-background-center-right" },
        { Id: 54, Name: "uk-background-contain" },
        { Id: 55, Name: "uk-background-cover" },
        { Id: 56, Name: "uk-background-height-1-1" },
        { Id: 57, Name: "uk-background-muted" },
        { Id: 58, Name: "uk-background-norepeat" },
        { Id: 59, Name: "uk-background-primary" },
        { Id: 60, Name: "uk-background-secondary" },
        { Id: 61, Name: "uk-background-top-center" },
        { Id: 62, Name: "uk-background-top-left" },
        { Id: 63, Name: "uk-background-top-right" },
        { Id: 64, Name: "uk-background-width-1-1" },
        { Id: 65, Name: "uk-blend-color" },
        { Id: 66, Name: "uk-blend-color-burn" },
        { Id: 67, Name: "uk-blend-color-dodge" },
        { Id: 68, Name: "uk-blend-darken" },
        { Id: 69, Name: "uk-blend-difference" },
        { Id: 70, Name: "uk-blend-exclusion" },
        { Id: 71, Name: "uk-blend-hard-light" },
        { Id: 72, Name: "uk-blend-hue" },
        { Id: 73, Name: "uk-blend-lighten" },
        { Id: 74, Name: "uk-blend-luminosity" },
        { Id: 75, Name: "uk-blend-multiply" },
        { Id: 76, Name: "uk-blend-overlay" },
        { Id: 77, Name: "uk-blend-saturation" },
        { Id: 78, Name: "uk-blend-screen" },
        { Id: 79, Name: "uk-blend-soft-light" },
        { Id: 80, Name: "uk-border-circle" },
        { Id: 81, Name: "uk-border-pill" },
        { Id: 82, Name: "uk-border-rounded" },
        { Id: 83, Name: "uk-box-shadow-bottom" },
        { Id: 84, Name: "uk-box-shadow-hover-large" },
        { Id: 85, Name: "uk-box-shadow-hover-medium" },
        { Id: 86, Name: "uk-box-shadow-hover-small" },
        { Id: 87, Name: "uk-box-shadow-hover-xlarge" },
        { Id: 88, Name: "uk-box-shadow-large" },
        { Id: 89, Name: "uk-box-shadow-medium" },
        { Id: 90, Name: "uk-box-shadow-small" },
        { Id: 91, Name: "uk-box-shadow-xlarge" },
        { Id: 92, Name: "uk-button-danger" },
        { Id: 93, Name: "uk-button-default" },
        { Id: 94, Name: "uk-button-group" },
        { Id: 95, Name: "uk-button-large" },
        { Id: 96, Name: "uk-button-link" },
        { Id: 97, Name: "uk-button-primary" },
        { Id: 98, Name: "uk-button-secondary" },
        { Id: 99, Name: "uk-button-small" },
        { Id: 100, Name: "uk-button-text" },
        { Id: 101, Name: "uk-card-badge" },
        { Id: 102, Name: "uk-card-body" },
        { Id: 103, Name: "uk-card-default" },
        { Id: 104, Name: "uk-card-footer" },
        { Id: 105, Name: "uk-card-header" },
        { Id: 106, Name: "uk-card-hover" },
        { Id: 107, Name: "uk-card-large" },
        { Id: 108, Name: "uk-card-media-bottom" },
        { Id: 109, Name: "uk-card-media-left" },
        { Id: 110, Name: "uk-card-media-right" },
        { Id: 111, Name: "uk-card-media-top" },
        { Id: 112, Name: "uk-card-primary" },
        { Id: 113, Name: "uk-card-secondary" },
        { Id: 114, Name: "uk-card-small" },
        { Id: 115, Name: "uk-card-title" },
        { Id: 116, Name: "uk-checkbox" },
        { Id: 117, Name: "uk-child-width-1-2" },
        { Id: 118, Name: "uk-child-width-1-3" },
        { Id: 119, Name: "uk-child-width-1-4" },
        { Id: 120, Name: "uk-child-width-1-5" },
        { Id: 121, Name: "uk-child-width-1-6" },
        { Id: 122, Name: "uk-child-width-auto" },
        { Id: 123, Name: "uk-child-width-expand" },
        { Id: 124, Name: "uk-clearfix" },
        { Id: 125, Name: "uk-column-1-2" },
        { Id: 126, Name: "uk-column-1-3" },
        { Id: 127, Name: "uk-column-1-4" },
        { Id: 128, Name: "uk-column-1-5" },
        { Id: 129, Name: "uk-column-1-6" },
        { Id: 130, Name: "uk-column-divider" },
        { Id: 131, Name: "uk-column-span" },
        { Id: 132, Name: "uk-comment-avatar" },
        { Id: 133, Name: "uk-comment-body" },
        { Id: 134, Name: "uk-comment-header" },
        { Id: 135, Name: "uk-comment-list" },
        { Id: 136, Name: "uk-comment-meta" },
        { Id: 137, Name: "uk-comment-primary" },
        { Id: 138, Name: "uk-comment-title" },
        { Id: 139, Name: "uk-container-expand" },
        { Id: 140, Name: "uk-container-large" },
        { Id: 141, Name: "uk-container-small" },
        { Id: 142, Name: "uk-container-xlarge" },
        { Id: 143, Name: "uk-container-xsmall" },
        { Id: 144, Name: "uk-countdown-hours" },
        { Id: 145, Name: "uk-countdown-label" },
        { Id: 146, Name: "uk-countdown-minutes" },
        { Id: 147, Name: "uk-countdown-number" },
        { Id: 148, Name: "uk-countdown-seconds" },
        { Id: 149, Name: "uk-countdown-separator" },
        { Id: 150, Name: "uk-cover-container" },
        { Id: 151, Name: "uk-dark" },
        { Id: 152, Name: "uk-description-list-divider" },
        { Id: 153, Name: "uk-disabled" },
        { Id: 154, Name: "uk-display-block" },
        { Id: 155, Name: "uk-display-inline" },
        { Id: 156, Name: "uk-display-inline-block" },
        { Id: 157, Name: "uk-divider-small" },
        { Id: 158, Name: "uk-divider-vertical" },
        { Id: 159, Name: "uk-dotnav-vertical" },
        { Id: 160, Name: "uk-drag" },
        { Id: 161, Name: "uk-dragover" },
        { Id: 162, Name: "uk-dropbar" },
        { Id: 163, Name: "uk-dropbar-large" },
        { Id: 164, Name: "uk-dropbar-top" },
        { Id: 165, Name: "uk-dropcap" },
        { Id: 166, Name: "uk-dropdown-large" },
        { Id: 167, Name: "uk-dropdown-nav" },
        { Id: 168, Name: "uk-drop-grid" },
        { Id: 169, Name: "uk-fieldset" },
        { Id: 170, Name: "uk-flex-1" },
        { Id: 171, Name: "uk-flex-around" },
        { Id: 172, Name: "uk-flex-auto" },
        { Id: 173, Name: "uk-flex-between" },
        { Id: 174, Name: "uk-flex-bottom" },
        { Id: 175, Name: "uk-flex-center" },
        { Id: 176, Name: "uk-flex-column" },
        { Id: 177, Name: "uk-flex-column-reverse" },
        { Id: 178, Name: "uk-flex-first" },
        { Id: 179, Name: "uk-flex-inline" },
        { Id: 180, Name: "uk-flex-last" },
        { Id: 181, Name: "uk-flex-left" },
        { Id: 182, Name: "uk-flex-middle" },
        { Id: 183, Name: "uk-flex-none" },
        { Id: 184, Name: "uk-flex-nowrap" },
        { Id: 185, Name: "uk-flex-right" },
        { Id: 186, Name: "uk-flex-row" },
        { Id: 187, Name: "uk-flex-row-reverse" },
        { Id: 188, Name: "uk-flex-stretch" },
        { Id: 189, Name: "uk-flex-top" },
        { Id: 190, Name: "uk-flex-wrap" },
        { Id: 191, Name: "uk-flex-wrap-around" },
        { Id: 192, Name: "uk-flex-wrap-between" },
        { Id: 193, Name: "uk-flex-wrap-bottom" },
        { Id: 194, Name: "uk-flex-wrap-middle" },
        { Id: 195, Name: "uk-flex-wrap-reverse" },
        { Id: 196, Name: "uk-flex-wrap-stretch" },
        { Id: 197, Name: "uk-flex-wrap-top" },
        { Id: 198, Name: "uk-float-left" },
        { Id: 199, Name: "uk-float-right" },
        { Id: 200, Name: "uk-form-blank" },
        { Id: 201, Name: "uk-form-controls" },
        { Id: 202, Name: "uk-form-controls-text" },
        { Id: 203, Name: "uk-form-danger" },
        { Id: 204, Name: "uk-form-horizontal" },
        { Id: 205, Name: "uk-form-icon" },
        { Id: 206, Name: "uk-form-icon-flip" },
        { Id: 207, Name: "uk-form-label" },
        { Id: 208, Name: "uk-form-large" },
        { Id: 209, Name: "uk-form-small" },
        { Id: 210, Name: "uk-form-stacked" },
        { Id: 211, Name: "uk-form-success" },
        { Id: 212, Name: "uk-form-width-large" },
        { Id: 213, Name: "uk-form-width-medium" },
        { Id: 214, Name: "uk-form-width-small" },
        { Id: 215, Name: "uk-form-width-xsmall" },
        { Id: 216, Name: "uk-grid" },
        { Id: 217, Name: "uk-grid-collapse" },
        { Id: 218, Name: "uk-grid-column-collapse" },
        { Id: 219, Name: "uk-grid-column-large" },
        { Id: 220, Name: "uk-grid-column-medium" },
        { Id: 221, Name: "uk-grid-column-small" },
        { Id: 222, Name: "uk-grid-divider" },
        { Id: 223, Name: "uk-grid-item-match" },
        { Id: 224, Name: "uk-grid-large" },
        { Id: 225, Name: "uk-grid-match" },
        { Id: 226, Name: "uk-grid-medium" },
        { Id: 227, Name: "uk-grid-row-collapse" },
        { Id: 228, Name: "uk-grid-row-large" },
        { Id: 229, Name: "uk-grid-row-medium" },
        { Id: 230, Name: "uk-grid-row-small" },
        { Id: 231, Name: "uk-grid-small" },
        { Id: 232, Name: "uk-h1" },
        { Id: 233, Name: "uk-h2" },
        { Id: 234, Name: "uk-h3" },
        { Id: 235, Name: "uk-h4" },
        { Id: 236, Name: "uk-h5" },
        { Id: 237, Name: "uk-h6" },
        { Id: 238, Name: "uk-heading-2xlarge" },
        { Id: 239, Name: "uk-heading-bullet" },
        { Id: 240, Name: "uk-heading-divider" },
        { Id: 241, Name: "uk-heading-large" },
        { Id: 242, Name: "uk-heading-line" },
        { Id: 243, Name: "uk-heading-medium" },
        { Id: 244, Name: "uk-heading-xlarge" },
        { Id: 245, Name: "uk-height-large" },
        { Id: 246, Name: "uk-height-max-large" },
        { Id: 247, Name: "uk-height-max-medium" },
        { Id: 248, Name: "uk-height-max-small" },
        { Id: 249, Name: "uk-height-medium" },
        { Id: 250, Name: "uk-height-small" },
        { Id: 251, Name: "uk-hidden-hover" },
        { Id: 252, Name: "uk-hidden-notouch" },
        { Id: 253, Name: "uk-hidden-touch" },
        { Id: 254, Name: "uk-icon-button" },
        { Id: 255, Name: "uk-icon-image" },
        { Id: 256, Name: "uk-iconnav-vertical" },
        { Id: 257, Name: "uk-inline" },
        { Id: 258, Name: "uk-inline-clip" },
        { Id: 259, Name: "uk-invisible" },
        { Id: 260, Name: "uk-invisible-hover" },
        { Id: 261, Name: "uk-label-danger" },
        { Id: 262, Name: "uk-label-success" },
        { Id: 263, Name: "uk-label-warning" },
        { Id: 264, Name: "uk-legend" },
        { Id: 265, Name: "uk-light" },
        { Id: 266, Name: "uk-link-heading" },
        { Id: 267, Name: "uk-link-reset" },
        { Id: 268, Name: "uk-link-text" },
        { Id: 269, Name: "uk-link-toggle" },
        { Id: 270, Name: "uk-list-bullet" },
        { Id: 271, Name: "uk-list-circle" },
        { Id: 272, Name: "uk-list-collapse" },
        { Id: 273, Name: "uk-list-decimal" },
        { Id: 274, Name: "uk-list-disc" },
        { Id: 275, Name: "uk-list-divider" },
        { Id: 276, Name: "uk-list-emphasis" },
        { Id: 277, Name: "uk-list-hyphen" },
        { Id: 278, Name: "uk-list-large" },
        { Id: 279, Name: "uk-list-muted" },
        { Id: 280, Name: "uk-list-primary" },
        { Id: 281, Name: "uk-list-secondary" },
        { Id: 282, Name: "uk-list-square" },
        { Id: 283, Name: "uk-list-striped" },
        { Id: 284, Name: "uk-logo" },
        { Id: 285, Name: "uk-logo-inverse" },
        { Id: 286, Name: "uk-margin-auto" },
        { Id: 287, Name: "uk-margin-auto-bottom" },
        { Id: 288, Name: "uk-margin-auto-left" },
        { Id: 289, Name: "uk-margin-auto-right" },
        { Id: 290, Name: "uk-margin-auto-top" },
        { Id: 291, Name: "uk-margin-auto-vertical" },
        { Id: 292, Name: "uk-margin-bottom" },
        { Id: 293, Name: "uk-margin-large" },
        { Id: 294, Name: "uk-margin-large-bottom" },
        { Id: 295, Name: "uk-margin-large-left" },
        { Id: 296, Name: "uk-margin-large-right" },
        { Id: 297, Name: "uk-margin-large-top" },
        { Id: 298, Name: "uk-margin-left" },
        { Id: 299, Name: "uk-margin-medium" },
        { Id: 300, Name: "uk-margin-medium-bottom" },
        { Id: 301, Name: "uk-margin-medium-left" },
        { Id: 302, Name: "uk-margin-medium-right" },
        { Id: 303, Name: "uk-margin-medium-top" },
        { Id: 304, Name: "uk-margin-remove" },
        { Id: 305, Name: "uk-margin-remove-adjacent" },
        { Id: 306, Name: "uk-margin-remove-bottom" },
        { Id: 307, Name: "uk-margin-remove-first-child" },
        { Id: 308, Name: "uk-margin-remove-last-child" },
        { Id: 309, Name: "uk-margin-remove-left" },
        { Id: 310, Name: "uk-margin-remove-right" },
        { Id: 311, Name: "uk-margin-remove-top" },
        { Id: 312, Name: "uk-margin-remove-vertical" },
        { Id: 313, Name: "uk-margin-right" },
        { Id: 314, Name: "uk-margin-small" },
        { Id: 315, Name: "uk-margin-small-bottom" },
        { Id: 316, Name: "uk-margin-small-left" },
        { Id: 317, Name: "uk-margin-small-right" },
        { Id: 318, Name: "uk-margin-small-top" },
        { Id: 319, Name: "uk-margin-top" },
        { Id: 320, Name: "uk-margin-xlarge" },
        { Id: 321, Name: "uk-margin-xlarge-bottom" },
        { Id: 322, Name: "uk-margin-xlarge-left" },
        { Id: 323, Name: "uk-margin-xlarge-right" },
        { Id: 324, Name: "uk-margin-xlarge-top" },
        { Id: 325, Name: "uk-modal" },
        { Id: 326, Name: "uk-modal-body" },
        { Id: 327, Name: "uk-modal-close" },
        { Id: 328, Name: "uk-modal-close-default" },
        { Id: 329, Name: "uk-modal-close-default," },
        { Id: 330, Name: "uk-modal-close-full" },
        { Id: 331, Name: "uk-modal-close-full&#39;" },
        { Id: 332, Name: "uk-modal-close-outside" },
        { Id: 333, Name: "uk-modal-close-outside," },
        { Id: 334, Name: "uk-modal-container" },
        { Id: 335, Name: "uk-modal-dialog" },
        { Id: 336, Name: "uk-modal-footer" },
        { Id: 337, Name: "uk-modal-full" },
        { Id: 338, Name: "uk-modal-header" },
        { Id: 339, Name: "uk-modal-title" },
        { Id: 340, Name: "uk-nav" },
        { Id: 341, Name: "uk-navbar-center" },
        { Id: 342, Name: "uk-navbar-dropbar" },
        { Id: 343, Name: "uk-navbar-dropdown" },
        { Id: 344, Name: "uk-navbar-dropdown-nav" },
        { Id: 345, Name: "uk-navbar-dropdown-width-2" },
        { Id: 346, Name: "uk-navbar-dropdown-width-3" },
        { Id: 347, Name: "uk-navbar-dropdown-width-4" },
        { Id: 348, Name: "uk-navbar-dropdown-width-5" },
        { Id: 349, Name: "uk-navbar-item" },
        { Id: 350, Name: "uk-navbar-left" },
        { Id: 351, Name: "uk-navbar-nav" },
        { Id: 352, Name: "uk-navbar-right" },
        { Id: 353, Name: "uk-navbar-subtitle" },
        { Id: 354, Name: "uk-navbar-toggle" },
        { Id: 355, Name: "uk-navbar-toggle-animate" },
        { Id: 356, Name: "uk-navbar-transparent" },
        { Id: 357, Name: "uk-nav-center" },
        { Id: 358, Name: "uk-nav-default" },
        { Id: 359, Name: "uk-nav-divider" },
        { Id: 360, Name: "uk-nav-header" },
        { Id: 361, Name: "uk-nav-primary" },
        { Id: 362, Name: "uk-nav-secondary" },
        { Id: 363, Name: "uk-nav-sub" },
        { Id: 364, Name: "uk-nav-subtitle" },
        { Id: 365, Name: "uk-object-contain" },
        { Id: 366, Name: "uk-object-cover" },
        { Id: 367, Name: "uk-object-fill" },
        { Id: 368, Name: "uk-object-none" },
        { Id: 369, Name: "uk-object-position-bottom-center" },
        { Id: 370, Name: "uk-object-position-bottom-left" },
        { Id: 371, Name: "uk-object-position-bottom-right" },
        { Id: 372, Name: "uk-object-position-center-center" },
        { Id: 373, Name: "uk-object-position-center-left" },
        { Id: 374, Name: "uk-object-position-center-right" },
        { Id: 375, Name: "uk-object-position-top-center" },
        { Id: 376, Name: "uk-object-position-top-left" },
        { Id: 377, Name: "uk-object-position-top-right" },
        { Id: 378, Name: "uk-object-scale-down" },
        { Id: 379, Name: "uk-offcanvas-close" },
        { Id: 380, Name: "uk-open" },
        { Id: 381, Name: "uk-overflow-auto" },
        { Id: 382, Name: "uk-overflow-hidden" },
        { Id: 383, Name: "uk-overlay-default" },
        { Id: 384, Name: "uk-overlay-primary" },
        { Id: 385, Name: "uk-padding-large" },
        { Id: 386, Name: "uk-padding-remove" },
        { Id: 387, Name: "uk-padding-remove-bottom" },
        { Id: 388, Name: "uk-padding-remove-horizontal" },
        { Id: 389, Name: "uk-padding-remove-left" },
        { Id: 390, Name: "uk-padding-remove-right" },
        { Id: 391, Name: "uk-padding-remove-top" },
        { Id: 392, Name: "uk-padding-remove-vertical" },
        { Id: 393, Name: "uk-padding-small" },
        { Id: 394, Name: "uk-panel-scrollable" },
        { Id: 395, Name: "uk-parent" },
        { Id: 396, Name: "uk-position-absolute" },
        { Id: 397, Name: "uk-position-bottom" },
        { Id: 398, Name: "uk-position-bottom-center" },
        { Id: 399, Name: "uk-position-bottom-left" },
        { Id: 400, Name: "uk-position-bottom-right" },
        { Id: 401, Name: "uk-position-center" },
        { Id: 402, Name: "uk-position-center-left" },
        { Id: 403, Name: "uk-position-center-left-out" },
        { Id: 404, Name: "uk-position-center-right" },
        { Id: 405, Name: "uk-position-center-right-out" },
        { Id: 406, Name: "uk-position-cover" },
        { Id: 407, Name: "uk-position-fixed" },
        { Id: 408, Name: "uk-position-large" },
        { Id: 409, Name: "uk-position-left" },
        { Id: 410, Name: "uk-position-medium" },
        { Id: 411, Name: "uk-position-relative" },
        { Id: 412, Name: "uk-position-right" },
        { Id: 413, Name: "uk-position-small" },
        { Id: 414, Name: "uk-position-top" },
        { Id: 415, Name: "uk-position-top-center" },
        { Id: 416, Name: "uk-position-top-left" },
        { Id: 417, Name: "uk-position-top-right" },
        { Id: 418, Name: "uk-position-z-index" },
        { Id: 419, Name: "uk-preserve-color" },
        { Id: 420, Name: "uk-preserve-width" },
        { Id: 421, Name: "uk-radio" },
        { Id: 422, Name: "uk-range" },
        { Id: 423, Name: "uk-resize" },
        { Id: 424, Name: "uk-resize-vertical" },
        { Id: 425, Name: "uk-responsive-height" },
        { Id: 426, Name: "uk-responsive-width" },
        { Id: 427, Name: "uk-search-default" },
        { Id: 428, Name: "uk-search-icon-flip" },
        { Id: 429, Name: "uk-search-input" },
        { Id: 430, Name: "uk-search-large" },
        { Id: 431, Name: "uk-search-navbar" },
        { Id: 432, Name: "uk-search-toggle" },
        { Id: 433, Name: "uk-section-default" },
        { Id: 434, Name: "uk-section-large" },
        { Id: 435, Name: "uk-section-muted" },
        { Id: 436, Name: "uk-section-overlap" },
        { Id: 437, Name: "uk-section-primary" },
        { Id: 438, Name: "uk-section-secondary" },
        { Id: 439, Name: "uk-section-small" },
        { Id: 440, Name: "uk-section-xlarge" },
        { Id: 441, Name: "uk-section-xsmall" },
        { Id: 442, Name: "uk-select" },
        { Id: 443, Name: "uk-slidenav-container" },
        { Id: 444, Name: "uk-slider-container" },
        { Id: 445, Name: "uk-slider-container-offset" },
        { Id: 446, Name: "uk-slider-nav" },
        { Id: 447, Name: "uk-slideshow-nav" },
        { Id: 448, Name: "uk-subnav-divider" },
        { Id: 449, Name: "uk-subnav-pill" },
        { Id: 450, Name: "uk-switcher" },
        { Id: 451, Name: "uk-tab-bottom" },
        { Id: 452, Name: "uk-table-divider" },
        { Id: 453, Name: "uk-table-expand" },
        { Id: 454, Name: "uk-tab-left" },
        { Id: 455, Name: "uk-table-hover" },
        { Id: 456, Name: "uk-table-justify" },
        { Id: 457, Name: "uk-table-large" },
        { Id: 458, Name: "uk-table-link" },
        { Id: 459, Name: "uk-table-middle" },
        { Id: 460, Name: "uk-table-responsive" },
        { Id: 461, Name: "uk-table-shrink" },
        { Id: 462, Name: "uk-table-small" },
        { Id: 463, Name: "uk-table-striped" },
        { Id: 464, Name: "uk-tab-right" },
        { Id: 465, Name: "uk-textarea" },
        { Id: 466, Name: "uk-text-background" },
        { Id: 467, Name: "uk-text-baseline" },
        { Id: 468, Name: "uk-text-bold" },
        { Id: 469, Name: "uk-text-bolder" },
        { Id: 470, Name: "uk-text-bottom" },
        { Id: 471, Name: "uk-text-break" },
        { Id: 472, Name: "uk-text-capitalize" },
        { Id: 473, Name: "uk-text-center" },
        { Id: 474, Name: "uk-text-danger" },
        { Id: 475, Name: "uk-text-decoration-none" },
        { Id: 476, Name: "uk-text-default" },
        { Id: 477, Name: "uk-text-emphasis" },
        { Id: 478, Name: "uk-text-italic" },
        { Id: 479, Name: "uk-text-justify" },
        { Id: 480, Name: "uk-text-large" },
        { Id: 481, Name: "uk-text-lead" },
        { Id: 482, Name: "uk-text-left" },
        { Id: 483, Name: "uk-text-light" },
        { Id: 484, Name: "uk-text-lighter" },
        { Id: 485, Name: "uk-text-lowercase" },
        { Id: 486, Name: "uk-text-meta" },
        { Id: 487, Name: "uk-text-middle" },
        { Id: 488, Name: "uk-text-muted" },
        { Id: 489, Name: "uk-text-normal" },
        { Id: 490, Name: "uk-text-nowrap" },
        { Id: 491, Name: "uk-text-primary" },
        { Id: 492, Name: "uk-text-right" },
        { Id: 493, Name: "uk-text-secondary" },
        { Id: 494, Name: "uk-text-small" },
        { Id: 495, Name: "uk-text-success" },
        { Id: 496, Name: "uk-text-top" },
        { Id: 497, Name: "uk-text-truncate" },
        { Id: 498, Name: "uk-text-uppercase" },
        { Id: 499, Name: "uk-text-warning" },
        { Id: 500, Name: "uk-thumbnav-vertical" },
        { Id: 501, Name: "uk-tile-default" },
        { Id: 502, Name: "uk-tile-muted" },
        { Id: 503, Name: "uk-tile-primary" },
        { Id: 504, Name: "uk-tile-secondary" },
        { Id: 505, Name: "uk-transform-origin-bottom-center" },
        { Id: 506, Name: "uk-transform-origin-bottom-left" },
        { Id: 507, Name: "uk-transform-origin-bottom-right" },
        { Id: 508, Name: "uk-transform-origin-center-left" },
        { Id: 509, Name: "uk-transform-origin-center-right" },
        { Id: 510, Name: "uk-transform-origin-top-center" },
        { Id: 511, Name: "uk-transform-origin-top-left" },
        { Id: 512, Name: "uk-transform-origin-top-right" },
        { Id: 513, Name: "uk-transition-fade" },
        { Id: 514, Name: "uk-transition-scale-down" },
        { Id: 515, Name: "uk-transition-scale-up" },
        { Id: 516, Name: "uk-transition-slide-bottom" },
        { Id: 517, Name: "uk-transition-slide-bottom-medium" },
        { Id: 518, Name: "uk-transition-slide-bottom-small" },
        { Id: 519, Name: "uk-transition-slide-left" },
        { Id: 520, Name: "uk-transition-slide-left-medium" },
        { Id: 521, Name: "uk-transition-slide-left-small" },
        { Id: 522, Name: "uk-transition-slide-right" },
        { Id: 523, Name: "uk-transition-slide-right-medium" },
        { Id: 524, Name: "uk-transition-slide-right-small" },
        { Id: 525, Name: "uk-transition-slide-top" },
        { Id: 526, Name: "uk-transition-slide-top-medium" },
        { Id: 527, Name: "uk-transition-slide-top-small" },
        { Id: 528, Name: "uk-transition-toggle" },
        { Id: 529, Name: "uk-visible-toggle" },
        { Id: 530, Name: "uk-width-1-1" },
        { Id: 531, Name: "uk-width-1-2" },
        { Id: 532, Name: "uk-width-1-3" },
        { Id: 533, Name: "uk-width-1-4" },
        { Id: 534, Name: "uk-width-1-5" },
        { Id: 535, Name: "uk-width-1-6" },
        { Id: 536, Name: "uk-width-2-3" },
        { Id: 537, Name: "uk-width-2-5" },
        { Id: 538, Name: "uk-width-2xlarge" },
        { Id: 539, Name: "uk-width-3-4" },
        { Id: 540, Name: "uk-width-3-5" },
        { Id: 541, Name: "uk-width-3-6" },
        { Id: 542, Name: "uk-width-4-5" },
        { Id: 543, Name: "uk-width-5-6" },
        { Id: 544, Name: "uk-width-auto" },
        { Id: 545, Name: "uk-width-expand" },
        { Id: 546, Name: "uk-width-large" },
        { Id: 547, Name: "uk-width-medium" },
        { Id: 548, Name: "uk-width-small" },
        { Id: 549, Name: "uk-width-xlarge" },
      ];
      //autocomplete
      //console.log(e.target);
      setTimeout(function () {
        jQuery(
          `input[class="uk-input"][type="text"]:not([placeholder="http://"]):not([placeholder="auto"])`
        ).autocomplete({
          dataSource: selList,
          valueProperty: "Id",
          textProperty: "Name",
          allowCustomValue: true,
        });
      }, 500);
      //e.target.focus();

      if (e.button == 2) {
        jQuery(".yo-sidebar-close + div > a > span").click();
      } else {
        setTimeout(dii, 500);
        jQuery(".yo-thumbnail").mouseout(function () {
          getSize();
        });
      }

      jQuery(document).on("click", ".yo-thumbnail", function (e) {
        //console.log(jQuery(this).children("a").children("div.imghint").get(0));

        if (jQuery("div").is(".imghint")) {
          //  console.log("here");
          jQuery(this).children("a").children("div.imghint").remove(); //.get(0)
        }
      });

      let list = document.querySelectorAll("a.uk-placeholder");
      list.forEach(function (item, i) {
        // выбираем нужный элемент
        //var target = document.querySelector("#some-id");
        // создаем новый экземпляр наблюдателя
        var observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            // console.log(mutation.type);
            if (jQuery(".img-width-inp").length) {
              jQuery(".img-width-inp").val("");
              jQuery(".img-width-inp").removeAttr("data-width");
            }
            if (jQuery(".img-height-inp").length) {
              jQuery(".img-height-inp").val("");
              jQuery(".img-height-inp").removeAttr("data-height");
            }
            jQuery(".img-width-inp + .icon-link").remove();

            setTimeout(dii, 1000);
            setTimeout(getSize, 1100);
          });
        });
        // создаем конфигурации для наблюдателя
        var config = { childList: true };
        // запускаем механизм наблюдения
        observer.observe(item.parentNode, config);
      });

      let current = document.querySelector(
        ".yo-sidebar-tabs-section .yo-thumbnail > img"
      );
      //console.log("set oberver attr");
      var observer = new MutationObserver(function (current) {
        // console.log("mutation");
        setTimeout(dii, 1000);
        setTimeout(getSize, 1200);
      });
      // создаем конфигурации для наблюдателя
      var config = { attributes: true };
      // запускаем механизм наблюдения
      if (current) {
        observer.observe(current, config);
      }
    });

    function FillAlt() {
      return;
      // console.log("fill alt start");
      par = "";
      alt = "";

      if (jQuery(".img-width-inp").length) {
        par = jQuery(".img-width-inp").parent().parent().parent().parent();
        alt = jQuery(par).next().find("div > input");
      }
      if (jQuery(".yo-thumbnail").children("img").length) {
        par = jQuery(".yo-thumbnail")
          .children("img")
          .parent()
          .parent()
          .parent()
          .parent();
        //check if this is gallery element
        if (jQuery(par).next().attr("style") == "display: none;") {
          alt = jQuery(par).next().next().next().find("div > input");
        } else {
          alt = jQuery(par).next().find("div > input");
        }
      }
      if (jQuery(alt).length) {
        jQuery(alt).addClass("alt");
        button = jQuery(
          '<span class="uk-form-icon uk-form-icon-flip stopfill" uk-icon="icon: ban"></span>'
        );

        button.insertBefore(jQuery(alt));
        //button.css('right',sidebarsize-inputsize-60+'px');
        button.click(function () {
          //disable filling alt
        });
      }
      if (
        jQuery(alt).length &&
        !jQuery(".yo-thumbnail").children("img").attr("src")
      ) {
        if (jQuery(alt).val().length && jQuery(".alt").prop("disabled")) {
          jQuery(alt).val("");
          document
            .querySelector(".alt")
            .dispatchEvent(new Event("input", { composed: true }));
        } else return;
      } else {
        //if gallery element
        //if (jQuery(".alt").prev(".uk-form-icon")) {
        //return;
        //}
        src = jQuery(".yo-thumbnail").children("img").attr("src");
        // Use the regular expression to replace the non-matching content with a blank space
        if (src) {
          if (src.length) {
            filenameWithExtension = src.replace(/^.*[\\\/]/, "");
            filename = filenameWithExtension.replace(/\.[^/.]+$/, "");

            var tempArray = {
              prepareQuery: function (val) {
                function isNotLetter(a) {
                  return /[0-9-_ ]/.test(a);
                }

                var val = val.toLowerCase().split("");
                var tempArray = val.join("").split("");
                var currentIndex = 1;

                for (var i = 0; i < val.length - 1; i++) {
                  if (isNotLetter(val[i]) !== isNotLetter(val[i + 1])) {
                    tempArray.splice(i + currentIndex, 0, " ");
                    currentIndex++;
                  }
                }
                return tempArray.join("");
              },
            };
            alttag = tempArray.prepareQuery(filename);
            // console.log("tag " + alttag);
            alttag = alttag.replace(/_/gi, "");
            alttag = alttag.replace(/-/gi, "");
            alttag = alttag.replace(/  /gi, " ");
            //  console.log("tag2 " + alttag);
            alttag = alttag.charAt(0).toUpperCase() + alttag.slice(1);
            //завести автозаполнение тайтла в настройки
            if (jQuery(alt).val() != alttag) {
              jQuery(alt).val(alttag);
            }
            //  document
            //    .querySelector(".alt")
            //    .addEventListener("input", function (evt) {});
            if (document.querySelector(".alt")) {
              document
                .querySelector(".alt")
                .dispatchEvent(new Event("input", { composed: true }));
            }
          }
        }
      }
    }

    var img_size_connect = true;
    jQuery(document).on("click", ".imghint-sizeimage", function (e) {
      //console.log(e.target);
      if (jQuery(e.target).hasClass("t2")) field = 2;
      else if (jQuery(e.target).hasClass("t3")) field = 3;
      else field = 1;
      if (jQuery(".img-width-inp.t" + field).length > 0) {
        jQuery(".img-width-inp.t" + field).val("");
      }
      if (jQuery(".img-height-inp.t" + field).length > 0) {
        jQuery(".img-height-inp.t" + field).val("");
      }
      jQuery(".img-width-inp.t" + field + " + .icon-link").remove();
      dii();
    });

    jQuery(document).on("keyup", ".img-width-inp", function (e) {
      this.value = this.value.replace(/[^0-9]/g, "");
      if (img_size_connect == true) {
        if (jQuery(e.target).hasClass("t2")) field = 2;
        else if (jQuery(e.target).hasClass("t3")) field = 3;
        else field = 1;
        let w = jQuery(this).attr("data-width");
        let h = jQuery(".img-height-inp.t" + field).attr("data-height");
        let x = jQuery(this).val();
        if (x == 0) {
          y = "";
        } else {
          y = ((x * h) / w).toFixed(0);
        }
        jQuery(".img-height-inp.t" + field).val(y);
        document
          .querySelector(".img-height-inp.t" + field)
          .dispatchEvent(new Event("input", { composed: true }));
      }
    });
    jQuery(document).on("keyup", ".img-height-inp", function (e) {
      this.value = this.value.replace(/[^0-9]/g, "");
      if (img_size_connect == true) {
        if (jQuery(e.target).hasClass("t2")) field = 2;
        else if (jQuery(e.target).hasClass("t3")) field = 3;
        else field = 1;
        let h = jQuery(this).attr("data-height");
        let w = jQuery(".img-width-inp.t" + field).attr("data-width");
        let y = jQuery(this).val();
        if (y == 0) {
          x = "";
        } else {
          x = ((y * w) / h).toFixed(0);
        }
        jQuery(".img-width-inp.t" + field).val(x);
        document
          .querySelector(".img-width-inp.t" + field)
          .dispatchEvent(new Event("input", { composed: true }));
      }
    });

    jQuery(document).on("click", ".connect", function () {
      jQuery(this).removeClass("connect");
      jQuery(this).addClass("no-connect");
      img_size_connect = false;
    });
    jQuery(document).on("click", ".no-connect", function () {
      jQuery(this).removeClass("no-connect");
      jQuery(this).addClass("connect");
      img_size_connect = true;
    });

    //download image event
    jQuery(document).on("click", ".dwn", function (e) {
      e.preventDefault();
      let img_parents = jQuery(this).parents(".yo-thumbnail");
      let img = img_parents.children("img");
      let img_src = img.attr("src");
      if (img_src.substring(0, 4) == "http") {
        //new_img_src = new URL(img_src).pathname;
      } else {
        let doc_protocol = document.location.protocol;
        let doc_host = document.location.host;
        new_img_src = doc_protocol + "//" + doc_host + img_src;
      }
      var link = document.createElement("a");
      link.setAttribute("href", new_img_src);
      link.setAttribute("download", img_src.replace(/^.*[\\/]/, ""));
      link.click();
      return false;
    });

    jQuery(document).on("click", ".src", function (e) {
      e.preventDefault();
      let img_parents = jQuery(this).parents(".yo-thumbnail");
      let img = img_parents.children("img");
      let img_src = img.attr("src");
      if (img_src.substring(0, 4) == "http") {
        new_img_src = new URL(img_src).pathname;
      } else {
        let doc_protocol = document.location.protocol;
        let doc_host = document.location.host;
        new_img_src = doc_protocol + "//" + doc_host + img_src;
      }
      img_parents
        .next(".uk-margin-small-top")
        .children("input")
        .val(new_img_src);
      img_parents
        .next(".uk-margin-small-top")
        .children("input")
        .addClass("noresize");
      document
        .querySelector(".noresize")
        .addEventListener("input", function (evt) {});
      document
        .querySelector(".noresize")
        .dispatchEvent(new Event("input", { composed: true }));
    });
  });
}, 1000);
