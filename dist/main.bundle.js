/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
console.log('I get called from main.js!');
var app = (function() {
  var indexPage = function() {
    // Register Dialog box
    var dialog = document.querySelector('dialog');
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.querySelector('.close').addEventListener('click', function() {
      window.history.back(1);
      dialog.close();
    });

    // Placehodlers
    var TITLE_PLACEHOLDER = '{{TITLE}}';
    var NOTE_PLACEHOLDER = '{{NOTE}}';
    var ID_PLACEHOLDER = '{{ID}}';
    var SYNCED_PLACEHOLDER = '{{SYNCED}}';
    var DATE_PLACEHOLDER = '{{DATE}}';
    var CLOUD_ICON =
      '<div id="tt3" class="icon material-icons">cloud_upload</div>';
    var EMPTY_NOTE_PLACEHODER = '<div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet" id="column"> <div class="mdl-card mdl-shadow--2dp" style="width:95%; margin:1rem; text-align:center; padding:1rem"> <h3>You dont have any notes!</h3> </div> </div>';
    // TO See how this template looks like, please open index.html and see comment under <div id="grid"></div>
    var NOTE_TEMPLATE =
      '<!-- Column START --> <div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet"> <!-- CARD START --> <div id="{{ID}}" class="mdl-card mdl-shadow--2dp" style="width:95%; margin:1rem"> <div class="mdl-card__title"> <h2 class="mdl-card__title-text">{{TITLE}}  {{SYNCED}}</h2> </div> <div class="mdl-card__media mdl-color--cyan" style="padding:2px"> </div> <div class="mdl-card__supporting-text"> {{NOTE}} </div> <div class="mdl-card__actions mdl-card--border"> <a href="/add.html?id={{ID}}" class="mdl-button mdl-js-button mdl-button--colored mdl-color-text--cyan mdl-js-ripple-effect"> Edit </a> <a href="#id={{ID}}" class="delete-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"> Delete </a> <div class="mdl-layout-spacer"></div><div class="mdl-layout-spacer"></div> <p class="mdl-textfield--align-right">{{DATE}}</p> </div> </div> <!-- CARD END --> </div> <!-- Column END -->';

    var getRegex = function(str) {
      return new RegExp(str, 'g');
    };

    var replacePlaceholders = function(data) {
      var title = data.title;
      var note = data.note;
      var id = data.id;
      var date = data.date;
      var synced = data.synced ? '' : CLOUD_ICON;

      var HTML = NOTE_TEMPLATE.replace(getRegex(TITLE_PLACEHOLDER), title);
      HTML = HTML.replace(getRegex(ID_PLACEHOLDER), id);
      HTML = HTML.replace(getRegex(NOTE_PLACEHOLDER), note);
      HTML = HTML.replace(getRegex(DATE_PLACEHOLDER), helpers.formatDate(date));
      HTML = HTML.replace(getRegex(SYNCED_PLACEHOLDER), synced);
      HTML = HTML.replace(getRegex(NOTE_PLACEHOLDER), note);

      return HTML;
    };

    var getListOfDeleteButtons = function() {
      // get all delete-button classes
      return document.querySelectorAll('.delete-button');
    };

    var removeClickListerner = function() {
      var buttonsElements = getListOfDeleteButtons();
      for (var i = 0; i < buttonsElements.length; i++) {
        buttonsElements[i].removeEventListener('click', showModalFn, false);
      }
    };

    var attachClickTodeleteButtons = function() {
      var buttonsElements = getListOfDeleteButtons();
      // Attach click event to all delete-button
      for (var i = 0; i < buttonsElements.length; i++) {
        buttonsElements[i].addEventListener('click', showModalFn);
      }
    };

    // Show notes
    var updateUI = function(data) {
      removeClickListerner();
      var grid = document.querySelector('#grid');
      grid.innerHTML = '';
      if(!data.length) {
        grid.insertAdjacentHTML('beforeend', EMPTY_NOTE_PLACEHODER);
        return;
      }
      for (var i = 0; i < data.length; i++) {
        var snippet = replacePlaceholders({
          title: data[i].title,
          note: data[i].note,
          id: data[i].id,
          date: data[i].date,
          synced: data[i].synced,
        });
        grid.insertAdjacentHTML('beforeend', snippet);
      }
      attachClickTodeleteButtons();
    };

    var showModalFn = function() {
      dialog.showModal();
    };

    var getDataAndUpdateUI = function() {
      // Call essential methods
      db.readAllNotes().then(function (notes) {
        const sortNotesByDate=notes.sort(function (a,b) {
          return a.id-b.id;
        })
        updateUI(sortNotesByDate);
      })
    };

    var deleteNote = function(id) {
      db.deleteNote(id).then(function () {
        helpers.showMessage('Note deleted:' + id);
        window.history.back(1);  
        getDataAndUpdateUI();
      })
    };

    // Call initially to update data
    getDataAndUpdateUI();

    dialog
      .querySelector('.confirmDelete')
      .addEventListener('click', function() {
        var id = helpers.getHashByName('id');
        deleteNote(parseInt(id));
        dialog.close();
      });
  };

  var addPage = function() {
    var id = helpers.getParameterByName('id'); // "1"
    var pageTitle = document.querySelector('#page-title');
    var addNoteForm = document.forms.addNote; // Or document.forms['addNote']
    var titleInput = addNoteForm.elements.title;
    var noteInput = addNoteForm.elements.note;

    var AttachSubmitForm = function(data) {
      // Listen to form submit
      addNoteForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var title = titleInput.value.trim();
        var note = noteInput.value.trim();

        if (title === '' || note === '') {
          helpers.showMessage('Please enter valid data!');
          return;
        }

        var noteData = {
          id: data ? data.id : new Date().getTime(),
          title: title,
          note: note,
          date: new Date(),
          synced: false,
        };
        db.writeNotes(noteData).then(function () {
          helpers.showMessage('successfully updated to local db!');
          setTimeout(() => {
            window.history.back(1);
          }, 500); 
        })
      });
    };

    // This means we are in edit mode
    if (id) {
      pageTitle.innerHTML = 'Edit your Note';
      // get Note information from DB
      db.getNote(parseInt(id)).then(function (data) {
        titleInput.value = data.title;
        noteInput.value = data.note;
        AttachSubmitForm(data);
      })
    } else {
      // call essential methods
      AttachSubmitForm();
    }
  };

  return {
    indexPage,
    addPage
  };
})();
///register serviceWorker
if ("serviceWorker" in navigator) {
  window.addEventListener("load",function () {
      navigator.serviceWorker.register("./sw.js").then(function (swRegisRes) {
          console.log("service worker registered.");
      }).catch(function () {
          console.log("service worker error");
      })
  })
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);
//// fetch data from external api and write them in indexedDB
// fetch("notes.json")
// .then(function (response) {
//     return response.json();
// }).then(function (data) {
//  for(let key in data){
//     writeNote(data[key])
//     .then(function () {
//         console.log("write note done",key);
//     }).catch(console.error)
//  }
// })


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLCtCQUErQixPQUFPO0FBQ3RDLDhCQUE4QixNQUFNO0FBQ3BDLDRCQUE0QixJQUFJO0FBQ2hDLGdDQUFnQyxRQUFRO0FBQ3hDLDhCQUE4QixNQUFNO0FBQ3BDO0FBQ0E7QUFDQSxtS0FBbUssYUFBYSxtQkFBbUI7QUFDbk07QUFDQTtBQUNBLDBIQUEwSCxJQUFJLHFEQUFxRCwrRUFBK0UsV0FBVyxRQUFRLGdJQUFnSSxPQUFPLGdGQUFnRixJQUFJLDJIQUEySCxJQUFJLDBOQUEwTixNQUFNOztBQUUvMEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLDRCQUE0QjtBQUNsRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDRCQUE0QjtBQUNsRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlCQUFpQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBLCtDQUErQztBQUMvQztBQUNBLDhDQUE4QztBQUM5QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1QsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1AsR0FBRztBQUNIO0FBQ0EsaUVBQWUsR0FBRyxFQUFDO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsSUFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL3Rlc3QtcHdhLXdlYnBhY2svd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGVzdC1wd2Etd2VicGFjay93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdGVzdC1wd2Etd2VicGFjay93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Rlc3QtcHdhLXdlYnBhY2svd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90ZXN0LXB3YS13ZWJwYWNrLy4vc3JjL2pzL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zb2xlLmxvZygnSSBnZXQgY2FsbGVkIGZyb20gbWFpbi5qcyEnKTtcbnZhciBhcHAgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciBpbmRleFBhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBSZWdpc3RlciBEaWFsb2cgYm94XG4gICAgdmFyIGRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpYWxvZycpO1xuICAgIGlmICghZGlhbG9nLnNob3dNb2RhbCkge1xuICAgICAgZGlhbG9nUG9seWZpbGwucmVnaXN0ZXJEaWFsb2coZGlhbG9nKTtcbiAgICB9XG4gICAgZGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKDEpO1xuICAgICAgZGlhbG9nLmNsb3NlKCk7XG4gICAgfSk7XG5cbiAgICAvLyBQbGFjZWhvZGxlcnNcbiAgICB2YXIgVElUTEVfUExBQ0VIT0xERVIgPSAne3tUSVRMRX19JztcbiAgICB2YXIgTk9URV9QTEFDRUhPTERFUiA9ICd7e05PVEV9fSc7XG4gICAgdmFyIElEX1BMQUNFSE9MREVSID0gJ3t7SUR9fSc7XG4gICAgdmFyIFNZTkNFRF9QTEFDRUhPTERFUiA9ICd7e1NZTkNFRH19JztcbiAgICB2YXIgREFURV9QTEFDRUhPTERFUiA9ICd7e0RBVEV9fSc7XG4gICAgdmFyIENMT1VEX0lDT04gPVxuICAgICAgJzxkaXYgaWQ9XCJ0dDNcIiBjbGFzcz1cImljb24gbWF0ZXJpYWwtaWNvbnNcIj5jbG91ZF91cGxvYWQ8L2Rpdj4nO1xuICAgIHZhciBFTVBUWV9OT1RFX1BMQUNFSE9ERVIgPSAnPGRpdiBjbGFzcz1cIm1kbC1jZWxsIG1kbC1jZWxsLS02LWNvbCBtZGwtY2VsbC0tOC1jb2wtdGFibGV0XCIgaWQ9XCJjb2x1bW5cIj4gPGRpdiBjbGFzcz1cIm1kbC1jYXJkIG1kbC1zaGFkb3ctLTJkcFwiIHN0eWxlPVwid2lkdGg6OTUlOyBtYXJnaW46MXJlbTsgdGV4dC1hbGlnbjpjZW50ZXI7IHBhZGRpbmc6MXJlbVwiPiA8aDM+WW91IGRvbnQgaGF2ZSBhbnkgbm90ZXMhPC9oMz4gPC9kaXY+IDwvZGl2Pic7XG4gICAgLy8gVE8gU2VlIGhvdyB0aGlzIHRlbXBsYXRlIGxvb2tzIGxpa2UsIHBsZWFzZSBvcGVuIGluZGV4Lmh0bWwgYW5kIHNlZSBjb21tZW50IHVuZGVyIDxkaXYgaWQ9XCJncmlkXCI+PC9kaXY+XG4gICAgdmFyIE5PVEVfVEVNUExBVEUgPVxuICAgICAgJzwhLS0gQ29sdW1uIFNUQVJUIC0tPiA8ZGl2IGNsYXNzPVwibWRsLWNlbGwgbWRsLWNlbGwtLTYtY29sIG1kbC1jZWxsLS04LWNvbC10YWJsZXRcIj4gPCEtLSBDQVJEIFNUQVJUIC0tPiA8ZGl2IGlkPVwie3tJRH19XCIgY2xhc3M9XCJtZGwtY2FyZCBtZGwtc2hhZG93LS0yZHBcIiBzdHlsZT1cIndpZHRoOjk1JTsgbWFyZ2luOjFyZW1cIj4gPGRpdiBjbGFzcz1cIm1kbC1jYXJkX190aXRsZVwiPiA8aDIgY2xhc3M9XCJtZGwtY2FyZF9fdGl0bGUtdGV4dFwiPnt7VElUTEV9fSAge3tTWU5DRUR9fTwvaDI+IDwvZGl2PiA8ZGl2IGNsYXNzPVwibWRsLWNhcmRfX21lZGlhIG1kbC1jb2xvci0tY3lhblwiIHN0eWxlPVwicGFkZGluZzoycHhcIj4gPC9kaXY+IDxkaXYgY2xhc3M9XCJtZGwtY2FyZF9fc3VwcG9ydGluZy10ZXh0XCI+IHt7Tk9URX19IDwvZGl2PiA8ZGl2IGNsYXNzPVwibWRsLWNhcmRfX2FjdGlvbnMgbWRsLWNhcmQtLWJvcmRlclwiPiA8YSBocmVmPVwiL2FkZC5odG1sP2lkPXt7SUR9fVwiIGNsYXNzPVwibWRsLWJ1dHRvbiBtZGwtanMtYnV0dG9uIG1kbC1idXR0b24tLWNvbG9yZWQgbWRsLWNvbG9yLXRleHQtLWN5YW4gbWRsLWpzLXJpcHBsZS1lZmZlY3RcIj4gRWRpdCA8L2E+IDxhIGhyZWY9XCIjaWQ9e3tJRH19XCIgY2xhc3M9XCJkZWxldGUtYnV0dG9uIG1kbC1idXR0b24gbWRsLWJ1dHRvbi0tY29sb3JlZCBtZGwtanMtYnV0dG9uIG1kbC1qcy1yaXBwbGUtZWZmZWN0XCI+IERlbGV0ZSA8L2E+IDxkaXYgY2xhc3M9XCJtZGwtbGF5b3V0LXNwYWNlclwiPjwvZGl2PjxkaXYgY2xhc3M9XCJtZGwtbGF5b3V0LXNwYWNlclwiPjwvZGl2PiA8cCBjbGFzcz1cIm1kbC10ZXh0ZmllbGQtLWFsaWduLXJpZ2h0XCI+e3tEQVRFfX08L3A+IDwvZGl2PiA8L2Rpdj4gPCEtLSBDQVJEIEVORCAtLT4gPC9kaXY+IDwhLS0gQ29sdW1uIEVORCAtLT4nO1xuXG4gICAgdmFyIGdldFJlZ2V4ID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgICByZXR1cm4gbmV3IFJlZ0V4cChzdHIsICdnJyk7XG4gICAgfTtcblxuICAgIHZhciByZXBsYWNlUGxhY2Vob2xkZXJzID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgdmFyIHRpdGxlID0gZGF0YS50aXRsZTtcbiAgICAgIHZhciBub3RlID0gZGF0YS5ub3RlO1xuICAgICAgdmFyIGlkID0gZGF0YS5pZDtcbiAgICAgIHZhciBkYXRlID0gZGF0YS5kYXRlO1xuICAgICAgdmFyIHN5bmNlZCA9IGRhdGEuc3luY2VkID8gJycgOiBDTE9VRF9JQ09OO1xuXG4gICAgICB2YXIgSFRNTCA9IE5PVEVfVEVNUExBVEUucmVwbGFjZShnZXRSZWdleChUSVRMRV9QTEFDRUhPTERFUiksIHRpdGxlKTtcbiAgICAgIEhUTUwgPSBIVE1MLnJlcGxhY2UoZ2V0UmVnZXgoSURfUExBQ0VIT0xERVIpLCBpZCk7XG4gICAgICBIVE1MID0gSFRNTC5yZXBsYWNlKGdldFJlZ2V4KE5PVEVfUExBQ0VIT0xERVIpLCBub3RlKTtcbiAgICAgIEhUTUwgPSBIVE1MLnJlcGxhY2UoZ2V0UmVnZXgoREFURV9QTEFDRUhPTERFUiksIGhlbHBlcnMuZm9ybWF0RGF0ZShkYXRlKSk7XG4gICAgICBIVE1MID0gSFRNTC5yZXBsYWNlKGdldFJlZ2V4KFNZTkNFRF9QTEFDRUhPTERFUiksIHN5bmNlZCk7XG4gICAgICBIVE1MID0gSFRNTC5yZXBsYWNlKGdldFJlZ2V4KE5PVEVfUExBQ0VIT0xERVIpLCBub3RlKTtcblxuICAgICAgcmV0dXJuIEhUTUw7XG4gICAgfTtcblxuICAgIHZhciBnZXRMaXN0T2ZEZWxldGVCdXR0b25zID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBnZXQgYWxsIGRlbGV0ZS1idXR0b24gY2xhc3Nlc1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZWxldGUtYnV0dG9uJyk7XG4gICAgfTtcblxuICAgIHZhciByZW1vdmVDbGlja0xpc3Rlcm5lciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGJ1dHRvbnNFbGVtZW50cyA9IGdldExpc3RPZkRlbGV0ZUJ1dHRvbnMoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnV0dG9uc0VsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGJ1dHRvbnNFbGVtZW50c1tpXS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dNb2RhbEZuLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBhdHRhY2hDbGlja1RvZGVsZXRlQnV0dG9ucyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGJ1dHRvbnNFbGVtZW50cyA9IGdldExpc3RPZkRlbGV0ZUJ1dHRvbnMoKTtcbiAgICAgIC8vIEF0dGFjaCBjbGljayBldmVudCB0byBhbGwgZGVsZXRlLWJ1dHRvblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidXR0b25zRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYnV0dG9uc0VsZW1lbnRzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd01vZGFsRm4pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBTaG93IG5vdGVzXG4gICAgdmFyIHVwZGF0ZVVJID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgcmVtb3ZlQ2xpY2tMaXN0ZXJuZXIoKTtcbiAgICAgIHZhciBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dyaWQnKTtcbiAgICAgIGdyaWQuaW5uZXJIVE1MID0gJyc7XG4gICAgICBpZighZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgZ3JpZC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIEVNUFRZX05PVEVfUExBQ0VIT0RFUik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc25pcHBldCA9IHJlcGxhY2VQbGFjZWhvbGRlcnMoe1xuICAgICAgICAgIHRpdGxlOiBkYXRhW2ldLnRpdGxlLFxuICAgICAgICAgIG5vdGU6IGRhdGFbaV0ubm90ZSxcbiAgICAgICAgICBpZDogZGF0YVtpXS5pZCxcbiAgICAgICAgICBkYXRlOiBkYXRhW2ldLmRhdGUsXG4gICAgICAgICAgc3luY2VkOiBkYXRhW2ldLnN5bmNlZCxcbiAgICAgICAgfSk7XG4gICAgICAgIGdyaWQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBzbmlwcGV0KTtcbiAgICAgIH1cbiAgICAgIGF0dGFjaENsaWNrVG9kZWxldGVCdXR0b25zKCk7XG4gICAgfTtcblxuICAgIHZhciBzaG93TW9kYWxGbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgZGlhbG9nLnNob3dNb2RhbCgpO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0RGF0YUFuZFVwZGF0ZVVJID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBDYWxsIGVzc2VudGlhbCBtZXRob2RzXG4gICAgICBkYi5yZWFkQWxsTm90ZXMoKS50aGVuKGZ1bmN0aW9uIChub3Rlcykge1xuICAgICAgICBjb25zdCBzb3J0Tm90ZXNCeURhdGU9bm90ZXMuc29ydChmdW5jdGlvbiAoYSxiKSB7XG4gICAgICAgICAgcmV0dXJuIGEuaWQtYi5pZDtcbiAgICAgICAgfSlcbiAgICAgICAgdXBkYXRlVUkoc29ydE5vdGVzQnlEYXRlKTtcbiAgICAgIH0pXG4gICAgfTtcblxuICAgIHZhciBkZWxldGVOb3RlID0gZnVuY3Rpb24oaWQpIHtcbiAgICAgIGRiLmRlbGV0ZU5vdGUoaWQpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICBoZWxwZXJzLnNob3dNZXNzYWdlKCdOb3RlIGRlbGV0ZWQ6JyArIGlkKTtcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygxKTsgIFxuICAgICAgICBnZXREYXRhQW5kVXBkYXRlVUkoKTtcbiAgICAgIH0pXG4gICAgfTtcblxuICAgIC8vIENhbGwgaW5pdGlhbGx5IHRvIHVwZGF0ZSBkYXRhXG4gICAgZ2V0RGF0YUFuZFVwZGF0ZVVJKCk7XG5cbiAgICBkaWFsb2dcbiAgICAgIC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybURlbGV0ZScpXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGlkID0gaGVscGVycy5nZXRIYXNoQnlOYW1lKCdpZCcpO1xuICAgICAgICBkZWxldGVOb3RlKHBhcnNlSW50KGlkKSk7XG4gICAgICAgIGRpYWxvZy5jbG9zZSgpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgdmFyIGFkZFBhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaWQgPSBoZWxwZXJzLmdldFBhcmFtZXRlckJ5TmFtZSgnaWQnKTsgLy8gXCIxXCJcbiAgICB2YXIgcGFnZVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhZ2UtdGl0bGUnKTtcbiAgICB2YXIgYWRkTm90ZUZvcm0gPSBkb2N1bWVudC5mb3Jtcy5hZGROb3RlOyAvLyBPciBkb2N1bWVudC5mb3Jtc1snYWRkTm90ZSddXG4gICAgdmFyIHRpdGxlSW5wdXQgPSBhZGROb3RlRm9ybS5lbGVtZW50cy50aXRsZTtcbiAgICB2YXIgbm90ZUlucHV0ID0gYWRkTm90ZUZvcm0uZWxlbWVudHMubm90ZTtcblxuICAgIHZhciBBdHRhY2hTdWJtaXRGb3JtID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgLy8gTGlzdGVuIHRvIGZvcm0gc3VibWl0XG4gICAgICBhZGROb3RlRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciB0aXRsZSA9IHRpdGxlSW5wdXQudmFsdWUudHJpbSgpO1xuICAgICAgICB2YXIgbm90ZSA9IG5vdGVJbnB1dC52YWx1ZS50cmltKCk7XG5cbiAgICAgICAgaWYgKHRpdGxlID09PSAnJyB8fCBub3RlID09PSAnJykge1xuICAgICAgICAgIGhlbHBlcnMuc2hvd01lc3NhZ2UoJ1BsZWFzZSBlbnRlciB2YWxpZCBkYXRhIScpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBub3RlRGF0YSA9IHtcbiAgICAgICAgICBpZDogZGF0YSA/IGRhdGEuaWQgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgbm90ZTogbm90ZSxcbiAgICAgICAgICBkYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgIHN5bmNlZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIGRiLndyaXRlTm90ZXMobm90ZURhdGEpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGhlbHBlcnMuc2hvd01lc3NhZ2UoJ3N1Y2Nlc3NmdWxseSB1cGRhdGVkIHRvIGxvY2FsIGRiIScpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygxKTtcbiAgICAgICAgICB9LCA1MDApOyBcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBUaGlzIG1lYW5zIHdlIGFyZSBpbiBlZGl0IG1vZGVcbiAgICBpZiAoaWQpIHtcbiAgICAgIHBhZ2VUaXRsZS5pbm5lckhUTUwgPSAnRWRpdCB5b3VyIE5vdGUnO1xuICAgICAgLy8gZ2V0IE5vdGUgaW5mb3JtYXRpb24gZnJvbSBEQlxuICAgICAgZGIuZ2V0Tm90ZShwYXJzZUludChpZCkpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdGl0bGVJbnB1dC52YWx1ZSA9IGRhdGEudGl0bGU7XG4gICAgICAgIG5vdGVJbnB1dC52YWx1ZSA9IGRhdGEubm90ZTtcbiAgICAgICAgQXR0YWNoU3VibWl0Rm9ybShkYXRhKTtcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNhbGwgZXNzZW50aWFsIG1ldGhvZHNcbiAgICAgIEF0dGFjaFN1Ym1pdEZvcm0oKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbmRleFBhZ2UsXG4gICAgYWRkUGFnZVxuICB9O1xufSkoKTtcbi8vL3JlZ2lzdGVyIHNlcnZpY2VXb3JrZXJcbmlmIChcInNlcnZpY2VXb3JrZXJcIiBpbiBuYXZpZ2F0b3IpIHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsZnVuY3Rpb24gKCkge1xuICAgICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoXCIuL3N3LmpzXCIpLnRoZW4oZnVuY3Rpb24gKHN3UmVnaXNSZXMpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInNlcnZpY2Ugd29ya2VyIHJlZ2lzdGVyZWQuXCIpO1xuICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VydmljZSB3b3JrZXIgZXJyb3JcIik7XG4gICAgICB9KVxuICB9KVxufVxuZXhwb3J0IGRlZmF1bHQgYXBwO1xuLy8vLyBmZXRjaCBkYXRhIGZyb20gZXh0ZXJuYWwgYXBpIGFuZCB3cml0ZSB0aGVtIGluIGluZGV4ZWREQlxuLy8gZmV0Y2goXCJub3Rlcy5qc29uXCIpXG4vLyAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbi8vICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuLy8gfSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuLy8gIGZvcihsZXQga2V5IGluIGRhdGEpe1xuLy8gICAgIHdyaXRlTm90ZShkYXRhW2tleV0pXG4vLyAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIndyaXRlIG5vdGUgZG9uZVwiLGtleSk7XG4vLyAgICAgfSkuY2F0Y2goY29uc29sZS5lcnJvcilcbi8vICB9XG4vLyB9KVxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=