import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: [
    {
      type: String, // e.g. "CREATE_USER", "DELETE_USER" create,read,uddate,delete
    },
  ],
});

const Role = mongoose.model("Role", roleSchema);

export default Role;