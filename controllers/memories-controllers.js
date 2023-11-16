const Memory =  require('../models/memory-modal')

//READ
const getMemories = async (req, res) => {

    let memories
    try {
        memories = await Memory.find({})
    } catch (error) {
        return res.status(500).json({message: 'An error occured, could not fetch memories '})
    }

    if (!memories) {
        return res.status(404).json({message: 'No memories found at the moment'})
    }

    return res.json({ memories: memories.map(memory => memory.toObject({ getters: true })) })
}

//CREATE
const createMemories = async (req, res) => {
    const {creator, tags, title, description, likes, timeline} = req.body
    const img = req.file.filename

    const createdMemory = new Memory({
        creator,
        img,
        tags,
        title,
        description,
        likes, 
        timeline
    }) 

    try {
        await createdMemory.save()
    } catch (error) {
        return res.json({message: 'Could not create memory, Try again later'}).status(500)
    }

    return res.json({memory: createdMemory.toObject({ getters: true }), message: 'Creating memory was successful'}).status(201)
}

//UPDATE 
const updateMemory = async (req, res) => {
    const {creator, img, tags, title, description, likes} = req.body
    const memoryId = req.params.id

    let memory
    try {
        memory = await Memory.findById(memoryId)
    } catch (error) {
        return res.status(500).json({message: 'Something went wrong! Could not find memory'})
    }

    memory.creator = creator
    memory.img = img
    memory.tags = tags
    memory.title = title
    memory.description = description
    memory.likes = likes

    try {
        await memory.save()
    } catch (error) {
        return res.status(500).json({ message: 'Could not update place, Try again later'})        
    }

    return res.status(200).json({ memory: memory.toObject({ getters: true }), message: 'Update Memory Successfully'}) 
}

//DELETE
const deleteMemory = async (req, res) => {
    const memoryId = req.params.id

    let memory
    try {
        memory = await Memory.findByIdAndDelete(memoryId)
    } catch (error) {
        return res.json({ message:'Somthing went wrong, could not find place with that id' }).status(500)
    }

    if (!memory) {
        return res.status(404).json({ message: 'Could not find memory for that id' })
    }

    return res.json({message: 'Deleted memory successfully'}).status(200)
}


exports.getMemories = getMemories
exports.createMemories = createMemories
exports.deleteMemory = deleteMemory
exports.updateMemory = updateMemory