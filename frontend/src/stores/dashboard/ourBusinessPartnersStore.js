
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import loader from 'loader-animation'
import { ref, reactive } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { Notify } from 'quasar';
import { CustomLoading } from 'src/global_js/loadiingApi';
loader.title = 'Requesting To Server...'
export const useOurBusinessPartnersStore = defineStore('our business partners store', () => {
  const authStore = useAuthStore()
  const ourBusinessPartnersInfo = reactive({
    name: "",
    subTitle: "",
    image: "",
    id: "",
  })
  const currentPage = ref(1)
  const ourBusinessPartnersData = ref(null)
  const ourBusinessPartnerImage = ref(null)
  const openBusinessPartnersAddDialog = ref(false)
  const openBusinessPartnersAddManager = ()=>{
    ourBusinessPartnersInfo.name = ''
    ourBusinessPartnersInfo.subTitle = ''
    ourBusinessPartnersInfo.image = ''
    ourBusinessPartnerImage.value = null
    openBusinessPartnersAddDialog.value = true
  }
  const openBusinessPartnersUpdateDialog = ref(false)
  const openBusinessPartnersUpdateManager = (partner)=>{
    ourBusinessPartnersInfo.name = partner.name
    ourBusinessPartnersInfo.subTitle = partner.subTitle
    ourBusinessPartnersInfo.image = partner.image
    ourBusinessPartnersInfo.id = partner._id
    ourBusinessPartnerImage.value = null
    openBusinessPartnersUpdateDialog.value = true
  }
  const getourBusinessPartnersList = async () => {
    const config = {
      method: "get",
      url: "api/our_business_partners",
      headers: {
        "Content-Type": "application/json",
      }, params: {
        pageSize: 30,
        pageNumber: currentPage.value
      }
    };
    CustomLoading('registration-fee-list').showLoading()
    try {
      const responseData = await api.request(config);
      ourBusinessPartnersData.value = responseData.data
      CustomLoading('registration-fee-list').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('registration-fee-list').hideLoading()
    }
  }
  const createOurBusinessPartners = async () => {
    const data = ourBusinessPartnersInfo
    await uploadImage()
    const config = {
      method: "post",
      url: "api/our_business_partners",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`
      }, data
    };
    CustomLoading('business-partmer').showLoading()
    try {
      const responseData = await api.request(config);
      getourBusinessPartnersList()
      CustomLoading('business-partmer').hideLoading()
      openBusinessPartnersAddDialog.value = false
      Notify.create({
        message: "Successfully Created business partner",
        type: "positive",
        position: "center"
      })
    } catch (error) {
      console.log(error);
      CustomLoading('business-partmer').hideLoading()
      openBusinessPartnersAddDialog.value = false
      Notify.create({
        message: "Failed to Create business partner",
        type: "negative",
        position: "center"
      })
    }
  }
  const updateOurBusinessPartners = async () => {
    const data = ourBusinessPartnersInfo
    await uploadImage()
    const config = {
      method: "put",
      url: "api/our_business_partners/" + ourBusinessPartnersInfo.id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`
      }, data
    };
    CustomLoading('registration-fee-update').showLoading()
    try {
      const responseData = await api.request(config);
      getourBusinessPartnersList()
      CustomLoading('registration-fee-update').hideLoading()
      Notify.create({
        message: "Successfully Updated Business Partner",
        type: "positive",
        position: "center"
      })
    } catch (error) {
      console.log(error);
      CustomLoading('registration-fee-update').hideLoading()
      Notify.create({
        message: "Failed to Update Business Partner",
        type: "negative",
        position: "center"
      })
    }
  }
  const uploadImage = async () => {
    if (!ourBusinessPartnerImage.value || typeof ourBusinessPartnerImage.value == 'string') {
      return
    }
    const config = {
      method: "post",
      url: "api/upload",
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`

      }, data: {
        image: ourBusinessPartnerImage.value
      }
    };
    CustomLoading('post-user-upload').showLoading()
    try {
      const responseData = await api.request(config);
      ourBusinessPartnersInfo.image = responseData.data
      CustomLoading('post-user-upload').hideLoading()
    } catch (error) {
      console.log(error);
      CustomLoading('post-user-upload').hideLoading()
      Notify.create({
        position: "center",
        type: "negative",
        message: error,
      });
    }
  }
  const deleteOurBusinessPartners = async (id) => {
    const config = {
      method: "delete",
      url: "api/our_business_partners/" + id,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authStore.loginUserInfo.token}`
      },
    };
    CustomLoading('registration-fee-delete').showLoading()
    try {
      const responseData = await api.request(config);
      getourBusinessPartnersList()
    CustomLoading('registration-fee-delete').hideLoading()
      Notify.create({
        message: "Successfully Updated Business Partner",
        type: "positive",
        position: "center"
      })
    } catch (error) {
      console.log(error);
    CustomLoading('registration-fee-delete').hideLoading()
      Notify.create({
        message: "Failed to Update Business Partner",
        type: "negative",
        position: "center"
      })
    }
  }

  return {
    currentPage,
    ourBusinessPartnerImage,
    openBusinessPartnersAddDialog,
    openBusinessPartnersAddManager,
    ourBusinessPartnersInfo,
    ourBusinessPartnersData,
    getourBusinessPartnersList,
    createOurBusinessPartners,
    updateOurBusinessPartners,
    deleteOurBusinessPartners,
    openBusinessPartnersUpdateDialog,
    openBusinessPartnersUpdateManager
  }
});
