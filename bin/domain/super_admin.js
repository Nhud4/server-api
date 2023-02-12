const { InternalServerError, UnprocessableEntityError, UnauthorizedError, NotFoundError } = require('../helper/utils/error')
const logger = require('../helper/utils/logger')
const XLSX = require('xlsx')
const SuperAdminModel = require('../infrastructure/repositories/super_admin')

const model = new SuperAdminModel()

class SuperAdminDomain{
  async uploadFile(payload){
    const ctx = 'SuperAdminDomain::uploadFile'
    try {
      const {path, user} = payload
      if (user.userType !== 'admin'){
        return {err: new UnauthorizedError('you are not authorized to access this resource')}
      }
      let data = []
      const workbook = await XLSX.readFile(path)
      const sheet_name_list = workbook.SheetNames
      if (sheet_name_list.length === 1){
        data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
      }
      if (sheet_name_list.length > 1){
        for (let i = 0; i < sheet_name_list.length; i++) {
          data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[i]])
        }
      }
      const params = {Kode_Desa: data[0].Kode_Desa}
      const getData = await model.findMany(params)
      if (getData.err) throw {message: 'fail to get data'}
      if (getData.data.length > 0){
        return {err: new UnprocessableEntityError('unprocessable entity', [{
          field: 'kode desa',
          message: 'kode desa already exist',
        }])}
      }

      const documents = data.map((item) =>({
        no_kk: parseInt(item.NO_KK),
        nik: parseInt(item.NIK),
        name: item.NAMA,
        place_of_birth: item.TEMPAT_LAHIR,
        date_of_birth: item.TANGGAL_LAHIR,
        marital_status: item.STATUS_PERKAWINAN,
        gender: item.JENIS_KELAMIN,
        district: item.KECAMATAN,
        village: item.DESA,
        address: item.JALAN_DUKUH,
        rt: item.RT,
        rw: item.RW,
        disability: item.DISABILITAS,
        tps: item.KEL_TPS,
        age: item.UMUR,
        created_at: new Date(),
        deleted_at: false
      }))
      data.forEach(item =>{
        documents.push({
          ...item,
          created_at: new Date(),
          deleted_at: false
        })
      })

      const insertData = await model.inserData(documents)
      if (insertData.err) throw {message: 'fail to insert data'}

      return insertData
    } catch (err){
      logger.error(ctx, err.message, 'insertOrder::catch', err)
      return { err: new InternalServerError(err.message) }
    }
  }

  //   async getList(payload){
  //     const ctx = 'SuperAdminDomain::getList'
  //     try {

//     } catch (err){
//       logger.error(ctx, err.message, 'getList::catch', err)
//       return {err: new InternalServerError(err.message)}
//     }
//   }
}

module.exports = SuperAdminDomain