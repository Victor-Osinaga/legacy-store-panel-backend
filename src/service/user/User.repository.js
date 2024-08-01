class UserRepository{
    constructor(dao){
        this.dao = dao
    }

    async repoGetUserByEmail (email) {
        try {
            const userByEmailNoDto = await this.dao.getUserByEmail(email)
            return userByEmailNoDto
        } catch (error) {
            console.log("desde user repository", error)
            throw error
        }
    }

    async repoGetUserById (id) {
        try {
            const userByIdNoDto = await this.dao.getUserById(id)
            return userByIdNoDto
        } catch (error) {
            throw error
        }
    }

    async repoCreateUser(userDto){
        try {
            const newUser = await this.dao.createUser(userDto)
            return newUser
        } catch (error) {
            throw error
        }
    }
}

export {
    UserRepository
}