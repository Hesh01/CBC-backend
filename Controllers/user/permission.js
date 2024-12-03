
export function isAdmin(req){
    if(req.user==null){
      return false
    }
  
    if(req.user.type != "admin"){
      return false
    }
  
    return true
  }
  
  export function isCustomer(req){
    if(req.user==null){
      return false
    }
  
    if(req.user.type != "Customer"){
      return false
    }
  
    return true
  }