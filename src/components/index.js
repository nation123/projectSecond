import Vue from 'vue'

import Header from "../../../hx-vue-common/src/components/hxjy/Header/Header";
import HxTable from "../../../hx-vue-common/src/components/hxjy/Table/index";
import HxTableItem from "../../../hx-vue-common/src/components/hxjy/Table/TableItem";
import HxNav from "../../../hx-vue-common/src/components/hxjy/Nav/index";
import HxCard from "../../../hx-vue-common/src/components/hxjy/Card/index";
import HxCardImage from "../../../hx-vue-common/src/components/hxjy/Card/card-image";



import EmptyData from "./emptyData";
import MessageDetail from "./MessageDetail";
import HxImg from "./HxImg";
import HxNorImg from "./HxImg/normal.vue";
import AuditTag from './elTag';
import AuditButton from './elTag/AuditButton.vue';
import DialogAudit from './DialogAudit';
import HeaderTitle from "./Header/HeaderTitle.vue"
import UploadImg from "./UploadImg";
import UploadLimitOne from "./UploadImg/uploadLimitOne";
import Banner from "../../../hx-home/src/components/Banner";
import InputSelect from './InputSelect';


Vue.component(Banner.name, Banner)
Vue.component(Header.name, Header)
Vue.component(MessageDetail.name, MessageDetail)
Vue.component(HxTable.name, HxTable)
Vue.component(HxTableItem.name, HxTableItem)
Vue.component(HxNav.name, HxNav)
Vue.component(HxCard.name, HxCard)
Vue.component(HxCardImage.name, HxCardImage)
Vue.component(UploadImg.name, UploadImg)
Vue.component(UploadLimitOne.name, UploadLimitOne)
Vue.component(EmptyData.name, EmptyData)
Vue.component(HxImg.name, HxImg)
Vue.component(HxNorImg.name, HxNorImg)

Vue.component(InputSelect.name, InputSelect)

Vue.component(AuditTag.name, AuditTag)
Vue.component(AuditButton.name, AuditButton)
Vue.component(DialogAudit.name, DialogAudit)
Vue.component(HeaderTitle.name, HeaderTitle)


// import Pagination from '@/components/Pagination'
// Vue.component(Pagination.name,Pagination)
