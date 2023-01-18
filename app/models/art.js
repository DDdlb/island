/**
 * Art 包含classic 和 books
 */

const { Movie, Sentence, Music } = require("./classic");

class Art {
    static async getData(art_id, type){

        const finder = {
            where: {
                id: art_id
            }
        }


        let art = null

        switch (type) {
            // movie
            case 100: 
                art = await Movie.findOne(finder)
                break
            // sentence
            case 91: 
                art = await Sentence.findOne(finder)
                break
            // music
            case 90:
                art = await Music.findOne(finder)
                break
            default:
                break
        }

        return art
    }
}

module.exports = {
    Art
}