const districts = require("./divisions/divisions.js")

const newFormated = districts.map(e=>{
return {
    _id: e.id,
    parent: {
        _id: e.division_id
    },
    name:{
        bn: e.bn_name,
        en: e.name
    }
}
})
console.log(newFormated)