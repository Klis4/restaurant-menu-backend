import { PrismaClient, User } from '@prisma/client'

function UserRepository() {
  const prisma = new PrismaClient()

  async function getUserById(id: User['id']): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    })
    return user
  }

  async function getUserByEmail(email: User['email']): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    return user
  }

  async function getUsers(): Promise<User[]> {
    const users = await prisma.user.findMany()
    return users
  }

  async function createUser(name: User['name'], email: User['email'], password: User['password'], createdAt: User['createdAt'], role: User["role"]): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        createdAt: createdAt,
        role: role,
      },
    })
    return user
  }

  async function editUser(id: User['id'], name?: User['name'], email?: User['email'], password?: User['password'], role?: User['role']): Promise<User | null> {
    const currentUserData = await getUserById(id)
    if (currentUserData) {
      const user = await prisma.user.update({
        where: { id: id },
        data: {
          name: name || currentUserData.name,
          email: email || currentUserData.email,
          password: password || currentUserData.password,
          role: role || currentUserData.role,
        },
      })
      return user
    }
    return null
  }

  async function deleteUser(id: User['id']) {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    })
    return user
  }

  return {
    getById: getUserById,
    getByEmail: getUserByEmail,
    getUsers: getUsers,
    create: createUser,
    edit: editUser,
    deleteOne: deleteUser,
  }
}

export default UserRepository
