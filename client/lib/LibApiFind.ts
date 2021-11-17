//
const LibApiFind = {
  convert_values: function(items){
    const ret =[]
    items.forEach(function(item){
//console.log( item )
      let row ={
        id: item._id,
        _id: item._id,
        name: item.name,
        values: JSON.stringify( item.values ) ,
        created_at: item.created_at,
      }
      ret.push(row)                        
    });        
    return ret
  },  
  convert_items: function(items){
    const ret:any[]  =[]
    items.forEach(function(item){
//console.log(item)
      let values = JSON.parse(item.values || '[]')
      let row:any ={
        id: item.id,
        user_id: item.user_id,
        created_at: item.created_at,
      }
      row.values = values
      ret.push(row)                        
    });        
    return ret
  },
  convertItemOne: function(item){
    let ret ={}
    const row ={
      id: item.id,
      name: item.name,
      values : JSON.parse(item.values || '[]') ,
      created_at: item.created_at,
    }    
    ret = row
    return ret
  },
  get_order_items: function(items, column, asc_type){
    const ret = [];
    items.sort(function (a, b) {
//      return a.num - b.num;
      return a[column] - b[column];
    });  
    if(asc_type === "DESC"){
      items.forEach(function(item){ ret.unshift(item) });
    }else{
      items.forEach(function(item){ ret.push(item) });
    }
    return ret
  },

}
export default LibApiFind