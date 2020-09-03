const admin = require('firebase-admin')
const {Router} = require('express');
const router = Router();

const db = admin.firestore()

router.post('/api/products', async (req, res) => {
    try {
        await db.collection('products')
            .doc('/' + req.body.id + '/')
            .create({ name: req.body.name })

        return res.status(204).json()

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})

router.get('/api/products/:id', async(req,res) => {
    try {
        const doc= db.collection('products').doc(req.params.id)
        const name = await doc.get()
        const response = name.data()
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})
router.get('/api/products',async(req,res) => {
    try {
        const query = db.collection('products')
        const querySnapshot = await query.get();
        const response = querySnapshot.docs.map((doc) => ({
              id:doc.id,
              name:doc.data().name
        }))

        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json();
    }
})
router.delete('/api/products/:id',async(req,res) => {
    try {
        const query = db.collection('products').doc(req.params.id)
        await query.delete()
        return res.status(200).json()
    } catch (error) {
        return res.status(500).json();
    }
})
router.put('/api/products/:id', async(req,res) => {
    try {
        const query = db.collection('products').doc(req.params.id)
        await query.update({name:req.body.name})
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
})

module.exports = router
