/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/src/js/api.js":
/*!******************************!*\
  !*** ./assets/src/js/api.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * List API on backend
 *
 * @since 4.2.6
 * @version 1.0.2
 */

const lplistAPI = {};
let lp_rest_url;
if ('undefined' !== typeof lpDataAdmin) {
  lp_rest_url = lpDataAdmin.lp_rest_url;
  lplistAPI.admin = {
    apiAdminNotice: lp_rest_url + 'lp/v1/admin/tools/admin-notices',
    apiAdminOrderStatic: lp_rest_url + 'lp/v1/orders/statistic',
    apiAddons: lp_rest_url + 'lp/v1/addon/all',
    apiAddonAction: lp_rest_url + 'lp/v1/addon/action-n',
    apiAddonsPurchase: lp_rest_url + 'lp/v1/addon/info-addons-purchase',
    apiSearchCourses: lp_rest_url + 'lp/v1/admin/tools/search-course',
    apiSearchUsers: lp_rest_url + 'lp/v1/admin/tools/search-user',
    apiAssignUserCourse: lp_rest_url + 'lp/v1/admin/tools/assign-user-course',
    apiUnAssignUserCourse: lp_rest_url + 'lp/v1/admin/tools/unassign-user-course'
  };
}
if ('undefined' !== typeof lpData) {
  lp_rest_url = lpData.lp_rest_url;
  lplistAPI.frontend = {
    apiWidgets: lp_rest_url + 'lp/v1/widgets/api',
    apiCourses: lp_rest_url + 'lp/v1/courses/archive-course',
    apiAJAX: lp_rest_url + 'lp/v1/load_content_via_ajax/',
    apiProfileCoverImage: lp_rest_url + 'lp/v1/profile/cover-image'
  };
}
if (lp_rest_url) {
  lplistAPI.apiCourses = lp_rest_url + 'lp/v1/courses/';
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lplistAPI);

/***/ }),

/***/ "./assets/src/js/frontend/profile/avatar.js":
/*!**************************************************!*\
  !*** ./assets/src/js/frontend/profile/avatar.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var cropperjs_dist_cropper_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cropperjs/dist/cropper.css */ "./node_modules/cropperjs/dist/cropper.css");
/* harmony import */ var cropperjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cropperjs */ "./node_modules/cropperjs/dist/cropper.js");
/* harmony import */ var cropperjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cropperjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils.js */ "./assets/src/js/utils.js");
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! toastify-js */ "./node_modules/toastify-js/src/toastify.js");
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(toastify_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var toastify_js_src_toastify_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! toastify-js/src/toastify.css */ "./node_modules/toastify-js/src/toastify.css");



// import API from '../../api.js';


const profileAvatarImage = () => {
  const lpAvatarWrapper = document.querySelector('#learnpress-avatar-upload');
  if (!lpAvatarWrapper) {
    return;
  }
  let cropper, avatarPreviewSrc, imgUrlOriginal;
  let avatarForm = lpAvatarWrapper.querySelector('.lp_avatar__form');
  const btnRemove = lpAvatarWrapper.querySelector('.lp-btn-remove-avatar'),
    btnReplace = lpAvatarWrapper.querySelector('.lp-btn-choose-avatar'),
    btnSave = lpAvatarWrapper.querySelector('.lp-btn-save-avatar'),
    btnCancel = lpAvatarWrapper.querySelector('.lp-btn-cancel-avatar'),
    avatarPreviewImage = lpAvatarWrapper.querySelector('.lp-avatar-image'),
    avatarInputFile = lpAvatarWrapper.querySelector('#avatar-file'),
    profileAvatar = document.querySelector('.wrapper-profile-header .user-avatar img');
  const avatarRatio = parseFloat((lpProfileSettings.avatar_dimensions.width / lpProfileSettings.avatar_dimensions.height).toFixed(2));
  lpAvatarWrapper.addEventListener('click', e => {
    const target = e.target;
    if (target === btnReplace) {
      e.preventDefault();
      avatarInputFile.click();
    } else if (target === btnSave) {
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpSetLoadingEl(btnSave, 1);
      btnSave.disabled = true;
      if (undefined !== cropper) {
        const canvas = cropper.getCroppedCanvas({
          width: lpProfileSettings.avatar_dimensions.width,
          height: lpProfileSettings.avatar_dimensions.height
        });
        const newCropSrc = canvas.toDataURL('image/png');
        if (profileAvatar) {
          profileAvatar.src = newCropSrc;
        }
        avatarPreviewImage.src = newCropSrc;
        const formData = new FormData();
        formData.append('file', newCropSrc);
        uploadAvatar(formData);
      }
    } else if (target === btnCancel) {
      e.preventDefault();
      cropper.destroy();
      avatarPreviewImage.src = imgUrlOriginal;
      if (imgUrlOriginal === window.location.href) {
        _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(avatarForm, 1);
        _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(btnReplace, 0);
        _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(avatarPreviewImage, 0);
      } else {
        _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(btnRemove, 1);
      }
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(btnSave, 0);
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(btnCancel, 0);
    } else if (target === btnRemove) {
      btnRemove.disabled = true;
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpSetLoadingEl(btnRemove, 1);
      removeAvatar();
    }
  });
  lpAvatarWrapper.addEventListener('change', e => {
    const target = e.target;
    if (target === avatarInputFile) {
      const file = avatarInputFile.files[0];
      if (!file) {
        return;
      }
      const allowType = ['image/png', 'image/jpeg', 'image/webp'];
      if (allowType.indexOf(file.type) < 0) {
        return;
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        avatarPreviewImage.src = e.target.result;
        // Destroy previous cropper instance if any
        if (cropper) {
          cropper.destroy();
        }
        // Initialize cropper
        cropper = new (cropperjs__WEBPACK_IMPORTED_MODULE_1___default())(avatarPreviewImage, {
          aspectRatio: avatarRatio,
          viewMode: 1,
          zoomOnWheel: false
        });
      };
      reader.readAsDataURL(file);
      if (!avatarPreviewImage.classList.contains('lp-hidden')) {
        _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(avatarPreviewImage, 1);
      }
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(avatarForm, 0);
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(btnSave, 1);
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(btnReplace, 1);
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(btnCancel, 1);
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(btnRemove, 0);
    }
  });
  const uploadAvatar = formData => {
    fetch(`${lpData.lp_rest_url}lp/v1/profile/upload-avatar`, {
      method: 'POST',
      headers: {
        'X-WP-Nonce': lpData.nonce
      },
      body: formData
    }) // wrapped
    .then(res => res.json()).then(res => {
      if (res.status === 'error') {
        throw new Error(res.message);
      }
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(avatarPreviewImage, 1);
      showMessage('success', res.message);
      if (undefined !== cropper) {
        cropper.destroy();
      }
      imgUrlOriginal = avatarPreviewImage.src;
    }).finally(() => {
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(btnSave, 0);
      btnSave.disabled = false;
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpSetLoadingEl(btnSave, 0);
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(btnCancel, 0);
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(btnRemove, 1);
    }).catch(err => console.log(err));
  };
  const removeAvatar = () => {
    fetch(`${lpData.lp_rest_url}lp/v1/profile/remove-avatar`, {
      method: 'POST',
      headers: {
        'X-WP-Nonce': lpData.nonce
      }
    }) // wrapped
    .then(res => res.json()).then(res => {
      if (res.status === 'error') {
        throw new Error(res.message);
      }
      showMessage('success', res.message);
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(avatarPreviewImage, 0);
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(avatarForm, 1);
      imgUrlOriginal = avatarPreviewSrc = '';
      profileAvatar.src = lpProfileSettings.default_avatar;
      // window.location.href = window.location.href;
    }).finally(() => {
      btnRemove.disabled = false;
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(btnRemove, 0);
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpSetLoadingEl(btnRemove, 0);
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(btnReplace, 0);
    }).catch(err => console.log(err));
  };
  const showMessage = (status, message) => {
    toastify_js__WEBPACK_IMPORTED_MODULE_3___default()({
      text: message,
      gravity: lpData.toast.gravity,
      // `top` or `bottom`
      position: lpData.toast.position,
      // `left`, `center` or `right`
      className: `${lpData.toast.classPrefix} ${status}`,
      close: lpData.toast.close == 1,
      stopOnFocus: lpData.toast.stopOnFocus == 1,
      duration: lpData.toast.duration
    }).showToast();
  };
  _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpOnElementReady('.lp-avatar-image', () => {
    imgUrlOriginal = avatarPreviewImage.src;
  });
  _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpOnElementReady('#learnpress-avatar-upload', e => {
    e.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (profileAvatarImage);

/***/ }),

/***/ "./assets/src/js/frontend/profile/course-tab.js":
/*!******************************************************!*\
  !*** ./assets/src/js/frontend/profile/course-tab.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils.js */ "./assets/src/js/utils.js");


// Rest API load content course enrolled, created - Nhamdv.
const courseTab = () => {
  const elements = document.querySelectorAll('.learn-press-course-tab__filter__content');
  const getResponse = (ele, dataset, append = false, viewMoreEle = false) => {
    let url = lpData.lp_rest_url + 'lp/v1/profile/course-tab';
    url = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.lpAddQueryArgs)(url, dataset);
    const callBack = {
      success: response => {
        const skeleton = ele.querySelector('.lp-skeleton-animation');
        skeleton && skeleton.remove();
        if (response.status === 'success' && response.data) {
          if (append) {
            ele.innerHTML += response.data;
          } else {
            ele.innerHTML = response.data;
          }
        } else if (append) {
          ele.innerHTML += `<div class="lp-ajax-message" style="display:block">${response.message && response.message}</div>`;
        } else {
          ele.innerHTML = `<div class="lp-ajax-message" style="display:block">${response.message && response.message}</div>`;
        }
        if (viewMoreEle) {
          viewMoreEle.classList.remove('loading');
          const paged = parseInt(viewMoreEle.dataset.paged);
          const numberPage = parseInt(viewMoreEle.dataset.number);
          if (numberPage <= paged) {
            viewMoreEle.remove();
          }
          viewMoreEle.dataset.paged = paged + 1;
        }
        viewMore(ele, dataset);
      },
      error: error => {
        console.log(error);
      },
      completed: () => {}
    };
    let paramsFetch = {};
    if (0 !== parseInt(lpData.user_id)) {
      paramsFetch = {
        headers: {
          'X-WP-Nonce': lpData.nonce
        }
      };
    }
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.lpFetchAPI)(url, paramsFetch, callBack);
  };
  if ('IntersectionObserver' in window) {
    const eleObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const ele = entry.target;
          const params = ele.parentNode.querySelector('.lp_profile_tab_input_param');
          const data = {
            ...JSON.parse(params.value),
            status: ele.dataset.tab || ''
          };
          getResponse(ele, data);
          eleObserver.unobserve(ele);
        }
      });
    });
    [...elements].map(ele => {
      if (ele.dataset.tab !== 'all') {
        eleObserver.observe(ele);
      } else {
        const params = ele.parentNode.querySelector('.lp_profile_tab_input_param');
        const data = {
          ...JSON.parse(params.value),
          status: ele.dataset.tab === 'all' ? '' : ele.dataset.tab || ''
        };
        getResponse(ele, data);
      }
    });
  }
  const changeFilter = () => {
    const tabs = document.querySelectorAll('.learn-press-course-tab-filters');
    tabs.forEach(tab => {
      const filters = tab.querySelectorAll('.learn-press-filters a');
      filters.forEach(filter => {
        filter.addEventListener('click', e => {
          e.preventDefault();
          const tabName = filter.dataset.tab;
          [...filters].map(ele => {
            ele.classList.remove('active');
          });
          filter.classList.add('active');
          [...tab.querySelectorAll('.learn-press-course-tab__filter__content')].map(ele => {
            ele.style.display = 'none';
            if (ele.dataset.tab === tabName) {
              ele.style.display = '';
            }
          });
        });
      });
    });
  };
  changeFilter();
  const viewMore = (ele, dataset) => {
    const viewMoreEle = ele.querySelector('button[data-paged]');
    if (viewMoreEle) {
      viewMoreEle.addEventListener('click', e => {
        e.preventDefault();
        const paged = viewMoreEle && viewMoreEle.dataset.paged;
        viewMoreEle.classList.add('loading');
        const element = dataset.layout === 'list' ? '.lp_profile_course_progress' : '.learn-press-courses';
        getResponse(ele.querySelector(element), {
          ...dataset,
          ...{
            paged
          }
        }, true, viewMoreEle);
      });
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (courseTab);

/***/ }),

/***/ "./assets/src/js/frontend/profile/cover-image.js":
/*!*******************************************************!*\
  !*** ./assets/src/js/frontend/profile/cover-image.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var cropperjs_dist_cropper_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cropperjs/dist/cropper.css */ "./node_modules/cropperjs/dist/cropper.css");
/* harmony import */ var cropperjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cropperjs */ "./node_modules/cropperjs/dist/cropper.js");
/* harmony import */ var cropperjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cropperjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils.js */ "./assets/src/js/utils.js");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../api.js */ "./assets/src/js/api.js");
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! toastify-js */ "./node_modules/toastify-js/src/toastify.js");
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(toastify_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var toastify_js_src_toastify_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! toastify-js/src/toastify.css */ "./node_modules/toastify-js/src/toastify.css");






const profileCoverImage = () => {
  const lpSet = new Set();
  let cropper;
  let elBtnSave, elBtnRemove, elBtnChoose, elBtnCancel, elImagePreview, elCoverImageBackground, elImgCoverImageBackground, elImageEmpty, formCoverImage, elInputFile, elAction, imgUrlOriginal;
  const className = {
    formCoverImage: 'lp-user-cover-image',
    BtnChooseCoverImage: 'lp-btn-choose-cover-image',
    BtnSaveCoverImage: 'lp-btn-save-cover-image',
    BtnRemoveCoverImage: 'lp-btn-remove-cover-image',
    BtnCancelCoverImage: 'lp-btn-cancel-cover-image',
    BtnToEditCoverImage: 'lp-btn-to-edit-cover-image',
    CoverImagePreview: 'lp-cover-image-preview',
    CoverImageEmpty: 'lp-cover-image-empty',
    CoverImageBackground: 'lp-user-cover-image_background',
    InputFile: 'lp-cover-image-file',
    loading: 'loading',
    hidden: 'lp-hidden'
  };

  /**
   * Get elements to use.
   */
  const getElements = () => {
    elBtnSave = formCoverImage.querySelector(`.${className.BtnSaveCoverImage}`);
    elBtnChoose = formCoverImage.querySelector(`.${className.BtnChooseCoverImage}`);
    elBtnRemove = formCoverImage.querySelector(`.${className.BtnRemoveCoverImage}`);
    elBtnCancel = formCoverImage.querySelector(`.${className.BtnCancelCoverImage}`);
    elImagePreview = formCoverImage.querySelector(`.${className.CoverImagePreview}`);
    elCoverImageBackground = document.querySelector(`.${className.CoverImageBackground}`);
    elImgCoverImageBackground = elCoverImageBackground.querySelector(`img`);
    elImageEmpty = formCoverImage.querySelector(`.${className.CoverImageEmpty}`);
    elAction = formCoverImage.querySelector('input[name=action]');
    elInputFile = formCoverImage.querySelector('input[name=lp-cover-image-file]');
    if (!lpSet.has('everClick')) {
      imgUrlOriginal = elImagePreview.src;
      lpSet.add('everClick');
    }
  };
  const fetchAPI = formData => {
    const callBack = {
      success: response => {
        const {
          status,
          message,
          data
        } = response;
        toastify_js__WEBPACK_IMPORTED_MODULE_4___default()({
          text: message,
          gravity: lpData.toast.gravity,
          // `top` or `bottom`
          position: lpData.toast.position,
          // `left`, `center` or `right`
          className: `${lpData.toast.classPrefix} ${status}`,
          close: lpData.toast.close == 1,
          stopOnFocus: lpData.toast.stopOnFocus == 1,
          duration: lpData.toast.duration
        }).showToast();
        if ('remove' === data.action) {
          _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(elBtnRemove, 0);
          _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(elBtnChoose, 0);
          elImagePreview.src = '';
          _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(elImagePreview, 0);
          _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(elImageEmpty, 1);
          if (elCoverImageBackground) {
            _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(elCoverImageBackground, 0);
          }
        } else if ('upload' === data.action) {
          _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(elImagePreview, 1);
          elImagePreview.src = data.url;
          imgUrlOriginal = data.url;
          cropper.destroy();
        }
        imgUrlOriginal = elImagePreview.src;
      },
      error: error => {
        console.log(error);
      },
      completed: () => {
        _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(elBtnSave, 0);
        _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpSetLoadingEl(elBtnSave, 0);
        _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpSetLoadingEl(elBtnRemove, 0);
        _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(elBtnCancel, 0);
        if (!elImagePreview.src || elImagePreview.src === window.location.href) {
          _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(elBtnRemove, 0);
        } else {
          _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(elBtnRemove, 1);
        }
      }
    };
    const url = _api_js__WEBPACK_IMPORTED_MODULE_3__["default"].frontend.apiProfileCoverImage;
    const option = {
      headers: {}
    };
    if (0 !== parseInt(lpData.user_id)) {
      option.headers['X-WP-Nonce'] = lpData.nonce;
    }
    option.method = 'POST';
    option.body = formData;
    _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpFetchAPI(url, option, callBack);
  };

  // Events
  document.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains(className.BtnToEditCoverImage)) {
      formCoverImage = document.querySelector(`.${className.formCoverImage}`);
      if (!formCoverImage) {
        return;
      }
      const isCorrectSection = target.dataset.sectionCorrect == 1;
      if (isCorrectSection) {
        e.preventDefault();
        formCoverImage.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
    formCoverImage = target.closest(`.${className.formCoverImage}`);
    if (!formCoverImage) {
      return;
    }
    getElements();
    if (target.classList.contains(className.BtnChooseCoverImage)) {
      e.preventDefault();
      elInputFile.click();
    }
    if (target.classList.contains(className.BtnSaveCoverImage)) {
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpSetLoadingEl(elBtnSave, 1);
    }
    if (target.classList.contains(className.BtnCancelCoverImage)) {
      e.preventDefault();
      cropper.destroy();
      elImagePreview.src = imgUrlOriginal;
      if (imgUrlOriginal === window.location.href) {
        _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(elImageEmpty, 1);
        _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(elBtnChoose, 0);
        _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(elImagePreview, 0);
      } else {
        _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(elBtnRemove, 1);
      }
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(elBtnSave, 0);
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(elBtnCancel, 0);
    }
    if (target.classList.contains(className.BtnRemoveCoverImage)) {
      e.preventDefault();
      target.classList.add('loading');
      if (cropper) {
        cropper.destroy();
        cropper = undefined;
      }
      elAction.value = 'remove';
      elBtnSave.click();
    }
    if (target.classList.contains(className.CoverImageEmpty)) {
      e.preventDefault();
      elInputFile.click();
    }
  });
  document.addEventListener('change', e => {
    const target = e.target;
    formCoverImage = target.closest(`.${className.formCoverImage}`);
    if (!formCoverImage) {
      return;
    }
    getElements();
    if (target.classList.contains(className.InputFile)) {
      e.preventDefault();
      const file = target.files[0];
      if (!file) {
        return;
      }
      const allowType = ['image/png', 'image/jpeg', 'image/webp'];
      if (allowType.indexOf(file.type) < 0) {
        return;
      }
      elAction.value = 'upload';
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(elImagePreview, 1);
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(elImageEmpty, 0);
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(elBtnRemove, 0);
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(elBtnSave, 1);
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(elBtnChoose, 1);
      _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(elBtnCancel, 1);
      const reader = new FileReader();
      reader.onload = function (e) {
        elImagePreview.src = e.target.result;
        // Destroy previous cropper instance if any
        if (cropper) {
          cropper.destroy();
        }
        // Initialize cropper
        cropper = new (cropperjs__WEBPACK_IMPORTED_MODULE_1___default())(elImagePreview, {
          aspectRatio: lpData.coverImageRatio,
          viewMode: 1,
          zoomOnWheel: false
        });
      };
      reader.readAsDataURL(file);
    }
  });
  document.addEventListener('submit', e => {
    const target = e.target;
    if (target.classList.contains(className.formCoverImage)) {
      e.preventDefault();
      const formData = new FormData(target);
      if (undefined !== cropper) {
        const canvas = cropper.getCroppedCanvas({});
        if (elCoverImageBackground) {
          const dataUrl = canvas.toDataURL('image/png');
          elCoverImageBackground.style.backgroundImage = `url(${dataUrl})`;
          elImgCoverImageBackground.src = dataUrl;
          _utils_js__WEBPACK_IMPORTED_MODULE_2__.lpShowHideEl(elCoverImageBackground, 1);
        }
        canvas.toBlob(blob => {
          formData.append('image', blob, 'cover.png');
          fetchAPI(formData);
        }, 'image/png');
      } else {
        fetchAPI(formData);
      }
    }
  });
  document.addEventListener('DOMContentLoaded', e => {
    const elBtnToEditCoverImage = document.querySelector(`.${className.BtnToEditCoverImage}`);
    const formCoverImage = document.querySelector(`.${className.formCoverImage}`);
    if (elBtnToEditCoverImage && formCoverImage) {
      const isCorrectSection = elBtnToEditCoverImage.dataset.sectionCorrect == 1;
      if (isCorrectSection) {
        formCoverImage.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (profileCoverImage);

/***/ }),

/***/ "./assets/src/js/frontend/profile/order-recover.js":
/*!*********************************************************!*\
  !*** ./assets/src/js/frontend/profile/order-recover.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils.js */ "./assets/src/js/utils.js");
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! toastify-js */ "./node_modules/toastify-js/src/toastify.js");
/* harmony import */ var toastify_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(toastify_js__WEBPACK_IMPORTED_MODULE_1__);



/**
 * JS Recover order
 *
 * @since 4.0.0
 * @version 1.0.1
 */
const recoverOrder = () => {
  const toastify = toastify_js__WEBPACK_IMPORTED_MODULE_1___default()({
    gravity: lpData.toast.gravity,
    // `top` or `bottom`
    position: lpData.toast.position,
    // `left`, `center` or `right`
    close: lpData.toast.close == 1,
    className: `${lpData.toast.classPrefix}`,
    stopOnFocus: lpData.toast.stopOnFocus == 1,
    duration: lpData.toast.duration
  });

  // Events
  document.addEventListener('submit', e => {
    const target = e.target;
    if (target.classList.contains('lp-order-recover')) {
      e.preventDefault();
      ajaxRecover(target);
    }
  });
  const ajaxRecover = form => {
    const status = 'error';
    const btnSubmit = form.querySelector('.button-recover-order');
    if (!btnSubmit) {
      return;
    }
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.lpSetLoadingEl)(btnSubmit, 1);
    const url = new URL(window.location.href);
    fetch(url, {
      method: 'POST',
      body: new FormData(form)
    }).then(response => {
      return response.json();
    }).then(res => {
      const {
        status,
        data: {
          redirect
        },
        message
      } = res;
      if (status === 'success') {
        toastify.options.text = message;
        toastify.options.className += ` ${status}`;
        toastify.showToast();
        if (redirect) {
          window.location.href = redirect;
        }
        btnSubmit.remove();
      } else {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.lpSetLoadingEl)(btnSubmit, 0);
        throw new Error(message);
      }
    }).finally(() => {}).catch(err => {
      toastify.options.text = err.message;
      toastify.options.className += ` ${status}`;
      toastify.showToast();
    });
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (recoverOrder);

/***/ }),

/***/ "./assets/src/js/frontend/profile/quiz.js":
/*!************************************************!*\
  !*** ./assets/src/js/frontend/profile/quiz.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Handle click tab call API
 *
 * @since 4.2.8.2
 * @version 1.0.0
 */
const profileQuizTab = () => {
  const handleClickTab = (e, target) => {
    if (target.closest('span')) {
      const elParent = target.closest('#profile-content-quizzes');
      if (!elParent) {
        return;
      }
      const elLPTarget = target.closest('.lp-target');
      if (!elLPTarget) {
        return;
      }
      window.lpAJAXG.showHideLoading(elLPTarget, 1);
      const dataSendJson = elLPTarget?.dataset?.send || {};
      const dataSend = JSON.parse(dataSendJson);
      const elTabChoice = target?.dataset?.filter || 'all';
      const liActive = elParent.querySelector('li.active');
      if (liActive.classList.contains(elTabChoice)) {
        return;
      }
      liActive.classList.remove('active');
      const liTarget = target.closest('li');
      liTarget.classList.add('active');
      dataSend.args.type = elTabChoice;

      // Load list courses by AJAX.
      const callBack = {
        success: response => {
          const {
            data,
            message,
            status
          } = response;
          if ('success' === status) {
            elLPTarget.innerHTML = data.content || '';
          }
        },
        error: error => {
          console.log(error);
        },
        completed: () => {
          window.lpAJAXG.showHideLoading(elLPTarget, 0);
        }
      };
      window.lpAJAXG.fetchAJAX(dataSend, callBack);
    }
  };
  document.addEventListener('click', e => {
    const target = e.target;
    handleClickTab(e, target);
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (profileQuizTab);

/***/ }),

/***/ "./assets/src/js/frontend/profile/statistic.js":
/*!*****************************************************!*\
  !*** ./assets/src/js/frontend/profile/statistic.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils.js */ "./assets/src/js/utils.js");


// Rest API load content course progress - Nhamdv.
const courseStatistics = () => {
  const loadAPICourseStatistic = elCourseStatistic => {
    let apiUrl = 'lp/v1/profile/student/statistic';
    const tabActive = document.querySelector('.lp-profile-nav-tabs li.active');
    if (!tabActive) {
      return;
    }
    if (tabActive.classList.contains('courses')) {
      apiUrl = 'lp/v1/profile/instructor/statistic';
    }
    const elArgStatistic = elCourseStatistic.querySelector('[name="args_query_user_courses_statistic"]');
    if (!elArgStatistic) {
      return;
    }
    const data = JSON.parse(elArgStatistic.value);
    const callBack = {
      success: response => {
        if (response.status === 'success' && response.data) {
          elCourseStatistic.innerHTML = response.data;
        } else {
          elCourseStatistic.innerHTML = `<div class="lp-ajax-message error" style="display:block">${response.message && response.message}</div>`;
        }
      },
      error: error => {
        console.log(error);
      },
      completed: () => {}
    };
    apiUrl = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.lpAddQueryArgs)(lpData.lp_rest_url + apiUrl, data);
    if (0 !== parseInt(lpData.user_id)) {
      data.headers = {
        'X-WP-Nonce': lpData.nonce
      };
    }
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.lpFetchAPI)(apiUrl, data, callBack);
  };
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.lpOnElementReady)('.learn-press-profile-course__statistic', elCourseStatistic => {
    loadAPICourseStatistic(elCourseStatistic);
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (courseStatistics);

/***/ }),

/***/ "./assets/src/js/utils.js":
/*!********************************!*\
  !*** ./assets/src/js/utils.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   listenElementCreated: () => (/* binding */ listenElementCreated),
/* harmony export */   listenElementViewed: () => (/* binding */ listenElementViewed),
/* harmony export */   lpAddQueryArgs: () => (/* binding */ lpAddQueryArgs),
/* harmony export */   lpAjaxParseJsonOld: () => (/* binding */ lpAjaxParseJsonOld),
/* harmony export */   lpClassName: () => (/* binding */ lpClassName),
/* harmony export */   lpFetchAPI: () => (/* binding */ lpFetchAPI),
/* harmony export */   lpGetCurrentURLNoParam: () => (/* binding */ lpGetCurrentURLNoParam),
/* harmony export */   lpOnElementReady: () => (/* binding */ lpOnElementReady),
/* harmony export */   lpSetLoadingEl: () => (/* binding */ lpSetLoadingEl),
/* harmony export */   lpShowHideEl: () => (/* binding */ lpShowHideEl)
/* harmony export */ });
/**
 * Utils functions
 *
 * @param url
 * @param data
 * @param functions
 * @since 4.2.5.1
 * @version 1.0.3
 */
const lpClassName = {
  hidden: 'lp-hidden',
  loading: 'loading'
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


/***/ }),

/***/ "./node_modules/cropperjs/dist/cropper.js":
/*!************************************************!*\
  !*** ./node_modules/cropperjs/dist/cropper.js ***!
  \************************************************/
/***/ (function(module) {

/*!
 * Cropper.js v1.6.2
 * https://fengyuanchen.github.io/cropperjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2024-04-21T07:43:05.335Z
 */

(function (global, factory) {
   true ? module.exports = factory() :
  0;
})(this, (function () { 'use strict';

  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
  var WINDOW = IS_BROWSER ? window : {};
  var IS_TOUCH_DEVICE = IS_BROWSER && WINDOW.document.documentElement ? 'ontouchstart' in WINDOW.document.documentElement : false;
  var HAS_POINTER_EVENT = IS_BROWSER ? 'PointerEvent' in WINDOW : false;
  var NAMESPACE = 'cropper';

  // Actions
  var ACTION_ALL = 'all';
  var ACTION_CROP = 'crop';
  var ACTION_MOVE = 'move';
  var ACTION_ZOOM = 'zoom';
  var ACTION_EAST = 'e';
  var ACTION_WEST = 'w';
  var ACTION_SOUTH = 's';
  var ACTION_NORTH = 'n';
  var ACTION_NORTH_EAST = 'ne';
  var ACTION_NORTH_WEST = 'nw';
  var ACTION_SOUTH_EAST = 'se';
  var ACTION_SOUTH_WEST = 'sw';

  // Classes
  var CLASS_CROP = "".concat(NAMESPACE, "-crop");
  var CLASS_DISABLED = "".concat(NAMESPACE, "-disabled");
  var CLASS_HIDDEN = "".concat(NAMESPACE, "-hidden");
  var CLASS_HIDE = "".concat(NAMESPACE, "-hide");
  var CLASS_INVISIBLE = "".concat(NAMESPACE, "-invisible");
  var CLASS_MODAL = "".concat(NAMESPACE, "-modal");
  var CLASS_MOVE = "".concat(NAMESPACE, "-move");

  // Data keys
  var DATA_ACTION = "".concat(NAMESPACE, "Action");
  var DATA_PREVIEW = "".concat(NAMESPACE, "Preview");

  // Drag modes
  var DRAG_MODE_CROP = 'crop';
  var DRAG_MODE_MOVE = 'move';
  var DRAG_MODE_NONE = 'none';

  // Events
  var EVENT_CROP = 'crop';
  var EVENT_CROP_END = 'cropend';
  var EVENT_CROP_MOVE = 'cropmove';
  var EVENT_CROP_START = 'cropstart';
  var EVENT_DBLCLICK = 'dblclick';
  var EVENT_TOUCH_START = IS_TOUCH_DEVICE ? 'touchstart' : 'mousedown';
  var EVENT_TOUCH_MOVE = IS_TOUCH_DEVICE ? 'touchmove' : 'mousemove';
  var EVENT_TOUCH_END = IS_TOUCH_DEVICE ? 'touchend touchcancel' : 'mouseup';
  var EVENT_POINTER_DOWN = HAS_POINTER_EVENT ? 'pointerdown' : EVENT_TOUCH_START;
  var EVENT_POINTER_MOVE = HAS_POINTER_EVENT ? 'pointermove' : EVENT_TOUCH_MOVE;
  var EVENT_POINTER_UP = HAS_POINTER_EVENT ? 'pointerup pointercancel' : EVENT_TOUCH_END;
  var EVENT_READY = 'ready';
  var EVENT_RESIZE = 'resize';
  var EVENT_WHEEL = 'wheel';
  var EVENT_ZOOM = 'zoom';

  // Mime types
  var MIME_TYPE_JPEG = 'image/jpeg';

  // RegExps
  var REGEXP_ACTIONS = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/;
  var REGEXP_DATA_URL = /^data:/;
  var REGEXP_DATA_URL_JPEG = /^data:image\/jpeg;base64,/;
  var REGEXP_TAG_NAME = /^img|canvas$/i;

  // Misc
  // Inspired by the default width and height of a canvas element.
  var MIN_CONTAINER_WIDTH = 200;
  var MIN_CONTAINER_HEIGHT = 100;

  var DEFAULTS = {
    // Define the view mode of the cropper
    viewMode: 0,
    // 0, 1, 2, 3

    // Define the dragging mode of the cropper
    dragMode: DRAG_MODE_CROP,
    // 'crop', 'move' or 'none'

    // Define the initial aspect ratio of the crop box
    initialAspectRatio: NaN,
    // Define the aspect ratio of the crop box
    aspectRatio: NaN,
    // An object with the previous cropping result data
    data: null,
    // A selector for adding extra containers to preview
    preview: '',
    // Re-render the cropper when resize the window
    responsive: true,
    // Restore the cropped area after resize the window
    restore: true,
    // Check if the current image is a cross-origin image
    checkCrossOrigin: true,
    // Check the current image's Exif Orientation information
    checkOrientation: true,
    // Show the black modal
    modal: true,
    // Show the dashed lines for guiding
    guides: true,
    // Show the center indicator for guiding
    center: true,
    // Show the white modal to highlight the crop box
    highlight: true,
    // Show the grid background
    background: true,
    // Enable to crop the image automatically when initialize
    autoCrop: true,
    // Define the percentage of automatic cropping area when initializes
    autoCropArea: 0.8,
    // Enable to move the image
    movable: true,
    // Enable to rotate the image
    rotatable: true,
    // Enable to scale the image
    scalable: true,
    // Enable to zoom the image
    zoomable: true,
    // Enable to zoom the image by dragging touch
    zoomOnTouch: true,
    // Enable to zoom the image by wheeling mouse
    zoomOnWheel: true,
    // Define zoom ratio when zoom the image by wheeling mouse
    wheelZoomRatio: 0.1,
    // Enable to move the crop box
    cropBoxMovable: true,
    // Enable to resize the crop box
    cropBoxResizable: true,
    // Toggle drag mode between "crop" and "move" when click twice on the cropper
    toggleDragModeOnDblclick: true,
    // Size limitation
    minCanvasWidth: 0,
    minCanvasHeight: 0,
    minCropBoxWidth: 0,
    minCropBoxHeight: 0,
    minContainerWidth: MIN_CONTAINER_WIDTH,
    minContainerHeight: MIN_CONTAINER_HEIGHT,
    // Shortcuts of events
    ready: null,
    cropstart: null,
    cropmove: null,
    cropend: null,
    crop: null,
    zoom: null
  };

  var TEMPLATE = '<div class="cropper-container" touch-action="none">' + '<div class="cropper-wrap-box">' + '<div class="cropper-canvas"></div>' + '</div>' + '<div class="cropper-drag-box"></div>' + '<div class="cropper-crop-box">' + '<span class="cropper-view-box"></span>' + '<span class="cropper-dashed dashed-h"></span>' + '<span class="cropper-dashed dashed-v"></span>' + '<span class="cropper-center"></span>' + '<span class="cropper-face"></span>' + '<span class="cropper-line line-e" data-cropper-action="e"></span>' + '<span class="cropper-line line-n" data-cropper-action="n"></span>' + '<span class="cropper-line line-w" data-cropper-action="w"></span>' + '<span class="cropper-line line-s" data-cropper-action="s"></span>' + '<span class="cropper-point point-e" data-cropper-action="e"></span>' + '<span class="cropper-point point-n" data-cropper-action="n"></span>' + '<span class="cropper-point point-w" data-cropper-action="w"></span>' + '<span class="cropper-point point-s" data-cropper-action="s"></span>' + '<span class="cropper-point point-ne" data-cropper-action="ne"></span>' + '<span class="cropper-point point-nw" data-cropper-action="nw"></span>' + '<span class="cropper-point point-sw" data-cropper-action="sw"></span>' + '<span class="cropper-point point-se" data-cropper-action="se"></span>' + '</div>' + '</div>';

  /**
   * Check if the given value is not a number.
   */
  var isNaN = Number.isNaN || WINDOW.isNaN;

  /**
   * Check if the given value is a number.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a number, else `false`.
   */
  function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
  }

  /**
   * Check if the given value is a positive number.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a positive number, else `false`.
   */
  var isPositiveNumber = function isPositiveNumber(value) {
    return value > 0 && value < Infinity;
  };

  /**
   * Check if the given value is undefined.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is undefined, else `false`.
   */
  function isUndefined(value) {
    return typeof value === 'undefined';
  }

  /**
   * Check if the given value is an object.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is an object, else `false`.
   */
  function isObject(value) {
    return _typeof(value) === 'object' && value !== null;
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  /**
   * Check if the given value is a plain object.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a plain object, else `false`.
   */
  function isPlainObject(value) {
    if (!isObject(value)) {
      return false;
    }
    try {
      var _constructor = value.constructor;
      var prototype = _constructor.prototype;
      return _constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if the given value is a function.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a function, else `false`.
   */
  function isFunction(value) {
    return typeof value === 'function';
  }
  var slice = Array.prototype.slice;

  /**
   * Convert array-like or iterable object to an array.
   * @param {*} value - The value to convert.
   * @returns {Array} Returns a new array.
   */
  function toArray(value) {
    return Array.from ? Array.from(value) : slice.call(value);
  }

  /**
   * Iterate the given data.
   * @param {*} data - The data to iterate.
   * @param {Function} callback - The process function for each element.
   * @returns {*} The original data.
   */
  function forEach(data, callback) {
    if (data && isFunction(callback)) {
      if (Array.isArray(data) || isNumber(data.length) /* array-like */) {
        toArray(data).forEach(function (value, key) {
          callback.call(data, value, key, data);
        });
      } else if (isObject(data)) {
        Object.keys(data).forEach(function (key) {
          callback.call(data, data[key], key, data);
        });
      }
    }
    return data;
  }

  /**
   * Extend the given object.
   * @param {*} target - The target object to extend.
   * @param {*} args - The rest objects for merging to the target object.
   * @returns {Object} The extended object.
   */
  var assign = Object.assign || function assign(target) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (isObject(target) && args.length > 0) {
      args.forEach(function (arg) {
        if (isObject(arg)) {
          Object.keys(arg).forEach(function (key) {
            target[key] = arg[key];
          });
        }
      });
    }
    return target;
  };
  var REGEXP_DECIMALS = /\.\d*(?:0|9){12}\d*$/;

  /**
   * Normalize decimal number.
   * Check out {@link https://0.30000000000000004.com/}
   * @param {number} value - The value to normalize.
   * @param {number} [times=100000000000] - The times for normalizing.
   * @returns {number} Returns the normalized number.
   */
  function normalizeDecimalNumber(value) {
    var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100000000000;
    return REGEXP_DECIMALS.test(value) ? Math.round(value * times) / times : value;
  }
  var REGEXP_SUFFIX = /^width|height|left|top|marginLeft|marginTop$/;

  /**
   * Apply styles to the given element.
   * @param {Element} element - The target element.
   * @param {Object} styles - The styles for applying.
   */
  function setStyle(element, styles) {
    var style = element.style;
    forEach(styles, function (value, property) {
      if (REGEXP_SUFFIX.test(property) && isNumber(value)) {
        value = "".concat(value, "px");
      }
      style[property] = value;
    });
  }

  /**
   * Check if the given element has a special class.
   * @param {Element} element - The element to check.
   * @param {string} value - The class to search.
   * @returns {boolean} Returns `true` if the special class was found.
   */
  function hasClass(element, value) {
    return element.classList ? element.classList.contains(value) : element.className.indexOf(value) > -1;
  }

  /**
   * Add classes to the given element.
   * @param {Element} element - The target element.
   * @param {string} value - The classes to be added.
   */
  function addClass(element, value) {
    if (!value) {
      return;
    }
    if (isNumber(element.length)) {
      forEach(element, function (elem) {
        addClass(elem, value);
      });
      return;
    }
    if (element.classList) {
      element.classList.add(value);
      return;
    }
    var className = element.className.trim();
    if (!className) {
      element.className = value;
    } else if (className.indexOf(value) < 0) {
      element.className = "".concat(className, " ").concat(value);
    }
  }

  /**
   * Remove classes from the given element.
   * @param {Element} element - The target element.
   * @param {string} value - The classes to be removed.
   */
  function removeClass(element, value) {
    if (!value) {
      return;
    }
    if (isNumber(element.length)) {
      forEach(element, function (elem) {
        removeClass(elem, value);
      });
      return;
    }
    if (element.classList) {
      element.classList.remove(value);
      return;
    }
    if (element.className.indexOf(value) >= 0) {
      element.className = element.className.replace(value, '');
    }
  }

  /**
   * Add or remove classes from the given element.
   * @param {Element} element - The target element.
   * @param {string} value - The classes to be toggled.
   * @param {boolean} added - Add only.
   */
  function toggleClass(element, value, added) {
    if (!value) {
      return;
    }
    if (isNumber(element.length)) {
      forEach(element, function (elem) {
        toggleClass(elem, value, added);
      });
      return;
    }

    // IE10-11 doesn't support the second parameter of `classList.toggle`
    if (added) {
      addClass(element, value);
    } else {
      removeClass(element, value);
    }
  }
  var REGEXP_CAMEL_CASE = /([a-z\d])([A-Z])/g;

  /**
   * Transform the given string from camelCase to kebab-case
   * @param {string} value - The value to transform.
   * @returns {string} The transformed value.
   */
  function toParamCase(value) {
    return value.replace(REGEXP_CAMEL_CASE, '$1-$2').toLowerCase();
  }

  /**
   * Get data from the given element.
   * @param {Element} element - The target element.
   * @param {string} name - The data key to get.
   * @returns {string} The data value.
   */
  function getData(element, name) {
    if (isObject(element[name])) {
      return element[name];
    }
    if (element.dataset) {
      return element.dataset[name];
    }
    return element.getAttribute("data-".concat(toParamCase(name)));
  }

  /**
   * Set data to the given element.
   * @param {Element} element - The target element.
   * @param {string} name - The data key to set.
   * @param {string} data - The data value.
   */
  function setData(element, name, data) {
    if (isObject(data)) {
      element[name] = data;
    } else if (element.dataset) {
      element.dataset[name] = data;
    } else {
      element.setAttribute("data-".concat(toParamCase(name)), data);
    }
  }

  /**
   * Remove data from the given element.
   * @param {Element} element - The target element.
   * @param {string} name - The data key to remove.
   */
  function removeData(element, name) {
    if (isObject(element[name])) {
      try {
        delete element[name];
      } catch (error) {
        element[name] = undefined;
      }
    } else if (element.dataset) {
      // #128 Safari not allows to delete dataset property
      try {
        delete element.dataset[name];
      } catch (error) {
        element.dataset[name] = undefined;
      }
    } else {
      element.removeAttribute("data-".concat(toParamCase(name)));
    }
  }
  var REGEXP_SPACES = /\s\s*/;
  var onceSupported = function () {
    var supported = false;
    if (IS_BROWSER) {
      var once = false;
      var listener = function listener() {};
      var options = Object.defineProperty({}, 'once', {
        get: function get() {
          supported = true;
          return once;
        },
        /**
         * This setter can fix a `TypeError` in strict mode
         * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Getter_only}
         * @param {boolean} value - The value to set
         */
        set: function set(value) {
          once = value;
        }
      });
      WINDOW.addEventListener('test', listener, options);
      WINDOW.removeEventListener('test', listener, options);
    }
    return supported;
  }();

  /**
   * Remove event listener from the target element.
   * @param {Element} element - The event target.
   * @param {string} type - The event type(s).
   * @param {Function} listener - The event listener.
   * @param {Object} options - The event options.
   */
  function removeListener(element, type, listener) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var handler = listener;
    type.trim().split(REGEXP_SPACES).forEach(function (event) {
      if (!onceSupported) {
        var listeners = element.listeners;
        if (listeners && listeners[event] && listeners[event][listener]) {
          handler = listeners[event][listener];
          delete listeners[event][listener];
          if (Object.keys(listeners[event]).length === 0) {
            delete listeners[event];
          }
          if (Object.keys(listeners).length === 0) {
            delete element.listeners;
          }
        }
      }
      element.removeEventListener(event, handler, options);
    });
  }

  /**
   * Add event listener to the target element.
   * @param {Element} element - The event target.
   * @param {string} type - The event type(s).
   * @param {Function} listener - The event listener.
   * @param {Object} options - The event options.
   */
  function addListener(element, type, listener) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var _handler = listener;
    type.trim().split(REGEXP_SPACES).forEach(function (event) {
      if (options.once && !onceSupported) {
        var _element$listeners = element.listeners,
          listeners = _element$listeners === void 0 ? {} : _element$listeners;
        _handler = function handler() {
          delete listeners[event][listener];
          element.removeEventListener(event, _handler, options);
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          listener.apply(element, args);
        };
        if (!listeners[event]) {
          listeners[event] = {};
        }
        if (listeners[event][listener]) {
          element.removeEventListener(event, listeners[event][listener], options);
        }
        listeners[event][listener] = _handler;
        element.listeners = listeners;
      }
      element.addEventListener(event, _handler, options);
    });
  }

  /**
   * Dispatch event on the target element.
   * @param {Element} element - The event target.
   * @param {string} type - The event type(s).
   * @param {Object} data - The additional event data.
   * @returns {boolean} Indicate if the event is default prevented or not.
   */
  function dispatchEvent(element, type, data) {
    var event;

    // Event and CustomEvent on IE9-11 are global objects, not constructors
    if (isFunction(Event) && isFunction(CustomEvent)) {
      event = new CustomEvent(type, {
        detail: data,
        bubbles: true,
        cancelable: true
      });
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(type, true, true, data);
    }
    return element.dispatchEvent(event);
  }

  /**
   * Get the offset base on the document.
   * @param {Element} element - The target element.
   * @returns {Object} The offset data.
   */
  function getOffset(element) {
    var box = element.getBoundingClientRect();
    return {
      left: box.left + (window.pageXOffset - document.documentElement.clientLeft),
      top: box.top + (window.pageYOffset - document.documentElement.clientTop)
    };
  }
  var location = WINDOW.location;
  var REGEXP_ORIGINS = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;

  /**
   * Check if the given URL is a cross origin URL.
   * @param {string} url - The target URL.
   * @returns {boolean} Returns `true` if the given URL is a cross origin URL, else `false`.
   */
  function isCrossOriginURL(url) {
    var parts = url.match(REGEXP_ORIGINS);
    return parts !== null && (parts[1] !== location.protocol || parts[2] !== location.hostname || parts[3] !== location.port);
  }

  /**
   * Add timestamp to the given URL.
   * @param {string} url - The target URL.
   * @returns {string} The result URL.
   */
  function addTimestamp(url) {
    var timestamp = "timestamp=".concat(new Date().getTime());
    return url + (url.indexOf('?') === -1 ? '?' : '&') + timestamp;
  }

  /**
   * Get transforms base on the given object.
   * @param {Object} obj - The target object.
   * @returns {string} A string contains transform values.
   */
  function getTransforms(_ref) {
    var rotate = _ref.rotate,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      translateX = _ref.translateX,
      translateY = _ref.translateY;
    var values = [];
    if (isNumber(translateX) && translateX !== 0) {
      values.push("translateX(".concat(translateX, "px)"));
    }
    if (isNumber(translateY) && translateY !== 0) {
      values.push("translateY(".concat(translateY, "px)"));
    }

    // Rotate should come first before scale to match orientation transform
    if (isNumber(rotate) && rotate !== 0) {
      values.push("rotate(".concat(rotate, "deg)"));
    }
    if (isNumber(scaleX) && scaleX !== 1) {
      values.push("scaleX(".concat(scaleX, ")"));
    }
    if (isNumber(scaleY) && scaleY !== 1) {
      values.push("scaleY(".concat(scaleY, ")"));
    }
    var transform = values.length ? values.join(' ') : 'none';
    return {
      WebkitTransform: transform,
      msTransform: transform,
      transform: transform
    };
  }

  /**
   * Get the max ratio of a group of pointers.
   * @param {string} pointers - The target pointers.
   * @returns {number} The result ratio.
   */
  function getMaxZoomRatio(pointers) {
    var pointers2 = _objectSpread2({}, pointers);
    var maxRatio = 0;
    forEach(pointers, function (pointer, pointerId) {
      delete pointers2[pointerId];
      forEach(pointers2, function (pointer2) {
        var x1 = Math.abs(pointer.startX - pointer2.startX);
        var y1 = Math.abs(pointer.startY - pointer2.startY);
        var x2 = Math.abs(pointer.endX - pointer2.endX);
        var y2 = Math.abs(pointer.endY - pointer2.endY);
        var z1 = Math.sqrt(x1 * x1 + y1 * y1);
        var z2 = Math.sqrt(x2 * x2 + y2 * y2);
        var ratio = (z2 - z1) / z1;
        if (Math.abs(ratio) > Math.abs(maxRatio)) {
          maxRatio = ratio;
        }
      });
    });
    return maxRatio;
  }

  /**
   * Get a pointer from an event object.
   * @param {Object} event - The target event object.
   * @param {boolean} endOnly - Indicates if only returns the end point coordinate or not.
   * @returns {Object} The result pointer contains start and/or end point coordinates.
   */
  function getPointer(_ref2, endOnly) {
    var pageX = _ref2.pageX,
      pageY = _ref2.pageY;
    var end = {
      endX: pageX,
      endY: pageY
    };
    return endOnly ? end : _objectSpread2({
      startX: pageX,
      startY: pageY
    }, end);
  }

  /**
   * Get the center point coordinate of a group of pointers.
   * @param {Object} pointers - The target pointers.
   * @returns {Object} The center point coordinate.
   */
  function getPointersCenter(pointers) {
    var pageX = 0;
    var pageY = 0;
    var count = 0;
    forEach(pointers, function (_ref3) {
      var startX = _ref3.startX,
        startY = _ref3.startY;
      pageX += startX;
      pageY += startY;
      count += 1;
    });
    pageX /= count;
    pageY /= count;
    return {
      pageX: pageX,
      pageY: pageY
    };
  }

  /**
   * Get the max sizes in a rectangle under the given aspect ratio.
   * @param {Object} data - The original sizes.
   * @param {string} [type='contain'] - The adjust type.
   * @returns {Object} The result sizes.
   */
  function getAdjustedSizes(_ref4) {
    var aspectRatio = _ref4.aspectRatio,
      height = _ref4.height,
      width = _ref4.width;
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'contain';
    var isValidWidth = isPositiveNumber(width);
    var isValidHeight = isPositiveNumber(height);
    if (isValidWidth && isValidHeight) {
      var adjustedWidth = height * aspectRatio;
      if (type === 'contain' && adjustedWidth > width || type === 'cover' && adjustedWidth < width) {
        height = width / aspectRatio;
      } else {
        width = height * aspectRatio;
      }
    } else if (isValidWidth) {
      height = width / aspectRatio;
    } else if (isValidHeight) {
      width = height * aspectRatio;
    }
    return {
      width: width,
      height: height
    };
  }

  /**
   * Get the new sizes of a rectangle after rotated.
   * @param {Object} data - The original sizes.
   * @returns {Object} The result sizes.
   */
  function getRotatedSizes(_ref5) {
    var width = _ref5.width,
      height = _ref5.height,
      degree = _ref5.degree;
    degree = Math.abs(degree) % 180;
    if (degree === 90) {
      return {
        width: height,
        height: width
      };
    }
    var arc = degree % 90 * Math.PI / 180;
    var sinArc = Math.sin(arc);
    var cosArc = Math.cos(arc);
    var newWidth = width * cosArc + height * sinArc;
    var newHeight = width * sinArc + height * cosArc;
    return degree > 90 ? {
      width: newHeight,
      height: newWidth
    } : {
      width: newWidth,
      height: newHeight
    };
  }

  /**
   * Get a canvas which drew the given image.
   * @param {HTMLImageElement} image - The image for drawing.
   * @param {Object} imageData - The image data.
   * @param {Object} canvasData - The canvas data.
   * @param {Object} options - The options.
   * @returns {HTMLCanvasElement} The result canvas.
   */
  function getSourceCanvas(image, _ref6, _ref7, _ref8) {
    var imageAspectRatio = _ref6.aspectRatio,
      imageNaturalWidth = _ref6.naturalWidth,
      imageNaturalHeight = _ref6.naturalHeight,
      _ref6$rotate = _ref6.rotate,
      rotate = _ref6$rotate === void 0 ? 0 : _ref6$rotate,
      _ref6$scaleX = _ref6.scaleX,
      scaleX = _ref6$scaleX === void 0 ? 1 : _ref6$scaleX,
      _ref6$scaleY = _ref6.scaleY,
      scaleY = _ref6$scaleY === void 0 ? 1 : _ref6$scaleY;
    var aspectRatio = _ref7.aspectRatio,
      naturalWidth = _ref7.naturalWidth,
      naturalHeight = _ref7.naturalHeight;
    var _ref8$fillColor = _ref8.fillColor,
      fillColor = _ref8$fillColor === void 0 ? 'transparent' : _ref8$fillColor,
      _ref8$imageSmoothingE = _ref8.imageSmoothingEnabled,
      imageSmoothingEnabled = _ref8$imageSmoothingE === void 0 ? true : _ref8$imageSmoothingE,
      _ref8$imageSmoothingQ = _ref8.imageSmoothingQuality,
      imageSmoothingQuality = _ref8$imageSmoothingQ === void 0 ? 'low' : _ref8$imageSmoothingQ,
      _ref8$maxWidth = _ref8.maxWidth,
      maxWidth = _ref8$maxWidth === void 0 ? Infinity : _ref8$maxWidth,
      _ref8$maxHeight = _ref8.maxHeight,
      maxHeight = _ref8$maxHeight === void 0 ? Infinity : _ref8$maxHeight,
      _ref8$minWidth = _ref8.minWidth,
      minWidth = _ref8$minWidth === void 0 ? 0 : _ref8$minWidth,
      _ref8$minHeight = _ref8.minHeight,
      minHeight = _ref8$minHeight === void 0 ? 0 : _ref8$minHeight;
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var maxSizes = getAdjustedSizes({
      aspectRatio: aspectRatio,
      width: maxWidth,
      height: maxHeight
    });
    var minSizes = getAdjustedSizes({
      aspectRatio: aspectRatio,
      width: minWidth,
      height: minHeight
    }, 'cover');
    var width = Math.min(maxSizes.width, Math.max(minSizes.width, naturalWidth));
    var height = Math.min(maxSizes.height, Math.max(minSizes.height, naturalHeight));

    // Note: should always use image's natural sizes for drawing as
    // imageData.naturalWidth === canvasData.naturalHeight when rotate % 180 === 90
    var destMaxSizes = getAdjustedSizes({
      aspectRatio: imageAspectRatio,
      width: maxWidth,
      height: maxHeight
    });
    var destMinSizes = getAdjustedSizes({
      aspectRatio: imageAspectRatio,
      width: minWidth,
      height: minHeight
    }, 'cover');
    var destWidth = Math.min(destMaxSizes.width, Math.max(destMinSizes.width, imageNaturalWidth));
    var destHeight = Math.min(destMaxSizes.height, Math.max(destMinSizes.height, imageNaturalHeight));
    var params = [-destWidth / 2, -destHeight / 2, destWidth, destHeight];
    canvas.width = normalizeDecimalNumber(width);
    canvas.height = normalizeDecimalNumber(height);
    context.fillStyle = fillColor;
    context.fillRect(0, 0, width, height);
    context.save();
    context.translate(width / 2, height / 2);
    context.rotate(rotate * Math.PI / 180);
    context.scale(scaleX, scaleY);
    context.imageSmoothingEnabled = imageSmoothingEnabled;
    context.imageSmoothingQuality = imageSmoothingQuality;
    context.drawImage.apply(context, [image].concat(_toConsumableArray(params.map(function (param) {
      return Math.floor(normalizeDecimalNumber(param));
    }))));
    context.restore();
    return canvas;
  }
  var fromCharCode = String.fromCharCode;

  /**
   * Get string from char code in data view.
   * @param {DataView} dataView - The data view for read.
   * @param {number} start - The start index.
   * @param {number} length - The read length.
   * @returns {string} The read result.
   */
  function getStringFromCharCode(dataView, start, length) {
    var str = '';
    length += start;
    for (var i = start; i < length; i += 1) {
      str += fromCharCode(dataView.getUint8(i));
    }
    return str;
  }
  var REGEXP_DATA_URL_HEAD = /^data:.*,/;

  /**
   * Transform Data URL to array buffer.
   * @param {string} dataURL - The Data URL to transform.
   * @returns {ArrayBuffer} The result array buffer.
   */
  function dataURLToArrayBuffer(dataURL) {
    var base64 = dataURL.replace(REGEXP_DATA_URL_HEAD, '');
    var binary = atob(base64);
    var arrayBuffer = new ArrayBuffer(binary.length);
    var uint8 = new Uint8Array(arrayBuffer);
    forEach(uint8, function (value, i) {
      uint8[i] = binary.charCodeAt(i);
    });
    return arrayBuffer;
  }

  /**
   * Transform array buffer to Data URL.
   * @param {ArrayBuffer} arrayBuffer - The array buffer to transform.
   * @param {string} mimeType - The mime type of the Data URL.
   * @returns {string} The result Data URL.
   */
  function arrayBufferToDataURL(arrayBuffer, mimeType) {
    var chunks = [];

    // Chunk Typed Array for better performance (#435)
    var chunkSize = 8192;
    var uint8 = new Uint8Array(arrayBuffer);
    while (uint8.length > 0) {
      // XXX: Babel's `toConsumableArray` helper will throw error in IE or Safari 9
      // eslint-disable-next-line prefer-spread
      chunks.push(fromCharCode.apply(null, toArray(uint8.subarray(0, chunkSize))));
      uint8 = uint8.subarray(chunkSize);
    }
    return "data:".concat(mimeType, ";base64,").concat(btoa(chunks.join('')));
  }

  /**
   * Get orientation value from given array buffer.
   * @param {ArrayBuffer} arrayBuffer - The array buffer to read.
   * @returns {number} The read orientation value.
   */
  function resetAndGetOrientation(arrayBuffer) {
    var dataView = new DataView(arrayBuffer);
    var orientation;

    // Ignores range error when the image does not have correct Exif information
    try {
      var littleEndian;
      var app1Start;
      var ifdStart;

      // Only handle JPEG image (start by 0xFFD8)
      if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
        var length = dataView.byteLength;
        var offset = 2;
        while (offset + 1 < length) {
          if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
            app1Start = offset;
            break;
          }
          offset += 1;
        }
      }
      if (app1Start) {
        var exifIDCode = app1Start + 4;
        var tiffOffset = app1Start + 10;
        if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
          var endianness = dataView.getUint16(tiffOffset);
          littleEndian = endianness === 0x4949;
          if (littleEndian || endianness === 0x4D4D /* bigEndian */) {
            if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
              var firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
              if (firstIFDOffset >= 0x00000008) {
                ifdStart = tiffOffset + firstIFDOffset;
              }
            }
          }
        }
      }
      if (ifdStart) {
        var _length = dataView.getUint16(ifdStart, littleEndian);
        var _offset;
        var i;
        for (i = 0; i < _length; i += 1) {
          _offset = ifdStart + i * 12 + 2;
          if (dataView.getUint16(_offset, littleEndian) === 0x0112 /* Orientation */) {
            // 8 is the offset of the current tag's value
            _offset += 8;

            // Get the original orientation value
            orientation = dataView.getUint16(_offset, littleEndian);

            // Override the orientation with its default value
            dataView.setUint16(_offset, 1, littleEndian);
            break;
          }
        }
      }
    } catch (error) {
      orientation = 1;
    }
    return orientation;
  }

  /**
   * Parse Exif Orientation value.
   * @param {number} orientation - The orientation to parse.
   * @returns {Object} The parsed result.
   */
  function parseOrientation(orientation) {
    var rotate = 0;
    var scaleX = 1;
    var scaleY = 1;
    switch (orientation) {
      // Flip horizontal
      case 2:
        scaleX = -1;
        break;

      // Rotate left 180°
      case 3:
        rotate = -180;
        break;

      // Flip vertical
      case 4:
        scaleY = -1;
        break;

      // Flip vertical and rotate right 90°
      case 5:
        rotate = 90;
        scaleY = -1;
        break;

      // Rotate right 90°
      case 6:
        rotate = 90;
        break;

      // Flip horizontal and rotate right 90°
      case 7:
        rotate = 90;
        scaleX = -1;
        break;

      // Rotate left 90°
      case 8:
        rotate = -90;
        break;
    }
    return {
      rotate: rotate,
      scaleX: scaleX,
      scaleY: scaleY
    };
  }

  var render = {
    render: function render() {
      this.initContainer();
      this.initCanvas();
      this.initCropBox();
      this.renderCanvas();
      if (this.cropped) {
        this.renderCropBox();
      }
    },
    initContainer: function initContainer() {
      var element = this.element,
        options = this.options,
        container = this.container,
        cropper = this.cropper;
      var minWidth = Number(options.minContainerWidth);
      var minHeight = Number(options.minContainerHeight);
      addClass(cropper, CLASS_HIDDEN);
      removeClass(element, CLASS_HIDDEN);
      var containerData = {
        width: Math.max(container.offsetWidth, minWidth >= 0 ? minWidth : MIN_CONTAINER_WIDTH),
        height: Math.max(container.offsetHeight, minHeight >= 0 ? minHeight : MIN_CONTAINER_HEIGHT)
      };
      this.containerData = containerData;
      setStyle(cropper, {
        width: containerData.width,
        height: containerData.height
      });
      addClass(element, CLASS_HIDDEN);
      removeClass(cropper, CLASS_HIDDEN);
    },
    // Canvas (image wrapper)
    initCanvas: function initCanvas() {
      var containerData = this.containerData,
        imageData = this.imageData;
      var viewMode = this.options.viewMode;
      var rotated = Math.abs(imageData.rotate) % 180 === 90;
      var naturalWidth = rotated ? imageData.naturalHeight : imageData.naturalWidth;
      var naturalHeight = rotated ? imageData.naturalWidth : imageData.naturalHeight;
      var aspectRatio = naturalWidth / naturalHeight;
      var canvasWidth = containerData.width;
      var canvasHeight = containerData.height;
      if (containerData.height * aspectRatio > containerData.width) {
        if (viewMode === 3) {
          canvasWidth = containerData.height * aspectRatio;
        } else {
          canvasHeight = containerData.width / aspectRatio;
        }
      } else if (viewMode === 3) {
        canvasHeight = containerData.width / aspectRatio;
      } else {
        canvasWidth = containerData.height * aspectRatio;
      }
      var canvasData = {
        aspectRatio: aspectRatio,
        naturalWidth: naturalWidth,
        naturalHeight: naturalHeight,
        width: canvasWidth,
        height: canvasHeight
      };
      this.canvasData = canvasData;
      this.limited = viewMode === 1 || viewMode === 2;
      this.limitCanvas(true, true);
      canvasData.width = Math.min(Math.max(canvasData.width, canvasData.minWidth), canvasData.maxWidth);
      canvasData.height = Math.min(Math.max(canvasData.height, canvasData.minHeight), canvasData.maxHeight);
      canvasData.left = (containerData.width - canvasData.width) / 2;
      canvasData.top = (containerData.height - canvasData.height) / 2;
      canvasData.oldLeft = canvasData.left;
      canvasData.oldTop = canvasData.top;
      this.initialCanvasData = assign({}, canvasData);
    },
    limitCanvas: function limitCanvas(sizeLimited, positionLimited) {
      var options = this.options,
        containerData = this.containerData,
        canvasData = this.canvasData,
        cropBoxData = this.cropBoxData;
      var viewMode = options.viewMode;
      var aspectRatio = canvasData.aspectRatio;
      var cropped = this.cropped && cropBoxData;
      if (sizeLimited) {
        var minCanvasWidth = Number(options.minCanvasWidth) || 0;
        var minCanvasHeight = Number(options.minCanvasHeight) || 0;
        if (viewMode > 1) {
          minCanvasWidth = Math.max(minCanvasWidth, containerData.width);
          minCanvasHeight = Math.max(minCanvasHeight, containerData.height);
          if (viewMode === 3) {
            if (minCanvasHeight * aspectRatio > minCanvasWidth) {
              minCanvasWidth = minCanvasHeight * aspectRatio;
            } else {
              minCanvasHeight = minCanvasWidth / aspectRatio;
            }
          }
        } else if (viewMode > 0) {
          if (minCanvasWidth) {
            minCanvasWidth = Math.max(minCanvasWidth, cropped ? cropBoxData.width : 0);
          } else if (minCanvasHeight) {
            minCanvasHeight = Math.max(minCanvasHeight, cropped ? cropBoxData.height : 0);
          } else if (cropped) {
            minCanvasWidth = cropBoxData.width;
            minCanvasHeight = cropBoxData.height;
            if (minCanvasHeight * aspectRatio > minCanvasWidth) {
              minCanvasWidth = minCanvasHeight * aspectRatio;
            } else {
              minCanvasHeight = minCanvasWidth / aspectRatio;
            }
          }
        }
        var _getAdjustedSizes = getAdjustedSizes({
          aspectRatio: aspectRatio,
          width: minCanvasWidth,
          height: minCanvasHeight
        });
        minCanvasWidth = _getAdjustedSizes.width;
        minCanvasHeight = _getAdjustedSizes.height;
        canvasData.minWidth = minCanvasWidth;
        canvasData.minHeight = minCanvasHeight;
        canvasData.maxWidth = Infinity;
        canvasData.maxHeight = Infinity;
      }
      if (positionLimited) {
        if (viewMode > (cropped ? 0 : 1)) {
          var newCanvasLeft = containerData.width - canvasData.width;
          var newCanvasTop = containerData.height - canvasData.height;
          canvasData.minLeft = Math.min(0, newCanvasLeft);
          canvasData.minTop = Math.min(0, newCanvasTop);
          canvasData.maxLeft = Math.max(0, newCanvasLeft);
          canvasData.maxTop = Math.max(0, newCanvasTop);
          if (cropped && this.limited) {
            canvasData.minLeft = Math.min(cropBoxData.left, cropBoxData.left + (cropBoxData.width - canvasData.width));
            canvasData.minTop = Math.min(cropBoxData.top, cropBoxData.top + (cropBoxData.height - canvasData.height));
            canvasData.maxLeft = cropBoxData.left;
            canvasData.maxTop = cropBoxData.top;
            if (viewMode === 2) {
              if (canvasData.width >= containerData.width) {
                canvasData.minLeft = Math.min(0, newCanvasLeft);
                canvasData.maxLeft = Math.max(0, newCanvasLeft);
              }
              if (canvasData.height >= containerData.height) {
                canvasData.minTop = Math.min(0, newCanvasTop);
                canvasData.maxTop = Math.max(0, newCanvasTop);
              }
            }
          }
        } else {
          canvasData.minLeft = -canvasData.width;
          canvasData.minTop = -canvasData.height;
          canvasData.maxLeft = containerData.width;
          canvasData.maxTop = containerData.height;
        }
      }
    },
    renderCanvas: function renderCanvas(changed, transformed) {
      var canvasData = this.canvasData,
        imageData = this.imageData;
      if (transformed) {
        var _getRotatedSizes = getRotatedSizes({
            width: imageData.naturalWidth * Math.abs(imageData.scaleX || 1),
            height: imageData.naturalHeight * Math.abs(imageData.scaleY || 1),
            degree: imageData.rotate || 0
          }),
          naturalWidth = _getRotatedSizes.width,
          naturalHeight = _getRotatedSizes.height;
        var width = canvasData.width * (naturalWidth / canvasData.naturalWidth);
        var height = canvasData.height * (naturalHeight / canvasData.naturalHeight);
        canvasData.left -= (width - canvasData.width) / 2;
        canvasData.top -= (height - canvasData.height) / 2;
        canvasData.width = width;
        canvasData.height = height;
        canvasData.aspectRatio = naturalWidth / naturalHeight;
        canvasData.naturalWidth = naturalWidth;
        canvasData.naturalHeight = naturalHeight;
        this.limitCanvas(true, false);
      }
      if (canvasData.width > canvasData.maxWidth || canvasData.width < canvasData.minWidth) {
        canvasData.left = canvasData.oldLeft;
      }
      if (canvasData.height > canvasData.maxHeight || canvasData.height < canvasData.minHeight) {
        canvasData.top = canvasData.oldTop;
      }
      canvasData.width = Math.min(Math.max(canvasData.width, canvasData.minWidth), canvasData.maxWidth);
      canvasData.height = Math.min(Math.max(canvasData.height, canvasData.minHeight), canvasData.maxHeight);
      this.limitCanvas(false, true);
      canvasData.left = Math.min(Math.max(canvasData.left, canvasData.minLeft), canvasData.maxLeft);
      canvasData.top = Math.min(Math.max(canvasData.top, canvasData.minTop), canvasData.maxTop);
      canvasData.oldLeft = canvasData.left;
      canvasData.oldTop = canvasData.top;
      setStyle(this.canvas, assign({
        width: canvasData.width,
        height: canvasData.height
      }, getTransforms({
        translateX: canvasData.left,
        translateY: canvasData.top
      })));
      this.renderImage(changed);
      if (this.cropped && this.limited) {
        this.limitCropBox(true, true);
      }
    },
    renderImage: function renderImage(changed) {
      var canvasData = this.canvasData,
        imageData = this.imageData;
      var width = imageData.naturalWidth * (canvasData.width / canvasData.naturalWidth);
      var height = imageData.naturalHeight * (canvasData.height / canvasData.naturalHeight);
      assign(imageData, {
        width: width,
        height: height,
        left: (canvasData.width - width) / 2,
        top: (canvasData.height - height) / 2
      });
      setStyle(this.image, assign({
        width: imageData.width,
        height: imageData.height
      }, getTransforms(assign({
        translateX: imageData.left,
        translateY: imageData.top
      }, imageData))));
      if (changed) {
        this.output();
      }
    },
    initCropBox: function initCropBox() {
      var options = this.options,
        canvasData = this.canvasData;
      var aspectRatio = options.aspectRatio || options.initialAspectRatio;
      var autoCropArea = Number(options.autoCropArea) || 0.8;
      var cropBoxData = {
        width: canvasData.width,
        height: canvasData.height
      };
      if (aspectRatio) {
        if (canvasData.height * aspectRatio > canvasData.width) {
          cropBoxData.height = cropBoxData.width / aspectRatio;
        } else {
          cropBoxData.width = cropBoxData.height * aspectRatio;
        }
      }
      this.cropBoxData = cropBoxData;
      this.limitCropBox(true, true);

      // Initialize auto crop area
      cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
      cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);

      // The width/height of auto crop area must large than "minWidth/Height"
      cropBoxData.width = Math.max(cropBoxData.minWidth, cropBoxData.width * autoCropArea);
      cropBoxData.height = Math.max(cropBoxData.minHeight, cropBoxData.height * autoCropArea);
      cropBoxData.left = canvasData.left + (canvasData.width - cropBoxData.width) / 2;
      cropBoxData.top = canvasData.top + (canvasData.height - cropBoxData.height) / 2;
      cropBoxData.oldLeft = cropBoxData.left;
      cropBoxData.oldTop = cropBoxData.top;
      this.initialCropBoxData = assign({}, cropBoxData);
    },
    limitCropBox: function limitCropBox(sizeLimited, positionLimited) {
      var options = this.options,
        containerData = this.containerData,
        canvasData = this.canvasData,
        cropBoxData = this.cropBoxData,
        limited = this.limited;
      var aspectRatio = options.aspectRatio;
      if (sizeLimited) {
        var minCropBoxWidth = Number(options.minCropBoxWidth) || 0;
        var minCropBoxHeight = Number(options.minCropBoxHeight) || 0;
        var maxCropBoxWidth = limited ? Math.min(containerData.width, canvasData.width, canvasData.width + canvasData.left, containerData.width - canvasData.left) : containerData.width;
        var maxCropBoxHeight = limited ? Math.min(containerData.height, canvasData.height, canvasData.height + canvasData.top, containerData.height - canvasData.top) : containerData.height;

        // The min/maxCropBoxWidth/Height must be less than container's width/height
        minCropBoxWidth = Math.min(minCropBoxWidth, containerData.width);
        minCropBoxHeight = Math.min(minCropBoxHeight, containerData.height);
        if (aspectRatio) {
          if (minCropBoxWidth && minCropBoxHeight) {
            if (minCropBoxHeight * aspectRatio > minCropBoxWidth) {
              minCropBoxHeight = minCropBoxWidth / aspectRatio;
            } else {
              minCropBoxWidth = minCropBoxHeight * aspectRatio;
            }
          } else if (minCropBoxWidth) {
            minCropBoxHeight = minCropBoxWidth / aspectRatio;
          } else if (minCropBoxHeight) {
            minCropBoxWidth = minCropBoxHeight * aspectRatio;
          }
          if (maxCropBoxHeight * aspectRatio > maxCropBoxWidth) {
            maxCropBoxHeight = maxCropBoxWidth / aspectRatio;
          } else {
            maxCropBoxWidth = maxCropBoxHeight * aspectRatio;
          }
        }

        // The minWidth/Height must be less than maxWidth/Height
        cropBoxData.minWidth = Math.min(minCropBoxWidth, maxCropBoxWidth);
        cropBoxData.minHeight = Math.min(minCropBoxHeight, maxCropBoxHeight);
        cropBoxData.maxWidth = maxCropBoxWidth;
        cropBoxData.maxHeight = maxCropBoxHeight;
      }
      if (positionLimited) {
        if (limited) {
          cropBoxData.minLeft = Math.max(0, canvasData.left);
          cropBoxData.minTop = Math.max(0, canvasData.top);
          cropBoxData.maxLeft = Math.min(containerData.width, canvasData.left + canvasData.width) - cropBoxData.width;
          cropBoxData.maxTop = Math.min(containerData.height, canvasData.top + canvasData.height) - cropBoxData.height;
        } else {
          cropBoxData.minLeft = 0;
          cropBoxData.minTop = 0;
          cropBoxData.maxLeft = containerData.width - cropBoxData.width;
          cropBoxData.maxTop = containerData.height - cropBoxData.height;
        }
      }
    },
    renderCropBox: function renderCropBox() {
      var options = this.options,
        containerData = this.containerData,
        cropBoxData = this.cropBoxData;
      if (cropBoxData.width > cropBoxData.maxWidth || cropBoxData.width < cropBoxData.minWidth) {
        cropBoxData.left = cropBoxData.oldLeft;
      }
      if (cropBoxData.height > cropBoxData.maxHeight || cropBoxData.height < cropBoxData.minHeight) {
        cropBoxData.top = cropBoxData.oldTop;
      }
      cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
      cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);
      this.limitCropBox(false, true);
      cropBoxData.left = Math.min(Math.max(cropBoxData.left, cropBoxData.minLeft), cropBoxData.maxLeft);
      cropBoxData.top = Math.min(Math.max(cropBoxData.top, cropBoxData.minTop), cropBoxData.maxTop);
      cropBoxData.oldLeft = cropBoxData.left;
      cropBoxData.oldTop = cropBoxData.top;
      if (options.movable && options.cropBoxMovable) {
        // Turn to move the canvas when the crop box is equal to the container
        setData(this.face, DATA_ACTION, cropBoxData.width >= containerData.width && cropBoxData.height >= containerData.height ? ACTION_MOVE : ACTION_ALL);
      }
      setStyle(this.cropBox, assign({
        width: cropBoxData.width,
        height: cropBoxData.height
      }, getTransforms({
        translateX: cropBoxData.left,
        translateY: cropBoxData.top
      })));
      if (this.cropped && this.limited) {
        this.limitCanvas(true, true);
      }
      if (!this.disabled) {
        this.output();
      }
    },
    output: function output() {
      this.preview();
      dispatchEvent(this.element, EVENT_CROP, this.getData());
    }
  };

  var preview = {
    initPreview: function initPreview() {
      var element = this.element,
        crossOrigin = this.crossOrigin;
      var preview = this.options.preview;
      var url = crossOrigin ? this.crossOriginUrl : this.url;
      var alt = element.alt || 'The image to preview';
      var image = document.createElement('img');
      if (crossOrigin) {
        image.crossOrigin = crossOrigin;
      }
      image.src = url;
      image.alt = alt;
      this.viewBox.appendChild(image);
      this.viewBoxImage = image;
      if (!preview) {
        return;
      }
      var previews = preview;
      if (typeof preview === 'string') {
        previews = element.ownerDocument.querySelectorAll(preview);
      } else if (preview.querySelector) {
        previews = [preview];
      }
      this.previews = previews;
      forEach(previews, function (el) {
        var img = document.createElement('img');

        // Save the original size for recover
        setData(el, DATA_PREVIEW, {
          width: el.offsetWidth,
          height: el.offsetHeight,
          html: el.innerHTML
        });
        if (crossOrigin) {
          img.crossOrigin = crossOrigin;
        }
        img.src = url;
        img.alt = alt;

        /**
         * Override img element styles
         * Add `display:block` to avoid margin top issue
         * Add `height:auto` to override `height` attribute on IE8
         * (Occur only when margin-top <= -height)
         */
        img.style.cssText = 'display:block;' + 'width:100%;' + 'height:auto;' + 'min-width:0!important;' + 'min-height:0!important;' + 'max-width:none!important;' + 'max-height:none!important;' + 'image-orientation:0deg!important;"';
        el.innerHTML = '';
        el.appendChild(img);
      });
    },
    resetPreview: function resetPreview() {
      forEach(this.previews, function (element) {
        var data = getData(element, DATA_PREVIEW);
        setStyle(element, {
          width: data.width,
          height: data.height
        });
        element.innerHTML = data.html;
        removeData(element, DATA_PREVIEW);
      });
    },
    preview: function preview() {
      var imageData = this.imageData,
        canvasData = this.canvasData,
        cropBoxData = this.cropBoxData;
      var cropBoxWidth = cropBoxData.width,
        cropBoxHeight = cropBoxData.height;
      var width = imageData.width,
        height = imageData.height;
      var left = cropBoxData.left - canvasData.left - imageData.left;
      var top = cropBoxData.top - canvasData.top - imageData.top;
      if (!this.cropped || this.disabled) {
        return;
      }
      setStyle(this.viewBoxImage, assign({
        width: width,
        height: height
      }, getTransforms(assign({
        translateX: -left,
        translateY: -top
      }, imageData))));
      forEach(this.previews, function (element) {
        var data = getData(element, DATA_PREVIEW);
        var originalWidth = data.width;
        var originalHeight = data.height;
        var newWidth = originalWidth;
        var newHeight = originalHeight;
        var ratio = 1;
        if (cropBoxWidth) {
          ratio = originalWidth / cropBoxWidth;
          newHeight = cropBoxHeight * ratio;
        }
        if (cropBoxHeight && newHeight > originalHeight) {
          ratio = originalHeight / cropBoxHeight;
          newWidth = cropBoxWidth * ratio;
          newHeight = originalHeight;
        }
        setStyle(element, {
          width: newWidth,
          height: newHeight
        });
        setStyle(element.getElementsByTagName('img')[0], assign({
          width: width * ratio,
          height: height * ratio
        }, getTransforms(assign({
          translateX: -left * ratio,
          translateY: -top * ratio
        }, imageData))));
      });
    }
  };

  var events = {
    bind: function bind() {
      var element = this.element,
        options = this.options,
        cropper = this.cropper;
      if (isFunction(options.cropstart)) {
        addListener(element, EVENT_CROP_START, options.cropstart);
      }
      if (isFunction(options.cropmove)) {
        addListener(element, EVENT_CROP_MOVE, options.cropmove);
      }
      if (isFunction(options.cropend)) {
        addListener(element, EVENT_CROP_END, options.cropend);
      }
      if (isFunction(options.crop)) {
        addListener(element, EVENT_CROP, options.crop);
      }
      if (isFunction(options.zoom)) {
        addListener(element, EVENT_ZOOM, options.zoom);
      }
      addListener(cropper, EVENT_POINTER_DOWN, this.onCropStart = this.cropStart.bind(this));
      if (options.zoomable && options.zoomOnWheel) {
        addListener(cropper, EVENT_WHEEL, this.onWheel = this.wheel.bind(this), {
          passive: false,
          capture: true
        });
      }
      if (options.toggleDragModeOnDblclick) {
        addListener(cropper, EVENT_DBLCLICK, this.onDblclick = this.dblclick.bind(this));
      }
      addListener(element.ownerDocument, EVENT_POINTER_MOVE, this.onCropMove = this.cropMove.bind(this));
      addListener(element.ownerDocument, EVENT_POINTER_UP, this.onCropEnd = this.cropEnd.bind(this));
      if (options.responsive) {
        addListener(window, EVENT_RESIZE, this.onResize = this.resize.bind(this));
      }
    },
    unbind: function unbind() {
      var element = this.element,
        options = this.options,
        cropper = this.cropper;
      if (isFunction(options.cropstart)) {
        removeListener(element, EVENT_CROP_START, options.cropstart);
      }
      if (isFunction(options.cropmove)) {
        removeListener(element, EVENT_CROP_MOVE, options.cropmove);
      }
      if (isFunction(options.cropend)) {
        removeListener(element, EVENT_CROP_END, options.cropend);
      }
      if (isFunction(options.crop)) {
        removeListener(element, EVENT_CROP, options.crop);
      }
      if (isFunction(options.zoom)) {
        removeListener(element, EVENT_ZOOM, options.zoom);
      }
      removeListener(cropper, EVENT_POINTER_DOWN, this.onCropStart);
      if (options.zoomable && options.zoomOnWheel) {
        removeListener(cropper, EVENT_WHEEL, this.onWheel, {
          passive: false,
          capture: true
        });
      }
      if (options.toggleDragModeOnDblclick) {
        removeListener(cropper, EVENT_DBLCLICK, this.onDblclick);
      }
      removeListener(element.ownerDocument, EVENT_POINTER_MOVE, this.onCropMove);
      removeListener(element.ownerDocument, EVENT_POINTER_UP, this.onCropEnd);
      if (options.responsive) {
        removeListener(window, EVENT_RESIZE, this.onResize);
      }
    }
  };

  var handlers = {
    resize: function resize() {
      if (this.disabled) {
        return;
      }
      var options = this.options,
        container = this.container,
        containerData = this.containerData;
      var ratioX = container.offsetWidth / containerData.width;
      var ratioY = container.offsetHeight / containerData.height;
      var ratio = Math.abs(ratioX - 1) > Math.abs(ratioY - 1) ? ratioX : ratioY;

      // Resize when width changed or height changed
      if (ratio !== 1) {
        var canvasData;
        var cropBoxData;
        if (options.restore) {
          canvasData = this.getCanvasData();
          cropBoxData = this.getCropBoxData();
        }
        this.render();
        if (options.restore) {
          this.setCanvasData(forEach(canvasData, function (n, i) {
            canvasData[i] = n * ratio;
          }));
          this.setCropBoxData(forEach(cropBoxData, function (n, i) {
            cropBoxData[i] = n * ratio;
          }));
        }
      }
    },
    dblclick: function dblclick() {
      if (this.disabled || this.options.dragMode === DRAG_MODE_NONE) {
        return;
      }
      this.setDragMode(hasClass(this.dragBox, CLASS_CROP) ? DRAG_MODE_MOVE : DRAG_MODE_CROP);
    },
    wheel: function wheel(event) {
      var _this = this;
      var ratio = Number(this.options.wheelZoomRatio) || 0.1;
      var delta = 1;
      if (this.disabled) {
        return;
      }
      event.preventDefault();

      // Limit wheel speed to prevent zoom too fast (#21)
      if (this.wheeling) {
        return;
      }
      this.wheeling = true;
      setTimeout(function () {
        _this.wheeling = false;
      }, 50);
      if (event.deltaY) {
        delta = event.deltaY > 0 ? 1 : -1;
      } else if (event.wheelDelta) {
        delta = -event.wheelDelta / 120;
      } else if (event.detail) {
        delta = event.detail > 0 ? 1 : -1;
      }
      this.zoom(-delta * ratio, event);
    },
    cropStart: function cropStart(event) {
      var buttons = event.buttons,
        button = event.button;
      if (this.disabled

      // Handle mouse event and pointer event and ignore touch event
      || (event.type === 'mousedown' || event.type === 'pointerdown' && event.pointerType === 'mouse') && (
      // No primary button (Usually the left button)
      isNumber(buttons) && buttons !== 1 || isNumber(button) && button !== 0

      // Open context menu
      || event.ctrlKey)) {
        return;
      }
      var options = this.options,
        pointers = this.pointers;
      var action;
      if (event.changedTouches) {
        // Handle touch event
        forEach(event.changedTouches, function (touch) {
          pointers[touch.identifier] = getPointer(touch);
        });
      } else {
        // Handle mouse event and pointer event
        pointers[event.pointerId || 0] = getPointer(event);
      }
      if (Object.keys(pointers).length > 1 && options.zoomable && options.zoomOnTouch) {
        action = ACTION_ZOOM;
      } else {
        action = getData(event.target, DATA_ACTION);
      }
      if (!REGEXP_ACTIONS.test(action)) {
        return;
      }
      if (dispatchEvent(this.element, EVENT_CROP_START, {
        originalEvent: event,
        action: action
      }) === false) {
        return;
      }

      // This line is required for preventing page zooming in iOS browsers
      event.preventDefault();
      this.action = action;
      this.cropping = false;
      if (action === ACTION_CROP) {
        this.cropping = true;
        addClass(this.dragBox, CLASS_MODAL);
      }
    },
    cropMove: function cropMove(event) {
      var action = this.action;
      if (this.disabled || !action) {
        return;
      }
      var pointers = this.pointers;
      event.preventDefault();
      if (dispatchEvent(this.element, EVENT_CROP_MOVE, {
        originalEvent: event,
        action: action
      }) === false) {
        return;
      }
      if (event.changedTouches) {
        forEach(event.changedTouches, function (touch) {
          // The first parameter should not be undefined (#432)
          assign(pointers[touch.identifier] || {}, getPointer(touch, true));
        });
      } else {
        assign(pointers[event.pointerId || 0] || {}, getPointer(event, true));
      }
      this.change(event);
    },
    cropEnd: function cropEnd(event) {
      if (this.disabled) {
        return;
      }
      var action = this.action,
        pointers = this.pointers;
      if (event.changedTouches) {
        forEach(event.changedTouches, function (touch) {
          delete pointers[touch.identifier];
        });
      } else {
        delete pointers[event.pointerId || 0];
      }
      if (!action) {
        return;
      }
      event.preventDefault();
      if (!Object.keys(pointers).length) {
        this.action = '';
      }
      if (this.cropping) {
        this.cropping = false;
        toggleClass(this.dragBox, CLASS_MODAL, this.cropped && this.options.modal);
      }
      dispatchEvent(this.element, EVENT_CROP_END, {
        originalEvent: event,
        action: action
      });
    }
  };

  var change = {
    change: function change(event) {
      var options = this.options,
        canvasData = this.canvasData,
        containerData = this.containerData,
        cropBoxData = this.cropBoxData,
        pointers = this.pointers;
      var action = this.action;
      var aspectRatio = options.aspectRatio;
      var left = cropBoxData.left,
        top = cropBoxData.top,
        width = cropBoxData.width,
        height = cropBoxData.height;
      var right = left + width;
      var bottom = top + height;
      var minLeft = 0;
      var minTop = 0;
      var maxWidth = containerData.width;
      var maxHeight = containerData.height;
      var renderable = true;
      var offset;

      // Locking aspect ratio in "free mode" by holding shift key
      if (!aspectRatio && event.shiftKey) {
        aspectRatio = width && height ? width / height : 1;
      }
      if (this.limited) {
        minLeft = cropBoxData.minLeft;
        minTop = cropBoxData.minTop;
        maxWidth = minLeft + Math.min(containerData.width, canvasData.width, canvasData.left + canvasData.width);
        maxHeight = minTop + Math.min(containerData.height, canvasData.height, canvasData.top + canvasData.height);
      }
      var pointer = pointers[Object.keys(pointers)[0]];
      var range = {
        x: pointer.endX - pointer.startX,
        y: pointer.endY - pointer.startY
      };
      var check = function check(side) {
        switch (side) {
          case ACTION_EAST:
            if (right + range.x > maxWidth) {
              range.x = maxWidth - right;
            }
            break;
          case ACTION_WEST:
            if (left + range.x < minLeft) {
              range.x = minLeft - left;
            }
            break;
          case ACTION_NORTH:
            if (top + range.y < minTop) {
              range.y = minTop - top;
            }
            break;
          case ACTION_SOUTH:
            if (bottom + range.y > maxHeight) {
              range.y = maxHeight - bottom;
            }
            break;
        }
      };
      switch (action) {
        // Move crop box
        case ACTION_ALL:
          left += range.x;
          top += range.y;
          break;

        // Resize crop box
        case ACTION_EAST:
          if (range.x >= 0 && (right >= maxWidth || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
            renderable = false;
            break;
          }
          check(ACTION_EAST);
          width += range.x;
          if (width < 0) {
            action = ACTION_WEST;
            width = -width;
            left -= width;
          }
          if (aspectRatio) {
            height = width / aspectRatio;
            top += (cropBoxData.height - height) / 2;
          }
          break;
        case ACTION_NORTH:
          if (range.y <= 0 && (top <= minTop || aspectRatio && (left <= minLeft || right >= maxWidth))) {
            renderable = false;
            break;
          }
          check(ACTION_NORTH);
          height -= range.y;
          top += range.y;
          if (height < 0) {
            action = ACTION_SOUTH;
            height = -height;
            top -= height;
          }
          if (aspectRatio) {
            width = height * aspectRatio;
            left += (cropBoxData.width - width) / 2;
          }
          break;
        case ACTION_WEST:
          if (range.x <= 0 && (left <= minLeft || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
            renderable = false;
            break;
          }
          check(ACTION_WEST);
          width -= range.x;
          left += range.x;
          if (width < 0) {
            action = ACTION_EAST;
            width = -width;
            left -= width;
          }
          if (aspectRatio) {
            height = width / aspectRatio;
            top += (cropBoxData.height - height) / 2;
          }
          break;
        case ACTION_SOUTH:
          if (range.y >= 0 && (bottom >= maxHeight || aspectRatio && (left <= minLeft || right >= maxWidth))) {
            renderable = false;
            break;
          }
          check(ACTION_SOUTH);
          height += range.y;
          if (height < 0) {
            action = ACTION_NORTH;
            height = -height;
            top -= height;
          }
          if (aspectRatio) {
            width = height * aspectRatio;
            left += (cropBoxData.width - width) / 2;
          }
          break;
        case ACTION_NORTH_EAST:
          if (aspectRatio) {
            if (range.y <= 0 && (top <= minTop || right >= maxWidth)) {
              renderable = false;
              break;
            }
            check(ACTION_NORTH);
            height -= range.y;
            top += range.y;
            width = height * aspectRatio;
          } else {
            check(ACTION_NORTH);
            check(ACTION_EAST);
            if (range.x >= 0) {
              if (right < maxWidth) {
                width += range.x;
              } else if (range.y <= 0 && top <= minTop) {
                renderable = false;
              }
            } else {
              width += range.x;
            }
            if (range.y <= 0) {
              if (top > minTop) {
                height -= range.y;
                top += range.y;
              }
            } else {
              height -= range.y;
              top += range.y;
            }
          }
          if (width < 0 && height < 0) {
            action = ACTION_SOUTH_WEST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_NORTH_WEST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_SOUTH_EAST;
            height = -height;
            top -= height;
          }
          break;
        case ACTION_NORTH_WEST:
          if (aspectRatio) {
            if (range.y <= 0 && (top <= minTop || left <= minLeft)) {
              renderable = false;
              break;
            }
            check(ACTION_NORTH);
            height -= range.y;
            top += range.y;
            width = height * aspectRatio;
            left += cropBoxData.width - width;
          } else {
            check(ACTION_NORTH);
            check(ACTION_WEST);
            if (range.x <= 0) {
              if (left > minLeft) {
                width -= range.x;
                left += range.x;
              } else if (range.y <= 0 && top <= minTop) {
                renderable = false;
              }
            } else {
              width -= range.x;
              left += range.x;
            }
            if (range.y <= 0) {
              if (top > minTop) {
                height -= range.y;
                top += range.y;
              }
            } else {
              height -= range.y;
              top += range.y;
            }
          }
          if (width < 0 && height < 0) {
            action = ACTION_SOUTH_EAST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_NORTH_EAST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_SOUTH_WEST;
            height = -height;
            top -= height;
          }
          break;
        case ACTION_SOUTH_WEST:
          if (aspectRatio) {
            if (range.x <= 0 && (left <= minLeft || bottom >= maxHeight)) {
              renderable = false;
              break;
            }
            check(ACTION_WEST);
            width -= range.x;
            left += range.x;
            height = width / aspectRatio;
          } else {
            check(ACTION_SOUTH);
            check(ACTION_WEST);
            if (range.x <= 0) {
              if (left > minLeft) {
                width -= range.x;
                left += range.x;
              } else if (range.y >= 0 && bottom >= maxHeight) {
                renderable = false;
              }
            } else {
              width -= range.x;
              left += range.x;
            }
            if (range.y >= 0) {
              if (bottom < maxHeight) {
                height += range.y;
              }
            } else {
              height += range.y;
            }
          }
          if (width < 0 && height < 0) {
            action = ACTION_NORTH_EAST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_SOUTH_EAST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_NORTH_WEST;
            height = -height;
            top -= height;
          }
          break;
        case ACTION_SOUTH_EAST:
          if (aspectRatio) {
            if (range.x >= 0 && (right >= maxWidth || bottom >= maxHeight)) {
              renderable = false;
              break;
            }
            check(ACTION_EAST);
            width += range.x;
            height = width / aspectRatio;
          } else {
            check(ACTION_SOUTH);
            check(ACTION_EAST);
            if (range.x >= 0) {
              if (right < maxWidth) {
                width += range.x;
              } else if (range.y >= 0 && bottom >= maxHeight) {
                renderable = false;
              }
            } else {
              width += range.x;
            }
            if (range.y >= 0) {
              if (bottom < maxHeight) {
                height += range.y;
              }
            } else {
              height += range.y;
            }
          }
          if (width < 0 && height < 0) {
            action = ACTION_NORTH_WEST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_SOUTH_WEST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_NORTH_EAST;
            height = -height;
            top -= height;
          }
          break;

        // Move canvas
        case ACTION_MOVE:
          this.move(range.x, range.y);
          renderable = false;
          break;

        // Zoom canvas
        case ACTION_ZOOM:
          this.zoom(getMaxZoomRatio(pointers), event);
          renderable = false;
          break;

        // Create crop box
        case ACTION_CROP:
          if (!range.x || !range.y) {
            renderable = false;
            break;
          }
          offset = getOffset(this.cropper);
          left = pointer.startX - offset.left;
          top = pointer.startY - offset.top;
          width = cropBoxData.minWidth;
          height = cropBoxData.minHeight;
          if (range.x > 0) {
            action = range.y > 0 ? ACTION_SOUTH_EAST : ACTION_NORTH_EAST;
          } else if (range.x < 0) {
            left -= width;
            action = range.y > 0 ? ACTION_SOUTH_WEST : ACTION_NORTH_WEST;
          }
          if (range.y < 0) {
            top -= height;
          }

          // Show the crop box if is hidden
          if (!this.cropped) {
            removeClass(this.cropBox, CLASS_HIDDEN);
            this.cropped = true;
            if (this.limited) {
              this.limitCropBox(true, true);
            }
          }
          break;
      }
      if (renderable) {
        cropBoxData.width = width;
        cropBoxData.height = height;
        cropBoxData.left = left;
        cropBoxData.top = top;
        this.action = action;
        this.renderCropBox();
      }

      // Override
      forEach(pointers, function (p) {
        p.startX = p.endX;
        p.startY = p.endY;
      });
    }
  };

  var methods = {
    // Show the crop box manually
    crop: function crop() {
      if (this.ready && !this.cropped && !this.disabled) {
        this.cropped = true;
        this.limitCropBox(true, true);
        if (this.options.modal) {
          addClass(this.dragBox, CLASS_MODAL);
        }
        removeClass(this.cropBox, CLASS_HIDDEN);
        this.setCropBoxData(this.initialCropBoxData);
      }
      return this;
    },
    // Reset the image and crop box to their initial states
    reset: function reset() {
      if (this.ready && !this.disabled) {
        this.imageData = assign({}, this.initialImageData);
        this.canvasData = assign({}, this.initialCanvasData);
        this.cropBoxData = assign({}, this.initialCropBoxData);
        this.renderCanvas();
        if (this.cropped) {
          this.renderCropBox();
        }
      }
      return this;
    },
    // Clear the crop box
    clear: function clear() {
      if (this.cropped && !this.disabled) {
        assign(this.cropBoxData, {
          left: 0,
          top: 0,
          width: 0,
          height: 0
        });
        this.cropped = false;
        this.renderCropBox();
        this.limitCanvas(true, true);

        // Render canvas after crop box rendered
        this.renderCanvas();
        removeClass(this.dragBox, CLASS_MODAL);
        addClass(this.cropBox, CLASS_HIDDEN);
      }
      return this;
    },
    /**
     * Replace the image's src and rebuild the cropper
     * @param {string} url - The new URL.
     * @param {boolean} [hasSameSize] - Indicate if the new image has the same size as the old one.
     * @returns {Cropper} this
     */
    replace: function replace(url) {
      var hasSameSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!this.disabled && url) {
        if (this.isImg) {
          this.element.src = url;
        }
        if (hasSameSize) {
          this.url = url;
          this.image.src = url;
          if (this.ready) {
            this.viewBoxImage.src = url;
            forEach(this.previews, function (element) {
              element.getElementsByTagName('img')[0].src = url;
            });
          }
        } else {
          if (this.isImg) {
            this.replaced = true;
          }
          this.options.data = null;
          this.uncreate();
          this.load(url);
        }
      }
      return this;
    },
    // Enable (unfreeze) the cropper
    enable: function enable() {
      if (this.ready && this.disabled) {
        this.disabled = false;
        removeClass(this.cropper, CLASS_DISABLED);
      }
      return this;
    },
    // Disable (freeze) the cropper
    disable: function disable() {
      if (this.ready && !this.disabled) {
        this.disabled = true;
        addClass(this.cropper, CLASS_DISABLED);
      }
      return this;
    },
    /**
     * Destroy the cropper and remove the instance from the image
     * @returns {Cropper} this
     */
    destroy: function destroy() {
      var element = this.element;
      if (!element[NAMESPACE]) {
        return this;
      }
      element[NAMESPACE] = undefined;
      if (this.isImg && this.replaced) {
        element.src = this.originalUrl;
      }
      this.uncreate();
      return this;
    },
    /**
     * Move the canvas with relative offsets
     * @param {number} offsetX - The relative offset distance on the x-axis.
     * @param {number} [offsetY=offsetX] - The relative offset distance on the y-axis.
     * @returns {Cropper} this
     */
    move: function move(offsetX) {
      var offsetY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : offsetX;
      var _this$canvasData = this.canvasData,
        left = _this$canvasData.left,
        top = _this$canvasData.top;
      return this.moveTo(isUndefined(offsetX) ? offsetX : left + Number(offsetX), isUndefined(offsetY) ? offsetY : top + Number(offsetY));
    },
    /**
     * Move the canvas to an absolute point
     * @param {number} x - The x-axis coordinate.
     * @param {number} [y=x] - The y-axis coordinate.
     * @returns {Cropper} this
     */
    moveTo: function moveTo(x) {
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      var canvasData = this.canvasData;
      var changed = false;
      x = Number(x);
      y = Number(y);
      if (this.ready && !this.disabled && this.options.movable) {
        if (isNumber(x)) {
          canvasData.left = x;
          changed = true;
        }
        if (isNumber(y)) {
          canvasData.top = y;
          changed = true;
        }
        if (changed) {
          this.renderCanvas(true);
        }
      }
      return this;
    },
    /**
     * Zoom the canvas with a relative ratio
     * @param {number} ratio - The target ratio.
     * @param {Event} _originalEvent - The original event if any.
     * @returns {Cropper} this
     */
    zoom: function zoom(ratio, _originalEvent) {
      var canvasData = this.canvasData;
      ratio = Number(ratio);
      if (ratio < 0) {
        ratio = 1 / (1 - ratio);
      } else {
        ratio = 1 + ratio;
      }
      return this.zoomTo(canvasData.width * ratio / canvasData.naturalWidth, null, _originalEvent);
    },
    /**
     * Zoom the canvas to an absolute ratio
     * @param {number} ratio - The target ratio.
     * @param {Object} pivot - The zoom pivot point coordinate.
     * @param {Event} _originalEvent - The original event if any.
     * @returns {Cropper} this
     */
    zoomTo: function zoomTo(ratio, pivot, _originalEvent) {
      var options = this.options,
        canvasData = this.canvasData;
      var width = canvasData.width,
        height = canvasData.height,
        naturalWidth = canvasData.naturalWidth,
        naturalHeight = canvasData.naturalHeight;
      ratio = Number(ratio);
      if (ratio >= 0 && this.ready && !this.disabled && options.zoomable) {
        var newWidth = naturalWidth * ratio;
        var newHeight = naturalHeight * ratio;
        if (dispatchEvent(this.element, EVENT_ZOOM, {
          ratio: ratio,
          oldRatio: width / naturalWidth,
          originalEvent: _originalEvent
        }) === false) {
          return this;
        }
        if (_originalEvent) {
          var pointers = this.pointers;
          var offset = getOffset(this.cropper);
          var center = pointers && Object.keys(pointers).length ? getPointersCenter(pointers) : {
            pageX: _originalEvent.pageX,
            pageY: _originalEvent.pageY
          };

          // Zoom from the triggering point of the event
          canvasData.left -= (newWidth - width) * ((center.pageX - offset.left - canvasData.left) / width);
          canvasData.top -= (newHeight - height) * ((center.pageY - offset.top - canvasData.top) / height);
        } else if (isPlainObject(pivot) && isNumber(pivot.x) && isNumber(pivot.y)) {
          canvasData.left -= (newWidth - width) * ((pivot.x - canvasData.left) / width);
          canvasData.top -= (newHeight - height) * ((pivot.y - canvasData.top) / height);
        } else {
          // Zoom from the center of the canvas
          canvasData.left -= (newWidth - width) / 2;
          canvasData.top -= (newHeight - height) / 2;
        }
        canvasData.width = newWidth;
        canvasData.height = newHeight;
        this.renderCanvas(true);
      }
      return this;
    },
    /**
     * Rotate the canvas with a relative degree
     * @param {number} degree - The rotate degree.
     * @returns {Cropper} this
     */
    rotate: function rotate(degree) {
      return this.rotateTo((this.imageData.rotate || 0) + Number(degree));
    },
    /**
     * Rotate the canvas to an absolute degree
     * @param {number} degree - The rotate degree.
     * @returns {Cropper} this
     */
    rotateTo: function rotateTo(degree) {
      degree = Number(degree);
      if (isNumber(degree) && this.ready && !this.disabled && this.options.rotatable) {
        this.imageData.rotate = degree % 360;
        this.renderCanvas(true, true);
      }
      return this;
    },
    /**
     * Scale the image on the x-axis.
     * @param {number} scaleX - The scale ratio on the x-axis.
     * @returns {Cropper} this
     */
    scaleX: function scaleX(_scaleX) {
      var scaleY = this.imageData.scaleY;
      return this.scale(_scaleX, isNumber(scaleY) ? scaleY : 1);
    },
    /**
     * Scale the image on the y-axis.
     * @param {number} scaleY - The scale ratio on the y-axis.
     * @returns {Cropper} this
     */
    scaleY: function scaleY(_scaleY) {
      var scaleX = this.imageData.scaleX;
      return this.scale(isNumber(scaleX) ? scaleX : 1, _scaleY);
    },
    /**
     * Scale the image
     * @param {number} scaleX - The scale ratio on the x-axis.
     * @param {number} [scaleY=scaleX] - The scale ratio on the y-axis.
     * @returns {Cropper} this
     */
    scale: function scale(scaleX) {
      var scaleY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : scaleX;
      var imageData = this.imageData;
      var transformed = false;
      scaleX = Number(scaleX);
      scaleY = Number(scaleY);
      if (this.ready && !this.disabled && this.options.scalable) {
        if (isNumber(scaleX)) {
          imageData.scaleX = scaleX;
          transformed = true;
        }
        if (isNumber(scaleY)) {
          imageData.scaleY = scaleY;
          transformed = true;
        }
        if (transformed) {
          this.renderCanvas(true, true);
        }
      }
      return this;
    },
    /**
     * Get the cropped area position and size data (base on the original image)
     * @param {boolean} [rounded=false] - Indicate if round the data values or not.
     * @returns {Object} The result cropped data.
     */
    getData: function getData() {
      var rounded = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var options = this.options,
        imageData = this.imageData,
        canvasData = this.canvasData,
        cropBoxData = this.cropBoxData;
      var data;
      if (this.ready && this.cropped) {
        data = {
          x: cropBoxData.left - canvasData.left,
          y: cropBoxData.top - canvasData.top,
          width: cropBoxData.width,
          height: cropBoxData.height
        };
        var ratio = imageData.width / imageData.naturalWidth;
        forEach(data, function (n, i) {
          data[i] = n / ratio;
        });
        if (rounded) {
          // In case rounding off leads to extra 1px in right or bottom border
          // we should round the top-left corner and the dimension (#343).
          var bottom = Math.round(data.y + data.height);
          var right = Math.round(data.x + data.width);
          data.x = Math.round(data.x);
          data.y = Math.round(data.y);
          data.width = right - data.x;
          data.height = bottom - data.y;
        }
      } else {
        data = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
      }
      if (options.rotatable) {
        data.rotate = imageData.rotate || 0;
      }
      if (options.scalable) {
        data.scaleX = imageData.scaleX || 1;
        data.scaleY = imageData.scaleY || 1;
      }
      return data;
    },
    /**
     * Set the cropped area position and size with new data
     * @param {Object} data - The new data.
     * @returns {Cropper} this
     */
    setData: function setData(data) {
      var options = this.options,
        imageData = this.imageData,
        canvasData = this.canvasData;
      var cropBoxData = {};
      if (this.ready && !this.disabled && isPlainObject(data)) {
        var transformed = false;
        if (options.rotatable) {
          if (isNumber(data.rotate) && data.rotate !== imageData.rotate) {
            imageData.rotate = data.rotate;
            transformed = true;
          }
        }
        if (options.scalable) {
          if (isNumber(data.scaleX) && data.scaleX !== imageData.scaleX) {
            imageData.scaleX = data.scaleX;
            transformed = true;
          }
          if (isNumber(data.scaleY) && data.scaleY !== imageData.scaleY) {
            imageData.scaleY = data.scaleY;
            transformed = true;
          }
        }
        if (transformed) {
          this.renderCanvas(true, true);
        }
        var ratio = imageData.width / imageData.naturalWidth;
        if (isNumber(data.x)) {
          cropBoxData.left = data.x * ratio + canvasData.left;
        }
        if (isNumber(data.y)) {
          cropBoxData.top = data.y * ratio + canvasData.top;
        }
        if (isNumber(data.width)) {
          cropBoxData.width = data.width * ratio;
        }
        if (isNumber(data.height)) {
          cropBoxData.height = data.height * ratio;
        }
        this.setCropBoxData(cropBoxData);
      }
      return this;
    },
    /**
     * Get the container size data.
     * @returns {Object} The result container data.
     */
    getContainerData: function getContainerData() {
      return this.ready ? assign({}, this.containerData) : {};
    },
    /**
     * Get the image position and size data.
     * @returns {Object} The result image data.
     */
    getImageData: function getImageData() {
      return this.sized ? assign({}, this.imageData) : {};
    },
    /**
     * Get the canvas position and size data.
     * @returns {Object} The result canvas data.
     */
    getCanvasData: function getCanvasData() {
      var canvasData = this.canvasData;
      var data = {};
      if (this.ready) {
        forEach(['left', 'top', 'width', 'height', 'naturalWidth', 'naturalHeight'], function (n) {
          data[n] = canvasData[n];
        });
      }
      return data;
    },
    /**
     * Set the canvas position and size with new data.
     * @param {Object} data - The new canvas data.
     * @returns {Cropper} this
     */
    setCanvasData: function setCanvasData(data) {
      var canvasData = this.canvasData;
      var aspectRatio = canvasData.aspectRatio;
      if (this.ready && !this.disabled && isPlainObject(data)) {
        if (isNumber(data.left)) {
          canvasData.left = data.left;
        }
        if (isNumber(data.top)) {
          canvasData.top = data.top;
        }
        if (isNumber(data.width)) {
          canvasData.width = data.width;
          canvasData.height = data.width / aspectRatio;
        } else if (isNumber(data.height)) {
          canvasData.height = data.height;
          canvasData.width = data.height * aspectRatio;
        }
        this.renderCanvas(true);
      }
      return this;
    },
    /**
     * Get the crop box position and size data.
     * @returns {Object} The result crop box data.
     */
    getCropBoxData: function getCropBoxData() {
      var cropBoxData = this.cropBoxData;
      var data;
      if (this.ready && this.cropped) {
        data = {
          left: cropBoxData.left,
          top: cropBoxData.top,
          width: cropBoxData.width,
          height: cropBoxData.height
        };
      }
      return data || {};
    },
    /**
     * Set the crop box position and size with new data.
     * @param {Object} data - The new crop box data.
     * @returns {Cropper} this
     */
    setCropBoxData: function setCropBoxData(data) {
      var cropBoxData = this.cropBoxData;
      var aspectRatio = this.options.aspectRatio;
      var widthChanged;
      var heightChanged;
      if (this.ready && this.cropped && !this.disabled && isPlainObject(data)) {
        if (isNumber(data.left)) {
          cropBoxData.left = data.left;
        }
        if (isNumber(data.top)) {
          cropBoxData.top = data.top;
        }
        if (isNumber(data.width) && data.width !== cropBoxData.width) {
          widthChanged = true;
          cropBoxData.width = data.width;
        }
        if (isNumber(data.height) && data.height !== cropBoxData.height) {
          heightChanged = true;
          cropBoxData.height = data.height;
        }
        if (aspectRatio) {
          if (widthChanged) {
            cropBoxData.height = cropBoxData.width / aspectRatio;
          } else if (heightChanged) {
            cropBoxData.width = cropBoxData.height * aspectRatio;
          }
        }
        this.renderCropBox();
      }
      return this;
    },
    /**
     * Get a canvas drawn the cropped image.
     * @param {Object} [options={}] - The config options.
     * @returns {HTMLCanvasElement} - The result canvas.
     */
    getCroppedCanvas: function getCroppedCanvas() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!this.ready || !window.HTMLCanvasElement) {
        return null;
      }
      var canvasData = this.canvasData;
      var source = getSourceCanvas(this.image, this.imageData, canvasData, options);

      // Returns the source canvas if it is not cropped.
      if (!this.cropped) {
        return source;
      }
      var _this$getData = this.getData(options.rounded),
        initialX = _this$getData.x,
        initialY = _this$getData.y,
        initialWidth = _this$getData.width,
        initialHeight = _this$getData.height;
      var ratio = source.width / Math.floor(canvasData.naturalWidth);
      if (ratio !== 1) {
        initialX *= ratio;
        initialY *= ratio;
        initialWidth *= ratio;
        initialHeight *= ratio;
      }
      var aspectRatio = initialWidth / initialHeight;
      var maxSizes = getAdjustedSizes({
        aspectRatio: aspectRatio,
        width: options.maxWidth || Infinity,
        height: options.maxHeight || Infinity
      });
      var minSizes = getAdjustedSizes({
        aspectRatio: aspectRatio,
        width: options.minWidth || 0,
        height: options.minHeight || 0
      }, 'cover');
      var _getAdjustedSizes = getAdjustedSizes({
          aspectRatio: aspectRatio,
          width: options.width || (ratio !== 1 ? source.width : initialWidth),
          height: options.height || (ratio !== 1 ? source.height : initialHeight)
        }),
        width = _getAdjustedSizes.width,
        height = _getAdjustedSizes.height;
      width = Math.min(maxSizes.width, Math.max(minSizes.width, width));
      height = Math.min(maxSizes.height, Math.max(minSizes.height, height));
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      canvas.width = normalizeDecimalNumber(width);
      canvas.height = normalizeDecimalNumber(height);
      context.fillStyle = options.fillColor || 'transparent';
      context.fillRect(0, 0, width, height);
      var _options$imageSmoothi = options.imageSmoothingEnabled,
        imageSmoothingEnabled = _options$imageSmoothi === void 0 ? true : _options$imageSmoothi,
        imageSmoothingQuality = options.imageSmoothingQuality;
      context.imageSmoothingEnabled = imageSmoothingEnabled;
      if (imageSmoothingQuality) {
        context.imageSmoothingQuality = imageSmoothingQuality;
      }

      // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage
      var sourceWidth = source.width;
      var sourceHeight = source.height;

      // Source canvas parameters
      var srcX = initialX;
      var srcY = initialY;
      var srcWidth;
      var srcHeight;

      // Destination canvas parameters
      var dstX;
      var dstY;
      var dstWidth;
      var dstHeight;
      if (srcX <= -initialWidth || srcX > sourceWidth) {
        srcX = 0;
        srcWidth = 0;
        dstX = 0;
        dstWidth = 0;
      } else if (srcX <= 0) {
        dstX = -srcX;
        srcX = 0;
        srcWidth = Math.min(sourceWidth, initialWidth + srcX);
        dstWidth = srcWidth;
      } else if (srcX <= sourceWidth) {
        dstX = 0;
        srcWidth = Math.min(initialWidth, sourceWidth - srcX);
        dstWidth = srcWidth;
      }
      if (srcWidth <= 0 || srcY <= -initialHeight || srcY > sourceHeight) {
        srcY = 0;
        srcHeight = 0;
        dstY = 0;
        dstHeight = 0;
      } else if (srcY <= 0) {
        dstY = -srcY;
        srcY = 0;
        srcHeight = Math.min(sourceHeight, initialHeight + srcY);
        dstHeight = srcHeight;
      } else if (srcY <= sourceHeight) {
        dstY = 0;
        srcHeight = Math.min(initialHeight, sourceHeight - srcY);
        dstHeight = srcHeight;
      }
      var params = [srcX, srcY, srcWidth, srcHeight];

      // Avoid "IndexSizeError"
      if (dstWidth > 0 && dstHeight > 0) {
        var scale = width / initialWidth;
        params.push(dstX * scale, dstY * scale, dstWidth * scale, dstHeight * scale);
      }

      // All the numerical parameters should be integer for `drawImage`
      // https://github.com/fengyuanchen/cropper/issues/476
      context.drawImage.apply(context, [source].concat(_toConsumableArray(params.map(function (param) {
        return Math.floor(normalizeDecimalNumber(param));
      }))));
      return canvas;
    },
    /**
     * Change the aspect ratio of the crop box.
     * @param {number} aspectRatio - The new aspect ratio.
     * @returns {Cropper} this
     */
    setAspectRatio: function setAspectRatio(aspectRatio) {
      var options = this.options;
      if (!this.disabled && !isUndefined(aspectRatio)) {
        // 0 -> NaN
        options.aspectRatio = Math.max(0, aspectRatio) || NaN;
        if (this.ready) {
          this.initCropBox();
          if (this.cropped) {
            this.renderCropBox();
          }
        }
      }
      return this;
    },
    /**
     * Change the drag mode.
     * @param {string} mode - The new drag mode.
     * @returns {Cropper} this
     */
    setDragMode: function setDragMode(mode) {
      var options = this.options,
        dragBox = this.dragBox,
        face = this.face;
      if (this.ready && !this.disabled) {
        var croppable = mode === DRAG_MODE_CROP;
        var movable = options.movable && mode === DRAG_MODE_MOVE;
        mode = croppable || movable ? mode : DRAG_MODE_NONE;
        options.dragMode = mode;
        setData(dragBox, DATA_ACTION, mode);
        toggleClass(dragBox, CLASS_CROP, croppable);
        toggleClass(dragBox, CLASS_MOVE, movable);
        if (!options.cropBoxMovable) {
          // Sync drag mode to crop box when it is not movable
          setData(face, DATA_ACTION, mode);
          toggleClass(face, CLASS_CROP, croppable);
          toggleClass(face, CLASS_MOVE, movable);
        }
      }
      return this;
    }
  };

  var AnotherCropper = WINDOW.Cropper;
  var Cropper = /*#__PURE__*/function () {
    /**
     * Create a new Cropper.
     * @param {Element} element - The target element for cropping.
     * @param {Object} [options={}] - The configuration options.
     */
    function Cropper(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _classCallCheck(this, Cropper);
      if (!element || !REGEXP_TAG_NAME.test(element.tagName)) {
        throw new Error('The first argument is required and must be an <img> or <canvas> element.');
      }
      this.element = element;
      this.options = assign({}, DEFAULTS, isPlainObject(options) && options);
      this.cropped = false;
      this.disabled = false;
      this.pointers = {};
      this.ready = false;
      this.reloading = false;
      this.replaced = false;
      this.sized = false;
      this.sizing = false;
      this.init();
    }
    return _createClass(Cropper, [{
      key: "init",
      value: function init() {
        var element = this.element;
        var tagName = element.tagName.toLowerCase();
        var url;
        if (element[NAMESPACE]) {
          return;
        }
        element[NAMESPACE] = this;
        if (tagName === 'img') {
          this.isImg = true;

          // e.g.: "img/picture.jpg"
          url = element.getAttribute('src') || '';
          this.originalUrl = url;

          // Stop when it's a blank image
          if (!url) {
            return;
          }

          // e.g.: "https://example.com/img/picture.jpg"
          url = element.src;
        } else if (tagName === 'canvas' && window.HTMLCanvasElement) {
          url = element.toDataURL();
        }
        this.load(url);
      }
    }, {
      key: "load",
      value: function load(url) {
        var _this = this;
        if (!url) {
          return;
        }
        this.url = url;
        this.imageData = {};
        var element = this.element,
          options = this.options;
        if (!options.rotatable && !options.scalable) {
          options.checkOrientation = false;
        }

        // Only IE10+ supports Typed Arrays
        if (!options.checkOrientation || !window.ArrayBuffer) {
          this.clone();
          return;
        }

        // Detect the mime type of the image directly if it is a Data URL
        if (REGEXP_DATA_URL.test(url)) {
          // Read ArrayBuffer from Data URL of JPEG images directly for better performance
          if (REGEXP_DATA_URL_JPEG.test(url)) {
            this.read(dataURLToArrayBuffer(url));
          } else {
            // Only a JPEG image may contains Exif Orientation information,
            // the rest types of Data URLs are not necessary to check orientation at all.
            this.clone();
          }
          return;
        }

        // 1. Detect the mime type of the image by a XMLHttpRequest.
        // 2. Load the image as ArrayBuffer for reading orientation if its a JPEG image.
        var xhr = new XMLHttpRequest();
        var clone = this.clone.bind(this);
        this.reloading = true;
        this.xhr = xhr;

        // 1. Cross origin requests are only supported for protocol schemes:
        // http, https, data, chrome, chrome-extension.
        // 2. Access to XMLHttpRequest from a Data URL will be blocked by CORS policy
        // in some browsers as IE11 and Safari.
        xhr.onabort = clone;
        xhr.onerror = clone;
        xhr.ontimeout = clone;
        xhr.onprogress = function () {
          // Abort the request directly if it not a JPEG image for better performance
          if (xhr.getResponseHeader('content-type') !== MIME_TYPE_JPEG) {
            xhr.abort();
          }
        };
        xhr.onload = function () {
          _this.read(xhr.response);
        };
        xhr.onloadend = function () {
          _this.reloading = false;
          _this.xhr = null;
        };

        // Bust cache when there is a "crossOrigin" property to avoid browser cache error
        if (options.checkCrossOrigin && isCrossOriginURL(url) && element.crossOrigin) {
          url = addTimestamp(url);
        }

        // The third parameter is required for avoiding side-effect (#682)
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.withCredentials = element.crossOrigin === 'use-credentials';
        xhr.send();
      }
    }, {
      key: "read",
      value: function read(arrayBuffer) {
        var options = this.options,
          imageData = this.imageData;

        // Reset the orientation value to its default value 1
        // as some iOS browsers will render image with its orientation
        var orientation = resetAndGetOrientation(arrayBuffer);
        var rotate = 0;
        var scaleX = 1;
        var scaleY = 1;
        if (orientation > 1) {
          // Generate a new URL which has the default orientation value
          this.url = arrayBufferToDataURL(arrayBuffer, MIME_TYPE_JPEG);
          var _parseOrientation = parseOrientation(orientation);
          rotate = _parseOrientation.rotate;
          scaleX = _parseOrientation.scaleX;
          scaleY = _parseOrientation.scaleY;
        }
        if (options.rotatable) {
          imageData.rotate = rotate;
        }
        if (options.scalable) {
          imageData.scaleX = scaleX;
          imageData.scaleY = scaleY;
        }
        this.clone();
      }
    }, {
      key: "clone",
      value: function clone() {
        var element = this.element,
          url = this.url;
        var crossOrigin = element.crossOrigin;
        var crossOriginUrl = url;
        if (this.options.checkCrossOrigin && isCrossOriginURL(url)) {
          if (!crossOrigin) {
            crossOrigin = 'anonymous';
          }

          // Bust cache when there is not a "crossOrigin" property (#519)
          crossOriginUrl = addTimestamp(url);
        }
        this.crossOrigin = crossOrigin;
        this.crossOriginUrl = crossOriginUrl;
        var image = document.createElement('img');
        if (crossOrigin) {
          image.crossOrigin = crossOrigin;
        }
        image.src = crossOriginUrl || url;
        image.alt = element.alt || 'The image to crop';
        this.image = image;
        image.onload = this.start.bind(this);
        image.onerror = this.stop.bind(this);
        addClass(image, CLASS_HIDE);
        element.parentNode.insertBefore(image, element.nextSibling);
      }
    }, {
      key: "start",
      value: function start() {
        var _this2 = this;
        var image = this.image;
        image.onload = null;
        image.onerror = null;
        this.sizing = true;

        // Match all browsers that use WebKit as the layout engine in iOS devices,
        // such as Safari for iOS, Chrome for iOS, and in-app browsers.
        var isIOSWebKit = WINDOW.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(WINDOW.navigator.userAgent);
        var done = function done(naturalWidth, naturalHeight) {
          assign(_this2.imageData, {
            naturalWidth: naturalWidth,
            naturalHeight: naturalHeight,
            aspectRatio: naturalWidth / naturalHeight
          });
          _this2.initialImageData = assign({}, _this2.imageData);
          _this2.sizing = false;
          _this2.sized = true;
          _this2.build();
        };

        // Most modern browsers (excepts iOS WebKit)
        if (image.naturalWidth && !isIOSWebKit) {
          done(image.naturalWidth, image.naturalHeight);
          return;
        }
        var sizingImage = document.createElement('img');
        var body = document.body || document.documentElement;
        this.sizingImage = sizingImage;
        sizingImage.onload = function () {
          done(sizingImage.width, sizingImage.height);
          if (!isIOSWebKit) {
            body.removeChild(sizingImage);
          }
        };
        sizingImage.src = image.src;

        // iOS WebKit will convert the image automatically
        // with its orientation once append it into DOM (#279)
        if (!isIOSWebKit) {
          sizingImage.style.cssText = 'left:0;' + 'max-height:none!important;' + 'max-width:none!important;' + 'min-height:0!important;' + 'min-width:0!important;' + 'opacity:0;' + 'position:absolute;' + 'top:0;' + 'z-index:-1;';
          body.appendChild(sizingImage);
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        var image = this.image;
        image.onload = null;
        image.onerror = null;
        image.parentNode.removeChild(image);
        this.image = null;
      }
    }, {
      key: "build",
      value: function build() {
        if (!this.sized || this.ready) {
          return;
        }
        var element = this.element,
          options = this.options,
          image = this.image;

        // Create cropper elements
        var container = element.parentNode;
        var template = document.createElement('div');
        template.innerHTML = TEMPLATE;
        var cropper = template.querySelector(".".concat(NAMESPACE, "-container"));
        var canvas = cropper.querySelector(".".concat(NAMESPACE, "-canvas"));
        var dragBox = cropper.querySelector(".".concat(NAMESPACE, "-drag-box"));
        var cropBox = cropper.querySelector(".".concat(NAMESPACE, "-crop-box"));
        var face = cropBox.querySelector(".".concat(NAMESPACE, "-face"));
        this.container = container;
        this.cropper = cropper;
        this.canvas = canvas;
        this.dragBox = dragBox;
        this.cropBox = cropBox;
        this.viewBox = cropper.querySelector(".".concat(NAMESPACE, "-view-box"));
        this.face = face;
        canvas.appendChild(image);

        // Hide the original image
        addClass(element, CLASS_HIDDEN);

        // Inserts the cropper after to the current image
        container.insertBefore(cropper, element.nextSibling);

        // Show the hidden image
        removeClass(image, CLASS_HIDE);
        this.initPreview();
        this.bind();
        options.initialAspectRatio = Math.max(0, options.initialAspectRatio) || NaN;
        options.aspectRatio = Math.max(0, options.aspectRatio) || NaN;
        options.viewMode = Math.max(0, Math.min(3, Math.round(options.viewMode))) || 0;
        addClass(cropBox, CLASS_HIDDEN);
        if (!options.guides) {
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-dashed")), CLASS_HIDDEN);
        }
        if (!options.center) {
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-center")), CLASS_HIDDEN);
        }
        if (options.background) {
          addClass(cropper, "".concat(NAMESPACE, "-bg"));
        }
        if (!options.highlight) {
          addClass(face, CLASS_INVISIBLE);
        }
        if (options.cropBoxMovable) {
          addClass(face, CLASS_MOVE);
          setData(face, DATA_ACTION, ACTION_ALL);
        }
        if (!options.cropBoxResizable) {
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-line")), CLASS_HIDDEN);
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-point")), CLASS_HIDDEN);
        }
        this.render();
        this.ready = true;
        this.setDragMode(options.dragMode);
        if (options.autoCrop) {
          this.crop();
        }
        this.setData(options.data);
        if (isFunction(options.ready)) {
          addListener(element, EVENT_READY, options.ready, {
            once: true
          });
        }
        dispatchEvent(element, EVENT_READY);
      }
    }, {
      key: "unbuild",
      value: function unbuild() {
        if (!this.ready) {
          return;
        }
        this.ready = false;
        this.unbind();
        this.resetPreview();
        var parentNode = this.cropper.parentNode;
        if (parentNode) {
          parentNode.removeChild(this.cropper);
        }
        removeClass(this.element, CLASS_HIDDEN);
      }
    }, {
      key: "uncreate",
      value: function uncreate() {
        if (this.ready) {
          this.unbuild();
          this.ready = false;
          this.cropped = false;
        } else if (this.sizing) {
          this.sizingImage.onload = null;
          this.sizing = false;
          this.sized = false;
        } else if (this.reloading) {
          this.xhr.onabort = null;
          this.xhr.abort();
        } else if (this.image) {
          this.stop();
        }
      }

      /**
       * Get the no conflict cropper class.
       * @returns {Cropper} The cropper class.
       */
    }], [{
      key: "noConflict",
      value: function noConflict() {
        window.Cropper = AnotherCropper;
        return Cropper;
      }

      /**
       * Change the default options.
       * @param {Object} options - The new default options.
       */
    }, {
      key: "setDefaults",
      value: function setDefaults(options) {
        assign(DEFAULTS, isPlainObject(options) && options);
      }
    }]);
  }();
  assign(Cropper.prototype, render, preview, events, handlers, change, methods);

  return Cropper;

}));


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/cropperjs/dist/cropper.css":
/*!***************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/cropperjs/dist/cropper.css ***!
  \***************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC */ "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*!
 * Cropper.js v1.6.2
 * https://fengyuanchen.github.io/cropperjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2024-04-21T07:43:02.731Z
 */

.cropper-container {
  direction: ltr;
  font-size: 0;
  line-height: 0;
  position: relative;
  -ms-touch-action: none;
      touch-action: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

.cropper-container img {
    backface-visibility: hidden;
    display: block;
    height: 100%;
    image-orientation: 0deg;
    max-height: none !important;
    max-width: none !important;
    min-height: 0 !important;
    min-width: 0 !important;
    width: 100%;
  }

.cropper-wrap-box,
.cropper-canvas,
.cropper-drag-box,
.cropper-crop-box,
.cropper-modal {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.cropper-wrap-box,
.cropper-canvas {
  overflow: hidden;
}

.cropper-drag-box {
  background-color: #fff;
  opacity: 0;
}

.cropper-modal {
  background-color: #000;
  opacity: 0.5;
}

.cropper-view-box {
  display: block;
  height: 100%;
  outline: 1px solid #39f;
  outline-color: rgba(51, 153, 255, 0.75);
  overflow: hidden;
  width: 100%;
}

.cropper-dashed {
  border: 0 dashed #eee;
  display: block;
  opacity: 0.5;
  position: absolute;
}

.cropper-dashed.dashed-h {
    border-bottom-width: 1px;
    border-top-width: 1px;
    height: calc(100% / 3);
    left: 0;
    top: calc(100% / 3);
    width: 100%;
  }

.cropper-dashed.dashed-v {
    border-left-width: 1px;
    border-right-width: 1px;
    height: 100%;
    left: calc(100% / 3);
    top: 0;
    width: calc(100% / 3);
  }

.cropper-center {
  display: block;
  height: 0;
  left: 50%;
  opacity: 0.75;
  position: absolute;
  top: 50%;
  width: 0;
}

.cropper-center::before,
  .cropper-center::after {
    background-color: #eee;
    content: ' ';
    display: block;
    position: absolute;
  }

.cropper-center::before {
    height: 1px;
    left: -3px;
    top: 0;
    width: 7px;
  }

.cropper-center::after {
    height: 7px;
    left: 0;
    top: -3px;
    width: 1px;
  }

.cropper-face,
.cropper-line,
.cropper-point {
  display: block;
  height: 100%;
  opacity: 0.1;
  position: absolute;
  width: 100%;
}

.cropper-face {
  background-color: #fff;
  left: 0;
  top: 0;
}

.cropper-line {
  background-color: #39f;
}

.cropper-line.line-e {
    cursor: ew-resize;
    right: -3px;
    top: 0;
    width: 5px;
  }

.cropper-line.line-n {
    cursor: ns-resize;
    height: 5px;
    left: 0;
    top: -3px;
  }

.cropper-line.line-w {
    cursor: ew-resize;
    left: -3px;
    top: 0;
    width: 5px;
  }

.cropper-line.line-s {
    bottom: -3px;
    cursor: ns-resize;
    height: 5px;
    left: 0;
  }

.cropper-point {
  background-color: #39f;
  height: 5px;
  opacity: 0.75;
  width: 5px;
}

.cropper-point.point-e {
    cursor: ew-resize;
    margin-top: -3px;
    right: -3px;
    top: 50%;
  }

.cropper-point.point-n {
    cursor: ns-resize;
    left: 50%;
    margin-left: -3px;
    top: -3px;
  }

.cropper-point.point-w {
    cursor: ew-resize;
    left: -3px;
    margin-top: -3px;
    top: 50%;
  }

.cropper-point.point-s {
    bottom: -3px;
    cursor: s-resize;
    left: 50%;
    margin-left: -3px;
  }

.cropper-point.point-ne {
    cursor: nesw-resize;
    right: -3px;
    top: -3px;
  }

.cropper-point.point-nw {
    cursor: nwse-resize;
    left: -3px;
    top: -3px;
  }

.cropper-point.point-sw {
    bottom: -3px;
    cursor: nesw-resize;
    left: -3px;
  }

.cropper-point.point-se {
    bottom: -3px;
    cursor: nwse-resize;
    height: 20px;
    opacity: 1;
    right: -3px;
    width: 20px;
  }

@media (min-width: 768px) {

.cropper-point.point-se {
      height: 15px;
      width: 15px;
  }
    }

@media (min-width: 992px) {

.cropper-point.point-se {
      height: 10px;
      width: 10px;
  }
    }

@media (min-width: 1200px) {

.cropper-point.point-se {
      height: 5px;
      opacity: 0.75;
      width: 5px;
  }
    }

.cropper-point.point-se::before {
    background-color: #39f;
    bottom: -50%;
    content: ' ';
    display: block;
    height: 200%;
    opacity: 0;
    position: absolute;
    right: -50%;
    width: 200%;
  }

.cropper-invisible {
  opacity: 0;
}

.cropper-bg {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
}

.cropper-hide {
  display: block;
  height: 0;
  position: absolute;
  width: 0;
}

.cropper-hidden {
  display: none !important;
}

.cropper-move {
  cursor: move;
}

.cropper-crop {
  cursor: crosshair;
}

.cropper-disabled .cropper-drag-box,
.cropper-disabled .cropper-face,
.cropper-disabled .cropper-line,
.cropper-disabled .cropper-point {
  cursor: not-allowed;
}
`, "",{"version":3,"sources":["webpack://./node_modules/cropperjs/dist/cropper.css"],"names":[],"mappings":"AAAA;;;;;;;;EAQE;;AAEF;EACE,cAAc;EACd,YAAY;EACZ,cAAc;EACd,kBAAkB;EAClB,sBAAsB;MAClB,kBAAkB;EACtB,2BAA2B;EAC3B,yBAAyB;KACtB,sBAAsB;MACrB,qBAAqB;UACjB,iBAAiB;AAC3B;;AAEA;IACI,2BAA2B;IAC3B,cAAc;IACd,YAAY;IACZ,uBAAuB;IACvB,2BAA2B;IAC3B,0BAA0B;IAC1B,wBAAwB;IACxB,uBAAuB;IACvB,WAAW;EACb;;AAEF;;;;;EAKE,SAAS;EACT,OAAO;EACP,kBAAkB;EAClB,QAAQ;EACR,MAAM;AACR;;AAEA;;EAEE,gBAAgB;AAClB;;AAEA;EACE,sBAAsB;EACtB,UAAU;AACZ;;AAEA;EACE,sBAAsB;EACtB,YAAY;AACd;;AAEA;EACE,cAAc;EACd,YAAY;EACZ,uBAAuB;EACvB,uCAAuC;EACvC,gBAAgB;EAChB,WAAW;AACb;;AAEA;EACE,qBAAqB;EACrB,cAAc;EACd,YAAY;EACZ,kBAAkB;AACpB;;AAEA;IACI,wBAAwB;IACxB,qBAAqB;IACrB,sBAAsB;IACtB,OAAO;IACP,mBAAmB;IACnB,WAAW;EACb;;AAEF;IACI,sBAAsB;IACtB,uBAAuB;IACvB,YAAY;IACZ,oBAAoB;IACpB,MAAM;IACN,qBAAqB;EACvB;;AAEF;EACE,cAAc;EACd,SAAS;EACT,SAAS;EACT,aAAa;EACb,kBAAkB;EAClB,QAAQ;EACR,QAAQ;AACV;;AAEA;;IAEI,sBAAsB;IACtB,YAAY;IACZ,cAAc;IACd,kBAAkB;EACpB;;AAEF;IACI,WAAW;IACX,UAAU;IACV,MAAM;IACN,UAAU;EACZ;;AAEF;IACI,WAAW;IACX,OAAO;IACP,SAAS;IACT,UAAU;EACZ;;AAEF;;;EAGE,cAAc;EACd,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,sBAAsB;EACtB,OAAO;EACP,MAAM;AACR;;AAEA;EACE,sBAAsB;AACxB;;AAEA;IACI,iBAAiB;IACjB,WAAW;IACX,MAAM;IACN,UAAU;EACZ;;AAEF;IACI,iBAAiB;IACjB,WAAW;IACX,OAAO;IACP,SAAS;EACX;;AAEF;IACI,iBAAiB;IACjB,UAAU;IACV,MAAM;IACN,UAAU;EACZ;;AAEF;IACI,YAAY;IACZ,iBAAiB;IACjB,WAAW;IACX,OAAO;EACT;;AAEF;EACE,sBAAsB;EACtB,WAAW;EACX,aAAa;EACb,UAAU;AACZ;;AAEA;IACI,iBAAiB;IACjB,gBAAgB;IAChB,WAAW;IACX,QAAQ;EACV;;AAEF;IACI,iBAAiB;IACjB,SAAS;IACT,iBAAiB;IACjB,SAAS;EACX;;AAEF;IACI,iBAAiB;IACjB,UAAU;IACV,gBAAgB;IAChB,QAAQ;EACV;;AAEF;IACI,YAAY;IACZ,gBAAgB;IAChB,SAAS;IACT,iBAAiB;EACnB;;AAEF;IACI,mBAAmB;IACnB,WAAW;IACX,SAAS;EACX;;AAEF;IACI,mBAAmB;IACnB,UAAU;IACV,SAAS;EACX;;AAEF;IACI,YAAY;IACZ,mBAAmB;IACnB,UAAU;EACZ;;AAEF;IACI,YAAY;IACZ,mBAAmB;IACnB,YAAY;IACZ,UAAU;IACV,WAAW;IACX,WAAW;EACb;;AAEF;;AAEA;MACM,YAAY;MACZ,WAAW;EACf;IACE;;AAEJ;;AAEA;MACM,YAAY;MACZ,WAAW;EACf;IACE;;AAEJ;;AAEA;MACM,WAAW;MACX,aAAa;MACb,UAAU;EACd;IACE;;AAEJ;IACI,sBAAsB;IACtB,YAAY;IACZ,YAAY;IACZ,cAAc;IACd,YAAY;IACZ,UAAU;IACV,kBAAkB;IAClB,WAAW;IACX,WAAW;EACb;;AAEF;EACE,UAAU;AACZ;;AAEA;EACE,yDAA+Q;AACjR;;AAEA;EACE,cAAc;EACd,SAAS;EACT,kBAAkB;EAClB,QAAQ;AACV;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,iBAAiB;AACnB;;AAEA;;;;EAIE,mBAAmB;AACrB","sourcesContent":["/*!\n * Cropper.js v1.6.2\n * https://fengyuanchen.github.io/cropperjs\n *\n * Copyright 2015-present Chen Fengyuan\n * Released under the MIT license\n *\n * Date: 2024-04-21T07:43:02.731Z\n */\n\n.cropper-container {\n  direction: ltr;\n  font-size: 0;\n  line-height: 0;\n  position: relative;\n  -ms-touch-action: none;\n      touch-action: none;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.cropper-container img {\n    backface-visibility: hidden;\n    display: block;\n    height: 100%;\n    image-orientation: 0deg;\n    max-height: none !important;\n    max-width: none !important;\n    min-height: 0 !important;\n    min-width: 0 !important;\n    width: 100%;\n  }\n\n.cropper-wrap-box,\n.cropper-canvas,\n.cropper-drag-box,\n.cropper-crop-box,\n.cropper-modal {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.cropper-wrap-box,\n.cropper-canvas {\n  overflow: hidden;\n}\n\n.cropper-drag-box {\n  background-color: #fff;\n  opacity: 0;\n}\n\n.cropper-modal {\n  background-color: #000;\n  opacity: 0.5;\n}\n\n.cropper-view-box {\n  display: block;\n  height: 100%;\n  outline: 1px solid #39f;\n  outline-color: rgba(51, 153, 255, 0.75);\n  overflow: hidden;\n  width: 100%;\n}\n\n.cropper-dashed {\n  border: 0 dashed #eee;\n  display: block;\n  opacity: 0.5;\n  position: absolute;\n}\n\n.cropper-dashed.dashed-h {\n    border-bottom-width: 1px;\n    border-top-width: 1px;\n    height: calc(100% / 3);\n    left: 0;\n    top: calc(100% / 3);\n    width: 100%;\n  }\n\n.cropper-dashed.dashed-v {\n    border-left-width: 1px;\n    border-right-width: 1px;\n    height: 100%;\n    left: calc(100% / 3);\n    top: 0;\n    width: calc(100% / 3);\n  }\n\n.cropper-center {\n  display: block;\n  height: 0;\n  left: 50%;\n  opacity: 0.75;\n  position: absolute;\n  top: 50%;\n  width: 0;\n}\n\n.cropper-center::before,\n  .cropper-center::after {\n    background-color: #eee;\n    content: ' ';\n    display: block;\n    position: absolute;\n  }\n\n.cropper-center::before {\n    height: 1px;\n    left: -3px;\n    top: 0;\n    width: 7px;\n  }\n\n.cropper-center::after {\n    height: 7px;\n    left: 0;\n    top: -3px;\n    width: 1px;\n  }\n\n.cropper-face,\n.cropper-line,\n.cropper-point {\n  display: block;\n  height: 100%;\n  opacity: 0.1;\n  position: absolute;\n  width: 100%;\n}\n\n.cropper-face {\n  background-color: #fff;\n  left: 0;\n  top: 0;\n}\n\n.cropper-line {\n  background-color: #39f;\n}\n\n.cropper-line.line-e {\n    cursor: ew-resize;\n    right: -3px;\n    top: 0;\n    width: 5px;\n  }\n\n.cropper-line.line-n {\n    cursor: ns-resize;\n    height: 5px;\n    left: 0;\n    top: -3px;\n  }\n\n.cropper-line.line-w {\n    cursor: ew-resize;\n    left: -3px;\n    top: 0;\n    width: 5px;\n  }\n\n.cropper-line.line-s {\n    bottom: -3px;\n    cursor: ns-resize;\n    height: 5px;\n    left: 0;\n  }\n\n.cropper-point {\n  background-color: #39f;\n  height: 5px;\n  opacity: 0.75;\n  width: 5px;\n}\n\n.cropper-point.point-e {\n    cursor: ew-resize;\n    margin-top: -3px;\n    right: -3px;\n    top: 50%;\n  }\n\n.cropper-point.point-n {\n    cursor: ns-resize;\n    left: 50%;\n    margin-left: -3px;\n    top: -3px;\n  }\n\n.cropper-point.point-w {\n    cursor: ew-resize;\n    left: -3px;\n    margin-top: -3px;\n    top: 50%;\n  }\n\n.cropper-point.point-s {\n    bottom: -3px;\n    cursor: s-resize;\n    left: 50%;\n    margin-left: -3px;\n  }\n\n.cropper-point.point-ne {\n    cursor: nesw-resize;\n    right: -3px;\n    top: -3px;\n  }\n\n.cropper-point.point-nw {\n    cursor: nwse-resize;\n    left: -3px;\n    top: -3px;\n  }\n\n.cropper-point.point-sw {\n    bottom: -3px;\n    cursor: nesw-resize;\n    left: -3px;\n  }\n\n.cropper-point.point-se {\n    bottom: -3px;\n    cursor: nwse-resize;\n    height: 20px;\n    opacity: 1;\n    right: -3px;\n    width: 20px;\n  }\n\n@media (min-width: 768px) {\n\n.cropper-point.point-se {\n      height: 15px;\n      width: 15px;\n  }\n    }\n\n@media (min-width: 992px) {\n\n.cropper-point.point-se {\n      height: 10px;\n      width: 10px;\n  }\n    }\n\n@media (min-width: 1200px) {\n\n.cropper-point.point-se {\n      height: 5px;\n      opacity: 0.75;\n      width: 5px;\n  }\n    }\n\n.cropper-point.point-se::before {\n    background-color: #39f;\n    bottom: -50%;\n    content: ' ';\n    display: block;\n    height: 200%;\n    opacity: 0;\n    position: absolute;\n    right: -50%;\n    width: 200%;\n  }\n\n.cropper-invisible {\n  opacity: 0;\n}\n\n.cropper-bg {\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');\n}\n\n.cropper-hide {\n  display: block;\n  height: 0;\n  position: absolute;\n  width: 0;\n}\n\n.cropper-hidden {\n  display: none !important;\n}\n\n.cropper-move {\n  cursor: move;\n}\n\n.cropper-crop {\n  cursor: crosshair;\n}\n\n.cropper-disabled .cropper-drag-box,\n.cropper-disabled .cropper-face,\n.cropper-disabled .cropper-line,\n.cropper-disabled .cropper-point {\n  cursor: not-allowed;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/toastify-js/src/toastify.css":
/*!*****************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/toastify-js/src/toastify.css ***!
  \*****************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./node_modules/cropperjs/dist/cropper.css":
/*!*************************************************!*\
  !*** ./node_modules/cropperjs/dist/cropper.css ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _css_loader_dist_cjs_js_cropper_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../css-loader/dist/cjs.js!./cropper.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/cropperjs/dist/cropper.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_cropper_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_cropper_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_cropper_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_cropper_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/toastify-js/src/toastify.css":
/*!***************************************************!*\
  !*** ./node_modules/toastify-js/src/toastify.css ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./node_modules/toastify-js/src/toastify.js":
/*!**************************************************!*\
  !*** ./node_modules/toastify-js/src/toastify.js ***!
  \**************************************************/
/***/ (function(module) {

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


/***/ }),

/***/ "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"./assets/js/dist/frontend/profile": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*******************************************!*\
  !*** ./assets/src/js/frontend/profile.js ***!
  \*******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _profile_course_tab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile/course-tab */ "./assets/src/js/frontend/profile/course-tab.js");
/* harmony import */ var _profile_statistic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile/statistic */ "./assets/src/js/frontend/profile/statistic.js");
/* harmony import */ var _profile_order_recover__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile/order-recover */ "./assets/src/js/frontend/profile/order-recover.js");
/* harmony import */ var _profile_cover_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./profile/cover-image */ "./assets/src/js/frontend/profile/cover-image.js");
/* harmony import */ var _profile_avatar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./profile/avatar */ "./assets/src/js/frontend/profile/avatar.js");
/* harmony import */ var _profile_quiz__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./profile/quiz */ "./assets/src/js/frontend/profile/quiz.js");






(0,_profile_cover_image__WEBPACK_IMPORTED_MODULE_3__["default"])();
(0,_profile_quiz__WEBPACK_IMPORTED_MODULE_5__["default"])();
(0,_profile_statistic__WEBPACK_IMPORTED_MODULE_1__["default"])();
(0,_profile_order_recover__WEBPACK_IMPORTED_MODULE_2__["default"])();
document.addEventListener('DOMContentLoaded', function (event) {
  (0,_profile_course_tab__WEBPACK_IMPORTED_MODULE_0__["default"])();
});
if (document.getElementById('learnpress-avatar-upload')) {
  (0,_profile_avatar__WEBPACK_IMPORTED_MODULE_4__["default"])();
}
})();

/******/ })()
;
//# sourceMappingURL=profile.js.map