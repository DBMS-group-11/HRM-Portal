const{
    createUser,
    getUserByUserID,
    getUsers,
    deleteUser,
    updateUsers,

    login,
    register,
    getRegisterSub,
    myAccount,
    
}=require("./user.controller");

const router=require("express").Router();
const {checkToken}=require("../../auth/token_validation");

// router.post("/",checkToken,createUser);
// router.get("/",checkToken,getUsers);
// router.get("/:id",checkToken,getUserByUserID);
// router.patch("/",checkToken,updateUsers);
// router.delete("/",checkToken,deleteUser);
// router.post("/login",login); //done
// router.post("/add_employee",add)

router.post("/",createUser);
// router.get("/:id",getUserByUserID);
router.patch("/",updateUsers);
router.delete("/",deleteUser);
////////////////////////
router.post("/login",login); //user login
router.post("/reg",register); //add employee (user account also will be added)
router.post("/myAccount",myAccount); //employee personal account

router.get("/getRegisterSub",getRegisterSub);
router.get("/",getUsers); //register sub apis
module.exports=router;
