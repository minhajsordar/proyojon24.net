import { Loading, QSpinnerIos } from "quasar";

export const CustomLoading = (groupname) => {
  const showLoading = () => {
    Loading.show({
      group: groupname,
      spinner: QSpinnerIos,
      spinnerColor: 'white',
      messageColor: 'white',
      message: 'Loading...',
    })
  }
  const hideLoading = () => {
    Loading.hide( groupname )
  }
  return {
    showLoading,
    hideLoading
  }
}

