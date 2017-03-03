/**
 * @description 资产详情
 * @author 芃程
 * @date 2016-09-18
 */

import './financeassets.html';
import './financeassets.less';
import tpl from './financeassets.atpl';
import {
  $,
  render,
  getRPC,
  __,
  query,
  pushWindow,
  pageErrorHandler,
} from '../common/util';
import i18n from './financeassets.i18n';


Ali.setTitle(__('pageName', i18n));
Ali.hideOptionMenu();

const page = {
  el: $('#main'),             // 容器element
  prodId: 0,                  // 产品ID
  events: {
    'prod-detail': 'onProd',  // 查看产品详情
  },
  init() {
    this.render();
    this.bindEvents();
  },
  render() {
    getRPC('alipay.insmobile.platform.financial.assetsDetail',
      {
        orderId: query.orderId || '',
        assetId: query.assetId || '',
      },
      (res) => {
        if (res.success) {
          this.prodId = res.result.data.productId;
          const html = render(tpl, {
            ...res.result.data,
          }, i18n);
          this.el.html(html);
        } else {
          pageErrorHandler('am-page-busy', __('err.normal'), '', '刷新');
        }
      });
  },
  bindEvents() {
    const self = this;
    const {el, events} = this;

    for (let key in events) {
      if (events.hasOwnProperty(key)) {
        el.on('tap', `.${key}`, function() {
          self[events[key]].call(self, $(this));
        });
      }
    }
  },
  onProd() {
    pushWindow({
      url: 'financeprod.html',
    }, {
      prodId: this.prodId,
    });
  },
};


page.init();
