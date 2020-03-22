module.exports = mongoose => {
    const UserSchema = mongoose.Schema({
        username: String,
        firstname: String,
        lastname: String,
        email: String,
        phone: Number
    }, {
        timestamps: true
    });
    UserSchema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    return mongoose.model("user", UserSchema);
};