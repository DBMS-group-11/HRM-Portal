const {
    getReqLeaveSub
}=require("../AbsenceManagement/absense.controller");

const router=require("express").Router();

//api requests
// router.post("/",?);

router.post("/getReqLeaveSub_",getReqLeaveSub);

module.exports=router;