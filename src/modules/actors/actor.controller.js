import { createActorService, getActorService , deleteActorService, updateActorService} from "./actor.service.js";


export const createActorController = async (req,res)=>{
    const actor = await createActorService(req.body)
        res.json({
            status: "ok",
            actor : actor
        })
}


export const getActorController = async( req,res)=>{
    const actors = await getActorService(req.body)
    res.json({
        status: "ok",
        actors : actors
    })
}



export const deleteActorController = async (req, res) => {
    const actor = await deleteActorService(req.query)
    res.json({
        status: "ok",
        actor : actor
    })
}



export const updateActorController = async (req,res)=>{
    const actor = await updateActorService({
        id:req.query.id,
        data:req.body
    })
    res.json({
        status: "ok",
        actor : actor
    })
}

