<template>
  <q-card class="q-pa-md border-primary">
    <div class="flex justify-between q-mb-md">
      <div class="fs-20 text-bold">Service Details</div>
    </div>
    <div class="full-width">
      <q-separator />
    </div>

    <q-card-section>
      <q-card class="border-primary q-pa-md">
        <div class="row q-col-gutter-sm">
          <div class="col-sm-6 col-xs-6 col-6">
            <div class="row">
              <div class="col-12 text-bold">{{ $t("services.services") }}*</div>
              <div class="col-12">
                <q-select
                  ref="grandParentEl"
                  v-model="serviceProviderStore.serviceProviderInfo.service"
                  :options="serviceStore.serviceList.services"
                  :option-label="
                    (opt) =>
                      Object(opt) === opt && 'name' in opt
                        ? opt.name[languageStore.language]
                        : null
                  "
                  options-dense
                  outlined
                  dense
                  :rules="[validationEnabled && requiredSelector]"
                  @update:model-value="searchServiceStore.updateServiceCategory"
                />
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-xs-6 col-6">
            <div class="row">
              <div class="col-12 text-bold">
                {{ $t("services.service_category") }}*
              </div>
              <div class="col-12">
                <q-select
                  ref="parentEl"
                  v-model="
                    serviceProviderStore.serviceProviderInfo.serviceCategory
                  "
                  :options="serviceCategoryStore.allServiceCategoryList"
                  :option-label="
                    (opt) =>
                      Object(opt) === opt && 'name' in opt
                        ? opt.name[languageStore.language]
                        : null
                  "
                  @update:model-value="updateRegistrationAmount"
                  options-dense
                  outlined
                  dense
                  :rules="[validationEnabled && requiredSelector]"
                />
              </div>
            </div>
          </div>
          <!-- payment -->
          <div class="col-sm-6 col-xs-12 col-12" v-if="!authStore.loginUserInfo?.hasServiceProviderProfile">
            <div class="text-bold">{{ $t("accountType") }}*</div>
            <q-select
              v-model="accountType"
              stack-label
              outlined
              dense
              :options="['Free', 'Paid']"
            />
          </div>
          <div class="col-12" v-if="accountType == 'Paid' && !authStore.loginUserInfo?.hasServiceProviderProfile">
            <div class="row q-col-gutter-xs">
              <div class="col-sm-6 col-xs-12 col-12">
                <div class="text-bold">{{ $t("bankAccountName") }}*</div>
                <q-select
                  ref="bankAccountNameEl"
                  v-model="
                    serviceProviderStore.serviceProviderInfo
                      .bankAccountName
                  "
                  outlined
                  :options="['bKash', 'Dutch Bangla', 'Nagad']"
                  dense
                  stack-label
                  :rules="[required]"
                />
              </div>
              <div class="col-sm-6 col-xs-12 col-12">
                <div class="text-bold">{{ $t("AccoountPhoneNumber") }}*</div>
                <q-input
                  ref="phoneNumberEl"
                  v-model="
                    serviceProviderStore.serviceProviderInfo.phoneNumber
                  "
                  outlined
                  dense
                  stack-label
                  :rules="[mobileNoBd]"
                />
              </div>
              <div class="col-sm-6 col-xs-12 col-12">
                <div class="text-bold">{{ $t("transactionId") }}*</div>
                <q-input
                  ref="transactionIdEl"
                  v-model="
                    serviceProviderStore.serviceProviderInfo
                      .transactionId
                  "
                  outlined
                  dense
                  stack-label
                  :rules="[required]"
                />
              </div>
              <div class="col-sm-6 col-xs-12 col-12">
                <div class="text-bold">{{ $t("amount") }}*</div>
                <q-input
                  ref="amountEl"
                  v-model="
                    serviceProviderStore.serviceProviderInfo.amount
                  "
                  outlined
                  disable
                  dense
                  stack-label
                  type="number"
                  :rules="[required]"
                />
              </div>
            </div>
          </div>
          <!-- payment -->
          <!-- start service provider location -->
          <div class="col-sm-6 col-xs-6 col-6">
            <div class="row">
              <div class="col-12 text-bold">{{ $t("location.division") }}*</div>
              <div class="col-12">
                <q-select
                  ref="divisionEl"
                  v-model="
                    serviceProviderStore.serviceProviderLocationR.division
                  "
                  :options="divisionOptions"
                  :option-label="
                    (opt) =>
                      Object(opt) === opt && 'name' in opt
                        ? opt.name[languageStore.language]
                        : null
                  "
                  outlined
                  dense
                  :rules="[validationEnabled && requiredSelector]"
                  @update:model-value="
                    serviceProviderStore.serviceProviderLocationR.district =
                      null;
                    serviceProviderStore.serviceProviderLocationR.subDistrict =
                      null;
                    serviceProviderStore.serviceProviderLocationR.union = null;
                    serviceProviderStore.serviceProviderLocationR.ward = null;
                    serviceProviderStore.serviceProviderLocationR.pinlocation =
                      null;
                    searchLocationStore.updateDistrict();
                  "
                  clearable
                  use-input
                  input-debounce="0"
                  @filter="divisionFilterFn"
                />
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-xs-6 col-6">
            <div class="row">
              <div class="col-12 text-bold">{{ $t("location.district") }}*</div>
              <div class="col-12">
                <q-select
                  ref="districtEl"
                  v-model="
                    serviceProviderStore.serviceProviderLocationR.district
                  "
                  :options="districtOptions"
                  :option-label="
                    (opt) =>
                      Object(opt) === opt && 'name' in opt
                        ? opt.name[languageStore.language]
                        : null
                  "
                  :rules="[validationEnabled && requiredSelector]"
                  outlined
                  dense
                  @update:model-value="
                    serviceProviderStore.serviceProviderLocationR.subDistrict =
                      null;
                    serviceProviderStore.serviceProviderLocationR.union = null;
                    serviceProviderStore.serviceProviderLocationR.ward = null;
                    serviceProviderStore.serviceProviderLocationR.pinlocation =
                      null;
                    searchLocationStore.updateSubDistrict();
                  "
                  clearable
                  use-input
                  input-debounce="0"
                  @filter="districtFilterFn"
                />
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-xs-6 col-6">
            <div class="row">
              <div class="col-12 text-bold">
                {{ $t("location.subdistrict") }}*
              </div>
              <div class="col-12">
                <q-select
                  ref="subDistrictEl"
                  v-model="
                    serviceProviderStore.serviceProviderLocationR.subDistrict
                  "
                  :options="subDistrictOptions"
                  :option-label="
                    (opt) =>
                      Object(opt) === opt && 'name' in opt
                        ? opt.name[languageStore.language]
                        : null
                  "
                  outlined
                  dense
                  :rules="[validationEnabled && requiredSelector]"
                  @update:model-value="
                    serviceProviderStore.serviceProviderLocationR.union = null;
                    serviceProviderStore.serviceProviderLocationR.ward = null;
                    serviceProviderStore.serviceProviderLocationR.pinlocation =
                      null;
                    searchLocationStore.updateUnion();
                  "
                  clearable
                  use-input
                  input-debounce="0"
                  @filter="subDistrictFilterFn"
                />
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-xs-6 col-6">
            <div class="row">
              <div class="col-12 text-bold">{{ $t("location.union") }}</div>
              <div class="col-12">
                <q-select
                  ref="unionEl"
                  v-model="serviceProviderStore.serviceProviderLocationR.union"
                  :options="unionOptions"
                  :option-label="
                    (opt) =>
                      Object(opt) === opt && 'name' in opt
                        ? opt.name[languageStore.language]
                        : null
                  "
                  options-dense
                  outlined
                  dense
                  @update:model-value="
                    serviceProviderStore.serviceProviderLocationR.pinlocation =
                      null;
                    searchLocationStore.updatePinLocation();
                  "
                  clearable
                  use-input
                  input-debounce="0"
                  @filter="unionFilterFn"
                />
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-xs-12 col-12">
            <div class="row">
              <div class="col-12 text-bold">
                {{ $t("location.pinlocation") }}
              </div>
              <div class="col-12">
                <q-select
                  ref="pinlocationEl"
                  v-model="
                    serviceProviderStore.serviceProviderLocationR.pinlocation
                  "
                  :options="pinlocationOptions"
                  :option-label="
                    (opt) =>
                      Object(opt) === opt && 'name' in opt
                        ? opt.name[languageStore.language]
                        : null
                  "
                  options-dense
                  outlined
                  dense
                  clearable
                  use-input
                  input-debounce="0"
                  @filter="pinlocationFilterFn"
                />
              </div>
            </div>
          </div>
          <!-- <div class="col-sm-6 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("location.exactbn") }}</div>
                <div class="col-12">
                  <q-input
                    v-model="
                      serviceProviderStore.serviceProviderLocationR.exact.bn
                    "
                    outlined
                    dense
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xs-6 col-6">
              <div class="row">
                <div class="col-12 text-bold">{{ $t("location.exacten") }}</div>
                <div class="col-12">
                  <q-input
                    v-model="
                      serviceProviderStore.serviceProviderLocationR.exact.en
                    "
                    outlined
                    dense
                  />
                </div>
              </div>
            </div> -->
          <!-- end service provider location -->
          <!-- name start -->
          <div class="col-sm-6 col-xs-12 col-12">
            <div class="row">
              <div class="col-12 text-bold">{{ $t("nameinen") }}*</div>
              <div class="col-12">
                <q-input
                  ref="nameEnEl"
                  v-model="serviceProviderStore.serviceProviderInfo.name.en"
                  outlined
                  dense
                  :rules="[validationEnabled && required]"
                />
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-xs-12 col-12">
            <div class="row">
              <div class="col-12 text-bold">{{ $t("nameinbn") }}*</div>
              <div class="col-12">
                <q-input
                  ref="nameBnEl"
                  v-model="serviceProviderStore.serviceProviderInfo.name.bn"
                  outlined
                  dense
                  :rules="[validationEnabled && required]"
                />
              </div>
            </div>
          </div>
          <!-- name end -->
          <!-- phoneNumber start -->
          <div class="col-sm-6 col-xs-12 col-12">
            <div class="row">
              <div class="col-12 text-bold">{{ $t("phone") }}*</div>
              <div class="col-12">
                <q-input
                  ref="phoneNumberEnEl"
                  v-model="
                    serviceProviderStore.serviceProviderInfo.phoneNumber1
                  "
                  outlined
                  dense
                  :rules="[validationEnabled && required, mobileNoBd]"
                />
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-xs-12 col-12">
            <div class="row">
              <div class="col-12 text-bold">{{ $t("phone") }}</div>
              <div class="col-12">
                <q-input
                  v-model="
                    serviceProviderStore.serviceProviderInfo.phoneNumber2
                  "
                  outlined
                  dense
                  :rules="[mobileNoBd]"
                />
              </div>
            </div>
          </div>
          <!-- phoneNumber end -->
          <!-- social start -->
          <div class="col-sm-6 col-xs-12 col-12">
            <div class="row">
              <div class="col-12 text-bold">
                {{ $t("facebook") }}
              </div>
              <div class="col-12">
                <q-input
                  v-model="serviceProviderStore.serviceProviderInfo.facebook"
                  outlined
                  dense
                />
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-xs-12 col-12">
            <div class="row">
              <div class="col-12 text-bold">
                {{ $t("whatsapp") }}
              </div>
              <div class="col-12">
                <q-input
                  v-model="serviceProviderStore.serviceProviderInfo.whatsapp"
                  outlined
                  dense
                  :rules="[mobileNoBd]"
                />
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-xs-12 col-12">
            <div class="row">
              <div class="col-12 text-bold">
                {{ $t("imo") }}
              </div>
              <div class="col-12">
                <q-input
                  v-model="serviceProviderStore.serviceProviderInfo.imo"
                  outlined
                  dense
                  :rules="[mobileNoBd]"
                />
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-xs-12 col-12">
            <div class="row">
              <div class="col-12 text-bold">
                {{ $t("twitter") }}
              </div>
              <div class="col-12">
                <q-input
                  v-model="serviceProviderStore.serviceProviderInfo.twitter"
                  outlined
                  dense
                />
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-xs-12 col-12">
            <div class="row">
              <div class="col-12 text-bold">
                {{ $t("email") }}
              </div>
              <div class="col-12">
                <q-input
                  v-model="serviceProviderStore.serviceProviderInfo.email"
                  outlined
                  dense
                />
              </div>
            </div>
          </div>
          <!-- social end -->
          <!-- serviceTitle start -->
          <div class="col-sm-6 col-xs-12 col-12">
            <div class="row">
              <div class="col-12 text-bold">
                {{ $t("experience") }}
              </div>
              <div class="col-12">
                <q-input
                  v-model="serviceProviderStore.serviceProviderInfo.experience"
                  outlined
                  dense
                />
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-xs-12 col-12">
            <div class="row">
              <div class="col-12 text-bold">{{ $t("serviceTitleinen") }}</div>
              <div class="col-12">
                <q-input
                  ref="serviceTitleEnEl"
                  v-model="
                    serviceProviderStore.serviceProviderInfo.serviceTitle.en
                  "
                  outlined
                  dense
                  :rules="[validationEnabled && required]"
                />
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-xs-12 col-12">
            <div class="row">
              <div class="col-12 text-bold">{{ $t("serviceTitleinbn") }}</div>
              <div class="col-12">
                <q-input
                  ref="serviceTitleBnEl"
                  v-model="
                    serviceProviderStore.serviceProviderInfo.serviceTitle.bn
                  "
                  outlined
                  dense
                  :rules="[validationEnabled && required]"
                />
              </div>
            </div>
          </div>
          <!-- serviceTitle end -->
          <!-- description start -->
          <div class="col-sm-6 col-xs-12 col-12">
            <div class="row">
              <div class="col-12 fs-16 text-bold">
                {{ $t("descriptioninEn") }}
              </div>
              <div class="col-12">
                <q-editor
                  v-model="
                    serviceProviderStore.serviceProviderInfo.description.en
                  "
                  outlined
                  :dense="$q.screen.lt.md"
                  :toolbar="[
                    [
                      {
                        label: $q.lang.editor.align,
                        icon: $q.iconSet.editor.align,
                        fixedLabel: true,
                        list: 'only-icons',
                        options: ['left', 'center', 'right', 'justify'],
                      },
                      {
                        label: $q.lang.editor.align,
                        icon: $q.iconSet.editor.align,
                        fixedLabel: true,
                        options: ['left', 'center', 'right', 'justify'],
                      },
                    ],
                    [
                      'bold',
                      'italic',
                      'strike',
                      'underline',
                      'subscript',
                      'superscript',
                    ],
                    ['token', 'hr', 'link', 'custom_btn'],
                    [
                      {
                        label: $q.lang.editor.formatting,
                        icon: $q.iconSet.editor.formatting,
                        list: 'no-icons',
                        options: [
                          'p',
                          'h1',
                          'h2',
                          'h3',
                          'h4',
                          'h5',
                          'h6',
                          'code',
                        ],
                      },
                      {
                        label: $q.lang.editor.fontSize,
                        icon: $q.iconSet.editor.fontSize,
                        fixedLabel: true,
                        fixedIcon: true,
                        list: 'no-icons',
                        options: [
                          'size-1',
                          'size-2',
                          'size-3',
                          'size-4',
                          'size-5',
                          'size-6',
                          'size-7',
                        ],
                      },
                      {
                        label: $q.lang.editor.defaultFont,
                        icon: $q.iconSet.editor.font,
                        fixedIcon: true,
                        list: 'no-icons',
                        options: [
                          'default_font',
                          'arial',
                          'arial_black',
                          'comic_sans',
                          'courier_new',
                          'impact',
                          'lucida_grande',
                          'times_new_roman',
                          'verdana',
                        ],
                      },
                      'removeFormat',
                    ],
                    ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                    ['undo', 'redo'],
                    ['viewsource'],
                  ]"
                  :fonts="{
                    arial: 'Arial',
                    arial_black: 'Arial Black',
                    comic_sans: 'Comic Sans MS',
                    courier_new: 'Courier New',
                    impact: 'Impact',
                    lucida_grande: 'Lucida Grande',
                    times_new_roman: 'Times New Roman',
                    verdana: 'Verdana',
                  }"
                />
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-xs-12 col-12">
            <div class="row">
              <div class="col-12 fs-16 text-bold">
                {{ $t("descriptioninBn") }}
              </div>
              <div class="col-12">
                <q-editor
                  v-model="
                    serviceProviderStore.serviceProviderInfo.description.bn
                  "
                  :dense="$q.screen.lt.md"
                  :toolbar="[
                    [
                      {
                        label: $q.lang.editor.align,
                        icon: $q.iconSet.editor.align,
                        fixedLabel: true,
                        list: 'only-icons',
                        options: ['left', 'center', 'right', 'justify'],
                      },
                      {
                        label: $q.lang.editor.align,
                        icon: $q.iconSet.editor.align,
                        fixedLabel: true,
                        options: ['left', 'center', 'right', 'justify'],
                      },
                    ],
                    [
                      'bold',
                      'italic',
                      'strike',
                      'underline',
                      'subscript',
                      'superscript',
                    ],
                    ['token', 'hr', 'link', 'custom_btn'],
                    [
                      {
                        label: $q.lang.editor.formatting,
                        icon: $q.iconSet.editor.formatting,
                        list: 'no-icons',
                        options: [
                          'p',
                          'h1',
                          'h2',
                          'h3',
                          'h4',
                          'h5',
                          'h6',
                          'code',
                        ],
                      },
                      {
                        label: $q.lang.editor.fontSize,
                        icon: $q.iconSet.editor.fontSize,
                        fixedLabel: true,
                        fixedIcon: true,
                        list: 'no-icons',
                        options: [
                          'size-1',
                          'size-2',
                          'size-3',
                          'size-4',
                          'size-5',
                          'size-6',
                          'size-7',
                        ],
                      },
                      {
                        label: $q.lang.editor.defaultFont,
                        icon: $q.iconSet.editor.font,
                        fixedIcon: true,
                        list: 'no-icons',
                        options: [
                          'default_font',
                          'arial',
                          'arial_black',
                          'comic_sans',
                          'courier_new',
                          'impact',
                          'lucida_grande',
                          'times_new_roman',
                          'verdana',
                        ],
                      },
                      'removeFormat',
                    ],
                    ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                    ['undo', 'redo'],
                    ['viewsource'],
                  ]"
                  :fonts="{
                    arial: 'Arial',
                    arial_black: 'Arial Black',
                    comic_sans: 'Comic Sans MS',
                    courier_new: 'Courier New',
                    impact: 'Impact',
                    lucida_grande: 'Lucida Grande',
                    times_new_roman: 'Times New Roman',
                    verdana: 'Verdana',
                  }"
                />
              </div>
            </div>
          </div>
          <!-- description end -->
          <!-- add image end -->
          <div class="col-sm-6 col-xs-12 col-12">
            <div class="row">
              <div class="col-12 text-bold">
                {{ $t("addProfileImage") }}*
                <span class="fs-10">Max 100kb (width 200 height 200)</span>
              </div>
              <div class="col-12">
                <q-file
                  ref="iconEl"
                  outlined
                  dense
                  v-model="serviceProviderStore.imageIcon"
                  :rules="[validationEnabled && fileValidate]"
                  label="Add image"
                  counter
                  accept=".jpg, .png, .jpeg"
                  max-total-size="100000"
                  use-chips
                  @update:model-value="serviceProviderStore.uploadIcon"
                  @rejected="onRejected"
                >
                  <template v-slot:prepend>
                    <q-icon name="cloud_upload" /> </template
                ></q-file>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-xs-12 col-12">
            <div class="row">
              <div class="col-12 text-bold">
                {{ $t("addcoverimage") }}*
                <span class="fs-10">Max 150KB (width 720 height 300)</span>
              </div>
              <div class="col-12">
                <q-file
                  ref="coverImageEl"
                  outlined
                  dense
                  v-model="serviceProviderStore.imageCover.imageCover1"
                  :rules="[fileValidate]"
                  label="Add image"
                  accept=".jpg, .png, .jpeg"
                  max-total-size="1500000"
                  use-chips
                  @update:model-value="
                    () => {
                      serviceProviderStore.uploadCoverImage(
                        'imageCover1',
                        'serviceImage1'
                      );
                    }
                  "
                  @rejected="onRejected"
                >
                  <template v-slot:prepend>
                    <q-icon name="cloud_upload" /> </template
                ></q-file>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-xs-12 col-12">
            <div class="row">
              <div class="col-12 text-bold">
                {{ $t("addcoverimage") }}
                <span class="fs-10">Max 150KB (width 720 height 300)</span>
              </div>
              <div class="col-12">
                <q-file
                  outlined
                  dense
                  v-model="serviceProviderStore.imageCover.imageCover2"
                  :rules="[fileValidate]"
                  label="Add image"
                  accept=".jpg, .png, .jpeg"
                  max-total-size="1500000"
                  use-chips
                  @update:model-value="
                    () => {
                      serviceProviderStore.uploadCoverImage(
                        'imageCover2',
                        'serviceImage2'
                      );
                    }
                  "
                  @rejected="onRejected"
                >
                  <template v-slot:prepend>
                    <q-icon name="cloud_upload" /> </template
                ></q-file>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-xs-12 col-12">
            <div class="row">
              <div class="col-12 text-bold">
                {{ $t("addcoverimage") }}
                <span class="fs-10">Max 150KB (width 720 height 300)</span>
              </div>
              <div class="col-12">
                <q-file
                  outlined
                  dense
                  v-model="serviceProviderStore.imageCover.imageCover3"
                  :rules="[fileValidate]"
                  label="Add image"
                  accept=".jpg, .png, .jpeg"
                  max-total-size="1500000"
                  use-chips
                  @update:model-value="
                    serviceProviderStore.uploadCoverImage(
                      'imageCover3',
                      'serviceImage3'
                    )
                  "
                  @rejected="onRejected"
                >
                  <template v-slot:prepend>
                    <q-icon name="cloud_upload" /> </template
                ></q-file>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-xs-12 col-12">
            <div class="row">
              <div class="col-12 text-bold">{{ $t("keywords") }}*</div>
              <div class="col-12">
                <q-input
                  outlined
                  ref="keywordsEl"
                  dense
                  v-model="serviceProviderStore.serviceProviderInfo.keywords"
                  :rules="[validationEnabled && max10Words]"
                  label="Keywords"
                  hint="Max 16 characters"
                />
              </div>
            </div>
          </div>

          <!-- add image end -->
          <div class="col-12">
            <div class="row">
              <q-btn
                :label="$t('update')"
                color="light-green-8"
                glossy
                @click="createServiceManager"
              />
            </div>
          </div>
        </div>
      </q-card>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { Notify } from "quasar";
import {
  requiredSelector,
  required,
  fileValidate,
  mobileNoBd,
  isObjEmpty,
} from "src/global_js/utils";
import { useLanguageStore } from "src/stores/lang/languageSettingsStore";
import { useUserStore } from "src/stores/user/userStore";
import { useServiceCategoryStore } from "src/stores/service/serviceCategoryStore";
import { useServiceStore } from "src/stores/service/serviceStore";
import { useServiceProviderStore } from "src/stores/service/serviceProviderStore";
import { useSearchLocationStore } from "src/stores/service/searchLocation";
import { useDivisionStore } from "src/stores/locations/divisionStore";
import { useDistrictStore } from "src/stores/locations/districtStore";
import { useSubDistrictStore } from "src/stores/locations/subDistrictStore";
import { useUnionStore } from "src/stores/locations/unionStore";
import { usePinlocationStore } from "src/stores/locations/pinlocationStore";
import { useSearchServiceStore } from "src/stores/service/searchService";
import { useAuthStore } from "src/stores/auth/authStore";
import { useLocalStorage } from "@vueuse/core";
import { useUserServiceProviderStore } from "src/stores/service/userServiceProviderStore";

const userServiceProviderStore = useUserServiceProviderStore();
userServiceProviderStore.getUserServiceProvider();
const loginUserinfo = useLocalStorage("proyojonloginuser", {});
const languageStore = useLanguageStore();
const serviceProviderStore = useServiceProviderStore();
const serviceCategoryStore = useServiceCategoryStore();
serviceCategoryStore.getAllServiceCategorys();
const serviceStore = useServiceStore();
serviceStore.getAllServices();
const divisionStore = useDivisionStore();
divisionStore.getAllDivisions();
const districtStore = useDistrictStore();
const subDistrictStore = useSubDistrictStore();
const unionStore = useUnionStore();
const authStore = useAuthStore();
const pinlocationStore = usePinlocationStore();

const searchLocationStore = useSearchLocationStore();
searchLocationStore.updateAllLocation();
const searchServiceStore = useSearchServiceStore();

const accountType = ref("Free");
const maximizedToggle = ref(true);
const grandParentEl = ref(null);
const parentEl = ref(null);
const divisionEl = ref(null);
const districtEl = ref(null);
const subDistrictEl = ref(null);
const unionEl = ref(null);
const wardEl = ref(null);
const pinlocationEl = ref(null);
const nameEnEl = ref(null);
const nameBnEl = ref(null);
const iconEl = ref(null);
const phoneNumberEnEl = ref(null);
const coverImageEl = ref(null);
const serviceTitleEnEl = ref(null);
const serviceTitleBnEl = ref(null);
const keywordsEl = ref(null);
const validationEnabled = ref(false);

const bankAccountNameEl = ref(null);
const phoneNumberEl = ref(null);
const transactionIdEl = ref(null);
const amountEl = ref(null);

const createServiceManager = () => {
  if (!isObjEmpty(userServiceProviderStore.userServiceProvider)) {
    validationEnabled.value = false;
    serviceProviderStore.updateServiceProvider();
    return;
  }
  validationEnabled.value = true;
  grandParentEl.value.validate();
  parentEl.value.validate();
  divisionEl.value.validate();
  districtEl.value.validate();
  subDistrictEl.value.validate();
  nameEnEl.value.validate();
  nameBnEl.value.validate();
  iconEl.value.validate();
  coverImageEl.value.validate();
  phoneNumberEnEl.value.validate();
  serviceTitleEnEl.value.validate();
  serviceTitleBnEl.value.validate();
  keywordsEl.value.validate();

  if (accountType.value == "Paid") {
    bankAccountNameEl.value.validate();
    phoneNumberEl.value.validate();
    transactionIdEl.value.validate();
    amountEl.value.validate();
    if (
      bankAccountNameEl.value.hasError ||
      phoneNumberEl.value.hasError ||
      transactionIdEl.value.hasError ||
      amountEl.value.hasError
    ) {
      return;
    }
  }

  if (
    grandParentEl.value.hasError ||
    parentEl.value.hasError ||
    divisionEl.value.hasError ||
    districtEl.value.hasError ||
    subDistrictEl.value.hasError ||
    nameEnEl.value.hasError ||
    nameBnEl.value.hasError ||
    iconEl.value.hasError ||
    phoneNumberEnEl.value.hasError ||
    serviceTitleEnEl.value.hasError ||
    serviceTitleBnEl.value.hasError ||
    keywordsEl.value.hasError ||
    coverImageEl.value.hasError
  ) {
    return;
  }
  serviceProviderStore.createServiceProvider();
};
const onRejected = (rejectedEntries) => {
  // Notify plugin needs to be installed
  // https://quasar.dev/quasar-plugins/notify#Installation
  Notify.create({
    position: "center",
    type: "negative",
    message: `Choosen file size too big`,
  });
};

const updateRegistrationAmount =(val)=>{
  serviceProviderStore.serviceProviderInfo.amount = val.premiumRegistrationFee
}
const divisionOptions = ref(divisionStore.allDivisions);
const divisionFilterFn = (val, update) => {
  if (val === "") {
    update(() => {
      divisionOptions.value = divisionStore.allDivisions;
      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    divisionOptions.value = divisionStore.allDivisions.filter((v) => {
      console.log(v);
      return v.name[languageStore.language].toLowerCase().indexOf(needle) > -1;
    });
  });
};

const districtOptions = ref(districtStore.allDistricts);
const districtFilterFn = (val, update) => {
  if (val === "") {
    update(() => {
      districtOptions.value = districtStore.allDistricts;

      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    districtOptions.value = districtStore.allDistricts.filter((v) => {
      console.log(v);
      return v.name[languageStore.language].toLowerCase().indexOf(needle) > -1;
    });
  });
};

const subDistrictOptions = ref(subDistrictStore.allSubDistricts);
const subDistrictFilterFn = (val, update) => {
  if (val === "") {
    update(() => {
      subDistrictOptions.value = subDistrictStore.allSubDistricts;

      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    subDistrictOptions.value = subDistrictStore.allSubDistricts.filter((v) => {
      console.log(v);
      return v.name[languageStore.language].toLowerCase().indexOf(needle) > -1;
    });
  });
};

const unionOptions = ref(unionStore.allUnions);
const unionFilterFn = (val, update) => {
  if (val === "") {
    update(() => {
      unionOptions.value = unionStore.allUnions;

      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    unionOptions.value = unionStore.allUnions.filter((v) => {
      console.log(v);
      return v.name[languageStore.language].toLowerCase().indexOf(needle) > -1;
    });
  });
};

const pinlocationOptions = ref(pinlocationStore.allPinlocations);
const pinlocationFilterFn = (val, update) => {
  if (val === "") {
    update(() => {
      pinlocationOptions.value = pinlocationStore.allPinlocations;

      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    pinlocationOptions.value = pinlocationStore.allPinlocations.filter((v) => {
      console.log(v);
      return v.name[languageStore.language].toLowerCase().indexOf(needle) > -1;
    });
  });
};

onMounted(() => {
  if (
    !(
      loginUserinfo.value.permission == "admin" ||
      loginUserinfo.value.permission == "superAdmin"
    )
  ) {
    if (loginUserinfo.value.name.bn && loginUserinfo.value.name.en) {
      serviceProviderStore.serviceProviderInfo.name = loginUserinfo.value.name;
    }
    if (loginUserinfo.value.phone) {
      serviceProviderStore.serviceProviderInfo.phoneNumber1 =
        loginUserinfo.value.phone;
    }
  }
});
const max10Words = (val) => {
  return val && val.split(" ").length <= 16
    ? true
    : "Please Use Maximum 16 Words";
};
</script>
