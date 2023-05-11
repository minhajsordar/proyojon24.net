import bcryptjs from "bcryptjs";

const users = [
    {
        name: 'NoorMohammad',
        email: 'mdnoor@gmail.com',
        phone: '+8801756853831',
        nidCard: '123456789123',
        presentAddress: 'Goalonda More, Rajbari',
        permanentAddress: 'Goalonda More, Rajbari',
        password: bcryptjs.hashSync('1234', 10),
        isAdmin: true,
        isSuperAdmin: true
    },
    {
        name: 'Minhaj',
        email: 'minhajsorder8567@gmail.com',
        phone: '+8801835158205',
        nidCard: '123456789123',
        presentAddress: 'Rajbari Sadar, Rajbari',
        permanentAddress: 'Rajbari Sadar, Rajbari',
        password: bcryptjs.hashSync('1234', 10),
        isAdmin:true,
    },
    {
        name: 'Noor',
        email: 'noor@gmail.com',
        phone: '+8801756853831',
        nidCard: '123456789123',
        presentAddress: 'Goalonda More, Rajbari',
        permanentAddress: 'Goalonda More, Rajbari',
        password: bcryptjs.hashSync('1234', 10),
    },
]

export default users