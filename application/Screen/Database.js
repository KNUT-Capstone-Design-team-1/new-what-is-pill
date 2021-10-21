import Realm from 'realm'

// 스키마 선언
class Pill_Schema extends Realm.Object {}
Pill_Schema.schema = {
  name:'Pill',
  properties:{
    image: {type: 'string', optional: true},
    name: {type: 'string', optional: true},
    effect: {type: 'string', optional: true},
    dosage: {type: 'string', optional: true},
    caution: {type: 'string', optional: true},
    take: {type: 'string', optional: true},
    maker: {type: 'string', optional: true},
  }
}

// Realm DBMS 선언
let realm = new Realm({schema: [Pill_Schema], schemaVersion:7})

// 모든 알약 정보 출력
let get_all_pills = () => { return realm.objects('Pill') }

// 특정한 알약 정보 출력
let get_sepcific_pills = (_name) => { return realm.objects('Pill').filtered(`name = "${_name}"`) }

// 알약 추가 쿼리
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

// 특정 알약 삭제
let delete_pill = (_name) => {
  realm.write(()=>{
    realm.delete(get_sepcific_pills(_name))
  })
}

// 모든 알약 정보 삭제
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