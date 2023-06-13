export const midgatorApi = (req,res)=>{
    console.log("Midigator req res",req.body);
    res.status(201).json({ success: true, result: 'midigator hit' });
}