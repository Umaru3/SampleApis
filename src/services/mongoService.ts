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

export const createUser = async (data: { username: string; email: string; password: string }) => {
  try {
    
    const emailRegex = /.+\@.+\..+/;
    const existingUser = await User.findOne({ username: data.username });
    const existingEmail = await User.findOne({ email: data.email });

    // Basic checks
    if (!data) {
      return "Missing data";
    } else if (!data.username) {
      return "Missing required fields: username is required.";
    } else if (!data.email) {
      return "Missing required fields: email is required.";
    } else if (!data.password) {
      return "Missing required fields: password is required.";
    }

    // Check for existing username and email
    if(existingUser && existingEmail) {
      return "Both Username and email already exist.";
    }

    //email format validation
    if (!emailRegex.test(data.email)) {
      return "Invalid email format.";
    }

    //username already exists checker
    if (existingUser) {
      return "Username already exists.";
    }

    //email already exists checker
    if (existingEmail) {
      return "Email already exists.";
    }

    return await User.create(data);

  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// export const updateUser = async (id: string, data: any) => {
//   return await User.findByIdAndUpdate(id, data, { new: true });
// };

// export const deleteUser = async (id: string) => {
//   return await User.findByIdAndDelete(id);
// };