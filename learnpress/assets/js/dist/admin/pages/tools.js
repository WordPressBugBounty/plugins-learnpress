/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/src/apps/js/admin/pages/tools/database/clean_database.js"
/*!*************************************************************************!*\
  !*** ./assets/src/apps/js/admin/pages/tools/database/clean_database.js ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../utils/lp-modal-overlay */ "./assets/src/apps/js/utils/lp-modal-overlay.js");
/* harmony import */ var _utils_handle_ajax_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/handle-ajax-api */ "./assets/src/apps/js/utils/handle-ajax-api.js");


const cleanDatabases = () => {
  const elCleanDatabases = document.querySelector('#lp-tool-clean-database');
  if (!elCleanDatabases) {
    return;
  }
  const elBtnCleanDatabases = elCleanDatabases.querySelector('.lp-btn-clean-db');
  elBtnCleanDatabases.addEventListener('click', function (e) {
    e.preventDefault();
    const elToolsSelect = document.querySelector('#tools-select__id');
    const ElToolSelectLi = elToolsSelect.querySelectorAll('ul li input');
    const checkedOne = Array.prototype.slice.call(ElToolSelectLi).some(x => x.checked);
    const prepareMessage = elCleanDatabases.querySelector('.tools-prepare__message');
    if (checkedOne == false) {
      prepareMessage.style.display = 'block';
      prepareMessage.textContent = 'You must choose at least one table to take this action';
      return;
    }
    prepareMessage.style.display = 'none';
    const elLoading = elCleanDatabases.querySelector('.wrapper-lp-loading');
    if (!_utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].init()) {
      return;
    }
    _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elLPOverlay.show();
    _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].setContentModal(elLoading.innerHTML);
    _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].setTitleModal(elCleanDatabases.querySelector('h2').textContent);
    _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnYes[0].style.display = 'inline-block';
    _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnYes[0].textContent = 'Run';
    _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnNo[0].textContent = 'Close';
    const listTables = new Array();
    const ElToolSelectLiCheked = elToolsSelect.querySelectorAll('ul li input:checked');
    ElToolSelectLiCheked.forEach(e => {
      listTables.push(e.value);
    });
    const tables = listTables[0];
    const item = elLoading.querySelector('.progressbar__item');
    const itemtotal = item.getAttribute('data-total');
    const modal = document.querySelector('.lp-modal-body .main-content');
    const notice = modal.querySelector('.lp-tool__message');
    if (itemtotal <= 0) {
      _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnYes[0].style.display = 'none';
      notice.textContent = 'There is no data that need to be repaired in the chosen tables';
      notice.style.display = 'block';
      return;
    }
    _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].callBackYes = () => {
      // warn user before doing
      const r = confirm('The modified data is impossible to be restored. Please backup your website before doing this.');
      if (r == false) {
        return;
      }
      const modal = document.querySelector('.lp-modal-body .main-content');
      const notice = modal.querySelector('.lp-tool__message');
      notice.textContent = 'This action is in processing. Don\'t close this page';
      notice.style.display = 'block';
      const url = '/lp/v1/admin/tools/clean-tables';
      const params = {
        tables,
        itemtotal
      };
      _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnNo[0].style.display = 'none';
      _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnYes[0].style.display = 'none';
      const functions = {
        success: res => {
          const {
            status,
            message,
            data: {
              processed,
              percent
            }
          } = res;
          const modalItem = modal.querySelector('.progressbar__item');
          const progressBarRows = modalItem.querySelector('.progressbar__rows');
          const progressPercent = modalItem.querySelector('.progressbar__percent');
          const progressValue = modalItem.querySelector('.progressbar__value');
          console.log(status);
          if ('success' === status) {
            setTimeout(() => {
              (0,_utils_handle_ajax_api__WEBPACK_IMPORTED_MODULE_1__["default"])(url, params, functions);
            }, 2000);
            // update processed quantity
            progressBarRows.textContent = processed + ' / ' + itemtotal;
            // update percent
            progressPercent.textContent = '( ' + percent + '%' + ' )';
            // update percent width
            progressValue.style.width = percent + '%';
          } else if ('finished' === status) {
            // Re-update indexs
            progressBarRows.textContent = itemtotal + ' / ' + itemtotal;
            progressPercent.textContent = '( 100% )';
            // Update complete nofication
            const modal = document.querySelector('.lp-modal-body .main-content');
            const notice = modal.querySelector('.lp-tool__message');
            notice.textContent = 'Process has been completed. Press click the finish button to close this popup';
            notice.style.color = 'white';
            notice.style.background = 'green';
            progressValue.style.width = '100%';
            // Show finish button
            _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnNo[0].style.display = 'inline-block';
            _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnNo[0].textContent = 'Finish';
            _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnNo[0].addEventListener('click', function () {
              location.reload();
            });
          } else {
            console.log(message);
          }
        },
        error: err => {
          console.log(err);
        },
        completed: () => {}
      };
      (0,_utils_handle_ajax_api__WEBPACK_IMPORTED_MODULE_1__["default"])(url, params, functions);
    };
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cleanDatabases);

/***/ },

/***/ "./assets/src/apps/js/admin/pages/tools/database/create_indexs.js"
/*!************************************************************************!*\
  !*** ./assets/src/apps/js/admin/pages/tools/database/create_indexs.js ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../utils/lp-modal-overlay */ "./assets/src/apps/js/utils/lp-modal-overlay.js");
/* harmony import */ var _utils_handle_ajax_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/handle-ajax-api */ "./assets/src/apps/js/utils/handle-ajax-api.js");


const createIndexes = () => {
  const elCreateIndexTables = document.querySelector('#lp-tool-create-indexes-tables');
  if (!elCreateIndexTables) {
    return;
  }
  const elBtnCreateIndexes = elCreateIndexTables.querySelector('.lp-btn-create-indexes');
  elBtnCreateIndexes.addEventListener('click', e => {
    e.preventDefault();
    const elLoading = elCreateIndexTables.querySelector('.wrapper-lp-loading');
    if (!_utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].init()) {
      return;
    }
    _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elLPOverlay.show();
    _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].setContentModal(elLoading.innerHTML);
    _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].setTitleModal(elCreateIndexTables.querySelector('h2').textContent);
    _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnYes[0].style.display = 'inline-block';
    _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnYes[0].textContent = 'Run';
    _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnNo[0].textContent = 'Close';
    const url = '/lp/v1/admin/tools/list-tables-indexs';
    const params = {};
    const functions = {
      success: res => {
        const {
          status,
          message,
          data: {
            tables,
            table
          }
        } = res;
        const elSteps = document.querySelector('.example-lp-group-step');
        _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].setContentModal(elSteps.innerHTML);
        const elGroupStep = _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elLPOverlay[0].querySelector('.lp-group-step ');

        // Show progress when upgrading.
        const showProgress = (stepCurrent, percent) => {
          const elItemStepCurrent = elGroupStep.querySelector('input[value=' + stepCurrent + ']').closest('.lp-item-step');
          elItemStepCurrent.classList.add('running');
          if (100 === percent) {
            elItemStepCurrent.classList.remove('running');
            elItemStepCurrent.classList.add('completed');
          }
          const progressBar = elItemStepCurrent.querySelector('.progress-bar');
          progressBar.style.width = percent;
        };

        // Scroll to step current.
        const scrollToStepCurrent = stepCurrent => {
          const elItemStepCurrent = elGroupStep.querySelector('input[value=' + stepCurrent + ']').closest('.lp-item-step');
          const offset = elItemStepCurrent.offsetTop - _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elMainContent[0].offsetTop + _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elMainContent[0].scrollTop;
          _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elMainContent.stop().animate({
            scrollTop: offset
          }, 600);
        };
        for (const table in tables) {
          const elItemStep = _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elLPOverlay[0].querySelector('.lp-item-step').cloneNode(true);
          const input = elItemStep.querySelector('input');
          const label = elItemStep.querySelector('label');
          label.textContent = `Table: ${table}`;
          input.value = table;
          elGroupStep.append(elItemStep);
        }
        _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].callBackYes = () => {
          const url = '/lp/v1/admin/tools/create-indexs';
          const params = {
            tables,
            table
          };
          _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnNo[0].style.display = 'none';
          _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnYes[0].style.display = 'none';
          showProgress(table, 0.1);
          const functions = {
            success: res => {
              const {
                status,
                message,
                data: {
                  table,
                  percent
                }
              } = res;
              showProgress(params.table, percent);
              if (undefined !== table) {
                if (params.table !== table) {
                  showProgress(table, 0.1);
                  scrollToStepCurrent(table);
                }
                params.table = table;
              }
              if ('success' === status) {
                setTimeout(() => {
                  (0,_utils_handle_ajax_api__WEBPACK_IMPORTED_MODULE_1__["default"])(url, params, functions);
                }, 2000);
              } else if ('finished' === status) {
                console.log('finished');
                _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnNo[0].style.display = 'inline-block';
                _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnNo[0].textContent = 'Finish';
              } else {
                console.log(message);
              }
            },
            error: err => {
              console.log(err);
            },
            completed: () => {}
          };
          (0,_utils_handle_ajax_api__WEBPACK_IMPORTED_MODULE_1__["default"])(url, params, functions);
        };
      },
      error: err => {},
      completed: () => {}
    };
    (0,_utils_handle_ajax_api__WEBPACK_IMPORTED_MODULE_1__["default"])(url, params, functions);
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createIndexes);

/***/ },

/***/ "./assets/src/apps/js/admin/pages/tools/database/re-upgrade-db.js"
/*!************************************************************************!*\
  !*** ./assets/src/apps/js/admin/pages/tools/database/re-upgrade-db.js ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../utils/lp-modal-overlay */ "./assets/src/apps/js/utils/lp-modal-overlay.js");
/* harmony import */ var _utils_handle_ajax_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/handle-ajax-api */ "./assets/src/apps/js/utils/handle-ajax-api.js");


const reUpgradeDB = () => {
  const elToolReUpgradeDB = document.querySelector('#lp-tool-re-upgrade-db');
  if (!elToolReUpgradeDB) {
    return;
  }

  // Check valid to show popup re-upgrade
  let url = 'lp/v1/database/check-db-valid-re-upgrade';
  (0,_utils_handle_ajax_api__WEBPACK_IMPORTED_MODULE_1__["default"])(url, {}, {
    success(res) {
      const {
        data: {
          can_re_upgrade
        }
      } = res;
      if (!can_re_upgrade) {
        return;
      }
      elToolReUpgradeDB.style.display = 'block';
      const elBtnReUpradeDB = elToolReUpgradeDB.querySelector('.lp-btn-re-upgrade-db');
      const elMessage = elToolReUpgradeDB.querySelector('.learn-press-message');
      elBtnReUpradeDB.addEventListener('click', () => {
        // eslint-disable-next-line no-alert
        if (confirm('Are you want to Re Upgrade!')) {
          url = 'lp/v1/database/del-tb-lp-upgrade-db';
          (0,_utils_handle_ajax_api__WEBPACK_IMPORTED_MODULE_1__["default"])(url, {}, {
            success(res) {
              const {
                status,
                message,
                data: {
                  url
                }
              } = res;
              if ('success' === status && undefined !== url) {
                window.location.href = url;
              }
            },
            error(err) {
              elMessage.classList.add('error');
              elMessage.textContent = err.message;
              elMessage.style.display = 'block';
            }
          });
        }
      });
    },
    error(err) {}
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reUpgradeDB);

/***/ },

/***/ "./assets/src/apps/js/admin/pages/tools/database/upgrade.js"
/*!******************************************************************!*\
  !*** ./assets/src/apps/js/admin/pages/tools/database/upgrade.js ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../utils/lp-modal-overlay */ "./assets/src/apps/js/utils/lp-modal-overlay.js");
/* harmony import */ var _utils_handle_ajax_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/handle-ajax-api */ "./assets/src/apps/js/utils/handle-ajax-api.js");


const $ = jQuery;
const elToolUpgradeDB = $('#lp-tool-upgrade-db');
const upgradeDB = () => {
  let isUpgrading = 0;
  const elWrapperTermsUpgrade = elToolUpgradeDB.find('.wrapper-terms-upgrade');
  const elStatusUpgrade = elToolUpgradeDB.find('.wrapper-lp-status-upgrade');
  const elWrapperUpgradeMessage = elToolUpgradeDB.find('.wrapper-lp-upgrade-message');
  let checkValidBeforeUpgrade = null;
  const elMessageUpgrading = $('input[name=message-when-upgrading]').val();
  if (elWrapperTermsUpgrade.length) {
    // Show Terms Upgrade.
    _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].setContentModal(elWrapperTermsUpgrade.html());
    const elTermUpdate = _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elLPOverlay.find('.terms-upgrade');
    const elLPAgreeTerm = elTermUpdate.find('input[name=lp-agree-term]');
    const elTermMessage = elTermUpdate.find('.error');
    checkValidBeforeUpgrade = function () {
      elTermMessage.hide();
      elTermMessage.removeClass('learn-press-message');
      if (elLPAgreeTerm.is(':checked')) {
        (0,_utils_handle_ajax_api__WEBPACK_IMPORTED_MODULE_1__["default"])('/lp/v1/database/agree_terms', {
          agree_terms: 1
        }, {});
        _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elFooter.find('.learn-press-notice').remove();
        _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].setContentModal(elStatusUpgrade.html());
        return true;
      }
      elTermMessage.show();
      elTermMessage.addClass('learn-press-message');
      _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elMainContent.animate({
        scrollTop: elTermMessage.offset().top
      });
      return false;
    };
  } else {
    // Show Steps Upgrade.
    _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].setContentModal(elStatusUpgrade.html());
    checkValidBeforeUpgrade = function () {
      return true;
    };
  }
  _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].setTitleModal(elToolUpgradeDB.find('h2').html());
  _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnYes.text('Upgrade');
  _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnYes.show();
  _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnNo.text('Cancel');
  _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].callBackYes = function (e) {
    if (!checkValidBeforeUpgrade()) {
      return;
    }
    const target = e.target;
    // Show message note when upgrading.
    if (target.innerText === 'Upgrade') {
      _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elFooter.prepend('<span class="learn-press-notice">' + elMessageUpgrading + '</span>');
    }
    isUpgrading = 1;
    _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnYes.hide();
    _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnNo.hide();
    const urlHandle = '/lp/v1/database/upgrade';
    const elGroupStep = _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elLPOverlay.find('.lp-group-step');
    const elItemSteps = elToolUpgradeDB.find('.lp-item-step');

    // Get params.
    const steps = [];
    $.each(elItemSteps, function (i, el) {
      const elItemStepsTmp = $(el);
      if (!elItemStepsTmp.hasClass('completed')) {
        const step = elItemStepsTmp.find('input').val();
        steps.push(step);
      }
    });
    const params = {
      steps,
      step: steps[0]
    };
    let elItemStepCurrent = null;

    // Show progress when upgrading.
    const showProgress = (stepCurrent, percent) => {
      elItemStepCurrent = elGroupStep.find('input[value=' + stepCurrent + ']').closest('.lp-item-step');
      elItemStepCurrent.addClass('running');
      if (100 === percent) {
        elItemStepCurrent.removeClass('running').addClass('completed');
      }
      elItemStepCurrent.find('.progress-bar').css('width', percent + '%');
      elItemStepCurrent.find('.percent').text(percent + '%');
    };

    // Scroll to step current.
    const scrollToStepCurrent = stepCurrent => {
      elItemStepCurrent = elGroupStep.find('input[value=' + stepCurrent + ']').closest('.lp-item-step');
      if (!elItemStepCurrent.length) {
        return;
      }
      const offset = elItemStepCurrent.offset().top - _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elMainContent.offset().top + _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elMainContent.scrollTop();
      _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elMainContent.stop().animate({
        scrollTop: offset
      }, 600);
    };
    showProgress(steps[0], 0.1);
    const funcCallBack = {
      success: res => {
        showProgress(params.step, res.percent);
        if (params.step !== res.name) {
          showProgress(res.name, 0.1);
        }
        scrollToStepCurrent(params.step);
        if ('success' === res.status) {
          params.step = res.name;
          params.data = res.data;
          setTimeout(() => {
            (0,_utils_handle_ajax_api__WEBPACK_IMPORTED_MODULE_1__["default"])(urlHandle, params, funcCallBack);
          }, 800);
        } else if ('finished' === res.status) {
          isUpgrading = 0;
          elItemStepCurrent.removeClass('running').addClass('completed');
          setTimeout(() => {
            _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].setContentModal(elWrapperUpgradeMessage.html());
          }, 1000);
          _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elFooter.find('.learn-press-notice').remove();
          _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnNo.text('Close');
          _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnNo.show();
          _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnNo.on('click', () => {
            window.location.reload();
          });
        } else {
          isUpgrading = 0;
          _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elFooter.find('.learn-press-notice').remove();
          elItemStepCurrent.removeClass('running').addClass('error');
          _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].setContentModal(elWrapperUpgradeMessage.html(), function () {
            _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnYes.text('Retry').show();
            _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].callBackYes = () => {
              window.location.href = lpGlobalSettings.siteurl + '/wp-admin/admin.php?page=learn-press-tools&tab=database&action=upgrade-db';
            };
            _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnNo.show();
            if (!res.message) {
              res.message = 'Upgrade not success! Please clear cache, restart sever then retry or contact to LP to help';
            }
            _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elMainContent.find('.learn-press-message').addClass('error').html(res.message);
          });
        }
      },
      error: err => {
        isUpgrading = 0;
        _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].setContentModal(elWrapperUpgradeMessage.html(), function () {
          _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnYes.text('Retry').show();
          _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].callBackYes = () => {
            window.location.location = 'wp-admin/admin.php?page=learn-press-tools&tab=database&action=upgrade-db';
          };
          _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elBtnNo.show();
          if (!err.message) {
            err.message = 'Upgrade not success! Something wrong. Please clear cache, restart sever then retry or contact to LP to help';
          }
          _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elMainContent.find('.learn-press-message').addClass('error').html(err.message);
        });
      },
      completed: () => {}
    };
    (0,_utils_handle_ajax_api__WEBPACK_IMPORTED_MODULE_1__["default"])(urlHandle, params, funcCallBack);
  };

  // Show confirm if, within upgrading, the user reload the page.
  window.onbeforeunload = function () {
    if (isUpgrading) {
      return 'LP is upgrading Database. Are you want to reload page?';
    }
  };

  // Show confirm if, within upgrading, the user close the page.
  window.onclose = function () {
    if (isUpgrading) {
      return 'LP is upgrading Database. Are you want to close page?';
    }
  };
};
const getStepsUpgradeStatus = () => {
  if (!elToolUpgradeDB.length) {
    return;
  }

  // initial LP Modal Overlay
  if (!_utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].init()) {
    return;
  }
  const elWrapperStatusUpgrade = $('.wrapper-lp-status-upgrade');
  const urlHandle = '/lp/v1/database/get_steps';

  // Show dialog upgrade database.
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const action = urlParams.get('action');
  if ('upgrade-db' === action) {
    _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elLPOverlay.show();
    _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].setTitleModal(elToolUpgradeDB.find('h2').html());
    _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].setContentModal($('.wrapper-lp-loading').html());
  }
  const funcCallBack = {
    success: res => {
      const {
        steps_completed,
        steps_default
      } = res;
      if (undefined === steps_completed || undefined === steps_default) {
        console.log('invalid steps_completed and steps_default');
        return false;
      }

      // Render show Steps.
      let htmlStep = '';
      for (const k_gr_steps in steps_default) {
        const step_group = steps_default[k_gr_steps];
        const steps = step_group.steps;
        htmlStep = '<div class="lp-group-step">';
        htmlStep += '<h3>' + step_group.label + '</h3>';
        for (const k_step in steps) {
          const step = steps[k_step];
          let completed = '';
          if (undefined !== steps_completed[k_step]) {
            completed = 'completed';
          }
          htmlStep += '<div class="lp-item-step ' + completed + '">';
          htmlStep += '<div class="lp-item-step-left"><input type="hidden" name="lp_steps_upgrade_db[]" value="' + step.name + '"  /></div>';
          htmlStep += '<div class="lp-item-step-right">';
          htmlStep += '<label for=""><strong></strong>' + step.label + '</label>';
          htmlStep += '<div class="description">' + step.description + '</div>';
          htmlStep += '<div class="percent"></div>';
          htmlStep += '<span class="progress-bar"></span>';
          htmlStep += '</div>';
          htmlStep += '</div>';
        }
        htmlStep += '</div>';
        elWrapperStatusUpgrade.append(htmlStep);
        const elBtnUpgradeDB = $('.lp-btn-upgrade-db');
        if ('upgrade-db' === action) {
          upgradeDB();
        }
        elBtnUpgradeDB.on('click', function () {
          _utils_lp_modal_overlay__WEBPACK_IMPORTED_MODULE_0__["default"].elLPOverlay.show();
          upgradeDB();
        });
      }
    },
    error: err => {},
    completed: () => {}
  };
  (0,_utils_handle_ajax_api__WEBPACK_IMPORTED_MODULE_1__["default"])(urlHandle, {}, funcCallBack);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getStepsUpgradeStatus);

/***/ },

/***/ "./assets/src/apps/js/admin/pages/tools/handle-sample-data.js"
/*!********************************************************************!*\
  !*** ./assets/src/apps/js/admin/pages/tools/handle-sample-data.js ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HandleSampleData)
/* harmony export */ });
/* harmony import */ var lpAssetsJsPath_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lpAssetsJsPath/utils.js */ "./assets/src/js/utils.js");
/* harmony import */ var lpAssetsJsPath_lpToastify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lpAssetsJsPath/lpToastify.js */ "./assets/src/js/lpToastify.js");
/**
 * Handle install/uninstall sample course data on the Tools page.
 *
 * @since 4.4.5
 * @version 1.0.0
 */


class HandleSampleData {
  static selectors = {
    wrapper: '.lp-install-sample',
    form: '.lp-form-handle-sample-data',
    elBtnHandleSampleData: '.lp-btn-install-sample-handle',
    elTriggerToggle: '.lp-install-sample__toggle-options',
    elMessage: '.lp-install-sample-message'
  };
  constructor() {
    this.wrapper = null;
  }
  init() {
    this.wrapper = document.querySelector(HandleSampleData.selectors.wrapper);
    if (!this.wrapper) {
      return;
    }
    this.preventFormSubmit();
    this.events();
  }
  preventFormSubmit() {
    const form = this.wrapper.querySelector(HandleSampleData.selectors.form);
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
      });
    }
  }
  events() {
    if (HandleSampleData._loadedEvents) {
      return;
    }
    HandleSampleData._loadedEvents = this;
    lpAssetsJsPath_utils_js__WEBPACK_IMPORTED_MODULE_0__.eventHandlers('click', [{
      selector: HandleSampleData.selectors.elBtnHandleSampleData,
      class: this,
      callBack: this.handleAction.name
    }, {
      selector: HandleSampleData.selectors.elTriggerToggle,
      callBack: args => {
        const {
          e,
          target
        } = args;
        const elForm = this.wrapper.querySelector(HandleSampleData.selectors.form);
        if (elForm) {
          elForm.classList.toggle('lp-hidden');
          const textShow = target.dataset.showText;
          const textHide = target.dataset.hideText;
          target.textContent = elForm.classList.contains('lp-hidden') ? textShow : textHide;
        }
      }
    }]);
  }
  handleAction(args) {
    const {
      e,
      target
    } = args;
    const button = target.closest(HandleSampleData.selectors.elBtnHandleSampleData);
    e.preventDefault();
    const elMessage = this.wrapper.querySelector(HandleSampleData.selectors.elMessage);
    const message = button.dataset.message;
    if (!message || !confirm(message)) {
      return;
    }
    elMessage.innerHTML = '';
    lpAssetsJsPath_utils_js__WEBPACK_IMPORTED_MODULE_0__.lpSetLoadingEl(button, true);
    const wrapper = button.closest(HandleSampleData.selectors.wrapper);
    const elForm = wrapper.querySelector(HandleSampleData.selectors.form);
    let dataSend = lpAssetsJsPath_utils_js__WEBPACK_IMPORTED_MODULE_0__.getDataOfForm(elForm);
    dataSend.action = button.dataset.action;
    dataSend.id_url = 'handle-sample-data';
    const callBack = {
      success: response => {
        const {
          status,
          message,
          data
        } = response;
        if ('success' === status) {
          this.wrapper.querySelector(HandleSampleData.selectors.elMessage).innerHTML = data.html;
        } else {
          throw new Error(message);
        }
      },
      error: error => {
        lpAssetsJsPath_lpToastify_js__WEBPACK_IMPORTED_MODULE_1__.show(error, 'error');
      },
      completed: () => {
        lpAssetsJsPath_utils_js__WEBPACK_IMPORTED_MODULE_0__.lpSetLoadingEl(button, false);
        setTimeout(() => {
          elMessage.innerHTML = '';
        }, 3000);
      }
    };
    window.lpAJAXG.fetchAJAX(dataSend, callBack);
  }
}

/***/ },

/***/ "./assets/src/apps/js/admin/pages/tools/reset-data/course.js"
/*!*******************************************************************!*\
  !*** ./assets/src/apps/js/admin/pages/tools/reset-data/course.js ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Reset course progress.
 *
 * @since 4.0.5.
 * @author Nhamdv - Code choi choi in Physcode.
 */
const {
  __
} = wp.i18n;
const {
  TextControl,
  Button,
  Spinner,
  CheckboxControl,
  Notice
} = wp.components;
const {
  useState,
  useEffect
} = wp.element;
const {
  addQueryArgs
} = wp.url;
const ResetCourse = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [checkData, setCheckData] = useState([]);
  const [message, setMessage] = useState([]);
  const [loadingReset, setLoadingReset] = useState(false);
  useEffect(() => {
    responsiveData(search);
  }, [search]);
  const responsiveData = async s => {
    try {
      if (!s || loading) {
        setMessage([]);
        setData([]);
        return;
      }
      if (s.length < 3) {
        setMessage([{
          status: 'error',
          message: 'Please enter at least 3 characters to searching course.'
        }]);
        setData([]);
        return;
      }
      setLoading(true);
      const response = await wp.apiFetch({
        path: addQueryArgs('lp/v1/admin/tools/reset-data/search-courses', {
          s
        }),
        method: 'GET'
      });
      const {
        status,
        data
      } = response;
      setLoading(false);
      if (status === 'success') {
        setData(data);
        setMessage([]);
      } else {
        setMessage([{
          status: 'error',
          message: response.message || 'LearnPress: Search Course Fail!'
        }]);
        setData([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  function checkItems(id) {
    const datas = [...checkData];
    if (datas.includes(id)) {
      const index = datas.indexOf(id);
      if (index > -1) {
        datas.splice(index, 1);
      }
    } else {
      datas.push(id);
    }
    setCheckData(datas);
  }
  const resetCourse = async () => {
    if (checkData.length === 0) {
      setMessage([{
        status: 'error',
        message: 'Please chooce Course for reset data!'
      }]);
      return;
    }

    // eslint-disable-next-line no-alert
    if (!confirm('Are you sure to reset course progress of all users enrolled this course?')) {
      return;
    }
    const notice = [];
    try {
      setLoadingReset(true);
      for (const courseId of checkData) {
        const response = await wp.apiFetch({
          path: addQueryArgs('lp/v1/admin/tools/reset-data/reset-courses', {
            courseId
          }),
          method: 'GET'
        });
        const {
          status,
          data,
          message
        } = response;
        notice.push({
          status,
          message: message || `Course #${courseId} reset successfully!`
        });
      }
      setLoadingReset(false);
    } catch (error) {
      notice.push({
        status: 'error',
        message: error.message || `LearnPress Error: Reset Course Data.`
      });
    }
    setMessage(notice);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, __('Reset Course Progress', 'learnpress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "description"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, __('This action will reset course progress of all users who have enrolled.', 'learnpress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, __('Search results only show if courses have user data.', 'learnpress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    placeholder: __('Search course by name', 'learnpress'),
    value: search,
    onChange: value => setSearch(value),
    style: {
      width: 300
    }
  }))), loading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Spinner, null), data.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "lp-reset-course_progress",
    style: {
      border: '1px solid #eee'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      background: '#eee'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxControl, {
    checked: checkData.length === data.length,
    onChange: () => {
      if (checkData.length === data.length) {
        setCheckData([]);
      } else {
        setCheckData(data.map(dt => dt.id));
      }
    },
    style: {
      margin: 0
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, __('ID', 'learnpress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, __('Name', 'learnpress')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, __('Students', 'learnpress')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      height: '100%',
      maxHeight: 200,
      overflow: 'auto'
    }
  }, data.map(dt => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        borderTop: '1px solid #eee'
      },
      key: dt.id
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CheckboxControl, {
      checked: checkData.includes(dt.id),
      onChange: () => checkItems(dt.id)
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "#", dt.id), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, dt.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, dt.students));
  }))), loadingReset ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Spinner, null) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    isPrimary: true,
    onClick: () => resetCourse(),
    style: {
      marginTop: 10,
      height: 30
    }
  }, __('Reset now', 'learnpress'))), message.length > 0 && message.map((mess, index) => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Notice, {
      status: mess.status,
      key: index,
      isDismissible: false
    }, mess.message);
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, '\
				.lp-reset-course_progress .components-base-control__field {\
					margin: 0;\
				}\
				.components-notice{\
					margin-left: 0;\
				}\
				.lp-reset-course_progress > div > div{\
					display: grid;\
					grid-template-columns: 80px 50px 1fr 80px;\
					align-items: center;\
				}\
				.lp-reset-course_progress > div > div > div{\
					maegin: 0;\
					padding: 8px 10px;\
				}\
				'));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ResetCourse);

/***/ },

/***/ "./assets/src/apps/js/admin/pages/tools/reset-data/index.js"
/*!******************************************************************!*\
  !*** ./assets/src/apps/js/admin/pages/tools/reset-data/index.js ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _course__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./course */ "./assets/src/apps/js/admin/pages/tools/reset-data/course.js");


const resetData = () => {
  if (document.querySelectorAll('#learn-press-reset-course-users').length > 0) {
    wp.element.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_course__WEBPACK_IMPORTED_MODULE_1__["default"], null), [...document.querySelectorAll('#learn-press-reset-course-users')][0]);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (resetData);

/***/ },

/***/ "./assets/src/apps/js/utils/handle-ajax-api.js"
/*!*****************************************************!*\
  !*** ./assets/src/apps/js/utils/handle-ajax-api.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const handleAjax = function (url, params, functions) {
  wp.apiFetch({
    path: url,
    method: 'POST',
    data: params
  }).then(res => {
    if ('function' === typeof functions.success) {
      functions.success(res);
    }
  }).catch(err => {
    if ('function' === typeof functions.error) {
      functions.error(err);
    }
  }).then(() => {
    if ('function' === typeof functions.completed) {
      functions.completed();
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handleAjax);

/***/ },

/***/ "./assets/src/apps/js/utils/lp-modal-overlay.js"
/*!******************************************************!*\
  !*** ./assets/src/apps/js/utils/lp-modal-overlay.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const $ = jQuery;
let elLPOverlay = null;
const lpModalOverlay = {
  elLPOverlay: null,
  elMainContent: null,
  elTitle: null,
  elBtnYes: null,
  elBtnNo: null,
  elFooter: null,
  elCalledModal: null,
  callBackYes: null,
  instance: null,
  init() {
    if (this.instance) {
      return true;
    }
    this.elLPOverlay = $('.lp-overlay');
    if (!this.elLPOverlay.length) {
      return false;
    }
    elLPOverlay = this.elLPOverlay;
    this.elMainContent = elLPOverlay.find('.main-content');
    this.elTitle = elLPOverlay.find('.modal-title');
    this.elBtnYes = elLPOverlay.find('.btn-yes');
    this.elBtnNo = elLPOverlay.find('.btn-no');
    this.elFooter = elLPOverlay.find('.lp-modal-footer');
    $(document).on('click', '.close, .btn-no', function () {
      elLPOverlay.hide();
    });
    $(document).on('click', '.btn-yes', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if ('function' === typeof lpModalOverlay.callBackYes) {
        lpModalOverlay.callBackYes(e);
      }
    });
    this.instance = this;
    return true;
  },
  setElCalledModal(elCalledModal) {
    this.elCalledModal = elCalledModal;
  },
  setContentModal(content, event) {
    this.elMainContent.html(content);
    if ('function' === typeof event) {
      event();
    }
  },
  setTitleModal(content) {
    this.elTitle.html(content);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lpModalOverlay);

/***/ },

/***/ "./assets/src/js/lpToastify.js"
/*!*************************************!*\
  !*** ./assets/src/js/lpToastify.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   show: () => (/* binding */ show)
/* harmony export */ });
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! toastify-js */ "./node_modules/toastify-js/src/toastify.js");
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(toastify_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var toastify_js_src_toastify_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! toastify-js/src/toastify.css */ "./node_modules/toastify-js/src/toastify.css");
/**
 * Utils functions
 *
 * @param url
 * @param data
 * @param functions
 * @since 4.3.0
 * @version 1.0.0
 */


const argsToastify = {
  text: '',
  gravity: lpData.toast.gravity,
  // `top` or `bottom`
  position: lpData.toast.position,
  // `left`, `center` or `right`
  className: `${lpData.toast.classPrefix}`,
  close: lpData.toast.close == 1,
  stopOnFocus: lpData.toast.stopOnFocus == 1,
  duration: lpData.toast.duration
};
const show = (message, status = 'success', argsCustom) => {
  let args = argsToastify;
  if (argsCustom) {
    args = {
      ...args,
      ...argsCustom
    };
  }
  const toastify = new (toastify_js__WEBPACK_IMPORTED_MODULE_0___default())({
    ...args,
    text: message,
    className: `${lpData.toast.classPrefix} ${status}`
  });
  toastify.showToast();
};

/***/ },

/***/ "./assets/src/js/utils.js"
/*!********************************!*\
  !*** ./assets/src/js/utils.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debounce: () => (/* binding */ debounce),
/* harmony export */   eventHandlers: () => (/* binding */ eventHandlers),
/* harmony export */   fullScreenView: () => (/* binding */ fullScreenView),
/* harmony export */   getDataOfForm: () => (/* binding */ getDataOfForm),
/* harmony export */   getFieldKeysOfForm: () => (/* binding */ getFieldKeysOfForm),
/* harmony export */   listenElementCreated: () => (/* binding */ listenElementCreated),
/* harmony export */   listenElementViewed: () => (/* binding */ listenElementViewed),
/* harmony export */   lpAddQueryArgs: () => (/* binding */ lpAddQueryArgs),
/* harmony export */   lpAjaxParseJsonOld: () => (/* binding */ lpAjaxParseJsonOld),
/* harmony export */   lpClassName: () => (/* binding */ lpClassName),
/* harmony export */   lpFetchAPI: () => (/* binding */ lpFetchAPI),
/* harmony export */   lpGetCurrentURLNoParam: () => (/* binding */ lpGetCurrentURLNoParam),
/* harmony export */   lpOnElementReady: () => (/* binding */ lpOnElementReady),
/* harmony export */   lpSetLoadingEl: () => (/* binding */ lpSetLoadingEl),
/* harmony export */   lpShowHideEl: () => (/* binding */ lpShowHideEl),
/* harmony export */   mergeDataWithDatForm: () => (/* binding */ mergeDataWithDatForm),
/* harmony export */   toggleCollapse: () => (/* binding */ toggleCollapse),
/* harmony export */   toggleEnable: () => (/* binding */ toggleEnable)
/* harmony export */ });
/**
 * Utils functions
 *
 * @param url
 * @param data
 * @param functions
 * @since 4.2.5.1
 * @version 1.0.7
 */
const lpClassName = {
  hidden: 'lp-hidden',
  loading: 'loading',
  elCollapse: 'lp-collapse',
  elSectionToggle: '.lp-section-toggle',
  elTriggerToggle: '.lp-trigger-toggle',
  elBtnFullScreen: '.lp-btn-full-screen-view',
  elFullScreen: 'lp-full-screen-view',
  elBtnFullScreenClose: 'lp-full-screen-view__close'
};
const lpFetchAPI = (url, data = {}, functions = {}) => {
  if ('function' === typeof functions.before) {
    functions.before();
  }
  fetch(url, {
    method: 'GET',
    ...data
  }).then(response => response.json()).then(response => {
    if ('function' === typeof functions.success) {
      functions.success(response);
    }
  }).catch(err => {
    if ('function' === typeof functions.error) {
      functions.error(err);
    }
  }).finally(() => {
    if ('function' === typeof functions.completed) {
      functions.completed();
    }
  });
};

/**
 * Get current URL without params.
 *
 * @since 4.2.5.1
 */
const lpGetCurrentURLNoParam = () => {
  let currentUrl = window.location.href;
  const hasParams = currentUrl.includes('?');
  if (hasParams) {
    currentUrl = currentUrl.split('?')[0];
  }
  return currentUrl;
};
const lpAddQueryArgs = (endpoint, args) => {
  const url = new URL(endpoint);
  Object.keys(args).forEach(arg => {
    url.searchParams.set(arg, args[arg]);
  });
  return url;
};

/**
 * Listen element viewed.
 *
 * @param el
 * @param callback
 * @since 4.2.5.8
 */
const listenElementViewed = (el, callback) => {
  const observerSeeItem = new IntersectionObserver(function (entries) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        callback(entry);
      }
    }
  });
  observerSeeItem.observe(el);
};

/**
 * Listen element created.
 *
 * @param callback
 * @since 4.2.5.8
 */
const listenElementCreated = callback => {
  const observerCreateItem = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) {
            callback(node);
          }
        });
      }
    });
  });
  observerCreateItem.observe(document, {
    childList: true,
    subtree: true
  });
  // End.
};

/**
 * Listen element created.
 *
 * @param selector
 * @param callback
 * @since 4.2.7.1
 */
const lpOnElementReady = (selector, callback) => {
  const element = document.querySelector(selector);
  if (element) {
    callback(element);
    return;
  }
  const observer = new MutationObserver((mutations, obs) => {
    const element = document.querySelector(selector);
    if (element) {
      obs.disconnect();
      callback(element);
    }
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
};

// Parse JSON from string with content include LP_AJAX_START.
const lpAjaxParseJsonOld = data => {
  if (typeof data !== 'string') {
    return data;
  }
  const m = String.raw({
    raw: data
  }).match(/<-- LP_AJAX_START -->(.*)<-- LP_AJAX_END -->/s);
  try {
    if (m) {
      data = JSON.parse(m[1].replace(/(?:\r\n|\r|\n)/g, ''));
    } else {
      data = JSON.parse(data);
    }
  } catch (e) {
    data = {};
  }
  return data;
};

// status 0: hide, 1: show
const lpShowHideEl = (el, status = 0) => {
  if (!el) {
    return;
  }
  if (!status) {
    el.classList.add(lpClassName.hidden);
  } else {
    el.classList.remove(lpClassName.hidden);
  }
};

// status 0: hide, 1: show
const lpSetLoadingEl = (el, status) => {
  if (!el) {
    return;
  }
  if (!status) {
    el.classList.remove(lpClassName.loading);
  } else {
    el.classList.add(lpClassName.loading);
  }
};

// Toggle collapse section
const toggleCollapse = (e, target, elTriggerClassName = '', elsExclude = [], callback) => {
  if (!elTriggerClassName) {
    elTriggerClassName = lpClassName.elTriggerToggle;
  }

  // Exclude elements, which should not trigger the collapse toggle
  if (elsExclude && elsExclude.length > 0) {
    for (const elExclude of elsExclude) {
      if (target.closest(elExclude)) {
        return;
      }
    }
  }
  const elTrigger = target.closest(elTriggerClassName);
  if (!elTrigger) {
    return;
  }

  //console.log( 'elTrigger', elTrigger );

  const elSectionToggle = elTrigger.closest(`${lpClassName.elSectionToggle}`);
  if (!elSectionToggle) {
    return;
  }
  elSectionToggle.classList.toggle(`${lpClassName.elCollapse}`);
  if ('function' === typeof callback) {
    callback(elSectionToggle);
  }
};

// Get data of form
const getDataOfForm = form => {
  const dataSend = {};
  const formData = new FormData(form);
  for (const pair of formData.entries()) {
    const key = pair[0];
    const value = formData.getAll(key);
    if (!dataSend.hasOwnProperty(key)) {
      // Convert value array to string.
      dataSend[key] = value.join(',');
    }
  }
  return dataSend;
};

// Get field keys of form
const getFieldKeysOfForm = form => {
  const keys = [];
  const elements = form.elements;
  for (let i = 0; i < elements.length; i++) {
    const name = elements[i].name;
    if (name && !keys.includes(name)) {
      keys.push(name);
    }
  }
  return keys;
};

// Merge data handle with data form.
const mergeDataWithDatForm = (elForm, dataHandle) => {
  const dataForm = getDataOfForm(elForm);
  const keys = getFieldKeysOfForm(elForm);
  keys.forEach(key => {
    if (!dataForm.hasOwnProperty(key)) {
      delete dataHandle[key];
    } else if (dataForm[key][0] === '') {
      delete dataForm[key];
      delete dataHandle[key];
    }
  });
  dataHandle = {
    ...dataHandle,
    ...dataForm
  };
  return dataHandle;
};

/**
 * Event trigger
 * For each list of event handlers, listen event on document.
 *
 * eventName: 'click', 'change', ...
 * eventHandlers = [ { selector: '.lp-button', callBack: function(){}, class: object } ]
 *
 * @param eventName
 * @param eventHandlers
 */
const eventHandlers = (eventName, eventHandlers) => {
  document.addEventListener(eventName, e => {
    const target = e.target;
    let args = {
      e,
      target
    };
    eventHandlers.forEach(eventHandler => {
      args = {
        ...args,
        ...eventHandler
      };

      //console.log( args );

      // Check condition before call back
      if (eventHandler.conditionBeforeCallBack) {
        if (eventHandler.conditionBeforeCallBack(args) !== true) {
          return;
        }
      }

      // Special check for keydown event with checkIsEventEnter = true
      if (eventName === 'keydown' && eventHandler.checkIsEventEnter) {
        if (e.key !== 'Enter') {
          return;
        }
      }
      if (target.closest(eventHandler.selector)) {
        if (eventHandler.class) {
          // Call method of class, function callBack will understand exactly {this} is class object.
          eventHandler.class[eventHandler.callBack](args);
        } else {
          // For send args is objected, {this} is eventHandler object, not class object.
          eventHandler.callBack(args);
        }
      }
    });
  });
};

/**
 * Debounce - delays function execution until after `wait` ms of inactivity.
 *
 * Each call resets the timer. Only the last call in a burst executes.
 *
 * USE CASES:
 * - Search inputs, form validation, window resize
 * - Multiple elements need independent timers
 * - When you need to call with different arguments
 *
 * EXAMPLES:
 * const debouncedSearch = debounce( (query) => fetchResults(query), 300 );
 * searchInput.addEventListener('input', (e) => debouncedSearch(e.target.value));
 *
 * const debouncedResize = debounce( recalculateLayout, 250 );
 * window.addEventListener('resize', debouncedResize);
 *
 * ⚠️ Create ONCE outside event handlers, not inside.
 *
 * @param {Function} func - Function to debounce (can be anonymous)
 * @param {number}   wait - Milliseconds to wait (default: 500)
 * @return {Function} Debounced wrapper function
 * @since 4.3.7
 * @version 1.0.0
 */
const debounce = (func, wait = 500) => {
  let timer;
  return args => {
    clearTimeout(timer);
    timer = setTimeout(() => func(args), wait);
  };
};

/**
 * Initialize lp-toggle-enable components.
 *
 * Finds all `.lp-toggle-enable` elements and wires up toggle behavior.
 * Reads initial state from `data-enabled` attribute ("true"/"false").
 * Calls `data-on-toggle` callback (if provided via options) on state change.
 *
 * HTML structure:
 * <label class="lp-toggle-enable" data-enabled="true">
 *   <input type="checkbox" class="lp-toggle-enable__input" />
 *   <span class="lp-toggle-enable__track"></span>
 * </label>
 *
 * @param {string}   selector CSS selector for toggle elements (default: '.lp-toggle-enable')
 * @param {Function} onToggle Optional callback( el, isEnabled ) called on state change
 * @since 4.4.5
 * @version 1.0.0
 */
window.lpToggleEnableInit = 0;
const toggleEnable = (onToggle = null) => {
  if (window.lpToggleEnableInit) {
    return;
  }
  window.lpToggleEnableInit = 1;
  const selector = '.lp-toggle-enable';
  const updateUI = (toggle, isEnabled) => {
    toggle.classList.toggle('is-enabled', isEnabled);
    const input = toggle.querySelector('.lp-toggle-enable__input');
    if (input) {
      input.checked = isEnabled;
      input.value = isEnabled ? '1' : '0';
    }
  };

  // Delegate click handling via eventHandlers.
  eventHandlers('click', [{
    selector,
    callBack: args => {
      const {
        e,
        target
      } = args;
      const toggle = target.closest(selector);
      if (!toggle || toggle.classList.contains('is-disabled')) {
        return;
      }
      e.preventDefault();
      const isEnabled = !toggle.classList.contains('is-enabled');
      updateUI(toggle, isEnabled);
      if ('function' === typeof onToggle) {
        onToggle(toggle, isEnabled);
      }
    }
  }]);
};

/**
 * Initialize custom fullscreen view buttons.
 *
 * Delegates clicks on `.lp-btn-full-screen-view` buttons to
 * `lpToggleFullscreenView`. Reads the `data-target` attribute to find the
 * target element. Falls back to the button's parent element when
 * `data-target` is not provided.
 *
 * @since 4.4.5
 * @version 1.0.0
 */
window.lpFullScreenViewInit = 0;
const fullScreenView = () => {
  if (window.lpFullScreenViewInit) {
    return;
  }
  window.lpFullScreenViewInit = 1;
  let lastScrollY = 0;
  const lpToggleFullscreenView = (elTarget, elBtnFullScreen = null) => {
    const isFullscreen = elTarget.classList.contains(lpClassName.elFullScreen);
    if (isFullscreen) {
      elTarget.classList.remove(lpClassName.elFullScreen);
      document.documentElement.classList.remove('lp-full-screen-active');
      window.scrollTo(0, lastScrollY);
    } else {
      lastScrollY = window.scrollY;
      elTarget.classList.add(lpClassName.elFullScreen);
      document.documentElement.classList.add('lp-full-screen-active');
    }
    if (!isFullscreen) {
      if (!elTarget.querySelector(`.${lpClassName.elBtnFullScreenClose}`)) {
        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.className = lpClassName.elBtnFullScreenClose;
        closeButton.setAttribute('aria-label', 'Close');
        closeButton.innerHTML = lpData.i18n.closeButtonFullScreen || 'Close &times;';
        closeButton.addEventListener('click', e => {
          e.preventDefault();
          lpToggleFullscreenView(elTarget);
        });
        elTarget.appendChild(closeButton);
      }
    } else {
      const closeButton = elTarget.querySelector(`.${lpClassName.elBtnFullScreenClose}`);
      if (closeButton) {
        closeButton.remove();
      }
    }
  };
  eventHandlers('click', [{
    selector: lpClassName.elBtnFullScreen,
    callBack: args => {
      const {
        e,
        target
      } = args;
      const elBtnFullScreen = target.closest(lpClassName.elBtnFullScreen);
      if (!elBtnFullScreen) {
        console.log('No full screen button found');
        return;
      }
      e.preventDefault();
      let elTarget = null;
      const targetSelector = elBtnFullScreen.dataset.targetFullscreen;
      console.log(targetSelector);
      if (targetSelector) {
        elTarget = document.querySelector(targetSelector);
      }
      if (!elTarget) {
        console.log('No target element found');
        return;
      }
      lpToggleFullscreenView(elTarget, elBtnFullScreen);
    }
  }]);
};

/***/ },

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/toastify-js/src/toastify.css"
/*!*****************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/toastify-js/src/toastify.css ***!
  \*****************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*!
 * Toastify js 1.12.0
 * https://github.com/apvarun/toastify-js
 * @license MIT licensed
 *
 * Copyright (C) 2018 Varun A P
 */

.toastify {
    padding: 12px 20px;
    color: #ffffff;
    display: inline-block;
    box-shadow: 0 3px 6px -1px rgba(0, 0, 0, 0.12), 0 10px 36px -4px rgba(77, 96, 232, 0.3);
    background: -webkit-linear-gradient(315deg, #73a5ff, #5477f5);
    background: linear-gradient(135deg, #73a5ff, #5477f5);
    position: fixed;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
    border-radius: 2px;
    cursor: pointer;
    text-decoration: none;
    max-width: calc(50% - 20px);
    z-index: 2147483647;
}

.toastify.on {
    opacity: 1;
}

.toast-close {
    background: transparent;
    border: 0;
    color: white;
    cursor: pointer;
    font-family: inherit;
    font-size: 1em;
    opacity: 0.4;
    padding: 0 5px;
}

.toastify-right {
    right: 15px;
}

.toastify-left {
    left: 15px;
}

.toastify-top {
    top: -150px;
}

.toastify-bottom {
    bottom: -150px;
}

.toastify-rounded {
    border-radius: 25px;
}

.toastify-avatar {
    width: 1.5em;
    height: 1.5em;
    margin: -7px 5px;
    border-radius: 2px;
}

.toastify-center {
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    max-width: fit-content;
    max-width: -moz-fit-content;
}

@media only screen and (max-width: 360px) {
    .toastify-right, .toastify-left {
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        max-width: fit-content;
    }
}
`, "",{"version":3,"sources":["webpack://./node_modules/toastify-js/src/toastify.css"],"names":[],"mappings":"AAAA;;;;;;EAME;;AAEF;IACI,kBAAkB;IAClB,cAAc;IACd,qBAAqB;IACrB,uFAAuF;IACvF,6DAA6D;IAC7D,qDAAqD;IACrD,eAAe;IACf,UAAU;IACV,wDAAwD;IACxD,kBAAkB;IAClB,eAAe;IACf,qBAAqB;IACrB,2BAA2B;IAC3B,mBAAmB;AACvB;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,uBAAuB;IACvB,SAAS;IACT,YAAY;IACZ,eAAe;IACf,oBAAoB;IACpB,cAAc;IACd,YAAY;IACZ,cAAc;AAClB;;AAEA;IACI,WAAW;AACf;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,WAAW;AACf;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,gBAAgB;IAChB,kBAAkB;AACtB;;AAEA;IACI,iBAAiB;IACjB,kBAAkB;IAClB,OAAO;IACP,QAAQ;IACR,sBAAsB;IACtB,2BAA2B;AAC/B;;AAEA;IACI;QACI,iBAAiB;QACjB,kBAAkB;QAClB,OAAO;QACP,QAAQ;QACR,sBAAsB;IAC1B;AACJ","sourcesContent":["/*!\n * Toastify js 1.12.0\n * https://github.com/apvarun/toastify-js\n * @license MIT licensed\n *\n * Copyright (C) 2018 Varun A P\n */\n\n.toastify {\n    padding: 12px 20px;\n    color: #ffffff;\n    display: inline-block;\n    box-shadow: 0 3px 6px -1px rgba(0, 0, 0, 0.12), 0 10px 36px -4px rgba(77, 96, 232, 0.3);\n    background: -webkit-linear-gradient(315deg, #73a5ff, #5477f5);\n    background: linear-gradient(135deg, #73a5ff, #5477f5);\n    position: fixed;\n    opacity: 0;\n    transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);\n    border-radius: 2px;\n    cursor: pointer;\n    text-decoration: none;\n    max-width: calc(50% - 20px);\n    z-index: 2147483647;\n}\n\n.toastify.on {\n    opacity: 1;\n}\n\n.toast-close {\n    background: transparent;\n    border: 0;\n    color: white;\n    cursor: pointer;\n    font-family: inherit;\n    font-size: 1em;\n    opacity: 0.4;\n    padding: 0 5px;\n}\n\n.toastify-right {\n    right: 15px;\n}\n\n.toastify-left {\n    left: 15px;\n}\n\n.toastify-top {\n    top: -150px;\n}\n\n.toastify-bottom {\n    bottom: -150px;\n}\n\n.toastify-rounded {\n    border-radius: 25px;\n}\n\n.toastify-avatar {\n    width: 1.5em;\n    height: 1.5em;\n    margin: -7px 5px;\n    border-radius: 2px;\n}\n\n.toastify-center {\n    margin-left: auto;\n    margin-right: auto;\n    left: 0;\n    right: 0;\n    max-width: fit-content;\n    max-width: -moz-fit-content;\n}\n\n@media only screen and (max-width: 360px) {\n    .toastify-right, .toastify-left {\n        margin-left: auto;\n        margin-right: auto;\n        left: 0;\n        right: 0;\n        max-width: fit-content;\n    }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ "./node_modules/css-loader/dist/runtime/api.js"
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
(module) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ },

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js"
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
(module) {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ },

/***/ "./node_modules/toastify-js/src/toastify.css"
/*!***************************************************!*\
  !*** ./node_modules/toastify-js/src/toastify.css ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_toastify_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../css-loader/dist/cjs.js!./toastify.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/toastify-js/src/toastify.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_toastify_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_toastify_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_toastify_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_toastify_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ },

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
(module) {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ },

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js"
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
(module) {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ },

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js"
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
(module) {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ },

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ },

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js"
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
(module) {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ },

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js"
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
(module) {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ },

/***/ "./node_modules/toastify-js/src/toastify.js"
/*!**************************************************!*\
  !*** ./node_modules/toastify-js/src/toastify.js ***!
  \**************************************************/
(module) {

/*!
 * Toastify js 1.12.0
 * https://github.com/apvarun/toastify-js
 * @license MIT licensed
 *
 * Copyright (C) 2018 Varun A P
 */
(function(root, factory) {
  if ( true && module.exports) {
    module.exports = factory();
  } else {
    root.Toastify = factory();
  }
})(this, function(global) {
  // Object initialization
  var Toastify = function(options) {
      // Returning a new init object
      return new Toastify.lib.init(options);
    },
    // Library version
    version = "1.12.0";

  // Set the default global options
  Toastify.defaults = {
    oldestFirst: true,
    text: "Toastify is awesome!",
    node: undefined,
    duration: 3000,
    selector: undefined,
    callback: function () {
    },
    destination: undefined,
    newWindow: false,
    close: false,
    gravity: "toastify-top",
    positionLeft: false,
    position: '',
    backgroundColor: '',
    avatar: "",
    className: "",
    stopOnFocus: true,
    onClick: function () {
    },
    offset: {x: 0, y: 0},
    escapeMarkup: true,
    ariaLive: 'polite',
    style: {background: ''}
  };

  // Defining the prototype of the object
  Toastify.lib = Toastify.prototype = {
    toastify: version,

    constructor: Toastify,

    // Initializing the object with required parameters
    init: function(options) {
      // Verifying and validating the input object
      if (!options) {
        options = {};
      }

      // Creating the options object
      this.options = {};

      this.toastElement = null;

      // Validating the options
      this.options.text = options.text || Toastify.defaults.text; // Display message
      this.options.node = options.node || Toastify.defaults.node;  // Display content as node
      this.options.duration = options.duration === 0 ? 0 : options.duration || Toastify.defaults.duration; // Display duration
      this.options.selector = options.selector || Toastify.defaults.selector; // Parent selector
      this.options.callback = options.callback || Toastify.defaults.callback; // Callback after display
      this.options.destination = options.destination || Toastify.defaults.destination; // On-click destination
      this.options.newWindow = options.newWindow || Toastify.defaults.newWindow; // Open destination in new window
      this.options.close = options.close || Toastify.defaults.close; // Show toast close icon
      this.options.gravity = options.gravity === "bottom" ? "toastify-bottom" : Toastify.defaults.gravity; // toast position - top or bottom
      this.options.positionLeft = options.positionLeft || Toastify.defaults.positionLeft; // toast position - left or right
      this.options.position = options.position || Toastify.defaults.position; // toast position - left or right
      this.options.backgroundColor = options.backgroundColor || Toastify.defaults.backgroundColor; // toast background color
      this.options.avatar = options.avatar || Toastify.defaults.avatar; // img element src - url or a path
      this.options.className = options.className || Toastify.defaults.className; // additional class names for the toast
      this.options.stopOnFocus = options.stopOnFocus === undefined ? Toastify.defaults.stopOnFocus : options.stopOnFocus; // stop timeout on focus
      this.options.onClick = options.onClick || Toastify.defaults.onClick; // Callback after click
      this.options.offset = options.offset || Toastify.defaults.offset; // toast offset
      this.options.escapeMarkup = options.escapeMarkup !== undefined ? options.escapeMarkup : Toastify.defaults.escapeMarkup;
      this.options.ariaLive = options.ariaLive || Toastify.defaults.ariaLive;
      this.options.style = options.style || Toastify.defaults.style;
      if(options.backgroundColor) {
        this.options.style.background = options.backgroundColor;
      }

      // Returning the current object for chaining functions
      return this;
    },

    // Building the DOM element
    buildToast: function() {
      // Validating if the options are defined
      if (!this.options) {
        throw "Toastify is not initialized";
      }

      // Creating the DOM object
      var divElement = document.createElement("div");
      divElement.className = "toastify on " + this.options.className;

      // Positioning toast to left or right or center
      if (!!this.options.position) {
        divElement.className += " toastify-" + this.options.position;
      } else {
        // To be depreciated in further versions
        if (this.options.positionLeft === true) {
          divElement.className += " toastify-left";
          console.warn('Property `positionLeft` will be depreciated in further versions. Please use `position` instead.')
        } else {
          // Default position
          divElement.className += " toastify-right";
        }
      }

      // Assigning gravity of element
      divElement.className += " " + this.options.gravity;

      if (this.options.backgroundColor) {
        // This is being deprecated in favor of using the style HTML DOM property
        console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');
      }

      // Loop through our style object and apply styles to divElement
      for (var property in this.options.style) {
        divElement.style[property] = this.options.style[property];
      }

      // Announce the toast to screen readers
      if (this.options.ariaLive) {
        divElement.setAttribute('aria-live', this.options.ariaLive)
      }

      // Adding the toast message/node
      if (this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) {
        // If we have a valid node, we insert it
        divElement.appendChild(this.options.node)
      } else {
        if (this.options.escapeMarkup) {
          divElement.innerText = this.options.text;
        } else {
          divElement.innerHTML = this.options.text;
        }

        if (this.options.avatar !== "") {
          var avatarElement = document.createElement("img");
          avatarElement.src = this.options.avatar;

          avatarElement.className = "toastify-avatar";

          if (this.options.position == "left" || this.options.positionLeft === true) {
            // Adding close icon on the left of content
            divElement.appendChild(avatarElement);
          } else {
            // Adding close icon on the right of content
            divElement.insertAdjacentElement("afterbegin", avatarElement);
          }
        }
      }

      // Adding a close icon to the toast
      if (this.options.close === true) {
        // Create a span for close element
        var closeElement = document.createElement("button");
        closeElement.type = "button";
        closeElement.setAttribute("aria-label", "Close");
        closeElement.className = "toast-close";
        closeElement.innerHTML = "&#10006;";

        // Triggering the removal of toast from DOM on close click
        closeElement.addEventListener(
          "click",
          function(event) {
            event.stopPropagation();
            this.removeElement(this.toastElement);
            window.clearTimeout(this.toastElement.timeOutValue);
          }.bind(this)
        );

        //Calculating screen width
        var width = window.innerWidth > 0 ? window.innerWidth : screen.width;

        // Adding the close icon to the toast element
        // Display on the right if screen width is less than or equal to 360px
        if ((this.options.position == "left" || this.options.positionLeft === true) && width > 360) {
          // Adding close icon on the left of content
          divElement.insertAdjacentElement("afterbegin", closeElement);
        } else {
          // Adding close icon on the right of content
          divElement.appendChild(closeElement);
        }
      }

      // Clear timeout while toast is focused
      if (this.options.stopOnFocus && this.options.duration > 0) {
        var self = this;
        // stop countdown
        divElement.addEventListener(
          "mouseover",
          function(event) {
            window.clearTimeout(divElement.timeOutValue);
          }
        )
        // add back the timeout
        divElement.addEventListener(
          "mouseleave",
          function() {
            divElement.timeOutValue = window.setTimeout(
              function() {
                // Remove the toast from DOM
                self.removeElement(divElement);
              },
              self.options.duration
            )
          }
        )
      }

      // Adding an on-click destination path
      if (typeof this.options.destination !== "undefined") {
        divElement.addEventListener(
          "click",
          function(event) {
            event.stopPropagation();
            if (this.options.newWindow === true) {
              window.open(this.options.destination, "_blank");
            } else {
              window.location = this.options.destination;
            }
          }.bind(this)
        );
      }

      if (typeof this.options.onClick === "function" && typeof this.options.destination === "undefined") {
        divElement.addEventListener(
          "click",
          function(event) {
            event.stopPropagation();
            this.options.onClick();
          }.bind(this)
        );
      }

      // Adding offset
      if(typeof this.options.offset === "object") {

        var x = getAxisOffsetAValue("x", this.options);
        var y = getAxisOffsetAValue("y", this.options);

        var xOffset = this.options.position == "left" ? x : "-" + x;
        var yOffset = this.options.gravity == "toastify-top" ? y : "-" + y;

        divElement.style.transform = "translate(" + xOffset + "," + yOffset + ")";

      }

      // Returning the generated element
      return divElement;
    },

    // Displaying the toast
    showToast: function() {
      // Creating the DOM object for the toast
      this.toastElement = this.buildToast();

      // Getting the root element to with the toast needs to be added
      var rootElement;
      if (typeof this.options.selector === "string") {
        rootElement = document.getElementById(this.options.selector);
      } else if (this.options.selector instanceof HTMLElement || (typeof ShadowRoot !== 'undefined' && this.options.selector instanceof ShadowRoot)) {
        rootElement = this.options.selector;
      } else {
        rootElement = document.body;
      }

      // Validating if root element is present in DOM
      if (!rootElement) {
        throw "Root element is not defined";
      }

      // Adding the DOM element
      var elementToInsert = Toastify.defaults.oldestFirst ? rootElement.firstChild : rootElement.lastChild;
      rootElement.insertBefore(this.toastElement, elementToInsert);

      // Repositioning the toasts in case multiple toasts are present
      Toastify.reposition();

      if (this.options.duration > 0) {
        this.toastElement.timeOutValue = window.setTimeout(
          function() {
            // Remove the toast from DOM
            this.removeElement(this.toastElement);
          }.bind(this),
          this.options.duration
        ); // Binding `this` for function invocation
      }

      // Supporting function chaining
      return this;
    },

    hideToast: function() {
      if (this.toastElement.timeOutValue) {
        clearTimeout(this.toastElement.timeOutValue);
      }
      this.removeElement(this.toastElement);
    },

    // Removing the element from the DOM
    removeElement: function(toastElement) {
      // Hiding the element
      // toastElement.classList.remove("on");
      toastElement.className = toastElement.className.replace(" on", "");

      // Removing the element from DOM after transition end
      window.setTimeout(
        function() {
          // remove options node if any
          if (this.options.node && this.options.node.parentNode) {
            this.options.node.parentNode.removeChild(this.options.node);
          }

          // Remove the element from the DOM, only when the parent node was not removed before.
          if (toastElement.parentNode) {
            toastElement.parentNode.removeChild(toastElement);
          }

          // Calling the callback function
          this.options.callback.call(toastElement);

          // Repositioning the toasts again
          Toastify.reposition();
        }.bind(this),
        400
      ); // Binding `this` for function invocation
    },
  };

  // Positioning the toasts on the DOM
  Toastify.reposition = function() {

    // Top margins with gravity
    var topLeftOffsetSize = {
      top: 15,
      bottom: 15,
    };
    var topRightOffsetSize = {
      top: 15,
      bottom: 15,
    };
    var offsetSize = {
      top: 15,
      bottom: 15,
    };

    // Get all toast messages on the DOM
    var allToasts = document.getElementsByClassName("toastify");

    var classUsed;

    // Modifying the position of each toast element
    for (var i = 0; i < allToasts.length; i++) {
      // Getting the applied gravity
      if (containsClass(allToasts[i], "toastify-top") === true) {
        classUsed = "toastify-top";
      } else {
        classUsed = "toastify-bottom";
      }

      var height = allToasts[i].offsetHeight;
      classUsed = classUsed.substr(9, classUsed.length-1)
      // Spacing between toasts
      var offset = 15;

      var width = window.innerWidth > 0 ? window.innerWidth : screen.width;

      // Show toast in center if screen with less than or equal to 360px
      if (width <= 360) {
        // Setting the position
        allToasts[i].style[classUsed] = offsetSize[classUsed] + "px";

        offsetSize[classUsed] += height + offset;
      } else {
        if (containsClass(allToasts[i], "toastify-left") === true) {
          // Setting the position
          allToasts[i].style[classUsed] = topLeftOffsetSize[classUsed] + "px";

          topLeftOffsetSize[classUsed] += height + offset;
        } else {
          // Setting the position
          allToasts[i].style[classUsed] = topRightOffsetSize[classUsed] + "px";

          topRightOffsetSize[classUsed] += height + offset;
        }
      }
    }

    // Supporting function chaining
    return this;
  };

  // Helper function to get offset.
  function getAxisOffsetAValue(axis, options) {

    if(options.offset[axis]) {
      if(isNaN(options.offset[axis])) {
        return options.offset[axis];
      }
      else {
        return options.offset[axis] + 'px';
      }
    }

    return '0px';

  }

  function containsClass(elem, yourClass) {
    if (!elem || typeof yourClass !== "string") {
      return false;
    } else if (
      elem.className &&
      elem.className
        .trim()
        .split(/\s+/gi)
        .indexOf(yourClass) > -1
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Setting up the prototype for the init object
  Toastify.lib.init.prototype = Toastify.lib;

  // Returning the Toastify function to be assigned to the window object/module
  return Toastify;
});


/***/ },

/***/ "react"
/*!************************!*\
  !*** external "React" ***!
  \************************/
(module) {

"use strict";
module.exports = window["React"];

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			const getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.hasOwn(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!*************************************************!*\
  !*** ./assets/src/apps/js/admin/pages/tools.js ***!
  \*************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tools_database_upgrade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/database/upgrade */ "./assets/src/apps/js/admin/pages/tools/database/upgrade.js");
/* harmony import */ var _tools_database_create_indexs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools/database/create_indexs */ "./assets/src/apps/js/admin/pages/tools/database/create_indexs.js");
/* harmony import */ var _tools_database_re_upgrade_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tools/database/re-upgrade-db */ "./assets/src/apps/js/admin/pages/tools/database/re-upgrade-db.js");
/* harmony import */ var _tools_database_clean_database__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tools/database/clean_database */ "./assets/src/apps/js/admin/pages/tools/database/clean_database.js");
/* harmony import */ var _tools_reset_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tools/reset-data */ "./assets/src/apps/js/admin/pages/tools/reset-data/index.js");
/* harmony import */ var _tools_handle_sample_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tools/handle-sample-data */ "./assets/src/apps/js/admin/pages/tools/handle-sample-data.js");






(function ($) {
  const $doc = $(document);
  const clearHardCache = function clearHardCache(e) {
    e.preventDefault();
    const $button = $(this);
    if ($button.hasClass('disabled')) {
      return;
    }
    $button.addClass('disabled').html($button.data('cleaning-text'));
    $.ajax({
      url: $button.attr('href'),
      data: {},
      success(response) {
        $button.removeClass('disabled').html($button.data('text'));
      },
      error() {
        $button.removeClass('disabled').html($button.data('text'));
      }
    });
  };
  const toggleHardCache = function toggleHardCache() {
    $.ajax({
      url: 'admin.php?page=lp-toggle-hard-cache-option',
      data: {
        v: this.checked ? 'yes' : 'no'
      },
      success(response) {},
      error() {}
    });
  };
  $(function () {
    (0,_tools_database_upgrade__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_tools_database_create_indexs__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_tools_database_re_upgrade_db__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_tools_reset_data__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_tools_database_clean_database__WEBPACK_IMPORTED_MODULE_3__["default"])();
    new _tools_handle_sample_data__WEBPACK_IMPORTED_MODULE_5__["default"]().init();
    $doc.on('click', '#learn-press-clear-cache', clearHardCache).on('click', 'input[name="enable_hard_cache"]', toggleHardCache);
  });
})(jQuery);
})();

/******/ })()
;
//# sourceMappingURL=tools.js.map