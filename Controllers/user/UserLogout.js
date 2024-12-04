export async function userLogout(req,res){
    
    try{
        res.json({
            message : "Logged out successfully",
        })
    }catch(e){
        res.json({
            message : err.message ,
        })
    }
}
