import Realm from 'realm'

class Pill_Schema extends Realm.Object {}
Pill_Schema.schema = {
  name:'Pill',
  properties:{
    image:'string',
    name:'string',
    effect:'string',
    dosage:'string',
    caution:'string',
    take:'string',
    maker:'string',
  }
}

let realm = new Realm({schema: [Pill_Schema], schemaVersion:6})

let get_all_pills = () => { return realm.objects('Pill') }

let get_sepcific_pills = (_name) => { return realm.objects('Pill').filtered(`name = "${_name}"`) }

let add_pill = (_image, _name, _effect, _dosage, _caution, _take, _maker) => {
  realm.write(() => {
    const pill = realm.create('Pill', {
      image: _image,
      name: _name,
      effect: _effect,
      dosage: _dosage,
      caution: _caution,
      take: _take,
      maker: _maker,
    })
  })
}

let delete_pill = (_name) => {
  realm.write(()=>{
    realm.delete(get_sepcific_pills(_name))
  })
}

let delete_all = () => {
  realm.write(()=>{
    realm.delete(get_all_pills())
  })
}

export default realm
export {
  get_all_pills,
  get_sepcific_pills,
  add_pill,
  delete_pill,
  delete_all,
}