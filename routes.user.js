const { Router } = require("express")
const User = require("./mdoel.user")
const Trn = require("./model.trn")

const route = new Router();

route.post("/reg", async (req, res)=>{

    const { veh_no , wall_bal } = req.body
    
    
    const user = new User({
        veh_no : veh_no,
        wall_Bal : wall_bal,
    })
    if (wall_bal && wall_bal < 200) {
        res.json({
            msg : "Add min 200 in wall bal"
        })
        return
    }
    await user.save()
    res.json({
        "message" : "user registered",
        "userId" : user._id
    })
});

route.get("/trn",async (req,res)=> {
    const { v_no } = req.body
    // const user = await User.findOne({ veh_no : v_no });

    const allTrn = await Trn.find({ veh_no : v_no});

    res.json({ allTrn })
})


route.post("/trn",async (req,res)=>{
    // payment initiated -> supposing payment success
    const { v_no , loc  } = req.body
    let newTrn = {
        veh_no : v_no,
        location : loc,
    }

    let user = await User.findOne({ veh_no : v_no });

    if (!user) {
        return res.json({
            message : "No user found",
        })
    }

    if ( user && newTrn.amount > user.wall_Bal ) {
        res.json({
            message : "Not suff bal",
        })
        return
    }
    const recTrn = await Trn.find({ veh_no : v_no }).sort("desc").limit(2)

    console.log(recTrn);

    const diffInTime = Math.floor(Date.now() / 1000) - Math.floor(recTrn[0]?.createdAt.getTime() / 1000)
    
    if( recTrn && diffInTime <= 86400 ){
        user.wall_Bal -= 10
        newTrn = {
            ...newTrn,
            amount : 10,
            logBy : user._id
        }
        const CurrTrn = new Trn({
            ...newTrn,
            amount : 10,
            logBy : user._id
        })
        res.json({
            message : "Trn comp!",
            CurrTrn
        })

        await CurrTrn.save()
        await user.save()
        return
    }

    user.wall_Bal -= 20;

    await user.save();
    newTrn = {
        ...newTrn,
        amount : 20,
        logBy : user._id
    }

    const CurrTrn = new Trn({...newTrn})
    res.json({
        msg : "Trn comp!!",
        CurrTrn
    })

    return await CurrTrn.save()
})
// schema -> userSchema => vno and wal_b 
// schema -> trnSchema => ref to users (via id -> momgoDB id) and timeStamp and ammount and location
// register routes 


module.exports =  route;