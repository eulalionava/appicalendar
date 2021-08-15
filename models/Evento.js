const { Schema,model } = require('mongoose');

const EventoSchema = Schema({
   title:{
       type:String,
       require:true
   },
   start:{
       type:Date,
       require:true
   },
   end:{
       type:Date,
       require:true
   },
   notes:{
       type:String,
       require:true
   },
   user:{
       type:Schema.Types.ObjectId,
       ref:'Usuario',
       require:true
   }
});

EventoSchema.method('toJSON',function(){
    const { __v,_id,...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Evento',EventoSchema)