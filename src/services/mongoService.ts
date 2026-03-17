import { User } from "../models/userModels";

export const getUsers = async () => {
    try{
        const users = await User.find({ deleteFlag: 0 });
        if (!users || users.length == 0) {
            console.log("No users found");
            return ["No users found"];
        }
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

// export const createUser = async (data: { name: string; email: string }) => {
//   return await User.create(data);
// };

// export const updateUser = async (id: string, data: any) => {
//   return await User.findByIdAndUpdate(id, data, { new: true });
// };

// export const deleteUser = async (id: string) => {
//   return await User.findByIdAndDelete(id);
// };