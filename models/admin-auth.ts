import { model, models, Schema } from "mongoose";

interface AdminAuth {
    username: string;
    password: string;
}

const adminAuthSchema = new Schema<AdminAuth>({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    }
})

const AdminAuth = models?.AdminAuth || model<AdminAuth>('AdminAuth', adminAuthSchema);

export default AdminAuth;