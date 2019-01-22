export const likeHandler = (id, {cards, username}) => {
    return cards.map((c) => {
        if (c.id === id) {
            if (c.liked) { //eliminate
                c.likes.forEach((user, i, arr) => {
                    if (user === username) 
                        return arr.splice(i, 1)
                });
            } else { // add
                c.likes.push(username)
            }
            c.liked = !c.liked;
        }
        return c;
    })
}

export const favHandler = (id, {cards}) => {
    return cards.map((c) => {
        if (c.id === id) {
            c.favorite = !c.favorite;
        }
        return c;
    })
}

