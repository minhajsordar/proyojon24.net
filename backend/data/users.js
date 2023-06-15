import bcryptjs from "bcryptjs";

const users = [
    {
        name: {
            bn: 'নুর মোহাম্মাদ',
            en: 'Noor Mohammad'
        },
        email: 'mdnoor@gmail.com',
        username: 'mdnoor@gmail.com',
        phone: '01756853831',
        nidNo: '123456789123',
        nidImage: '123456789123',
        presentAddress: {
            bn: 'গোয়ালন্দ',
            en: 'Goalonda'
        },
        permanentAddress: {
            bn: 'গোয়ালন্দ',
            en: 'Goalonda'
        },
        password: bcryptjs.hashSync('1234', 10),
        isActive: true,
        isAdmin: true,
        isSuperAdmin: true,
        serviceProfileId: null,
        permission: 'self'
    },
    {
        name: {
            bn: 'মিনহাজ সরদার',
            en: 'Minhaj Sorder'
        },
        email: 'minhajsorder8567@gmail.com',
        username: 'minhajsorder8567@gmail.com',
        phone: '01835158205',
        nidNo: '123456789123',
        nidImage: '123456789123',
        presentAddress: {
            bn: 'রাজবাড়ী',
            en: 'Rajbari'
        },
        permanentAddress: {
            bn: 'রাজবাড়ী',
            en: 'Rajbari'
        },
        password: bcryptjs.hashSync('1234', 10),
        isActive: true,
        isAdmin:true,
        serviceProfileId: null,
        permission: 'self'
    },
    {
        name: {
            bn: 'নুর মোহাম্মাদ',
            en: 'Noor Mohammad'
        },
        email: 'noor@gmail.com',
        username: 'noor@gmail.com',
        phone: '01756853831',
        nidNo: '123456789123',
        nidImage: '123456789123',
        presentAddress: {
            bn: 'গোয়ালন্দ',
            en: 'Goalonda'
        },
        permanentAddress: {
            bn: 'গোয়ালন্দ',
            en: 'Goalonda'
        },
        password: bcryptjs.hashSync('1234', 10),
        isActive: true,
        serviceProfileId: null,
        permission: 'self'
    },
]

export default users